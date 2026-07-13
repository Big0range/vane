import { formCommOptionsItemServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.body.id);
    if (!id) {
      throw new Error('id is empty');
    }
    await formCommOptionsItemServe.deleteById(id);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
