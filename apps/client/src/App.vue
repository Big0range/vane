<template>
  <n-config-provider
    :locale="locale"
    :theme="theme && theme.theme"
    :date-locale="dateZhCN"
    :theme-overrides="theme && theme.overrides"
  >
    <n-message-provider>
      <n-dialog-provider>
        <NThemeEditor>
          <mount />
          <router-view />
        </NThemeEditor>
        <n-back-top :right="40" :bottom="40" />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NThemeEditor } from 'naive-ui';
import { ref, watch, onMounted } from 'vue';
import { zhCN, dateZhCN } from 'naive-ui';
import themeList, { type ThemeList } from './theme/index';
import useStore from '@/store';
import mount from './mount.vue';
const { setting } = useStore();

const locale = ref(zhCN);

const theme = ref<ThemeList[0]>();
const changeTheme = () => {
  const themeValue = setting.theme;
  // const themeValue = 'light'
  // console.log('themeValue', themeValue)
  theme.value = themeList.find(item => item.value === themeValue)!;
  const style = theme.value.getStyle(setting);
  (document.getElementsByTagName('html')[0] as any).style = '';
  for (const key in style) {
    const str = style[key] as string;
    document.documentElement.style.setProperty(key, str);
  }
};
watch(
  () => [setting.theme, setting.menuWidth],
  () => {
    changeTheme();
  },
);

onMounted(() => {
  changeTheme();
});
</script>

<style lang="scss"></style>
