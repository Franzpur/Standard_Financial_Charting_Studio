# CONCEPTS-INDEX — `CONCEPTS.md` 速查表

本文只是 `CONCEPTS.md` 的查找表，不是替代品。索引与 `CONCEPTS.md` 不一致时，以 `CONCEPTS.md` 为准。

## 怎么只读一节

先定位标题行：`rg -n "^## 7\." Ind-Chain/CONCEPTS.md`，再用 Read 的 offset/limit 读到下一个 `## ` 标题为止。要查单个概念，用 `rg -n "C-MAPDOCK" Ind-Chain/CONCEPTS.md` 找表格行。本索引不写行号，只用节号和标题。

## 分节表（字符数约值，近 100）

| 节 / 标题 | 定义了什么 | 涉及这些词时读 | 字符 |
|---|---|---|---|
| 文件头块（第 0 节之前） | 用途、真源路径、端口 8787、`[C-ID]` 代码标注约定 | 入口、端口、代码标注 | 600 |
| `## 0. How agents should use this / 智能体用法` | 4 步用法：口语映射到概念 ID、改码用 ID、不破冻结约定、新概念要回写 | 任何规划 | 300 |
| `## 1. Scene objects / 场景对象` | 场景物件 C-CUBE/SLICE/POINT/RING/LABEL/EDGE/REV-LINK/SHAPE-2/AXES/COORD，另有口语归一表 | 点球、悬停卡、标签、收入线、Shape 2、口语（左/右、电力端）、d | 4400 |
| `## 2. Coordinate system / 坐标系` | 用户轴 `(s, x, y)`、方向名、原点、视空间、C-MAP（用户→Three）、1/2/3类坐标 | 坐标、方向、`USER_X_SIGN`、视空间、BICS 行业坐标 `legalEntityCoord` | 3400 |
| `## 3. States / 状态` | focus/pin/select/hover/dim/filter/A-F/d 状态字段，以及 Esc 分层 `[C-ESC]` | 焦点、钉住、过滤、Esc、间距 d | 1800 |
| `## 4. Actions / 动作` | 留驻/隐藏、抽回、抽出点击区、点选、公司放大、标准视角、重置，以及相机约定 `[C-CAM-HOLD]` | 抽出、拾取、搜索选中、相机不转、company zoom | 2900 |
| ``## 5. Standard view poses / 标准视角位姿 `[C-STDVIEW]` `` | 聚焦/总览两种标准相机位姿；角视图已废 | 标准视角、C 键、相机位姿 | 500 |
| `## 6. Controls / 操控` | 鼠标键盘与顶角面板到概念 ID 的映射表 | 热键、鼠标、Filter/A-F/d 面板、Home | 1200 |
| `## 7. Data concepts / 数据概念` | 层/公司记录、C-HOME、C-LIST、上市地、C-CUBE 页与 mode、W1、C-SPLASH、C-CHARTSPEC/C-CHARTOPS、第二重映射 C-MAP2/C-PLOT、PM-REV-LINK/PM-US-MAP/PM-LADDER-Q、C-MAPDOCK、C-SKIN-PAPER | 工程首页、名单、listing country、demo/shell/chain、ChartSpec 制图台、Map dock、debt ladder、PlotSpec、导出 PNG、纸面皮 | 10300 |
| `## 8. Symbol map / 符号对照（代码）` | 代码符号到概念 ID 的对照 | 改某个函数或 state 字段前，反查它属于哪个概念 | 2700 |
| `## 9. Frozen rules / 冻结约定（续做勿回退）` | 8 条冻结规则：坐标、stay/hide、相机、标准位姿、透明度、共面标签、服务端环布局、不留 :8787 | 任何改动；重命名、回退 | 1100 |
| `## 10. Continuity pointers / 续工指针` | 文档与模块角色表、API 端点表、一句话续工 | 找文件/模块/端点归属、`regress_*`、续工 | 3300 |
| `## 11. Local app / 本地应用` | 原生壳、内嵌后端、打包、数据目录、内嵌 Python、签名公证、内部包/外发包 | `.app`、打包、签名、`SFC_*` 环境变量、外发版 | 3600 |

## 几乎每条规划都要读

- 第 0 节（约 300 字）和第 9 节（约 1,100 字）：都很短，且冻结约定会限制几乎所有改动。
- 第 10 节只读末尾的「One-liner resume / 一句话续工」（约 200 字）。其余是指针表，按需读相关行。
- 文件头块约 600 字，需要时顺带读。

## 易漏处（跨节依赖）

1. 第 9 条 2「stay/hide in place」同时约束第 3 节 C-FOCUS/C-PIN/C-DIM、第 4 节 C-PULL，第 8 节标 `cubeExitX()` 为 legacy（不再向 −x 停放）。
2. 第 9 条 3（保持相机）对应第 4 节 `[C-CAM-HOLD]`。唯一例外是搜索选中：先 C-STDVIEW（第 5 节），再 C-COMPANY-ZOOM。
3. 第 6 节热键只写概念 ID，不给定义：C-ESC 在第 3 节，C-PULL-ZONE 在第 4 节，C-PIN 在第 3 节。
4. 第 2 节 C-COORD-3（行业坐标）不参与摆放；第 7 节 C-HOME/C-LIST 只显示前 4 段并保留前导 `-`；第 9 条 1 和第 8 节 `legalEntityCoord` 重述同一规则。
5. 第 1 节 C-REV-LINK / C-SHAPE-2 的选中会打开第 7 节的 PM-REV-LINK / PM-US-MAP，经 C-MAPDOCK 落地。
6. 第 4 节 C-COMPANY-ZOOM 的 `Debt ladder ▸ open in Map` 行指向第 7 节 PM-LADDER-Q 与 C-MAPDOCK。公司放大期间 Map 面会隐藏。
7. C-CUBE 在第 1 节（场景物件）和第 7 节（页面与 `meta.mode`）各有一行；第 11 节的 App shell 与 `meta.mode = shell` 无关，勿混用。
8. 第 7 节 C-MAP2 ≠ 第 2 节 C-MAP；`map/*` 的 import 纯度限制和 W1/FE-API 同样影响第 11 节 Invariants。
9. 第 11 节外发包（`-noentities`）与第 7 节数据层级（internal tier、`PUBLIC-PRIVATE.md`）一起决定能否外发。
