# FormCreate + Vant（运行态要点）

本文档用于 **Vant（移动端）** 栈下的运行态使用要点整理：`label`、`option/global`、`validate`、组件 `rule.type` 速查（含常用 props/事件与最小示例）。

---

## 1. 安装与入口（仅提示）

安装与入口挂载请优先查 **FormCreate安装助手** 的 `references/ui-vant.md`，本文不重复安装细节。

---

## 2. label 布局（Vant：`labelAlign` / `inputAlign` / `wrap.labelWidth`）

Vant 的表单标签与输入对齐由 `labelAlign` / `inputAlign` 控制；标签宽度常用 `wrap.labelWidth` 统一设置（移动端建议更小的宽度）。

常见落点：
- **全局默认**：`option.form.labelAlign / option.form.inputAlign / option.form.required`
- **Field 级别默认**：`option.wrap.labelWidth / option.wrap.inputAlign`

示例：

```js
const option = {
    form: {
        required: 'auto',
        labelAlign: 'right',
        inputAlign: 'right'
    },
    wrap: {
        labelWidth: '80px',
        inputAlign: 'left'
    }
}
```

---

## 3. global（Vant 相关 option 结构）

Vant 栈下，常用 UI 相关全局配置包含：

- `option.form`：表单整体（`required`、`labelAlign`、`inputAlign`）
- `option.row`：栅格行（`gutter`，移动端建议较小值）
- `option.submitBtn` / `option.resetBtn`：按钮（`block/innerText/type/size/show/click` 等）
- `option.wrap`：全局 Field（例如 `labelWidth`、`inputAlign`）

`option.form` 默认值（摘要，便于对齐字段名）：

```js
{
    required: 'auto',
    labelAlign: 'right',
    inputAlign: 'right'
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

## 4. validate（Vant 校验规则口径）

Vant 的 `validate` 规则口径与 async-validator 不同，核心差异：

- `validator` **返回** `boolean` / `string` / `Promise`，不使用 `callback`
- `message` 可以是函数 `(value, rule) => string`
- `trigger` 可选：`onChange`、`onBlur`、`onSubmit`
- `pattern` 为 **RegExp**

| 键名 | 说明 | 类型 |
|---|---|---|
| `required` | 是否必选（空字符串、空数组、false、undefined、null 视为空） | boolean |
| `message` | 错误提示文案（可为函数） | string \| (value, rule) => string |
| `validator` | 自定义校验（支持 Promise） | (value, rule) => boolean \| string \| Promise |
| `pattern` | 正则校验 | RegExp |
| `trigger` | 触发时机 | string \| string[] |
| `formatter` | 格式化后再校验 | (value, rule) => any |
| `validateEmpty` | 是否对空值执行 validator/pattern | boolean |

典型示例：必填（onBlur）

```js
const rule = {
    type: 'input',
    field: 'username',
    title: '用户名',
    validate: [
        { required: true, message: '用户名是必填项', trigger: 'onBlur' }
    ]
}
```

---

## 5. 组件速查（Vant：移动端 Field / Uploader / Calendar 等）

说明：
- `props` 对应 `rule.props`（透传到 Vant 组件）。
- `on` 对应 `rule.on`（事件名以组件页为准）。

| 组件 | `rule.type` | props（`rule.props`） | 事件（`rule.on`） | 示例（最小可运行） |
|---|---|---|---|---|
| Input/Field 输入框 | `input`（亦见 `field`） | `placeholder`、`type`(digit/password/textarea)、`clearable`、`maxlength`、`leftIcon` | `input`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;input&quot;,&#10;    title:&quot;搜索关键词&quot;,&#10;    field:&quot;keyword&quot;,&#10;    props: {&#10;        placeholder: '请输入搜索关键词',&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        input: (value) =&gt; console.log('输入值改变:', value),&#10;        blur: (event) =&gt; console.log('失去焦点:', event),&#10;    },&#10;}</code></pre> |
| Select 选择器 | `select` | `title`、`options`、`placeholder`、`confirmButtonText`、`cancelButtonText`、`disabled` | `confirm`、`cancel`、`change` | <pre><code>const rule = {&#10;    type: 'select',&#10;    title: '下拉选择',&#10;    field: 'select',&#10;    value: 'Wednesday',&#10;    props: {&#10;        title: '预约',&#10;        options: [&#10;            { text: '周一', value: 'Monday' },&#10;            { text: '周二', value: 'Tuesday' },&#10;        ],&#10;        placeholder: '请选择',&#10;    },&#10;    on: {&#10;        confirm: (result) =&gt; console.log('确认选择:', result),&#10;        cancel: () =&gt; console.log('取消选择'),&#10;        change: (result) =&gt; console.log('选择值改变:', result),&#10;    },&#10;}</code></pre> |
| Radio 单选 | `radio` | `options`、`direction`、`shape`、`checkedColor`、`iconSize`、`disabled` | `change` | <pre><code>const rule = {&#10;    type: 'radio',&#10;    title: '配送方式',&#10;    field: 'delivery',&#10;    value: '1',&#10;    props: {&#10;        options: [&#10;            { text: '快递配送', value: '1' },&#10;            { text: '门店自提', value: '2' },&#10;        ],&#10;    },&#10;    on: { change: (name) =&gt; console.log('选择值改变:', name) },&#10;}</code></pre> |
| Checkbox 复选 | `checkbox` | `options`、`max`、`direction`、`shape`、`checkedColor`、`iconSize`、`disabled` | `change` | <pre><code>const rule = {&#10;    type: 'checkbox',&#10;    title: '商品标签',&#10;    field: 'tags',&#10;    value: [],&#10;    props: {&#10;        options: [&#10;            { text: '热销', value: '1' },&#10;            { text: '新品', value: '2' },&#10;        ],&#10;        max: 3,&#10;    },&#10;    on: { change: (names) =&gt; console.log('选择值改变:', names) },&#10;}</code></pre> |
| Switch 开关 | `switch` | `activeValue`、`inactiveValue`、`activeColor`、`inactiveColor`、`size`、`loading`、`disabled` | `change`、`click` | <pre><code>const rule = {&#10;    type: 'switch',&#10;    title: '是否上架',&#10;    field: 'is_show',&#10;    value: 1,&#10;    props: { activeValue: 1, inactiveValue: 0 },&#10;    on: {&#10;        change: (value) =&gt; console.log('开关状态改变:', value),&#10;        click: (event) =&gt; console.log('点击开关:', event),&#10;    },&#10;}</code></pre> |
| Stepper 步进器 | `stepper` | `min`、`max`、`step`、`decimalLength`、`disableInput` | `change`、`plus`、`minus`、`overlimit` | <pre><code>const rule = {&#10;    type: 'stepper',&#10;    title: '购买数量',&#10;    field: 'quantity',&#10;    value: 1,&#10;    props: { min: 1, max: 100 },&#10;    on: {&#10;        change: (value, detail) =&gt; console.log('数值改变:', value, detail),&#10;        plus: () =&gt; console.log('点击增加按钮'),&#10;    },&#10;}</code></pre> |
| Slider 滑块 | `slider` | `min`、`max`、`step`、`range`、`activeColor`、`inactiveColor`、`vertical`、`disabled` | `change`、`drag-start`、`drag-end` | <pre><code>const rule = {&#10;    type: 'slider',&#10;    title: '音量',&#10;    field: 'volume',&#10;    value: 50,&#10;    props: { min: 0, max: 100 },&#10;    on: {&#10;        change: (value) =&gt; console.log('值改变（拖拽结束）:', value),&#10;        'drag-start': (event) =&gt; console.log('开始拖动:', event),&#10;    },&#10;}</code></pre> |
| Rate 评分 | `rate` | `count`、`allowHalf`、`clearable`、`readonly`、`disabled`、`icon`、`voidIcon`、`color` | `change` | <pre><code>const rule = {&#10;    type: 'rate',&#10;    title: '商品评分',&#10;    field: 'rating',&#10;    value: 0,&#10;    props: { allowHalf: true, count: 5 },&#10;    on: { change: (currentValue) =&gt; console.log('评分改变:', currentValue) },&#10;}</code></pre> |
| DatePicker 日期选择 | `datePicker` | `title`、`columnsType`、`minDate`、`maxDate`、`disabled` | `confirm`、`cancel`、`change` | <pre><code>const rule = {&#10;    type: 'datePicker',&#10;    title: '活动日期',&#10;    field: 'date',&#10;    value: '',&#10;    props: { title: '选择日期' },&#10;    on: {&#10;        confirm: (result) =&gt; console.log('确认选择:', result),&#10;        change: (result) =&gt; console.log('日期改变:', result),&#10;    },&#10;}</code></pre> |
| TimePicker 时间选择 | `timePicker` | `title`、`columnsType`、`minTime`、`maxTime`、`disabled` | `confirm`、`cancel`、`change` | <pre><code>const rule = {&#10;    type: 'timePicker',&#10;    title: '活动时间',&#10;    field: 'time',&#10;    value: '12:47',&#10;    props: { title: '选择时间' },&#10;    on: {&#10;        confirm: (result) =&gt; console.log('确认选择:', result),&#10;        change: (result) =&gt; console.log('时间改变:', result),&#10;    },&#10;}</code></pre> |
| Cascader 多级联动 | `cascader` | `options`、`placeholder`、`fieldNames`、`disabled`、`title` | `change`、`finish`、`close` | <pre><code>const rule = {&#10;    type: 'cascader',&#10;    title: '所在区域',&#10;    field: 'address',&#10;    value: '',&#10;    props: {&#10;        title: '选择地址',&#10;        options: [&#10;            { text: '浙江省', value: '330000', children: [{text: '杭州市', value: '330100'}] },&#10;        ],&#10;        placeholder: '请选择',&#10;    },&#10;    on: {&#10;        finish: (result) =&gt; console.log('选择完成:', result),&#10;        change: (result) =&gt; console.log('选择值改变:', result),&#10;    },&#10;}</code></pre> |
| Uploader 上传 | `uploader` | `action`、`maxCount`、`multiple`、`accept`、`beforeRead`、`afterRead`、`onSuccess` | `oversize`、`click-upload`、`delete` | <pre><code>const rule = {&#10;    type: 'uploader',&#10;    title: '图片上传',&#10;    field: 'pic',&#10;    value: [],&#10;    props: {&#10;        action: '/upload.php',&#10;        accept: 'image/*',&#10;        maxCount: 1,&#10;        onSuccess(res, file) {&#10;            file.url = res.url;&#10;        },&#10;    },&#10;    on: {&#10;        oversize: (file) =&gt; console.log('文件大小超过限制:', file),&#10;        delete: (file) =&gt; console.log('删除文件:', file),&#10;    },&#10;}</code></pre> |
| Calendar 日历 | `calendar` | `type`(single/multiple/range)、`minDate`、`maxDate`、`switchMode` | `select`、`confirm`、`open`、`close` | <pre><code>const rule = {&#10;    type: 'calendar',&#10;    title: '活动日期',&#10;    field: 'date',&#10;    value: '',&#10;    props: { placeholder: '请选择日期' },&#10;    on: {&#10;        confirm: (value) =&gt; console.log('确认选择:', value),&#10;        open: () =&gt; console.log('打开日历'),&#10;    },&#10;}</code></pre> |
| Hidden 隐藏字段 | `hidden` | - | - | <pre><code>const rule = {&#10;  type:&quot;hidden&quot;,&#10;  field:&quot;id&quot;,&#10;  value:&quot;09&quot;&#10;}</code></pre> |

提示：
- Vant 是移动端组件体系，常见 `rule.type`（如 `uploader/calendar/stepper`）与 PC 栈不同，写示例时不要跨栈复用 props/event。
- Vant 的校验 `validator` 返回值与触发时机（`trigger`）与 async-validator 不同，迁移时务必对齐。

