"""BE-FED-GRAPH — read-only load, validate, and cache the Fed institutional graph."""
from __future__ import annotations

import json
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "fed" / "fed-graph.json"
BS_COND = ROOT / "data" / "fed" / "fed-bs-condition.json"
BS_MAP = ROOT / "data" / "fed" / "fed-bs-map.json"
FIXTURES = ROOT / "data" / "fed" / "fixtures"
PDF_PAGES = 135

KINDS = {
    "account",
    "advisory",
    "agency",
    "bank_system",
    "board",
    "branch",
    "committee",
    "council",
    "director_class",
    "executive",
    "group",
    "intl",
    "legislature",
    "market",
    "market_infra",
    "public",
    "reserve_bank",
    "role",
    "seat",
    "unit",
}

CLASS_RINGS = {
    "governance": {0, 1, 3},
    "bank": {2, 3},
    "committee": {3},
    "external": {4},
}

_lock = threading.Lock()
_cache: dict | None = None


def load_graph() -> dict:
    global _cache
    with _lock:
        if _cache is None:
            _cache = json.loads(DATA.read_text(encoding="utf-8"))
        return _cache


def graph_payload() -> dict:
    graph = load_graph()
    errors = validate_graph(graph)
    if errors:
        raise ValueError("fed graph invalid: " + "; ".join(errors[:8]))
    out = dict(graph)
    out["meta"] = {
        "node_count": len(graph["nodes"]),
        "edge_count": len(graph["edges"]),
        "asOf": "2021-08",
    }
    return out


def bs_payload() -> dict:
    """Balance-sheet condition + map (read-only; separate from fund_flow graph)."""
    cond = json.loads(BS_COND.read_text(encoding="utf-8"))
    mp = json.loads(BS_MAP.read_text(encoding="utf-8"))
    return {"condition": cond, "map": mp}


def _fixture_payload(name: str) -> dict:
    """Local demo fixture with shared envelope (asOf/source/status/items)."""
    path = FIXTURES / name
    if not path.is_file():
        return {
            "asOf": None,
            "source": {"org": "SFC", "url": None, "note": f"missing fixture {name}"},
            "status": "error",
            "items": [],
            "error": f"fixture not found: {name}",
        }
    doc = json.loads(path.read_text(encoding="utf-8"))
    for key in ("asOf", "source", "status", "items"):
        if key not in doc:
            raise ValueError(f"fed fixture {name} missing {key}")
    return doc


def omo_payload() -> dict:
    """Open-market operations summary (fixture by default)."""
    return _fixture_payload("omo.json")


def fomc_minutes_payload() -> dict:
    """FOMC minutes / meeting index metadata (fixture by default)."""
    return _fixture_payload("fomc-minutes.json")


def fomc_calendar_payload() -> dict:
    """Near-window FOMC calendar (fixture by default)."""
    return _fixture_payload("fomc-calendar.json")


def _pages_ok(pages) -> bool:
    if not isinstance(pages, list) or not pages:
        return False
    return all(isinstance(p, int) and 1 <= p <= PDF_PAGES for p in pages)


def _evidence_entries_ok(evidence) -> bool:
    if not isinstance(evidence, list) or not evidence:
        return False
    for ev in evidence:
        if not isinstance(ev, dict):
            return False
        pages = ev.get("pdf_pages") or []
        if pages:
            if not _pages_ok(pages):
                return False
            continue
        note = str(ev.get("note") or "").strip()
        if ev.get("status") == "external" and note:
            continue
        return False
    return True


def _has_number(obj) -> bool:
    if isinstance(obj, bool):
        return False
    if isinstance(obj, (int, float)):
        return True
    if isinstance(obj, dict):
        return any(_has_number(v) for v in obj.values())
    if isinstance(obj, list):
        return any(_has_number(v) for v in obj)
    return False


def _numbers_ok(entity) -> bool:
    attrs = entity.get("attrs") or {}
    if not _has_number(attrs):
        return True
    if attrs.get("asOf") or attrs.get("asof"):
        return True
    if attrs.get("geo_status") == "derived" or attrs.get("count_status"):
        return True
    return any(_pages_ok(ev.get("pdf_pages") or []) for ev in entity.get("evidence") or [])


def validate_graph(graph: dict) -> list[str]:
    errors: list[str] = []
    if not isinstance(graph, dict):
        return ["graph is not an object"]
    nodes = graph.get("nodes")
    edges = graph.get("edges")
    if not isinstance(nodes, list) or not isinstance(edges, list):
        return ["nodes and edges must be lists"]
    type_keys = set()
    for item in graph.get("edge_types") or []:
        if isinstance(item, dict) and item.get("key"):
            type_keys.add(item["key"])
    fund_subtypes: set[str] = set()
    for item in graph.get("fund_flow_subtypes") or []:
        if isinstance(item, dict) and item.get("key"):
            fund_subtypes.add(item["key"])
    account_keys: set[str] = set()
    for item in graph.get("account_types") or []:
        if isinstance(item, dict) and item.get("key"):
            account_keys.add(item["key"])
    departments = graph.get("departments")
    dept_keys: set[str] = set()
    if not isinstance(departments, list) or not departments:
        errors.append("departments must be a non-empty list")
    else:
        for item in departments:
            key = item.get("key") if isinstance(item, dict) else None
            if not key or key in dept_keys or not all(item.get(f) is not None for f in ("zh", "en", "order")):
                errors.append(f"bad department {key!r}")
                continue
            dept_keys.add(key)
    ids: set[str] = set()
    for node in nodes:
        nid = node.get("id")
        if not nid or nid in ids:
            errors.append(f"bad node id {nid!r}")
            continue
        ids.add(nid)
        if node.get("kind") not in KINDS:
            errors.append(f"{nid} kind {node.get('kind')!r} not allowed")
        allowed = CLASS_RINGS.get(node.get("class"))
        if allowed is None or node.get("ring") not in allowed:
            errors.append(f"{nid} ring {node.get('ring')!r} disagrees with class {node.get('class')!r}")
        if node.get("dept") not in dept_keys:
            errors.append(f"{nid} dept {node.get('dept')!r} not in departments")
        if not _evidence_entries_ok(node.get("evidence")):
            errors.append(f"{nid} evidence missing pages or external note")
        if not _numbers_ok(node):
            errors.append(f"{nid} number lacks asOf or evidence")
    edge_ids: set[str] = set()
    for edge in edges:
        eid = edge.get("id")
        if not eid or eid in edge_ids:
            errors.append(f"bad edge id {eid!r}")
            continue
        edge_ids.add(eid)
        if edge.get("from") not in ids or edge.get("to") not in ids:
            errors.append(f"{eid} endpoint missing")
        if edge.get("type") not in type_keys:
            errors.append(f"{eid} type {edge.get('type')!r} not in edge_types")
        if edge.get("type") == "fund_flow":
            if not fund_subtypes:
                errors.append("fund_flow_subtypes missing")
            elif edge.get("subtype") not in fund_subtypes:
                errors.append(f"{eid} subtype {edge.get('subtype')!r} not in fund_flow_subtypes")
            attrs = edge.get("attrs") or {}
            account = attrs.get("account")
            if account is not None and account_keys and account not in account_keys:
                errors.append(f"{eid} account {account!r} not in account_types")
            if _has_number(attrs) and not (attrs.get("asOf") or attrs.get("asof")):
                if not any(_pages_ok(ev.get("pdf_pages") or []) for ev in (edge.get("evidence") or [])):
                    errors.append(f"{eid} number lacks asOf or evidence")
        evidence = edge.get("evidence") or []
        if not _evidence_entries_ok(evidence):
            errors.append(f"{eid} evidence missing pages or external note")
        elif not any(_pages_ok(ev.get("pdf_pages") or []) for ev in evidence):
            if not any(
                ev.get("status") == "external" and str(ev.get("note") or "").strip()
                for ev in evidence
            ):
                errors.append(f"{eid} needs pdf_pages or an external note")
        if not _numbers_ok(edge):
            errors.append(f"{eid} number lacks asOf or evidence")
    for scene in graph.get("scenarios") or []:
        sid = scene.get("id")
        for step in scene.get("steps") or []:
            for nid in step.get("nodes") or []:
                if nid not in ids:
                    errors.append(f"{sid} step {step.get('order')} missing node {nid}")
            for eid in step.get("edges") or []:
                if eid not in edge_ids:
                    errors.append(f"{sid} step {step.get('order')} missing edge {eid}")
    return errors
