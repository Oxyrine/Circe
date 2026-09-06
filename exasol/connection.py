"""exasol/connection.py: Central connection factory for Exasol Personal / Nano."""

import os
from pathlib import Path

try:
    import pyexasol
    _HAS_PYEXASOL = True
except ImportError:
    _HAS_PYEXASOL = False

_EXASOL_CRED_PATH = Path.home() / ".exasol-starter-kit" / "credentials" / "nano_sys_password"
_EXASOL_DSN = os.environ.get("EXASOL_DSN", "127.0.0.1:8563")
_EXASOL_USER = os.environ.get("EXASOL_USER", "sys")
_EXASOL_SCHEMA = os.environ.get("EXASOL_SCHEMA", "STARTER_KIT")


def get_exasol_password() -> str:
    """Reads Exasol password from environment or starter-kit credentials file."""
    env_pass = os.environ.get("EXASOL_PASSWORD")
    if env_pass:
        return env_pass.strip()
    if _EXASOL_CRED_PATH.exists():
        return _EXASOL_CRED_PATH.read_text(encoding="utf-8").strip()
    raise FileNotFoundError(
        f"Exasol credential file not found at {_EXASOL_CRED_PATH} and EXASOL_PASSWORD not set."
    )


def is_exasol_available() -> bool:
    """Probes whether pyexasol is installed and local credentials exist."""
    if not _HAS_PYEXASOL:
        return False
    if os.environ.get("EXASOL_PASSWORD"):
        return True
    return _EXASOL_CRED_PATH.exists()


def connect(autocommit=True):
    """Establishes a connection to the Exasol database.

    Raises:
        ImportError: If pyexasol is not installed.
        ConnectionError: If connection cannot be established.
    """
    if not _HAS_PYEXASOL:
        raise ImportError(
            "pyexasol is not installed. Install with: pip install pyexasol"
        )

    password = get_exasol_password()
    try:
        conn = pyexasol.connect(
            dsn=_EXASOL_DSN,
            user=_EXASOL_USER,
            password=password,
            schema=_EXASOL_SCHEMA,
            encryption=True,
            websocket_sslopt={"cert_reqs": 0},
            autocommit=autocommit,
        )
        return conn
    except Exception as e:
        raise ConnectionError(f"Failed to connect to Exasol at {_EXASOL_DSN}: {e}") from e
