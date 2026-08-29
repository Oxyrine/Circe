"""Candidate ring generation — CLI entrypoint.

FROZEN INTERFACE (shipped hour 1, never changed). A and C script against
this; renaming a flag now breaks them both.

    python -m graph.run --entities data/entities.json \\
                         --invoices data/invoices.json \\
                         --out artifacts/candidate_rings.json \\
                         --max-depth 8

M1: find_candidate_rings() is now the REAL pipeline — canonicalize
(currently identity) -> build directed graph -> Tarjan SCC -> depth-limited
DFS per non-trivial SCC (dedup via canonical_key) -> pick one representative
invoice per edge -> assign_ring_ids. All transaction-closed; corporate-graph
closure of open paths lands at M3.

If --entities/--invoices are missing or empty, falls back to two hardcoded
fixture rings (the M0 stub) so `python -m graph.run` still produces
schema-valid output against a fresh clone before data/ exists.
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

from graph.canonicalize import canonicalize
from graph.cycles import find_cycles_in_scc
from graph.ring_utils import assign_ring_ids, canonical_key
from graph.scc import non_trivial_sccs

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


def _build_graph(entities: list[dict], invoices: list[dict]) -> tuple[dict[str, list[str]], dict[tuple[str, str], list[dict]]]:
    canon_map = canonicalize(entities)

    edge_invoices: dict[tuple[str, str], list[dict]] = defaultdict(list)
    adj_sets: dict[str, set[str]] = defaultdict(set)

    self_loops = 0
    for inv in invoices:
        u = canon_map.get(inv["from"], inv["from"])
        v = canon_map.get(inv["to"], inv["to"])
        if u == v:
            self_loops += 1
            continue  # an entity invoicing itself isn't a circular-trade pattern; M4 territory
        adj_sets[u].add(v)
        edge_invoices[(u, v)].append(inv)

    if self_loops:
        print(f"[graph.run] skipped {self_loops} self-loop invoice(s)", file=sys.stderr)

    adj = {node: sorted(neighbors) for node, neighbors in adj_sets.items()}
    return adj, edge_invoices


def _pick_representative_invoice(candidates: list[dict]) -> dict:
    """Deterministic across reruns: earliest invoice_date represents the
    initiating transaction on that leg; invoice_id breaks ties.
    """
    return min(candidates, key=lambda inv: (inv["invoice_date"], inv["invoice_id"]))


def _build_hops(cycle: list[str], edge_invoices: dict[tuple[str, str], list[dict]]) -> list[dict] | None:
    hops = []
    n = len(cycle)
    for i in range(n):
        u, v = cycle[i], cycle[(i + 1) % n]
        candidates = edge_invoices.get((u, v))
        if not candidates:
            return None  # defensive — shouldn't happen, the edge came from this same graph
        inv = _pick_representative_invoice(candidates)
        hops.append({
            "hop_type": "invoice",
            "from": u, "to": v,
            "invoice_id": inv["invoice_id"],
            "value": inv["value"],
            "hs_code": inv.get("hs_code"),
            "invoice_date": inv["invoice_date"],
            "discounting_date": inv["discounting_date"],
        })
    return hops


def find_candidate_rings(entities: list[dict], invoices: list[dict], max_depth: int) -> list[dict]:
    if not entities or not invoices:
        return _hardcoded_rings()

    adj, edge_invoices = _build_graph(entities, invoices)
    sccs = non_trivial_sccs(adj)

    all_cycles: list[list[str]] = []
    for scc_nodes in sccs:
        scc_node_set = set(scc_nodes)
        scc_adj = {n: [w for w in adj.get(n, []) if w in scc_node_set] for n in scc_nodes}
        cycles, budget_hit = find_cycles_in_scc(scc_node_set, scc_adj, max_depth)
        all_cycles.extend(cycles)
        if budget_hit:
            print(
                f"[graph.run] WARNING: SCC of size {len(scc_nodes)} hit its cycle-search "
                f"budget — candidate generation TRUNCATED for this SCC. Consider a lower "
                f"--max-depth if this is unexpected.",
                file=sys.stderr,
            )

    rings = []
    seen_keys = set()
    for cycle in all_cycles:
        key = canonical_key(cycle)
        if key in seen_keys:
            continue  # defensive net; find_cycles_in_scc should already guarantee uniqueness
        seen_keys.add(key)
        hops = _build_hops(cycle, edge_invoices)
        if hops is None:
            continue
        rings.append({
            "canonical_key": key,
            "closure_type": "transaction",
            "entities": cycle,
            "hops": hops,
        })

    return assign_ring_ids(rings)


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

    transaction_n = sum(1 for r in rings if r["closure_type"] == "transaction")
    print(f"[graph.run] wrote {len(rings)} ring(s) ({transaction_n} transaction-closed) to {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
