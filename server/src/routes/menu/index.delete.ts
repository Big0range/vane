import { sysMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const ids = ((req.body.ids as string) || '').split(',');
    await sysMenuServe.deleteByIds(ids);
    res.ok({
      message: '删除成功',
    });
  } catch (error) {
    res.fail(error);
  }
};
