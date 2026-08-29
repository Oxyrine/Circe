"""Corporate-graph closure: bridgeable-pair detection, path search bounds,
and the end-to-end demo case — a ring with its closing invoice deliberately
removed still surfaces, flagged corporate, with real evidence."""
import time

from graph.corporate import (
    MAX_STEPS_PER_PAIR,
    _paths_from_to,
    find_bridgeable_pairs,
    find_corporate_bridged_rings,
)
from graph.run import find_candidate_rings
from graph.tests.test_run_pipeline import _entity, _invoice
from graph.transaction_graph import build_transaction_graph


# ---------- find_bridgeable_pairs ----------

def test_shared_director_makes_a_bridgeable_pair():
    entities = [
        _entity("E001", directors=["D1"]),
        _entity("E002", directors=["D1"]),
        _entity("E003"),
    ]
    pairs = find_bridgeable_pairs(entities)
    assert pairs[("E001", "E002")]["bridge_kind"] == "shared_director"
    assert pairs[("E001", "E002")]["bridge_evidence"] == {"director_id": "D1"}
    assert pairs[("E002", "E001")]["bridge_kind"] == "shared_director"  # both directions
    assert ("E001", "E003") not in pairs


def test_shared_address_makes_a_bridgeable_pair():
    entities = [
        _entity("E001", address="12 MG Road"),
        _entity("E002", address="12 MG Road"),
        _entity("E003", address="somewhere else"),
    ]
    pairs = find_bridgeable_pairs(entities)
    assert pairs[("E001", "E002")]["bridge_kind"] == "shared_address"
    assert pairs[("E001", "E002")]["bridge_evidence"] == {"address": "12 MG Road"}


def test_shared_registration_date_makes_a_bridgeable_pair():
    entities = [
        _entity("E001", reg_date="2024-11-03"),
        _entity("E002", reg_date="2024-11-03"),
        _entity("E003", reg_date="2019-01-01"),
    ]
    pairs = find_bridgeable_pairs(entities)
    assert pairs[("E001", "E002")]["bridge_kind"] == "registration_cohort"
    assert pairs[("E001", "E002")]["bridge_evidence"] == {"registration_date": "2024-11-03"}


def test_no_shared_attribute_is_not_bridgeable():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    pairs = find_bridgeable_pairs(entities)
    assert pairs == {}


def test_shared_director_outranks_shared_address():
    # Both attributes match — the more specific/less coincidental one wins.
    entities = [
        _entity("E001", directors=["D1"], address="same place"),
        _entity("E002", directors=["D1"], address="same place"),
    ]
    pairs = find_bridgeable_pairs(entities)
    assert pairs[("E001", "E002")]["bridge_kind"] == "shared_director"


def test_evidence_is_never_transitive_through_a_third_entity():
    # E001-E002 share a director; E002-E003 share an (different) address.
    # E001 and E003 share NOTHING directly and must not be bridgeable,
    # even though they're connected via E002.
    entities = [
        _entity("E001", directors=["D1"]),
        _entity("E002", directors=["D1"], address="shared address"),
        _entity("E003", address="shared address"),
    ]
    pairs = find_bridgeable_pairs(entities)
    assert ("E001", "E003") not in pairs
    assert ("E003", "E001") not in pairs


# ---------- _paths_from_to ----------

def test_paths_from_to_respects_max_entities_cap():
    # A -> B -> C -> D -> E, looking for A -> E.
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": ["E"], "E": []}
    paths, budget_hit = _paths_from_to(adj, "A", "E", max_path_entities=4)
    assert paths == []  # needs 5 entities, cap is 4
    assert not budget_hit
    paths, budget_hit = _paths_from_to(adj, "A", "E", max_path_entities=5)
    assert paths == [["A", "B", "C", "D", "E"]]


def test_paths_from_to_rejects_the_bare_direct_edge():
    # A direct edge A->B is not a valid "path to bridge" on its own —
    # total ring hops would be 2 (1 invoice + 1 bridge), below the
    # schema's minItems:3. Only A->X->B and longer qualify.
    adj = {"A": ["B", "X"], "X": ["B"], "B": []}
    paths, budget_hit = _paths_from_to(adj, "A", "B", max_path_entities=8)
    assert paths == [["A", "X", "B"]]  # the direct A->B edge itself is excluded


def test_paths_from_to_finds_nothing_when_disconnected():
    adj = {"A": ["B"], "B": [], "X": ["Y"], "Y": []}
    paths, budget_hit = _paths_from_to(adj, "A", "Y", max_path_entities=8)
    assert paths == []
    assert not budget_hit


def test_dense_pair_search_hits_step_budget_not_a_hang():
    n = 16
    names = [f"N{i:02d}" for i in range(n)]
    adj = {u: [v for v in names if v != u] for u in names}
    start = time.time()
    paths, budget_hit = _paths_from_to(adj, "N00", "N15", max_path_entities=8)
    elapsed = time.time() - start
    assert budget_hit is True
    assert elapsed < 10, f"dense pair search took {elapsed:.1f}s — must degrade loudly, not hang"


# ---------- end-to-end: THE demo test ----------

def test_removed_leg_still_surfaces_flagged_corporate():
    # E001 -> E002 -> E003 are real invoices. E003 -> E001 (the closing
    # leg) does NOT exist in invoices.json at all — it never reached the
    # platform. But E003 and E001 share a director, so corporate-graph
    # closure should surface this as a corporate-closed ring anyway. This
    # is the single test that IS the demo (spec §3): partial visibility
    # degrades gracefully instead of returning nothing.
    entities = [
        _entity("E001", directors=["D7"]),
        _entity("E002"),
        _entity("E003", directors=["D7"]),
    ]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        # no I003: E003 -> E001 never happened on the platform
    ]

    rings = find_candidate_rings(entities, invoices, max_depth=8)

    assert len(rings) == 1
    ring = rings[0]
    assert ring["closure_type"] == "corporate"
    assert set(ring["entities"]) == {"E001", "E002", "E003"}

    bridges = [h for h in ring["hops"] if h["hop_type"] == "corporate_bridge"]
    assert len(bridges) == 1
    bridge = bridges[0]
    assert bridge["from"] == "E003" and bridge["to"] == "E001"
    assert bridge["bridge_kind"] == "shared_director"
    assert bridge["bridge_evidence"] == {"director_id": "D7"}

    invoice_hops = [h for h in ring["hops"] if h["hop_type"] == "invoice"]
    assert len(invoice_hops) == 2
    assert {h["invoice_id"] for h in invoice_hops} == {"I001", "I002"}


def test_no_bridge_when_no_shared_corporate_attribute():
    # Same broken path as above, but E001 and E003 share nothing this
    # time — corporate closure must NOT invent a bridge out of nowhere.
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert rings == []


def test_no_corporate_ring_when_real_closing_invoice_exists():
    # E001 and E003 DO share a director, but a real invoice E003 -> E001
    # also exists — this is genuinely transaction-closed, and must be
    # reported as such, never double-claimed as a corporate bridge too.
    entities = [
        _entity("E001", directors=["D7"]),
        _entity("E002"),
        _entity("E003", directors=["D7"]),
    ]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    assert rings[0]["closure_type"] == "transaction"


def test_find_corporate_bridged_rings_returns_no_ring_id_yet():
    entities = [_entity("E001", directors=["D1"]), _entity("E002"), _entity("E003", directors=["D1"])]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
    ]
    adj, edge_invoices = build_transaction_graph(entities, invoices)
    rings, warnings = find_corporate_bridged_rings(entities, adj, edge_invoices, max_depth=8)
    assert len(rings) == 1
    assert "ring_id" not in rings[0]
    assert warnings == []
