<template>
  <Page v-loading="loading">
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
              <el-option label="全部" value="" />
              <el-option
                v-for="item in methods"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="method">
            <el-select v-model="options.auth" placeholder="请选择类型">
              <el-option label="全部" value="" />
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="请求路径" prop="url">
            <el-input v-model="options.url" placeholder="请输入"> </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button class="ml-80" type="primary" @click="getList(1)"
              >搜索</el-button
            >
            <el-button @click="resetForm(), getList(1)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #default>
      <div>
        <el-table
          :data="tableData"
          border
          :height="550"
          class="mt-10"
          ref="multipleTableRef"
        >
          <el-table-column label="ID" prop="id" width="55" />
          <el-table-column label="请求方式" prop="method" />
          <el-table-column label="请求路径" prop="url" show-overflow-tooltip />
          <el-table-column label="是否启用登录鉴权" show-overflow-tooltip>
            <template #default="scope">
              <el-switch
                v-model="scope.row.auth"
                active-value="0"
                inactive-value="1"
                active-text="禁用"
                inactive-text="启用"
                :disabled="scope.row.sysWhiteApi"
                :loading="loadingAuth"
                @change="changeApiAuth(scope.row.id, scope.row.auth)"
              />
            </template>
          </el-table-column>
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
<script lang="ts">
export default { name: 'WhiteApi' };
</script>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { getApiListApi, changeApiAuthApi } from '@/api/system/white-api';
import { IApiItem, IGetApiListParams } from '@/api/system/white-api/types';
import { useForm } from '@/hooks/useForm';
const total = ref(0);

const options = ref<IGetApiListParams>({
  method: '',
  page: 1, // 当前页数
  pageSize: 20 // 每页显示多少条
} as IGetApiListParams);
const rules = reactive<FormRules>({});
const methods = ref(['get', 'post', 'put', 'delete']);
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

const optionsRef = ref<FormInstance>();
const { resetForm } = useForm(optionsRef);
/**切换页码 */
const handleCurrentChange = (val: number) => {
  getList(val);
};

const loadingAuth = ref(false);
const changeApiAuth = async (id: number, auth: string) => {
  await changeApiAuthApi(id, auth as any);
  try {
    loadingAuth.value = true;
  } catch (error) {
    // ElMessage.error((error as any).message);
  } finally {
    loadingAuth.value = false;
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
