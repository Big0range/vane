import { Router, Request, Response, NextFunction } from '@/routes/types';

export default async function (req: Request, res: Response): Promise<void> {
  // next({
  //     status: 500,
  //     message: "hahahahahahahahahahahahaahah",
  // });
  // console.log('req.body,', req.body);
  res.ok({
    data: req.params,
  });
}
