"""M4: the pipeline must never crash on messy input, and must never
silently drop a ring over one degradable gap (missing HS code, missing
date). It's allowed to skip an individual record that can't form a valid
edge/node at all (missing from/to/value, missing entity id) — but only
loudly, with a warning, never silently."""
from graph.canonicalize import canonicalize
from graph.corporate import find_bridgeable_pairs
from graph.run import find_candidate_rings
from graph.tests.test_run_pipeline import _entity, _invoice


# ---------- degradable gaps: ring still produced, field goes null ----------

def test_missing_hs_code_still_produces_the_ring():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01", hs=None),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    hop = next(h for h in rings[0]["hops"] if h["invoice_id"] == "I001")
    assert hop["hs_code"] is None


def test_missing_discounting_date_does_not_crash():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        {"invoice_id": "I001", "from": "E001", "to": "E002", "value": 1_000_000,
         "hs_code": "72081000", "invoice_date": "2026-01-01"},  # no discounting_date key at all
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    hop = next(h for h in rings[0]["hops"] if h["invoice_id"] == "I001")
    assert hop["discounting_date"] is None


def test_missing_invoice_date_does_not_crash_and_sorts_first():
    # A dated and an undated invoice on the same leg — must not raise
    # (None can't be compared to a string in Python 3) and must resolve
    # deterministically (missing sorts first).
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        {"invoice_id": "I001a", "from": "E001", "to": "E002", "value": 1_000_000,
         "hs_code": "72081000", "discounting_date": "2026-01-10"},  # no invoice_date key
        _invoice("I001b", "E001", "E002", 5_000_000, "2026-02-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    hop = next(h for h in rings[0]["hops"] if h["from"] == "E001" and h["to"] == "E002")
    assert hop["invoice_id"] == "I001a"  # missing date sorts first, deterministically
    assert hop["invoice_date"] is None


# ---------- duplicate invoices on the same pair ----------

def test_duplicate_invoices_same_pair_exact_date_tie_breaks_on_id():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        _invoice("I001b", "E001", "E002", 5_000_000, "2026-01-01"),  # same date, higher id
        _invoice("I001a", "E001", "E002", 1_000_000, "2026-01-01"),  # same date, lower id
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    hop = next(h for h in rings[0]["hops"] if h["from"] == "E001" and h["to"] == "E002")
    assert hop["invoice_id"] == "I001a"  # lexicographically smaller id wins the tie


def test_many_duplicate_invoices_same_pair_no_crash():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    dup_invoices = [_invoice(f"I001-{i}", "E001", "E002", 1_000_000 + i, f"2026-01-{i+1:02d}") for i in range(20)]
    invoices = dup_invoices + [
        _invoice("I002", "E002", "E003", 1_020_000, "2026-02-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-02-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1  # 20 candidate invoices on one leg collapse to exactly 1 hop


# ---------- malformed records: skipped loudly, rest of the run survives ----------

def test_invoice_missing_from_is_skipped_not_a_crash(capsys):
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        {"invoice_id": "IBAD", "to": "E002", "value": 1_000_000,
         "hs_code": None, "invoice_date": "2026-01-01", "discounting_date": "2026-01-01"},
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1  # the real cycle is still found around the one bad record
    assert "skipped 1 invoice" in capsys.readouterr().err


def test_invoice_missing_value_is_skipped_not_a_crash():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    invoices = [
        {"invoice_id": "IBAD", "from": "E001", "to": "E002",
         "hs_code": None, "invoice_date": "2026-01-01", "discounting_date": "2026-01-01"},
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    hop = next(h for h in rings[0]["hops"] if h["from"] == "E001" and h["to"] == "E002")
    assert hop["invoice_id"] == "I001"  # the malformed duplicate never entered edge_invoices


def test_entity_missing_id_is_skipped_not_a_crash(capsys):
    entities = [
        {"name": "no id here", "industry_code": "NIC-0000", "industry_class": "manufacturing",
         "directors": [], "address": "somewhere", "registration_date": "2020-01-01"},
        _entity("E001"), _entity("E002"), _entity("E003"),
    ]
    canon_map = canonicalize(entities)
    assert len(canon_map) == 3  # the id-less record contributed nothing, didn't crash
    assert "skipped 1 entity" in capsys.readouterr().err

    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1


def test_entity_missing_address_still_bridges_via_director():
    # Missing address must not crash find_bridgeable_pairs, and must not
    # block a bridge that's justified by a DIFFERENT shared attribute.
    entities = [
        {"id": "E001", "name": "E001", "industry_code": "NIC-0000", "industry_class": "manufacturing",
         "directors": ["D1"], "registration_date": "2020-01-01"},  # no address key at all
        _entity("E002"),
        _entity("E003", directors=["D1"]),
    ]
    pairs = find_bridgeable_pairs(entities)
    assert pairs[("E001", "E003")]["bridge_kind"] == "shared_director"


# ---------- combined stress: everything messy at once, still finds the real cycle ----------

def test_combined_messiness_still_finds_the_real_cycle(capsys):
    entities = [
        _entity("E001"), _entity("E002"), _entity("E003"),  # the real cycle
        _entity("E100"), _entity("E101"), _entity("E102"),  # isolated singletons, no edges at all
        {"name": "malformed, no id"},  # unusable entity record
    ]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01", hs=None),  # missing HS code
        {"invoice_id": "I002", "from": "E002", "to": "E003", "value": 1_020_000,
         "hs_code": "72081000", "discounting_date": "2026-01-06"},  # missing invoice_date
        _invoice("I003", "E003", "E001", 995_000, "2026-01-09"),
        _invoice("I999", "E100", "E100", 500_000, "2026-01-01"),  # self-loop
        {"invoice_id": "IBAD", "to": "E101", "value": 1, "hs_code": None,
         "invoice_date": "2026-01-01", "discounting_date": "2026-01-01"},  # missing 'from'
    ]

    rings = find_candidate_rings(entities, invoices, max_depth=8)

    assert len(rings) == 1
    assert rings[0]["closure_type"] == "transaction"
    assert set(rings[0]["entities"]) == {"E001", "E002", "E003"}

    stderr = capsys.readouterr().err
    assert "self-loop" in stderr
    assert "skipped 1 invoice" in stderr
    assert "skipped 1 entity" in stderr
