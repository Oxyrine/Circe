# Circe (Ouroboros)

Automated discrimination of legitimate vs. fabricated circular trading rings
on a TReDS-style invoice platform. DevJams'26.

**Read [`WIRE_PROTOCOL.md`](WIRE_PROTOCOL.md) first.** It is the frozen
contract — schemas, ownership, handoff hours — and supersedes any of the
three individual track plans wherever they disagree.

## Tracks

| Owns | Person |
|---|---|
| `graph/`, `contract/`, CI | B |
| `scoring/` | A |
| `data/`, `viz/`, `demo/` | C |

One writer per folder. See `.github/CODEOWNERS`.

## Running B's track

```bash
pip install -r requirements.txt

# generate candidate rings (M0: stub output; M1+: real Tarjan + DFS)
python -m graph.run --entities data/entities.json \
                     --invoices data/invoices.json \
                     --out artifacts/candidate_rings.json \
                     --max-depth 8

# validate any artifact against its schema
python contract/validate.py artifacts/candidate_rings.json
python contract/validate.py fixtures/*.json

# tests
pytest -q
```

## Status

- [x] M0 — scaffold, five schemas, validator, CI, stub `run.py` emitting two
      fixture rings (one transaction-closed, one corporate-closed)
- [x] M1 — iterative Tarjan SCC + depth-limited DFS (`graph/scc.py`,
      `graph/cycles.py`). Each cycle found exactly once (canonical-start
      pruning), two independent budgets (found-cycle count + DFS step
      count) so a dense SCC degrades loudly instead of hanging. 34 tests.
- [x] M2 — first real handoff to A: `artifacts/candidate_rings.json`
      generated from C's real dataset, 1,758 rings at `--max-depth 6`
      (chosen over the spec's full 8 for file size — see commit `625e361`
      for the recall data behind that call). Recall against
      `ground_truth.json`: 6/6 at Jaccard≥0.5.
- [ ] M3 — corporate-graph closure (hours 16-26). Note: current recall
      hits on the two hidden-leg rings (T04, T06) come from a *different*
      overlapping cycle, not the injected ring itself — worth checking
      before M3 whether the demo needs a cleaner before/after case.
- [ ] M3.5 — real entity canonicalization (hours 24-28, if M3 lands clean)
- [ ] M4 — harden edge cases: missing HS code, missing date, duplicate
      invoices between the same pair (self-loops already filtered at M1)

## Running C's track

```bash
# generate the legitimate economy + injected fraud rings
python -m data.generate --seed 42 --regime A --out data/

# validate
python contract/validate.py data/entities.json data/invoices.json data/ground_truth.json

# tests
pytest -q  # picks up data/generator/tests/ automatically, same command as B's

# compile the viz's data.js — validates --scored first and fails loudly
# rather than shipping a bad file. --entities/--invoices are optional: give
# them to also compile a dimmed "rest of the platform" backdrop graph.
python viz/build_data.py --scored artifacts/scored_rings.json \
                          --entities data/entities.json --invoices data/invoices.json \
                          --out viz/data.js
```

Then open `viz/index.html` directly — no server (`file://` is why the data
is compiled into `data.js` rather than fetched).

C's status:

- [x] H4 fixtures — `fixtures/entities.sample.json`, `invoices.sample.json`,
      `scored_rings.sample.json`: a corporate-closed fake ring, a legitimate
      cycle, and a deliberately non-cyclic path as a negative test for B.
- [x] Emergent economy + fraud injector (`data/generator/`) — cycles arise
      from a sector trade-propensity table rather than being placed (verified:
      ~20-40k emergent simple cycles exist in the legitimate graph alone,
      before any fraud injection); the injector separately layers
      circular-trade rings on top, dropping the last leg into
      `ground_truth.json` and bridging the gap via a shared director/address
      for corporate-closed rings, and refusing to reuse an already-bridged
      entity or a pair that coincidentally already exists as a real invoice.
      `--regime B` is a config swap (`data/generate.py`), not a rewrite.
- [x] `data/entities.json`, `invoices.json`, `ground_truth.json` committed
      (seed 42, regime A), schema-valid, zero hidden-leg leakage.
- [x] `data/generator/tests/` — pytest coverage for the invariants above
      (hop-count cap, no leakage, no bridge/pair reuse, value clamp, both
      regimes run clean). Caught a real bug during review: a hidden leg
      could coincidentally match a real invoice generated elsewhere in the
      same dataset, silently un-hiding it. Fixed and pinned down by a test.
- [x] `viz/` — ring queue sorted by `expected_loss`, with a stats header
      (rings flagged, total expected loss, corporate-closed count, avg
      aggregate), each ring drawn at full fidelity over a dimmed backdrop of
      the wider platform's entities and trade edges (the "hairball" trap
      from §5 — solved per-ring rather than one shared force layout), dashed
      corporate-bridge edges with evidence on hover (verified: the tooltip
      text renders correctly), abstained signals greyed with their reason
      instead of a misleading zero, degrades to a "—" placeholder instead of
      crashing on a malformed ring. Verified at both desktop and 375px mobile
      widths. Wired to the real `artifacts/scored_rings.json` once one
      existed; ran the full `data.generate` → `graph.run` → `scoring.scoring`
      → `build_data.py` pipeline end to end against B's and A's actual code
      to confirm it (recall is 0 against `ground_truth.json` right now only
      because `graph.run` is still the M0 stub — expected at this stage, not
      a C-side bug).
- [x] `demo/` — fully self-contained frozen copy (own `app.js`/`styles.css`/
      `data.js`), independent of `viz/` and `artifacts/`. Kept on the
      hand-written fixture rather than the current rough M0 pipeline output,
      since it's meant to be the presentable backup, not a live mirror.
