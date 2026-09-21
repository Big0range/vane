# FormCreate + Arco Design（运行态要点）

本文档用于 **Arco Design** 栈下的运行态使用要点整理：`label`、`option/global`、`validate`、组件 `rule.type` 速查（含常用 props/事件与最小示例）。

---

## 1. 安装与入口（仅提示）

安装与入口挂载请优先查 **FormCreate安装助手** 的 `references/ui-arco-design.md`，本文不重复安装细节。

---

## 2. label 布局（`wrap.labelColProps` / `wrap.wrapperColProps`）

Arco Design 使用 `labelColProps` 与 `wrapperColProps` 配置标签与组件容器的栅格布局；在 FormCreate 里常见两种落点：

- **字段级**：`rule.wrap.labelColProps / rule.wrap.wrapperColProps`
- **全局默认**：`option.form.labelColProps / option.form.wrapperColProps` 或 `option.wrap`（全局 FormItem 配置）

字段级示例：

```js
const rule = {
    type: 'input',
    field: 'username',
    title: '用户名',
    wrap: {
        labelColProps: { span: 6 },      // 标签占据6列
        wrapperColProps: { span: 18 }   // 组件容器占据18列
    }
}
```

要点：
- Arco 为 **24 栅格**：`labelColProps.span + wrapperColProps.span` 常见为 24。
- 响应式写法：`labelColProps.xs/sm/md/lg...` 与 `wrapperColProps.xs/sm/md/lg...`。

---

## 3. global（Arco 相关 option 结构）

Arco 栈下，常用的 UI 相关全局配置包含：

- `option.form`：表单整体（layout、labelAlign、labelColProps、wrapperColProps、size 等）
- `option.row`：栅格行（gutter 或响应式 gutter）
- `option.submitBtn` / `option.resetBtn`：按钮（show/innerText/type/col/click 等）
- `option.info`：提示（popover/tooltip）
- `option.wrap`：全局 FormItem（labelColProps/wrapperColProps/extra 等）

`option.form` 默认值（摘要，便于对齐字段名）：

```js
{
    layout: 'horizontal',
    labelAlign: 'right',
    labelColProps: { span: 3 },
    wrapperColProps: { span: 21 }
}
```

---

## 4. validate（校验规则口径）

Arco 校验字段常见参数表（来自 Arco 文档口径）：

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `type` | 校验值类型 | string | 'string' |
| `required` | 是否必填 | boolean | false |
| `message` | 校验文案 | string | - |
| `length` | 固定长度（string/array） | number | - |
| `minLength` | 最小长度（string） | number | - |
| `maxLength` | 最大长度（string） | number | - |
| `match` | 正则校验（string） | RegExp | - |
| `min` / `max` | 数值范围（number） | number | - |
| `validator` | 自定义校验 | (value, callback) => void | - |

注意事项（高频坑）：
- Arco 用 **`match`** 而不是 `pattern` 做正则校验。
- 字符串长度用 **`minLength/maxLength`**，不是 `min/max`。
- 自定义 `validator` 无论成功/失败都必须执行 `callback`。

---

## 5. 组件速查（`rule.type` / props / on / 规则示例）

说明：
- `props` 对应 `rule.props`（透传到 Arco 组件）。
- `on` 对应 `rule.on`（事件名以组件页为准；不同版本可能略有差异）。

| 组件 | `rule.type` | props（`rule.props`） | 事件（`rule.on`） | 示例（最小可运行） |
|---|---|---|---|---|
| Input 输入框 | `input` | `placeholder`、`allowClear`、`disabled`、`maxLength`、`type`(textarea/password) | `input`、`change`、`blur`、`focus`、`clear` | <pre><code>const rule = {&#10;    type:&quot;input&quot;,&#10;    title:&quot;搜索关键词&quot;,&#10;    field:&quot;keyword&quot;,&#10;    props: {&#10;        placeholder: &quot;请输入搜索关键词&quot;,&#10;        allowClear: true,&#10;    },&#10;    on: {&#10;        input: (value) =&gt; console.log('实时输入:', value),&#10;        change: (value) =&gt; console.log('输入值改变:', value),&#10;    },&#10;}</code></pre> |
| Select 下拉选择 | `select` | `placeholder`、`allowClear`、`multiple`、`allowSearch`、`loading`、`maxTagCount` | `change`、`clear`、`search` | <pre><code>const rule = {&#10;    type: &quot;select&quot;,&#10;    field: &quot;category&quot;,&#10;    title: &quot;商品分类&quot;,&#10;    options: [&#10;        {&quot;value&quot;: &quot;104&quot;, &quot;label&quot;: &quot;生态蔬菜&quot;},&#10;        {&quot;value&quot;: &quot;105&quot;, &quot;label&quot;: &quot;新鲜水果&quot;},&#10;    ],&#10;    props: {&#10;        placeholder: &quot;请选择分类&quot;,&#10;        allowClear: true,&#10;    },&#10;    on: {&#10;        change: (value, option) =&gt; console.log('选择值改变:', value, option),&#10;        clear: () =&gt; console.log('清空选择'),&#10;    },&#10;}</code></pre> |
| AutoComplete 自动完成 | `autoComplete` | `data`、`placeholder`、`disabled`、`strict` | `change`、`search`、`select` | <pre><code>const rule = {&#10;    type: &quot;autoComplete&quot;,&#10;    title: &quot;商品名称&quot;,&#10;    field: &quot;product&quot;,&#10;    value: &quot;&quot;,&#10;    props: {&#10;        data: [{ value: &quot;iPhone 15 Pro&quot; }, { value: &quot;MacBook Pro&quot; }],&#10;        placeholder: &quot;请输入或选择商品&quot;,&#10;    },&#10;    on: {&#10;        select: (value) =&gt; console.log('选择选项:', value),&#10;        search: (value) =&gt; console.log('搜索值:', value),&#10;    },&#10;}</code></pre> |
| InputNumber 数字输入框 | `InputNumber` | `min`、`max`、`step`、`precision`、`mode`、`disabled`、`placeholder` | `change`、`blur`、`focus` | <pre><code>const rule = {&#10;    type: &quot;InputNumber&quot;,&#10;    field: &quot;quantity&quot;,&#10;    title: &quot;购买数量&quot;,&#10;    value: 1,&#10;    props: { min: 1, max: 100, step: 1 },&#10;    on: { change: (value) =&gt; console.log('数值改变:', value) },&#10;}</code></pre> |
| Radio 单选框 | `radio` | `type`(radio/button)、`size`、`direction`、`disabled` | `change` | <pre><code>const rule = {&#10;    type:&quot;radio&quot;,&#10;    title:&quot;配送方式&quot;,&#10;    field:&quot;delivery&quot;,&#10;    value:&quot;1&quot;,&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;快递配送&quot;},&#10;        {value:&quot;2&quot;,label:&quot;门店自提&quot;},&#10;    ],&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Checkbox 多选框 | `checkbox` | `direction`、`disabled` | `change` | <pre><code>const rule = {&#10;    type:&quot;checkbox&quot;,&#10;    title:&quot;商品标签&quot;,&#10;    field:&quot;tags&quot;,&#10;    value:[],&#10;    options:[&#10;        {value:&quot;1&quot;,label:&quot;热销&quot;},&#10;        {value:&quot;2&quot;,label:&quot;新品&quot;},&#10;    ],&#10;    on: { change: (value) =&gt; console.log('选择值改变:', value) },&#10;}</code></pre> |
| Switch 开关 | `switch` | `checkedValue`、`uncheckedValue`、`loading`、`disabled`、`size`、`type`(circle/round/line) | `change` | <pre><code>const rule = {&#10;    type:&quot;switch&quot;,&#10;    title:&quot;是否上架&quot;,&#10;    field:&quot;is_show&quot;,&#10;    value:&quot;1&quot;,&#10;    props: { checkedValue: &quot;1&quot;, uncheckedValue: &quot;0&quot; },&#10;    on: { change: (value) =&gt; console.log('开关状态改变:', value) },&#10;}</code></pre> |
| Slider 滑块 | `slider` | `min`、`max`、`step`、`range`、`marks`、`showInput`、`direction`、`disabled` | `change` | <pre><code>const rule = {&#10;    type:&quot;slider&quot;,&#10;    field:&quot;volume&quot;,&#10;    title:&quot;音量&quot;,&#10;    value:50,&#10;    props:{ min: 0, max: 100 },&#10;    on: { change: (value) =&gt; console.log('滑块值改变:', value) },&#10;}</code></pre> |
| Rate 评分 | `rate` | `count`、`allowHalf`、`allowClear`、`grading`、`readonly`、`disabled` | `change`、`hover-change` | <pre><code>const rule = {&#10;    type:&quot;rate&quot;,&#10;    field:&quot;rating&quot;,&#10;    title:&quot;商品评分&quot;,&#10;    value:0,&#10;    props:{ allowHalf: true, count: 5 },&#10;    on: { change: (value) =&gt; console.log('评分改变:', value) },&#10;}</code></pre> |
| DatePicker 日期选择 | `DatePicker` | `type`(date/datetime/daterange/...)、`format`、`placeholder`、`allowClear` | `change`、`clear`、`popup-visible-change` | <pre><code>const rule = {&#10;    type: &quot;DatePicker&quot;,&#10;    field: &quot;date&quot;,&#10;    title: &quot;选择日期&quot;,&#10;    value: null,&#10;    props: {&#10;        type: &quot;date&quot;,&#10;        format: &quot;YYYY-MM-DD&quot;,&#10;        placeholder: &quot;请选择日期&quot;,&#10;        allowClear: true,&#10;    },&#10;    on: {&#10;        change: (dateString, date) =&gt; console.log('日期改变:', dateString, date),&#10;        clear: () =&gt; console.log('清空日期'),&#10;    },&#10;}</code></pre> |
| TimePicker 时间选择 | `TimePicker` | `type`(time/time-range)、`format`、`placeholder`、`allowClear`、`use12Hours`、`step` | `change`、`select`、`clear`、`popup-visible-change` | <pre><code>const rule = {&#10;    type: &quot;TimePicker&quot;,&#10;    field: &quot;time&quot;,&#10;    title: &quot;选择时间&quot;,&#10;    value: null,&#10;    props: { format: &quot;HH:mm:ss&quot;, allowClear: true },&#10;    on: {&#10;        change: (timeString, time) =&gt; console.log('时间改变:', timeString, time),&#10;        clear: () =&gt; console.log('清空时间'),&#10;    },&#10;}</code></pre> |
| Cascader 多级联动 | `cascader` | `options`、`placeholder`、`allowSearch`、`allowClear`、`multiple`、`loadMore` | `change`、`clear`、`search`、`popup-visible-change` | <pre><code>const rule = {&#10;    type:&quot;cascader&quot;,&#10;    title:&quot;所在区域&quot;,&#10;    field:&quot;address&quot;,&#10;    value:[],&#10;    props:{&#10;        options: [&#10;            { value: 'beijing', label: '北京', children: [{ value: 'chaoyang', label: '朝阳区' }] }&#10;        ],&#10;        placeholder: &quot;请选择区域&quot;,&#10;        allowClear: true,&#10;    },&#10;    on: { change: (value, option) =&gt; console.log('选择值改变:', value, option) },&#10;}</code></pre> |
| Tree 树形组件 | `tree` | `data`、`checkable`、`selectable`、`multiple`、`defaultExpandAll`、`loadMore`、`fieldNames` | `check`、`select`、`expand`、`drag-start`、`drop` | <pre><code>const rule = {&#10;    type:&quot;tree&quot;,&#10;    title:&quot;权限选择&quot;,&#10;    field:&quot;permissions&quot;,&#10;    value:[],&#10;    props:{&#10;        data: [{ key: 1, title: '用户管理', children: [{ key: 11, title: '查看用户' }] }],&#10;        checkable: true,&#10;    },&#10;    on: { check: (checkedKeys) =&gt; console.log('勾选节点改变:', checkedKeys) },&#10;}</code></pre> |
| Frame 框架 | `frame` | `type`(image/file/input)、`src`、`maxLength`、`width`、`height`、`helper`、`disabled` | `open`、`close`、`change` | <pre><code>const rule = {&#10;    type:&quot;frame&quot;,&#10;    title:&quot;素材选择&quot;,&#10;    field:&quot;material&quot;,&#10;    value:[],&#10;    props:{ type:&quot;image&quot;, src:&quot;/material-picker.html&quot;, maxLength: 5 },&#10;    on: {&#10;        open: () =&gt; console.log('打开弹出框'),&#10;        close: () =&gt; console.log('关闭弹出框'),&#10;        change: (value) =&gt; console.log('值改变:', value),&#10;    },&#10;}</code></pre> |
| Hidden 隐藏字段 | `hidden` | - | - | <pre><code>const rule = {&#10;  type:&quot;hidden&quot;,&#10;  field:&quot;id&quot;,&#10;  value:&quot;12&quot;&#10;}</code></pre> |
| Upload 上传 | `upload` | `action`、`accept`、`limit`、`multiple`、`listType`、`draggable`、`onSuccess` | `change`、`progress`、`error`、`preview` | <pre><code>const rule = {&#10;    type: &quot;upload&quot;,&#10;    field: &quot;image&quot;,&#10;    title: &quot;商品图片&quot;,&#10;    value: [],&#10;    props: {&#10;        action: &quot;/upload.php&quot;,&#10;        listType: &quot;picture-card&quot;,&#10;        accept: &quot;image/*&quot;,&#10;        limit: 5,&#10;        multiple: true,&#10;        onSuccess: function (file) {&#10;            file.url = file.response.url;&#10;        }&#10;    },&#10;    on: {&#10;        change: (fileList, fileItem) =&gt; console.log('文件状态改变:', fileItem.status),&#10;        error: (fileItem) =&gt; console.log('上传失败:', fileItem),&#10;    },&#10;}</code></pre> |

提示：
- Arco 的 `rule.wrap` 字段名为 `labelColProps/wrapperColProps`，与 Ant Design Vue 的 `labelCol/wrapperCol` 不同。
- 若遇到 `DatePicker/RangePicker` 等别名差异，以你当前渲染器实际识别的 `type` 为准，先用最小 demo 验证。

