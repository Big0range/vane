<template>
  <Page>
    <template #default>
      <div class="toolbar">
        <n-space justify="end">
          <n-button type="primary" @click="openImportModal">
            导入模板
          </n-button>
        </n-space>
      </div>
      <nel-table
        :loading="loading"
        :data="tableData"
        :naive-columns="columns"
        min-height="calc(100vh - 300px)"
        :single-line="false"
        v-model:page="params.page"
        v-model:pageSize="params.pageSize"
        :page-sizes="[10, 20, 30]"
        :total="total"
        remote
        @change="getFormTemplateList()"
      >
        <nel-table-column label="模板名称" prop="title" width="150">
          <template #default="scope">
            <template v-if="editRowIndex == scope.index">
              <n-input v-model:value="editRowData.title"></n-input>
            </template>
            <template v-else>
              {{ scope.row.title }}
            </template>
          </template>
        </nel-table-column>
        <nel-table-column label="模板描述" prop="desc" width="200">
          <template #default="scope">
            <template v-if="editRowIndex == scope.index">
              <n-input v-model:value="editRowData.desc"></n-input>
            </template>
            <template v-else>
              {{ scope.row.desc }}
            </template>
          </template>
        </nel-table-column>
        <nel-table-column
          label="操作"
          prop="operation"
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <n-button
              size="small"
              quaternary
              type="primary"
              @click="handleDetail(scope.row)"
              >编辑</n-button
            >
            <n-button
              type="error"
              size="small"
              quaternary
              @click="handleDelete(scope.row)"
              >删除</n-button
            >
          </template>
        </nel-table-column>
      </nel-table>
      <Details ref="detailsRef" @change="getFormTemplateList" />
      <n-modal
        v-model:show="importModalVisible"
        title="导入表单模板"
        preset="card"
        style="width: 900px"
        @after-leave="resetImportModal"
      >
        <n-tabs type="segment" animated>
          <n-tab-pane name="base" tab="基础信息">
            <form-create
              v-model="importBase"
              v-model:api="importFApi"
              :rule="importBaseRule"
              :option="importBaseOption"
            />
          </n-tab-pane>
          <n-tab-pane name="json" tab="模板 JSON">
            <div class="json-upload-toolbar">
              <input
                ref="jsonFileInputRef"
                type="file"
                accept="application/json,.json"
                class="json-file-input"
                @change="handleJsonFileChange"
              />
              <n-space align="center">
                <n-button secondary type="primary" @click="selectJsonFile">
                  导入 JSON 文件
                </n-button>
                <n-text depth="3">
                  仅读取 JSON 中的 rule 和 option/options
                </n-text>
              </n-space>
            </div>
            <JsonEditorVue
              v-model="importJson"
              :mode="jsonEditorMode"
              style="height: 420px"
            />
          </n-tab-pane>
        </n-tabs>
        <template #footer>
          <n-space justify="end">
            <n-button @click="importModalVisible = false">取消</n-button>
            <n-button
              type="primary"
              :loading="importLoading"
              @click="submitImport"
            >
              导入
            </n-button>
          </n-space>
        </template>
      </n-modal>
    </template>
  </Page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import JsonEditorVue from 'json-editor-vue';
import { columns } from './columns';
import Details from './details.vue';
import {
  addFormTemplateApi,
  getFormTemplateListApi,
  deleteFormTemplateApi,
} from '@/api/system/form-template/index.ts';

const params = ref<GetFormTemplateListParams>({
  title: '',
  page: 1,
  pageSize: 10,
  code: '',
});
const total = ref(0);
const tableData = ref<FormTemplate[]>([]);
const getFormTemplateList = async function () {
  const res = await getFormTemplateListApi(params.value);
  tableData.value = res.data.rows;
  total.value = res.data.total;
};
getFormTemplateList();
const detailsRef = ref<InstanceType<typeof Details>>();
const handleDetail = (row: any) => {
  console.log(row);
  detailsRef.value?.open(row);
};
const loading = ref(false);
const importLoading = ref(false);
const importModalVisible = ref(false);
const importFApi = ref<any>();
const jsonFileInputRef = ref<HTMLInputElement>();
const jsonEditorMode = ref<any>('text');
const importBase = ref({
  title: '',
  code: '',
  desc: '',
});
const importJson = ref<Record<string, any> | string>({
  rule: [],
  option: {
    labelWidth: '120px',
  },
});

const importBaseOption = {
  submitBtn: false,
};

const importBaseRule = [
  {
    type: 'input',
    field: 'title',
    title: '模板名称',
    props: {
      placeholder: '请输入模板名称',
      clearable: true,
    },
    validate: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
  },
  {
    type: 'input',
    field: 'code',
    title: '模板编码',
    props: {
      placeholder: '请输入模板编码',
      clearable: true,
    },
    validate: [{ required: true, message: '请输入模板编码', trigger: 'blur' }],
  },
  {
    type: 'input',
    field: 'desc',
    title: '模板描述',
    props: {
      type: 'textarea',
      placeholder: '请输入模板描述',
      clearable: true,
    },
  },
];

const openImportModal = () => {
  importModalVisible.value = true;
};

const selectJsonFile = () => {
  jsonFileInputRef.value?.click();
};

const handleJsonFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  if (!file.name.endsWith('.json') && file.type !== 'application/json') {
    window.$message.warning('请选择 JSON 文件');
    return;
  }

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    const template = data.default || data;
    const option = template.option || template.options;
    if (!Array.isArray(template.rule)) {
      throw new Error('JSON 中 rule 必须是数组');
    }
    if (!option || typeof option !== 'object' || Array.isArray(option)) {
      throw new Error('JSON 中 option 必须是对象');
    }
    importJson.value = template;
    window.$message.success('JSON 文件读取成功');
  } catch (error: any) {
    window.$message.error(error?.message || 'JSON 文件解析失败');
  }
};

const resetImportModal = () => {
  importBase.value = {
    title: '',
    code: '',
    desc: '',
  };
  importJson.value = {
    rule: [],
    option: {
      labelWidth: '120px',
    },
  };
};

const parseImportJson = () => {
  const data =
    typeof importJson.value === 'string'
      ? JSON.parse(importJson.value)
      : importJson.value;
  const template = data.default || data;
  const rule = template.rule;
  const option = template.option || template.options;
  if (!Array.isArray(rule)) {
    throw new Error('JSON 中 rule 必须是数组');
  }
  if (!option || typeof option !== 'object' || Array.isArray(option)) {
    throw new Error('JSON 中 option 必须是对象');
  }
  return { rule, option };
};

const submitImport = async () => {
  try {
    importLoading.value = true;
    await importFApi.value?.validate();
    const { rule, option } = parseImportJson();
    await addFormTemplateApi({
      title: importBase.value.title.trim(),
      code: importBase.value.code.trim(),
      desc: importBase.value.desc || '',
      rule,
      option,
      status: true,
    });
    window.$message.success('导入模板成功');
    importModalVisible.value = false;
    await getFormTemplateList();
  } catch (error: any) {
    window.$message.error(error?.message || '导入模板失败');
  } finally {
    importLoading.value = false;
  }
};
const handleDelete = async (row: any) => {
  try {
    loading.value = true;
    await deleteFormTemplateApi(row.code);
    window.$message.success('删除模板成功');
    await getFormTemplateList();
  } finally {
    loading.value = false;
  }
};
const editRowIndex = ref<number>(-1);
const editRowData = ref({} as FormTemplate);
// const operation = (type: 'add', row?: any) => {
//   console.log(row);
//   switch (type) {
//     case 'add':
//       break;
//   }
// };
</script>
<style scoped lang="scss">
.toolbar {
  margin-bottom: 12px;
}

.json-upload-toolbar {
  margin-bottom: 12px;
}

.json-file-input {
  display: none;
}
</style>
