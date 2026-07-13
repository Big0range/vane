import type { Request, Response } from 'express';
import { sysMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    await sysMenuServe.update(req.body);
    res.ok({
      message: '修改成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
