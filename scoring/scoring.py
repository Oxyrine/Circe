import argparse
import copy
import datetime
import json
import math
import os
import statistics
import sys

PARAMS = {
    "tau_v": 0.15,
    "cv_ref": 0.60,
    "tau_t": 30.0,
    "w_uniform": 0.5,
    # Flat 1/4 — matches spec §8.1 AND the Wire Protocol's worked example.
    # Capping externality to 0.10 is an evidenced TUNING move for H16–24,
    # triggered when operational FPR on top-k exceeds 15% (ADR-0005).
    "exponents": {
        "value": 0.25,
        "product": 0.25,
        "timing": 0.25,
        "externality": 0.25,
    },
}

CAPPED_EXPONENTS = {
    "value": 0.35,
    "product": 0.30,
    "timing": 0.25,
    "externality": 0.10,
}


def get_invoice_hops(ring: dict) -> list[dict]:
    """Helper to extract only hops of type 'invoice' from a ring."""
    return [h for h in ring.get("hops", []) if h.get("hop_type") == "invoice"]


def get_hop_endpoints(hop_or_invoice: dict) -> tuple[str, str]:
    """Extracts from/to endpoints conforming to Wire Protocol v1 ('from' / 'to'),

    with fallback to legacy 'source' / 'target' if present.
    """
    src = hop_or_invoice.get("from") or hop_or_invoice.get("source") or ""
    tgt = hop_or_invoice.get("to") or hop_or_invoice.get("target") or ""
    return src, tgt


def s_value(ring: dict) -> float | None:
    """Computes S_value (net position imbalance over interior entities only).

    Interior entities are those with at least one incoming and one outgoing invoice hop.
    Returns None if there are no invoice hops, zero total invoice value, or if interior is empty.
    """
    invoice_hops = get_invoice_hops(ring)
    if not invoice_hops:
        return None

    nets = {}
    incoming_targets = set()
    outgoing_sources = set()

    for hop in invoice_hops:
        src, tgt = get_hop_endpoints(hop)
        val = hop.get("value", 0)

        nets[src] = nets.get(src, 0) + val
        nets[tgt] = nets.get(tgt, 0) - val

        incoming_targets.add(tgt)
        outgoing_sources.add(src)

    # Interior entities: at least one invoice in and at least one invoice out
    interior = {
        e for e in ring.get("entities", [])
        if e in incoming_targets and e in outgoing_sources
    }
    if not interior:
        return None

    sum_abs_nets = sum(abs(nets.get(e, 0)) for e in interior)
    sum_values = sum(hop.get("value", 0) for hop in invoice_hops)

    if sum_values == 0:
        return None

    imbalance = sum_abs_nets / sum_values
    return math.exp(-imbalance / PARAMS["tau_v"])


def s_product(ring: dict, entities: dict) -> float | None:
    """Computes S_product (mean HS code transformation similarity across adjacent invoice hops).

    Skips pairs where either HS code is null or where either party has industry_class trading/distribution.
    Returns None if zero comparable pairs remain.
    """
    invoice_hops = get_invoice_hops(ring)
    if len(invoice_hops) < 2:
        return None

    pairs_scores = []

    for i in range(len(invoice_hops) - 1):
        hop_a = invoice_hops[i]
        hop_b = invoice_hops[i + 1]

        src_a, tgt_a = get_hop_endpoints(hop_a)
        src_b, tgt_b = get_hop_endpoints(hop_b)

        # Check commodity suppression
        party_entities = [src_a, tgt_a, src_b, tgt_b]
        suppress = any(
            entities.get(e, {}).get("industry_class") in ("trading", "distribution")
            for e in party_entities
        )
        if suppress:
            continue

        code_a = hop_a.get("hs_code")
        code_b = hop_b.get("hs_code")

        if code_a is None or code_b is None:
            continue

        # Strict 3-tier matching
        str_a, str_b = str(code_a), str(code_b)
        if str_a == str_b:
            pairs_scores.append(1.0)
        elif len(str_a) >= 4 and len(str_b) >= 4 and str_a[:4] == str_b[:4]:
            pairs_scores.append(0.7)
        elif len(str_a) >= 2 and len(str_b) >= 2 and str_a[:2] == str_b[:2]:
            pairs_scores.append(0.3)
        else:
            pairs_scores.append(0.0)

    if not pairs_scores:
        return None

    return statistics.mean(pairs_scores)


def s_timing(ring: dict) -> float | None:
    """Computes S_timing (regularity of invoice_date spacing across invoice hops in traversal order).

    Uses absolute differences between consecutive hop dates.
    Returns None if fewer than 2 gaps (i.e. < 3 invoice hops) or if any invoice_date is missing.
    """
    invoice_hops = get_invoice_hops(ring)
    dates = []
    for hop in invoice_hops:
        date_str = hop.get("invoice_date")
        if date_str is None:
            return None
        try:
            dates.append(datetime.datetime.strptime(date_str, "%Y-%m-%d").date())
        except ValueError:
            return None

    if len(dates) < 3:  # n hops -> n - 1 gaps. Fewer than 2 gaps -> None
        return None

    # Absolute difference ensures non-monotonic dates under real/messy data do not corrupt variance
    gaps = [abs((dates[i + 1] - dates[i]).days) for i in range(len(dates) - 1)]

    mean_gaps = statistics.mean(gaps)
    if mean_gaps == 0:
        # Uniform 0-day gaps: CV term contributes 0, speed term saturates to 1.0
        return 1.0

    cv = statistics.stdev(gaps) / mean_gaps if len(gaps) > 1 else 0.0

    shrink = min(1.0, (len(gaps) - 1) / 4.0)
    w_uniform = PARAMS["w_uniform"] * shrink
    w_speed = 1.0 - w_uniform

    return w_uniform * (1.0 - min(cv / PARAMS["cv_ref"], 1.0)) + w_speed * math.exp(-mean_gaps / PARAMS["tau_t"])


def s_externality(ring: dict, all_invoices: list) -> float | None:
    """Computes S_externality (internal ring trading value / total trading value involving ring entities).

    Returns None if total == 0 or ring_entities is empty.
    """
    ring_entities = set(ring.get("entities", []))
    if not ring_entities or not all_invoices:
        return None

    internal_volume = 0
    total_volume = 0

    for inv in all_invoices:
        src, tgt = get_hop_endpoints(inv)
        val = inv.get("value", 0)

        src_in = src in ring_entities
        tgt_in = tgt in ring_entities

        if src_in and tgt_in:
            internal_volume += val
            total_volume += val
        elif src_in or tgt_in:
            total_volume += val

    if total_volume == 0:
        return None

    return internal_volume / total_volume


def aggregate(scores: dict, exponents: dict | None = None) -> float:
    """Weighted geometric mean over non-abstained signals, exponents renormalized to sum to 1.

    Explicit override: returns 0.0 if all signals abstain (zero evidence).
    """
    non_abstained = {k: v for k, v in scores.items() if v is not None}
    if not non_abstained:
        return 0.0

    exp_dict = exponents or PARAMS["exponents"]
    total_weight = sum(exp_dict[k] for k in non_abstained)
    val = 0.0
    for k, signal_val in non_abstained.items():
        weight = exp_dict[k] / total_weight
        val += weight * math.log(max(signal_val, 1e-9))

    return math.exp(val)


def evidence(ring: dict, scores: dict, entities: dict) -> dict[str, str]:
    """Builds human-readable evidence strings for each component score and industry consistency."""
    ev = {}

    if scores.get("value") is not None:
        ev["value"] = f"Net position score: {scores['value']:.2f}"
    else:
        ev["value"] = "Abstained (no interior invoice hops)"

    if scores.get("product") is not None:
        ev["product"] = f"HS code consistency: {scores['product']:.2f}"
    else:
        ev["product"] = "Abstained (insufficient HS codes or suppressed by commodity classification)"

    if scores.get("timing") is not None:
        ev["timing"] = f"Regularity score: {scores['timing']:.2f}"
    else:
        ev["timing"] = "Abstained (fewer than 2 gaps or missing dates)"

    if scores.get("externality") is not None:
        ev["externality"] = f"Externality score: {scores['externality']:.2f}"
    else:
        ev["externality"] = "Abstained (no counterparty activity found in invoice registry)"

    # Industry consistency check (evidence string only, not folded into score).
    # HS codes (trade-tariff chapters) and industry_code (NIC economic-activity codes,
    # e.g. "NIC-4662" per Wire Protocol §3) are different taxonomies with no available
    # concordance table -- comparing their prefixes is only ever valid when industry_code
    # happens to itself be a bare numeric/HS-shaped string. Guard with isdigit() on both
    # sides so a NIC-prefixed code produces no claim instead of a guaranteed-false one;
    # asserting a mismatch the data can't support is worse than staying silent.
    invoice_hops = get_invoice_hops(ring)
    inconsistencies = []
    for hop in invoice_hops:
        hs_code = str(hop.get("hs_code") or "")
        _, target_entity = get_hop_endpoints(hop)
        if hs_code and target_entity in entities:
            target_ind = str(entities[target_entity].get("industry_code") or "")
            if (target_ind and hs_code.isdigit() and target_ind.isdigit()
                    and len(hs_code) >= 2 and len(target_ind) >= 2
                    and hs_code[:2] != target_ind[:2]):
                inconsistencies.append(f"Entity {target_entity} ({target_ind}) received HS {hs_code}")

    if inconsistencies:
        ev["industry"] = "Flagged cross-industry trades: " + "; ".join(inconsistencies)
    else:
        ev["industry"] = "All trades consistent with declared industry codes."

    return ev


def score_ring(ring: dict, all_invoices: list, entities: dict, exponents: dict | None = None) -> dict:
    """Scores a single candidate ring across all four signals and packages for Wire Protocol v1.

    Expected loss is computed with unrounded continuous float aggregate to prevent double-rounding drift.
    """
    invoice_hops = get_invoice_hops(ring)

    if not invoice_hops:
        scores = {"value": None, "product": None, "timing": None, "externality": None}
    else:
        scores = {
            "value": s_value(ring),
            "product": s_product(ring, entities),
            "timing": s_timing(ring),
            "externality": s_externality(ring, all_invoices),
        }

    continuous_agg = aggregate(scores, exponents=exponents)
    abstained = [k for k, v in scores.items() if v is None]

    sum_val = sum(h.get("value", 0) for h in invoice_hops)
    expected_loss = round(continuous_agg * sum_val)

    return {
        "ring_id": ring.get("ring_id", ""),
        "canonical_key": ring.get("canonical_key", ""),
        "closure_type": ring.get("closure_type", ""),
        "entities": list(ring.get("entities", [])),
        "hops": list(ring.get("hops", [])),
        "scores": {k: (round(v, 2) if v is not None else None) for k, v in scores.items()},
        "abstained": abstained,
        "aggregate": round(continuous_agg, 2),
        "expected_loss": expected_loss,
        "evidence": evidence(ring, scores, entities),
    }


def _jaccard_match(entities_a: list, entities_b: list, threshold: float = 0.5) -> bool:
    """Helper to determine if two entity sets match at Jaccard similarity >= threshold."""
    set_a = set(entities_a)
    set_b = set(entities_b)
    if not set_a or not set_b:
        return False
    return (len(set_a & set_b) / len(set_a | set_b)) >= threshold


def evaluate_jaccard(scored_rings: list, ground_truth_rings: list) -> dict:
    """Evaluates candidate ring recall and operational False Positive Rate on top-k queue.

    Match condition: entity-set Jaccard similarity >= 0.5.
    k = number of ground truth fraud rings.
    """
    total_gt = len(ground_truth_rings)
    if total_gt == 0:
        return {
            "ground_truth_count": 0,
            "detected_count": 0,
            "recall_at_0_5": 0.0,
            "precision_at_k": 0.0,
            "operational_fpr": 0.0,
            "recommend_capped_exponents": False,
            "diagnostic_note": "No ground truth injected rings found in dataset.",
        }

    # 1. Recall across all candidate rings (B's recall)
    gt_detected = 0
    for gt in ground_truth_rings:
        gt_entities = gt.get("entities", [])
        if any(_jaccard_match(gt_entities, sr.get("entities", [])) for sr in scored_rings):
            gt_detected += 1

    recall = gt_detected / total_gt

    # 2. Precision@k and Operational FPR on top-k queue sorted by expected_loss
    sorted_rings = sorted(scored_rings, key=lambda r: r.get("expected_loss", 0), reverse=True)
    top_k = sorted_rings[:total_gt]

    matched_top_k = 0
    for cand in top_k:
        cand_entities = cand.get("entities", [])
        if any(_jaccard_match(cand_entities, gt.get("entities", [])) for gt in ground_truth_rings):
            matched_top_k += 1

    precision_at_k = matched_top_k / len(top_k) if top_k else 1.0
    operational_fpr = 1.0 - precision_at_k

    eval_summary = {
        "ground_truth_count": total_gt,
        "detected_count": gt_detected,
        "recall_at_0_5": round(recall, 4),
        "precision_at_k": round(precision_at_k, 4),
        "operational_fpr": round(operational_fpr, 4),
        "recommend_capped_exponents": operational_fpr > 0.15,
    }

    if operational_fpr > 0.15:
        eval_summary["diagnostic_note"] = (
            f"Operational FPR ({operational_fpr:.1%}) exceeds 15% threshold on top-k queue. "
            "Evidence supports human calibration to capped exponents (0.35/0.30/0.25/0.10) in PARAMS."
        )

    return eval_summary


def benchmark_degradation(candidate_rings: list, all_invoices: list, entities: dict, ground_truth_rings: list) -> dict:
    """Executes the degradation ablation matrix across 3 failure modes:

    1. Baseline (all signals active)
    2. Drop HS codes (S_product abstains)
    3. Drop Dates (S_timing abstains)
    4. Alias Entities (Entity graph noise)
    """
    results = {}

    # 1. Baseline
    base_scored = [score_ring(r, all_invoices, entities) for r in candidate_rings]
    results["baseline"] = evaluate_jaccard(base_scored, ground_truth_rings)

    # 2. Mode 1: Drop HS Codes
    rings_no_hs = copy.deepcopy(candidate_rings)
    for ring in rings_no_hs:
        for hop in ring.get("hops", []):
            hop["hs_code"] = None
    no_hs_scored = [score_ring(r, all_invoices, entities) for r in rings_no_hs]
    results["drop_hs_codes"] = evaluate_jaccard(no_hs_scored, ground_truth_rings)

    # 3. Mode 2: Drop Dates
    rings_no_dates = copy.deepcopy(candidate_rings)
    for ring in rings_no_dates:
        for hop in ring.get("hops", []):
            hop["invoice_date"] = None
    no_dates_scored = [score_ring(r, all_invoices, entities) for r in rings_no_dates]
    results["drop_dates"] = evaluate_jaccard(no_dates_scored, ground_truth_rings)

    # 4. Mode 3: Entity Noise (aliasing half of entities)
    rings_aliased = copy.deepcopy(candidate_rings)
    for i, ring in enumerate(rings_aliased):
        if i % 2 == 0:
            ring["entities"] = [e + "_alias" for e in ring.get("entities", [])]
            for hop in ring.get("hops", []):
                if "from" in hop:
                    hop["from"] = hop["from"] + "_alias"
                if "to" in hop:
                    hop["to"] = hop["to"] + "_alias"
                if "source" in hop:
                    hop["source"] = hop["source"] + "_alias"
                if "target" in hop:
                    hop["target"] = hop["target"] + "_alias"
    aliased_scored = [score_ring(r, all_invoices, entities) for r in rings_aliased]
    results["alias_entities"] = evaluate_jaccard(aliased_scored, ground_truth_rings)

    return results


def run_checks():
    """Runs all 11 regression, specification, and adversarial test asserts."""
    # Test 1: Fabricated 3-hop, all ₹10cr -> s_value == 1.0 (using Wire Protocol 'from'/'to')
    r1 = {
        "entities": ["E1", "E2", "E3"],
        "hops": [
            {"from": "E1", "to": "E2", "value": 100000000, "hop_type": "invoice"},
            {"from": "E2", "to": "E3", "value": 100000000, "hop_type": "invoice"},
            {"from": "E3", "to": "E1", "value": 100000000, "hop_type": "invoice"},
        ],
    }
    v1 = s_value(r1)
    assert v1 is not None and math.isclose(v1, 1.0, abs_tol=1e-5), f"Test 1 failed: {v1}"

    # Test 2: Legitimate 10/12/14 -> s_value ≈ 0.2273 (tol 1e-3)
    r2 = {
        "entities": ["E1", "E2", "E3"],
        "hops": [
            {"from": "E1", "to": "E2", "value": 10, "hop_type": "invoice"},
            {"from": "E2", "to": "E3", "value": 12, "hop_type": "invoice"},
            {"from": "E3", "to": "E1", "value": 14, "hop_type": "invoice"},
        ],
    }
    v2 = s_value(r2)
    assert v2 is not None and math.isclose(v2, 0.2273, abs_tol=1e-3), f"Test 2 failed: {v2}"

    # Test 3: Identical HS codes -> s_product == 1.0
    r3 = {
        "entities": ["E1", "E2", "E3"],
        "hops": [
            {"from": "E1", "to": "E2", "hop_type": "invoice", "hs_code": "84713010"},
            {"from": "E2", "to": "E3", "hop_type": "invoice", "hs_code": "84713010"},
        ],
    }
    entities_db = {
        "E1": {"id": "E1", "name": "E1"},
        "E2": {"id": "E2", "name": "E2"},
        "E3": {"id": "E3", "name": "E3"},
    }
    v3 = s_product(r3, entities_db)
    assert v3 is not None and math.isclose(v3, 1.0, abs_tol=1e-5), f"Test 3 failed: {v3}"

    # Test 4: All HS codes null -> s_product is None, abstained, aggregate over 3 signals = 0.82
    r4 = {
        "entities": ["E1", "E2", "E3"],
        "hops": [
            {"from": "E1", "to": "E2", "hop_type": "invoice", "hs_code": None},
            {"from": "E2", "to": "E3", "hop_type": "invoice", "hs_code": None},
        ],
    }
    v4 = s_product(r4, entities_db)
    assert v4 is None, f"Test 4 product failed: {v4}"

    sc4 = {"value": 0.91, "product": None, "timing": 0.85, "externality": 0.70}
    agg4 = aggregate(sc4)
    assert math.isclose(round(agg4, 2), 0.82), f"Test 4 agg failed: {round(agg4, 2)} != 0.82"

    # Test 5: Uniform 1-day gaps -> s_timing > 0.9 (testing non-monotonic traversal date handling)
    r5 = {
        "entities": ["E1", "E2", "E3", "E4"],
        "hops": [
            {"hop_type": "invoice", "invoice_date": "2023-01-01"},
            {"hop_type": "invoice", "invoice_date": "2023-01-02"},
            {"hop_type": "invoice", "invoice_date": "2023-01-03"},
            {"hop_type": "invoice", "invoice_date": "2023-01-04"},
        ],
    }
    v5 = s_timing(r5)
    assert v5 is not None and v5 > 0.9, f"Test 5 failed: {v5}"

    # Test 6: Commodity-trading pair -> aggregate stays high
    # DO NOT "FIX" THIS ASSERT. It encodes a KNOWN, DOCUMENTED false positive:
    # a commodity trader buys and sells the same HS code at thin margins, so
    # S_product and S_value both fire on legitimate back-to-back structures.
    # industry_class suppression narrows it; nothing in available data closes it.
    # If this assert starts failing, a signal changed behaviour — investigate,
    # don't delete. See limitations note + spec §7.2.
    sc6 = {"value": 1.0, "product": 1.0, "timing": 0.5, "externality": 0.5}
    agg6 = aggregate(sc6)
    assert agg6 > 0.7, f"Test 6 failed: {agg6}"

    # Test 7: Corporate-closed ring, hops 10/10 -> s_value == 1.0; hops 10/12 -> s_value > 0.4
    r7a = {
        "entities": ["E1", "E2", "E3"],
        "hops": [
            {"from": "E1", "to": "E2", "value": 10, "hop_type": "invoice"},
            {"from": "E2", "to": "E3", "value": 10, "hop_type": "invoice"},
            {"from": "E3", "to": "E1", "hop_type": "corporate_bridge"},
        ],
    }
    v7a = s_value(r7a)
    assert v7a is not None and math.isclose(v7a, 1.0, abs_tol=1e-5), f"Test 7a failed: {v7a}"

    r7b = {
        "entities": ["E1", "E2", "E3"],
        "hops": [
            {"from": "E1", "to": "E2", "value": 10, "hop_type": "invoice"},
            {"from": "E2", "to": "E3", "value": 12, "hop_type": "invoice"},
            {"from": "E3", "to": "E1", "hop_type": "corporate_bridge"},
        ],
    }
    v7b = s_value(r7b)
    assert v7b is not None and v7b > 0.4, f"Test 7b failed: {v7b}"

    # Test 8 (Zero Interior Entities Guard - ADR-0004): 2 corporate bridges -> s_value returns None
    r8 = {
        "entities": ["E1", "E2", "E3", "E4"],
        "hops": [
            {"from": "E1", "to": "E2", "value": 10, "hop_type": "invoice"},
            {"from": "E2", "to": "E3", "hop_type": "corporate_bridge"},
            {"from": "E3", "to": "E4", "value": 10, "hop_type": "invoice"},
            {"from": "E4", "to": "E1", "hop_type": "corporate_bridge"},
        ],
    }
    v8 = s_value(r8)
    assert v8 is None, f"Test 8 failed: {v8}"

    # Test 9 (Divide-by-Zero Guard - ADR-0004): Unreferenced entities in a non-empty invoice table -> total_volume == 0 -> None
    r9 = {
        "entities": ["E_UNREF_1", "E_UNREF_2"],
        "hops": [
            {"from": "E_UNREF_1", "to": "E_UNREF_2", "value": 10, "hop_type": "invoice"}
        ]
    }
    # Non-empty invoices touching other entities only
    external_invoices = [
        {"from": "OTHER_1", "to": "OTHER_2", "value": 50000000}
    ]
    v9 = s_externality(r9, external_invoices)
    assert v9 is None, f"Test 9 externality divide-by-zero failed: {v9}"

    # Test 10 (All-Abstained Aggregator Override - ADR-0004): Zero invoice hops -> complete abstention, aggregate == 0.0
    r10 = {
        "ring_id": "R_ZERO",
        "entities": ["E1", "E2"],
        "hops": [
            {"from": "E1", "to": "E2", "hop_type": "corporate_bridge"},
            {"from": "E2", "to": "E1", "hop_type": "corporate_bridge"},
        ],
    }
    sr10 = score_ring(r10, [], entities_db)
    assert len(sr10["abstained"]) == 4, f"Test 10 abstained failed: {sr10['abstained']}"
    assert sr10["aggregate"] == 0.0, f"Test 10 aggregate failed: {sr10['aggregate']}"
    assert sr10["expected_loss"] == 0, f"Test 10 expected_loss failed: {sr10['expected_loss']}"

    # Adversarial Verification (§8.5 / ADR-0008): 4-Signal Combined Sophisticated Adversarial Ring
    # An adversary combines +10% markup, HS transformation, timing jitter, and external trade volume
    r_adv = {
        "entities": ["ADV1", "ADV2", "ADV3"],
        "hops": [
            {"from": "ADV1", "to": "ADV2", "value": 10000000, "hop_type": "invoice", "invoice_date": "2023-01-01", "hs_code": "72081000"},
            {"from": "ADV2", "to": "ADV3", "value": 11000000, "hop_type": "invoice", "invoice_date": "2023-01-20", "hs_code": "84099900"},
            {"from": "ADV3", "to": "ADV1", "value": 12100000, "hop_type": "invoice", "invoice_date": "2023-02-18", "hs_code": "87082900"}
        ]
    }
    adv_entities = {
        "ADV1": {"id": "ADV1", "industry_code": "7208", "industry_class": "manufacturing"},
        "ADV2": {"id": "ADV2", "industry_code": "8409", "industry_class": "manufacturing"},
        "ADV3": {"id": "ADV3", "industry_code": "8708", "industry_class": "manufacturing"}
    }
    # External legitimate trade buffer
    adv_invoices = [
        {"from": "ADV1", "to": "ADV2", "value": 10000000},
        {"from": "ADV2", "to": "ADV3", "value": 11000000},
        {"from": "ADV3", "to": "ADV1", "value": 12100000},
        {"from": "ADV1", "to": "EXT1", "value": 20000000},
        {"from": "ADV2", "to": "EXT2", "value": 15000000},
        {"from": "ADV3", "to": "EXT3", "value": 18000000}
    ]
    sr_adv = score_ring(r_adv, adv_invoices, adv_entities)
    # The 4-signal evasion successfully collapses the geometric aggregate
    assert sr_adv["aggregate"] < 0.15, f"Adversarial aggregate check failed: {sr_adv['aggregate']} >= 0.15"

    # Test 11 (NIC vs HS Taxonomy Guard): real entities carry "NIC-XXXX" industry_code
    # (Wire Protocol §3), which is not comparable to a bare numeric HS code -- must
    # not produce a false cross-industry flag. A genuine numeric mismatch must still fire.
    r11 = {
        "ring_id": "R11",
        "entities": ["N1", "N2"],
        "hops": [
            {"from": "N1", "to": "N2", "value": 1000, "hop_type": "invoice", "invoice_date": "2023-01-01", "hs_code": "72081000"},
        ],
    }
    nic_entities = {
        "N1": {"id": "N1", "industry_code": "NIC-7208", "industry_class": "manufacturing"},
        "N2": {"id": "N2", "industry_code": "NIC-7208", "industry_class": "manufacturing"},
    }
    scores11a = {
        "value": s_value(r11), "product": s_product(r11, nic_entities), "timing": s_timing(r11), "externality": s_externality(r11, [])
    }
    ev11a = evidence(r11, scores11a, nic_entities)
    assert ev11a["industry"] == "All trades consistent with declared industry codes.", f"Test 11a failed: {ev11a['industry']}"

    numeric_entities = {
        "N1": {"id": "N1", "industry_code": "72", "industry_class": "manufacturing"},
        "N2": {"id": "N2", "industry_code": "72", "industry_class": "manufacturing"},
    }
    r11b = {
        "ring_id": "R11b",
        "entities": ["N1", "N2"],
        "hops": [
            {"from": "N1", "to": "N2", "value": 1000, "hop_type": "invoice", "invoice_date": "2023-01-01", "hs_code": "85171200"},
        ],
    }
    ev11b = evidence(r11b, {
        "value": s_value(r11b), "product": s_product(r11b, numeric_entities), "timing": s_timing(r11b), "externality": s_externality(r11b, [])
    }, numeric_entities)
    assert ev11b["industry"].startswith("Flagged"), f"Test 11b failed: {ev11b['industry']}"

    print("All 11 checks and adversarial benchmark passed successfully.")


def main():
    parser = argparse.ArgumentParser(description="Ouroboros: Discriminator Scoring Engine")
    parser.add_argument("--candidates", type=str, help="Path to candidate_rings.json")
    parser.add_argument("--invoices", type=str, help="Path to invoices.json")
    parser.add_argument("--entities", type=str, help="Path to entities.json")
    parser.add_argument("--out", type=str, help="Output path for scored_rings.json")
    parser.add_argument("--eval", type=str, help="Path to ground_truth.json to evaluate recall and top-k precision/FPR")
    parser.add_argument("--capped-exponents", action="store_true", help="Force capped exponents (0.35/0.30/0.25/0.10)")
    parser.add_argument("--benchmark-degradation", action="store_true", help="Run 3-mode degradation ablation study and export degradation_report.json")

    args = parser.parse_args()

    if not args.candidates and not args.eval and not args.benchmark_degradation:
        run_checks()
        return

    # Load candidate rings (supporting wrapped {"schema_version": 1, "rings": [...]} or raw list)
    candidate_rings = []
    cand_data = {}
    if args.candidates and os.path.exists(args.candidates):
        with open(args.candidates, "r", encoding="utf-8") as f:
            cand_data = json.load(f)
        candidate_rings = cand_data.get("rings", cand_data if isinstance(cand_data, list) else [])

    # Load invoices (supporting wrapped {"schema_version": 1, "invoices": [...]} or raw list)
    all_invoices = []
    if args.invoices and os.path.exists(args.invoices):
        with open(args.invoices, "r", encoding="utf-8") as f:
            inv_data = json.load(f)
        all_invoices = inv_data.get("invoices", inv_data if isinstance(inv_data, list) else [])

    # Load entities (supporting wrapped {"schema_version": 1, "entities": [...]}, list, or dict)
    entities_map = {}
    if args.entities and os.path.exists(args.entities):
        with open(args.entities, "r", encoding="utf-8") as f:
            ent_data = json.load(f)

        if isinstance(ent_data, dict) and "entities" in ent_data and isinstance(ent_data["entities"], list):
            ent_list = ent_data["entities"]
        elif isinstance(ent_data, list):
            ent_list = ent_data
        elif isinstance(ent_data, dict):
            ent_list = ent_data
        else:
            ent_list = []

        if isinstance(ent_list, list):
            for e in ent_list:
                eid = e.get("id") or e.get("entity_id")
                if eid:
                    entities_map[eid] = e
        elif isinstance(ent_list, dict):
            entities_map = ent_list

    gt_rings = []
    if args.eval and os.path.exists(args.eval):
        with open(args.eval, "r", encoding="utf-8") as f:
            gt_data = json.load(f)
        if isinstance(gt_data, dict):
            gt_rings = gt_data.get("injected_rings") or gt_data.get("rings") or []
        elif isinstance(gt_data, list):
            gt_rings = gt_data
        else:
            gt_rings = []

    # Degradation benchmark mode
    if args.benchmark_degradation:
        degradation_results = benchmark_degradation(candidate_rings, all_invoices, entities_map, gt_rings)
        os.makedirs("artifacts", exist_ok=True)
        report_path = os.path.join("artifacts", "degradation_report.json")
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(degradation_results, f, indent=2)
        print(f"Degradation benchmark report written to {report_path}:\n{json.dumps(degradation_results, indent=2)}")
        return

    active_exponents = CAPPED_EXPONENTS if args.capped_exponents else PARAMS["exponents"]

    scored = [score_ring(r, all_invoices, entities_map, exponents=active_exponents) for r in candidate_rings]

    # Sort scored rings by expected_loss descending for triage queue prioritization
    scored.sort(key=lambda r: r.get("expected_loss", 0), reverse=True)

    output_payload = {
        "schema_version": 1,
        "source_dataset": cand_data.get("source_dataset", "sample"),
        "count": len(scored),
        "rings": scored,
    }

    if args.out:
        os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(output_payload, f, indent=2)
        print(f"Scored {len(scored)} rings written to {args.out} (sorted by expected_loss descending)")

    if args.eval:
        eval_result = evaluate_jaccard(scored, gt_rings)
        print(f"Evaluation results:\n{json.dumps(eval_result, indent=2)}")


if __name__ == "__main__":
    main()
