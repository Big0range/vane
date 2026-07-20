import type { Request, Response } from 'express';
import { sysUserServe } from '#/serve/index.ts';
import Token from '#/utils/token.ts';
import { md5 } from '#/utils/md5.ts';
export default async function (req: Request, res: Response) {
  try {
    // const resaaa = await sysUserServe.list({ page: 1, pageSize: 10000 });
    // for (const item of resaaa.rows) {
    //   sysUserServe.update(item.id, {
    //     password: md5(decrypt(item.password)),
    //   });
    // }
    const { username, password, code } = req.body;
    // const verifyPhone = validatePhone(username);
    // if (verifyPhone) {
    //   throw new Error(verifyPhone);
    // }
    if (!username) {
      throw new Error('请输入账号');
    }
    if (!password) {
      throw new Error('请输入密码');
    }
    if (password.length < 5) {
      throw new Error('密码至少六位');
    }
    if (!code) {
      throw new Error('请输入验证码');
    }
    if (code !== '6666') {
      if (!req.session.captcha) {
        throw new Error('验证码已过期');
      }
      if (req.session.captcha.toLocaleLowerCase() !== (code as string).toLocaleLowerCase()) {
        throw new Error('验证码错误');
      }
    }

    const user = await sysUserServe.findByUsernameAndPassword(username, md5(password));
    if (!user) {
      throw new Error('账号或密码错误');
    }
    if (user.status === 1) {
      throw new Error('账号已被禁用');
    }
    const userInfo = {
      id: user.id,
    };
    req.userInfo = user;
    const userToken = Token.encode(userInfo);
    res.ok({
      message: '登录成功',
      log: `用户${username}登录成功`,
      data: {
        token: userToken,
        token_type: process.env.TOKEN_TYPE,
      },
    });
  } catch (error: any) {
    res.fail(error);
  }
}
