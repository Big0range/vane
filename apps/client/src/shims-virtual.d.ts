declare module 'virtual:svg-icons-register' {
  const content: any;
  export default content;
}

declare module 'gsap' {
  export function to(target: any, options: Record<string, any>): any;
  export function from(target: any, options: Record<string, any>): any;
  export function set(target: any, options: Record<string, any>): any;
  export namespace core {
    export interface Tween {
      kill(): void;
    }
  }
}

declare module '@wangeditor/editor-for-vue' {
  export const Editor: any;
  export const Toolbar: any;
}
