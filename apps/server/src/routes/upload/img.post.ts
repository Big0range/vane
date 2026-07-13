import fs from 'fs';
import path from 'path';
import COS from 'cos-nodejs-sdk-v5';
import type { Request, Response } from 'express';
import { uploadImg } from '#/middlewares/upload.ts';

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: process.env.COS_SECRET_KEY, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});
export default async function (req: Request, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('请上传图片');
    }
    cos.putObject(
      {
        Bucket: process.env.COS_BUCKET /* 必须 */,
        Region: process.env.COS_REGION /* 必须 */,
        Key: `/images/${file.filename}` /* 必须 */,
        StorageClass: 'STANDARD',
        Body: fs.createReadStream(
          path.resolve(import.meta.dirname, '../../../uploads/images', file.filename),
        ), // 上传文件对象
      },
      function (err, data) {
        fs.unlinkSync(path.resolve(import.meta.dirname, '../../../uploads/images', file.filename));
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
  } catch (error: any) {
    res.fail(error);
  }
}

export const middleware = [uploadImg.single('file')];
