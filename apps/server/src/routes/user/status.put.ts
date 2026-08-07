import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    if (req.body.id === undefined) {
      res.fail({
        message: 'id 不能为空',
      });
      return;
    }
    if (isNaN(id)) {
      res.fail({
        message: 'id 参数错误',
      });
      return;
    }

    const user = await sysUserServe.findById(id);
    if (!user) {
      throw new Error('用户不存在');
    }
    await sysUserServe.update(id, {
      status: user.status === 1 ? 0 : 1,
    });
    // 之前是启用状态,改为禁用的话需要清除token,踢出用户下线
    if (user.status === 0) {
      await sysUserServe.logout(id);
    }
    res.ok({});
  } catch (error: any) {
    res.fail(error);
  }
};
