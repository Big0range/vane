import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
import Token from '#/utils/token.ts';
import { logger } from '#/utils/useLogger.ts';
import { md5 } from '#/utils/md5.ts';

export default async function (req: Request, res: Response) {
  logger.debug(req.body);
  try {
    const { username, password } = req.body;
    if (!username) {
      throw new Error('请输入账号');
    }
    if (!password) {
      throw new Error('请输入密码');
    }
    if (password.length < 6) {
      throw new Error('密码至少六位');
    }
    const resultByUsername = await sysUserServe.findByUsername(username);
    if (resultByUsername) {
      throw new Error('该用户已注册');
    }
    const createResult: any = await sysUserServe.create({
      username,
      password: md5(password),
    });
    logger.debug({
      id: createResult.id,
      username: createResult.username,
    });
    // 生成token
    const userToken = Token.encode({
      id: createResult.id,
    });
    res.ok({
      message: '注册成功1',
      data: {
        token: userToken,
        userinfo: {
          username,
          id: createResult.id,
        },
      },
    });
  } catch (error: any) {
    res.fail(error);
  }
}
