import { type GlobalThemeOverrides, darkTheme } from 'naive-ui';

const selfOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#fff',
    // primaryColorHover: '#999',
  },
  Menu: {
    itemColorActive: '#272628',
    itemColorHover: '#272628',
    itemColorActiveHover: '#272628',

    itemTextColorActive: darkTheme.common.textColor1,
    itemTextColorActiveHover: darkTheme.common.textColor1,
    itemTextColorChildActive: darkTheme.common.textColor1,
    itemTextColorChildActiveHover: darkTheme.common.textColor1,

    itemIconColorActive: darkTheme.common.textColor1,
    itemIconColorActiveHover: darkTheme.common.textColor1,
    itemIconColorChildActive: darkTheme.common.textColor1,
    itemIconColorChildActiveHover: darkTheme.common.textColor1,

    arrowColorActive: darkTheme.common.textColor1,
    arrowColorChildActive: darkTheme.common.textColor1,
  },
  Scrollbar: {
    color: '#B5B4B4',
    colorHover: '#DDDDDD',
  },
};

export default {
  name: '暗',
  value: 'dark',
  theme: darkTheme,
  overrides: selfOverrides,
  style: {
    '--app-logo-border-color': '#4d4e50',
    '--app-main-bg-color': '#333',
    '--app-tags-view-bg-color': '#272628',
  },
};
