import { type DataTableColumns } from 'naive-ui';
import dayjs from 'dayjs';

interface IColumn {
  username: string;
  id: string;
  role: {
    name: string;
    id: number;
  };
  status: number;
  create_time: string;
  phone: string;
}
export const createColumns = (): DataTableColumns<IColumn> => {
  return [
    {
      type: 'selection',
    },
    {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 60,
      render: (row, index) => {
        return index + 1;
      },
    },
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      width: 60,
    },
    {
      title: '状态码',
      key: 'status',
      align: 'center',
      width: 70,
      render: row => {
        return (
          <n-gradient-text type={row.status <= 400 ? 'success' : 'error'}>
            {row.status}
          </n-gradient-text>
        );
      },
    },
    {
      title: '用户',
      key: 'username',
      align: 'center',
      width: 100,
    },
    {
      title: '角色',
      key: 'role_name',
      align: 'center',
      width: 80,
    },
    {
      title: '请求方式',
      key: 'method',
      align: 'center',
      width: 80,
    },
    {
      title: '请求路径',
      key: 'url',
      align: 'center',
    },
    {
      title: 'msg',
      key: 'msg',
      align: 'center',
      width: 200,
      // ellipsis: {
      //   tooltip: true,
      // },
    },
    {
      title: 'IP',
      key: 'ip',
      align: 'center',
    },
    {
      title: '请求参数',
      key: 'query',
      align: 'center',
      width: 300,
    },
    {
      title: '请求体',
      key: 'body',
      align: 'center',
      width: 300,
      // ellipsis: {
      //   tooltip: true,
      //   lineClamp: 4,
      // },
    },
    {
      title: '响应时间',
      key: 'response_time',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'create_time',
      align: 'center',
      fixed: 'right',
      render: row => {
        return dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];
};
