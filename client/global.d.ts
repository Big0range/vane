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

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Window {
  waterMarkFrame?: number;
}
