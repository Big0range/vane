import { sysRoleServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const user = req.userInfo;
    let role: any;
    if (user.role_id !== null) {
      role = await sysRoleServe.findById(user.role_id);
    }
    res.ok({
      data: {
        ...user,
        password: undefined,
        role_name: role?.role_name || null,
      },
    });
  } catch (error) {
    res.fail(error);
  }
};
