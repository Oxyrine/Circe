# Contributing

This documents the actual workflow the team (Aakash A, Catherine A, h4ash-abdul)
used to build Circe for the Exasol AI + Data Challenge 2026, so it's here both
for reference and for anyone picking up the project after submission.

## File ownership

`.github/CODEOWNERS` assigns single-writer ownership per directory
(`graph/`, `scoring/`, `data/`/`demo/`, etc.) — see the comment at the top of
that file and `WIRE_PROTOCOL.md`'s reasoning section for why: nobody edits the
same file at the same time, checked mechanically instead of remembered.
`WIRE_PROTOCOL.md`'s dated amendment relaxes this by team agreement for
cross-track work that touches `exasol/`, `pipeline/`, `ai/`, and `demo/`
together — read that amendment before touching those directories.

## Issues and specs

Tracked as local markdown files under `.scratch/<feature-slug>/`, not GitHub
Issues — see `docs/agents/issue-tracker.md` for the exact file layout
(`spec.md`, numbered ticket files under `issues/`) and
`docs/agents/triage-labels.md` for the status vocabulary used in each ticket's
`Status:` line.

## Wire protocol

`WIRE_PROTOCOL.md` is the frozen contract between the graph engine, scoring
engine, and the demo/console frontends — JSON schema shapes, the
`schema_version`/`source_dataset`/`count` envelope, the "no third-party
dependencies beyond jsonschema/pytest" rule (carved out for `pyexasol`, see its
own amendment), and the offline-demo invariant (`demo/index.html` must render
with `artifacts/` deleted, opened directly over `file://`). Changing any shape
it defines needs a dated amendment to that file, not a silent edit.

## Branches

`main` is the integration branch. Feature work happened on short-lived
per-person branches (`a/…`, `b/…`, `c/…`) merged back via PR — see the closed
PRs on this repo for the actual history (`a/exasol-data-platform`,
`EXASOL-VERSION`, etc.).

## Running the test suite before opening a PR

```bash
pytest -q
python contract/validate.py data/*.json artifacts/*.json
```

Both are what CI runs (`.github/workflows/ci.yml`) — including the reproducibility
freshness checks (`diff -q` against regenerated artifacts), so make sure they
pass locally first.

## Commit attribution

Author and committer both set to a real name and a GitHub noreply email —
see any commit on `main` for the exact form. Nothing else required.
