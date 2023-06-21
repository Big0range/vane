import { Router, Request, Response, NextFunction } from '@/routes/types';

export default async function (req: Request, res: Response): Promise<void> {
  res.ok({
    data: 123,
    raw: true,
  });
}
