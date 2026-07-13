/* eslint-disable unused-imports/no-unused-vars */
import { type MessageApi } from 'naive-ui';

declare global {
  declare namespace marked {
    export function parse(str: string): string {}
  }
  interface Visible {
    show: boolean;
    title: string;
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
  interface PageResult<T> extends Result {
    data: {
      rows: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }
  interface Window {
    waterMarkFrame?: number;
    $message: MessageApi;
  }
  /** tree组件选择项类型 */
  interface Option {
    value: string;
    label: string;
    checked?: boolean;
    children?: Option[];
  }
}

export {};
