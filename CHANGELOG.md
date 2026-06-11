# Changelog

遵循语义化版本 `MAJOR.MINOR.PATCH`。

## v1.0.0-rc.6 — 2026-06-11（全量主题公开 + 可见切换）
- **主题库全量公开**：当前 7 组配色 / 14 个 theme key 全部进入 `CCBGZZY_THEME_META`，默认仍为 `sage`。
- **新增主题列表 API**：`CCBGZZY_THEME_ORDER` 固定展示顺序，`CCBGZZY_getThemeOptions()` 给模板/外部页面读取完整主题，避免新增主题后 UI 仍手写旧列表。
- **切换器可见化**：起手模板从匿名小色点升级为「下拉选择 + 可见名称色卡 + 深浅切换」，所有主题可直接选择。
- **文档同步**：SKILL / README / color-system / experimental-themes / components 全部改为"7 组 / 14 key 全开放"口径，并补齐 `sage`、`warm-sand`、`obsidian-gold`、`platinum-blue`、`deep-ocean` 的主题说明。

## v1.0.0-rc.5 — 2026-06-11（修陈旧示例 + 强制门禁）
- **重建 example-report**：之前是修 reveal 前构建的单文件，内联了旧的未作用域 `[data-reveal]{opacity:0}`，静态渲染空白；现从 package 源用最新 assets 重建，已是 `html.ccbgzzy-js [data-reveal]` 作用域，静态可见。
- **lint 新增第 10 项**：检测 `[data-reveal]` 隐藏是否挂在 `html.ccbgzzy-js` 作用域下，杜绝"陈旧构建导致内容空白"再次发生（已验证能抓到旧 example）。
- **SKILL 新增「🚦 强制门禁（5 条）」**：① 先判场景与粒度（源数据越细越不能直接上屏）② 先给结论（第一屏回答"现在最重要的问题"）③ 明细后置（全量/姓名/任务/客群/文案进详情区）④ 日历必须三层 ⑤ 执行版/汇报版分开（一页不承担所有用途，必要时产出两版）。

## v1.0.0-rc.4 — 2026-06-11（按二轮评审再整改）
- **修核心内容静态可见性（渐进增强）**：`[data-reveal]` 的隐藏动画改为只在 `<html class="ccbgzzy-js">`（theme-config.js 在 head 同步注入）下生效；无 JS / QuickLook / 静态渲染时核心内容（摘要/KPI/明细）默认完全可见，不再依赖 IntersectionObserver。
- **清旧主题口径**：color-system.md / aesthetic.md 不再写"墨金（默认）"，统一为默认 `sage`、旧四套为早期候选。

## v1.0.0-rc.3 — 2026-06-11（收敛发布版，按外部评审整改）
- **统一主题口径**：experimental-themes.md / SKILL / theme-config / README 全部对齐——试用阶段 14 套全开放可切换、默认 sage、正式可收敛；去掉"不进 META"的旧说法。
- **动效三处一致**：motion.md 删掉已移除的 `fx-aurora/fx-grid/扫光渐变`；起手模板移除 `fx-aurora/fx-grid`，与 effects.css 对齐。
- **模板去 hero 化**：template.html 改为结论前置 + KPI 上移的 report 信息页骨架，不再首屏大 hero。
- **真实 example**：examples/example-report.html 改为有具体数字与真实洞察的月度经营报告（替换占位模板）。
- **frontmatter 收敛**：只留 `name/description`（Codex skill-creator 规范）；版本号移到正文/theme-config。
- **.skill 瘦身**：打包排除 README/CHANGELOG/LICENSE/.gitignore（仓库文档，不进安装包）。
- **字号规则修正**：标签/徽章（日历格/状态徽章）明确允许 14px（`--text-xs`），与 `.cal-tag` 一致。
- **lint 增强**：新增"首屏应有结论/关键指标区"检查；内部话术检查已能拦截自身误用。

## v1.0.0-rc.2 (calendar + themes) — 2026-06-11
- 新增 **calendar/schedule 页面类型**：三层展示（总览/月历/详情）、每格≤3条+"更多N项"、重复目标上提、AB只留一句、每任务≤2标签、关键日高亮、管理总览/执行详情两版。SKILL 加专项规则 + references/calendar-schedule.md + base.css 日历组件。
- 14 套主题全部开放可切换（试用），深浅配对补齐；清理文档聊天用词（用户化），产品级。
- 新增 4 套候选主题 × light/dark（ocean-breeze/sky-field/summer-coast/fresh-holiday），全部进 CCBGZZY_EXPERIMENTAL，不进 META、不默认启用。
- 新增 references/experimental-themes.md：完整 light/dark token、适合/不适合场景、注意事项、进 META 建议。

## v1.0.0-rc.2 — 2026-06-11
使用逻辑改为「Agent 自动分诊，用户零配置」，并补内容真实性硬规则。
- 新增 **四之二、内容真实性 & 不泄露设计过程**：① 禁止编造源数据外的目标/阈值/达标判断（没目标就只陈述数值或标"目标未设定"）；② 禁止把内部设计/过程话术（同色阶、单点强调、明细靠后、信息密度…）写进交付页面。
- lint 新增第 8 项：成品里出现内部设计话术即报错。
- 清理 template.html 占位文案，去掉内部话术，改为中性占位。
- 新增「结论必须有信息量」规则：禁止把定义上必然成立的事实（交集≤各集合等）当结论。
- 新增「每个区块都要有信息量、禁止无用展示」规则：不得只摆人头/总量而不显率/对比。
- base.css 新增 `.data-table.tall`：长表限高+容器内滚动，表头真正吸顶（修 sticky 失效）；tables.md 补长表吸顶规范。
- SKILL.md 新增 **〇、自动分诊原则**：用户不选页面类型；Agent 自动判断目的/受众/密度/结构；能推断就别问；必须问时一次 ≤2 问且说明原因；不暴露内部判断过程；默认"先结论→指标→行动/明细"；非 lookup 不首屏堆表格。
- 内部页面类型更新为 8 类（**仅 Agent 内部分诊用**）：report / decision / monitor / lookup / analysis / notice / guide / prototype，并给出分诊判据。
- 工作流加 step 0「自动分诊」；description 改为"用户一句话、Agent 自动分诊"。
- README 面向用户的说明砍到一句话：把内容发给 Agent，说"用 CCBGZZY_DESIGN 做成 HTML"即可；工程内容下沉到维护者区。

## v1.0.0-rc.1 — 2026-06-11
首个发布候选。把"审美强、逻辑弱、工程不闭环、主文档与执行矛盾"系统性补齐。
- **SKILL.md 重写为硬规则主文档**：内核逻辑链「内容→信息密度→页面类型→展示结构→组件→颜色语义→交付格式」。
- **信息密度决策树**（6 档：极低/低/中/中高/高/超高 → 对应 Summary/KPI/卡片/图表/表格分页/折叠抽屉）上提为第一原则。
- **页面类型 7 类**（report/dashboard/notice/guide/landing/prototype/detail）。
- **统一叙事顺序** Context→Conclusion→Key Metrics→Attention→Analysis→Details→Action；明细/表格默认靠后。
- **颜色边界**：accent 仅最关键 1–2 处、不做背景/多标签；danger 仅严重异常、普通待办用 warning/attention（新增 `--attention` 语义色）；seq 仅同类弱区分。
- **字号规则细化**：正文/表格 ≥16px；图例/脚注/水印/版本号允许 12–14px；高密度表格须显式 `.table-compact`；移动端正文 ≥15px。
- **主题矛盾解决**：稳定主题 `sage`(light)/`sage-dark`(dark)；其余标 experimental 不暴露；自检改为"稳定 light/dark 必须切换验证"。
- **输出模式**：single-file（默认，内联）/ package（外链）。
- **工程闭环**：新增 scripts/ `init.mjs`、`build-single-file.mjs`、`lint.mjs`；README 补安装/初始化/示例/构建/lint 命令与仓库结构。
- **lint 自检**：禁渐变、禁内容硬编码色、查水印/版本、查小字滥用、查 !important 过多、查首屏裸表格无结论区。

## v1.5.0 — 2026-06-11
- **新增 references/information-density.md**：展示逻辑总纲——按"信息密度+阅读目的"选展示形式（形态→形式对照表、密度三档、五条铁律、把满屏表格改轻的手法）。密度不高别默认堆表格、先结论后明细。SKILL.md 工作流加"选展示形式"步骤。
- **全面通用化**：清除所有 references / template / 文档里的业务字眼（改为"名称/数量/占比/类别/指标"等通用占位），确保是通用型 design skill。

## v1.4.0 — 2026-06-11
改为"一套一套打磨"。
- **新增并锁定唯一主题「砂绿 sage」为默认**：严格采用给定 6 色值（奶油 #EFEAE0 / 浅卡片 #E5DFD2 / 强调黑 #1A1A1A / 标志橙 #CD6F47 / 鼠尾草 #BDCEC0 / 深鼠尾草 #6B8A6F）。其余主题暂停（仍在 THEMES 里，不暴露）。
- **落地 5 条硬规矩**（写进 aesthetic.md）：一屏一核心观点 · 关键词只换 1–2 处色 · 圆角 14–16px · 留白≥20% · 用 #1A1A1A 不用 #000。
- 全局圆角改 14/16；阴影改用 #1A1A1A 透明度（不用纯黑）。
- 锁定砂绿主题：奶油底 + 鼠尾草卡片 + 近黑文字，标志橙只点最关键的一处指标。

## v1.3.0 — 2026-06-11
- **新增 references/aesthetic.md**：沉淀"高级感"4 维审美——莫兰迪低饱和+单色相 / 卡片分层留白 / 按内容气质匹配风格（金融商务→corporate elegance）/ 可亲近的高级感。SKILL.md 列为动手前必读。
- **主题向莫兰迪微调**：四套主题的强调色降饱和、掺灰（更"安静"），保持文字高对比可读。
- **演示表格按规范重做**：数字右对齐、首列加重、行距更大、行分隔清爽；卡片加柔和阴影分层、留白加大（approachable luxury）。

## v1.2.0 — 2026-06-11
- **全站去渐变（flat）**：移除 effects.css 的极光/网格/扫光/光斑渐变；新增硬规则"禁止任何 gradient"。纵深改用纯色台阶。
- **修可读性**：明确"`--seq-*` 只用于填充，不当文字色"——深色主题下 seq 深端当文字会糊。演示 KPI 数字改用 `--title`（最亮），类别只留顶部细条。
- **深海主题提对比**：底/卡片提亮、次要文字提亮，缓解"字看不清"。

## v1.1.0 — 2026-06-11
按使用反馈大改配色与排版。
- **配色重做为「同色阶 + 单点强调」**：删除彩虹分类色 `--cat-1..6`，改为同一色相的明度台阶 `--seq-1..5` + 唯一暖色强调 `--accent`。统一中又有重点（科研期刊式）。
- **主题精简为 4 套**（深浅各 2，全部按参考色板重做）：墨金 / 深海（Maastricht 蓝阶）· 月白（Platinum 蓝灰）/ 暖砂（Studio Vaia Cold Sky）。移除极夜/午夜/拿铁/晴空。
- **字号硬性放大**：基准提到 17px，设硬性最小字号（正文/表格 ≥16px、标题 ≥28px、KPI ≥44px），禁止 12–13px 小字。
- **表格重做**：依据 Cloudscape / shadcn / 期刊排版——数字右对齐+等宽、留白>边框、首列加重、颜色只落状态点、可选低饱和斑马纹。
- 新增 references/tables.md、references/data-viz.md。
- 演示看板按新规范重做（字号放大、三类证书改同色阶、暖色只点最关键指标）。

## v1.0.0 — 2026-06-11
首个发布版。
- 语义化 token 体系（颜色"有内容"：标题/重点/正文/辅助/状态/分类各有固定角色）。
- 六套主题，深浅各三，均含 4+ 强调色：墨金(默认)/极夜/午夜 · 日晖/拿铁/晴空。
- 主题来源于成熟配色体系（Nord / Tokyo Night / Solarized / Catppuccin）+ CCBGZZY 品牌色。
- 一键主题切换 + 同色相深↔浅切换。
- 多语言字体栈：简/繁/日/韩/英/法（Noto 全语种 + 系统回退）。
- 等比字号刻度（18px 基准 · 1.25）+ 标准组件库。
- 三层水印（meta 署名 + 注释签名 + 可见角标 CCBGZZY_DESIGN）。
- 克制动效集（reveal / shine / aurora / spotlight…）。
- SKILL.md + 6 篇 references + assets 三件套 + 起手模板。
