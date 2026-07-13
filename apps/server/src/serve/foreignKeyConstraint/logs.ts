import { SysUserTable, SysLosTable, SysRoleTable } from '../index.ts';
// 关联表===>用户表
SysUserTable.hasMany(SysLosTable, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'user',
});
SysLosTable.belongsTo(SysUserTable, {
  foreignKey: 'user_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'user',
});

// 关联表===>角色表
SysRoleTable.hasMany(SysLosTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'roles',
});
SysLosTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'roles',
});
