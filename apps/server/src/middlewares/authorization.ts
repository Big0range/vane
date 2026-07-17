import { sysMenuRoutesServe, sysRoutesServe } from '#/serve/index.ts';

import type { Request, Response, NextFunction } from 'express';
import { sysUserServe } from '../serve/sys/user.serve.ts';
import Token from '../utils/token.ts';

function routeIsPass(req: Request, routes: any[]) {
  const routeWhiteList = routes.map((item) => ({
    url: item.url.replace(/:[^/]+/g, '[^/]+'),
    method: item.method,
  }));
  // 正则校验
  for (let i = 0; i < routeWhiteList.length; i++) {
    const item = routeWhiteList[i];
    // 判断请求方式 是否一致 不一致则跳过
    if (item.method !== req.method.toLocaleLowerCase()) {
      continue;
    }
    const reg = new RegExp(`^${item.url}$`);
    if (reg.test(req.url.split('?')[0])) {
      // console.log(req.url, reg);
      return true;
    }
  }
  // console.log(req.url);
  return false;
}
export async function authorization(req: Request, res: Response, next: NextFunction) {
  const result = await sysRoutesServe.getRouteWhitelist();
  if (routeIsPass(req, result)) {
    return next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.fail({
        status: 401,
      });
    }
    const TOKEN_TYPE = process.env.TOKEN_TYPE;
    const token = authorization.replace(`${TOKEN_TYPE} `, '');
    const userIsTokenInfo = await Token.decode(token);
    if (!userIsTokenInfo) {
      return res.fail({
        status: 401,
      });
    }
    req.userInfo = await sysUserServe.redisGetById(userIsTokenInfo.id);
    if (!req.userInfo) {
      return res.fail({
        status: 500,
        message: '用户不存在',
      });
    }
    // 校验角色是否有这个路由的权限 角色admin放行
    if (!(req.userInfo.role_id === 1)) {
      const roleRoutes = await sysMenuRoutesServe.getFullRouteByRoleId(req.userInfo.role_id);
      if (routeIsPass(req, roleRoutes)) {
        return next();
      } else {
        return res.fail({
          status: 403,
          message: '没有权限访问',
        });
      }
    }
    next();
  } catch (error: any) {
    res.fail(error);
  }
}
