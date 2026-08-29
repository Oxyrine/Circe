"""Corporate-graph closure — the project's stated differentiator (spec §3,
§6 Step 2). Bridges an open PATH through the transaction graph into a ring
using entity metadata instead of a transaction, so a fragment that never
fully reaches the platform still surfaces instead of vanishing.

Evidence is DIRECT and pairwise only, never transitive through a union-find
cluster: a bridge from E012 to E010 must be justified by E012 and E010
THEMSELVES sharing a director, an exact registered address, or an exact
registration date — not by both separately connecting to some third
entity. A transitive claim is weaker and more confusing than the schema's
bridge_evidence (one director_id, one address, one date) is built to
carry, and it invites exactly the "wait, do these two actually share a
director?" question in Q&A that direct evidence avoids.

If a real invoice already closes the loop (v -> u exists for real), this
is a transaction-closed ring that simply wasn't found at the current
--max-depth — NOT a corporate-bridged one. Claiming a bridge where a real
edge exists would be factually wrong, so that case is skipped here, not
just deduplicated later.
"""
from __future__ import annotations

import sys
from collections import defaultdict

from graph.ring_utils import build_invoice_hops, canonical_key

MAX_PATHS_PER_PAIR = 5_000
MAX_STEPS_PER_PAIR = 200_000

# When a pair qualifies on more than one attribute, the most specific /
# least coincidental evidence wins.
_KIND_PRIORITY = ["shared_director", "shared_address", "registration_cohort"]


def find_bridgeable_pairs(entities: list[dict]) -> dict[tuple[str, str], dict]:
    """Every ORDERED pair (a, b) of distinct entities that directly shares
    a director, an exact registered address, or an exact registration
    date. Both (a, b) and (b, a) are present — the transaction path this
    gets used to close can run either direction.

    Value: {"bridge_kind": ..., "bridge_evidence": {...}} using only
    attributes actually present in the data — no fabricated fields.

    M4 hardening: an entity missing `id` entirely can't be referenced by
    any bridge and is skipped, loudly. An entity missing `address` or
    `registration_date` just doesn't participate in THAT grouping — no
    crash, no fabricated match, same degrade-the-gap principle as
    ring_utils.build_invoice_hops. `directors` was already defensive
    (`.get(..., [])`).
    """
    by_director: dict[str, list[str]] = defaultdict(list)
    by_address: dict[str, list[str]] = defaultdict(list)
    by_reg_date: dict[str, list[str]] = defaultdict(list)

    skipped = 0
    for e in entities:
        eid = e.get("id")
        if not eid:
            skipped += 1
            continue
        for d in e.get("directors", []):
            by_director[d].append(eid)
        address = e.get("address")
        if address:
            by_address[address].append(eid)
        reg_date = e.get("registration_date")
        if reg_date:
            by_reg_date[reg_date].append(eid)

    if skipped:
        print(
            f"[graph.corporate] WARNING: skipped {skipped} entity record(s) missing id "
            f"— cannot be referenced by any bridge",
            file=sys.stderr,
        )

    pairs: dict[tuple[str, str], dict] = {}

    def _consider(a: str, b: str, kind: str, evidence: dict) -> None:
        for x, y in ((a, b), (b, a)):
            existing = pairs.get((x, y))
            if existing is None or _KIND_PRIORITY.index(kind) < _KIND_PRIORITY.index(existing["bridge_kind"]):
                pairs[(x, y)] = {"bridge_kind": kind, "bridge_evidence": evidence}

    for director_id, holders in by_director.items():
        for i in range(len(holders)):
            for j in range(i + 1, len(holders)):
                _consider(holders[i], holders[j], "shared_director", {"director_id": director_id})

    for address, holders in by_address.items():
        for i in range(len(holders)):
            for j in range(i + 1, len(holders)):
                _consider(holders[i], holders[j], "shared_address", {"address": address})

    for reg_date, holders in by_reg_date.items():
        for i in range(len(holders)):
            for j in range(i + 1, len(holders)):
                _consider(holders[i], holders[j], "registration_cohort", {"registration_date": reg_date})

    return pairs


def _paths_from_to(
    adj: dict[str, list[str]],
    u: str,
    v: str,
    max_path_entities: int,
) -> tuple[list[list[str]], bool]:
    """Every simple directed path u -> ... -> v with 3 <= len(path) <=
    max_path_entities entities, each node visited at most once. The floor
    is 3, not 2: total ring hops == len(path) (same arithmetic as a
    transaction cycle — (len(path)-1) invoice hops + 1 bridge hop), and
    the schema requires >=3 hops. A len(path)==2 "path" is just the direct
    edge u->v itself — bridging back over it would manufacture a bogus
    2-entity ring out of one real invoice, which is exactly what the
    already-transaction-closed guard in find_corporate_bridged_rings is
    supposed to prevent, not recreate through the back door.

    Iterative; same reasoning as cycles.py: a dense graph must degrade
    loudly under a step budget, not hang, well before the found-path
    budget matters.
    """
    paths: list[list[str]] = []
    steps = 0
    budget_hit = False

    stack: list[tuple[str, list[str], frozenset[str]]] = [(u, [u], frozenset({u}))]
    while stack:
        steps += 1
        if steps > MAX_STEPS_PER_PAIR:
            budget_hit = True
            break

        node, path, visited = stack.pop()
        for nxt in adj.get(node, []):
            if nxt == v:
                # Closing at v never needs "room after v", so this check
                # runs regardless of how close path already is to the cap
                # — mirroring the exact bug class fixed in cycles.py.
                if 3 <= len(path) + 1 <= max_path_entities:
                    paths.append(path + [v])
                    if len(paths) >= MAX_PATHS_PER_PAIR:
                        budget_hit = True
                        break
                continue
            if nxt in visited:
                continue
            if len(path) + 1 < max_path_entities:
                # Only extend if there's still room for at least one more
                # hop (the eventual v) within the cap.
                stack.append((nxt, path + [nxt], visited | {nxt}))
        if budget_hit:
            break

    return paths, budget_hit


def find_corporate_bridged_rings(
    entities: list[dict],
    adj: dict[str, list[str]],
    edge_invoices: dict[tuple[str, str], list[dict]],
    max_depth: int,
) -> tuple[list[dict], list[str]]:
    """All corporate-closed candidate rings (closure_type='corporate').
    Same return shape as cycles.find_transaction_closed_rings — no
    ring_id yet, assigned once after merging both sources in run.py.
    """
    warnings: list[str] = []
    rings: list[dict] = []
    seen_keys: set[str] = set()

    max_path_entities = max_depth - 1  # leave exactly one slot for the bridge hop
    if max_path_entities < 2:
        return rings, warnings

    direct_edges = set(edge_invoices.keys())
    bridgeable = find_bridgeable_pairs(entities)

    for (u, v), info in bridgeable.items():
        if (v, u) in direct_edges:
            continue  # a real invoice already closes this — not a corporate case

        paths, budget_hit = _paths_from_to(adj, u, v, max_path_entities)
        if budget_hit:
            warnings.append(
                f"bridgeable pair ({u}, {v}) hit its path-search budget — "
                f"corporate closure search TRUNCATED for this pair."
            )

        for path in paths:
            key = canonical_key(path)
            if key in seen_keys:
                continue
            hops = build_invoice_hops(path, edge_invoices, wrap=False)
            if hops is None:
                continue
            bridge_hop = {
                "hop_type": "corporate_bridge",
                "from": v, "to": u,
                "bridge_kind": info["bridge_kind"],
                "bridge_evidence": info["bridge_evidence"],
            }
            seen_keys.add(key)
            rings.append({
                "canonical_key": key,
                "closure_type": "corporate",
                "entities": path,
                "hops": hops + [bridge_hop],
            })

    return rings, warnings
