# Exasol audit trail — local-only

This branch (`EXASOL-VERSION`) wires a real audit trail into Circe, backed
by Exasol, as the sponsor integration for DevJams'26. Every escalation,
dismissal, or documented override on a ring is written to a real Exasol
table and read back live — not mocked.

## Why this is local-only, on purpose

The Circe demo is deployed to Vercel as a static site + Python serverless
functions (`api/health.py`, `api/rescore.py`). Those functions run in an
ephemeral cloud sandbox with no route back to a developer's laptop, so a
serverless `/api/audit` function could never reach an Exasol instance
running locally. Rather than fake that connection or maintain a broken
Vercel route, the audit trail lives **only** in `server.py`, the local
dev server — and degrades honestly (a clear `503`, not a crash or fake
data) if Exasol isn't running or `pyexasol` isn't installed.

`pyexasol` is deliberately **not** in the root `requirements.txt` — adding
it there would force Vercel's Python build to install a dependency that
can never be used in that environment, and it would violate this repo's
long-standing "no third-party dependencies beyond `jsonschema`/`pytest`"
convention (see `WIRE_PROTOCOL.md` §2) for every other track. It's an
opt-in, local-only extra — see setup below.

## Setup

1. **Exasol Personal Local Starter Kit** running locally (Docker-based).
   See the `local-agent-ready-starter` setup skill, or
   [Exasol's own starter-kit docs](https://github.com/exasol/personal-local-starter-kit).
2. Create the table:
   ```bash
   # via exakit's SQL client, or any Exasol-connected tool, as the admin (sys) user
   ```
   Run the DDL in [`schema.sql`](schema.sql).
3. Install the one local-only dependency:
   ```bash
   pip install pyexasol
   ```
4. Run the server as usual:
   ```bash
   python server.py 8420
   ```
   It prints an `Audit:` line alongside `Health:`/`Rescore:` once it starts.
5. Open `http://localhost:8420/demo/` — the **AUDIT TRAIL** tab reads and
   writes against your local Exasol instance. If Exasol isn't reachable,
   the tab says so plainly instead of showing fake rows.

## What it actually does

- `GET /api/audit?ring_id=R5541` — full audit history for one ring, oldest first
- `GET /api/audit` — all rows, newest first
- `POST /api/audit` — insert one entry. Validated: `ring_id` must look like
  a real ring id, `action_type` ∈ `{flagged, escalated, override_documented}`,
  `actor` is required, and `note` is **required** when documenting an
  override — an undocumented override is exactly the record a compliance
  reviewer would ask about.

Credentials are read from the Exasol starter kit's own credential file
(`~/.exasol-starter-kit/credentials/nano_sys_password`) at request time —
never hardcoded, never logged, never committed.
