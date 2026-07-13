import CryptoJS from 'crypto-js';

let key: any = 'pigxpigxpigxpigx';
key = CryptoJS.enc.Latin1.parse(key);
const iv = key;

/**
 * 加密数据
 * @param str String
 * @returns String
 */
export function encryption(str: string) {
  const encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return encrypted.toString();
}

/**
 * 解密数据
 * @param str String
 * @returns String
 */
export function decrypt(str: string) {
  const decrypt2 = CryptoJS.AES.decrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  const decryptedStr = decrypt2.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
