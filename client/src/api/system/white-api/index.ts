import request from '@/utils/request';
import { IGetApiListParams, IGetApiListResult } from './types';

/**
 * 获取接口列表
 */
export function getApiListApi(
  params: Partial<IGetApiListParams>
): Promise<IGetApiListResult> {
  return request({
    url: '/server-routes',
    method: 'get',
    params
  });
}

/**
 * 修改接口状态
 */
export function changeApiAuthApi(
  id: number,
  auth: '0' | '1'
): Promise<IGetApiListResult> {
  return request({
    url: '/server-routes',
    method: 'put',
    data: {
      auth,
      id
    }
  });
}
