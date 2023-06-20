import request from '@/utils/request';
import { TShopForm, IShopParams, IGetShopListResult } from './types';

/**
 * 新建门店
 * @param data 表单数据
 */
export function createShopApi(data: TShopForm) {
  return request({
    url: '/shop',
    method: 'post',
    data
  });
}

/**
 * 更新门店信息
 * @param data 表单数据
 */
export function updateShopInfoApi(data: TShopForm & { id: number }) {
  return request({
    url: '/shop',
    method: 'put',
    data
  });
}

/**
 * 获取门店列表
 */
export function getShopListApi(
  params: IShopParams
): Promise<IGetShopListResult> {
  return request({
    url: '/shop/list',
    method: 'get',
    params
  });
}

/**
 * 删除门店
 */
export function getShopDeleteApi(params: any): Promise<any> {
  return request({
    url: '/shop',
    method: 'delete',
    params
  });
}
