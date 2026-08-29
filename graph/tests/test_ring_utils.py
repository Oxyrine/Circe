"""Tests for the three load-bearing invariants in ring_utils.py.
These are testable at M0, before any real cycle-detection code exists."""
from graph.ring_utils import assign_ring_ids, canonical_key


def test_canonical_key_is_rotation_invariant():
    # The same 3-cycle entered from any of its three starting nodes must
    # produce the same canonical_key — this is the rotation-invariant
    # dedup property. Without it, one ring gets emitted three times.
    assert canonical_key(["E001", "E002", "E003"]) == canonical_key(["E002", "E003", "E001"])
    assert canonical_key(["E001", "E002", "E003"]) == canonical_key(["E003", "E001", "E002"])


def test_canonical_key_is_not_reflection_invariant():
    # Direction is meaningful evidence (who invoices whom) — reversing the
    # ring is a DIFFERENT ring, not the same one found the other way.
    forward = canonical_key(["E001", "E002", "E003"])
    reversed_ring = canonical_key(["E001", "E003", "E002"])
    assert forward != reversed_ring


def test_canonical_key_picks_lexicographically_smallest_rotation():
    assert canonical_key(["E003", "E001", "E002"]) == "E001|E002|E003"


def test_assign_ring_ids_orders_by_canonical_key_not_input_order():
    rings = [
        {"canonical_key": "E010|E011|E012"},
        {"canonical_key": "E001|E002|E003"},
    ]
    result = assign_ring_ids(rings)
    assert result[0]["canonical_key"] == "E001|E002|E003"
    assert result[0]["ring_id"] == "R01"
    assert result[1]["canonical_key"] == "E010|E011|E012"
    assert result[1]["ring_id"] == "R02"


def test_assign_ring_ids_is_deterministic_across_calls():
    rings_a = [{"canonical_key": "E010|E011|E012"}, {"canonical_key": "E001|E002|E003"}]
    rings_b = [{"canonical_key": "E001|E002|E003"}, {"canonical_key": "E010|E011|E012"}]
    result_a = assign_ring_ids(rings_a)
    result_b = assign_ring_ids(rings_b)
    assert [r["ring_id"] for r in result_a] == [r["ring_id"] for r in result_b]
