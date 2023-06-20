import { PageQueryParam, IResult } from '@/api/baseTypes';
/**
 * 登录表单
 */
export interface LoginFormData {
  username: string;
  password: string;
  code: string;
  changePassword: boolean;
}

/**
 * 登录响应
 */

export interface IGetUserInfoResult extends IResult {
  data: IUserInfo;
}
/**
 * 用户信息
 */
export interface IUserInfo {
  username: string;
  avatar: string | null;
  role_id: number;
  shop_id: number;
  role_name: string;
  dept_id: number;
  screen_lock: 0 | 1;
  id: number;
  phone: string;
  password: string;
  status: number;
  create_time: string;
  update_time: string;
}

/**
 * 用户查询参数
 */
export interface UserQueryParam extends PageQueryParam {
  keywords: string;
  status: number;
  deptId: number;
}

/**
 * 用户列表响应
 */
export interface IGetUserListResult extends IResult {
  data: {
    rows: IUserInfo[];
    total: number;
  };
}
/**
 * 登录响应
 */
export interface ILoginResult extends IResult {
  data: {
    token: string;
    token_type: string;
  };
}
/**
 * 用户表单类型声明
 */
export type TUserFormData = Partial<IUserInfo>;
