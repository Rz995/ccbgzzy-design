# 字体与字号系统（语义角色规则）

> 字号系统追求统一，不追求每页都不同。底层 token 可以保留兼容别名，但业务页面和 Agent 只暴露少数语义角色。

## 一、业务页面只使用固定字号角色

| 角色 | 变量 | 字号 | 用途 |
|------|------|------|------|
| Display / KPI | `--text-display` | 44px | KPI 大数字、核心数字 |
| Page Title | `--text-page-title` | 32px | 页面标题、一级标题 |
| Section Title | `--text-section-title` / `--text-section-title-sm` | 28px / 24px | 模块标题，二选一 |
| Card Title | `--text-card-title` | 20px | 卡片标题、列表项标题 |
| Body / Table | `--text-body` / `--text-table` | 16px | 正文、表格单元、按钮 |
| Meta / Tag / Footnote | `--text-meta` / `--text-tag` / `--text-footnote` | 14px / 13px | 图例、脚注、标签、徽章、角标 |

业务正文和表格不得低于 16px。移动端正文不得低于 15px。

## 二、禁止局部随手写字号

业务 CSS 中不要写：

```css
.xxx { font-size: 15px; }
.xxx { font-size: 0.875rem; }
```

必须写：

```css
.xxx { font-size: var(--text-body); }
.xxx-title { font-size: var(--text-card-title); }
```

例外只包括：

- 响应式规则中为移动端做必要收敛，但正文仍不得低于 15px。
- 水印、版本号、版权角标。
- SVG 内部图表文字或特殊辅助元素，且不得影响正文阅读。
- 主题系统内部控件的极小非业务装饰。

## 三、组件绑定

- `h1/h2` → Page Title。
- `h3/.section-title` → Section Title。
- `h4/.card-title` → Card Title。
- `.kpi-value` → Display / KPI。
- `.table` → Body / Table。
- `.badge/.cal-tag/.kpi-label/.kpi-sub/.table-info` → Meta / Tag。

高密度表格只能通过 `.table-compact` 收紧 padding，不得改小字号。

## 四、字体栈

- `--font-display` 与 `--font-body` 全程无衬线：Noto Sans SC/TC/JP/KR → 苹方/微软雅黑/系统黑体 → system-ui。
- `--font-mono` 用于数字和代码。数字展示加 `.num`（tabular-nums）。
- 不使用宋体、衬线、超细字重。中文正文 400/500，标题 700。

## 五、多语言

给 `<html lang>` 或局部 `lang` 打正确语种，Pan-CJK 才显示正确地区字形（简繁日字形不同）。详见 `i18n-fonts.md`。
