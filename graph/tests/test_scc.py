"""Tarjan SCC correctness on small hand-built graphs — never C's dataset,
that's a separate concern. A pure path returning zero non-trivial SCCs
catches more bugs than any other single test in this track."""
from graph.scc import non_trivial_sccs, tarjan_scc


def test_path_graph_has_no_nontrivial_scc():
    # A -> B -> C -> D, no back edges at all.
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    assert non_trivial_sccs(adj) == []


def test_single_cycle_is_one_scc():
    adj = {"A": ["B"], "B": ["C"], "C": ["A"]}
    sccs = non_trivial_sccs(adj)
    assert len(sccs) == 1
    assert set(sccs[0]) == {"A", "B", "C"}


def test_two_disjoint_cycles_are_two_sccs():
    adj = {
        "A": ["B"], "B": ["A"],
        "X": ["Y"], "Y": ["Z"], "Z": ["X"],
    }
    sccs = non_trivial_sccs(adj)
    node_sets = sorted(sorted(s) for s in sccs)
    assert node_sets == [["A", "B"], ["X", "Y", "Z"]]


def test_bridge_between_two_cycles_stays_separate_sccs():
    # Two cycles joined by a one-way bridge C -> X: the bridge does not
    # merge them into one SCC because there's no way back from X's cycle
    # to A's cycle.
    adj = {
        "A": ["B"], "B": ["C"], "C": ["A", "X"],
        "X": ["Y"], "Y": ["X"],
    }
    sccs = non_trivial_sccs(adj)
    node_sets = sorted(sorted(s) for s in sccs)
    assert node_sets == [["A", "B", "C"], ["X", "Y"]]


def test_isolated_nodes_are_trivial_sccs_excluded():
    adj = {"A": [], "B": [], "C": ["A"]}
    assert non_trivial_sccs(adj) == []
    # but tarjan_scc itself still reports them as size-1 components
    all_sccs = tarjan_scc(adj)
    assert sorted(len(s) for s in all_sccs) == [1, 1, 1]


def test_self_loop_is_a_trivial_scc_not_a_cycle():
    # A self-loop makes A its own SCC of size 1 in Tarjan's definition —
    # non_trivial_sccs (size >= 2) correctly excludes it. Self-loops are
    # filtered upstream in run.py before the graph even reaches here.
    adj = {"A": ["A"]}
    assert non_trivial_sccs(adj) == []
