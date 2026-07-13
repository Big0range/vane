# option 全局配置速查（option）

本文件汇总 `option` 的常用字段、提交忽略策略、`option.global` 的默认 props/布局用法，以及自定义提交/重置按钮的最小写法。

---

## option 全局配置速查

通过 `<form-create :option="option" />` 或 `formCreate.create(rule, option)` 传入。

### 常用项

| 属性 | 作用 |
|------|------|
| `form` | 根表单组件属性（`labelWidth`、`size` 等，随 UI 栈变化） |
| `formData` | 初始值（非 v-model 双向时的初始化） |
| `onSubmit` | `(formData, api) => void` 提交回调 |
| `beforeSubmit` | 提交前，可返回 false/Promise 拦截 |
| `mounted` | `(api) => void` 表单创建完成 |
| `reload` | `(api) => void` 调用 `api.reload` 后 |
| `onValidateFail` | 校验失败 |
| `global` | 按组件类型设置默认 props（如统一 `input` 的 `clearable`） |
| `injectEvent` | 全局开启或定制事件注入 |
| `preview` | 预览模式 |
| `validateOnSubmit` | 提交前是否自动校验，默认 true |
| `ignoreHiddenFields` | 提交是否忽略隐藏字段 |
| `appendValue` / `forceCoverValue` | 与 v-model 合并行为相关（是否保留/覆盖未在规则中定义的字段值） |
| `submitBtn` / `resetBtn` | 提交/重置按钮配置，`show: false` 隐藏 |
| `beforeFetch` | 统一修改 `api.fetch` 请求配置（如加 token） |
| `language` | 多语言文案映射 |

---

## 提交时忽略字段

- `ignoreHiddenFields`：提交时是否忽略所有 `hidden=true` 的字段
- `rule.ignore`：对单字段的提交忽略策略
  - `true`：无论是否隐藏，提交时都忽略该字段
  - `'hidden'`：仅当字段处于隐藏状态时，提交时才忽略

示例：

```js
const rule = {
  type: 'input',
  field: 'temporaryField',
  hidden: true,      // 可动态改变
  ignore: 'hidden',  // 或 ignore: true
};
```

关于合并/注入行为的常见要点：
- `injectEvent`：可以为 `Boolean`（如 `true`）或 `Object`（用于自定义注入的事件名与处理逻辑）。
- `appendValue` / `forceCoverValue`：常见含义：`forceCoverValue=true` 强制覆盖“未在 rule 定义”的字段值；`appendValue=true` 保留“未在 rule 定义”的 v-model 值（是否随提交带上取决于实现口径）。
- `beforeFetch`：可用于统一追加请求头/参数；部分版本支持返回 `Promise`（需要异步获取 token 等场景）。

各 UI 栈对 `form` 内字段名可能不同（如 Element 的 `labelPosition` 与 Antd 的 `layout`），需对照目标 UI 文档。

---

## `option.global` 示例（统一默认 props/布局）

```js
const option = {
  global: {
    // `*` 表示对所有组件生效（字段以版本实现为准）
    '*': {
      props: {
        // 例：全局禁用
        disabled: true,
      },
      // 例：统一 col 布局
      col: { span: 12 },
    },
    // 也可以只对某一类组件生效
    upload: {
      props: {
        onError() {
          alert('上传失败');
        },
        onSuccess(file) {
          // 不同上传组件/栈返回结构不同，这里仅表达“把 response 写回 url 以回显”
          file.url = file.response?.url;
        },
      },
    },
  },
};
```

---

## 最小示例

```javascript
const option = {
  onSubmit(formData, api) {
    console.log(formData);
  },
  form: {
    labelWidth: '120px',
  },
  submitBtn: { show: true, innerText: '提交' },
  resetBtn: { show: true },
};
```

---

## `submitBtn` / `resetBtn`（`click(api)` 回调）

当你在全局 `option` 里配置按钮时，可以为按钮加上 `click` 回调；回调参数会拿到当前表单的 `api`，你可以在里面调用 `api.submit()` / `api.resetFields()` 等方法：

```js
const option = {
  submitBtn: {
    show: true,
    innerText: '自定义按钮',
    click(api) {
      api.submit();
    },
  },
  resetBtn: {
    show: true,
    innerText: '自定义重置',
    click(api) {
      api.resetFields();
    },
  },
};
```

