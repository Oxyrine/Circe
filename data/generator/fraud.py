"""Fraud ring injector — deliberately separate from economy.py. Takes a
legitimate economy and layers circular-trade rings on top of it.

Two closure types, matching contract/candidate_ring.schema.json:
  - "transaction": every leg is a real invoice, the cycle is fully visible.
  - "corporate":   the last leg is dropped (never written to invoices.json),
                    and the two entities it would have connected are instead
                    linked by a shared director / address / registration
                    cohort. The dropped leg is recorded as a hidden_leg in
                    ground_truth.json — it exists in reality, never on the
                    platform. That gap is exactly what graph/corporate.py
                    (B's job) has to close.
"""

import random
from datetime import date, timedelta

from data.generator import economy

BRIDGE_KINDS = ["shared_director", "shared_address", "registration_cohort"]
FRAUD_HS_POOL = ["72081000", "39012000", "74031100", "10063000"]


def _ring_lengths(params, rng):
    lo, hi = params["fraud_ring_length_range"]
    min_long = params["fraud_ring_min_long"]
    long_floor = min(6, hi)  # never exceed hi, or randint(6, hi) raises when hi < 6
    lengths = [rng.randint(long_floor, hi) for _ in range(min_long)]
    lengths += [rng.randint(lo, hi) for _ in range(params["num_fraud_rings"] - min_long)]
    rng.shuffle(lengths)
    return lengths


def _apply_bridge(entity_by_id, frm, to, kind, rng):
    a, b = entity_by_id[frm], entity_by_id[to]
    if kind == "shared_director" and a["directors"]:
        if a["directors"][0] not in b["directors"]:
            b["directors"] = b["directors"] + [a["directors"][0]]
    elif kind == "shared_address":
        b["address"] = a["address"]
    else:  # registration_cohort
        b["registration_date"] = a["registration_date"]


def inject(entities, invoices, params, rng, next_inv_n, next_eid_n):
    entity_by_id = {e["id"]: e for e in entities}
    all_ids = list(entity_by_id.keys())
    bridged_entities = set()  # an entity's bridge evidence must not be overwritten by a later ring

    start = date.fromisoformat(params["date_start"])
    span = params["date_span_days"]
    lo_v, hi_v = params["value_range"]
    variance = params["fraud_value_variance"]
    gap_lo, gap_hi = params["fraud_timing_gap_days"]
    messy_hs_null_rate = params.get("messy_hs_null_rate", 0)
    corp_fraction = params["fraud_corporate_close_fraction"]

    fraud_invoices = []
    injected_rings = []

    for ring_idx, length in enumerate(_ring_lengths(params, rng), start=1):
        sample_size = min(length, len(all_ids))
        chosen = rng.sample(all_ids, sample_size)
        while len(chosen) < length:
            next_eid_n += 1
            new_id = "E{:03d}".format(next_eid_n)
            industry_class = rng.choice(list(params["sector_mix"].keys()))
            shell = economy.make_entity(new_id, industry_class, rng)
            entities.append(shell)
            entity_by_id[new_id] = shell
            all_ids.append(new_id)
            chosen.append(new_id)

        corporate = rng.random() < corp_fraction
        if corporate:
            # The closing ("to") entity is whichever one sits at chosen[0].
            # Rotate until that entity hasn't already had its bridge
            # evidence set by an earlier ring, so we never overwrite it.
            corporate = False
            for _ in range(length):
                if chosen[0] not in bridged_entities:
                    corporate = True
                    break
                chosen = chosen[1:] + chosen[:1]
        hidden_idx = length - 1 if corporate else None

        cur_value = rng.randint(lo_v, hi_v)
        cur_date = start + timedelta(days=rng.randint(0, span))
        hs = rng.choice(FRAUD_HS_POOL)
        hidden_legs = []

        for i in range(length):
            frm, to = chosen[i], chosen[(i + 1) % length]
            cur_value = int(cur_value * (1 + rng.uniform(-variance, variance)))
            cur_value = max(lo_v, min(cur_value, hi_v * 2))
            cur_date = cur_date + timedelta(days=rng.randint(gap_lo, gap_hi))
            disc_date = cur_date + timedelta(days=rng.randint(gap_lo, gap_hi * 2))

            if i == hidden_idx:
                hidden_legs.append({"from": frm, "to": to, "value": cur_value})
                _apply_bridge(entity_by_id, frm, to, rng.choice(BRIDGE_KINDS), rng)
                bridged_entities.add(to)
                continue

            next_inv_n += 1
            leg_hs = None if rng.random() < messy_hs_null_rate else hs
            fraud_invoices.append({
                "invoice_id": "I{:04d}".format(next_inv_n),
                "from": frm,
                "to": to,
                "value": cur_value,
                "hs_code": leg_hs,
                "invoice_date": cur_date.isoformat(),
                "discounting_date": disc_date.isoformat(),
            })

        injected_rings.append({
            "truth_id": "T{:02d}".format(ring_idx),
            "entities": chosen,
            "hidden_legs": hidden_legs,
        })

    invoices = invoices + fraud_invoices
    ground_truth = {"injected_rings": injected_rings}
    return entities, invoices, ground_truth, next_inv_n, next_eid_n
