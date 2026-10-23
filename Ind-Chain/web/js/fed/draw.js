/** FE-FED-DRAW — paint the ring projection into an SVG. */

import { bsFedInternal, edgeLooksExternal, isExternal, shortLabel } from "./model.js?v=8";

const SKELETON = new Set(["appoint", "oversee"]);

export function allowedTypes(model, state) {
  if (state.filter) return state.filter;
  return SKELETON;
}

export function visibleEdges(model, state) {
  const allow = allowedTypes(model, state);
  const ids = new Set();
  for (const edge of model.edges) {
    if (allow.has(edge.type)) ids.add(edge.id);
  }
  const focus = state.scene ? null : state.hover || state.pinned;
  if (focus) {
    for (const edge of model.edges) {
      if (edge.from === focus || edge.to === focus) ids.add(edge.id);
    }
  }
  if (state.cashOp) ids.add(state.cashOp);
  if (state.scene) {
    for (const id of state.scene.edges || []) ids.add(id);
  }
  return ids;
}

function nodeClass(node, pos, flags) {
  const bits = ["fed-node", `fed-shape-${pos.shape}`];
  if (isExternal(node)) bits.push("is-external");
  if (flags.selected) bits.push("is-selected");
  if (flags.hot) bits.push("is-hot");
  if (flags.dim) bits.push("is-dim");
  return bits.join(" ");
}

export function applyState(svg, model, projection, state) {
  const show = visibleEdges(model, state);
  const focus = state.scene ? null : state.hover || state.pinned;
  const cashEdge = state.cashOp ? model.edgeById.get(state.cashOp) : null;
  const hotIds = new Set();
  if (state.scene) {
    for (const id of state.scene.nodes || []) hotIds.add(id);
  } else if (cashEdge) {
    hotIds.add(cashEdge.from);
    hotIds.add(cashEdge.to);
    for (const extra of cashEdge.attrs?.highlight_extra || []) hotIds.add(extra);
  } else if (focus) {
    hotIds.add(focus);
    for (const edge of model.edges) {
      if (edge.from === focus) hotIds.add(edge.to);
      if (edge.to === focus) hotIds.add(edge.from);
    }
  }
  const fadeFiltered = state.filter?.size > 0;
  const touching = new Set();
  if (fadeFiltered) {
    for (const edge of model.edges) {
      if (!show.has(edge.id)) continue;
      touching.add(edge.from);
      touching.add(edge.to);
    }
  }
  const engaged = Boolean(focus || state.scene || fadeFiltered || cashEdge);
  svg.querySelectorAll("[data-edge]").forEach((el) => {
    const id = el.dataset.edge;
    const edge = model.edgeById.get(id);
    const on = show.has(id);
    const cashHot = state.cashOp === id;
    const sceneHot = Boolean(state.scene && (state.scene.edges || []).includes(id));
    el.classList.toggle("is-hidden", !on);
    el.classList.toggle("is-skeleton", state.filter === null && SKELETON.has(edge?.type));
    el.classList.toggle(
      "is-dim",
      Boolean(on && !cashHot && focus && edge && edge.from !== focus && edge.to !== focus && !cashEdge),
    );
    el.classList.toggle("is-hot", cashHot || sceneHot);
    el.classList.toggle("is-selected", cashHot);
  });
  const bsOn = state.mode === "bs" && model.bs;
  const posById = new Map((projection?.nodes || []).map((n) => [n.id, n]));
  svg.querySelectorAll(".fed-node[data-node]").forEach((el) => {
    const id = el.dataset.node;
    let lit = false;
    if (state.scene || cashEdge || focus) lit = hotIds.has(id);
    else if (fadeFiltered) lit = touching.has(id);
    el.classList.toggle("is-selected", state.pinned === id);
    el.classList.toggle("is-hot", lit && Boolean(focus || state.scene || cashEdge));
    el.classList.toggle("is-dim", engaged && !lit && state.pinned !== id && !bsOn);
    el.classList.toggle("is-bs-asset", false);
    el.classList.toggle("is-bs-liab", false);
    el.classList.toggle("is-bs-capital", false);
    el.classList.toggle("is-bs-special", false);
    el.classList.toggle("is-bs-out", false);
    el.classList.toggle("is-bs-internal", false);
    el.classList.toggle("is-bs-external", false);
    const rows = bsOn ? model.bs.byNode.get(id) || [] : [];
    let asset = false;
    let liab = false;
    let capital = false;
    let special = false;
    for (const row of rows) {
      if (row.side === "asset" || row.line?.side === "asset") asset = true;
      if (row.side === "liability" || row.line?.side === "liability") liab = true;
      if (row.side === "capital" || row.line?.side === "capital") capital = true;
      if (row.special || row.line?.special_flag) special = true;
    }
    if (bsOn) {
      const inBs = rows.length > 0;
      if (inBs) {
        el.classList.toggle("is-bs-asset", asset);
        el.classList.toggle("is-bs-liab", liab);
        el.classList.toggle("is-bs-capital", capital && !asset && !liab);
        el.classList.toggle("is-bs-special", special);
        const node = model.byId.get(id);
        if (bsFedInternal(node)) el.classList.toggle("is-bs-internal", true);
        else el.classList.toggle("is-bs-external", true);
      } else {
        el.classList.toggle("is-bs-out", true);
      }
    }
    let badge = el.querySelector("text.fed-badge-bs");
    if (bsOn && special) {
      const pos = posById.get(id);
      if (!badge && pos) {
        badge = document.createElementNS("http://www.w3.org/2000/svg", "text");
        badge.setAttribute("class", "fed-badge-pending fed-badge-bs");
        badge.setAttribute("x", String(pos.x + 12));
        badge.setAttribute("y", String(pos.y - 10));
        badge.setAttribute("text-anchor", "start");
        badge.textContent = "待核";
        el.appendChild(badge);
      }
    } else if (badge) {
      badge.remove();
    }
  });
  if (svg.classList) svg.classList.toggle("is-bs-mode", Boolean(bsOn));
}

const MARKER_SHAPES = {
  appoint: `<path d="M0,1 L9,5 L0,9 Z"/>`,
  oversee: `<path d="M0,1 L9,5 L0,9"/>`,
  report: `<path d="M0,3 L9,5 L0,7 Z"/>`,
  vote: `<path d="M0,5 L5,1 L9,5 L5,9 Z"/>`,
  transmit: `<path d="M0,0 L10,5 L0,10 Z"/>`,
  fund_flow: `<path d="M0,1 L5,5 L0,9 M4,1 L9,5 L4,9"/>`,
  regulate: `<path d="M3,2 H9 V8 H3 Z"/>`,
  advise: `<circle cx="5" cy="5" r="2.2"/>`,
  service: `<path d="M0,2.5 L9,5 L0,7.5 Z"/>`,
  delegate: `<path d="M1,1 L9,5 L1,9"/>`,
  inform: `<path d="M2,3 L9,5 L2,7 Z"/>`,
  coordinate: `<path d="M1,5 L5,1 L9,5 L5,9 Z"/>`,
};

function markerDefs() {
  const marks = Object.entries(MARKER_SHAPES).map(([id, shape]) => {
    const [w, h] = id === "transmit" ? [11, 9] : [8, 8];
    return `<marker id="fed-mk-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${w}" markerHeight="${h}" orient="auto">${shape}</marker>`;
  });
  const hatch =
    `<pattern id="fed-bs-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">` +
    `<rect width="6" height="6" fill="var(--fed-bs-asset-wash)"/>` +
    `<line x1="0" y1="0" x2="0" y2="6" stroke="var(--fed-bs-asset)" stroke-width="1.5" opacity="0.55"/>` +
    `</pattern>`;
  return `<defs>${marks.join("")}${hatch}</defs>`;
}

/** Legend swatch; reuses the canvas #fed-mk-* markers so sample and edge share one shape. */
export function legendSample(key) {
  return (
    `<svg class="fed-legend-sample" viewBox="0 0 28 10" width="28" height="10" aria-hidden="true">` +
    `<line class="fed-edge fed-edge-${key}" x1="2" y1="5" x2="24" y2="5"/></svg>`
  );
}

export function paint(svg, model, projection) {
  const { w, h } = projection.view;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.dataset.nodeCount = String(projection.nodes.length);
  svg.dataset.edgeCount = String(projection.edgePaths.length);
  const edgeById = model.edgeById;
  const parts = [markerDefs()];
  for (const path of projection.edgePaths) {
    const edge = edgeById.get(path.id);
    const cls = ["fed-edge", `fed-edge-${path.type}`];
    if (edgeLooksExternal(edge)) cls.push("is-external");
    parts.push(
      `<path class="${cls.join(" ")}" data-edge="${path.id}" d="${path.d}" fill="none"></path>`,
    );
  }
  parts.push(`<g class="fed-hits" aria-hidden="true">`);
  for (const pos of projection.nodes) {
    parts.push(`<circle class="fed-hit" data-node="${pos.id}" cx="${pos.x}" cy="${pos.y}" r="${pos.hit}"/>`);
  }
  parts.push(`</g>`);
  for (const pos of projection.nodes) {
    const node = model.byId.get(pos.id);
    const cls = nodeClass(node, pos, { selected: false, hot: false, dim: false });
    const label = shortLabel(node);
    const anchor = pos.place === "side-r" ? "end" : pos.place === "side-l" ? "start" : "middle";
    const ly = pos.place === "band" || pos.place === "extra" ? pos.y + 16 : pos.y + 18;
    const lx = pos.x;
    const seatRing = pos.place === "ring1"; // badge goes outward so it clears the crowded centre
    const badge = isExternal(node)
      ? `<text class="fed-badge-pending" x="${seatRing ? pos.x - 12 : pos.x + 12}" y="${pos.y - 10}" text-anchor="${seatRing ? "end" : "start"}">待核</text>`
      : "";
    parts.push(
      `<g class="${cls}" data-node="${pos.id}" data-dept="${node.dept}" tabindex="0" role="button">` +
        glyph(pos) +
        `<text class="fed-label" x="${lx}" y="${ly}" text-anchor="${anchor}">${escapeXml(label)}</text>` +
        badge +
        `</g>`,
    );
  }
  svg.innerHTML = parts.join("");
}

function glyph(pos) {
  const x = pos.x;
  const y = pos.y;
  if (pos.shape === "gov") return `<rect x="${x - 11}" y="${y - 11}" width="22" height="22"/>`;
  if (pos.shape === "bank") return `<circle cx="${x}" cy="${y}" r="8"/>`;
  if (pos.shape === "seat") return `<rect x="${x - 9}" y="${y - 4}" width="18" height="8"/>`;
  if (pos.shape === "band") return `<rect x="${x - 46}" y="${y - 10}" width="92" height="18"/>`;
  return `<circle cx="${x}" cy="${y}" r="5"/>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
