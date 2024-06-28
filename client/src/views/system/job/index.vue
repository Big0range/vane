<template>
  <div class="p-16 m-16 bg-white">
    <div class="flex">
      <el-form
        :inline="true"
        :model="options"
        ref="formRef"
        label-width="80px"
        class="demo-form-inline"
      >
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="options.jobName" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="任务组合" prop="jobGroup">
          <el-input v-model="options.jobGroup" placeholder="账号" />
        </el-form-item>
        <el-form-item label="任务状态" prop="jobStatus">
          <el-select v-model="options.jobStatus" clearable placeholder="请选择">
            <el-option
              v-for="(value, key) in taskStatus"
              :label="value"
              :key="key"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行状态" prop="jobExecuteStatus">
          <el-select
            v-model="options.jobExecuteStatus"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(value, key) in executeStatus"
              :label="value"
              :key="key"
              :value="key"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="flex items-end justify-end pb-20">
      <el-button type="primary" @click="getData(1)">搜索</el-button>
      <el-button @click="clear">清空</el-button>
    </div>
    <div>
      <el-button type="primary" @click="operation(0)">新建任务</el-button>
      <el-button type="warning" @click="operation(1)">暂停全部任务</el-button>
      <el-button type="success" @click="operation(2)">启动全部任务</el-button>
      <el-button type="danger" @click="operation(3)">重置全部任务</el-button>
    </div>
    <!-- 表格 -->
    <div class="px-16 py-16">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        class=""
        height="68vh"
        border
      >
        <el-table-column label="ID" property="jobId" width="50" />
        <el-table-column label="任务名称" property="jobName" width="120" />
        <el-table-column property="jobGroup" label="任务组名" width="120" />
        <el-table-column label="任务状态" width="120">
          <template #default="{ row }">
            {{ (taskStatus as any)[row.jobStatus] }}
          </template>
        </el-table-column>
        <el-table-column label="执行状态" width="120">
          <template #default="{ row }">
            {{
              row.jobExecuteStatus
                ? (executeStatus as any)[row.jobExecuteStatus]
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column label="创建者" property="createBy" width="120" />
        <el-table-column label="创建时间" property="createTime" width="180" />
        <el-table-column label="更新者" property="updateBy" width="120" />
        <el-table-column label="更新时间" property="updateTime" width="180" />
        <el-table-column
          label="首次执行时间"
          property="startTime"
          width="180"
        />
        <el-table-column
          label="上次执行时间"
          property="previousTime"
          width="180"
        />
        <el-table-column label="下次执行时间" property="nextTime" width="180" />
        <el-table-column label="组内顺序" property="jobOrder" width="120" />
        <el-table-column label="类型">
          <template #default="{ row }">
            {{ (taskType as any)[row.jobType] }}
          </template>
        </el-table-column>
        <el-table-column label="执行路径" property="executePath" width="180" />
        <el-table-column label="执行文件" property="className" width="180" />
        <el-table-column label="执行方法" property="methodName" width="180" />
        <el-table-column
          label="执行参数值"
          property="methodParamsValue"
          width="180"
        />
        <el-table-column
          label="cron表达式"
          property="cronExpression"
          width="180"
        />
        <el-table-column label="错失执行策略" width="180">
          <template #default="{ row }">
            {{ (errorStrategy as any)[row.misfirePolicy] }}
          </template>
        </el-table-column>
        <el-table-column label="备注信息" property="remark" width="180" />
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="operation(4, row)"
            >
              日志
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="operation(5, row)"
            >
              启动
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="operation(6, row)"
            >
              暂停
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="operation(7, row)"
            >
              修改
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="operation(8, row)"
            >
              执行
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="operation(9, row)"
            >
              删除
            </el-button>
            <!-- <el-popconfirm
              title='重置更改为默认密码 "Hh+账号后六位数字"'
              @confirm="operation(5, row)"
            >
              <template #reference>
                <el-button link type="warning" size="small">重置密码</el-button>
              </template>
            </el-popconfirm> -->
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model="options" :total="total" @change="handleChange" />
    </div>
    <AddTask ref="addTaskRef" :submit="getData" />
    <Log ref="LogRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Pagination from '@/components/Pagination/index.vue';
import { useForm } from '@/hooks';
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
  deleteScheduledTaskApi
} from '@/api/system/job';
import { ElMessage, ElMessageBox } from 'element-plus';

/**搜索条件 */
const options = ref({
  current: 1,
  size: 20,
  jobName: '',
  jobGroup: '',
  jobStatus: '',
  jobExecuteStatus: ''
});
const total = ref(0);
const tableData = ref<
  PromiseReturnType<typeof getScheduledTaskListApi>['rows']
>([] as any);
const loading = ref(false);
const formRef = ref();
const { resetForm } = useForm(formRef);
const clear = () => {
  resetForm();
  // getData(1);
};
const getData = async (current?: number) => {
  if (current) {
    options.value.current = current;
  }
  loading.value = true;
  try {
    const data: any = {
      ...options.value
    };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    const res = await getScheduledTaskListApi(data);
    console.log(res);
    // tableData.value = res.data.records;
    // total.value = res.data.total;
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
const operation = async (
  /**0、新增 1、暂停全部 2、启动全部 3、重置全部 ---割--- 4、日志 5、启动 6、暂停 7、修改 8、执行 9、删除 */
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  row?: (typeof tableData.value)[0]
) => {
  switch (type) {
    case 0:
      // 新增
      addTaskRef.value?.open();
      break;
    case 1:
      // 暂停全部
      ElMessageBox.confirm('即将暂停全部定时任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await pauseAllScheduledTaskApi();
        getData();
      });
      break;
    case 2:
      // 启动全部
      ElMessageBox.confirm('即将启动全部暂定中定时任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await startAllScheduledTaskApi();
        getData();
      });
      break;
    case 3:
      // 重置全部
      ElMessageBox.confirm('确定重置全部任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await resetAllScheduledTaskApi();
        getData();
      });
      break;
    case 4:
      // 日志
      row && LogRef.value?.open(row);
      break;
    case 5:
      // 启动
      if (row) {
        ElMessageBox.confirm(
          '即将发布或启动(任务名称:' + row.jobName + '), 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(async () => {
          await startScheduledTaskApi(row.jobId);
          getData();
        });
      }
      break;
    case 6:
      // 暂停
      if (row) {
        ElMessageBox.confirm(
          '即将暂停(任务名称:' + row.jobName + '), 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(async () => {
          await pauseScheduledTaskApi(row.jobId);
          getData();
        });
      }
      break;
    case 7:
      // 修改
      addTaskRef.value?.open(row);
      break;
    case 8:
      // 执行
      if (row) {
        ElMessageBox.confirm(
          '立刻执行一次任务(任务名称:' + row.jobName + '), 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(async () => {
          await executeScheduledTaskApi(row.jobId);
          getData();
        });
      }
      break;
    case 9:
      // 删除
      if (row) {
        const jobStatus = row.jobStatus;
        if (jobStatus === '1' || jobStatus === '3') {
          ElMessageBox.confirm(
            '是否确认删除(任务名称:' +
              row.jobName +
              '), 是否继续?删除后不可恢复',
            '警告',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            deleteScheduledTaskApi(row.jobId);
            getData();
          });
        } else {
          ElMessage.error('运行中定时任务不可删除，请先暂停后操作');
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
  .el-form-item__content {
    width: 150px;
  }
}
</style>
