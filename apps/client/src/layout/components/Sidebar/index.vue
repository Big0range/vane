<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar">
    <logo v-if="showLogo" :collapse="isCollapse" />

    <n-scrollbar style="max-height: calc(100vh - 40px)">
      <n-menu
        @update:value="handleUpdateExpandedKeys"
        :value="activeMenu"
        :options="menuOptions"
        :collapsed="isCollapse"
      />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import Logo from './Logo.vue';
import useStore from '@/store';
const { permission, setting, app } = useStore();
function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
const route = useRoute();
const router = useRouter();
function joinPath(parent: string, path: string) {
  if (isExternal(path)) {
    return path;
  }

  return `${parent}/${path}`.replace(/\/+/g, '/');
}

function isHidden(route: any) {
  return route.hidden || route.meta?.hidden;
}

function filterRouter(routes: any[]): any[] {
  return routes
    .filter(route => !isHidden(route))
    .map(route => ({
      ...route,
      children: route.children ? filterRouter(route.children) : undefined,
    }));
}

function getShowingChildren(children: any[] = []) {
  return children.filter(child => !isHidden(child));
}
import SvgIcon from '@/components/SvgIcon/index.vue';
const iconSize = '16px';
function renderIcon(icon?: string) {
  if (!icon) return undefined;
  return () =>
    h(SvgIcon, {
      size: iconSize,
      iconClass: icon,
    });
}
function routesToMenuOptions(routes: any[], parentPath = ''): MenuOption[] {
  return routes.map(route => {
    const children = getShowingChildren(route.children);

    const hasOneChild = children.length === 1;
    const noChildren = children.length === 0;

    const shouldUseOnlyChild =
      (hasOneChild || noChildren) && !route.meta?.alwaysShow;

    // 默认值
    let currentRoute = route;

    // 只有一个子路由时直接提升
    if (hasOneChild) {
      currentRoute = children[0];
    }

    const key = joinPath(parentPath, currentRoute.path || '');

    const label = currentRoute.meta?.title || currentRoute.path;
    const icon = renderIcon(currentRoute.meta?.icon);
    let menuChildren: MenuOption[] | undefined;

    // 多个子菜单才递归
    if (!shouldUseOnlyChild && children.length > 0) {
      menuChildren = routesToMenuOptions(children, route.path);
    }

    return {
      label,
      key,
      icon,
      children: menuChildren,
    };
  });
}
const menuOptions = computed(() => {
  const data = routesToMenuOptions(filterRouter(permission.routes), '');
  return data;
});
const showLogo = computed(() => setting.sidebarLogo);
const isCollapse = computed(() => !app.sidebar.opened);
function handleUpdateExpandedKeys(key: string) {
  if (isExternal(key)) {
    window.open(key);
  } else {
    router.push(key);
  }
}
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
</script>
