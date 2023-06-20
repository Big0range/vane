import { sysRoleServe, TRole } from '@/serve';
import dayjs from 'dayjs';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const { page, pageSize, notPage } = req.query;
    let result: any = [];
    if (notPage === 'true') {
      result = await sysRoleServe.findAll({});
    } else {
      result = await sysRoleServe.findAll(Number(page), Number(pageSize));
    }
    result.rows.forEach((item: TRole) => {
      item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
      item.update_time = dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss');
    });

    res.ok({
      data: result,
    });
  } catch (error) {
    res.fail(error);
  }
};
