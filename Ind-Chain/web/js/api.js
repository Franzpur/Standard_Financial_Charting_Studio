/** FE-API — single HTTP client for gate / list / cube (M2).
 * Change API_BASE once; pages must not scatter `/api/…` strings.
 */

export const API_BASE = "/api";

function apiUrl(path, params) {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  if (params && typeof params === "object") {
    Object.entries(params).forEach(([k, v]) => {
      if (v != null && v !== "") url.searchParams.set(k, String(v));
    });
  }
  return url;
}

async function getJson(url, label) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${label} failed (${res.status})`);
  return res.json();
}

async function sendJson(method, path, body, label) {
  const res = await fetch(apiUrl(path), {
    method,
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: body == null ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || `API ${label} failed (${res.status})`;
    const err = new Error(msg);
    err.payload = data;
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function fetchFedGraph() {
  return getJson(apiUrl("/fed/graph"), "/fed/graph");
}

export async function fetchFedBs() {
  return getJson(apiUrl("/fed/bs"), "/fed/bs");
}

export async function fetchFedOmo() {
  return getJson(apiUrl("/fed/omo"), "/fed/omo");
}

export async function fetchFedFomcMinutes() {
  return getJson(apiUrl("/fed/fomc/minutes"), "/fed/fomc/minutes");
}

export async function fetchFedFomcCalendar() {
  return getJson(apiUrl("/fed/fomc/calendar"), "/fed/fomc/calendar");
}

export async function fetchBundle() {
  const ticker = new URLSearchParams(location.search).get("ticker");
  const url = apiUrl("/bundle", ticker ? { ticker } : undefined);
  return getJson(url, "/bundle");
}

export async function searchCompanies(q) {
  const url = apiUrl("/companies", { q });
  return getJson(url, "/companies");
}

export async function fetchBicsChildren({ parent, listingCountry } = {}) {
  const url = apiUrl("/bics/children", {
    parent: parent || undefined,
    listingCountry: listingCountry || undefined,
  });
  return getJson(url, "/bics/children");
}

export async function fetchBicsLocate(q) {
  const url = apiUrl("/bics/locate", { q });
  return getJson(url, "/bics/locate");
}

export async function fetchBicsNode(code) {
  const url = apiUrl("/bics/node", { code });
  return getJson(url, "/bics/node");
}

export async function fetchBicsEntities({ bics, listingCountry } = {}) {
  const url = apiUrl("/bics/entities", {
    bics,
    listingCountry: listingCountry || undefined,
  });
  return getJson(url, "/bics/entities");
}

/** Quarterly debt-ladder aggregate for a node, or null (404 / offline / bad payload). Never throws.
 * Only door to /api/debt/ladder; the response is aggregate-only (no per-bond rows). */
export async function fetchDebtLadder(ticker, name) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 4000);
  try {
    const res = await fetch(apiUrl("/debt/ladder", { ticker, name }), { cache: "no-store", signal: ctl.signal });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* —— ChartSpec authoring (BE-CHARTSPEC via BE-HTTP) —— */

export async function listCharts() {
  return getJson(apiUrl("/charts"), "/charts");
}

export async function fetchChart(id) {
  return getJson(apiUrl(`/charts/${encodeURIComponent(id)}`), "/charts/:id");
}

export async function saveChart(spec, id) {
  return sendJson("POST", "/charts", { spec, id: id || undefined }, "/charts");
}

export async function deleteChart(id) {
  return sendJson("DELETE", `/charts/${encodeURIComponent(id)}`, null, "/charts/:id");
}

export async function compileChart(spec, meta) {
  return sendJson("POST", "/charts/compile", { spec, meta }, "/charts/compile");
}

export async function applyChartOps(spec, ops) {
  return sendJson("POST", "/charts/apply", { spec, ops }, "/charts/apply");
}

export async function importChartTable(spec, text, template = "relation") {
  return sendJson(
    "POST",
    "/charts/import-table",
    { spec, text, template },
    "/charts/import-table",
  );
}

export async function runChartCmd(spec, text) {
  return sendJson("POST", "/charts/cmd", { spec, text }, "/charts/cmd");
}
