<script lang="ts">
export default {
  name: 'role'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import Page from '@/components/Page/index.vue';
import {
  getRoleListApi,
  updateRoleApi,
  addRoleApi,
  delRoleApi,
  getMenuTreeByRoleIdApi,
  updateRoleMenusApi
} from '@/api/system/role';
import { fetchMenuTreeApi } from '@/api/system/menu';

import { ElForm, ElMessage, ElMessageBox, ElTree } from 'element-plus';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { RoleFormData, RoleItem } from '@/api/system/role/types';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { IMenuItem } from '@/api/system/menu/types';
import { PageQueryParam } from '@/api/baseTypes';
const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);
const resourceRef = ref(ElTree);

const state = reactive({
  loading: true,
  // 选中ID
  ids: [] as number[],
  queryParams: {
    page: 1,
    pageSize: 10
  } as PageQueryParam,
  roleList: [] as RoleItem[],
  total: 0,
  dialog: {
    title: '',
    visible: false
  },
  formData: {} as RoleFormData,
  rules: {
    role_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
    role_desc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
    level: [{ required: true, message: '请选择数据权限', trigger: 'change' }]
  },
  menuDialogVisible: false,
  resourceOptions: [] as IMenuItem[],
  btnPerms: {} as any,
  // 勾选的菜单ID
  checkedMenuIds: new Set([]),
  allPermIds: [] as string[],
  // 选中的角色
  checkedRole: {
    id: '',
    name: ''
  }
});

const {
  ids,
  loading,
  queryParams,
  roleList,
  total,
  dialog,
  formData,
  rules,
  menuDialogVisible,
  checkedRole,
  resourceOptions
} = toRefs(state);

/**
 * 查询
 */
function handleQuery() {
  state.loading = true;
  getRoleListApi(state.queryParams).then(res => {
    const data = res.data;
    state.roleList = data.rows as any;
    state.total = data.total;
    state.loading = false;
  });
}
/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

function handleSelectionChange(selection: any) {
  state.ids = selection.map((item: any) => item.id);
}

function handleRowClick(row: any) {}

function handleAdd() {
  dialog.value = {
    title: '添加角色',
    visible: true
  };
  state.formData = {} as any;
}

function handleUpdate(row: any) {
  dialog.value = {
    title: '修改角色',
    visible: true
  };
  state.formData = row;
  // const roleId = row.id || state.ids;
  // getRoleFormDetail(roleId).then(({ data }) => {
  //   state.formData = data;
  // });
}

function submitFormData() {
  loading.value = true;
  dataFormRef.value.validate(async (valid: any) => {
    if (valid) {
      try {
        if (state.formData.id) {
          await updateRoleApi(state.formData);
          ElMessage.success('修改角色成功');
        } else {
          await addRoleApi(state.formData);
          ElMessage.success('新增角色成功');
        }
        closeDialog();
        handleQuery();
      } finally {
        loading.value = false;
      }
    }
  });
}

/**
 * 取消
 */
function closeDialog() {
  dialog.value.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
}

/**
 *  删除
 */
function handleDelete(row: any) {
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delRoleApi(row.id).then(() => {
        ElMessage.success('删除成功');
        handleQuery();
      });
    })
    .catch(() => ElMessage.info('已取消删除'));
}

/**
 * 分配资源提交
 */
function handleRoleResourceSubmit() {
  const checkedMenuIds: number[] = resourceRef.value
    .getCheckedNodes(false, true)
    .map((node: any) => node.id);
  updateRoleMenusApi(checkedRole.value.id, checkedMenuIds.join(',')).then(
    res => {
      ElMessage.success('分配权限成功');
      menuDialogVisible.value = false;
      handleQuery();
    }
  );
}
const defaultCheckedKeys = ref<number[]>([]);

/**
 * 资源分配
 */
function showRoleMenuDialog(row: any) {
  menuDialogVisible.value = true;
  loading.value = true;
  const roleId: any = row.id;
  checkedRole.value = {
    id: roleId,
    name: row.role_name
  };

  // 获取所有的资源
  fetchMenuTreeApi().then(response => {
    resourceOptions.value = response.data;
    const data = response.data;
    const formart = (data2: typeof data) => {
      return data2.map(item => {
        delete (item as any).hasChildren;
        if (item.children) {
          formart(item.children);
        }
      });
    };
    formart(data);
    const tiled: {
      childrenLength: number;
      id: string | number;
      title: string;
    }[] = [];
    const format2 = (data2: any[]) => {
      data2.forEach((item, index) => {
        tiled.push({
          id: item.id,
          title: item.title,
          childrenLength: item.children.length
        });
        if (item.children.length > 0) {
          format2(item.children);
        }
      });
    };
    format2(data);
    resourceOptions.value = data;
    // 角色拥有的资源
    getMenuTreeByRoleIdApi(roleId).then(({ data }: { data: number[] }) => {
      // 勾选回显
      const checkedMenuIds = data.filter(item => {
        const a: any = tiled.find(item2 => {
          return item === item2.id;
        });
        if (a.childrenLength > 0) {
          return false;
        } else {
          return true;
        }
      });
      resourceRef.value.setCheckedKeys(checkedMenuIds);
      defaultCheckedKeys.value = checkedMenuIds;
      loading.value = false;
    });
  });
}

/**
 * 关闭资源弹窗
 */
function closeMenuDialogVisible() {
  menuDialogVisible.value = false;
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <Page>
    <template #default>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      <div class="pt-16"></div>
      <!--table-->
      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="roleList"
        highlight-page-row
        border
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="角色名称" prop="role_name" />
        <!-- <el-table-column label="角色代码" prop="roleCode" /> -->
        <el-table-column label="角色描述" prop="role_desc" />

        <el-table-column prop="create_time" label="创建时间" />
        <el-table-column prop="update_time" label="修改时间" />

        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-tooltip content="分配资源" effect="light">
              <el-button
                type="success"
                circle
                plain
                @click.stop="showRoleMenuDialog(scope.row)"
              >
                <svg-icon icon-class="perm" />
              </el-button>
            </el-tooltip>
            <el-button
              type="primary"
              :icon="Edit"
              circle
              plain
              @click.stop="handleUpdate(scope.row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              plain
              @click.stop="handleDelete(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>

      <!-- pagination -->
      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="queryParams.page"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />

      <!-- dialog -->
      <el-dialog
        :title="dialog.title"
        v-model="dialog.visible"
        width="500px"
        destroy-on-close
      >
        <el-form
          ref="dataFormRef"
          :model="formData"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="role_name">
            <el-input
              v-model="formData.role_name"
              placeholder="请输入角色名称"
            />
          </el-form-item>

          <!-- <el-form-item label="角色代码" prop="roleCode">
          <el-input v-model="formData.roleCode" placeholder="请输入角色编码" />
        </el-form-item> -->
          <el-form-item label="角色描述" prop="role_desc">
            <el-input
              v-model="formData.role_desc"
              placeholder="请输入角色描述"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitFormData" :loading="loading"
              >确 定</el-button
            >
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </template>
      </el-dialog>

      <!--分配资源弹窗-->
      <el-dialog
        :title="'【' + checkedRole.name + '】资源分配'"
        v-model="menuDialogVisible"
        width="800px"
      >
        <el-scrollbar max-height="600px" v-loading="loading">
          <el-tree
            ref="resourceRef"
            node-key="id"
            show-checkbox
            :data="resourceOptions"
            :default-expand-all="true"
          >
            <template #default="{ data }">
              {{ data.title }}
            </template>
          </el-tree>
        </el-scrollbar>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="handleRoleResourceSubmit"
              >确 定</el-button
            >
            <el-button @click="closeMenuDialogVisible">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </Page>
</template>
