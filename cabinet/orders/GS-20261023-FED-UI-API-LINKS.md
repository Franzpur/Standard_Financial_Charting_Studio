# 内阁 → 总参谋部指令

**令号** `GS-20261023-FED-UI-API-LINKS`  
**日期** 2026-10-23  
**任务周期** 「FED / C-FED 自由改革 · 可验证债清理」（承 `GS-20261022-FED-FREE-REFORM`；**不新开周期**）  
**本周期内阁下令计数** **第 4 次 / 至多 5**（已用：FREE-REFORM / PCT-RESTORE / INEXT-AUDIT；本令后本周期至多再 1 次）  
**交** **总参谋部**（父代理将本文**完整**转交 `general-staff`；实施后送监理；**内阁不令监理、不令档案**、不改产品码）  
**谏言** **发问**（外链「美国联邦统计局」默认钉 **BLS**；若业主强制改 BEA/Census 以口令为准）

**业主原话**

> 电内阁， few problems you have to solve：1.你看到在左上角，这两栏选框不对齐；2.你看，在资产负债表视图下，右侧的部门直接被资产负债栏遮住了，为总资产负债表添加一个收起功能；3.添加一个美联储主页和美国联邦统计局的主页。4.为该栏目后端提供几个api接口，主要是美联储的，我不知道是有一个统一的接口还是每个部门有每个部门的，最重要的是公开市场操作数据、会议纪要等等的api，你看着添加。

**同轮语境（须并入本令）**

- 截图1：`.fed-legend`（任命/监督…）与 `#fedModePick`（制度/资产负债）**左缘不对齐**。
- 截图2：BS 模式下 `#fedBsPanel` 叠在舞台右侧，遮挡右侧市场/监管节点。
- 现有后端：`GET /api/fed/graph`、`GET /api/fed/bs`（`BE-FED-GRAPH`）。
- 上一令 INEXT-AUDIT（内外橙青 + 勾稽）若尚未过三监：**本令增量与其未审 diff 同包送审**；若已过则只审本令增量。
- 环坐标 / `fund_flow` 拓扑与金额禁写 / 制度六色 / BS 内外橙青与绿红描边双通道 / PCT-RESTORE (a')：**零回退**。

---

## 意志（一句）

**修齐 FED 左上控件左缘、给总表侧栏可收起以免挡右侧节点、在栏目内挂美联储与 BLS 外链，并以统一 `/api/fed/*` 网关落地本期可演示的 OMO + FOMC 纪要（等）契约与本地代理。**

---

## 裁断（硬）

### A · 左上两栏对齐（钉死）

| # | 项 | 裁断 |
|---|----|------|
| **A1** | 对象 | `#fedLegend.fed-legend` 与 `#fedModePick.fed-mode-pick`（含其内首格左缘）在视口中的**内容左缘必须共线**。 |
| **A2** | 根因取向 | 优先统一二者相对父容器的 **margin-left / padding-left / 与舞台对齐规则**（AESTHETIC：图例左右 margin 16px 与舞台对齐）；禁止用「视觉补丁」只给其中一行加随机 `translateX` 而不改盒模型。 |
| **A3** | 模式无关 | 制度与资产负债两模式切换后，左缘对齐**仍成立**（图例右段内容变化不得推歪左段首格）。 |
| **A4** | 窄窗 | ≤960px 折行时：折行只推舞台，**不**破坏与舞台左缘共线；模式钮与图例若上下叠，各自左缘仍与舞台左缘共线。 |
| **A5** | 美工 | 调度 **art-department** 窄口：只调 C-FED 壳间距 token / 选择器对齐，不改六色、不改 BS 橙青 token。 |

### B · 总表侧栏收起（钉死）

| # | 项 | 裁断 |
|---|----|------|
| **B1** | 对象 | `#fedBsPanel`（总资产负债表侧栏）；**仅 BS 模式**出现；制度模式仍 `hidden`/不占位。 |
| **B2** | 控件 | 侧栏**标题行**须有明确 **收起 / 展开** 控件（按钮或同等可达控件；`aria-expanded`；可见文案或图标须可读）。禁止仅靠点空白区「神秘收起」。 |
| **B3** | 收起态几何 | 收起后面板**不得遮挡**舞台右侧节点命中区与标签；允许缩成右缘细条/角标「展开资产负债」；展开态可仍为右上玻璃栏（现规格），但须保证收起路径一键可达。 |
| **B4** | 默认** | 进入 BS 模式时：**展开**（业主要先看总表）；业主收起后，同会话内切换制度↔资产负债再回 BS：**记住收起态**（`sessionStorage` 即可；键名实现自定，须单点）。 |
| **B5** | 数据** | 收起**不卸载**已拉 `/api/fed/bs` 数据；再展开零二次强制网络（除非 asOf/缓存戳变）。 |
| **B6** | 禁止 | 禁止为躲挡而永久缩小舞台坐标或挪环；禁止删侧栏；禁止把总表挪进左上图例带。 |

### C · 外链：美联储 + 「联邦统计局」（钉死默认 BLS）

| # | 项 | 裁断 |
|---|----|------|
| **C1** | 美联储主页 | 外链 **https://www.federalreserve.gov/**（Board 官网根）。文案可用「美联储」「Federal Reserve」。 |
| **C2** | 「美国联邦统计局」 | **默认钉 BLS**：https://www.bls.gov/（Bureau of Labor Statistics）。中文可见名：**劳工统计（BLS）** 或「美国劳工统计局」——避免写错成「联邦统计局」误导；tooltip/副标可写 `BLS`。 |
| **C3** | 若业主改口 | 谏言窗口若业主指定 **BEA**（https://www.bea.gov/）或 **Census**（https://www.census.gov/），以口令替换 C2 URL 与文案；**不得**同时堆三个统计外链（本期只要一对：Fed + 一个统计机构）。 |
| **C4** | 落点 UI | 落在 `/fed` 栏目壳内、**不压**路径/Home/图例/底坞内容：优先页眉 trail 旁或舞台外顶栏外链组（`target="_blank"` + `rel="noopener noreferrer"`）。**不是**系统 Hub 新磁贴（本期不扩 `/` 网格）。 |
| **C5** | 实现** | 纯外链 `<a>`；**禁止** iframe 嵌官网；**禁止**前端直连第三方再解析 HTML。 |

### D · 后端 API：统一网关 + 本期最小集（钉死）

| # | 项 | 裁断 |
|---|----|------|
| **D1** | 形态 | **统一网关** `/api/fed/*`，由现有 Fed BE 口（`BE-FED-GRAPH` 同族）挂载；**不做**「每部门一条顶级 `/api/fed/dept/...` 分口」。部门/主题用 path 段或 query 区分即可。 |
| **D2** | 保留** | 现有 `GET /api/fed/graph`、`GET /api/fed/bs` **路径与契约零破坏**。 |
| **D3** | 本期必做端点（最小可演示） | （1）`GET /api/fed/omo` — 公开市场操作摘要（NY Fed Markets / SOMA·repo 取向；字段见 D5）。（2）`GET /api/fed/fomc/minutes` — FOMC 会议纪要**索引/元数据列表**（日期、标题、来源 URL、asOf）；**本期不强制**全文 HTML 入库。（3）`GET /api/fed/fomc/calendar`（或并入 minutes 的 `?view=calendar`）— 近窗会议日程。可选第四：`GET /api/fed/series?id=` 单序列占位（FRED 风格 id），**非**本期验收硬项。 |
| **D4** | 不做（本期） | 按 Board/NYFed/12 储备银行拆独立微服务；前端 CDN 拉第三方 JS；浏览器直打 FRED/NYFed 绕过本机 BE；把 OMO 金额写进 `fund_flow` 边；改环坐标。 |
| **D5** | 响应契约（共同信封） | JSON：至少 `asOf`（ISO 日或日期时间）、`source`（机构短名 + 官方 URL）、`status`（`ok`\|`stub`\|`error`）、`items`（数组）。OMO `items[]` 至少：`date`、`op_type`（如 repo/rrp/outright 等短枚举）、`amount`（可 null）、`unit`、`note`（可空）。Minutes `items[]` 至少：`meeting_date`、`title`、`url`、`type`（minutes\|statement\|other）。错误用 HTTP 4xx/5xx + 同信封 `status:"error"`。 |
| **D6** | 真拉 vs 占位** | **本期：BE 代理 + 本地 fixture 可演示为默认**（`status:"stub"` 或 `ok` 且 `source` 标明 fixture）。允许实现「可选真拉」开关（环境变量/配置，默认关）：真拉只走**本机 BE**，超时失败回退 fixture，**不得**把密钥写入仓。公私：仅公开 URL/公开序列；私有材料不进响应。 |
| **D7** | FE 消费** | 本期 FE **最小**：外链旁或 BS/制度壳一处「数据」入口可触发拉取并展示短列表（或仅 Network/手测证明端点）；**不**要求新画 OMO 时序大图。模块图：若新增 BE 文件模块，更新 `modules/graph.json` 并 `bake_static.py`；否则在 `BE-FED-GRAPH` role 注记扩口即可（总参裁，诚实）。 |
| **D8** | 证据** | 每个 stub/真源文件头或响应 `source` 须能回溯到公开页；禁止静默编造会议日期冒充官方。 |

### E · 周期与硬保留

| # | 项 | 裁断 |
|---|----|------|
| **E1** | 周期 | FREE-REFORM；**第 4 / 5**；**不另开周期**。 |
| **E2** | 硬保留 | 环坐标；`fund_flow` 禁金额；制度六色；BS 内外橙青 + 绿红描边；PCT-RESTORE (a')；INEXT-AUDIT 勾稽产物不删；不改 `DESIGN.md` / `library/` / Swift / `.app`；不指挥监理/档案。 |

---

## 任务（建议次序）

> 写手为默认建议；总参谋部可调次序，不得越出 A–E。

**T0 父代理：送审边界**  
确认 INEXT-AUDIT 是否已三监通过；决定本令与未审 diff 同包或增量包。

**T1 主代理 + art-department（窄）**  
A1–A5：对齐 `.fed-legend` 与 `#fedModePick` 左缘；bump `?v=`。

**T2 主代理 + art-department（窄）**  
B1–B6：`#fedBsPanel` 收起/展开；收起不挡右侧节点；会话记忆；bump `?v=`。

**T3 主代理**  
C1–C5：Fed + BLS（或业主改口后的单一统计机构）外链落 `/fed` 壳。

**T4 主代理（BE）**  
D1–D8：统一挂 `GET /api/fed/omo`、`GET /api/fed/fomc/minutes`、日程（独立或 query）；fixture 默认可演示；契约信封统一；回归 `graph`/`bs` 不破。

**T5 主代理：手测**  
（1）左缘共线（制度+BS）；（2）BS 展开挡右 → 收起后右侧节点可点可读；（3）两外链新标签打开官网；（4）三端点 JSON 信封字段齐全；（5）制度六色与 BS 双通道零回退。

**T6 模块图（若扩 BE 模块）**  
改 `modules/graph.json` → `python3 modules/bake_static.py`。

---

## 调度

| 角色 | 是否调度 | 备注 |
|------|----------|------|
| **总参谋部** | **是**（本令） | 立意志与任务单 |
| **父代理** | **是** | 改产品码 + 送审打包 |
| **art-department** | **是**（窄） | T1/T2 对齐与收起控件皮 |
| **information-department** | **否**（默认） | 除非 fixture 数字与 inbox 真源冲突再 desk=clean |
| **监理部 / 档案部** | **否** | 父代理流程自唤；内阁不令 |

---

## 验收一句

`.fed-legend` 与 `#fedModePick` 左缘共线；BS 总表侧栏可收起且收起后右侧节点不被挡；`/fed` 可点开美联储官网与 BLS（或业主改口之单一统计站）；`GET /api/fed/omo` 与 FOMC 纪要（及日程）在统一 `/api/fed/*` 下返回含 `asOf`/`source`/`status`/`items` 的可演示 JSON，且 `graph`/`bs` 不破；环与 fund_flow 与着色禁令仍守。

---

## 交回路径

父代理：完整转交 `general-staff` → 实施（含美工窄调）→ 送监理三监 →（本周期尚余至多 **1** 次内阁令）→ 全部令后再书记。
