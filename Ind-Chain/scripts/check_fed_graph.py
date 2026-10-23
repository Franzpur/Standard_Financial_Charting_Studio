#!/usr/bin/env python3
"""Validate Ind-Chain/data/fed/fed-graph.json. Exit 0 and print PASS, else FAIL."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "server"))

from fed_graph import load_graph, validate_graph  # noqa: E402


def main() -> int:
    errors = validate_graph(load_graph())
    if errors:
        print("FAIL")
        for line in errors:
            print(line)
        return 1
    graph = load_graph()
    print(
        f"PASS nodes={len(graph['nodes'])} edges={len(graph['edges'])} "
        f"scenarios={len(graph.get('scenarios') or [])} departments={len(graph['departments'])} "
        f"fund_flow={sum(1 for e in graph['edges'] if e.get('type')=='fund_flow')}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
