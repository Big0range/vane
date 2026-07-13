import dark from './dark';
import light from './light';
import purple_dark from './purple_dark';
import purple_light from './purple_light';
import red_light from './red_light';
import red_dark from './red_dark';
import blue_dark from './blue_dark';
import crimson_dark from './crimson_dark';
import { type GlobalThemeOverrides } from 'naive-ui';
import _ from 'lodash';
interface Theme {
  name: string;
  value: string;
  theme: any;
  overrides: any;
  getStyle: (setting: any) => Record<string, string>;
}
export type ThemeList = Theme[];
const defaultOverrides: GlobalThemeOverrides = {
  Scrollbar: {
    color: 'rgba(0, 0, 0, 0.5)',
    colorHover: 'rgba(0, 0, 0, 0.7)',
  },
};
export default [
  dark,
  light,
  purple_dark,
  purple_light,
  red_light,
  red_dark,
  blue_dark,
  crimson_dark,
].map<Theme>(item => {
  item.overrides = _.merge(
    JSON.parse(JSON.stringify(defaultOverrides)),
    JSON.parse(JSON.stringify(item.overrides)),
  );
  return {
    ...item,
    getStyle: (data: any) => ({
      ...item.style,
      '--logo-border-width': '1px',
      '--logo-border-color': '#e5e7eb',
      '--app-left-menu-width': data.menuWidth + 'px',
      '--app-logo-border-width': '1px',
      '--app-bg-color':
        item.overrides?.common?.baseColor || item.theme.common.baseColor,
      '--app-menu-bg-color':
        item.overrides?.common?.baseColor || item.theme.common.baseColor,
      '--app-text-color':
        item.overrides?.common?.textColor1 || item.theme.common.textColor1,
      '--app-text-color2':
        item.overrides?.common?.textColor2 || item.theme.common.textColor2,
      '--app-primary-color':
        item.overrides?.common?.primaryColor || item.theme.common.primaryColor,
      '--app-primary-color-hover':
        item.overrides?.common?.primaryColorHover ||
        item.theme.common.primaryColorHover,
    }),
  };
});
