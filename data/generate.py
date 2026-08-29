"""python -m data.generate --seed 42 --regime A --out data/

Produces data/entities.json, data/invoices.json, data/ground_truth.json.
Parameters live in REGIMES so the held-out regime (--regime B, used for
generalization testing per the wire protocol's H8.4) is a config swap, not a
rewrite.
"""

import argparse
import json
import random
from pathlib import Path

from data.generator import economy, fraud

REGIMES = {
    "A": {
        "num_firms": 32,
        "sector_mix": {"manufacturing": 0.30, "trading": 0.30, "distribution": 0.25, "services": 0.15},
        "num_trade_events": 140,
        "value_range": (2_000_000, 80_000_000),
        "margin_range": (0.05, 0.25),
        "lead_time_days": (3, 45),
        "date_start": "2025-11-01",
        "date_span_days": 150,
        "num_fraud_rings": 6,
        "fraud_ring_length_range": (3, 8),
        "fraud_ring_min_long": 3,
        "fraud_hard_case_count": 1,
        "fraud_corporate_close_fraction": 0.5,
        "fraud_value_variance": 0.03,
        "fraud_timing_gap_days": (1, 4),
        "messy_hs_null_rate": 0.05,
        "messy_address_noise_rate": 0.08,
    },
    "B": {
        "num_firms": 28,
        "sector_mix": {"manufacturing": 0.20, "trading": 0.40, "distribution": 0.20, "services": 0.20},
        "num_trade_events": 110,
        "value_range": (1_000_000, 60_000_000),
        "margin_range": (0.08, 0.30),
        "lead_time_days": (2, 60),
        "date_start": "2026-01-01",
        "date_span_days": 150,
        "num_fraud_rings": 5,
        "fraud_ring_length_range": (3, 8),
        "fraud_ring_min_long": 3,
        "fraud_hard_case_count": 1,
        "fraud_corporate_close_fraction": 0.4,
        "fraud_value_variance": 0.04,
        "fraud_timing_gap_days": (1, 5),
        "messy_hs_null_rate": 0.10,
        "messy_address_noise_rate": 0.12,
    },
}


def _wrap(source, key, items):
    return {"schema_version": 1, "source_dataset": source, "count": len(items), key: items}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--regime", choices=sorted(REGIMES.keys()), default="A")
    ap.add_argument("--out", default="data/")
    args = ap.parse_args()

    rng = random.Random(args.seed)
    params = REGIMES[args.regime]

    entities = economy.build_firms(params, rng)
    invoices = economy.generate_invoices(entities, params, rng)
    economy.apply_messiness(entities, params, rng)

    entities, invoices, ground_truth, _, _ = fraud.inject(
        entities, invoices, params, rng, next_inv_n=len(invoices), next_eid_n=len(entities)
    )

    source = "seed{}-regime{}".format(args.seed, args.regime)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    (out_dir / "entities.json").write_text(
        json.dumps(_wrap(source, "entities", entities), indent=2), encoding="utf-8"
    )
    (out_dir / "invoices.json").write_text(
        json.dumps(_wrap(source, "invoices", invoices), indent=2), encoding="utf-8"
    )
    (out_dir / "ground_truth.json").write_text(
        json.dumps(_wrap(source, "injected_rings", ground_truth["injected_rings"]), indent=2),
        encoding="utf-8",
    )

    print(
        "wrote {} entities, {} invoices, {} injected rings -> {}".format(
            len(entities), len(invoices), len(ground_truth["injected_rings"]), out_dir
        )
    )


if __name__ == "__main__":
    main()
