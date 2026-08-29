#!/usr/bin/env python3
"""Validate Ouroboros artifact JSON files against their frozen schemas.

Usage:
    python contract/validate.py <file> [<file> ...]
    python contract/validate.py artifacts/*.json

Each file is matched to a schema by its top-level key ("entities" ->
entity.schema.json, "invoices" -> invoice.schema.json, "rings" containing
objects with "scores" -> scored_ring.schema.json, "rings" without ->
candidate_ring.schema.json, "injected_rings" -> ground_truth.schema.json).
Override the guess with --as when a filename doesn't make it obvious.

Also enforces one invariant JSON Schema can't express on its own: a ring
has at most one corporate_bridge hop.
"""
import argparse
import glob
import json
import sys
from pathlib import Path

try:
    import jsonschema
except ImportError:
    print("jsonschema is required: pip install jsonschema", file=sys.stderr)
    sys.exit(2)

CONTRACT_DIR = Path(__file__).parent

SCHEMA_FILES = {
    "entities": "entity.schema.json",
    "invoices": "invoice.schema.json",
    "candidates": "candidate_ring.schema.json",
    "scored": "scored_ring.schema.json",
    "ground_truth": "ground_truth.schema.json",
}


def guess_kind(doc: dict) -> str:
    if "entities" in doc:
        return "entities"
    if "invoices" in doc:
        return "invoices"
    if "injected_rings" in doc:
        return "ground_truth"
    if "rings" in doc:
        rings = doc["rings"]
        if rings and "scores" in rings[0]:
            return "scored"
        return "candidates"
    raise ValueError("cannot infer artifact kind from top-level keys")


def load_schema(kind: str) -> dict:
    path = CONTRACT_DIR / SCHEMA_FILES[kind]
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def check_single_bridge_per_ring(doc: dict, kind: str) -> list[str]:
    """JSON Schema draft-07 can't express 'at most one item matching X'."""
    if kind not in ("candidates", "scored"):
        return []
    errors = []
    for ring in doc.get("rings", []):
        bridges = [h for h in ring.get("hops", []) if h.get("hop_type") == "corporate_bridge"]
        if len(bridges) > 1:
            errors.append(
                f"ring {ring.get('ring_id', '?')}: {len(bridges)} corporate_bridge hops, max 1 allowed"
            )
        if ring.get("closure_type") == "corporate" and len(bridges) != 1:
            errors.append(
                f"ring {ring.get('ring_id', '?')}: closure_type is 'corporate' but has {len(bridges)} bridge hops, expected exactly 1"
            )
        if ring.get("closure_type") == "transaction" and len(bridges) != 0:
            errors.append(
                f"ring {ring.get('ring_id', '?')}: closure_type is 'transaction' but has a corporate_bridge hop"
            )
    return errors


def validate_file(path: str, kind_override: str | None) -> list[str]:
    errors = []
    try:
        with open(path, encoding="utf-8") as f:
            doc = json.load(f)
    except json.JSONDecodeError as e:
        return [f"invalid JSON: {e}"]

    kind = kind_override or guess_kind(doc)
    schema = load_schema(kind)

    validator = jsonschema.Draft7Validator(schema)
    for err in sorted(validator.iter_errors(doc), key=lambda e: list(e.absolute_path)):
        loc = "/".join(str(p) for p in err.absolute_path) or "(root)"
        errors.append(f"[{loc}] {err.message}")

    if doc.get("count") is not None:
        collection_key = next((k for k in ("entities", "invoices", "rings", "injected_rings") if k in doc), None)
        if collection_key and doc["count"] != len(doc[collection_key]):
            errors.append(
                f"count field says {doc['count']} but {collection_key} has {len(doc[collection_key])} items"
            )

    errors.extend(check_single_bridge_per_ring(doc, kind))
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("files", nargs="+", help="artifact JSON file(s), globs are expanded by the shell or here")
    parser.add_argument("--as", dest="kind", choices=list(SCHEMA_FILES), default=None,
                         help="force the artifact kind instead of guessing from top-level keys")
    args = parser.parse_args()

    paths = []
    for pattern in args.files:
        matches = glob.glob(pattern)
        paths.extend(matches if matches else [pattern])

    ok = True
    for path in paths:
        if not Path(path).is_file():
            print(f"SKIP  {path}  (not a file)")
            continue
        errors = validate_file(path, args.kind)
        if errors:
            ok = False
            print(f"FAIL  {path}")
            for e in errors:
                print(f"      - {e}")
        else:
            print(f"OK    {path}")

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
