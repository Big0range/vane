import { sysUserServe } from '../serve/sys/user.serve';
import { Request, Response, NextFunction } from '../routes/types';
import { sysRoutesServe } from '@/serve';
import Token from '../utils/token';

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = await sysRoutesServe.getRouteWhitelist();
  const routeWhiteList = result.map(item => ({
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
      return next();
    }
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.fail({
        status: 401,
      });
    }
    const TOKEN_TYPE = process.env.TOKEN_TYPE;
    const token = req.headers.authorization.replace(`${TOKEN_TYPE} `, '');
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
    // req.userInfo.password = undefined;
    next();
  } catch (error) {
    res.fail(error);
  }
}
