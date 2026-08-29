# Ouroboros — The Wire Protocol

**Ouroboros · DevJams'26 · frozen at hour 0**
Supersedes all three individual track plans wherever they disagree · Python, stdlib only · `schema_version: 1` · additive-only changes after H16

One contract, three tracks, four handoffs. Everything below is frozen before anyone opens an editor, so A, B and C can each build for sixteen hours without asking each other a single question.

---

## §1 · What changed from the individual plans

Each track was planned in isolation against the spec, so each one independently invented its own paths and field names. Nine collisions. Read this before writing code — four of these break the pipeline silently, which is the expensive kind.

### Four corrections everyone must absorb

1. **Timing gaps are `n−1`, not `n`.** Three dates give two intervals; the wrap-around gap is negative and meaningless. A's continuous `shrink` term replaces the spec's hard `n ≥ 5` gate.
   **Consequence for C:** the uniformity term only reaches full weight at 6 hops, so the dataset needs several 6–8 hop rings or the "harder half to game" signal runs at ≤25% weight on every ring in the demo. Make the hero ring a long one.

2. **The scorer takes three arguments** — `score_ring(ring, all_invoices, entities)`. Industry-consistency and commodity suppression both need entity records, not just invoices. The original plan asked for two.

3. **The scored ring carries `entities` and `hops` through verbatim.** A copies them from the candidate ring. C then loads one file instead of joining two in the browser at hour 38, and the backup demo is a single self-contained artifact.

4. **Hidden legs live in `ground_truth.json`, never in `invoices.json`.** `invoices.json` is what the platform can see, full stop. That constraint is what creates the fragments corporate-graph closure exists to close — if C leaks the missing leg into the invoice table, B's differentiator has nothing to do.

### Collisions, resolved

| Collision | Resolution | Owner |
|---|---|---|
| **Three different repo layouts** — `contract/` vs `contracts/`; `artifacts/candidate_rings.json` vs `out/candidates.json` vs `../graph/candidates.json` | B's layout, verbatim (§2). A and C rewrite path strings before writing code. | B |
| **Corporate bridge has two field vocabularies** — `hop_type/bridge_kind/bridge_evidence` vs `type/basis/detail` | B's names — B is the producer. Breaks silently on exactly the rings that are the headline. | B |
| **Scored ring had no entities or hops** — C could not draw a graph from it | A passes the ring through whole. One dict copy. | A |
| **Artifacts committed vs gitignored** — direct contradiction between plans | Committed. It is the decoupling mechanism: A never runs B's code. Single-writer rule handles conflicts. | B |
| **Validator and CI built twice**, by B and by C | B owns both. C drops it and gets ~45 minutes back at hour 2. | B |
| **`expected_loss`** — C sorts the queue by it per §8.2; A never emitted it | A emits `aggregate × Σ invoice-hop value`. Without it the demo's ordering contradicts the pitch. | A |
| **`ground_truth.json`** — C produces it, A's plan never read it | A adds Jaccard ≥ 0.5 scoring in hours 28–36. | A |
| **Dataset labelled hand-built** in B's scaffold; C is building an emergent generator that A's degradation work depends on | Emergent, small. Relabel the scaffold comment. | C |
| **Signal abstention was invisible** — A returns `None` for missing data, C had no way to render it | Scored ring carries an `abstained` array. C greys those out rather than showing a misleading zero. | A |

---

## §2 · Repo layout and single-writer ownership

One writer per file, always. This is the rule that makes parallel work safe — not branch discipline, not review. If two people can write one file, they eventually will, at 4am.

```
ouroboros/
├── contract/                          ← B
│   ├── entity.schema.json
│   ├── invoice.schema.json
│   ├── candidate_ring.schema.json
│   ├── scored_ring.schema.json
│   ├── ground_truth.schema.json
│   └── validate.py                    # validates any artifact against its schema
├── fixtures/                          ← B seeds H1, C seeds H4
│   ├── candidate_rings.sample.json    # B, hour 1 — 2 rings, one corporate-closed
│   ├── entities.sample.json           # C, hour 4
│   ├── invoices.sample.json           # C, hour 4
│   └── scored_rings.sample.json       # C, hour 4 — hand-written, unblocks the viz
├── data/                              ← C
│   ├── generator/                     # emergent economy + separate fraud injector
│   ├── entities.json
│   ├── invoices.json                  # platform-visible only
│   └── ground_truth.json              # answer key incl. hidden legs
├── graph/                             ← B
│   ├── canonicalize.py  scc.py  cycles.py  corporate.py  run.py
│   └── tests/
├── scoring/                           ← A
│   ├── scoring.py                     # PARAMS + 4 signals + aggregator + evidence
│   └── fixtures.json
├── viz/                                ← C
│   ├── index.html  app.js  styles.css
│   ├── build_data.py                  # scored_rings.json → data.js
│   └── data.js                        # generated, committed
├── artifacts/                          # COMMITTED. single writer each.
│   ├── candidate_rings.json           ← B only, ever
│   └── scored_rings.json              ← A only, ever
├── demo/                               ← C
│   └── data.js                        # frozen H36, the backup demo
├── .github/CODEOWNERS
├── .github/workflows/ci.yml
└── README.md
```

> **The one rule.** `artifacts/*.json` is **committed to git**, not ignored. That is what lets A never install B's code and C never run A's — the handoff is a commit, not a meeting. If you ever see a merge conflict inside a generated artifact, do not resolve it line by line:
> ```bash
> git checkout --ours artifacts/candidate_rings.json && python -m graph.run
> ```

### CODEOWNERS

Not bureaucracy — it is what makes "nobody edits the same file" mechanical instead of remembered.

```
/graph/       @person-b
/contract/    @person-b
/scoring/     @person-a
/data/        @person-c
/viz/         @person-c
/demo/        @person-c
/fixtures/    @person-c   # except candidate_rings.sample.json, seeded by B at H1
```

**No third-party dependencies.** Tarjan, DFS and union-find are stdlib; every formula in the discriminator is a mean, a stdev and an `exp`. `pytest` and `jsonschema` for tests only. Do not add `networkx` — `simple_cycles` is not depth-bounded, which is the one property the design actually needs.

---

## §3 · The four schemas

Frozen. After hour 16, changes are additive only — new optional fields yes, renames and removals no. Every artifact file carries `schema_version` and `source_dataset`; that second field is what catches "A scored regime A but C is rendering regime B."

### Entity — *C produces, B and A consume*

```json
{
  "id":                "E001",
  "name":              "Vertex Steel Trading Pvt Ltd",
  "industry_code":     "NIC-4662",
  "industry_class":    "trading",        // manufacturing | trading | distribution | services
  "directors":         ["D7", "D12"],
  "address":           "12 MG Road, Bengaluru 560001",
  "registration_date": "2024-11-03"
}
```

`industry_class` exists so A's commodity-trading suppression is a field lookup, not an NIC mapping table A has to build. C emits it directly. **C emits no normalised address** — normalisation is B's job at `canonicalize.py`, and handing B a pre-cleaned field would make the messiness robustness claim hollow.

### Invoice — *C produces, B and A consume*

```json
{
  "invoice_id":       "I0001",
  "from":             "E001",
  "to":               "E002",
  "value":            100000000,     // INTEGER rupees. never a float.
  "hs_code":          "72081000",    // 8-digit string, or null under messiness
  "invoice_date":     "2026-03-01",  // ISO. what A scores on.
  "discounting_date": "2026-03-10"  // present, but A must never score on it
}
```

**Integer rupees, no floats** — `net_e` sums accumulate drift, and §7.1's worked check depends on landing on exact zero. **IDs are stable strings, never array indices** — indices break the first time anyone filters a list.

### Candidate ring — *B produces → A consumes*

```json
{
  "ring_id":       "R01",
  "canonical_key": "E001|E002|E003",   // lexicographically smallest ROTATION
  "closure_type":  "corporate",        // "transaction" | "corporate"
  "entities":      ["E001", "E002", "E003"],
  "hops": [
    { "hop_type": "invoice",
      "from": "E001", "to": "E002", "invoice_id": "I0001",
      "value": 100000000, "hs_code": "72081000",
      "invoice_date": "2026-03-01", "discounting_date": "2026-03-10" },

    { "hop_type": "corporate_bridge",   // max ONE per ring
      "from": "E003", "to": "E001",
      "bridge_kind": "shared_director",  // | shared_address | registration_cohort
      "bridge_evidence": { "director_id": "D7", "director_name": "..." } }
  ]
}
```

> **Why `hop_type` is load-bearing.** A corporate bridge has no `value`, no `hs_code`, no `invoice_date`. **A skips every `corporate_bridge` hop in all four signals.** If A sums `v_i` across `hops` naively, `S_value` and `S_timing` corrupt on precisely the rings that are the project's differentiator — and they corrupt quietly, producing plausible numbers. C renders the bridge as a dashed edge with `bridge_evidence` on hover, which is the single best visual on the demo.

### Scored ring — *A produces → C consumes*

```json
{
  "ring_id":       "R01",
  "canonical_key": "E001|E002|E003",
  "closure_type":  "corporate",
  "entities":      ["E001", "E002", "E003"],   // ← copied through verbatim
  "hops":          [ /* copied through verbatim */ ],
  "scores": { "value": 0.91, "product": null, "timing": 0.85, "externality": 0.70 },
  "abstained":     ["product"],        // signals with no usable data; C greys these
  "aggregate":     0.82,               // weighted geo-mean over NON-abstained, renormalised
  "expected_loss": 246000000,          // aggregate × Σ invoice-hop value, integer rupees
  "evidence": {
    "value":       "Nets to within 2% across 4 hops — ₹40cr in, ₹40cr out, no margin anywhere",
    "product":     "No HS codes on 3 of 4 hops — signal abstained",
    "timing":      "All 4 hops invoiced within 6 days, gaps of 2/1/3 days",
    "externality": "89% of these firms' platform volume is with each other",
    "industry":    "E003 invoices electronics under a steel-trading registration"
  }
}
```

**C sorts the queue by `expected_loss`, not `aggregate`** — §8.2 is a triage claim, and sorting by the wrong field makes the demo contradict the pitch. The `industry` evidence line is deliberately outside `scores`: the industry-consistency check stays out of the aggregate so no number needs a compound explanation in Q&A, and C gets a second concrete line per ring for free.

### Ground truth — *C produces → A consumes*

```json
{
  "injected_rings": [
    { "truth_id": "T01",
      "entities": ["E001", "E002", "E003"],
      "hidden_legs": [ { "from": "E003", "to": "E001", "value": 100000000 } ] }
  ]
}
```

`hidden_legs` are the invoices that never reached the platform. They exist **only** here — never in `invoices.json`. A ring with a hidden leg is a path in the transaction graph, and closing it is exactly what B's corporate-graph work has to prove. **Hit rule, decided now:** Jaccard overlap on entity sets ≥ 0.5.

### Artifact wrapper

```json
{ "schema_version": 1,
  "source_dataset": "seed42-regimeA",
  "count": 37,
  "rings": [ /* ... */ ] }
```

---

## §4 · Four handoffs, and nothing else

Every other hour is independent. If you find yourself waiting on someone outside these four moments, something has gone wrong with the fixtures — go write a fixture rather than waiting.

### Track lanes (hour 0 → 48)

| Track | H0–8 | H8–16 | H16–24 | H24–32 | H32–40 | H40–48 |
|---|---|---|---|---|---|---|
| **B · graph** | Tarjan + depth-limited DFS | wire + validate | **corporate-graph closure** | harden edge cases | support C | — |
| **A · scoring** | four signals on fixtures | aggregator + evidence | **tune on real rings + adversarial pass** | degradation table | Q&A prep | — |
| **C · data + viz** | fixtures (H0–4) → generator | freeze (H16) → viz shell | wire to real output | **polish — the screenshot** | backup + rehearsal | — |

*(Bold = the critical-path item for that track in that window.)*

### Handoff table

| Hour | Handoff | Who is unblocked |
|---|---|---|
| **H1** | **B pushes the scaffold** — all folders, five schemas, `validate.py`, CI, and `fixtures/candidate_rings.sample.json` holding two hardcoded rings, one of them corporate-closed. | A starts scoring against a real input shape. C has the ring shape to render. |
| **H4** | **C pushes fixtures** — 12–15 entities, invoices with one obviously fake ring, one obviously legitimate ring, one path that is deliberately not a cycle, plus a hand-written `scored_rings.sample.json`. | B gets a negative test. C's own viz is unblocked without A existing. |
| **H16** | **C says the words "dataset and schema are frozen"** in the channel, then B runs against `data/` and commits `artifacts/candidate_rings.json`. | A gets real rings with 20 hours of runway, not 4. |
| **H20** | **A commits the first real `artifacts/scored_rings.json`**, however broken. Garbage numbers are acceptable; the shape is the point. | C swaps a path and stops rendering fixtures. |

> **The one that gets skipped.** H20 is the handoff people will try to defer, because A won't feel ready. Defer it and every field-name mismatch surfaces at hour 34 instead. Demand the file broken rather than late — that is the entire reason the fixture scaffolding exists.

---

## §5 · Your track

Read your own section. The two things that matter in each: what you commit first, and the exact hour you stop depending on anyone.

### B — Graph engine
**Owns:** `graph/` · `contract/` · CI

**Dependency:** None, ever. You own your own test fixtures. You consume C's dataset at H16 but can synthesise an equivalent if it slips.

**First commit — hour 1:** Scaffold, five schemas, `validate.py`, CI, and a `run.py` that emits two hardcoded rings in the real schema. Thirty minutes of your time buys A and C a full day.

**Three properties your output must have:**
- **Deterministic order.** Sort by `canonical_key` before writing, or every rerun churns git and reshuffles C's UI.
- **Stable `ring_id`.** Assign by sorted canonical key, never discovery order. Drift here looks like a scoring bug for an hour before anyone suspects IDs.
- **Rotation-invariant dedup.** A 3-cycle is found three times. Canonical key is the smallest *rotation* — rotations only, direction is meaningful.

**Non-obvious:**
- Tarjan **iterative, not recursive** — Python's ~1000-frame limit bites on the full dataset and never on fixtures.
- `canonicalize.py` ships hour 1 as an **identity function**. Real version at H24 if closure landed clean. Pipeline shape is final either way.
- Cap cycles per SCC (~50k) with a loud warning from M1. A dense SCC must degrade noisily, not hang on stage.

**Done means:** A graph with one invoice leg deliberately removed still surfaces the ring, flagged `corporate`, with populated `bridge_evidence`. **That one test is the demo.**

### A — Discriminator
**Owns:** `scoring/scoring.py` · `fixtures.json`

**Dependency:** Blocked until H1 only. After B's fixture lands you are independent for fifteen hours.

**First commit — hour 2:** `PARAMS` dict at the top of the file, then `S_value`. Verify both §7.1 worked examples before writing signal two: all-₹10cr → exactly `1.0`; 10/12/14 → `0.2273`. If the second isn't 0.227 the loop sums the wrong direction.

**Signature:** `score_ring(ring, all_invoices, entities)`. Externality needs the full invoice table; industry consistency and commodity suppression need entity records.

**Non-obvious:**
- **Skip every `corporate_bridge` hop** in all four signals. Gate on `hop_type`, not on field presence.
- Abstention returns `None`, never `0.0` or `1.0`, and the aggregator renormalises exponents over what's left. This is what makes the §8.3 degradation table possible at all — build it hour 8, not hour 30.
- `ε = 1e-9` floors the log. A genuine zero must still collapse the aggregate; that conjunctivity is the whole reason for the geometric mean.
- Score on `invoice_date`. Never `discounting_date`.

**Never say:** That the geometric mean is **unique**, or that the signals are **independent**. Both are false and both contradict your own limitations section.

**Done means:** Six asserts pass, including one that encodes a known false positive: `assert agg > 0.7  # documented FP`.

### C — Data + demo surface
**Owns:** `data/` · `viz/` · `demo/` · `fixtures/`

**Dependency:** None after H4 — you hand-write `scored_rings.sample.json` yourself, so the viz never waits for A. You are the blocker for two people before you are blocked by zero.

**First commit — hour 4:** Four fixture files. Ship them rough. Rough and in-schema at H4 beats polished at H12, because two people are idling on them.

**The generator:**
- 25–40 firms, 3 sectors, input–output table, margin ranges, lead times. Legitimate cycles must **emerge**, not be placed — that is the answer to the hardest question you'll be asked.
- Fraud injector is a **separate** generator.
- Parameters as a config dict from day one, so the held-out regime is `--regime B` and not a rewrite.
- **Generate several 6–8 hop rings.** A's uniformity term only reaches full weight at 6 hops. Make the hero ring long or one of the four signals is switched off across the whole demo.
- Hidden legs go in `ground_truth.json` only. Leak one into `invoices.json` and B's differentiator has nothing to close.

**Two traps:**
- `file://` blocks `fetch()`. Generate `viz/data.js` as `const SCORED = {…}` and `<script src>` it. Write that step at H16, not H40 — it also makes the backup demo a folder you double-click.
- Force-directed layout on thousands of nodes is a hairball; your generator makes ~35. Render real rings at full fidelity over a dimmed synthetic backdrop. Decide at H20 so styling accounts for it.

**Done means:** One obviously-fake ring reads as fake **at a glance, unnarrated**, with four component scores and a dashed bridge edge. That frame is the submission screenshot.

---

## §6 · Git rules

- **Trunk-based, short-lived branches.** Merge to `main` every 2–3 hours. A 48-hour build with a freeze at H36 cannot survive a long-lived branch. Branches carry the owner: `b/corporate-closure`, `a/value-signal`, `c/generator`.
- **Merging to `main` is the handoff signal.** There is no other handoff mechanism. Announce in one line; don't schedule a call.
- `git config --global pull.rebase true`. **Never force-push `main`**, never rebase anything someone else has pulled.
- **PRs are optional between teammates, mandatory for `contract/`** — both other names on it before merge. That's the one place a silent change costs two people hours. This applies to B's own changes to `contract/` too — not just A's and C's.
- **After H16, schema changes are additive only.** New optional fields yes; renames and removals no.
- **Three standups: H8, H16, H28**, ten minutes, three questions each — what's on `main` from me, what am I blocked on, what shape changed. Everything else happens in commits.

---

## §7 · The shared account

Different problem from git, different answer. There is no file or session collision — Claude Code state is per-machine, so two PCs never fight over anything. The real risk is that you share one usage quota and hit the ceiling together.

**What actually goes wrong:** Two people driving hard for 48 hours burn a shared limit roughly twice as fast, and the throttle lands on both of you at the same moment — statistically somewhere around H24–32, which is your integration window. Not conflicts. Contention.

Worth saying plainly: subscriptions are individual-use, so sharing credentials is against the terms. A third account for the weekend is the clean fix if it's affordable at all.

**If it isn't, stagger by track:**
- **H0–1** — B solo. C and A are reading, not building.
- **H1–8** — **C priority.** B's Tarjan and DFS are stdlib work B can carry largely unaided.
- **H8–16** — split. C finishing the generator, B on light wiring.
- **H16–26** — **B priority.** Corporate closure is the hardest thing either of you builds. C's viz shell is CSS-heavy and needs less model time.
- **H26–36** — **C priority.** B is done; the screenshot carries the skim round.

Both machines on fast mode for routine work. Save deep reasoning for closure design and generator economics.

---

## §8 · Verification

From a clean clone of `main`, no local state. Green at H28, and again at H36 from the `demo-freeze` tag.

```bash
python -m data.generate --seed 42 --regime A --out data/
python contract/validate.py data/*.json

python -m graph.run --entities data/entities.json \
                    --invoices data/invoices.json \
                    --out artifacts/candidate_rings.json --max-depth 8
python contract/validate.py artifacts/candidate_rings.json

python scoring/scoring.py --candidates artifacts/candidate_rings.json \
                          --invoices data/invoices.json \
                          --entities data/entities.json \
                          --out artifacts/scored_rings.json
python contract/validate.py artifacts/scored_rings.json

python viz/build_data.py --scored artifacts/scored_rings.json --out viz/data.js
```

Then open `viz/index.html` directly in a browser. No server.

### Checks that must pass

| Owner | Check |
|---|---|
| B | A pure path graph returns **zero** cycles. This catches more bugs than any other test. |
| B | The same 3-cycle entered from all three nodes yields **one** ring, not three. |
| B | Run twice, `git diff --exit-code artifacts/candidate_rings.json` is clean. |
| B | A graph with one invoice leg removed still surfaces the ring, flagged `corporate`. |
| A | All-₹10cr 3-hop → `S_value == 1.0`. 10/12/14 → `0.2273` ± 1e-3. |
| A | All HS codes missing → `S_product is None`, aggregate computed from three signals with exponents renormalised. |
| A | Every injected ring in `ground_truth.json` appears in `artifacts/scored_rings.json` at Jaccard ≥ 0.5. |
| C | Rings render sorted by `expected_loss`, not `aggregate`. |
| C | At least one corporate-closed ring renders a dashed bridge edge with its `bridge_evidence` on hover. |
| C | Abstained signals render greyed with a reason, never as a zero. |
| C | **Delete `artifacts/` entirely and `demo/` still renders.** That is the backup demo, and it gets tested before H44, not at H44. |

---

*Ouroboros · Wire Protocol v1 · Frozen H0 · additive-only after H16 · supersedes the three individual track plans wherever they disagree*
