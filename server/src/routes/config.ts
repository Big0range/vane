import { Request, Response } from '@/routes/types';
import os from 'os';
export default async function (req: Request, res: Response): Promise<void> {
  try {
    res.ok({
      data: {
        NODE_ENV: process.env.NODE_ENV,
        cpu核心数: os.cpus().length,
        cpu架构: os.arch(),
        空闲内存: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)}G`,
        总内存: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}G`,
        主机名: os.hostname(),
        平台: os.platform(),
        发行版本: os.release(),
        临时目录: os.tmpdir(),
        运行时间: `${(os.uptime() / 60 / 60 / 24).toFixed(2)}天`,
        用户信息: os.userInfo(),
        pid: process.pid,
        cpu信息: os.cpus(),
      },
    });
  } catch (error) {
    res.fail(error);
  }
}
