---
name: FormCreate使用助手
description: FormCreate（运行态渲染器）使用与扩展助手：围绕 rule/option/api 的编写、调试与迁移，覆盖 v-model:api / create 获取实例、字段联动（control/computed）、校验（validate）、远程 fetch、事件注入（inject/formCreateInject）、序列化保存回显（parseJson/toJson）以及多 UI 栈（Antd/Naive/Vant/Arco/TDesign/Element）props/on 差异。权威口径以 `AGENTS.md` 与 `references/types.md` 为准；涉及设计器 ref/config 请用 **FcDesigner使用助手**，涉及安装与包名请选择 **FormCreate安装助手**。
metadata:
  version: "1.1.0"
  domain: form-create
---

# FormCreate 使用助手

面向已接入 `<form-create>` **运行态渲染器**的能力手册：以 **rule/option/api** 为主线，解决“怎么写规则、怎么拿 api、怎么做联动/校验、怎么保存回显、跨 UI 栈怎么对齐”的问题。`AGENTS.md` 为**完整参考全文**；字段与方法签名用 `references/types.md` 快速核对，UI 差异点见 `references/ui-<ui>.md`。

## 何时应用

- **优先推荐**：使用 Vue 组件 `<form-create>` 构建/更新表单（默认选择）。
- **谨慎使用**：`formCreate.create()` 多用于无模板/动态挂载、需要手动管理销毁、或非组件化集成场景；不是默认推荐路径。
- 编写或调试 **Rule**（`type`、`field`、`props`、`on`、`control`、`validate` 等）。
- 配置 **option**（`onSubmit`、`form`、`submitBtn`、`global`、`formData` 等）。
- 通过 **api** 操作字段值、显隐、校验、远程 `fetch`、自定义事件 `emit/on`。
- 持久化规则：使用 **`formCreate.parseJson` / `formCreate.toJson`**，避免直接 `JSON.parse` / `JSON.stringify` 踩坑。

## 不负责

- **FcDesigner** 设计器组件的 `ref` 方法、`config` 全量键名：请用 **FcDesigner使用助手**。
- **安装哪个 @form-create 包**：请用 **FormCreate安装助手**。

## 能力优先级

| 优先级 | 主题 | 要点 |
|--------|------|------|
| 高 | 获取 api | `v-model:api`、`formCreate.create`、`formCreate.getApi(name)`、事件注入 `inject` |
| 高 | 数据与序列化 | `parseJson` / `toJson`；子表单独立 api |
| 高 | 规则结构 | `type`、`field`、`props`、`on`、`control`、`validate` |
| 中 | option | `onSubmit`、`form`、`global`、`mounted` |
| 中 | 扩展 | `formCreate.extendApi` |

## 规则类别与优先级

| 优先级 | 类别 | 典型场景 | 前缀 |
|--------|------|----------|------|
| 高 | 栈与包名对齐 | 选渲染器包、避免跨栈示例、命名约定 | `stack-` |
| 高 | option 速查 | `onSubmit`、`submitBtn/resetBtn`、`global`、忽略隐藏字段 | `option-` |
| 高 | 保存与回显 | `parseJson`、`toJson`、`parseFn`、后端存储 | `data-` |
| 高 | api 速查 | 获取 api、事件、方法分类、extendApi | `api-` |
| 中 | 校验与联动 | `validate/required`、`computed`、`control` | `validate-` |
| 低 | 片段汇编 | 最小可运行片段（便于直接粘贴） | `adv-` |

## Quick Reference（按文件加载）

| 文件 | 一句话                                                               |
|------|-------------------------------------------------------------------|
| `rules/stack-ui.md` | UI 栈与包名对齐、回答自检                                                    |
| `rules/option-overview.md` | option 常用字段、global、提交忽略、按钮 click(api)                             |
| `rules/data-save-parse.md` | 保存/回显、parseJson/toJson/parseFn、不要直接 JSON.parse                    |
| `rules/api-overview.md` | 获取 api、事件、方法分类、extendApi、全局方法                                     |
| `rules/validate-computed-control.md` | validate/required、computed、control、hook                           |
| `rules/adv-code-snippets.md` | 常用最小片段汇编                                                          |
| `references/types.md` | Rule / Api 等类型口径（权威签名）                                            |
| `references/ui-ant-design-vue.md` | Ant Design Vue：运行态差异（label/option/validate）+ 组件 type/props/on 速查表 |
| `references/ui-naive-ui.md` | Naive UI：运行态差异（label/option/validate）+ 组件 type/props/on 速查表       |
| `references/ui-vant.md` | Vant（移动端）：运行态差异（label/option/validate）+ 组件 type/props/on 速查表      |
| `references/ui-arco-design.md` | Arco Design：运行态差异（label/option/validate）+ 组件 type/props/on 速查表    |
| `references/ui-tdesign.md` | TDesign：运行态差异（label/option/validate）+ 组件 type/props/on 速查表        |
| `references/ui-element-plus.md` | Element Plus：运行态差异（label/option/validate）+ 组件 type/props/on 速查表   |

## 如何使用本技能

1. **通读**：直接读 **`AGENTS.md`**（完整参考全文）。
2. **按需**：按 Quick Reference 打开 1～2 个 `rules/*.md`，不必一次打开全部。
3. **口径校验**：遇到“字段/方法签名不确定”时，用 `references/types.md` 对齐；与示例冲突时以 types 为准。
4. **UI 专题**：当用户明确 UI 栈（如 Ant Design Vue）时，优先打开对应的 `references/ui-<ui>.md`（示例：`references/ui-ant-design-vue.md`）。

## 输出模板（回答使用类问题时）

1. 明确场景（**优先组件模式** / create 方法 / 子表单）。
2. 给出最小可运行代码片段（组件名与当前 UI 栈一致）。
3. 说明调用时机（如 `onMounted` 后再用 api）。
4. 若涉及持久化，强调 `parseJson`/`toJson`。
5. 若用户实际在用 **fc-designer**，提示设计器侧 API 见 **FcDesigner使用助手**。
