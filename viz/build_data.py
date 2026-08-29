"""python viz/build_data.py --scored artifacts/scored_rings.json --out viz/data.js

file:// blocks fetch(), so the scored-rings artifact is compiled into a plain
JS global instead of being loaded async. Works against any scored_ring-shaped
artifact — the real artifacts/scored_rings.json once A ships it, or a fixture
in the meantime.
"""

import argparse
import json


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scored", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    with open(args.scored, encoding="utf-8") as f:
        data = json.load(f)

    with open(args.out, "w", encoding="utf-8") as f:
        f.write("const SCORED = ")
        json.dump(data, f, indent=2)
        f.write(";\n")

    print("wrote {} rings -> {}".format(data.get("count", len(data.get("rings", []))), args.out))


if __name__ == "__main__":
    main()
