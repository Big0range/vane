# FormCreate + Naive UI（运行态要点）

本文档用于 **Naive UI** 栈下的运行态使用要点整理：`label`、`option/global`、`validate`、组件 `rule.type` 速查（含常用 props/事件与最小示例）。

---

## 1. 安装与入口（仅提示）

安装与入口挂载请优先查 **FormCreate安装助手** 的 `references/ui-naive-ui.md`，本文不重复安装细节。

---

## 2. label 布局（Naive：`labelPlacement` / `labelWidth`）

Naive UI 的表单标签布局主要由 `labelPlacement` 与 `labelWidth` 决定，在 FormCreate 里常见落点：

- **全局默认（推荐）**：`option.form.labelPlacement / option.form.labelWidth`
- **FormItem 级别**：`option.wrap`（例如统一的 `labelWidth`）

示例：

```js
const option = {
    form: {
        labelPlacement: 'left',  // 'left' | 'top' | 'right'
        labelWidth: '125px',
        inline: false
    },
    wrap: {
        labelWidth: '125px'
    }
}
```

---

## 3. global（Naive 相关 option 结构）

Naive 栈下，常用 UI 相关全局配置包含：

- `option.form`：表单整体（`inline`、`labelPlacement`、`labelWidth`、`disabled`、`size` 等）
- `option.row`：栅格行（`gutter`）
- `option.submitBtn` / `option.resetBtn`：按钮（`show/innerText/type/col/click` 等）
- `option.info`：提示（popover/tooltip）
- `option.wrap`：全局 FormItem（例如 `labelWidth`）

`option.form` 默认值（摘要，便于对齐字段名）：

```js
{
   inline: false,
   labelPlacement: 'left',
   labelWidth: '125px',
   disabled: false,
   size: undefined,
}
```

按钮 click 约定（示例中存在 `(formData, fApi)` 与 `(fApi)` 两种写法，实际以你当前版本回调签名为准）：

```js
const option = {
    submitBtn: {
        innerText: '提交',
        click: (formData, fApi) => {
            console.log('提交数据:', formData)
            return false
        }
    },
    resetBtn: {
        show: true,
        innerText: '重置',
        click: (fApi) => {
            fApi.resetFields()
        }
    }
}
```

---

## 4. validate（校验规则口径）

Naive UI 文档页明确建议优先使用新版校验引擎（见 `/guide/validate-v2`）；若你仍在用 `rule.validate`（async-validator 风格），参数口径如下：

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

典型示例：必填

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

典型示例：pattern（string）

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

---

## 5. 组件速查（Naive：事件多为 `update:*`）

说明：
- `props` 对应 `rule.props`（透传到 Naive UI 组件）。
- `on` 对应 `rule.on`。**Naive 栈大量使用 `update:value` 来表达值变化**（如 `on: { 'update:value': (...) => {} }`）。

| 组件 | `rule.type` | props（`rule.props`） | 事件（`rule.on`） | 示例（最小可运行） |
|---|---|---|---|---|
| Input 输入框 | `input` | `placeholder`、`clearable`、`disabled`、`maxlength`、`type`(textarea/password) | `'update:value'`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;input&quot;,&#10;    title:&quot;用户名&quot;,&#10;    field:&quot;username&quot;,&#10;    props: {&#10;        placeholder: &quot;请输入用户名&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('输入值改变:', value),&#10;        blur: () =&gt; console.log('失去焦点'),&#10;    },&#10;}</code></pre> |
| InputNumber 数字输入框 | `InputNumber` | `min`、`max`、`step`、`clearable`、`showButton`、`disabled` | `'update:value'`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;InputNumber&quot;,&#10;    field: &quot;quantity&quot;,&#10;    title: &quot;购买数量&quot;,&#10;    value: 1,&#10;    props: { min: 1, max: 100, step: 1 },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('数值改变:', value),&#10;    },&#10;}</code></pre> |
| Select 下拉选择 | `select` | `placeholder`、`clearable`、`multiple`、`filterable`、`remote`、`loading` | `'update:value'`、`blur`、`focus`、`clear`、`search` | <pre><code>const rule = {&#10;    type: &quot;select&quot;,&#10;    field: &quot;category&quot;,&#10;    title: &quot;商品分类&quot;,&#10;    options: [&#10;        {&quot;value&quot;: &quot;104&quot;, &quot;label&quot;: &quot;生态蔬菜&quot;},&#10;        {&quot;value&quot;: &quot;105&quot;, &quot;label&quot;: &quot;新鲜水果&quot;},&#10;    ],&#10;    props: {&#10;        placeholder: &quot;请选择分类&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        'update:value': (value, option) =&gt; console.log('选择值改变:', value, option),&#10;        clear: () =&gt; console.log('清空选择'),&#10;    },&#10;}</code></pre> |
| AutoComplete 自动完成 | `autoComplete` | `options`、`placeholder`、`clearable`、`loading`、`clearAfterSelect` | `'update:value'`、`select`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;autoComplete&quot;,&#10;    title: &quot;商品名称&quot;,&#10;    field: &quot;product&quot;,&#10;    value: &quot;&quot;,&#10;    props: {&#10;        options: [&quot;iPhone 15 Pro&quot;, &quot;MacBook Pro&quot;],&#10;        placeholder: &quot;请输入或选择商品&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        select: (value) =&gt; console.log('选择选项:', value),&#10;    },&#10;}</code></pre> |
| Radio 单选框 | `radio` | `size`、`disabled` | `'update:value'` | <pre><code>const rule = {&#10;    type:&quot;radio&quot;,&#10;    title:&quot;配送方式&quot;,&#10;    field:&quot;delivery&quot;,&#10;    value:&quot;1&quot;,&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;快递配送&quot;},&#10;        {value:&quot;2&quot;,label:&quot;门店自提&quot;},&#10;    ],&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('选择值改变:', value),&#10;    },&#10;}</code></pre> |
| Checkbox 多选框 | `checkbox` | `min`、`max`、`disabled` | `'update:value'` | <pre><code>const rule = {&#10;    type:&quot;checkbox&quot;,&#10;    title:&quot;商品标签&quot;,&#10;    field:&quot;tags&quot;,&#10;    value:[],&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;热销&quot;},&#10;        {value:&quot;2&quot;,label:&quot;新品&quot;},&#10;    ],&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('选择值改变:', value),&#10;    },&#10;}</code></pre> |
| Switch 开关 | `switch` | `checkedValue`、`uncheckedValue`、`round`、`size`、`loading`、`disabled` | `'update:value'` | <pre><code>const rule = {&#10;    type:&quot;switch&quot;,&#10;    title:&quot;是否上架&quot;,&#10;    field:&quot;is_show&quot;,&#10;    value:&quot;1&quot;,&#10;    props: {&#10;        checkedValue: &quot;1&quot;,&#10;        uncheckedValue: &quot;0&quot;,&#10;    },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('开关状态改变:', value),&#10;    },&#10;}</code></pre> |
| Slider 滑块 | `slider` | `min`、`max`、`step`、`range`、`marks`、`vertical` | `'update:value'` | <pre><code>const rule = {&#10;    type:&quot;slider&quot;,&#10;    field:&quot;volume&quot;,&#10;    title:&quot;音量&quot;,&#10;    value:50,&#10;    props:{ min: 0, max: 100 },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('滑块值改变:', value),&#10;    },&#10;}</code></pre> |
| Rate 评分 | `rate` | `count`、`allowHalf`、`readonly`、`size`、`color` | `'update:value'` | <pre><code>const rule = {&#10;    type:&quot;rate&quot;,&#10;    field:&quot;rating&quot;,&#10;    title:&quot;商品评分&quot;,&#10;    value:0,&#10;    props:{ allowHalf: true, count: 5 },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('评分改变:', value),&#10;    },&#10;}</code></pre> |
| DatePicker 日期选择 | `DatePicker` | `type`(date/datetime/daterange/...)、`format`、`placeholder`、`clearable` | `'update:value'`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;DatePicker&quot;,&#10;    field: &quot;date&quot;,&#10;    title: &quot;选择日期&quot;,&#10;    value: null,&#10;    props: {&#10;        type: &quot;date&quot;,&#10;        format: &quot;yyyy-MM-dd&quot;,&#10;        placeholder: &quot;请选择日期&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        'update:value': (value, formattedValue) =&gt; console.log('日期改变:', value, formattedValue),&#10;    },&#10;}</code></pre> |
| TimePicker 时间选择 | `TimePicker` | `format`、`placeholder`、`clearable`、`use12Hours` | `'update:value'`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;TimePicker&quot;,&#10;    field: &quot;time&quot;,&#10;    title: &quot;选择时间&quot;,&#10;    value: null,&#10;    props: { format: &quot;HH:mm:ss&quot;, clearable: true },&#10;    on: {&#10;        'update:value': (value, formattedValue) =&gt; console.log('时间改变:', value, formattedValue),&#10;    },&#10;}</code></pre> |
| Cascader 多级联动 | `cascader` | `options`、`filterable`、`placeholder`、`clearable`、`multiple`、`checkStrategy`、`remote` | `'update:value'`、`blur`、`focus`、`load` | <pre><code>const rule = {&#10;    type:&quot;cascader&quot;,&#10;    title:&quot;所在区域&quot;,&#10;    field:&quot;address&quot;,&#10;    value:[],&#10;    props:{&#10;        options: [&#10;            { value: 'beijing', label: '北京', children: [{ value: 'chaoyang', label: '朝阳区' }] }&#10;        ],&#10;        placeholder: &quot;请选择区域&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('选择值改变:', value),&#10;    },&#10;}</code></pre> |
| Tree 树形组件 | `tree` | `data`、`checkable`、`cascade`、`selectable`、`multiple`、`defaultExpandAll`、`remote` | `'update:checked-keys'`、`'update:selected-keys'`、`'update:expanded-keys'`、`load` | <pre><code>const rule = {&#10;    type:&quot;tree&quot;,&#10;    title:&quot;权限选择&quot;,&#10;    field:&quot;permissions&quot;,&#10;    value:[],&#10;    props:{&#10;        data: [{ key: 1, label: '用户管理', children: [{ key: 11, label: '查看用户' }] }],&#10;        checkable: true,&#10;        cascade: true,&#10;    },&#10;    on: {&#10;        'update:checked-keys': (keys) =&gt; console.log('勾选节点改变:', keys),&#10;    },&#10;}</code></pre> |
| Frame 框架 | `frame` | `type`(image/file/input)、`src`、`maxLength`、`width`、`height`、`helper`、`disabled` | `open`、`close`、`change` | <pre><code>const rule = {&#10;    type:&quot;frame&quot;,&#10;    title:&quot;素材选择&quot;,&#10;    field:&quot;material&quot;,&#10;    value:[],&#10;    props:{ type:&quot;image&quot;, src:&quot;/material-picker.html&quot;, maxLength: 5 },&#10;    on: {&#10;        open: () =&gt; console.log('打开弹出框'),&#10;        close: () =&gt; console.log('关闭弹出框'),&#10;        change: (value) =&gt; console.log('值改变:', value),&#10;    },&#10;}</code></pre> |
| ColorPicker 颜色选择 | `ColorPicker` | `showPreview`、`showAlpha`、`swatches`、`size`、`disabled` | `'update:value'`、`complete` | <pre><code>const rule = {&#10;    type: &quot;ColorPicker&quot;,&#10;    field: &quot;color&quot;,&#10;    title: &quot;颜色&quot;,&#10;    value: '#ff7271',&#10;    props: { showPreview: true },&#10;    on: {&#10;        'update:value': (value) =&gt; console.log('颜色改变:', value),&#10;        complete: (value) =&gt; console.log('颜色选择完成:', value),&#10;    },&#10;}</code></pre> |
| Upload 上传 | `upload` | `action`、`accept`、`max`、`multiple`、`listType`、`onSuccess`、`customRequest` | `change`（封装事件） | <pre><code>const rule = {&#10;    type: &quot;upload&quot;,&#10;    field: &quot;image&quot;,&#10;    title: &quot;商品图片&quot;,&#10;    value: [],&#10;    props: {&#10;        action: &quot;/upload.php&quot;,&#10;        listType: &quot;image-card&quot;,&#10;        accept: &quot;image/*&quot;,&#10;        max: 5,&#10;        multiple: true,&#10;        onSuccess: function (res, file) {&#10;            file.url = res.url;&#10;        }&#10;    },&#10;    on: {&#10;        change: (info) =&gt; console.log('文件状态改变:', info?.file?.status),&#10;    },&#10;}</code></pre> |
| Hidden 隐藏字段 | `hidden` | - | - | <pre><code>const rule = {&#10;  type:&quot;hidden&quot;,&#10;  field:&quot;id&quot;,&#10;  value:&quot;09&quot;&#10;}</code></pre> |

提示：
- **事件名以组件页为准**：Naive UI 栈“值变化”主要用 `'update:value'`，不要写成通用的 `change`/`input` 口径。
- `DatePicker` 的 `type` 字段在 Naive 组件 props 中承担“日期/范围/时间”等模式区分；使用前先用最小 demo 验证实际 value 类型与格式化策略。

