<template>
  <Page>
    <template #top>
      <n-form :model="searchForm" :inline="true" label-placement="left">
        <n-form-item label="问卷名称" path="title">
          <n-input
            v-model:value="searchForm.title"
            clearable
            placeholder="请输入问卷名称"
            style="width: 220px"
            @keyup.enter="reload"
          />
        </n-form-item>
        <n-form-item label="用户" path="username">
          <n-input
            v-model:value="searchForm.username"
            clearable
            placeholder="请输入用户名"
            style="width: 220px"
            @keyup.enter="reload"
          />
        </n-form-item>
        <n-button type="primary" :loading="loading" @click="reload">
          查询
        </n-button>
        <n-button style="margin-left: 10px" @click="resetQuery">重置</n-button>
      </n-form>
    </template>

    <template #default>
      <div class="tongji-page">
        <nel-table
          v-model:page="params.page"
          v-model:pageSize="params.pageSize"
          :data="tableData"
          :loading="loading"
          :naive-columns="columns"
          :page-sizes="pageSizes"
          :row-key="(row: FormStatRow) => `${row.form_code}-${row.version}`"
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
                @click="openStats(row)"
              >
                查看统计
              </n-button>
            </template>
          </nel-table-column>
        </nel-table>

        <n-drawer v-model:show="statsVisible" width="960px">
          <n-drawer-content
            :native-scrollbar="false"
            :title="statsDrawerTitle"
            closable
          >
            <n-spin :show="statsLoading">
              <n-empty
                v-if="!questionStats"
                class="empty-state"
                description="暂无统计数据"
              />
              <div v-else class="stats-content">
                <n-grid :cols="4" :x-gap="12" :y-gap="12" responsive="screen">
                  <n-gi>
                    <n-card size="small">
                      <n-statistic
                        label="提交数"
                        :value="questionStats.summary.total_submissions"
                      />
                    </n-card>
                  </n-gi>
                  <n-gi>
                    <n-card size="small">
                      <n-statistic
                        label="参与用户"
                        :value="questionStats.summary.user_count"
                      />
                    </n-card>
                  </n-gi>
                  <n-gi>
                    <n-card size="small">
                      <n-statistic
                        label="版本"
                        :value="questionStats.summary.version"
                      />
                    </n-card>
                  </n-gi>
                  <n-gi>
                    <n-card size="small">
                      <n-statistic label="最近提交">
                        <template #default>
                          {{
                            formatTime(questionStats.summary.latest_submit_time)
                          }}
                        </template>
                      </n-statistic>
                    </n-card>
                  </n-gi>
                </n-grid>

                <n-tabs
                  v-model:value="activeTab"
                  type="line"
                  animated
                  class="stats-tabs"
                  @update:value="handleTabChange"
                >
                  <n-tab-pane name="questions" tab="问题统计">
                    <n-empty
                      v-if="!questionStats.questions.length"
                      class="empty-state"
                      description="暂无题目数据"
                    />
                    <n-space v-else vertical :size="12">
                      <n-card
                        v-for="question in questionStats.questions"
                        :key="question.item_id"
                        size="small"
                      >
                        <template #header>
                          <n-space align="center">
                            <span>{{ question.title }}</span>
                            <n-tag size="small" type="info">
                              {{ question.type || '未知类型' }}
                            </n-tag>
                          </n-space>
                        </template>
                        <n-space vertical :size="8">
                          <n-space>
                            <span>已答：{{ question.answered_count }}</span>
                            <span>未答：{{ question.empty_count }}</span>
                            <span
                              >总提交：{{ question.total_submissions }}</span
                            >
                          </n-space>
                          <n-empty
                            v-if="!question.options.length"
                            description="暂无答案明细"
                          />
                          <div v-else class="option-list">
                            <div
                              v-for="option in question.options"
                              :key="`${question.item_id}-${option.value}-${option.label}`"
                              class="option-row"
                            >
                              <div class="option-label">
                                {{ option.label || option.value || '空值' }}
                              </div>
                              <n-progress
                                type="line"
                                :percentage="option.percent"
                                :indicator-placement="'inside'"
                                processing
                              />
                              <div class="option-count">
                                {{ option.count }} 次
                              </div>
                            </div>
                          </div>
                        </n-space>
                      </n-card>
                    </n-space>
                  </n-tab-pane>
                  <n-tab-pane name="submissions" tab="提交明细">
                    <nel-table
                      v-model:page="submissionParams.page"
                      v-model:pageSize="submissionParams.pageSize"
                      :data="submissionData"
                      :loading="submissionsLoading"
                      :naive-columns="submissionColumns"
                      :page-sizes="pageSizes"
                      :row-key="(row: FormStatSubmissionRow) => row.id"
                      :single-line="false"
                      :total="submissionTotal"
                      min-height="420px"
                      remote
                      @change="getSubmissions"
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
                            查看填写
                          </n-button>
                        </template>
                      </nel-table-column>
                    </nel-table>
                  </n-tab-pane>
                </n-tabs>
              </div>
            </n-spin>
          </n-drawer-content>
        </n-drawer>

        <n-drawer v-model:show="detailVisible" width="760px">
          <n-drawer-content
            :native-scrollbar="false"
            :title="detailDrawerTitle"
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
import type { Api, Options } from '@form-create/naive-ui';
import type { DataTableColumns } from 'naive-ui';
import dayjs from 'dayjs';
import {
  getFormQuestionStatsApi,
  getFormStatListApi,
  getFormStatSubmissionDetailApi,
  getFormStatSubmissionsApi,
  getFormTemplateByCodeApi,
} from '@/api/system/form-template';
import { fetchMenuTreeApi } from '@/api/system/menu';
import { unpackFormData } from '@/utils/formatFormData';
import { pageSize, pageSizes } from '@/utils/config';

defineOptions({
  name: 'FormTongji',
});

type FormRule = Record<string, any>;
type StatsTab = 'questions' | 'submissions';

const loading = ref(false);
const tableData = ref<FormStatRow[]>([]);
const total = ref(0);
const statsVisible = ref(false);
const statsLoading = ref(false);
const submissionsLoading = ref(false);
const detailLoading = ref(false);
const detailVisible = ref(false);
const activeTab = ref<StatsTab>('questions');
const currentRow = ref<FormStatRow | null>(null);
const questionStats = ref<FormQuestionStatsResultData>();
const submissionData = ref<FormStatSubmissionRow[]>([]);
const submissionTotal = ref(0);
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

const searchForm = reactive({
  title: '',
  username: '',
});

const params = reactive<GetFormStatListParams>({
  page: 1,
  pageSize: pageSize,
  title: '',
  username: '',
});

const submissionParams = reactive<GetFormStatSubmissionsParams>({
  page: 1,
  pageSize: pageSize,
  form_code: '',
  version: 1,
  username: '',
});

const columns: DataTableColumns<FormStatRow> = [
  { title: '问卷名称', key: 'title', minWidth: 180 },
  { title: '问卷编码', key: 'form_code', minWidth: 160 },
  { title: '版本', key: 'version', width: 90 },
  { title: '提交数', key: 'submit_count', width: 100 },
  { title: '参与用户', key: 'user_count', width: 110 },
  {
    title: '最近提交时间',
    key: 'latest_submit_time',
    minWidth: 180,
    render: row => formatTime(row.latest_submit_time),
  },
  { title: '操作', key: 'action', width: 120 },
];

const submissionColumns: DataTableColumns<FormStatSubmissionRow> = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '用户', key: 'username', minWidth: 140 },
  { title: '用户ID', key: 'user_id', width: 100 },
  {
    title: '提交时间',
    key: 'create_time',
    minWidth: 180,
    render: row => formatTime(row.create_time),
  },
  { title: '操作', key: 'action', width: 120 },
];

const statsDrawerTitle = computed(() => {
  if (!currentRow.value) return '问卷统计';
  return `${currentRow.value.title || currentRow.value.form_code} / v${currentRow.value.version}`;
});

const detailDrawerTitle = computed(() => {
  if (!selectedRecord.value) return '填写详情';
  return `${formInfo.value?.title || selectedRecord.value.form_code} / v${selectedRecord.value.version}`;
});

const formatTime = (value?: string | Date | null) => {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-';
};

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
  params.title = searchForm.title;
  params.username = searchForm.username;
  getList();
};

const resetQuery = () => {
  searchForm.title = '';
  searchForm.username = '';
  reload();
};

const getList = async () => {
  try {
    loading.value = true;
    const res = await getFormStatListApi(params);
    tableData.value = res.data.rows;
    total.value = res.data.total;
  } finally {
    loading.value = false;
  }
};

const openStats = async (row: FormStatRow) => {
  currentRow.value = row;
  statsVisible.value = true;
  activeTab.value = 'questions';
  questionStats.value = undefined;
  submissionData.value = [];
  submissionTotal.value = 0;
  submissionParams.page = 1;
  submissionParams.form_code = row.form_code;
  submissionParams.version = row.version;
  submissionParams.username = params.username;
  await getQuestionStats();
};

const getQuestionStats = async () => {
  if (!currentRow.value) return;
  try {
    statsLoading.value = true;
    const res = await getFormQuestionStatsApi({
      form_code: currentRow.value.form_code,
      version: currentRow.value.version,
      username: params.username,
    });
    questionStats.value = res.data;
  } finally {
    statsLoading.value = false;
  }
};

const handleTabChange = (value: string) => {
  if (value === 'submissions' && !submissionData.value.length) {
    getSubmissions();
  }
};

const getSubmissions = async () => {
  if (!submissionParams.form_code) return;
  try {
    submissionsLoading.value = true;
    const res = await getFormStatSubmissionsApi(submissionParams);
    submissionData.value = res.data.rows;
    submissionTotal.value = res.data.total;
  } finally {
    submissionsLoading.value = false;
  }
};

const openDetail = async (row: FormStatSubmissionRow) => {
  try {
    detailVisible.value = true;
    detailLoading.value = true;
    selectedRecord.value = null;
    formInfo.value = undefined;
    formData.value = {};
    detailRule.value = [];

    const detailRes = await getFormStatSubmissionDetailApi(row.id);
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
.tongji-page {
  padding: 16px;
}

.stats-content {
  min-height: 520px;
}

.stats-tabs {
  margin-top: 16px;
}

.option-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-row {
  display: grid;
  grid-template-columns: 180px minmax(180px, 1fr) 80px;
  gap: 12px;
  align-items: center;
}

.option-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option-count {
  color: var(--text-color-2);
  text-align: right;
}

.empty-state {
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
