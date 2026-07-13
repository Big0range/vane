import request from '@/utils/request';

export function fetchMenuTreeApi(): Promise<IMenuListResult> {
  return request({
    url: '/menu/tree',
    method: 'get',
  });
}

export function deleteMenuApi(ids: Ids): Promise<Result> {
  return request({
    url: '/menu',
    method: 'delete',
    data: { ids },
  });
}
/**
 * 登录成功后获取用户菜单
 */
export function getMenuListApi(): Promise<IMenuListResult> {
  return request({
    url: '/menu/getByUser',
    method: 'get',
  });
}
export function addMenuApi(data: TMenuFormData): Promise<Result> {
  return request({
    url: '/menu',
    method: 'post',
    data,
  });
}

export function updateMenuApi(data: TMenuFormData): Promise<Result> {
  return request({
    url: '/menu',
    method: 'put',
    data,
  });
}

export function getMenuRoutesApi(
  menuId: number,
): Promise<GetMenuRoutesApiResult> {
  return request({
    url: '/menu/menuRoutes',
    method: 'get',
    params: { menuId },
  });
}
