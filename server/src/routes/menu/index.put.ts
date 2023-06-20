import { sysMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    await sysMenuServe.update(req.body);
    res.ok({
      message: '修改成功',
    });
  } catch (error) {
    res.fail(error);
  }
};
