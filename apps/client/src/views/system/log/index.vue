<template>
  <Page>
    <template #top>
      <!-- 查询条件 -->
      <n-form
        ref="optionsRef"
        :model="options"
        :inline="true"
        label-placement="left"
        label-width="80px"
      >
        <n-form-item label="请求方式" path="method">
          <n-select
            style="width: 198px"
            v-model:value="options.method"
            placeholder="请选择类型"
            clearable
            :options="methods"
          />
        </n-form-item>
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="options.username"
            placeholder="请输入"
            clearable
          />
        </n-form-item>
        <n-form-item label="IP" path="ip">
          <n-input v-model:value="options.ip" placeholder="请输入" clearable />
        </n-form-item>
        <n-form-item label="请求路径" path="url">
          <n-input v-model:value="options.url" placeholder="请输入" clearable />
        </n-form-item>
        <n-form-item label="状态码" path="status">
          <n-input
            v-model:value="options.status"
            placeholder="请输入"
            clearable
          />
        </n-form-item>
        <n-form-item label="时间范围">
          <n-date-picker
            close-on-select
            :actions="[]"
            @update:formatted-value="handleTimeChange"
            v-model:value="options.time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-formatted-value="yyyy-mm-dd HH:mm:ss"
            clearable
            @update:value="getList(1)"
          />
        </n-form-item>

        <!-- 搜索按钮 -->
        <n-space>
          <n-button type="primary" @click="getList(1)">搜索</n-button>
          <n-button @click="resetQuery">重置</n-button>
        </n-space>
      </n-form>
    </template>
    <template #default>
      <div>
        <n-space class="mb-10">
          <n-button
            type="primary"
            :disabled="!checkedRowKeysRef.length"
            @click="download('selected')"
          >
            导出选中
          </n-button>
          <n-button type="primary" @click="download('all')">导出全部</n-button>
          <n-popconfirm @positive-click="clear">
            <template #trigger>
              <n-button type="error">一键清空</n-button>
            </template>
            此操作将会删除所有日志记录,是否确认删除?
          </n-popconfirm>
        </n-space>

        <nel-table
          :data="tableData"
          :naive-columns="columns"
          bordered
          :min-height="500"
          :max-height="500"
          v-model:page="options.page"
          v-model:pageSize="options.pageSize"
          :page-sizes="[10, 20, 30]"
          :total="total"
          remote
          ref="multipleTableRef"
          @change="getList()"
          :loading="loading"
          @update:checked-row-keys="handleCheck"
          :row-key="rowKey"
          :scroll-x="1800"
          :virtual-scroll="true"
        >
          <nel-table-column prop="index">
            <template #default="{ index }">
              {{ index + 1 }}
            </template>
          </nel-table-column>
        </nel-table>
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getLogListApi, donwloadLogsApi, clearLogsApi } from '@/api/system/log';
import { ILogItem, IGetLogListParams } from '@/api/system/log/types';
import { useForm } from '@/hooks/useForm';
import dayjs from 'dayjs';
import { downloadFile } from '@/utils/downloadFile';
import type { DataTableRowKey, FormInst } from 'naive-ui';
import { getTableTemplate } from '@/utils/getTemplate.ts';
interface IOptions extends IGetLogListParams {
  time: [any, any];
}
function handleTimeChange(e: any) {
  console.log(e);
}
const total = ref(0);
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
function handleCheck(rowKeys: DataTableRowKey[]) {
  console.log('选中行的key', rowKeys);
  checkedRowKeysRef.value = rowKeys;
}
function rowKey(row: ILogItem) {
  return row.id;
}
const options = ref<IOptions>({
  time: [
    new Date(dayjs().format('YYYY-MM-DD') + ' 00:00:00'),
    new Date(dayjs().format('YYYY-MM-DD') + ' 23:59:59'),
  ],
  method: '',
  page: 1, // 当前页数
  pageSize: 20, // 每页显示多少条
} as IOptions);
const methods = ref([
  { label: '全部', value: '' },
  { label: 'get', value: 'get' },
  { label: 'post', value: 'post' },
  { label: 'put', value: 'put' },
  { label: 'delete', value: 'delete' },
]);
const loading = ref(false);
const tableData = ref<ILogItem[]>([]);
const getList = async (page?: number) => {
  try {
    loading.value = true;
    if (page !== undefined) {
      options.value.page = page;
    }
    if (options.value.time) {
      options.value.start_time = dayjs(options.value.time[0]).format(
        'YYYY-MM-DD 00:00:00',
      );
      options.value.end_time = dayjs(options.value.time[1]).format(
        'YYYY-MM-DD 23:59:59',
      );
    } else {
      options.value.start_time = '';
      options.value.end_time = '';
    }
    const res = await getLogListApi(options.value);
    tableData.value = res.data.rows.map(item => ({
      ...item,
      create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }));
    total.value = res.data.total;
  } finally {
    loading.value = false;
  }
};

const optionsRef = ref<FormInst>();
const { resetForm: resetQueryForm } = useForm(optionsRef, options);
// 重置查询参数
const resetQuery = () => {
  resetQueryForm();
  getList(1);
};
const download = async (type: 'all' | 'selected') => {
  loading.value = true;
  try {
    let blob;
    if (type === 'all') {
      blob = await donwloadLogsApi({ type });
      downloadFile(blob, `logs导出全部-${Date.now()}.xlsx`);
    } else {
      const ids = checkedRowKeysRef.value as number[];
      blob = await donwloadLogsApi({ ids: ids.join(','), type });
      downloadFile(blob, `logs导出已选中-${Date.now()}.xlsx`);
    }
  } finally {
    loading.value = false;
  }
};

const clear = async () => {
  try {
    loading.value = true;
    await clearLogsApi();
    await getList(1);
  } finally {
    loading.value = false;
  }
};
const columns = ref<TableTemplateRow[]>([]);
(async () => {
  columns.value = [
    {
      type: 'selection',
    } as any,
    ...(await getTableTemplate('LogList')),
  ];
  console.log('columns.value', columns.value);
  getList();
})();
</script>
<style lang="scss" scoped>
:deep() {
  .el-form-item__content,
  .el-input__wrapper,
  .el-input {
    width: 240px;
  }
}
</style>
