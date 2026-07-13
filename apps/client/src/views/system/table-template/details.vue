<template>
  <n-modal
    v-model:show="visible.show"
    :title="visible.title"
    preset="card"
    style="width: 90vw"
  >
    <n-button type="primary" class="mb-20!" @click="handleAddRow">
      新增列
    </n-button>
    <nel-table
      v-loading="loading"
      :data="data"
      min-height="50vh"
      max-height="50vh"
    >
      <nel-table-column label="ID" prop="id" width="100" fixed="left" />
      <nel-table-column label="列标题" prop="title" width="150" fixed="left">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-input
              v-model:value="editRowData.title"
              @keydown.enter="handleRowSave(scope.row, scope.index)"
            ></n-input>
          </template>
          <template v-else>
            {{ scope.row.title }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="列键" prop="key" width="100">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-input
              v-model:value="editRowData.key"
              @keydown.enter="handleRowSave(scope.row, scope.index)"
            ></n-input>
          </template>
          <template v-else>
            {{ scope.row.key }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="列宽度" prop="width" width="120">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-input-number
              min="50"
              v-model:value="editRowData.width"
              @keydown.enter="handleRowSave(scope.row, scope.index)"
            ></n-input-number>
          </template>
          <template v-else>
            {{ scope.row.width }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="列冻结" prop="fixed" width="130">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-select
              v-model:value="editRowData.fixed"
              :options="fixedOptions"
            ></n-select>
          </template>
          <template v-else>
            {{
              scope.row.fixed
                ? fixedOptions.find(item => item.value === scope.row.fixed)
                    ?.label
                : '不冻结'
            }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="对齐方式" prop="align" width="130">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-select
              v-model:value="editRowData.align"
              :options="alignOptions"
            ></n-select>
          </template>
          <template v-else>
            {{
              alignOptions.find(item => item.value === scope.row.align)
                ?.label || '左对齐'
            }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="排序" prop="sort" width="100">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-input-number
              min="0"
              v-model:value="editRowData.sort"
            ></n-input-number>
          </template>
          <template v-else>
            {{ scope.row.sort }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="是否显示" prop="visible" width="100">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-switch v-model:value="editRowData.visible" />
          </template>
          <template v-else>
            <n-tag type="success" v-if="scope.row.visible">显示</n-tag>
            <n-tag type="error" v-else>隐藏</n-tag>
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="是否超出省略" prop="ellipsis" width="130">
        <template #default="scope">
          <template v-if="scope.index === editRowIndex">
            <n-select
              v-model:value="editRowData.ellipsis"
              :options="[
                { value: 0, label: '否' },
                { value: 1, label: '是' },
              ]"
            ></n-select>
          </template>
          <template v-else>
            {{ scope.row.ellipsis === 0 ? '否' : '是' }}
          </template>
        </template>
      </nel-table-column>
      <nel-table-column label="操作" prop="operation" width="110" fixed="right">
        <template #default="scope">
          <n-button
            v-if="editRowIndex !== scope.index"
            size="small"
            quaternary
            type="primary"
            @click="handleRowEdit(scope.row, scope.index)"
            >编辑</n-button
          >
          <template v-else>
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
              @click="cancelRowSave"
              >取消</n-button
            >
          </template>
        </template>
      </nel-table-column>
    </nel-table>
  </n-modal>
</template>

<script lang="ts" setup>
import {
  addTableTemplateRowApi,
  updateTableTemplateRowApi,
} from '@/api/system/table-template';
import { getTableTemplate } from '@/utils/getTemplate';
import { ref } from 'vue';

const visible = ref<Visible>({
  show: false,
  title: '查看明细',
});
const alignOptions = [
  { value: 'left', label: '左对齐' },
  { value: 'right', label: '右对齐' },
  { value: 'center', label: '居中对齐' },
];
const fixedOptions = [
  { value: 'left', label: '左冻结' },
  { value: 'right', label: '右冻结' },
  { value: '', label: '不冻结' },
];
const editRowIndex = ref<number>(-1);
const editRowData = ref({} as UpdateTableTemplateRowApiData);
const handleRowEdit = (row: any, index: number) => {
  editRowIndex.value = index;
  editRowData.value = { ...row };
  console.log(row, index);
};
const handleAddRow = () => {
  const newRow = {
    title: '',
    key: '',
    width: undefined,
    fixed: undefined,
    align: 'center',
    ellipsis: 0,
    sort: Math.max(...data.value.map(item => item.sort || 0), 0) + 1,
    visible: true,
    table_template_code: code.value,
    index: data.value.length + 1,
  } as GetTableTemplateRowByCodeResult['data']['rows'][0] & { index: number };
  console.log(newRow);
  data.value.push(newRow);
  editRowIndex.value = data.value.length - 1;
  editRowData.value = { ...newRow };
};
const handleRowSave = async (row: any, index: number) => {
  try {
    loading.value = true;
    if (row.id) {
      await updateTableTemplateRowApi(editRowData.value);
      window.$message.success('修改模板明细成功');
    } else {
      await addTableTemplateRowApi(editRowData.value);
      window.$message.success('新增模板明细成功');
    }
    editRowIndex.value = -1;
    editRowData.value = {} as UpdateTableTemplateRowApiData;
    await getTableTemplateByCode(row.table_template_code);
    console.log(row, index);
  } finally {
    loading.value = false;
  }
};
const cancelRowSave = () => {
  if (!editRowData.value.id) {
    data.value.splice(editRowIndex.value, 1);
  }
  editRowIndex.value = -1;
};
const loading = ref(false);
const code = ref('');
const open = (row: any, title: string) => {
  code.value = row.code;
  if (!code.value) {
    window.$message.error('模板编码不能为空');
    return;
  }
  visible.value.title = title;
  visible.value.show = true;
  getTableTemplateByCode(code.value);
};
const getTableTemplateByCode = async function (code: string) {
  try {
    loading.value = true;
    data.value = (await getTableTemplate(code, null)).map((item, index) => ({
      ...item,
      ellipsis: item.ellipsis ? 1 : 0,
      index: index + 1,
    }));
  } catch (_error) {
    window.$message.error('查询模板明细失败');
  } finally {
    loading.value = false;
  }
};
const close = () => {
  visible.value.show = false;
};
const data = ref<GetTableTemplateRowByCodeResult['data']['rows']>([] as any);
defineExpose({
  open,
  visible,
  close,
});
</script>
