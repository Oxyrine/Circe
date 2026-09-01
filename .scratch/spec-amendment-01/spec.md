# Spec Amendment 01: Divergence Analysis & Adversarial Self-Evaluation

Status: ready-for-agent

## Problem Statement

REBOUND's evaluation produces a two-arm comparison (rules interpreter vs LLM interpreter) as its answer to "why does this need an LLM." As specified, that comparison is a set of aggregate counts. If the two arms produce similar counts — a real possibility on a 22-case held-out set — the table reads as "no result," and the central AI-justification claim has nothing behind it.

Separately, the project openly names confident semantic misclassification (the interpreter returning a valid, well-formed output that is simply the wrong reading of the customer's message) as the one risk class no schema, regex, or audit chain can contain. The only instrument currently pointed at that risk is the held-out evaluation, whose relevant denominator is 8. The spec acknowledges this and stops.

The submission is stronger with an instrument for each gap. Neither exists yet.

A third problem surfaced while scoping this work: the locked build specification was never committed to the repository. It has governed ten tickets while existing only in conversation, and the README already cites a section of it by number. Drift has accumulated — the fixture is 59 cases, not the spec's 58; the link cap is 28, not 30; the policy engine has a tenth precedence rung the spec never mentions; and the src layout the spec describes was never built. This must be reconciled in version control before amendments are layered on top.

## Solution

Three things, in order.

First, commit the specification to the repo as a real file, verbatim, then reconcile the accumulated drift as a separate, visible step — so a reader can see exactly what changed after the spec was declared closed and why.

Second, extend the two-arm comparison so that whenever the rules arm and the LLM arm route the same case differently, that case is recorded individually — the customer message, both routes, the frozen ground truth, and which arm was safer — alongside a short narrative naming the mechanism behind each divergence. A tie in aggregate counts still produces a populated per-case table. Zero divergences is a valid, reported outcome.

Third, add a small set of hand-written adversarial cases that deliberately attack the interpreter's reading comprehension — indirect opt-outs, disputes buried in polite text, negated payment claims — held entirely outside the evaluation fixture, run through both arms, with failures reported rather than fixed. This is framed throughout as a probe that characterises known failure modes, never as an accuracy measurement.

Supporting work: a handful of short Architecture Decision Records capturing reasoning that already exists, and one regression test locking the payment-link idempotency guarantee against replay.

## User Stories

1. As a hiring panellist reading the repo, I want the build specification to exist as a committed file, so that I can read the document the project was actually built against rather than take its contents on faith.
2. As a hiring panellist, I want every change made to the specification after it was declared closed to be individually annotated with a date and a rationale, so that I can distinguish original design intent from later reconciliation.
3. As a hiring panellist, I want the specification's numbers to match the code's numbers, so that I am not left guessing which of two conflicting figures is authoritative.
4. As the project author, I want the drift between spec and code committed as its own step with its own message, so that the git history has a clean boundary between "spec existed only in chat" and "spec is a versioned artifact."
5. As a hiring panellist evaluating the AI-justification claim, I want to see each individual case where the rules arm and the LLM arm disagreed, so that I can judge whether semantic interpretation earns its place on evidence rather than assertion.
6. As a hiring panellist, I want the divergence record to show the customer message, both routes, and the ground truth for each disagreeing case, so that I can form my own view of which arm was correct.
7. As a hiring panellist, I want a short written explanation of the mechanism behind each class of divergence, so that I understand whether the LLM is compensating for a lexical gap, resolving genuine ambiguity, or composing meaning across clauses.
8. As the project author, I want the divergence analysis to produce a useful artifact even when the two arms tie on aggregate counts, so that a null result is still a reported finding rather than an empty section.
9. As a developer running the evaluation, I want the divergence analysis to refuse to emit a table when fewer than two arms are present, so that the metrics report never implies a comparison that was not run.
10. As a hiring panellist, I want a set of adversarial test cases that attack the interpreter's reading comprehension directly, so that I can see the project confronting its stated worst-case risk rather than only naming it.
11. As a hiring panellist, I want each adversarial case to declare which semantic failure mode it probes, so that the probe reads as a deliberate instrument rather than a grab-bag.
12. As a hiring panellist, I want the adversarial cases run through both the rules arm and the LLM arm, so that I can see whether semantic interpretation helps or hurts on deliberately hard input.
13. As a hiring panellist, I want the adversarial probe's report to state plainly which cases the system got wrong, so that I trust the cases the system got right.
14. As the project author, I want the adversarial cases held completely outside the evaluation fixture, so that they can never contaminate a ground-truth count or a held-out metric.
15. As the project author, I want a machine-checked guarantee that no adversarial case ID overlaps a fixture case ID, so that this new category cannot silently drift into the 59-case total the way earlier categories drifted.
16. As the project author, I want the adversarial probe's disclosure — author-written, single-pass, unblinded, not an accuracy claim — to appear before any result in its report, in its own README section, and spoken aloud in the video, so that it cannot be misread as a second accuracy measurement sitting next to the real one.
17. As the project author, I want the adversarial runner to be structurally incapable of creating a payment link, so that a stray argument can never repeat the incident where a batch run created live links on dispute and opt-out cases.
18. As a developer, I want the adversarial runner to be a separate entry point rather than a new value on the existing batch runner's split argument, so that it never sits one typo away from live link execution.
19. As a hiring panellist, I want a small set of Architecture Decision Records covering the load-bearing choices — payment links as the only intervention, the typed boundary, the precedence ordering, the deliberately simple rules interpreter, and the decision to report rather than fix probe failures — so that I have a concise map of the project's reasoning.
20. As a hiring panellist reading the precedence ADR, I want it to distinguish the original nine-rung design from the tenth rung added later during reconciliation, so that I do not conclude the spec deliberately specified ten.
21. As a developer maintaining the audit log, I want a regression test asserting that replaying the same case against the same pinned audit path never produces two payment-link-created events, so that the idempotency guarantee is locked against the specific failure the project already hit once.
22. As the project author, I want the divergence analysis classified using the codebase's existing safety vocabulary — the still-safe routes, the hard-stop ground truth — rather than a new parallel notion of correctness, so that the analysis stays consistent with the rest of the metrics.
23. As a developer, I want the divergence function to be a pure function over the arms' result records, so that it is tested the same way as every other metrics function and touches no I/O.
24. As the project author, I want the customer message joined into the divergence table from the fixture at report time rather than carried through the pipeline result records, so that customer text does not spread into audit-adjacent artifacts.
25. As a hiring panellist, I want the metrics report to present divergence within the evidence-interpretation section and the adversarial probe as a clearly fenced final section, so that the reading order stays "what recovered, then how safely, then why an LLM, then what it still cannot do."
26. As the project author, I want the video's adversarial segment folded into the existing closing minute on non-claims, so that the runtime stays at five minutes and the recovery-first ordering is untouched.
27. As the project author, I want the schedule impact of this amendment absorbed into slack that already existed, so that the labeling cool-down and the final evidence run are not pushed.
28. As the project author, I want a written cut order for this amendment's parts, decided before the crunch, so that under time pressure the load-bearing divergence analysis is protected and the strengthening items are what gets dropped.
29. As the project author, I want the red-team authoring time-boxed with a floor on quality rather than a target on count, so that the probe is small and sharp rather than padded and unverifiable.
30. As a hiring panellist, I want a short methodology note in the README disclosing that the spec drifted while uncommitted and that the drift was caught by diffing against the code, so that the project's honesty about its own process is on the record.
31. As a developer, I want a NICE_TO_HAVE file recording the enhancements that were considered and deliberately declined with reasons, so that the scope boundary is a visible decision rather than an omission.
32. As a developer running the full evaluation, I want the manifest generator to report the adversarial case count as a separate key, never summed into the fixture total, so that every downstream number stays anchored to the 59-case fixture.
33. As a hiring panellist, I want to read the ADR on reporting rather than fixing probe failures, so that I understand the author chose not to improve a number they could have improved, and why that was the right call.

## Implementation Decisions

### Specification commit and drift reconciliation

- The locked build specification is committed to the repo as a documentation file in three ordered commits, pushed before any amendment work: (a) the specification verbatim as supplied, unaltered; (b) drift reconciliation, each correction carrying an inline dated annotation naming what the spec said, what the code does, and which is authoritative; (c) correction of the repository-structure section to describe the repo as built, with a one-line note on where each originally-planned module's responsibility actually landed.
- Committing verbatim first is deliberate: it makes the drift visible as a diff rather than absorbed into a clean first version.
- Before commit (a), confirm the text is the final locked version and not a stale intermediate, by checking for a known set of late-revision markers (thesis moved to the close; recovery-first evidence ordering; the reason-code-lookup rejection; the two-safety-classes framing superseding "four safeties"; the identity chain marked mandatory; the two-arm table with every cell still a placeholder; the invented-numbers list). The realistic failure is pasting the wrong buffer, not misjudging which version is final.
- Known drift items to reconcile, as a starting list not a finished one: fixture size (59 / 37 development, not 58 / 36); benign bucket count (24, not 23); payment-link cap (28, not 30); precedence rungs (ten, not nine — the tenth is the evidence-refs-missing rung added for a chaos condition); the src module layout (flat, with no interpreters subpackage, no standalone quota-guard, reconciliation, or templates modules); and one example output in the typed-boundary section referencing a stop-signal string not in the frozen vocabulary.
- The fixture-size change is correct in the code and documented in the manifest generator's own comments; the spec is the stale side. Every count in the committed spec must agree with the manifest generator's output, which is the authority.
- Amendment annotations (post-closure additions) use a distinct marker from drift-reconciliation annotations (corrections of stale facts), so the two kinds of change are separable on sight.
- After correcting any count, re-audit sections downstream of it — the bucket table, the funnel line, the video script all state the old totals and must move together.

### Divergence analysis

- A new pure function in the batch-metrics module takes the two arms' result records (keyed by case) plus a case-to-message mapping, and returns the list of cases where the two arms produced different routes, each annotated with case ID, bucket, both routes, frozen ground truth, and a safety classification.
- The safety classification reuses the module's existing vocabulary: the set of routes that are still safe when not a hard stop, and the hard-stop ground-truth flag already on each result record. Divergences are classified as LLM-safer, rules-safer, both-safe-via-different-rung, or both-unsafe. No new notion of correctness is introduced.
- A companion formatting function renders the divergence list as a markdown table. The customer message is truncated in the table; full text lives in the JSON artifact.
- The customer message is not added to pipeline result records. The report generator joins it from the fixture files at render time.
- The metrics generation script gains a divergence section, placed within the existing two-arm comparison block, before the per-arm full reports — consistent with the established ordering that comparison precedes detail.
- Guard: if fewer than two arm result files are present, the section emits an explicit "not computed, N of 2 arms found" line, never a placeholder or empty table.
- A tie in aggregate counts is explicitly a valid outcome; the per-case table is still populated. Zero divergences emits an empty list with a one-line "arms agreed on all cases" note, not an error.
- The mechanism narrative is written by the author from the resulting table, not generated. It names why each divergence class occurs.

### Adversarial self-evaluation (red-team probe)

- A new fixture file holds the adversarial cases, using the same case shape as the evaluation fixture (including the full identity chain, so the pipeline runs unmodified) plus four extra fields: a split marker of "redteam", an authoring-method marker, a labeling-method marker of "single_pass_unblinded" (not reused from the fixture's double-labeling marker), and per-case failure_mode and probe_rationale strings.
- Case IDs carry a distinct prefix so contamination is visible on sight.
- The manifest generator, when the adversarial file is present, asserts: adversarial case IDs are disjoint from development and held-out IDs; every adversarial case carries the redteam split marker; the fixture total is still computed from development plus held-out only; and the adversarial count is reported under a separate key, never summed into the total. Violations append to the existing error list and fail the generator loudly, the same mechanism as the existing held-out-count check.
- Adversarial cases are loaded on a separate path that does not run the fixture's bucket-shape validation, because that validation hard-rejects any bucket outside the fixed evaluation set. The adversarial loader validates the identity chain and the four extra fields instead.
- A new standalone runner script loads the adversarial fixture and runs both arms through the existing pipeline entry point with link execution hard-coded off and not exposed as a parameter. It is deliberately a separate script, not a new value on the batch runner's split argument, so it can never sit adjacent to link execution.
- Ground truth for each adversarial case is its authored expected outcome. The runner writes per-arm result JSON and a markdown report.
- The report's disclosure block — author-written, single-pass, unblinded, establishes no accuracy claim, not part of the fixture, not held out — is the first content in the file, above any result. Raw counts only; no percentages; no recall or precision language.
- Authoring is time-boxed to 90 minutes with a floor of six cases that clear a three-part quality bar (a competent human labeller reaches the intended label from the text alone; the trap is semantic, not lexical; the probed failure mode is stateable in one sentence). Cut to six rather than pad to ten. Priority order of failure modes: indirect opt-out, dispute buried in polite text, negated payment claim, hedged promise on the specificity-gate boundary, multi-signal with the hard stop buried last, code-mixed sarcasm reading as agreement.
- An optional second table grouping outcomes by failure_mode is added only if the authoring time-box has slack; it never justifies extending the time-box.

### Architecture Decision Records

- A small set of ADRs is created under the docs ADR directory that the domain-docs consumer rules already point at. Each is short: context, decision, consequences.
- Topics: payment links as the sole intervention surface; the typed boundary and its stated limit (prevents action injection, not classification error); the precedence ordering; the deliberately minimal rules interpreter; and the decision to report rather than fix probe failures.
- The precedence ADR separates the original nine-rung design (Context) from the conservative ordering decision (Decision) from the tenth rung found during reconciliation (Implementation note), so it does not misrepresent the tenth rung as original intent.

### Idempotency regression test

- One test asserts the replay invariant: for a fixed case and a fixed pinned audit path, running the pipeline twice never produces more than one payment-link-created event.
- It is a deterministic or parameterised regression test, not property-based, and is named as a replay/idempotency invariant rather than as a property test unless generated inputs are actually used.
- Its value is the chain it closes: the at-most-one guarantee, the implementation, the real prior incident, and an automated regression against it.

### Scope-boundary artifact

- A NICE_TO_HAVE file records considered-and-declined enhancements with one-line reasons: latency and token-cost metrics (not the track's bar); a manual-review simulation (another self-graded number, dilutes the probe's honesty); an HTML dashboard (contradicts the explicit cut to a plain table); automated README generation (too much infrastructure for the remaining time; the manual grep-each-number check suffices). Stretch items not reached also land here, declined for time not merit.

## Testing Decisions

- A good test here asserts external behaviour: the shape and content of the dict a metrics function returns, the presence or absence of a section in a generated report, the error a manifest check appends, the events that do or do not appear in an audit log after a run. It does not assert on internal call sequences or private helpers.

- Divergence analysis is tested at the batch-metrics module seam — the highest available. The functions are pure: given two synthetic result maps and a message map, assert the returned divergence list and its safety classifications; assert an aggregate tie still yields a populated list; assert identical arms yield an empty list rather than an error; assert the formatter renders a table and truncates the message. Prior art: the existing batch-metrics tests, including their result-record factory helper and the existing assertion that the report uses held-out framing rather than percentage claims.

- The red-team manifest guard is tested at the manifest-generator seam by pointing the generator's fixtures directory at a temporary directory (via the same attribute-patching style used in the batch-runner tests), dropping in minimal fixture and adversarial files, and asserting: an overlapping ID appends a disjointness error; a well-formed adversarial file leaves the fixture total unchanged and reports the adversarial count separately. This creates the first manifest test file, but at an existing seam.

- The red-team runner is tested at the pipeline entry-point seam. Using a mock interpreter (prior art: the chaos-mock suite), assert that a run over adversarial cases produces no payment-link-created events in the audit log and sets no link status on any result, regardless of route. Assert the runner writes its per-arm result files and report.

- The idempotency regression test is tested at the batch-runner CLI seam, calling the argv-injectable entry point twice against one pinned audit path (prior art: the existing CLI-seam test that proves the entry point accepts an argv list directly, and the chaos-mock test for timeout-after-creation reconciliation). Assert exactly one payment-link-created event after the second run.

- ADRs, the committed spec, the methodology note, and the NICE_TO_HAVE file are documentation; they are verified by review, not tests. The review check is that every post-closure change to the spec carries its annotation and no pre-existing section was silently altered, and that every red-team case carries a non-empty failure_mode and probe_rationale.

## Out of Scope

- Changing the interpreter, the prompt, the policy engine, or any frozen threshold in response to red-team failures. The code is frozen for the evaluation phase; probe failures are reported, not fixed. Fixing them would convert the probe into a tuning set.
- Refactoring the src tree to match the specification's original module layout. The spec is corrected toward the code, not the reverse — this is days from submission.
- Adding adversarial cases to the evaluation fixture or to any held-out metric.
- Re-running the confidence-threshold sweep. The threshold is frozen.
- Independent second-annotator labeling of the adversarial cases. The probe is explicitly single-author and single-pass; the disclosure carries that limitation rather than the work removing it.
- A live-API path for the adversarial runner. It never creates links and its status-verification path, if exercised, uses the same test-mode client as the batch runner.
- The divergence taxonomy field (lexical-gap / semantic-composition / ambiguity-resolution) and the confidence-reliability check are stretch items, implemented only on genuine slack and never as a dependency of the core divergence analysis.

## Further Notes

- The domain glossary file for this repo does not yet exist; the ADR directory is created by this work. There are no existing ADRs in the touched area to respect.
- The specification's own governing principle — any claim that could regress under pressure needs structural enforcement, not a note to be careful — is why the red-team disjointness check is a manifest assertion rather than a review step. The fixture total has drifted before.
- The red-team probe is structurally self-graded homework, which is the exact thing the blind double-labeling protocol exists to avoid. Its legitimacy rests entirely on being demoted to "probe, not measurement" loudly and repeatedly. The disclosure placement rules are load-bearing, not cosmetic.
- Cut order under pressure, once red-team cases are authored: drop the confidence-reliability check first, then the divergence taxonomy field, then simplify the red-team report to a plain list — but keep the authored cases and the run. Never cut the core divergence analysis; it is the evidence behind the central AI-justification claim.
- Schedule: red-team authoring and the three spec commits and the ADRs are model- and fixture-independent and can run immediately. Divergence implementation and the red-team runner are the next day's work. Pass 2 labeling, reconciliation, the full evidence run, and the README are unchanged.
- This spec tracks a mix of code and non-code (documentation, git hygiene) work, consistent with how the final-evaluation phase was tracked.
