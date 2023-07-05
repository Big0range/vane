<template>
  <Page>
    <template #top>
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        :inline="true"
        :disabled="noShop"
      >
        <el-form-item
          :label="$t('dept.selectShop')"
          prop="status"
          v-hasPerm="'sys:dept:all_shop'"
        >
          <el-select
            v-model="queryParams.shop_id"
            :placeholder="$t('dept.selectShopPlaceholder')"
          >
            <el-option
              v-for="shop in shopList"
              :key="shop.id"
              :value="shop.id"
              :label="shop.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('dept.name')" prop="name">
          <el-input
            v-model="queryParams.name"
            :placeholder="$t('dept.namePlaceholder')"
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item :label="$t('dept.status')" prop="status">
          <el-select
            v-model="queryParams.status"
            :placeholder="$t('dept.statusPlaceholder')"
            clearable
          >
            <el-option :value="0" :label="$t('common.normal')" />
            <el-option :value="1" :label="$t('common.forbidden')" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" @click="handleQuery">
            {{ $t('common.search') }}
          </el-button>
          <el-button @click="resetQuery">
            {{ $t('common.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #default>
      <el-button
        :disabled="noShop"
        type="primary"
        @click="openDialog(-1, undefined)"
        >{{ $t('common.add') }}</el-button
      >
      <el-button
        type="danger"
        @click="handleDelete()"
        :disabled="ids.length === 0"
        >{{ $t('common.delete') }}
      </el-button>
      <div class="pt-16"></div>
      <el-table
        v-loading="loading"
        :data="deptList"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" :label="$t('dept.name')" min-width="200" />
        <el-table-column prop="desc" :label="$t('dept.desc')" min-width="200" />
        <el-table-column prop="status" :label="$t('dept.status')" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 0" type="success">{{
              $t('common.normal')
            }}</el-tag>
            <el-tag v-else type="info">{{ $t('common.forbidden') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" :label="$t('common.sort')" width="100" />
        <el-table-column
          :label="$t('common.operate')"
          fixed="right"
          align="left"
          width="200"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="openDialog(scope.row.id, undefined)"
              >{{ $t('common.add') }}
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="
                openDialog(scope.row.parent_id, scope.row.id, scope.row)
              "
              >{{ $t('common.edit') }}
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="handleDelete(scope.row.id)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="dialog.title"
        v-model="dialog.visible"
        width="600px"
        @closed="closeDialog"
      >
        <el-form
          ref="deptFormRef"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item :label="$t('dept.parentDept')" prop="parent_id">
            <el-tree-select
              v-model="formData.parent_id"
              :placeholder="$t('dept.parentDeptPlaceholder')"
              :data="deptOptions"
              filterable
              check-strictly
              :render-after-expand="false"
            />
          </el-form-item>
          <el-form-item :label="$t('dept.name')" prop="name">
            <el-input
              v-model="formData.name"
              :placeholder="$t('dept.namePlaceholder')"
            />
          </el-form-item>
          <el-form-item :label="$t('dept.desc')" prop="desc">
            <el-input
              v-model="formData.desc"
              :placeholder="$t('dept.descPlaceholder')"
            />
          </el-form-item>
          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number
              v-model="formData.sort"
              controls-position="right"
              style="width: 100px"
              :min="0"
            />
          </el-form-item>
          <el-form-item :label="$t('dept.status')">
            <el-radio-group v-model="formData.status">
              <el-radio :label="0">{{ $t('common.normal') }}</el-radio>
              <el-radio :label="1">{{ $t('common.forbidden') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="handleSubmit"
              >{{ $t('common.confirm') }}
            </el-button>
            <el-button @click="closeDialog">
              {{ $t('common.cancel') }}
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </Page>
</template>
<script lang="ts">
export default {
  name: 'DeptIndex'
};
</script>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';
import { getShopListApi } from '@/api/shop';
import { deleteDeptApi, updateDept, addDept, getDeptListApi } from '@/api/dept';

import { DeptVO, DeptForm, DeptQuery } from '@/api/dept/types';
import { t } from '@/lang';
import useStore from '@/store';
const store = useStore();
const userStore = store.user;
const allUserInfo = userStore.allUserInfo;
const shopList = ref<PromiseReturnType<typeof getShopListApi>['data']['rows']>(
  []
);

const queryFormRef = ref(ElForm);
const deptFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const dialog = reactive({
  visible: false,
  title: ''
});

const queryParams = reactive<DeptQuery>({});
const deptList = ref<DeptVO[]>();

const deptOptions = ref<any[]>();

const formData = reactive<DeptForm>({
  status: 0,
  parent_id: -1,
  desc: '',
  sort: 1
});

const rules = reactive({
  parent_id: [
    { required: true, message: t('dept.rules.parent_id'), trigger: 'blur' }
  ],
  name: [{ required: true, message: t('dept.rules.name'), trigger: 'blur' }],
  desc: [{ required: true, message: t('dept.rules.desc'), trigger: 'blur' }],
  sort: [{ required: true, message: t('dept.rules.sort'), trigger: 'blur' }]
});
const noShop = ref(false);
if (userStore.perms.includes('sys:dept:all_shop')) {
  // 获取门店列表
  getShopListApi({ notPage: 'true' }).then(res => {
    shopList.value = res.data.rows;
    queryParams.shop_id = res.data.rows[0]?.id;
    handleQuery();
  });
} else {
  if (allUserInfo.shop_id) {
    queryParams.shop_id = allUserInfo.shop_id;
    handleQuery();
  } else {
    noShop.value = true;
    ElMessage.error('此账号暂未绑定门店');
  }
}
/**
 * 查询
 */
function handleQuery() {
  loading.value = true;
  getDeptListApi(queryParams).then(res => {
    console.log(res);
    deptList.value = res.data;
    loading.value = false;
  });
}

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

/**
 * 行复选框选中记录选中ID集合
 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/**
 * 获取部门下拉数据
 */
async function getDeptOptions() {
  const format = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return {
          value: item.id,
          label: item.name,
          children: format(item.children)
        };
      } else {
        return {
          value: item.id,
          label: item.name,
          children: []
        };
      }
    });
  };
  getDeptListApi({ shop_id: queryParams.shop_id }).then(res => {
    deptOptions.value = [
      {
        value: -1,
        label: t('dept.topDept'),
        children: format(res.data)
      }
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
  dialog.visible = true;
  if (deptId) {
    dialog.title = t('dept.editDept');
    formData.shop_id = row.shop_id;
    formData.id = row.id;
    formData.desc = row.desc;
    formData.name = row.name;
    formData.parent_id = row.parent_id;
    formData.sort = row.sort;
    formData.status = row.status;
  } else {
    dialog.title = t('dept.addDept');
    formData.parent_id = parent_id ?? -1;
  }
}

/**
 * 表单提交
 */
function handleSubmit() {
  deptFormRef.value.validate((valid: any) => {
    if (valid) {
      const deptId = formData.id;
      loading.value = true;
      if (deptId) {
        updateDept(formData)
          .then(() => {
            ElMessage.success(t('common.updateSuccess'));
            closeDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        console.log(formData);
        addDept({ ...formData, shop_id: queryParams.shop_id })
          .then(() => {
            ElMessage.success(t('common.addSuccess'));
            closeDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

/**
 * 删除部门
 */
function handleDelete(deptId?: number) {
  const deptIds = [deptId || ids.value].join(',');

  if (!deptIds) {
    ElMessage.warning(t('dept.deptRequired'));
    return;
  }

  ElMessageBox.confirm(t('common.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    deleteDeptApi(deptIds).then(() => {
      ElMessage.success(t('common.deleteSuccess'));
      resetQuery();
    });
  });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/**
 * 重置表单
 */
function resetForm() {
  deptFormRef.value.resetFields();
  deptFormRef.value.clearValidate();

  formData.id = undefined;
  formData.parent_id = -1;
  formData.status = 0;
  formData.sort = 1;
}
</script>
