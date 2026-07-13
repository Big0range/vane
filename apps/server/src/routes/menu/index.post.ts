import type { Request, Response } from 'express';
import { sysMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await sysMenuServe.create(body);
    res.ok({
      message: '新增菜单成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
