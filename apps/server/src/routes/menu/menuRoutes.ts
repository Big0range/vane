import type { Request, Response } from 'express';
import { sysMenuRoutesServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const menuId = req.query.menuId as unknown as string;
    if (!menuId) {
      throw new Error('menuId不能为空');
    }
    const result = await sysMenuRoutesServe.getByMenuId(Number(menuId));
    res.ok({
      data: result.rows.map((item) => item.route_id),
    });
  } catch (error: any) {
    res.fail(error);
  }
};
