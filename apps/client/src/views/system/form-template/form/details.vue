<template>
  <n-modal
    v-model:show="visible.show"
    :title="visible.title"
    preset="card"
    style="width: 90vw"
  >
    <n-tabs type="segment" animated v-model:value="activeTab">
      <n-tab-pane :name="0" :tab="tabs[0]">
        <form-create
          v-model="formBase"
          v-model:api="fApi"
          :rule="formBaseRule"
          :option="formBaseOptions"
          style="height: 70vh"
        />
      </n-tab-pane>
      <n-tab-pane :name="1" :tab="tabs[1]">
        <n-alert type="warning">
          修改此选项 将会废弃之前的表单并重新生成, 请谨慎操作
          <n-gradient-text type="info">
            <a href="https://www.form-create.com/v3/guide/" target="_blank"
              >参考链接(naive-ui)</a
            >
          </n-gradient-text>
        </n-alert>
        <JsonEditorVue
          :mode="jsonEditorMode"
          v-model="formRule"
          style="height: calc(70vh - 48px)"
          :translations="{
            Search: '搜索',
            Transform: '转换',
            'Repair JSON': '修复 JSON',
          }"
        />
      </n-tab-pane>
      <n-tab-pane :name="2" :tab="tabs[2]">
        <JsonEditorVue
          v-model="formOption"
          :mode="jsonEditorMode"
          style="height: 70vh"
        />
      </n-tab-pane>
    </n-tabs>
    <template #footer>
      <n-space justify="end">
        <n-button @click="close">关闭</n-button>
        <n-button type="primary" :loading="loading" @click="submit(false)"
          >保存{{ tabs[activeTab] }}</n-button
        >
        <n-button type="primary" :loading="loading" @click="submit(true)"
          >保存{{ tabs[activeTab] }}并关闭</n-button
        >
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import JsonEditorVue from 'json-editor-vue';
import formCreate, { type Api } from '@form-create/naive-ui';
import {
  getFormTemplateByCodeApi,
  updateFormTemplateBaseApi,
  updateFormTemplateOptionApi,
  updateFormTemplateRuleApi,
} from '@/api/system/form-template';

const tabs = ref(['基本信息', '表单规则', '表单配置']);
const activeTab = ref(0);
const loading = ref(false);
const emit = defineEmits(['change']);
const fApi = ref<Api>();
const submit = async (needClose: boolean = false) => {
  let data = {} as FormTemplate;
  try {
    loading.value = true;
    switch (activeTab.value) {
      case 0:
        await fApi.value!.validate();
        data.title = formBase.value.title.trim();
        data.desc = formBase.value.desc.trim();
        await updateFormTemplateBaseApi(code.value, data);
        break;
      case 1:
        if (typeof formRule.value === 'string') {
          data.rule = JSON.parse(formRule.value);
        } else {
          data.rule = formRule.value;
        }
        await updateFormTemplateRuleApi(code.value, {
          rule:
            data.rule instanceof String
              ? JSON.parse(data.rule as any)
              : data.rule,
        });
        break;
      case 2:
        if (typeof formOption.value === 'string') {
          data.option = JSON.parse(formOption.value);
        } else {
          data.option = formOption.value;
        }
        await updateFormTemplateOptionApi(code.value, {
          option:
            data.option instanceof String
              ? JSON.parse(data.option as any)
              : data.option,
        });
        break;
    }
    if (needClose) {
      close();
    }
    emit('change');
  } finally {
    loading.value = false;
  }
};
const visible = ref<Visible>({
  show: false,
  title: '查看明细',
});
const jsonEditorMode = ref<any>('text');
const code = ref('');
const open = (row: any) => {
  code.value = row.code;
  if (!code.value) {
    window.$message.error('模板编码不能为空');
    return;
  }
  getFormTemplateByCode();
  formBase.value = {
    title: '',
    code: '',
    desc: '',
  };
  formRule.value = [];
  formOption.value = {};
  visible.value.show = true;
  activeTab.value = 0;
};
const getFormTemplateByCode = async () => {
  const res = await getFormTemplateByCodeApi(code.value);
  if (!res.data) {
    window.$message.error('表单模板不存在');
    return;
  }
  formBase.value = {
    title: res.data.title,
    code: res.data.code,
    desc: res.data.desc,
  };
  formRule.value = res.data.rule;
  formOption.value = res.data.option;
};
const close = () => {
  visible.value.show = false;
};

const formBase = ref({
  title: '',
  code: '',
  desc: '',
});
const formRule = ref([]);
const formOption = ref({});

const formBaseRule = ref([
  {
    type: 'input',
    field: 'title',
    title: '模板名称',
    message: '请输入模板名称',
    validate: [{ required: true, message: '请输入模板名称', trigger: 'input' }],
  },
  {
    type: 'input',
    field: 'code',
    title: '模板编码',
    message: '请输入模板编码',
    validate: [{ required: true, message: '请输入模板编码', trigger: 'input' }],
    props: {
      disabled: true,
    },
  },
  {
    type: 'input',
    field: 'desc',
    title: '模板描述',
    message: '请输入模板描述',
  },
]);
const formBaseOptions = ref({
  // form: {
  //   disabled: true,
  // },
  onSubmit(values: any) {
    console.log(values);
  },
  submitBtn: false,
});
defineExpose({
  open,
  visible,
  close,
});
</script>
