# 002 — Scope `transition: all` to explicit properties

- **Status**: TODO
- **Commit**: 2cc9b6a (working tree also has uncommitted local edits to `demo/styles.css` from earlier this session — the code excerpts below reflect the actual current file on disk, not the committed HEAD; if your checkout doesn't match, diff against disk before editing)
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file (`demo/styles.css`), 3 rules changed

## Problem

Three separate rules in `demo/styles.css` use `transition: all`, which the design-engineering playbook flags as an always-a-finding pattern: it animates every animatable property that changes on the element, including layout-affecting ones the author never intended to animate, and it's less GPU-friendly than transitioning only `transform`/`opacity`/specific paint properties.

**Location 1 — `demo/styles.css:185-198`**, the primary nav tabs (`RING REVIEW` / `INVOICE LEDGER`), hit on every tab switch:

```css
/* demo/styles.css:185-198 — current */
.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 12px 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}
```

Only `color` and `border-bottom-color` ever actually change on this element (via `.tab-btn:hover` and `.tab-btn.active`, plus the `:active { transform: scale(0.98) }` rule added elsewhere in this file).

**Location 2 — `demo/styles.css:418-431`**, shared by every secondary button (`VIEW TRANSACTION TRAIL`, `VIEW INVESTIGATION TIMELINE`, `+ ADD INVOICE`, `CLEAR INVESTIGATOR DATA`, form buttons — anything with class `.btn`, `.view-trail-btn`, or `.view-timeline-btn`):

```css
/* demo/styles.css:418-431 — current */
.view-trail-btn, .view-timeline-btn, .btn {
  background-color: var(--bg-base);
  color: var(--text-main);
  border: 1px solid var(--border-muted);
  padding: 6px 12px;
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 2px;
  text-transform: uppercase;
  transition: all 0.2s;
}
```

The properties that actually change on these elements: `border-color` and `background-color` (via `:hover`, `.primary-action`, `.danger-action`), and `transform` (via the `:active { transform: scale(0.98) }` rule at `demo/styles.css:438-441`, which currently rides along inside this same `all` transition).

**Location 3 — `demo/styles.css:914-919`**, every node circle in every ring graph, hit on every hover while an analyst is exploring a ring's structure:

```css
/* demo/styles.css:914-919 — current */
.node-circle {
  fill: var(--bg-panel);
  stroke: var(--accent-teal);
  stroke-width: 2px;
  transition: all 0.2s ease;
}
```

The properties that actually change on this element (via `.ring-node:hover .node-circle` at `demo/styles.css:944-948`): `fill`, `stroke`, `stroke-width`.

## Target

```css
/* demo/styles.css:185-198 — target */
.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 12px 4px;
  cursor: pointer;
  transition: color 0.2s var(--ease-out), border-bottom-color 0.2s var(--ease-out), transform 0.15s var(--ease-out);
  text-transform: uppercase;
}
```

```css
/* demo/styles.css:418-431 — target */
.view-trail-btn, .view-timeline-btn, .btn {
  background-color: var(--bg-base);
  color: var(--text-main);
  border: 1px solid var(--border-muted);
  padding: 6px 12px;
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 2px;
  text-transform: uppercase;
  transition: border-color 0.2s var(--ease-out), background-color 0.2s var(--ease-out), transform 0.15s var(--ease-out);
}
```

```css
/* demo/styles.css:914-919 — target */
.node-circle {
  fill: var(--bg-panel);
  stroke: var(--accent-teal);
  stroke-width: 2px;
  transition: fill 0.2s var(--ease-out), stroke 0.2s var(--ease-out), stroke-width 0.2s var(--ease-out);
}
```

Note the `transform` sub-duration is `0.15s`, not `0.2s` — press feedback should be snappier than hover color transitions per the duration budget table (button press feedback: 100-160ms; this file's other hover transitions use 200-300ms). `color` also gets an explicit easing token in Location 1 even though it previously ran on generic `ease` implicitly (default `transition` timing function) — using `var(--ease-out)` everywhere keeps the file's easing consistent rather than mixing the new token with the browser default on adjacent properties of the same rule.

## Repo conventions to follow

`demo/styles.css` currently has **no easing custom properties** in `:root` (checked lines 6-31 as of this plan's commit stamp — only color and font tokens exist). This plan introduces the first one.

- Add the token to the existing `:root` block at the top of `demo/styles.css`:

  ```css
  /* demo/styles.css:6 — current opening of :root */
  :root {
    /* Variable names kept as-is (--accent-teal etc.) even though the values
       below are no longer teal -- renaming would touch 60+ call sites for
       zero visual benefit. Treat the names as legacy aliases. */
    --bg-base: #0b0e14;
    ...
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
  }
  ```

  Add immediately before the closing `}` of `:root`:

  ```css
    /* Motion */
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  ```

- **Check first**: another plan in this batch (`001-fix-popnode-bounce-easing.md`) also adds this same `--ease-out` token to the same spot. If that plan already ran, `--ease-out` will already exist in `:root` — skip re-adding it (search the file for `--ease-out` before editing `:root`; a duplicate declaration is harmless but unnecessary).
- The existing multi-value shorthand style for `transition` (comma-separated `property duration timing-function` triples) already appears elsewhere in this file, e.g. `demo/styles.css:868`: `transition: stroke-opacity 0.3s ease, stroke-width 0.3s ease;` — follow that same comma-separated pattern, just swap the bare `ease` for `var(--ease-out)` in the three rules this plan touches (do not touch line 868 itself, it's out of scope for this plan).

## Steps

1. Open `demo/styles.css`. Search for `:root {` (near line 6).
2. If `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` is not already present anywhere in the `:root` block, add it just before the block's closing `}`, under a `/* Motion */` comment as shown above.
3. Find `.tab-btn {` (search for it, should land near line 185). Replace the line `transition: all 0.2s;` with:
   ```css
   transition: color 0.2s var(--ease-out), border-bottom-color 0.2s var(--ease-out), transform 0.15s var(--ease-out);
   ```
   Leave every other property in the rule unchanged.
4. Find `.view-trail-btn, .view-timeline-btn, .btn {` (search for it, should land near line 418). Replace the line `transition: all 0.2s;` with:
   ```css
   transition: border-color 0.2s var(--ease-out), background-color 0.2s var(--ease-out), transform 0.15s var(--ease-out);
   ```
   Leave every other property in the rule unchanged.
5. Find `.node-circle {` (search for it, should land near line 914). Replace the line `transition: all 0.2s ease;` with:
   ```css
   transition: fill 0.2s var(--ease-out), stroke 0.2s var(--ease-out), stroke-width 0.2s var(--ease-out);
   ```
   Leave every other property in the rule unchanged.

## Boundaries

- Do NOT touch any other `transition:` declaration in this file (e.g. line 868, 876, or any inside `.control-input:focus` etc.) — only the three `transition: all` rules listed above are in scope.
- Do NOT touch `demo/app.js` or `demo/index.html`.
- Do NOT change any color, spacing, or font value in the three rules — only the `transition` property's value changes.
- If any of the three "current" excerpts above don't match what you find in the file (properties added/removed since this plan was written), STOP and report the discrepancy instead of guessing which properties to list in the new explicit transition.

## Verification

- **Mechanical**: none available (static HTML/CSS/JS, no build step). Open `demo/index.html` in a browser and confirm no CSS parse errors in the DevTools console.
- **Feel check**:
  1. Serve `demo/` locally (e.g. `python -m http.server 8098 --directory demo`) and open it in a browser.
  2. Hover and click between the "RING REVIEW" and "INVOICE LEDGER" tabs. Confirm the color/underline change still fades smoothly (should look identical to before — this is a no-visual-regression fix, only the property list narrows).
  3. Hover and click any `.btn`/`.view-trail-btn` (e.g. "VIEW TRANSACTION TRAIL"). Confirm the border/background hover fade and the `:active` press-scale still both work smoothly.
  4. Open a ring's graph and hover a node circle. Confirm the fill/stroke/stroke-width change still fades smoothly.
  5. Open Chrome DevTools' Performance panel, record while rapidly hovering several buttons and tabs, and confirm no layout thrash/forced-reflow warnings tied to these three selectors (there shouldn't have been any before either — this step confirms no regression, not a fix to an existing measured problem).
- **Done when**: none of the three rules contain `transition: all` anymore, each lists only the properties that actually change on that element, and the feel-check above shows identical visual behavior to before (this plan is a performance/precision cleanup, not a visual change).
