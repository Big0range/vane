import { sysUserServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const ids = req.body.ids;
    await sysUserServe.update(ids, {
      del_flag: 1,
    });
    res.ok({
      message: '用户删除成功',
    });
  } catch (error) {
    res.fail(error);
  }
};
