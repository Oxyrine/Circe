import argparse
import json
import sys
import math
import random
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from contract.validate import validate_file  # noqa: E402

def _load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def _compute_force_layout(nodes, edges):
    random.seed(42)  # fixed seed for deterministic output (CI diff check requires this)
    adj = {n["id"]: [] for n in nodes}
    for e in edges:
        adj[e["from"]].append(e["to"])
        adj[e["to"]].append(e["from"])

    degrees = {n["id"]: len(adj[n["id"]]) for n in nodes}
    for n in nodes:
        n["degree"] = degrees[n["id"]]

    visited = set()
    components = []
    
    for n in nodes:
        if n["id"] not in visited:
            comp = []
            queue = [n["id"]]
            visited.add(n["id"])
            while queue:
                curr = queue.pop(0)
                comp.append(curr)
                for neighbor in adj[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)
            components.append(comp)

    components.sort(key=len, reverse=True)
    
    # 1800x1100 Canvas Zones
    zones = [
        {"cx": 700, "cy": 550, "w": 1300, "h": 1030}, # Primary network gets massive area
        {"cx": 1600, "cy": 250, "w": 380, "h": 500},  # Iso A
        {"cx": 1600, "cy": 850, "w": 380, "h": 500}   # Iso B
    ]
    
    node_lookup = {n["id"]: n for n in nodes}
    
    for c_idx, comp_node_ids in enumerate(components):
        zone = zones[c_idx] if c_idx < len(zones) else zones[0]
        for nid in comp_node_ids:
            # Spread initial positions much wider so they don't start in a knot
            node_lookup[nid]["x"] = zone["cx"] + (random.random() - 0.5) * 800
            node_lookup[nid]["y"] = zone["cy"] + (random.random() - 0.5) * 600
            node_lookup[nid]["vx"] = 0
            node_lookup[nid]["vy"] = 0

        ITERATIONS = 500
        for i in range(ITERATIONS):
            # 1. Degree-Weighted Core Blossom Physics
            for nid1 in comp_node_ids:
                for nid2 in comp_node_ids:
                    if nid1 == nid2: continue
                    n1 = node_lookup[nid1]
                    n2 = node_lookup[nid2]
                    dx = n1["x"] - n2["x"]
                    dy = n1["y"] - n2["y"]
                    dist = math.hypot(dx, dy)
                    if dist < 0.1: dx, dy, dist = (random.random()-0.5), (random.random()-0.5), 0.1
                    
                    # Massive repulsion to blow the core apart (F_rep = deg_u * deg_v * 22.0 * scalar)
                    force = (n1["degree"] * n2["degree"] * 60.0) / (dist * dist)
                    # Global repulsion to ensure it expands widely
                    force += 1500.0 / (dist * dist)

                    fx = (dx / dist) * force
                    fy = (dy / dist) * force
                    n1["vx"] += fx
                    n1["vy"] += fy
                    n2["vx"] -= fx
                    n2["vy"] -= fy

            # 2. Attraction
            for e in edges:
                u, v = e["from"], e["to"]
                if u in comp_node_ids and v in comp_node_ids:
                    n1 = node_lookup[u]
                    n2 = node_lookup[v]
                    dx = n1["x"] - n2["x"]
                    dy = n1["y"] - n2["y"]
                    dist = math.hypot(dx, dy)
                    
                    # L0 = 110px + 3.5(deg_u + deg_v)
                    L0 = 150 + 8.5 * (n1["degree"] + n2["degree"])
                    
                    force = 0.02 * (dist - L0) # Weaker attraction so repulsion wins
                    fx = (dx / dist) * force
                    fy = (dy / dist) * force
                    n1["vx"] -= fx
                    n1["vy"] -= fy
                    n2["vx"] += fx
                    n2["vy"] += fy
            
            # 3. Very Weak Central gravity just to prevent infinite drift
            for nid in comp_node_ids:
                n = node_lookup[nid]
                n["vx"] += (zone["cx"] - n["x"]) * 0.001
                n["vy"] += (zone["cy"] - n["y"]) * 0.001
                
            # Velocity update
            for nid in comp_node_ids:
                n = node_lookup[nid]
                n["x"] += n["vx"]
                n["y"] += n["vy"]
                n["vx"] *= 0.6 # High friction to stabilize
                n["vy"] *= 0.6
                
        # 4. Hard Anti-Collision Relaxation (150 iterations, >= 120px clearance)
        for _ in range(150):
            for nid1 in comp_node_ids:
                for nid2 in comp_node_ids:
                    if nid1 >= nid2: continue
                    n1 = node_lookup[nid1]
                    n2 = node_lookup[nid2]
                    dx = n1["x"] - n2["x"]
                    dy = n1["y"] - n2["y"]
                    dist = math.hypot(dx, dy)
                    
                    # Compute dynamic clearance based on node sizes
                    clearance = 120
                    if dist < clearance:
                        push = (clearance - dist) / 2
                        if dist < 0.1: dx, dy, dist = (random.random()-0.5), (random.random()-0.5), 0.1
                        n1["x"] += (dx / dist) * push
                        n1["y"] += (dy / dist) * push
                        n2["x"] -= (dx / dist) * push
                        n2["y"] -= (dy / dist) * push
                        
    return nodes

def _build_backdrop(entities_path, invoices_path):
    entities = _load(entities_path).get("entities", [])
    invoices = _load(invoices_path).get("invoices", [])
    nodes = [{"id": e["id"], "industry_class": e["industry_class"], "name": e.get("name", "")} for e in entities]
    seen_pairs = set()
    edges = []
    
    for inv in invoices:
        pair = tuple(sorted((inv["from"], inv["to"])))
        if pair in seen_pairs: continue
        seen_pairs.add(pair)
        edges.append({"from": inv["from"], "to": inv["to"], "type": "trade"})
        
    for i in range(len(entities)):
        for j in range(i+1, len(entities)):
            d1 = set(entities[i].get("directors", []))
            d2 = set(entities[j].get("directors", []))
            if d1.intersection(d2):
                pair = tuple(sorted((entities[i]["id"], entities[j]["id"])))
                if pair not in seen_pairs:
                    seen_pairs.add(pair)
                    edges.append({"from": entities[i]["id"], "to": entities[j]["id"], "type": "corporate"})

    nodes = _compute_force_layout(nodes, edges)
    return {"nodes": nodes, "edges": edges}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scored", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--entities", help="optional: compile a dimmed backdrop graph alongside SCORED")
    ap.add_argument("--invoices", help="optional, required if --entities is given")
    ap.add_argument("--limit", type=int, default=50)
    args = ap.parse_args()

    errors = validate_file(args.scored, "scored")
    if errors: return 1

    data = _load(args.scored)
    if args.limit and args.limit > 0 and len(data.get("rings", [])) > args.limit:
        sorted_rings = sorted(data.get("rings", []), key=lambda r: r.get("expected_loss", 0), reverse=True)
        data["rings"] = sorted_rings[:args.limit]
        data["count"] = len(data["rings"])

    backdrop = None
    entities_dict = None
    invoices_dict = None

    if args.entities and args.invoices:
        backdrop = _build_backdrop(args.entities, args.invoices)
        entities_list = _load(args.entities).get("entities", [])
        invoices_list = _load(args.invoices).get("invoices", [])
        entities_dict = {e["id"]: e for e in entities_list}
        invoices_dict = {i["invoice_id"]: i for i in invoices_list}

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
        
    print("Rebuilt Data!")
    return 0

if __name__ == "__main__":
    sys.exit(main())
