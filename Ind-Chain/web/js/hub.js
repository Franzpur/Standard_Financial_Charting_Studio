/** [C-HUB] Personal home on `/`. Splash timing matches the former C-HOME gate. */

import { bicsHref, fedHref, hubHref } from "./nav.js?v=2";

function routeHref(entry) {
  if (entry === "/bics") return bicsHref();
  if (entry === "/fed") return fedHref();
  if (entry === "/") return hubHref();
  return entry;
}

const splash = document.getElementById("splash");
const hub = document.getElementById("hub");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitTwoFrames() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function skipSplash() {
  const q = new URLSearchParams(location.search);
  return q.has("bics") || sessionStorage.getItem("sfcSplashSeen") === "1";
}

function dismissSplash() {
  return new Promise((resolve) => {
    if (!splash || !splash.isConnected) {
      resolve();
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      splash.remove();
      resolve();
    };
    splash.classList.add("splash-out");
    splash.addEventListener("transitionend", (e) => {
      if (e.propertyName === "opacity") finish();
    });
    setTimeout(finish, 4200);
  });
}

function revealHub() {
  if (!hub) return;
  hub.hidden = false;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function thumbSvg(kind) {
  if (kind === "bics") {
    const cells = [];
    for (let i = 0; i < 8; i += 1) {
      const x = (i % 4) * 16;
      const y = Math.floor(i / 4) * 12;
      cells.push(`<rect x="${x}" y="${y}" width="14" height="10" fill="none" stroke="currentColor" stroke-width="1"/>`);
    }
    return `<svg class="hub-thumb" viewBox="0 0 64 24" aria-hidden="true">${cells.join("")}</svg>`;
  }
  if (kind === "fed") {
    const dots = [];
    for (let i = 0; i < 12; i += 1) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 12;
      const x = 32 + Math.cos(a) * 12;
      const y = 16 + Math.sin(a) * 10;
      dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.4" fill="currentColor"/>`);
    }
    return `<svg class="hub-thumb" viewBox="0 0 64 32" aria-hidden="true">${dots.join("")}<rect x="29" y="13" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;
  }
  return "";
}

function renderSystems(list) {
  const grid = document.getElementById("hubGrid");
  if (!grid) return;
  const items = [...(list || [])].sort((a, b) => a.order - b.order);
  grid.replaceChildren();
  for (const item of items) {
    const live = item.status === "live" && item.entry;
    const el = document.createElement(live ? "a" : "span");
    el.className = `hub-cell home-sector is-${item.status || "reserved"}`;
    if (live) {
      const href = routeHref(item.entry);
      el.href = href;
      el.addEventListener("click", (e) => {
        e.preventDefault();
        location.assign(href);
      });
    } else {
      el.setAttribute("aria-disabled", "true");
    }
    const tag = item.status === "coming" ? "Coming" : item.tagline || "";
    el.innerHTML =
      thumbSvg(item.thumb) +
      `<span class="hub-cell-label">${escapeHtml(item.label || "")}</span>` +
      (tag ? `<span class="hub-cell-tag">${escapeHtml(tag)}</span>` : "");
    grid.appendChild(el);
  }
}

async function loadSystems() {
  const res = await fetch("/data/systems.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`systems.json ${res.status}`);
  renderSystems(await res.json());
}

async function bootHub() {
  const q = new URLSearchParams(location.search);
  if (q.has("bics") || q.has("listingCountry")) {
    location.replace(`/bics${location.search}`);
    return;
  }
  const loadPromise = loadSystems();
  try {
    if (skipSplash()) {
      if (splash?.isConnected) splash.remove();
      revealHub();
      await loadPromise;
      return;
    }
    await waitTwoFrames();
    await sleep(2000);
    await dismissSplash();
    sessionStorage.setItem("sfcSplashSeen", "1");
    revealHub();
    await loadPromise;
  } catch (err) {
    if (splash?.isConnected) splash.remove();
    revealHub();
    console.error(err);
  }
}

bootHub();
