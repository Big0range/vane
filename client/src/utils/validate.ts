import dayjs from 'dayjs';
import * as vtils from '@vane/server/src/utils';
/**
 * 判读是否为外链
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 验证手机号规则
 */
export const ELIsPhoneNumber = (rule: any, value: string, cb: any) => {
  if (value) {
    const res = vtils.isPhoneNumber(value);
    if (!res) {
      return cb();
    }
    return cb(new Error(res));
  } else {
    cb();
  }
};

export function checkMobileSimple(value: string) {
  if (value) {
    // 验证手机号的规则
    const regMobile =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (regMobile.test(value)) {
      return true;
    }
    return false;
  }
}
// 非空验证
export function checkNull(rule: any, value: string, cb: any) {
  const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
  if (!reg.test(value)) {
    return cb(new Error('必填项！不能为空！'));
  } else {
    cb();
  }
}

/**密码验证 */
export function isPw(rule: any, value: string, cb: any) {
  const reg = /^(?!^([0-9]+|[a-zA-Z]+|[!#*_]+)$)^[a-zA-Z0-9!#*_]{6,20}$/;
  if (!value) {
    return cb(new Error('密码不能为空！'));
  } else if (!reg.test(value)) {
    return cb(
      new Error('请输入6-20位大、小写字母、数字或特殊字符必须包含两种类型')
    );
  } else {
    cb();
  }
}
// 邮箱验证
export function isEmail(rule: any, value: string, cb: any) {
  const reg =
    /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
  if (!reg.test(value)) {
    return cb(new Error('请输入正确的邮箱！'));
  } else {
    cb();
  }
}

/**
 * 获取指定日期(字符串类型)到当前时间的天数
 * @param {Object} sDate1 格式:2018-01-04
 */
export function dateDiff(sDate1: string) {
  let iDays: any = '';
  const nowDate = new Date();
  const date = dayjs(nowDate);
  const time = date.format('YYYY-MM-DD');
  if (sDate1) {
    iDays = dayjs(time).diff(sDate1, 'day');
  } else {
    iDays = '-';
  }
  return iDays;
}

/**
 * 提取字符串中的数字
 */
export function getNumberForString(value: string): string[] | null {
  const reg = /\d+/g;
  return value.match(reg);
}

// export function isEmail(rule: any, value: string, cb: any) {
//   const reg =
//     /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
//   if (!reg.test(value)) {
//     return cb(new Error('请输入正确的邮箱！'));
//   } else {
//     cb();
//   }
// }
