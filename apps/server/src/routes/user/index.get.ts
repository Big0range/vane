import type { Request, Response } from 'express';
import { sysRoleServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const user = req.userInfo;
    let role: any;
    if (user.role_id !== null) {
      role = await sysRoleServe.findById(user.role_id);
    }
    res.ok({
      data: {
        ...user,
        password: undefined,
        role_name: role?.role_name || null,
      },
    });
  } catch (error: any) {
    res.fail(error);
  }
};
