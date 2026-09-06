"""exasol/tests/test_udf_logic.py: Verifies the exact Python UDF logic embedded in exasol/udfs.sql

against the reference implementation in scoring/scoring.py without needing Exasol running.
"""

import json
import re
from pathlib import Path
import pytest
from scoring.scoring import s_value, s_product, s_timing, aggregate


def extract_udf_code(script_name: str) -> str:
    sql_path = Path(__file__).resolve().parent.parent / "udfs.sql"
    content = sql_path.read_text(encoding="utf-8")
    pattern = rf"CREATE OR REPLACE PYTHON3 SCALAR SCRIPT STARTER_KIT\.{script_name}\(.*?\)\s*RETURNS\s+[A-Za-z0-9_(), ]+\s+AS\s*(.*?)\n/"
    m = re.search(pattern, content, re.DOTALL)
    assert m, f"Could not find UDF {script_name} in udfs.sql"
    return m.group(1).strip()


class MockContext:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)


def test_udf_s_value_logic_matches_reference():
    code = extract_udf_code("CALC_S_VALUE")
    env = {}
    exec(code, env)
    udf_run = env["run"]

    test_rings = [
        # Balanced 3-hop ring
        {
            "entities": ["E1", "E2", "E3"],
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "value": 10000000},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "value": 10000000},
                {"hop_type": "invoice", "from": "E3", "to": "E1", "value": 10000000},
            ]
        },
        # Imbalanced ring
        {
            "entities": ["E1", "E2", "E3"],
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "value": 10000000},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "value": 12000000},
                {"hop_type": "invoice", "from": "E3", "to": "E1", "value": 14000000},
            ]
        },
        # Corporate bridge hop
        {
            "entities": ["E1", "E2", "E3"],
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "value": 10000000},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "value": 10000000},
                {"hop_type": "corporate_bridge", "from": "E3", "to": "E1", "bridge_kind": "shared_director"},
            ]
        },
    ]

    for ring in test_rings:
        ref_val = s_value(ring)
        ctx = MockContext(
            hops_json=json.dumps(ring["hops"]),
            entities_json=json.dumps(ring["entities"])
        )
        udf_val = udf_run(ctx)
        if ref_val is None:
            assert udf_val is None
        else:
            assert pytest.approx(ref_val, rel=1e-5) == udf_val


def test_udf_s_product_logic_matches_reference():
    code = extract_udf_code("CALC_S_PRODUCT")
    env = {}
    exec(code, env)
    udf_run = env["run"]

    test_rings = [
        # Identical HS codes
        {
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "hs_code": "72081000"},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "hs_code": "72081000"},
                {"hop_type": "invoice", "from": "E3", "to": "E1", "hs_code": "72081000"},
            ]
        },
        # Chapter / heading match
        {
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "hs_code": "72081000"},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "hs_code": "72089999"},
                {"hop_type": "invoice", "from": "E3", "to": "E1", "hs_code": "72100000"},
            ]
        },
        # Null HS code (abstained)
        {
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "hs_code": None},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "hs_code": None},
            ]
        }
    ]

    for ring in test_rings:
        ref_val = s_product(ring, {})
        ctx = MockContext(hops_json=json.dumps(ring["hops"]))
        udf_val = udf_run(ctx)
        if ref_val is None:
            assert udf_val is None
        else:
            assert pytest.approx(ref_val, rel=1e-5) == udf_val


def test_udf_s_timing_logic_matches_reference():
    code = extract_udf_code("CALC_S_TIMING")
    env = {}
    exec(code, env)
    udf_run = env["run"]

    test_rings = [
        # Regular timing
        {
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "invoice_date": "2026-01-01"},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "invoice_date": "2026-01-05"},
                {"hop_type": "invoice", "from": "E3", "to": "E1", "invoice_date": "2026-01-09"},
            ]
        },
        # Zero-day gaps
        {
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "invoice_date": "2026-01-01"},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "invoice_date": "2026-01-01"},
                {"hop_type": "invoice", "from": "E3", "to": "E1", "invoice_date": "2026-01-01"},
            ]
        },
        # Too few hops
        {
            "hops": [
                {"hop_type": "invoice", "from": "E1", "to": "E2", "invoice_date": "2026-01-01"},
                {"hop_type": "invoice", "from": "E2", "to": "E3", "invoice_date": "2026-01-05"},
            ]
        }
    ]

    for ring in test_rings:
        ref_val = s_timing(ring)
        ctx = MockContext(hops_json=json.dumps(ring["hops"]))
        udf_val = udf_run(ctx)
        if ref_val is None:
            assert udf_val is None
        else:
            assert pytest.approx(ref_val, rel=1e-5) == udf_val


def test_udf_aggregate_logic_matches_reference():
    code = extract_udf_code("CALC_AGGREGATE")
    env = {}
    exec(code, env)
    udf_run = env["run"]

    score_combinations = [
        {"value": 1.0, "product": 1.0, "timing": 1.0, "externality": 1.0},
        {"value": 0.8, "product": 0.7, "timing": 0.9, "externality": 0.6},
        {"value": 0.9, "product": None, "timing": 0.85, "externality": 0.5},
        {"value": None, "product": None, "timing": None, "externality": None},
    ]

    for sc in score_combinations:
        ref_agg = aggregate(sc)
        ctx = MockContext(
            s_val=sc["value"],
            s_prod=sc["product"],
            s_time=sc["timing"],
            s_ext=sc["externality"],
        )
        udf_agg = udf_run(ctx)
        assert pytest.approx(ref_agg, rel=1e-5) == udf_agg
