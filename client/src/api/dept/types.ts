import { IResult } from '@/api/baseTypes';
/**
 * 部门查询参数
 */
export interface DeptQuery {
  name?: string;
  status?: number;
  shop_id?: number;
}

/**
 * 部门类型
 */
export interface DeptVO {
  /**
   * 子部门
   */
  children?: DeptVO[];
  /**
   * 创建时间
   */
  create_time?: Date;
  /**
   * 部门ID
   */
  id?: number;
  /**
   * 部门名称
   */
  name?: string;
  /**
   * 父部门ID
   */
  parent_id?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 状态(1:启用；0:禁用)
   */
  status?: number;
  /**
   * 修改时间
   */
  update_time?: Date;
}

/**
 * 部门表单类型
 */
export interface DeptForm {
  /**
   * 部门ID(新增不填)
   */
  id?: number;
  /**
   * 门店ID
   */
  shop_id?: number;
  /**
   * 部门名称
   */
  name?: string;
  /**
   * 父部门ID
   */
  parent_id: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 状态(1:启用；0：禁用)
   */
  status?: number;
  /**
   * 描述
   */
  desc?: string;
}

export interface IGetDeptListResult extends IResult {
  data: DeptVO[];
}
