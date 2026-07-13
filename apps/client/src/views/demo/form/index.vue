<template>
  <Page>
    <template #default>
      <div class="demo-form-page">
        <div class="toolbar">
          <n-space align="center">
            <n-input
              v-model:value="formCode"
              clearable
              placeholder="请输入表单 code"
              style="width: 220px"
              @keyup.enter="loadForm"
            />
            <n-button type="primary" :loading="loading" @click="loadForm"
              >加载表单</n-button
            >
            <n-tag v-if="formInfo" type="info">
              {{ formInfo.title }} / {{ formInfo.code }}
            </n-tag>
            <n-tag v-if="commOptionsInfo" type="success">
              公共选项：{{ commOptionsInfo.name }} / {{ commOptionsInfo.code }}
            </n-tag>
          </n-space>
        </div>

        <n-spin :show="loading">
          <n-empty
            v-if="!rule.length"
            description="暂无表单配置"
            class="empty-state"
          />
          <form-create
            v-else
            v-model="formData"
            v-model:api="fApi"
            :rule="rule"
            :option="option"
          />
        </n-spin>

        <div v-if="rule.length" class="footer-actions">
          <n-space justify="end">
            <n-button @click="resetForm">重置</n-button>
            <n-button type="primary" @click="submitForm">提交</n-button>
          </n-space>
        </div>
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Api } from '@form-create/naive-ui';
import {
  getFormTemplateByCodeApi,
  submitFormDataApi,
} from '@/api/system/form-template';
import { fetchMenuTreeApi } from '@/api/system/menu';
import { packFormData } from '@/utils/formatFormData';
defineOptions({
  name: 'FormTest',
});

type FormRule = Record<string, any>;

const route = useRoute();
const loading = ref(false);
const formCode = ref(String(route.query.code || 'demo'));
const formData = ref<Record<string, any>>({});
const rule = ref<FormRule[]>([]);
const option = ref<Record<string, any>>({
  submitBtn: false,
});
const formInfo = ref<FormTemplate>();
const commOptionsInfo = ref<FormCommOptions>();
const fApi = ref<Api>();

const loadForm = async () => {
  if (!formCode.value) {
    window.$message.warning('请输入表单 code');
    return;
  }

  try {
    loading.value = true;
    const [formRes, menuRes] = await Promise.all([
      getFormTemplateByCodeApi(formCode.value),
      fetchMenuTreeApi(),
    ]);

    formInfo.value = formRes.data || ({} as any);
    nextTick(() => {
      fApi.value?.setData('menuOptions', menuRes.data);
    });

    rule.value = formRes.data?.rule || [];
    option.value = {
      ...(formRes.data?.option || {}),
      submitBtn: false,
    };
    formData.value = {};
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  fApi.value?.resetFields();
};

const submitForm = async () => {
  try {
    await fApi.value?.validate();
    if (!formInfo.value?.code) {
      window.$message.warning('请先加载表单');
      return;
    }
    console.log({
      form_code: formInfo.value.code,
      version: formInfo.value.version,
      data: packFormData({
        formData: formData.value,
        fApi: fApi.value!,
        rule: rule.value,
      }),
    });
    await submitFormDataApi({
      form_code: formInfo.value.code,
      version: formInfo.value.version,
      data: packFormData({
        formData: formData.value,
        fApi: fApi.value!,
        rule: rule.value,
      }),
    });
    window.$message.success('提交成功');
  } catch (error) {
    console.log(error);
  }
};

loadForm();
</script>

<style scoped lang="scss">
.demo-form-page {
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
  border: 1px solid var(--n-border-color);
}

.footer-actions {
  margin-top: 16px;
}
</style>
