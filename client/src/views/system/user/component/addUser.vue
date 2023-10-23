<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      @close="cancel"
      width="550px"
      align-center
    >
      <el-form
        :inline="true"
        :rules="rules"
        :model="formDate"
        ref="ruleFormRef"
        label-width="80px"
        class="demo-form-inline"
      >
        <el-form-item label="用户名" prop="username" class="w-full">
          <el-input
            v-model="formDate.username"
            maxlength="20"
            :disabled="isAdmin"
            show-word-limit
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="formDate.role_id"
            class="w-full"
            placeholder="角色"
            :disabled="isAdmin"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <Cropper
            :preview-type="['default', 'round', 'circle']"
            :max="1"
            v-model="avatar"
            :before-ready="beforeReady"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="w-full">
          <el-input v-model="formDate.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password" class="w-full">
          <el-input
            v-model="formDate.password2"
            placeholder="请输入登录密码"
            ref="passwordRef"
            type="password"
            show-password
          />
        </el-form-item>
        <el-alert type="info" :closable="false">
          <p>注意：登录密码为非必填项， 如不填写则取用户名后六位</p>
        </el-alert>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit(ruleFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { getRoleListApi } from '@/api/system/role';
import Cropper from '@/components/Cropper/index.vue';
import { uploadImg } from '@/api/comm';
import { ElInput, ElMessage, FormInstance } from 'element-plus';
import { createUserApi, changeUserInfoApi } from '@/api/system/user';
import { checkMobileSimple } from '@/utils/validate';
import { encryption, decrypt } from '@vane/server/src/utils/encryption';
import _ from 'lodash';
export interface IAddApi {
  show: (row?: any) => void;
}
const CDNURL = import.meta.env.VITE_APP_CDNURL;
const avatar = ref<any[]>([]);
type TRoleList = PromiseReturnType<typeof getRoleListApi>['data']['rows'];
const props = defineProps<{
  title: any;
  roleList: TRoleList;
  dialogType: string;
}>();
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
  resetForm(ruleFormRef.value);
  if (row) {
    formDate.value = row;
    if (formDate.value.avatar) {
      avatar.value = [
        {
          url: CDNURL + formDate.value.avatar
        }
      ];
    } else {
      avatar.value = [];
    }
    formDate.value.password2 = decrypt(row.password);
  } else {
    formDate.value = {
      username: '', // 用户名
      role_id: undefined, // 角色id
      avatar: '', // 头像
      phone: '', // 手机号
      password2: '' // 密码
    };
    avatar.value = [];
  }
};
// 你需要先定义一个Promise类型的上传方法
const beforeReady = async (blob: Blob) => {
  // 之后就可以愉快的将blob数据发送至后端啦，可根据自己情况进行发送，我这里用的是自己封装的request
  const formData = new FormData();
  formData.append('file', blob, 'test.png');
  // 仅为示例
  try {
    const res = await uploadImg(formData);
    avatar.value[0].url = CDNURL + res.data;
  } catch (err) {
    ElMessage.warning('头像上传失败');
  }
};
// 确认提交按钮
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        let params = {
          ...formDate.value,
          password:
            formDate.value.password2 === ''
              ? ''
              : encryption(formDate.value.password2),
          avatar: avatar.value[0]
            ? avatar.value[0].url.replace(CDNURL, '')
            : null
        };
        if (props.dialogType === 'add') {
          await createUserApi(params);
          ElMessage.success('用户添加成功');
        } else {
          await changeUserInfoApi(params);
          ElMessage.success('修改成功');
        }
        dialogVisible.value = false;
        emit('change');
      } catch (err: any) {
        console.log(err);
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const ruleFormRef = ref<FormInstance>();
const formDate = ref({
  username: '', // 用户名
  role_id: undefined, // 角色id
  avatar: '', // 头像
  phone: '', // 手机号
  password2: '' // 密码
});
const ELValidatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else if (checkMobileSimple(value) === false) {
    callback(new Error('请输入合法的手机号'));
  } else {
    callback();
  }
};
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 20, message: '长度应为6到20', trigger: 'blur' }
  ],
  role_id: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change'
    }
  ],
  // avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
  phone: [
    {
      required: true,
      validator: ELValidatePhone,
      trigger: 'blur'
    }
  ]
});
const emit = defineEmits(['change']);
const cancel = () => {};
const passwordRef = ref(ElInput);
defineExpose({
  show
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
