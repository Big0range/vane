import { formItemServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const formCode = req.query.form_code as string;
    const version = req.query.version ? Number(req.query.version) : undefined;
    const result = await formItemServe.list(formCode, version);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
