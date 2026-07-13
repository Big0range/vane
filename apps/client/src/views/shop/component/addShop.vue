<template>
  <div>
    <n-modal
      :title="title"
      v-model:show="dialogVisible"
      preset="card"
      draggable
      @close="cancel"
      style="width: 550px"
      align-center
    >
      <n-form
        :rules="rules"
        :model="formDate"
        ref="ruleFormRef"
        label-width="120px"
        class="demo-form-inline"
      >
        <n-form-item label="门店名称" path="name" class="w-full">
          <n-input
            v-model:value="formDate.name"
            maxlength="20"
            show-word-limit
            placeholder="请输入门店名称"
          />
        </n-form-item>
        <n-form-item label="照片" path="cover">
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
        </n-form-item>
        <n-form-item label="门店联系电话" path="phone" class="w-full">
          <n-input
            v-model:value="formDate.phone"
            placeholder="请输入门店联系电话"
          />
        </n-form-item>
        <n-form-item label="门店地址" path="address" class="w-full">
          <n-input
            v-model:value="formDate.address"
            placeholder="请输入门店地址"
          />
        </n-form-item>
        <n-form-item label="门店描述" path="desc" class="w-full">
          <n-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model:value="formDate.desc"
            placeholder="请输入门店描述"
          />
        </n-form-item>
      </n-form>

      <n-space class="dialog-footer">
        <n-button @click="dialogVisible = false">取消</n-button>
        <n-button type="primary" @click="handleSubmit"> 确认 </n-button>
      </n-space>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Cropper from '@/components/Cropper/index.vue';
import { uploadImg } from '@/api/comm';
import { createShopApi, updateShopInfoApi } from '@/api/shop/index';
import type { TShopForm } from '@/api/shop/types';
import { NIsPhoneNumber } from '@vane/utils';
import _ from 'lodash';
import { type FormInst, type FormRules } from 'naive-ui';
import { useForm } from '@/hooks';
export interface IAddShopApi {
  show: (row?: any) => void;
}
const CDNURL = import.meta.env.VITE_APP_CDNURL;
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
  resetForm();
  if (row) {
    formDate.value = row;
    if (row.cover) {
      cover.value = [
        {
          url: CDNURL + row.cover,
        },
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
      address: '', // 密码
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
    console.log('err', err);
    window.$message.warning('照片上传失败');
  }
};
// 确认提交按钮
const handleSubmit = async () => {
  try {
    await verifyForm();
    let params: any = {
      ...formDate.value,
      cover: cover.value[0]?.url.replace(CDNURL, ''),
    };
    if (props.dialogType === 'add') {
      await createShopApi(params);
      window.$message.success('门店添加成功');
    } else {
      params.id = formDate.value.id;
      await updateShopInfoApi(params);
      window.$message.success('修改成功');
    }
    dialogVisible.value = false;
    emit('change');
  } catch (error) {
    console.log('error submit!', error);
  }
};
const ruleFormRef = ref<FormInst>();
const { resetForm, verifyForm } = useForm(ruleFormRef);

interface ElFormDate extends TShopForm {
  id?: number | string;
}
const formDate = ref<ElFormDate>({
  name: '', // 名称
  desc: '', // 描述
  cover: '', // 照片
  phone: '', // 门店联系电话
  address: '', // 密码
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  address: [
    {
      required: true,
      message: '请输入门店地址',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      validator: NIsPhoneNumber,
      trigger: 'blur',
    },
  ],
});
const emit = defineEmits(['change']);
const cancel = () => {};
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
