import defaultTheme from './default';
import greenTheme from './green_white';
import purpleDark from './purple_dark';
import redWhite from './red_white';
import redBlack from './red_black';
import purpleWhite from './purple_white';
import greenBlack from './green_black';
import blue_black from './blue_black';
const white = {
  // 左边整体的背景色
  '--el-menu-bg-color': '#ffffff',
  // 左边菜单激活的文字颜色
  '--el-menu-active-color': 'var(--el-color-primary)',
  // 左边菜单非激活状态的背景颜色
  '--el-menu-item-bg-color': 'var(--el-color-primary-light-9)',
  // 左边菜单hover的背景色
  '--el-menu-hover-bg-color': 'var(--el-color-primary-light-8)',
  // 左边菜单文字颜色
  '--el-menu-text-color': '#5a5e66',
  // 左边菜单的高度
  '--el-menu-item-height': '50px',
  // 左边菜单子菜单的高度
  '--el-menu-sub-item-height': 'var(--el-menu-item-height)',
  // logo边框的宽度
  '--logo-border-width': '1px',
  // logo边框的颜色
  '--logo-border-color': '#e5e7eb'
  // 这两个属性可有可无
  // '--hamburger-color': '#fff',
  // '--navbar-icon-color': '#fff'
};
const drak = {
  '--el-menu-bg-color': '#282c34',
  '--el-menu-active-color': '#fff',
  '--el-menu-hover-bg-color': 'var(--el-color-primary)',
  '--el-menu-text-color': '#fff',
  '--el-menu-item-height': '50px',
  '--el-menu-sub-item-height': 'var(--el-menu-item-height)',
  '--logo-border-width': '1px',
  '--logo-border-color': '#4d4e50',
  '--hamburger-color': '#fff',
  '--navbar-icon-color': '#fff',
  '--el-menu-item-bg-color': '#272628'
};
export default [
  {
    name: '蓝白',
    value: 'default',
    json: {
      ...defaultTheme,
      ...white
    }
  },
  {
    name: '蓝黑',
    value: 'blue_black',
    json: {
      ...blue_black,
      ...drak
    }
  },
  {
    name: '绿白',
    value: 'green',
    json: { ...greenTheme, ...white }
  },
  {
    name: '绿黑',
    value: 'green_black',
    json: { ...greenBlack, ...drak }
  },
  {
    name: '紫白',
    value: 'purple_white',
    json: { ...purpleWhite, ...white }
  },
  {
    name: '紫黑',
    value: 'violet_dark',
    json: {
      ...purpleDark,
      ...drak
    }
  },
  {
    name: '红白',
    value: 'red_white',
    json: { ...redWhite, ...white }
  },
  {
    name: '红黑',
    value: 'red_black',
    json: { ...redBlack, ...drak }
  }
];
