interface IApiItem {
  id: number;
  url: string;
  method: string;
  auth: string;
}
interface IGetApiListParams extends PageQueryParam, IApiItem {}
type IGetApiListResult = PageResult<IApiItem & { sysWhiteApi: boolean }>;
