"""Depth-limited DFS for simple cycles inside one SCC.

Johnson's algorithm enumerates ALL elementary cycles and is output-sensitive
with no native length bound — a dense SCC can still blow it up (spec §6
note). Depth-limited DFS gives the hop cap directly and is simpler.

Two independent budgets, both iterative (no recursion):

  MAX_CYCLES_PER_SCC  caps cycles actually FOUND (the spec's ~50k number).
  MAX_STEPS_PER_SCC   caps DFS node-expansions, i.e. paths explored whether
                       or not they complete into a cycle.

The second cap exists because a dense SCC can be combinatorially expensive
in PATH exploration long before 50k cycles are found — e.g. a 30-node SCC
at ~40% density has millions of simple paths of length <=8 even if only a
few thousand of them close into cycles. Without this, "cap cycles emitted"
does not actually prevent a hang; it just delays it. A dense SCC must
degrade loudly, not hang during the demo.
"""
from __future__ import annotations

from graph.ring_utils import build_invoice_hops, canonical_key
from graph.scc import non_trivial_sccs

MAX_CYCLES_PER_SCC = 50_000
MAX_STEPS_PER_SCC = 2_000_000


def find_cycles_in_scc(
    scc_nodes: set[str],
    scc_adj: dict[str, list[str]],
    max_depth: int,
) -> tuple[list[list[str]], bool]:
    """Every simple cycle of length 3..max_depth within the SCC, each
    discovered EXACTLY ONCE: a cycle is only ever explored starting from its
    lexicographically smallest node, and the DFS refuses to visit any node
    smaller than that start. This is what makes canonical_key dedup a
    safety net rather than load-bearing — the same 3-cycle entered from
    three different nodes is never generated three times in the first
    place.

    Returns (cycles, budget_hit). budget_hit means either budget above was
    reached and the SCC's cycle search was truncated — the caller must log
    this loudly, since it means candidate generation is incomplete for this
    SCC.
    """
    cycles: list[list[str]] = []
    steps = 0
    budget_hit = False

    for start in sorted(scc_nodes):
        if budget_hit:
            break

        # explicit stack: (current_node, path_so_far, visited_set)
        stack: list[tuple[str, list[str], frozenset[str]]] = [
            (start, [start], frozenset({start}))
        ]

        while stack:
            steps += 1
            if steps > MAX_STEPS_PER_SCC:
                budget_hit = True
                break

            node, path, visited = stack.pop()

            for nxt in scc_adj.get(node, []):
                if nxt < start:
                    continue  # would be canonically found starting from nxt
                if nxt == start:
                    # Closing the ring never adds a node beyond len(path),
                    # so this check must run even when len(path) == max_depth
                    # — only NEW extensions are subject to the depth cap.
                    if len(path) >= 3:
                        cycles.append(path)
                        if len(cycles) >= MAX_CYCLES_PER_SCC:
                            budget_hit = True
                            break
                    continue
                if nxt in visited:
                    continue
                if len(path) >= max_depth:
                    continue  # extending would exceed the depth cap
                stack.append((nxt, path + [nxt], visited | {nxt}))

            if budget_hit:
                break

    return cycles, budget_hit


def find_transaction_closed_rings(
    adj: dict[str, list[str]],
    edge_invoices: dict[tuple[str, str], list[dict]],
    max_depth: int,
) -> tuple[list[dict], list[str]]:
    """All transaction-closed candidate rings (closure_type='transaction')
    across every non-trivial SCC. Returns (rings, warnings) — rings have
    canonical_key/closure_type/entities/hops but NOT ring_id yet, since
    that's assigned once at the end after merging with corporate-closed
    rings (run.py's job).
    """
    warnings: list[str] = []
    rings: list[dict] = []
    seen_keys: set[str] = set()

    for scc_nodes in non_trivial_sccs(adj):
        scc_node_set = set(scc_nodes)
        scc_adj = {n: [w for w in adj.get(n, []) if w in scc_node_set] for n in scc_nodes}
        cycles, budget_hit = find_cycles_in_scc(scc_node_set, scc_adj, max_depth)
        if budget_hit:
            warnings.append(
                f"SCC of size {len(scc_nodes)} hit its cycle-search budget — "
                f"candidate generation TRUNCATED for this SCC."
            )
        for cycle in cycles:
            key = canonical_key(cycle)
            if key in seen_keys:
                continue  # defensive net; find_cycles_in_scc already guarantees uniqueness
            hops = build_invoice_hops(cycle, edge_invoices, wrap=True)
            if hops is None:
                continue
            seen_keys.add(key)
            rings.append({
                "canonical_key": key,
                "closure_type": "transaction",
                "entities": cycle,
                "hops": hops,
            })

    return rings, warnings
