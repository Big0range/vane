import { defineStore } from 'pinia';
import { SettingState } from './types';
import defaultSettings from '@/settings';
import { localStorage } from '@/utils/storage';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingState => ({
    theme: localStorage.get('theme') || 'green',
    showSettings: showSettings,
    tagsView:
      localStorage.get('tagsView') != null
        ? localStorage.get('tagsView')
        : tagsView,
    menuWidth: localStorage.get('menuWidth') || 256,
    tagsStyle: localStorage.get('tagsStyle') || 'default',
    fixedHeader: localStorage.get('fixedHeader') || fixedHeader,
    sidebarLogo: localStorage.get('sidebarLogo') || sidebarLogo
  }),
  actions: {
    async changeSetting(payload: { key: string; value: any }) {
      const { key, value } = payload;
      switch (key) {
        case 'theme':
          this.theme = value;
          localStorage.set('theme', value);
          break;
        case 'showSettings':
          this.showSettings = value;
          break;
        case 'fixedHeader':
          this.fixedHeader = value;
          localStorage.set('fixedHeader', value);
          break;
        case 'tagsView':
          this.tagsView = value;
          localStorage.set('tagsView', value);
          break;
        case 'sidebarLogo':
          this.sidebarLogo = value;
          localStorage.set('sidebarLogo', value);
          break;
        case 'menuWidth':
          this.menuWidth = value;
          localStorage.set('menuWidth', value);
          break;
        default:
          break;
      }
    }
  }
});

export default useSettingStore;
