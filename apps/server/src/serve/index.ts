import db from './db.ts';

export { shopServe, ShopTable } from './shop.serve.ts';
export { deptServe, DeptTable } from './dept.serve.ts';
export { sysUserServe, type TUser, SysUserTable } from './sys/user.serve.ts';
export { sysMenuServe, SysMenuTable } from './sys/menu.serve.ts';
export { sysRoleServe, type TRole, SysRoleTable } from './sys/role.serve.ts';
export { sysRoleMenuServe, SysRoleMenuTable } from './sys/role_menu.serve.ts';
export { sysLogsServe, SysLosTable } from './sys/logs.serve.ts';
export { sysRoutesServe, type SysRoutesServer, SysRoutesTable } from './sys/routes.serve.ts';
export { tableTemplateServe, type TableTemplate } from './sys/table_temp.serve.ts';
export { tableTemplateRowServe, type TableTemplateRow } from './sys/table_temp_row.serve.ts';
export { formServe, FormTable, type Form } from './form/form.serve.ts';
export { formItemServe, FormItemTable, type FormItem } from './form/form_item.serve.ts';
export { formOptionsServe, FormOptionsTable, type FormOptions } from './form/form_options.serve.ts';
export {
  sysMenuRoutesServe,
  type TMenuRoutes,
  SysMenuRoutesTable,
} from './sys/menu_routes.serve.ts';
export {
  formDataJsonServe,
  FormDataJsonTable,
  type FormDataJson,
} from './form/form_data_json.serve.ts';
export { formDataServe, FormDataTable, type FormData } from './form/form_data.serve.ts';
export {
  formCommOptionsServe,
  FormCommOptionsTable,
  type FormCommOptions,
} from './form/form_comm_options.serve.ts';
export {
  formCommOptionsItemServe,
  FormCommOptionsItemTable,
  type FormCommOptionsItem,
} from './form/form_comm_options_item.serve.ts';

export const syncDb = async () => {
  return db.sync({ alter: process.env.MYSQL_ALERT === 'true' });
};

import './foreignKeyConstraint/index.ts';
