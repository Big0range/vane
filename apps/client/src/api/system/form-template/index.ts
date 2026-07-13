import request from '@/utils/request';

/**
 * 获取表单模板列表
 */
export function getFormTemplateListApi(
  params: GetFormTemplateListParams,
): Promise<GetFormTemplateListResult> {
  return request({
    url: '/form/list',
    method: 'get',
    params,
  });
}

/**
 * 根据模板code查询表单模板详情
 */
export function getFormTemplateByCodeApi(
  code: string,
  version?: number,
): Promise<Result<FormTemplate | null>> {
  return request({
    url: `/form`,
    method: 'get',
    params: { code, version },
  });
}

export function addFormTemplateApi(data: AddFormTemplateData): Promise<Result> {
  return request({
    url: `/form`,
    method: 'post',
    data,
  });
}

/**
 * 删除表单模板
 */
export function deleteFormTemplateApi(code: string): Promise<Result> {
  return request({
    url: `/form`,
    method: 'delete',
    params: { code },
  });
}

/**
 * 更新表单基本信息
 */
export function updateFormTemplateBaseApi(
  code: string,
  data: FormTemplateBase,
): Promise<Result> {
  return request({
    url: `/form/update/base`,
    method: 'put',
    params: { code },
    data,
  });
}

/**
 * 更新表单rule
 */
export function updateFormTemplateRuleApi(
  code: string,
  data: Pick<FormTemplate, 'rule'>,
): Promise<Result> {
  return request({
    url: `/form/update/rule`,
    method: 'put',
    params: { code },
    data,
  });
}

/**
 * 更新表单option
 */
export function updateFormTemplateOptionApi(
  code: string,
  data: Pick<FormTemplate, 'option'>,
): Promise<Result> {
  return request({
    url: `/form/update/option`,
    method: 'put',
    params: { code },
    data,
  });
}

export function submitFormDataApi(
  data: SubmitFormDataPayload,
): Promise<Result> {
  return request({
    url: '/form/submit',
    method: 'post',
    data,
  });
}

export function getMySubmitFormDataApi(
  code: string,
): Promise<Result<FormDataJson | null>> {
  return request({
    url: '/form/my-submit',
    method: 'get',
    params: { code },
  });
}

export function getMySubmitFormDataListApi(
  params: GetMySubmitFormDataListParams,
): Promise<GetMySubmitFormDataListResult> {
  return request({
    url: '/form/my-submit/list',
    method: 'get',
    params,
  });
}

export function getMySubmitFormDataDetailApi(
  id: number,
): Promise<Result<FormDataJson | null>> {
  return request({
    url: `/form/my-submit/${id}`,
    method: 'get',
  });
}

export function getFormCommOptionsListApi(
  params: GetFormCommOptionsListParams,
): Promise<GetFormCommOptionsListResult> {
  return request({
    url: '/form/form-comm-options/list',
    method: 'get',
    params,
  });
}

export function addFormCommOptionsApi(
  data: FormCommOptionsPayload,
): Promise<Result> {
  return request({
    url: '/form/form-comm-options',
    method: 'post',
    data,
  });
}

export function updateFormCommOptionsApi(
  data: FormCommOptionsPayload,
): Promise<Result> {
  return request({
    url: '/form/form-comm-options',
    method: 'put',
    data,
  });
}

export function deleteFormCommOptionsApi(id: number): Promise<Result> {
  return request({
    url: '/form/form-comm-options',
    method: 'delete',
    data: { id },
  });
}

export function getFormCommOptionsItemListApi(
  params: GetFormCommOptionsItemListParams,
): Promise<GetFormCommOptionsItemListResult> {
  return request({
    url: '/form/form-comm-options-item/list',
    method: 'get',
    params,
  });
}

export function addFormCommOptionsItemApi(
  data: FormCommOptionsItemPayload,
): Promise<Result> {
  return request({
    url: '/form/form-comm-options-item',
    method: 'post',
    data,
  });
}

export function updateFormCommOptionsItemApi(
  data: FormCommOptionsItemPayload,
): Promise<Result> {
  return request({
    url: '/form/form-comm-options-item',
    method: 'put',
    data,
  });
}

export function deleteFormCommOptionsItemApi(id: number): Promise<Result> {
  return request({
    url: '/form/form-comm-options-item',
    method: 'delete',
    data: { id },
  });
}
