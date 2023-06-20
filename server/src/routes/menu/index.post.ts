import { sysMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await sysMenuServe.create(body);
    res.ok({
      message: '新增菜单成功',
    });
  } catch (error) {
    res.fail(error);
  }
};
