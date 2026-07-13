<template>
  <n-tabs animated style="margin: 20px">
    <n-tab-pane :name="0" display-directive="show" tab="表单管理">
      <FormTemplate />
    </n-tab-pane>
    <n-tab-pane :name="1" display-directive="show" tab="公共选项管理">
      <CommOptions />
    </n-tab-pane>
  </n-tabs>
</template>
<script setup lang="ts">
import FormTemplate from './form/index.vue';
import CommOptions from './commOptions/index.vue';
defineOptions({
  name: 'FormTemplate',
});
</script>
