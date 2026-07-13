import { NIsPhoneNumber } from '@vane/utils';

export default [
  {
    type: 'input',
    title: '用户名',
    field: 'username',
    value: '',
    props: {
      placeholder: '请输入用户名',
      clearable: true,
      showCount: true,
      maxlength: 20,
    },
    validate: [
      { required: true, message: '请输入用户名', trigger: 'input' },
      { min: 6, max: 20, message: '长度应为6到20', trigger: 'input' },
    ],
  },
  {
    type: 'select',
    title: '角色',
    field: 'role_id',
    value: '',
    props: {
      placeholder: '请选择角色',
      clearable: true,
      labelField: 'role_name',
      valueField: 'id',
      options: [],
    },
    effect: {
      loadData: {
        attr: 'roleOptions',
        to: 'props.options',
      },
    },
    validate: [
      {
        required: true,
        message: '请选择角色',
        trigger: ['blur', 'change'],
        type: 'number',
      },
    ],
  },
  {
    type: 'Cropper',
    field: 'avatar',
    title: '头像',
    value: [],
  },
  {
    title: '手机号',
    field: 'phone',
    value: '',
    props: {
      placeholder: '请输入手机号',
      clearable: true,
      showCount: true,
      maxlength: 11,
    },
    validate: [
      {
        required: true,
        trigger: 'blur',
        validator: NIsPhoneNumber,
      },
    ],
  },
  {
    title: '登录密码',
    field: 'password2',
    value: '',
    props: {
      placeholder: '请输入登录密码',
      clearable: true,
      showPasswordOn: 'mousedown',
      type: 'password',
    },
    validate: [{ min: 6, max: 20, message: '长度应为6到20', trigger: 'blur' }],
  },
  {
    field: 'alert',
    title: '',
    props: {
      'label-width': 10,
    },
  },
];
