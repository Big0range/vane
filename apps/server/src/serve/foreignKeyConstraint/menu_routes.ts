import { SysMenuTable, SysMenuRoutesTable, SysRoutesTable } from '../index.ts';

SysMenuTable.hasMany(SysMenuRoutesTable, {
  foreignKey: 'menu_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
});
SysRoutesTable.hasMany(SysMenuRoutesTable, {
  foreignKey: 'route_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
});
SysMenuRoutesTable.belongsTo(SysRoutesTable, {
  foreignKey: 'route_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
});

SysMenuRoutesTable.belongsTo(SysMenuTable, {
  foreignKey: 'menu_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
});
