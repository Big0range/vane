<template>
  <Page>
    <template #top>
      <el-form
        :inline="true"
        :rules="rules"
        :model="options"
        ref="ruleFormRef"
        class="demo-form-inline"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="options.username" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="options.role_id" placeholder="角色">
            <el-option label="全部" value="" />
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="options.status" placeholder="状态">
            <el-option label="全部" value="" />
            <el-option label="正常" :value="0" />
            <el-option label="禁用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- <div class="inline-block w-80"></div> -->
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #default>
      <el-button type="primary" @click="operation('add')">添加</el-button>
      <div class="pt-16"></div>
      <!-- 表格 -->
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        class=""
        border
        v-loading="loading"
      >
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column
          property="id"
          label="ID"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          property="username"
          label="用户名"
          show-overflow-tooltip
        />
        <el-table-column label="角色">
          <template #default="scope">{{
            roleList.filter(role => role.id === scope.row.role_id)[0]?.role_name
          }}</template>
        </el-table-column>
        <el-table-column label="账号状态" show-overflow-tooltip>
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :loading="loadingStatus"
              :inactive-value="0"
              active-text="禁用"
              inactive-text="启用"
              :disabled="scope.row.username === 'admin'"
              @change="changeUserStatus(scope.row.id, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template #default="scope">
            {{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              link
              @click="operation('edit', scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              width="120"
              confirm-button-text="确认"
              cancel-button-text="取消"
              :icon="InfoFilled"
              title="是否确认删除?"
              @confirm="operation('delete', scope.row)"
            >
              <template #reference>
                <el-button
                  :disabled="scope.row.username === 'admin'"
                  link
                  :icon="Delete"
                  type="danger"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center pt-40">
        <el-pagination
          v-model:currentPage="options.page"
          v-model:page-pageSize="options.pageSize"
          background
          layout=" prev, pager, next, jumper"
          @current-change="getUserList"
          :total="total"
        />
      </div>
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
<script lang="ts">
export default { name: 'Users' };
</script>
<script lang="ts" setup>
import addUser, { IAddApi } from './component/addUser.vue';
import { reactive, ref, watch } from 'vue';
import {
  getUserListApi,
  changeUserStatusApi,
  delUserByIdsApi
} from '@/api/system/user';
import { getRoleListApi } from '@/api/system/role';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { IUserInfo } from '@/api/system/user/types';
import { InfoFilled } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { Edit, Delete } from '@element-plus/icons-vue';
import _ from 'lodash';
const ruleFormRef = ref<FormInstance>();
const options = reactive({
  username: undefined,
  role_id: '',
  status: '',
  page: 1,
  pageSize: 20
});
const loading = ref(false);
const total = ref(0);
// 用户列表数据
const tableData = ref<IUserInfo[]>([]);
// 获取用户列表
const getUserList = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const result = await getUserListApi(options);
    tableData.value = result.data.rows;
    total.value = result.data.total;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
getUserList();

// 角色列表
const roleList = ref<PromiseReturnType<typeof getRoleListApi>['data']['rows']>(
  []
);
// 获取角色列表
const getRoleList = async () => {
  const result = await getRoleListApi({
    notPage: 'true'
  });
  roleList.value = result.data.rows;
};
getRoleList();
const rules = reactive<FormRules>({});
const onSubmit = _.throttle(() => {
  options.page = 1;
  getUserList();
}, 1000);
const resetForm = () => {
  ruleFormRef.value?.resetFields();
  getUserList();
};
const loadingStatus = ref(false);
const changeUserStatus = async (id: number, index: number) => {
  loadingStatus.value = true;
  try {
    await changeUserStatusApi(id);
  } catch (error) {
    ElMessage.error((error as any).message);
    tableData.value[index].status = tableData.value[index].status === 0 ? 1 : 0;
  } finally {
    loadingStatus.value = false;
  }
};

const addUserRef = ref<IAddApi>();
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
      try {
        await delUserByIdsApi(row.id);
        ElMessage.success('用户删除成功');
        getUserList();
      } catch (err) {}
      break;
  }
};
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
