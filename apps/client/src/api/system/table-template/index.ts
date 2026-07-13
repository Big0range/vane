import request from '@/utils/request';

/**
 * 获取表格模板列表
 */
export function getTableTemplateListApi(
  params: GetTableTemplateListParams,
): Promise<GetTableTemplateListResult> {
  return request({
    url: '/table-temp/list',
    method: 'get',
    params,
  });
}
/**
 * 新增表格模板
 */
export function addTableTemplateApi(
  data: AddTableTemplateData,
): Promise<Result> {
  return request({
    url: '/table-temp',
    method: 'post',
    data,
  });
}

/**
 * 修改表格模板
 */
export function updateTableTemplateApi(
  data: AddTableTemplateData,
): Promise<Result> {
  return request({
    url: '/table-temp',
    method: 'put',
    data,
  });
}
/**
 * 删除表格模板
 */
export function deleteTableTemplateApi(id: number): Promise<Result> {
  return request({
    url: `/table-temp`,
    method: 'delete',
    data: {
      id,
    },
  });
}

/**
 * 根据模板code查询表格模板详情
 */
export function getTableTemplateByCodeApi(
  code: string,
  visible?: boolean,
): Promise<GetTableTemplateRowByCodeResult> {
  return request({
    url: `/table-temp-row/${code}`,
    method: 'post',
    data: {
      visible,
    },
  });
}

/**
 * 修改模板详情Row
 */
export function updateTableTemplateRowApi(
  data: UpdateTableTemplateRowApiData,
): Promise<Result> {
  return request({
    url: `/table-temp-row`,
    method: 'put',
    data,
  });
}

/**
 * 新增模板详情Row
 */
export function addTableTemplateRowApi(
  data: UpdateTableTemplateRowApiData,
): Promise<Result> {
  return request({
    url: `/table-temp-row`,
    method: 'post',
    data,
  });
}
