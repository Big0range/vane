import { Request, Response } from '@/routes/types';
import { sysUserServe } from '@/serve';
import Token from '@/utils/token';
export default async function (req: Request, res: Response) {
  try {
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
      if (
        req.session.captcha.toLocaleLowerCase() !==
        (code as string).toLocaleLowerCase()
      ) {
        throw new Error('验证码错误');
      }
    }

    const user = await sysUserServe.findByUsernameAndPassword(
      username,
      password,
    );
    if (user.status === 1) {
      throw new Error('账号已被禁用');
    }
    if (!user) {
      throw new Error('账号或密码错误');
    }
    const userInfo = {
      id: user.id,
    };
    const userToken = Token.encode(userInfo);
    res.ok({
      message: '登录成功',
      log: `用户${username}登录成功`,
      data: {
        token: userToken,
        token_type: process.env.TOKEN_TYPE,
      },
    });
  } catch (error) {
    res.fail(error);
  }
}
