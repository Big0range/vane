export type TRoleList = {
  role_name: string;
  role_desc: string;
  id: number;
  create_time: string;
  update_time: string;
}[];
export interface IGetRoleListResult extends Result {
  data: {
    rows: TRoleList;
    total: number;
  };
}

export interface RoleFormData {
  role_id?: number;
  role_name: string;
  role_desc: string;
  id?: number;
}
export type RoleItem = Required<RoleFormData>;
