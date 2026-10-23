# FED 资产负债勾稽 · 2026-10-23

**令号** `GS-20261023-FED-BS-INEXT-AUDIT`  
**真源** `Ind-Chain/data/fed/fed-bs-condition.json` ↔ `fed-bs-map.json` ↔ `fed-graph.json`  
**内部判定** `bsFedInternal`：`BOG` / `FOMC` / `DESK` / 一切 `RB-*`（禁止复用 `isExternal`）

## 四问摘要

| # | 问 | 答 |
|---|----|----|
| 1 | 状况表每行是否有 map entry？ | 非合计 33 行中 **32** 有 map；**缺** `vie_nci`（资本 · VIE 非控制权益） |
| 2 | 正式映射 `node_ids` 是否都在图中？ | **是**（正式 9 主体均存在） |
| 3 | 双计 / 过宽代理？ | 多节点「共载」为故意索取权索引（PCT-RESTORE (a')），非金额双计；gap 行代理 `node_ids` **不进** in-BS 着色（FREE-REFORM C4） |
| 4 | **仅看内部（橙）**时无覆盖的正式行？ | **`gold_certs` · `sdr_certs` · `tga` · `interest_payable`** |

## 仅内部覆盖（正式 · 有橙）

`loans_di` · `soma_resell` · `soma_treasury` · `soma_mbs` · `soma_gse_debt` · `soma_accrued_interest` · `deferred_remittance` · `fr_notes` · `securities_sold_repo` · `deposits_di` · `capital_paid_in` · `surplus`  
（内部节点现仅 **`DESK` · `RB-ALL`** 出现在正式 map。）

## 无橙色覆盖（正式 · 纯外）

| line_id | side | node_ids | 含义 |
|---------|------|----------|------|
| gold_certs | asset | TREASURY | 黄金证书挂财政部 |
| sdr_certs | asset | TREASURY | SDR 证书挂财政部 |
| tga | liability | TGA, TREASURY | TGA 账户属外部（财政部） |
| interest_payable | liability | DEP-INST, NONBANK-CP | 应付利息对手方均为外 |

→ 业主若「单看内部判断是否包含各个方面」：这四类**不会**出现橙色节点。本期不静默改映射；是否把索取权扩到 RB/DESK 另令。

## 全表

| line_id | side | node_ids | 内覆盖 | 问题类型 | 建议 |
|---------|------|----------|--------|----------|------|
| gold_certs | asset | TREASURY | 否 | 正式·无内部覆盖 | 可见：仅外；补内索取权另议 |
| sdr_certs | asset | TREASURY | 否 | 正式·无内部覆盖 | 同上 |
| coin | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| loans_di | asset | DEP-INST, RB-ALL | 是 | 正式·有内部 | — |
| other_loans | asset | DEP-INST | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| soma_resell | asset | DESK, PRIM-DEALERS | 是 | 正式·有内部 | — |
| soma_treasury | asset | DESK, TREASURY | 是 | 正式·有内部 | — |
| soma_mbs | asset | DESK | 是 | 正式·有内部 | — |
| soma_gse_debt | asset | DESK | 是 | 正式·有内部 | — |
| soma_fx | asset | DESK | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| soma_swaps | asset | DESK | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| soma_accrued_interest | asset | DESK | 是 | 正式·有内部 | — |
| vie_assets | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| prepaid_pension | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| other_accrued_interest | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| premises | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| collection_items | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| deferred_remittance | asset | RB-ALL, TREASURY | 是 | 正式·有内部 | — |
| other_assets | asset | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| fr_notes | liability | PUBLIC, RB-ALL | 是 | 正式·有内部 | — |
| securities_sold_repo | liability | DESK, NONBANK-CP | 是 | 正式·有内部 | — |
| soma_other_liab | liability | DESK | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| deposits_di | liability | DEP-INST, RB-ALL | 是 | 正式·有内部 | — |
| tga | liability | TGA, TREASURY | 否 | 正式·无内部覆盖 | 可见：仅外 |
| other_deposits | liability | （proxy） | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| interest_payable | liability | DEP-INST, NONBANK-CP | 否 | 正式·无内部覆盖 | 可见：仅外 |
| vie_liab | liability | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| accrued_benefits | liability | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| deferred_credit | liability | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| other_liab | liability | RB-ALL | 否 | gap 未投影 | 侧栏 gap；增节点留后 |
| capital_paid_in | capital | MEMBER-BANKS, RB-ALL | 是 | 正式·有内部 | — |
| surplus | capital | RB-ALL | 是 | 正式·有内部 | — |
| vie_nci | capital | — | 否 | **缺 map entry** | 补 gap 条目或映射；本期不静默造 |

## 本期改码

- **做**：BS 双通道着色（内橙 / 外青 fill + 绿红描边）；PCT-RESTORE (a') 保留。
- **不做**：大规模填 gap；静默改年报数字；为无橙行强行加内部节点。
