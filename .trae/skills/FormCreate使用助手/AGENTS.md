# FormCreate使用助手

**版本** 1.1.0

form-create / FormCreate 技能维护

> **说明：**
> 本文档供 Agent 在回答运行态（`<form-create>` / `formCreate.create`）规则、option、实例 API 与排障问题时一次性加载；人可读，结构优先服务于回答一致性。字段与方法签名以本文档为口径，运行时常见问题见第 12 节 FAQ。

---

## 目录

- [1. 目标与范围](#1-目标与范围)
- [2. 快速开始](#2-快速开始)
- [3. 获取与使用 api](#3-获取与使用-api)
- [4. 典型代码片段](#4-典型代码片段)
- [5. 与 FcDesigner 的边界](#5-与-fcdesigner-的边界)
- [6. 参考文件](#6-参考文件)
- [7. 运行时技术参考（合并稿）](#7-运行时技术参考合并稿)

---

## 1. 目标与范围

**覆盖**：`<form-create>` 组件模式、`formCreate.create` 全局方法、`rule`/`option` 结构、实例 `api` 的常用方法、事件注入、`formCreateInject`、`extendApi`、父子表单与子表单 `getSubForm`。

**不覆盖**：`fc-designer` 的 `setRule`/`getJson`/`config` 全表（见 **FcDesigner使用助手**）；npm 包安装（见 **FormCreate安装助手**）。

---

## 2. 快速开始

**组件模式（Vue3 + 任意已挂载栈）**：

```vue
<template>
  <form-create
    v-model="formData"
    v-model:api="formApi"
    :rule="rules"
    :option="option"
  />
</template>

<script setup>
import { ref } from 'vue';
const formData = ref({});
const formApi = ref(null);
const option = ref({
  onSubmit(fd) {
    console.log(fd);
  },
});
const rules = ref([
  { type: 'input', field: 'username', title: '用户名', value: '' },
  { type: 'input', field: 'password', title: '密码', props: { type: 'password' }, value: '' },
]);
</script>
```

**全局方法 `formCreate.create`**（需 `option.el` 指定挂载节点；`import` 的 `formCreate` 与当前 UI 栈一致）：

```javascript
const root = document.getElementById('form');
const fApi = formCreate.create(
  [{ type: 'input', field: 'goods_name', title: '商品名称' }],
  {
    el: root,
    resetBtn: true,
    onSubmit(formData) {
      console.log(formData);
    },
  }
);
```

---

## 3. 获取与使用 api

- 组件：`v-model:api`，在 **`onMounted`** 之后 `formApi.value` 可用。
- `formCreate.getApi('name')`：与模板里 `<form-create name="form" />` 配合。
- 规则事件：设置 `inject: true`，从回调参数取 `inject.api`。

方法分类、表单事件、`extendApi`、`parseJson`/`toJson`、Rule/option 全量字段、多 UI 栈对照、联动与校验等见 **第 7 节**。

**禁用整表示例**（按钮标签请按当前栈替换：Element `el-button`、Ant Design Vue `a-button`、Naive `n-button`、Vant `van-button` 等）：

```vue
<template>
  <form-create v-model:api="api" :rule="rule" />
  <el-button @click="api && api.disabled(true)">禁用表单</el-button>
</template>
```

---

## 4. 典型代码片段

### 4.1 提交前校验

```javascript
formApi.value.validate().then(() => {
  const formData = formApi.value.formData();
  console.log(formData);
});
```

### 4.2 修改字段值

```javascript
formApi.value.setValue('fieldName', 'newValue');
formApi.value.setValue({ a: 1, b: 2 });
```

### 4.3 读取规则

```javascript
const r = formApi.value.getRule('field');
```

### 4.4 事件注入（blur）

```javascript
const rule = {
  type: 'input',
  field: 'inputField',
  title: '输入框',
  inject: true,
  on: {
    blur(inject) {
      inject.api.setValue('inputField', 'blurred');
    },
  },
};
```

### 4.5 extendApi

```javascript
formCreate.extendApi((api) => {
  api.log = (msg) => console.log(msg);
});
```

### 4.6 后端加载规则

```javascript
import formCreate from '@form-create/element-ui';

async function load() {
  const { ruleJson, optionJson } = await fetch('/api/form').then((r) => r.json());
  rules.value = formCreate.parseJson(ruleJson);
  option.value = formCreate.parseJson(optionJson);
}
```

`import` 的包名须与项目 UI 栈一致（如 Ant Design Vue 用 `@form-create/ant-design-vue`）。

---

## 5. 与 FcDesigner 的边界

| 场景 | 使用技能 |
|------|----------|
| 仅 `<form-create>` / `formCreate.create` | **FormCreate使用助手**（本文档） |
| `<fc-designer>`、`getJson`、`openPreview`、`addComponent` | **FcDesigner使用助手** |
| 安装 `@form-create/*` 包 | **FormCreate安装助手** |

设计器导出的规则落地渲染时，使用 `parseJson` 与 `api`；设计器专属 API 见 **FcDesigner使用助手**。

---

## 6. 参考文件

无

---

## 7. 运行时技术参考（合并稿）

### UI 栈与 rule.props 约定（运行时）

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

### 设计器与可视化包名

若问题涉及 **拖拽设计器** 包名与栈的对应，安装与选型见 **FormCreate安装助手**：

- Element 系设计器：`@form-create/designer`
- Ant Design Vue：`@form-create/antd-designer`
- 移动端 Vant：`@form-create/vant-designer`

FcDesigner Pro / 本地 dist 不在此表，见 **FcDesigner安装助手**。

### 回答时的自检

1. 用户是否说明 UI 栈？未说明时应先确认或声明默认前提。
2. 示例中的组件标签、props、事件是否与该栈一致？
3. 是否误将「Element Plus」写成「element-ui 包」导致 Vue 版本错配？（Vue3 用 `@form-create/element-ui@^3` + `element-plus`。）

### option 全局配置速查

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

### 提交时忽略字段

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

### `option.global` 示例（统一默认 props/布局）

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

### 最小示例

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

### `submitBtn` / `resetBtn`（`click(api)` 回调）

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

### 规则与配置的 JSON 序列化

FormCreate 规则与选项可能包含 **函数、循环引用或特殊类型**，不能简单用 `JSON.stringify` / `JSON.parse` 作为唯一手段。

### 推荐 API

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

### 与「直接 JSON」的区别

| 方式 | 说明 |
|------|------|
| `JSON.parse` | 无法恢复规则里的函数、部分内置结构，易导致运行期静默失败 |
| `parseJson` | FormCreate 提供的安全反序列化，与版本解析逻辑一致 |

### 实践建议

- 后端存储 **字符串**（ruleJson、optionsJson），前端读写一律走 `parseJson`/`toJson`。
- 弹窗内复用规则前做 **深拷贝**，避免多处引用同一对象导致污染（文档常见建议）。

### v2 到 v3 升级要点（常见）

- **Vue 主版本**：v3 基于 Vue3；v2 常见于 Vue2.7。
- **双向绑定**：`value.sync` → `v-model`；实例绑定使用 `v-model:api`。
- **Promise 化**：`validate` / `validateField` / `submit` 等在 v3 中常见返回 `Promise`，建议 `then/catch` 处理。
- **移除/合并项（方向性）**：`attrs`、`domProps`、`nativeOn`、`nativeEmit` 等在 Vue3 生态中不再单独区分；插槽改用统一的 slots 体系。
- **不支持项**：v3 不再支持 `iview`（View UI）；以当前版本支持的 UI 栈为准。

### parseFn（函数序列化/反序列化）
当你的后端把 **函数体** 作为字符串存储（例如规则里的 `on` / `hook` 回调由后端下发），需要先用 `formCreate.parseFn(fnString)` 把字符串恢复为可执行的 `Function`。

```javascript
import formCreate from '@form-create/element-ui';

// 后端返回的函数字符串示例（实际内容以你的后端下发为准）
const fnString = `function (formData) { console.log(formData) }`;

const onSubmit = formCreate.parseFn(fnString);
const option = { onSubmit };
```

### FormCreate 实例 API 概览

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

### 表单事件（组件监听）
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

### 方法分类

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

### extendApi 扩展

```javascript
import formCreate from '@form-create/element-ui';

formCreate.extendApi((api) => {
  api.myMethod = function () {
    console.log('custom');
  };
});
```

在大型项目中可用于统一注入请求、消息等方法。

### FormCreate 全局方法（常用清单）

下列方法由各栈 `@form-create/*` 导出的 `formCreate` 提供（不同版本可能略有差异）。

- **创建/获取表单**：`formCreate.create(rules, option)`、`formCreate.getApi(name)`
- **规则拷贝**：`formCreate.copyRules(rules)`、`formCreate.copyRule(rule)`
- **序列化**：`formCreate.toJson(value)`、`formCreate.parseJson(json)`、`formCreate.parseFn(fnString)`
- **组件/指令/别名**：`formCreate.component(name, component?)`、`formCreate.componentAlias(map)`、`formCreate.directive(name, directive)`
- **双向绑定字段**：`formCreate.setModelField(componentName, propName)`（自定义组件双向绑定字段名，默认常见为 `modelValue`）
- **共享数据**：`formCreate.setData(name, value)`、`formCreate.getData(name)`、`formCreate.removeData(name)`、`formCreate.refreshData(name)`、`formCreate.setDataDriver(id, fn)`
- **扩展**：`formCreate.register(nameOrEffect, effect?)`、`formCreate.extendApi(fn)`、`formCreate.factory()`

### 共享数据（`@form-create/data` 示例：省市区联动）

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

### UI 栈差异

`props` 内字段名、事件名随 **Element / Antd / Naive / Arco / TDesign / Vant** 变化；回答时须与用户当前渲染栈一致，勿默认 `el-` 或 `a-` 前缀。

### Rule 与 option 核心结构

### Rule（组件生成规则）

单条规则描述一个表单项或容器；多条规则组成 `Rule[]`。

```ts
// 结构示意（字段以实际版本为准）
type Rule = {
  type: string;           // 组件类型，如 input、select、fcRow
  field?: string;         // 绑定字段名
  name?: string;         // 具名引用，便于 getRefRule
  title?: string | object;        // 标签文案/渲染型标题
  value?: any;           // 默认值
  // 提示信息（帮助文案/说明），支持字符串或“渲染型对象”
  info?: string | object;
  // 自定义组件双向绑定字段名（默认常见为 `modelValue`；需要时用规则覆盖或全局 setModelField）
  modelField?: string;
  props?: Record<string, any>;  // 透传给 UI 组件
  // 标签宽度（当渲染器支持 FormItem wrap 口径时，可用于字段级 labelWidth）
  wrap?: {
    labelWidth?: string | number;
    // label 列布局（常见用于网格布局）
    labelCol?: { span?: number; offset?: number; [k: string]: any };
    labelAlign?: string;
  };
  style?: string | object;
  class?: string | string[];
  on?: Record<string, Function | Function[]>;
  hook?: Record<string, Function | Function[]>;
  validate?: object[];
  options?: any[];       // select/radio 等选项
  hidden?: boolean;
  display?: boolean;
  // 提交时忽略字段：true=永远忽略；'hidden'=仅当字段处于隐藏状态时忽略
  ignore?: boolean | 'hidden';
  inject?: boolean | object;
  children?: Rule[];    // 嵌套子组件
  control?: any[];      // 联动
  computed?: object;    // 计算属性
  effect?: object;      // 含 fetch 等副作用配置
  // ...
};
```

### `rule.wrap.labelWidth`（标签宽度）

当渲染器/栈把“标签宽度”拆到字段级 wrap 口径时，你可以在规则上使用：

```js
{
  type: 'input',
  field: 'name',
  wrap: { labelWidth: '150px' },
}
```

用于细粒度控制表单项标签宽度（不同字段可不同）。

### `rule.wrap.labelCol`（标签列布局）

当你的渲染器/栈提供 `labelCol`（常见用于网格布局）时，可以在字段规则上使用：

```js
{
  type: 'input',
  field: 'field1',
  title: 'field1',
  wrap: {
    labelCol: { span: 12, offset: 0 },
    labelAlign: 'left',
  },
}
```

### `rule.info`（帮助/提示信息）

字段规则的 `info` 常用于渲染“帮助文案/提示信息”。常见形式：

- `info: string`：直接渲染文本
- `info: object`：按渲染器口径渲染（例如对齐方式）
- `info: { native: true, children: [...] }`：渲染“原生内容”（例如用 `span` + `innerHTML` 生成富文本）

示例（字符串/对象）：

```js
{
  type: 'input',
  field: 'field1',
  title: 'field1',
  info: 'info.....',
}

{
  type: 'input',
  field: 'field2',
  title: 'field2',
  info: { info: 'info.....', align: 'left' },
}
```

示例（native + children，来自信息提示富内容场景）：

```js
{
  type: 'input',
  field: 'field2',
  title: 'field2',
  info: {
    native: true,
    children: [
      {
        type: 'span',
        props: {
          innerHTML: '帮助文档：<a target="_blank" href="https://form-create.com/v3/guide/control">...</a>',
        },
      },
    ],
  },
}
```

### `rule.style`（组件宽度/样式）

字段规则里的 `rule.style` 会透传到对应组件/容器，因此可用于直接控制宽度：

```js
{
  type: 'input',
  field: 'name',
  style: { width: '300px', backgroundColor: '#f0f0f0' },
}
```

### `rule.modelField`（自定义组件双向绑定字段名）

当规则 `type` 指向自定义组件时，如果组件的 v-model prop 不是默认约定（常见为 `modelValue`），可以在规则里指定 `modelField`：

```js
{
  type: 'my-tabs',
  field: 'activeKey',
  value: '2',
  modelField: 'activeKey',
}
```

也可以使用全局映射：`formCreate.setModelField(componentName, propName)`。

### `rule.title`（标题渲染）

`rule.title` 常见为字符串；在部分渲染器/栈也支持“渲染型标题”（对象形式），用于自定义标题样式/内容。例如：

```js
{
  type: 'input',
  field: 'field',
  title: {
    style: 'color:red',
    title: 'field',
  },
}
```

也可以使用 `native: true` 直接渲染子节点（例如在标题里放按钮/图标）：

```js
{
  type: 'input',
  field: 'field',
  title: {
    native: true,
    children: [
      {
        type: 'button',
        children: ['自定义'],
        on: { click() { alert('点击了按钮') } },
      },
    ],
  },
}
```

### 布局容器（`row` / `col`）与网格

当你的渲染器支持网格布局时，可以在规则里使用 `type: 'row'` / `type: 'col'` 组织布局，并在 `col.props` 里设置 `span`（以及可选的 `offset`）。

示例（row/col 容器嵌套，来自布局示例）：

```js
{
  type: 'row',
  style: { width: '100%' },
  native: true,
  children: [
    {
      type: 'col',
      props: { span: 12 },
      native: true,
      children: [
        {
          type: 'datePicker',
          title: '活动日期',
          field: 'section_day',
          wrap: {
            labelCol: { span: 8 },
          },
        },
      ],
    },
  ],
}
```

另外也可在“字段规则”上直接用 `col` 控制列宽（例如 `col: { span: 12 }`、`col: { span: 8, offset: 8 }`）。

### `group` 子表单（嵌套/多实例）

当你需要在一个主表单内渲染多个“同结构的子表单实例”时，可以使用 `type: 'group'`：

- 子规则通常放在 `props.rule` 中
- 依赖注入时可在按钮/自定义组件规则上设置 `inject: true`，回调里用 `inject.api` 访问当前 group 的索引/同级实例集合等（例如 `inject.api.siblings`）

示例（来自 group demo 的核心点）：

```js
{
  type: 'group',
  field: 'group',
  title: '子表单',
  props: {
    rule: [
      {
        type: 'button',
        native: false,
        inject: true,
        on: {
          click(inject) {
            alert(inject.api.index);
          },
        },
        children: ['查看'],
      },
    ],
  },
}
```

当你在代码里**动态修改** `rule`/`options`（例如改变 `value/options/hidden/props`）时，建议把 `rule`/`option(s)` 用 `ref` 包起来以保持 Vue 响应式；否则可能出现“数据改了但界面不刷新”的情况。需要强制落地时可改用 `api.reload` / `api.updateRule` / `api.mergeRule` 触发重渲染。

### 自定义组件注册与异步组件

当内置 `type` 不满足需求时，可以把任意 Vue 组件注册为表单组件，再在规则中用 `type` 引用。

```js
import MyCustomComponent from './MyCustomComponent.vue';

formCreate.component('MyCustomComponent', MyCustomComponent);

const rules = [
  { type: 'MyCustomComponent', field: 'custom_field', title: '自定义组件' },
];
```

也可以在规则里直接传入异步组件（适合按需加载）：

```js
const dynamicComponent = () => import('./CustomComponent.vue');

const rules = [
  { component: dynamicComponent, field: 'custom_field', title: '自定义组件' },
];
```

### 常见运行时错误排查（非挂载/类型不符）

常见现象与排查要点（基本都能归结到“组件未注册/未挂载”或“规则结构类型不符合预期”）：

- `Unknown custom element: <formcreate> did you register the component correctly?`  
  - 通常是自定义组件没在渲染前注册：请在业务入口提前执行 `formCreate.component('xxx', Xxx)` 或 `app.component('xxx', Xxx)`，并确保规则里的 `type` 与注册名一致。
- `Invalid attempt to spread non-iterable instance`  
  - 通常是规则里某个字段/选项被期望为数组但实际是 `null` / `undefined` / 非数组；重点检查 `options`、`children`、`value`（如果组件内部会对其做展开）是否在渲染前为数组。
- `Cannot read properties of null (reading 'props')`  
  - 常见于组件实例/注入在渲染前就被访问：尽量把依赖 `formCreateInject` / `props` 的逻辑放到组件 `mounted`/`setup` 后再触发；并确保传入的自定义组件确实被 FormCreate 正确渲染到 DOM。

### `prefix` / `suffix`（前后缀）
在规则上使用 `prefix` / `suffix` 为组件添加前缀与后缀内容：
- `prefix: string | VNodeData`
- `suffix: string | VNodeData`

示例：
```js
const rules = [
  {
    type: 'input',
    field: 'price',
    title: '价格',
    prefix: '¥',
    suffix: '元',
  },
];
```

### `slot` / `children` / `renderSlots`（插槽与插入内容）
常见用法：
- `children` 既可用于默认内容，也可配合子规则的 `slot` 指定插槽区域
- 子规则使用 `slot: 'prepend' | 'append' | 'prefix' | 'suffix' | ...` 来决定插入位置
- 需要更动态的插槽时可以用 `renderSlots`

示例（input 前后缀）：
```js
{
  type: 'span',
  slot: 'prefix',
  children: ['prefix'],
}
```

当规则使用 `renderSlots`（渲染型插槽）时，通常传入一个对象，键名对应不同插槽区域，值为函数；函数参数通常是 `scope`（包含当前规则/值/回调等信息，按具体组件口径为准）。例如：

```js
{
  type: 'input',
  field: 'input',
  title: '插槽',
  renderSlots: {
    prefix(scope) {
      return h('span', {}, ['prefix']);
    },
    suffix(scope) {
      return h('span', {}, ['suffix']);
    },
    default(scope) {
      return h('span', {}, ['default']);
    },
  },
}
```
### 插槽组件（`slot-component` 渲染命名）

当你使用“插槽方式渲染组件”（slot-component）时，FormCreate 会根据规则生成 slots 名称，通常为：

- `type-${rule.type}`：对应“按组件类型渲染”的插槽
- `field-${rule.field}`：对应“按字段渲染”的插槽

并会把 `scope`（如 `rule/prop/children/model` 等，具体字段随版本为准）注入到插槽内容中。

示例（给 input 填入 `prepend` 插槽）：
```js
const rule = {
  type: 'input',
  field: 'email',
  title: '邮箱',
  children: [
    { type: 'span', slot: 'prepend', children: ['@'] },
  ],
};
```

### `frame`（嵌入子页面选择器）

`frame` 常用于“弹层/iframe 里选素材、文件、图片，再回填到表单字段”的场景。常见规则形态：

```js
const rules = [
  {
    type: 'frame',
    title: '素材',
    field: 'fodder',
    value: [],
    props: {
      type: 'image', // input | file | image（以实际实现为准）
      src: 'iframe.html',
      maxLength: 2,
      helper: true,
    },
    validate: [
      { required: true, type: 'array', min: 1, message: '请至少选择一项', trigger: 'change' },
    ],
  },
];
```

当 `props.helper: true` 时，子页面通常会获得一个助手对象（文档中为 `form_create_helper`），常用能力：

- `form_create_helper.api`：访问父表单 api（只读/调用方法）
- `form_create_helper.get(field)`：读取当前 frame 字段值
- `form_create_helper.set(field, value)`：回填当前 frame 字段值
- `form_create_helper.close(field)`：关闭当前 frame 弹层

此外，父页面也可以用 `api.closeModal(field)` 主动关闭指定 `frame` 组件弹层。

### 多语言 `$t`（标题/校验/必填等）
通过 `option.language` 配置语言映射后，在规则的 `title` / `info` / `validate.message` / `$required` 等位置可使用 `{{$t.xxxId}}`。

示例：
```js
const option = {
  language: {
    'zh-cn': { A1: '商品名称' },
    en: { A1: 'Goods name' },
  },
};

const rules = [
  {
    type: 'input',
    field: 'name',
    title: '{{$t.A1}}',
    $required: '{{$t.A1}}',
  },
];
```

切换语言：
- 组件模式下可以用 `<form-create :locale="locale" />` 或 `<form-create :t="tFn" />`（按你的 i18n 工具接入方式选择）。

### `formCreateInject.slots()`（自定义组件读取表单插槽）
当你需要在自定义组件内部渲染表单插槽内容，可使用注入的 `formCreateInject.slots()`：

表单侧：
```vue
<form-create :rule="rule" v-model:api="api">
  <template #content="scope">
    <div>{{ scope }}</div>
  </template>
</form-create>
```

自定义组件侧：
```vue
<template>
  <div>{{ formCreateInject.slots().content('参数') }}</div>
</template>
<script setup>
defineProps({ formCreateInject: Object });
</script>
```

### `formCreateInject`（自定义组件表单上下文）

FormCreate 在生成自定义组件时，会通过 `props.formCreateInject` 注入表单上下文，常见字段包括：

- `api`：表单 API 实例
- `form`：表单创建函数
- `slots()`：获取表单插槽
- `options`：当前规则的 options
- `children`：子元素数组
- `preview`：是否预览模式
- `id`：唯一标识
- `input`：是否表单组件
- `field`：字段名
- `rule`：当前规则
- `t`：多语言函数

你可以在自定义组件中通过 `formCreateInject` **读取并修改规则/表单**（是否推荐取决于团队约束与可维护性）：

```js
// 示例：在自定义组件里修改别的字段值（更推荐用 api.setValue）
props.formCreateInject.api.setValue('input', '新的值');

// 示例：读到并修改某个规则（以 field 为例）
const inputRule = props.formCreateInject.api.getRule('input');
inputRule.value = (inputRule.value || '') + '-修改了';

// 示例：修改“自己的 rule.props”（需注意响应式与版本差异）
props.formCreateInject.rule.props.num++;
```

**注意（文档常见提示）**：

- `rule` 应用 `ref` 保持响应式，**不要**把 rule 放进会与缓存混淆的纯计算链导致更新异常。
- **不同 UI 栈的 `type` 与 `props` 不能混用**。
- 修改 `key` 可强制重挂载组件。

### option（全局配置）

与下文「option 全局配置速查」一节对照。组件模式：`<form-create :rule="rule" :option="option" />`。

### 组件模式模板

```vue
<template>
  <form-create
    v-model="formData"
    v-model:api="formApi"
    :rule="formRules"
    :option="formOption"
  />
</template>
```

- `v-model`：表单数据。
- `v-model:api`：表单 API 实例，在 `onMounted` 后可用。

### 组件 props（组件模式）
下面是常用的 `<form-create>` props（字段以渲染器版本/文档口径为准）：
- `rule`：表单生成规则
- `option`：全局配置（见下文 option 速查表）
- `v-model`：表单数据对象（双向绑定）
- `v-model:api`：表单 API（`onMounted` 后可用）
- `name`：表单唯一名称（配合 `formCreate.getApi(name)` 获取）
- `index`：表单标识变化时会清空表单数据（用于重用组件）
- `disabled`：全局禁用（优先级高于字段级 disabled）
- `subForm`：是否是子表单；嵌套时建议显式设置
- `extendOption`：子表单是否继承父表单的全局配置（如 `submitBtn`、`validateOnSubmit` 等）
- `driver`：自定义渲染逻辑/驱动（高级用法，通常用于覆盖默认渲染）
- `locale` / `t`：多语言配置
- `inFor`：用于 v-for 渲染场景的标识

子表单最小例子：
```vue
<form-create
  :rule="subRules"
  v-model="subData"
  v-model:api="subApi"
  :subForm="true"
  :extendOption="false"
/>
```

### 联动回调 `update` 与 `link`
当某个字段的值变化时，可以在目标规则上用 `update` 动态修改“其它规则”的属性/值，并用 `link` 指定触发依赖字段。

数据结构要点：
- `update(val, rule, api, origin)`：由规则引擎调用（`origin` 常见为 `init` / `change` / `link`）
- `link: string[]`：依赖哪些 `field` 的变化来触发该规则的 `update`

最小例子（根据输入决定另一个字段显隐）：
```js
const rules = [
  {
    type: 'input',
    field: 'input1',
    value: '',
    update(val, rule, api) {
      const targetRule = api.getRule('input2');
      targetRule.hidden = !val;
    },
  },
  { type: 'input', field: 'input2', title: '输入框2', hidden: true },
];
```

### `fetch` / `beforeFetch`（远程加载）
在规则上使用 `fetch` 可把远程请求结果写入组件配置（常见写入 `options` 或 `props.options`）。

最小例子（下拉选项远程加载）：
```js
const rules = [
  {
    type: 'select',
    field: 'product',
    title: '选择产品',
    fetch: {
      action: '/api/products',
      to: 'options',
      method: 'POST',
      dataType: 'json',
      data: { q: 'keyword' },
      parse: (res) => res.data.map((p) => ({ label: p.name, value: p.id })),
      onError: (e) => console.error(e),
    },
  },
];
```

全局在提交/请求前统一注入参数：使用 `option.beforeFetch(config, ctx)`。
```js
const option = {
  beforeFetch(config) {
    config.headers = config.headers || {};
    config.headers.Authorization = 'Bearer <token>';
  },
};
```

如果你需要“更底层”地重写所有请求逻辑（例如统一设置鉴权、统一处理请求失败），也可以对当前引入的 `formCreate` 实例重写 `formCreate.fetch`。但优先考虑 `option.beforeFetch`，因为它更集中且更容易维护。

### `on`（组件事件监听）与 `inject`（事件注入）
在规则上通过 `on` 监听组件内触发的事件；当需要在回调里拿到表单 `api` 等上下文，可开启 `inject: true`（或注入为对象，按你版本口径）。

最小例子（事件内用 api 更新其它字段 options）：
```js
const rules = [
  {
    type: 'select',
    field: 'category',
    title: '分类',
    inject: true,
    on: {
      change(inject, val) {
        const productRule = inject.api.getRule('products');
        const map = inject.api.getData('categoryOptions') || {};
        productRule.options = map[val] || [];
      },
    },
    options: [],
  },
];
```

### `emit`（组件 emit 事件监听）与 `emitPrefix`
当你的规则类型是“自定义组件”并且组件通过 `emit` 抛出事件时，可在规则上用 `emit: string[]` 来监听。
- 事件名里如有大写字母，会自动转换为 kebab-case 的小写形式
- `emitPrefix` 可用于拼接事件前缀（形成 `${emitPrefix}-${eventName}` 规则）

最小例子：
```js
const rule = {
  type: 'custom-component',
  field: 'customField',
  emit: ['change'],
  emitPrefix: 'custom',
};
```

### 自定义属性 `effect` 扩展（`formCreate.register`）
内置 effect 常见包括：`required`、`fetch`、`loadData`、`componentValidate`（用于组件级校验）。

如需扩展自定义 effect，可以定义 effect 生命周期函数，并通过 `formCreate.register` 注册：
```js
// 例：根据 value 动态追加 options
const optionEffect = {
  load({ value }, rule, api) {
    rule.options = [
      { label: String(value), value },
    ];
  },
};

formCreate.register('option', optionEffect);

const rules = [
  {
    type: 'select',
    field: 'role',
    title: '角色',
    effect: { option: 'admin' },
  },
];
```

### `maker`（规则生成器：不建议新建）
文档口径：`maker.create` 虽可用，但不推荐在新表单里使用，优先直接写规则对象以便更可控。

### `effect.loadData`（从外部数据/内置变量注入）
当需要把外部数据注入到某个组件的 `props` 或 `value` 时，可用 `rule.effect.loadData`。

数据结构要点（核心字段）：
- `attr`：数据名（也支持内置变量，如 `$form.xxx`、`$cookie.xxx` 等）
- `to`：写入目标（例如 `options`、`props.options`、`value` 等）
- `copy`：加载时深拷贝（默认 `false`）
- `watch`：数据源变化是否同步更新（默认 `true`）
- `modify`：是否直接修改组件规则（文档要求：给 `value` 赋值通常需要 `modify: true`）

最小例子（先 setData，再把数据注入到 `select.options`；也可用 `setDataDriver` 注册按 key 返回数据源的函数）：

```js
formCreate.setData('labelOptions', [
  { label: '好用', value: 0 },
  { label: '快速', value: 1 },
]);

formCreate.setDataDriver('$user', (key) => userMap[key] || []);

const rules = [
  {
    type: 'select',
    field: 'label',
    title: '标签',
    effect: {
      loadData: {
        attr: 'labelOptions',
        to: 'props.options',
      },
    },
  },
];
```

内置变量（常见）：
- `$topForm`：外层表单数据
- `$form`：当前表单数据
- `$options`：表单 option 上的数据
- `$cookie` / `$localStorage` / `$sessionStorage`：对应存储
- `$mobile`：当前是否移动端
- `$preview`：当前是否预览模式

最小例子（从 cookie 注入 token 到组件请求头）：
```js
const rules = [
  {
    type: 'upload',
    field: 'file',
    effect: {
      loadData: {
        attr: '$cookie.token',
        to: 'props.headers.token',
        modify: true,
      },
    },
  },
];
```

补充：`upload` 常见回显值与 `onSuccess` 回写
- 回显时 `value` 常用数组形式：`[{ name, url }, ...]`（`name` 用于展示文件名，`url` 用于预览/下载）
- 某些后端返回结构不直接符合组件期望时，可在 `props.onSuccess(file)` 中把响应映射回组件识别的字段（如 `file.url` / `file.name`），并可额外把原始响应挂到 `file.value` 方便提交/二次处理

示例：
```js
{
  type: 'upload',
  field: 'file',
  title: '附件',
  props: {
    action: 'https://example.com/upload',
    onSuccess(file) {
      file.url = file.response.url;
      file.name = file.response.name;
      file.value = file.response;
    },
  },
  value: [
    { name: '文件1.pdf', url: 'https://example.com/a.pdf' },
    { name: '文件2.pdf', url: 'https://example.com/b.pdf' },
  ],
}
```

### 校验（新版验证器 `adapter` / `required` / 自定义组件校验）
#### 1) `validate`（新版校验）
当 `validate` 内使用 `adapter: true` 时，会启用新版校验引擎（示例口径与 v3 文档一致）。

常见验证器字段：
- `required: true`
- `min / max`（数值）
- `len / minLen / maxLen`（长度）
- `pattern`（正则匹配）
- `email / url / ip / phone / uppercase / lowercase`
- `equal / enum / hasKeys`
- `validator(value, callback)`（自定义；务必调用 `callback`）

自定义 `validator` 内通常可通过 `this.api` 拿到表单 `api`（用于跨字段校验/读取其它字段值），最后仍必须通过 `callback()` 或 `callback(error)` 结束校验流程。

示例（必填 + 最小值）：
```js
const rules = [
  {
    type: 'inputNumber',
    field: 'age',
    title: '年龄',
    validate: [
      { adapter: true, required: true, min: 10, message: '年龄不能小于10' },
    ],
  },
];
```

#### 2) `required` 属性（组件必填验证）
除了 `validate` 数组，你也可以直接在规则上使用 `required`：
- `required: true` 或 `required: '错误信息'`
- `required: { message, trigger, validator }`

示例：
```js
const rules = [{ type: 'input', field: 'name', title: '名称', required: '请输入名称' }];
```

#### 3) `componentValidate`（自定义组件内部校验）
当你需要在“自定义组件内部”执行校验逻辑，可在规则上启用 `effect.componentValidate`，并在组件中实现对应方法（默认 `formCreateValidate`）。

规则侧示例：
```js
const rules = [
  {
    type: 'custom-component',
    field: 'customField',
    title: '自定义组件',
    value: '',
    effect: { componentValidate: true },
  },
];
```

组件侧（Options API）：
```js
export default {
  methods: {
    formCreateValidate(rule, value, callback) {
      if (value === 'form-create') callback();
      else callback('请输入`form-create`');
    },
  },
};
```

### `computed`（计算字段/动态属性）
`computed` 用于在依赖 `formData` 变化时，动态计算目标字段/属性的值。`computed` 的 key 形式常见有：
- `value(...)`：计算显示/文本值（用于需要“由其它字段决定显示内容”的场景）
- `$required(...)`：动态控制必填校验（`$required` 规则口径）
- `'props.xxx'(formData)`：动态计算组件 `props.xxx`
- `hidden(formData, api)`：动态计算隐藏状态（例如子表单内部字段）

最小例子（计算 `props.disabled`）：
```js
const rules = [
  {
    type: 'radio',
    field: 'radio',
    title: '单选框',
    options: [
      { label: '禁用', value: '1' },
      { label: '可输入', value: '2' },
    ],
  },
  {
    type: 'input',
    field: 'input2',
    title: '输入框2',
    computed: {
      'props.disabled'(formData) {
        return formData.radio === '1';
      },
    },
  },
];
```

最小例子（计算 `$required`）：
```js
const rules = [
  {
    type: 'radio',
    field: 'radio',
    title: '是否必填',
    options: [
      { label: '必填', value: '1' },
      { label: '非必填', value: '2' },
    ],
  },
  {
    type: 'input',
    field: 'input',
    title: '输入框',
    computed: {
      $required(formData) {
        return formData.radio === '1';
      },
    },
  },
];
```

最小例子（同时计算多个 key）：
```js
const rules = [
  {
    type: 'input',
    field: 'input',
    title: '输入框',
    computed: {
      value(formData, api) {
        return api.getRule('radio').options.find((o) => o.value === formData.radio)
          ?.label || '未选择';
      },
      'props.readonly'(formData) {
        return !!formData.radio;
      },
    },
  },
];
```

子表单内部计算 `hidden`（通过 `api.top` 访问父表单）：
```js
const childRule = [
  {
    type: 'group',
    field: 'subFieldGroup',
    props: {
      rule: [
        {
          type: 'input',
          field: 'field2',
          title: '输入框2',
          computed: {
            hidden(formData, api) {
              return api.top.form.radio === '2';
            },
          },
        },
      ],
    },
  },
];
```

### `control`（联动控制：显示/禁用/必填/追加规则）
`control` 是规则级联动配置，常见形式为“先判断（`handle` / `value+condition`），再执行（`method` 或追加/插入 `rule`）”。

常用字段（按示例口径）：
- `handle: (val) => boolean`：用当前组件 value 计算是否命中
- `value` + `condition`：用内置条件判断（如 `condition: '=='`）
- `method: 'display' | 'disabled' | 'hidden' | 'required'`：直接控制目标字段状态
- `rule`：
  - 作为 `Rule[]`：用于在命中时追加/插入新规则（如 `child/append/prepend`）
  - 作为 `string[]`：用于命中时选择要被 `method` 控制的目标字段
- `child`：命中时是否作为子级规则插入
- `append` / `prepend`：插入到指定字段之前/之后

#### `condition` 扩展值（常见）

除 `==` / `!=` / `in` / `between` 等外，部分版本支持：

- `empty`：当前值为空
- `notEmpty`：当前值非空
- `pattern`：正则匹配（`value` 传字符串形式的正则内容，不需要前后 `/`）

最小例子（命中时追加规则，且把按钮插到插槽 append 里）：
```js
const rules = [
  {
    type: 'input',
    field: 'slot',
    title: '插槽',
    value: 'child',
    control: [
      {
        value: 'child',
        child: true,
        rule: [
          {
            type: 'button',
            slot: 'append',
            children: ['child'],
          },
        ],
      },
    ],
  },
];
```

最小例子（命中时直接把目标字段设为必填）：
```js
const rules = [
  {
    type: 'input',
    field: 'input1',
    title: 'input1',
    value: 'require',
    control: [
      {
        value: 'required',
        condition: '==',
        method: 'required',
        rule: ['input2'],
      },
    ],
  },
  { type: 'input', field: 'input2', title: 'input2', value: '' },
];
```

### `hook`（规则生命周期）
当你需要在规则的生命周期阶段执行副作用逻辑（如请求、资源清理、value 变更监听），可以使用 `rule.hook`。

最小例子：
```js
const rule = {
  type: 'input',
  field: 'username',
  hook: {
    value(evt) {
      console.log('value 变化：', evt.value);
    },
    mounted(evt) {
      console.log('组件已挂载：', evt.rule.field);
    },
    deleted(evt) {
      console.log('规则已移除：', evt.rule.field);
    },
  },
};
```
