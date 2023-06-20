import { sysUserServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    if (req.body.id === undefined) {
      res.fail({
        message: 'id 不能为空',
      });
      return;
    }
    if (isNaN(id)) {
      res.fail({
        message: 'id 参数错误',
      });
      return;
    }

    const user = await sysUserServe.findById(id);
    await sysUserServe.update(id, {
      status: user.status === 1 ? 0 : 1,
    });
    // 之前是启用状态,改为禁用的话需要清除token,踢出用户下线
    if (user.status === 0) {
      await sysUserServe.logout(req.body.id);
    }
    res.ok({});
  } catch (error) {
    res.fail(error);
  }
};
