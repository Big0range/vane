import type { Request, Response } from 'express';
import { sysMenuServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const {
      name,
      title,
      permission,
      path,
      component,
      redirect,
      affix,
      parent_id,
      hidden,
      icon,
      keep_alive,
      sort,
      type,
      routes,
    } = req.body;
    await sysMenuServe.create({
      name,
      title,
      permission,
      path,
      component,
      redirect,
      affix,
      parent_id,
      hidden,
      icon,
      keep_alive,
      sort,
      type,
      routes,
    } as any);
    res.ok({
      message: '新增菜单成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
