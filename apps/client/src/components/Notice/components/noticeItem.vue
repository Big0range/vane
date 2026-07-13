<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ListItem } from './data';

const props = defineProps({
  noticeItem: {
    type: Object as PropType<ListItem>,
    default: () => ({}),
  },
});

// Element Plus 'danger' → Naive UI 'error'
// "default" | "info" | "warning" | "error" | "success" | "primary"
const tagType = computed(() => {
  const status = props.noticeItem?.status;
  if (status === 'danger') return 'error';
  return status || 'default';
});
</script>

<template>
  <div
    class="notice-container border-b border-solid border-[#f0f0f0] dark:border-[#303030]"
  >
    <n-avatar
      v-if="props.noticeItem.avatar"
      :size="30"
      :src="props.noticeItem.avatar"
      class="notice-container-avatar"
    />
    <div class="notice-container-text">
      <div class="notice-text-title">
        <n-ellipsis class="notice-title-content" :line-clamp="1">
          <n-text>{{ props.noticeItem.title }}</n-text>
        </n-ellipsis>
        <n-tag
          v-if="props.noticeItem?.extra"
          :type="tagType"
          size="small"
          class="notice-title-extra"
        >
          {{ props.noticeItem?.extra }}
        </n-tag>
      </div>

      <n-ellipsis :line-clamp="2" class="notice-text-description">
        {{ props.noticeItem.description }}
      </n-ellipsis>

      <div class="notice-text-datetime">
        <n-text>{{ props.noticeItem.datetime }}</n-text>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notice-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0;

  .notice-container-avatar {
    margin-right: 16px;
    background: var(--app-main-bg-color);
  }

  .notice-container-text {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .notice-text-title {
      display: flex;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5715;
      cursor: pointer;

      .notice-title-content {
        flex: 1;
        width: 200px;
      }

      .notice-title-extra {
        float: right;
        margin-top: -1.5px;
        font-weight: 400;
        margin-left: 12px;
      }
    }

    .notice-text-description,
    .notice-text-datetime {
      font-size: 12px;
      line-height: 1.5715;
    }

    .notice-text-datetime {
      margin-top: 4px;
    }
  }
}
</style>
