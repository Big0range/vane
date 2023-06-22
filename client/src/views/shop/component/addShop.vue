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
        label-width="120px"
        class="demo-form-inline"
      >
        <el-form-item label="门店名称" prop="name" class="w-full">
          <el-input
            v-model="formDate.name"
            maxlength="20"
            show-word-limit
            placeholder="请输入门店名称"
          />
        </el-form-item>
        <el-form-item label="照片" prop="cover">
          <Cropper
            :aspect-ratio="2 / 1"
            :preview-type="['default', 'round', 'circle']"
            @on-ready="onReady"
            :previewWidth="300"
            fit="cover"
            :max="1"
            v-model="cover"
            :before-ready="beforeReady"
          />
        </el-form-item>
        <el-form-item label="门店联系电话" prop="phone" class="w-full">
          <el-input v-model="formDate.phone" placeholder="请输入门店联系电话" />
        </el-form-item>
        <el-form-item label="门店地址" prop="address" class="w-full">
          <el-input v-model="formDate.address" placeholder="请输入门店地址" />
        </el-form-item>
        <el-form-item label="门店描述" prop="desc" class="w-full">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="formDate.desc"
            placeholder="请输入门店描述"
          />
        </el-form-item>
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
import { nextTick, reactive, ref } from 'vue';
import { getRoleListApi } from '@/api/system/role';
import Cropper from '@/components/Cropper/index.vue';
import { uploadImg } from '@/api/comm';
import { ElInput, ElMessage, FormInstance } from 'element-plus';
import { createShopApi, updateShopInfoApi } from '@/api/shop/index';
import { isPhoneNumber } from '@vane/server/src/utils/validate';
import { TShopForm } from '@/api/shop/types';
import _ from 'lodash';
import { CDNURL } from '@/utils/config';
export interface IAddShopApi {
  show: (row?: any) => void;
}
type TRoleList = PromiseReturnType<typeof getRoleListApi>['data']['rows'];
const props = defineProps<{
  title: any;
  dialogType: string;
}>();
const dialogVisible = ref(false);
const cover = ref<any[]>([]);
// 初始化显示
const show = async (row2?: any) => {
  const row = _.cloneDeep(row2);
  dialogVisible.value = true;
  resetForm(ruleFormRef.value);
  if (row) {
    formDate.value = row;
    if (row.cover) {
      cover.value = [
        {
          url: CDNURL + row.cover
        }
      ];
    } else {
      cover.value = [];
    }
  } else {
    cover.value = [];
    formDate.value = {
      name: '', // 名称
      desc: '', // 描述
      cover: '', // 照片
      phone: '', // 门店联系电话
      address: '' // 密码
    };
  }
};
const onReady = (e: { base64: string; blob: Blob }) => {
  // 上传完成之后数据会在这里返回
  console.log(e);
};
// 你需要先定义一个Promise类型的上传方法
const beforeReady = async (blob: Blob) => {
  // 之后就可以愉快的将blob数据发送至后端啦，可根据自己情况进行发送，我这里用的是自己封装的request
  const formData = new FormData();
  formData.append('file', blob, 'test.png');
  // 仅为示例
  try {
    const res = await uploadImg(formData);
    cover.value[0].url = CDNURL + res.data;
  } catch (err) {
    ElMessage.warning('照片上传失败');
  }
};
// 确认提交按钮
const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        let params: any = {
          ...formDate.value,
          cover: cover.value[0]?.url.replace(CDNURL, '')
        };
        if (props.dialogType === 'add') {
          await createShopApi(params);
          ElMessage.success('用户添加成功');
        } else {
          params.id = formDate.value.id;
          await updateShopInfoApi(params);
          ElMessage.success('修改成功');
        }
        dialogVisible.value = false;
        emit('change');
      } catch (err: any) {}
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
interface ElFormDate extends TShopForm {
  id?: number | string;
}
const formDate = ref<ElFormDate>({
  name: '', // 名称
  desc: '', // 描述
  cover: '', // 照片
  phone: '', // 门店联系电话
  address: '' // 密码
});
const ELIsPhoneNumber = (rule: any, value: any, callback: any) => {
  const res = isPhoneNumber(value);
  if (value === '') {
    callback(new Error('请输入门店联系电话'));
  } else if (res) {
    callback(new Error(res));
  } else {
    callback();
  }
};
const rules = reactive({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  address: [
    {
      required: true,
      message: '请输入门店地址',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      validator: ELIsPhoneNumber,
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
