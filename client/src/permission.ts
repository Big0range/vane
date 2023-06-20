import router, { asyncRoutes } from '@/router';
import { ElMessage } from 'element-plus';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { generateTitle } from './utils/i18n';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ['/login', '/mini-questionnaire', '/demo'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user, permission } = useStore();
  const hasToken = user.token;
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (!user.username) {
        try {
          await user.getUserInfo();
          // throw '123';
        } catch (error) {
          await user.resetToken();
          next(`/login`);
          return;
        }
      }
      // console.log('to', to);
      // debugger;
      const hasGetUserInfo = user.roles.length > 0;
      if (hasGetUserInfo) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          next();
        }
      } else {
        try {
          permission.RESET_STATE();
          const menuList: any = await user.getMenuList();
          const accessRoutes: any = await permission.generateServerMenu(
            menuList
          );
          // 这一步必须在获取菜单之后,因为某些原因  用户角色是在获取菜单时赋值的
          const formatAsyncRoutes = permission.generateAsyncRoutes(
            asyncRoutes,
            user.roles || []
          );
          [...formatAsyncRoutes, ...accessRoutes].forEach((route: any) => {
            route.path && router.addRoute(route);
          });
          // asyncRoutes
          next({ ...to, replace: true });
        } catch (error) {
          console.log('error', error);
          // 移除 token 并跳转登录页
          await user.resetToken();
          ElMessage.error((error as any) || 'Has Error');
          next(`/login`);
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login`);
      NProgress.done();
    }
  }
});

router.afterEach((to, from) => {
  document.title = (generateTitle(to.meta.title as string) ||
    import.meta.env.VITE_APP_TITLE) as string;
});
router.afterEach(() => {
  NProgress.done();
});
