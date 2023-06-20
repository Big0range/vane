import { CDNURL } from '@/utils/config';
import { defineStore } from 'pinia';
import { LoginFormData } from '@/api/system/user/types';
import { UserState } from './types';

import { localStorage } from '@/utils/storage';
import { login, getUserInfoApi, logoutApi } from '@/api/system/user';
import { getMenuListApi } from '@/api/system/menu';
import { resetRouter } from '@/router';
import avatarImg from '@/assets/avatar.gif';
const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    username: '',
    avatar: '',
    roles: [],
    perms: [],
    screenLock: 0,
    allUserInfo: {}
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 登录 login
     */
    login(loginData: LoginFormData) {
      const { username, password, code } = loginData;
      return new Promise((resolve, reject) => {
        login(username.trim(), password, code)
          .then(async response => {
            const data = response.data;
            const accessToken = `${data.token_type} ${data.token}`;
            localStorage.set('token', accessToken);
            this.token = accessToken;
            // 避免新登录的用户停留在锁屏页面
            localStorage.remove('lock');
            // this.allUserInfo = { ...this.allUserInfo, ...data.userinfo };
            // const { username, avatar, phone } = data.userinfo;
            // this.username = username;
            // this.avatar = avatar ? CDNURL + avatar : avatarImg;
            // this.roles = [];
            // this.phone = phone;
            await this.getUserInfo();
            resolve(accessToken);
          })
          .catch(error => {
            console.log('error', error);
            reject(error);
          });
      });
    },
    /**
     *  获取菜单信息
     */
    getMenuList() {
      return new Promise((resolve, reject) => {
        getMenuListApi()
          .then(res => {
            const data = res.data;
            this.roles = [this.allUserInfo.role_name || 'other'];
            const formatRoute = (routes: typeof data): any => {
              return routes.map(item => {
                return {
                  ...item,
                  meta: {
                    keepAlive: item.keep_alive === 1,
                    title: item.title,
                    name: item.name,
                    icon: item.icon,
                    hidden: item.hidden === 1,
                    sort: item.sort
                  },
                  redirect: item.redirect,
                  children:
                    item.children.length > 0
                      ? formatRoute(item.children)
                      : undefined
                };
              });
            };
            const menu = formatRoute(data);
            // 从菜单中提取权限
            const formatRoute2 = (routes: typeof data): any => {
              const data = routes.filter(item => {
                if (item.children) {
                  item.children = formatRoute2(item.children);
                }
                if (item.type === 'BUTTON') {
                  this.perms.push(item.permission as string);
                }
                return item.type !== 'BUTTON';
              });
              return data;
            };
            formatRoute2(menu);
            menu.push({
              path: '/:pathMatch(.*)',
              redirect: '/404',
              hidden: true
            });
            resolve(menu);
          })
          .catch(error => {
            console.log('error', error);
            reject(new Error('获取用户菜单失败'));
          });
      });
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const result = await getUserInfoApi();
      const { username, avatar, phone, screen_lock } = result.data;
      this.username = username;
      this.avatar = avatar ? CDNURL + avatar : avatarImg;
      this.phone = phone;
      this.screenLock = screen_lock;
      // this.roles = ['admin'];
      this.allUserInfo = { ...this.allUserInfo, ...result.data };
    },
    /**
     *  注销
     */
    logout() {
      return new Promise(async resolve => {
        await logoutApi();
        localStorage.remove('token');
        this.RESET_STATE();
        resetRouter();
        resolve(null);
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise(resolve => {
        localStorage.remove('token');
        this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
