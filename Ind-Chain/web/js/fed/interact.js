/** FED page behaviour: hover, pin, filter, cash ops, keyboard, FOMC, S1/S2. */

import { trail, wireBackspaceNav } from "../nav.js?v=2";
import {
  fetchFedFomcCalendar,
  fetchFedFomcMinutes,
  fetchFedOmo,
} from "../api.js?v=56";
import { allowedTypes, applyState, legendSample, paint } from "./draw.js?v=9";
import { clearFomc, renderFomc } from "./fomc.js?v=6";
import { project } from "./layout-ring.js?v=3";
import {
  accountLabel,
  bsOpsFor,
  formatMn,
  fundOpsFor,
  incidentEdges,
  loadGraph,
  pdfPages,
  subtypeLabel,
  termLine,
} from "./model.js?v=8";
import { bindScenes } from "./scenes.js?v=3";

const svg = document.getElementById("fedSvg");
const card = document.getElementById("fedCard");
const floatEl = document.getElementById("fedFloat");
const legend = document.getElementById("fedLegend");
const fomcEl = document.getElementById("fedFomc");
const trailEl = document.getElementById("fedTrail");
const modePick = document.getElementById("fedModePick");
const bsPanel = document.getElementById("fedBsPanel");
const dataBtn = document.getElementById("fedDataBtn");
const dataPanel = document.getElementById("fedDataPanel");

const BS_COLLAPSE_KEY = "sfc-fed-bs-collapsed";

const state = {
  hover: null,
  pinned: null,
  filter: null,
  showExtended: false,
  scene: null,
  fomc: false,
  cashOp: null,
  mode: "inst", // inst | bs
};

let model = null;
let projection = null;
let scenes = null;
const pos = new Map();
const DEFAULT_TYPES = ["appoint", "oversee"];

let lastModeKey = "";
let lastLegendKey = "";
let lastBsKey = "";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function refresh() {
  applyState(svg, model, projection, state);
  const modeKey = state.mode;
  if (modeKey !== lastModeKey) {
    lastModeKey = modeKey;
    paintModePick();
  }
  const filterKey = state.filter ? [...state.filter].sort().join(",") : "";
  const legendKey = `${state.mode}|${state.showExtended}|${filterKey}`;
  if (legendKey !== lastLegendKey) {
    lastLegendKey = legendKey;
    paintLegend();
  }
  const focusId = state.hover || state.pinned;
  const bsKey = `${state.mode}|${state.fomc ? 1 : 0}|${focusId || ""}`;
  if (bsKey !== lastBsKey) {
    lastBsKey = bsKey;
    paintBsPanel();
  }
  if (floatEl && !floatEl.hidden && state.hover) {
    const node = model.byId.get(state.hover);
    if (node) paintFloatBody(node);
  }
  if (state.mode === "bs") hideCard();
  else if (state.pinned && !state.fomc) showCard(state.pinned);
  else hideCard();
}

function paintModePick() {
  if (!modePick) return;
  const modes = [
    { id: "inst", label: "制度" },
    { id: "bs", label: "资产负债" },
  ];
  modePick.innerHTML = modes
    .map((m) => {
      const on = state.mode === m.id;
      return `<button type="button" class="fed-mode-btn${on ? " is-on" : ""}" data-mode="${m.id}" aria-pressed="${on}">${m.label}</button>`;
    })
    .join("");
}

function setMode(id) {
  if (id !== "inst" && id !== "bs") return;
  if (state.mode === id) return;
  state.mode = id;
  state.cashOp = null;
  state.scene = null;
  scenes?.reset();
  if (id === "bs") hideCard();
  lastModeKey = "";
  lastLegendKey = "";
  lastBsKey = "";
  refresh();
}

function sideLabel(side) {
  return side === "asset" ? "资产" : side === "liability" ? "负债" : "资本";
}

function formatSharePct(numer, denom) {
  if (!denom) return "0.0%";
  const pct = (100 * numer) / denom;
  return `${pct.toFixed(1)}%`;
}

function readBsCollapsed() {
  try {
    return sessionStorage.getItem(BS_COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeBsCollapsed(on) {
  try {
    sessionStorage.setItem(BS_COLLAPSE_KEY, on ? "1" : "0");
  } catch {
    /* ignore quota / private mode */
  }
}

function setBsCollapsed(on) {
  writeBsCollapsed(on);
  if (!bsPanel) return;
  bsPanel.classList.toggle("is-collapsed", on);
  const btn = bsPanel.querySelector(".fed-bs-toggle");
  if (btn) {
    btn.setAttribute("aria-expanded", on ? "false" : "true");
    btn.textContent = on ? "展开资产负债" : "收起";
  }
}

function paintBsPanel() {
  if (!bsPanel) return;
  if (state.mode !== "bs" || !model?.bs || state.fomc) {
    bsPanel.hidden = true;
    bsPanel.innerHTML = "";
    bsPanel.classList.remove("is-collapsed");
    return;
  }
  bsPanel.hidden = false;
  const collapsed = readBsCollapsed();
  const meta = model.bs.meta || {};
  const focusId = state.hover || state.pinned;
  const focusRows = focusId ? bsOpsFor(model, focusId) : [];
  const mappedLineIds = new Set(focusRows.map((e) => e.line?.id || e.line_id).filter(Boolean));
  const lines = (model.bs.lines || []).filter((r) => !r.is_total);
  const assets = lines.filter((r) => r.side === "asset");
  const liabs = lines.filter((r) => r.side === "liability");
  const caps = lines.filter((r) => r.side === "capital");
  const sideClass = (side) => (side === "asset" ? "is-asset" : side === "liability" ? "is-liab" : "is-capital");
  const maxAbs = (list) => Math.max(1, ...list.map((r) => Math.abs(r.amount_2025) || 0));
  const amountRowHtml = (r, scale) => {
    const d = r.delta;
    const dCls = d > 0 ? "is-pos" : d < 0 ? "is-neg" : "";
    const pct = Math.min(100, Math.round((100 * Math.abs(r.amount_2025)) / scale));
    return (
      `<li class="fed-bs-row ${sideClass(r.side)}${r.special_flag ? " is-special" : ""}" data-line="${r.id}" style="--fed-bs-pct:${pct}%">` +
      `<span class="fed-bs-label">${escapeHtml(r.label_zh)}</span>` +
      `<span class="fed-bs-amt">${formatMn(r.amount_2025)}</span>` +
      `<span class="fed-bs-bar-track" aria-hidden="true"><span class="fed-bs-bar"></span></span>` +
      `<span class="fed-bs-delta ${dCls}">Δ ${formatMn(d)}</span>` +
      `</li>`
    );
  };
  const shareRowHtml = (r) => {
    const held = mappedLineIds.has(r.id);
    const claimants = model.bs.mapByLine?.get(r.id)?.node_ids || [];
    const shared = held && claimants.length > 1;
    const numer = held ? r.amount_2025 : 0;
    const share = formatSharePct(numer, r.amount_2025);
    const barPct = held && r.amount_2025 ? 100 : 0;
    const sharedTag = shared ? `<span class="fed-bs-shared-tag">共载</span>` : "";
    return (
      `<li class="fed-bs-row fed-bs-share ${sideClass(r.side)}${r.special_flag ? " is-special" : ""}${held ? " is-held" : ""}${shared ? " is-shared" : ""}" data-line="${r.id}" style="--fed-bs-pct:${barPct}%">` +
      `<span class="fed-bs-label">${escapeHtml(r.label_zh)}</span>` +
      `<span class="fed-bs-amt">${share}${sharedTag}</span>` +
      `<span class="fed-bs-bar-track" aria-hidden="true"><span class="fed-bs-bar"></span></span>` +
      `</li>`
    );
  };
  const amountBlock = (title, list) => {
    if (!list.length) return "";
    const scale = maxAbs(list);
    return `<section><h3>${title}</h3><ul class="fed-bs-list">${list.map((r) => amountRowHtml(r, scale)).join("")}</ul></section>`;
  };
  const shareBlock = (title, list) => {
    if (!list.length) return "";
    return (
      `<section><h3>${title}<span class="fed-bs-share-tag">占合并表对应行</span></h3>` +
      `<ul class="fed-bs-list">${list.map(shareRowHtml).join("")}</ul></section>`
    );
  };
  let focusBlock = "";
  if (focusId) {
    const node = model.byId.get(focusId);
    if (focusRows.length) {
      focusBlock =
        `<section class="fed-bs-focus"><h3>${escapeHtml(node?.label?.zh || focusId)}</h3><ul class="fed-bs-list">` +
        focusRows
          .map((e) => {
            const r = e.line;
            const note = r.special_flag
              ? `<p class="fed-bs-note">${escapeHtml(r.special_note_zh || "")}</p>`
              : "";
            return (
              `<li class="fed-bs-row ${sideClass(r.side)}${r.special_flag ? " is-special" : ""}">` +
              `<span class="fed-bs-label">【${sideLabel(r.side)}】${escapeHtml(r.label_zh)}</span>` +
              `<span class="fed-bs-amt">${formatMn(r.amount_2025)}</span>` +
              `<span class="fed-bs-delta">Δ ${formatMn(r.delta)}</span>${note}</li>`
            );
          })
          .join("") +
        `</ul></section>`;
    } else {
      focusBlock =
        `<section class="fed-bs-focus"><h3>${escapeHtml(node?.label?.zh || focusId)}</h3>` +
        `<p class="fed-bs-note">无正式映射状况表行；下方各行份额为 0.0%。</p></section>`;
    }
  }
  const gaps = model.bs.gaps || [];
  const gapBlock = gaps.length
    ? `<section class="fed-bs-gap"><strong class="fed-bs-gap-title">未投影 / gap</strong><ul class="fed-bs-list">` +
      gaps
        .map((g) => {
          const r = g.line;
          return `<li class="fed-bs-row"><span class="fed-bs-label">${escapeHtml(r.label_zh)}</span><span class="fed-bs-amt">${formatMn(r.amount_2025)}</span></li>`;
        })
        .join("") +
      `</ul><p class="fed-bs-note">缺独立节点的报表行，不静默捏造。</p></section>`
    : "";
  const lower = focusId
    ? shareBlock("资产（绿）", assets) + shareBlock("负债（红）", liabs) + shareBlock("资本", caps)
    : amountBlock("资产（绿）", assets) + amountBlock("负债（红）", liabs) + amountBlock("资本", caps);
  const toggleLabel = collapsed ? "展开资产负债" : "收起";
  bsPanel.innerHTML =
    `<header class="fed-bs-head"><strong>资产负债层</strong>` +
    `<button type="button" class="fed-bs-toggle" aria-expanded="${collapsed ? "false" : "true"}">${toggleLabel}</button>` +
    `<span class="fed-bs-meta">asOf ${escapeHtml(meta.asOf || "2025-12-31")} · ${escapeHtml(meta.unit || "USD millions")}</span></header>` +
    focusBlock +
    lower +
    gapBlock +
    `<p class="fed-bs-note">本模式：正式映射节点 fill 内橙/外青，描边仍绿资产/红负债；域外实灰。制度模式仍为部门六色。存量不写入 fund_flow。` +
    (focusId
      ? "下方为占合并表对应行份额：命中=100%，未命中=0%；多节点共载可各显 100%，旁标「共载」。取消选中后恢复总表金额。"
      : "") +
    `</p>`;
  bsPanel.classList.toggle("is-collapsed", collapsed);
}

function dataSectionHtml(title, doc) {
  const status = doc?.status || "error";
  const src = doc?.source?.url
    ? `<a href="${escapeHtml(doc.source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(doc.source.org || "来源")}</a>`
    : escapeHtml(doc?.source?.org || "");
  const items = (doc?.items || [])
    .slice(0, 4)
    .map((it) => {
      const label = escapeHtml(it.title || it.op_type || it.date || "—");
      const href = it.url
        ? `<a href="${escapeHtml(it.url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : label;
      const when = escapeHtml(it.meeting_date || it.date || "");
      return `<li>${when ? `${when} · ` : ""}${href}</li>`;
    })
    .join("");
  return (
    `<section><h3>${escapeHtml(title)} · ${escapeHtml(status)} · asOf ${escapeHtml(doc?.asOf || "—")}</h3>` +
    (src ? `<p>${src}</p>` : "") +
    `<ul>${items || "<li>（无条目）</li>"}</ul></section>`
  );
}

async function toggleDataPanel() {
  if (!dataPanel) return;
  if (!dataPanel.hidden) {
    dataPanel.hidden = true;
    dataPanel.innerHTML = "";
    return;
  }
  dataPanel.hidden = false;
  dataPanel.textContent = "载入中…";
  try {
    const [omo, minutes, cal] = await Promise.all([
      fetchFedOmo(),
      fetchFedFomcMinutes(),
      fetchFedFomcCalendar(),
    ]);
    dataPanel.innerHTML =
      dataSectionHtml("公开市场操作", omo) +
      dataSectionHtml("FOMC 纪要索引", minutes) +
      dataSectionHtml("FOMC 日程", cal) +
      `<p>本地 fixture 默认可演示；真源见各节链接。金额未写入 fund_flow。</p>`;
  } catch (err) {
    dataPanel.innerHTML = `<p>公开数据载入失败。</p>`;
    console.error(err);
  }
}

function groupEdges(list) {
  const groups = new Map();
  for (const edge of list) {
    if (!groups.has(edge.type)) groups.set(edge.type, []);
    groups.get(edge.type).push(edge);
  }
  return groups;
}

function accountSpan(edge) {
  const raw = edge.attrs?.account;
  const label = accountLabel(model, raw);
  const note = edge.attrs?.account_note_zh;
  return (
    `<span class="fed-cash-account">账户：${escapeHtml(label)}` +
    (note && raw == null ? `<span class="fed-cash-account-note" title="${escapeHtml(note)}">*</span>` : "") +
    `</span>`
  );
}

function fundLine(edge, nodeId) {
  const pages = pdfPages(edge);
  const page = pages.length ? `p.${pages.join(", ")}` : "";
  const receiving = edge.to === nodeId;
  const dir = receiving ? "【收】" : "【付】";
  const role = receiving
    ? edge.attrs?.right_zh || subtypeLabel(model, edge.subtype)
    : edge.attrs?.obligation_zh || subtypeLabel(model, edge.subtype);
  return (
    `<li class="${state.cashOp === edge.id ? "is-on" : ""}">` +
    `<button type="button" class="fed-cash-op${state.cashOp === edge.id ? " is-on" : ""}" data-edge="${edge.id}" data-dir="${receiving ? "in" : "out"}">` +
    `<span class="fed-cash-dir">${dir}</span>` +
    `<span class="fed-cash-label">${escapeHtml(edge.label || subtypeLabel(model, edge.subtype))}</span>` +
    accountSpan(edge) +
    `<span class="fed-cash-role">${escapeHtml(role)}</span>` +
    (page ? `<span class="fed-pages">${page}</span>` : "") +
    `</button></li>`
  );
}

function edgeLine(edge) {
  const pages = pdfPages(edge);
  const page = pages.length ? `p.${pages.join(", ")}` : "";
  return `<li>${escapeHtml(edge.label || edge.id)} <span class="fed-pages">${page}</span></li>`;
}

function showCard(id) {
  if (state.mode === "bs") {
    hideCard();
    return;
  }
  const node = model.byId.get(id);
  if (!node || !card) return;
  const typeName = new Map(model.types.map((t) => [t.key, t.zh]));
  const inc = incidentEdges(model, id).filter((e) => e.to === id);
  const out = incidentEdges(model, id).filter((e) => e.from === id);
  const fundIn = inc.filter((e) => e.type === "fund_flow");
  const fundOut = out.filter((e) => e.type === "fund_flow");
  const otherIn = inc.filter((e) => e.type !== "fund_flow");
  const otherOut = out.filter((e) => e.type !== "fund_flow");
  const block = (title, list) => {
    const groups = groupEdges(list);
    if (!groups.size) return "";
    const body = [...groups.entries()]
      .map(([type, edges]) => `<h3>${escapeHtml(typeName.get(type) || type)}</h3><ul>${edges.map(edgeLine).join("")}</ul>`)
      .join("");
    return `<section><h2>${title}</h2>${body}</section>`;
  };
  const fundBlock = (title, list) => {
    if (!list.length) return "";
    return `<section class="fed-card-fund"><h2>${title}</h2><ul>${list.map((e) => fundLine(e, id)).join("")}</ul></section>`;
  };
  const pages = pdfPages(node);
  card.hidden = false;
  card.innerHTML =
    `<h2>${escapeHtml(node.label?.zh || id)}</h2>` +
    `<p>${escapeHtml(node.label?.en || "")}</p>` +
    `<p>${escapeHtml(termLine(node))}</p>` +
    (pages.length ? `<p class="fed-pages">p.${pages.join(", ")}</p>` : "") +
    fundBlock("资金权利（收款）", fundIn) +
    fundBlock("资金义务（付款）", fundOut) +
    block("入边", otherIn) +
    block("出边", otherOut);
}

function hideCard() {
  if (card) {
    card.hidden = true;
    card.innerHTML = "";
  }
}

function cashOpsHtml(node) {
  const ops = fundOpsFor(model, node.id);
  if (!ops.length) return "";
  return (
    `<ul class="fed-cash-ops" aria-label="现金操作">` +
    ops
      .map((edge) => {
        const receiving = edge.to === node.id;
        const dir = receiving ? "【收】" : "【付】";
        const on = state.cashOp === edge.id;
        return (
          `<li><button type="button" class="fed-cash-op${on ? " is-on" : ""}" data-edge="${edge.id}" data-dir="${receiving ? "in" : "out"}" aria-pressed="${on}">` +
          `<span class="fed-cash-dir">${dir}</span>` +
          `<span class="fed-cash-label">${escapeHtml(edge.label || subtypeLabel(model, edge.subtype))}</span>` +
          accountSpan(edge) +
          `</button></li>`
        );
      })
      .join("") +
    `</ul>`
  );
}

function paintFloatBody(node) {
  const pages = pdfPages(node);
  const term = termLine(node);
  let bsBit = "";
  if (state.mode === "bs") {
    const rows = bsOpsFor(model, node.id);
    if (rows.length) {
      bsBit =
        `<ul class="fed-bs-float" aria-label="资产负债">` +
        rows
          .map((e) => {
            const r = e.line;
            const note =
              r.special_flag && r.special_note_zh
                ? `<span class="fed-bs-note">${escapeHtml(r.special_note_zh)}</span>`
                : "";
            return (
              `<li class="${r.special_flag ? "is-special" : ""}">` +
              `<span>【${sideLabel(r.side)}】${escapeHtml(r.label_zh)}${r.special_flag ? " · 待核" : ""}</span>` +
              `<span>${formatMn(r.amount_2025)} · Δ ${formatMn(r.delta)}</span>${note}</li>`
            );
          })
          .join("") +
        `</ul>`;
    }
  }
  floatEl.innerHTML =
    `<strong>${escapeHtml(node.label?.zh || node.id)}</strong>` +
    (term ? `<span>${escapeHtml(term)}</span>` : "") +
    (pages.length ? `<span class="fed-pages">p.${pages.join(", ")}</span>` : "") +
    bsBit +
    (state.mode === "inst" ? cashOpsHtml(node) : "");
}

function placeFloat(node, x, y) {
  if (!floatEl || !node) return;
  floatEl.hidden = false;
  paintFloatBody(node);
  const maxLeft = window.innerWidth - Math.min(280, window.innerWidth * 0.4);
  const maxTop = window.innerHeight - Math.min(320, window.innerHeight * 0.45);
  floatEl.style.left = `${Math.min(x + 12, maxLeft)}px`;
  floatEl.style.top = `${Math.min(y + 12, maxTop)}px`;
}

function hideFloat() {
  if (floatEl) floatEl.hidden = true;
}

function setCashOp(edgeId) {
  state.cashOp = state.cashOp === edgeId ? null : edgeId;
  refresh();
}

function clearCashOp() {
  if (!state.cashOp) return;
  state.cashOp = null;
  refresh();
}

function openFomc() {
  state.fomc = true;
  state.pinned = "FOMC";
  fomcEl.hidden = false;
  renderFomc(fomcEl, { deptOf: (id) => model.byId.get(id)?.dept, onBlank: clearPin });
  hideCard();
  hideFloat();
  lastBsKey = "";
  refresh();
}

function closeFomc() {
  if (!state.fomc && !fomcEl?.innerHTML) return;
  state.fomc = false;
  if (state.pinned === "FOMC") state.pinned = null;
  clearFomc(fomcEl);
}

function pin(id) {
  if (id === "FOMC") {
    openFomc();
    return;
  }
  closeFomc();
  state.pinned = id;
  showCard(id);
  refresh();
}

function clearPin() {
  closeFomc();
  state.pinned = null;
  hideCard();
  refresh();
}

function togglePin(id) {
  if (state.pinned === id) clearPin();
  else pin(id);
}

function paintLegend() {
  if (!legend) return;
  const core = model.types.filter((t) => t.core8);
  const extra = model.types.filter((t) => !t.core8);
  const lit = allowedTypes(model, state);
  const button = (t) => {
    const on = lit.has(t.key);
    return (
      `<button type="button" class="fed-legend-item${on ? " is-on" : ""}" data-type="${t.key}" aria-pressed="${on}">` +
      `${legendSample(t.key)}${escapeHtml(t.zh)}</button>`
    );
  };
  const edges =
    `<div class="fed-legend-edges" aria-label="连线">` +
    core.map(button).join("") +
    `<button type="button" class="fed-legend-item fed-legend-more" aria-expanded="${state.showExtended}">更多</button>` +
    (state.showExtended ? extra.map(button).join("") : "") +
    `</div>`;
  if (state.mode === "bs") {
    const items = [
      ["is-internal", "内部"],
      ["is-external-bs", "外部"],
      ["is-out", "域外"],
      ["is-asset", "资产描边"],
      ["is-liab", "负债描边"],
      ["is-capital", "资本"],
    ];
    const bs =
      `<div class="fed-legend-bs" aria-label="资产负债">` +
      items
        .map(
          ([cls, zh]) =>
            `<span class="fed-legend-bs-item"><i class="fed-legend-swatch ${cls}" aria-hidden="true"></i>${zh}</span>`,
        )
        .join("") +
      `</div>`;
    legend.innerHTML = edges + bs;
    return;
  }
  const dept = (d) =>
    `<span class="fed-legend-dept" data-dept="${d.key}"><i class="fed-dept-swatch" aria-hidden="true"></i>${escapeHtml(d.zh)}</span>`;
  legend.innerHTML = edges + `<div class="fed-legend-depts" aria-label="部门">${model.departments.map(dept).join("")}</div>`;
}

function toggleType(key) {
  const next = new Set(allowedTypes(model, state));
  if (next.has(key)) next.delete(key);
  else next.add(key);
  const isDefault = next.size === DEFAULT_TYPES.length && DEFAULT_TYPES.every((k) => next.has(k));
  state.filter = isDefault ? null : next;
  lastLegendKey = "";
  refresh();
}

function cashOpButtons() {
  const roots = [floatEl, card].filter(Boolean);
  const list = [];
  for (const root of roots) {
    if (root.hidden) continue;
    root.querySelectorAll(".fed-cash-op[data-edge]").forEach((btn) => list.push(btn));
  }
  return list;
}

function focusCashOp(delta) {
  const buttons = cashOpButtons();
  if (!buttons.length) return false;
  const active = document.activeElement;
  let idx = buttons.indexOf(active);
  if (idx < 0) idx = delta > 0 ? -1 : 0;
  const next = buttons[(idx + delta + buttons.length) % buttons.length];
  next?.focus();
  return true;
}

function onKey(e) {
  if (e.key === "Escape") {
    e.preventDefault();
    if (state.cashOp) {
      clearCashOp();
      return;
    }
    if (state.fomc) {
      closeFomc();
      hideFloat();
      state.hover = null;
      lastBsKey = "";
      refresh();
      return;
    }
    if (state.pinned || state.filter || state.scene || state.hover) {
      state.filter = null;
      state.scene = null;
      state.hover = null;
      hideFloat();
      scenes?.reset();
      clearPin();
      return;
    }
    location.assign("/");
    return;
  }

  const inCash = document.activeElement?.closest?.(".fed-cash-op, .fed-cash-ops, .fed-card-fund");
  if (inCash || (floatEl && !floatEl.hidden && floatEl.querySelector(".fed-cash-op"))) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusCashOp(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      focusCashOp(-1);
      return;
    }
    if (e.key === "Enter" && document.activeElement?.classList?.contains("fed-cash-op")) {
      e.preventDefault();
      const edgeId = document.activeElement.dataset.edge;
      if (edgeId) setCashOp(edgeId);
      return;
    }
  }

  const current = document.activeElement?.dataset?.node || state.pinned;
  if (!current) return;
  if (e.key === "Enter") {
    e.preventDefault();
    togglePin(current);
    return;
  }
  const dir = { ArrowRight: 0, ArrowDown: Math.PI / 2, ArrowLeft: Math.PI, ArrowUp: -Math.PI / 2 }[e.key];
  if (dir == null) return;
  if (document.activeElement?.classList?.contains("fed-cash-op")) return;
  e.preventDefault();
  const here = pos.get(current);
  if (!here) return;
  let best = null;
  let bestScore = 1.2;
  for (const edge of incidentEdges(model, current)) {
    const otherId = edge.from === current ? edge.to : edge.from;
    const there = pos.get(otherId);
    if (!there) continue;
    let delta = Math.abs(Math.atan2(there.y - here.y, there.x - here.x) - dir);
    delta = Math.min(delta, Math.PI * 2 - delta);
    if (delta < bestScore) {
      bestScore = delta;
      best = otherId;
    }
  }
  if (!best) return;
  const el = svg.querySelector(`.fed-node[data-node="${best}"]`);
  el?.focus();
  state.hover = best;
  const node = model.byId.get(best);
  const rect = el.getBoundingClientRect();
  placeFloat(node, rect.left, rect.bottom);
  refresh();
}

function boot(graph) {
  model = graph;
  projection = project(graph, "ring");
  for (const node of projection.nodes) pos.set(node.id, node);
  if (trailEl) trailEl.innerHTML = trail([{ label: "FED", current: true }]);
  paint(svg, model, projection);
  lastModeKey = "";
  lastLegendKey = "";
  lastBsKey = "";
  refresh();
  svg.addEventListener("pointerover", (e) => {
    const g = e.target.closest?.("[data-node]");
    if (!g) return;
    state.hover = g.dataset.node;
    placeFloat(model.byId.get(state.hover), e.clientX, e.clientY);
    refresh();
  });
  svg.addEventListener("pointermove", (e) => {
    if (!state.hover || !floatEl || floatEl.hidden) return;
    if (e.target.closest?.(".fed-cash-ops")) return;
    const maxLeft = window.innerWidth - Math.min(280, window.innerWidth * 0.4);
    const maxTop = window.innerHeight - Math.min(320, window.innerHeight * 0.45);
    floatEl.style.left = `${Math.min(e.clientX + 12, maxLeft)}px`;
    floatEl.style.top = `${Math.min(e.clientY + 12, maxTop)}px`;
  });
  svg.addEventListener("pointerout", (e) => {
    const g = e.target.closest?.("[data-node]");
    if (!g) return;
    if (e.relatedTarget?.closest?.("[data-node]")?.dataset.node === g.dataset.node) return;
    if (e.relatedTarget?.closest?.("#fedFloat")) return;
    state.hover = null;
    hideFloat();
    refresh();
  });
  svg.addEventListener("click", (e) => {
    const g = e.target.closest?.("[data-node]");
    if (g) togglePin(g.dataset.node);
    else if (state.pinned || state.cashOp) {
      clearCashOp();
      if (state.pinned) clearPin();
    }
  });
  floatEl?.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".fed-cash-op[data-edge]");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    setCashOp(btn.dataset.edge);
  });
  floatEl?.addEventListener("pointerleave", (e) => {
    if (e.relatedTarget?.closest?.("[data-node]")) return;
    state.hover = null;
    hideFloat();
    refresh();
  });
  card?.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".fed-cash-op[data-edge]");
    if (!btn) return;
    e.preventDefault();
    setCashOp(btn.dataset.edge);
  });
  legend?.addEventListener("click", (e) => {
    const typeBtn = e.target.closest?.("[data-type]");
    if (typeBtn) {
      toggleType(typeBtn.dataset.type);
      return;
    }
    if (e.target.closest?.(".fed-legend-more")) {
      state.showExtended = !state.showExtended;
      lastLegendKey = "";
      paintLegend();
    }
  });
  modePick?.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-mode]");
    if (btn) setMode(btn.dataset.mode);
  });
  bsPanel?.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".fed-bs-toggle");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    setBsCollapsed(!readBsCollapsed());
  });
  dataBtn?.addEventListener("click", () => {
    toggleDataPanel();
  });
  window.addEventListener("keydown", onKey);
  wireBackspaceNav(() => {
    const links = trailEl?.querySelectorAll("a");
    return links?.length ? links[links.length - 1].getAttribute("href") : "/";
  });
  scenes = bindScenes(model, (step) => {
    state.scene = step;
    refresh();
  });
}

const params = new URLSearchParams(location.search);
if (params.has("bics")) location.replace(`/bics${location.search}`);
else {
  loadGraph()
    .then(boot)
    .catch((err) => {
      if (svg) svg.outerHTML = `<p class="fed-footer">制度图没有载入。</p>`;
      console.error(err);
    });
}
