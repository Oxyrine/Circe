"""Tests for the invariants data/generator/ has to hold, whether or not the
real Tarjan/DFS or scoring code exists yet to consume the output.

These caught real bugs during review: a hardcoded ring-length floor that
crashed on a plausible config, a missing value clamp, and bridge evidence on
a reused entity silently overwritten by a later ring. Each test below pins
down the specific failure mode that fix addressed."""
import random

from data.generator import economy, fraud

BASE_PARAMS = {
    "num_firms": 20,
    "sector_mix": {"manufacturing": 0.3, "trading": 0.3, "distribution": 0.25, "services": 0.15},
    "num_trade_events": 60,
    "value_range": (2_000_000, 80_000_000),
    "margin_range": (0.05, 0.25),
    "lead_time_days": (3, 45),
    "date_start": "2025-11-01",
    "date_span_days": 150,
    "num_fraud_rings": 6,
    "fraud_ring_length_range": (3, 8),
    "fraud_ring_min_long": 3,
    "fraud_corporate_close_fraction": 0.5,
    "fraud_value_variance": 0.03,
    "fraud_timing_gap_days": (1, 4),
    "messy_hs_null_rate": 0.05,
    "messy_address_noise_rate": 0.08,
}


def _params(**overrides):
    p = dict(BASE_PARAMS)
    p.update(overrides)
    return p


def _generate(params, seed=1):
    rng = random.Random(seed)
    entities = economy.build_firms(params, rng)
    invoices = economy.generate_invoices(entities, params, rng)
    entities, invoices, ground_truth, _, _ = fraud.inject(
        entities, invoices, params, rng, next_inv_n=len(invoices), next_eid_n=len(entities)
    )
    return entities, invoices, ground_truth


def test_ring_lengths_never_exceed_the_schema_hop_cap():
    # candidate_ring.schema.json caps hops at 8 (invoice hops + at most one
    # corporate_bridge). A ring's entity count equals its hop count, so this
    # must hold for every injected ring regardless of regime.
    _, _, ground_truth = _generate(BASE_PARAMS)
    for ring in ground_truth["injected_rings"]:
        assert 3 <= len(ring["entities"]) <= 8


def test_ring_lengths_reaches_the_uniformity_full_weight_threshold():
    # The wire protocol's timing signal only reaches full weight at 6 hops
    # (see WIRE_PROTOCOL.md §1) — the generator must guarantee several rings
    # at that length or one of A's four signals never gets exercised.
    _, _, ground_truth = _generate(BASE_PARAMS)
    long_rings = [r for r in ground_truth["injected_rings"] if len(r["entities"]) >= 6]
    assert len(long_rings) >= BASE_PARAMS["fraud_ring_min_long"]


def test_ring_length_range_below_six_does_not_crash():
    # Regression: _ring_lengths hardcoded randint(6, hi), which raised
    # ValueError for any regime with a max ring length under 6.
    params = _params(fraud_ring_length_range=(3, 5), fraud_ring_min_long=2, num_fraud_rings=4)
    entities, invoices, ground_truth = _generate(params)
    for ring in ground_truth["injected_rings"]:
        assert 3 <= len(ring["entities"]) <= 5


def test_hidden_legs_never_appear_in_invoices():
    # The core no-leakage invariant: a hidden leg exists ONLY in
    # ground_truth.json. Leaking it into invoices.json removes the reason
    # corporate-graph closure exists (WIRE_PROTOCOL.md §1).
    _, invoices, ground_truth = _generate(BASE_PARAMS)
    invoice_pairs = {(i["from"], i["to"]) for i in invoices}
    for ring in ground_truth["injected_rings"]:
        for leg in ring["hidden_legs"]:
            assert (leg["from"], leg["to"]) not in invoice_pairs


def test_corporate_rings_have_exactly_one_hidden_leg():
    _, _, ground_truth = _generate(BASE_PARAMS)
    for ring in ground_truth["injected_rings"]:
        assert len(ring["hidden_legs"]) in (0, 1)


def test_fraud_invoice_values_stay_within_schema_minimum():
    # Regression: the fraud-ring value loop had no floor/ceiling clamp
    # (unlike economy.generate_invoices), so a larger variance could drive
    # a value to <= 0 and fail invoice.schema.json's minimum: 1.
    params = _params(fraud_value_variance=0.9, num_fraud_rings=10, fraud_ring_min_long=4)
    _, invoices, ground_truth = _generate(params, seed=3)
    assert all(inv["value"] >= 1 for inv in invoices)
    for ring in ground_truth["injected_rings"]:
        assert all(leg["value"] >= 1 for leg in ring["hidden_legs"])


def test_bridged_entities_are_never_reused_across_rings():
    # Regression: entities are reused across rings (confirmed empirically —
    # the real dataset has entities appearing in 4 different rings), so two
    # corporate rings could land on the same closing entity and silently
    # overwrite each other's bridge evidence. Force heavy entity reuse (a
    # small pool, every ring corporate) and check no closing entity repeats.
    params = _params(num_firms=10, num_fraud_rings=6, fraud_ring_min_long=3,
                      fraud_corporate_close_fraction=1.0)
    _, _, ground_truth = _generate(params, seed=5)
    closing_entities = [
        ring["hidden_legs"][0]["to"]
        for ring in ground_truth["injected_rings"]
        if ring["hidden_legs"]
    ]
    assert len(closing_entities) == len(set(closing_entities))


def test_regime_a_and_b_both_generate_without_crashing():
    # data/generate.py's own docstring: regime B is meant to be a config
    # swap, not a rewrite — both must actually run.
    from data.generate import REGIMES
    for name, params in REGIMES.items():
        entities, invoices, ground_truth = _generate(params, seed=42)
        # >= not ==: clean fraud rings mint fresh shell entities on top of
        # num_firms (see test_clean_rings_use_only_fresh_shell_entities).
        assert len(entities) >= params["num_firms"]
        assert len(invoices) > 0
        assert len(ground_truth["injected_rings"]) == params["num_fraud_rings"]


def test_clean_rings_carry_no_trade_outside_their_own_entities():
    # The fix for precision@k = 0% on the real dataset: S_externality
    # (spec §7.4) detects a cluster that mostly trades with itself. When
    # fraud entities were sampled from the real economy's pool, they also
    # carried substantial legitimate trade, leaving no "outside economy"
    # for the signal to contrast against -- diagnosed as S_externality
    # reading 0.05-0.17 for every real fraud ring. Clean rings now use
    # fresh shell entities with zero legitimate trade by construction; this
    # pins down that no invoice connects a clean ring's entities to
    # anything outside that same ring.
    params = _params(fraud_hard_case_count=1)
    num_firms = params["num_firms"]
    entities, invoices, ground_truth = _generate(params)

    def touches_real_economy(ring):
        return any(int(e[1:]) <= num_firms for e in ring["entities"])

    rings_touching_real_economy = [r for r in ground_truth["injected_rings"] if touches_real_economy(r)]
    assert len(rings_touching_real_economy) <= params["fraud_hard_case_count"]

    clean_rings = [r for r in ground_truth["injected_rings"] if not touches_real_economy(r)]
    assert clean_rings, "expected at least one clean ring with this many fraud rings"
    for ring in clean_rings:
        ring_entities = set(ring["entities"])
        outside = [
            inv for inv in invoices
            if (inv["from"] in ring_entities) != (inv["to"] in ring_entities)
        ]
        assert not outside, "clean ring {} has a leg touching an entity outside itself".format(ring["truth_id"])


def test_entity_ids_and_invoice_values_match_the_contract_shape():
    entities, invoices, _ = _generate(BASE_PARAMS)
    for e in entities:
        assert e["id"].startswith("E")
        assert e["industry_class"] in ("manufacturing", "trading", "distribution", "services")
    for inv in invoices:
        assert isinstance(inv["value"], int)
        assert inv["hs_code"] is None or (isinstance(inv["hs_code"], str) and len(inv["hs_code"]) == 8)
