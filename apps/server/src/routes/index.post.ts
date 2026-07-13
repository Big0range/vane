import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  // next({
  //     status: 500,
  //     message: "hahahahahahahahahahahahaahah",
  // });
  // console.log('req.body,', req.body);
  res.ok({ data: 'HI~~~' });
}
