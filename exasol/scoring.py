"""exasol/scoring.py: In-database scoring engine running against Exasol Personal/Nano.

Supports two execution modes:
1. 'in_db_udf' (Production): Genuine in-database compute pushdown using Exasol Python3
   scalar UDFs (defined in exasol/udfs.sql) and columnar SQL aggregation for S_externality.
   (Status: Code-complete; pending live execution verification against port 8563).
2. 'client_fallback' (Fallback): Standby path computing signals locally and persisting
   records to Exasol tables if the Python3 Script Language Container (SLC) is not yet active.
"""

import argparse
import json
import math
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from exasol.connection import connect, is_exasol_available
from scoring.scoring import PARAMS, s_value, s_product, s_timing, aggregate, evidence


def deploy_udfs(conn):
    """Deploys Python3 UDFs and aggregated hop views from exasol/udfs.sql."""
    udf_sql_path = Path(__file__).resolve().parent / "udfs.sql"
    sql_text = udf_sql_path.read_text(encoding="utf-8")

    # Exasol scripts end with '/' while standard DDL ends with ';'
    chunks = []
    current_chunk = []
    in_script = False

    for line in sql_text.splitlines():
        trimmed = line.strip()
        if trimmed.startswith("--/"):
            in_script = True
            current_chunk = []
            continue
        if in_script:
            if trimmed == "/":
                in_script = False
                chunks.append(("\n".join(current_chunk), True))
                current_chunk = []
            else:
                current_chunk.append(line)
        else:
            if trimmed.endswith(";"):
                current_chunk.append(trimmed[:-1])
                chunks.append(("\n".join(current_chunk), False))
                current_chunk = []
            elif trimmed and not trimmed.startswith("--"):
                current_chunk.append(trimmed)

    for stmt, is_udf in chunks:
        stmt = stmt.strip()
        if stmt:
            conn.execute(stmt)


def compute_externality_in_sql(conn, ring_entities: list[str]) -> float | None:
    """Computes S_externality directly inside Exasol using columnar SQL aggregation."""
    if not ring_entities:
        return None

    quoted_ents = ", ".join(f"'{e}'" for e in ring_entities)
    sql = f"""
    SELECT
        COALESCE(SUM(CASE WHEN "FROM_ENTITY" IN ({quoted_ents}) AND "TO_ENTITY" IN ({quoted_ents}) THEN "VALUE" ELSE 0 END), 0) AS INTERNAL_VOL,
        COALESCE(SUM("VALUE"), 0) AS TOTAL_VOL
    FROM "STARTER_KIT"."INVOICES"
    WHERE "FROM_ENTITY" IN ({quoted_ents}) OR "TO_ENTITY" IN ({quoted_ents})
    """
    cur = conn.execute(sql)
    row = cur.fetchone()
    if not row or row[1] == 0:
        return None
    return float(row[0]) / float(row[1])


def score_candidate_rings_in_db_udf(conn) -> int:
    """Genuine in-database scoring execution pushing all signal evaluations into Exasol UDFs."""
    deploy_udfs(conn)

    # 1. Truncate existing score table
    conn.execute("TRUNCATE TABLE STARTER_KIT.SCORED_RINGS")

    # 2. Execute pushdown insert calling UDFs inside Exasol with V_RING_EXTERNALITY
    pushdown_sql = """
    INSERT INTO STARTER_KIT.SCORED_RINGS (
        RING_ID, CANONICAL_KEY, CLOSURE_TYPE, ENTITIES,
        SCORE_VALUE, SCORE_PRODUCT, SCORE_TIMING, SCORE_EXTERNALITY,
        ABSTAINED, AGGREGATE_SCORE, EXPECTED_LOSS
    )
    WITH computed_signals AS (
        SELECT
            r.RING_ID,
            r.CANONICAL_KEY,
            r.CLOSURE_TYPE,
            r.ENTITIES,
            h.HOPS_JSON,
            STARTER_KIT.CALC_S_VALUE(h.HOPS_JSON, r.ENTITIES) AS S_VAL,
            STARTER_KIT.CALC_S_PRODUCT(h.HOPS_JSON) AS S_PROD,
            STARTER_KIT.CALC_S_TIMING(h.HOPS_JSON) AS S_TIME,
            ext.SCORE_EXTERNALITY AS S_EXT
        FROM STARTER_KIT.CANDIDATE_RINGS r
        JOIN STARTER_KIT.V_RING_HOPS_AGG h ON r.RING_ID = h.RING_ID
        LEFT JOIN STARTER_KIT.V_RING_EXTERNALITY ext ON r.RING_ID = ext.RING_ID
    )
    SELECT
        RING_ID,
        CANONICAL_KEY,
        CLOSURE_TYPE,
        ENTITIES,
        S_VAL,
        S_PROD,
        S_TIME,
        S_EXT,
        STARTER_KIT.CALC_ABSTAINED(S_VAL, S_PROD, S_TIME, S_EXT),
        STARTER_KIT.CALC_AGGREGATE(S_VAL, S_PROD, S_TIME, S_EXT),
        STARTER_KIT.CALC_EXPECTED_LOSS(
            STARTER_KIT.CALC_AGGREGATE(S_VAL, S_PROD, S_TIME, S_EXT),
            HOPS_JSON
        )
    FROM computed_signals
    """
    conn.execute(pushdown_sql)

    # Defensive fallback: if any candidate ring had no junction rows, compute via compute_externality_in_sql
    null_cur = conn.execute(
        'SELECT r.RING_ID, r.ENTITIES FROM STARTER_KIT.SCORED_RINGS s '
        'JOIN STARTER_KIT.CANDIDATE_RINGS r ON s.RING_ID = r.RING_ID '
        'WHERE s.SCORE_EXTERNALITY IS NULL'
    )
    null_rows = null_cur.fetchall()
    if null_rows:
        for rid, ents_json in null_rows:
            ents = json.loads(ents_json) if isinstance(ents_json, str) else ents_json
            ext_val = compute_externality_in_sql(conn, ents)
            if ext_val is not None:
                conn.execute(
                    f'UPDATE STARTER_KIT.SCORED_RINGS SET '
                    f'SCORE_EXTERNALITY = {ext_val}, '
                    f'ABSTAINED = STARTER_KIT.CALC_ABSTAINED(SCORE_VALUE, SCORE_PRODUCT, SCORE_TIMING, {ext_val}), '
                    f'AGGREGATE_SCORE = STARTER_KIT.CALC_AGGREGATE(SCORE_VALUE, SCORE_PRODUCT, SCORE_TIMING, {ext_val}), '
                    f'EXPECTED_LOSS = STARTER_KIT.CALC_EXPECTED_LOSS('
                    f'    STARTER_KIT.CALC_AGGREGATE(SCORE_VALUE, SCORE_PRODUCT, SCORE_TIMING, {ext_val}), '
                    f'    (SELECT HOPS_JSON FROM STARTER_KIT.V_RING_HOPS_AGG WHERE RING_ID = \'{rid}\')'
                    f') '
                    f'WHERE RING_ID = \'{rid}\''
                )

    cur = conn.execute("SELECT COUNT(*) FROM STARTER_KIT.SCORED_RINGS")
    row = cur.fetchone()
    return row[0] if row else 0


def score_candidate_rings_in_db_client(conn) -> int:
    """Client-side fallback path: computes signals locally and persists rows to Exasol."""
    from exasol.repository import get_entities, get_candidate_rings
    ent_data = get_entities(conn)
    entities = {e["id"]: e for e in ent_data["entities"]}

    cand_data = get_candidate_rings(conn)
    rings = cand_data["rings"]

    scored_rows = []
    evidence_rows = []

    for r in rings:
        ring_ents = r.get("entities", [])
        sc_val = s_value(r)
        sc_prod = s_product(r, entities)
        sc_time = s_timing(r)
        sc_ext = compute_externality_in_sql(conn, ring_ents)

        scores = {
            "value": sc_val,
            "product": sc_prod,
            "timing": sc_time,
            "externality": sc_ext,
        }

        abstained = [k for k, v in scores.items() if v is None]
        agg = aggregate(scores)

        sum_invoice_value = sum(
            int(h.get("value", 0)) for h in r.get("hops", []) if h.get("hop_type") == "invoice"
        )
        expected_loss = int(round(agg * sum_invoice_value))

        ev = evidence(r, scores, entities)

        scored_rows.append((
            r["ring_id"],
            r["canonical_key"],
            r["closure_type"],
            json.dumps(r.get("entities", []), ensure_ascii=False),
            sc_val,
            sc_prod,
            sc_time,
            sc_ext,
            json.dumps(abstained, ensure_ascii=False),
            agg,
            expected_loss,
        ))

        evidence_rows.append((
            r["ring_id"],
            str(ev.get("value", "")),
            str(ev.get("product", "")),
            str(ev.get("timing", "")),
            str(ev.get("externality", "")),
            str(ev.get("industry", "")),
        ))

    if scored_rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.SCORED_RINGS")
        conn.import_from_iterable(
            scored_rows,
            "STARTER_KIT.SCORED_RINGS",
            columns=[
                "RING_ID", "CANONICAL_KEY", "CLOSURE_TYPE", "ENTITIES",
                "SCORE_VALUE", "SCORE_PRODUCT", "SCORE_TIMING", "SCORE_EXTERNALITY",
                "ABSTAINED", "AGGREGATE_SCORE", "EXPECTED_LOSS"
            ],
        )

    if evidence_rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.RING_EVIDENCE")
        conn.import_from_iterable(
            evidence_rows,
            "STARTER_KIT.RING_EVIDENCE",
            columns=[
                "RING_ID", "EVIDENCE_VALUE", "EVIDENCE_PRODUCT",
                "EVIDENCE_TIMING", "EVIDENCE_EXTERNALITY", "EVIDENCE_INDUSTRY"
            ],
        )

    return len(scored_rows)


def score_candidate_rings_in_db(conn, mode="auto") -> tuple[int, str]:
    """Scores rings in Exasol, defaulting to in-database UDF pushdown with client fallback."""
    if mode in ("auto", "in_db_udf"):
        try:
            count = score_candidate_rings_in_db_udf(conn)
            return count, "in_db_udf"
        except Exception as e:
            if mode == "in_db_udf":
                raise
            print(f"UDF pushdown unavailable ({e}); engaging client-side scoring fallback.", file=sys.stderr)

    count = score_candidate_rings_in_db_client(conn)
    return count, "client_fallback"


def main():
    parser = argparse.ArgumentParser(description="Run Exasol scoring engine")
    parser.add_argument(
        "--mode",
        choices=["auto", "in_db_udf", "client_fallback"],
        default="auto",
        help="Execution mode (default: auto, tries in_db_udf then client_fallback)"
    )
    args = parser.parse_args()

    if not is_exasol_available():
        print("Exasol is not configured or reachable.", file=sys.stderr)
        return 1

    conn = connect()
    try:
        print(f"Running scoring against Exasol (mode: {args.mode})...")
        count, active_mode = score_candidate_rings_in_db(conn, mode=args.mode)
        print(f"Scored {count} rings using mode '{active_mode}' successfully.")
        return 0
    finally:
        conn.close()


if __name__ == "__main__":
    sys.exit(main())
