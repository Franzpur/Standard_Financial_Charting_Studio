# 内阁 → 总参谋部指令

**令号** `GS-20261022-FED-COLOR-HIT-LEGEND`  
**日期** 2026-10-22  
**任务周期** 「FED 制度图 · 部门上色 / 命中区 / 再点取消 / 连线图例」（新周期；上一周期 `GS-20261022-FED-HUB-P1` 已结，书记第 309 条）  
**本周期内阁下令计数** **第 1 次 / 至多 5**（业主未指定次数，取默认）  
**交** **总参谋部**（父代理将本文**完整**转交 `general-staff`；实施后送监理；内阁不令监理、不令档案、不改产品码）  
**谏言** 不发问（开场已答）

**业主原话**

> 电内阁，有这么几个问题需要你解决，首先，为各个部门上色，第二，以金融稳定司为首的这么一批小圆圈太难点了，扩大其判定范围；第三，我选中某个部门或视图后，再点一下取消选择的功能要做出来；第四，添加连线图例。

---

## 意志（一句）

**在不动环投影坐标、不动壳与 .app 的前提下，`/fed` 的节点按六个部门上色并配部门图例，所有节点加不互相覆盖的透明命中区，节点 / FOMC 席位圈 / 连线图例再点一下即取消，连线图例每格带线型与箭头样本；图例改为页内独立一行，不压 `SFC › FED`、Home 标与节点标签。**

---

## 内阁已查明的现状（2026-10-22 读文件核实）

| 项 | 现状 | 出处 |
|----|------|------|
| 节点色 | 单色：`--text` / `--muted` / `--stroke` / `--glass` | `Ind-Chain/web/css/fed.css` 节点段 |
| 小圆 | 环 3（10 个：DFS、DCCA、LISCC、CD-DEPT、6 个咨询委员会）与两侧（11 个市场 / 公众 / 国际主体）是 `r=5` 空心圆；储行 `r=8` | `Ind-Chain/web/js/fed/draw.js` `glyph()`；`layout-ring.js` |
| 最挤处 | **DFS ↔ RB-02、IPAC ↔ RB-12、FAC ↔ RB-08、RB-ADV ↔ RB-06 圆心仅相距 38.5 单位**（viewBox 1280×860）；其余环 3 / 两侧 / 底行最近邻 ≥ 94 单位 | 内阁按 `project()` 复算 |
| 屏上尺寸 | SVG `meet` 缩放约 0.78（1280×800）/ 0.60（960×640）；`r=5` 屏上只有约 3.9px / 3.0px | 同上 |
| 点击 | svg click 只调 `pin(id)`；再点同节点不取消；点空白不取消；边线有指针事件 | `interact.js` |
| FOMC | 点 FOMC 打开 `#fedFomc`（`inset:0` 盖满舞台），只有 Esc 能关 | `interact.js`、`fomc.js`、`fed.css` |
| 图例过滤 bug | 默认态（`filter===null`）图例显示「任命」「监督」为 `is-on`，但点「任命」会先清空再加入，结果仍亮、反而灭了「监督」；全关后回 `null`，又亮回两项 | `interact.js` `toggleType()` |
| Esc 与情景 | Esc 把 `state.scene` 置空，但 `scenes.js` 的 `index` / 计时器 / 字幕不复位，下次「下一步」接着旧步走 | `interact.js` `onKey()`、`scenes.js` |
| 图例形态 | 只有中文字的按钮（核心 8 + 「更多」4），无线型 / 箭头样本；绝对定位在页顶 44px 页眉带里（`top:8px; left:128px`） | `fed.html`、`fed.css` `.fed-legend` |
| 箭头 | `draw.js` 只画了三种形（实心三角 / 空心折线 / 圆点），**与 AESTHETIC C-FED 表里 12 种各异的箭头不一致**，任命 / 投票 / 传导（同为实线）在图上难分 | `draw.js` `markerDefs()` 对 `agent_tasklist/AESTHETIC.md` C-FED |
| 详情卡 | `.fed-card` 的定位包含块是视口（`main` 未定位），打开时 `top:8px; right:8px` 压在右上 Home 标上 | `fed.css`、`fed.html` |
| 数据 | 65 节点、80 边、12 边类型；节点有 `kind` / `ring` / `class` | `Ind-Chain/data/fed/fed-graph.json` |

---

## 裁断

| # | 项 | 裁断 |
|---|----|------|
| **C1** | 旧令 R6 部分撤销 | 依业主「为各个部门上色」，撤销 `GS-20261022-FED-HUB-P1` R6 中「不引入新色名」**对节点**的限制。**边仍不靠颜色**（线型 + 箭头），`--accent` 仍只作选中 / 焦点，`--us` / `--intl` 仍不借，美联储官方配色 / 徽标仍不用。 |
| **C2** | 「部门」= 六组 | 全部 65 节点归入且只归入一组（数目已核）：**理事会**（BOG、SEAT-BOG-1..7、DFS、DCCA、LISCC，11）· **FOMC**（FOMC、SEAT-NY、SEAT-ROT-1..4、DESK，7）· **储备银行**（数据 `class:"bank"` 全部：RB-01..12、RB-ALL、RB-BOARD、DIR-A/B/C、RB-PRES、BRANCH、CD-DEPT，20）· **咨询委员会**（`kind:"advisory"`，6）· **政府机构**（CONGRESS、SBC、HFSC、SENATE、PRESIDENT、TREASURY、TGA、FSOC、FFIEC、FIN-REGS，10）· **市场、公众与国际**（DEP-INST、MEMBER-BANKS、SUPERVISED、PRIM-DEALERS、NONBANK-CP、MARKETS、FMU、PUBLIC、COMM-ORG、FOREIGN-CB、INTL，11）。 |
| **C3** | 分组落在数据 | `fed-graph.json` 顶层增 `departments: [{key, zh, en, order}]`（6 条），每节点增 `dept`（取上述 key）。键名建议 `board / fomc / banks / advisory / government / markets`。`note` 写明「部门分组为 SFC 编排，非 PDF 原文分类」。schema 与 `check_fed_graph.py` 增规则 ⑧：每节点有 `dept` 且在 `departments` 内。前端只读 `dept`，**不在 JS 里按 kind/id 猜组**。 |
| **C4** | 颜色由美工部定 | 六枚**新 token**，由美工部写入 `AESTHETIC.md` C-FED 与 `fed.css`，**作用域限 `.fed-page`**（不进 `app.css :root`，别页不得引用），名如 `--fed-dept-board` 等。约束：①六色两两易分；②在 `--bg` 上线条对比度 ≥ 3:1；③不与 `--accent` 相近（选中信号须独一），不取 `--us` / `--intl` 的值；④不用美联储官方色；⑤低饱和、与现有暗底玻璃同族，不加渐变 / glow。具体色值美工部定。 |
| **C5** | 色上在哪 | 色只上**图形描边**（席位条为填色）；`--glass` 填与标签字色（`--text`）不变。状态：`.is-selected` 描边改 `--accent`（盖过部门色）；`.is-hot` **保持部门色**（AESTHETIC 现写「描边回 `--text`」一句改掉）；`.is-dim` 仍 0.25；`.is-external` 仍虚线空心，虚线用部门色。FOMC 席位圈浮层内的席位同样按组上色（理事席 = 理事会色，纽约 / 轮值 = FOMC 色）。形状四态不改，色是形之外的第二线索。 |
| **C6** | 命中区 | 每个节点加一枚**透明命中圆**，**不改可见图形大小**。半径（viewBox 单位）= `min(22, 最近邻圆心距 / 2 − 2)`，由纯函数投影一并算出（`project()` 结果每节点多一个 `hit` 字段，坐标不变）。按现布局：DFS / IPAC / FAC / RB-ADV 及其邻储行为 17.25，其余小圆为 22。命中圆画在**边之上、全部可见节点之下**的独立一层，带同一 `data-node`、`aria-hidden`、无 `tabindex`，`fill: transparent`、`pointer-events: all`；**不得**被 `.fed-shape-* circle`、`.is-hot` 放大、`.is-external` 虚线等选择器命中。可见图形与标签永远压在命中层之上，所以重叠处总是点到看得见的那个。节点之间移动若前后同一 `data-node`，不算离开（悬停不闪）。 |
| **C7** | 边不接点击 | `.fed-edge` 设 `pointer-events: none`。本期边不可点，点在线上等于点空白。 |
| **C8** | 「部门」再点 = 节点再点 | 点**已钉住**的同一节点 → 取消钉选（收卡、去 accent）；点别的节点 → 换钉；**点舞台空白**（非命中区、非可见节点）→ 取消钉选。键盘 Enter 与点击同义（对已钉节点再按 Enter 即取消）。取消后指针若仍在该节点上，悬停高亮照常。 |
| **C9** | 「视图」= 两种 | 本令所称「视图」只指 **FOMC 席位圈** 与 **连线图例过滤**。部门图例只作说明，**不可点**（不做部门过滤，见末节待知）。S1 情景不算可取消的选中：播放键本已是「播放 / 暂停」开关，上一步退到第 1 步之前即回到无情景，保持不变。 |
| **C10** | FOMC 再点 | 席位圈打开时，点圈内**席位与无票块以外的任何位置**（含中心「12 票 · 年 8 会」字）→ 关圈并取消 FOMC 钉选，回到环图无选中。点席位 / 无票块不关。Enter 在 FOMC 上于圈开时 = 关圈。 |
| **C11** | 图例再点 | 修 `toggleType()`：以**当前显示为亮的集合**为起点切换（默认态即 `{appoint, oversee}`），亮的再点就灭，灭的点就亮。全灭是合法状态：不画任何类型边、节点**不淡出**、图例无一亮（不再弹回默认两项）。只有 Esc 回默认骨架。「更多」照旧是展开 / 收起开关。图例按钮加 `aria-pressed`。 |
| **C12** | Esc / Backspace | 次序**不变**：先关 FOMC 圈（钉选保留）→ 再清钉选 / 过滤 / 情景 → 根层回 `/`。只补一处：Esc 清情景时，`scenes.js` 须同步复位（停计时、`index = -1`、字幕回概述），`bindScenes` 为此导出 `reset()`。Backspace 不动。点击取消是一步到位，Esc 是逐级，二者有意不同。 |
| **C13** | 连线图例形态 | **不另开面板**。现有过滤按钮每格前加一段约 28×10 的 SVG 样本：同线宽、同 `stroke-dasharray`、同箭头（`coordinate` 两端菱形）。样本与画布共用同一套 `#fed-mk-*` 标记形态，**先把 `draw.js` 的 12 个 marker 改成 AESTHETIC C-FED 表所写的 12 种形与尺寸**，否则样本分不出任命 / 投票 / 传导。样本线色 `--text`，按钮灭时随字降为 `--muted`。 |
| **C14** | 部门图例 | 要。六格：直角小色块（部门色描边 + `--glass` 填，或实色小方块，美工部定）+ 中文名，读 `departments` 按 `order` 排。静态、不可点、无 hover 态。 |
| **C15** | 版面：图例改独立一行 | `#fedLegend` 不再绝对定位在页眉带里，改为 `main` 纵向流里**页眉之下、舞台之上**的独立一行（图例带）：左段「连线」过滤条，右段「部门」说明条，中间一道 `--stroke` 竖线；可折行，折行只把舞台往下推，**永不覆盖**任何东西。页眉 44px 带只留 `SFC › FED` 与右上 Home 标。图例带高度：1280×800 「更多」收起时 1 行；960×640 收起时 ≤ 2 行。 |
| **C16** | 详情卡不压 Home 标 | `.fed-card` 改以舞台为定位包含块（移入 `#fedStage` 或等效），打开时不压 `SFC › FED`、Home 标与图例带。960 窄屏下沿用底部抽屉式。 |
| **C17** | 写权 | 依 `POWER-KNOWLEDGE.md` 与 `RULE.md`「改动新 UI 面视觉前必须先派美工部」：**颜色 token、图例带外观、样本与色块外观、`.fed-hit` 的样式规则** → 美工部（`AESTHETIC.md` C-FED + `fed.css`）先行；**数据 / schema / 校验脚本、`project()` 的 `hit`、`draw.js` 绘制与 marker、`interact.js` / `fomc.js` / `scenes.js` 行为、`fed.html` 结构** → 主代理。`fed.html` 整文件主代理，样式层美工另审。 |
| **C18** | 坐标与范围 | `project()` 输出的 `x,y` **一个都不改**（环投影保留，D2 明示例外照旧）；不加 F2 / F3；不做部门过滤、路径高亮、下钻、搜索。`modules/graph.json` 预期不变（38 模块 / 55 边）；若主代理确有新增文件职责，按实际补边并重烘，跨侧契约仍只 `FE-API → BE-HTTP`。 |

---

## 任务（建议次序：T1 ∥ T2 → T3 → T4 → T5 → T6）

> 路径以仓根为准。写手为默认建议，总参谋部可在任务单中调整，但不得越出 C17。

**T1 美工部：部门色与图例带外观**（任务单写「调度 art-department」）  
- `agent_tasklist/AESTHETIC.md` C-FED：增「部门色」小节（六 token 名、值、作用域 `.fed-page`、C4 约束、C5 上色规则与状态）；改「`.is-hot` 描边回 `--text`」为「保持部门色」；「图例」小节改写为 C13–C15 的图例带（两段、样本、色块、可折行、在流内）；增 `.fed-hit` 一行（透明、不受形态 / 状态选择器影响）；`.fed-fomc` 底色与实际 CSS 对齐（今文写 `--glass-strong`，实为 `--bg`，美工部择一并统一）；文末 *Last updated* 记本令号。  
- `Ind-Chain/web/css/fed.css`：六 token；`.fed-dept-*`（或 `[data-dept]`）描边 / 席位填；状态覆盖次序（selected > hot/dept > dim）；`.fed-edge { pointer-events: none }`；`.fed-hit`；图例带（流内、两段、竖分隔、样本、色块）；`.fed-card` 新定位；960 媒体查询同步。  
- 验收：只多六个 `--fed-dept-*`，无其它新色名；`--us` / `--intl` 未出现在 `fed.css`。

**T2 主代理：数据与校验**（可与 T1 并行）  
- `Ind-Chain/data/fed/fed-graph.json`：增 `departments`（6）与每节点 `dept`（按 C2 表，65/65）；`note` 补一句分组系 SFC 编排。  
- `Ind-Chain/data/fed/fed-graph.schema.json`：增 `departments` 与 `dept`。  
- `Ind-Chain/scripts/check_fed_graph.py`：增规则 ⑧。  
- 信息部可选协助（`desk=manage`）：`agent_tasklist/INFORMATION.md` FED 词条增六个部门名（中英），与界面一致。  
- 验收：`check_fed_graph.py` PASS；六组计数 11 / 7 / 20 / 6 / 10 / 11。

**T3 主代理：投影命中半径 + 绘制**（待 T2）  
- `Ind-Chain/web/js/fed/layout-ring.js`：`project()` 每节点多 `hit`（C6 公式），`x,y` 不变。  
- `Ind-Chain/web/js/fed/draw.js`：`paint()` 顺序改为 边 → 命中层 → 可见节点；节点 `<g>` 加部门类或 `data-dept`；`markerDefs()` 按 AESTHETIC C-FED 表重画 12 种箭头与尺寸；导出一小函数生成图例样本 SVG（供 `interact.js` 用，与画布同形）。  
- `Ind-Chain/web/js/fed/model.js`：`indexGraph` 带出 `departments`。  
- 验收：同一图数据下 `project()` 的 `x,y` 与改前逐点相等（对改前金样或现跑结果比对）；任两节点命中圆不相交。

**T4 主代理：再点取消与图例行为**（待 T3）  
- `Ind-Chain/web/js/fed/interact.js`：C8（同节点再点 / 空白取消 / Enter 同义）、C10（FOMC 圈内空白关圈并清钉）、C11（`toggleType` 修正、全灭合法、`aria-pressed`）、C12（Esc 清情景时调 `reset()`）；`paintLegend()` 渲染两段图例带（连线样本 + 部门色块）；`pointerout` 同 `data-node` 不算离开。  
- `Ind-Chain/web/js/fed/fomc.js`：席位按组上色；圈内空白点击回调（由 `interact.js` 传入关圈函数）。  
- `Ind-Chain/web/js/fed/scenes.js`：`bindScenes` 返回值加 `reset()`。  
- `Ind-Chain/web/js/fed/draw.js` `applyState`：过滤集为空时不淡出节点。  
- `Ind-Chain/web/fed.html`：`#fedLegend` 移到页眉之下、`#fedStage` 之上的流内位置；`#fedCard` 移入舞台（或等效）；各 `?v=` 版本号递增。

**T5 主代理：文档**  
- `Ind-Chain/CONCEPTS.md` C-FED 行：补「节点按 `dept` 六组着色（色为 `.fed-page` 内 token），边仍只靠线型与箭头」「节点 / FOMC 圈 / 连线图例再点取消；点空白取消钉选」「图例带含连线样本与部门色块」。

**T6 主代理：回归**  
- `Ind-Chain/scripts/regress_api_golden.py`：`/fed` 与 `/api/fed/graph` 金样因本令预期变化，按既有流程重采；**其余金样零 diff**。  
- `regress_all` quick ALL PASS。

---

## 总验收（交监理时）

开发服务器 `http://127.0.0.1:8787/fed`，**1280×800 与 960×640 各截一张**（默认态；钉住 DFS；FOMC 圈打开；图例「更多」展开各一）：

1. **上色**：65 节点按六组着色，部门图例六格与画布颜色一致；选中为 `--accent` 且仅选中用它；边无色相差异。  
2. **命中**：在 DFS、IPAC、FAC、RB-ADV 及其邻储行、任一两侧主体、任一底行节点上，以 `document.elementFromPoint` 取「圆心」与「命中圆内沿四个方向 0.9 倍半径处」五点，`closest('[data-node]')` 均为该节点自身；任一节点可见图形中心点总是点到它自己（无点错）。960×640 下 DFS 一组命中直径屏上 ≥ 18px，其余小圆 ≥ 24px。  
3. **再点取消**：同节点再点 → 卡收、accent 去；点空白 → 同上；点边线 → 同空白；FOMC 圈内空白 → 关圈且无钉选；图例默认态点「任命」→ 只剩「监督」亮；再点「监督」→ 全灭、无边、节点不淡；Esc → 回默认骨架。Enter 与点击同义。  
4. **Esc / 情景**：S1 播到第 3 步后按 Esc，字幕回概述，再按「下一步」从第 1 步起。Esc 三级次序与 Backspace 行为与改前一致。  
5. **图例**：12 种连线样本线型 / 箭头与画布同形，任命 / 投票 / 传导可凭箭头分辨；图例带在流内，1280 收起 1 行、960 收起 ≤ 2 行；**`SFC › FED`、右上 Home 标、节点标签均无遮挡**；详情卡打开不压 Home 标与图例带。  
6. `check_fed_graph.py` PASS；`regress_all` quick ALL PASS；`project()` 的 `x,y` 未变。  
7. `fed.css` 只多 `--fed-dept-*` 六个；`--us` / `--intl` 未用；无 CDN、无新库。  
8. `SFCShell.swift` / `Backend.swift` / `SelfTest.swift` / 构建与打包脚本 / `.app` / 启动器图标 / `DESIGN.md` / `library/` **零 diff**；`.app` 不重建。

---

## 明确不做

- 改 Swift / `.app` / 打包脚本 / `DESIGN.md` / `library/`；重建 `.app`  
- 动 FED 环投影坐标或 Home / C-HOME 拆分（业主强制实施保留）  
- F2 / F3 任何一项；部门过滤；路径高亮；下钻；搜索；导出  
- 给边上色；把 `--accent` 用于部门；借 `--us` / `--intl`；用美联储官方色或徽标  
- 放大可见图形以代替命中区；力导向；新库；CDN

---

## 仅业主能解决（不阻塞本令，请知悉）

1. **部门图例是否要可点（按部门高亮 / 过滤）**：本令只做说明。若要，下一令再开，届时「再点取消」同样适用。  
2. **六组的划法**：本令把 SEAT-NY 与 DESK 归 FOMC、DFS / DCCA / LISCC 归理事会、FSOC / FFIEC / 其他监管者归政府机构。业主若想另划（如把纽约联储相关并入储备银行），改数据 `dept` 即可，不动代码。

---

## 模块展示（本令时快照）

真源 `modules/graph.json`（updated 2026-10-22）· 静态页 `modules/index.html` · **38 模块 / 55 边**（calls 28、depends 24、contract 3）。

| 区 | 数 | 模块 |
|----|----|------|
| fe-decision | 4 | FE-NAV、FE-BOARD、FE-LIST、FE-LISTAREA |
| fe-cube | 7 | FE-OPENCUBE、FE-ACTION、FE-COORDONE、FE-SCENE、FE-PANEL、FE-FOCUS、FE-AESTHETIC |
| fe-api | 1 | FE-API |
| fe-map | 6 | FE-MAPPROJ、FE-MAPDRAW、FE-MAPREG、FE-MAPDOCK、FE-MAPOUT、FE-CMD |
| fe-fed | 3 | FE-HUB、FE-FED-MODEL、FE-FED-DRAW |
| shell | 3 | SHELL-WINDOW、SHELL-PROC、SHELL-PACK |
| be | 14 | BE-HTTP、BE-BUNDLE、BE-DB-DEMO、BE-DB-SHADOW、BE-CHARTSPEC、BE-NVDA-LAYOUT、BE-NVDA-LINKS、BE-DEBT、BE-BICS-HIER、BE-BICS-ENTITY、BE-BICS-AREA、BE-BICS-INGEST、MODULES-TRACK、BE-FED-GRAPH |

跨侧契约仅：`FE-API → BE-HTTP`、`BE-HTTP → MODULES-TRACK`、`SHELL-WINDOW → BE-HTTP`。

本令涉及的模块链：`FE-FED-DRAW`（`draw.js`、`interact.js`、`fomc.js`、`scenes.js`、`layout-ring.js`）→ `FE-FED-MODEL`（`model.js`）→ `FE-API` ⇒ `BE-HTTP` → `BE-FED-GRAPH`（读 `fed-graph.json`）。预期不增模块、不增边。
