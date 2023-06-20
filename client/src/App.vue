<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view />
    <el-backtop :right="40" :bottom="40" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { ElConfigProvider } from 'element-plus';

import useStore from '@/store';

// 导入 Element Plus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { addWaterMark, removeWaterMark } from '@/utils/addWaterMark';
import themeList from './theme';
const { app, setting, user } = useStore();

const language = computed(() => app.language);
const size: any = computed(() => app.size);

const locale = ref();
// 暂时关闭水印  影响开发心情 O.o
// watch(
//   () => user.username,
//   username => {
//     if (username) {
//       removeWaterMark();
//       addWaterMark(username);
//       console.log('addWaterMark');
//     } else {
//       console.log('cancelAnimationFrame');
//       removeWaterMark();
//       addWaterMark(import.meta.env.VITE_APP_TITLE);
//     }
//   },
//   {
//     immediate: true
//   }
// );
watch(
  language,
  value => {
    locale.value = value == 'en' ? en : zhCn;
  },
  {
    // 初始化立即执行
    immediate: true
  }
);

const changeTheme = () => {
  const themeValue = setting.theme;
  const theme = themeList.find(item => item.value === themeValue);
  if (!theme) return;
  (document.getElementsByTagName('html')[0] as any).style = '';
  for (const key in theme.json) {
    const str = (theme.json as any)[key] as string;
    document.documentElement.style.setProperty(key, str);
  }
  document.documentElement.style.setProperty(
    '--el-left-menu-width',
    setting.menuWidth + 'px'
  );
};
watch(
  () => setting.theme,
  () => {
    changeTheme();
  }
);

watch(
  () => setting.menuWidth,
  () => {
    changeTheme();
  }
);
onMounted(() => {
  changeTheme();
});
</script>

<style lang="scss"></style>
