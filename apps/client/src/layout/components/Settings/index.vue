<template>
  <div class="drawer-container">
    <h3 class="drawer-title">系统布局配置</h3>

    <!-- 全局主题 -->
    <n-divider class="divider" content-position="center">
      <div class="flex items-center" style="color: var(--card-color)">
        <n-icon size="15">
          <ColorPaletteOutline />
        </n-icon>
        &nbsp; 全局主题
      </div>
    </n-divider>
    <div class="drawer-item">
      <span class="drawer-item-label">主题颜色{{ formData.theme }}</span>
      <div
        class="w-100"
        style="float: right; height: 26px; margin: -3px 8px 0 0"
      >
        <!-- <theme-picker @change="themeChange" /> -->
        <n-select
          v-model:value="formData.theme"
          placeholder="Select"
          :options="themeList as any"
          label-field="name"
          value-field="value"
        >
        </n-select>
      </div>
    </div>
    <div class="drawer-item">
      <span class="drawer-item-label">菜单宽度</span>
      <div style="width: 159px">
        <n-slider v-model:value="formData.menuWidth" :min="200" :max="400" />
      </div>
    </div>
    <div class="drawer-item">
      <span class="drawer-item-label">开启 Tags-View</span>
      <n-switch v-model:value="formData.tagsView" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span class="drawer-item-label">固定 Header</span>
      <n-switch v-model:value="formData.fixedHeader" class="drawer-switch" />
    </div>

    <div class="drawer-item">
      <span class="drawer-item-label">侧边栏 Logo</span>
      <n-switch v-model:value="formData.sidebarLogo" class="drawer-switch" />
    </div>

    <!-- <n-divider>导航栏模式</n-divider>

    <ul class="navbar">
      <n-tooltip content="左侧模式" placement="bottom">
        <li class="navbar__item navbar__item--left">
          <div />
          <div />
        </li>
      </n-tooltip>
      <n-tooltip content="顶部模式" placement="bottom">
        <li class="navbar__item navbar__item--top">
          <div />
          <div />
        </li>
      </n-tooltip>
      <n-tooltip content="混合模式" placement="bottom">
        <li class="navbar__item navbar__item--mix">
          <div />
          <div />
        </li>
      </n-tooltip>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import themeList from '@/theme';
import { ColorPaletteOutline } from '@vicons/ionicons5';
import { useThemeVars } from 'naive-ui';
import useStore from '@/store';
const themeVars = useThemeVars();
const { setting } = useStore();
const transitionPoint = reactive({
  x: 0,
  y: 0,
});
const updateTransitionPoint = (event: PointerEvent) => {
  transitionPoint.x = event.clientX;
  transitionPoint.y = event.clientY;
};
const runThemeTransition = async (value: string) => {
  if (!(document as any).startViewTransition) {
    setting.changeSetting({ key: 'theme', value });
    return;
  }

  const transition = (document as any).startViewTransition(async () => {
    setting.changeSetting({ key: 'theme', value });
    await nextTick();
  });

  await transition.ready;

  const endRadius = Math.hypot(
    Math.max(transitionPoint.x, window.innerWidth - transitionPoint.x),
    Math.max(transitionPoint.y, window.innerHeight - transitionPoint.y),
  );

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${transitionPoint.x}px ${transitionPoint.y}px)`,
        `circle(${endRadius}px at ${transitionPoint.x}px ${transitionPoint.y}px)`,
      ],
    },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    },
  );
};
onMounted(() => {
  window.addEventListener('pointerdown', updateTransitionPoint, true);
});
onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', updateTransitionPoint, true);
});
const formData = reactive({
  fixedHeader: setting.fixedHeader,
  tagsView: setting.tagsView,
  sidebarLogo: setting.sidebarLogo,
  theme: setting.theme || 'light',
  menuWidth: setting.menuWidth,
});

watch(
  () => formData.menuWidth,
  value => {
    setting.changeSetting({ key: 'menuWidth', value: value });
  },
);
watch(
  () => formData.theme,
  value => {
    runThemeTransition(value);
  },
);

watch(
  () => formData.fixedHeader,
  value => {
    setting.changeSetting({ key: 'fixedHeader', value: value });
  },
);

watch(
  () => formData.tagsView,
  value => {
    setting.changeSetting({ key: 'tagsView', value: value });
  },
);

watch(
  () => formData.sidebarLogo,
  value => {
    setting.changeSetting({ key: 'sidebarLogo', value: value });
  },
);
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 1;
}

::view-transition-old(root) {
  z-index: 0;
}
</style>
<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  background: var(--app-bg-color);
  color: v-bind('themeVars.textColor1');

  .drawer-title {
    margin-bottom: 12px;
    font-size: 17px;
    line-height: 38px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;

    &-label {
      color: v-bind('themeVars.textColor1');
    }
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
