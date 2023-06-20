import { sysUserServe } from '@/serve/sys/user.serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo.id;
    const { screen_lock, password } = req.body;
    if (![0, 1].includes(screen_lock)) {
      throw new Error('screen_lock 参数错误');
    }
    if (screen_lock === 0) {
      if (!password) {
        throw new Error('请输入密码');
      }
      if (password !== req.userInfo.password) {
        throw new Error('密码错误');
      }
    }

    await sysUserServe.update(userId, {
      screen_lock,
    });
    res.ok();
  } catch (error) {
    res.fail(error);
  }
};
