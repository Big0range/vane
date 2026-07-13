<template>
  <Page>
    <template #top>
      <n-form
        ref="queryFormRef"
        :model="queryParams"
        :inline="true"
        :disabled="noShop"
        label-placement="left"
      >
        <n-form-item
          label="选择门店"
          path="shop_id"
          v-hasPerm="'sys:dept:all_shop'"
        >
          <n-select
            style="width: 170px"
            v-model:value="queryParams.shop_id"
            label-field="name"
            value-field="id"
            clearable
            :options="shopList"
          />
        </n-form-item>
        <n-form-item label="部门名称" path="name">
          <n-input
            v-model:value="queryParams.name"
            :placeholder="'请输入部门名称'"
            @keyup.enter="handleQuery"
          />
        </n-form-item>

        <n-form-item label="部门状态" path="status">
          <n-select
            style="width: 170px"
            v-model:value="queryParams.status"
            placeholder="请选择部门状态"
            :options="[
              { label: '正常', value: 0 },
              { label: '禁用', value: 1 },
            ]"
          />
        </n-form-item>
        <n-form-item>
          <n-button class="filter-item" type="primary" @click="handleQuery">
            搜索
          </n-button>
          <n-button @click="resetQuery"> 重置 </n-button>
        </n-form-item>
      </n-form>
    </template>

    <template #default>
      <n-button
        :disabled="noShop"
        type="primary"
        @click="openDialog(-1, undefined)"
      >
        新增
      </n-button>
      <n-button
        type="error"
        @click="handleDelete()"
        :disabled="ids.length === 0"
      >
        删除
      </n-button>
      <div class="pt-16"></div>
      <nel-table
        :key="key"
        default-expand-all
        :row-key="(row: any) => row.id"
        :loading="loading"
        :data="deptList"
        :naive-columns="columns"
        @update:checked-row-keys="handleSelectionChange"
      >
        <nel-table-column prop="status">
          <template #default="{ row }">
            <n-tag :type="row.status === 0 ? 'success' : 'error'">
              {{ row.status === 0 ? '正常' : '停用' }}
            </n-tag>
          </template>
        </nel-table-column>
        <nel-table-column prop="action">
          <template #default="{ row }">
            <n-button
              type="primary"
              size="small"
              ghost
              :bordered="false"
              @click="openDialog(row.id)"
              >新增</n-button
            >
            <n-button
              type="primary"
              size="small"
              ghost
              :bordered="false"
              @click="openDialog(row.parent_id, row.id, row)"
              >编辑</n-button
            >
            <n-popconfirm @positive-click="handleDelete(row.id)">
              <template #trigger>
                <n-button type="error" size="small" ghost :bordered="false"
                  >删除</n-button
                >
              </template>
              是否确认删除?
            </n-popconfirm>
          </template>
        </nel-table-column>
      </nel-table>

      <n-modal
        :title="dialogVisible.title"
        preset="card"
        v-model:show="dialogVisible.visible"
        style="width: 600px"
      >
        <n-form
          ref="deptFormRef"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <n-form-item label="上级部门" path="parent_id">
            <n-tree-select
              v-model:value="formData.parent_id"
              default-expand-all
              placeholder="请选择上级部门"
              label-field="label"
              key-field="value"
              children-field="children"
              :options="deptOptions"
              filterable
              clearable
            />
          </n-form-item>
          <n-form-item label="部门名称" path="name">
            <n-input
              v-model:value="formData.name"
              placeholder="请输入部门名称"
            />
          </n-form-item>
          <n-form-item label="部门描述" path="desc">
            <n-input
              v-model:value="formData.desc"
              placeholder="请输入部门描述"
            />
          </n-form-item>
          <n-form-item label="排序" path="sort">
            <n-input-number
              v-model:value="formData.sort"
              style="width: 100px"
              :min="0"
            />
          </n-form-item>
          <n-form-item label="部门状态">
            <n-radio-group v-model:value="formData.status">
              <n-space>
                <!-- 0 就是正常  不要有疑问 -->
                <n-radio :value="0" label="正常">正常</n-radio>
                <n-radio :value="1" label="禁用">禁用</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
        </n-form>

        <template #footer>
          <div class="dialogVisible-footer">
            <n-button type="primary" @click="handleSubmit">确 定 </n-button>
            <n-button @click="closeDialog"> 取 消 </n-button>
          </div>
        </template>
      </n-modal>
    </template>
  </Page>
</template>
<script lang="ts">
export default {
  name: 'DeptIndex',
};
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { getShopListApi } from '@/api/shop';
import { deleteDeptApi, updateDept, addDept, getDeptListApi } from '@/api/dept';
import type { DeptVO, DeptForm, DeptQuery } from '@/api/dept/types';
import { type FormInst, type FormRules, useDialog } from 'naive-ui';
import useStore from '@/store';
import { useForm } from '@/hooks';
import { getTableTemplate } from '@/utils/getTemplate';
const store = useStore();
const userStore = store.user;
const allUserInfo = userStore.allUserInfo;
const shopList = ref<PromiseReturnType<typeof getShopListApi>['data']['rows']>(
  [],
);

const queryFormRef = ref<FormInst>();
const deptFormRef = ref<FormInst>();

const loading = ref(false);
const ids = ref<number[]>([]);
const dialogVisible = reactive({
  visible: false,
  title: '',
});

const defaultQueryParams: DeptQuery = {
  shop_id: null,
  status: null,
  name: null,
};
const queryParams = ref({ ...defaultQueryParams });
const { resetForm: resetQueryForm } = useForm(queryFormRef, queryParams);
const deptList = ref<DeptVO[]>([]);

const deptOptions = ref<any[]>([]);

const defaultFormData: DeptForm = {
  status: 0,
  parent_id: -1,
  desc: '',
  sort: 1,
};
const formData = ref({ ...defaultFormData });

const { verifyForm: verifyDeptForm, resetForm: resetDeptForm } = useForm(
  deptFormRef,
  formData,
);
const rules: FormRules = {
  parent_id: [
    {
      required: true,
      message: '请选择上级部门',
      trigger: 'change',
      type: 'number',
    },
  ],
  name: [{ required: true, message: '请输入部门名称', trigger: 'input' }],
  desc: [{ required: true, message: '请输入部门描述', trigger: 'input' }],
  sort: [
    {
      required: true,
      message: '请输入部门排序',
      trigger: 'input',
      type: 'number',
    },
  ],
};
const noShop = ref(false);
if (userStore.perms.includes('sys:dept:all_shop')) {
  console.log('sys:dept:all_shop');
  // 获取门店列表
  getShopListApi({ notPage: 'true' }).then(res => {
    shopList.value = res.data.rows;
    queryParams.value.shop_id = allUserInfo.shop_id;
    console.log('queryParams.value.shop_id', queryParams.value.shop_id);
    handleQuery();
  });
} else {
  if (allUserInfo.shop_id) {
    queryParams.value.shop_id = allUserInfo.shop_id;
    handleQuery();
  } else {
    noShop.value = true;
    window.$message.error('此账号暂未绑定门店');
  }
}
const key = ref(0);
/**
 * 查询
 */
async function handleQuery() {
  loading.value = true;
  try {
    const res = await getDeptListApi(queryParams.value);
    deptList.value = res.data;
  } catch (error) {
    window.$message.error('查询部门列表失败');
  }
  key.value++;
  loading.value = false;
}

/**
 * 重置查询
 */
function resetQuery() {
  resetQueryForm();
  handleQuery();
}

/**
 * 行复选框选中记录选中ID集合
 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item);
}

/**
 * 获取部门下拉数据
 */
async function getDeptOptions() {
  const format = (data: any) => {
    return data.map((item: any) => {
      if (item.children && item.children.length > 0) {
        return {
          value: item.id,
          label: item.name,
          children: format(item.children),
        };
      } else {
        return {
          value: item.id,
          label: item.name,
        };
      }
    });
  };
  getDeptListApi({ shop_id: queryParams.value.shop_id }).then(res => {
    deptOptions.value = [
      {
        value: -1,
        label: '顶级部门',
        children: res.data.length > 0 ? format(res.data) : [],
      },
    ];
  });
}

/**
 * 打开弹窗
 *
 * @param parent_id 父部门ID
 * @param deptId 部门ID
 */
async function openDialog(parent_id?: number, deptId?: number, row?: any) {
  await getDeptOptions();
  dialogVisible.visible = true;
  if (deptId) {
    dialogVisible.title = '编辑部门';
    formData.value.shop_id = row.shop_id;
    formData.value.id = row.id;
    formData.value.desc = row.desc;
    formData.value.name = row.name;
    formData.value.parent_id = row.parent_id;
    formData.value.sort = row.sort;
    formData.value.status = row.status;
  } else {
    dialogVisible.title = '新增部门';
    formData.value.parent_id = parent_id ?? -1;
    formData.value.shop_id = row.shop_id;
    formData.value.name = '';
    formData.value.desc = '';
    formData.value.sort = 1;
    formData.value.status = 0;
  }
}

/**
 * 表单提交
 */
async function handleSubmit() {
  try {
    await verifyDeptForm();
    const deptId = formData.value.id;
    loading.value = true;
    if (deptId) {
      updateDept(formData.value)
        .then(() => {
          window.$message.success('修改成功!');
          closeDialog();
          handleQuery();
        })
        .finally(() => (loading.value = false));
    } else {
      console.log(formData.value);
      addDept({ ...formData.value, shop_id: queryParams.value.shop_id! })
        .then(() => {
          window.$message.success('新增成功!');
          closeDialog();
          handleQuery();
        })
        .finally(() => (loading.value = false));
    }
  } catch (error) {}
}

const dialog = useDialog();
/**
 * 删除部门
 */
function handleDelete(deptId?: number) {
  const deptIds = [deptId || ids.value].join(',');

  if (!deptIds) {
    window.$message.warning('请选择部门');
    return;
  }
  dialog.warning({
    title: '警告',
    content: '此操作将永久删除该部门，是否继续？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      await deleteDeptApi(deptIds);
      window.$message.success('删除成功!');
      resetQuery();
    },
  });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialogVisible.visible = false;
  resetDeptForm();
}

// const columns = getShopColumns(openDialog, handleDelete);
// console.log('columns', columns);
const columns = ref<TableTemplateRow[]>([]);
(async () => {
  try {
    loading.value = true;
    columns.value = [
      {
        type: 'selection',
        width: 50,
        fixed: 'left',
      } as any,
      ...(await getTableTemplate('DeptList')),
    ];
    console.log('columns.value', columns.value);
  } finally {
    loading.value = false;
  }
})();
</script>
