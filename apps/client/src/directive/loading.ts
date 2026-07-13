import { createApp, h } from 'vue';
import { NSpin } from 'naive-ui';
import { hexToRgb } from '@/utils';

interface LoadingElement extends HTMLElement {
  __loadingApp__?: ReturnType<typeof createApp>;
  __loadingContainer__?: HTMLDivElement;
}

export const loading = {
  mounted(el: LoadingElement, binding: any) {
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }

    const container = document.createElement('div');
    const htmlDom = document.querySelector('html')!;
    const htmlStyle = htmlDom.style;
    const { r, g, b } = hexToRgb(
      htmlStyle.getPropertyValue('--app-main-bg-color'),
    );
    Object.assign(container.style, {
      position: 'absolute',
      inset: '0',
      display: binding.value ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      background: `rgba(${r},${g},${b},.8)`,
      zIndex: '999',
    });

    const app = createApp({
      render() {
        return h(NSpin, {
          size: 'large',
        });
      },
    });

    app.mount(container);

    el.appendChild(container);

    el.__loadingApp__ = app;
    el.__loadingContainer__ = container;
  },

  updated(el: LoadingElement, binding: any) {
    if (!el.__loadingContainer__) return;

    el.__loadingContainer__.style.display = binding.value ? 'flex' : 'none';
  },

  unmounted(el: LoadingElement) {
    el.__loadingApp__?.unmount();
    el.__loadingContainer__?.remove();
  },
};
