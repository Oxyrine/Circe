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
- [ ] M1 — Tarjan SCC + depth-limited DFS (hours 1-8)
- [ ] M2 — first real handoff to A (hour 16)
- [ ] M3 — corporate-graph closure (hours 16-26)
- [ ] M3.5 — real entity canonicalization (hours 24-28, if M3 lands clean)
- [ ] M4 — harden edge cases (hours 28-36)

## Running C's track

```bash
# generate the legitimate economy + injected fraud rings
python -m data.generate --seed 42 --regime A --out data/

# validate
python contract/validate.py data/entities.json data/invoices.json data/ground_truth.json

# compile the viz's data.js from whatever scored-ring artifact exists —
# fixtures/scored_rings.sample.json until A ships one, artifacts/scored_rings.json after
python viz/build_data.py --scored artifacts/scored_rings.json --out viz/data.js
```

Then open `viz/index.html` directly — no server (`file://` is why the data
is compiled into `data.js` rather than fetched).

C's status:

- [x] H4 fixtures — `fixtures/entities.sample.json`, `invoices.sample.json`,
      `scored_rings.sample.json`: a corporate-closed fake ring, a legitimate
      cycle, and a deliberately non-cyclic path as a negative test for B.
- [x] Emergent economy + fraud injector (`data/generator/`) — cycles arise
      from a sector trade-propensity table rather than being placed; the
      injector separately layers circular-trade rings on top, dropping the
      last leg into `ground_truth.json` and bridging the gap via a shared
      director/address for corporate-closed rings. `--regime B` is a
      config swap (`data/generate.py`), not a rewrite.
- [x] `data/entities.json`, `invoices.json`, `ground_truth.json` committed
      (seed 42, regime A) and schema-valid.
- [x] `viz/` — ring queue sorted by `expected_loss`, dashed corporate-bridge
      edges with evidence on hover, abstained signals greyed with their
      reason instead of a misleading zero. Wired to the real
      `artifacts/scored_rings.json` once one existed; ran the full
      `data.generate` → `graph.run` → `scoring.scoring` → `build_data.py`
      pipeline end to end to confirm it (recall is 0 against
      `ground_truth.json` right now only because `graph.run` is still the
      M0 stub — expected at this stage, not a C-side bug).
- [x] `demo/` — fully self-contained frozen copy (own `app.js`/`styles.css`/
      `data.js`), independent of `viz/` and `artifacts/`. Kept on the
      hand-written fixture rather than the current rough M0 pipeline output,
      since it's meant to be the presentable backup, not a live mirror.
