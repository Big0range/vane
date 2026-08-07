import type { Request, Response } from 'express';
import { sysRoleServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const { role_name, role_desc } = req.body;
    await sysRoleServe.create({
      role_name,
      role_desc,
    } as any);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
