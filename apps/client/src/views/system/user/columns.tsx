import {
  type DataTableColumns,
  NButton,
  NSwitch,
  NSpace,
  NPopconfirm,
} from 'naive-ui';
import dayjs from 'dayjs';
import { CreateOutline, TrashOutline } from '@vicons/ionicons5';

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
interface IColumnProps {
  loadingStatus: Set<number>;
  changeUserStatus: (id: number, index: number) => void;
  operation: (type: any, row?: IColumn) => void;
}
export const createColumns = ({
  loadingStatus,
  changeUserStatus,
  operation,
}: IColumnProps): DataTableColumns<IColumn> => {
  return [
    {
      title: '序号',
      width: 60,
      key: 'index',
      align: 'center',
      fixed: 'left',
      render: (row, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'ID',
      key: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '用户名',
      key: 'username',
      align: 'center',
      minWidth: 200,
    },
    {
      title: '角色',
      key: 'role',
      align: 'center',
      minWidth: 200,
      render: row => {
        return <div>{row.role?.name || '-'}</div>;
      },
    },
    {
      title: '账号状态',
      key: 'status',
      align: 'center',
      minWidth: 120,
      render: (row, index) => {
        return (
          <NSwitch
            rail-style={({ checked }: { checked: boolean }) =>
              checked ? undefined : { backgroundColor: '#d03050' }
            }
            checkedValue={0}
            uncheckedValue={1}
            rubberBand={false}
            value={row.status}
            disabled={row.username === 'admin'}
            loading={loadingStatus.has(index)}
            onUpdate:value={() => changeUserStatus(Number(row.id), index)}
          >
            {{
              checked: () => '启用',
              unchecked: () => '禁用',
            }}
          </NSwitch>
        );
      },
    },
    {
      title: '创建时间',
      key: 'create_time',
      align: 'center',
      minWidth: 200,
      render: row => {
        return (
          <div>
            {dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss') || '-'}
          </div>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center',
      fixed: 'right',
      render: row => {
        return (
          <NSpace justify="center">
            <NButton
              type="primary"
              size="small"
              ghost
              disabled={row.username === 'admin'}
              bordered={false}
              onClick={() => operation('edit', row)}
            >
              {{
                default: () => '编辑',
                icon: () => <CreateOutline />,
              }}
            </NButton>
            <NPopconfirm onPositiveClick={() => operation('delete', row)}>
              {{
                trigger: () => (
                  <NButton
                    bordered={false}
                    type="error"
                    size="small"
                    ghost
                    disabled={row.username === 'admin'}
                  >
                    {{
                      default: () => '删除',
                      icon: () => <TrashOutline />,
                    }}
                  </NButton>
                ),
                default: () => <>是否确认删除?</>,
              }}
            </NPopconfirm>
          </NSpace>
        );
      },
    },
  ];
};
