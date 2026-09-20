# 校验、computed 与 control（rule）

本文件覆盖三类高频“规则级能力”：
- 校验：`validate` / `required` / `effect.componentValidate`
- 计算：`computed`
- 联动：`control`

---

## 校验（新版验证器 `adapter` / `required` / 自定义组件校验）

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

---

## `computed`（计算字段/动态属性）

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

---

## `control`（联动控制：显示/禁用/必填/追加规则）

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

---

## `hook`（规则生命周期）

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

