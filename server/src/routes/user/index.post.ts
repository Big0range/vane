import { Request, Response } from '@/routes/types';
import { TUser, sysUserServe } from '@/serve';
import { encryption } from '@/utils/encryption';
import { isPhoneNumber } from '@/utils/validate';
export default async function (req: Request, res: Response) {
  console.log(req.body);
  try {
    // eslint-disable-next-line prefer-const
    let { username, password, role_id, avatar, phone, shop_id, dept_id } =
      req.body as TUser;
    if (!username || username.length < 6) {
      throw new Error('用户名至少六位');
    }
    if (!password) {
      password = encryption(username.substring(username.length - 6));
    }
    const resultByUsername = await sysUserServe.findByUsername(username);
    if (resultByUsername) {
      throw new Error('该用户已注册');
    }
    const verify = isPhoneNumber(phone);
    if (verify) {
      throw new Error(verify);
    }
    await sysUserServe.create({
      username,
      password,
      role_id,
      shop_id,
      dept_id,
      avatar,
      phone,
    });
    res.ok({
      message: '添加用户成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
