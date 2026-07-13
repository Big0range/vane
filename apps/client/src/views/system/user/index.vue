<template>
  <Page>
    <template #top>
      <!-- 查询条件 -->
      <n-form
        ref="ruleFormRef"
        :model="queryParams"
        :inline="true"
        label-placement="left"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="queryParams.username"
            :placeholder="'姓名'"
            @keyup.enter="onSubmit"
          />
        </n-form-item>
        <n-form-item label="角色" path="role_id">
          <n-select
            style="width: 170px"
            v-model:value="queryParams.role_id"
            placeholder="角色"
            label-field="role_name"
            value-field="id"
            clearable
            :options="[{ id: '', role_name: '全部' }, ...roleList]"
          />
        </n-form-item>
        <n-form-item label="状态" path="status">
          <n-select
            style="width: 170px"
            v-model:value="queryParams.status"
            placeholder="状态"
            label-field="status_name"
            value-field="id"
            clearable
            :options="[
              { id: '', status_name: '全部' },
              { id: 0, status_name: '正常' },
              { id: 1, status_name: '禁用' },
            ]"
          />
        </n-form-item>
        <!-- 搜索按钮 -->
        <n-button class="filter-item" type="primary" @click="onSubmit">
          搜索
        </n-button>
        <n-button @click="resetQuery" style="margin-left: 10px">
          重置
        </n-button>
      </n-form>
    </template>

    <template #default>
      <n-button type="primary" @click="operation('add')">添加</n-button>
      <div class="pt-16"></div>
      <!-- 表格 -->
      <nel-table
        pagination-behavior-on-filter="first"
        :naive-columns="columns"
        :data="tableData"
        :bordered="true"
        :row-key="(row: any) => row.id"
        :loading="loading"
        remote
        v-model:page="queryParams.page"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        @change="getUserList"
      >
        <nel-table-column prop="index">
          <template #default="{ index }">
            {{ index + 1 }}
          </template>
        </nel-table-column>
        <!-- status -->
        <nel-table-column prop="status">
          <template #default="{ row, index }">
            <n-switch
              v-model:value="row.status"
              :rail-style="formatSwitchBg"
              :checkedValue="0"
              :loading="loadingStatus.has(index)"
              :uncheckedValue="1"
              :rubberBand="false"
              :disabled="row.username === 'admin'"
              @update:value="changeUserStatus(row.id, index)"
            />
          </template>
        </nel-table-column>
        <nel-table-column prop="action">
          <template #default="{ row }">
            <n-space justify="center">
              <n-button
                type="primary"
                size="small"
                :bordered="false"
                ghost
                :disabled="row.username === 'admin'"
                @click="operation('edit', row)"
              >
                <template #icon>
                  <CreateOutline />
                </template>
                编辑
              </n-button>
              <n-popconfirm @positive-click="operation('delete', row)">
                <template #trigger>
                  <n-button
                    type="error"
                    size="small"
                    ghost
                    :bordered="false"
                    :disabled="row.username === 'admin'"
                  >
                    <template #icon>
                      <TrashOutline />
                    </template>
                    删除
                  </n-button>
                </template>
                是否确认删除?
              </n-popconfirm>
            </n-space>
          </template>
        </nel-table-column>
      </nel-table>
      <add-user
        :role-list="roleList"
        ref="addUserRef"
        :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
        :dialogType="dialogType"
        @change="getUserList"
      />
    </template>
  </Page>
</template>
<script lang="ts" setup>
import { CreateOutline, TrashOutline } from '@vicons/ionicons5';
import addUser from './component/addUser.vue';
import { ref } from 'vue';
import {
  getUserListApi,
  changeUserStatusApi,
  delUserByIdsApi,
} from '@/api/system/user';
import { getRoleListApi } from '@/api/system/role';
import { IUserInfo } from '@/api/system/user/types';
import _ from 'lodash';
import { useForm } from '@/hooks';
import { type FormInst } from 'naive-ui';
import dayjs from 'dayjs';
import { getTableTemplate } from '@/utils/getTemplate.ts';
const loading = ref(false);
defineOptions({
  name: 'users',
});
// 查询参数
const queryParams = ref({
  username: '',
  role_id: '',
  status: '',
  page: 1,
  pageSize: 10,
});
const ruleFormRef = ref<FormInst>();

const { resetForm: resetQueryForm } = useForm(ruleFormRef, queryParams);

const formatSwitchBg: any = (checked: boolean) => {
  return checked ? undefined : ({ backgroundColor: '#d03050' } as any);
};
const total = ref(0);
// 用户列表数据
const tableData = ref<IUserInfo[]>([]);
// 获取用户列表
const getUserList = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const result = await getUserListApi(queryParams.value);
    tableData.value = result.data.rows.map((item: any) => ({
      ...item,
      role_name: item.role?.name || '',
      create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss') || '-',
    }));
    total.value = result.data.total;
    console.log('result', queryParams.value);
  } finally {
    loading.value = false;
  }
};
getUserList();

// 重置查询参数
const resetQuery = () => {
  resetQueryForm();
  getUserList();
};

// 角色列表
const roleList = ref<PromiseReturnType<typeof getRoleListApi>['data']['rows']>(
  [],
);
// 获取角色列表
const getRoleList = async () => {
  const result = await getRoleListApi({
    notPage: 'true',
  });
  roleList.value = result.data.rows;
};
getRoleList();

// 搜索按钮
const onSubmit = _.throttle(() => {
  queryParams.value.page = 1;
  getUserList();
}, 1000);

// 修改用户状态
const loadingStatus = ref<Set<number>>(new Set());
const changeUserStatus = async (id: number, index: number) => {
  loadingStatus.value.add(index);
  try {
    await changeUserStatusApi(id);
    await getUserList();
  } catch (error) {
    window.$message.error((error as any).message);
    tableData.value[index].status = tableData.value[index].status === 0 ? 1 : 0;
  } finally {
    loadingStatus.value.delete(index);
  }
};

// 添加/编辑用户组件
const addUserRef = ref<InstanceType<typeof addUser>>();
const dialogType = ref<string>('add');
// 综合操作
const operation = async (type: any, row?: any) => {
  switch (type) {
    // 添加
    case 'add':
      dialogType.value = type;
      addUserRef.value?.show();
      break;
    // 编辑
    case 'edit':
      dialogType.value = type;
      addUserRef.value?.show(row);
      break;
    // 删除
    case 'delete':
      await delUserByIdsApi([row.id]);
      window.$message.success('用户删除成功');
      getUserList();
      break;
  }
};
// const columns = createColumns({
//   loadingStatus: loadingStatus.value,
//   changeUserStatus,
//   operation,
// });
const columns = ref<TableTemplateRow[]>([]);
(async () => {
  try {
    loading.value = true;
    columns.value = await getTableTemplate('SystemUser');
    console.log('columns.value', columns.value);
  } finally {
    loading.value = false;
  }
})();
</script>
<style lang="scss" scoped>
:deep() {
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
