# 001 — Fix popNode bounce easing on ring-graph node entrance

- **Status**: TODO
- **Commit**: 2cc9b6a (working tree also has uncommitted local edits to `demo/styles.css` from earlier this session — the code excerpts below reflect the actual current file on disk, not the committed HEAD; if your checkout doesn't match, diff against disk before editing)
- **Severity**: HIGH
- **Category**: Physicality & origin / Cohesion & tokens
- **Estimated scope**: 1 file (`demo/styles.css`), ~3 line changes

## Problem

`demo/styles.css:938` animates every node in every ring-relationship graph in with an overshoot/bounce curve:

```css
/* demo/styles.css:928-939 — current */
.ring-node {
  cursor: pointer;
}

/* Node Animations */
@media (prefers-reduced-motion: no-preference) {
  .ring-node {
    opacity: 0;
    transform-origin: center;
    transform-box: fill-box;
    animation: popNode 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation-delay: calc(var(--node-idx) * 0.1s + 0.3s);
  }
}
```

```css
/* demo/styles.css:1032-1035 — current */
@keyframes popNode {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
```

The curve `cubic-bezier(0.175, 0.885, 0.32, 1.275)` has a Y-value above 1.0 (`1.275`), which produces overshoot — combined with the keyframe's own `70% { transform: scale(1.1) }` step, the node visibly balloons past full size then springs back. That is a deliberate bounce/elastic entrance.

Why it matters here specifically: this product is a compliance/investigation dashboard for reviewing flagged trading rings (recolored this session toward a navy/champagne-gold "counsel terminal" register specifically to read as serious and professional, not playful). This animation fires on **every node, every time an analyst opens a ring's transaction-trail graph** — a "tens of times/day" interaction per an analyst's workflow, not a rare first-run moment. A bouncy overshoot on a high-frequency, serious-context element is a personality mismatch: it reads as a consumer/playful app tell in a tool meant to feel like Bloomberg Law or Relativity, not a mobile game.

## Target

Replace the bounce curve with the strong ease-out token from the design system (see Repo Conventions below), and remove the keyframe's overshoot step so `scale(1.1)` no longer appears:

```css
/* target */
@media (prefers-reduced-motion: no-preference) {
  .ring-node {
    opacity: 0;
    transform-origin: center;
    transform-box: fill-box;
    animation: popNode 0.4s var(--ease-out) forwards;
    animation-delay: calc(var(--node-idx) * 0.1s + 0.3s);
  }
}
```

```css
/* target */
@keyframes popNode {
  0% { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

Note the entry scale is `0.92`, not `0.5` — per the design system's physicality rule, nothing in the real world appears from nothing (`scale(0.5)` is too dramatic a jump for a small 8-16px graph node); the accepted range is `0.9–0.97`. `0.4s` duration is kept as-is (unchanged, still under the 300ms UI budget... note: 400ms is actually above the strict "UI animations stay under 300ms" budget, but this specific animation is an explanatory/diagram entrance, not a button/dropdown, and duration was not the flagged problem in this finding — leave duration untouched, do not "fix" it as part of this plan; it's out of scope here).

## Repo conventions to follow

`demo/styles.css` currently has **no easing custom properties** in `:root` (checked lines 6-31 as of this plan's commit stamp — only color and font tokens exist: `--bg-base`, `--accent-teal`, `--font-sans`, etc., no `--ease-*`). This plan introduces the first one.

- Add the token to the existing `:root` block at the top of `demo/styles.css`, in the same style as the existing tokens (grouped, one per line, trailing semicolon):

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

- **Check first**: another plan in this batch (`002-scope-transition-all.md`) also adds this same `--ease-out` token to the same spot. If you run that plan first (or someone already applied it), `--ease-out` will already exist in `:root` — in that case, skip re-adding it here (a duplicate CSS custom property declaration is harmless, but there's no need to add it twice). Search the file for `--ease-out` before editing `:root`.

## Steps

1. Open `demo/styles.css`. Search for `:root {` (near line 6).
2. If `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` is not already present anywhere in the `:root` block, add it just before the block's closing `}`, under a `/* Motion */` comment as shown above.
3. Find the `@media (prefers-reduced-motion: no-preference)` block containing `.ring-node` (search for `popNode`, should land near line 933-940). Change the `animation` line from:
   ```css
   animation: popNode 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
   ```
   to:
   ```css
   animation: popNode 0.4s var(--ease-out) forwards;
   ```
   Leave every other line in that rule (`opacity: 0`, `transform-origin: center`, `transform-box: fill-box`, `animation-delay: ...`) untouched.
4. Find `@keyframes popNode { ... }` (search for `@keyframes popNode`, should land near line 1032-1035). Replace the whole block:
   ```css
   @keyframes popNode {
     0% { transform: scale(0.5); opacity: 0; }
     70% { transform: scale(1.1); opacity: 1; }
     100% { transform: scale(1); opacity: 1; }
   }
   ```
   with:
   ```css
   @keyframes popNode {
     0% { transform: scale(0.92); opacity: 0; }
     100% { transform: scale(1); opacity: 1; }
   }
   ```

## Boundaries

- Do NOT touch `demo/app.js` — this is a pure CSS fix, the JS that sets `--node-idx` for staggering is correct and out of scope.
- Do NOT touch the `drawEdge` or `fadeIn` keyframes/animations in this same file — those are a separate finding (see `003-...` is NOT the edge one; the bare-`ease` entrance finding on `drawEdge`/`fadeIn` was not selected for a plan in this batch — leave those two keyframes exactly as they are).
- Do NOT change the `animation-delay` calc, the stagger timing, or the `0.4s` duration — only the easing curve and the keyframe's intermediate step are in scope.
- Do NOT rename the `--accent-teal` / `--risk-coral` / `--warn-amber` tokens — unrelated to this plan, and intentionally kept as legacy aliases per the file's own comment.
- If the code you find at `demo/styles.css:928-939` or `:1032-1035` does not match the "current" excerpts above (i.e. it's been edited since this plan was written), STOP and report the discrepancy instead of guessing at intent.

## Verification

- **Mechanical**: none available (static HTML/CSS/JS, no build step, no linter configured for this directory). Just confirm the CSS parses — open `demo/index.html` in a browser and check the DevTools console for CSS parse errors (there should be none).
- **Feel check**:
  1. Serve `demo/` locally (e.g. `python -m http.server 8098 --directory demo`) and open it in a browser.
  2. Click into any ring card's "VIEW TRANSACTION TRAIL" button to render its graph.
  3. Watch the nodes animate in. Confirm they now ease to full size smoothly with **no overshoot** — no node should visibly grow past its final size before settling. Compare to before: previously each node visibly "bounced" past full size and sprang back.
  4. In Chrome DevTools, open the Animations panel (More tools → Animations), trigger the graph render again, and set playback speed to 10%. Scrub frame-by-frame through one node's `popNode` animation and confirm the scale value never exceeds 1.0.
  5. Toggle `prefers-reduced-motion: reduce` in DevTools' Rendering panel, reload, and open a ring graph again — confirm nodes appear immediately with no animation at all (this behavior is already correct and unaffected by this plan; just confirm it still holds).
- **Done when**: `popNode`'s keyframes no longer contain a `70%` step or any `scale()` value above `1`, the `animation` line uses `var(--ease-out)` instead of the bounce cubic-bezier, and the feel-check above shows a smooth, non-bouncy entrance.
