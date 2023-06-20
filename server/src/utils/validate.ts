const isPhoneNumberReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

export function isPhoneNumber(value?: string) {
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
