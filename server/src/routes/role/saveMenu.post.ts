import { sysRoleMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
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
    res.ok();
  } catch (error) {
    res.fail(error);
  }
};
