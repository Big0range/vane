import type { Request, Response } from 'express';
import { deptServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const id: string = ((req.query.id as string) || '').trim();
    if (!id || id === '') {
      throw new Error('id不能为空');
    }
    await deptServe.deleteByIds(id.split(','));
    res.ok({
      message: '删除成功',
    });
  } catch (error: any) {
    res.fail(error);
  }
};
