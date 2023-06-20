<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <span v-for="route in routes" :key="route.path" v-show="isShow(route)">
          <sidebar-item
            :item="route"
            :key="route.path"
            :base-path="route.path"
            :is-collapse="isCollapse"
          />
        </span>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';
import useStore from '@/store';

const { permission, setting, app } = useStore();

const route = useRoute();
const routes = computed(() => permission.routes);
const showLogo = computed(() => setting.sidebarLogo);
const isCollapse = computed(() => !app.sidebar.opened);

const isShow = (r: any) => {
  const children: any[] = r.children || [];
  const someShow = children.some(item => !item?.meta?.hidden);
  return someShow;
};
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
</script>
