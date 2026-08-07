import { formServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';
import type { Form } from '#/serve/index.ts';
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const code = req.query.code as string;
    const { option } = req.body as Form;
    await formServe.updateFormOptions(code, { option });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
