# UI 栈与包名（stack）

本文件用于快速对齐「用户说的 UI 栈」与「对应的 `@form-create/*` 渲染器包」，并提醒跨栈差异与回答自检。

---

## UI 栈与 rule.props 约定（运行时）

FormCreate 各 `@form-create/*` 渲染器对应不同组件库；**同一条 rule 不能跨栈混用**。下表便于回答时快速对齐「用户说的名字」与「npm 包/组件前缀」。

| 常见称呼 | 渲染器包（Vue3 常见主线） | 组件 / props 风格 |
|----------|---------------------------|-------------------|
| **Element Plus** | `@form-create/element-ui@^3` | `el-input`、`el-form`；props 与 Element Plus 文档一致 |
| **Element UI**（Vue2） | `@form-create/element-ui@^2.x` | `el-*` 与 Element UI 2.x 一致 |
| **Ant Design Vue** | `@form-create/ant-design-vue@^3` | `a-input`、`a-form`；注意 `v-model`/`value` 与事件名与 ant-design-vue 一致 |
| **Naive UI** | `@form-create/naive-ui@^3` | `n-input`、`n-form` |
| **Arco Design** | `@form-create/arco-design@^3` | Arco Vue 组件名 |
| **TDesign** | `@form-create/tdesign@^3` | TDesign Vue Next 组件名 |
| **Vant**（移动端） | `@form-create/vant@^3` | `van-field`、`van-form` 等 |

---

## 设计器与可视化包名（提示）

若问题涉及 **拖拽设计器** 包名与栈的对应，安装与选型见 **FormCreate安装助手**：

- Element 系设计器：`@form-create/designer`
- Ant Design Vue：`@form-create/antd-designer`
- 移动端 Vant：`@form-create/vant-designer`

FcDesigner Pro / 本地 dist 不在此表，见 **FcDesigner安装助手**。

---

## 回答时的自检

1. 用户是否说明 UI 栈？未说明时应先确认或声明默认前提。
2. 示例中的组件标签、props、事件是否与该栈一致？
3. 是否误将「Element Plus」写成「element-ui 包」导致 Vue 版本错配？（Vue3 用 `@form-create/element-ui@^3` + `element-plus`。）

