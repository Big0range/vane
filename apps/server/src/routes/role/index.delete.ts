import type { Request, Response } from 'express';
import { sysUserServe, sysRoleServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    await sysRoleServe.deleteById(Number(id));
    await sysUserServe.updateByRoleId(Number(id), { role_id: null });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
