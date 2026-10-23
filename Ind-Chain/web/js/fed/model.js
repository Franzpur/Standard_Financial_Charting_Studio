/** FE-FED-MODEL — load the institutional graph through FE-API. No coordinates. */

import { fetchFedBs, fetchFedGraph } from "../api.js?v=56";

export async function loadGraph() {
  const [graph, bs] = await Promise.all([fetchFedGraph(), fetchFedBs().catch(() => null)]);
  return indexGraph(graph, bs);
}

export function indexGraph(graph, bs) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const edgeById = new Map(edges.map((e) => [e.id, e]));
  const departments = [...(graph.departments || [])].sort((a, b) => a.order - b.order);
  const fundSubtypes = new Map((graph.fund_flow_subtypes || []).map((t) => [t.key, t]));
  const accounts = new Map((graph.account_types || []).map((t) => [t.key, t]));
  const fundByNode = new Map();
  for (const edge of edges) {
    if (edge.type !== "fund_flow") continue;
    for (const id of [edge.from, edge.to]) {
      if (!fundByNode.has(id)) fundByNode.set(id, []);
      fundByNode.get(id).push(edge);
    }
  }
  for (const list of fundByNode.values()) {
    list.sort((a, b) => String(a.attrs?.ops_group || "").localeCompare(String(b.attrs?.ops_group || "")) || a.id.localeCompare(b.id));
  }

  const bsLines = new Map((bs?.condition?.lines || []).map((r) => [r.id, r]));
  const bsByNode = new Map();
  const bsGaps = [];
  const mapByLine = new Map();
  for (const entry of bs?.map?.entries || []) {
    const line = bsLines.get(entry.line_id);
    if (!line || line.is_total) continue;
    const packed = { ...entry, line };
    mapByLine.set(entry.line_id, packed);
    if (entry.gap) {
      bsGaps.push(packed);
      continue;
    }
    for (const nid of entry.node_ids || []) {
      if (!bsByNode.has(nid)) bsByNode.set(nid, []);
      bsByNode.get(nid).push(packed);
    }
  }

  return {
    graph,
    nodes,
    edges,
    byId,
    edgeById,
    types: graph.edge_types || [],
    departments,
    fundSubtypes,
    accounts,
    fundByNode,
    bs: bs
      ? {
          meta: bs.condition?.meta || {},
          lines: bs.condition?.lines || [],
          mapNote: bs.map?.note_zh || "",
          byNode: bsByNode,
          gaps: bsGaps,
          lineById: bsLines,
          mapByLine,
        }
      : null,
  };
}

export function isExternal(entity) {
  if (!entity) return false;
  if (String(entity.id || "").startsWith("SEAT-ROT-")) return true;
  return (entity.evidence || []).some((ev) => ev.status === "external");
}

/** BS-only Fed System organ (A2). Not `isExternal`. Unclassified → false (treated external). */
export function bsFedInternal(node) {
  if (!node) return false;
  const id = String(node.id || "");
  if (id === "BOG" || id === "FOMC" || id === "DESK") return true;
  if (id.startsWith("RB-")) return true;
  return false;
}

export function edgeLooksExternal(edge) {
  if (!edge) return false;
  if (String(edge.from).startsWith("SEAT-ROT-") || String(edge.to).startsWith("SEAT-ROT-")) return true;
  return (edge.evidence || []).some((ev) => ev.status === "external");
}

export function pdfPages(entity) {
  const pages = [];
  for (const ev of entity?.evidence || []) {
    for (const p of ev.pdf_pages || []) pages.push(p);
  }
  return [...new Set(pages)];
}

export function incidentEdges(model, id) {
  return model.edges.filter((e) => e.from === id || e.to === id);
}

export function fundOpsFor(model, nodeId) {
  return model.fundByNode.get(nodeId) || [];
}

export function bsOpsFor(model, nodeId) {
  return model.bs?.byNode.get(nodeId) || [];
}

export function subtypeLabel(model, key) {
  return model.fundSubtypes.get(key)?.zh || key;
}

export function accountLabel(model, key) {
  if (key == null) return "—";
  if (!key) return "";
  return model.accounts.get(key)?.zh || key;
}

export function shortLabel(node) {
  const zh = node?.label?.zh || node?.id || "";
  if (node?.kind === "reserve_bank") {
    const city = zh.split("联储")[0];
    const district = node.attrs?.district;
    return `${district ?? ""} ${city}`.trim();
  }
  if (node?.id === "SEAT-BOG-1") return "主席";
  if (node?.id === "SEAT-BOG-2") return "副主席";
  if (node?.id?.startsWith("SEAT-BOG-")) return node.id.slice(-1);
  if (node?.id === "SEAT-NY") return "纽约";
  if (node?.id?.startsWith("SEAT-ROT-")) return `轮${node.id.slice(-1)}`;
  if (node?.id === "FOMC") return "FOMC";
  if (node?.id === "DESK") return "操作台";
  if (node?.id === "BOG") return "理事会";
  if (zh.length > 8) return `${zh.slice(0, 8)}…`;
  return zh;
}

export function termLine(node) {
  const attrs = node?.attrs || {};
  const bits = [];
  if (attrs.seats) bits.push(`${attrs.seats} 席`);
  if (attrs.members) bits.push(`${attrs.members} 人`);
  if (attrs.term_years) bits.push(`任期 ${attrs.term_years} 年`);
  if (attrs.board_term_years) bits.push(`理事任期 ${attrs.board_term_years} 年`);
  return bits.join(" · ");
}

export function formatMn(n) {
  if (n == null || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1000) return `${sign}${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1)}B`;
  return `${sign}${abs.toLocaleString("en-US")}M`;
}
