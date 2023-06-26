import { sysUserServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const ids: number[] = req.body.ids || [];
    if (ids.length === 0) {
      throw new Error('请选择需要删除的用户');
    }
    const findUser = await sysUserServe.findOne({
      username: 'admin',
    });
    if (ids.some(id => id == findUser.id)) {
      throw new Error('admin用户不可删除');
    }
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
