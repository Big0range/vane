# api 获取、事件与方法速查（api）

本文件聚焦“怎么拿到 api、常见事件、常用方法分类、extendApi 与全局方法”，用于快速回答运行时操作类问题。

---

## FormCreate 实例 API 概览

`api` 通过 `v-model:api`、`formCreate.create` 返回值、或 `formCreate.getApi('name')`（与 `<form-create name="...">` 配合）获取。子表单拥有 **独立** `api`，需 `getSubForm(field)` 分别操作。

### 获取方式摘要

| 方式 | 说明 |
|------|------|
| `v-model:api` | 组件内 `const api = ref(null)`，`onMounted` 后可用 |
| `formCreate.create(rules, opt)` | 返回即为 api |
| `formCreate.getApi('formName')` | 需组件设置 `name` |
| 事件注入 | `rule` 上 `inject: true`，回调参数含 `inject.api` |

#### 事件注入参数（示意）

```ts
type InjectArg = {
  api: API;
  rule: Rule[];
  self: Rule;
  option: object;
  inject: any;
  args: any[];
};
```

#### 自定义组件注入

在自定义组件 props 中使用 `formCreateInject`：

- `formCreateInject.api`
- `formCreateInject.options`
- `formCreateInject.rule`
- `formCreateInject.field`

---

## 表单事件（组件监听）

通过组件上的 `@` 事件监听表单生命周期与字段变化。

常见事件与签名（以 v3 文档口径为准）：
- `change(field, value, rule, api, setFlag)`
- `created(api)`
- `mounted(api)`
- `reload(api)`（调用 `api.reload()` 后）
- `submit(formData, api)`（点击提交或调用 `api.submit()`）
- `remove-field(field, rule, api)`
- `remove-rule(rule, api)`
- `repeat-field(rule, api)`（重复 `field` 检测）
- `emit-event(emitName, ...args)`（自定义组件触发）
- `validate-fail(e, api)`
- `validate-field-fail(e, api)`（字段校验失败）
- `control(rule, api)`（联动控制显示/隐藏变化）

小例子（组件模式）：

```vue
<form-create :rule="rule" @mounted="onMounted" @change="onChange" />
```

---

## 方法分类

#### 按钮

- `api.btn.loading(boolean)` / `disabled` / `show`
- `api.resetBtn.loading` / `disabled` / `show`
- `api.submitBtnProps(props)` / `resetBtnProps(props)`

#### 数据

- `api.getValue(field)`、`api.setValue(field, value)`、`api.setValue(obj)`、`api.coverValue(obj)`、`api.formData()`

#### 结构

- `api.reload(rules)`、`api.updateRule(...)`、`api.mergeRule`/`mergeRules`、`api.getRule(id, origin?)`
- `api.append(rule, field?)` / `api.prepend(rule, field?)`（插入规则；可选 `field` 表示插入到指定字段/容器内）
- `api.removeField` / `removeRule`、`api.fields()`、`api.model()`、`api.component()`（参数可用 `rule.field` 或 `rule.name` 标识）

#### 显隐与禁用

- `api.hidden` / `api.display` / `api.disabled`（可带 field）

#### 校验

- `api.validate()`、`api.validateField(field)`、`api.updateValidate` / `updateValidates`
- `api.clearValidateState`、`api.refreshValidate`
- `api.validate()` / `api.validateField()` 在 FormCreate v3（Vue3）中通常返回 Promise，建议 `then/catch` 处理。
- `validateField` 在部分版本/示例中也支持数组参数（如 `api.validateField(['field1'])`），以你的实际运行版本为准。

#### 表单动作

- `api.submit(success?, fail?)`、`api.onSubmit(fn)`、`api.resetFields`
- `api.refresh()`、`api.updateOptions`、`api.changeStatus` / `clearChangeStatus`

#### 远程与外部数据

- `api.fetch(opt)`（配合规则里 `effect.fetch` 等）
- `api.setData(id, value)`、`api.getData(id, default?)`、`api.refreshData(id)`、`api.watchData`

#### 事件总线

- `api.bus.$emit` / `$on` / `$once` / `$off`
- `api.emit` / `on` / `once` / `off`（表单级自定义事件）

#### 其他

- `api.el(id)`、`api.exec` / `method`、`api.trigger`（`api.el` 获取到的组件实例可按组件实现调用方法，如 `focus()`/`show()`）
- `api.toJson()`（规则序列化，仍建议与包级 `formCreate.toJson` 配合使用）
- `api.nextTick(fn)`、`api.nextRefresh`
- `api.getSubForm(field)` → 子表单 api
- `api.parent` / `api.top` / `api.children`（嵌套结构）

当你用 `api.el(field).$emit(...)` / `api.el(field).$on(...)` 这类方式“手动触发/监听组件事件”时，要保证**事件名与参数形态**和 UI 组件一致；跨栈差异很大。能用 `api.trigger` 的场景优先用 `api.trigger`。

如果目标组件是 Vue3 的 `setup` 写法：需要用 `defineExpose` 把内部方法暴露出去，否则外部通过 `api.exec` / `api.method` 调用不到该方法。

---

## extendApi 扩展

```javascript
import formCreate from '@form-create/element-ui';

formCreate.extendApi((api) => {
  api.myMethod = function () {
    console.log('custom');
  };
});
```

在大型项目中可用于统一注入请求、消息等方法。

---

## FormCreate 全局方法（常用清单）

下列方法由各栈 `@form-create/*` 导出的 `formCreate` 提供（不同版本可能略有差异）。

- **创建/获取表单**：`formCreate.create(rules, option)`、`formCreate.getApi(name)`
- **规则拷贝**：`formCreate.copyRules(rules)`、`formCreate.copyRule(rule)`
- **序列化**：`formCreate.toJson(value)`、`formCreate.parseJson(json)`、`formCreate.parseFn(fnString)`
- **组件/指令/别名**：`formCreate.component(name, component?)`、`formCreate.componentAlias(map)`、`formCreate.directive(name, directive)`
- **双向绑定字段**：`formCreate.setModelField(componentName, propName)`（自定义组件双向绑定字段名，默认常见为 `modelValue`）
- **共享数据**：`formCreate.setData(name, value)`、`formCreate.getData(name)`、`formCreate.removeData(name)`、`formCreate.refreshData(name)`、`formCreate.setDataDriver(id, fn)`
- **扩展**：`formCreate.register(nameOrEffect, effect?)`、`formCreate.extendApi(fn)`、`formCreate.factory()`

---

## 共享数据（`@form-create/data` 示例：省市区联动）

如果你需要通用的省市区联动数据，可使用 `@form-create/data`。

```bash
npm i @form-create/data
```

```js
import province_city from '@form-create/data/dist/province_city.js';
// 省市二级联动数据：province_city
```

访问方式（示意）：

```js
formCreate.data?.province_city;
// 或浏览器环境：window.province_city
```

