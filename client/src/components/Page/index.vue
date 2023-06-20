<template>
  <div class="p-20 page">
    <div
      class="px-16 pt-16 mb-16 bg-white shadow-md top rounded-6"
      v-if="$slots.top"
    >
      <slot name="top" />
    </div>

    <div class="px-16 pt-16 pb-16 bg-white shadow-md main rounded-6">
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
