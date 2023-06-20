import { Request, Response } from '@/routes/types';
import xlsx from 'node-xlsx';
export default async function (req: Request, res: Response): Promise<void> {
  const data = [
    ['姓名', '性别', '年龄', '注册时间'],
    ['张三', '男', '18', '2014-02-19'],
    ['李四', '女', '22', '2015-02-19'],
    ['王五', '男', '25', '2013-02-19'],
  ];
  const sheetOptions = {
    '!cols': [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 15 }],
  };
  const buffer = xlsx.build([
    { name: 'demo', data: data, options: sheetOptions },
  ]); // Returns a buffer
  res.ok({ data: buffer, raw: true });
}
