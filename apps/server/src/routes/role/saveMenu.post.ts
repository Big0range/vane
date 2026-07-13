import type { Request, Response } from 'express';
import { sysMenuRoutesServe, sysRoleMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const { roleId, menuIds } = req.body;
    const list = menuIds.split(',').map((menuId: number) => {
      return {
        role_id: roleId,
        menu_id: menuId,
      };
    });
    await sysRoleMenuServe.deleteByRoleId(roleId);
    await sysRoleMenuServe.bulkCreate(list);
    await sysRoleMenuServe.clearRedis(roleId);
    await sysMenuRoutesServe.clearRedis();
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
