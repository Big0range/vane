<template>
  <Page>
    <template #default>
      <div class="comm-options-page">
        <ParentOptions v-model:selected-parent="selectedParent" />
        <ChildOptions :parent="selectedParent" />
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ParentOptions from './ParentOptions.vue';
import ChildOptions from './ChildOptions.vue';

const selectedParent = ref<FormCommOptions>();
</script>

<style scoped lang="scss">
.comm-options-page {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) minmax(420px, 1fr);
  gap: 16px;
}

@media (max-width: 1100px) {
  .comm-options-page {
    grid-template-columns: 1fr;
  }
}
</style>
