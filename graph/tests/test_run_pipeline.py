"""End-to-end test of find_candidate_rings() against small hand-built
entities/invoices — never C's dataset, that's exercised separately in
scripts, not asserted on in this test suite since it can change."""
from graph.run import find_candidate_rings


def _entity(id_, industry="manufacturing"):
    return {
        "id": id_, "name": id_, "industry_code": "NIC-0000",
        "industry_class": industry, "directors": [], "address": "n/a",
        "registration_date": "2020-01-01",
    }


def _invoice(inv_id, u, v, value, date, hs="72081000"):
    return {
        "invoice_id": inv_id, "from": u, "to": v, "value": value,
        "hs_code": hs, "invoice_date": date, "discounting_date": date,
    }


def test_pure_path_graph_returns_zero_rings():
    # B's own plan calls this out: a pure path returning zero cycles
    # catches more bugs than any other test. E001 -> E002 -> E003, no
    # closing edge back to E001 at all.
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_000_000, "2026-01-05"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert rings == []


def test_single_clean_3hop_cycle_is_found():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    ring = rings[0]
    assert ring["closure_type"] == "transaction"
    assert ring["ring_id"] == "R01"
    assert set(ring["entities"]) == {"E001", "E002", "E003"}
    assert all(h["hop_type"] == "invoice" for h in ring["hops"])
    assert {h["invoice_id"] for h in ring["hops"]} == {"I001", "I002", "I003"}


def test_representative_invoice_is_earliest_date_deterministically():
    # Two invoices on the same leg E001->E002: the earlier date must win,
    # regardless of input order or value, so reruns are deterministic.
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I002", "E001", "E002", 5_000_000, "2026-02-01"),  # later, listed first
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),  # earlier
        _invoice("I003", "E002", "E003", 1_000_000, "2026-01-05"),
        _invoice("I004", "E003", "E001", 1_000_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    hop = next(h for h in rings[0]["hops"] if h["from"] == "E001" and h["to"] == "E002")
    assert hop["invoice_id"] == "I001"


def test_self_loop_invoice_is_ignored():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I000", "E001", "E001", 1, "2026-01-01"),  # self-loop, ignored
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_000_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 1_000_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1  # the real 3-cycle, not corrupted by the self-loop


def test_empty_input_falls_back_to_m0_stub():
    rings = find_candidate_rings([], [], max_depth=8)
    assert len(rings) == 2
    assert {r["closure_type"] for r in rings} == {"transaction", "corporate"}


def test_output_is_deterministic_across_repeated_calls():
    entities = [_entity("E001"), _entity("E002"), _entity("E003"), _entity("E010"), _entity("E011"), _entity("E012")]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
        _invoice("I010", "E010", "E011", 2_000_000, "2026-01-01"),
        _invoice("I011", "E011", "E012", 2_010_000, "2026-01-05"),
        _invoice("I012", "E012", "E010", 1_990_000, "2026-01-09"),
    ]
    run1 = find_candidate_rings(entities, invoices, max_depth=8)
    run2 = find_candidate_rings(entities, invoices, max_depth=8)
    assert run1 == run2
    assert [r["ring_id"] for r in run1] == ["R01", "R02"]
