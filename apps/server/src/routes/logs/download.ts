import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import type { Request, Response } from 'express';
import { sysLogsServe } from '#/serve/index.ts';
import { logger } from '#/utils/useLogger.ts';
export default async function (req: Request, res: Response): Promise<void> {
  try {
    const query = req.query as Record<string, any>;
    query.pageSize = query.pageSize || 999999999;

    if (query.type === 'selected') {
      query.id = (query.ids as string).split(',');
    }

    const result = await sysLogsServe.list(query);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('logs');

    worksheet.columns = [
      { header: '状态码', key: 'status', width: 8 },
      { header: '用户', key: 'username', width: 10 },
      { header: '角色', key: 'role_name', width: 10 },
      { header: 'msg', key: 'msg', width: 20 },
      { header: 'IP', key: 'ip', width: 18 },
      { header: '请求方式', key: 'method', width: 12 },
      { header: '请求路径', key: 'url', width: 30 },
      { header: '请求参数', key: 'query', width: 20 },
      { header: '请求体', key: 'body', width: 20 },
      { header: '响应时间', key: 'response_time', width: 12 },
      { header: '创建时间', key: 'create_time', width: 22 },
    ];

    result.rows.forEach((item) => {
      worksheet.addRow({
        status: item.status,
        username: item.username,
        role_name: item.role_name,
        msg: item.msg,
        ip: item.ip,
        method: item.method,
        url: item.url,
        query: item.query,
        body: item.body,
        response_time: item.response_time,
        create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss'),
      });
    });

    const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

    res.ok({
      data: buffer,
      raw: true,
      log: '日志下载成功',
    });
  } catch (error) {
    logger.error(error);

    res.fail({
      ...(error as object),
      log: '日志下载失败',
    });
  }
}
