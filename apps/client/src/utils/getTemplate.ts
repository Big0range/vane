import { getTableTemplateByCodeApi } from '@/api/system/table-template';

/**
 * 获取表格模板
 */
export async function getTableTemplate(
  /**模板编码 */
  code: string,
  /**是否可见 null 就是全部 */
  visible: boolean | null = true,
) {
  const result = await getTableTemplateByCodeApi(
    code,
    visible === null ? undefined : visible,
  );
  return result.data.rows.map(item => ({
    ...item,
    ellipsis:
      item.ellipsis === 1
        ? {
            tooltip: {
              width: 'trigger',
            },
          }
        : false,
  }));
}
