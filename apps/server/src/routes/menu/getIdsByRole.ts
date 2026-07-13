import type { Request, Response } from 'express';
import { sysRoleMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const roleId = req.query.roleId || req.userInfo.role_id;
    if (!roleId) {
      throw new Error('roleId不能为空');
    }
    const result = await sysRoleMenuServe.getMenuIdsByRoleId(Number(roleId));
    res.ok({
      data: result,
    });
  } catch (error: any) {
    res.fail(error);
  }
};
