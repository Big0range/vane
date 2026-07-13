<template>
  <div class="notice-trigger-wrapper">
    <n-popover trigger="click" placement="bottom" :show-arrow="false" raw>
      <template #trigger>
        <span class="dropdown-badge">
          <n-badge :value="noticesNum" :max="99">
            <SvgIcon icon-class="notice" />
          </n-badge>
        </span>
      </template>
      <n-tabs
        v-model:value="activeKey"
        type="line"
        animated
        justify-content="space-evenly"
        class="dropdown-tabs"
        style="background-color: var(--app-main-bg-color)"
      >
        <template v-for="item in notices" :key="item.key">
          <n-tab-pane
            :name="item.key"
            :tab="`${item.name}(${item.list.length})`"
          >
            <n-scrollbar style="max-height: 330px">
              <div class="noticeList-container">
                <NoticeList :list="item.list" />
              </div>
            </n-scrollbar>
          </n-tab-pane>
        </template>
      </n-tabs>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NoticeList from './components/noticeList.vue';
import { noticesData } from './components/data';
import SvgIcon from '@/components/SvgIcon/index.vue';

const noticesNum = ref(99999);
const notices = ref(noticesData);
const activeKey = ref(noticesData[0].key);
</script>

<style lang="scss" scoped>
.notice-trigger-wrapper {
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 8px;
  cursor: pointer;
}

.dropdown-tabs {
  width: 330px;

  .noticeList-container {
    padding: 15px 24px 0;
  }
}
</style>
