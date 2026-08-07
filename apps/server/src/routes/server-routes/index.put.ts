import type { Request, Response } from 'express';
import { sysRoutesServe } from '#/serve/index.ts';
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const id = body.id;
    const auth = body.auth;
    if (!id) {
      throw new Error('id不能为空');
    }
    if (!auth) {
      throw new Error('auth不能为空');
    }

    await sysRoutesServe.updateAuth(id, auth);
    res.ok();
  } catch (error: any) {
    res.fail({
      message: error.message,
    });
  }
};
