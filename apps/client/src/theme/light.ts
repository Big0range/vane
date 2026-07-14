import { type GlobalThemeOverrides, lightTheme } from 'naive-ui';

const selfOverrides: GlobalThemeOverrides = {
  common: {},
};

export default {
  name: '默认',
  value: 'light',
  theme: lightTheme,
  overrides: selfOverrides,
  style: {
    '--app-logo-border-color': '#e5e7eb',
    '--app-main-bg-color': '#fff',
  },
};
