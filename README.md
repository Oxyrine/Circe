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
