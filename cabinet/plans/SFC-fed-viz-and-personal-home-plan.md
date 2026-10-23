# 美联储组织架构可视化 · 个人主页 方案摘要（内阁 mode=write，2026-10-22；规划件，非令）

> **状态（2026-10-22）**：业主已按内阁倾向**全部采纳 D1–D14**并明示开工；已签发 `cabinet/orders/GS-20261022-FED-HUB-P1.md`（新周期第 1 次 / 至多 5），仅覆盖第一期 F0+F1+主页拆页。下文 §三、§四 为已拍板后的定稿。

完整版（含图）：`cabinet/reports/SFC-fed-viz-and-personal-home-plan.html`。数据草案：`cabinet/plans/fed-graph.draft.json`（65 节点 / 80 边 / 12 边类型 / 5 情景；引用完整，每边有 PDF 页码证据）。
材料：`SFC-VIS-FED/Materials/the-fed-explained.pdf`（11th ed. 2021-08，135 页）。页码均指 PDF 页（印刷页 = N−8（N≤24）/ N−4（N≥25））。

## 一、FED 可视化
- 一源多投影：`fed-graph.json`（拟 `BE-FED-GRAPH`，窄口 `GET /api/fed/graph`）→ 分层环（主）/ 地图（切换）/ FOMC 12 席圈（下钻）/ 泳道（情景底带）。力导向与并入 3D 立方体均否决（D2）。
- 边 12 类：核心 8（appoint / oversee / vote / report / fund_flow / regulate / transmit / advise）+ 扩展 4（service / delegate / inform / coordinate）；靠线型与箭头区分，不借 `--us/--intl`；`--accent` 仅作选中/路径。
- 事实骨架：理事会 7 人 14 年（p.15–16）；12 区 24 分行（p.11）；储行董事会 9 人 A/B/C×3（p.17–18）；FOMC 12 票 = 7 + 纽约 + 4 轮值（p.20–21）；净收益上缴财政部（p.12–13，Fig 1.4）。
- 交互：悬停 1 跳、选中详情、类型过滤、路径高亮、FOMC 年份轮换、下钻、情景回放 S1 加息传导链 / S2 利润上缴 / S3 13(3) / S4 监管循环 / S5 行长产生。
- 不在 PDF（标 external，待补）：FOMC 轮值分组与年度名册；理事会内设部门全景；12 区多边形；现任人员与最新数值。
- 治理：证据三档 verified / derived / external；图自绘；Fig 4.1 来自 Mishkin & Eakins，不用（p.51）；`SFC-VIS-FED/` 建议列入“私”表，入仓只有自制 JSON。
- 分期：F0 数据底座 → F1 MVP（环 + 席位圈 + S1）→ F2（地图、名册、S2–S5、路径）→ F3（导出、桥到债务图）。

## 二、个人主页
- 现状：壳固定打开 `/`；后端端口随机 → localStorage 跨启动失效；`/` 兼 BICS 板与开屏。
- 推荐 M-A：`/` = 个人主页（保留 splash）；`/bics` = 原 BICS 板；`/fed` = FED；旧 `/?bics=` 前端重定向。壳 / Backend / SelfTest / .app 不动。
- 推荐视觉 B：玻璃格阵（复用 `.home-sector`）：BICS、FED、2 个预留；静态缩略；`SFC ›` 面包屑前缀 + Backspace 根层上溯。
- 扩展：`systems.json` 注册表，新增体系 = 一条记录 + 三个文件。个人化（最近/收藏/笔记）后置，须走后端 SQLite。
- 耦合：共享壳（字标/玻璃/面包屑）、注册表、纸面导出、返回规则、词条；FED 情景 → 债务到期图（P3）。

## 三、决策点（**业主 2026-10-22 已全部按内阁倾向拍板**）
D1 路由 → M-A；D2 FED 不进 3D、写明示例外；D3 分层环为主；D4 MVP 点位不画区；D5 下钻限 PDF 可证（完整部门级需补材料）；D6 FOMC 先规则示意；D7 MVP 无持久化、H2 SQLite、笔记缓；D8 静态缩略；D9 预留 2 格；D10 Home / 美联储制度图 / Community Advisory Council（括注 Consumer）；D11 `SFC-VIS-FED/` 列私；D12 导出沿用纸面 token；D13 桥列入 F3；D14 D1/D2/D11 拍板后再令总参。

## 四、总参谋部指令（**已签发**）
令号 `GS-20261022-FED-HUB-P1`，正文 `cabinet/orders/GS-20261022-FED-HUB-P1.md`，账本已更新 `orders/INDEX.md`。D14 已满足（D1/D2/D11 已拍板）。相对草案新增 T10：`SFC-VIS-FED/` 入 `PUBLIC-PRIVATE.md` 私表与 `.gitignore`（D11 落地）；F1 范围收紧为不含路径高亮 / 下钻 / 搜索 / 年份轮换（归 F2）。
波次：W0（T0 数据 `Ind-Chain/data/fed/fed-graph.json` + schema + `scripts/check_fed_graph.py`；T1 `server/fed_graph.py` + 路由 `/bics` `/fed` `/api/fed/graph`；T2 `nav.js`）→ W1（T3 `index.html` / `bics.html` / `hub.js` / `home.js` / 回链）→ W2（T4 环总览 / T5 FOMC 席位圈 / T6 S1 回放）→ W3（T7 `modules/graph.json` / T8 回归 / T9 文档词条）；T10 公私隔离并入 W0。
明确不做：改壳或 .app；3D；个人化持久化；区划多边形；部门级全景；CDN；改 `DESIGN.md`。
验收与分任务路径见令文。不含：F2（地图、名册、S2–S5、路径、部门下钻、搜索）、F3（导出、桥接债务图）。
待知悉：打包脚本对 `data/` 为白名单，`data/fed/*.json` 不会自动进包；依 D1 本令不改脚本、不重建 `.app`，待业主决定重建时一并补。
