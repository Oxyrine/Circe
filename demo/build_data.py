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


import math
import random


def _layout_component(nodes, comp_edges, degrees_dict, width, height, pad=70.0, iters=1000):
    n = len(nodes)
    if n <= 1:
        return {nodes[0]: (round(width / 2.0, 1), round(height / 2.0, 1))} if n == 1 else {}

    rng = random.Random(42 + n)
    pos = {}
    # Grid scatter, not a circle: math.cos/sin are NOT required by IEEE 754 to be
    # correctly rounded (unlike sqrt, used everywhere else here), so glibc (CI's
    # Ubuntu runner) and a different platform's libm can return a different last
    # bit for the same input. That's an initial condition feeding 1000 iterations
    # of a nonlinear repulsion/spring relaxation -- sensitive enough to initial
    # conditions that a single-ULP difference cascaded into a completely
    # different converged layout, which is what made demo/data.js non-reproducible
    # across platforms even after the RNG/traversal order was seeded and sorted.
    # This only sets the starting scatter the physics loop relaxes from, so an
    # exact circle isn't required -- only every remaining op here is sqrt/+/-/*//,
    # all bit-identical on any IEEE-754-conforming platform.
    cols = max(1, math.ceil(math.sqrt(n)))
    rows = max(1, math.ceil(n / cols))
    for i, u in enumerate(nodes):
        deg = degrees_dict.get(u, 1)
        r_init = (width * 0.42) * (0.4 + 0.6 * (1.0 / math.sqrt(deg + 0.5)))
        col = i % cols
        row = i // cols
        gx = (2.0 * (col + 0.5) / cols) - 1.0
        gy = (2.0 * (row + 0.5) / rows) - 1.0
        pos[u] = [
            width / 2.0 + r_init * gx + rng.uniform(-15, 15),
            height / 2.0 + r_init * gy + rng.uniform(-15, 15),
        ]

    base_k = math.sqrt((width * height) / n) * 1.5
    t = width / 3.0
    dt = t / iters

    for _ in range(iters):
        disp = {u: [0.0, 0.0] for u in nodes}

        # 1. Degree-weighted powerful repulsion
        for i in range(n):
            u = nodes[i]
            deg_u = degrees_dict.get(u, 1)
            for j in range(i + 1, n):
                v = nodes[j]
                deg_v = degrees_dict.get(v, 1)
                dx = pos[u][0] - pos[v][0]
                dy = pos[u][1] - pos[v][1]
                dist = math.sqrt(dx * dx + dy * dy)
                if dist < 1e-3:
                    dx = rng.uniform(-1, 1)
                    dy = rng.uniform(-1, 1)
                    dist = math.sqrt(dx * dx + dy * dy) or 1.0

                min_sep = 85.0 + 3.0 * (deg_u + deg_v)
                charge = math.sqrt(deg_u * deg_v + 1.0)
                f_rep = (charge * base_k * base_k) / (dist * dist) * 22.0

                if dist < min_sep:
                    f_rep += (min_sep - dist) * 8.0

                fx = (dx / dist) * f_rep
                fy = (dy / dist) * f_rep
                disp[u][0] += fx
                disp[u][1] += fy
                disp[v][0] -= fx
                disp[v][1] -= fy

        # 2. Springs with long equilibrium length
        for u, v in comp_edges:
            if u not in pos or v not in pos:
                continue
            dx = pos[u][0] - pos[v][0]
            dy = pos[u][1] - pos[v][1]
            dist = math.sqrt(dx * dx + dy * dy)
            if dist < 1e-3:
                continue

            deg_u = degrees_dict.get(u, 1)
            deg_v = degrees_dict.get(v, 1)
            ideal_len = 110.0 + 3.5 * (deg_u + deg_v)
            f_spring = (dist - ideal_len) * 0.08

            fx = (dx / dist) * f_spring
            fy = (dy / dist) * f_spring
            disp[u][0] -= fx
            disp[u][1] -= fy
            disp[v][0] += fx
            disp[v][1] += fy

        # 3. Soft center gravity
        cx, cy = width / 2.0, height / 2.0
        for u in nodes:
            dx = pos[u][0] - cx
            dy = pos[u][1] - cy
            dist = math.sqrt(dx * dx + dy * dy)
            if dist > 1e-3:
                disp[u][0] -= (dx / dist) * 0.012 * base_k
                disp[u][1] -= (dy / dist) * 0.012 * base_k

        # Step
        for u in nodes:
            dx = disp[u][0]
            dy = disp[u][1]
            dist = math.sqrt(dx * dx + dy * dy)
            if dist > 1e-3:
                step_len = min(dist, t)
                pos[u][0] += (dx / dist) * step_len
                pos[u][1] += (dy / dist) * step_len

        t = max(0.0, t - dt)

    min_x = min(p[0] for p in pos.values())
    max_x = max(p[0] for p in pos.values())
    min_y = min(p[1] for p in pos.values())
    max_y = max(p[1] for p in pos.values())

    span_x = (max_x - min_x) if (max_x - min_x) > 1e-3 else 1.0
    span_y = (max_y - min_y) if (max_y - min_y) > 1e-3 else 1.0

    target_w = width - 2 * pad
    target_h = height - 2 * pad

    res = {}
    for u in nodes:
        nx = pad + ((pos[u][0] - min_x) / span_x) * target_w
        ny = pad + ((pos[u][1] - min_y) / span_y) * target_h
        res[u] = [nx, ny]

    # Strong anti-collision passes (enforce >= 80px min distance everywhere)
    for _ in range(150):
        for i in range(n):
            u = nodes[i]
            deg_u = degrees_dict.get(u, 1)
            for j in range(i + 1, n):
                v = nodes[j]
                deg_v = degrees_dict.get(v, 1)
                min_d = 78.0 + 1.8 * min(deg_u, deg_v)
                dx = res[u][0] - res[v][0]
                dy = res[u][1] - res[v][1]
                d = math.sqrt(dx * dx + dy * dy)
                if d < min_d and d > 1e-4:
                    push = (min_d - d) * 0.55
                    res[u][0] += (dx / d) * push
                    res[u][1] += (dy / d) * push
                    res[v][0] -= (dx / d) * push
                    res[v][1] -= (dy / d) * push

    return {u: (round(res[u][0], 1), round(res[u][1], 1)) for u in nodes}


def _compute_layout(node_ids, edge_pairs, width=1800.0, height=1100.0):
    degrees_dict = {u: 0 for u in node_ids}
    for u, v in edge_pairs:
        degrees_dict[u] += 1
        degrees_dict[v] += 1

    adj = {u: set() for u in node_ids}
    for u, v in edge_pairs:
        if u in adj and v in adj:
            adj[u].add(v)
            adj[v].add(u)

    visited = set()
    components = []
    for u in node_ids:
        if u not in visited:
            comp = []
            queue = [u]
            visited.add(u)
            for curr in queue:
                comp.append(curr)
                # sorted(): adj[curr] is a set, whose iteration order depends on
                # Python's per-process string hash randomization. Left unsorted,
                # BFS visits neighbors in a different order every run, which
                # reorders `comp` -- the very node list _layout_component() feeds
                # its seeded RNG in sequence -- so the "seeded" layout still came
                # out different each run. Sorting makes traversal order (and so
                # the final layout) deterministic across processes.
                for neighbor in sorted(adj[curr]):
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)
            components.append(comp)

    components.sort(key=len, reverse=True)

    # 1800 x 1100 canvas:
    # Comp 1 (50 nodes): [40, 35] w=1300, h=1030
    # Comp 2 (6 nodes): [1380, 35] w=380, h=490
    # Comp 3 (4 nodes): [1380, 560] w=380, h=505
    boxes = [
        (40.0, 35.0, 1300.0, 1030.0),
        (1380.0, 35.0, 380.0, 490.0),
        (1380.0, 560.0, 380.0, 505.0),
    ]

    final_positions = {}
    for comp_idx, comp_nodes in enumerate(components):
        x_off, y_off, w, h = boxes[comp_idx] if comp_idx < len(boxes) else (40.0, 35.0, width - 80.0, height - 80.0)
        comp_edges = [e for e in edge_pairs if e[0] in comp_nodes and e[1] in comp_nodes]
        comp_pos = _layout_component(comp_nodes, comp_edges, degrees_dict, w, h, pad=65.0)
        for u, (x, y) in comp_pos.items():
            final_positions[u] = (round(x_off + x, 1), round(y_off + y, 1))

    return final_positions


def _build_backdrop(entities_path, invoices_path):
    entities = _load(entities_path).get("entities", [])
    invoices = _load(invoices_path).get("invoices", [])

    node_ids = [e["id"] for e in entities]
    seen_pairs = set()
    edges = []
    for inv in invoices:
        pair = (inv["from"], inv["to"])
        if pair in seen_pairs:
            continue
        seen_pairs.add(pair)
        edges.append({"from": inv["from"], "to": inv["to"]})

    # Compute shared director edges
    director_map = {}
    for e in entities:
        for d in e.get("directors", []):
            director_map.setdefault(d, []).append(e["id"])

    director_edges = []
    seen_dir_pairs = set()
    dir_graph_pairs = []
    for din, e_ids in director_map.items():
        for i in range(len(e_ids)):
            for j in range(i + 1, len(e_ids)):
                a, b = sorted([e_ids[i], e_ids[j]])
                if (a, b) not in seen_dir_pairs:
                    seen_dir_pairs.add((a, b))
                    director_edges.append({"from": a, "to": b, "din": din})
                    dir_graph_pairs.append((a, b))

    # All edge pairs for force layout (trade + director)
    all_physics_pairs = [(e["from"], e["to"]) for e in edges] + dir_graph_pairs
    positions = _compute_layout(node_ids, all_physics_pairs, width=1800.0, height=1100.0)

    nodes = [
        {
            "id": e["id"],
            "industry_class": e["industry_class"],
            "x": positions.get(e["id"], (500.0, 350.0))[0],
            "y": positions.get(e["id"], (500.0, 350.0))[1],
        }
        for e in entities
    ]

    return {
        "nodes": nodes,
        "edges": edges,
        "director_edges": director_edges,
    }


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
    raw_rings = data.get("rings", [])
    data["total_candidate_count"] = len(raw_rings)
    data["high_risk_count"] = len([r for r in raw_rings if r.get("aggregate", 0) >= 0.70])
    if args.limit and args.limit > 0 and len(raw_rings) > args.limit:
        # Sort descending by expected loss and take top-k
        sorted_rings = sorted(raw_rings, key=lambda r: r.get("expected_loss", 0), reverse=True)
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
