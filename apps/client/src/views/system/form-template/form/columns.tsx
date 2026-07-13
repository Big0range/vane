import dayjs from 'dayjs';
import type { DataTableColumns } from 'naive-ui';

export const columns: DataTableColumns = [
  {
    title: 'ID',
    key: 'id',
    width: 50,
  },
  {
    title: '模板名称',
    key: 'title',
    width: 150,
  },
  {
    title: '模板编码',
    key: 'code',
    width: 200,
  },
  {
    title: '模板描述',
    key: 'desc',
    width: 200,
  },
  {
    title: '创建时间',
    key: 'create_time',
    width: 180,
    render: (row: any) => {
      return dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '修改时间',
    key: 'update_time',
    width: 180,
    render: (row: any) => {
      return dayjs(row.update_time).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '操作',
    key: 'operation',
    width: 250,
  },
];
