<template>
  <div class="app-container">
    <n-card>
      <template #header>
        <n-button type="primary" @click="handleAdd()">
          <template #icon>
            <n-icon>
              <AddOutline />
            </n-icon>
          </template>
          新增菜单
        </n-button>
      </template>

      <nel-table
        :key="tableKey"
        :loading="loading"
        :row-key="(row: IMenuItem) => row.id"
        :data="menuList"
        :naive-columns="columns"
        default-expand-all
        bordered
        :single-line="false"
        max-height="calc(100vh - 300px)"
        striped
      >
        <nel-table-column prop="title" :min-width="200">
          <template #default="{ row }">
            <SvgIcon v-if="getMenuIcon(row)" :icon-class="getMenuIcon(row)!" />
            {{ row.title }}
          </template>
        </nel-table-column>

        <nel-table-column prop="type">
          <template #default="{ row }">
            <n-tag :type="menuTypeMeta[row.type]?.tagType || 'default'">
              {{ menuTypeMeta[row.type]?.label || row.type }}
            </n-tag>
          </template>
        </nel-table-column>

        <nel-table-column prop="hidden">
          <template #default="{ row }">
            <n-tag :type="row.hidden === 0 ? 'success' : 'error'">
              {{ row.hidden === 0 ? '显示' : '隐藏' }}
            </n-tag>
          </template>
        </nel-table-column>

        <nel-table-column prop="action">
          <template #default="{ row }">
            <n-space justify="center">
              <n-button
                type="primary"
                size="small"
                circle
                secondary
                @click="handleAdd(row)"
              >
                <template #icon>
                  <AddOutline />
                </template>
              </n-button>
              <n-button
                type="primary"
                size="small"
                circle
                secondary
                @click="handleUpdate(row)"
              >
                <template #icon>
                  <CreateOutline />
                </template>
              </n-button>
              <n-button
                type="error"
                size="small"
                circle
                secondary
                @click="handleDelete(row)"
              >
                <template #icon>
                  <TrashOutline />
                </template>
              </n-button>
            </n-space>
          </template>
        </nel-table-column>
      </nel-table>
    </n-card>

    <n-modal
      v-model:show="dialog.visible"
      :title="dialog.title"
      preset="card"
      style="width: 750px"
      @after-leave="resetDialog"
    >
      <formCreate
        v-model="formData"
        v-model:api="fApi"
        :rule="rule"
        :option="formOptions"
      >
        <template #field-component="">
          <n-input-group>
            <n-input-group-label>src/views/</n-input-group-label>
            <n-input v-model:value="formData.component" />
            <n-input-group-label>.vue</n-input-group-label>
          </n-input-group>
        </template>

        <template #field-icon="">
          <n-popover
            placement="bottom-start"
            style="width: 670px"
            trigger="click"
          >
            <template #trigger>
              <n-input
                v-model:value="formData.icon"
                placeholder="点击选择菜单图标"
                clearable
                readonly
              >
                <template #prefix>
                  <SvgIcon v-if="formData.icon" :icon-class="formData.icon" />
                </template>
              </n-input>
            </template>
            <IconSelect @selected="selected" />
          </n-popover>
        </template>
      </formCreate>

      <template #footer>
        <n-space justify="end">
          <n-button @click="closeDialog">取消</n-button>
          <n-button type="primary" :loading="submitLoading" @click="submitForm">
            确定
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5';
import formCreate from '@form-create/naive-ui';
import { ref } from 'vue';
import { type TagProps, useDialog } from 'naive-ui';
import {
  addMenuApi,
  deleteMenuApi,
  fetchMenuTreeApi,
  getMenuRoutesApi,
  updateMenuApi,
} from '@/api/system/menu';
import IconSelect from '@/components/IconSelect/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { getTableTemplate } from '@/utils/getTemplate';
import rowMenu from './data';
import { getApiListApi } from '@/api/system/white-api';

defineOptions({
  name: 'Menus',
});

type MenuTreeItem = IMenuItem & { hasChildren?: boolean };

const dialogApi = useDialog();
const loading = ref(false);
const submitLoading = ref(false);
const tableKey = ref(0);
const columns = ref<TableTemplateRow[]>([]);
const menuList = ref<IMenuItem[]>([]);
const rule = ref(rowMenu);
const fApi = ref<any>();
const dialog = ref({
  visible: false,
  title: '',
});
const formData = ref(getDefaultFormData());
const formOptions = {
  form: {
    labelWidth: 140,
    labelPlacement: 'left',
  },
  submitBtn: false,
  resetBtn: false,
};

const menuTypeMeta: Record<
  string,
  { label: string; tagType: TagProps['type'] }
> = {
  CATALOG: { label: '目录', tagType: 'warning' },
  MENU: { label: '菜单', tagType: 'info' },
  BUTTON: { label: '按钮', tagType: 'success' },
  EXTLINK: { label: '外链', tagType: 'default' },
};

function getDefaultFormData(): TMenuFormData & { routes?: number[] } {
  return {
    parent_id: -1,
    name: '',
    sort: 1,
    component: null,
    type: 'MENU',
    keep_alive: 0,
    hidden: 0,
    routes: [],
  };
}

function getMenuIcon(row: IMenuItem): string | null {
  return row.type === 'BUTTON' ? 'button' : row.icon;
}

function normalizeMenuTree(data: MenuTreeItem[]): IMenuItem[] {
  return data.map(({ hasChildren: _hasChildren, children, ...item }) => ({
    ...item,
    children: children?.length
      ? normalizeMenuTree(children as MenuTreeItem[])
      : [],
  }));
}

function formatMenuOptions(data: IMenuItem[]): any[] {
  return data.map(item => ({
    label: item.title,
    value: item.id,
    children: item.children?.length
      ? formatMenuOptions(item.children)
      : undefined,
  }));
}

async function handleQuery() {
  loading.value = true;
  try {
    const { data } = await fetchMenuTreeApi();
    menuList.value = normalizeMenuTree(data as MenuTreeItem[]);
    tableKey.value += 1;
  } finally {
    loading.value = false;
  }
}

function loadMenuData() {
  formCreate.setData('menuOptions', [
    {
      value: -1,
      label: '顶级菜单',
      children: formatMenuOptions(menuList.value),
    },
  ]);
}
const routes = ref<IApiItem[]>([]);
async function loadRoutesData() {
  if (routes.value.length === 0) {
    const result = await getApiListApi({ page: 1, pageSize: 9999, auth: '1' });
    routes.value = result.data.rows.map(item => ({
      ...item,
      url: item.url + `(${item.method})`,
    }));
  }
  formCreate.setData('routesOptions', routes.value);
}
function handleAdd(row?: IMenuItem) {
  loadMenuData();
  loadRoutesData();
  formData.value = {
    ...getDefaultFormData(),
    parent_id: row?.id ?? -1,
  };
  dialog.value = {
    title: '新增菜单',
    visible: true,
  };
}

async function handleUpdate(row: IMenuItem) {
  loadMenuData();
  loadRoutesData();
  formData.value = structuredClone(row);
  dialog.value = {
    title: '编辑菜单',
    visible: true,
  };
  const result = await getMenuRoutesApi(row.id);
  formData.value.routes = result.data;
}
async function submitForm() {
  submitLoading.value = true;
  try {
    await fApi.value?.validate?.();
    const payload = {
      ...formData.value,
      icon: formData.value.icon || '',
      component: formData.value.component || 'Layout',
    };

    if (payload.id) {
      await updateMenuApi(payload);
      window.$message.success('修改成功');
    } else {
      await addMenuApi(payload);
      window.$message.success('新增成功');
    }

    closeDialog();
    await handleQuery();
  } finally {
    submitLoading.value = false;
  }
}

function handleDelete(row: IMenuItem) {
  dialogApi.warning({
    title: '警告',
    content: '确认删除选中的菜单吗？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    async onPositiveClick() {
      await deleteMenuApi([row.id]);
      window.$message.success('删除成功');
      await handleQuery();
    },
    onNegativeClick() {
      window.$message.info('已取消删除');
    },
  });
}

function closeDialog() {
  dialog.value.visible = false;
}

function resetDialog() {
  fApi.value?.resetFields?.();
  formData.value = getDefaultFormData();
  console.log('formData.value', formData.value);
}

function selected(name: string) {
  formData.value.icon = name;
}

async function initPage() {
  columns.value = await getTableTemplate('MenuList');
  await handleQuery();
}

initPage();
</script>
