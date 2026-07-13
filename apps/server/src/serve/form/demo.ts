export default {
  code: 'demo',
  desc: '测试表单-desc',
  title: '测试表单-title',
  rule: [
    {
      type: 'treeSelect',
      field: 'parent_id',
      props: {
        options: [],
        keyField: 'id',
        clearable: true,
        filterable: true,
        labelField: 'title',
        placeholder: '上级菜单',
        childrenField: 'children',
        defaultExpandAll: true,
      },
      title: '上级菜单',
      effect: { loadData: { to: 'props.options', attr: 'menuOptions' } },
      validate: [{ type: 'number', message: '请选择上级菜单', trigger: 'blur', required: true }],
    },
    {
      type: 'input',
      field: 'title',
      props: { placeholder: '请输入菜单名称' },
      title: '菜单名称',
    },
    {
      type: 'radio',
      field: 'type',
      title: '菜单类型',
      control: [
        {
          rule: [
            {
              type: 'input',
              field: 'name',
              props: { placeholder: '请输入页面name' },
              title: '页面name',
            },
            {
              type: 'input',
              field: 'component',
              title: '菜单组件',
              validate: [{ message: '请输入组件完整路径', trigger: 'blur', required: true }],
            },
          ],
          value: 'MENU',
          condition: '==',
        },
        {
          rule: [
            {
              type: 'input',
              field: 'extlink',
              props: { placeholder: '请输入外链地址' },
              title: '外链地址',
            },
          ],
          value: 'EXTLINK',
          condition: '==',
        },
        {
          rule: [
            {
              type: 'input',
              field: 'path',
              props: { placeholder: '' },
              title: '菜单路径',
            },
            {
              type: 'radio',
              field: 'keep_alive',
              title: '是否缓存',
              options: [
                { label: '否', value: 0 },
                { label: '是', value: 1 },
              ],
            },
          ],
          value: ['CATALOG', 'MENU'],
          condition: 'in',
        },
        {
          rule: [
            {
              type: 'input',
              field: 'permission',
              props: { placeholder: '比如: sys:user:add' },
              title: '权限标识',
              form_id: 2,
            },
          ],
          value: 'BUTTON',
          condition: '==',
        },
        {
          rule: [
            { type: 'input', field: 'icon', title: '菜单图标' },
            {
              type: 'radio',
              field: 'hidden',
              title: '是否隐藏',
              options: [
                { id: 15, label: '显示', value: 0 },
                { id: 16, label: '隐藏', value: 1 },
              ],
            },
          ],
          value: 'BUTTON',
          condition: '!=',
        },
      ],
      options: [
        {
          label: '目录',
          value: 'CATALOG',
        },
        {
          label: '菜单',
          value: 'MENU',
        },
        {
          label: '按钮',
          value: 'BUTTON',
        },
        {
          label: '外链',
          value: 'EXTLINK',
        },
      ],
      validate: [{ message: '请选择菜单类型', trigger: 'blur', required: true }],
    },
    {
      type: 'input',
      field: 'redirect',
      props: { placeholder: '请输入重定向路径' },
      title: '重定向',
    },
    {
      type: 'input-number',
      field: 'sort',
      props: { min: 0, placeholder: '请输入排序' },
      style: 'width: 100px',
      title: '排序',
    },
  ],
  option: {
    labelWidth: '120px',
  },
};
