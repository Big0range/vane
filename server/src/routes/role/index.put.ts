import { sysRoleServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await sysRoleServe.update(body.id, body);
    res.ok();
  } catch (error) {
    res.fail(error);
  }
};
