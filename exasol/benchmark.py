"""exasol/benchmark.py: Benchmark comparing out-of-database Python scoring vs. Exasol in-database scoring."""

import argparse
import json
import os
import sys
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from exasol.connection import connect, is_exasol_available
from scoring.scoring import score_ring


def run_benchmark(candidates_path="artifacts/candidate_rings.json",
                  invoices_path="data/invoices.json",
                  entities_path="data/entities.json",
                  out_path="artifacts/exasol_benchmark.json"):
    """Runs wall-clock benchmark between Python out-of-DB vs Exasol in-DB scoring."""
    with open(candidates_path, "r", encoding="utf-8") as f:
        cand_data = json.load(f)
    candidate_rings = cand_data.get("rings", cand_data if isinstance(cand_data, list) else [])

    with open(invoices_path, "r", encoding="utf-8") as f:
        inv_data = json.load(f)
    all_invoices = inv_data.get("invoices", inv_data if isinstance(inv_data, list) else [])

    with open(entities_path, "r", encoding="utf-8") as f:
        ent_data = json.load(f)
    entities_list = ent_data.get("entities", ent_data if isinstance(ent_data, list) else [])
    entities = {e["id"]: e for e in entities_list}

    num_rings = len(candidate_rings)
    num_invoices = len(all_invoices)

    print(f"Benchmarking on {num_rings} candidate rings across {num_invoices} invoices...")

    # 1. Out-of-database Python scoring (pure Python)
    t0 = time.perf_counter()
    py_scored = [score_ring(r, all_invoices, entities) for r in candidate_rings]
    py_time_sec = time.perf_counter() - t0
    print(f" - Python out-of-database scoring: {py_time_sec:.4f}s ({num_rings / max(py_time_sec, 1e-6):.1f} rings/sec)")

    # 2. Exasol in-database scoring
    exasol_time_sec = None
    exasol_status = "unreachable"

    if is_exasol_available():
        try:
            conn = connect()
            try:
                from exasol.scoring import score_candidate_rings_in_db
                t1 = time.perf_counter()
                score_candidate_rings_in_db(conn)
                exasol_time_sec = time.perf_counter() - t1
                exasol_status = "measured"
                print(f" - Exasol in-database scoring: {exasol_time_sec:.4f}s ({num_rings / max(exasol_time_sec, 1e-6):.1f} rings/sec)")
            finally:
                conn.close()
        except Exception as e:
            exasol_status = f"error: {e}"
            print(f" - Exasol scoring failed: {e}")
    else:
        print(" - Exasol not currently reachable; recorded status: offline reference.")

    benchmark_report = {
        "dataset": {
            "candidate_rings": num_rings,
            "invoices": num_invoices,
            "entities": len(entities),
        },
        "python_out_of_db": {
            "wall_clock_seconds": round(py_time_sec, 4),
            "rings_per_second": round(num_rings / max(py_time_sec, 1e-6), 2),
        },
        "exasol_in_db": {
            "status": exasol_status,
            "wall_clock_seconds": round(exasol_time_sec, 4) if exasol_time_sec is not None else None,
            "rings_per_second": round(num_rings / max(exasol_time_sec, 1e-6), 2) if exasol_time_sec is not None else None,
        },
        "timestamp_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    out_file = Path(out_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(benchmark_report, indent=2), encoding="utf-8")
    print(f"Benchmark results written to {out_file}")
    return benchmark_report


def main():
    parser = argparse.ArgumentParser(description="Run Circe scoring benchmark")
    parser.add_argument("--candidates", default="artifacts/candidate_rings.json")
    parser.add_argument("--invoices", default="data/invoices.json")
    parser.add_argument("--entities", default="data/entities.json")
    parser.add_argument("--out", default="artifacts/exasol_benchmark.json")
    args = parser.parse_args()

    run_benchmark(args.candidates, args.invoices, args.entities, args.out)


if __name__ == "__main__":
    main()
