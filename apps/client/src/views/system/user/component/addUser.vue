<template>
  <div>
    <n-modal
      :title="title"
      preset="card"
      v-model:show="dialogVisible"
      style="width: 600px"
    >
      <form-create
        :rule="dataRule"
        v-model="formDate"
        v-model:api="fApi"
        :option="options"
        @submit="handleSubmit"
      >
        <template #field-avatar="">
          <Cropper
            :preview-type="['default', 'round', 'circle']"
            :max="1"
            v-model="formDate.avatar"
            :before-ready="beforeReady"
          />
        </template>
        <template #field-alert="">
          <n-alert
            type="info"
            style="width: 100%"
            :closable="false"
            :bordered="false"
          >
            <p>注意：登录密码为非必填项， 如不填写则取用户名后六位</p>
          </n-alert>
        </template>
      </form-create>
      <template #footer>
        <div style="text-align: right">
          <n-button @click="dialogVisible = false" style="margin-right: 10px">
            取消
          </n-button>
          <n-button type="primary" @click="handleSubmit()"> 确认 </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { getRoleListApi } from '@/api/system/role';

import Cropper from '@/components/Cropper/index.vue';
import { uploadImg } from '@/api/comm';
import { createUserApi, changeUserInfoApi } from '@/api/system/user';
import _ from 'lodash';
import formCreate from '@form-create/naive-ui';
import rowDataRule from './data';
const dataRule = ref(rowDataRule);
const options = ref({
  submitBtn: false,
});
const CDNURL = import.meta.env.VITE_APP_CDNURL;
type TRoleList = PromiseReturnType<typeof getRoleListApi>['data']['rows'];
const props = defineProps<{
  title: any;
  roleList: TRoleList;
  dialogType: string;
}>();
const fApi = ref({} as any);
const dialogVisible = ref(false);
const isAdmin = ref(false);
// 初始化显示
const show = async (row2?: any) => {
  const row = _.cloneDeep(row2);
  if (row2?.username === 'admin') {
    isAdmin.value = true;
  } else {
    isAdmin.value = false;
  }
  dialogVisible.value = true;
  if (row) {
    formDate.value = row;
    if (formDate.value.avatar) {
      formDate.value.avatar = [
        {
          url: CDNURL + formDate.value.avatar,
        },
      ];
    } else {
      formDate.value.avatar = [];
    }
    formDate.value.password2 = '';
  } else {
    formDate.value = {
      username: '', // 用户名
      role_id: undefined, // 角色id
      avatar: '', // 头像
      phone: '', // 手机号
      password2: '', // 密码
    };
    formDate.value.avatar = [];
  }
  // setTimeout(() => {
  //   fApi.value.disabled(true, 'username');
  // }, 5000);
  formCreate.setData('roleOptions', props.roleList);
};
// 你需要先定义一个Promise类型的上传方法
const beforeReady = async (blob: Blob) => {
  // 之后就可以愉快的将blob数据发送至后端啦，可根据自己情况进行发送，我这里用的是自己封装的request
  const formData = new FormData();
  formData.append('file', blob, 'test.png');
  // 仅为示例
  try {
    const res = await uploadImg(formData);
    formDate.value.avatar[0].url = CDNURL + res.data;
  } catch (error: any) {
    console.log(error);
    window.$message.warning(error.message || '头像上传失败');
  }
};
// 确认提交按钮
const handleSubmit = async () => {
  try {
    await fApi.value.validate();
    let params = {
      ...formDate.value,
      password: formDate.value.password2,
      avatar: formDate.value.avatar[0]
        ? formDate.value.avatar[0].url.replace(CDNURL, '')
        : null,
    };
    if (props.dialogType === 'add') {
      await createUserApi(params).then(() => {
        window.$message.success('用户添加成功');
      });
    } else {
      await changeUserInfoApi(params);
      window.$message.success('修改成功');
    }
    dialogVisible.value = false;
    emit('change');
  } catch (err: any) {
    console.log(err);
  }
};

const defaultFormData: any = {
  username: '', // 用户名
  role_id: undefined, // 角色id
  avatar: '', // 头像
  phone: '', // 手机号
  password2: '', // 密码
};
const formDate = ref({ ...defaultFormData });

const emit = defineEmits(['change']);
defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>
