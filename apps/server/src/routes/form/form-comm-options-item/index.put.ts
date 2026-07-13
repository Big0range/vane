import { formCommOptionsItemServe, type FormCommOptionsItem } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const { id, label, value, comm_options_code } = req.body as FormCommOptionsItem;
    if (!id || !label || value === undefined || !comm_options_code) {
      throw new Error('id, label, value, comm_options_code is empty');
    }
    await formCommOptionsItemServe.updateById(id, { label, value, comm_options_code });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
