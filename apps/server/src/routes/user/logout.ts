import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    await sysUserServe.logout(req.userInfo.id);
    res.ok({
      log: `用户${req.userInfo.username}退出登录`,
    });
  } catch (error: any) {
    res.fail(error);
  }
};
