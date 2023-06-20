import request from '@/utils/request';
import { IGetLogListParams, IGetLogListResult } from './types';

/**
 * 获取日志列表
 */
export function getLogListApi(
  params: Partial<IGetLogListParams>
): Promise<IGetLogListResult> {
  return request({
    url: '/logs',
    method: 'get',
    params
  });
}

/**
 * 导出日志文件
 */
export function donwloadLogsApi(
  params: Partial<IGetLogListParams & { ids: string; type: 'all' | 'selected' }>
): Promise<Blob> {
  return request({
    url: '/logs/download',
    method: 'get',
    responseType: 'blob',
    params
  });
}

/**
 * 清空日志
 */
export function clearLogsApi(): Promise<IGetLogListResult> {
  return request({
    url: '/logs/clear',
    method: 'delete'
  });
}
