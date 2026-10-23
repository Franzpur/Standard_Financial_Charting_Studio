/** FE-FED-DRAW layout — pure ring projection. x,y are SVG plane positions, not cube coordinates. */

const VIEW = { w: 1280, h: 860 };
const CENTER = { x: 640, y: 470 };

const RING1 = [
  "FOMC",
  "SEAT-BOG-1",
  "SEAT-BOG-2",
  "SEAT-BOG-3",
  "SEAT-BOG-4",
  "SEAT-BOG-5",
  "SEAT-BOG-6",
  "SEAT-BOG-7",
  "SEAT-NY",
  "SEAT-ROT-1",
  "SEAT-ROT-2",
  "SEAT-ROT-3",
  "SEAT-ROT-4",
  "DESK",
];

const BANKS = ["RB-01", "RB-02", "RB-03", "RB-04", "RB-05", "RB-06", "RB-07", "RB-08", "RB-09", "RB-10", "RB-11", "RB-12"];
const EXTRAS = ["RB-ALL", "RB-BOARD", "DIR-A", "DIR-B", "DIR-C", "RB-PRES", "BRANCH"];
const TOP = ["CONGRESS", "SBC", "HFSC", "PRESIDENT", "SENATE", "TREASURY", "TGA", "FSOC", "FFIEC", "FIN-REGS"];

const LANE = {
  appoint: -28,
  oversee: 28,
  report: -14,
  vote: 14,
  transmit: -42,
  fund_flow: 42,
  regulate: -8,
  advise: 8,
  service: 20,
  delegate: -20,
  inform: 6,
  coordinate: -6,
};

function shapeFor(node, place) {
  if (place === "center" || node?.id === "FOMC") return "gov";
  if (place === "band") return "band";
  if (node?.kind === "reserve_bank") return "bank";
  if (node?.kind === "seat") return "seat";
  return "ring";
}

function put(placed, id, x, y, place) {
  placed.set(id, { id, x, y, place });
}

function onCircle(placed, ids, radius, shift) {
  ids.forEach((id, i) => {
    const a = -Math.PI / 2 + shift + (i * 2 * Math.PI) / ids.length;
    put(placed, id, CENTER.x + Math.cos(a) * radius, CENTER.y + Math.sin(a) * radius, "ring");
  });
}

function curve(a, b, type) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const lane = LANE[type] || 0;
  const cx = mx + (-dy / len) * lane;
  const cy = my + (dx / len) * lane;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const HIT_MAX = 22;

function withHitRadius(nodes) {
  for (const n of nodes) {
    let nearest = Infinity;
    for (const m of nodes) {
      if (m !== n) nearest = Math.min(nearest, Math.hypot(m.x - n.x, m.y - n.y));
    }
    n.hit = Math.min(HIT_MAX, nearest / 2 - 2);
  }
  return nodes;
}

/**
 * hit: transparent click radius, min(22, nearest centre / 2 − 2), so no two hit circles overlap.
 * @returns {{nodes: {id:string,x:number,y:number,place:string,shape:string,hit:number}[], edgePaths: object[], view: {w:number,h:number}}}
 */
export function project(graph, mode) {
  if (mode !== "ring") throw new Error(`FED project mode ${mode} is not in this release`);
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  const placed = new Map();
  put(placed, "BOG", CENTER.x, CENTER.y, "center");
  onCircle(placed, RING1, 118, 0);
  RING1.forEach((id) => {
    const p = placed.get(id);
    if (p) p.place = "ring1";
  });
  onCircle(placed, BANKS, 228, 0);
  BANKS.forEach((id) => {
    const p = placed.get(id);
    if (p) p.place = "bank";
  });
  EXTRAS.forEach((id, i) => {
    const x = 280 + (i * (1000 - 280)) / Math.max(EXTRAS.length - 1, 1);
    put(placed, id, x, 800, "extra");
  });
  const ring3 = graph.nodes.filter((n) => n.ring === 3 && !placed.has(n.id)).map((n) => n.id);
  ring3.forEach((id, i) => {
    const a = -Math.PI / 2 + Math.PI / ring3.length + (i * 2 * Math.PI) / ring3.length;
    put(placed, id, CENTER.x + Math.cos(a) * 360, CENTER.y + Math.sin(a) * 248, "outer");
  });
  TOP.forEach((id, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    put(placed, id, 160 + col * 240, row === 0 ? 36 : 78, "band");
  });
  const rest = graph.nodes.map((n) => n.id).filter((id) => !placed.has(id));
  const leftCount = Math.ceil(rest.length / 2);
  rest.forEach((id, i) => {
    const left = i < leftCount;
    const idx = left ? i : i - leftCount;
    const count = left ? leftCount : rest.length - leftCount;
    const y = 168 + idx * (520 / Math.max(count - 1, 1));
    put(placed, id, left ? 78 : 1202, y, left ? "side-l" : "side-r");
  });
  const nodes = withHitRadius(
    graph.nodes.map((n) => {
      const p = placed.get(n.id);
      return { id: n.id, x: p.x, y: p.y, place: p.place, shape: shapeFor(n, p.place) };
    }),
  );
  const pos = new Map(nodes.map((n) => [n.id, n]));
  const edgePaths = [];
  for (const edge of graph.edges) {
    const a = pos.get(edge.from);
    const b = pos.get(edge.to);
    if (!a || !b) continue;
    edgePaths.push({
      id: edge.id,
      type: edge.type,
      directed: edge.directed !== false,
      d: curve(a, b, edge.type),
    });
  }
  return { nodes, edgePaths, view: VIEW, byId };
}
