"""Candidate ring generation — CLI entrypoint.

FROZEN INTERFACE (ship hour 1, never change flags). A and C script against
this; renaming a flag at hour 20 breaks them both.

    python -m graph.run --entities data/entities.json \\
                         --invoices data/invoices.json \\
                         --out artifacts/candidate_rings.json \\
                         --max-depth 8

M0 STATUS: find_candidate_rings() below is a STUB. It ignores the real
entities/invoices input and returns two hardcoded rings (one
transaction-closed, one corporate-closed) so A and C have a real artifact
shape to build against from hour 1. Real Tarjan SCC + depth-limited DFS
lands at M1 (hours 1-8); corporate-graph closure at M3 (hours 16-26). Only
this function's body changes — the CLI, the output shape, and
ring_utils.py's invariants are already final.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from graph.ring_utils import assign_ring_ids, canonical_key

SCHEMA_VERSION = 1


def _hardcoded_rings() -> list[dict]:
    """M0 stub. Two rings in the final schema: one transaction-closed
    3-hop, one corporate-closed 3-hop (2 invoices + 1 bridge).
    """
    ring_a_entities = ["E001", "E002", "E003"]
    ring_a_hops = [
        {
            "hop_type": "invoice", "from": "E001", "to": "E002", "invoice_id": "I0001",
            "value": 100_000_000, "hs_code": "72081000",
            "invoice_date": "2026-03-01", "discounting_date": "2026-03-10",
        },
        {
            "hop_type": "invoice", "from": "E002", "to": "E003", "invoice_id": "I0002",
            "value": 102_000_000, "hs_code": "72089000",
            "invoice_date": "2026-03-05", "discounting_date": "2026-03-12",
        },
        {
            "hop_type": "invoice", "from": "E003", "to": "E001", "invoice_id": "I0003",
            "value": 99_500_000, "hs_code": "72081000",
            "invoice_date": "2026-03-09", "discounting_date": "2026-03-15",
        },
    ]

    ring_b_entities = ["E010", "E011", "E012"]
    ring_b_hops = [
        {
            "hop_type": "invoice", "from": "E010", "to": "E011", "invoice_id": "I0010",
            "value": 50_000_000, "hs_code": "27101990",
            "invoice_date": "2026-02-10", "discounting_date": "2026-02-18",
        },
        {
            "hop_type": "invoice", "from": "E011", "to": "E012", "invoice_id": "I0011",
            "value": 51_500_000, "hs_code": "27101990",
            "invoice_date": "2026-02-14", "discounting_date": "2026-02-20",
        },
        {
            "hop_type": "corporate_bridge", "from": "E012", "to": "E010",
            "bridge_kind": "shared_director",
            "bridge_evidence": {"director_id": "D7", "director_name": "R. Menon"},
        },
    ]

    rings = [
        {
            "canonical_key": canonical_key(ring_a_entities),
            "closure_type": "transaction",
            "entities": ring_a_entities,
            "hops": ring_a_hops,
        },
        {
            "canonical_key": canonical_key(ring_b_entities),
            "closure_type": "corporate",
            "entities": ring_b_entities,
            "hops": ring_b_hops,
        },
    ]
    return assign_ring_ids(rings)


def find_candidate_rings(entities: list[dict], invoices: list[dict], max_depth: int) -> list[dict]:
    """M0 stub — ignores entities/invoices, returns hardcoded rings.
    Replaced at M1 with: canonicalize -> Tarjan SCC -> depth-limited DFS
    (dedup via canonical_key) -> assign_ring_ids. Replaced further at M3
    with corporate-graph closure of open paths.
    """
    return _hardcoded_rings()


def _load_json_array(path: Path, key: str) -> list[dict]:
    if not path.exists():
        return []
    with open(path, encoding="utf-8") as f:
        doc = json.load(f)
    return doc.get(key, [])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--entities", required=True, type=Path)
    parser.add_argument("--invoices", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--max-depth", type=int, default=8)
    args = parser.parse_args()

    entities = _load_json_array(args.entities, "entities")
    invoices = _load_json_array(args.invoices, "invoices")

    if not entities or not invoices:
        print(
            f"[graph.run] M0 stub: {args.entities} / {args.invoices} not found or empty — "
            f"emitting hardcoded fixture rings regardless of input.",
        )

    rings = find_candidate_rings(entities, invoices, args.max_depth)

    source_dataset = args.entities.stem if entities else "m0-stub"
    artifact = {
        "schema_version": SCHEMA_VERSION,
        "source_dataset": source_dataset,
        "count": len(rings),
        "rings": rings,
    }

    args.out.parent.mkdir(parents=True, exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(artifact, f, indent=2)
        f.write("\n")

    print(f"[graph.run] wrote {len(rings)} ring(s) to {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
