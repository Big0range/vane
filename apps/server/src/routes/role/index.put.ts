import type { Request, Response } from 'express';
import { sysRoleServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await sysRoleServe.update(body.id, body);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
