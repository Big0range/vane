<template>
  <Page>
    <template #top>
      <div class="flex items-center justify-between">
        <el-form
          ref="optionsRef"
          :model="options"
          label-width="80px"
          :rules="rules"
          inline
        >
          <el-form-item label="请求方式" prop="method">
            <el-select v-model="options.method" placeholder="请选择类型">
              <el-option
                v-for="item in methods"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="options.username" placeholder="请输入">
            </el-input>
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="options.ip" placeholder="请输入"> </el-input>
          </el-form-item>
          <el-form-item label="请求路径" prop="url">
            <el-input v-model="options.url" placeholder="请输入"> </el-input>
          </el-form-item>
          <el-form-item label="状态码" prop="status">
            <el-input v-model="options.status" placeholder="请输入"> </el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="options.time"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              class="ml-80"
              type="primary"
              :loading="loading"
              @click="getList(1)"
              >搜索</el-button
            >
            <el-button @click="resetForm(), getList(1)" :loading="loading"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #default>
      <div>
        <el-button
          type="primary"
          :disabled="!selected.length"
          @click="download('selected')"
        >
          导出选中
        </el-button>
        <el-button type="primary" @click="download('all')">导出全部</el-button>
        <el-popconfirm
          title="此操作将会删除所有日志记录,是否确认删除?"
          @confirm="clear"
        >
          <template #reference>
            <el-button type="danger">一键清空</el-button>
          </template>
        </el-popconfirm>

        <el-table
          :data="tableData"
          border
          :height="550"
          class="mt-10"
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" type="index" width="55">
            <template #default="scope">
              {{ (options.page - 1) * options.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="状态码">
            <template #default="{ row }: { row: ILogItem }">
              <el-text
                class="mx-1"
                :type="row.status as number <= 400 ? 'primary' : 'danger'"
              >
                {{ row.status }}</el-text
              >
            </template>
          </el-table-column>
          <el-table-column label="用户" prop="username" />
          <el-table-column label="角色" prop="role_name" />
          <el-table-column label="msg" prop="msg" />
          <el-table-column label="IP" width="100" prop="ip" />
          <el-table-column label="请求方式" width="100" prop="method" />
          <el-table-column label="请求路径" prop="url" show-overflow-tooltip />
          <el-table-column
            label="请求参数"
            prop="query"
            show-overflow-tooltip
          />
          <el-table-column label="请求体" prop="body" show-overflow-tooltip />
          <el-table-column label="响应时间" width="100" prop="response_time" />
          <el-table-column label="创建时间" prop="create_time">
            <template #default="{ row }: { row: ILogItem }">
              {{ dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button link type="primary" size="small">查看</el-button>
            </template>
          </el-table-column> -->
        </el-table>

        <div class="flex justify-center pt-40">
          <el-pagination
            v-model:currentPage="options.page"
            v-model:page-size="options.pageSize"
            background
            layout="prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </template>
  </Page>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { getLogListApi, donwloadLogsApi, clearLogsApi } from '@/api/system/log';
import { ILogItem, IGetLogListParams } from '@/api/system/log/types';
import { useForm } from '@/hooks/useForm';
import dayjs from 'dayjs';
import { downloadFile } from '@/utils/downloadFile';
interface IOptions extends IGetLogListParams {
  time: [any, any];
}
const total = ref(0);

const options = ref<IOptions>({
  time: [
    new Date(dayjs().format('YYYY-MM-DD') + ' 00:00:00'),
    new Date(dayjs().format('YYYY-MM-DD') + ' 23:59:59')
  ],
  page: 1, // 当前页数
  pageSize: 20 // 每页显示多少条
} as IOptions);
const rules = reactive<FormRules>({});
const methods = ref(['get', 'post', 'put', 'delete']);
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
        'YYYY-MM-DD 00:00:00'
      );
      options.value.end_time = dayjs(options.value.time[1]).format(
        'YYYY-MM-DD 23:59:59'
      );
    } else {
      options.value.start_time = '';
      options.value.end_time = '';
    }
    const res = await getLogListApi(options.value);
    tableData.value = res.data.rows;
    total.value = res.data.total;
  } catch (err) {
  } finally {
    loading.value = false;
  }
};
getList();

const optionsRef = ref<FormInstance>();
const { resetForm } = useForm(optionsRef);
/**切换页码 */
const handleCurrentChange = (val: number) => {
  getList(val);
};
let selected = ref<ILogItem[]>([]);
const handleSelectionChange = (val: ILogItem[]) => {
  selected.value = val;
};
const download = async (type: 'all' | 'selected') => {
  loading.value = true;
  try {
    let blob;
    if (type === 'all') {
      blob = await donwloadLogsApi({ type });
      downloadFile(blob, `logs导出全部-${Date.now()}.xlsx`);
    } else {
      const ids = selected.value.map(item => item.id);
      blob = await donwloadLogsApi({ ids: ids.join(','), type });
      downloadFile(blob, `logs导出已选中-${Date.now()}.xlsx`);
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const clear = async () => {
  try {
    loading.value = true;
    await clearLogsApi();
    await getList(1);
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>
<style lang="scss" scoped>
:deep() {
  .el-input__wrapper {
    width: 220px;
  }
}
</style>
