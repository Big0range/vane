<template>
  <div ref="rootRef" class="scroll-pane">
    <n-scrollbar ref="scrollbarRef" x-scrollable class="scroll-container">
      <div ref="contentRef" class="scroll-content">
        <slot />
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TagView } from '@/store/modules/tagsView/types';

const scrollbarRef = ref();
const rootRef = ref<HTMLDivElement | null>(null);
const contentRef = ref<HTMLDivElement | null>(null);

function getContainerEl() {
  return rootRef.value?.querySelector(
    '.n-scrollbar-container',
  ) as HTMLElement | null;
}

function getTargetEl(view: TagView) {
  return contentRef.value?.querySelector(
    `[data-path="${view.path}"]`,
  ) as HTMLElement | null;
}

function moveToTarget(view: TagView) {
  const containerEl = getContainerEl();
  const targetEl = getTargetEl(view);

  if (!containerEl || !targetEl) {
    return;
  }

  const containerWidth = containerEl.offsetWidth;
  const currentScrollLeft = containerEl.scrollLeft;
  const targetLeft = targetEl.offsetLeft;
  const targetRight = targetLeft + targetEl.offsetWidth;

  if (targetLeft < currentScrollLeft) {
    scrollbarRef.value?.scrollTo({
      left: Math.max(targetLeft - 18, 0),
      behavior: 'smooth',
    });
    return;
  }

  if (targetRight > currentScrollLeft + containerWidth) {
    scrollbarRef.value?.scrollTo({
      left: targetRight - containerWidth + 18,
      behavior: 'smooth',
    });
  }
}

defineExpose({
  moveToTarget,
});
</script>

<style lang="scss" scoped>
.scroll-pane {
  width: 100%;
}

.scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  display: inline-flex;
  align-items: flex-end;
  white-space: nowrap;
  min-width: 100%;
  height: 49px;
}
</style>
