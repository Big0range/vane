<template>
  <Page>
    <template #top>
      <n-form :inline="true" :model="query" label-placement="left">
        <n-form-item label="任务名称">
          <n-input
            v-model:value="query.jobName"
            clearable
            placeholder="任务名称"
          />
        </n-form-item>
        <n-form-item label="任务组">
          <n-input
            v-model:value="query.jobGroup"
            clearable
            placeholder="任务组"
          />
        </n-form-item>
        <n-form-item label="状态">
          <n-select
            v-model:value="query.jobStatus"
            clearable
            :options="statusOptions"
            placeholder="全部"
          />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="search">查询</n-button>
          <n-button @click="reset">重置</n-button>
        </n-form-item>
      </n-form>
    </template>

    <n-space vertical :size="16">
      <n-button type="primary" @click="openEditor()">
        <template #icon><AddOutline /></template>
        新增任务
      </n-button>
      <n-data-table
        :columns="columns"
        :data="rows"
        :loading="loading"
        :pagination="pagination"
        :row-key="jobRowKey"
        remote
        @update:page="changePage"
      />
    </n-space>

    <n-modal
      v-model:show="editorVisible"
      preset="card"
      :title="editing ? '编辑任务' : '新增任务'"
      style="width: 680px"
      :mask-closable="false"
    >
      <n-form ref="formRef" :model="form" :rules="rules" label-width="100">
        <n-grid :cols="2" :x-gap="16">
          <n-form-item-gi label="任务名称" path="jobName">
            <n-input
              v-model:value="form.jobName"
              :disabled="!!editing"
              placeholder="例如：每日系统检查"
            />
          </n-form-item-gi>
          <n-form-item-gi label="任务组" path="jobGroup">
            <n-input
              v-model:value="form.jobGroup"
              :disabled="!!editing"
              placeholder="例如：system"
            />
          </n-form-item-gi>
          <n-form-item-gi label="执行方式">
            <n-select
              v-model:value="actionType"
              :options="actionTypeOptions"
              @update:value="changeActionType"
            />
          </n-form-item-gi>
          <n-form-item-gi
            v-if="actionType === 'builtIn'"
            label="内置动作"
            path="handlerKey"
          >
            <n-select
              v-model:value="form.handlerKey"
              :options="actionOptions.builtInActions"
              placeholder="请选择内置动作"
            />
          </n-form-item-gi>
          <n-form-item-gi v-else label="执行脚本" path="handlerKey">
            <n-select
              v-model:value="form.handlerKey"
              :options="actionOptions.scripts"
              placeholder="请从 src/scripts 中选择"
            />
          </n-form-item-gi>
          <n-form-item-gi label="Cron 表达式" path="cronExpression" :span="2">
            <!-- 输入框只用于回显，点击后在弹窗中通过可视化编辑器修改。 -->
            <n-input
              :value="form.cronExpression"
              readonly
              placeholder="请选择 Cron 表达式"
              @click="openCronEditor"
            />
          </n-form-item-gi>
          <n-form-item-gi
            v-if="actionType === 'script'"
            :span="2"
            label="脚本参数"
          >
            <n-input
              v-model:value="scriptArgsText"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="每行一个参数，例如：\n--days\n7"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="2" label="备注">
            <n-input
              v-model:value="form.remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="备注信息"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="editorVisible = false">取消</n-button>
          <n-button type="primary" :loading="submitting" @click="submit"
            >保存</n-button
          >
        </n-space>
      </template>
    </n-modal>

    <n-modal
      v-model:show="cronEditorVisible"
      preset="card"
      title="选择 Cron 表达式"
      style="width: min(760px, 92vw)"
      :mask-closable="false"
    >
      <!-- 弹窗内独立编辑，取消时不会修改任务表单已有的表达式。 -->
      <CronNaive
        v-model="cronExpressionDraft"
        locale="zh"
        :button-props="{ block: true }"
      />
      <template #footer>
        <n-space justify="end">
          <n-button @click="cronEditorVisible = false">取消</n-button>
          <n-button type="primary" @click="confirmCronExpression"
            >确定</n-button
          >
        </n-space>
      </template>
    </n-modal>

    <n-modal
      v-model:show="logsVisible"
      preset="card"
      title="执行日志"
      style="width: min(1080px, 92vw)"
    >
      <n-data-table
        :columns="logColumns"
        :data="logs"
        :loading="logsLoading"
        :pagination="logPagination"
        :row-key="logRowKey"
        remote
        @update:page="changeLogPage"
      />
    </n-modal>
  </Page>
</template>

<script lang="tsx" setup>
import {
  AddOutline,
  CreateOutline,
  PlayOutline,
  PauseOutline,
  TrashOutline,
  DocumentTextOutline,
} from '@vicons/ionicons5';
import { reactive, ref } from 'vue';
import { CronNaive } from '@vue-js-cron/naive-ui';
import '@vue-js-cron/naive-ui/dist/naive-ui.css';
import type { DataTableColumns, FormInst, FormRules } from 'naive-ui';
import { useDialog } from 'naive-ui';
import {
  createScheduledJob,
  deleteScheduledJob,
  getScheduledJobActionOptions,
  getScheduledJobLogs,
  getScheduledJobs,
  runScheduledJob,
  startScheduledJob,
  stopScheduledJob,
  updateScheduledJob,
  type ScheduledJob,
  type ScheduledJobActionOptions,
  type ScheduledJobLog,
} from '@/api/system/scheduled-job';

defineOptions({ name: 'ScheduledJobIndex' });

const dialog = useDialog();
const loading = ref(false);
const submitting = ref(false);
const rows = ref<ScheduledJob[]>([]);
const query = reactive({
  page: 1,
  pageSize: 20,
  jobName: '',
  jobGroup: '',
  jobStatus: '',
});
const pagination = reactive({
  page: 1,
  pageSize: 20,
  itemCount: 0,
  showSizePicker: false,
});
const statusOptions = [
  { label: '运行中', value: '2' },
  { label: '暂停', value: '3' },
];
const actionType = ref<'builtIn' | 'script'>('builtIn');
const actionTypeOptions = [
  { label: '内置动作', value: 'builtIn' },
  { label: '执行 TS 脚本', value: 'script' },
];
const actionOptions = reactive<ScheduledJobActionOptions>({
  builtInActions: [],
  scripts: [],
});
const scriptArgsText = ref('');
const jobRowKey = (row: ScheduledJob) => row.jobId;
const logRowKey = (row: ScheduledJobLog) => row.id;

const editorVisible = ref(false);
const cronEditorVisible = ref(false);
// 弹窗中使用独立草稿，取消时不影响输入框内已回显的表达式。
const cronExpressionDraft = ref('*/5 * * * *');
const editing = ref<ScheduledJob>();
const formRef = ref<FormInst>();
const form = reactive<Partial<ScheduledJob>>({});
const rules: FormRules = {
  jobName: { required: true, message: '请输入任务名称', trigger: 'blur' },
  jobGroup: { required: true, message: '请输入任务组', trigger: 'blur' },
  handlerKey: {
    required: true,
    message: '请选择服务端动作',
    trigger: 'change',
  },
  cronExpression: {
    required: true,
    message: '请输入 5 段 Cron 表达式',
    trigger: 'blur',
  },
};

const formatTime = (value: string) =>
  value ? new Date(value).toLocaleString() : '-';
const statusText = (value: string) => (value === '2' ? '运行中' : '暂停');
const resultText = (value: string) =>
  value === '0' ? '正常' : value === '1' ? '异常' : '-';

const load = async () => {
  loading.value = true;
  try {
    const result: any = await getScheduledJobs(query);
    rows.value = result.data.rows;
    pagination.itemCount = result.data.total;
    pagination.page = query.page;
  } finally {
    loading.value = false;
  }
};

const search = () => {
  query.page = 1;
  load();
};
const reset = () => {
  Object.assign(query, { page: 1, jobName: '', jobGroup: '', jobStatus: '' });
  load();
};
const changePage = (page: number) => {
  query.page = page;
  load();
};

const loadActionOptions = async () => {
  const result: any = await getScheduledJobActionOptions();
  Object.assign(actionOptions, result.data);
};

const changeActionType = (type: 'builtIn' | 'script') => {
  actionType.value = type;
  form.handlerKey = '';
  scriptArgsText.value = '';
};

const openCronEditor = () => {
  cronExpressionDraft.value = form.cronExpression || '*/5 * * * *';
  cronEditorVisible.value = true;
};

const confirmCronExpression = () => {
  form.cronExpression = cronExpressionDraft.value;
  cronEditorVisible.value = false;
};

const openEditor = async (row?: ScheduledJob) => {
  await loadActionOptions();
  editing.value = row;
  Object.assign(
    form,
    row
      ? { ...row }
      : {
          jobName: '',
          jobGroup: 'system',
          handlerKey: 'system:log',
          cronExpression: '*/5 * * * *',
          remark: '',
        },
  );
  actionType.value = form.handlerKey?.startsWith('script:')
    ? 'script'
    : 'builtIn';
  scriptArgsText.value =
    actionType.value === 'script' ? row?.scriptArgs.join('\n') || '' : '';
  editorVisible.value = true;
};

const submit = async () => {
  await formRef.value?.validate();
  submitting.value = true;
  try {
    const data = { ...form };
    delete data.jobStatus;
    if (actionType.value === 'script') {
      data.scriptArgs = scriptArgsText.value.split(/\r?\n/).filter(Boolean);
    } else {
      delete data.scriptArgs;
    }
    if (editing.value) {
      await updateScheduledJob({ ...data, jobId: editing.value.jobId });
      window.$message.success('任务已更新');
    } else {
      await createScheduledJob(data);
      window.$message.success('任务已创建');
    }
    editorVisible.value = false;
    load();
  } finally {
    submitting.value = false;
  }
};

const updateStatus = (row: ScheduledJob, running: boolean) => {
  dialog.warning({
    title: '确认操作',
    content: `确定${running ? '启动' : '暂停'}“${row.jobName}”吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (running) await startScheduledJob(row.jobId);
      else await stopScheduledJob(row.jobId);
      window.$message.success(running ? '任务已启动' : '任务已暂停');
      load();
    },
  });
};

const runNow = (row: ScheduledJob) => {
  dialog.warning({
    title: '立即执行',
    content: `确定立即执行“${row.jobName}”吗？`,
    positiveText: '执行',
    negativeText: '取消',
    onPositiveClick: async () => {
      await runScheduledJob(row.jobId);
      window.$message.success('任务已加入执行队列');
    },
  });
};

const remove = (row: ScheduledJob) => {
  dialog.error({
    title: '删除任务',
    content: `确定删除“${row.jobName}”吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      await deleteScheduledJob(row.jobId);
      window.$message.success('任务已删除');
      load();
    },
  });
};

const logsVisible = ref(false);
const logsLoading = ref(false);
const logs = ref<ScheduledJobLog[]>([]);
const selectedJobId = ref(0);
const logPagination = reactive({
  page: 1,
  pageSize: 20,
  itemCount: 0,
  showSizePicker: false,
});
const loadLogs = async () => {
  logsLoading.value = true;
  try {
    const result: any = await getScheduledJobLogs({
      jobId: selectedJobId.value,
      page: logPagination.page,
      pageSize: logPagination.pageSize,
    });
    logs.value = result.data.rows;
    logPagination.itemCount = result.data.total;
  } finally {
    logsLoading.value = false;
  }
};
const openLogs = (row: ScheduledJob) => {
  selectedJobId.value = row.jobId;
  logPagination.page = 1;
  logsVisible.value = true;
  loadLogs();
};
const changeLogPage = (page: number) => {
  logPagination.page = page;
  loadLogs();
};

const columns: DataTableColumns<ScheduledJob> = [
  { title: '任务名称', key: 'jobName', minWidth: 150 },
  { title: '任务组', key: 'jobGroup', width: 110 },
  { title: '动作', key: 'handlerKey', minWidth: 150 },
  { title: 'Cron', key: 'cronExpression', minWidth: 130 },
  {
    title: '状态',
    key: 'jobStatus',
    width: 90,
    render: row => (
      <n-tag type={row.jobStatus === '2' ? 'success' : 'warning'}>
        {statusText(row.jobStatus)}
      </n-tag>
    ),
  },
  {
    title: '最近结果',
    key: 'jobExecuteStatus',
    width: 100,
    render: row => resultText(row.jobExecuteStatus),
  },
  {
    title: '上次执行',
    key: 'previousTime',
    minWidth: 170,
    render: row => formatTime(row.previousTime),
  },
  {
    title: '操作',
    key: 'actions',
    width: 330,
    fixed: 'right',
    render: row => (
      <n-space size="small">
        <n-button text type="primary" onClick={() => openLogs(row)}>
          <n-icon component={DocumentTextOutline} />
          日志
        </n-button>
        <n-button
          text
          type="primary"
          disabled={row.jobStatus === '2'}
          onClick={() => openEditor(row)}
        >
          <n-icon component={CreateOutline} />
          编辑
        </n-button>
        {row.jobStatus === '2' ? (
          <n-button
            text
            type="warning"
            onClick={() => updateStatus(row, false)}
          >
            <n-icon component={PauseOutline} />
            暂停
          </n-button>
        ) : (
          <n-button text type="success" onClick={() => updateStatus(row, true)}>
            <n-icon component={PlayOutline} />
            启动
          </n-button>
        )}
        <n-button
          text
          type="primary"
          disabled={row.jobStatus !== '2'}
          onClick={() => runNow(row)}
        >
          <n-icon component={PlayOutline} />
          执行
        </n-button>
        <n-button
          text
          type="error"
          disabled={row.jobStatus === '2'}
          onClick={() => remove(row)}
        >
          <n-icon component={TrashOutline} />
          删除
        </n-button>
      </n-space>
    ),
  },
];

const logColumns: DataTableColumns<ScheduledJobLog> = [
  { title: '状态', key: 'status', width: 100 },
  { title: '尝试次数', key: 'attempt', width: 100 },
  { title: '消息', key: 'message', minWidth: 180 },
  { title: '异常', key: 'errorMessage', minWidth: 220 },
  {
    title: '耗时',
    key: 'duration',
    width: 100,
    render: row => `${row.duration} ms`,
  },
  {
    title: '开始时间',
    key: 'startTime',
    minWidth: 170,
    render: row => formatTime(row.startTime),
  },
  {
    title: '结束时间',
    key: 'endTime',
    minWidth: 170,
    render: row => formatTime(row.endTime),
  },
];

void load();
</script>
