/** FOMC voting circle — rule illustration, not a roster. */

const VOTING = [
  ["SEAT-BOG-1", "主席"],
  ["SEAT-BOG-2", "副主席"],
  ["SEAT-BOG-3", "理事"],
  ["SEAT-BOG-4", "理事"],
  ["SEAT-BOG-5", "理事"],
  ["SEAT-BOG-6", "理事"],
  ["SEAT-BOG-7", "理事"],
  ["SEAT-NY", "纽约"],
  ["SEAT-ROT-1", "轮值"],
  ["SEAT-ROT-2", "轮值"],
  ["SEAT-ROT-3", "轮值"],
  ["SEAT-ROT-4", "轮值"],
];

const HOVER = "出席并发言，当年无票";

export function renderFomc(root, { deptOf, onBlank }) {
  const seats = VOTING.map(([id, label], i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / VOTING.length;
    const x = 200 + Math.cos(a) * 118;
    const y = 168 + Math.sin(a) * 118;
    const external = id.startsWith("SEAT-ROT-");
    return (
      `<g class="fed-fomc-seat${external ? " is-external" : ""}" data-seat="${id}" data-dept="${deptOf(id)}">` +
      `<rect x="${x - 22}" y="${y - 10}" width="44" height="20"/>` +
      `<text class="fed-label" x="${x}" y="${y + 4}" text-anchor="middle">${label}</text>` +
      `</g>`
    );
  }).join("");
  const blanks = Array.from({ length: 7 }, (_, i) => {
    const x = 36 + i * 52;
    return `<rect class="fed-fomc-blank" data-vote="false" x="${x}" y="332" width="40" height="16"><title>${HOVER}</title></rect>`;
  }).join("");
  root.innerHTML =
    `<svg class="fed-fomc-svg" viewBox="0 0 400 360">` +
    `<text class="fed-label" x="200" y="172" text-anchor="middle">12 票 · 年 8 会</text>` +
    seats +
    `<text class="fed-badge-pending" x="200" y="316" text-anchor="middle">示意 · 分组待核（external）</text>` +
    blanks +
    `</svg>`;
  root.querySelector(".fed-fomc-svg").addEventListener("click", (e) => {
    if (!e.target.closest("[data-seat], [data-vote]")) onBlank();
  });
  const float = document.getElementById("fedFloat");
  root.querySelectorAll("[data-vote='false']").forEach((el) => {
    el.addEventListener("pointerenter", () => {
      if (!float) return;
      float.hidden = false;
      float.textContent = HOVER;
    });
    el.addEventListener("pointerleave", () => {
      if (!float) return;
      float.hidden = true;
      float.textContent = "";
    });
  });
}

export function clearFomc(root) {
  const float = document.getElementById("fedFloat");
  if (float && float.textContent === HOVER) {
    float.hidden = true;
    float.textContent = "";
  }
  root.innerHTML = "";
  root.hidden = true;
}
