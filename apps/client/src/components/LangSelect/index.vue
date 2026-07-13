<template>
  <n-dropdown
    trigger="hover"
    :options="langOptions"
    class="lang-select"
    @select="handleSetLanguage"
  >
    <div class="lang-select__icon">
      <svg-icon icon-class="language" />
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NDropdown } from 'naive-ui';
import SvgIcon from '@/components/SvgIcon/index.vue';

const langOptions = computed(() => [
  {
    label: '中文',
    key: 'zh-cn',
    disabled: true,
  },
  {
    label: 'English',
    key: 'en',
    disabled: false,
  },
]);

function handleSetLanguage(key: string) {
  console.log(key);
}
</script>

<style lang="scss" scoped>
.lang-select__icon {
  line-height: 50px;
}
</style>
