"""exasol/load.py: Bulk-loads Circe datasets and artifacts into Exasol."""

import argparse
import json
import os
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from exasol.connection import connect, is_exasol_available


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def init_schema(conn):
    schema_sql_path = Path(__file__).resolve().parent / "schema.sql"
    sql_text = schema_sql_path.read_text(encoding="utf-8")
    for stmt in sql_text.split(";"):
        stmt = stmt.strip()
        if stmt:
            conn.execute(stmt)


def load_entities(conn, entities_path):
    data = load_json(entities_path)
    entities = data.get("entities", data if isinstance(data, list) else [])
    rows = []
    for e in entities:
        rows.append((
            e["id"],
            e["name"],
            e["industry_code"],
            e["industry_class"],
            json.dumps(e.get("directors", []), ensure_ascii=False),
            e["address"],
            e["registration_date"],
        ))
    if rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.ENTITIES")
        conn.import_from_iterable(
            rows,
            "STARTER_KIT.ENTITIES",
            columns=["ID", "NAME", "INDUSTRY_CODE", "INDUSTRY_CLASS", "DIRECTORS", "ADDRESS", "REGISTRATION_DATE"],
        )
    print(f"Loaded {len(rows)} entities into Exasol.")


def load_invoices(conn, invoices_path):
    data = load_json(invoices_path)
    invoices = data.get("invoices", data if isinstance(data, list) else [])
    rows = []
    for inv in invoices:
        rows.append((
            inv["invoice_id"],
            inv["from"],
            inv["to"],
            int(inv["value"]),
            inv.get("hs_code") or None,
            inv["invoice_date"],
            inv.get("discounting_date") or inv["invoice_date"],
        ))
    if rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.INVOICES")
        conn.import_from_iterable(
            rows,
            "STARTER_KIT.INVOICES",
            columns=["INVOICE_ID", "FROM_ENTITY", "TO_ENTITY", "VALUE", "HS_CODE", "INVOICE_DATE", "DISCOUNTING_DATE"],
        )
    print(f"Loaded {len(rows)} invoices into Exasol.")


def load_ground_truth(conn, ground_truth_path):
    if not os.path.exists(ground_truth_path):
        return
    data = load_json(ground_truth_path)
    rings = data.get("injected_rings", data if isinstance(data, list) else [])
    rows = []
    for r in rings:
        rows.append((
            r["truth_id"],
            json.dumps(r.get("entities", []), ensure_ascii=False),
            json.dumps(r.get("hidden_legs", []), ensure_ascii=False),
        ))
    if rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.GROUND_TRUTH_RINGS")
        conn.import_from_iterable(
            rows,
            "STARTER_KIT.GROUND_TRUTH_RINGS",
            columns=["TRUTH_ID", "ENTITIES", "HIDDEN_LEGS"],
        )
    print(f"Loaded {len(rows)} ground truth rings into Exasol.")


def load_candidates(conn, candidates_path):
    if not os.path.exists(candidates_path):
        return
    data = load_json(candidates_path)
    rings = data.get("rings", data if isinstance(data, list) else [])
    ring_rows = []
    hop_rows = []
    ent_rows = []
    for r in rings:
        ring_rows.append((
            r["ring_id"],
            r["canonical_key"],
            r["closure_type"],
            json.dumps(r.get("entities", []), ensure_ascii=False),
        ))
        for e in r.get("entities", []):
            ent_rows.append((r["ring_id"], e))
        for idx, hop in enumerate(r.get("hops", [])):
            hop_rows.append((
                r["ring_id"],
                idx,
                hop["hop_type"],
                hop["from"],
                hop["to"],
                hop.get("invoice_id") or None,
                int(hop["value"]) if "value" in hop and hop["value"] is not None else None,
                hop.get("hs_code") or None,
                hop.get("invoice_date") or None,
                hop.get("discounting_date") or None,
                hop.get("bridge_kind") or None,
                json.dumps(hop.get("bridge_evidence", {}), ensure_ascii=False) if "bridge_evidence" in hop else None,
            ))
    if ring_rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.CANDIDATE_RINGS")
        conn.import_from_iterable(
            ring_rows,
            "STARTER_KIT.CANDIDATE_RINGS",
            columns=["RING_ID", "CANONICAL_KEY", "CLOSURE_TYPE", "ENTITIES"],
        )
    if ent_rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.RING_ENTITIES")
        conn.import_from_iterable(
            ent_rows,
            "STARTER_KIT.RING_ENTITIES",
            columns=["RING_ID", "ENTITY_ID"],
        )
    if hop_rows:
        conn.execute("TRUNCATE TABLE STARTER_KIT.RING_HOPS")
        conn.import_from_iterable(
            hop_rows,
            "STARTER_KIT.RING_HOPS",
            columns=[
                "RING_ID", "HOP_INDEX", "HOP_TYPE", "FROM_ENTITY", "TO_ENTITY",
                "INVOICE_ID", "VALUE", "HS_CODE", "INVOICE_DATE", "DISCOUNTING_DATE",
                "BRIDGE_KIND", "BRIDGE_EVIDENCE"
            ],
        )
    print(f"Loaded {len(ring_rows)} candidate rings ({len(ent_rows)} entity junctions, {len(hop_rows)} hops) into Exasol.")


def load_scored(conn, scored_path):
    if not os.path.exists(scored_path):
        return
    data = load_json(scored_path)
    rings = data.get("rings", data if isinstance(data, list) else [])
    scored_rows = []
    evidence_rows = []
    for r in rings:
        scores = r.get("scores", {})
        ev = r.get("evidence", {})
        scored_rows.append((
            r["ring_id"],
            r["canonical_key"],
            r["closure_type"],
            json.dumps(r.get("entities", []), ensure_ascii=False),
            scores.get("value"),
            scores.get("product"),
            scores.get("timing"),
            scores.get("externality"),
            json.dumps(r.get("abstained", []), ensure_ascii=False),
            float(r.get("aggregate", r.get("aggregate_score", 0.0))),
            int(r.get("expected_loss", 0)),
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
    print(f"Loaded {len(scored_rows)} scored rings into Exasol.")


def main():
    parser = argparse.ArgumentParser(description="Bulk-load Circe data into Exasol")
    parser.add_argument("--data-dir", default="data", help="Path to data directory")
    parser.add_argument("--artifacts-dir", default="artifacts", help="Path to artifacts directory")
    args = parser.parse_args()

    if not is_exasol_available():
        print("Exasol is not configured or pyexasol is not installed. Exiting.", file=sys.stderr)
        return 1

    conn = connect()
    try:
        print("Initializing schema...")
        init_schema(conn)

        load_entities(conn, os.path.join(args.data_dir, "entities.json"))
        load_invoices(conn, os.path.join(args.data_dir, "invoices.json"))
        load_ground_truth(conn, os.path.join(args.data_dir, "ground_truth.json"))

        cand_file = os.path.join(args.artifacts_dir, "candidate_rings.json")
        if os.path.exists(cand_file):
            load_candidates(conn, cand_file)

        scored_file = os.path.join(args.artifacts_dir, "scored_rings.json")
        if os.path.exists(scored_file):
            load_scored(conn, scored_file)

        print("Bulk load complete.")
        return 0
    finally:
        conn.close()


if __name__ == "__main__":
    sys.exit(main())
