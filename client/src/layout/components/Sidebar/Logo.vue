<template>
  <div class="border-b sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="mx-12 sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="mx-17 sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';

const title = import.meta.env.VITE_APP_TITLE;
const props = defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});

const state = reactive({
  isCollapse: props.collapse,
  logo: new URL(`../../../assets/logo.png`, import.meta.url).href
});

const { logo } = toRefs(state);
</script>

<style lang="scss" scoped>
.collapse {
  visibility: visible !important;
}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: var(--el-menu-bg-color);
  text-align: center;
  overflow: hidden;
  border-bottom-width: var(--logo-border-width);
  border-bottom-color: var(--logo-border-color);

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex !important;
    justify-content: flex-start;
    align-items: center;
    & .sidebar-logo {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: var(--el-menu-text-color);
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      margin-left: 12px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
