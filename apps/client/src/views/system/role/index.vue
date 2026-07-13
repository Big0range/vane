<template>
  <Page>
    <template #default>
      <n-button type="primary" @click="handleAdd">
        <template #icon>
          <AddOutline />
        </template>
        新增
      </n-button>
      <div class="pt-16"></div>
      <!--table-->
      <!--  @page-change="handleQuery" @size-change="handleQuery" -->
      <nel-table
        ref="dataTableRef"
        :loading="loading"
        :data="roleList"
        bordered
        v-model:page="queryParams.page"
        v-model:pageSize="queryParams.pageSize"
        :page-sizes="[10, 20, 30]"
        :total="total"
        remote
        @change="handleQuery"
        align="center"
        :naive-columns="cloumns"
      >
        <nel-table-column label="操作" prop="action" align="center" width="200">
          <template #default="scope">
            <n-space justify="center">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button
                    type="success"
                    size="small"
                    circle
                    secondary
                    @click.stop="showRoleMenuDialog(scope.row)"
                  >
                    <template #icon>
                      <n-icon size="15">
                        <svg-icon icon-class="perm" />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                分配资源
              </n-tooltip>
              <n-button
                type="primary"
                size="small"
                circle
                secondary
                @click.stop="handleUpdate(scope.row)"
              >
                <template #icon>
                  <CreateOutline />
                </template>
              </n-button>
              <n-button
                type="warning"
                size="small"
                circle
                secondary
                @click.stop="handleDelete(scope.row)"
              >
                <template #icon>
                  <TrashOutline />
                </template>
              </n-button>
            </n-space>
          </template>
        </nel-table-column>
      </nel-table>
      <!-- pagination -->
      <!-- <pagination v-if="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.pageSize"
        @pagination="handleQuery" /> -->

      <!-- dialog -->
      <n-modal
        preset="card"
        :title="dialog.title"
        v-model:show="dialog.visible"
        style="width: 500px"
      >
        <n-form
          ref="dataFormRef"
          :model="formData"
          :rules="rules"
          label-width="100px"
        >
          <n-form-item label="角色名称" path="role_name">
            <n-input
              v-model:value="formData.role_name"
              placeholder="请输入角色名称"
            />
          </n-form-item>
          <n-form-item label="角色描述" path="role_desc">
            <n-input
              v-model:value="formData.role_desc"
              placeholder="请输入角色描述"
            />
          </n-form-item>
        </n-form>

        <template #footer>
          <n-button-group>
            <n-button @click="closeDialog" :loading="loading">取 消</n-button>
            <n-button type="primary" @click="submitFormData" :loading="loading"
              >确 定</n-button
            >
          </n-button-group>
        </template>
      </n-modal>

      <!--分配资源弹窗-->
      <n-modal
        preset="card"
        :title="'【' + checkedRole.name + '】资源分配'"
        v-model:show="menuDialogVisible"
        style="width: 800px"
      >
        <n-scrollbar style="max-height: 600px">
          <n-tree
            v-model:checked-keys="menuCheckedKeys"
            ref="resourceRef"
            check-on-click
            key-field="id"
            cascade
            checkable
            label-field="title"
            :data="resourceOptions"
            default-expand-all
          >
          </n-tree>
        </n-scrollbar>

        <template #footer>
          <n-button-group>
            <n-button
              :loading="modalLoading"
              type="primary"
              @click="handleRoleResourceSubmit"
              >确 定</n-button
            >
            <n-button :loading="modalLoading" @click="closeMenuDialogVisible"
              >取 消</n-button
            >
          </n-button-group>
        </template>
      </n-modal>
    </template>
  </Page>
</template>

<script lang="ts">
export default {
  name: 'Roles',
};
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  getRoleListApi,
  updateRoleApi,
  addRoleApi,
  delRoleApi,
  getMenuTreeByRoleIdApi,
  updateRoleMenusApi,
} from '@/api/system/role';
import { fetchMenuTreeApi } from '@/api/system/menu';
import { FormInst, useDialog } from 'naive-ui';
import { AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5';
import type { RoleFormData, RoleItem } from '@/api/system/role/types';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useForm } from '@/hooks';
import { getTableTemplate } from '@/utils/getTemplate';
const dataFormRef = ref<FormInst>();
const formData = ref({} as RoleFormData);
const { resetForm, verifyForm } = useForm(dataFormRef, formData);
const cloumns = ref<TableTemplateRow[]>([]);
(async () => {
  cloumns.value = await getTableTemplate('RoleList');
})();
async function submitFormData() {
  loading.value = true;
  try {
    await verifyForm();
    if (formData.value.id) {
      await updateRoleApi(formData.value);
      window.$message.success('修改角色成功');
    } else {
      await addRoleApi(formData.value);
      window.$message.success('新增角色成功');
    }
    closeDialog();
    handleQuery();
  } finally {
    loading.value = false;
  }
}

const loading = ref(true);
const queryParams = ref<PageQueryParam>({
  page: 1,
  pageSize: 10,
});
const total = ref(0);
const roleList = ref([] as RoleItem[]);
const dialog = ref({
  title: '',
  visible: false,
});
const rules = ref({
  role_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  role_desc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
});
const menuDialogVisible = ref(false);
const resourceOptions = ref([] as any[]);
const checkedRole = ref({
  id: '',
  name: '',
});

/**
 * 查询
 */
function handleQuery() {
  loading.value = true;
  getRoleListApi(queryParams.value).then(res => {
    const data = res.data;
    roleList.value = data.rows as any;
    total.value = data.total;
    loading.value = false;
  });
}

function handleAdd() {
  dialog.value = {
    title: '添加角色',
    visible: true,
  };
  formData.value = {} as any;
}

function handleUpdate(row: any) {
  dialog.value = {
    title: '修改角色',
    visible: true,
  };
  formData.value = { ...row };
  // const roleId = row.id || state.ids;
  // getRoleFormDetail(roleId).then(({ data }) => {
  //   state.formData = data;
  // });
}

/**
 * 取消
 */
function closeDialog() {
  dialog.value.visible = false;
  resetForm();
}

const dialog2 = useDialog();
/**
 *  删除
 */
function handleDelete(row: any) {
  dialog2.error({
    title: '警告',
    content: '确认删除已选中的数据项？',
    positiveText: '确定',
    negativeText: '取消',
    async onPositiveClick() {
      await delRoleApi(row.id);

      window.$message.success('删除成功');

      handleQuery();
    },
    onNegativeClick() {
      window.$message.info('已取消删除');
    },
  });
}

const modalLoading = ref(true);
/**
 * 分配资源提交
 */
async function handleRoleResourceSubmit() {
  try {
    modalLoading.value = true;
    await updateRoleMenusApi(
      checkedRole.value.id,
      menuCheckedKeys.value.join(','),
    );
    window.$message.success('分配权限成功');
    menuDialogVisible.value = false;
  } catch (error) {
    window.$message.error('分配权限失败');
  } finally {
    modalLoading.value = false;
  }
}

const menuCheckedKeys = ref([] as number[]);
/**
 * 资源分配
 */
async function showRoleMenuDialog(row: any) {
  try {
    menuCheckedKeys.value = [];
    menuDialogVisible.value = true;
    modalLoading.value = true;
    const roleId: any = row.id;
    checkedRole.value = {
      id: roleId,
      name: row.role_name,
    };
    const res = await fetchMenuTreeApi();
    let data = res.data;
    resourceOptions.value = data;
    const { data: selectedMenuIds } = await getMenuTreeByRoleIdApi(roleId);
    menuCheckedKeys.value = selectedMenuIds;
  } catch (error) {
  } finally {
    modalLoading.value = false;
  }
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
