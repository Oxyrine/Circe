"""Emergent legitimate economy: firms trading along a supply-chain input-output
structure. Cycles (a firm buying, indirectly, from itself) are a side effect of
the trade propensity table, not something placed by hand."""

import random
from datetime import date, timedelta

INDUSTRY_CODES = {
    "manufacturing": ["NIC-2410", "NIC-2599", "NIC-2610", "NIC-2013", "NIC-1392"],
    "trading":       ["NIC-4662", "NIC-4620", "NIC-4669"],
    "distribution":  ["NIC-4690", "NIC-5210", "NIC-5229"],
    "services":      ["NIC-6202", "NIC-7020", "NIC-8299"],
}

FIRST_WORDS = [
    "Vertex", "Meridian", "Coastal", "Bluepeak", "Nilgiri", "Suncrest", "Kaveri",
    "Ashoka", "Wavelength", "Deccan", "Global", "Sapphire", "Horizon", "Silverline",
    "Redstone", "Northgate", "Amber", "Ironclad", "Crestline", "Palmgrove", "Falcon",
    "Windward", "Cobalt", "Marigold", "Zenith", "Copperline", "Trueform", "Ridgeway",
    "Novapoint", "Solstice", "Brightline", "Fernwood", "Granite", "Highbank",
]
SECOND_WORDS = {
    "manufacturing": ["Manufacturing", "Components", "Industries", "Works", "Fabricators"],
    "trading":       ["Trading", "Traders", "Commodities", "Impex"],
    "distribution":  ["Distribution", "Logistics", "Supply Chain", "Freight"],
    "services":      ["Consultants", "Business Services", "Solutions", "Advisory"],
}
LEGAL_SUFFIX = ["Pvt Ltd", "Ltd", "LLP", "Co"]

CITIES = [
    ("Bengaluru", "560001"), ("Bengaluru", "560066"), ("Bengaluru", "560100"),
    ("Chennai", "600002"), ("Chennai", "600032"), ("Mumbai", "400021"),
    ("Mumbai", "400070"), ("Pune", "411057"), ("Pune", "411001"),
    ("Chandigarh", "160002"), ("Kochi", "682001"), ("Coimbatore", "641018"),
    ("Gurugram", "122015"), ("Indore", "452001"), ("Hyderabad", "500081"),
]
STREETS = [
    "MG Road", "Anna Salai", "Marine Drive", "Electronic City",
    "Whitefield Main Road", "Hinjewadi Phase I", "Sector 18", "Sadar Bazaar",
    "Residency Road", "Nariman Point", "Industrial Area Phase II", "Avinashi Road",
]

# who buys from whom, and how often — this is what lets loops emerge
FLOW = {
    "manufacturing": {"trading": 0.40, "distribution": 0.35, "services": 0.05, "manufacturing": 0.20},
    "trading":       {"manufacturing": 0.25, "distribution": 0.35, "services": 0.15, "trading": 0.25},
    "distribution":  {"services": 0.30, "trading": 0.30, "manufacturing": 0.15, "distribution": 0.25},
    "services":      {"manufacturing": 0.30, "trading": 0.30, "distribution": 0.25, "services": 0.15},
}

HS_BY_CLASS = {
    "manufacturing": ["72081000", "39012000", "85176200", "26011100", "94036000"],
    "trading":       ["72081000", "74031100", "10063000", "27101990"],
    "distribution":  ["49011000", "39012000", "84571000"],
    "services":      [None],
}


def make_entity(eid, industry_class, rng):
    name = "{} {} {}".format(
        rng.choice(FIRST_WORDS),
        rng.choice(SECOND_WORDS[industry_class]),
        rng.choice(LEGAL_SUFFIX),
    )
    city, pin = rng.choice(CITIES)
    address = "{} {}, {} {}".format(rng.randint(1, 90), rng.choice(STREETS), city, pin)
    reg_date = date(rng.randint(2011, 2025), rng.randint(1, 12), rng.randint(1, 28))
    return {
        "id": eid,
        "name": name,
        "industry_code": rng.choice(INDUSTRY_CODES[industry_class]),
        "industry_class": industry_class,
        "directors": ["D{}".format(rng.randint(1, 400))],
        "address": address,
        "registration_date": reg_date.isoformat(),
    }


def build_firms(params, rng):
    classes = list(params["sector_mix"].keys())
    weights = list(params["sector_mix"].values())
    entities = []
    for i in range(1, params["num_firms"] + 1):
        industry_class = rng.choices(classes, weights=weights, k=1)[0]
        entities.append(make_entity("E{:03d}".format(i), industry_class, rng))
    return entities


def generate_invoices(entities, params, rng):
    by_class = {}
    for e in entities:
        by_class.setdefault(e["industry_class"], []).append(e)

    start = date.fromisoformat(params["date_start"])
    span = params["date_span_days"]
    lo_v, hi_v = params["value_range"]
    lo_m, hi_m = params["margin_range"]
    lo_lt, hi_lt = params["lead_time_days"]

    invoices = []
    last_value = {}
    inv_n = 0
    for _ in range(params["num_trade_events"]):
        src = rng.choice(entities)
        flow = FLOW[src["industry_class"]]
        dest_class = rng.choices(list(flow.keys()), weights=list(flow.values()), k=1)[0]
        pool = [e for e in by_class.get(dest_class, []) if e["id"] != src["id"]]
        if not pool:
            continue
        dest = rng.choice(pool)

        base = last_value.get(src["id"], rng.randint(lo_v, hi_v))
        margin = rng.uniform(lo_m, hi_m)
        value = int(base * (1 + margin))
        value = max(lo_v, min(value, hi_v * 2))
        last_value[dest["id"]] = value

        inv_n += 1
        inv_date = start + timedelta(days=rng.randint(0, span))
        disc_date = inv_date + timedelta(days=rng.randint(lo_lt, hi_lt))
        hs = rng.choice(HS_BY_CLASS[src["industry_class"]])

        invoices.append({
            "invoice_id": "I{:04d}".format(inv_n),
            "from": src["id"],
            "to": dest["id"],
            "value": value,
            "hs_code": hs,
            "invoice_date": inv_date.isoformat(),
            "discounting_date": disc_date.isoformat(),
        })
    return invoices


def apply_messiness(entities, params, rng):
    """Address formatting noise only — never touch identity fields. Keeps
    canonicalize.py (B's job) a real problem instead of a solved one."""
    rate = params.get("messy_address_noise_rate", 0)
    for e in entities:
        if rng.random() >= rate:
            continue
        addr = e["address"]
        if rng.random() < 0.5:
            e["address"] = addr.upper()
        else:
            e["address"] = "  " + addr.replace(", ", " ,  ")
