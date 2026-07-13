import type { Request, Response } from 'express';
import { sysMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const ids = req.body.ids as number[];
    if (!ids.length) {
      res.fail({
        message: '请选择要删除的菜单',
      });
      return;
    }
    await sysMenuServe.deleteByIds(ids);
    res.ok({
      message: '删除成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
