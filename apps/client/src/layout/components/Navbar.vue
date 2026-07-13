<template>
  <div class="border-b navbar">
    <!-- <div id="hamburger-container">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </div> -->

    <div class="flex left-menu">
      <div id="hamburger-container">
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </div>
      <div>
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      </div>
    </div>

    <div class="right-menu">
      <span v-show="device !== 'mobile'">
        <ScreenLock
          id="screen-lock"
          class="cursor-pointer right-menu-item hover-effect text-20"
          style="font-size: 22px"
        ></ScreenLock>
        <Notice
          id="header-notice"
          class="right-menu-item hover-effect"
          style="font-size: 22px"
        />
        <screenfull
          id="screenfull"
          class="cursor-pointer right-menu-item hover-effect"
        />
        <!-- <size-select id="size-select" class="right-menu-item hover-effect" /> -->
      </span>
      <n-dropdown
        trigger="hover"
        :options="dropdownOptions"
        @select="handleDropdownSelect"
      >
        <div class="avatar-container right-menu-item hover-effect">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar" />
            <n-icon size="14" class="ml-5"><CaretDown /></n-icon>
          </div>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDialog } from 'naive-ui';
import useStore from '@/store';
// 组件依赖
import Breadcrumb from '@/components/breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import Notice from '@/components/Notice/index.vue';
import ScreenLock from '@/components/ScreenLock/index.vue';

// 图标依赖
import { CaretDown } from '@vicons/ionicons5';

const { app, user, tagsView } = useStore();

const route = useRoute();
const router = useRouter();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const avatar = computed(() => user.avatar);

function toggleSideBar() {
  app.toggleSidebar();
}
const dialog = useDialog();
const dropdownOptions = [
  { label: '首页', key: 'home' },
  { label: '注销', key: 'logout' },
];

function handleDropdownSelect(key: string) {
  if (key === 'home') {
    router.push('/');
    return;
  }
  if (key === 'logout') {
    logout();
  }
}
function logout() {
  dialog.warning({
    title: '确定注销并退出系统吗？',
    positiveText: '确 定',
    negativeText: '取 消',
    onPositiveClick: () => {
      user
        .logout()
        .then(() => {
          tagsView.delAllViews();
        })
        .then(() => {
          router.push({
            path: '/login',
            query:
              route.path === '/login'
                ? undefined
                : { redirect: route.fullPath },
          });
        });
    },
  });
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: var(--app-menu-bg-color);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom-width: var(--app-logo-border-width);
  border-bottom-color: var(--app-logo-border-color);
  color: var(--app-text-color);
  display: flex;
  justify-content: space-between;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s;
    -webkit-tap-highlight-color: transparent;
    color: var(--app-text-color, #000);

    &:hover {
      color: var(--app-primary-color-hover);
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    :deep() {
      svg {
        width: 0.8em !important;
        height: 0.8em !important;
      }
    }

    .right-menu-item {
      display: inline-flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: var(--app-text-color, #5a5e66);

      /* &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      } */
    }

    .avatar-container {
      margin-right: 12px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
