"""python viz/build_data.py --scored artifacts/scored_rings.json --out viz/data.js
                            [--entities data/entities.json --invoices data/invoices.json]

file:// blocks fetch(), so the scored-rings artifact is compiled into a plain
JS global instead of being loaded async. Works against any scored_ring-shaped
artifact — the real artifacts/scored_rings.json once A ships one, or a
fixture in the meantime.

Fails loudly (non-zero exit, no output file written) if --scored doesn't
validate against contract/scored_ring.schema.json — a bad file should never
ship silently into the app.

--entities/--invoices are optional: when given, a lightweight BACKDROP graph
(every entity + every unique invoice edge, positions omitted — the browser
lays it out) is compiled alongside SCORED. app.js renders it dimmed behind
each ring so a flagged ring reads as a small cluster standing out of the
platform's ordinary trade, not an isolated diagram. Skipped, not an error,
if the paths aren't given — the fixture-only fixtures/ handoff doesn't have
a full dataset to draw one from.
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from contract.validate import validate_file  # noqa: E402


def _load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _build_backdrop(entities_path, invoices_path):
    entities = _load(entities_path).get("entities", [])
    invoices = _load(invoices_path).get("invoices", [])

    nodes = [{"id": e["id"], "industry_class": e["industry_class"]} for e in entities]
    seen_pairs = set()
    edges = []
    for inv in invoices:
        pair = (inv["from"], inv["to"])
        if pair in seen_pairs:
            continue
        seen_pairs.add(pair)
        edges.append({"from": inv["from"], "to": inv["to"]})

    return {"nodes": nodes, "edges": edges}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scored", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--entities", help="optional: compile a dimmed backdrop graph alongside SCORED")
    ap.add_argument("--invoices", help="optional, required if --entities is given")
    ap.add_argument("--limit", type=int, default=50, help="max top-ranked rings to bundle for UI responsiveness (default: 50, 0 for all)")
    args = ap.parse_args()

    errors = validate_file(args.scored, "scored")
    if errors:
        print("FAIL  {} does not validate against scored_ring.schema.json:".format(args.scored), file=sys.stderr)
        for e in errors:
            print("      - {}".format(e), file=sys.stderr)
        print("Not writing {} — fix the input first.".format(args.out), file=sys.stderr)
        return 1

    data = _load(args.scored)
    if args.limit and args.limit > 0 and len(data.get("rings", [])) > args.limit:
        # Sort descending by expected loss and take top-k
        sorted_rings = sorted(data.get("rings", []), key=lambda r: r.get("expected_loss", 0), reverse=True)
        data["rings"] = sorted_rings[:args.limit]
        data["count"] = len(data["rings"])

    backdrop = None
    if args.entities:
        if not args.invoices:
            print("FAIL  --entities given without --invoices", file=sys.stderr)
            return 1
        for path, kind in ((args.entities, "entities"), (args.invoices, "invoices")):
            errs = validate_file(path, kind)
            if errs:
                print("FAIL  {} does not validate:".format(path), file=sys.stderr)
                for e in errs:
                    print("      - {}".format(e), file=sys.stderr)
                return 1
        backdrop = _build_backdrop(args.entities, args.invoices)

    entities_dict = None
    invoices_dict = None

    if args.entities and args.invoices:
        entities_list = _load(args.entities).get("entities", [])
        invoices_list = _load(args.invoices).get("invoices", [])
        entities_dict = {e["id"]: e for e in entities_list}
        invoices_dict = {i["invoice_id"]: i for i in invoices_list}

        for inv in invoices_list:
            if inv["from"] not in entities_dict:
                print(f"FAIL invoice {inv['invoice_id']} seller {inv['from']} not in entities", file=sys.stderr)
                return 1
            if inv["to"] not in entities_dict:
                print(f"FAIL invoice {inv['invoice_id']} buyer {inv['to']} not in entities", file=sys.stderr)
                return 1

        for r in data.get("rings", []):
            for e_id in r.get("entities", []):
                if e_id not in entities_dict:
                    print(f"FAIL ring {r['ring_id']} entity {e_id} not in entities", file=sys.stderr)
                    return 1
            for hop in r.get("hops", []):
                if hop["hop_type"] == "invoice":
                    if hop["invoice_id"] not in invoices_dict:
                        print(f"FAIL ring {r['ring_id']} invoice hop {hop['invoice_id']} not in invoices", file=sys.stderr)
                        return 1
                elif hop["hop_type"] != "corporate_bridge":
                    print(f"FAIL ring {r['ring_id']} has unknown hop_type {hop['hop_type']}", file=sys.stderr)
                    return 1

    with open(args.out, "w", encoding="utf-8") as f:
        f.write("const SCORED = ")
        json.dump(data, f, indent=2)
        f.write(";\nconst BACKDROP = ")
        json.dump(backdrop, f, indent=2)
        f.write(";\nconst ENTITIES = ")
        json.dump(entities_dict, f, indent=2)
        f.write(";\nconst INVOICES = ")
        json.dump(invoices_dict, f, indent=2)
        f.write(";\n")

    msg = "wrote {} rings".format(data.get("count", len(data.get("rings", []))))
    if backdrop:
        msg += " + backdrop ({} entities, {} edges)".format(len(backdrop["nodes"]), len(backdrop["edges"]))
    print("{} -> {}".format(msg, args.out))
    return 0


if __name__ == "__main__":
    sys.exit(main())
