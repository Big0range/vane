import { formServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const code = req.query.code as string;
    const result = await formServe.deleteByCode(code);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
