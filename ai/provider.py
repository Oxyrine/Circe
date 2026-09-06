"""ai/provider.py: Thin LLM provider interface for forensic evidence-narrative generation."""

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from exasol.connection import connect, is_exasol_available


def is_ai_available() -> bool:
    """Returns True if an LLM API key is present in environment."""
    return bool(os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY"))


def build_fallback_narrative(ring: dict) -> str:
    """Generates a deterministic, rule-based forensic explanation when AI is unconfigured."""
    ring_id = ring.get("ring_id", "Unknown")
    closure_type = ring.get("closure_type", "transaction")
    agg = ring.get("aggregate", 0.0)
    exp_loss = ring.get("expected_loss", 0)
    scores = ring.get("scores", {})
    ev = ring.get("evidence", {})
    abstained = ring.get("abstained", [])

    lines = [
        f"INVESTIGATION MEMORANDUM // RING ID: {ring_id}",
        f"Classification: {'SUSPECTED FRAUDULENT CIRCULAR TRADING' if agg >= 0.70 else 'CLEARED / BENIGN LOOP'}",
        f"Aggregate Risk Score: {agg:.2f} | At-Risk Exposure: INR {exp_loss:,}",
        f"Closure Mechanism: {closure_type.upper()}-CLOSED LOOP",
        "",
        "FORENSIC SIGNALS SUMMARY:",
    ]

    if "value" not in abstained and scores.get("value") is not None:
        lines.append(f"- Flow Balance: Score {scores['value']:.2f} ({ev.get('value', 'Near-zero net value retained')})")
    else:
        lines.append("- Flow Balance: Abstained (no interior invoice hops)")

    if "product" not in abstained and scores.get("product") is not None:
        lines.append(f"- Commodity Continuity: Score {scores['product']:.2f} ({ev.get('product', 'HS code progression consistent')})")
    else:
        lines.append("- Commodity Continuity: Abstained (unassigned or missing HS codes)")

    if "timing" not in abstained and scores.get("timing") is not None:
        lines.append(f"- Velocity / Timing: Score {scores['timing']:.2f} ({ev.get('timing', 'Rapid round-trip settlement')})")
    else:
        lines.append("- Velocity / Timing: Abstained (insufficient hop sequence)")

    if "externality" not in abstained and scores.get("externality") is not None:
        lines.append(f"- Economic Isolation: Score {scores['externality']:.2f} ({ev.get('externality', 'High ratio of internal ring trade')})")

    if ev.get("industry"):
        lines.append(f"- Industry Compatibility: {ev['industry']}")

    if closure_type == "corporate":
        lines.append("")
        lines.append("CRITICAL METADATA FINDING:")
        lines.append("The terminal transaction leg was deliberately omitted from on-platform invoice ledgers. Circe reconstructed the closed topology through corporate cross-holdings (shared director DIN, address, or incorporation date).")

    return "\n".join(lines)


def call_gemini_api(prompt: str, api_key: str) -> str:
    """Calls Gemini REST API using stdlib urllib to preserve zero-dependency invariant."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 600
        }
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        candidates = res.get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            if parts:
                return parts[0].get("text", "").strip()
    return ""


def log_ai_action_to_exasol(ring_id: str, note: str, aggregate_val: float, closure_type: str, actor="ai_governance"):
    """Persists generated narrative actions to CIRCE_AUDIT_LOG."""
    if not is_exasol_available():
        return
    try:
        conn = connect()
        try:
            sql = '''
            INSERT INTO "STARTER_KIT"."CIRCE_AUDIT_LOG"
            ("RING_ID", "ACTION_TYPE", "ACTOR", "ACTOR_ROLE", "NOTE", "AGGREGATE_AT_TIME", "CLOSURE_TYPE_AT_TIME")
            VALUES (?, 'narrative_generated', ?, 'evidence_explainer', ?, ?, ?)
            '''
            conn.execute(sql, (
                ring_id,
                actor,
                note[:2000],
                float(aggregate_val),
                closure_type,
            ))
        finally:
            conn.close()
    except Exception:
        pass


def generate_narrative(ring: dict, actor="investigator") -> dict:
    """Generates an evidence narrative. The LLM explains findings but does not make the fraud decision."""
    ring_id = ring.get("ring_id", "Unknown")
    agg = float(ring.get("aggregate", ring.get("aggregate_score", 0.0)))
    closure_type = ring.get("closure_type", "transaction")
    exp_loss = int(ring.get("expected_loss", 0))

    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        narrative = build_fallback_narrative(ring)
        log_ai_action_to_exasol(ring_id, narrative, agg, closure_type, actor=actor)
        return {
            "ring_id": ring_id,
            "status": "deterministic_fallback",
            "ai_available": False,
            "narrative": narrative,
            "governance_note": "Generated via deterministic evidence engine. Model decides, LLM explains.",
        }

    system_prompt = (
        "You are an AI Forensic Auditor for an institutional invoice discounting platform (TReDS). "
        "Your role is strictly explanatory: analyze the provided mathematical scoring signals and corporate metadata, "
        "and produce a concise, professional compliance memo summarizing why this ring was flagged or cleared. "
        "Do NOT invent facts; ground every statement in the provided scores, evidence, and closure mechanism."
    )
    user_prompt = (
        f"{system_prompt}\n\n"
        f"RING METRICS:\n"
        f"- Ring ID: {ring_id}\n"
        f"- Closure Type: {closure_type}\n"
        f"- Aggregate Score: {agg:.2f}\n"
        f"- Expected Loss: INR {exp_loss:,}\n"
        f"- Component Scores: {json.dumps(ring.get('scores', {}))}\n"
        f"- Abstained Signals: {json.dumps(ring.get('abstained', []))}\n"
        f"- Raw Evidence Strings: {json.dumps(ring.get('evidence', {}))}\n\n"
        f"Produce a structured compliance-ready narrative."
    )

    try:
        narrative = call_gemini_api(user_prompt, api_key)
        if not narrative:
            narrative = build_fallback_narrative(ring)
        log_ai_action_to_exasol(ring_id, narrative, agg, closure_type, actor=actor)
        return {
            "ring_id": ring_id,
            "status": "llm_generated",
            "ai_available": True,
            "narrative": narrative,
            "governance_note": "Generated via LLM evidence synthesis. Model decides, LLM explains.",
        }
    except Exception as e:
        fallback = build_fallback_narrative(ring)
        return {
            "ring_id": ring_id,
            "status": "llm_error_fallback",
            "ai_available": False,
            "error": str(e),
            "narrative": fallback,
            "governance_note": "Generated via deterministic evidence engine fallback.",
        }
