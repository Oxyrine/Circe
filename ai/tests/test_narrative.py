"""ai/tests/test_narrative.py: Unit tests for evidence-narrative generation."""

from ai.provider import generate_narrative, is_ai_available, build_fallback_narrative


def test_narrative_deterministic_fallback():
    sample_ring = {
        "ring_id": "R001",
        "aggregate": 0.85,
        "expected_loss": 50000000,
        "closure_type": "corporate",
        "scores": {"value": 0.9, "product": 0.8, "timing": 0.85, "externality": 0.95},
        "abstained": [],
        "evidence": {
            "value": "Net position score: 0.90",
            "product": "HS code consistency: 0.80",
            "timing": "Daily spacing: 0.85",
            "externality": "Internal volume ratio: 0.95",
            "industry": "Compatible",
        },
    }
    narrative = build_fallback_narrative(sample_ring)
    assert "R001" in narrative
    assert "SUSPECTED FRAUDULENT CIRCULAR TRADING" in narrative
    assert "CORPORATE-CLOSED LOOP" in narrative

    res = generate_narrative(sample_ring)
    assert res["ring_id"] == "R001"
    assert "narrative" in res
    assert "governance_note" in res
