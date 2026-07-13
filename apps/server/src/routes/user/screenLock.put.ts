import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
import { md5 } from '#/utils/md5.ts';
export default async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo.id;
    const { screen_lock, password } = req.body;
    if (![0, 1].includes(screen_lock)) {
      throw new Error('screen_lock 参数错误');
    }
    if (screen_lock === 0) {
      if (!password) {
        throw new Error('请输入密码');
      }
      if (md5(password) !== req.userInfo.password) {
        throw new Error('密码错误');
      }
    }

    await sysUserServe.update(userId, {
      screen_lock,
    });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
