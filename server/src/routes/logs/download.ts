import { Request, Response } from '@/routes/types';
import xlsx from 'node-xlsx';
import dayjs from 'dayjs';
import { sysLogsServe } from '@/serve';
export default async function (req: Request, res: Response): Promise<void> {
  const data = [
    // eslint-disable-next-line prettier/prettier
    ['状态码', '用户', '角色', 'msg','IP','请求方式','请求路径','请求参数','请求体','响应时间','创建时间'],
  ];
  try {
    const query = req.query as Record<string, any>;
    query.pageSize = query.pageSize || 999999999;

    if (query.type === 'selected') {
      query.id = (query.ids as string).split(',');
    }
    const result = await sysLogsServe.list(query);
    result.rows.forEach(item => {
      data.push([
        `${item.status}`,
        item.username,
        item.role_name,
        item.msg,
        item.ip,
        item.method,
        item.url,
        item.query,
        item.body,
        `${item.response_time}`,
        dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss'),
      ]);
    });
    const sheetOptions = {
      // eslint-disable-next-line prettier/prettier
      '!cols': [{ wch: 6 }, { wch: 7 }, { wch: 6 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 20 }],
    };
    const buffer = xlsx.build([
      { name: 'logs', data: data, options: sheetOptions },
    ]);
    res.ok({ data: buffer, raw: true, log: '日志下载成功' });
  } catch (error) {
    console.log(error);
    res.fail({
      ...error,
      log: '日志下载失败',
    });
  }
}
