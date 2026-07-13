<template>
  <div class="p-16 m-16 bg-white">
    <div class="flex">
      <n-form
        :inline="true"
        :model="options"
        ref="formRef"
        label-width="80px"
        class="demo-form-inline"
      >
        <n-form-item label="任务名称" path="jobName">
          <n-input v-model:value="options.jobName" placeholder="姓名" />
        </n-form-item>
        <n-form-item label="任务组合" path="jobGroup">
          <n-input v-model:value="options.jobGroup" placeholder="账号" />
        </n-form-item>
        <n-form-item label="任务状态" path="jobStatus">
          <n-select
            v-model:value="options.jobStatus"
            clearable
            placeholder="请选择"
            :options="taskStatusOptions"
          />
        </n-form-item>
        <n-form-item label="执行状态" path="jobExecuteStatus">
          <n-select
            v-model:value="options.jobExecuteStatus"
            clearable
            placeholder="请选择"
            :options="executeStatusOptions"
          />
        </n-form-item>
      </n-form>
    </div>
    <div class="flex items-end justify-end pb-20">
      <n-button type="primary" @click="getData(1)">搜索</n-button>
      <n-button @click="clear">清空</n-button>
    </div>
    <div>
      <n-button type="primary" @click="operation(0)">新建任务</n-button>
      <n-button type="warning" @click="operation(1)">暂停全部任务</n-button>
      <n-button type="success" @click="operation(2)">启动全部任务</n-button>
      <n-button type="error" @click="operation(3)">重置全部任务</n-button>
    </div>
    <!-- 表格 -->
    <div class="px-16 py-16">
      <nel-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        class=""
        height="68vh"
        border
      >
        <nel-table-column label="ID" prop="jobId" width="50" />
        <nel-table-column label="任务名称" prop="jobName" width="120" />
        <nel-table-column prop="jobGroup" label="任务组名" width="120" />
        <nel-table-column label="任务状态" width="120">
          <template #default="{ row }">
            {{ (taskStatus as any)[row.jobStatus] }}
          </template>
        </nel-table-column>
        <nel-table-column label="执行状态" width="120">
          <template #default="{ row }">
            {{
              row.jobExecuteStatus
                ? (executeStatus as any)[row.jobExecuteStatus]
                : ''
            }}
          </template>
        </nel-table-column>
        <nel-table-column label="创建者" prop="createBy" width="120" />
        <nel-table-column label="创建时间" prop="createTime" width="180" />
        <nel-table-column label="更新者" prop="updateBy" width="120" />
        <nel-table-column label="更新时间" prop="updateTime" width="180" />
        <nel-table-column label="首次执行时间" prop="startTime" width="180" />
        <nel-table-column
          label="上次执行时间"
          prop="previousTime"
          width="180"
        />
        <nel-table-column label="下次执行时间" prop="nextTime" width="180" />
        <nel-table-column label="组内顺序" prop="jobOrder" width="120" />
        <nel-table-column label="类型">
          <template #default="{ row }">
            {{ (taskType as any)[row.jobType] }}
          </template>
        </nel-table-column>
        <nel-table-column label="执行路径" prop="executePath" width="180" />
        <nel-table-column label="执行文件" prop="className" width="180" />
        <nel-table-column label="执行方法" prop="methodName" width="180" />
        <nel-table-column
          label="执行参数值"
          prop="methodParamsValue"
          width="180"
        />
        <nel-table-column
          label="cron表达式"
          prop="cronExpression"
          width="180"
        />
        <nel-table-column label="错失执行策略" width="180">
          <template #default="{ row }">
            {{ (errorStrategy as any)[row.misfirePolicy] }}
          </template>
        </nel-table-column>
        <nel-table-column label="备注信息" prop="remark" width="180" />
        <nel-table-column fixed="right" label="操作" width="280">
          <template #default="{ row }">
            <n-button
              link
              type="primary"
              size="small"
              @click="operation(4, row)"
            >
              日志
            </n-button>
            <n-button
              link
              type="primary"
              size="small"
              @click="operation(5, row)"
            >
              启动
            </n-button>
            <n-button
              link
              type="primary"
              size="small"
              @click="operation(6, row)"
            >
              暂停
            </n-button>
            <n-button
              link
              type="primary"
              size="small"
              @click="operation(7, row)"
            >
              修改
            </n-button>
            <n-button
              link
              type="primary"
              size="small"
              @click="operation(8, row)"
            >
              执行
            </n-button>
            <n-button link type="error" size="small" @click="operation(9, row)">
              删除
            </n-button>
          </template>
        </nel-table-column>
      </nel-table>
      <Pagination
        v-model:value="options"
        :total="total"
        @change="handleChange"
      />
    </div>
    <AddTask ref="addTaskRef" :submit="getData" />
    <Log ref="LogRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Pagination from '@/components/Pagination/index.vue';
import { useForm } from '@/hooks';
import type { ITaskDetails } from '@/api/system/job/types';
import { taskStatus, executeStatus, taskType, errorStrategy } from './config';
import AddTask, { API as AddTaskAPI } from './components/add.vue';
import Log, { API as LogAPI } from './components/log.vue';

// !API
import {
  getScheduledTaskListApi,
  pauseAllScheduledTaskApi,
  resetAllScheduledTaskApi,
  startAllScheduledTaskApi,
  startScheduledTaskApi,
  pauseScheduledTaskApi,
  executeScheduledTaskApi,
  deleteScheduledTaskApi,
} from '@/api/system/job';
import { useDialog } from 'naive-ui';

/**搜索条件 */
const dialog = useDialog();
const toOptions = (data: Record<string, string>) =>
  Object.entries(data).map(([value, label]) => ({ label, value }));
const taskStatusOptions = toOptions(taskStatus as any);
const executeStatusOptions = toOptions(executeStatus as any);

const options = ref({
  current: 1,
  size: 20,
  jobName: '',
  jobGroup: '',
  jobStatus: '',
  jobExecuteStatus: '',
});
const total = ref(0);
const tableData = ref<ITaskDetails[]>([]);
const loading = ref(false);
const formRef = ref();
const { resetForm } = useForm(formRef);
const clear = () => {
  resetForm();
};
const getData = async (current?: number) => {
  if (current) {
    options.value.current = current;
  }
  loading.value = true;
  try {
    const data: any = {
      ...options.value,
    };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    const res = await getScheduledTaskListApi(data);
    console.log(res);
    tableData.value = res.data.rows;
    total.value = res.data.total;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
getData(1);
const handleChange = () => {
  getData(1);
};
const addTaskRef = ref<AddTaskAPI>();
const LogRef = ref<LogAPI>();
/**操作
 *
 * 0、新增 1、暂停全部 2、启动全部 3、重置全部 ---割--- 4、日志 5、启动 6、暂停 7、修改 8、执行 9、删除
 *
 */
const confirmAction = (
  content: string,
  onPositiveClick: () => void | Promise<void>,
  title = '提示',
) => {
  dialog.warning({
    title,
    content,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick,
  });
};

const operation = async (
  /**0、新增 1、暂停全部 2、启动全部 3、重置全部 ---割--- 4、日志 5、启动 6、暂停 7、修改 8、执行 9、删除 */
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  row?: ITaskDetails,
) => {
  switch (type) {
    case 0:
      addTaskRef.value?.open();
      break;
    case 1:
      confirmAction('即将暂停全部定时任务, 是否继续?', async () => {
        await pauseAllScheduledTaskApi();
        getData();
      });
      break;
    case 2:
      confirmAction('即将启动全部暂定中定时任务, 是否继续?', async () => {
        await startAllScheduledTaskApi();
        getData();
      });
      break;
    case 3:
      confirmAction('确定重置全部任务吗？', async () => {
        await resetAllScheduledTaskApi();
        getData();
      });
      break;
    case 4:
      row && LogRef.value?.open(row);
      break;
    case 5:
      row &&
        confirmAction(
          `即将发布或启动(任务名称:${row.jobName}), 是否继续?`,
          async () => {
            await startScheduledTaskApi(row.jobId);
            getData();
          },
        );
      break;
    case 6:
      row &&
        confirmAction(
          `即将暂停(任务名称:${row.jobName}), 是否继续?`,
          async () => {
            await pauseScheduledTaskApi(row.jobId);
            getData();
          },
        );
      break;
    case 7:
      addTaskRef.value?.open(row);
      break;
    case 8:
      row &&
        confirmAction(
          `立刻执行一次任务(任务名称:${row.jobName}), 是否继续?`,
          async () => {
            await executeScheduledTaskApi(row.jobId);
            getData();
          },
        );
      break;
    case 9:
      if (row) {
        if (row.jobStatus === '1' || row.jobStatus === '3') {
          confirmAction(
            `是否确认删除(任务名称:${row.jobName}), 是否继续?删除后不可恢复`,
            async () => {
              await deleteScheduledTaskApi(row.jobId);
              getData();
            },
            '警告',
          );
        } else {
          window.$message.error('运行中定时任务不可删除，请先暂停后操作');
        }
      }
      break;
    default:
      break;
  }
};
</script>
<style lang="scss" scoped>
:deep(.demo-form-inline) {
  .n-form-item-blank {
    width: 150px;
  }
}
</style>
