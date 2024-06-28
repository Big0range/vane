/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_PORT: string;
  VITE_APP_BASE_API: string;
  VITE_APP_ENV: string;
  VITE_ENV: 'development' | 'production' | 'staging';
  VITE_APP_CDNURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type PromiseReturnType<T extends (...arg: any) => Promise<unknown>> = Awaited<
  ReturnType<T>
>;
// type PromiseReturnType2<T> = T extends (...arg: any) => Promise<infer U>
//   ? U
//   : any;
// type a = PromiseReturnType2<() => Promise<string>>;
// type b = PromiseReturnType<string>;
interface IBaseSelectItem {
  id: number;
  name: string;
}

interface Dialog {
  title: string;
  visible: boolean;
}

/**
 * 通用组件选择项类型
 */
interface Option {
  value: string;
  label: string;
  checked?: boolean;
  children?: Option[];
}

type Parameters<T> = T extends (...arg: infer U) => void ? U : never;

declare namespace marked {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export function parse(str: string): string {}
}

interface Window {
  waterMarkFrame?: number;
}

interface PageQueryParam {
  page: number;
  pageSize: number;
}

interface PageResult<T> {
  rows: T;
  total: number;
  page: number;
  pageSize: number;
}

interface IResult {
  code: number;
  msg: string;
}

type TIds = (string | number)[] | number | string;
