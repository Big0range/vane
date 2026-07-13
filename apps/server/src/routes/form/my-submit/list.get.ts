import { formDataJsonServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const userId = req.userInfo?.id;
    if (!userId) {
      throw new Error('user not found');
    }

    const query = req.query as any as PageQueryParam & { form_code?: string };
    const result = await formDataJsonServe.listByUser(query, userId);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
