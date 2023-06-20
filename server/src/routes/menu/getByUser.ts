import { sysUserServe, sysRoleMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const user = await sysUserServe.findById(req.userInfo.id);
    if (user.role_id === null) {
      res.ok({
        data: [],
      });
      return;
    }
    // 根据角色id去查询菜单列表
    const menuList = await sysRoleMenuServe.findMenuListByRoleId(user.role_id);

    res.ok({
      data: menuList,
    });
  } catch (error) {
    res.fail(error);
  }
};
