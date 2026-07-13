import { defineStore } from 'pinia';
import type { SettingState } from './types';
import defaultSettings from '@/settings';
import { localStorage } from '@/utils/storage';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;
const persistedKeys: Partial<Record<keyof SettingState, boolean>> = {
  theme: true,
  fixedHeader: true,
  tagsView: true,
  sidebarLogo: true,
  menuWidth: true,
};

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => ({
    theme: localStorage.get('theme') || 'light',
    showSettings,
    tagsView:
      localStorage.get('tagsView') != null
        ? localStorage.get('tagsView')
        : tagsView,
    menuWidth: localStorage.get('menuWidth') || 256,
    tagsStyle: localStorage.get('tagsStyle') || 'default',
    fixedHeader: localStorage.get('fixedHeader') || fixedHeader,
    sidebarLogo: localStorage.get('sidebarLogo') || sidebarLogo,
  }),
  actions: {
    changeSetting(payload: { key: keyof SettingState; value: any }) {
      const { key, value } = payload;
      (this as any)[key] = value;
      if (persistedKeys[key]) {
        localStorage.set(key, value);
      }
    },
  },
});

export default useSettingStore;
