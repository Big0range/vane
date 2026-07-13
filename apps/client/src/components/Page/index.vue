<template>
  <div class="p-20 page">
    <div
      class="px-16 pt-16 mb-16 shadow-md top rounded-6"
      style="background: var(--app-bg-color); color: var(--app-text-color)"
      v-if="$slots.top"
    >
      <slot name="top" />
    </div>

    <div
      class="px-16 pt-16 pb-16 shadow-md main rounded-6"
      style="background: var(--app-bg-color); color: var(--app-text-color)"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.top,
.main {
  /* border: 1px solid #e4e7ed; // #f4f4f5 */
}
</style>
