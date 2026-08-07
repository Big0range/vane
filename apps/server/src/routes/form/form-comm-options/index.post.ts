import { formCommOptionsServe, type FormCommOptions } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code } = req.body as FormCommOptions;
    if (!name || !code) {
      throw new Error('name, code is empty');
    }
    await formCommOptionsServe.create({ name, code });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
