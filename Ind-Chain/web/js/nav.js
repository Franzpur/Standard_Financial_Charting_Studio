/**
 * FE-NAV — Page routing, URL query helpers, and Backspace upward navigation across
 * `/` (FE-HUB), `/bics` (FE-BOARD), `/fed` (FE-FED-DRAW), `/list` (FE-LIST), and `/cube` (FE-OPENCUBE).
 */

export function currentBics() {
  return new URLSearchParams(location.search).get("bics") || "";
}

export function currentListing() {
  return new URLSearchParams(location.search).get("listingCountry") || "";
}

export function currentQuery() {
  return new URLSearchParams(location.search).get("q") || "";
}

export function gateHref(bics, country) {
  const p = new URLSearchParams();
  if (bics) p.set("bics", bics);
  if (country) p.set("listingCountry", country);
  const q = p.toString();
  return q ? `/bics?${q}` : "/bics";
}

export function hubHref() {
  return "/";
}

export function bicsHref(bics, country) {
  return gateHref(bics, country);
}

export function fedHref() {
  return "/fed";
}

function escapeTrail(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Breadcrumb with an SFC prefix back to `/`. Inner items stay separated by `/`. */
export function trail(items) {
  const body = (items || [])
    .map((it, i) => {
      const sep = i === 0 ? "" : `<span class="home-trail-sep">/</span>`;
      const label = escapeTrail(it.label);
      const inner =
        it.href && !it.current
          ? `<a href="${escapeTrail(it.href)}">${label}</a>`
          : `<span class="home-trail-current">${label}</span>`;
      return sep + inner;
    })
    .join("");
  return `<a href="${hubHref()}">SFC</a><span class="home-trail-sep"> › </span>${body}`;
}

export function listHref(bics, country) {
  const p = new URLSearchParams();
  p.set("bics", bics);
  if (country) p.set("listingCountry", country);
  return `/list?${p.toString()}`;
}

export function listLocateHref(bics, ticker) {
  const p = new URLSearchParams();
  p.set("bics", bics);
  p.set("q", ticker);
  return `/list?${p.toString()}`;
}

export function cubeHref() {
  return "/cube";
}

export function cubeCompanyHref(ticker) {
  const t = String(ticker || "").trim();
  if (!t) return "/cube";
  return `/cube?ticker=${encodeURIComponent(t)}`;
}

/** Alt locate token: bare demo cube (not company→cube). */
export function isDemoCubeQuery(q) {
  return String(q || "").trim().toLowerCase() === "/cube";
}

export function assignRoute(href) {
  if (href) location.assign(href);
}

export function replaceRoute(href) {
  if (href) location.replace(href);
}

/** Wire Backspace outside editable inputs to navigate to the URL returned by resolveHref(). */
export function wireBackspaceNav(resolveHref) {
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Backspace" || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    const el = document.activeElement;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
    e.preventDefault();
    const href = typeof resolveHref === "function" ? resolveHref() : "";
    if (href) location.assign(href);
  });
}
