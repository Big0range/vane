import { IResult, PageQueryParam, PageResult } from '@/api/baseTypes';
export interface ILogItem {
  id: number;
  ip: string;
  status: string | number;
  msg: string;
  username: string;
  url: string;
  method: string;
  query: string;
  body: string;
  response_time: number;
  create_time: string;
  update_time: string;
  role_name: string;
}
export interface IGetLogListParams extends PageQueryParam, ILogItem {
  start_time: string;
  end_time: string;
}
export interface IGetLogListResult extends IResult {
  data: PageResult<ILogItem[]>;
}
