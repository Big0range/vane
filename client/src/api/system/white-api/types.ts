import { IResult, PageQueryParam, PageResult } from '@/api/baseTypes';
export interface IApiItem {
  id: number;
  url: string;
  method: string;
  auth: string;
}
export interface IGetApiListParams extends PageQueryParam, IApiItem {}
export interface IGetApiListResult extends IResult {
  data: PageResult<(IApiItem & { sysWhiteApi: boolean })[]>;
}
