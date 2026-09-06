"""exasol/tests/test_parity.py: Pytest parity verification test."""

import pytest
from exasol.connection import is_exasol_available
from exasol.parity import approx_equal, verify_parity


def test_approx_equal_unit():
    assert approx_equal(None, None)
    assert not approx_equal(None, 0.5)
    assert not approx_equal(0.5, None)
    assert approx_equal(0.50001, 0.50002, tol=1e-4)
    assert not approx_equal(0.51, 0.52, tol=1e-4)


def test_exasol_parity_when_live():
    if not is_exasol_available():
        pytest.skip("Local Exasol instance not running or pyexasol not installed.")

    res = verify_parity()
    assert res["status"] == "PARITY_PROVEN"
    assert res["mismatch_count"] == 0
