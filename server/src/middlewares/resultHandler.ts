import { Response, NextFunction, Request } from '../routes/types';
import { sysLogsServe } from '../serve';
import { isPrivateIP } from '../utils/isPrivateIP';
// 排除的url ['/logs:get']
const excludeUrl: string[] = [];
export const resultHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const addLogs = async (logMsg: string, status: number) => {
    if (!logMsg) return;
    const ip = req.ip.replace('::ffff:', '');
    // if (isPrivateIP(ip)) return;
    // url + method
    const um = `${req.url.split('?')[0]}:${req.method.toLocaleLowerCase()}`;
    // 如果是排除的url 就不记录日志
    if (excludeUrl.includes(um)) return;
    // 写入数据库
    await sysLogsServe.create({
      ip: ip,
      status,
      response_time: Date.now() - req.startTime,
      msg: logMsg || statusMsg[status],
      user_id: req?.userInfo?.id,
      role_id: req?.userInfo?.role_id,
      url: req.url.split('?')[0],
      method: req.method.toLocaleLowerCase(),
      query: JSON.stringify(req.query),
      body: JSON.stringify(req.body),
    });
  };
  // 状态码对应的msg
  const statusMsg: Record<number, string> = {
    200: 'success',
    400: 'bad request',
    401: 'unauthorized',
    403: 'forbidden',
    404: 'not found',
    500: 'internal server error',
  };
  // 成功的方法
  res.ok = async (arg = {}) => {
    const { status = 200, data, log, raw } = arg;
    let message = arg.message;
    if (message === undefined) {
      message = statusMsg[status] || 'success';
    }
    // 写入日志  如果没有传入log 就用message
    await addLogs(log === true ? message : '', status);
    res.status(status);
    if (raw) {
      res.send(data);
    } else {
      res.send({
        code: status === 200 ? 0 : status,
        message,
        data,
      });
    }
  };
  // 失败的方法
  res.fail = async (arg = {}) => {
    console.log('res.fail', arg);
    const { status = 500, data, log } = arg;
    let message = arg.message;
    if (message === undefined) {
      message = statusMsg[status] || 'fail';
    }
    // 为了能让logger中间件获取到message
    res.locals.message = message;
    // 写入日志  如果没有传入log 就用message
    await addLogs(log, status);
    res.status(status).send({
      code: status === 200 ? 0 : status,
      message,
      data,
    });
  };
  next();
};
