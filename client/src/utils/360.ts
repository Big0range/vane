// 引入npm包 crypto-js
import CryptoJS from 'crypto-js';

// 初始化密钥信息
export const key = CryptoJS.enc.Utf8.parse('0F471C56362408AF8DB929C38EDFD23C');
export const iv = CryptoJS.enc.Utf8.parse('11BEE6E35B881A33CF1649607295D1A7');

//加密方法
function Encrypt(word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

export default Encrypt;
