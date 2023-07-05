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
        <!-- <search id="header-search" class="right-menu-item" /> -->
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
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
        <size-select id="size-select" class="right-menu-item hover-effect" />
        <lang-select id="lang-select" class="right-menu-item hover-effect" />
      </span>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="hover"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <CaretBottom style="width: 0.6em; height: 0.6em; margin-left: 5px" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              {{ $t('navbar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import useStore from '@/store';
import { t } from '@/lang/index';
// 组件依赖
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';
import Notice from '@/components/Notice/index.vue';
import ScreenLock from '@/components/ScreenLock/index.vue';

// 图标依赖
import { CaretBottom } from '@element-plus/icons-vue';

const { app, user, tagsView } = useStore();

const route = useRoute();
const router = useRouter();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const avatar = computed(() => user.avatar);

function toggleSideBar() {
  app.toggleSidebar();
}

function logout() {
  ElMessageBox.confirm(t('common.logoutConfirm'), t('common.hint'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    user
      .logout()
      .then(() => {
        tagsView.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
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
  background: var(--el-menu-bg-color);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom-width: var(--logo-border-width);
  border-bottom-color: var(--logo-border-color);
  color: var(--el-menu-text-color);
  display: flex;
  justify-content: space-between;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    color: var(--hamburger-color, #000);
    /* &:hover {
      background: red;
    } */
  }

  .breadcrumb-container {
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
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
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: var(--navbar-icon-color, #5a5e66);
      vertical-align: text-bottom;

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
        margin-top: 5px;
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
