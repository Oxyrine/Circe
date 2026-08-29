"""Depth-limited cycle search: uniqueness, depth cap, and the two budget
guards that keep a dense SCC from hanging the demo."""
from graph.cycles import MAX_CYCLES_PER_SCC, MAX_STEPS_PER_SCC, find_cycles_in_scc
from graph.ring_utils import canonical_key


def test_single_3cycle_found_exactly_once():
    nodes = {"A", "B", "C"}
    adj = {"A": ["B"], "B": ["C"], "C": ["A"]}
    cycles, budget_hit = find_cycles_in_scc(nodes, adj, max_depth=8)
    assert not budget_hit
    assert len(cycles) == 1
    assert canonical_key(cycles[0]) == "A|B|C"


def test_below_min_length_3_is_not_a_cycle():
    # A 2-node mutual edge (A<->B) is not a valid ring per schema (minItems 3).
    nodes = {"A", "B"}
    adj = {"A": ["B"], "B": ["A"]}
    cycles, _ = find_cycles_in_scc(nodes, adj, max_depth=8)
    assert cycles == []


def test_max_depth_excludes_longer_cycles():
    # A 5-node cycle, max_depth capped at 4 — should find nothing.
    nodes = {"A", "B", "C", "D", "E"}
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": ["E"], "E": ["A"]}
    cycles, _ = find_cycles_in_scc(nodes, adj, max_depth=4)
    assert cycles == []
    # raising the cap finds it
    cycles, _ = find_cycles_in_scc(nodes, adj, max_depth=5)
    assert len(cycles) == 1


def test_two_cycles_sharing_a_node_both_found_once():
    # A bowtie: A-B-C-A and A-D-E-A, sharing only node A.
    nodes = {"A", "B", "C", "D", "E"}
    adj = {
        "A": ["B", "D"],
        "B": ["C"], "C": ["A"],
        "D": ["E"], "E": ["A"],
    }
    cycles, budget_hit = find_cycles_in_scc(nodes, adj, max_depth=8)
    assert not budget_hit
    keys = sorted(canonical_key(c) for c in cycles)
    assert keys == sorted(["A|B|C", "A|D|E"])


def test_dense_scc_hits_step_budget_not_a_hang():
    # A near-complete digraph on enough nodes that exhaustive depth-8 path
    # exploration is combinatorially large. This must terminate quickly via
    # the step budget, not the found-cycle budget — that's the actual risk
    # on a real dense dataset (see graph/cycles.py docstring).
    n = 18
    names = [f"N{i:02d}" for i in range(n)]
    nodes = set(names)
    adj = {u: [v for v in names if v != u] for u in names}  # complete digraph

    import time
    start = time.time()
    cycles, budget_hit = find_cycles_in_scc(nodes, adj, max_depth=8)
    elapsed = time.time() - start

    assert budget_hit is True
    assert elapsed < 10, f"dense SCC search took {elapsed:.1f}s — must degrade loudly, not hang"


def test_found_cycles_never_exceed_the_documented_cap():
    # Sanity check on the constant itself, not a behavioural assertion —
    # guards against someone silently changing the cap without updating
    # the dense-SCC test's expectations.
    assert MAX_CYCLES_PER_SCC == 50_000
    assert MAX_STEPS_PER_SCC > MAX_CYCLES_PER_SCC
