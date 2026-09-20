# FormCreate + Element Plus（运行态要点）

本文档用于 **Element Plus** 栈下的运行态使用要点整理：`label`、`option/global`、`validate`、组件 `rule.type` 速查（含常用 props/事件与最小示例）。

---

## 1. 安装与入口（仅提示）

安装与入口挂载请优先查 **FormCreate安装助手** 的 `references/ui-element-plus.md`，本文不重复安装细节。

---

## 2. label 布局（Element Plus：`labelPosition` / `labelWidth`）

Element Plus 的表单标签布局主要由 `labelPosition` 与 `labelWidth` 决定，在 FormCreate 里常见落点：

- **全局默认（推荐）**：`option.form.labelPosition / option.form.labelWidth`
- **FormItem 级别**：`option.wrap`（例如统一的 `labelWidth`）

示例：

```js
const option = {
    form: {
        labelPosition: 'right',
        labelWidth: '125px',
        inline: false
    },
    wrap: {
        labelWidth: '125px'
    }
}
```

---

## 3. global（Element Plus 相关 option 结构）

Element Plus 栈下，常用 UI 相关全局配置包含：

- `option.form`：表单整体（inline/labelPosition/labelWidth/showMessage/statusIcon/disabled/size 等）
- `option.row`：栅格行（gutter/type/align/justify/tag 等）
- `option.submitBtn` / `option.resetBtn`：按钮（type/size/round/loading/col/click 等）
- `option.info`：提示（popover/tooltip）
- `option.wrap`：全局 FormItem（例如 labelWidth/error 等）

`option.form` 默认值（摘要，便于对齐字段名）：

```js
{
    inline: false,
    labelPosition: 'right',
    labelWidth: '125px',
    hideRequiredAsterisk: false,
    showMessage: true,
    statusIcon: false,
    validateOnRuleChange: true,
    disabled: false,
    size: undefined,
    title: true
}
```

---

## 4. validate（校验规则口径）

校验参数表（async-validator 口径）：

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
- `pattern` 为 **string** 时，前后不要包含 `/`。
- `type` 必须与组件 `value` 数据类型一致。
- `validator` 必须执行 `callback()`。

---

## 5. 组件速查（`rule.type` / props / on / 规则示例）

说明：
- `props` 对应 `rule.props`（透传到 Element Plus 组件）。
- `on` 对应 `rule.on`（事件名以组件页为准；不同版本可能略有差异）。

| 组件 | `rule.type` | props（`rule.props`） | 事件（`rule.on`） | 示例（最小可运行） |
|---|---|---|---|---|
| Input 输入框 | `input` | `placeholder`、`clearable`、`disabled`、`maxlength`、`type`(textarea/password) | `change`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;input&quot;,&#10;    title:&quot;搜索关键词&quot;,&#10;    field:&quot;keyword&quot;,&#10;    props: {&#10;        placeholder: &quot;请输入搜索关键词&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        change: (value) =&gt; console.log('输入值改变:', value),&#10;        blur: (event) =&gt; console.log('失去焦点:', event),&#10;    },&#10;}</code></pre> |
| AutoComplete 自动完成 | `autoComplete` | `placeholder`、`clearable`、`fetchSuggestions`、`debounce`、`valueKey`、`disabled` | `select`、`change`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type: &quot;autoComplete&quot;,&#10;    title: &quot;商品搜索&quot;,&#10;    field: &quot;product&quot;,&#10;    props: {&#10;        placeholder: &quot;请输入商品名称&quot;,&#10;        clearable: true,&#10;        fetchSuggestions: function (queryString, cb) {&#10;            cb([{value: queryString}, {value: queryString + queryString}]);&#10;        },&#10;    },&#10;    on: {&#10;        select: (item) =&gt; console.log('选择建议项:', item),&#10;        change: (value) =&gt; console.log('输入值改变:', value),&#10;    },&#10;}</code></pre> |
| InputNumber 数字输入框 | `InputNumber` | `min`、`max`、`step`、`precision`、`controls`、`controlsPosition`、`disabled`、`placeholder` | `change`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;InputNumber&quot;,&#10;    field: &quot;quantity&quot;,&#10;    title: &quot;购买数量&quot;,&#10;    value: 1,&#10;    props: { min: 1, max: 100, step: 1 },&#10;    on: { change: (value) =&gt; console.log('数值改变:', value) },&#10;}</code></pre> |
| Select 下拉选择 | `select` | `placeholder`、`clearable`、`multiple`、`filterable`、`remote`、`remoteMethod`、`loading` | `change`、`blur`、`focus`、`clear`、`visible-change`、`remove-tag` | <pre><code>const rule = {&#10;    type: &quot;select&quot;,&#10;    field: &quot;category&quot;,&#10;    title: &quot;商品分类&quot;,&#10;    options: [&#10;        {&quot;value&quot;: &quot;104&quot;, &quot;label&quot;: &quot;生态蔬菜&quot;},&#10;        {&quot;value&quot;: &quot;105&quot;, &quot;label&quot;: &quot;新鲜水果&quot;},&#10;    ],&#10;    props: {&#10;        placeholder: &quot;请选择分类&quot;,&#10;        clearable: true,&#10;    },&#10;    on: {&#10;        change: (value) =&gt; console.log('选择值改变:', value),&#10;        'visible-change': (visible) =&gt; console.log('下拉框显示状态:', visible),&#10;    },&#10;}</code></pre> |
| Radio 单选框 | `radio` | `type`(button/radio)、`size`、`disabled`、`fill`、`textColor` | `change` | <pre><code>const rule = {&#10;    type:&quot;radio&quot;,&#10;    title:&quot;配送方式&quot;,&#10;    field:&quot;delivery&quot;,&#10;    value:&quot;1&quot;,&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;快递配送&quot;},&#10;        {value:&quot;2&quot;,label:&quot;门店自提&quot;},&#10;    ],&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Checkbox 多选框 | `checkbox` | `min`、`max`、`type`(button/checkbox)、`size`、`disabled`、`fill`、`textColor` | `change` | <pre><code>const rule = {&#10;    type:&quot;checkbox&quot;,&#10;    title:&quot;商品标签&quot;,&#10;    field:&quot;tags&quot;,&#10;    value:[],&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;热销&quot;},&#10;        {value:&quot;2&quot;,label:&quot;新品&quot;},&#10;    ],&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Switch 开关 | `switch` | `activeValue`、`inactiveValue`、`activeText`、`inactiveText`、`loading`、`disabled`、`size`、`beforeChange` | `change` | <pre><code>const rule = {&#10;    type:&quot;switch&quot;,&#10;    title:&quot;是否上架&quot;,&#10;    field:&quot;is_show&quot;,&#10;    value:&quot;1&quot;,&#10;    props: { activeValue: &quot;1&quot;, inactiveValue: &quot;0&quot; },&#10;    on: { change: (value) =&gt; console.log('开关状态改变:', value) },&#10;}</code></pre> |
| Slider 滑块 | `slider` | `min`、`max`、`step`、`range`、`showInput`、`showStops`、`formatTooltip`、`vertical`、`height` | `change`、`input` | <pre><code>const rule = {&#10;    type:&quot;slider&quot;,&#10;    field:&quot;volume&quot;,&#10;    title:&quot;音量&quot;,&#10;    value:50,&#10;    props:{ min: 0, max: 100 },&#10;    on: {&#10;        change: (value) =&gt; console.log('值改变（拖拽结束）:', value),&#10;        input: (value) =&gt; console.log('值改变（实时）:', value),&#10;    },&#10;}</code></pre> |
| Rate 评分 | `rate` | `max`、`allowHalf`、`clearable`、`showText`、`texts`、`showScore`、`scoreTemplate`、`disabled` | `change` | <pre><code>const rule = {&#10;    type:&quot;rate&quot;,&#10;    field:&quot;rating&quot;,&#10;    title:&quot;商品评分&quot;,&#10;    value:0,&#10;    props:{ allowHalf: true, max: 5 },&#10;    on: { change: (value) =&gt; console.log('评分改变:', value) },&#10;}</code></pre> |
| DatePicker 日期选择 | `DatePicker` | `type`(date/datetime/daterange/...)、`format`、`valueFormat`、`placeholder`、`clearable`、`disabledDate` | `change`、`blur`、`focus`、`clear`、`visible-change` | <pre><code>const rule = {&#10;    type: &quot;DatePicker&quot;,&#10;    field: &quot;date&quot;,&#10;    title: &quot;活动日期&quot;,&#10;    value: &quot;&quot;,&#10;    props: {&#10;        type: &quot;date&quot;,&#10;        format: &quot;YYYY-MM-DD&quot;,&#10;        valueFormat: &quot;YYYY-MM-DD&quot;,&#10;        placeholder: &quot;请选择日期&quot;,&#10;    },&#10;    on: {&#10;        change: (value) =&gt; console.log('日期改变:', value),&#10;        clear: () =&gt; console.log('清空日期'),&#10;    },&#10;}</code></pre> |
| TimePicker 时间选择 | `TimePicker` | `isRange`、`format`、`valueFormat`、`placeholder`、`startPlaceholder`、`endPlaceholder`、`clearable`、`arrowControl` | `change`、`blur`、`focus`、`clear`、`visible-change` | <pre><code>const rule = {&#10;    type: &quot;TimePicker&quot;,&#10;    field: &quot;startTime&quot;,&#10;    title: &quot;开始时间&quot;,&#10;    value: &quot;09:00:00&quot;,&#10;    props: { format: &quot;HH:mm:ss&quot;, clearable: true },&#10;    on: {&#10;        change: (value) =&gt; console.log('时间改变:', value),&#10;        clear: () =&gt; console.log('清空时间'),&#10;    },&#10;}</code></pre> |
| TimeSelect 时间选择 | `elTimeSelect` | `start`、`end`、`step`、`minTime`、`maxTime`、`includeEndTime`、`placeholder`、`clearable` | `change`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type: &quot;elTimeSelect&quot;,&#10;    field: &quot;workTime&quot;,&#10;    title: &quot;工作时间&quot;,&#10;    value: &quot;09:00&quot;,&#10;    props: { start: &quot;09:00&quot;, end: &quot;18:00&quot;, step: &quot;00:30&quot;, placeholder: &quot;请选择时间&quot; },&#10;    on: { change: (value) =&gt; console.log('时间改变:', value) },&#10;}</code></pre> |
| Cascader 多级联动 | `cascader` | `options`、`props`(字段映射) 、`placeholder`、`clearable`、`filterable` | `change`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;cascader&quot;,&#10;    title:&quot;所在区域&quot;,&#10;    field:&quot;address&quot;,&#10;    value:[],&#10;    props:{&#10;        options: [&#10;            { value: 'beijing', label: '北京', children: [{ value: 'chaoyang', label: '朝阳区' }] }&#10;        ],&#10;        placeholder: &quot;请选择区域&quot;,&#10;        clearable: true,&#10;    },&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Tree 树形组件 | `tree` | `data`、`props`(label/children) 、`showCheckbox`、`nodeKey`、`defaultExpandedKeys` | `check`、`node-click`、`current-change` | <pre><code>const rule = {&#10;    type:&quot;tree&quot;,&#10;    title:&quot;权限&quot;,&#10;    field:&quot;permissions&quot;,&#10;    value:[],&#10;    props:{&#10;        data: [{ id: 1, label: '用户管理', children: [{ id: 11, label: '查看用户' }] }],&#10;        props: { label: 'label', children: 'children' },&#10;        showCheckbox: true,&#10;        nodeKey: 'id',&#10;    },&#10;}</code></pre> |
| TreeSelect 树形选择 | `elTreeSelect` | `data`、`multiple`、`filterable`、`showCheckbox`、`collapseTags`、`placeholder` | `change`、`visible-change`、`clear` | <pre><code>const rule = {&#10;    type:&quot;elTreeSelect&quot;,&#10;    title:&quot;商品分类&quot;,&#10;    field:&quot;categories&quot;,&#10;    value:[],&#10;    props:{&#10;        data:[{ value: 'electronics', label: '电子产品', children: [{ value: 'phone', label: '手机' }] }],&#10;        multiple: true,&#10;        collapseTags: true,&#10;        placeholder: &quot;请选择分类&quot;,&#10;    },&#10;}</code></pre> |
| Transfer 穿梭框 | `elTransfer` | `data`、`filterable`、`filterPlaceholder`、`titles`、`buttonTexts`、`props`(字段映射) | `change`、`left-check-change`、`right-check-change` | <pre><code>const rule = {&#10;    type: &quot;elTransfer&quot;,&#10;    field: &quot;users&quot;,&#10;    title: &quot;用户选择&quot;,&#10;    value: [],&#10;    props: {&#10;        data: [{label: '张三', key: '1'}, {label: '李四', key: '2'}],&#10;        filterable: true,&#10;        filterPlaceholder: &quot;请输入关键词搜索&quot;,&#10;    },&#10;    on: { change: (value, direction, movedKeys) =&gt; console.log('右侧列表变化:', value, direction, movedKeys) },&#10;}</code></pre> |
| Mention 提及 | `elMention` | `options`、`prefix`、`split`、`whole`、`loading`、`placement` | `search`、`select`、`change` | <pre><code>const rule = {&#10;    type:&quot;elMention&quot;,&#10;    title:&quot;评论&quot;,&#10;    field:&quot;comment&quot;,&#10;    value: &quot;&quot;,&#10;    props: {&#10;        prefix: '@',&#10;        options: [{ label: '张三', value: '1' }, { label: '李四', value: '2' }],&#10;    },&#10;    on: {&#10;        search: (query, cb) =&gt; cb([{ label: query + '1', value: '1' }]),&#10;        select: (option) =&gt; console.log('选择提及:', option),&#10;    },&#10;}</code></pre> |
| InputTag 标签输入 | `elInputTag` | `max`、`placeholder`、`delimiter`、`draggable`、`saveOnBlur`、`clearable`、`disabled` | `change`、`add-tag`、`remove-tag`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;elInputTag&quot;,&#10;    title:&quot;商品标签&quot;,&#10;    field:&quot;tags&quot;,&#10;    value: [],&#10;    props: { max: 5, placeholder: &quot;请输入标签，最多5个&quot; },&#10;    on: {&#10;        change: (value) =&gt; console.log('标签改变:', value),&#10;        'add-tag': (value) =&gt; console.log('添加标签:', value),&#10;        'remove-tag': (value) =&gt; console.log('移除标签:', value),&#10;    },&#10;}</code></pre> |
| ColorPicker 颜色选择 | `ColorPicker` | `showAlpha`、`colorFormat`、`predefine`、`disabled`、`size` | `change`、`active-change`、`focus`、`blur` | <pre><code>const rule = {&#10;    type: &quot;ColorPicker&quot;,&#10;    field: &quot;color&quot;,&#10;    title: &quot;主题颜色&quot;,&#10;    value: '#409EFF',&#10;    props: { showAlpha: true, colorFormat: 'rgba' },&#10;    on: {&#10;        change: (value) =&gt; console.log('颜色改变:', value),&#10;        'active-change': (value) =&gt; console.log('当前显示颜色:', value),&#10;    },&#10;}</code></pre> |
| Frame 框架 | `frame` | `type`(image/file/input)、`src`、`maxLength`、`width`、`height`、`helper`、`disabled`、`okBtnText` | `change`、`open`、`ok`、`close` | <pre><code>const rule = {&#10;    type:&quot;frame&quot;,&#10;    title:&quot;商品图片&quot;,&#10;    field:&quot;images&quot;,&#10;    value:[],&#10;    props:{ type:&quot;image&quot;, src:&quot;/image-selector.html&quot;, maxLength: 9 },&#10;}</code></pre> |
| Hidden 隐藏字段 | `hidden` | - | - | <pre><code>const rule = {&#10;  type:&quot;hidden&quot;,&#10;  field:&quot;id&quot;,&#10;  value:&quot;13&quot;&#10;}</code></pre> |
| Upload 上传 | `upload` | `action`、`accept`、`limit`、`multiple`、`listType`、`drag`、`beforeUpload`、`httpRequest`、`onSuccess` | `change`（封装事件） | <pre><code>const rule = {&#10;    type: &quot;upload&quot;,&#10;    field: &quot;avatar&quot;,&#10;    title: &quot;头像&quot;,&#10;    value: [],&#10;    props: {&#10;        type: &quot;select&quot;,&#10;        uploadType: &quot;image&quot;,&#10;        action: &quot;/upload.php&quot;,&#10;        name: &quot;file&quot;,&#10;        accept: &quot;image/*&quot;,&#10;        limit: 1,&#10;        onSuccess: function (res, file) {&#10;            file.url = res.data.filePath;&#10;        }&#10;    },&#10;    on: {&#10;        change: (info) =&gt; console.log('文件状态改变:', info),&#10;    },&#10;}</code></pre> |

提示：
- `@form-create/element-ui` 在 Vue3 场景对应 Element Plus；运行态示例请不要混入 Vue2 的 Element UI 事件/props 口径。
- 组件 `type` 的大小写/别名以你当前渲染器实际识别为准；不确定时用最小 demo 验证。

