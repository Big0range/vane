import type { Request, Response } from 'express';
import { sysMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    // 根据角色id去查询菜单列表
    const menuList = await sysMenuServe.findAllMenu();

    res.ok({
      data: menuList,
    });
  } catch (error: any) {
    res.fail(error);
  }
};
