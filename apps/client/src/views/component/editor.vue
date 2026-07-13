<script setup lang="ts">
import Editor from '@/components/WangEditor/index.vue';
import type { FormInst } from 'naive-ui';
import { reactive, ref, toRefs } from 'vue';

const dataFormRef = ref<FormInst | null>(null);

const state = reactive({
  formData: {
    content: '初始内容',
  },
});

const { formData } = toRefs(state);
</script>
<template>
  <div class="app-container">
    <n-form ref="dataFormRef" :model="formData">
      <editor v-model:value="formData.content" style="height: 600px" />
    </n-form>
  </div>
</template>
