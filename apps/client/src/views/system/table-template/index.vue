<template>
  <Page>
    <template #default>
      <n-space class="mb-10">
        <n-button type="primary" @click="operation('add')"> 新建模板 </n-button>
      </n-space>
      <nel-table
        :loading="loading"
        :data="tableData"
        :naive-columns="columns"
        min-height="calc(100vh - 230px)"
        :single-line="false"
      >
        <nel-table-column label="模板名称" prop="name" width="150">
          <template #default="scope">
            <template v-if="editRowIndex == scope.index">
              <n-input v-model:value="editRowData.name"></n-input>
            </template>
            <template v-else>
              {{ scope.row.name }}
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
          align="left"
          fixed="right"
        >
          <template #default="scope">
            <template v-if="editRowIndex == scope.index">
              <n-button
                size="small"
                quaternary
                type="primary"
                @click="handleRowSave(scope.row, scope.index)"
                >保存</n-button
              >
              <n-button
                size="small"
                quaternary
                type="primary"
                @click="editRowIndex = -1"
                >取消</n-button
              >
            </template>
            <template v-else>
              <n-button
                size="small"
                quaternary
                type="primary"
                @click="handleDetail(scope.row)"
                >查看明细</n-button
              >
              <n-button
                type="primary"
                size="small"
                quaternary
                @click="handleEdit(scope.row, scope.index)"
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
          </template>
        </nel-table-column>
      </nel-table>
      <Details ref="detailsRef" />
      <Add ref="addRef" @change="getTableTemplateList" />
    </template>
  </Page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { columns } from './columns';
import Details from './details.vue';
import Add from './component/add.vue';
import {
  getTableTemplateListApi,
  updateTableTemplateApi,
  deleteTableTemplateApi,
} from '@/api/system/table-template/index.ts';

const params = ref<GetTableTemplateListParams>({
  name: '',
  page: 1,
  pageSize: 10,
  code: '',
});
const tableData = ref<GetTableTemplateListResult['data']['rows']>([]);
const getTableTemplateList = async function () {
  const res = await getTableTemplateListApi(params.value);
  tableData.value = res.data.rows;
};
getTableTemplateList();
const detailsRef = ref<InstanceType<typeof Details>>();
const handleDetail = (row: any) => {
  console.log(row);
  detailsRef.value?.open(row, '查看明细');
};
const handleEdit = (row: any, index: number) => {
  editRowIndex.value = index;
  editRowData.value = row;
  console.log(row);
};
const loading = ref(false);
const handleRowSave = async (row: any, index: number) => {
  try {
    loading.value = true;
    await updateTableTemplateApi(editRowData.value);
    editRowIndex.value = -1;
    editRowData.value = {} as TableTemplate;
    window.$message.success('保存模板成功');
    await getTableTemplateList();
    console.log(row, index);
  } catch (error) {
    console.log(error);
    window.$message.error('保存模板失败');
  } finally {
    loading.value = false;
  }
};
const handleDelete = async (row: any) => {
  try {
    loading.value = true;
    await deleteTableTemplateApi(row.id);
    window.$message.success('删除模板成功');
    await getTableTemplateList();
  } finally {
    loading.value = false;
  }
};
const editRowIndex = ref<number>(-1);
const editRowData = ref({} as TableTemplate);
const addRef = ref<InstanceType<typeof Add>>();
const operation = (type: 'add', row?: any) => {
  console.log(row);
  switch (type) {
    case 'add':
      addRef.value?.show();
      break;
  }
};
</script>
