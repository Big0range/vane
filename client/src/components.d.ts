// 全局组件类型声明
import Page from './src/components/Page/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Page: typeof Page;
  }
}
