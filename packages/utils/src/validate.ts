import dayjs from 'dayjs';
/**
 * 判读是否为外链
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/** 验证手机号规则 */
export function isPhoneNumber(value?: string) {
  const isPhoneNumberReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

  value = (value || '').trim();
  if (!value) {
    return '请输入手机号';
  }

  if (!Number(value)) {
    return '请输入数字';
  }
  if (value.length !== 11) {
    return '请输入11位手机号';
  }
  if (!isPhoneNumberReg.test(value)) {
    return '请输入正确的手机号';
  }
  return '';
}

/**
 * naive 验证手机号规则
 */
export const NIsPhoneNumber = (rule: any, value: string) => {
  if (value) {
    const res = isPhoneNumber(value);
    if (!res) {
      return true;
    }
    return new Error(res);
  } else {
    return new Error('请输入手机号');
  }
};
/** 非空验证 */
export function isEmpty(value: string) {
  return /^[\s\S]*.*[^\s][\s\S]*$/.test(value);
}
/** naive 非空验证 */
export function NIsEmpty(rule: any, value: string) {
  if (!isEmpty(value)) {
    return new Error('必填项！不能为空！');
  } else {
    return true;
  }
}
/** 密码验证 */
export function isPw(value: string) {
  const reg = /^(?!^([0-9]+|[a-zA-Z]+|[!#*_]+)$)^[a-zA-Z0-9!#*_]{6,20}$/;
  return reg.test(value);
}
/** naive 密码验证 */
export function NIsPw(rule: any, value: string) {
  if (!value) {
    return new Error('密码不能为空！');
  } else if (!isPw(value)) {
    return new Error(
      '请输入6-20位大、小写字母、数字或特殊字符必须包含两种类型',
    );
  } else {
    return true;
  }
}
/** 邮箱验证 */
export function isEmail(value: string) {
  const reg =
    /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
  return reg.test(value);
}
/** naive 邮箱验证 */
export function NIsEmail(rule: any, value: string) {
  if (!isEmail(value)) {
    return new Error('请输入正确的邮箱！');
  } else {
    return true;
  }
}

/**
 * 获取指定日期(字符串类型)到当前时间的天数
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
export function parseNumberFromString(value: string): string[] | null {
  const reg = /\d+/g;
  return value.match(reg);
}
