"""Builds the directed transaction graph shared by both transaction-closed
cycle search (cycles.py) and corporate-graph closure (corporate.py) — one
graph, two ways of finding a ring through it.
"""
from __future__ import annotations

import sys
from collections import defaultdict


def build_transaction_graph(
    canon_map: dict[str, str], invoices: list[dict]
) -> tuple[dict[str, list[str]], dict[tuple[str, str], list[dict]]]:
    """Returns (adj, edge_invoices).
    adj: canonical entity id -> sorted list of successor canonical ids.
    edge_invoices: (u, v) -> list of every real invoice from u to v.

    canon_map comes from canonicalize.canonicalize(), computed ONCE by
    the caller and threaded through to both this function and
    corporate.find_corporate_bridged_rings — computing it twice, or
    letting one caller skip it, would let the two halves of the pipeline
    silently disagree on what a given entity id even refers to.

    Self-loop invoices are dropped after remapping through canon_map, not
    before: two DIFFERENT raw ids that canonicalize to the same firm
    invoicing each other is exactly the self-dealing pattern this filter
    exists to catch, not a coincidence to preserve.

    M4 hardening: an invoice missing `from`, `to`, or `value` can't form a
    valid graph edge at all — there's no gap to degrade gracefully around,
    unlike a missing hs_code or date (see ring_utils.build_invoice_hops).
    Such a record is skipped and counted, LOUDLY, rather than raising and
    taking the entire run down over one bad row among possibly thousands
    of good ones.
    """
    edge_invoices: dict[tuple[str, str], list[dict]] = defaultdict(list)
    adj_sets: dict[str, set[str]] = defaultdict(set)

    self_loops = 0
    malformed = 0
    for inv in invoices:
        frm, to, value = inv.get("from"), inv.get("to"), inv.get("value")
        if not frm or not to or value is None:
            malformed += 1
            continue
        u = canon_map.get(frm, frm)
        v = canon_map.get(to, to)
        if u == v:
            self_loops += 1
            continue
        adj_sets[u].add(v)
        edge_invoices[(u, v)].append(inv)

    if self_loops:
        print(f"[graph] skipped {self_loops} self-loop invoice(s)", file=sys.stderr)
    if malformed:
        print(
            f"[graph] WARNING: skipped {malformed} invoice(s) missing from/to/value "
            f"— cannot form a graph edge, not a degradable gap",
            file=sys.stderr,
        )

    adj = {node: sorted(neighbors) for node, neighbors in adj_sets.items()}
    return adj, dict(edge_invoices)
