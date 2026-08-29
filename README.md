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
- [x] M3 — corporate-graph closure (`graph/corporate.py`), the stated
      differentiator. Direct pairwise evidence only (shared director /
      address / registration date), never transitive through a cluster.
      Real result: 74 corporate-closed rings on C's dataset; T04 and T06
      (the two hidden-leg ground-truth rings) now hit at Jaccard **1.00**
      via `closure_type=corporate` — the bridge recovers the exact
      injected entity set, not the coincidental overlap M1/M2 relied on.
      14 new tests, including the demo case: a ring with its closing
      invoice removed still surfaces, flagged corporate, with real
      evidence attached. 48/48 total.
- [x] M3.5 — real entity canonicalization (`graph/canonicalize.py`).
      Blocking on normalized (name, address) only — never either alone,
      that stays corporate.py's job — no fuzzy matching, no similarity
      threshold. Found and fixed a real latent bug the identity stub had
      been masking: `build_transaction_graph` and `corporate.py` were
      reading two different id-spaces (canonical vs. raw); harmless while
      canonicalization was a no-op, silently wrong the moment it wasn't.
      Fixed by computing `canon_map` once in `run.py` and threading it
      through both. Flagship test: a bridge that's only findable after
      merging two aliases' director records — proves spec §3's "same
      machinery closes fragmented loops" claim, not just asserts it.
      **Honest result on C's real dataset: zero merges** (32 entities in,
      32 singleton clusters out) — no aliased/duplicate registrations
      exist in the current generator output, so this is currently a
      no-op on live data, same observable behavior as the old identity
      stub. Machinery is real and tested; nothing to do yet on this
      dataset. 13 new tests, 71/71 total. Artifact regenerates
      byte-identical.
- [x] M4 — hardened against messy input. Two failure classes handled
      differently: a **degradable gap** (missing HS code / invoice_date /
      discounting_date) still produces the ring with the field null, for
      A's signals to abstain around — the exact behavior spec §8.3's
      messiness injection needs. An **unusable record** (invoice missing
      from/to/value, entity missing id) is skipped and counted with a
      loud stderr warning, never silently, and never crashes the run over
      one bad row. Single-node SCCs, self-loops, duplicate invoices on
      the same pair were already correct as of M1/M3 — this pass adds
      regression tests locking that in, plus a combined-messiness
      end-to-end case. 10 new tests, 58/58 total. Verified byte-identical
      output on C's real dataset before/after (no regression — these edge
      cases don't exist in what's currently committed).

**Flagged, not resolved:** `contract/invoice.schema.json` currently makes
`invoice_date`/`discounting_date` non-nullable, which conflicts with spec
§8.3's own "missing dates" messiness mode. Fixing this is a `contract/`
change and needs A+C sign-off per our own process (see `WIRE_PROTOCOL.md`
§6) — not decided unilaterally here. Candidate direction: `invoice_date`
probably stays required (basic invoice metadata), `discounting_date`
probably becomes nullable (undiscounted invoices have no discounting
date yet, and A's scoring never reads this field per §7.3 anyway, so
loosening it costs nothing downstream).

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
- [x] **Fixed the precision@k = 0% finding** (diagnosed against the real
      pipeline: first true hit at position ~51/1832, 0% precision through
      k=20). Root cause: fraud entities were sampled from the real economy's
      32-firm pool, so every fraud entity also carried substantial genuine
      trade (5–20 invoices, ₹182M–₹1.3B) — `S_externality` had no "outside
      economy" left to contrast a sealed cluster against. Five of six fraud
      rings now use freshly-minted shell entities that carry zero
      legitimate trade by construction (never touch `economy.py`'s invoice
      graph, never reused across rings); one ring is deliberately kept
      drawing from the real economy as the adversarial hard case (spec
      §8.5) rather than hiding the difficulty. Result on the real pipeline:
      recall 6/6, first true hit now at position **1**, precision@6 =
      **66.7%** (4/6 — was 0/6). New test:
      `test_clean_rings_carry_no_trade_outside_their_own_entities`.
      **Flagged for B, not changed here:** verifying this required
      `--max-depth 8` — B's own `--max-depth 6` (a deliberate file-size
      tradeoff, see M2 above) finds 0 corporate-closed rings on the fixed
      dataset where depth 8 finds the real one. `graph/` is B's file per
      CODEOWNERS; this needs a joint call, not a unilateral change.
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
