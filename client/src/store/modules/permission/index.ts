import { PermissionState } from './types';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { constantRoutes, asyncRoutes } from '@/router';

const modules = import.meta.glob('../../../views/**/**.vue');
export const Layout = () => import('@/layout/index.vue');

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res = routes.filter((route: any) => {
    if (roles.includes('admin')) return true;
    let tmp = false;
    if (route.meta?.roles) {
      tmp = roles.some(role => route.meta?.roles?.includes(role));
    } else {
      tmp = true;
    }
    if (tmp && route.children) {
      route.children = filterAsyncRoutes(route.children, roles);
    }
    return tmp;
  });

  return res;
};
// 服务器返回的路由   没必要再根据角色筛选了
export const filterAccessRoutes = (routes: RouteRecordRaw[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmp = { ...route } as any;
    if (tmp.component == 'Layout') {
      tmp.component = Layout;
    } else {
      const component = modules[`../../../views/${tmp.component}.vue`] as any;
      if (component) {
        tmp.component = component;
      } else {
        tmp.component = modules[`../../../views/error-page/404.vue`];
      }
    }
    res.push(tmp);

    if (tmp.children) {
      tmp.children = filterAccessRoutes(tmp.children);
    }
  });
  return res;
};

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: constantRoutes || [],
    addRoutes: []
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = [...routes, ...this.addRoutes];
      this.routes = [...constantRoutes, ...this.addRoutes];
    },
    generateServerMenu(asyncRoutes: any) {
      return new Promise((resolve, reject) => {
        try {
          const accessedRoutes = filterAccessRoutes(asyncRoutes);
          this.setRoutes(accessedRoutes);
          resolve(accessedRoutes);
        } catch (error) {
          reject(error);
        }
      });
    },
    generateAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
      const asyncRoutes = filterAsyncRoutes(routes, roles);
      this.setRoutes(asyncRoutes);
      return asyncRoutes;
    }
  }
});

export default usePermissionStore;
