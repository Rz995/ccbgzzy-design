# 主题库（当前 7 个 theme key · 全部可切换）

> 以 `assets/theme-config.js` 为准。**当前共 7 个 theme key，全部进 `CCBGZZY_THEME_META`、默认 UI 可切换**；默认 `sage`。
> `CCBGZZY_EXPERIMENTAL` 现为空 `[]`（没有隐藏/试用主题）。模板 UI 一律通过 `CCBGZZY_getThemeOptions()` 读取，不手写固定列表。
>
> 通用规则（每套都遵守）：文字只用中性 `--title/--fg/--fg-2/--fg-muted`（不用 seq 高饱和色当文字）；
> `--primary` 主色、`--accent` 唯一暖色强调（每页 1–2 处）、`--seq-1..5` 仅图表/分类；`--danger` 仅严重异常；**全程无渐变**。

| key | 名称 | 模式 | 深浅配对 | 定位 |
|---|---|---|---|---|
| `sage` ★默认 | 砂绿 | light | 无（仅 light） | 通用汇报/报告/看板默认 |
| `gov-finance-blue` | 政金蓝 | light | ↔ `gov-finance-blue-dark` | 政务/金融经营驾驶舱、银行看板 |
| `gov-finance-blue-dark` | 政金·夜 | dark | ↔ `gov-finance-blue` | 政金蓝深色版（大屏/夜间） |
| `sky-field` | 蓝天绿地 | light | ↔ `sky-field-dark` | 复盘分析、风险提醒 |
| `sky-field-dark` | 蓝天·夜 | dark | ↔ `sky-field` | 蓝天绿地深色版 |
| `summer-coast` | 夏日海滩 | light | 无（仅 light） | 客户活动、领奖提醒、操作指引 |
| `warm-sand` | 暖砂 | light | 无（仅 light） | 暖调轻量说明/提案页 |

> `CCBGZZY_toggleMode()` 只在有配对的 `gov-finance-blue` 与 `sky-field` 上一键深↔浅；其余仅 light 主题不参与一键切换。

---

## 默认 · 砂绿 sage（推荐默认）
**light** `sage`
bg #EFEAE0 · surface #E5DFD2 · surface-2 #DBD4C5 · title #1A1A1A · fg #3A382F · fg-2 #6A685B · fg-muted #908D7E
primary #6B8A6F · primary-strong #56745B · accent #CD6F47 · success #5E8B5A · warning #C0883C · attention #9C8A63 · danger #B5503C · info #5E7E86
seq-1..5 #D7E1D7 · #BDCEC0 · #95B099 · #6B8A6F · #4E6A52

**适合**：默认报告、经营看板、复盘、通用说明页。
**不适合**：强活动视觉页（改用 summer-coast）。
**注意**：标志橙只用于最关键 1–2 处；日常结构用鼠尾草同色阶。

---

## 政金蓝 gov-finance-blue / gov-finance-blue-dark（政务金融，低饱和商务蓝 + 金强调）
**light** `gov-finance-blue`
bg #EEF3F8 · surface #FFFFFF · surface-2 #F6F8FB · title #183153 · fg #4B5D73 · fg-2 #718094 · fg-muted #98A4B3
primary #2F73B8 · primary-strong #1F5E9D · accent #D6A63A · success #4FA66A · warning #D0882E · attention #C9B27A · danger #D45B4F · info #4A91C9
seq-1..5 #2F73B8 · #4A91C9 · #62AFC0 · #6BAE75 · #D6A63A

**dark** `gov-finance-blue-dark`
bg #0F2036 · surface #16304F · surface-2 #1E3C61 · title #EAF1F8 · fg #C6D3E2 · fg-2 #9DB0C6 · fg-muted #74879E
primary #5C9BD6 · primary-strong #7FB4E2 · accent #E0B452 · success #5FB87C · warning #DDA445 · attention #C9B27A · danger #DD6E62 · info #6BA8DE
seq-1..5 #2F73B8 · #4A91C9 · #62AFC0 · #6BAE75 · #E0B452

**适合**：政务/金融经营驾驶舱、银行看板、管理报告；深色版用于大屏/夜间演示。
**不适合**：活泼营销/客户活动页。
**注意**：金色 `--accent` 仅落最关键 KPI/关键词 1–2 处；文字走中性，不用 seq 蓝阶当正文色。

---

## 蓝天绿地 sky-field / sky-field-dark（蓝主色 + 珊瑚强调，深红仅严重异常）
**light** `sky-field`
bg #F3F9FC · surface #FFFFFF · surface-2 #E1F3FA · title #1E2E3C · fg #38485A · fg-2 #647686 · fg-muted #93A0AB
primary #377EB8 · primary-strong #2A608E · accent #DC7369 · success #5A9A55 · warning #C99A2E · attention #B6A86A · danger #B23648 · info #377EB8
seq-1..5 #E1F3FA · #A9D2EA · #6FA9D0 · #377EB8 · #285C86

**dark** `sky-field-dark`
bg #101E2A · surface #1A2D3D · surface-2 #233A4D · title #EAF2F8 · fg #C6D6E2 · fg-2 #9AAEBE · fg-muted #6F8294
primary #5E9FD0 · primary-strong #7FB6E0 · accent #E08A80 · success #6FB46A · warning #D8AE55 · attention #C2B488 · danger #C9505F · info #5E9FD0
seq-1..5 #21425E · #2F6491 · #377EB8 · #6FA9D0 · #A9D2EA

**适合**：管理看板、风险提醒页、复盘分析。
**不适合**：轻松活动页、面向客户的活泼场景。
**注意**：`--danger`（深红）只用于真正严重异常；普通"待办/待补"用 `--warning`/`--attention`；珊瑚 accent 不满页铺。

---

## 夏日海滩 summer-coast（蓝绿主色 + 珊瑚强调，活泼，仅 light）
**light** `summer-coast`
bg #FBF7F0 · surface #FFFFFF · surface-2 #F1EAE0 · title #2A2622 · fg #4A443D · fg-2 #756D63 · fg-muted #A39A8E
primary #3C9BC9 · primary-strong #2C77A0 · accent #F4775A · success #6FAE63 · warning #E6A23C · attention #E2B96A · danger #D8504F · info #3C9BC9
seq-1..5 #CDEBEA · #8FD0CD · #65BDBA · #3C9BC9 · #2C77A0

**适合**：客户活动页、领奖提醒、操作指引（暖底活泼）。
**不适合**：默认经营看板 / 正式管理报告（太暖太活泼，不够稳重）。
**注意**：珊瑚 #F4775A 是 accent，不是正文；图表走 seq 蓝绿阶，别凑成彩虹。

---

## 暖砂 warm-sand（暖调浅色 + 蓝灰主色，仅 light）
**light** `warm-sand`
bg #F4EFE8 · surface #FBF8F3 · surface-2 #EAE1D5 · title #2E3A45 · fg #574F45 · fg-2 #837868 · fg-muted #A89C8B
primary #4E7C93 · primary-strong #3A6173 · accent #B56B7A · success #5E8B5A · warning #C28A3E · attention #A8916A · danger #B5604A · info #4E7C93
seq-1..5 #CBD9DE · #9DBAC4 · #6E97A5 · #4E7C93 · #355A68

**适合**：偏温和的说明、提案、客户沟通、轻量页。
**不适合**：高频运营明细默认页（偏柔）。
**注意**：粉色 accent 只点最关键处；暖砂主色是蓝灰，不要把整页做成暖粉。

---

## 增删主题怎么做
1. 在 `assets/theme-config.js` 的 `CCBGZZY_THEMES` 增/删 token；同步 `CCBGZZY_THEME_META`（label/mode/swatchBg/swatchAccent）与 `CCBGZZY_THEME_ORDER`（展示顺序）。
2. 若要"暂时收起但不删"，把对应 key 从 `CCBGZZY_THEME_META` 移到 `CCBGZZY_EXPERIMENTAL`，token 保留。
3. 深浅一键切换的配对在 `CCBGZZY_toggleMode` 的 `pair` 表里登记。
4. UI 不需要改：模板读 `CCBGZZY_getThemeOptions()` 自动出全量列表。
