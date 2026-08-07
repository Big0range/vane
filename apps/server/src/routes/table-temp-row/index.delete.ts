import type { Request, Response } from 'express';
import { tableTemplateRowServe } from '#/serve/index.ts';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.body.id;
    await tableTemplateRowServe.deleteById(id);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
