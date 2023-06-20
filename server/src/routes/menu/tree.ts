import { sysMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    // 根据角色id去查询菜单列表
    const menuList = await sysMenuServe.findAllMenu();

    res.ok({
      data: menuList,
    });
  } catch (error) {
    res.fail(error);
  }
};
