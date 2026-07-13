import { SysMenuTable, SysRoleMenuTable, SysRoleTable } from '../index.ts';
SysMenuTable.hasMany(SysRoleMenuTable, {
  foreignKey: 'menu_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
});
SysRoleTable.hasMany(SysRoleMenuTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
});
SysRoleMenuTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
});

SysRoleMenuTable.belongsTo(SysMenuTable, {
  foreignKey: 'menu_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
});
