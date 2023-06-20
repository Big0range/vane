export interface PageQueryParam {
  page: number;
  pageSize: number;
}

export interface PageResult<T> {
  rows: T;
  total: number;
  page: number;
  pageSize: number;
}

export interface IResult {
  code: number;
  msg: string;
}

export type TIds = (string | number)[] | number | string;
