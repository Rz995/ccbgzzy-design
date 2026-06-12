# 主题库（当前 7 个 theme key · 全部可切换）

> 以 `assets/theme-config.js` 为准。**默认主题 `gov-finance-blue`（政金蓝）；当前 7 个 theme key 全部进 `CCBGZZY_THEME_ORDER`、默认 UI 可切换**，`CCBGZZY_EXPERIMENTAL` 为空。
> 模板 UI 一律通过 `CCBGZZY_getThemeOptions()` 读取，不手写固定列表。
>
> 通用规则（每套都遵守）：文字只用中性 `--title/--fg/--fg-2/--fg-muted`（不用 seq 高饱和色当文字）；
> `--primary` 主色、`--accent` 唯一暖色强调（每页 1–2 处）、`--seq-1..5` 仅图表/分类；`--danger` 仅严重异常；**全程无渐变**。

| key | 名称 | 模式 | 深浅配对 | 定位 |
|---|---|---|---|---|
| `gov-finance-blue` ★默认 | 政金蓝 | light | ↔ `gov-finance-blue-dark` | 政务/金融经营驾驶舱、银行看板、正式管理报告 |
| `gov-finance-blue-dark` | 政金·夜 | dark | ↔ `gov-finance-blue` | 政金蓝深色版（大屏/夜间） |
| `sage` | 砂绿 | light | 无（仅 light） | 通用汇报、经营报告、内部说明 |
| `sky-field` | 蓝天绿地 | light | ↔ `sky-field-dark` | 复盘分析、风险提醒 |
| `sky-field-dark` | 蓝天·夜 | dark | ↔ `sky-field` | 蓝天绿地深色版 |
| `summer-coast` | 夏日海滩 | light | 无（仅 light） | 客户活动、领奖提醒、操作指引 |
| `warm-sand` | 暖砂 | light | 无（仅 light） | 温和说明、提案、轻量沟通页 |

> `CCBGZZY_toggleMode()` 只在有配对的 `gov-finance-blue` 与 `sky-field` 上一键深↔浅；仅 light 的主题不参与一键切换。

---

## 默认 · 政金蓝 gov-finance-blue / gov-finance-blue-dark
**light** `gov-finance-blue`
bg `#EEF3F8` · surface `#FFFFFF` · surface-2 `#F6F8FB` · title `#183153` · fg `#4B5D73` · fg-2 `#718094` · fg-muted `#98A4B3`
primary `#2F73B8` · primary-strong `#1F5E9D` · accent `#D6A63A` · success `#4FA66A` · warning `#D0882E` · attention `#C9B27A` · danger `#D45B4F` · info `#4A91C9`
seq-1..5：`#E6F0FA` · `#C7DDF2` · `#8FB9E2` · `#4F8DCC` · `#1F5E9D`（纯蓝明度台阶，不混绿/金）

**dark** `gov-finance-blue-dark`
bg `#0F2036` · surface `#16304F` · surface-2 `#1E3C61` · title `#EAF1F8` · fg `#C6D3E2` · fg-2 `#9DB0C6` · fg-muted `#74879E`
primary `#5C9BD6` · primary-strong `#7FB4E2` · accent `#E0B452` · success `#5FB87C` · warning `#DDA445` · danger `#DD6E62` · info `#6BA8DE`

规则：`primary` 蓝色承载主按钮/链接/激活态/关键结构；`accent` 金色只用于全页最关键 KPI/关键词/节点，整页 1–2 处；`success/warning/danger/info` 只用于状态，不做装饰色；`seq-1..5` 纯蓝台阶，不混绿/金；正文文字只用中性档。
**适合**：政务/金融经营驾驶舱、银行看板、正式管理报告（深色版用于大屏/夜间）。**不适合**：活泼营销/客户活动页。

---

## 砂绿 sage（仅 light）
bg `#EFEAE0` · surface `#E5DFD2` · surface-2 `#DBD4C5` · title `#1A1A1A` · fg `#3A382F` · fg-2 `#6A685B` · fg-muted `#908D7E`
primary `#6B8A6F` · primary-strong `#56745B` · accent `#CD6F47` · seq `#D7E1D7`·`#BDCEC0`·`#95B099`·`#6B8A6F`·`#4E6A52`
**适合**：通用汇报、经营报告、内部说明。**注意**：标志橙只点最关键 1–2 处，结构用鼠尾草同色阶。

## 蓝天绿地 sky-field / sky-field-dark
**light** primary `#377EB8` · accent `#DC7369`（珊瑚）· danger `#B23648`（深红）· seq `#E1F3FA`→`#285C86`
**dark** `sky-field-dark` primary `#5E9FD0` · accent `#E08A80` · seq `#21425E`→`#A9D2EA`
**适合**：管理看板、风险提醒、复盘分析。**注意**：`--danger` 深红只用于真正严重异常，普通待办用 `--warning`/`--attention`。

## 夏日海滩 summer-coast（仅 light）
primary `#3C9BC9` · accent `#F4775A`（珊瑚）· seq `#CDEBEA`→`#2C77A0`
**适合**：客户活动页、领奖提醒、操作指引。**不适合**：正式经营看板（太暖太活泼）。

## 暖砂 warm-sand（仅 light）
primary `#4E7C93`（蓝灰）· accent `#B56B7A`（粉）· seq `#CBD9DE`→`#355A68`
**适合**：温和说明、提案、客户沟通、轻量页。**注意**：粉色 accent 只点最关键处，主色是蓝灰，别把整页做成暖粉。

---

## 增删主题怎么做
1. 在 `assets/theme-config.js` 的 `CCBGZZY_THEMES` 增/删 token；同步 `CCBGZZY_THEME_META`（label/mode/swatch*）与 `CCBGZZY_THEME_ORDER`（展示顺序）。
2. 若要"暂时收起但不删"，把对应 key 从 `CCBGZZY_THEME_ORDER` 拿掉并放进 `CCBGZZY_EXPERIMENTAL`，token 保留（当前 `CCBGZZY_EXPERIMENTAL` 为空 = 全开放）。
3. 深浅一键切换的配对在 `CCBGZZY_toggleMode` 的 `pair` 表里登记。
4. UI 不需要改：模板读 `CCBGZZY_getThemeOptions()` 自动出全量列表。
