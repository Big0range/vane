import type { Request, Response } from 'express';
import { tableTemplateServe } from '#/serve/index.ts';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const id = req.body.id;
    await tableTemplateServe.deleteById(id);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
