<template>
  <section class="comm-options-panel">
    <div class="panel-toolbar">
      <div class="selected-title">
        <span>子选项</span>
        <n-tag v-if="parent" size="small" type="info">
          {{ parent.name }} / {{ parent.code }}
        </n-tag>
      </div>
      <n-button type="primary" :disabled="!parent" @click="openModal()">
        <template #icon>
          <n-icon><AddOutline /></n-icon>
        </template>
        新增子选项
      </n-button>
    </div>

    <n-empty
      v-if="!parent"
      description="请选择一个父选项"
      class="empty-state"
    />
    <nel-table
      v-else
      :loading="loading"
      :data="tableData"
      :naive-columns="columns"
      :row-key="(row: FormCommOptionsItem) => row.id"
      v-model:page="params.page"
      v-model:pageSize="params.pageSize"
      :page-sizes="pageSizes"
      :total="total"
      remote
      min-height="calc(100vh - 330px)"
      :single-line="false"
      @change="getList"
    >
      <nel-table-column prop="action" label="操作" width="140" fixed="right">
        <template #default="{ row }">
          <n-space justify="center">
            <n-button
              size="small"
              circle
              secondary
              type="primary"
              @click="openModal(row)"
            >
              <template #icon>
                <n-icon><CreateOutline /></n-icon>
              </template>
            </n-button>
            <n-popconfirm @positive-click="deleteRow(row)">
              <template #trigger>
                <n-button size="small" circle secondary type="error">
                  <template #icon>
                    <n-icon><TrashOutline /></n-icon>
                  </template>
                </n-button>
              </template>
              确定删除该子选项？
            </n-popconfirm>
          </n-space>
        </template>
      </nel-table-column>
    </nel-table>

    <n-modal
      v-model:show="modal.visible"
      :title="modal.title"
      preset="card"
      style="width: 520px"
      @after-leave="resetModal"
    >
      <form-create
        v-if="modal.visible"
        v-model="formData"
        v-model:api="fApi"
        :rule="rule"
        :option="formOptions"
      />
      <template #footer>
        <n-space justify="end">
          <n-button @click="modal.visible = false">取消</n-button>
          <n-button
            type="primary"
            :loading="submitLoading"
            @click="submitModal"
          >
            确定
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5';
import {
  addFormCommOptionsItemApi,
  deleteFormCommOptionsItemApi,
  getFormCommOptionsItemListApi,
  updateFormCommOptionsItemApi,
} from '@/api/system/form-template';
import { pageSize, pageSizes } from '@/utils/config';

type ModalMode = 'add' | 'edit';

const props = defineProps<{
  parent?: FormCommOptions;
}>();

const loading = ref(false);
const submitLoading = ref(false);
const tableData = ref<FormCommOptionsItem[]>([]);
const total = ref(0);
const fApi = ref<any>();
const formData = ref<Record<string, any>>({});

const params = reactive<GetFormCommOptionsItemListParams>({
  page: 1,
  pageSize: pageSize,
  comm_options_code: '',
});

const modal = reactive<{
  visible: boolean;
  title: string;
  mode: ModalMode;
}>({
  visible: false,
  title: '',
  mode: 'add',
});

const formOptions = {
  submitBtn: false,
};

const columns: DataTableColumns<FormCommOptionsItem> = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '标签', key: 'label', minWidth: 160 },
  { title: '值', key: 'value', minWidth: 180 },
  { title: '操作', key: 'action', width: 140 },
];

const rule = [
  {
    type: 'input',
    title: '标签',
    field: 'label',
    props: {
      placeholder: '请输入子选项标签',
      clearable: true,
    },
    validate: [
      { required: true, message: '请输入子选项标签', trigger: 'blur' },
    ],
  },
  {
    type: 'input',
    title: '值',
    field: 'value',
    props: {
      placeholder: '请输入子选项值',
      clearable: true,
    },
    validate: [{ required: true, message: '请输入子选项值', trigger: 'blur' }],
  },
];

const getList = async () => {
  if (!props.parent) {
    tableData.value = [];
    total.value = 0;
    return;
  }
  try {
    loading.value = true;
    params.comm_options_code = props.parent.code;
    const res = await getFormCommOptionsItemListApi(params);
    tableData.value = res.data.rows;
    total.value = res.data.total;
  } finally {
    loading.value = false;
  }
};

const openModal = (row?: FormCommOptionsItem) => {
  if (!props.parent) {
    window.$message.warning('请先选择父选项');
    return;
  }
  modal.mode = row ? 'edit' : 'add';
  modal.title = row ? '编辑子选项' : '新增子选项';
  formData.value = row
    ? { ...row }
    : {
        label: '',
        value: '',
        comm_options_code: props.parent.code,
      };
  modal.visible = true;
};

const submitModal = async () => {
  if (!props.parent) return;
  try {
    submitLoading.value = true;
    await fApi.value?.validate();
    const payload = {
      ...formData.value,
      comm_options_code: props.parent.code,
    } as FormCommOptionsItemPayload;
    if (modal.mode === 'add') {
      await addFormCommOptionsItemApi(payload);
      window.$message.success('新增子选项成功');
    } else {
      await updateFormCommOptionsItemApi(payload);
      window.$message.success('保存子选项成功');
    }
    modal.visible = false;
    await getList();
  } finally {
    submitLoading.value = false;
  }
};

const deleteRow = async (row: FormCommOptionsItem) => {
  await deleteFormCommOptionsItemApi(row.id);
  window.$message.success('删除子选项成功');
  await getList();
};

const resetModal = () => {
  formData.value = {};
};

watch(
  () => props.parent?.code,
  () => {
    params.page = 1;
    getList();
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.comm-options-panel {
  min-width: 0;
}

.panel-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.selected-title {
  display: flex;
  align-items: center;
  min-height: 34px;
  gap: 8px;
  font-weight: 600;
}

.empty-state {
  min-height: calc(100vh - 330px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--n-border-color);
}

@media (max-width: 1100px) {
  .panel-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
