import request from '@/utils/request';
import { IResult, TIds } from '@/api/baseTypes';
import { TMenuFormData, IMenuListResult } from './types';

export function fetchMenuTreeApi(): Promise<IMenuListResult> {
  return request({
    url: '/menu/tree',
    method: 'get'
  });
}

export function deleteMenuApi(ids: TIds): Promise<IResult> {
  return request({
    url: '/menu',
    method: 'delete',
    data: { ids }
  });
}
/**
 * 登录成功后获取用户菜单
 */
export function getMenuListApi(): Promise<IMenuListResult> {
  return request({
    url: '/menu/getByUser',
    method: 'get'
  });
}
export function addMenuApi(data: TMenuFormData): Promise<IResult> {
  return request({
    url: '/menu',
    method: 'post',
    data
  });
}

export function updateMenuApi(data: TMenuFormData): Promise<IResult> {
  return request({
    url: '/menu',
    method: 'put',
    data
  });
}
