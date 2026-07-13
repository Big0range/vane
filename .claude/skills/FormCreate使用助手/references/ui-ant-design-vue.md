# FormCreate + Ant Design Vue（运行态要点）

本文档用于 **Ant Design Vue** 栈下的运行态使用要点整理：`label`、`option/global`、`validate`、组件 `rule.type` 清单（索引级）。

---

## 1. 安装与入口（仅提示）

安装与入口挂载请优先查 **FormCreate安装助手** 的 `references/ui-ant-design-vue.md`，本文不重复安装细节。

---

## 2. label 布局（`wrap.labelCol` / `wrap.wrapperCol`）

Ant Design Vue 使用 `labelCol` 与 `wrapperCol` 配置标签与组件容器的栅格布局；在 FormCreate 里常见两种落点：

- **字段级**：`rule.wrap.labelCol / rule.wrap.wrapperCol`
- **全局默认**：`option.form.labelCol / option.form.wrapperCol` 或 `option.wrap`（全局 FormItem 配置）

字段级示例：

```js
const rule = {
    type: 'input',
    field: 'username',
    title: '用户名',
    wrap: {
        labelCol: { span: 6 },      // 标签占据6列
        wrapperCol: { span: 18 }    // 组件容器占据18列
    }
}
```

要点：
- Antd 为 **24 栅格**：`labelCol.span + wrapperCol.span` 常见为 24。
- 只设置 `labelCol` 时，`wrapperCol` 可按剩余空间理解（具体行为以当前版本为准）。
- 响应式写法：`labelCol.xs/sm/md/lg...` 与 `wrapperCol.xs/sm/md/lg...`。

---

## 3. global（Antd 相关 option 结构）

Antd 栈下，常用的 UI 相关全局配置包含：

- `option.form`：表单整体（layout、labelAlign、labelCol、wrapperCol、size、hideRequiredMark 等）
- `option.row`：栅格行（gutter/type/align/justify）
- `option.submitBtn` / `option.resetBtn`：按钮（show/innerText/type/col/click 等）
- `option.info`：提示（popover/tooltip）
- `option.wrap`：全局 FormItem（labelCol/wrapperCol/hasFeedback/extra 等）

`option.form` 默认值（摘要，便于对齐字段名）：

```js
{
    hideRequiredMark: false,
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    colon: undefined,
    validateOnRuleChange: true,
    // 是否显示 label
    title: true
}
```

按钮 click 约定（注意：`global.md` 中 click 参数示例有 `formData/fApi` 两种写法，实际以你当前版本回调签名为准）：

```js
const option = {
    submitBtn: {
        innerText: '提交',
        click: (formData, fApi) => {
            console.log('提交数据:', formData);
            return false; // 返回 false 阻止默认提交（以当前实现为准）
        }
    },
    resetBtn: {
        show: true,
        innerText: '重置',
        click: (fApi) => {
            fApi.resetFields();
        }
    }
}
```

---

## 4. validate（校验规则口径）

校验字段常见参数表（来自 Antd 文档口径）：

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `enum` | 枚举类型 | string | - |
| `len` | 字段长度 | number | - |
| `max` | 最大长度 | number | - |
| `min` | 最小长度 | number | - |
| `message` | 校验文案 | string | - |
| `pattern` | 正则表达式校验 | RegExp \| string | - |
| `required` | 是否必选 | boolean | false |
| `transform` | 校验前转换字段值 | function(value) => any | - |
| `type` | 内建校验类型 | string | 'string' |
| `validator` | 自定义校验 | function(rule, value, callback) | - |
| `whitespace` | 必选时空格是否视为错误 | boolean | false |

注意事项（高频坑）：
- `pattern` 为 **string** 时，前后不要包含 `/`，否则正则无效。
- `type` 必须与组件 `value` 数据类型严格一致（例如数字组件用 `number`）。
- 自定义 `validator` 无论成功/失败都必须执行 `callback`。
- 自定义校验中可通过 `this.rule` / `this.api` 访问上下文（以当前版本注入为准）。

典型示例 1：必填

```js
const rule = {
    type: 'input',
    field: 'username',
    title: '用户名',
    validate: [
        { required: true, message: '用户名是必填项' }
    ]
}
```

典型示例 2：pattern（string）

```js
const rule = {
    type: 'input',
    field: 'phone',
    title: '手机号',
    validate: [
        { required: true, message: '请输入手机号' },
        { pattern: '^1[3-9]\\\\d{9}$', message: '请输入有效的手机号' }
    ]
}
```

典型示例 3：跨字段校验（`this.api`）

```js
const rule = [
    { type: 'input', field: 'password', title: '密码', validate: [{ required: true, min: 6, message: '密码长度不能少于6个字符' }] },
    {
        type: 'input',
        field: 'confirmPassword',
        title: '确认密码',
        validate: [
            { required: true, message: '请再次输入密码' },
            {
                validator: (rule, value, callback) => {
                    const password = this.api.getValue('password');
                    if (value !== password) callback('两次输入的密码不一致');
                    else callback();
                }
            }
        ]
    }
]
```

---

## 5. 组件速查

说明：
- `props` 对应 `rule.props`（透传到 Ant Design Vue 组件）。
- `on` 对应 `rule.on`（事件名以 Antd 组件事件为准；不同版本可能略有差异）。
- `options`/`children` 等数据结构以你当前渲染器版本为准；不确定时用最小 demo 验证。

| 组件 | type           | props（`rule.props`） | 事件（`rule.on`） | 示例（最小可运行） |
|---|----------------|---|---|---|
| Input 输入框 | `input`        | `placeholder`、`allowClear`、`disabled`、`maxlength` | `input`、`change`、`blur`、`focus`、`pressEnter` | <pre><code>const rule = {&#10;    type: 'input',&#10;    field: 'username',&#10;    title: '用户名',&#10;    props: {&#10;        placeholder: '请输入用户名',&#10;        allowClear: true&#10;    },&#10;    on: {&#10;        change: (value) =&gt; console.log('change', value)&#10;    }&#10;}</code></pre> |
| InputNumber 数字输入框 | `input-number` | `min`、`max`、`step`、`precision`、`disabled` | `change`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: 'input-number',&#10;    field: 'age',&#10;    title: '年龄',&#10;    props: { min: 0, max: 120, step: 1 },&#10;    on: { change: (value) =&gt; console.log('age', value) }&#10;}</code></pre> |
| Select 下拉选择 | `select`       | `placeholder`、`allowClear`、`mode`（multiple/tags） 、`disabled` | `change`、`select`、`deselect`、`search`、`clear` | <pre><code>const rule = {&#10;    type: 'select',&#10;    field: 'city',&#10;    title: '城市',&#10;    props: { placeholder: '请选择', allowClear: true },&#10;    options: [&#10;        { label: '北京', value: 'beijing' },&#10;        { label: '上海', value: 'shanghai' }&#10;    ],&#10;    on: { change: (value) =&gt; console.log('city', value) }&#10;}</code></pre> |
| Radio 单选 | `radio`        | `optionType`、`buttonStyle`、`disabled` | `change` | <pre><code>const rule = {&#10;    type: 'radio',&#10;    field: 'gender',&#10;    title: '性别',&#10;    options: [&#10;        { label: '男', value: 1 },&#10;        { label: '女', value: 2 }&#10;    ],&#10;    on: { change: (e) =&gt; console.log('gender', e) }&#10;}</code></pre> |
| Checkbox 多选 | `checkbox`     | `disabled` | `change` | <pre><code>const rule = {&#10;    type: 'checkbox',&#10;    field: 'hobby',&#10;    title: '爱好',&#10;    options: [&#10;        { label: '跑步', value: 'run' },&#10;        { label: '游泳', value: 'swim' }&#10;    ],&#10;    on: { change: (value) =&gt; console.log('hobby', value) }&#10;}</code></pre> |
| Switch 开关 | `switch`       | `checkedChildren`、`unCheckedChildren`、`disabled` | `change` | <pre><code>const rule = {&#10;    type: 'switch',&#10;    field: 'enabled',&#10;    title: '启用',&#10;    props: { checkedChildren: '开', unCheckedChildren: '关' },&#10;    on: { change: (checked) =&gt; console.log('enabled', checked) }&#10;}</code></pre> |
| Slider 滑动条 | `slider`       | `min`、`max`、`step`、`range`、`disabled` | `change`、`afterChange` | <pre><code>const rule = {&#10;    type: 'slider',&#10;    field: 'score',&#10;    title: '评分',&#10;    props: { min: 0, max: 100, step: 1 },&#10;    on: { change: (value) =&gt; console.log('score', value) }&#10;}</code></pre> |
| Rate 评分 | `rate`         | `count`、`allowHalf`、`disabled` | `change` | <pre><code>const rule = {&#10;    type: 'rate',&#10;    field: 'star',&#10;    title: '星级',&#10;    props: { allowHalf: true },&#10;    on: { change: (value) =&gt; console.log('star', value) }&#10;}</code></pre> |
| DatePicker 日期 | `date-picker`  | `format`、`valueFormat`、`showTime`、`placeholder`、`disabled` | `change`、`ok`、`openChange` | <pre><code>const rule = {&#10;    type: 'date-picker',&#10;    field: 'date',&#10;    title: '日期',&#10;    props: {&#10;        placeholder: '请选择日期',&#10;        format: 'YYYY-MM-DD',&#10;        valueFormat: 'YYYY-MM-DD'&#10;    },&#10;    on: { change: (value) =&gt; console.log('date', value) }&#10;}</code></pre> |
| TimePicker 时间 | `time-picker`  | `format`、`valueFormat`、`placeholder`、`disabled` | `change`、`openChange` | <pre><code>const rule = {&#10;    type: 'time-picker',&#10;    field: 'time',&#10;    title: '时间',&#10;    props: { format: 'HH:mm:ss', valueFormat: 'HH:mm:ss' },&#10;    on: { change: (value) =&gt; console.log('time', value) }&#10;}</code></pre> |
| Cascader 级联 | `cascader`     | `placeholder`、`allowClear`、`changeOnSelect`、`disabled` | `change`、`dropdownVisibleChange` | <pre><code>const rule = {&#10;    type: 'cascader',&#10;    field: 'area',&#10;    title: '地区',&#10;    props: { placeholder: '请选择', allowClear: true },&#10;    options: [&#10;        { label: '浙江', value: 'zj', children: [{ label: '杭州', value: 'hz' }] }&#10;    ],&#10;    on: { change: (value) =&gt; console.log('area', value) }&#10;}</code></pre> |
| TreeSelect 树选择 | `tree-select`  | `placeholder`、`allowClear`、`multiple`、`treeDefaultExpandAll`、`disabled` | `change`、`select`、`search`、`clear` | <pre><code>const rule = {&#10;    type: 'tree-select',&#10;    field: 'dept',&#10;    title: '部门',&#10;    props: { placeholder: '请选择', allowClear: true },&#10;    options: [&#10;        { label: '总部', value: 'hq', children: [{ label: '研发', value: 'rd' }] }&#10;    ],&#10;    on: { change: (value) =&gt; console.log('dept', value) }&#10;}</code></pre> |
| Transfer 穿梭框 | `transfer`     | `titles`、`operations`、`showSearch`、`disabled` | `change`、`search`、`selectChange`、`scroll` | <pre><code>const rule = {&#10;    type: 'transfer',&#10;    field: 'members',&#10;    title: '成员',&#10;    props: { showSearch: true },&#10;    options: [&#10;        { key: '1', title: '张三', description: 'zhangsan' },&#10;        { key: '2', title: '李四', description: 'lisi' }&#10;    ],&#10;    on: { change: (targetKeys) =&gt; console.log('members', targetKeys) }&#10;}</code></pre> |
| Upload 上传 | `upload`       | `action`、`headers`、`multiple`、`accept`、`maxCount`、`listType` | `change`、`preview`、`remove` | <pre><code>const rule = {&#10;    type: 'upload',&#10;    field: 'files',&#10;    title: '附件',&#10;    props: {&#10;        action: '/api/upload',&#10;        multiple: true,&#10;        maxCount: 3&#10;    },&#10;    on: { change: (info) =&gt; console.log('upload', info) }&#10;}</code></pre> |
| Hidden 隐藏域 | `hidden`       | - | - | <pre><code>const rule = {&#10;    type: 'hidden',&#10;    field: 'id',&#10;    value: '123'&#10;}</code></pre> |

提示：
- **type 以运行时为准**：不同版本可能存在别名（如 `auto-complete` / `autoComplete`）；不确定时用最小 demo 验证。
- **事件回调签名**：同名事件在不同组件/版本下参数不同（例如 `change` 可能给 value 或 event），以你当前 Ant Design Vue 版本为准。

