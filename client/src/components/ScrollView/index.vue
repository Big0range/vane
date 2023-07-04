<template>
  <div class="scroll-view scrollbar" :style="{ height: props.height }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { watch, nextTick } from 'vue';
const props = withDefaults(
  defineProps<{
    height: string;
    ScrollIntoView?: string;
  }>(),
  {
    height: '500px'
  }
);
watch(
  () => props.ScrollIntoView,
  val => {
    if (!val) return;
    console.log(val);
    nextTick(() => {
      const el = document.getElementById(val);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.scroll-view {
  overflow: auto;
}
</style>
