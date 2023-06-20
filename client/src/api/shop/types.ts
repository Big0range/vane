import { PageQueryParam, IResult } from '../baseTypes';
export interface TShopForm {
  name: string;
  address: string;
  desc: string;
  phone: string;
  cover: string;
}

export type TShopList = ({
  id: number;
} & TShopForm)[];

export interface IShopParams extends Partial<PageQueryParam> {
  name?: string;
  address?: string;
  phone?: string;
  notPage?: 'true';
}
export interface IGetShopListResult extends IResult {
  data: {
    rows: TShopList;
    total: number;
  };
}
