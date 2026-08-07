import { isPhoneNumber } from '@vane/utils';
import type { Request, Response } from 'express';
import { type TUser, sysUserServe } from '#/serve/index.ts';
import { logger } from '#/utils/useLogger.ts';
import { md5 } from '#/utils/md5.ts';
export default async (req: Request, res: Response) => {
  logger.debug(req.body);
  try {
    // eslint-disable-next-line prefer-const
    let { username, password, role_id, avatar, phone, shop_id, dept_id } = req.body as TUser;
    if (!username || username.length < 6) {
      throw new Error('用户名至少六位');
    }
    if (!password) {
      password = md5(username.substring(username.length - 6));
    }
    const resultByUsername = await sysUserServe.findByUsername(username, true);
    if (resultByUsername) {
      throw new Error('该用户已注册');
    }
    const verify = isPhoneNumber(phone);
    if (verify) {
      throw new Error(verify);
    }
    await sysUserServe.create({
      username,
      password,
      role_id,
      shop_id,
      dept_id,
      avatar,
      phone,
    });
    res.ok({
      message: '添加用户成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
