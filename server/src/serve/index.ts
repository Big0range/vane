import db from './db';

export { shopServe } from './shop.serve';
export { deptServe } from './dept.serve';
export { sysUserServe, TUser } from './sys/user.serve';
export { sysMenuServe } from './sys/menu.serve';
export { sysRoleServe, TRole } from './sys/role.serve';
export { sysRoleMenuServe } from './sys/role_menu.serve';
export { sysLogsServe } from './sys/logs.serve';
db.sync({ alter: process.env.MYSQL_ALERT === 'true' });
