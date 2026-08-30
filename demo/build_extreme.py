import math
import random
import json
import sys
from pathlib import Path

def _load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def _compute_force_layout(nodes, edges):
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
        {"cx": 650, "cy": 550, "w": 1300, "h": 1030}, # Center it more to the left so it fills the box
        {"cx": 1600, "cy": 250, "w": 380, "h": 500},  
        {"cx": 1600, "cy": 850, "w": 380, "h": 500}   
    ]
    
    node_lookup = {n["id"]: n for n in nodes}
    
    for c_idx, comp_node_ids in enumerate(components):
        zone = zones[c_idx] if c_idx < len(zones) else zones[0]
        
        # Grid initialization for primary network to guarantee spread before physics
        if c_idx == 0:
            grid_cols = math.ceil(math.sqrt(len(comp_node_ids)))
            grid_spacing = 900 / grid_cols
            start_x = zone["cx"] - 450
            start_y = zone["cy"] - 450
            for i, nid in enumerate(comp_node_ids):
                r, c = divmod(i, grid_cols)
                node_lookup[nid]["x"] = start_x + c * grid_spacing + (random.random()-0.5)*50
                node_lookup[nid]["y"] = start_y + r * grid_spacing + (random.random()-0.5)*50
                node_lookup[nid]["vx"] = 0
                node_lookup[nid]["vy"] = 0
        else:
            for nid in comp_node_ids:
                node_lookup[nid]["x"] = zone["cx"] + (random.random() - 0.5) * 200
                node_lookup[nid]["y"] = zone["cy"] + (random.random() - 0.5) * 200
                node_lookup[nid]["vx"] = 0
                node_lookup[nid]["vy"] = 0

        ITERATIONS = 800
        for i in range(ITERATIONS):
            # Repulsion
            for nid1 in comp_node_ids:
                for nid2 in comp_node_ids:
                    if nid1 == nid2: continue
                    n1 = node_lookup[nid1]
                    n2 = node_lookup[nid2]
                    dx = n1["x"] - n2["x"]
                    dy = n1["y"] - n2["y"]
                    dist = math.hypot(dx, dy)
                    if dist < 0.1: dx, dy, dist = (random.random()-0.5), (random.random()-0.5), 0.1
                    
                    # VERY strong repulsion for primary to blow it wide open
                    force = 8000.0 / (dist * dist) 
                    
                    fx = (dx / dist) * force
                    fy = (dy / dist) * force
                    n1["vx"] += fx
                    n1["vy"] += fy
                    n2["vx"] -= fx
                    n2["vy"] -= fy

            # Attraction
            for e in edges:
                u, v = e["from"], e["to"]
                if u in comp_node_ids and v in comp_node_ids:
                    n1 = node_lookup[u]
                    n2 = node_lookup[v]
                    dx = n1["x"] - n2["x"]
                    dy = n1["y"] - n2["y"]
                    dist = math.hypot(dx, dy)
                    
                    L0 = 200 # Target edge length
                    
                    # Weaker attraction
                    force = 0.005 * (dist - L0)
                    if dist < L0: force = 0 # Don't pull them closer than L0
                    fx = (dx / dist) * force
                    fy = (dy / dist) * force
                    n1["vx"] -= fx
                    n1["vy"] -= fy
                    n2["vx"] += fx
                    n2["vy"] += fy
            
            # Central gravity to keep it in zone
            for nid in comp_node_ids:
                n = node_lookup[nid]
                n["vx"] += (zone["cx"] - n["x"]) * 0.0005
                n["vy"] += (zone["cy"] - n["y"]) * 0.0005
                
            for nid in comp_node_ids:
                n = node_lookup[nid]
                n["x"] += n["vx"]
                n["y"] += n["vy"]
                n["vx"] *= 0.6
                n["vy"] *= 0.6
                
        # Hard Anti-Collision (>= 150px clearance for primary, >= 120px for others)
        clearance = 160 if c_idx == 0 else 120
        for _ in range(200):
            for nid1 in comp_node_ids:
                for nid2 in comp_node_ids:
                    if nid1 >= nid2: continue
                    n1 = node_lookup[nid1]
                    n2 = node_lookup[nid2]
                    dx = n1["x"] - n2["x"]
                    dy = n1["y"] - n2["y"]
                    dist = math.hypot(dx, dy)
                    
                    if dist < clearance:
                        push = (clearance - dist) / 2
                        if dist < 0.1: dx, dy, dist = (random.random()-0.5), (random.random()-0.5), 0.1
                        n1["x"] += (dx / dist) * push
                        n1["y"] += (dy / dist) * push
                        n2["x"] -= (dx / dist) * push
                        n2["y"] -= (dy / dist) * push
                        
    return nodes

def rebuild():
    data = _load("artifacts/scored_rings.json")
    backdrop = None
    
    entities_list = _load("data/entities.json").get("entities", [])
    invoices_list = _load("data/invoices.json").get("invoices", [])
    
    nodes = [{"id": e["id"], "industry_class": e["industry_class"], "name": e.get("name", "")} for e in entities_list]
    seen_pairs = set()
    edges = []
    
    for inv in invoices_list:
        pair = tuple(sorted((inv["from"], inv["to"])))
        if pair in seen_pairs: continue
        seen_pairs.add(pair)
        edges.append({"from": inv["from"], "to": inv["to"], "type": "trade"})
        
    for i in range(len(entities_list)):
        for j in range(i+1, len(entities_list)):
            d1 = set(entities_list[i].get("directors", []))
            d2 = set(entities_list[j].get("directors", []))
            if d1.intersection(d2):
                pair = tuple(sorted((entities_list[i]["id"], entities_list[j]["id"])))
                if pair not in seen_pairs:
                    seen_pairs.add(pair)
                    edges.append({"from": entities_list[i]["id"], "to": entities_list[j]["id"], "type": "corporate"})

    nodes = _compute_force_layout(nodes, edges)
    backdrop = {"nodes": nodes, "edges": edges}
    
    entities_dict = {e["id"]: e for e in entities_list}
    invoices_dict = {i["invoice_id"]: i for i in invoices_list}

    with open("demo/data.js", "w", encoding="utf-8") as f:
        f.write("const SCORED = ")
        json.dump(data, f, indent=2)
        f.write(";\nconst BACKDROP = ")
        json.dump(backdrop, f, indent=2)
        f.write(";\nconst ENTITIES = ")
        json.dump(entities_dict, f, indent=2)
        f.write(";\nconst INVOICES = ")
        json.dump(invoices_dict, f, indent=2)
        f.write(";\n")
        
    print("Rebuilt with EXTREME spreading")

rebuild()
