import { Request, Response } from '@/routes/types';
import { uploadImg } from '@/middlewares/upload';
import fs from 'fs';
import COS from 'cos-nodejs-sdk-v5';
import path from 'path';
const cos = new COS({
  SecretId: process.env.COS_SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: process.env.COS_SECRET_KEY, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});
export default async function (req: Request, res: Response) {
  try {
    if (!req.file) {
      throw new Error('请上传图片');
    }
    cos.putObject(
      {
        Bucket: process.env.COS_BUCKET /* 必须 */,
        Region: process.env.COS_REGION /* 必须 */,
        Key: `/images/${req.file.filename}` /* 必须 */,
        StorageClass: 'STANDARD',
        Body: fs.createReadStream(
          path.resolve(__dirname, '../../../uploads/images', req.file.filename),
        ), // 上传文件对象
      },
      function (err, data) {
        fs.unlinkSync(
          path.resolve(__dirname, '../../../uploads/images', req.file.filename),
        );
        if (err) {
          res.fail(err);
        } else {
          res.ok({
            message: '上传成功',
            data: data.Location.split('/images/')[1],
          });
        }
      },
    );
  } catch (error) {
    res.fail(error);
  }
}

export const middleware = [uploadImg.single('file')];
