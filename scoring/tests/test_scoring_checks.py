"""scoring/tests/test_scoring_checks.py: Connects run_checks to pytest."""

from scoring.scoring import run_checks


def test_scoring_checks():
    """Runs all 12 regression, specification, and adversarial test asserts."""
    run_checks()
