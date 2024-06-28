import request from '@/utils/request';
import {
  IGetUserListResult,
  TUserFormData,
  IGetUserInfoResult,
  ILoginResult
} from './types';
import { encryption } from '@vane/server/src/utils';
/** 用户登录 */
export function login(
  username: string,
  password: string,
  code: string
): Promise<ILoginResult> {
  const data = {
    username: username,
    password: encryption(password),
    code: code
  };
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  });
}

/**添加用户信息 */
export function createUserApi(data: TUserFormData): Promise<IResult> {
  return request({
    url: '/user',
    method: 'post',
    data
  });
}

/**修改用户信息 */
export function changeUserInfoApi(data: TUserFormData): Promise<IResult> {
  return request({
    url: '/user',
    method: 'put',
    data
  });
}

/**删除用户信息 */
export function delUserByIdsApi(
  ids: (string | number)[] | number | string
): Promise<IResult> {
  return request({
    url: '/user',
    method: 'delete',
    data: {
      ids
    }
  });
}

/**获取用户信息 */
export function getUserInfoApi(): Promise<IGetUserInfoResult> {
  return request({
    url: '/user',
    method: 'get'
  });
}

/**
 * 获取用户列表
 * @param params 查询参数
 */
export function getUserListApi(
  params: PageQueryParam & {
    name?: string;
    role_id?: number | string;
    status?: number | string;
  }
): Promise<IGetUserListResult> {
  return request({
    url: '/user/list',
    method: 'get',
    params
  });
}

/**
 * 修改用户状态
 * @param id 用户id
 */
export function changeUserStatusApi(id: number): Promise<any> {
  return request({
    url: '/user/status',
    method: 'put',
    data: { id }
  });
}

/**
 * 修改锁屏状态
 * @param screen_lock 锁屏状态 0:关闭 1:开启
 */
export function changeLockScreenApi(
  screen_lock: number,
  password?: string
): Promise<IResult> {
  return request({
    url: '/user/screenLock',
    method: 'put',
    data: {
      screen_lock,
      password
    }
  });
}

/**
 * 退出登录
 */
export function logoutApi() {
  return request({
    url: '/user/logout'
  });
}

/**
 * 验证码接口
 */
export function codeApi() {
  return request({
    url: '/user/code'
  });
}
