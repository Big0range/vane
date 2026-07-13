import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const ids: number[] = req.body.ids || [];
    if (ids.length === 0) {
      throw new Error('请选择需要删除的用户');
    }
    const findAdmin = await sysUserServe.findOne({
      username: 'admin',
    });
    if (ids.some((id) => id == findAdmin?.id)) {
      throw new Error('admin用户不可删除');
    }
    await sysUserServe.deleteByIds(ids);
    res.ok({
      message: '用户删除成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
