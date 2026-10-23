# 内阁 → 总参谋部指令

**令号** `GS-20261022-FED-BS-LAYER`  
**日期** 2026-10-22  
**任务周期** 「FED 制度图 · 2025 合并财务报表资产负债层」（**新周期**；与 `FED-COPY-FIX` / `FED-FUND-FLOW` / `FED-COLOR-HIT-LEGEND` 主题不同，另开计数）  
**本周期内阁下令计数** **第 1 次 / 至多 5**（业主未指定次数，取默认；业主授权「自己安排轮次开工」）  
**交** **总参谋部**（父代理将本文**完整**转交 `general-staff`；实施后送监理；**内阁不令监理、不令档案**、不改产品码）  
**谏言** 不发问（同轮开场已答）

**业主原话**

> 电内阁，自己安排轮次开工

**方案真源（已批可落地）**  
`cabinet/reports/SFC-fed-2025-combined-statements-bs-layer-20261022.html`（2025 合并财务报表 → FED 制度图资产负债层）

**材料**

| 项 | 路径 |
|----|------|
| 年报 PDF | `SFC-VIS-FED/Materials/combinedfinstmt2025.pdf`（私有；证据页码指该 PDF） |
| 状况表 CSV | `cabinet/inbox/combinedfinstmt2025-condition.csv`（百万美元） |
| 全文抽取 | `cabinet/inbox/combinedfinstmt2025-extract.txt` |
| 制度图 | `Ind-Chain/data/fed/fed-graph.json`（65 节点、fund_flow F01–F09、部门六色、环投影） |

未在年报写明的数字不得编造；金额须带 `asOf`（状况表时点 **2025-12-31**；审计意见日 2026-03-12 仅作元数据）。不用美联储徽标 / 官方色。不把系统总额分摊到 12 家储行。

---

## 意志（一句）

**在现行 FED 环图上新增独立「资产负债模式层」：以 2025 合并状况表存量为真源，资产绿 / 负债红仅出现在模式层（描边·底纹·侧栏），不覆盖部门六色 fill、不改环坐标、不改 fund_flow 拓扑与语义；递延上缴资产强制特殊标记；存量金额永不写入 F0x。本期完成 W0→W1→W2 最小可演示闭环；W3 情景包留后。**

---

## 分波裁剪（内阁自行安排 · 本期范围）

| 波次 | 内容 | **本期** |
|------|------|----------|
| **W0** 数据模型 | Condition 行 → 可校验 JSON（`side` / `amount_2025` / `amount_2024` / `delta` / `special_flag`）；inbox CSV 升格为 schema + 校验 | **做** |
| **W1** 映射表 | 报告 §6 机器可读映射；标 `gap` 节点；禁止改 F0x 语义；存量表达用新建 `bs_claim`（名可议）或侧栏条带，**金额不进 fund_flow** | **做** |
| **W2** UI 层 | 模式切换「制度 / 资产负债」+ 描边/底纹 + 侧栏存量条与 Δ；美工定 `--fed-bs-*`；递延强制短说明 | **做**（最小可演示） |
| **W3** 情景 | BS 层演示 QT + TGA + ON RRP 同屏；与 S1/S2 机制情景分流 | **留后**（本周期不接；完善令另开） |

**本期验收一句：** 用户可在 `/fed` 切换到「资产负债」模式，看见主要报表行对应节点的绿/红描边或底纹、侧栏 2025 存量与 Δ、递延资产特殊标记；默认模式仍为部门六色；fund_flow 与环坐标与上周期一致。

---

## 裁断（硬）

| # | 项 | 裁断 |
|---|----|------|
| **C1** | 绿 / 红着色范围 | **仅模式层**。默认「制度」模式：节点 fill = 部门六色，零回退。进入「资产负债」模式：资产相关节点加绿描边/浅绿底纹，负债加红描边/浅红底纹，资本中性；**禁止替换或覆盖部门六色 fill**。 |
| **C2** | 环坐标 | **不动** `project()` 的 `x,y`；不动命中区半径公式；不加第二环节点坐标（报告次选「第二环」本期不取）。 |
| **C3** | fund_flow | **拓扑与语义零改动**（F01–F09 及既有 subtype / 账户 / 悬停现金列表保留）。存量**不得**编进 F0x 边权重或 meaning。新建存量索取权用 **`bs_claim`**（边类型名可议，须在 schema 登记）**或**侧栏条带索引；二者择一为主、可并存侧栏，但**禁止**把 BS 金额写进 fund_flow。 |
| **C4** | 部门六色 | 上周期 `FED-COLOR-HIT-LEGEND` 六色 token / 图例色块 / 命中区 / 再点取消：**零回退**。BS 模式不得用绿红盖住 fill。 |
| **C5** | 架构首选 | 报告 §8.1 **首选**：同一环图 + **模式切换**「制度 / 资产负债」+ 侧栏存量条与 Δ。次选第二环、并行桑基：**本期不做**（留后或再令）。 |
| **C6** | 递延上缴资产 | **必须展示且特殊标记**：绿系 + 斜纹或虚线描边 + 「待核/特殊」徽章；悬停/侧栏强制短说明（暂停周度上缴后的累计缺口记账，非传统债权；与 F03 机制边交叉引用、**不可合并为一条边**）。不得仅显示数字。 |
| **C7** | 映射与 gap | 以报告 §6 为底表机器化；缺节点（如单独 VIE、外国官方存款细分）标 **`gap`**，**不得 silently 捏造节点**。gap 行本期可折叠进侧栏「未投影」区并图例说明；是否增节点留给后续业主裁断。 |
| **C8** | asOf 与主体 | 存量 asOf = **2025-12-31**；合并主体 = 12 家 Reserve Banks combined（非 Board）；Board assessment 不另造 BS 行。金额单位与年报一致（百万美元），UI 注明单位。 |
| **C9** | 美工部 | 任务单须写 **「调度 art-department」**：在 `.fed-page` 内定 `--fed-bs-asset` / `--fed-bs-liab` / 资本中性 / 递延斜纹·徽章；模式开关与侧栏纸面；**不得**用官方蓝或徽标；不压页眉 / Home / 图例带。行为与数据归主代理。 |
| **C10** | 信息部 | **可选** `desk=manage`：补「递延上缴资产」「TGA」「SOMA / QT」「ON RRP 负债」等词条——**不挡令**。 |
| **C11** | 写权 | **数据 schema / 映射 / 校验 / model·draw·interact / 模式开关 / 侧栏** → **父代理改码**。色 token 与 BS 模式外观 → 美工部（C9）。内阁只写 `cabinet/`；**不指挥监理部、不指挥档案部**。 |
| **C12** | 仍禁与保留 | 不改 Swift / `.app` / 打包 / `DESIGN.md` / `library/`；不加 CDN / 新库；边类型区分仍不靠颜色（fund_flow 继续线型+箭头）；Home / C-HOME / 环投影 / 部门六色 / 命中区 / 资金悬停列表 / S1·S2：**零回退**。W3 情景包、第二环、桑基：**本期不做**。 |

---

## 数据最低集（W0 → W1）

**W0 产出（建议落点，总参可定最终路径）：**

- 可校验表 / JSON：每行至少 `id`（稳定键）、`label_en` / `label_zh`、`side` ∈ {`asset`,`liability`,`capital`}、`amount_2025`、`amount_2024`、`delta`、`special_flag`（递延 = true）、`asOf`、`evidence`（PDF 页或 Note 引用）。
- 自 `cabinet/inbox/combinedfinstmt2025-condition.csv` 升格；校验脚本（金额勾稽：资产 = 负债 + 资本+NCI，容差按年报四舍五入）。

**W1 映射最低行（与报告 §6 对齐；实施可增列 `node_ids[]` / `gap`）：**

| 报表行（键名可议） | side | 建议节点 | special |
|--------------------|------|----------|---------|
| gold_sdr_certs | A | TREASURY | |
| loans_di | A | DEP-INST / RB-ALL | |
| other_loans | A | DEP-INST 或 gap | |
| soma_resell | A | DESK / PRIM-DEALERS | |
| soma_treasury | A | DESK / TREASURY | |
| soma_mbs | A | DESK | |
| fx_swaps | A | DESK 或 gap | |
| deferred_remittance | A | RB-ALL ↔ TREASURY | **必 special** |
| vie_assets | A | gap 或挂 RB-ALL | |
| fr_notes | L | PUBLIC / RB-ALL | |
| securities_sold_repo | L | DESK / NONBANK-CP | |
| deposits_di | L | DEP-INST / RB-ALL | |
| tga | L | TGA / TREASURY | |
| other_deposits | L | gap 或折叠 | |
| interest_payable | L | DEP-INST / NONBANK-CP | |
| capital_paid_in | C | MEMBER-BANKS / RB-ALL | |
| surplus | C | RB-ALL | |

---

## 任务（建议次序）

> 写手为默认建议；总参谋部可调次序，不得越出 C11–C12。**本期止于 W2；不排 W3。**

**T1 美工部：BS 模式色 token 与开关/侧栏皮**（任务单写「调度 art-department」）  
- `AESTHETIC.md` C-FED：`--fed-bs-asset` / `--fed-bs-liab` / 资本中性 / 递延斜纹与徽章；模式开关；侧栏条带。  
- `fed.css`：作用域 `.fed-page`；默认模式外观零回退。  
- *Last updated* 记本令号。

**T2 主代理：W0 数据**（可与 T1 并行）  
- Condition → schema + 可校验 JSON/表；inbox CSV 升格。  
- 勾稽校验；`asOf=2025-12-31`。  
- 落点由总参定（`Ind-Chain/data/fed/` 旁或既有 fed 数据目录）；须可被 BE 或 FE 只读加载。

**T3 主代理：W1 映射**  
- §6 映射表机器化；`gap` 显式；`bs_claim`（或等价）schema + 校验：**禁止**改 fund_flow。  
- `check_fed_graph.py`（或并列校验）：既有 F0x 回归不破；新 BS 数据独立校验。

**T4 主代理：W2 UI**  
- `FE-FED-MODEL` / `FE-FED-DRAW` / interact：模式状态；BS 模式描边/底纹；侧栏存量与 Δ；递延强制说明。  
- **不改**环 `x,y`、命中公式、部门 fill、fund_flow 绘制语义。  
- `?v=` 递增；960 抽屉与 1280 回归截图可验。

**T5 文档与回归**  
- `CONCEPTS.md` C-FED：资产负债模式层、与 fund_flow / 部门色三层互不覆盖、递延规则。  
- `regress_*`：`/fed` 与相关 API 按需重采；其余金样零 diff。  
- 全量 quick ALL PASS。

**T6（本期不做）W3**  
- QT + TGA + ON RRP 同屏情景包 → **留后**；本令验收不要求。

---

## 验收清单

- [ ] W0：Condition 可校验；勾稽过；asOf 正确  
- [ ] W1：映射表在仓；gap 显式；fund_flow F01–F09 拓扑/语义与上周期一致（diff 仅允许无关空白则应为零业务 diff）  
- [ ] W2：模式开关可用；BS 模式绿/红仅描边·底纹·侧栏；默认模式六色 fill 不变  
- [ ] 递延资产：斜纹/虚线 + 徽章 + 强制短说明  
- [ ] 环坐标与命中区不变；Home / 图例 / 资金悬停 / S1·S2 零回退  
- [ ] 美工 token 已入 `.fed-page`；无官方色/徽标  
- [ ] 回归 PASS；W3 未误接

---

## 模块触点（实施时）

| 模块 | 角色 |
|------|------|
| `BE-FED-GRAPH` | 加载/校验 BS 数据或旁路表；**不**改坏 fund_flow |
| `FE-FED-MODEL` | 索引 BS 映射与模式态 |
| `FE-FED-DRAW` | 描边/底纹/侧栏；模式切换绘制 |
| `FE-AESTHETIC` | `--fed-bs-*`（经美工部） |
| `FE-NAV` / `FE-HUB` | 路由与壳保留，本令不改 Home 拆分 |
| `BE-HTTP` | 若增只读 API 窄口则经此；无则静态随图加载 |

---

## 父代理落地串（提醒）

```
内阁本令（第 1 / 5）
  → 父代理完整转交 general-staff（立意志与任务单）
  → 父代理改码 + 任务单调度 art-department（色 token）
  → 信息部可选（不挡）
  → 监理部（既有流程唤起；内阁不令）
  → 三监交回后、书记前：内阁可再令（完善 W2 或开 W3）
  → 全部内阁令结束后才派书记
```

**仍禁：** 内阁不令监理、不令档案；不否决业主；不亲自改产品码。
