import { Request, Response } from '@/routes/types';
import svgCaptcha from 'svg-captcha';
export default async (req: Request, res: Response) => {
  try {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度为 6
      noise: 4, // 干扰线条数为 4
      fontSize: 50, // 字体大小为 60
      // color: true, // 验证码的字符将有颜色，默认为 false
      // background: '#eee', // 验证码图片背景颜色
      width: 150, // 验证码图片宽度
      height: 40, // 验证码图片高度
    });
    // captcha.text: 验证码字符串
    // captcha.data: 验证码 SVG 图片数据
    req.session.captcha = captcha.text;
    res.type('svg');
    res.ok({
      data: captcha.data,
      raw: true,
    });
  } catch (error) {
    res.fail(error);
  }
};
