import type { Request, Response } from 'express';
import { sysUserServe, type TUser } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const { role_id, avatar, phone, id } = req.body as TUser;
    if (!id) {
      res.fail(new Error('需要修改的用户id不能为空'));
      return;
    }
    sysUserServe.update(id, {
      role_id,
      avatar,
      phone,
    });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
