import * as jwt from 'jsonwebtoken';
import redis from './redis';
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
class Token {
  /**
   * 编码token
   * @param user  用户信息
   * @returns  token
   */
  encode(user: { id: string | number; [key: string]: any }) {
    const { id } = user;
    const token = jwt.sign(user, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 365,
      algorithm: 'RS256',
    });
    redis.set(`tokens:${id}`, token);
    redis.expire(`tokens:${id}`, 60 * 60 * 24 * 10);
    return token;
  }

  /**
   * 解码token
   * @param token  token
   * @returns  解码后的用户信息
   */
  async decode(token: string) {
    try {
      const user: any = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256'],
      });
      const redisToken = await redis.get(`tokens:${user.id}`);
      if (redisToken !== token || redisToken === null) {
        console.log('redis中不存在此token 此时应该去登录');
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }

  async logout(id: string | number) {
    await redis.del(`tokens:${id}`);
  }
}

export default new Token();
