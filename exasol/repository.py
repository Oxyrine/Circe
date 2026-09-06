"""exasol/repository.py: Query layer reconstructing exact frozen wire schema artifacts from Exasol."""

import argparse
import json
import os
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from exasol.connection import connect, is_exasol_available


def get_entities(conn=None):
    """Fetches entities from Exasol matching contract/entity.schema.json."""
    close_at_end = False
    if conn is None:
        conn = connect()
        close_at_end = True
    try:
        cur = conn.execute(
            'SELECT "ID", "NAME", "INDUSTRY_CODE", "INDUSTRY_CLASS", "DIRECTORS", "ADDRESS", "REGISTRATION_DATE" '
            'FROM "STARTER_KIT"."ENTITIES" ORDER BY "ID"'
        )
        entities = []
        for row in cur.fetchall():
            entities.append({
                "id": row[0],
                "name": row[1],
                "industry_code": row[2],
                "industry_class": row[3],
                "directors": json.loads(row[4]) if isinstance(row[4], str) else row[4],
                "address": row[5],
                "registration_date": row[6].isoformat() if hasattr(row[6], "isoformat") else str(row[6]),
            })
        return {
            "schema_version": 1,
            "source_dataset": "exasol",
            "count": len(entities),
            "entities": entities,
        }
    finally:
        if close_at_end:
            conn.close()


def get_invoices(conn=None):
    """Fetches invoices from Exasol matching contract/invoice.schema.json."""
    close_at_end = False
    if conn is None:
        conn = connect()
        close_at_end = True
    try:
        cur = conn.execute(
            'SELECT "INVOICE_ID", "FROM_ENTITY", "TO_ENTITY", "VALUE", "HS_CODE", "INVOICE_DATE", "DISCOUNTING_DATE" '
            'FROM "STARTER_KIT"."INVOICES" ORDER BY "INVOICE_ID"'
        )
        invoices = []
        for row in cur.fetchall():
            invoices.append({
                "invoice_id": row[0],
                "from": row[1],
                "to": row[2],
                "value": int(row[3]),
                "hs_code": row[4] if row[4] else None,
                "invoice_date": row[5].isoformat() if hasattr(row[5], "isoformat") else str(row[5]),
                "discounting_date": row[6].isoformat() if hasattr(row[6], "isoformat") else str(row[6]),
            })
        return {
            "schema_version": 1,
            "source_dataset": "exasol",
            "count": len(invoices),
            "invoices": invoices,
        }
    finally:
        if close_at_end:
            conn.close()


def get_ground_truth(conn=None):
    """Fetches ground truth rings from Exasol matching contract/ground_truth.schema.json."""
    close_at_end = False
    if conn is None:
        conn = connect()
        close_at_end = True
    try:
        cur = conn.execute(
            'SELECT "TRUTH_ID", "ENTITIES", "HIDDEN_LEGS" '
            'FROM "STARTER_KIT"."GROUND_TRUTH_RINGS" ORDER BY "TRUTH_ID"'
        )
        rings = []
        for row in cur.fetchall():
            rings.append({
                "truth_id": row[0],
                "entities": json.loads(row[1]) if isinstance(row[1], str) else row[1],
                "hidden_legs": json.loads(row[2]) if isinstance(row[2], str) else row[2],
            })
        return {
            "schema_version": 1,
            "source_dataset": "exasol",
            "count": len(rings),
            "injected_rings": rings,
        }
    finally:
        if close_at_end:
            conn.close()


def get_candidate_rings(conn=None):
    """Fetches candidate rings and reconstructs hops matching contract/candidate_ring.schema.json."""
    close_at_end = False
    if conn is None:
        conn = connect()
        close_at_end = True
    try:
        rings_cur = conn.execute(
            'SELECT "RING_ID", "CANONICAL_KEY", "CLOSURE_TYPE", "ENTITIES" '
            'FROM "STARTER_KIT"."CANDIDATE_RINGS" ORDER BY "RING_ID"'
        )
        rings = []
        rings_map = {}
        for row in rings_cur.fetchall():
            r = {
                "ring_id": row[0],
                "canonical_key": row[1],
                "closure_type": row[2],
                "entities": json.loads(row[3]) if isinstance(row[3], str) else row[3],
                "hops": [],
            }
            rings.append(r)
            rings_map[r["ring_id"]] = r

        hops_cur = conn.execute(
            'SELECT "RING_ID", "HOP_INDEX", "HOP_TYPE", "FROM_ENTITY", "TO_ENTITY", '
            '"INVOICE_ID", "VALUE", "HS_CODE", "INVOICE_DATE", "DISCOUNTING_DATE", '
            '"BRIDGE_KIND", "BRIDGE_EVIDENCE" '
            'FROM "STARTER_KIT"."RING_HOPS" ORDER BY "RING_ID", "HOP_INDEX"'
        )
        for h in hops_cur.fetchall():
            ring_id = h[0]
            if ring_id not in rings_map:
                continue
            hop_type = h[2]
            if hop_type == "invoice":
                hop = {
                    "hop_type": "invoice",
                    "from": h[3],
                    "to": h[4],
                    "invoice_id": h[5],
                    "value": int(h[6]),
                    "hs_code": h[7] if h[7] else None,
                    "invoice_date": h[8].isoformat() if hasattr(h[8], "isoformat") else str(h[8]),
                    "discounting_date": h[9].isoformat() if hasattr(h[9], "isoformat") else str(h[9]),
                }
            else:
                hop = {
                    "hop_type": "corporate_bridge",
                    "from": h[3],
                    "to": h[4],
                    "bridge_kind": h[10],
                    "bridge_evidence": json.loads(h[11]) if isinstance(h[11], str) else (h[11] or {}),
                }
            rings_map[ring_id]["hops"].append(hop)

        return {
            "schema_version": 1,
            "source_dataset": "exasol",
            "count": len(rings),
            "rings": rings,
        }
    finally:
        if close_at_end:
            conn.close()


def get_scored_rings(conn=None, limit=None):
    """Fetches scored rings, hops, and evidence matching contract/scored_ring.schema.json."""
    close_at_end = False
    if conn is None:
        conn = connect()
        close_at_end = True
    try:
        # 1. Fetch candidate rings and hops base
        cand_data = get_candidate_rings(conn)
        rings_map = {r["ring_id"]: r for r in cand_data["rings"]}

        # 2. Fetch scores
        limit_sql = f" LIMIT {int(limit)}" if limit else ""
        cur = conn.execute(
            'SELECT "RING_ID", "SCORE_VALUE", "SCORE_PRODUCT", "SCORE_TIMING", "SCORE_EXTERNALITY", '
            '"ABSTAINED", "AGGREGATE_SCORE", "EXPECTED_LOSS" '
            f'FROM "STARTER_KIT"."SCORED_RINGS" ORDER BY "EXPECTED_LOSS" DESC{limit_sql}'
        )
        scored_rows = cur.fetchall()

        # 3. Fetch evidence
        ev_cur = conn.execute(
            'SELECT "RING_ID", "EVIDENCE_VALUE", "EVIDENCE_PRODUCT", "EVIDENCE_TIMING", '
            '"EVIDENCE_EXTERNALITY", "EVIDENCE_INDUSTRY" '
            'FROM "STARTER_KIT"."RING_EVIDENCE"'
        )
        evidence_map = {}
        for ev in ev_cur.fetchall():
            evidence_map[ev[0]] = {
                "value": ev[1],
                "product": ev[2],
                "timing": ev[3],
                "externality": ev[4],
                "industry": ev[5],
            }

        result_rings = []
        for s in scored_rows:
            ring_id = s[0]
            base_ring = rings_map.get(ring_id, {
                "ring_id": ring_id,
                "canonical_key": "",
                "closure_type": "transaction",
                "entities": [],
                "hops": [],
            })
            abstained = json.loads(s[5]) if isinstance(s[5], str) else s[5]
            ev = evidence_map.get(ring_id, {
                "value": "", "product": "", "timing": "", "externality": "", "industry": ""
            })
            result_rings.append({
                "ring_id": ring_id,
                "canonical_key": base_ring.get("canonical_key", ""),
                "closure_type": base_ring.get("closure_type", "transaction"),
                "entities": base_ring.get("entities", []),
                "hops": base_ring.get("hops", []),
                "scores": {
                    "value": float(s[1]) if s[1] is not None else None,
                    "product": float(s[2]) if s[2] is not None else None,
                    "timing": float(s[3]) if s[3] is not None else None,
                    "externality": float(s[4]) if s[4] is not None else None,
                },
                "abstained": abstained,
                "aggregate": float(s[6]),
                "expected_loss": int(s[7]),
                "evidence": ev,
            })

        return {
            "schema_version": 1,
            "source_dataset": "exasol",
            "count": len(result_rings),
            "rings": result_rings,
        }
    finally:
        if close_at_end:
            conn.close()


def main():
    parser = argparse.ArgumentParser(description="Export Exasol data to JSON schema-validated artifacts")
    parser.add_argument("--export-dir", default="exasol_export", help="Target export directory")
    args = parser.parse_args()

    if not is_exasol_available():
        print("Exasol is not configured or reachable.", file=sys.stderr)
        return 1

    out_dir = Path(args.export_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    conn = connect()
    try:
        print("Exporting datasets from Exasol...")
        with open(out_dir / "entities.json", "w", encoding="utf-8") as f:
            json.dump(get_entities(conn), f, indent=2)
        with open(out_dir / "invoices.json", "w", encoding="utf-8") as f:
            json.dump(get_invoices(conn), f, indent=2)
        with open(out_dir / "ground_truth.json", "w", encoding="utf-8") as f:
            json.dump(get_ground_truth(conn), f, indent=2)
        with open(out_dir / "candidate_rings.json", "w", encoding="utf-8") as f:
            json.dump(get_candidate_rings(conn), f, indent=2)
        with open(out_dir / "scored_rings.json", "w", encoding="utf-8") as f:
            json.dump(get_scored_rings(conn), f, indent=2)
        print(f"Exported all 5 artifacts to {out_dir}/ successfully.")
        return 0
    finally:
        conn.close()


if __name__ == "__main__":
    sys.exit(main())
