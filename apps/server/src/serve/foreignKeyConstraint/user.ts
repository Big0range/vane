import { SysUserTable, SysRoleTable, ShopTable, DeptTable } from '../index.ts';

// 关联表===>角色表
SysRoleTable.hasMany(SysUserTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'role',
});
SysUserTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'role',
});

ShopTable.hasMany(SysUserTable, {
  foreignKey: 'shop_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'shop',
});
SysUserTable.belongsTo(ShopTable, {
  foreignKey: 'shop_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'shop',
});

DeptTable.hasMany(SysUserTable, {
  foreignKey: 'dept_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'dept',
});
SysUserTable.belongsTo(DeptTable, {
  foreignKey: 'dept_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'dept',
});
