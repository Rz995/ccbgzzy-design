# 可选编辑层 · assets/edit-layer.js

> 让生成好的页面能「行内改字 + 换图表类型」，并支持 AI「块级重生成」而**不冲掉用户已做的手改**。
> **默认不进交付版**：需要可编辑时才在页面加 `<script src="edit-layer.js" defer></script>`；锁定交付时移除本层即得不可编辑版。

## 一句话原则

> 页面真相可随时从带 `data-block-id` 的节点派生为 blocks 模型；用户手改 + AI 重生成都是对模型的**补丁**，**补丁只带一个 `blockId`、只动那一块**，永远不是整页重写。

这就是「改完一堆文字、再重生成某个图表，文字不回退」的根本保证——重生成只 patch 目标块，其余块（含手改）原封不动。

## 页面约定

- 可编辑文本：节点加 `data-block-id` + `data-ccbgzzy-edit`，如
  `<p data-block-id="b2" data-ccbgzzy-edit>正文…</p>`。
- 图表：用 `chart.js` 的 `<figure class="ccbgzzy-chart" data-block-id="b7">`（含 spec）。编辑态会自动注入「图表类型」下拉。

## 重生成流程（块级补丁）

```
用户：把 b7 改成玫瑰图
  ↓ CCBGZZY_buildRegenRequest("b7","用玫瑰图") → 作用域=单块的请求
{ "action":"regenerate", "blockId":"b7", "instruction":"...",
  "current": { "spec": { …b7 当前 spec… } } }
  ↓ 交给 Claude（Cowork 直接做 / 独立文件复制贴回对话）
Claude 只返回 b7 的补丁（禁止整页）：
{ "blockId":"b7", "patch": { "spec": { "type":"rose" } } }
  ↓ CCBGZZY_applyPatch(patch) → 只合并、只重画 b7
```

## 护栏

1. `CCBGZZY_validatePatch(p)` 拒收：整页文档（带 `blocks`）、数组、缺 `blockId/patch`、非对象。
2. 合并用 `deepMerge`，只覆盖补丁里给出的字段；其余字段（含别的块）不动。
3. `applyPatch` 每次自动压栈快照，`CCBGZZY_undo()` 可撤销上一次补丁。
4. 真要整页重构是显式动作，不走补丁通道，并应提示「会覆盖本地编辑」。
5. `contentEditable` 粘贴只保留纯文本，杜绝外来颜色/字号注入——守住 lint 颜色与字号铁律。

## 重生成 prompt 模板（给 Claude 的约束）

> 只返回 `blockId=<X>` 这一块的新 `spec`（或 `text`），用 `{ "blockId":"<X>", "patch":{…} }` 格式；
> **禁止重发整页、禁止返回其它块、禁止改动未提及字段**。图表保持原 `data`，只改 `type` 等表现字段。

## API 速查

| 函数 | 作用 |
|------|------|
| `CCBGZZY_enableEdit(on?)` | 开/关编辑态（行内改字 + 图表类型下拉） |
| `CCBGZZY_collectModel()` | 从 DOM 派生当前 blocks 模型 |
| `CCBGZZY_buildRegenRequest(id, ins)` | 生成「作用域=单块」的重生成请求 |
| `CCBGZZY_applyPatch(patchObj)` | 把块级补丁应用到实时 DOM（自带快照） |
| `CCBGZZY_undo()` | 撤销上一次补丁 |
| `CCBGZZY_exportLocked()` | 返回去掉编辑层的锁定 HTML 字符串 |
| `CCBGZZY_validatePatch` / `CCBGZZY_mergePatch` / `CCBGZZY_deepMerge` | 纯函数，`scripts/test.mjs` 已覆盖 |

## 导出

- **锁定 HTML**：`CCBGZZY_exportLocked()` —— 去掉编辑层脚本、工具栏、`contenteditable`。
- **PDF**：锁定版「打印 → 存 PDF」，或在对话里用 pdf skill 高保真出。
- **Word**：用 docx skill 从 `CCBGZZY_collectModel()` 的 blocks **重新生成**，不要做 HTML→Word 转换。

## 体积与测试

- 编辑层与 chart.js 会增加体积，注意交付闸口的 250KB 预算；编辑层默认不打包进交付版。
- 纯逻辑（补丁/合并/兼容表）由 `node scripts/test.mjs` 覆盖，改动后必跑。
