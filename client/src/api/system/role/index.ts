import request from '@/utils/request';

import { IGetRoleListResult } from './types';
/**获取角色列表 */
export function getRoleListApi(params: any): Promise<IGetRoleListResult> {
  return request({
    url: '/role',
    method: 'get',
    params
  });
}

/**更新角色 */
export function updateRoleApi(data: any): Promise<any> {
  return request({
    url: '/role',
    method: 'put',
    data
  });
}

/**添加角色 */
export function addRoleApi(data: any): Promise<any> {
  return request({
    url: '/role',
    method: 'post',
    data
  });
}

/**删除角色 */
export function delRoleApi(id: any): Promise<any> {
  return request({
    url: `/role`,
    method: 'delete',
    params: { id }
  });
}

/** 根据角色id 查询已有权限*/
export function getMenuTreeByRoleIdApi(roleId: any) {
  return request({
    url: '/menu/getIdsByRole',
    method: 'get',
    params: { roleId }
  });
}

/** 角色分配权限 */
export function updateRoleMenusApi(roleId: any, menuIds: string): Promise<any> {
  return request({
    url: '/role/saveMenu',
    method: 'post',
    data: {
      roleId,
      menuIds
    }
  });
}
