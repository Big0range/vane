import type { AppState } from './types';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    device: 'desktop',
    sidebar: {
      opened: localStorage.get('sidebarStatus')
        ? Boolean(Number(localStorage.get('sidebarStatus')))
        : true,
      withoutAnimation: false,
    },
    size: localStorage.get('size') || 'default',
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      localStorage.set('sidebarStatus', this.sidebar.opened ? 1 : 0);
    },
    closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
      localStorage.set('sidebarStatus', 0);
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      localStorage.set('size', size);
    },
  },
});

export default useAppStore;
