#!/usr/bin/env python3
"""Validate fed-bs-condition.json + fed-bs-map.json. Exit 0 PASS else FAIL."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COND = ROOT / "data" / "fed" / "fed-bs-condition.json"
MAP = ROOT / "data" / "fed" / "fed-bs-map.json"
GRAPH = ROOT / "data" / "fed" / "fed-graph.json"


def main() -> int:
    errors: list[str] = []
    cond = json.loads(COND.read_text())
    mp = json.loads(MAP.read_text())
    graph = json.loads(GRAPH.read_text())
    node_ids = {n["id"] for n in graph["nodes"]}

    lines = cond.get("lines") or []
    by_id = {r["id"]: r for r in lines}
    if len(by_id) != len(lines):
        errors.append("duplicate line id in condition")

    for r in lines:
        for k in ("id", "label_en", "label_zh", "side", "amount_2025", "amount_2024", "delta", "asOf"):
            if k not in r:
                errors.append(f"{r.get('id')}: missing {k}")
        if r.get("side") not in ("asset", "liability", "capital"):
            errors.append(f"{r.get('id')}: bad side")
        if r.get("amount_2025", 0) - r.get("amount_2024", 0) != r.get("delta"):
            errors.append(f"{r.get('id')}: delta mismatch")
        if r.get("asOf") != "2025-12-31":
            errors.append(f"{r.get('id')}: asOf must be 2025-12-31")
        if r.get("id") == "deferred_remittance" and not r.get("special_flag"):
            errors.append("deferred_remittance must special_flag")

    ta = by_id.get("total_assets", {}).get("amount_2025")
    tl = by_id.get("total_liabilities", {}).get("amount_2025")
    tc = by_id.get("total_capital_nci", {}).get("amount_2025")
    if ta is None or tl is None or tc is None:
        errors.append("missing totals")
    elif ta != tl + tc:
        errors.append(f"identity fail: assets {ta} != liab+cap {tl}+{tc}")

    for e in mp.get("entries") or []:
        lid = e.get("line_id")
        if lid not in by_id:
            errors.append(f"map unknown line_id {lid}")
            continue
        if e.get("special") and not by_id[lid].get("special_flag"):
            errors.append(f"map special without condition flag: {lid}")
        for nid in e.get("node_ids") or []:
            if nid not in node_ids:
                errors.append(f"map node missing in graph: {nid} ({lid})")
        if e.get("gap") is False and not (e.get("node_ids") or []):
            errors.append(f"non-gap map with empty nodes: {lid}")

    if errors:
        print("FAIL")
        for line in errors:
            print(line)
        return 1
    print(
        f"PASS bs_lines={len(lines)} map_entries={len(mp.get('entries') or [])} "
        f"assets={ta} identity_ok special={sum(1 for r in lines if r.get('special_flag'))}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
