# Client Context

技术栈：

- Vue3
- script setup
- TypeScript
- Naive UI
- FormCreate
- Pinia

规范：

- 页面放 views
- 通用组件放 components
- composable 放 hooks
- 接口 放 api
- api 调用仿照其他, 全部经过 utils/request
- 不直接 fetch

UI：

- 使用 naive-ui,form-create
- 禁止 element-plus

form-create生成规则:

- 表单字段名 与 接口返回字段名 保持一致
- 表单字段类型 与 接口返回字段类型 保持一致示例:

```ts
// 基础示例
const demo1 = {
  type: 'treeSelect', // 组件类型 对应naivi-ui的组件
  field: 'parent_id', // 字段名
  title: '上级菜单', // 标题
  validate: [
    // 这里写校验规则 如果不需要校验则不写
    {
      required: true,
      message: '请选择上级菜单',
      trigger: 'blur',
      type: 'number',
    },
  ],
  props: {
    //传递给组件的props
    placeholder: '上级菜单',
    defaultExpandAll: true,
    labelField: 'label',
    keyField: 'value',
    childrenField: 'children',
    options: [],
    filterable: true,
    clearable: true,
  },
};
```

```ts
// 这是包含表单逻辑的示例
type Control = Array<
  | {
      //通过内置条件控制,和`handle`二选一
      value?: any;
      //内置的条件,可以和`value`组合使用
      condition?:
        | '=='
        | '!='
        | '<>'
        | '>'
        | '>='
        | '<'
        | '<='
        | 'in'
        | 'notIn'
        | 'on'
        | 'notOn'
        | 'between'
        | 'notBetween'
        | 'empty'
        | 'notEmpty';
      //自定义控制条件
      handle?: (val: any, api: Api) => boolean;
      //控制指定规则的显示,禁用,必填
      method?: 'display' | 'disabled' | 'hidden' | 'required';
      //控制的字段
      rule: string[];
    }
  | {
      //通过内置条件控制,和`handle`二选一
      value?: any;
      //内置的条件,可以和`value`组合使用
      condition?:
        | '=='
        | '!='
        | '<>'
        | '>'
        | '>='
        | '<'
        | '<='
        | 'in'
        | 'notIn'
        | 'on'
        | 'notOn'
        | 'between'
        | 'notBetween'
        | 'empty'
        | 'notEmpty';
      //自定义控制条件
      handle?: (val: any, api: Api) => boolean;
      //控制的规则
      rule: Rule[];
      //条件达成时,将`rule`添加到指定字段后面
      append?: string;
      //条件达成时,将`rule`添加到指定字段前面
      prepend?: string;
      //条件达成时,将`rule`添加到指定字段的子级, 不配置`append`和`prepend`时, 默认当前规则
      child?: boolean;
    }
>;
/**
 * 注意

handle 优先级大于 value

推荐采用第一种组件联动形式：提前在规则中定义好所有关联组件。

method 选项
键名    配置项    说明
if/hidden    条件渲染    控制组件的显示/隐藏状态
required    必填验证    设置字段是否为必填项
disabled/enabled    禁用状态    控制组件是否可交互
display    显示状态    控制组件的显示状态(会渲染 DOM)
注意

当前版本存在语义反转问题：hidden=true 时显示组件，disabled=true 时启用功能。为此新增了语义明确的 if（true显示/false隐藏）和 enabled（true启用/false禁用）参数。

condition 选项
键名    运算符    说明    值类型    示例
==    全等    组件值完全等于value    Any    value: 10
!=    不全等    组件值不等于value    Any    value: "error"
<>    不全等    组件值不等于value（同!=）    Any    value: false
>    大于    组件值大于value    Number    value: 100
>=    大于等于    组件值大于等于value    Number    value: 18
<    小于    组件值小于value    Number    value: 0
<=    小于等于    组件值小于等于value    Number    value: 100
in    包含    组件值存在于value数组中    Array    value: [1,2,3]
notIn    不包含    组件值不存在于value数组中    Array    value: ["a","b"]
on    包含值    value存在于组件值（数组）中    String    Number
notOn    不包含值    value不存在于组件值（数组）中    String    Number
between    区间内    组件值在value[0]和value[1]之间    Array[2]    value: [10,20]
notBetween    区间外    组件值不在value[0]和value[1]之间    Array[2]    value: [0,100]
empty    为空    组件值为空时通过验证    -    value: true
notEmpty    非空    组件值不为空时通过验证    -    value: true
pattern    正则    用正则表达式验证组件值    String    value:'^1\d{10}$' (不需要前后的"/")
 */

const demo2 = {
  type: 'radio',
  field: 'type',
  title: '菜单类型',
  validate: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  options: [
    {
      value: 'CATALOG',
      label: '目录',
    },
    {
      value: 'MENU',
      label: '菜单',
    },
    {
      value: 'BUTTON',
      label: '按钮',
    },
    {
      value: 'EXTLINK',
      label: '外链',
    },
  ],
  control: [
    // 这里写逻辑规则
    // type === 'MENU'
    {
      value: 'MENU',
      condition: '==',
      rule: [
        {
          type: 'input',
          field: 'name',
          title: '页面name',
          props: {
            placeholder: '请输入页面name',
          },
        },
        {
          type: 'input',
          field: 'component',
          title: '菜单组件',
          validate: [
            {
              required: true,
              message: '请输入组件完整路径',
              trigger: 'blur',
            },
          ],
        },
      ],
    },
    //   type === 'EXTLINK'
    {
      value: 'EXTLINK',
      condition: '==',
      rule: [
        {
          type: 'input',
          field: 'path',
          title: '外链地址',
          props: {
            placeholder: '请输入外链地址',
          },
        },
      ],
    },
    //   type == 'CATALOG' || type === 'MENU'
    {
      value: ['CATALOG', 'MENU'],
      condition: 'in',
      rule: [
        {
          type: 'input',
          field: 'path',
          title: '菜单路径',
          props: {
            placeholder: '',
          },
        },
        {
          type: 'radio',
          field: 'keep_alive',
          title: '是否缓存',
          options: [
            {
              value: 0,
              label: '否',
            },
            {
              value: 1,
              label: '是',
            },
          ],
        },
      ],
    },
    //   type === 'BUTTON'
    {
      value: 'BUTTON',
      condition: '==',
      rule: [
        {
          type: 'input',
          field: 'permission',
          title: '权限标识',
          props: {
            placeholder: '比如: sys:user:add',
          },
        },
      ],
    },
    //   type !== 'BUTTON'
    {
      value: 'BUTTON',
      condition: '!=',
      rule: [
        {
          field: 'icon',
          title: '菜单图标',
        },
        {
          type: 'radio',
          field: 'hidden',
          title: '是否隐藏',
          options: [
            {
              value: 0,
              label: '显示',
            },
            {
              value: 1,
              label: '隐藏',
            },
          ],
        },
      ],
    },
  ],
};
```
