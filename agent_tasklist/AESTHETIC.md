# SFC 美学真源（美工部）

美工部判断网页与启动表层美学时，只以本文为准。产品是否服务金融决策，以 `DESIGN.md` 为准（理念贯彻属；终裁为监理部三监报告）。概念与坐标以 `Ind-Chain/CONCEPTS.md` 为准。

目标：把已落地的美学语言写成可复用真源，并在后续功能与分页中**延展同一语言**，不每页另起一套皮。

**简洁是视觉第一要务**（与 DESIGN 一致）：能用色、透明、一字标说清的，不加第二套装饰系统。业主明示的时长（如 splash hold / fade）写入本文后，美工部不得以「简洁」擅自缩短。

---

## 1. 已运用的美学语言

### 色板

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#0b0d10` | 全幅工程底、开屏底 |
| `--panel` | `#14181e` | 遗留实心面板参考（新 chrome 优先玻璃） |
| `--stroke` | `#2a313c` | 细边 |
| `--text` | `#e8edf4` | 主字 |
| `--muted` | `#9aa6b5` | 次字 |
| `--accent` | `#8be0c0` | 强调、激活 chip、字标下划线 |
| `--us` / `--intl` | `#3cf0ff` / `#ffb020` | **数据语义色**（概念归属 CONCEPTS；美工部不单方面改） |
| `--glass` | `rgba(11,13,16,0.32)` | 浮层 |
| `--glass-strong` | `rgba(11,13,16,0.55)` | 搜索 / 帮助等稍实浮层 |

禁止默认滑向：紫靛渐变主题、暖奶油底+衬线+陶土强调、报纸密栏；避免无必要 glow 堆叠与圆角胶囊滥用（chip 已有形态可沿用）。

### 构图

- **立方体全幅**：`#viewport` 吃满窗口；无左右实心导航栏。
- **浮动 chrome**：搜索置顶、详情右浮、HUD 底浮；玻璃 + 轻 `backdrop-filter`；空白处 pointer-events 透给 canvas。
- **帮助默认关**：`?` 打开，不常驻挡视野。

### Logo 标准（业主说「logo」即按此开发）

产品 splash / home 左标矢量真源：`Ind-Chain/web/index.html` 内 `#sfc-mark` / `#sfc-lockup`（隐藏 `.sfc-defs` 中定义；开屏 `<use>` 引用带全称的 `#sfc-lockup`，个人主页与 BICS 门厅 `<use>` 引用不带全称的 `#sfc-mark`）的 `.sfc-frames` 三框；`bics.html` 隐藏 defs 与 `list.html` 页眉内联 `#sfc-mark` 为同一份副本。纸面同族反相：`library/showable-report/assets/sfc-logo-frames-paper.svg`（封面 `SFC-plan-cover.html` 已对齐）。

**字标内拐角（业主令，2026-10-16）：** S、C 的内凹直角一律改 45° 过渡，与外拐角的 45° 切角同族。S 每道内槽封口上下两端各切 5，中间留 10 单位竖线（上端向左下斜、下端向右下斜）；C 内拐角各切 10；S 外拐角今试切 22（曾试 20 嫌重、后定 30、又试 15；业主令不要 15，改回试 22；单位同字标坐标系 439×130）；C、F 外拐仍 30 / 原样。现行路径：S `M22 0H145V30H35L30 35V45L35 50H123L145 72V108L123 130H0V100H110L115 95V85L110 80H22L0 58V22Z`；C `M338 0H439V30H348L338 40V90L348 100H439L424 130H338L308 100V30Z`。F 未动。已同步 `index.html`、`list.html`、计划书（含模板）、双映射改革计划报告；`cabinet/notes/` 下的旧备份不动。

**理念一句话：** 层次感来自三枚竖向圆角矩形**错位相套** + **递减透明度**（前实后虚），不是左右并排实心色块。

| 量 | 值 | 说明 |
|----|-----|------|
| 单框 | `width=18` `height=44` `rx=1.5` | 竖向圆角矩形；宽高比勿改 |
| 起始 x | `8` / `22` / `36` | 步距 **14**；勿改步距或错位量 |
| 纵位 | `y=14`（三框同 y） | 与 lockup `viewBox="0 6 229 80"` 对齐 |
| opacity | `0.95` / `0.55` / `0.28` | 前→后递减；fill=`none` |
| stroke | `stroke-width≈1.25`，`stroke-linejoin=round` | 描边框，非填充块 |

**明暗两用色**

| 面 | stroke | 底 |
|----|--------|-----|
| 暗底（产品 splash / home / 启动图标族） | `#e8edf4`（`--text` 族） | 工程 `--bg` 或同族暗底 |
| 纸面反相 | `#1a1f26`（纸面 `--ink`） | 与纸同色透明；矢量直绘 |

**组与露出**

- 可与右侧 **SFC 矢量字标** + `--accent` 底线同组（splash / home / list）；全称小字只随开屏露出。规格见下节「SFC 字标与全称」。
- **单独露出**时只保留三框（纸面封面、仅标露出等），不另起第二套皮。
- 启动图标 `Ind-Chain/assets/sfc-launcher*` 同族；纸面只用同族反相矢量。

**禁止**

- 勿改步距 **14**、单框 **18×44**、`rx=1.5`，或把相套错位改成并排色块。
- 勿用低分辨率反色位图放大当纸面 / 印刷源；纸面从矢量按上表反相 stroke。
- 勿另起第二套 logo 几何或吉祥物替代三框。

### SFC 字标与全称（lockup）

业主 2026-10-15 拍板：以业主自制图为准，衬线 `<text>` 字标退役。

| 部件 | 规格 |
|------|------|
| 版面 | `viewBox="0 6 229 80"`；左三框（Logo 标准，x 8–54，y 14–58）；右 **SFC** 与三框同高（y 14–58，x 72–220.6）；accent 线与全称在下，左起三框、右止 C 右缘 |
| SFC 字形 | 自绘 `<path>`，非字体：130 单位字高网格，笔画 30、横画间隔 20（三横 y 0–30 / 50–80 / 100–130），外角 45° 斜切 30；S 0–145、F 165–291、C 308–439；以 `translate(72 14) scale(0.338462)` 落版。填 `--text`（`.sfc-word`） |
| 斜面 | 独立 path：F 左上方块左下半三角 `--muted`（`.sfc-facet`）；C 底横右端斜切，切口三角 `--muted` 50% 不透明（`.sfc-facet-dim`）。不加渐变、不加 glow |
| accent 线 | `.sfc-rule`：`--accent`、`stroke-width 1`、`opacity .55`；`y=66`，x 8→220.6（与全称同宽） |
| 全称 | 「STANDARD FINANCIAL CHARTING」，`.sfc-fullname`：**Jost Light 300**（SIL OFL 1.1，本地 `Ind-Chain/web/vendor/fonts/jost/`，仅 A–Z+空格子集 woff2，附 `OFL.txt` 与来源 `README.txt`；禁 CDN）；fallback `-apple-system` / SF Pro / `system-ui`；`letter-spacing .3em`；`font-size 9.32`，`textLength 212.6` 锁宽；基线 `y=77.5`；填 `--text` |
| 两版 | 业主 2026-10-15 拍板：**全称只在开屏出现**。`index.html` 隐藏 defs 拆两组：`#sfc-mark`（三框 + SFC + accent 线）与 `#sfc-lockup`（`<use href="#sfc-mark">` + 全称）。开屏用 `#sfc-lockup`、`viewBox="0 6 229 80"`；版面（个人主页 / BICS 门厅 / 下钻门厅 / 列表页）用 `#sfc-mark`、`viewBox="0 6 229 61"`（下缘收至绿线，不留全称空白）。`bics.html` 隐藏 defs 含同份 `#sfc-mark` 与 `#sfc-lockup`，板面只用 `#sfc-mark` |
| 显示尺寸 | 开屏 300px 宽（带全称，不动）。版面不带全称，字标为原版面的 1/2（业主：大 SFC 在分类版面喧宾夺主）：个人主页与 BICS 门厅 130px 宽（SFC 字形约 84×25px）；下钻门厅与列表页 100px（`.home.home-drilled .home-logo`；字形约 65×19px）。两版横向 viewBox 同为 229 单位，故按 width 换算字形 |

**禁止**：把 SFC 改回 `<text>` 或换嵌入字体；改斜面位置 / 另加高光；全称换字族、改大小写或去宽字距；在分类版面露出全称；版面不一致（改一处须同改 `index.html` 与 `bics.html` 的 `#sfc-mark` / `#sfc-lockup`，以及 `list.html` 页眉内联副本，后者不含全称）。

### 字标与开屏（C-SPLASH）

- 居中 **SFC lockup**（三框 + 矢量字标 + accent 线 + 全称；规格见上节，勿擅自改形）。
- 入场：约 **0.4s** 轻淡入（`splash-in`）。
- **挂在 `/` 个人主页（C-HUB）**：清晰态维持约 **2s**，再 **约 4s** opacity 淡出（JS fade fallback **4200ms**）。开屏期实心 `--bg` 盖住个人主页，避免与 `.home-logo` 双标叠影；淡出后再露玻璃格阵。`?bics=` 旧链重定向不重播。
- **进 `/bics`、`/fed`、`/cube`（含分类入口）不播开屏。**
- 无转圈、无 Loading 长文案、不画视空间球。

### 启动图标与原生壳面板

- 暗底上 **Logo 标准**三框同族 + accent 细线（与 splash 左标同族，非另皮）。
- 源与产物：`Ind-Chain/assets/sfc-launcher-1024.png`、`sfc-launcher.icns`。
- 施加：`Ind-Chain/scripts/set-command-icon.sh` → 根 `Standard-Financial-Charting.app/Contents/Resources/AppIcon.icns`（访达双击 `.app`，无 Terminal）。
- 原 tkinter 启动窗已于 P4 退役；色板见上（BG `#0b0d10`、MUTED `#9aa6b5` 等），原生壳错误面板与窗背景沿用同一板（`Ind-Chain/shell/ErrorPanel.swift`）。

### 工程首页（C-HOME）

- `/bics`（`bics.html`）：BICS L1–L3 同一门厅，**不播开屏**。字标同族 + **固定左上**坐标痕迹（`.home-trail-fixed`，`top:14px; left:20px`；钻入不挪位）+ 一枚玻璃直角 **上市地下拉**（关闭面当前国名+角标数；打开后最上搜索、下列 All/各国+角标数）+ 页级公司总数（控件外 muted 一行）+ **相连规则矩形格**（格右上角收录数；格底行业坐标 **只画 4 段** muted tabular，不因变短改字号）。`--accent` 只用于 hover/focus 与字标下划线。无底栏 chip CTA。无新闻。
- **定位输入贯穿 L1–L3**：字标 / lede 下一条细边输入，复用 `.list-filter`（`#homeLocate`，placeholder「Name or ticker」），不搬立方体 `.top-search`。同页下钻 L2/L3 仍留在页眉。框下 `#homeLocateResults` 以 `.home-locate` 为定位包含块**绝对定位**盖住下方门厅，不占文档流（`.home-nations`、`#homeTotal`、`#sectorList` 不因提示下移）。有命中与空态都覆盖：多名命中为 `--panel` 底上的共边细线行（`.home-locate-row`，不限元素类型；与上市地打开面同底，避免门厅字透出），一行公司名 `--text`、ticker 与四段行业坐标 `--muted` tabular；空态只留一条 `.home-locate-empty`（「No matching company.」）。有命中时容器内只放行。键盘当前项 `.home-locate-row.is-on` 与 hover / `:focus-visible` 同用 `--glass-strong` 底与 accent 内描边（描边内收，不撑开行高、不把下层格下推）。无第二套色、无圆角胶囊。本板不播开屏（开屏只在 `/` 个人主页）。
- **L4 格进 `/list?bics=`（C-LIST）**，不再下钻 L5–L7，也不因该格是叶而进立方体。浅于 L4 的叶仍可 `/cube?bics=`。
- `/cube`：决策立方体冷启动，**无** splash。

### 个人主页（C-HUB）

- `/`（`index.html`）：冷进先 **C-SPLASH**，淡出后露本面。字标 `#sfc-mark`、`viewBox="0 6 229 61"`、宽 130。一句 lede（`.hub-lede`：「Choose a system.」）。无搜索、无页级计数。
- **玻璃格阵**（`.hub` 页宽居中；`.hub-grid`）：复用 `.home-sector` 相连直角格。4 列、共边 1px `--stroke`、`--glass` 底、无圆角、无 glow。窄屏 2 列，仍相连。
- 格（`.hub-cell`，`a` 或 `span`）上行静态 `.hub-thumb`，再两行：`.hub-cell-label`、`.hub-cell-tag`。`.is-live` 可点，hover / `:focus-visible` 为 `--glass-strong` 与 `--accent` 内描边。`.is-coming` 不可点、整格略淡（opacity .55）。`.is-reserved` 只灰字（`--muted`），无链接感。
- 格内容由 `/js/hub.js` 填入空的 `#hubGrid`。开屏结束前 `#hub` 保持 `hidden`。

### 四级名单（C-LIST）

- `/list?bics=`：门厅同族（`home-body`、字标、`.home-trail-fixed`、上市地下拉），**无开屏**。名/ticker 筛（`.list-filter`）与国别搜索分属两控件。
- 公司为细线行表（共边 1px `--stroke`，无胶囊）。一行一企。名 `--text`；ticker / 坐标 / 主业 L1 占比 `--muted` tabular。其他一级 + % 用名下 muted 字链（` · `），无 chip。窄屏旁注仍跟在名下。
- 筛名/ticker：trail 下一条细边输入，不搬立方体顶栏搜索皮。
- 表上右对齐一枚直角细边按钮 `#listSortRev`，可见文案 **Revenue**（收入序的外观控件）。玻璃底、`--stroke` 边、`--muted` 字；hover / `:focus-visible` 转为 `--glass-strong` 与 accent 内描边。非 chip、无页眉玻璃链、无页底第二条。
- 空态一条 muted 短句。
- 进立方体只靠名单行（点公司）；无页眉玻璃链、无页底第二条、非 chip 条。

### 美联储制度图（C-FED）

样式只在 `Ind-Chain/web/css/fed.css`，且页面已链 `app.css`。共用 token 只用 `--bg` `--text` `--muted` `--stroke` `--accent` `--glass` `--glass-strong`；另**只允许本页六个部门色** `--fed-dept-*`（见下「部门色」，作用域 `.fed-page`，不进 `app.css :root`，别页不得引用）。**例外（业主令 GS-20261022-FED-BS-LAYER / GS-20261022-FED-BS-DIM / GS-20261023-FED-BS-INEXT-AUDIT）：** 仅 `.fed-page`、仅「资产负债」模式，另允许 `--fed-bs-asset` / `--fed-bs-liab` / `--fed-bs-capital`（资本中性）、递延斜纹、域外实灰 `--fed-bs-dim` / `--fed-bs-dim-stroke`（`.is-bs-out` 覆盖 fill，禁止仅降透明度），以及双通道 fill `--fed-bs-internal`（橙）/ `--fed-bs-external`（青）；默认「制度」模式仍**仅**六色 `--fed-dept-*`，零回退、不引用 `--fed-bs-*`。此外不新色名。不使用 `--us` / `--intl`。不使用美联储官方蓝或徽标。`--accent` 只做选中与焦点细线。动效仅 opacity 与轻微 transform（节点热态在自身框内 `scale(1.06)`，不改放置用的组变换）；`prefers-reduced-motion: reduce` 关闭过渡。

**部门色**（业主令 GS-20261022-FED-COLOR-HIT-LEGEND C4 / C5）。写在 `.fed-page { … }` 里，六个，不设第七个中间变量；节点按 `<g class="fed-node …" data-dept="<key>">` 的 `data-dept` 取色（不用 `fed-dept-*` 类名），每组各一套 `[data-dept="…"]` 选择器。分组真源在数据 `dept`，前端不猜组。

| Token | 值 | 部门 | 在 `--bg` 上对比度 |
|-------|-----|------|------|
| `--fed-dept-board` | `#7da6e3` 长春花蓝 | 理事会 | 7.8:1 |
| `--fed-dept-fomc` | `#d684a9` 玫瑰 | FOMC | 7.2:1 |
| `--fed-dept-banks` | `#efa189` 珊瑚杏 | 储备银行 | 9.4:1 |
| `--fed-dept-advisory` | `#e1d195` 麦秆 | 咨询委员会 | 12.8:1 |
| `--fed-dept-government` | `#cbabe8` 薰衣草 | 政府机构 | 9.8:1 |
| `--fed-dept-markets` | `#889b64` 橄榄灰绿 | 市场、公众与国际 | 6.4:1 |

- 约束（C4）：六色同族低彩（OKLCH 彩度 0.08–0.11，亮度 0.66–0.86），两两 OKLab 距离 ≥ 0.108；离 `--accent`（色相 168°）≥ 0.106、离 `--us` ≥ 0.18、离 `--intl` ≥ 0.105，色相都避开 140°–220° 的 accent / US 带；无渐变、无 glow；非美联储官方色。
- 上色（C5）：色只上**图形描边**；席位条 `.fed-shape-seat` 是**填色**（描边宽 0）。`--glass` 填与标签字色 `--text` 不变。
- 层叠：`.is-selected`（`--accent` 描边、宽 1.5；`#fedSvg` 级选择器，必盖部门色）> 部门色 > `.is-hot`（只 `scale(1.06)`，不改色）；`.is-dim` 仍 opacity .25。`.is-external` 仍空心虚线 `3 2`，虚线用部门色；外部席位（SEAT-ROT-1..4）去填、补 FOMC 色 1.25 虚线描边，不得整条消失。
- 部门色不上边、不上字、不上图例按钮。

**资产负债模式**（业主令 GS-20261022-FED-BS-LAYER + GS-20261022-FED-BS-DIM + GS-20261023-FED-BS-INEXT-AUDIT；仅模式层，不改环坐标 / fund_flow；制度模式六色零回退）：

| Token | 值 | 用途 |
|-------|-----|------|
| `--fed-bs-asset` | `#5ecf8a` | 资产**描边** / 条带（绿系；非 `--accent`、非部门橄榄） |
| `--fed-bs-liab` | `#e07070` | 负债**描边** / 条带（红系） |
| `--fed-bs-capital` | `#9aa6b5` | 资本中性描边 / 条带（同 `--muted` 族） |
| `--fed-bs-internal` | `#e8994a` | **美联储内部** fill（橙；与绿/红描边可区分；非 `--intl`） |
| `--fed-bs-external` | `#45b8c9` | **外部** fill（青；与绿描边 / `--us` / `--accent` 可区分；非官方蓝） |
| `--fed-bs-asset-wash` | `rgba(94,207,138,0.16)` | 无内外类时的浅绿底纹回退（不写进席位 fill） |
| `--fed-bs-liab-wash` | `rgba(224,112,112,0.16)` | 无内外类时的浅红底纹回退 |
| `--fed-bs-dim` | `#6e7681` | **域外**节点实灰 fill（覆盖部门色；禁止仅透明度） |
| `--fed-bs-dim-stroke` | `#8b939e` | **域外**中性描边（可选第二 token；非官方蓝） |

- **模式开关** `#fedModePick.fed-mode-pick` / `.fed-mode-btn`：同族于 `.fed-scene-pick` / `.fed-scene-btn`（玻璃直角共边、灭 `--muted`、`.is-on` = `--glass-strong` + `--accent` 内描边）。宜落底坞或图例带旁；不压路径 / Home / 图例带 / 底坞内容。**左缘对齐（业主令 GS-20261023-FED-UI-API-LINKS A）：** 与 `#fedLegend.fed-legend`、`#fedStage` 共用 `.fed-page` 的 `--fed-shell-inline`（**16px**）作左右 margin；盒模型统一，**禁止** `translateX` 视觉补丁。制度 / BS、≤960px 折行后各自左缘仍与舞台左缘共线。
- **节点类 · in-BS 双通道**（仅 BS 模式由前端挂上；制度模式不挂；GS-20261023-FED-BS-INEXT-AUDIT B2/B5）：
  - **描边** `.fed-node.is-bs-asset` / `.is-bs-liab` / `.is-bs-capital` — 对应 `--fed-bs-asset|liab|capital`，席位条可补 1.25 描边。
  - **fill** `.fed-node.is-bs-internal` / `.is-bs-external` — 对应 `--fed-bs-internal`（橙）/ `--fed-bs-external`（青）；特异性须压过 `[data-dept]` 六色（含席位）；环形 `.fed-shape-ring` 仍空心；**不**改描边。`.is-bs-external`（BS 外部主体）≠ 制度证据态 `.is-external`（空心虚线）。
  - 无内外类时：非席位、非空心可回退 wash。层叠：`.is-selected`（`--accent`）> BS 描边 > 部门描边；fill：域外灰 > 递延 hatch > 内外实色 > wash > 部门填。
- **节点类 · 域外**（GS-20261022-FED-BS-DIM；仅未进 map `node_ids`）：`.fed-svg.is-bs-mode .fed-node.is-bs-out` — rect / circle（**含** `.fed-shape-seat`）`fill: var(--fed-bs-dim)` 实灰，`stroke: var(--fed-bs-dim-stroke)`、宽 1.25；特异性须压过 `[data-dept]` 六色（含席位填色）。**禁止**仅用 `.is-dim` / opacity 冒充改灰。不挂绿/红/资本类、不挂内外橙青。卸类后恢复部门六色。
- **递延特殊** `.fed-node.is-bs-special`：虚线描边（`stroke-dasharray: 4 2.5`）+ SVG `<pattern id="fed-bs-hatch">` 斜纹（父代理在 `#fedSvg` defs 挂载；非席位 `fill: url(#fed-bs-hatch)`；席位只虚线、不改 fill）+ 既有 `.fed-badge-pending`「待核」徽章。Pattern 规格：`patternUnits="userSpaceOnUse"` `width="8" height="8"`；底 `rect` 填 `--fed-bs-asset-wash`；斜线 `path`/`line` stroke `--fed-bs-asset`、`stroke-width≈1`、从 `(0,8)`→`(8,0)`（或等价对角）。
- **侧栏** `#fedBsPanel.fed-bs-panel`：舞台内右上玻璃直角（同 `.fed-card` 占位；≤960px 底抽屉），含存量条 `.fed-bs-bar`、Δ `.fed-bs-delta`、未投影区 `.fed-bs-gap`；说明与本令一致（in-BS 扫 fill 看内外、扫描边看资产负债；其余实灰；制度仍六色）；不压路径 / Home / 图例带 / 底坞。**收起皮（GS-20261023-FED-UI-API-LINKS B；仅 chrome，不改六色 / `--fed-bs-internal|external`）：** 标题行 `.fed-bs-head` 内 `.fed-bs-toggle`（直角细边玻璃钮；`aria-expanded` 由父代理挂）。`.is-collapsed` → 右缘细条（宽 `--fed-bs-panel-rail` **28px**，`--fed-bs-panel-pad` 仅展开态内边距），竖排「展开资产负债」；不挡节点命中。≤960px 收起仍为右缘细条，**不**走底抽屉。会话记忆 / 默认展开属父代理，美工部只管皮。
- **图例右段 · BS**（C10 + INEXT-AUDIT B5）：`paintLegend` 将 `.fed-legend-depts` **整段替换**为 `.fed-legend-bs`（六短样 `.fed-legend-swatch.is-internal|is-external-bs|is-out|is-asset|is-liab|is-capital`；文案由父代理）；制度模式仍六色，规格见下「图例带」。

**节点**（类加在 `.fed-node` 上；画布规则以 `.fed-svg` 起头，免得漏进 FOMC 圈）：

| 类 | 形态 | 用于 |
|----|------|------|
| `.fed-shape-gov` | 方角方块；`--glass` 填、部门色 1.25 实线、`rx=0` | 理事会 / FOMC |
| `.fed-shape-bank` | 圆；`--glass` 填、部门色 1.25 实线 | 储备银行 |
| `.fed-shape-seat` | 小短条；部门色填、无描边、无圆角 | 席位 |
| `.fed-shape-band` | 顶带名牌；直角玻璃条、部门色 1 细边 | 外部政府主体 |
| `.fed-shape-ring` | 外层小圆；空心、部门色 1.25 细线 | 咨询委员会 / 公众 / 其余小圆 |

**状态：** `.is-dim` opacity .25。`.is-hot` 不透明，**保持部门色**，只在自身框内 `scale(1.06)`。`.is-selected` 描边 `--accent`。`.is-external` 虚线空心（`stroke-dasharray: 3 2`，部门色），不与 verified 同形。`.fed-badge-pending` 字「待核」，色 `--muted`（空元素用 `::before` 补这三字）。可见图形 `pointer-events: all`，空心形内部也点得到自己。

**命中层** `.fed-hits .fed-hit`：每节点一枚透明圆（`fill: transparent; stroke: none; pointer-events: all`），在边之上、可见节点之下；不在 `.fed-node` 内，不受形态 / 部门色 / `.is-hot` / `.is-external` 等选择器影响（fed.css 不写裸 `circle` 选择器）。

**边**（`.fed-edge` 加下表类）。默认线色 `--text`，`stroke-linecap: butt`，`pointer-events: none`（边不接点击）。十二种靠线型与箭头区分，不靠颜色。画布状态（`.is-hidden` / `.is-external` / `.is-skeleton`）以 `.fed-svg` 起头，图例样本不吃。骨架 `.fed-edge.is-skeleton`（且非 `.is-hot` / `.is-selected`）为 `--stroke`、线宽 0.75、实线、无箭头。选中只把线色改为 `--accent`，线型保留；箭头不改色。箭头画在页面 SVG 的 `<marker>` 里，id 与下表一致；`fed.css` 把实心箭头填成 `--text`、空心箭头 `fill: none` 且 `stroke: var(--text)`，避免标记落成黑色。标记除传导外为 `viewBox="0 0 10 10"`、`refX="9"` `refY="5"` `orient="auto"` `markerWidth="8"` `markerHeight="8"`；传导为 `markerWidth="11"` `markerHeight="9"`。

| 类 | 线宽 | stroke-dasharray | 箭头 |
|----|------|------------------|------|
| `.fed-edge-appoint` | 1.7 | none（实线） | `#fed-mk-appoint` 实心三角 `M0,1 L9,5 L0,9 Z` |
| `.fed-edge-oversee` | 1.1 | `7 3` | `#fed-mk-oversee` 空心三角 `M0,1 L9,5 L0,9` |
| `.fed-edge-report` | 1.1 | `2 3` | `#fed-mk-report` 小实心三角 `M0,3 L9,5 L0,7 Z` |
| `.fed-edge-vote` | 1 | none（实线） | `#fed-mk-vote` 菱形 `M0,5 L5,1 L9,5 L5,9 Z` |
| `.fed-edge-transmit` | 2.2 | none（实线） | `#fed-mk-transmit` 大实心三角 `M0,0 L10,5 L0,10 Z` |
| `.fed-edge-fund_flow` | 1.4 | `10 3 2 3` | `#fed-mk-fund_flow` 双折线 `M0,1 L5,5 L0,9 M4,1 L9,5 L4,9` |
| `.fed-edge-regulate` | 1.1 | `4 2` | `#fed-mk-regulate` 方头 `M3,2 H9 V8 H3 Z` |
| `.fed-edge-advise` | 1 | `1 3` | `#fed-mk-advise` 圆点 `cx=5 cy=5 r=2.2` |
| `.fed-edge-service` | 1 | `12 2` | `#fed-mk-service` 扁实心三角 `M0,2.5 L9,5 L0,7.5 Z` |
| `.fed-edge-delegate` | 1 | `3 3` | `#fed-mk-delegate` 空心折线 `M1,1 L9,5 L1,9` |
| `.fed-edge-inform` | 1 | `2 2` | `#fed-mk-inform` 小实心三角 `M2,3 L9,5 L2,7 Z` |
| `.fed-edge-coordinate` | 1 | `5 1.5 1 1.5` | `#fed-mk-coordinate` 空心菱形，`marker-start` 与 `marker-end` 同 id：`M1,5 L5,1 L9,5 L5,9 Z` |

任命 / 投票 / 传导同为实线，靠线宽与箭头形态分开；其余九种线型本身已不同。核心 8 为 appoint、oversee、report、vote、transmit、fund_flow、regulate、advise；扩展 4（service、delegate、inform、coordinate）在点「更多」后追加。

**版面：** `body.fed-page`（`--fed-shell-inline: 16px`）> 左上 fixed `.fed-trail` + `main`（不定位）> 右上绝对定位 `.home-brand` → 图例带 `#fedLegend` → 模式钮 `#fedModePick`（同 inset）→ 可选外链组 `.fed-ext-links`（Fed + BLS 低调字链，`--muted` 11px，hover 同 trail accent 底线；不抢图例）→ 舞台 `#fedStage`（`margin: 8px var(--fed-shell-inline) 4px`，内含画布、FOMC 圈、详情卡、BS 侧栏）→ `#fedFloat` → `.fed-dock`。页眉 44px 只留路径与 Home 标，图例带从其下起。

**图例带** `#fedLegend.fed-legend`：在文档流内（`main` 纵向流里页眉之下、舞台之上），可折行，折行只把舞台往下推，永不覆盖；左右 margin `var(--fed-shell-inline)` 与模式钮 / 舞台对齐，上 4px。两段，中间一道 `--stroke` 竖线（右段左边线），不加可见段名：

- 左段 `.fed-legend-edges`「连线」：玻璃直角共边条，不是胶囊墙。`.fed-legend-item` 为格（`4px 8px`、11px 字、行高 16px）；`.is-on`（并 `aria-pressed`）用 `--glass-strong` 与 `--accent` 内描边、字 `--text`；灭时字 `--muted`。格首 `svg.fed-legend-sample`（28×10）内一条 `line.fed-edge.fed-edge-<key>`，与画布同线宽、同 dash、同 `#fed-mk-*` 箭头，线色 `--text`；灭时样本整体 opacity .4（箭头一起淡），不改标记填色。`.fed-legend-more`「更多」是同条最后一格，`aria-expanded="true"` 时字 `--text`，扩展 4 格追加在其后。
- 右段 · **制度模式** `.fed-legend-depts`「部门」：`.fed-legend-dept` 六格（直角 10×10 `.fed-dept-swatch`：部门色 1.5 描边 + `--glass` 填，同画布「色上描边」；名 `--muted` 11px），按 `departments.order` 排；静态、不可点、无 hover。**六色零回退**（业主令 GS-20261022-FED-FREE-REFORM C10）：BS 分支不得改本段选择器或弱化六色。
- 右段 · **资产负债模式**（C10 + B5；`paintLegend` 整段替换，勿与 `.fed-legend-depts` 同挂）：`.fed-legend-bs`（`aria-label` 如「资产负债」），版式同部门段（左竖线、`gap`、11px `--muted`）。内六格 `.fed-legend-bs-item`，格首直角 10×10 `.fed-legend-swatch` + 短名；静态、不可点、无 hover。六短样（可读：内橙 · 外青 · 域外灰 · 资产绿描边 · 负债红描边 · 资本）：

| 类 | 短样 | 对应画布 |
|----|------|----------|
| `.fed-legend-swatch.is-internal` | 实橙填 + 同色边 | `.is-bs-internal` |
| `.fed-legend-swatch.is-external-bs` | 实青填 + 同色边（**勿**用 `.is-external`，避制度证据态撞名） | `.is-bs-external` |
| `.fed-legend-swatch.is-out` | 实灰填 + `--fed-bs-dim-stroke` | `.is-bs-out` |
| `.fed-legend-swatch.is-asset` | 绿描边 + `--glass` 填（强调描边通道） | `.is-bs-asset` |
| `.fed-legend-swatch.is-liab` | 红描边 + `--glass` 填 | `.is-bs-liab` |
| `.fed-legend-swatch.is-capital` | 资本描边 + 资本淡洗 | `.is-bs-capital` |

  `.fed-legend-swatch.is-pending`（虚线绿描边 + CSS 斜纹）仍保留于 CSS，供 `paintLegend` 若仍发出待核格；B5 默认可读六格不含待核。

- 高度：1280×800「更多」收起 1 行（约 26px），960×640 收起 2 行（约 55px）；展开后可多一行。BS 六短样与制度六色同高预算，可折行只推舞台，勿加第二行装饰。

**底坞** `.fed-dock`：一行、可折行、垂直居中；`.fed-hud`（static）在左，`.fed-footer` 在右。HUD 为底栏直角细边条（按钮 `5px 10px`、12px），字幕 `#fedCaption` 是同条一格（11.5px，宽上限 18em，≥1100px 宽时 40em，超出在格内折行；空时不显）。页脚 11px `--muted`、右对齐，两句（中间 `<br>`）完整显示、不截断、不出视口。底坞约 30px。

**缩放预算**（viewBox 1280×860，meet）：舞台高 = 视口高 − 44 − 图例带 − 12 − 底坞。1280×800 收起、无情景约 678px，缩放约 0.79（须 ≥ 0.72，即 ≥ 619px）；960×640 约 489px，约 0.57（须 ≥ 0.55，即 ≥ 473px）。改图例带 / 底坞的字号与留白时先按此倒推。

**浮层：** `.fed-float` 底 `--glass-strong`、直角，跟随指针；默认 `pointer-events: none`（壳不接点击）。有现金操作列表时，仅 `.fed-cash-ops` / `.fed-cash-op` 开 `pointer-events: auto`。整卡 `max-height: min(42vh, 300px)`、内部列向 flex，长列表在 `.fed-cash-ops` 内滚，不压左上 `.fed-trail`、右上 Home、图例带、底坞。`.fed-card` 右侧玻璃直角详情，以 `#fedStage` 为包含块（`top/right: 8px`，`max-height: calc(100% - 16px)`），不压路径、Home 标与图例带；≤960px 为舞台底部抽屉（左右下 8px，高 ≤ 40%）。左上 `.fed-trail` 沿用门厅轨迹的细字与 accent 下划线。

**现金操作悬停列表**（业主令 GS-20261022-FED-FUND-FLOW）：节点悬停浮层内，仅当该主体有 `fund_flow` 边时露出 `<ul class="fed-cash-ops">`，每项一枚直角细边按钮 `.fed-cash-op`（`data-edge` / `data-dir="in|out"`）。行内三截：`.fed-cash-dir`（【收】/【付】）、`.fed-cash-label`（操作名）、`.fed-cash-account`（账户）。只用既有 token，不新色名；【付】【收】同色 `--muted`，靠字重区分（`in` 600 / `out` 400）。选中 `.is-on`（对应 `state.cashOp`）同图例格：`--glass-strong` 底 + `--accent` 内描边、字 `--text`。列表 `max-height: min(28vh, 200px)`、`overflow-y: auto`；1280×800 与 960×640 均可读（窄屏 float `max-width` 略收、字号与行高不变）。

**FOMC 席位圈** `.fed-fomc`：盖满舞台，底 `--bg`、`--stroke` 细边。`svg.fed-fomc-svg` 块级吃满。席位 `<g data-seat data-dept="board|fomc">`：非外部 rect 填部门色、字填 `--bg`；`.is-external`（轮值）rect 空心 + 部门色 1.25 虚线、字 `--text`；席位 rect `pointer-events: all`（空心也点得到）。七个无票块 `rect[data-vote="false"]` 不上部门色，`--text` 填、opacity .25。中心字「12 票 · 年 8 会」`--text`，注释「示意 · 分组待核（external）」`--muted`。一切由 CSS 接管，fomc.js 不写内联色。

### 计划书纸面（ICBC FinTech 模板）

真源：`library/showable-report/SFC-icbc-fintech-proposal-template.html`（秘书套用；正文纸面规则仍以 clerk 技能 token 为准）。

- **封面**默认深色（`--bg` / `--text` / `--muted` / `--accent` 同产品，仅限 `.cover` 作用域），`print-color-adjust: exact`；打印机无法满版或需省墨时加 `.cover--paper` 反相（绿线退为 `--rule`）。正文页一律白底纸面。
- 封面自上而下：三框（Logo 标准）→ SFC 矢量字标（path，同 `#sfc-mark`）→ 与字标等宽 accent 线 → 英文 / 中文全称 → 题名 → 团队。mixed-case 英文用系统无衬线 Light（Jost 子集仅 A–Z）；页眉页脚全大写走内嵌 Jost。
- 正文衬线 + 数据 / 标签无衬线；节题底边 `--rule`；提示框、KPI、时间线节点只用墨 / 灰层级，无圆角、无第二套色。时间线节点为**方形**（呼应方角字标）。

### 平面映射纸面皮（C-SKIN-PAPER；业主令 GS-20261016-DMAP-UI-PAPER）

可导出的平面映射图（预览 / ⤢ sheet / 将来导出）采**独立纸面设计模式**，不继承产品暗底荧光；这是业主令，**不按「第二套皮」处理**。

- **隔离**：真源 `Ind-Chain/web/css/plot-paper.css`，根类 `.pm-skin-paper`（挂在 `<section class="pm-sheet pm-skin-paper">`），变量前缀 `--plot-paper-*`；文件自包含，**不得**使用 `--bg / --text / --muted / --stroke / --accent / --glass* / --us / --intl`，不得 `backdrop-filter`、渐变、发光、荧光色；选择器一律以 `.pm-skin-paper` 开头；`app.css` 不含任何 `.pm-*`。
- **同族于秘书纸面**：纸底 `#f7f5f0`、主墨 `#1a1f26`、次墨 `#4a5560`、细线 `#c5ccd4`、年带 `#efeae4`、条带底 `#ece8e0`；serif 数字 / 标题、sans 小字，无外部字体。只有这五档中性与暖灰，**无新色相**；峰值靠粗体墨色，不用 `--accent`。
- **版式真源**：附图 `cabinet/reports/figures/googl-ladder-paper-reference.png`（KPI 四格条带、左上单位、右上图例、本金黑 / 票息浅灰、柱顶小数、峰值粗标、季标 + 年带 + 隔年米色带、右下脚注；sheet 上 notes 为可见文字，不折叠）。
- **共用**：预览、sheet、将来导出共用同一根节点与同一份 CSS；密度（`compact` / `sheet`）只改布局（`draw.js`），不改色。
- **与产品壳的边界**：dock 卡外壳（标题行、参数行、操作行、`Map ▾` 面、detail 折叠行、sheet 暗色遮罩与关闭钮）仍是 §1 暗底玻璃；**只有预览区是纸**，纸区与外壳间 1px 中性细边（`--stroke`）、≥8px 间距，纸不透明、不入 opacity 动画。窄屏抽屉底改用 `--panel` 实底，免得下层 detail 字透出。
- **场景内浮层禁纸面皮（业主令 GS-20261016-GOOGL-HOVER-CARD）：** 3D 里的文字卡、文件卡、标签一律走 cube 暗底玻璃 + 亮线框（`--glass-strong` / `--text` 线 / `--muted` 字 / `--accent` 点睛），禁用纸面皮；纸面皮只限平面映射预览 / sheet / 导出。

---

## 2. 延展原则（新功能 / 新分页）

1. **先复用 token**：新面只用上表 CSS 变量，不引入第二套色名（业主令例外：C-FED 六个部门色 `--fed-dept-*`，限 `.fed-page`；另例外 GS-20261022-FED-BS-LAYER / FED-BS-DIM / FED-BS-INEXT-AUDIT：仅 `.fed-page` 资产负债模式允许 `--fed-bs-*`（含 `--fed-bs-dim`、`--fed-bs-internal`、`--fed-bs-external`），默认制度模式仍仅六部门色）。
2. **浮于工程区**：新面板默认玻璃浮层，不恢复实心双栏。
3. **一字标族**：品牌露出用 **Logo 标准**三框（可加 SFC 字标 + accent 底线）；不另做吉祥物、不另起第二套皮（**唯一业主令例外**：平面映射纸面皮，见 §1「平面映射纸面皮」，限预览区）。
4. **动效克制**：以 opacity / 轻微 scale 为主；不为装饰加粒子或 3D logo。
5. **语义色不动**：US / 非美 / 环导读色变更须同时过 CONCEPTS，不单走美工部。

---

## 3. 管辖路径（专知 = 改码权）

美工部在派用或业主电美工部且任务明确实现时，**可直接改**下表路径之**视觉层**（权知统一，见仓根 `POWER-KNOWLEDGE.md`）。表外与「不独占」行仍无写权；一行同时碰语义行为则交父代理。

| 资产 | 路径 |
|------|------|
| 色板 / chrome / 首页 | `Ind-Chain/web/css/app.css`（含 `.hub-*`）；`Ind-Chain/web/css/fed.css`（C-FED；既有 token + `.fed-page` 六个 `--fed-dept-*`；资产负债模式另 `--fed-bs-*` 含 `--fed-bs-dim` / `--fed-bs-internal` / `--fed-bs-external` / `.is-bs-out` / `.is-bs-internal` / `.is-bs-external`，见 §1 C-FED）；`Ind-Chain/web/index.html`（C-HUB + C-SPLASH）；`Ind-Chain/web/bics.html`（C-HOME 板，无开屏）；`Ind-Chain/web/js/home.js` |
| 字标全称字体 | `Ind-Chain/web/vendor/fonts/jost/`（woff2 子集、`OFL.txt`、来源 `README.txt`） |
| 四级名单 | `Ind-Chain/web/list.html`；`Ind-Chain/web/js/list.js` |
| 立方体壳 | `Ind-Chain/web/cube.html`（C-CUBE；无 splash） |
| splash 时序 | `Ind-Chain/web/js/home.js`（hold ~2s → fade ~4s） |
| 面板类名与 HUD 外观 | `Ind-Chain/web/js/ui.js`（视觉层） |
| 启动图标 | `Ind-Chain/assets/sfc-launcher*` |
| 图标脚本 | `Ind-Chain/scripts/set-command-icon.sh` |
| 启动器附着面 | 根 `Standard-Financial-Charting.app` 图标资源；原生壳错误面板色板（沿用本文，`Ind-Chain/shell/ErrorPanel.swift`） |
| Logo 几何真源 | `Ind-Chain/web/index.html`（`.splash-logo` 三框）；纸面同族 `library/showable-report/assets/sfc-logo-frames-paper.svg`（秘书纸面附着；几何以本文 Logo 标准为准） |
| 平面映射纸面皮 | `Ind-Chain/web/css/plot-paper.css`（`.pm-skin-paper` 与 `--plot-paper-*`）归美工部；`Ind-Chain/web/js/map/draw.js` 的类名层同归 |
| 映射台外壳 | `Ind-Chain/web/js/map/dock.js`（类名层）；`app.css` 的 `.cube-map` / `.map-dock*` / `.map-sheet*` / `.map-handoff` 与 detail 折叠行 |
| 概念续工指针 | `Ind-Chain/CONCEPTS.md` §10（美学细节回指本文） |

**不独占：** `coords.js`、抽出/焦点几何、`scene.js` 中服务坐标可读性的材质逻辑；启动器进程与端口逻辑。

---

## 4. 与其它角色

| 角色 | 关系 |
|------|------|
| 监理部 | 有代码改动时由父代理送三监报告终裁；理念标准仍是 DESIGN；美工部不写「通过/打回」 |
| 总参谋部 | 可在规划中调度美工部；业主安排下可规划管理美工部角色文件；专知路径内美工部可改码；跨域交父代理；产品终裁仍归监理部 |
| 书记 | 美工部不写 worklog |

*Last updated: 2026-10-23 · GS-20261023-FED-UI-API-LINKS T1/T2：C-FED 壳 `--fed-shell-inline` 16px 统图例 / 模式钮 / 舞台左缘（禁 translateX）；`#fedBsPanel` 收起皮 `.is-collapsed` + `.fed-bs-toggle` + `--fed-bs-panel-rail|pad`；可选 `.fed-ext-links`；六色与 `--fed-bs-internal|external` 零改。2026-10-23 · GS-20261023-FED-BS-INEXT-AUDIT B5：C-FED 增 `--fed-bs-internal` `#e8994a` / `--fed-bs-external` `#45b8c9`；`.is-bs-internal` / `.is-bs-external` 控 fill，描边仍 asset|liab|capital；图例六短样 `.is-internal|is-external-bs|is-out|is-asset|is-liab|is-capital`（`.is-external-bs` 避制度 `.is-external`）；制度六色零回退。2026-10-22 · GS-20261022-FED-FREE-REFORM C10：C-FED 图例带 BS 右段改为 `.fed-legend-bs` + 短样（后经 B5 扩为内外+描边六格）；制度 `.fed-legend-depts` 六色零回退；`paintLegend` 整段替换勿双挂。2026-10-22 · GS-20261022-FED-BS-DIM：C-FED 增 `--fed-bs-dim` / `--fed-bs-dim-stroke` 与 `.fed-svg.is-bs-mode .fed-node.is-bs-out`（域外实灰 fill + 中性描边；特异性压过 `[data-dept]` 六色；禁止仅透明度）；in-BS 仍绿/红/资本；制度模式六色零回退。2026-10-22 · GS-20261022-FED-BS-LAYER：C-FED 显式例外允许 `--fed-bs-asset` / `--fed-bs-liab` / `--fed-bs-capital`（及 wash）与递延斜纹；仅 `.fed-page` 资产负债模式；制度模式仍仅六色 `--fed-dept-*`；`.fed-mode-pick` / `.fed-bs-panel` / `.is-bs-*`。2026-10-22 · GS-20261022-FED-FUND-FLOW：C-FED 增「现金操作悬停列表」（`.fed-cash-ops` / `.fed-cash-op` 等；float 限高可滚，不压路径 / Home / 图例带 / 底坞）。2026-10-22 · GS-20261022-FED-COLOR-HIT-LEGEND：C-FED 增六个部门色 `--fed-dept-*`（限 `.fed-page`）与上色层叠、`.fed-hit` 命中层、边不接点击、图例带（连线样本 + 部门色块，流内）、底坞与缩放预算、详情卡归舞台、FOMC 圈 CSS 接管（底 `--bg`）。2026-10-22 · splash 改挂 `/` 个人主页；新增 C-HUB 与 C-FED 节点 / 边线型。2026-10-15 · 版面字标减半且去全称（`#sfc-mark`），全称只留开屏。2026-10-15 · SFC 字标改版：衬线字标退役，矢量方角字标 + 斜面 + 全宽 accent 线 + Jost Light 全称。2026-10-13 · Logo 标准写入：三框错位相套比例与明暗两用；权知统一：专知路径内可改码。*
