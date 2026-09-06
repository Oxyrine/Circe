"""exasol/connection.py: Central connection factory for Exasol Personal / Nano."""

import os
from pathlib import Path

try:
    import pyexasol
    _HAS_PYEXASOL = True
except ImportError:
    _HAS_PYEXASOL = False

if _HAS_PYEXASOL:
    # The Exasol Personal Local Starter Kit's Nano image reports a releaseVersion
    # like "2026.2.0-nano.3". pyexasol's exasol_db_version property parses this
    # with packaging.version.Version, which raises InvalidVersion on the
    # "-nano.3" suffix (not valid PEP 440) -- crashing pyexasol's own bulk
    # IMPORT/EXPORT path before any Circe code runs, since it consults this
    # property (via _requires_tls_public_key) to decide whether the ad-hoc,
    # self-signed certificate its local HTTP transport server generates for
    # that channel needs fingerprint pinning. Getting this right matters, not
    # just avoiding the crash: returning None here (as an earlier version of
    # this patch did) makes that check silently short-circuit to "no pinning
    # needed", which then fails differently -- the Nano container rejects the
    # unpinned self-signed cert outright ("TLSV1_ALERT_UNKNOWN_CA"). The
    # "-nano.N" suffix is a build/variant tag, not a different release line, so
    # stripping it and parsing the real "2026.2.0" underneath is the accurate
    # fix: pyexasol correctly sees a version >= 8.32.0 and engages public-key
    # pinning, which is what makes the self-signed cert trusted.
    import re

    from packaging.version import InvalidVersion, Version

    _original_exasol_db_version = pyexasol.ExaConnection.exasol_db_version.fget

    def _safe_exasol_db_version(self):
        try:
            return _original_exasol_db_version(self)
        except InvalidVersion:
            release_version = self.login_info.get("releaseVersion", "")
            match = re.match(r"^\d+(\.\d+)*", release_version)
            if match:
                try:
                    return Version(match.group(0))
                except InvalidVersion:
                    pass
            return None

    pyexasol.ExaConnection.exasol_db_version = property(_safe_exasol_db_version)

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
            # The starter kit's Nano container requires TLS on login ("Only TLS
            # connections are allowed"), so encryption can't simply be turned
            # off. cert_reqs=0 covers the query/control (websocket) channel;
            # the separate bulk import/export HTTP transport channel is
            # handled by the exasol_db_version patch above instead (see its
            # comment) -- once that reports a real, comparable version, pyexasol
            # correctly engages TLS public-key pinning for that channel rather
            # than full CA validation, which is what makes its ad-hoc
            # self-signed certificate acceptable to the Nano container.
            encryption=True,
            websocket_sslopt={"cert_reqs": 0},
            autocommit=autocommit,
        )
        return conn
    except Exception as e:
        raise ConnectionError(f"Failed to connect to Exasol at {_EXASOL_DSN}: {e}") from e
