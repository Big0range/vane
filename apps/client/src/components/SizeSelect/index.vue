<template>
  <n-dropdown trigger="hover" :options="sizeOptions" @select="handleSetSize">
    <div class="size-select__icon">
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import useStore from '@/store';
import SvgIcon from '@/components/SvgIcon/index.vue';

const { app } = useStore();
const size = computed(() => app.size);

const sizeOptions = ref([
  {
    label: '默认',
    key: 'default',
    disabled: (size.value || 'default') === 'default',
  },
  { label: '大型', key: 'large', disabled: size.value === 'large' },
  { label: '小型', key: 'small', disabled: size.value === 'small' },
]);

function handleSetSize(size: string | number) {
  app.setSize(String(size));
  window.$message.success('切换布局大小成功');
}
</script>

<style lang="scss" scoped>
.size-select__icon {
  line-height: 50px;
}
</style>
