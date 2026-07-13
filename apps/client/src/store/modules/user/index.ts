import { defineStore } from 'pinia';
import type { LoginFormData } from '@/api/system/user/types';
import type { UserState } from './types';

import { localStorage } from '@/utils/storage';
import { login, getUserInfoApi, logoutApi } from '@/api/system/user';
import { getMenuListApi } from '@/api/system/menu';
import { resetRouter } from '@/router';
import avatarImg from '@/assets/avatar.gif';
const CDNURL = import.meta.env.VITE_APP_CDNURL;

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    username: '',
    avatar: '',
    roles: [],
    perms: [],
    screenLock: 0,
    allUserInfo: {},
  }),
  actions: {
    RESET_STATE() {
      this.$reset();
    },
    /**
     * 登录 login
     */
    async login(loginData: LoginFormData) {
      try {
        const { username, password, code } = loginData;
        const response = await login(username.trim(), password, code);
        const data = response.data;
        const accessToken = `${data.token_type} ${data.token}`;
        localStorage.set('token', accessToken);
        this.token = accessToken;
        localStorage.remove('lock');
        await this.getUserInfo();
        return accessToken;
      } catch (error) {
        console.error('login error', error);
        throw error;
      }
    },
    /**
     *  获取菜单信息
     */
    async getMenuList() {
      try {
        const res = await getMenuListApi();
        const data = res.data;
        this.roles = [this.allUserInfo.role_name || 'other'];

        const formatRoute = (routes: typeof data): any => {
          return routes.map(item => ({
            ...item,
            meta: {
              keepAlive: item.keep_alive === 1,
              title: item.title,
              name: item.name,
              icon: item.icon,
              hidden: item.hidden === 1,
              sort: item.sort,
            },
            redirect: item.redirect,
            children:
              item.children.length > 0 ? formatRoute(item.children) : undefined,
          }));
        };

        const menu = formatRoute(data);

        const formatRoute2 = (routes: typeof data): any => {
          return routes.filter(item => {
            if (item.children) {
              item.children = formatRoute2(item.children);
            }
            if (item.type === 'BUTTON') {
              this.perms.push(item.permission as string);
            }
            return item.type !== 'BUTTON';
          });
        };

        formatRoute2(menu);
        menu.push({
          path: '/:pathMatch(.*)',
          redirect: '/404',
          hidden: true,
        });
        return menu;
      } catch (error) {
        console.error('getMenuList error', error);
        throw new Error('获取用户菜单失败');
      }
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const result = await getUserInfoApi();
      const { username, avatar, phone, screen_lock } = result.data;
      this.username = username;
      this.avatar = avatar
        ? `${CDNURL}${avatar}?imageMogr2/format/webp/quality/50`
        : avatarImg;
      this.phone = phone;
      this.screenLock = screen_lock;
      this.allUserInfo = { ...this.allUserInfo, ...result.data };
      return result.data;
    },
    /**
     *  注销
     */
    async logout() {
      await logoutApi();
      localStorage.remove('token');
      this.RESET_STATE();
      resetRouter();
      return null;
    },

    /**
     * 清除 Token
     */
    async resetToken() {
      localStorage.remove('token');
      this.RESET_STATE();
      return null;
    },
  },
});

export default useUserStore;
