"""exasol/parity.py: Rigorous parity verification between reference engine and Exasol execution.

Isolates:
1. S_externality SQL pushdown vs. Python reference on every candidate ring (pure SQL test).
2. End-to-end parity across all signals, aggregates, and expected losses.
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
from exasol.repository import get_entities, get_invoices, get_candidate_rings, get_scored_rings
from exasol.scoring import compute_externality_in_sql
from scoring.scoring import score_ring, s_externality


def approx_equal(a, b, tol=6e-3):
    """Tolerates the reference engine's own 2dp rounding, not just float noise.

    scoring.score_ring() rounds its returned scores/aggregate to 2 decimal
    places (see scoring/scoring.py), while SCORED_RINGS stores them at
    DECIMAL(4,3) -- three decimal places, effectively unrounded. The same
    underlying value can therefore legitimately read as e.g. 0.21 from the
    reference and 0.208 from Exasol; the maximum possible gap from a single
    round-to-nearest-0.01 step is 0.005, so 1e-4 (float-noise-only tolerance)
    flags every such pair as a false mismatch. 6e-3 clears that known
    rounding step with headroom while still catching a genuine computation
    error, which would be off by far more than a rounding unit.
    """
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    return abs(float(a) - float(b)) <= tol


def verify_externality_sql_parity(conn) -> dict:
    """Explicitly verifies that the genuine SQL pushdown query for S_externality

    matches the pure Python reference on every single candidate ring in the dataset.
    """
    inv_data = get_invoices(conn)
    all_invoices = inv_data["invoices"]

    cand_data = get_candidate_rings(conn)
    candidate_rings = cand_data["rings"]

    mismatches = []
    total = 0

    for r in candidate_rings:
        ring_ents = r.get("entities", [])
        ref_ext = s_externality(r, all_invoices)
        sql_ext = compute_externality_in_sql(conn, ring_ents)

        if not approx_equal(ref_ext, sql_ext):
            mismatches.append(
                f"{r['ring_id']} S_externality mismatch: python={ref_ext} vs sql={sql_ext}"
            )
        total += 1

    return {
        "total_rings_verified": total,
        "mismatch_count": len(mismatches),
        "mismatches": mismatches[:10],
        "status": "PARITY_PROVEN" if len(mismatches) == 0 else "MISMATCH_DETECTED",
    }


def verify_parity(conn=None) -> dict:
    """Verifies that Python reference scoring and Exasol stored scoring

    produce identical outputs across every ring.
    """
    close_at_end = False
    if conn is None:
        conn = connect()
        close_at_end = True

    try:
        # 1. First verify S_externality SQL pushdown in isolation
        ext_res = verify_externality_sql_parity(conn)

        # 2. Verify all stored scored rings
        ent_data = get_entities(conn)
        entities = {e["id"]: e for e in ent_data["entities"]}

        inv_data = get_invoices(conn)
        all_invoices = inv_data["invoices"]

        cand_data = get_candidate_rings(conn)
        candidate_rings = cand_data["rings"]

        exasol_scored = get_scored_rings(conn)
        exasol_map = {r["ring_id"]: r for r in exasol_scored["rings"]}

        total = 0
        mismatches = []

        for r in candidate_rings:
            ring_id = r["ring_id"]
            if ring_id not in exasol_map:
                mismatches.append(f"{ring_id}: missing in Exasol scored rings")
                continue

            ref_scored = score_ring(r, all_invoices, entities)
            ex_scored = exasol_map[ring_id]

            ref_scores = ref_scored.get("scores", {})
            ex_scores = ex_scored.get("scores", {})

            for sig in ["value", "product", "timing", "externality"]:
                if not approx_equal(ref_scores.get(sig), ex_scores.get(sig)):
                    mismatches.append(
                        f"{ring_id} signal {sig} mismatch: ref={ref_scores.get(sig)} vs exasol={ex_scores.get(sig)}"
                    )

            if not approx_equal(ref_scored.get("aggregate"), ex_scored.get("aggregate")):
                mismatches.append(
                    f"{ring_id} aggregate mismatch: ref={ref_scored.get('aggregate')} vs exasol={ex_scored.get('aggregate')}"
                )

            if int(ref_scored.get("expected_loss", 0)) != int(ex_scored.get("expected_loss", 0)):
                mismatches.append(
                    f"{ring_id} expected_loss mismatch: ref={ref_scored.get('expected_loss')} vs exasol={ex_scored.get('expected_loss')}"
                )

            if sorted(ref_scored.get("abstained", [])) != sorted(ex_scored.get("abstained", [])):
                mismatches.append(
                    f"{ring_id} abstained mismatch: ref={ref_scored.get('abstained')} vs exasol={ex_scored.get('abstained')}"
                )

            total += 1

        result = {
            "externality_sql_pushdown": ext_res,
            "total_compared": total,
            "mismatch_count": len(mismatches),
            "mismatches": mismatches[:10],
            "status": "PARITY_PROVEN" if len(mismatches) == 0 and ext_res["status"] == "PARITY_PROVEN" else "MISMATCH_DETECTED",
        }
        return result
    finally:
        if close_at_end:
            conn.close()


def main():
    if not is_exasol_available():
        print("Exasol is not configured or reachable. Skipping parity run.", file=sys.stderr)
        return 0

    print("Running Exasol-to-Python parity verification...")
    res = verify_parity()
    ext = res["externality_sql_pushdown"]
    print(f" - S_externality SQL pushdown parity: {ext['status']} ({ext['total_rings_verified']} rings, {ext['mismatch_count']} mismatches)")
    print(f" - Overall scored rings parity: {res['status']} ({res['total_compared']} rings, {res['mismatch_count']} mismatches)")
    if res["mismatch_count"] > 0:
        for m in res["mismatches"]:
            print(" -", m, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
