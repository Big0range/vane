<template>
  <div class="drawer-container">
    <h3 class="drawer-title">系统布局配置</h3>

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <div class="flex items-center">
        <el-icon size="15"><ColdDrink /></el-icon>
        &nbsp; 全局主题
      </div>
    </el-divider>
    <div class="drawer-item">
      <span>主题颜色</span>
      <div
        class="w-100"
        style="float: right; height: 26px; margin: -3px 8px 0 0"
      >
        <!-- <theme-picker @change="themeChange" /> -->
        <el-select v-model="formData.theme" placeholder="Select">
          <el-option
            v-for="item in themeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="drawer-item">
      <span>菜单宽度</span>
      <div style="width: 159px">
        <el-slider
          v-model="formData.menuWidth"
          :min="200"
          :max="400"
          size="small"
        />
      </div>
    </div>
    <div class="drawer-item">
      <span>开启 Tags-View</span>
      <el-switch v-model="formData.tagsView" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>固定 Header</span>
      <el-switch v-model="formData.fixedHeader" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span>侧边栏 Logo</span>
      <el-switch v-model="formData.sidebarLogo" class="drawer-switch" />
    </div>

    <!-- <el-divider>导航栏模式</el-divider>

    <ul class="navbar">
      <el-tooltip content="左侧模式" placement="bottom">
        <li class="navbar__item navbar__item--left">
          <div />
          <div />
        </li>
      </el-tooltip>
      <el-tooltip content="顶部模式" placement="bottom">
        <li class="navbar__item navbar__item--top">
          <div />
          <div />
        </li>
      </el-tooltip>
      <el-tooltip content="混合模式" placement="bottom">
        <li class="navbar__item navbar__item--mix">
          <div />
          <div />
        </li>
      </el-tooltip>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch, ref } from 'vue';
import themeList from '@/theme';
import { ColdDrink } from '@element-plus/icons-vue';
import useStore from '@/store';

const { setting } = useStore();
const formData = reactive({
  fixedHeader: setting.fixedHeader,
  tagsView: setting.tagsView,
  sidebarLogo: setting.sidebarLogo,
  theme: setting.theme || 'default',
  menuWidth: setting.menuWidth
});

watch(
  () => formData.menuWidth,
  value => {
    setting.changeSetting({ key: 'menuWidth', value: value });
  }
);
watch(
  () => formData.theme,
  value => {
    if ((document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        setting.changeSetting({ key: 'theme', value: value });
      });
    } else {
      setting.changeSetting({ key: 'theme', value: value });
    }
  }
);

watch(
  () => formData.fixedHeader,
  value => {
    setting.changeSetting({ key: 'fixedHeader', value: value });
  }
);

watch(
  () => formData.tagsView,
  value => {
    setting.changeSetting({ key: 'tagsView', value: value });
  }
);

watch(
  () => formData.sidebarLogo,
  value => {
    setting.changeSetting({ key: 'sidebarLogo', value: value });
  }
);
</script>

<style>
::view-transition-old(*) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(*) {
  mix-blend-mode: normal;
  animation: clip 0.5s ease-in;
}
@keyframes clip {
  from {
    clip-path: circle(0% at 0 0);
  }
  to {
    clip-path: circle(100% at 0 0);
  }
}
</style>
<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: #303133;
    font-size: 17px;
    line-height: 38px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
  }

  .drawer-switch {
    /* float: right; */
  }

  .job-link {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding: 0;

  &__item {
    width: 18%;
    height: 45px;
    background: #f0f2f5;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &--left {
      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #1b2a47;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &--top {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }
      }
    }

    &--mix {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }

        &:nth-child(2) {
          width: 30%;
          height: 70%;
          bottom: 0;
          left: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }
  }
}
</style>
