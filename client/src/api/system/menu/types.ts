import { IResult } from '@/api/baseTypes';

export interface IMenuItem {
  affix: number;
  component: string | null;
  hidden: number;
  icon: string | null;
  id: number;
  keep_alive: number;
  name: string;
  parent_id: number;
  path: string;
  permission: string | null;
  redirect: string | null;
  sort: number;
  title: string;
  type: string;
  children: IMenuItem[];
}

export interface IMenuListResult extends IResult {
  data: IMenuItem[];
}
export type TMenuFormData = Partial<Omit<IMenuItem, 'children'>>;
