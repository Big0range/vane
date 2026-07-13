import { type GlobalThemeOverrides, lightTheme } from 'naive-ui';

const primaryColor = '#f34d37';

const selfOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor,
    primaryColorHover: '#f45f4b',
    primaryColorPressed: '#d54330',
    primaryColorSuppl: '#f5715f',
  },
};

export default {
  name: '红白',
  value: 'red_light',
  theme: lightTheme,
  overrides: selfOverrides,
  style: {
    '--app-logo-border-color': '#e5e7eb',
    '--app-main-bg-color': '#fff',
  },
};
