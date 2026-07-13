import { tableTemplateServe, type TableTemplate } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as Omit<TableTemplate, 'id' | 'create_time' | 'update_time'>;
    if (!body.name) {
      throw new Error('name is empty');
    }
    await tableTemplateServe.create(body);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
