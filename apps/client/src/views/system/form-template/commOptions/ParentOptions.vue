<template>
  <section class="comm-options-panel">
    <div class="panel-toolbar">
      <n-space align="center">
        <n-input
          v-model:value="params.name"
          clearable
          placeholder="请输入选项组名称"
          style="width: 180px"
          @keyup.enter="reload"
        />
        <n-input
          v-model:value="params.code"
          clearable
          placeholder="请输入选项组编码"
          style="width: 180px"
          @keyup.enter="reload"
        />
        <n-button secondary @click="reload">查询</n-button>
      </n-space>
      <n-button type="primary" @click="openModal()">
        <template #icon>
          <n-icon><AddOutline /></n-icon>
        </template>
        新增父选项
      </n-button>
    </div>

    <nel-table
      :loading="loading"
      :data="tableData"
      :naive-columns="columns"
      :row-key="(row: FormCommOptions) => row.id"
      :row-props="rowProps"
      v-model:page="params.page"
      v-model:pageSize="params.pageSize"
      :page-sizes="[10, 20, 30]"
      :total="total"
      remote
      min-height="calc(100vh - 330px)"
      :single-line="false"
      @change="getList"
    >
      <nel-table-column prop="action" label="操作" width="210" fixed="right">
        <template #default="{ row }">
          <n-space justify="center">
            <n-button
              size="small"
              secondary
              type="primary"
              @click.stop="selectRow(row)"
            >
              子选项
            </n-button>
            <n-button
              size="small"
              circle
              secondary
              type="primary"
              @click.stop="openModal(row)"
            >
              <template #icon>
                <n-icon><CreateOutline /></n-icon>
              </template>
            </n-button>
            <n-popconfirm @positive-click="deleteRow(row)">
              <template #trigger>
                <n-button
                  size="small"
                  circle
                  secondary
                  type="error"
                  @click.stop
                >
                  <template #icon>
                    <n-icon><TrashOutline /></n-icon>
                  </template>
                </n-button>
              </template>
              删除父选项会同步删除其子选项，确定继续？
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
import { reactive, ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5';
import {
  addFormCommOptionsApi,
  deleteFormCommOptionsApi,
  getFormCommOptionsListApi,
  updateFormCommOptionsApi,
} from '@/api/system/form-template';

type ModalMode = 'add' | 'edit';

const selectedParent = defineModel<FormCommOptions | undefined>(
  'selectedParent',
);

const loading = ref(false);
const submitLoading = ref(false);
const tableData = ref<FormCommOptions[]>([]);
const total = ref(0);
const fApi = ref<any>();
const formData = ref<Record<string, any>>({});

const params = reactive<GetFormCommOptionsListParams>({
  page: 1,
  pageSize: 10,
  name: '',
  code: '',
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

const columns: DataTableColumns<FormCommOptions> = [
  { title: 'ID', key: 'id', width: 70 },
  { title: '选项组名称', key: 'name', minWidth: 160 },
  { title: '选项组编码', key: 'code', minWidth: 180 },
  { title: '操作', key: 'action', width: 210 },
];

const rule = [
  {
    type: 'input',
    title: '选项组名称',
    field: 'name',
    props: {
      placeholder: '请输入选项组名称',
      clearable: true,
    },
    validate: [
      { required: true, message: '请输入选项组名称', trigger: 'blur' },
    ],
  },
  {
    type: 'input',
    title: '选项组编码',
    field: 'code',
    props: {
      placeholder: '请输入选项组编码',
      clearable: true,
    },
    validate: [
      { required: true, message: '请输入选项组编码', trigger: 'blur' },
    ],
  },
];

const rowProps = (row: FormCommOptions) => {
  return {
    class: selectedParent.value?.id === row.id ? 'is-selected-row' : '',
    onClick: () => selectRow(row),
  };
};

const reload = () => {
  params.page = 1;
  getList();
};

const getList = async () => {
  try {
    loading.value = true;
    const res = await getFormCommOptionsListApi(params);
    tableData.value = res.data.rows;
    total.value = res.data.total;

    const selected = tableData.value.find(
      item => item.id === selectedParent.value?.id,
    );
    if (selected) {
      selectedParent.value = selected;
    } else {
      selectedParent.value = tableData.value[0];
    }
  } finally {
    loading.value = false;
  }
};

const selectRow = (row: FormCommOptions) => {
  selectedParent.value = row;
};

const openModal = (row?: FormCommOptions) => {
  modal.mode = row ? 'edit' : 'add';
  modal.title = row ? '编辑父选项' : '新增父选项';
  formData.value = row ? { ...row } : { name: '', code: '' };
  modal.visible = true;
};

const submitModal = async () => {
  try {
    submitLoading.value = true;
    await fApi.value?.validate();
    if (modal.mode === 'add') {
      await addFormCommOptionsApi(formData.value as FormCommOptionsPayload);
      window.$message.success('新增父选项成功');
    } else {
      await updateFormCommOptionsApi(formData.value as FormCommOptionsPayload);
      window.$message.success('保存父选项成功');
    }
    modal.visible = false;
    await getList();
  } finally {
    submitLoading.value = false;
  }
};

const deleteRow = async (row: FormCommOptions) => {
  await deleteFormCommOptionsApi(row.id);
  window.$message.success('删除父选项成功');
  await getList();
};

const resetModal = () => {
  formData.value = {};
};

getList();
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

:deep(.is-selected-row td) {
  background-color: rgba(24, 160, 88, 0.08);
}

@media (max-width: 1100px) {
  .panel-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
