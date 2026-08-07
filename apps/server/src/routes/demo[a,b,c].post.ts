import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  // next({
  //     status: 500,
  //     message: "hahahahahahahahahahahahaahah",
  // });
  // console.log('req.body,', req.body);
  req.baseUrl;
  res.ok({
    data: { params: req.params, url: req.url, method: req.method, path: req.route.path },
  });
};
