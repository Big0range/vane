import router, { asyncRoutes } from '@/router';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ['/login', '/500', '/404', '/401', '/demo', '/tuo-zhuai'];

function getLoginRedirect(to: any) {
  return {
    path: '/login',
    query: to.path === '/login' ? undefined : { redirect: to.fullPath },
    replace: true,
  };
}

router.beforeEach(async (to, from) => {
  NProgress.start();
  const { user, permission } = useStore();
  const hasToken = user.token;
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      NProgress.done();

      return { path: '/' };
    } else {
      if (!user.username) {
        try {
          await user.getUserInfo();
          // throw '123';
        } catch (error) {
          console.error('获取用户信息失败:', error);
          await user.resetToken();
          return getLoginRedirect(to);
        }
      }
      // console.log('to', to);
      // debugger;
      const hasGetUserInfo = user.roles.length > 0;
      if (hasGetUserInfo) {
        if (to.matched.length === 0) {
          return from.name ? { name: from.name as any } : '/401';
        } else {
          return true;
        }
      } else {
        try {
          permission.RESET_STATE();
          const menuList: any = await user.getMenuList();
          const accessRoutes: any =
            await permission.generateServerMenu(menuList);
          // 这一步必须在获取菜单之后,因为某些原因  用户角色是在获取菜单时赋值的
          const formatAsyncRoutes = permission.generateAsyncRoutes(
            asyncRoutes,
            user.roles || [],
          );
          [...formatAsyncRoutes, ...accessRoutes].forEach((route: any) => {
            route.path && router.addRoute(route);
          });
          // asyncRoutes
          return { ...to, replace: true };
        } catch (error) {
          console.log('error', error);
          // 移除 token 并跳转登录页
          await user.resetToken();
          window.$message.error((error as any) || 'Has Error');
          NProgress.done();
          return getLoginRedirect(to);
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      return true;
    } else {
      NProgress.done();
      return getLoginRedirect(to);
    }
  }
});

router.afterEach(to => {
  document.title = (to.meta.title || import.meta.env.VITE_APP_TITLE) as string;
});
router.afterEach(() => {
  NProgress.done();
});
