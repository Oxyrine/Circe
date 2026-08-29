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
