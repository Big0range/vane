import MD5 from 'md5';

export function md5(str: string) {
  return MD5(process.env.MD5_SALT + str);
}
