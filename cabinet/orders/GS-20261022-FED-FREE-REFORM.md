# 内阁 → 总参谋部指令

**令号** `GS-20261022-FED-FREE-REFORM`  
**日期** 2026-10-22  
**任务周期** 「FED / C-FED 自由改革 · 可验证债清理」（**新周期**；承接近轮 COLOR / FUND-FLOW / COPY-FIX / BS-LAYER / BS-PCT / BS-DIM 已落地能力，**不重开**那些主题的大改）  
**本周期内阁下令计数** **第 1 次 / 至多 5**（业主未指定次数，取默认；业主授「全权考察、指挥按轮次改正」）  
**交** **总参谋部**（父代理将本文**完整**转交 `general-staff`；实施后送监理；**内阁不令监理、不令档案**、不改产品码）  
**谏言** 不发问（同轮开场已答；全权授意下无阻塞裁断）

**业主原话**

> 电内阁，进入自由改革时间，视角、页面、设置、代码、交互等等等等各方面，你认为需要考察和改正的地方，全权考察、指挥按轮次改正。

**语境** `/fed` 近几轮已落地：环图、部门六色、资金流悬停、文案纠错、2025 BS 层（模式切换、侧栏、占比、隐简介卡、域外灰）。授权全权考察并按轮次指挥改正；**不限于 FED，但本期优先 C-FED / 与近期改动相关的可验证问题**；勿无边际重写全仓。

---

## 意志（一句）

**在不动环坐标、不无故改 `fund_flow` 拓扑、不编造年报数字的前提下，按 W0→W1→W2 清掉 `/fed` 近轮叠加留下的可验证交互债、模式切换残留、文案/概念漂移、缓存戳与 BS 语义粗糙点，使制度 / 资产负债两模式各自说得通、可回归。**

---

## 内阁已核现状（2026-10-22 · 短考）

| # | 核实 | 路径 / 证据 |
|---|------|-------------|
| K1 | 数据：65 节点 / 85 边 / `fund_flow`×9（subtype 齐全）；情景 S1–S5 在 JSON，UI 仅播 S1/S2 | `fed-graph.json` · `scenes.js` `PLAYABLE` |
| K2 | BS：condition + map 32 行；`node_ids` 命中约 9 个主体节点；**15 条 `gap:true` 仍带 proxy `node_ids`**，同时进 `byNode` 与 gap 区 | `fed-bs-map.json` · `model.js` `indexGraph` |
| K3 | 模式切换 `setMode` **不清理** `cashOp` / 情景步；进 BS 后浮层藏现金列表，但边高亮可残留 | `interact.js` `setMode` / `paintFloatBody` |
| K4 | 缓存戳：**入口** `interact.js?v=12` / `fed.css?v=12`，子模块仍钉 `draw.js?v=7`、`model.js?v=6`、`scenes.js?v=3` 等——改子文件若不 bump 易吃旧缓存 | `fed.html` · `interact.js` imports |
| K5 | 占比：多节点映射行（如 `deposits_di`→DEP-INST+RB-ALL）focus 时各行份额呈 **0% 或 100%**，双端均可 100%，叙事上双计 | `interact.js` `shareRowHtml` · map `entries` |
| K6 | 页脚固定「材料截至 2021-08」；BS 侧栏 `asOf 2025-12-31`——双时点未在 chrome 交代 | `fed.html` footer · `#fedBsPanel` |
| K7 | `F03 remittance` 缺 `attrs.account`（其余 fund_flow 有账户） | `fed-graph.json` F03 |
| K8 | FUND-FLOW 曾令现金列表 **Tab / 方向键**；现箭头键只做**节点**邻跳，列表行无键盘环 | `interact.js` `onKey` |
| K9 | `CONCEPTS.md` C-FED 未写 BS-DIM「域外实灰」；`modules/graph.json` FE-FED-DRAW role 仍写「scenario S1」 | 概念 / 模块图漂移 |
| K10 | 悬停 `refresh()` 重绘图例 + 模式钮 + **整块 BS 侧栏**——可验证卡顿债 | `interact.js` `refresh` → `paintBsPanel` |
| K11 | BS 模式图例仍摆部门六色色块，与域外灰 / in-BS 绿红语义并置易混 | `paintLegend` · `fed.css` |

**硬保留（本令不得破坏）**  
环 `project()` `x,y`；命中区半径公式；`fund_flow` F01–F09 **拓扑与方向**（可补属性/文案，禁止无故拆并边）；部门六色（制度模式）；Home / 路径；不加 CDN；不改 `DESIGN.md` / `library/` / Swift / `.app`；不编造年报数字；不接 BS W3 情景同屏。

---

## 分波（内阁自行安排 · 本期闭环）

| 波次 | 内容 | **本期** |
|------|------|----------|
| **W0** 模式切换与回归债 | 切模式清残留态；统一 bump `?v=`；CONCEPTS C-FED + FE-FED-DRAW 角色句与现网对齐；页脚双时点一句 | **做** |
| **W1** BS 语义与图例诚实 | gap+proxy 着色/列表规则收紧；多节点份额不双计 100%；BS 图例改为模式相关（域外灰 / 绿红 / 待核）；F03 补账户（无则显式 `n/a`+note，不编造） | **做** |
| **W2** 交互可达与性能 | 现金操作列表键盘（Tab/↑↓/Enter，Esc 次序保留）；悬停勿整页重灌 BS 面板（dirty / 节流）；调度美工收口 token | **做** |
| **后置** | S3–S5 播放器；BS W3（QT+TGA+ON RRP）；增节点填 gap；全仓非 FED 自由改 | **留后**（完善令另开） |

**本期总验收一句：** 用户在 `/fed` 于制度 ↔ 资产负债间反复切换无残留高亮/错卡；BS 下域外灰与 in-BS 色、侧栏份额与 gap 说明自洽；硬刷新后 JS/CSS 必为新戳；现金列表可用键盘点选；环坐标与 fund_flow 边集合与本令前一致。

---

## 裁断（硬）

| # | 项 | 裁断 |
|---|----|------|
| **C1** | 范围 | **本期只动 C-FED**（`Ind-Chain/web/fed.html`、`web/js/fed/*`、`web/css/fed.css`、`data/fed/*` 必要属性、`server/fed_graph.py` 若校验要跟、`CONCEPTS.md` C-FED 句、`modules/graph.json` FE-FED-DRAW role + 重烘 `modules/index.html`）。非 FED 页面本周期不改。 |
| **C2** | 模式切换残留 | `setMode("bs"\|"inst")` 必须：`clearCashOp`；可选 `scenes.reset()` 并清 `state.scene`（避免 BS 下情景边热与存量层抢戏）。切回制度后 `#fedCard` 规则仍从 BS-DIM。 |
| **C3** | 缓存戳 | 凡本令改过的模块与其**全部 import 链**及 `fed.html` 链入的 css/js，**同一轮统一递增** `?v=`（禁止只 bump 入口、子模块仍旧号）。 |
| **C4** | gap + proxy | **不得**让「仅因 gap 代理挂上的行」与「正式映射行」在视觉上无区别。裁断：`gap:true` 的 entry **仍可**保留 `node_ids` 供侧栏说明，但 **默认不**给节点挂 `is-bs-asset\|liab\|capital`（不进 in-BS 着色集）；正式映射（`gap≠true`）才着色。gap 行只留在「未投影 / gap」区（及可选 focus 下「代理说明」一句）。若实现发现与业主口头「占资产负债一部分」冲突，以**正式映射 `node_ids`** 为准（与 BS-DIM C2 对齐并收紧）。 |
| **C5** | 多节点份额 | focus 下方占比：**禁止**映射到同一 `line_id` 的多个节点各自显示 100%。允许方案（择一，总参钉死）：(a) 仅当 `node_ids.length===1` 显示 100%，多节点显示「共载 / 未分摊」或 `—` 并短注；(b) 按节点数均分显示（须标注「均分示意，非账簿分摊」）。**禁止**编造不对称权重。 |
| **C6** | 双时点文案 | 页脚或模式旁增加**一句** provenance：制度材料 asOf **2021-08**（《The Fed Explained》）；资产负债存量 asOf **2025-12-31**（合并状况表）。不删既有免责声明。 |
| **C7** | F03 account | 补 `attrs.account`：若 PDF/年报未单列账户，用受控键 + `note` 说明「上缴无单独账户枚举 / 对财政部」，**或**显式 `account: null` 且 UI 显示「账户：—」；校验器允许该边缺账户仅当 note 标明。不改 F03 拓扑。 |
| **C8** | 现金列表键盘 | 浮层/卡片内 `.fed-cash-op`：Tab 进出；↑↓ 在列表内移动焦点；Enter 同点击选中/再按取消。节点箭头邻跳保留。Esc：先 `cashOp` → FOMC → pin/filter/scene → Home（现序保留）。 |
| **C9** | 性能 | `pointerover` / `pointermove` **不得**无条件 `innerHTML` 重写整块 `#fedBsPanel` 与图例。侧栏仅在 `mode` / `pinned` / focus 目标变化或数据首次就绪时重绘；浮层可局部更新。 |
| **C10** | 图例（BS） | BS 模式：部门六色色块**弱化或替换**为「in-BS 绿/红/资本 · 域外灰 · 待核」短样；制度模式保持现部门色块。调度 **art-department**（窄）。 |
| **C11** | 概念 / 模块图 | 更新 `CONCEPTS.md` C-FED：写明域外实灰、`is-bs-out`、S1/S2 可播。`modules/graph.json` FE-FED-DRAW role 改为含 S1/S2（及 BS 层一句）；改后 `python3 modules/bake_static.py`。 |
| **C12** | 美工 / 信息 | **调度 art-department**：C10 图例样 + 若需微调 `--fed-bs-*` / 域外灰对比。**信息不部**除非 W1 发现 condition/map 数字与 inbox CSV 不一致（有则 desk=clean 升级业主，不静默改数）。 |
| **C13** | 仍禁 | 不改环坐标；不无故增删/改向 `fund_flow` 边；不把 BS 金额写入 F0x；不加 S3+ 播放（数据可留）；不改 Swift / `.app` / `DESIGN.md` / `library/`；不指挥监理/档案。 |

---

## 任务（建议次序）

> 写手为默认建议；总参谋部可调次序，不得越出 C13。

### W0

**T1 主代理：模式切换清态** — 实现 C2；制度↔BS 往返截图/手测无残留 `is-selected` 资金边、无错弹 `#fedCard`。  
**T2 主代理：统一 `?v=`** — C3。  
**T3 主代理：双时点一句** — C6。  
**T4 主代理：CONCEPTS + modules role + bake** — C11。

**W0 验收一句：** 切模式无交互残留；硬刷新后子模块非旧缓存；页脚/旁注能读出 2021 制度材料 vs 2025 BS；概念句与模块图角色不说谎。

### W1

**T5 主代理：gap/proxy 与 in-BS 着色** — C4；回归：RB-ALL 等不再因 premises 等 gap 行披满绿红。  
**T6 主代理：多节点份额** — C5。  
**T7 主代理：F03 account** — C7；必要时收紧 schema / `check_fed_graph`。  
**T8 art-department + 主代理：BS 图例** — C10。

**W1 验收一句：** BS 下仅正式映射节点着资产负债色；多节点行不出现双 100%；gap 区仍列未投影行；F03 账户展示诚实；图例与着色一致。

### W2

**T9 主代理：现金列表键盘** — C8；960×640 与 1280×800 不挡路径/Home。  
**T10 主代理：侧栏重绘节流** — C9；快速划过节点时侧栏不闪整表（或可接受的节流）。  
**T11 主代理：回归清单** — 制度六色；BS 域外灰；钉选/再点取消；S1/S2 步进；fund_flow 悬停列表；递延「待核」；环坐标抽检 3 点与令前一致。

**W2 验收一句：** 键盘可完成一次现金操作选中/取消；悬停不再整页重灌侧栏；T11 清单全绿。

---

## 调度

| 角色 | 是否调度 | 备注 |
|------|----------|------|
| **总参谋部** | **是**（本令） | 立意志与任务单 |
| **父代理** | **是** | 改产品码 |
| **art-department** | **是**（W1/W2 窄） | C10；可选 token |
| **information-department** | **否**（默认） | 仅数字冲突时再 desk=clean |
| **监理部 / 档案部** | **否** | 父代理流程自唤；内阁不令 |

---

## 回报要求（给总参任务单）

1. 逐条对应 C1–C13 / T1–T11。  
2. 列出本令**未改**的 fund_flow id 集合（应为 F01–F09）与环坐标「未动」声明。  
3. 验收三句（W0/W1/W2）各一句实测结果。  
4. 不替内阁下令监理或书记。

---

## 旁注（考察清单全文 · 供总参对照，非另开任务）

交互债：模式残留 · 现金列表键盘缺口 · 悬停整表重绘。  
文案：双 asOf · F03 账户空。  
BS：gap proxy 着色过宽 · 多节点 100% 双计 · 图例与域外灰不一致。  
回归：缓存戳链 · CONCEPTS/模块 role 漂移。  
后置：S3+ · BS W3 · 真增节点填 gap · 非 FED 页。
