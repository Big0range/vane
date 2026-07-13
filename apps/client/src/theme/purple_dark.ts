import { type GlobalThemeOverrides, darkTheme } from 'naive-ui';

const primaryColor = '#6954f0';

const selfOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor,
    primaryColorHover: '#7865f2',
    primaryColorPressed: '#5c49d7',
    primaryColorSuppl: '#8776f3',
  },
  Menu: {
    itemColorActive: '#272628',
    itemColorHover: '#272628',
    itemColorActiveHover: '#272628',

    itemTextColorActive: primaryColor,
    itemTextColorActiveHover: primaryColor,
    itemTextColorChildActive: primaryColor,
    itemTextColorChildActiveHover: primaryColor,

    itemIconColorActive: primaryColor,
    itemIconColorActiveHover: primaryColor,
    itemIconColorChildActive: primaryColor,
    itemIconColorChildActiveHover: primaryColor,

    arrowColorActive: primaryColor,
    arrowColorChildActive: primaryColor,
  },
  Scrollbar: {
    color: '#B5B4B4',
    colorHover: '#DDDDDD',
  },
};

export default {
  name: '紫黑',
  value: 'purple_dark',
  theme: darkTheme,
  overrides: selfOverrides,
  style: {
    '--app-logo-border-color': '#4d4e50',
    '--app-main-bg-color': '#333',
    '--app-tags-view-bg-color': '#272628',
  },
};
