"""Entity canonicalization — resolves firms appearing under multiple
identifiers (duplicate registrations, name/address formatting variants)
into a single canonical id. Required before any graph work (spec §6 Step
0) and shares its blocking key with §8.3 messiness robustness — a firm's
name or address getting reformatted between filings is exactly the kind
of noise this exists to absorb.

BLOCKING, not fuzzy matching: two entities merge only if their name AND
address are IDENTICAL after normalization (case, whitespace, punctuation,
and a small set of known corporate-suffix / street-type abbreviations).
No similarity threshold, no fuzzy string distance — those invite an
unanswerable "why 0.85 and not 0.8" question in Q&A, and a wrong merge is
worse than a missed one: it silently corrupts S_value's net-position math
by conflating two real firms into one node.

Deliberately a single blocking dimension, not several combined
transitively — the same reasoning as corporate.py's direct-pairwise-only
bridge evidence. Chaining "A matches B on name+address, B matches C on
some other criterion" would let genuinely different firms merge through a
weak transitive link. A plain dict-of-groups therefore does the same job
a union-find would here; a union-find only earns its keep once there is
more than one blocking dimension to combine, which this deliberately
avoids.

Address-sharing or director-sharing WITHOUT a matching name stays
corporate.py's job (bridging distinct, commonly-controlled firms), not
this module's — merging those here would destroy the very signal
corporate-graph closure depends on.
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict

_SUFFIX_RULES = [
    (re.compile(r"\bprivate limited\b"), "pvt ltd"),
    (re.compile(r"\bpvt limited\b"), "pvt ltd"),
    (re.compile(r"\blimited\b"), "ltd"),
]

_ADDRESS_RULES = [
    (re.compile(r"\broad\b"), "rd"),
    (re.compile(r"\bstreet\b"), "st"),
    (re.compile(r"\bavenue\b"), "ave"),
]

_NO_NAME_OR_ADDRESS = "__no_name_or_address__"


def _normalize(text: str, rules: list[tuple[re.Pattern, str]]) -> str:
    s = text.lower().strip()
    s = re.sub(r"[.,]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    for pattern, replacement in rules:
        s = pattern.sub(replacement, s)
    return re.sub(r"\s+", " ", s).strip()


def normalize_name(name: str) -> str:
    return _normalize(name, _SUFFIX_RULES)


def normalize_address(address: str) -> str:
    return _normalize(address, _ADDRESS_RULES)


def canonicalize(entities: list[dict]) -> dict[str, str]:
    """Return a map of entity_id -> canonical_entity_id.

    M4 hardening carried forward: an entity record missing `id` is
    skipped, loudly. A missing `name` or `address` gets its own unique
    blocking key (keyed off the still-unique id) rather than crashing or
    coincidentally colliding with another entity that's also missing the
    same field.
    """
    groups: dict[tuple[str, str], list[str]] = defaultdict(list)
    skipped = 0

    for e in entities:
        eid = e.get("id")
        if not eid:
            skipped += 1
            continue
        name = e.get("name")
        address = e.get("address")
        if name and address:
            key = (normalize_name(name), normalize_address(address))
        else:
            key = (_NO_NAME_OR_ADDRESS, eid)
        groups[key].append(eid)

    if skipped:
        print(f"[graph.canonicalize] WARNING: skipped {skipped} entity record(s) missing id", file=sys.stderr)

    canon_map: dict[str, str] = {}
    for ids in groups.values():
        canonical_id = min(ids)
        for eid in ids:
            canon_map[eid] = canonical_id

    return canon_map


def apply_canonicalization(entities: list[dict], canon_map: dict[str, str]) -> list[dict]:
    """Collapse entities onto their canonical id: one merged record per
    canonical id.

    directors = union of every alias's directors — a firm's complete
    director set can be split across duplicate filings, and merging it is
    what lets corporate.py find a bridge that was only ever recorded
    under one alias (see test_corporate_bridge_via_merged_directors).
    Every other field comes from whichever original record IS the
    canonical id — deterministic, since canonical_id is always one of the
    group's own ids.

    Entities missing id, or not present in canon_map (shouldn't happen —
    canonicalize() is expected to have been called on this same list
    first), are silently excluded here; canonicalize() already warned
    about the missing-id case.
    """
    by_canonical: dict[str, list[dict]] = defaultdict(list)
    for e in entities:
        eid = e.get("id")
        if not eid or eid not in canon_map:
            continue
        by_canonical[canon_map[eid]].append(e)

    merged = []
    for canonical_id, records in by_canonical.items():
        base = next((r for r in records if r.get("id") == canonical_id), records[0])
        directors = sorted({d for r in records for d in r.get("directors", [])})
        merged.append({**base, "id": canonical_id, "directors": directors})

    return merged
