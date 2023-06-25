import { Request, Response } from '@/routes/types';
import { sysRoutesServe } from '@/serve';
export default async function (req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;
    const id = body.id;
    const auth = body.auth;
    if (!id) {
      throw new Error('id不能为空');
    }
    if (!auth) {
      throw new Error('auth不能为空');
    }

    await sysRoutesServe.updateAuth(id, auth);
    res.ok();
  } catch (error) {
    res.fail({
      message: error.message,
    });
  }
}
