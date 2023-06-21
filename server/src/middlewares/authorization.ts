import { sysUserServe } from '../serve/sys/user.serve';
import { Request, Response, NextFunction } from '../routes/types';
import Token from '../utils/token';
// 不需要登录验证的api
const whiteList = [
  '/user/login|:%|post',
  '/user/register|:%|post',
  '/user/code|:%|get',
  '/demo|:%|get',
  '/config|:%|get',
];
export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const url = `${req.url.split('?')[0]}|:%|${req.method.toLocaleLowerCase()}`;
  console.log(
    'whiteList.includes(url)',
    whiteList.includes(url),
    `${req.url.split('?')[0]}|:%|${req.method.toLocaleLowerCase()}`,
  );
  if (whiteList.includes(url)) {
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
