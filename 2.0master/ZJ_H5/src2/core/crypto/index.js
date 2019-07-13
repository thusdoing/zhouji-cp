// use externals CryptoJS  https://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.min.js
// import * as CryptoJS from 'crypto-js/core';
// import 'crypto-js/aes';
/* eslint-disable */
import RSAUtils from './rsa';

/**
 * Crypto仓库
 * 存储RSA公匙，系数，公匙指数
 */
let CryptoStorage = {
  RSAModulus: null,
  RSAPublicExponentVar: null,
  RSAKeyPairVar: null
};

/**
 * 注册RSA公匙
 * @param {string} exponent 公匙指数
 * @param {stirng} modulus 系数
 */
export function registerRSA (exponent, modulus) {
  CryptoStorage.RSAModulus = modulus;
  CryptoStorage.RSAPublicExponentVar = exponent;
  CryptoStorage.RSAKeyPairVar = RSAUtils.getKeyPair(exponent, '', modulus);
  return CryptoStorage.RSAKeyPairVar;
}

/**
 * RSA加密
 *  用于加密RES-RULE
 * @param {string} rule RES规则
 */
export function encryptRSA (rule) {
  return RSAUtils.encryptedString(CryptoStorage.RSAKeyPairVar, rule);
}

/**
 * AES加密
 * @param {string} text 代加密正文
 * @param {string} rule 规则
 */
export function encryptAES (text, rule) {
  let key = CryptoJS.enc.Utf8.parse(rule);
  let iv = CryptoJS.enc.Utf8.parse(rule);
  let mode = CryptoJS.mode.CBC;
  let padding = CryptoJS.pad.Pkcs7;
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv, mode, padding });
  return encrypted.toString();
}

/**
 * AES解密
 * @param {string} text 带解密文本
 * @param {string} rule 规则
 */
export function decryptAES (text, rule) {
  let key = CryptoJS.enc.Utf8.parse(rule);
  let iv = CryptoJS.enc.Utf8.parse(rule);
  let mode = CryptoJS.mode.CBC;
  let padding = CryptoJS.pad.Pkcs7;
  let decrypted = CryptoJS.AES.decrypt(text, key, { iv, mode, padding });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * 是否启动加密
 *  判断依据来至，是否注册RSA公匙 registerRSA
 */
export function enable () {
  return CryptoStorage.RSAKeyPairVar != null;
}

/**
 * 生成UUID
 * @param {number} len 长度
 */
export function uuid (len = 32, radix = 16) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
// export function uuid(len = 16) {
//   const _uuid = prev => prev + Math.random().toString().substr(2);
//   let prev = "";
//   while(prev.length < len) {
//     prev = _uuid(prev)
//   }
//   return prev.substring(0, len);
// }

/**
 * 加密
 * @param {string} text 待加密的文本
 * @return {rule: string, crypto: string, text: string}
 *  data.rule AES规则
 *  data.crypto RSA加密后的AES规则
 *  data.text AES加密后的文本
 */
export function encrypt (text) {
  if (!CryptoStorage.RSAKeyPairVar) throw new Error('请配置加密公匙');
  let rule = uuid(16);
  let _rule = rule.split('').reverse().join('').trim();// 反转
  let crypto = encryptRSA(_rule);
  text = encryptAES(text, rule);
  return { rule, crypto, text };
}

/**
 * 解密
 * @param {string} text 待AES解密的文本
 * @param {string} rule AES规则
 * @return {string} 返回已解密的文本
 */
export function decrypt (text, rule) {
  if (!CryptoStorage.RSAKeyPairVar) throw new Error('请配置加密公匙');
  if (text == null) return '';
  if (typeof text !== 'string' && text.length == 0) return '';
  return decryptAES(text, rule);
}

export const Crypto = { registerRSA, encrypt, decrypt, enable };
export default Crypto;
