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

export interface IGetUserInfoResult extends Result {
  data: IUserInfo;
}
/**
 * 用户信息
 */
export interface IUserInfo {
  username: string;
  avatar: string | null;
  role_id: number | string;
  shop_id: number;
  role_name: string;
  dept_id: number;
  screen_lock: 0 | 1;
  id: number;
  phone: string;
  password: string;
  status: number | string;
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
export interface IGetUserListResult extends Result {
  data: {
    rows: IUserInfo[];
    total: number;
  };
}
/**
 * 登录响应
 */
export interface ILoginResult extends Result {
  data: {
    token: string;
    token_type: string;
  };
}
/**
 * 用户表单类型声明
 */
export type TUserFormData = Partial<IUserInfo>;
