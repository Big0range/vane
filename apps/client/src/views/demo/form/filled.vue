<template>
  <Page>
    <template #default>
      <div class="filled-page">
        <div class="toolbar">
          <n-space align="center">
            <n-input
              v-model:value="params.form_code"
              clearable
              placeholder="请输入表单 code"
              style="width: 220px"
              @keyup.enter="reload"
            />
            <n-button type="primary" :loading="loading" @click="reload">
              查询
            </n-button>
          </n-space>
        </div>

        <nel-table
          v-model:page="params.page"
          v-model:pageSize="params.pageSize"
          :data="tableData"
          :loading="loading"
          :naive-columns="columns"
          :page-sizes="pageSizes"
          :row-key="(row: FormDataJson) => row.id"
          :single-line="false"
          :total="total"
          min-height="calc(100vh - 300px)"
          remote
          @change="getList"
        >
          <nel-table-column
            prop="action"
            label="操作"
            width="120"
            fixed="right"
          >
            <template #default="{ row }">
              <n-button
                size="small"
                secondary
                type="primary"
                @click="openDetail(row)"
              >
                详情
              </n-button>
            </template>
          </nel-table-column>
        </nel-table>

        <n-drawer v-model:show="detailVisible" width="760px">
          <n-drawer-content
            :native-scrollbar="false"
            :title="drawerTitle"
            closable
          >
            <n-spin :show="detailLoading">
              <n-empty
                v-if="!detailRule.length"
                description="暂无表单数据"
                class="empty-state"
              />
              <form-create
                v-else
                v-model="formData"
                v-model:api="fApi"
                :rule="detailRule"
                :option="detailOption"
              />
            </n-spin>
          </n-drawer-content>
        </n-drawer>
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Api, Options } from '@form-create/naive-ui';
import type { DataTableColumns } from 'naive-ui';
import dayjs from 'dayjs';
import {
  getFormTemplateByCodeApi,
  getMySubmitFormDataDetailApi,
  getMySubmitFormDataListApi,
} from '@/api/system/form-template';
import { fetchMenuTreeApi } from '@/api/system/menu';
import { unpackFormData } from '@/utils/formatFormData';
import { pageSize, pageSizes } from '@/utils/config';

defineOptions({
  name: 'FormFilled',
});

type FormRule = Record<string, any>;

const route = useRoute();
const loading = ref(false);
const detailLoading = ref(false);
const detailVisible = ref(false);
const tableData = ref<FormDataJson[]>([]);
const total = ref(0);
const selectedRecord = ref<FormDataJson | null>(null);
const formInfo = ref<FormTemplate>();
const formData = ref<Record<string, any>>({});
const detailRule = ref<FormRule[]>([]);
const detailOption = ref<Options>({
  submitBtn: false,
  form: {
    disabled: true,
  },
});
const fApi = ref<Api>();

const params = reactive<GetMySubmitFormDataListParams>({
  page: 1,
  pageSize: pageSize,
  form_code: String(route.query.code || ''),
});

const columns: DataTableColumns<FormDataJson> = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '表单编码', key: 'form_code', minWidth: 160 },
  { title: '版本', key: 'version', width: 90 },
  {
    title: '提交时间',
    key: 'create_time',
    minWidth: 180,
    render: row => dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss'),
  },
  { title: '操作', key: 'action', width: 120 },
];

const drawerTitle = computed(() => {
  if (!selectedRecord.value) return '填写详情';
  return `${formInfo.value?.title || selectedRecord.value.form_code} / v${selectedRecord.value.version}`;
});

const setReadonly = (items: FormRule[]): FormRule[] => {
  return items.map(item => ({
    ...item,
    props: {
      ...(item.props || {}),
      disabled: true,
    },
    children: Array.isArray(item.children)
      ? setReadonly(item.children)
      : item.children,
  }));
};

const reload = () => {
  params.page = 1;
  getList();
};

const getList = async () => {
  try {
    loading.value = true;
    const res = await getMySubmitFormDataListApi(params);
    tableData.value = res.data.rows;
    total.value = res.data.total;
  } finally {
    loading.value = false;
  }
};

const openDetail = async (row: FormDataJson) => {
  try {
    detailVisible.value = true;
    detailLoading.value = true;
    selectedRecord.value = row;
    formInfo.value = undefined;
    formData.value = {};
    detailRule.value = [];

    const detailRes = await getMySubmitFormDataDetailApi(row.id);
    if (!detailRes.data) {
      window.$message.warning('未查询到填写记录');
      return;
    }

    selectedRecord.value = detailRes.data;
    const [formRes, menuRes] = await Promise.all([
      getFormTemplateByCodeApi(
        detailRes.data.form_code,
        detailRes.data.version,
      ),
      fetchMenuTreeApi(),
    ]);

    if (!formRes.data) {
      window.$message.warning('未查询到表单');
      return;
    }

    const unpackedData = unpackFormData(detailRes.data.data || {});

    formInfo.value = formRes.data;
    formData.value = unpackedData;
    detailRule.value = setReadonly(formRes.data.rule || []);
    detailOption.value = {
      ...(formRes.data.option || {}),
      submitBtn: false,
      form: {
        ...(formRes.data.option?.form || {}),
        disabled: true,
      },
    };

    nextTick(() => {
      fApi.value?.setData('menuOptions', menuRes.data);
      fApi.value?.setValue(unpackedData);
    });
  } finally {
    detailLoading.value = false;
  }
};

getList();
</script>

<style scoped lang="scss">
.filled-page {
  padding: 16px;
}

.toolbar {
  margin-bottom: 16px;
}

.empty-state {
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
