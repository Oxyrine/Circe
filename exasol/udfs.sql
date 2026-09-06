-- ============================================================================
-- CIRCE: Exasol In-Database Python3 UDF Definitions & Analytical Scoring Views
-- ============================================================================
-- NOTE: Requires Exasol Python3 Script Language Container:
--       exakit slc install python3
--
-- Mechanics Status: Code-complete; pending live execution verification on
--                  Catherine's working Exasol instance or local Docker stack.
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS STARTER_KIT;

-- ----------------------------------------------------------------------------
-- 1. Aggregate RING_HOPS into JSON representation per ring
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW STARTER_KIT.V_RING_HOPS_AGG AS
SELECT
    RING_ID,
    '[' || GROUP_CONCAT(
        '{"hop_type":"' || HOP_TYPE || '","from":"' || FROM_ENTITY || '","to":"' || TO_ENTITY || '"' ||
        COALESCE(',"invoice_id":"' || INVOICE_ID || '"', '') ||
        COALESCE(',"value":' || CAST(VALUE AS VARCHAR(30)), '') ||
        COALESCE(',"hs_code":"' || HS_CODE || '"', '') ||
        COALESCE(',"invoice_date":"' || CAST(INVOICE_DATE AS VARCHAR(10)) || '"', '') ||
        COALESCE(',"discounting_date":"' || CAST(DISCOUNTING_DATE AS VARCHAR(10)) || '"', '') ||
        COALESCE(',"bridge_kind":"' || BRIDGE_KIND || '"', '') ||
        COALESCE(',"bridge_evidence":' || BRIDGE_EVIDENCE, '') ||
        '}'
        ORDER BY HOP_INDEX SEPARATOR ','
    ) || ']' AS HOPS_JSON
FROM STARTER_KIT.RING_HOPS
GROUP BY RING_ID;

-- ----------------------------------------------------------------------------
-- 1b. View: S_externality Columnar Aggregation via RING_ENTITIES Junction
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW STARTER_KIT.V_RING_EXTERNALITY AS
WITH
INV_FROM AS (
    SELECT re.RING_ID, inv.INVOICE_ID, inv.VALUE
    FROM STARTER_KIT.RING_ENTITIES re
    JOIN STARTER_KIT.INVOICES inv ON re.ENTITY_ID = inv.FROM_ENTITY
),
INV_TO AS (
    SELECT re.RING_ID, inv.INVOICE_ID, inv.VALUE
    FROM STARTER_KIT.RING_ENTITIES re
    JOIN STARTER_KIT.INVOICES inv ON re.ENTITY_ID = inv.TO_ENTITY
),
RING_INV_ALL AS (
    SELECT RING_ID, INVOICE_ID, VALUE FROM INV_FROM
    UNION
    SELECT RING_ID, INVOICE_ID, VALUE FROM INV_TO
),
RING_INV_INTERNAL AS (
    SELECT f.RING_ID, f.INVOICE_ID, f.VALUE
    FROM INV_FROM f
    JOIN INV_TO t ON f.RING_ID = t.RING_ID AND f.INVOICE_ID = t.INVOICE_ID
)
SELECT
    a.RING_ID,
    CAST(COALESCE(SUM(i.VALUE), 0) AS DOUBLE) / NULLIF(CAST(SUM(a.VALUE) AS DOUBLE), 0) AS SCORE_EXTERNALITY
FROM RING_INV_ALL a
LEFT JOIN RING_INV_INTERNAL i ON a.RING_ID = i.RING_ID AND a.INVOICE_ID = i.INVOICE_ID
GROUP BY a.RING_ID;

--/
-- ----------------------------------------------------------------------------
-- 2. UDF: S_value (Net Position Imbalance over Interior Entities)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT.CALC_S_VALUE(hops_json VARCHAR(2000000), entities_json VARCHAR(2000000))
RETURNS DOUBLE AS
import json
import math

PARAMS_TAU_V = 0.15

def run(ctx):
    if ctx.hops_json is None:
        return None
    try:
        hops = json.loads(ctx.hops_json)
    except Exception:
        return None

    invoice_hops = [h for h in hops if h.get("hop_type") == "invoice"]
    if not invoice_hops:
        return None

    nets = {}
    incoming_targets = set()
    outgoing_sources = set()

    for hop in invoice_hops:
        src = hop.get("from") or hop.get("source") or ""
        tgt = hop.get("to") or hop.get("target") or ""
        val = hop.get("value", 0)

        nets[src] = nets.get(src, 0) + val
        nets[tgt] = nets.get(tgt, 0) - val

        incoming_targets.add(tgt)
        outgoing_sources.add(src)

    try:
        ring_entities = json.loads(ctx.entities_json) if ctx.entities_json else []
    except Exception:
        ring_entities = []

    interior = {e for e in ring_entities if e in incoming_targets and e in outgoing_sources}
    if not interior:
        return None

    sum_abs_nets = sum(abs(nets.get(e, 0)) for e in interior)
    sum_values = sum(hop.get("value", 0) for hop in invoice_hops)

    if sum_values == 0:
        return None

    imbalance = sum_abs_nets / sum_values
    return float(math.exp(-imbalance / PARAMS_TAU_V))
/

--/
-- ----------------------------------------------------------------------------
-- 3. UDF: S_product (3-Tier HS Code Transformation Progression)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT.CALC_S_PRODUCT(hops_json VARCHAR(2000000))
RETURNS DOUBLE AS
import json
import statistics

def run(ctx):
    if ctx.hops_json is None:
        return None
    try:
        hops = json.loads(ctx.hops_json)
    except Exception:
        return None

    invoice_hops = [h for h in hops if h.get("hop_type") == "invoice"]
    if len(invoice_hops) < 2:
        return None

    pairs_scores = []
    for i in range(len(invoice_hops) - 1):
        code_a = invoice_hops[i].get("hs_code")
        code_b = invoice_hops[i + 1].get("hs_code")
        if code_a is None or code_b is None:
            continue
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
    return float(statistics.mean(pairs_scores))
/

--/
-- ----------------------------------------------------------------------------
-- 4. UDF: S_timing (Invoice Date Regularity & Spacing Variance)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT.CALC_S_TIMING(hops_json VARCHAR(2000000))
RETURNS DOUBLE AS
import json
import math
import datetime
import statistics

PARAMS = {
    "tau_t": 30.0,
    "cv_ref": 0.60,
    "w_uniform": 0.5,
}

def run(ctx):
    if ctx.hops_json is None:
        return None
    try:
        hops = json.loads(ctx.hops_json)
    except Exception:
        return None

    invoice_hops = [h for h in hops if h.get("hop_type") == "invoice"]
    dates = []
    for hop in invoice_hops:
        d_str = hop.get("invoice_date")
        if not d_str:
            return None
        try:
            dates.append(datetime.datetime.strptime(d_str, "%Y-%m-%d").date())
        except Exception:
            return None

    if len(dates) < 3:
        return None

    gaps = [abs((dates[i + 1] - dates[i]).days) for i in range(len(dates) - 1)]
    mean_gaps = statistics.mean(gaps)
    if mean_gaps == 0:
        return 1.0

    cv = statistics.stdev(gaps) / mean_gaps if len(gaps) > 1 else 0.0
    shrink = min(1.0, (len(gaps) - 1) / 4.0)
    w_uniform = PARAMS["w_uniform"] * shrink
    w_speed = 1.0 - w_uniform

    return float(w_uniform * (1.0 - min(cv / PARAMS["cv_ref"], 1.0)) + w_speed * math.exp(-mean_gaps / PARAMS["tau_t"]))
/

--/
-- ----------------------------------------------------------------------------
-- 5. UDF: Aggregate Score (Weighted Geometric Mean over Non-Abstained Signals)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT.CALC_AGGREGATE(
    s_val DOUBLE, s_prod DOUBLE, s_time DOUBLE, s_ext DOUBLE
)
RETURNS DOUBLE AS
import math

EXPONENTS = {
    "value": 0.25,
    "product": 0.25,
    "timing": 0.25,
    "externality": 0.25,
}

def run(ctx):
    scores = {
        "value": ctx.s_val,
        "product": ctx.s_prod,
        "timing": ctx.s_time,
        "externality": ctx.s_ext,
    }
    non_abstained = {k: v for k, v in scores.items() if v is not None}
    if not non_abstained:
        return 0.0

    total_weight = sum(EXPONENTS[k] for k in non_abstained)
    val = 0.0
    for k, signal_val in non_abstained.items():
        weight = EXPONENTS[k] / total_weight
        val += weight * math.log(max(signal_val, 1e-9))

    return float(math.exp(val))
/

--/
-- ----------------------------------------------------------------------------
-- 6. UDF: Abstained Signals Serialization
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT.CALC_ABSTAINED(
    s_val DOUBLE, s_prod DOUBLE, s_time DOUBLE, s_ext DOUBLE
)
RETURNS VARCHAR(255) AS
import json

def run(ctx):
    abstained = []
    if ctx.s_val is None:
        abstained.append("value")
    if ctx.s_prod is None:
        abstained.append("product")
    if ctx.s_time is None:
        abstained.append("timing")
    if ctx.s_ext is None:
        abstained.append("externality")
    return json.dumps(abstained)
/

--/
-- ----------------------------------------------------------------------------
-- 7. UDF: Expected Loss in Rupees
-- ----------------------------------------------------------------------------
CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT.CALC_EXPECTED_LOSS(
    agg_score DOUBLE, hops_json VARCHAR(2000000)
)
RETURNS DECIMAL(18, 0) AS
import json

def run(ctx):
    if ctx.agg_score is None or ctx.hops_json is None:
        return 0
    try:
        hops = json.loads(ctx.hops_json)
        tot_val = sum(int(h.get("value", 0)) for h in hops if h.get("hop_type") == "invoice")
        return int(round(ctx.agg_score * tot_val))
    except Exception:
        return 0
/
