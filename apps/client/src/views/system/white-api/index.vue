<template>
  <Page>
    <template #top>
      <!-- 查询条件 -->
      <n-form
        ref="optionsRef"
        :model="options"
        :inline="true"
        label-placement="left"
      >
        <n-form-item label="请求方式" path="method">
          <n-select
            style="width: 170px"
            v-model:value="options.method"
            placeholder="请选择类型"
            clearable
            :options="methods"
          />
        </n-form-item>
        <n-form-item label="是否启用" path="auth">
          <n-select
            style="width: 170px"
            v-model:value="options.auth"
            placeholder="请选择类型"
            clearable
            :options="[
              { label: '全部', value: '' },
              { label: '启用', value: '1' },
              { label: '禁用', value: '0' },
            ]"
          />
        </n-form-item>
        <n-form-item label="请求路径" path="url">
          <n-input v-model:value="options.url" placeholder="请输入" clearable />
        </n-form-item>

        <!-- 搜索按钮 -->
        <n-space>
          <n-button type="primary" @click="getList(1)">搜索</n-button>
          <n-button @click="resetQuery()">重置</n-button>
        </n-space>
      </n-form>
    </template>
    <template #default>
      <div>
        <!-- 表格 -->
        <nel-table
          :data="tableData"
          :loading="loading"
          :min-height="550"
          :max-height="550"
          bordered
          v-model:page="options.page"
          v-model:pageSize="options.pageSize"
          :page-sizes="pageSizes"
          :total="total"
          remote
          @change="getList()"
          ref="multipleTableRef"
        >
          <nel-table-column label="ID" prop="id" width="55" />
          <nel-table-column label="请求方式" prop="method" />
          <nel-table-column label="请求路径" prop="url" show-overflow-tooltip />
          <nel-table-column
            label="是否启用登录鉴权"
            prop="auth"
            :align="'center'"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <n-switch
                :rail-style="
                  ({ checked }: { checked: boolean }) =>
                    checked ? '' : { backgroundColor: '#d03050' }
                "
                v-model:value="row.auth"
                :checked-value="'1'"
                :unchecked-value="'0'"
                :disabled="row.sysWhiteApi"
                @update:value="changeApiAuth(row.id, row.auth)"
              >
                <template #checked>
                  <span>启用</span>
                </template>
                <template #unchecked>
                  <span>禁用</span>
                </template>
              </n-switch>
            </template>
          </nel-table-column>
        </nel-table>
      </div>
    </template>
  </Page>
</template>
<script lang="ts">
export default { name: 'WhiteApi' };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { changeApiAuthApi, getApiListApi } from '@/api/system/white-api';
import { useForm } from '@/hooks/useForm';
import { type FormInst } from 'naive-ui';
import { pageSize, pageSizes } from '@/utils/config';

const total = ref(0);

const options = ref<IGetApiListParams>({
  method: '',
  page: 1, // 当前页数
  pageSize: pageSize, // 每页显示多少条
} as IGetApiListParams);
const methods = ref([
  { label: '全部', value: '' },
  { label: 'get', value: 'get' },
  { label: 'post', value: 'post' },
  { label: 'put', value: 'put' },
  { label: 'delete', value: 'delete' },
]);
const loading = ref(false);
const tableData = ref<IApiItem[]>([]);
const getList = async (page?: number) => {
  try {
    loading.value = true;
    if (page !== undefined) {
      options.value.page = page;
    }
    const res = await getApiListApi(options.value);
    tableData.value = res.data.rows;
    total.value = res.data.total;
  } catch (err) {
  } finally {
    loading.value = false;
  }
};
getList();

const optionsRef = ref<FormInst>();
const { resetForm: resetQueryForm } = useForm(optionsRef, options);
// 重置查询参数
const resetQuery = () => {
  resetQueryForm();
  getList(1);
};

const changeApiAuth = async (id: number, auth: string) => {
  try {
    loading.value = true;
    await changeApiAuthApi(id, auth as any);
    getList();
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

  .el-switch {
    --el-switch-on-color: var(--el-color-danger);
  }

  .el-switch__label--right.is-active {
    color: var(--el-color-danger);
  }

  .el-form-item__content {
    width: 214px;
  }
}
</style>
