
export { default as dateFormat } from 'vux/src/tools/date/format';
export { fetch, delay } from '../crypto/fetch';

export * from './pageInfo.tool';
export * from './storage.tool';

/**
 * 随机生成 注码
 * createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
 * @param {number} num 生成随机数个数
 * @param {number} from 最小的随机数
 * @param {number} to  最大的随机数
 */
export const createRandom = function (num, from, to) {
  var arr = [];
  var json = {};
  while (arr.length < num) {
    // 产生单个随机数
    var ranNum = Math.floor(Math.random() * (to - from)) + from;
    // 通过判断json对象的索引值是否存在 来标记 是否重复
    if (!json[ranNum]) {
      json[ranNum] = 1;
      arr.push(ranNum);
    }
  }
  return arr;
};

export { default as bet } from './bet';
