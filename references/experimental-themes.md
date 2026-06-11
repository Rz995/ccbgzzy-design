# 主题库（全部可切换）· 7 组 / 14 个 theme key

> 已写入 `assets/theme-config.js`。**当前 14 个 theme key 全部进 `CCBGZZY_THEME_META`、可切换**；默认仍 `sage`，
> 推荐稳定用 `sage / sage-dark`。模板 UI 通过 `CCBGZZY_getThemeOptions()` 读取完整列表。
> 正式上线时可把非推荐主题移回 `CCBGZZY_EXPERIMENTAL` 收敛。
> 通用规则（每套都遵守）：文字只用中性 `--title/--fg/--fg-2/--fg-muted`（不用色卡高饱和色）；
> `--primary` 主色、`--accent` 唯一强调（每页 1–2 处）、`--seq-*` 仅图表/分类；`--danger` 仅严重异常；全程无渐变。
> 色卡颜色主要落在 primary / accent / seq / 状态色，**不直接铺满页面**。

| 组 | light key | dark key | 定位 |
|---|---|---|---|
| 推荐默认 | `sage` | `sage-dark` | 通用报告、看板默认 |
| 业务冷静 | `ocean-breeze` | `ocean-breeze-dark` | 正式内部看板、经营数据页 |
| 复盘风险 | `sky-field` | `sky-field-dark` | 复盘分析、风险提醒 |
| 活动指引 | `summer-coast` | `summer-coast-dark` | 客户活动、领奖提醒、操作指引 |
| 轻量友好 | `fresh-holiday` | `fresh-holiday-dark` | 轻量看板、任务页、步骤说明 |
| 暖中性 | `warm-sand` | `obsidian-gold` | 暖调浅色 / 权威深色 |
| 冷蓝灰 | `platinum-blue` | `deep-ocean` | 冷调浅色 / 深色数据页 |

---

## 默认 · 砂绿 sage（推荐默认）

**light** `sage`
bg #EFEAE0 · surface #E5DFD2 · surface-2 #DBD4C5 · title #1A1A1A · fg #3A382F · fg-2 #6A685B · fg-muted #908D7E
primary #6B8A6F · primary-strong #56745B · accent #CD6F47 · success #5E8B5A · warning #C0883C · attention #9C8A63 · danger #B5503C · info #5E7E86
seq-1..5 #D7E1D7 · #BDCEC0 · #95B099 · #6B8A6F · #4E6A52

**dark** `sage-dark`
bg #1B1A16 · surface #26241E · surface-2 #322F27 · title #F0EBE0 · fg #D8D2C4 · fg-2 #A7A192 · fg-muted #7C7768
primary #8FAE93 · primary-strong #A9C2AC · accent #DD8359 · success #6FA873 · warning #C99A4A · attention #C9B27A · danger #C56B54 · info #6E97A0
seq-1..5 #3E5142 · #4E6A52 · #6B8A6F · #8FAE93 · #B6CDB9

**适合**：默认报告、经营看板、复盘、通用说明页。
**不适合**：强活动视觉页（可以改用 summer-coast / fresh-holiday）。
**注意**：标志橙只用于最关键 1–2 处；日常结构用鼠尾草同色阶。

---

## A · 海洋清风 ocean-breeze（蓝绿主色 + 橙强调）

**light** `ocean-breeze`
| 角色 | 值 | 角色 | 值 |
|---|---|---|---|
| bg | #F2F7FB | surface | #FFFFFF |
| surface-2 | #E4EEF5 | title | #16323A |
| fg | #33474E | fg-2 | #5E737A |
| fg-muted | #8A9AA0 | primary | #3E8C97 |
| primary-strong | #2C6A74 | accent | #E58A4A |
| success | #4F9E86 | warning | #E0A23E |
| attention | #C7A86A | danger | #C8534A |
| info | #4198AC | border | rgba(22,50,58,.12) |
| seq-1..5 | #BFDDF2 · #7BC0CD · #51999F · #3E8C97 · #2C6A74 | | |

**dark** `ocean-breeze-dark`
bg #0E2027 · surface #163039 · surface-2 #1F404A · title #EAF3F5 · fg #C9DCE0 · fg-2 #9DB6BC · fg-muted #748A90
primary #6FB9C4 · primary-strong #8FCDD6 · accent #EE9E62 · success #6FBFA0 · warning #E6B566 · attention #CDB682 · danger #D77468 · info #6FB9C4
seq-1..5 #234A53 · #347078 · #4198AC · #7BC0CD · #BFDDF2

**适合**：正式内部看板、经营数据页、管理报告（冷静专业、最贴业务）。
**不适合**：强营销/活动促销页（偏克制，不够热闹）。
**注意**：橙色 #E58A4A 仅作 accent，落在最关键 KPI/关键词，1–2 处；蓝绿单项率不要拿来做正文色。

---

## B · 蓝天绿地 sky-field（蓝主色 + 珊瑚强调，深红仅严重异常）

**light** `sky-field`
bg #F3F9FC · surface #FFFFFF · surface-2 #E1F3FA · title #1E2E3C · fg #38485A · fg-2 #647686 · fg-muted #93A0AB
primary #377EB8 · primary-strong #2A608E · accent #DC7369 · success #5A9A55 · warning #C99A2E · attention #B6A86A · danger #B23648 · info #377EB8
seq-1..5 #E1F3FA · #A9D2EA · #6FA9D0 · #377EB8 · #285C86

**dark** `sky-field-dark`
bg #101E2A · surface #1A2D3D · surface-2 #233A4D · title #EAF2F8 · fg #C6D6E2 · fg-2 #9AAEBE · fg-muted #6F8294
primary #5E9FD0 · primary-strong #7FB6E0 · accent #E08A80 · success #6FB46A · warning #D8AE55 · attention #C2B488 · danger #C9505F · info #5E9FD0
seq-1..5 #21425E · #2F6491 · #377EB8 · #6FA9D0 · #A9D2EA

**适合**：管理看板、风险提醒页、复盘分析（蓝稳重、珊瑚提醒、深红警示）。
**不适合**：轻松活动页、面向客户的活泼场景。
**注意**：**`--danger`(#B23648 深红) 只能用于真正严重异常**；普通"待办/待补"用 `--warning` 或 `--attention`；珊瑚 #DC7369 作 accent，不要满页铺。

---

## C · 夏日海滩 summer-coast（蓝绿主色 + 珊瑚强调，活泼）

**light** `summer-coast`
bg #FBF7F0 · surface #FFFFFF · surface-2 #F1EAE0 · title #2A2622 · fg #4A443D · fg-2 #756D63 · fg-muted #A39A8E
primary #3C9BC9 · primary-strong #2C77A0 · accent #F4775A · success #6FAE63 · warning #E6A23C · attention #E2B96A · danger #D8504F · info #3C9BC9
seq-1..5 #CDEBEA · #8FD0CD · #65BDBA · #3C9BC9 · #2C77A0

**dark** `summer-coast-dark`
bg #1A1714 · surface #262019 · surface-2 #322A20 · title #F4ECE0 · fg #DAD0C2 · fg-2 #ABA08F · fg-muted #7E7464
primary #5BB6D4 · primary-strong #7FCBE2 · accent #FB8E70 · success #79B86C · warning #E6B466 · attention #E8C57E · danger #E06B66 · info #5BB6D4
seq-1..5 #1F5A78 · #2C77A0 · #3C9BC9 · #65BDBA · #A7DAD7

**适合**：客户活动页、领奖提醒、操作指引（暖底活泼）。
**不适合**：**默认经营看板 / 正式管理报告**（色温太暖太活泼，不够稳重）。
**注意**：珊瑚 #F4775A 是 accent、不是正文；色卡里的粉/橙（#FC757B/#FAA26F）不要用作大面积背景或文字；图表走 seq 蓝绿阶，别凑成彩虹。

---

## D · 清新假日 fresh-holiday（薄荷绿主色 + 珊瑚强调，轻量）

**light** `fresh-holiday`
bg #F4F8F6 · surface #FFFFFF · surface-2 #E7EFEA · title #1E2B27 · fg #3A4742 · fg-2 #647069 · fg-muted #929EAB
primary #38A87E · primary-strong #2A8463 · accent #F58A6E · success #4E9E63 · warning #D9A23A · attention #C9A86A · danger #D45F4F · info #5A97C4
seq-1..5 #BFE8D5 · #8FD9BB · #6AD1A3 · #3FA882 · #2C7D62

**dark** `fresh-holiday-dark`
bg #131A17 · surface #1D2723 · surface-2 #27332E · title #ECF3EF · fg #CCDAD2 · fg-2 #9DACA4 · fg-muted #748079
primary #5FC79A · primary-strong #7FD6B0 · accent #FF9E84 · success #5FB87F · warning #E0B45A · attention #C9B27A · danger #DE6E5E · info #7FB5DC
seq-1..5 #235543 · #2C7D62 · #3FA882 · #6AD1A3 · #A7E3CC

**适合**：轻量看板、任务页、活动复盘、步骤说明（清新友好）。
**不适合**：高严肃度的正式经营报告 / 风险通报。
**注意**：原色卡 warning 取 #FFD47D 偏浅，作"状态徽章文字"对比不足——已将 `--warning` 落为可读的 #D9A23A，浅黄留给软背景；中性灰用 #929EAB；薄荷绿是 primary，不要当正文色。

---

## E · 暖中性 warm-sand / obsidian-gold（暖调浅色 + 权威深色）

**light** `warm-sand`
bg #F4EFE8 · surface #FBF8F3 · surface-2 #EAE1D5 · title #2E3A45 · fg #574F45 · fg-2 #837868 · fg-muted #A89C8B
primary #4E7C93 · primary-strong #3A6173 · accent #B56B7A · success #5E8B5A · warning #C28A3E · danger #B5604A · info #4E7C93
seq-1..5 #CBD9DE · #9DBAC4 · #6E97A5 · #4E7C93 · #355A68

**dark** `obsidian-gold`
bg #0A0A0F · surface #15151D · surface-2 #20202C · title #FBF7EC · fg #E2DCCC · fg-2 #B0A892 · fg-muted #7C745F
primary #C2A458 · primary-strong #DCC07E · accent #6F94AD · success #5FB87A · warning #E0A33E · danger #DC6B62 · info #6FA8D0
seq-1..5 #E8D6A6 · #D6BC72 · #C9A84C · #9A7F33 · #6E5A22

**适合**：`warm-sand` 用于偏温和的说明、提案、客户沟通；`obsidian-gold` 用于权威感强的金融/战略/大屏深色页。
**不适合**：高频运营明细默认页（暖砂偏柔，墨金偏重）。
**注意**：墨金里的金色是 primary，不要把整页做成金色装饰；暖砂的粉色 accent 只点最关键处。

---

## F · 冷蓝灰 platinum-blue / deep-ocean（冷调浅色 + 深色数据页）

**light** `platinum-blue`
bg #F4F5F6 · surface #FFFFFF · surface-2 #E8EBEF · title #22303F · fg #394A56 · fg-2 #5E7081 · fg-muted #8A98A4
primary #3D6B89 · primary-strong #2A506B · accent #B27355 · success #2E8B6A · warning #B07A20 · danger #BE4F49 · info #2C6485
seq-1..5 #C9DCEA · #8FBFDA · #5E92B5 · #2C6485 · #1B3D54

**dark** `deep-ocean`
bg #04233F · surface #0A3454 · surface-2 #134267 · title #F2F7FC · fg #D4E2F0 · fg-2 #A9C4E0 · fg-muted #88A2BE
primary #93BEE2 · primary-strong #B6D6EE · accent #CC9D6E · success #5BB98C · warning #E6B566 · danger #E0707A · info #79B0E0
seq-1..5 #C4D4E6 · #9ABCE0 · #6F9FCC · #4474A3 · #2A537E

**适合**：`platinum-blue` 用于冷静正式的浅色报告；`deep-ocean` 用于深色数据页、监控页、夜间演示。
**不适合**：活动/轻松场景（过冷静）。
**注意**：深海主题必须让文字走 `--title/--fg/--fg-2`，不要拿 `--seq-*` 深端当文字色。

---

## 收敛建议（正式上线时）

试用阶段 14 个 theme key 全开放可切换。正式上线建议按下表收敛——把不推荐的移回 `CCBGZZY_EXPERIMENTAL`：

| 主题 | 正式建议 | 理由 |
|---|---|---|
| `sage / sage-dark` | **保留为推荐默认** | 当前主用主题 |
| `ocean-breeze / -dark` | 保留（业务向第二选择） | 最贴"经营看板/管理报告"，冷静专业 |
| `sky-field / -dark` | 保留（风险/复盘向） | 蓝+珊瑚+深红，danger 用法合规 |
| `summer-coast / -dark` | 视业务保留或收回 | 暖活泼，仅客户活动/领奖/指引，不作业务默认 |
| `fresh-holiday / -dark` | 视业务保留或收回 | 轻量休闲，任务/活动复盘用 |
| `warm-sand / obsidian-gold` | 按需保留 | 暖调浅色 + 权威深色，不适合所有明细页 |
| `platinum-blue / deep-ocean` | 按需保留 | 冷蓝灰正式感强，适合报告/监控 |

> 收敛方式：把对应 key 从 `CCBGZZY_THEME_META` 移到 `CCBGZZY_EXPERIMENTAL` 即可，token 不动。
