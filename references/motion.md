# 动效规范 · 克制为先（与 effects.css 一致）

> 原则：**一屏一个"主角"动效**，其余从简。动效只为"引导注意力"，不炫技。
> 全部动效在 `assets/effects.css`，**只用纯色 / 位移 / 透明度，禁止任何 gradient**（含扫光渐变）。
> 自动适配深浅、尊重 `prefers-reduced-motion`（base.css 已全局兜底）。

## 可用动效（按场景取一，全部无渐变）

| 类 | 用途 | 何时用 |
|----|------|--------|
| `.fx-split` + `.char` | 标题逐字入场（位移+透明度） | 仅首屏主标题，整页一次 |
| `.fx-shine` | 文字强调（**纯色 `--primary`，无扫光渐变**） | 关键词/标题点缀 |
| `.fx-rise` / `[data-reveal]` | 上浮 / 滚动入场 | 卡片、KPI 进入视口（配 IntersectionObserver） |
| `.fx-pulse` | 呼吸光点（box-shadow 扩散，非渐变） | 状态点、eyebrow 圆点，点到为止 |
| `.fx-spotlight` | 卡片 hover（**纯色背景/边框变化，无光斑渐变**） | 可交互卡片 |
| `.fx-delay-1..6` | 入场交错延迟 | 给同组元素做 stagger |

> 注：早期版本的 `.fx-aurora` / `.fx-grid`（极光、网格渐变背景）以及 `.fx-shine` 的扫光渐变
> **已在 v1.2 全部移除**——全站纯色。Hero/页面背景直接用 `--bg`，不要再引用这些类。

## 节奏建议
- 首屏：标题入场 + 至多一处 `.fx-shine` 纯色点缀即可，不要堆背景动画。
- 内容区：滚动入场（`[data-reveal]`）即可，避免每个元素都加不同动效。
- 交互反馈：hover 用 base.css 内置的 transform/border 过渡，无需额外动画。

## 硬性约束
- **零渐变**（含扫光）；单个动效 0.3–0.8s，缓动统一 `var(--ease)`。
- 必须尊重 `prefers-reduced-motion`（已全局兜底，自定义动画也要遵守）。
- 不做无限循环的大面积动画；循环类仅限小元素（光点/呼吸）。
