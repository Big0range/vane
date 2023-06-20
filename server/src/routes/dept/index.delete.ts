import { Request, Response } from '@/routes/types';
import { deptServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const id: string = ((req.query.id as string) || '').trim();
    if (!id || id === '') {
      throw new Error('id不能为空');
    }
    await deptServe.deleteByIds(id.split(','));
    res.ok({
      message: '删除成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
