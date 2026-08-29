"""M0 smoke test: the stub produces schema-valid output with exactly two
rings, one of each closure_type, and each hop vocabulary correctly gated."""
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent


def test_m0_stub_output_matches_committed_fixture():
    fixture_path = REPO_ROOT / "fixtures" / "candidate_rings.sample.json"
    with open(fixture_path, encoding="utf-8") as f:
        doc = json.load(f)

    assert doc["schema_version"] == 1
    assert doc["count"] == 2
    assert len(doc["rings"]) == 2

    closure_types = {r["closure_type"] for r in doc["rings"]}
    assert closure_types == {"transaction", "corporate"}

    corporate_ring = next(r for r in doc["rings"] if r["closure_type"] == "corporate")
    bridges = [h for h in corporate_ring["hops"] if h["hop_type"] == "corporate_bridge"]
    assert len(bridges) == 1, "corporate-closed ring must have exactly one bridge hop"

    transaction_ring = next(r for r in doc["rings"] if r["closure_type"] == "transaction")
    assert all(h["hop_type"] == "invoice" for h in transaction_ring["hops"])


def test_m0_stub_output_validates_against_schema():
    fixture_path = REPO_ROOT / "fixtures" / "candidate_rings.sample.json"
    result = subprocess.run(
        [sys.executable, str(REPO_ROOT / "contract" / "validate.py"), str(fixture_path), "--as", "candidates"],
        cwd=REPO_ROOT, capture_output=True, text=True,
    )
    assert result.returncode == 0, result.stdout + result.stderr
