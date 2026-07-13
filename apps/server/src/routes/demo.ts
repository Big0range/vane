import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  res.ok({
    data: 123456,
    raw: true,
  });
}
