# 主题库（默认少选择，底层可扩展）

> 以 `assets/theme-config.js` 为准。默认主题是 `gov-finance-blue`（政金蓝）。
> 默认主题切换器只开放 3 套稳定主题：`gov-finance-blue`、`sage`、`warm-sand`。
> 其他主题 token 可以保留，但必须标记为 experimental，不进入默认 UI。

设计系统追求统一，不追求每页都不同。底层 token 可以多，对用户和 Agent 暴露的选择必须少。

## 一、默认开放主题

| key | 名称 | 模式 | 定位 |
|---|---|---|---|
| `gov-finance-blue` ★默认 | 政金蓝 | light | 政务/金融经营驾驶舱、银行看板、正式管理报告 |
| `sage` | 砂绿 | light | 通用汇报、经营报告、内部说明 |
| `warm-sand` | 暖砂 | light | 温和说明、提案、轻量沟通页 |

## 二、实验主题

以下主题保留在 `theme-config.js` 中，但不进入默认 UI：

| key | 名称 | 模式 | 说明 |
|---|---|---|---|
| `gov-finance-blue-dark` | 政金·夜 | dark | 政金蓝深色版，大屏/夜间可按需启用 |
| `sky-field` | 蓝天绿地 | light | 复盘分析、风险提醒候选 |
| `sky-field-dark` | 蓝天·夜 | dark | sky-field 深色候选 |
| `summer-coast` | 夏日海滩 | light | 活动/领奖/操作指引候选 |

## 三、政金蓝语义

**light** `gov-finance-blue`

bg `#EEF3F8` · surface `#FFFFFF` · surface-2 `#F6F8FB` · title `#183153` · fg `#4B5D73` · fg-2 `#718094` · fg-muted `#98A4B3`

primary `#2F73B8` · primary-strong `#1F5E9D` · accent `#D6A63A`

seq-1..5：`#E6F0FA` · `#C7DDF2` · `#8FB9E2` · `#4F8DCC` · `#1F5E9D`

规则：

- `primary` 使用蓝色，承载主按钮、链接、激活态、关键结构。
- `accent` 使用金色，只用于全页最关键 KPI/关键词/节点，整页 1-2 处。
- `success/warning/danger/info` 只用于状态，不做装饰色。
- `seq-1..5` 使用蓝色系明度台阶，不混入绿色和金色。
- 正文文字只用 `--title/--fg/--fg-2/--fg-muted`。

## 四、其他稳定主题

### 砂绿 `sage`

适合通用汇报、经营报告、内部说明。强调色只点最关键 1-2 处，结构用鼠尾草同色阶。

### 暖砂 `warm-sand`

适合温和说明、提案、客户沟通、轻量页。主色是蓝灰，不要把整页做成暖粉。

## 五、增删主题怎么做

1. 在 `assets/theme-config.js` 的 `CCBGZZY_THEMES` 增/删 token。
2. 稳定开放主题进入 `CCBGZZY_THEME_ORDER`。
3. 实验主题保留在 `CCBGZZY_THEME_META`，并进入 `CCBGZZY_EXPERIMENTAL`，但不进入 `CCBGZZY_THEME_ORDER`。
4. UI 只读 `CCBGZZY_getThemeOptions()`，不要手写固定列表。
