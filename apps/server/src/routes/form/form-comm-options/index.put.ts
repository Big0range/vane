import { formCommOptionsServe, type FormCommOptions } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, code } = req.body as FormCommOptions;
    if (!id || !name || !code) {
      throw new Error('id, name, code is empty');
    }
    await formCommOptionsServe.updateById(id, { name, code });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
