# 003 — Add fade+scale entrance/exit to the three modals

- **Status**: TODO
- **Commit**: 2cc9b6a (working tree also has uncommitted local edits to `demo/styles.css` from earlier this session — the code excerpts below reflect the actual current files on disk, not the committed HEAD; if your checkout doesn't match, diff against disk before editing)
- **Severity**: Missed opportunity (additive — see AUDIT.md category 8, not a "broken" finding)
- **Category**: Missed opportunities / Physicality & origin
- **Estimated scope**: 3 files (`demo/styles.css`, `demo/app.js`, `demo/index.html`), ~20 call-site edits. This is JS + CSS, not CSS-only like the other two plans in this batch — read the whole plan before starting.

## Problem

All three modals (`#invoice-modal`, `#entity-modal`, `#add-invoice-modal`) open and close purely by toggling a `.hidden` class that sets `display: none !important` (`demo/styles.css:60-62`):

```css
/* demo/styles.css:60-62 — current, do not change this rule */
.hidden {
  display: none !important;
}
```

`display` cannot be transitioned, so every modal currently pops in and out instantly with zero motion — no fade, no scale. Per the audit playbook's frequency table, modals are "occasional" frequency and are expected to get a standard entrance/exit animation (200-500ms); right now they get none. This is the kind of jarring, teleporting state change category 8 (missed opportunities) calls out directly: an analyst opening an invoice or entity detail (a routine part of reviewing a flagged ring) gets an abrupt cut instead of a moment that explains "this appeared."

Current modal CSS:

```css
/* demo/styles.css:658-667 — current */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(11, 14, 20, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}
```

```css
/* demo/styles.css:669-678 — current */
.modal-window {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-muted);
  width: 800px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(11, 14, 20, 0.6);
}
```

There are **13 call sites** across `demo/app.js` and `demo/index.html` that directly toggle the `hidden` class on one of these three modal elements. Doing the fix per-call-site (e.g. wrapping each one in a `setTimeout`) would duplicate exit-timing logic 13 times. The correct, minimal-diff fix is one pair of helper functions that own the open/close timing, with every call site routed through them.

## Target

### CSS — `demo/styles.css`

Add `opacity`/`transform` treatment scoped only to `.modal-overlay` / `.modal-window`, gated by a new `.is-open` class. Do **not** touch the `.hidden` rule itself — it's shared by non-modal elements elsewhere in this file (the transaction-trail and investigation-timeline containers also toggle `.hidden` for instant layout removal, and must keep working exactly as they do today).

```css
/* demo/styles.css:658-667 — target */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(11, 14, 20, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 200ms var(--ease-out);
}

.modal-overlay.is-open {
  opacity: 1;
}

@starting-style {
  .modal-overlay.is-open {
    opacity: 0;
  }
}
```

```css
/* demo/styles.css:669-678 — target */
.modal-window {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-muted);
  width: 800px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(11, 14, 20, 0.6);
  transform: scale(0.96);
  opacity: 0;
  transition: transform 200ms var(--ease-out), opacity 200ms var(--ease-out);
}

.modal-overlay.is-open .modal-window {
  transform: scale(1);
  opacity: 1;
}

@starting-style {
  .modal-overlay.is-open .modal-window {
    transform: scale(0.96);
    opacity: 0;
  }
}
```

Why `@starting-style`: it lets an element that is transitioning from "not rendered" (`display: none`) to rendered play a transition on its very first paint, without the classic double-`requestAnimationFrame` hack. It's supported in current Chrome/Edge (117+), Safari (17.5+), and Firefox (129+). This is an internal tool with a controlled browser environment, so this is an acceptable baseline. **Graceful degradation**: on an unsupported browser, the `@starting-style` block is simply ignored — the modal will fall back to instant pop-in (today's exact current behavior), not break.

Why `scale(0.96)` and not `scale(0)` or smaller: per the physicality rule, nothing in the real world appears from nothing; `0.9–0.97` is the accepted range for entrance scale.

### JS — `demo/app.js`

Add two helper functions near the very top of the file, right after `"use strict";` (before the existing `// --- PHASE 6 ADDITIONS ---` comment):

```js
/* demo/app.js:1-3 — current */
(function () {
  "use strict";

  var SIGNALS = ["value", "product", "timing", "externality"];
```

becomes:

```js
/* demo/app.js:1-3 — target */
(function () {
  "use strict";

  var MODAL_TRANSITION_MS = 200; // keep in sync with the opacity/transform transition-duration on .modal-overlay / .modal-window in styles.css

  // Centralized modal open/close so every call site gets the same fade+scale
  // treatment instead of an instant display:none toggle. Attached to window
  // because two onclick="" attributes in index.html call closeModal directly
  // from global scope.
  window.openModal = function (el) {
    if (!el) return;
    el.classList.remove("hidden");
    el.classList.add("is-open");
  };

  window.closeModal = function (el) {
    if (!el) return;
    el.classList.remove("is-open");
    window.setTimeout(function () {
      el.classList.add("hidden");
    }, MODAL_TRANSITION_MS);
  };

  var SIGNALS = ["value", "product", "timing", "externality"];
```

Then replace every direct `classList`/`hidden` toggle on the three modal elements with a call to these helpers. Every occurrence of each exact snippet below gets the exact same replacement (safe to do as a find-and-replace-all per snippet — every occurrence of a given snippet has identical intent, verified by reading each one's surrounding context):

| Occurrences | Find (exact text) | Replace with |
|---|---|---|
| 1 | `document.getElementById("add-invoice-modal").classList.remove("hidden");` | `openModal(document.getElementById("add-invoice-modal"));` |
| 1 | `document.getElementById("invoice-modal").classList.remove("hidden");` | `openModal(document.getElementById("invoice-modal"));` |
| 1 | `document.getElementById("entity-modal").classList.remove("hidden");` | `openModal(document.getElementById("entity-modal"));` |
| 1 | `document.getElementById("add-invoice-modal").classList.add("hidden");` | `closeModal(document.getElementById("add-invoice-modal"));` |
| 2 | `document.getElementById("entity-modal").classList.add("hidden");` | `closeModal(document.getElementById("entity-modal"));` |
| 3 | `document.getElementById("invoice-modal").classList.add("hidden");` | `closeModal(document.getElementById("invoice-modal"));` |
| 2 | `if (m) m.classList.add("hidden");` | `if (m) closeModal(m);` |

Plus three single-occurrence replacements in the outside-click handler near the end of the file (each variable name is unique, so match on the full line):

```js
/* demo/app.js — current, inside the trailing document.addEventListener("click", ...) block */
  var imodal = document.getElementById("invoice-modal");
  if (imodal && !imodal.classList.contains("hidden") && e.target === imodal) {
    imodal.classList.add("hidden");
  }
  var emodal = document.getElementById("entity-modal");
  if (emodal && !emodal.classList.contains("hidden") && e.target === emodal) {
    emodal.classList.add("hidden");
  }
  var amodal = document.getElementById("add-invoice-modal");
  if (amodal && !amodal.classList.contains("hidden") && e.target === amodal) {
    amodal.classList.add("hidden");
  }
```

becomes:

```js
/* demo/app.js — target */
  var imodal = document.getElementById("invoice-modal");
  if (imodal && !imodal.classList.contains("hidden") && e.target === imodal) {
    closeModal(imodal);
  }
  var emodal = document.getElementById("entity-modal");
  if (emodal && !emodal.classList.contains("hidden") && e.target === emodal) {
    closeModal(emodal);
  }
  var amodal = document.getElementById("add-invoice-modal");
  if (amodal && !amodal.classList.contains("hidden") && e.target === amodal) {
    closeModal(amodal);
  }
```

(Note: these three `.add("hidden")` calls are each unique in the file — do not confuse them with the table above; they're inside variables named `imodal`/`emodal`/`amodal`, not matched by the table's `getElementById(...)` patterns.)

### HTML — `demo/index.html`

Two inline `onclick` attributes on `#add-invoice-modal`'s buttons close it directly. Every occurrence of this exact snippet gets the same replacement (2 occurrences — the `&times;` close button and the `CANCEL` button):

Find:
```html
onclick="document.getElementById('add-invoice-modal').classList.add('hidden');"
```

Replace with:
```html
onclick="window.closeModal(document.getElementById('add-invoice-modal'));"
```

## Repo conventions to follow

- `demo/styles.css` currently has **no easing custom properties** in `:root` (only color/font tokens exist as of this plan's commit stamp). This plan's target CSS uses `var(--ease-out)`. Two other plans in this batch (`001-fix-popnode-bounce-easing.md`, `002-scope-transition-all.md`) also add this same token to the same `:root` block — check whether it's already present (search the file for `--ease-out`) before adding it again:

  ```css
  /* add to :root in demo/styles.css, right before its closing } -- unless already present */
    /* Motion */
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  ```

- This codebase already exposes functions on `window` specifically so inline `onclick=""` HTML attributes can call them from global scope — e.g. `window.submitAddInvoice`, `window.removeInvestigatorInvoice`, `window.viewRing` all follow this pattern (search `demo/app.js` for `window.` to see the convention). `openModal`/`closeModal` follow the exact same convention.
- The IIFE at the top of `demo/app.js` (`(function () { "use strict"; ... })();`) is the only top-level structure in the file — add the two new functions inside it, not outside.

## Steps

1. In `demo/styles.css`, ensure `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` exists in `:root` (add it under a `/* Motion */` comment if not already present from another plan in this batch).
2. In `demo/styles.css`, update the `.modal-overlay` rule (search for `.modal-overlay {`, near line 658) to the target shown above: add `opacity: 0;` and `transition: opacity 200ms var(--ease-out);`, then add the new `.modal-overlay.is-open { opacity: 1; }` rule and the `@starting-style` block, directly after the existing rule.
3. In `demo/styles.css`, update the `.modal-window` rule (search for `.modal-window {`, near line 669) to the target shown above: add `transform: scale(0.96);`, `opacity: 0;`, and the transition line, then add the new `.modal-overlay.is-open .modal-window { ... }` rule and its `@starting-style` block, directly after the existing rule.
4. In `demo/app.js`, insert the `MODAL_TRANSITION_MS` var and the two `window.openModal`/`window.closeModal` function definitions immediately after `"use strict";` and before the existing `var SIGNALS = [...]` line, exactly as shown in Target above.
5. In `demo/app.js`, apply every row of the find/replace table above. Use "replace all occurrences of this exact string" for each row — every occurrence of a given snippet is semantically identical (verified above), so a blind replace-all per row is safe here.
6. In `demo/app.js`, apply the three-line outside-click-handler replacement shown above (unique lines, not part of the table).
7. In `demo/index.html`, replace both occurrences of the inline `onclick="document.getElementById('add-invoice-modal').classList.add('hidden');"` with `onclick="window.closeModal(document.getElementById('add-invoice-modal'));"`.
8. Search both `demo/app.js` and `demo/index.html` one more time for the strings `classList.add("hidden")`, `classList.add('hidden')`, `classList.remove("hidden")`, `classList.remove('hidden')` restricted to the three modal ids (`invoice-modal`, `entity-modal`, `add-invoice-modal`) to confirm none were missed. (Other elements — e.g. `trailContainer`/`timelineContainer`, `clearBtn.style.display` — legitimately still use `.hidden` or inline `style.display` directly and must NOT be touched; see Boundaries.)

## Boundaries

- Do NOT change the `.hidden` rule itself (`demo/styles.css:60-62`) — it's shared by non-modal elements (transaction-trail/investigation-timeline containers) that must keep collapsing instantly via `display: none`.
- Do NOT route the transaction-trail (`trailContainer`) or investigation-timeline (`timelineContainer`) `hidden` toggles through `openModal`/`closeModal` — those are not modals, they're inline content panels; leave every `trailContainer.classList...` / `timelineContainer.classList...` call in `demo/app.js` exactly as it is.
- Do NOT touch `clearBtn.style.display = ...` calls — that's a separate inline-style toggle unrelated to the `.hidden` class, out of scope.
- Do NOT add any animation library or dependency — this is plain CSS transitions + `@starting-style`, no new `<script src>` and no `package.json` changes (there is no `package.json` in `demo/`).
- Do NOT change `z-index`, `backdrop-filter`, colors, or sizing on `.modal-overlay`/`.modal-window` — only the properties shown in Target.
- If any of the "current" code excerpts above (CSS or JS) don't match what you find on disk, or if the occurrence counts in the find/replace table don't match (e.g. you find 4 occurrences of a snippet expected to have 3), STOP and report the discrepancy instead of guessing which ones to change.

## Verification

- **Mechanical**: none available (static HTML/CSS/JS, no build step). Open `demo/index.html` in a browser and confirm zero console errors (a broken `openModal`/`closeModal` reference would throw `TypeError: ... is not a function` the moment any modal-opening button is clicked).
- **Feel check**:
  1. Serve `demo/` locally (e.g. `python -m http.server 8098 --directory demo`) and open it in a browser.
  2. Click any ring's transaction trail row to open the invoice modal (or click "+ ADD INVOICE" for the add-invoice modal). Confirm it now fades in and scales up from ~96% to 100%, instead of popping in instantly.
  3. Close it (via the `×` button, the `CANCEL` button if applicable, or by clicking the dark overlay outside the window). Confirm it now fades out and scales down before disappearing, instead of vanishing instantly.
  4. Open the entity modal from within an invoice modal (click a "VIEW ENTITY" button if present) and confirm the invoice modal closes with the same fade while the entity modal opens with the same fade — no flash of both being fully opaque at once, no dead instant-hidden state visible mid-transition.
  5. In Chrome DevTools' Rendering panel, enable "Emulate CSS media feature prefers-reduced-motion: reduce", reload, and open a modal again. Since this plan's CSS is not gated behind a `prefers-reduced-motion` media query, the fade+scale will still play — this is acceptable for a 200ms opacity/scale modal transition (well within what reduced-motion allows: "keep transitions that aid comprehension, remove position changes" per the audit playbook; this isn't a position/parallax effect). Confirm it does NOT feel like a "position change" — if it does, treat as a new finding for a future plan, do not silently add a media query as part of this plan (out of scope; report it in your plan-completion notes instead).
  6. Rapidly open and close the same modal several times in a row (double-click the trigger, or spam the close button). Confirm no visual glitching — the modal should never get stuck half-visible, and repeated triggers should each restart the transition cleanly (a CSS `transition`, unlike a `@keyframes animation`, retargets from the current state instead of restarting from zero, so this should already work correctly by construction — this step confirms it does, not fixes anything).
  7. On a browser without `@starting-style` support (or by checking `CSS.supports("@starting-style")` returns false in an older engine if you have one available), confirm the modal still opens/closes correctly, just without the fade (instant pop, matching pre-plan behavior) — not broken, not stuck hidden.
- **Done when**: all three modals fade+scale in and out smoothly in a modern browser, the outside-click-to-close and the `×`/`CANCEL` buttons all still work, no console errors appear, and the non-modal `trailContainer`/`timelineContainer` hidden-toggle behavior is unchanged (still instant, as intended).
