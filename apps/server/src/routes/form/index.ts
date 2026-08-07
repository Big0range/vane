import { formServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const code = req.query.code as string;
    const version = req.query.version ? Number(req.query.version) : undefined;
    const result = await formServe.getByCode(code, version);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
