"""Tarjan's strongly-connected-components algorithm, ITERATIVE.

Recursive Tarjan blows Python's ~1000-frame recursion limit on a
few-thousand-node graph on stage, and never on small fixtures — exactly the
failure mode that's invisible until the worst possible moment. This
simulates the recursion explicitly with a call-stack of
(node, neighbor_iterator, parent) frames.
"""
from __future__ import annotations


def tarjan_scc(adj: dict[str, list[str]]) -> list[list[str]]:
    """adj: node -> list of successor nodes (duplicates/self-loops fine).
    Returns all SCCs (including trivial singletons), in no particular order.
    """
    index_counter = 0
    index: dict[str, int] = {}
    lowlink: dict[str, int] = {}
    on_stack: dict[str, bool] = {}
    tarjan_stack: list[str] = []
    result: list[list[str]] = []

    for start in adj:
        if start in index:
            continue

        index[start] = index_counter
        lowlink[start] = index_counter
        index_counter += 1
        tarjan_stack.append(start)
        on_stack[start] = True

        call_stack: list[tuple[str, iter, str | None]] = [
            (start, iter(adj.get(start, [])), None)
        ]

        while call_stack:
            node, neighbors, parent = call_stack[-1]
            recursed = False

            for w in neighbors:
                if w not in index:
                    index[w] = index_counter
                    lowlink[w] = index_counter
                    index_counter += 1
                    tarjan_stack.append(w)
                    on_stack[w] = True
                    call_stack.append((w, iter(adj.get(w, [])), node))
                    recursed = True
                    break
                elif on_stack.get(w, False):
                    lowlink[node] = min(lowlink[node], index[w])
                # else: w is in a already-closed SCC — ignore, per Tarjan

            if recursed:
                continue

            call_stack.pop()
            if parent is not None:
                lowlink[parent] = min(lowlink[parent], lowlink[node])

            if lowlink[node] == index[node]:
                component = []
                while True:
                    w = tarjan_stack.pop()
                    on_stack[w] = False
                    component.append(w)
                    if w == node:
                        break
                result.append(component)

    return result


def non_trivial_sccs(adj: dict[str, list[str]]) -> list[list[str]]:
    """SCCs of size >= 2 only. A size-1 SCC has no cycle through it unless
    it has a self-loop, and self-loops (an entity invoicing itself) are
    filtered out upstream in run.py as M4 hardening territory, not a
    circular-trading pattern.
    """
    return [scc for scc in tarjan_scc(adj) if len(scc) >= 2]
