import { Request, Response } from '@/routes/types';
import { TUser, sysUserServe } from '@/serve';
import { isPhoneNumber } from '@/utils/validate';

export default async (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const
  let { password, role_id, avatar, phone, shop_id, dept_id, id, username } =
    req.body as TUser;
  const selfId = req.userInfo.id;
  const userId = id === undefined ? selfId : id;
  try {
    const verify = isPhoneNumber(phone);
    if (verify) {
      throw new Error(verify);
    }
    const findUser = await sysUserServe.findOne({
      username,
      del_flag: 0,
    });
    if (findUser.username === 'admin') {
      username = undefined;
      role_id = undefined;
    }
    if (findUser && findUser.id !== userId) {
      throw new Error('用户名已存在');
    }

    const user = await sysUserServe.findById(userId);
    // console.log(user.password, password, user.username, username, userId);
    // 修改了密码和用户名 都需要重新登录
    if (user.password !== password || user.username !== username) {
      await sysUserServe.logout(userId);
    }
    await sysUserServe.update(userId, {
      password,
      shop_id,
      dept_id,
      role_id,
      avatar,
      phone,
      username,
    });
    res.ok({
      log: `修改了用户(${username})的信息`,
    });
  } catch (error) {
    res.fail({
      ...error,
      log: `修改用户(id:${userId})信息失败`,
    });
  }
};
