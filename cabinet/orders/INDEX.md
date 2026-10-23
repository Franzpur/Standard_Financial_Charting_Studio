# 令文账本

自 `AUTHORITY.md` 迁出，内容原样（2026-10-18，为让内阁每次少读一截）。

## 相关落盘

- 模块化纲：`cabinet/reports/SFC-modularization-plan-v2.html`（文首「宪制」节 + §10.3 定夺）
- 前一任务周期总参令：`cabinet/orders/GS-20261014-modularization-M1-M4.md`（M1–M4；该周期计数已结）
- W1 总参令（第 1 次 / 至多 5 · **已结**）：`cabinet/orders/GS-20261014-W1-modules-track.md`（W1 打开权 + 仓根 `modules/`；原「动态跟踪」已由业主改静态，见该令旁注与上节义务）
- 名单勿借闸门下级整板（第 1 次 / 至多 5 · **已结**）：`cabinet/orders/GS-20261014-list-board-not-children.md`（`list_bics_entities` 不再调用 `bics_children`；三监第 1 次通过后不再令；余 4 次作废）
- 模块与代码 1:1 结合（第 1 次 / 至多 5 · **已结**）：`cabinet/orders/GS-20261015-MOD-COMPLETE.md`（后端 `bics_hier`/`bics_entity`/`db_shadow`/`nvda_links` 四模块独立成文、`app.py` 瘦身至 352 行、前端 `nav.js` 独立与 `bondChart.js`/`scene.js` 职责归位；三监第 1 次全票通过后不再加令；余 4 次作废）
- 总项目名称 FIDV → SFC 改名（第 1 次 / 至多 5 · **已结**）：`cabinet/orders/GS-20261015-RENAME-FIDV-SFC.md`（活文档/活配置/角色定义/运行期提示中总项目名称 `FIDV` → `SFC`、全称 `Standard-Financial-Charting`；`modules/graph.json` title 改 `SFC` 并重烘 `modules/index.html`，26/35 节点边不变；三监第 1 次全票通过后不再加令；余 4 次作废）
- 总项目名称 FIDV → SFC 改名第二轮：保留项全改（第 1 次 / 至多 5 · **已结**）：`cabinet/orders/GS-20261015-RENAME-FIDV-SFC-R2.md`（`companies.json` 演示 `note`、`fidv-launcher*` / `FIDV-*` 报告与问题手册文件名及全仓现存文件链接、`local.fidv.Standard-Financial-Charting` Bundle ID、`fidvSplashSeen` 全部改为 `SFC`/`sfc`，重采 Golden 并重建 `.app`；三监第 3 次送审通过后不再加令；余 4 次作废）
- 模块真源 / 静态页：`modules/graph.json` · `modules/index.html` · `modules/bake_static.py`
- 二重映射 · GOOGL 季度偿债压力图（周期内第 1 次 / 至多 5）：`cabinet/orders/GS-20261016-DMAP-GOOGL-LADDER-Q.md`（定点切片；其 D1「落点放大舞台、不做 dock」已被下条撤销）
- 二重映射纠偏：恢复方案 §7.1 `Map ▾` + dock，并立独立纸面皮（周期内第 2 次 / 至多 5；谏言「不发问」）：`cabinet/orders/GS-20261016-DMAP-UI-PAPER.md`（设计真源 `cabinet/reports/figures/googl-ladder-paper-reference.png`）
- Map 导出 / 整台收展 / 拉长 / 窄窗 + 非 NVDA 白球 / GOOGL 文件环（周期内第 3 次 / 至多 5；业主令按建议默认直接报文）：`cabinet/orders/GS-20261016-MAP-EXPORT-SPHERE.md`（旁注 `cabinet/notes/20261016-map-export-shell-sphere-taskpack.md`；草稿任务单 `…-tasklist.md`）
- GOOGL 悬停文件卡：球心 5 UNIT 折线引线 + 改 cube 暗底亮线框（周期内第 4 次 / 至多 5；谏言「不发问」）：`cabinet/orders/GS-20261016-GOOGL-HOVER-CARD.md`（旁注 `cabinet/notes/20261016-googl-hover-card-cube.md`）
- GOOGL 悬停卡仅悬停显示 + 白球公司名暗玻璃框（球心正上方 0.5 UNIT、长边 ∥ x、不 billboard；周期内第 5 次 / 至多 5，**末次**；谏言「不发问」）：`cabinet/orders/GS-20261016-GOOGL-HOVER-LABEL.md`（旁注 `cabinet/notes/20261016-googl-hover-label.md`）
- NVDA 链三色小球 / 可点收入线 / 现造来源 Excel / map 关系纸面（新周期第 1 次 / 至多 5；谏言「不发问」；两问收口）：`cabinet/orders/GS-20261016-NVDA-SPHERE-LINK.md`（旁注 `cabinet/notes/20261016-nvda-sphere-link-intent.md`）
- NVDA Shape Two 美国地图体空间 + `PM-US-MAP` 映射（新周期第 1 次 / 至多 5；谏言「不发问」；业主全权）：`cabinet/orders/GS-20261016-NVDA-SHAPE2-USMAP.md`（旁注 `cabinet/notes/20261016-nvda-shape2-usmap-intent.md`）
- 交互化改革 · ChartSpec 三面（新周期第 **1** 次 / **无限**；业主明示无限下令；谏言两答后签发）：`cabinet/orders/GS-20261021-IX-CHARTSPEC.md`（规划 `cabinet/plans/SFC-interactive-chartspec-plan.md`；真源两读本；前置 MOD-COMPLETE 业主裁「基本闭合可大改」；两案并行汇入同一 ChartSpec；本周期不接云端 LLM）
- 交互化改革 · ChartSpec 完善（同周期第 **2** 次 / **无限**；三监第 2 次通过后；谏言「不发问」）：`cabinet/orders/GS-20261021-IX-CHARTSPEC-R2.md`（加深 multi_hop/cohort_compare/debt_wall；第二表模板；FE-CMD 图边诚实化）
- 美联储制度图 FED · 个人主页 Hub 第一期（新周期第 **1** 次 / 至多 **5**；业主 2026-10-22 对方案 D1–D14 全部按内阁倾向拍板并明示开工；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-HUB-P1.md`（W0 数据/后端/nav/公私 → W1 主页拆页 → W2 FED 环总览+FOMC 圈+S1 回放 → W3 模块图/回归/文档；仅 F0+F1，不含 F2/F3；路由 M-A，壳与 .app 不动；规划 `cabinet/plans/SFC-fed-viz-and-personal-home-plan.md`，报告 `cabinet/reports/SFC-fed-viz-and-personal-home-plan.html`）
- FED 制度图 · 部门上色 / 命中区 / 再点取消 / 连线图例（新周期第 **1** 次 / 至多 **5**；上一周期 FED-HUB-P1 已结、书记第 309 条；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-COLOR-HIT-LEGEND.md`（六部门入数据 `dept`、美工部定 `.fed-page` 内六色 token；边仍不靠色；透明命中圆半径 `min(22, 最近邻/2−2)`、坐标不动；节点 / FOMC 圈 / 图例再点取消；图例带移入流内并加线型箭头样本与部门色块）
- FED 制度图 · 资金流细化 / 主体现金操作悬停列表（**新周期**第 **1** 次 / 至多 **5**；与 COLOR-HIT-LEGEND 主题不同；若上色令三监未结仍只发本令、不指挥监理；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-FUND-FLOW.md`（`fund_flow`+`subtype`+`attrs.account` 为真源；transmit 与付息/交割拆边；悬停可点现金操作列表并调度美工部；打开 S2；不写股息金额、不扩 S3；环投影/Home/部门色/命中区保留）
- FED 制度图 · 金融术语中文错译纠偏（**新周期**第 **1** 次 / 至多 **5**；FUND-FLOW 已结后专治「腿」等直译；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-COPY-FIX.md`（*leg*→「端」系；废止上令「起始腿/到期腿/现金腿」用语；全库排查 FED 图文案与可见 UI 同类硬译；不改边拓扑；父代理改码）
- FED 制度图 · 2025 合并财务报表资产负债层（**新周期**第 **1** 次 / 至多 **5**；业主「自己安排轮次开工」；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-BS-LAYER.md`（W0 数据→W1 映射→W2 模式层 UI **本期做完**；W3 情景留后；绿红仅模式层描边/底纹/侧栏；不覆盖部门六色；不改环坐标/fund_flow；递延强制特殊标记；调度美工部 `--fed-bs-*`；信息部可选；父代理改码；方案 `cabinet/reports/SFC-fed-2025-combined-statements-bs-layer-20261022.html`）
- FED 资产负债层 · focus 侧栏下方改为同行占比（**同周期**第 **2** 次 / 至多 **5**；W0–W2 已落地后完善；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-BS-PCT.md`（有 focus：下方 = 节点映射行金额 ÷ 该报表行 `amount_2025`；0% 必显；无 focus：总表金额；上方自身 BS 不变；可选美工侧栏文案；父代理改码；不指挥监理/档案）
- FED 资产负债层 · 去部门简介 + 域外节点改灰（**同周期**第 **3** 次 / 至多 **5**；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-BS-DIM.md`（BS 隐藏 `#fedCard`；in-BS = map `node_ids`；域外**覆盖 fill** 为灰非仅透明度；调度美工 `--fed-bs-dim`；部分撤销 LAYER「BS 不动六色 fill」仅对域外；不指挥监理/档案）
- FED / C-FED 自由改革 · 可验证债清理（**新周期**第 **1** 次 / 至多 **5**；业主授全权按轮次改正；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-FREE-REFORM.md`（W0 模式清态/缓存戳/双 asOf/概念·模块图 → W1 gap·份额·F03·BS 图例 → W2 现金列表键盘/侧栏节流；调度美工；不动环坐标与 fund_flow 拓扑；S3+/BS W3/非 FED 留后；不指挥监理/档案）
- FED 资产负债层 · 恢复 focus 下方可见百分比（**同周期**第 **2** 次 / 至多 **5**；完善令；谏言「不发问」）：`cabinet/orders/GS-20261022-FED-BS-PCT-RESTORE.md`（废止 FREE-REFORM C5(a) 多节点无数字；钉死 (a') 命中显 100%+「共载」短注；不选均分；仍禁不对称权重/改环/金额入 fund_flow；不指挥监理/档案）
- FED 资产负债层 · 勾稽 + 内部橙/外部青（**同周期**第 **3** 次 / 至多 **5**；完善令；谏言「不发问」）：`cabinet/orders/GS-20261023-FED-BS-INEXT-AUDIT.md`（状况表↔map↔节点勾稽落 `cabinet/notes/20261023-fed-bs-correspond.md`；BS 专用内外，勿复用 `isExternal`；fill 橙/青 + 描边绿/红并存；制度六色不动；并收口 PCT-RESTORE 送审；调度美工窄 token；不指挥监理/档案）
- FED UI / 外链 / API 网关（**同周期**第 **4** 次 / 至多 **5**；完善令；谏言「发问」联邦统计局默认 BLS）：`cabinet/orders/GS-20261023-FED-UI-API-LINKS.md`（图例与模式钮左缘共线；`#fedBsPanel` 收起；Fed+BLS 外链；统一 `/api/fed/*` 加 OMO+FOMC 纪要/日程 fixture 默认可演示；不指挥监理/档案）
- FED / C-FED 近轮改动上载 GitHub（**同周期**第 **5** 次 / 至多 **5**，**末次**；谏言「不发问」）：`cabinet/orders/GS-20261023-FED-PUSH-GITHUB.md`（授权父代理 commit + `git push origin` 默认 main；范围钉本周期 FED/C-FED 未提交路径 + worklog≈#316–#318；禁 .env/凭据；未改 Swift/.app 不动；不令监理/档案；本周期此后不得再令）
- 公开流程措辞：`POWER-KNOWLEDGE.md` §3
