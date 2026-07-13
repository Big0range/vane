export default [
  {
    type: 'treeSelect',
    field: 'parent_id',
    title: '上级菜单',
    validate: [
      {
        required: true,
        message: '请选择上级菜单',
        trigger: 'blur',
        type: 'number',
      },
    ],

    props: {
      placeholder: '上级菜单',
      defaultExpandAll: true,
      labelField: 'label',
      keyField: 'value',
      childrenField: 'children',
      options: [],
      filterable: true,
      clearable: true,
    },
    effect: {
      loadData: {
        attr: 'menuOptions',
        to: 'props.options',
      },
    },
  },
  {
    type: 'input',
    field: 'title',
    title: '菜单名称',
    props: {
      placeholder: '请输入菜单名称',
    },
  },
  {
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
    update(val: any, rule: any, api: any) {
      const pathRule = api.getRule('path');
      if (pathRule) {
        const placeholder =
          val === 'CATALOG'
            ? '/system  (目录以/开头)'
            : 'system  (菜单不要以/开头)';
        pathRule.props.placeholder = placeholder || '菜单路径';
      }
    },
    control: [
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
      // type === "BUTTON" || type === "MENU"
      {
        value: ['BUTTON', 'MENU'],
        condition: 'in',
        rule: [
          {
            type: 'select',
            field: 'routes',
            title: '绑定接口',
            props: {
              placeholder:
                '未绑定的接口,除白名单路由外,未拥有此菜单的角色将不可调用',
              labelField: 'url',
              valueField: 'id',
              filterable: true,
              clearable: true,
              multiple: true,
            },
            effect: {
              loadData: {
                attr: 'routesOptions',
                to: 'props.options',
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'input',
    field: 'redirect',
    title: '重定向',
    props: {
      placeholder: '请输入重定向路径',
    },
  },
  {
    type: 'input-number',
    field: 'sort',
    title: '排序',
    style: 'width: 100px',
    props: {
      placeholder: '请输入排序',
      min: 0,
    },
  },
];
