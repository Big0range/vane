import { formDataJsonServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userInfo?.id;
    const id = Number(req.params.id);
    if (!userId) {
      throw new Error('user not found');
    }
    if (!id) {
      throw new Error('id is empty');
    }

    const result = await formDataJsonServe.getByIdAndUser(id, userId);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
