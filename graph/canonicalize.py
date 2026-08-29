"""Entity canonicalization — resolves firms appearing under multiple
identifiers, name variants, or address formats into single nodes.

Ships as an IDENTITY FUNCTION for M0/M1: everything maps to itself. This is
deliberate, not a shortcut — it means the pipeline's shape (function
signature, call site in run.py) is final at hour 1, and only the internals
change when the real version lands at M3.5 (hours 24-28), after
corporate-graph closure (M3) is solid. If M3 is shaky at hour 24, this stays
an identity function — honest, and the pipeline already accommodates it
without a rewrite.

Real version (M3.5) does double duty: spec §6 Step 0 (required before any
graph work) AND §8.3 messiness robustness (entity aliasing under injected
data-quality noise). Blocking on normalized name + address, union-find merge.
"""
from __future__ import annotations

import sys


def canonicalize(entities: list[dict]) -> dict[str, str]:
    """Return a map of entity_id -> canonical_entity_id.

    Identity mapping for now: every entity maps to itself.

    M4 hardening: an entity record missing `id` is skipped, loudly — it
    can't be canonicalized to anything, and the rest of the pipeline
    already treats an id absent from this map by falling back to the raw
    value it was given (see transaction_graph.build_transaction_graph's
    canon_map.get(x, x)), so omitting it here is safe, not silent-drop.
    """
    result = {}
    skipped = 0
    for e in entities:
        eid = e.get("id")
        if not eid:
            skipped += 1
            continue
        result[eid] = eid

    if skipped:
        print(f"[graph.canonicalize] WARNING: skipped {skipped} entity record(s) missing id", file=sys.stderr)

    return result
