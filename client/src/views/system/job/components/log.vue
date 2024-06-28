<template>
  <el-dialog v-model="dialogVisible" title="执行日志" width="90%" top="5%">
    <el-table :data="tableData" border height="70vh" ref="multipleTableRef">
      <el-table-column label="任务名称" prop="gmtCreate" min-width="100" />
      <el-table-column label="任务组名" prop="gmtCreate" min-width="100" />
      <el-table-column label="状态" prop="gmtCreate" />
      <el-table-column label="执行路径" prop="gmtCreate" min-width="100" />
      <el-table-column label="执行文件" prop="gmtCreate" min-width="100" />
      <el-table-column label="执行方法" prop="gmtCreate" min-width="100" />
      <el-table-column label="执行参数值" prop="gmtCreate" min-width="100" />
      <el-table-column label="cron表达式" prop="gmtCreate" min-width="100" />
      <el-table-column label="状态描述" prop="gmtCreate" min-width="100" />
      <el-table-column label="执行时间(ms)" prop="gmtCreate" min-width="120" />
      <el-table-column label="异常信息" prop="gmtCreate" min-width="100" />
      <el-table-column label="开始时间" prop="gmtCreate" width="130" />
    </el-table>
    <Pagination
      v-model="options"
      :total="options.total"
      @change="handleChange"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ITaskDetails } from '@/api/system/job/types';
import { getScheduledTaskLogApi } from '@/api/system/job';
import Pagination from '@/components/Pagination/index.vue';
export interface API {
  open: (data?: ITaskDetails) => void;
}
const dialogVisible = ref(false);
const tableData = ref([]);
interface IOptions {
  page: number;
  total?: number;
  pageSize: number;
}
const options = ref<IOptions>({
  total: 0,
  page: 1, // 当前页数
  pageSize: 10 // 每页显示多少条
} as IOptions);
const loading = ref(false);
const getList = async () => {
  try {
    loading.value = true;
    let params = {
      page: options.value.page,
      pageSize: options.value.pageSize,
      jobId: jobId.value
    };
    const res = await getScheduledTaskLogApi(params);
    tableData.value = res.data.records;
    options.value.total = res.data.total;
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
};
const jobId = ref<string | number>();
const open: API['open'] = (data?: ITaskDetails) => {
  console.log(data);
  jobId.value = data?.jobId;
  getList();
  dialogVisible.value = true;
};
/**切换页码 */
const handleChange = () => {
  getList();
};
defineExpose({
  open
} as API);
</script>
