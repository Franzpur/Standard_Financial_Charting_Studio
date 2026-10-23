# 内阁 → 总参谋部指令

**令号** `GS-20261022-FED-FUND-FLOW`  
**日期** 2026-10-22  
**任务周期** 「FED 制度图 · 资金流细化 / 主体现金操作悬停列表」（**新周期**；上一周期 `GS-20261022-FED-COLOR-HIT-LEGEND` 主题不同，已另计；若其上色令的三监尚未结案，本令仍独立下发，**不指挥监理**）  
**本周期内阁下令计数** **第 1 次 / 至多 5**（业主未指定次数，取默认）  
**交** **总参谋部**（父代理将本文**完整**转交 `general-staff`；实施后送监理；内阁不令监理、不令档案、不改产品码）  
**谏言** 不发问（开场已答）

**业主原话**

> 电内阁，细化资金流项目，谁对谁有资金义务，谁对谁有资金权利，谁为谁针对哪个账户支付利息，操作台通过哪些操作支出什么收入什么等等，任何相关资金的都要细化，通过我给你的材料考察之，可以通过悬停列表的形式实现对特定主体现金相关操作的选择

**材料真源**（私有、已入 `.gitignore`）：`SFC-VIS-FED/Materials/the-fed-explained.pdf`（《The Fed Explained》11th ed., Aug 2021，135 PDF 页）。证据页码一律指该 PDF。页码换算与上令同：印刷页 ≈ PDF−8（p≤24）或 PDF−4（p≥25）。未在 PDF 写明的数字不得编造；有数字必须带 `asOf` 或 evidence；不把总额分摊到 12 家储行；不用美联储徽标 / 官方色。

---

## 意志（一句）

**以 `fund_flow` 边（`from=付款方 → to=收款方`）+ `subtype` + `attrs.account` 为资金关系唯一真源，按 PDF 补齐 IORB / ON RRP / 操作台交割 / 贴现放贷等实际现金边，悬停浮层给出可点的「该主体现金操作」列表并高亮对应边，打开情景 S2；不动环投影、Home 拆分、部门色与命中区。**

---

## 内阁已核现状（2026-10-22）

| 项 | 核实 |
|----|------|
| `fund_flow` 仅 4 条 | F01 `interest` TREASURY→RB-ALL（证券利息，p.12）；F02 `fees` DEP-INST→RB-ALL（有偿服务，p.12, 92）；F03 `remittance` RB-ALL→TREASURY（上缴，p.12–13，attrs 含 2011–2020 bn、`asOf` 2021-08）；F04 `reimbursement` TREASURY→RB-ALL（财政代理报销，p.106，「约占总运营成本 13%」） |
| 边类型定义已写方向 | `edge_types.fund_flow.meaning`：**from=付款方 → to=收款方**（须贯彻到新边与 UI 文案） |
| 利率 / 工具仍在 `transmit` | T03 DESK→PRIM-DEALERS（买卖证券）；T04 BOG→DEP-INST（IORB 利率）；T05 FOMC→NONBANK-CP（ON RRP 利率）；T06 RB-ALL→DEP-INST（贴现窗口工具）；**尚未有对应付息 / 交割 / 放贷的 `fund_flow`** |
| 情景 | JSON 已有 S2（4 步，边 F01/F02/F03/F04/S02）、S3（13(3)，4 步）；UI 现只播 S1 |
| 成员行持股 | PDF p.12：「成员银行持有本区储行股票」；p.82 Reg I 仅「Issue and Cancellation of Federal Reserve Bank Capital Stock」表题——**未写股息率 / 支付义务细则** |
| 悬停 | `#fedFloat` 仅中英名 + termLine + 页码；**无现金操作列表、不可选** |
| 选中卡 | `#fedCard` 按入/出边列边，类型名来自 `edge_types`，**未标义务/权利/账户** |
| 上周期保留 | 环投影坐标、Home/`/`、C-HOME/`/bics`、部门六色、命中区、再点取消、图例带——**本令不得改掉** |

PDF 关键摘录（令文所依，实施须再对原文）：

- **收入**：证券利息（OMO 取得的证券）；有偿支付服务费（MCA 要求长期收回成本，p.12, 92）；财政代理报销约 13% 总运营成本（p.106）。  
- **IORB**：对存款机构在储行**准备金账户**余额付息；2021-07-29 起统一称 IORB（p.39–40）。  
- **ON RRP**：对手方隔夜向联储「存放」现金、获国债抵押，次日 unwind 并获息；FOMC 定 offering rate；实际利率竞价；规模受组合内国债库存约束（p.41）。  
- **操作台**：向一级交易商竞价买卖；买券时贷记交易商往来行准备金账户；临时 repo；standing ON RRP（p.40–41）。  
- **贴现窗口**：储行放贷、借款人质押；利率一般略高于市（p.42）；理事会审定贴现率（AD07 建议贴现率仍为 `advise`）。  
- **上缴**：费用与转入盈余后净收益上缴；盈余合计上限 **$6.785 billion**（出版时，p.12；Fig 1.4 注另有历史上限变迁，p.13）。

---

## 裁断

| # | 项 | 裁断 |
|---|----|------|
| **C1** | 数据模型主结构 | 取 **(a) 为主**：凡「谁付给谁钱 / 谁对谁有收付义务」一律写成边类型 **`fund_flow`**，用 **`subtype`** 细分。**不**另开「账户 / 操作」节点类型（否决 (b) 作主结构，以免环布局与 65 节点坐标被冲）。**(c) 不落盘双写**：节点**不**持久化 `cash_ops[]`；悬停列表由前端按「该节点为 from 或 to 的全部 `fund_flow` 边」**索引生成**（可加 `attrs.ops_group` 做操作台分组）。义务 / 权利是同一条边的两面，UI 文案按视点切换，不拆成两条边。 |
| **C2** | `from` / `to` 方向 | **一律现金流向**：`from` = **付款方（义务方）**，`to` = **收款方（权利方）**。利息边：付息人 → 收息人。回购 / ON RRP 的「起始腿」与「到期腿」若 PDF 只描述机制而无分腿金额，可各写一条机制边（或一条边 `attrs.legs` 注明 start/unwind），**不得编金额**。与现有 F01–F04 方向保持一致；新边校验同规则。 |
| **C3** | `subtype` 受控词表 | 顶层或 `edge_types` 旁增 `fund_flow_subtypes`（实现可放 JSON 顶层数组）。本期必用键（中英说明 + 指向 PDF）：`interest`（证券利息收入，F01）、`priced_service`（有偿服务；**将 F02 的 `fees` 迁名为本键**，旧键废止）、`remittance`（上缴，F03）、`fiscal_reimburse`（财政代理报销；**将 F04 的 `reimbursement` 迁名**）、`iorb`（准备金余额付息）、`onrrp`（隔夜逆回购现金腿 / 付息）、`desk_omo`（永久公开市场买卖价款）、`desk_repo`（临时回购）、`discount_loan`（贴现窗口放贷本金/利息机制）。可选：`account_service`（仅当 PDF 明确有现金收付且不宜归入上列时）。`check_fed_graph.py`：凡 `type=fund_flow` 必须有合法 `subtype`。 |
| **C4** | 与 T03 / T04 / T05 / T06 | **拆成两条，不改类型互吞**：`transmit` **只保留「利率 / 指令 / 工具设定」**（谁定什么率、谁指示操作）；**实际付息、交割、放贷、收款**另建 `fund_flow`。T04 文案收窄为「设定 IORB」；新增例如 F05 `iorb`：RB-ALL（或代表联储负债方）→ DEP-INST，`attrs.account=reserve_balance`。T05 收窄为「设定 ON RRP offering rate」；新增 F0x `onrrp`：联储侧 → NONBANK-CP（付息方向按 PDF：机构获息 → 付款方为联储/DESK）。T03 收窄为「执行 OMO / 注入回收准备金」的传导描述；新增 `desk_omo` / `desk_repo` 资金边 DESK↔PRIM-DEALERS。T06 收窄为「贴现窗口工具 / 利率上限角色」；新增 `discount_loan`：RB-ALL → DEP-INST（放贷本金流出）。**禁止**把同一事实既写在 transmit.meaning 又写成 fund_flow 且互相矛盾；实施时改写 transmit 的 meaning，去掉「支付利息 / 买卖交割」等现金措辞。AD07 仍为 `advise`（建议贴现率），不升 `fund_flow`。S03（外国央行代理）、S04（TGA 开立）仍为 `service`；若 PDF 未写清外币账户现金义务，**不**强造 fund_flow。 |
| **C5** | 账户 | **本期不新增账户节点**。账户落在边 **`attrs.account`**（受控枚举）：`reserve_balance`（IORB / OMO 贷记准备金）、`soma`（组合证券；PDF 称 System Open Market Account / portfolio，无「SOMA」缩写字样亦可，`note` 标明 SFC 键名）、`on_rrp`、`discount_window`、`tga`、`fiscal_agency`、`priced_services`。卡片与悬停列表必须展示账户键的中英说明。业主「针对哪个账户」= 读 `attrs.account`，不是点一个账户圆。 |
| **C6** | 操作台目录 | DESK 的操作目录 = **以 DESK 为端点的 `fund_flow` 边集合**（按 `subtype` / `attrs.ops_group` 排序：永久 OMO、临时 repo、ON RRP…）。每条边 `label` / `meaning` 写清：**支出什么 / 收入什么**（买券付价款、卖券收款、ON RRP 付息、回购到期收款等），证据 p.40–41。悬停 DESK → 列表点某一行 → 高亮该边 + 两端节点（及 `attrs.highlight_extra` 若有，如准备金账户相关的 DEP-INST）；**不**改环坐标。 |
| **C7** | 义务 / 权利文案 | 边可加 `attrs.obligation_zh` / `attrs.right_zh`（短句，可从 from/to 模板生成后人工润色）。卡片：出边标题「资金义务（付款）」；入边「资金权利（收款）」。悬停列表行：`【付】…` / `【收】…` + subtype 中文 + 账户。 |
| **C8** | 悬停列表 UI | `#fedFloat` **扩展**：若该节点存在关联 `fund_flow`，在名 / term / 页码之下显示**可点列表**（一行一操作）；无资金边则保持现状。交互：悬停打开列表；**点击某行** = 选中该操作（高亮边/节点，可与钉选并存：钉选仍以节点为准，操作选中为第二态 `state.cashOp`）；再点同一行取消操作选中；点空白 / Esc 按上周期次序清（先清 `cashOp`，再清钉选等，与 C12 兼容，不破坏 FOMC / 图例 / 情景层级）。键盘：列表行可 Tab / 方向键，Enter 同点击。**不得**挡住 `SFC › FED`、Home、图例带、节点标签；1280×800 与 960×640 回归截图验收。钉选卡 `#fedCard` 增「资金」分组（入/出 `fund_flow`），展示 subtype、账户、义务/权利句、evidence 页码。 |
| **C9** | 美工部 | 悬停现金操作列表为**新 UI 面**：任务单须写 **「调度 art-department」**——token / 浮层列表 / 可点行 / 选中态写进 `AESTHETIC.md` C-FED 与 `fed.css`（作用域限 `.fed-page`）。行为与数据索引归主代理。 |
| **C10** | 情景范围 | **本期打开 S2**「联储利润上缴财政部」播放（UI 增加情景选择或第二按钮；默认仍可先停在 S1，但 S2 必须可播且逐步高亮与 JSON 一致）。**不打开** S3（13(3)）资金流细化：S3 保持现状，不新增 13(3) 的 `fund_flow` 边。S2 步文若引用 S02，确认该边仍存在且语义为财政代理服务（非资金），勿与 F04 混淆。 |
| **C11** | 成员行股息 | **不写**股息 `fund_flow`。可在 MEMBER-BANKS 或 RB-ALL 的 `note` / 词条写「成员银行持股（PDF p.12）；股息细则 PDF 未写清 → `external` 待核」。持股关系继续靠现有选举边（A03/A04），不伪造成资金义务。 |
| **C12** | 数字与证据 | 凡金额 / 比率 / 上限：必须 `attrs.asOf`（或边级）+ `evidence[].pdf_pages` + `status`。已有 F03 系列保留。F04「约 13%」可写 `attrs.approx_share_of_operating_cost: 0.13` + asOf 2021-08 + p.106，**不得**反算美元额。盈余上限 $6.785B 可挂在 F03 或 RB-ALL attrs，注明出版时。**禁止**把系统总额分摊到 RB-01..12。 |
| **C13** | 图例与可见性 | `fund_flow` 仍为核心 8；默认骨架仍可只显 appoint+oversee。本令须做到：①悬停主体时其资金边可见（1 跳或操作选中）；②点亮图例「资金流」可看全图资金边；③S2 播放时按步显边。边**仍不靠颜色**区分类型（部门色只在节点；边靠线型 + 箭头）。 |
| **C14** | 写权 | **数据 / schema / 校验 / 边文案 / interact·model·draw·scenes / S2 UI** → 主代理。**悬停列表外观** → 美工部（C9）。**信息部可选** `desk=manage`：补 IORB、ON RRP、TGA、SOMA（或「公开市场组合」）、贴现窗口、净收益上缴等词条——**不挡令**。 |
| **C15** | 仍禁与保留 | 不改 Swift / `.app` / 打包 / `DESIGN.md` / `library/`；不重建 `.app`；**不动**环投影坐标与 Home / C-HOME 拆分；不加 CDN / 新库；不用美联储徽标与官方色；边不靠色分类型；上周期部门六色 / 命中区 / 再点取消 / 图例带 **零回退**。 |

---

## 本期应新增 / 调整的资金边（最低集；id 可调，语义不可少）

| 建议 id | subtype | from → to | 账户 | PDF | 说明 |
|---------|---------|-----------|------|-----|------|
| F01 | `interest` | TREASURY→RB-ALL | `soma` | 12 | 保留；补 `attrs.account` |
| F02 | `priced_service` | DEP-INST→RB-ALL | `priced_services` | 12, 92 | 迁名 subtype；补账户 |
| F03 | `remittance` | RB-ALL→TREASURY | （可空或 `fiscal_agency`） | 12–13 | 保留系列数字 |
| F04 | `fiscal_reimburse` | TREASURY→RB-ALL | `fiscal_agency` | 106 | 迁名；可挂 0.13 |
| F05 | `iorb` | RB-ALL→DEP-INST | `reserve_balance` | 39–40 | **新建**；与 T04 拆分 |
| F06 | `desk_omo` | DESK→PRIM-DEALERS | `soma` + 准备金贷记见 meaning | 40–41 | **新建**买券付价款（付款方 DESK）；若需卖券收款，对向边或 `attrs.direction_modes`，勿编金额 |
| F07 | `desk_repo` | DESK↔PRIM-DEALERS | `soma` | 41 | **新建**临时回购机制 |
| F08 | `onrrp` | DESK→NONBANK-CP | `on_rrp` | 41 | **新建**联储付 ON RRP 息 / 现金腿（对手方获息） |
| F09 | `discount_loan` | RB-ALL→DEP-INST | `discount_window` | 42 | **新建**放贷本金流出 |

实施时可合并 F06/F07 的展示分组，但 subtype 须可滤。材料不足处：`evidence.status=external`，label 缀「待核」，**不写数字**。

---

## 任务（建议次序）

> 写手为默认建议；总参谋部可调次序，不得越出 C14。

**T1 美工部：现金操作悬停列表外观**（任务单写「调度 art-department」）  
- `AESTHETIC.md` C-FED：浮层列表、行 hover / 选中、`【付】/【收】` 标记、与现有 float 层级；不压页眉 / Home / 图例。  
- `fed.css`：`.fed-float` 列表样式；作用域 `.fed-page`。  
- *Last updated* 记本令号。

**T2 主代理：数据与校验**（可与 T1 并行）  
- `fed-graph.json`：落实 C3–C6、C11–C12 与上表；改写 T03–T06 meaning（C4）；F02/F04 subtype 迁名。  
- `fed-graph.schema.json` + `check_fed_graph.py`：`fund_flow` 必有合法 subtype；`attrs.account` 若出现须在枚举内；金额字段必有 asOf。  
- 信息部可选词条（不挡）。

**T3 主代理：索引与绘制**  
- `model.js`：按节点索引 `fund_flow`；导出账户 / subtype 中英。  
- `draw.js` / `applyState`：支持 `state.cashOp` 高亮指定边与端点；图例点亮 fund_flow 行为保持。  
- **不改** `project()` 的 `x,y` 与 hit 公式。

**T4 主代理：悬停列表 + 卡片 + 再点取消兼容**  
- `interact.js`：float 列表渲染与点击；`cashOp` 状态；与钉选 / 空白 / Esc 层级（C8）；960 抽屉卡同步资金分组。  
- `fed.html`：结构钩子如需；`?v=` 递增。

**T5 主代理：情景 S2**  
- `scenes.js` + UI：可播 S2；`reset()` 与 Esc 行为覆盖 S2；S1 不回退。  
- **不**接 S3 播放（除非已有开关且本令不改其内容）。

**T6 文档与回归**  
- `CONCEPTS.md` C-FED：资金流 subtype、账户字段、悬停列表、S2。  
- `regress_api_golden.py`：`/fed` 与 `/api/fed/graph` 按需重采；其余金样零 diff。  
- `regress_all` quick ALL PASS；`check_fed_graph.py` PASS。

---

## 总验收（交监理时）

`http://127.0.0.1:8787/fed`，**1280×800 与 960×640** 各截：默认态；悬停 DESK（列表可见）；点选一条 ON RRP / OMO 操作高亮；钉选 DEP-INST 卡片见 IORB 入账；S2 播至上缴步。

1. **边**：至少含上表语义的 `fund_flow`；F02/F04 subtype 已迁名；T04/T05 不再声称「支付利息」，付息在 F05/F08。  
2. **方向**：抽查 IORB、上缴、有偿服务，均为付款方 → 收款方。  
3. **账户**：IORB 行 / 卡显示准备金账户；ON RRP 显示 `on_rrp`；无账户节点、环坐标未变。  
4. **悬停列表**：有资金边的节点可点选操作并高亮；再点取消；Esc / 空白不破坏上周期取消层级；**不压**路径 / Home / 图例 / 标签。  
5. **S2** 可完整播放；S3 资金边未扩张。  
6. **无**编造数字；F03 系列与 13% 均带 asOf/evidence；无 12 家分摊；无美联储徽标/官方色；边无色相分型。  
7. Swift / `.app` / 打包 / `DESIGN.md` / `library/` **零 diff**；部门色 / 命中区 / 再点取消 / 图例带行为不回退。

---

## 明确不做

- 账户圆节点、力导向、路径搜索、部门过滤  
- 13(3) / S3 资金流细化；成员行股息金额  
- 改 transmit 为 fund_flow（只拆、不吞）  
- 改壳、重建 .app、CDN、给边上色、动环坐标与 Home 拆分

---

## 仅业主能解决（不阻塞本令）

1. S2 入口形态：与 S1 并列按钮，或单一「情景」菜单——本令要求**可播**，具体控件总参 / 主代理选一，美工可润色。  
2. 卖券 / 买券是否拆成两条 `desk_omo` 边，或一条边两种 mode——本令允许任一，须在 meaning 写清。

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

本令涉及链：`FE-FED-DRAW`（`interact.js` 悬停列表 / `draw.js` 高亮 / `scenes.js` S2）→ `FE-FED-MODEL`（按节点索引 `fund_flow`）→ `FE-API` ⇒ `BE-HTTP` → `BE-FED-GRAPH`（`fed-graph.json` 扩边与 subtype）。美工部改 `FE-AESTHETIC` 契约下的 C-FED / `fed.css`。**预期不增模块、不增 graph 边**；若主代理拆出独立 `cash_ops` 索引文件，再补 `modules/graph.json` 并重烘。
