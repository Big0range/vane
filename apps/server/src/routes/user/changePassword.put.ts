import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
import { md5 } from '#/utils/md5.ts';
import Token from '#/utils/token.ts';
export default async function (req: Request, res: Response) {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    if (!old_password) {
      throw new Error('请输入原密码');
    }
    if (!new_password) {
      throw new Error('请输入新密码');
    }
    if (new_password.length < 5) {
      throw new Error('密码至少六位');
    }
    if (new_password !== confirm_password) {
      throw new Error('两次输入的新密码不一致');
    }
    if (md5(old_password) !== req.userInfo.password) {
      throw new Error('原密码错误');
    }
    if (old_password === new_password) {
      throw new Error('新密码不能与原密码相同');
    }

    await sysUserServe.update(req.userInfo.id, {
      password: md5(new_password),
    });
    await Token.logout(req.userInfo.id);
    res.ok({ message: '密码修改成功，请重新登录' });
  } catch (error: any) {
    res.fail(error);
  }
}
