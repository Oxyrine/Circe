"""Shared invariants every ring-producing stage (cycles.py, corporate.py, and
the M0 stub in run.py) must use identically, or ring_id/canonical_key drift
between runs and it looks like a scoring bug for an hour before anyone
suspects ids.
"""
from __future__ import annotations


def canonical_key(entity_ids: list[str]) -> str:
    """Lexicographically smallest ROTATION of the entity-id tuple.

    Rotations only, never reflections — a ring has a direction (who invoices
    whom) and that direction is meaningful evidence, so E001|E002|E003 and
    E001|E003|E002 are different rings, not the same ring found twice.

    A 3-cycle is discovered once per starting node during DFS; without this,
    the same ring is emitted three times and precision@k is meaningless.
    """
    if not entity_ids:
        raise ValueError("cannot compute canonical_key for an empty ring")
    n = len(entity_ids)
    rotations = [entity_ids[i:] + entity_ids[:i] for i in range(n)]
    best = min(rotations)
    return "|".join(best)


def pick_representative_invoice(candidates: list[dict]) -> dict:
    """Deterministic across reruns: earliest invoice_date represents the
    initiating transaction on that leg; invoice_id breaks ties.

    M4 hardening: invoice_date/invoice_id are required by the current
    schema, but the sort key is defensive anyway — a missing or null
    invoice_date sorts first (empty string) rather than raising KeyError
    or TypeError (None can't be compared to a string in Python 3). This
    matters even under a strict schema: better to degrade to a stable,
    arbitrary-but-deterministic choice than to crash the whole pipeline
    over one messy record, live, on stage.
    """
    def sort_key(inv: dict) -> tuple[str, str]:
        date = inv.get("invoice_date") or ""
        inv_id = inv.get("invoice_id") or ""
        return (date, inv_id)

    return min(candidates, key=sort_key)


def build_invoice_hops(
    nodes: list[str],
    edge_invoices: dict[tuple[str, str], list[dict]],
    wrap: bool,
) -> list[dict] | None:
    """Build hop_type='invoice' hops along nodes[0]->nodes[1]->...->nodes[-1].

    wrap=True includes the closing edge nodes[-1]->nodes[0] too (a full
    transaction-closed cycle). wrap=False stops at nodes[-1] — the
    remaining closure is a corporate_bridge hop the caller appends
    separately, since that edge has no real invoice behind it.

    Returns None if any required edge has no real invoice — defensive;
    every edge here came from the same graph these nodes were found in,
    so this should never actually trigger.

    M4 hardening: hs_code/invoice_date/discounting_date degrade to null
    on a missing field rather than crashing — these are exactly the
    fields spec §8.3's messiness injection targets, and emitting the ring
    with a gap (for A's signals to handle: abstain, don't crash) is the
    whole point of candidate generation being "cheap, high recall,
    deliberately over-inclusive," not a data-quality gate. `value`,
    `invoice_id`, `from`, `to` stay hard-required: silently defaulting a
    missing `value` (e.g. to 0) would corrupt S_value's net-position math
    in a way that's invisible rather than absent — a wrong number is
    worse than a missing ring, so those fail loudly instead.
    """
    hops = []
    n = len(nodes)
    edge_count = n if wrap else n - 1
    for i in range(edge_count):
        u, v = nodes[i], nodes[(i + 1) % n]
        candidates = edge_invoices.get((u, v))
        if not candidates:
            return None
        inv = pick_representative_invoice(candidates)
        hops.append({
            "hop_type": "invoice",
            "from": u, "to": v,
            "invoice_id": inv["invoice_id"],
            "value": inv["value"],
            "hs_code": inv.get("hs_code"),
            "invoice_date": inv.get("invoice_date"),
            "discounting_date": inv.get("discounting_date"),
        })
    return hops


def assign_ring_ids(rings: list[dict]) -> list[dict]:
    """Assign ring_id by SORTED canonical_key, never by discovery order.

    Discovery order depends on dict/set iteration and DFS traversal details
    that can change between runs on identical input. Sorting on
    canonical_key first is what makes two runs on the same dataset diff
    empty — required so reruns don't churn git or reshuffle the viz.
    """
    ordered = sorted(rings, key=lambda r: r["canonical_key"])
    for i, ring in enumerate(ordered, start=1):
        ring["ring_id"] = f"R{i:02d}"
    return ordered
