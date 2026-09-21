# 保存 / 回显与 JSON 序列化（data）

本文件用于回答“规则/配置怎么保存到后端、怎么回显、为什么不能直接 JSON.parse/stringify”的问题。

---

## 规则与配置的 JSON 序列化

FormCreate 规则与选项可能包含 **函数、循环引用或特殊类型**，不能简单用 `JSON.stringify` / `JSON.parse` 作为唯一手段。

---

## 推荐 API

使用当前栈导出的 `formCreate` 实例上的方法（各 `@form-create/*` 包均提供）：

```javascript
import formCreate from '@form-create/element-ui';

// 从后端字符串恢复为可赋值的 rule / option
const rules = formCreate.parseJson(ruleJsonString);
const options = formCreate.parseJson(optionsJsonString);

// 保存到后端
const ruleStr = formCreate.toJson(designerApi.getRule()); // 若从设计器取规则
const optStr = formCreate.toJson(api.getOptions?.() ?? option);
```

组件场景下常见写法：

```javascript
const rule = formCreate.parseJson(jsonFromServer);
const option = formCreate.parseJson(optionJson);
// 再交给 <form-create :rule="rule" :option="option" />
```

或使用 api：

```javascript
api.reload(formCreate.parseJson(jsonString));
```

---

## 与「直接 JSON」的区别

| 方式 | 说明 |
|------|------|
| `JSON.parse` | 无法恢复规则里的函数、部分内置结构，易导致运行期静默失败 |
| `parseJson` | FormCreate 提供的安全反序列化，与版本解析逻辑一致 |

---

## 实践建议

- 后端存储 **字符串**（ruleJson、optionsJson），前端读写一律走 `parseJson`/`toJson`。
- 弹窗内复用规则前做 **深拷贝**，避免多处引用同一对象导致污染（文档常见建议）。

---

## v2 到 v3 升级要点（常见）

- **Vue 主版本**：v3 基于 Vue3；v2 常见于 Vue2.7。
- **双向绑定**：`value.sync` → `v-model`；实例绑定使用 `v-model:api`。
- **Promise 化**：`validate` / `validateField` / `submit` 等在 v3 中常见返回 `Promise`，建议 `then/catch` 处理。
- **移除/合并项（方向性）**：`attrs`、`domProps`、`nativeOn`、`nativeEmit` 等在 Vue3 生态中不再单独区分；插槽改用统一的 slots 体系。
- **不支持项**：v3 不再支持 `iview`（View UI）；以当前版本支持的 UI 栈为准。

---

## parseFn（函数序列化/反序列化）

当你的后端把 **函数体** 作为字符串存储（例如规则里的 `on` / `hook` 回调由后端下发），需要先用 `formCreate.parseFn(fnString)` 把字符串恢复为可执行的 `Function`。

```javascript
import formCreate from '@form-create/element-ui';

// 后端返回的函数字符串示例（实际内容以你的后端下发为准）
const fnString = `function (formData) { console.log(formData) }`;

const onSubmit = formCreate.parseFn(fnString);
const option = { onSubmit };
```

