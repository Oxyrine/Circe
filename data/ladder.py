"""data/ladder.py: Empirical scale ladder climbing 1k -> 5k -> 25k -> 100k trade events

within a strict wall-clock budget, recording the highest completed rung to artifacts/exasol_benchmark.json.
"""

import argparse
import json
import random
import sys
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from data.generator import economy, fraud
from graph.run import find_candidate_rings
from scoring.scoring import score_ring


DEFAULT_LADDER_RUNGS = [1000, 5000, 25000, 100000]


def run_ladder_rung(num_events: int, seed: int = 42, max_depth: int = 6) -> dict:
    """Generates an economy at specified scale and benchmarks detection + scoring."""
    num_firms = max(32, int(num_events / 8))
    params = {
        "num_firms": num_firms,
        "sector_mix": {"manufacturing": 0.30, "trading": 0.30, "distribution": 0.25, "services": 0.15},
        "num_trade_events": num_events,
        "value_range": (1_000_000, 100_000_000),
        "margin_range": (0.05, 0.25),
        "lead_time_days": (2, 45),
        "date_start": "2025-06-01",
        "date_span_days": 270,
        "num_fraud_rings": min(20, max(6, int(num_events / 200))),
        "fraud_ring_length_range": (3, 8),
        "fraud_ring_min_long": 3,
        "fraud_hard_case_count": 2,
        "fraud_corporate_close_fraction": 0.5,
        "fraud_value_variance": 0.03,
        "fraud_timing_gap_days": (1, 4),
        "messy_hs_null_rate": 0.05,
        "messy_address_noise_rate": 0.08,
    }

    rng = random.Random(seed)

    # 1. Generate Economy
    t_gen_0 = time.perf_counter()
    entities = economy.build_firms(params, rng)
    invoices = economy.generate_invoices(entities, params, rng)
    economy.apply_messiness(entities, params, rng)
    entities, invoices, _, _, _ = fraud.inject(
        entities, invoices, params, rng, next_inv_n=len(invoices), next_eid_n=len(entities)
    )
    t_gen = time.perf_counter() - t_gen_0

    # 2. Graph Candidate Detection (bounded by depth)
    t_detect_0 = time.perf_counter()
    candidate_rings = find_candidate_rings(entities, invoices, max_depth=max_depth)
    t_detect = time.perf_counter() - t_detect_0

    # 3. Python Reference Scoring
    ent_map = {e["id"]: e for e in entities}
    t_score_0 = time.perf_counter()
    scored = [score_ring(r, invoices, ent_map) for r in candidate_rings]
    t_score = time.perf_counter() - t_score_0

    return {
        "target_invoices": num_events,
        "actual_invoices": len(invoices),
        "actual_entities": len(entities),
        "candidate_rings_found": len(candidate_rings),
        "generation_seconds": round(t_gen, 4),
        "detection_seconds": round(t_detect, 4),
        "scoring_seconds": round(t_score, 4),
        "total_seconds": round(t_gen + t_detect + t_score, 4),
        "scoring_throughput_rings_per_sec": round(len(candidate_rings) / max(t_score, 1e-6), 2),
    }


def climb_scale_ladder(rungs=None, time_budget_sec: float = 60.0, benchmark_path="artifacts/exasol_benchmark.json"):
    """Executes the scale ladder up to time_budget_sec and logs results."""
    ladder = rungs or DEFAULT_LADDER_RUNGS
    results = []
    highest_completed = None
    stopped_reason = "all_rungs_completed"

    print(f"Climbing empirical scale ladder: {ladder} (budget: {time_budget_sec}s)...")

    for rung in ladder:
        print(f"\nEvaluating rung: {rung:,} invoices...")
        t0 = time.perf_counter()
        try:
            res = run_ladder_rung(rung)
            elapsed = time.perf_counter() - t0
            print(f" - Completed rung {rung:,} in {elapsed:.2f}s (candidates: {res['candidate_rings_found']}, scoring: {res['scoring_seconds']}s)")
            results.append(res)
            highest_completed = rung

            # Check remaining budget
            if elapsed > (time_budget_sec / 2.0) and rung != ladder[-1]:
                stopped_reason = f"next_rung_likely_to_exceed_budget (current rung took {elapsed:.1f}s)"
                print(f"Stopping ladder: {stopped_reason}")
                break

        except Exception as e:
            stopped_reason = f"error_at_rung_{rung}: {e}"
            print(f"Rung {rung} failed: {e}", file=sys.stderr)
            break

    ladder_summary = {
        "budget_seconds": time_budget_sec,
        "highest_completed_rung": highest_completed,
        "stopped_reason": stopped_reason,
        "rungs": results,
    }

    # Update artifacts/exasol_benchmark.json
    out_file = Path(benchmark_path)
    if out_file.exists():
        try:
            existing = json.loads(out_file.read_text(encoding="utf-8"))
        except Exception:
            existing = {}
    else:
        existing = {}

    existing["scale_ladder"] = ladder_summary
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(existing, indent=2), encoding="utf-8")
    print(f"\nEmpirical scale ladder complete. Highest completed: {highest_completed}. Written to {out_file}")
    return ladder_summary


def main():
    parser = argparse.ArgumentParser(description="Empirical scale ladder runner")
    parser.add_argument("--budget", type=float, default=30.0, help="Wall clock budget cutoff in seconds")
    parser.add_argument("--rungs", type=str, default="1000,5000", help="Comma-separated ladder rungs")
    parser.add_argument("--benchmark-path", default="artifacts/exasol_benchmark.json", help="Output benchmark JSON path")
    args = parser.parse_args()

    rungs = [int(x.strip()) for x in args.rungs.split(",") if x.strip()]
    climb_scale_ladder(rungs=rungs, time_budget_sec=args.budget, benchmark_path=args.benchmark_path)


if __name__ == "__main__":
    main()
