import type { Request, Response } from 'express';
import { tableTemplateRowServe } from '#/serve/index.ts';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const code = req.params.code as string;
    const visible = req?.body?.visible as boolean;
    const result = await tableTemplateRowServe.getByCode(code, visible);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
