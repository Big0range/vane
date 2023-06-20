/**
 * value 对应值
 * 本院区: 0
 * 分院区: 1
 * 协作单位: 2
 * 健康中心: 3
 */
export const hospitalTypes = [
  {
    label: '本院区',
    value: '0'
  },
  {
    label: '分院区',
    value: '1'
  },
  {
    label: '协作单位',
    value: '2'
  },
  {
    label: '健康中心',
    value: '3'
  }
];
/**
value 对应值
三级甲等: 0
三级乙等: 1
三级丙等: 2
二级甲等: 3
二级乙等: 4
二级丙等: 5
一级甲等: 6
一级乙等: 7
一级丙等: 8
未定级: 9
 */
export const hospitalLeves = [
  {
    label: '三级甲等',
    value: '0'
  },
  {
    label: '三级乙等',
    value: '1'
  },
  {
    label: '三级丙等',
    value: '2'
  },
  {
    label: '二级甲等',
    value: '3'
  },
  {
    label: '二级乙等',
    value: '4'
  },
  {
    label: '二级丙等',
    value: '5'
  },
  {
    label: '一级甲等',
    value: '6'
  },
  {
    label: '一级乙等',
    value: '7'
  },
  {
    label: '一级丙等',
    value: '8'
  },
  {
    label: '未评级',
    value: '9'
  }
];

export const firstLevelDeptList = [
  {
    label: '内科',
    value: '内科'
  },
  {
    label: '外科',
    value: '外科'
  },
  {
    label: '妇科',
    value: '妇科'
  },
  {
    label: '儿科',
    value: '儿科'
  },
  {
    label: '传染病',
    value: '传染病'
  },
  {
    label: '五官科',
    value: '五官科'
  },
  {
    label: '中医科',
    value: '中医科'
  },
  {
    label: '检验科',
    value: '检验科'
  },
  {
    label: '放射科',
    value: '放射科'
  },
  {
    label: '超声科',
    value: '超声科'
  },
  {
    label: '胃镜室',
    value: '胃镜室'
  },
  {
    label: '药剂科',
    value: '药剂科'
  },
  {
    label: '行政科室',
    value: '行政科室'
  },
  {
    label: '其他科室',
    value: '其他科室'
  }
];

// 主任医师
// 副主任医师
// 主治医师
// 住院医师
// 主任护师
// 副主任护师
// 主管护师
// 护士
// 主任技师
// 副主任技师
// 主管技师
// 技师
export const hospitalTitles = [
  {
    label: '主任医师',
    value: '主任医师'
  },
  {
    label: '副主任医师',
    value: '副主任医师'
  },
  {
    label: '主治医师',
    value: '主治医师'
  },
  {
    label: '住院医师',
    value: '住院医师'
  },
  {
    label: '主任护师',
    value: '主任护师'
  },
  {
    label: '副主任护师',
    value: '副主任护师'
  },
  {
    label: '主管护师',
    value: '主管护师'
  },
  {
    label: '护士',
    value: '护士'
  },
  {
    label: '主任技师',
    value: '主任技师'
  },
  {
    label: '副主任技师',
    value: '副主任技师'
  },
  {
    label: '主管技师',
    value: '主管技师'
  },
  {
    label: '技师',
    value: '技师'
  }
];
/**
 *
 * @param type 0 是医院登记 1 是医院类型 2 是一级科室 3是职称
 */
export function getData(type: '0' | '1' | '2' | '3', value: string) {
  let list: typeof hospitalLeves;
  switch (type) {
    case '0':
      list = hospitalLeves;
      break;
    case '1':
      list = hospitalTypes;
      break;
    case '2':
      list = firstLevelDeptList;
      break;
    case '3':
      list = hospitalTitles;
      break;
  }
  return list.filter(item => item.value === value);
}
