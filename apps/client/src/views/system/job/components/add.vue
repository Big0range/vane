<template>
  <n-modal
    preset="card"
    destroy-on-close
    v-model:show="dialogVisible"
    :title="title"
    width="860"
  >
    <n-form ref="formRef" :model="formData" :rules="rules" label-width="110">
      <div class="grid grid-cols-2 gap-x-30">
        <n-form-item label="任务名称" path="jobName">
          <n-input
            :disabled="!!formData.jobId"
            v-model:value="formData.jobName"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="任务组名" path="jobGroup">
          <n-input
            :disabled="!!formData.jobId"
            v-model:value="formData.jobGroup"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="任务状态" path="jobStatus" v-if="formData.jobId">
          <n-select
            v-model:value="formData.jobStatus"
            placeholder="请选择"
            :options="taskStatusOptions"
          />
        </n-form-item>
        <n-form-item
          label="执行状态"
          path="jobExecuteStatus"
          v-if="formData.jobId"
        >
          <n-select
            v-model:value="formData.jobExecuteStatus"
            placeholder="请选择"
            :options="executeStatusOptions"
          />
        </n-form-item>
        <n-form-item
          label="首次执行时间"
          path="startTime"
          v-if="formData.jobId"
        >
          <n-input
            :disabled="!!formData.jobId"
            v-model:value="formData.startTime"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item
          label="上次执行时间"
          path="previousTime"
          v-if="formData.jobId"
        >
          <n-input
            :disabled="!!formData.jobId"
            v-model:value="formData.previousTime"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="下次执行时间" path="nextTime" v-if="formData.jobId">
          <n-input
            :disabled="!!formData.jobId"
            v-model:value="formData.nextTime"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="类型" path="jobType">
          <n-select
            v-model:value="formData.jobType"
            placeholder="请选择"
            :options="taskTypeOptions"
          />
        </n-form-item>
        <n-form-item label="执行路径" path="executePath">
          <n-input v-model:value="formData.executePath" placeholder="请输入" />
        </n-form-item>
        <n-form-item label="执行文件" path="className">
          <n-input v-model:value="formData.className" placeholder="请输入" />
        </n-form-item>
        <n-form-item label="执行方法" path="methodName">
          <n-input v-model:value="formData.methodName" placeholder="请输入" />
        </n-form-item>
        <n-form-item label="执行参数值" path="methodParamsValue">
          <n-input
            v-model:value="formData.methodParamsValue"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="cron表达式" path="cronExpression">
          <n-input
            v-model:value="formData.cronExpression"
            placeholder="请输入"
          />
        </n-form-item>
        <n-form-item label="错失执行策略" path="misfirePolicy">
          <n-select
            v-model:value="formData.misfirePolicy"
            clearable
            placeholder="请选择"
            :options="errorStrategyOptions"
          />
        </n-form-item>
        <!-- 屌用没有  就是为了布局占个位置 -->
        <div></div>
        <n-form-item label="备注信息" path="remark">
          <n-input
            type="textarea"
            v-model:value="formData.remark"
            placeholder="请输入"
          />
        </n-form-item>
      </div>
    </n-form>
    <template #footer>
      <span class="flex justify-center">
        <n-button @click="resetForm" class="w-160">重置</n-button>
        <n-button @click="close" class="w-160">取 消</n-button>
        <n-button type="primary" @click="save" :loading="loading" class="w-160">
          保 存
        </n-button>
      </span>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useForm } from '@/hooks/useForm';
import { ITaskDetails } from '@/api/system/job/types';

import { taskType, errorStrategy, taskStatus, executeStatus } from '../config';
// !API
import {
  addScheduledTaskApi,
  checkTaskApi,
  updateScheduledTaskApi,
} from '@/api/system/job';
import { FormInst, FormRules } from 'naive-ui';
const toOptions = (data: Record<string, string>) =>
  Object.entries(data).map(([value, label]) => ({ label, value }));
const taskStatusOptions = toOptions(taskStatus as any);
const executeStatusOptions = toOptions(executeStatus as any);
const taskTypeOptions = toOptions(taskType as any);
const errorStrategyOptions = toOptions(errorStrategy as any);

export interface API {
  open: (data?: ITaskDetails) => void;
}
const dialogVisible = ref(false);
const formData = ref<ITaskDetails>({
  className: '',
  createBy: '',
  createTime: '',
  cronExpression: '',
  executePath: '',
  jobExecuteStatus: '',
  jobGroup: '',
  jobId: '',
  jobName: '',
  jobOrder: '',
  jobStatus: '',
  jobType: '',
  methodName: '',
  methodParamsValue: '',
  misfirePolicy: '',
  nextTime: '',
  previousTime: '',
  remark: '',
  startTime: '',
  tenantId: '',
  updateBy: '',
  updateTime: '',
} as ITaskDetails);
const rules = reactive<FormRules>({
  jobName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  jobGroup: [{ required: true, message: '请输入任务组名', trigger: 'blur' }],
  jobType: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  cronExpression: [
    { required: true, message: '请输入cron表达式', trigger: 'blur' },
  ],
});
const formRef = ref<FormInst>();

const close = () => {
  dialogVisible.value = false;
};
const props = defineProps<{
  /** 提交事件 */
  submit?: () => Promise<void>;
}>();
const loading = ref(false);
// !保存
const save = async () => {
  loading.value = true;
  try {
    await verifyForm();
    if (!formData.value.jobId) {
      await checkTaskApi({
        jobName: formData.value.jobName,
        jobGroup: formData.value.jobGroup,
      });
      await addScheduledTaskApi(formData.value);
      window.$message.success('新增成功');
    } else {
      await updateScheduledTaskApi(formData.value);
      window.$message.success('修改成功');
    }
    close();
    if (props.submit) {
      props.submit();
    }
  } finally {
    loading.value = false;
  }
};

const title = ref('');
const open: API['open'] = data => {
  resetForm();
  if (data) {
    title.value = '修改任务';
    formData.value = Object.assign(formData.value, data);
  } else {
    title.value = '新建任务';
    formData.value = {} as ITaskDetails;
  }
  dialogVisible.value = true;
};
const { resetForm, verifyForm } = useForm(formRef);
defineExpose({
  open,
} as API);
</script>
<style lang="scss" scoped>
:deep() {
  .n-form-item-blank,
  .n-select {
    width: 100%;
  }
}
</style>
