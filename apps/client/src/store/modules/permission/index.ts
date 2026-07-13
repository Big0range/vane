import type { PermissionState } from './types';
import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';

const modules = import.meta.glob('../../../views/**/**.vue');
export const Layout = () => import('@/layout/index.vue');

const hasPermission = (route: RouteRecordRaw, roles: string[]) => {
  if (roles.includes('admin')) return true;
  const routeRoles = route.meta?.roles as string[] | undefined;
  return !routeRoles || roles.some(role => routeRoles.includes(role));
};

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[],
) => {
  return routes.filter(route => {
    const allowed = hasPermission(route, roles);
    if (allowed && route.children) {
      route.children = filterAsyncRoutes(route.children, roles);
    }
    return allowed;
  });
};

const resolveComponent = (component: string | undefined) => {
  if (component === 'Layout') return Layout;
  return (
    modules[`../../../views/${component}.vue`] ||
    modules[`../../../views/error-page/404.vue`]
  );
};

export const filterAccessRoutes = (routes: RouteRecordRaw[]) => {
  return routes.map(route => {
    const tmp = { ...route } as any;
    tmp.component = resolveComponent(tmp.component as string | undefined);
    if (tmp.children) {
      tmp.children = filterAccessRoutes(tmp.children);
    }
    return tmp;
  });
};

const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routes: constantRoutes || [],
    addRoutes: [],
  }),
  actions: {
    RESET_STATE() {
      this.$reset();
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = [...routes, ...this.addRoutes];
      this.routes = [...constantRoutes, ...this.addRoutes];
    },
    async generateServerMenu(asyncRoutes: any) {
      const accessedRoutes = filterAccessRoutes(asyncRoutes);
      this.setRoutes(accessedRoutes);
      return accessedRoutes;
    },
    generateAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
      const accessedRoutes = filterAsyncRoutes(routes, roles);
      this.setRoutes(accessedRoutes);
      return accessedRoutes;
    },
  },
});

export default usePermissionStore;
