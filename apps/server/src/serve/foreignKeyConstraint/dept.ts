import { ShopTable, DeptTable } from '../index.ts';

// 关联表
ShopTable.hasMany(DeptTable, {
  foreignKey: 'shop_id',
  sourceKey: 'id',
  constraints: false, // 禁用外键约束
});
DeptTable.belongsTo(ShopTable, {
  foreignKey: 'shop_id',
  targetKey: 'id',
  constraints: false, // 禁用外键约束
});
