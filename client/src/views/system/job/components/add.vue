<template>
  <el-dialog
    destroy-on-close
    v-model="dialogVisible"
    :title="title"
    width="860"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="110">
      <div class="grid grid-cols-2 gap-x-30">
        <el-form-item label="任务名称" prop="jobName">
          <el-input
            :disabled="!!formData.jobId"
            v-model="formData.jobName"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="任务组名" prop="jobGroup">
          <el-input
            :disabled="!!formData.jobId"
            v-model="formData.jobGroup"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="任务状态" prop="jobStatus" v-if="formData.jobId">
          <el-select v-model="formData.jobStatus" placeholder="请选择">
            <el-option
              v-for="(value, key) in taskStatus"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="执行状态"
          prop="jobExecuteStatus"
          v-if="formData.jobId"
        >
          <el-select v-model="formData.jobExecuteStatus" placeholder="请选择">
            <el-option
              v-for="(value, key) in executeStatus"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="首次执行时间"
          prop="startTime"
          v-if="formData.jobId"
        >
          <el-input
            :disabled="!!formData.jobId"
            v-model="formData.startTime"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="上次执行时间"
          prop="previousTime"
          v-if="formData.jobId"
        >
          <el-input
            :disabled="!!formData.jobId"
            v-model="formData.previousTime"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="下次执行时间"
          prop="nextTime"
          v-if="formData.jobId"
        >
          <el-input
            :disabled="!!formData.jobId"
            v-model="formData.nextTime"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="类型" prop="jobType">
          <el-select v-model="formData.jobType" placeholder="请选择">
            <el-option
              v-for="(value, key) in taskType"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行路径" prop="executePath">
          <el-input v-model="formData.executePath" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="执行文件" prop="className">
          <el-input v-model="formData.className" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="执行方法" prop="methodName">
          <el-input v-model="formData.methodName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="执行参数值" prop="methodParamsValue">
          <el-input v-model="formData.methodParamsValue" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="cron表达式" prop="cronExpression">
          <el-input v-model="formData.cronExpression" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="错失执行策略" prop="misfirePolicy">
          <el-select
            v-model="formData.misfirePolicy"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(value, key) in errorStrategy"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <!-- 屌用没有  就是为了布局占个位置 -->
        <div></div>
        <el-form-item label="备注信息" prop="remark">
          <el-input
            type="textarea"
            v-model="formData.remark"
            placeholder="请输入"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="flex justify-center">
        <el-button @click="resetForm" class="w-160">重置</el-button>
        <el-button @click="close" class="w-160">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
          :loading="loading"
          class="w-160"
        >
          保 存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useForm } from '@/hooks/useForm';
import { ITaskDetails } from '@/api/system/job/types';

import { taskType, errorStrategy, taskStatus, executeStatus } from '../config';
// !API
import {
  addScheduledTaskApi,
  checkTaskApi,
  updateScheduledTaskApi
} from '@/api/system/job';
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
  updateTime: ''
} as ITaskDetails);
const rules = reactive<FormRules>({
  jobName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  jobGroup: [{ required: true, message: '请输入任务组名', trigger: 'blur' }],
  jobType: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  cronExpression: [
    { required: true, message: '请输入cron表达式', trigger: 'blur' }
  ]
});
const formRef = ref<FormInstance>();

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
        jobGroup: formData.value.jobGroup
      });
      await addScheduledTaskApi(formData.value);
      ElMessage.success('新增成功');
    } else {
      await updateScheduledTaskApi(formData.value);
      ElMessage.success('修改成功');
    }
    close();
    if (props.submit) {
      props.submit();
    }
  } catch (error) {
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
  open
} as API);
</script>
<style lang="scss" scoped>
:deep() {
  .el-form-item__content,
  .el-select {
    width: 100%;
  }
}
</style>
