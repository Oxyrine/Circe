"""Candidate ring generation — CLI entrypoint.

FROZEN INTERFACE (shipped hour 1, never changed). A and C script against
this; renaming a flag now breaks them both.

    python -m graph.run --entities data/entities.json \\
                         --invoices data/invoices.json \\
                         --out artifacts/candidate_rings.json \\
                         --max-depth 8

M1/M3: find_candidate_rings() is now the real pipeline, merging both
closure mechanisms:
  - transaction-closed: canonicalize -> build graph -> Tarjan SCC ->
    depth-limited DFS per SCC (cycles.py)
  - corporate-closed: bridge an open path through shared director /
    address / registration date instead of a transaction (corporate.py)
Both sources are deduplicated by canonical_key (transaction-closed wins on
any collision — it's the more direct claim) before ring_id assignment.

If --entities/--invoices are missing or empty, falls back to two hardcoded
fixture rings (the M0 stub) so `python -m graph.run` still produces
schema-valid output against a fresh clone before data/ exists.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from graph.canonicalize import apply_canonicalization, canonicalize
from graph.corporate import find_corporate_bridged_rings
from graph.cycles import find_transaction_closed_rings
from graph.ring_utils import assign_ring_ids, canonical_key
from graph.transaction_graph import build_transaction_graph

SCHEMA_VERSION = 1


def _hardcoded_rings() -> list[dict]:
    """M0 stub, kept as the empty-input fallback. Two rings in the final
    schema: one transaction-closed 3-hop, one corporate-closed 3-hop
    (2 invoices + 1 bridge).
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
            "bridge_evidence": {"director_id": "D7"},
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
    if not entities or not invoices:
        return _hardcoded_rings()

    # Computed ONCE, threaded through both closure mechanisms — see
    # transaction_graph.build_transaction_graph's docstring for why
    # letting either half of the pipeline compute its own canon_map (or
    # skip canonicalization) would let them silently disagree on what an
    # entity id refers to.
    canon_map = canonicalize(entities)
    canonical_entities = apply_canonicalization(entities, canon_map)

    adj, edge_invoices = build_transaction_graph(canon_map, invoices)

    tx_rings, tx_warnings = find_transaction_closed_rings(adj, edge_invoices, max_depth)
    corp_rings, corp_warnings = find_corporate_bridged_rings(canonical_entities, adj, edge_invoices, max_depth)

    for w in tx_warnings + corp_warnings:
        print(f"[graph.run] WARNING: {w}", file=sys.stderr)

    # transaction-closed wins on any collision — it's the more direct claim
    seen_keys: set[str] = set()
    deduped: list[dict] = []
    for ring in tx_rings + corp_rings:
        if ring["canonical_key"] in seen_keys:
            continue
        seen_keys.add(ring["canonical_key"])
        deduped.append(ring)

    return assign_ring_ids(deduped)


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
            f"[graph.run] {args.entities} / {args.invoices} not found or empty — "
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

    tx_n = sum(1 for r in rings if r["closure_type"] == "transaction")
    corp_n = sum(1 for r in rings if r["closure_type"] == "corporate")
    print(f"[graph.run] wrote {len(rings)} ring(s) ({tx_n} transaction-closed, {corp_n} corporate-closed) to {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
