import {
  type DataTableColumns,
  NButton,
  NPopconfirm,
  NSpace,
  NTag,
} from 'naive-ui';

interface IShopColumn {
  parent_id: string;
  id: string;
  name: string;
  desc: string;
  status: number;
  sort: number;
}
export const getShopColumns = (
  openDialog: any,
  handleDelete: any,
): DataTableColumns<IShopColumn> => {
  return [
    {
      type: 'selection',
      width: 50,
      fixed: 'left',
    },
    {
      title: '部门名称',
      key: 'name',
      minWidth: 200,
    },
    {
      title: '部门描述',
      key: 'desc',
      align: 'center',
      minWidth: 200,
    },
    {
      title: '部门状态',
      key: 'status',
      align: 'center',
      width: 100,
      render: row => {
        return (
          <div>
            {row.status === 0 ? (
              <NTag type="success">正常</NTag>
            ) : (
              <NTag type="error">停用</NTag>
            )}
          </div>
        );
      },
    },
    {
      title: '排序',
      key: 'sort',
      align: 'center',
      width: 100,
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
              bordered={false}
              onClick={() => openDialog(row.id)}
            >
              {{
                default: () => '新增',
              }}
            </NButton>
            <NButton
              type="primary"
              size="small"
              ghost
              bordered={false}
              onClick={() => openDialog(row.parent_id, row.id, row)}
            >
              {{
                default: () => '编辑',
              }}
            </NButton>
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                trigger: () => (
                  <NButton bordered={false} type="error" size="small" ghost>
                    {{
                      default: () => '删除',
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
