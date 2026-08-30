# Investigation Console — static wireframe

A static, code-implemented reference for the CIRCE **investigator console** —
the workflow a financial investigator would actually use: triage a queue,
open a case, see why it was flagged in seconds, pivot into the corporate
network, check the transaction graph as supporting evidence, and record a
decision that's permanently logged.

Design reference (Figma, low/mid-fidelity): the wireframe this implements.

## What this is — and isn't

- **Static.** All data in `data.js` is fictional demo content (`CR-0512`,
  etc.), matching what's in the Figma file. It is **not** wired to
  `artifacts/scored_rings.json` or any other pipeline output.
- **No build step.** Vanilla HTML/CSS/JS, opens directly via `file://` — same
  convention as `demo/`. No framework, no bundler, no dependencies.
- **Separate from `demo/`.** `demo/` is C's public-facing exploration frontend
  (map, entity directory, ledger analytics). This is a distinct information
  architecture aimed at a working investigator's triage-first workflow:
  Queue → Case → Why Flagged → Network → Graph (evidence) → Decision.

## Running it

Open `console/index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8430 --directory console
```

## Structure

| File | Purpose |
|---|---|
| `index.html` | Shell — loads styles, data, and the app script |
| `data.js` | Fictional demo data: queue rows, case detail, entities, graph, audit log |
| `app.js` | Hash-router (`#/queue`, `#/case/:id`, `#/network/:id`, `#/graph/:id`, `#/log/:id`) and render functions for all 5 screens |
| `styles.css` | Grayscale wireframe styling — dark nav rail, risk badges as the only color accent |

## Screens

1. **Investigation Queue** — ranked worklist, summary stats, filters
2. **Case Detail** — "why flagged" summary delivered before any drill-down, action bar, contextual Risk Signals + Evidence panels
3. **Network Investigation** — entity-centric pivot: related entities, direct pairwise corporate-bridge evidence (never chained transitively)
4. **Transaction Graph** — framed explicitly as evidence supporting the case, not the primary surface
5. **Investigation Log** — audit timeline + decision-recording form, mirroring the real `CIRCE_AUDIT_LOG` schema (action type, actor, role, note, aggregate-at-time)
