"""Real entity canonicalization: blocking on normalized name + address,
never on either alone (that stays corporate.py's job), plus the flagship
end-to-end case — a corporate bridge that's only findable after merging
two aliases' director records together."""
from graph.canonicalize import apply_canonicalization, canonicalize, normalize_address, normalize_name
from graph.run import find_candidate_rings
from graph.tests.test_run_pipeline import _entity, _invoice


# ---------- normalization ----------

def test_normalize_name_collapses_suffix_variants():
    assert normalize_name("Vertex Steel Private Limited") == "vertex steel pvt ltd"
    assert normalize_name("VERTEX STEEL PVT. LTD.") == "vertex steel pvt ltd"
    assert normalize_name("Vertex Steel Ltd") == "vertex steel ltd"


def test_normalize_address_collapses_street_type_abbreviations():
    assert normalize_address("12 MG Road, Bengaluru 560001") == normalize_address("12 MG Rd, Bengaluru 560001")
    assert normalize_address("18 Avinashi Street") == normalize_address("18 avinashi st")


# ---------- blocking: name AND address, never either alone ----------

def test_matching_name_and_address_merges():
    entities = [
        _entity("E002", address="12 MG Road, Bengaluru"),
        _entity("E001", address="12 MG Road, Bengaluru"),
    ]
    entities[0]["name"] = "Vertex Steel Private Limited"
    entities[1]["name"] = "VERTEX STEEL PVT. LTD."
    canon_map = canonicalize(entities)
    assert canon_map["E001"] == canon_map["E002"] == "E001"  # smallest id wins


def test_same_address_different_name_does_not_merge():
    # A shared building housing two genuinely different firms — must stay
    # distinct nodes so corporate.py can still bridge them via
    # shared_address as two separate entities, not silently fuse them.
    entities = [
        _entity("E001", address="Business Park, Tower A"),
        _entity("E002", address="Business Park, Tower A"),
    ]
    entities[0]["name"] = "Alpha Trading Ltd"
    entities[1]["name"] = "Beta Distribution Ltd"
    canon_map = canonicalize(entities)
    assert canon_map["E001"] == "E001"
    assert canon_map["E002"] == "E002"


def test_same_name_different_address_does_not_merge():
    entities = [
        _entity("E001", address="12 MG Road"),
        _entity("E002", address="45 Anna Salai"),
    ]
    entities[0]["name"] = "Vertex Steel Ltd"
    entities[1]["name"] = "Vertex Steel Ltd"
    canon_map = canonicalize(entities)
    assert canon_map["E001"] == "E001"
    assert canon_map["E002"] == "E002"


def test_three_way_merge():
    entities = [_entity("E003", address="1 X Road"), _entity("E001", address="1 X Road"), _entity("E002", address="1 X Road")]
    for e in entities:
        e["name"] = "Same Firm Ltd"
    canon_map = canonicalize(entities)
    assert canon_map["E001"] == canon_map["E002"] == canon_map["E003"] == "E001"


def test_unrelated_entities_stay_singletons():
    entities = [_entity("E001"), _entity("E002"), _entity("E003")]
    canon_map = canonicalize(entities)
    assert canon_map == {"E001": "E001", "E002": "E002", "E003": "E003"}


def test_entities_both_missing_name_and_address_do_not_accidentally_collide():
    entities = [
        {"id": "E001", "directors": [], "registration_date": "2020-01-01",
         "industry_code": "NIC-0000", "industry_class": "manufacturing"},
        {"id": "E002", "directors": [], "registration_date": "2020-01-01",
         "industry_code": "NIC-0000", "industry_class": "manufacturing"},
    ]
    canon_map = canonicalize(entities)
    assert canon_map == {"E001": "E001", "E002": "E002"}  # NOT merged with each other


# ---------- apply_canonicalization ----------

def test_apply_canonicalization_merges_directors_as_union():
    entities = [
        _entity("E002", address="1 X Road", directors=["D2"]),
        _entity("E001", address="1 X Road", directors=["D1"]),
    ]
    for e in entities:
        e["name"] = "Same Firm Ltd"
    canon_map = canonicalize(entities)
    merged = apply_canonicalization(entities, canon_map)
    assert len(merged) == 1
    assert merged[0]["id"] == "E001"
    assert merged[0]["directors"] == ["D1", "D2"]


def test_apply_canonicalization_base_fields_come_from_the_canonical_record():
    entities = [
        _entity("E002", address="1 X Road", industry="trading"),
        _entity("E001", address="1 X Road", industry="manufacturing"),
    ]
    entities[0]["name"] = "Same Firm Ltd"
    entities[1]["name"] = "Same Firm Ltd"
    canon_map = canonicalize(entities)
    merged = apply_canonicalization(entities, canon_map)
    assert len(merged) == 1
    assert merged[0]["id"] == "E001"
    assert merged[0]["industry_class"] == "manufacturing"  # E001's own record, not E002's


# ---------- end-to-end composition with the rest of the pipeline ----------

def test_invoice_between_two_aliases_becomes_a_filtered_self_loop():
    # E001 and E001B are the same real firm under two registrations. An
    # "invoice" between them is self-dealing once merged, not a real
    # inter-firm transaction — must vanish via the self-loop filter, not
    # cause a crash or a spurious 2-node ring.
    entities = [
        _entity("E001", address="1 X Road", directors=["D1"]),
        _entity("E001B", address="1 X Road", directors=["D9"], reg_date="2020-01-01"),
        _entity("E002"), _entity("E003"),
    ]
    entities[0]["name"] = "Same Firm Ltd"
    entities[1]["name"] = "SAME FIRM LTD"
    invoices = [
        _invoice("I000", "E001", "E001B", 1_000_000, "2026-01-01"),  # collapses to a self-loop
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-05"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-09"),
        _invoice("I003", "E003", "E001B", 995_000, "2026-01-13"),  # closes via the E001 alias
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert len(rings) == 1
    assert rings[0]["closure_type"] == "transaction"
    assert set(rings[0]["entities"]) == {"E001", "E002", "E003"}  # E001B resolved to E001


def test_corporate_bridge_via_merged_directors():
    # THE flagship case for M3.5: E001's own record lists only D1. Its
    # duplicate-registration alias E001B — same firm, formatting variant,
    # never appears in any invoice — separately lists D2. E003 shares D2.
    # Without merging directors from the alias into the canonical record,
    # E001 and E003 share NOTHING directly and no bridge is found. With
    # canonicalization, the merged E001 has directors=[D1, D2] and the
    # bridge becomes visible — this is spec §3's claim that the same
    # canonicalization machinery closes fragmented loops, demonstrated.
    entities = [
        _entity("E001", address="1 X Road", directors=["D1"]),
        _entity("E001B", address="1 X Road", directors=["D2"], reg_date="2020-01-01"),  # alias, no invoices ever reference it
        _entity("E002"),
        _entity("E003", directors=["D2"]),
    ]
    entities[0]["name"] = "Vertex Steel Private Limited"
    entities[1]["name"] = "VERTEX STEEL PVT LTD"
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
        # no closing invoice E003 -> E001 or E003 -> E001B at all
    ]

    rings = find_candidate_rings(entities, invoices, max_depth=8)

    assert len(rings) == 1
    ring = rings[0]
    assert ring["closure_type"] == "corporate"
    assert set(ring["entities"]) == {"E001", "E002", "E003"}
    bridge = next(h for h in ring["hops"] if h["hop_type"] == "corporate_bridge")
    assert bridge["bridge_kind"] == "shared_director"
    assert bridge["bridge_evidence"] == {"director_id": "D2"}


def test_without_alias_merge_the_same_bridge_would_be_missed():
    # Control case proving the above isn't a coincidence: same setup, but
    # D2 is simply never recorded anywhere reachable — no bridge exists.
    entities = [
        _entity("E001", address="1 X Road", directors=["D1"]),
        _entity("E002"),
        _entity("E003", directors=["D2"]),  # D2 shared with nothing E001-side
    ]
    invoices = [
        _invoice("I001", "E001", "E002", 1_000_000, "2026-01-01"),
        _invoice("I002", "E002", "E003", 1_020_000, "2026-01-05"),
    ]
    rings = find_candidate_rings(entities, invoices, max_depth=8)
    assert rings == []
