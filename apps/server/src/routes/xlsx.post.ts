import ExcelJS from 'exceljs';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet('demo');

  worksheet.columns = [
    { header: '姓名', key: 'name', width: 10 },
    { header: '性别', key: 'gender', width: 10 },
    { header: '年龄', key: 'age', width: 10 },
    { header: '注册时间', key: 'registerTime', width: 20 },
  ];

  worksheet.addRows([
    {
      name: '张三',
      gender: '男',
      age: 18,
      registerTime: '2014-02-19',
    },
    {
      name: '李四',
      gender: '女',
      age: 22,
      registerTime: '2015-02-19',
    },
    {
      name: '王五',
      gender: '男',
      age: 25,
      registerTime: '2013-02-19',
    },
  ]);

  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

  res.ok({
    data: buffer,
    raw: true,
  });
}
