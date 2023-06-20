<template>
  <el-dropdown class="size-select" trigger="click">
    <span class="dropdown-badge">
      <el-badge :value="noticesNum" is-dot :max="99">
        <SvgIcon icon-class="notice" />
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs :stretch="true" v-model="activeKey" class="dropdown-tabs">
          <template v-for="item in notices" :key="item.key">
            <el-tab-pane
              :label="`${item.name}(${item.list.length})`"
              :name="`${item.key}`"
            >
              <el-scrollbar max-height="330px">
                <div class="noticeList-container">
                  <NoticeList :list="item.list" />
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Bell } from '@element-plus/icons-vue';
import NoticeList from './components/noticeList.vue';
import { noticesData } from './components/data';
import SvgIcon from '@/components/SvgIcon/index.vue';
const noticesNum = ref(100);
const notices = ref(noticesData);
const activeKey = ref(noticesData[0].key);
</script>
<style lang="scss" scoped>
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

  :deep() {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
    .el-tabs__nav-wrap {
      padding: 0 36px;
    }
  }
}
</style>
