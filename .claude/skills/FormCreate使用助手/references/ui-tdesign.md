# FormCreate + TDesign（运行态要点）

本文档用于 **TDesign** 栈下的运行态使用要点整理：`label`、`option/global`、`validate`、组件 `rule.type` 速查（含常用 props/事件与最小示例）。

---

## 1. 安装与入口（仅提示）

安装与入口挂载请优先查 **FormCreate安装助手** 的 `references/ui-tdesign.md`，本文不重复安装细节。

---

## 2. label 布局（TDesign：`labelAlign` / `labelWidth` / `layout`）

TDesign 的表单标签布局主要由 `layout` / `labelAlign` / `labelWidth` 决定，在 FormCreate 里常见落点：

- **全局默认（推荐）**：`option.form.layout / option.form.labelAlign / option.form.labelWidth`
- **FormItem 级别**：`option.wrap`（例如统一的 `labelWidth`）

示例：

```js
const option = {
    form: {
        layout: 'vertical',   // 'vertical' | 'horizontal' | 'inline'
        labelAlign: 'right',  // 'left' | 'right' | 'top'
        labelWidth: '125px'
    },
    wrap: {
        labelWidth: '125px'
    }
}
```

---

## 3. global（TDesign 相关 option 结构）

TDesign 栈下，常用 UI 相关全局配置包含：

- `option.form`：表单整体（layout、labelAlign、labelWidth 等）
- `option.row`：栅格行（gutter 或响应式 gutter）
- `option.submitBtn` / `option.resetBtn`：按钮（theme/innerText/col/click 等）
- `option.info`：提示（popover/tooltip）
- `option.wrap`：全局 FormItem（例如 labelWidth）

`option.form` 默认值（摘要，便于对齐字段名）：

```js
{
    layout: 'vertical',
    labelAlign: 'right',
    labelWidth: '125px'
}
```

---

## 4. validate（TDesign 校验规则口径）

TDesign 的校验规则口径与 async-validator 不同，核心差异：

- `validator` **返回** `boolean` 或 `CustomValidateObj`（不使用 `callback`）
- 支持内置校验：`telnumber`、`idcard` 等
- 支持 `trigger`（`change/blur`）与 `type`（`error/warning`）

常用字段（摘要）：

| 键名 | 说明 |
|---|---|
| `required` | 必填 |
| `min` / `max` / `len` | 长度或数值（number 时按数值比对） |
| `pattern` | 正则 |
| `enum` | 枚举 |
| `telnumber` / `idcard` | 内置校验 |
| `trigger` | change / blur |
| `type` | error / warning |
| `validator` | 自定义校验（返回 boolean 或对象） |

典型示例：必填（blur）

```js
const rule = {
    type: 'input',
    field: 'username',
    title: '用户名',
    validate: [
        { required: true, message: '用户名是必填项', trigger: 'blur' }
    ]
}
```

---

## 5. 组件速查（`rule.type` / props / on / 规则示例）

说明：
- `props` 对应 `rule.props`（透传到 TDesign 组件）。
- `on` 对应 `rule.on`（事件名以组件页为准；不同版本可能略有差异）。

| 组件 | `rule.type` | props（`rule.props`） | 事件（`rule.on`） | 示例（最小可运行） |
|---|---|---|---|---|
| Input 输入框 | `input` | `placeholder`、`clearable`、`disabled`、`maxlength`、`type`(textarea/password) | `change`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;input&quot;,&#10;    title:&quot;搜索关键词&quot;,&#10;    field:&quot;keyword&quot;,&#10;    props: {&#10;        placeholder: &quot;请输入搜索关键词&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        change: (value) =&gt; console.log('输入值改变:', value),&#10;        blur: () =&gt; console.log('失去焦点'),&#10;    },&#10;}</code></pre> |
| InputNumber 数字输入框 | `InputNumber` | `min`、`max`、`step`、`precision`、`disabled`、`placeholder` | `change`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;InputNumber&quot;,&#10;    field: &quot;quantity&quot;,&#10;    title: &quot;购买数量&quot;,&#10;    value: 1,&#10;    props: { min: 1, max: 100, step: 1 },&#10;    on: { change: (value) =&gt; console.log('数值改变:', value) },&#10;}</code></pre> |
| Select 下拉选择 | `select` | `placeholder`、`clearable`、`multiple`、`filterable`、`loading` | `change`、`clear`、`search` | <pre><code>const rule = {&#10;    type: &quot;select&quot;,&#10;    field: &quot;category&quot;,&#10;    title: &quot;商品分类&quot;,&#10;    options: [&#10;        {&quot;value&quot;: &quot;104&quot;, &quot;label&quot;: &quot;生态蔬菜&quot;},&#10;        {&quot;value&quot;: &quot;105&quot;, &quot;label&quot;: &quot;新鲜水果&quot;},&#10;    ],&#10;    props: {&#10;        placeholder: &quot;请选择分类&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        change: (value, option) =&gt; console.log('选择值改变:', value, option),&#10;        clear: () =&gt; console.log('清空选择'),&#10;    },&#10;}</code></pre> |
| Radio 单选框 | `radio` | `direction`、`disabled` | `change` | <pre><code>const rule = {&#10;    type:&quot;radio&quot;,&#10;    title:&quot;配送方式&quot;,&#10;    field:&quot;delivery&quot;,&#10;    value:&quot;1&quot;,&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;快递配送&quot;},&#10;        {value:&quot;2&quot;,label:&quot;门店自提&quot;},&#10;    ],&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Checkbox 多选框 | `checkbox` | `max`、`min`、`disabled` | `change` | <pre><code>const rule = {&#10;    type:&quot;checkbox&quot;,&#10;    title:&quot;商品标签&quot;,&#10;    field:&quot;tags&quot;,&#10;    value:[],&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;热销&quot;},&#10;        {value:&quot;2&quot;,label:&quot;新品&quot;},&#10;    ],&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Switch 开关 | `switch` | `loading`、`size`、`value/defaultValue`、`checkedChildren`、`unCheckedChildren` | `change` | <pre><code>const rule = {&#10;    type:&quot;switch&quot;,&#10;    title:&quot;是否上架&quot;,&#10;    field:&quot;is_show&quot;,&#10;    value:&quot;1&quot;,&#10;    props: { checkedChildren: &quot;1&quot;, unCheckedChildren: &quot;0&quot; },&#10;    on: { change: (value) =&gt; console.log('开关状态改变:', value) },&#10;}</code></pre> |
| Slider 滑块 | `slider` | `min`、`max`、`step`、`range`、`marks`、`showInput` | `change` | <pre><code>const rule = {&#10;    type:&quot;slider&quot;,&#10;    field:&quot;volume&quot;,&#10;    title:&quot;音量&quot;,&#10;    value:50,&#10;    props:{ min: 0, max: 100 },&#10;    on: { change: (value) =&gt; console.log('滑块值改变:', value) },&#10;}</code></pre> |
| DatePicker 日期选择 | `DatePicker` | `type`(date/datetime/daterange/...)、`format`、`placeholder`、`clearable` | `change`、`clear` | <pre><code>const rule = {&#10;    type: &quot;DatePicker&quot;,&#10;    field: &quot;date&quot;,&#10;    title: &quot;选择日期&quot;,&#10;    value: null,&#10;    props: {&#10;        type: &quot;date&quot;,&#10;        format: &quot;YYYY-MM-DD&quot;,&#10;        placeholder: &quot;请选择日期&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        change: (value) =&gt; console.log('日期改变:', value),&#10;        clear: () =&gt; console.log('清空日期'),&#10;    },&#10;}</code></pre> |
| TimePicker 时间选择 | `TimePicker` | `format`、`placeholder`、`clearable`、`enableTimePicker` | `change`、`clear` | <pre><code>const rule = {&#10;    type: &quot;TimePicker&quot;,&#10;    field: &quot;time&quot;,&#10;    title: &quot;选择时间&quot;,&#10;    value: null,&#10;    props: { format: &quot;HH:mm:ss&quot;, clearable: true },&#10;    on: {&#10;        change: (value) =&gt; console.log('时间改变:', value),&#10;        clear: () =&gt; console.log('清空时间'),&#10;    },&#10;}</code></pre> |
| Cascader 多级联动 | `cascader` | `options`、`filterable`、`placeholder`、`clearable`、`multiple` | `change`、`clear` | <pre><code>const rule = {&#10;    type:&quot;cascader&quot;,&#10;    title:&quot;所在区域&quot;,&#10;    field:&quot;address&quot;,&#10;    value:[],&#10;    props:{&#10;        options: [&#10;            { value: 'beijing', label: '北京', children: [{ value: 'chaoyang', label: '朝阳区' }] }&#10;        ],&#10;        placeholder: &quot;请选择区域&quot;,&#10;        clearable: true,&#10;    },&#10;    on: { change: (value, option) =&gt; console.log('选择值改变:', value, option) },&#10;}</code></pre> |
| Tree 树形组件 | `tree` | `data`、`checkable`、`activable`、`multiple`、`expandAll`、`keys` | `change`、`active`、`expand` | <pre><code>const rule = {&#10;    type:&quot;tree&quot;,&#10;    title:&quot;权限选择&quot;,&#10;    field:&quot;permissions&quot;,&#10;    value:[],&#10;    props:{&#10;        data: [{ value: 1, label: '用户管理', children: [{ value: 11, label: '查看用户' }] }],&#10;        checkable: true,&#10;    },&#10;    on: { change: (value) =&gt; console.log('勾选节点改变:', value) },&#10;}</code></pre> |
| TreeSelect 树选择 | `treeSelect` | `data`、`multiple`、`placeholder`、`clearable`、`disabled` | `change`、`clear` | <pre><code>const rule = {&#10;    type: &quot;treeSelect&quot;,&#10;    field: &quot;category&quot;,&#10;    title: &quot;商品分类&quot;,&#10;    value: &quot;1&quot;,&#10;    props: {&#10;        data: [{ value: &quot;1&quot;, label: &quot;电子产品&quot;, children: [{ value: &quot;11&quot;, label: &quot;手机&quot; }] }],&#10;        placeholder: &quot;请选择分类&quot;,&#10;        clearable: true,&#10;    },&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Transfer 穿梭框 | `transfer` | `data`、`titles`、`search`、`searchProps` | `change` | <pre><code>const rule = {&#10;    type: &quot;transfer&quot;,&#10;    field: &quot;transfer&quot;,&#10;    title: &quot;权限分配&quot;,&#10;    value: [],&#10;    props: {&#10;        data: [{ value: 1, label: '查看用户' }, { value: 2, label: '编辑用户' }],&#10;        titles: ['待分配', '已分配'],&#10;        search: true,&#10;    },&#10;    on: { change: (value, context) =&gt; console.log('右侧列表变化:', value, context) },&#10;}</code></pre> |
| TagInput 标签输入 | `tagInput` | `placeholder`、`clearable`、`max`、`disabled` | `change`、`enter` | <pre><code>const rule = {&#10;    type:&quot;tagInput&quot;,&#10;    title:&quot;商品标签&quot;,&#10;    field:&quot;tags&quot;,&#10;    value: [],&#10;    props: { placeholder: &quot;请输入标签&quot;, clearable: true, max: 5 },&#10;    on: {&#10;        change: (value) =&gt; console.log('标签改变:', value),&#10;        enter: (value) =&gt; console.log('按下回车:', value),&#10;    },&#10;}</code></pre> |
| RangeInput 范围输入 | `rangeInput` | `placeholder`、`separator`、`clearable`、`disabled` | `change`、`enter` | <pre><code>const rule = {&#10;    type:&quot;rangeInput&quot;,&#10;    title:&quot;价格范围&quot;,&#10;    field:&quot;priceRange&quot;,&#10;    value: [],&#10;    props: { placeholder: [&quot;最低价&quot;, &quot;最高价&quot;], clearable: true },&#10;    on: { change: (value) =&gt; console.log('范围改变:', value) },&#10;}</code></pre> |
| ColorPicker 颜色选择 | `ColorPicker` | `enableAlpha`、`swatchColors`、`disabled` | `change` | <pre><code>const rule = {&#10;    type: &quot;ColorPicker&quot;,&#10;    field: &quot;color&quot;,&#10;    title: &quot;颜色&quot;,&#10;    value: '#ff7271',&#10;    on: { change: (value) =&gt; console.log('颜色改变:', value) },&#10;}</code></pre> |
| Upload 上传 | `upload` | `action`、`accept`、`max`、`multiple`、`theme`(image/file)、`onSuccess` | `change`、`fail`、`progress` | <pre><code>const rule = {&#10;    type: &quot;upload&quot;,&#10;    field: &quot;image&quot;,&#10;    title: &quot;商品图片&quot;,&#10;    value: [],&#10;    props: {&#10;        action: &quot;/upload.php&quot;,&#10;        theme: &quot;image&quot;,&#10;        accept: &quot;image/*&quot;,&#10;        max: 5,&#10;        multiple: true,&#10;        onSuccess: function (file) {&#10;            file.url = file.response.url;&#10;        }&#10;    },&#10;    on: {&#10;        change: (fileList, context) =&gt; console.log('文件状态改变:', context.file.status),&#10;        fail: (file) =&gt; console.log('上传失败:', file),&#10;    },&#10;}</code></pre> |
| Hidden 隐藏字段 | `hidden` | - | - | <pre><code>const rule = {&#10;  type:&quot;hidden&quot;,&#10;  field:&quot;id&quot;,&#10;  value:&quot;11&quot;&#10;}</code></pre> |
| Hidden 隐藏字段 | `hidden` | - | - | <pre><code>const rule = {&#10;  type:&quot;hidden&quot;,&#10;  field:&quot;id&quot;,&#10;  value:&quot;09&quot;&#10;}</code></pre> |

提示：
- TDesign 的校验 `validator` 返回值与 `trigger/type` 口径与 async-validator 不同，迁移时务必对齐。
- `DatePicker` 的 `type` 负责切换 date/datetime/range 等模式；不确定时先用最小 demo 验证 value 类型。

