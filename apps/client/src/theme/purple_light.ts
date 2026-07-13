import { type GlobalThemeOverrides, lightTheme } from 'naive-ui';

const primaryColor = '#6954f0';

const selfOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor,
    primaryColorHover: '#7865f2',
    primaryColorPressed: '#5c49d7',
    primaryColorSuppl: '#8776f3',
  },
};

export default {
  name: '紫白',
  value: 'purple_light',
  theme: lightTheme,
  overrides: selfOverrides,
  style: {
    '--app-logo-border-color': '#e5e7eb',
    '--app-main-bg-color': '#fff',
  },
};
