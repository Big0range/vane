<template>
  <div>
    <n-modal
      :title="props.title"
      preset="card"
      v-model:show="dialogVisible"
      style="width: 600px"
    >
      <n-form
        ref="ruleFormRef"
        :model="formDate"
        :rules="rules"
        label-placement="left"
        label-width="80px"
      >
        <n-form-item label="模板名称" path="name">
          <n-input
            v-model:value="formDate.name"
            clearable
            placeholder="请输入模板名称"
            show-count
            :maxlength="20"
          />
        </n-form-item>
        <n-form-item label="模板编码" path="code">
          <n-input
            v-model:value="formDate.code"
            clearable
            placeholder="请输入模板编码"
            show-count
            :maxlength="50"
          />
        </n-form-item>
        <n-form-item label="模板描述" path="desc">
          <n-input
            v-model:value="formDate.desc"
            type="textarea"
            clearable
            placeholder="请输入模板描述"
            show-count
            :maxlength="50"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button @click="dialogVisible = false" style="margin-right: 10px">
          取消
        </n-button>
        <n-button type="primary" @click="handleSubmit()" :loading="loading">
          确认
        </n-button>
      </template>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { type FormInst, type FormRules } from 'naive-ui';
import { useForm } from '@/hooks';
import { addTableTemplateApi } from '@/api/system/table-template/index';

const props = withDefaults(
  defineProps<{
    title?: any;
  }>(),
  {
    title: '新建模板',
  },
);
const dialogVisible = ref(false);
export interface IAddApi {
  show: (row?: any) => void;
}
// 初始化显示
const show = async (row?: any) => {
  console.log(row);
  loading.value = false;
  dialogVisible.value = true;
  // 弹窗挂载后再重置，避免 formRef 还未挂载导致首次重置直接 return
  await nextTick();
  resetDeptForm();
};
defineExpose({
  show,
});
const loading = ref(false);
const defaultFormData: any = {
  name: '', // 模板名称
  desc: '', // 模板描述
  code: '', // 模板编码
};
const defaultForm = { ...defaultFormData };
const formDate = ref({ ...defaultForm });
const rules: FormRules = {
  name: [{ required: true, message: '请输入模板名称', trigger: 'input' }],
  code: [{ required: true, message: '请输入模板编码', trigger: 'input' }],
};
const ruleFormRef = ref<FormInst>();
const { verifyForm: verifyDeptForm, resetForm: resetDeptForm } = useForm(
  ruleFormRef,
  formDate,
);

const emit = defineEmits(['change']);
const handleSubmit = async () => {
  try {
    await verifyDeptForm();
    loading.value = true;
    await addTableTemplateApi(formDate.value).then(() => {
      window.$message.success('模板添加成功');
    });
    dialogVisible.value = false;
    emit('change');
  } finally {
    loading.value = false;
  }
};
</script>
<style lang="scss" scoped></style>
