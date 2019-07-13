/* eslint-disable */
import Combinatorics from './combinatorics';

/**
 * 获取数组指定数目的组合方式
 *
 * @arr 数组
 * @num 位数
 *
 * @return 二维数组
 *
 * eg.  getCombination([0,1,2,], 2)
 *      => [
 *          [0, 1],
 *          [0, 2],
 *          [1, 2]
 *      ]
 */
function getCombination (arr, num) {
  var r = [];
  (function f (t, a, n) {
    if (n == 0) {
      return r.push(t);
    }
    for (var i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1);
    }
  })([], arr, num);

  return r;
}

/**
 * 获取数组深度的数组
 *
 * eg. getArrayIndex(['a','b','c']) => [0, 1, 2]
 */
function getArrayIndex (array) {
  var i = 0,
    r = [];
  for (i = 0; i < array.length; i++) {
    r.push(i);
  }

  return r;
}

/**
 * 所有组合方式
 * @param {Number} m
 * @param {Number} n
 */
function getCombArrs (m, n) {
  if (m < n) {
    return [];
  }

  if (!n || n < 1) {
    return [];
  }

  var resultArrs = [],
    flagArr = [],
    isEnd = false,
    i, j, leftCnt;

  for (i = 0; i < m; i++) {
    flagArr[i] = i < n ? 1 : 0;
  }

  resultArrs.push(flagArr.concat());

  if (m == n) {
    return resultArrs;
  }

  while (!isEnd) {
    leftCnt = 0;
    for (i = 0; i < m - 1; i++) {
      if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
        for (j = 0; j < i; j++) {
          flagArr[j] = j < leftCnt ? 1 : 0;
        }
        flagArr[i] = 0;
        flagArr[i + 1] = 1;
        var aTmp = flagArr.concat();
        resultArrs.push(aTmp);
        if (aTmp.slice(-n).join('').indexOf('0') == -1) {
          isEnd = true;
        }
        break;
      }
      flagArr[i] == 1 && leftCnt++;
    }
  }
  return resultArrs.sort(function (x, y) {
    if (x < y) {
      return 1;
    } else if (x > y) {
      return -1;
    } else {
      return 0;
    }
  });
}

/**
 * 排序并根据 ary 元素展示所有组合
 * @param {Array} ary
 * @param {Number} m
 * @param {Number} n
 */
function getCombByArray (ary, m, n) {
  var combArr = getCombArrs(m, n);

  return combArr.map(function (el) {
    var temAry = '';
    for (var i = 0; i < el.length; i++) {
      if (el[i]) {
        temAry += ary[i];
      }
    }

    return temAry;
  });
}

/**
 * 数组 array 中提取 targetCount 个元素之和为 sum 的所有组合方式
 * @param {Array} array
 * @param {Array} sum
 * @param {Number} tolerance
 * @param {Number} targetCount
 * @param {Boolean} repeat
 */
function getCombBySum (array, sum, tolerance, targetCount, repeat = false, allsame = false) {
  var logic = {
      init: function (array, sum) {
        // 克隆数组
        var _array = array.concat(),
          r = [],
          i = 0;

        // 升序排列数组
        _array.sort(function (a, b) {
          return a - b;
        });

        // 获取 <= sum 的元素的数组
        for (i = 0; i < _array.length; i++) {
          if (_array[i] <= sum) {
            r.push(_array[i]);
          } else {
            break;
          }
        }

        return r;
      },
      core: function (array, sum, arrayIndex, count, r) {
        var i = 0,
          k = 0,
          combArray = [],
          _sum = 0,
          _cca = [],
          _cache = [];

        if (count == _returnMark) {
          return;
        }

        combArray = repeat ? Combinatorics.baseN(arrayIndex, count).toArray() : getCombination(arrayIndex, count);

        if (!allsame) {
          var temAry = combArray.concat(),
            combArray = [];

          while (temAry.length) {
            var el = temAry.pop();
            var item = el.sort((a, b) => a - b);

            // 每一位都一样
            if (item[0] == item[item.length - 1]) {
              continue;
            }

            if (temAry.some(function (a) { return a.sort((a, b) => a - b).join('') === item.join(''); })) {
              continue;
            }

            combArray.push(el);
          }
        }

        for (i = 0; i < combArray.length; i++) {
          _cca = combArray[i];
          _sum = 0;
          _cache = [];

          for (k = 0; k < _cca.length; k++) {
            _sum += array[_cca[k]];
            _cache.push(array[_cca[k]]);
          }
          if (~sum.indexOf(_sum)) {
            r.push(_cache);
          }
          /* if (Math.abs(_sum - sum) <= _tolerance) {
                    r.push(_cache);
                } */
        }

        logic.core(array, sum, arrayIndex, count - 1, r);
      }
    },
    r = [],
    _array = [],
    _targetCount = 0,
    _tolerance = 0,
    _returnMark = 0;

  _targetCount = targetCount || _targetCount;
  _tolerance = tolerance || _tolerance;

  // 初始化数组,去掉大于 sum 的元素
  // _array = logic.init(array, sum);

  _array = logic.init(array, sum[sum.length - 1]);

  if (_targetCount) {
    _returnMark = _targetCount - 1;
  }

  logic.core(_array, sum, getArrayIndex(_array), (_targetCount || _array.length), r);
  return r;
}

/**
 * 获取数组深度数组与每个子数组长度数组
 * @param {Array} array
 * eg. getTwoArrayIndex([
 *          [1,2,3],
 *          [1,2],
 *          [],
 *          [6,7,8],
 *          [9]
 *      ]) => {
 *              index: [0, 1, 3, 4],
 *              size: [3, 2, 0, 3, 1]
 *            }
 */
function getTwoArrayIndex (array) {
  var ret = {
    index: [],
    size: []
  };

  for (var i = 0; i < array.length; i++) {
    ret.size.push(array[i].length);

    if (array[i].length) {
      ret.index.push(i);
    }
  }

  return ret;
}

/**
 * 任 N 直选复式注数
 * @param {Array} ary
 * @param {Number} num
 *
 * @return {Array}
 * eg. getRXZXFScount([
 *           [0,1,2],
 *           [3,4,5],
 *           [6,7,8],
 *          [9],
 *           []
 *      ], 3); => 54
 */
function getRXZXFScount (ary, num) {
  var retAry = getTwoArrayIndex(ary);

  var combAry = getCombination(retAry.index, num);

  return combAry.reduce(function (x, y) {
    return x + y.reduce(function (a, b) {
      return a * retAry.size[b];
    }, 1);
  }, 0);
}

/**
 * 任选二直选和值
 * @param {Array} sumAry
 * @param {Number} num
 *
 * @returns {Number}
 */
function getRXZXHZScount (sumAry, num, repeat, allsame) {
  allsame = allsame || false;
  sumAry = sumAry.map(el => +el);
  var max = Math.max.apply(null, sumAry),
    ary = [];

  max = max > 9 ? 9 : max;
  for (var i = 0; i <= max; i++) {
    ary.push(i);
  }

  return getCombBySum(ary, sumAry, 0, num, repeat, allsame).length;
}

/**
 * ['万', '千', '百', '十', '个'] => '1,1,1,1,1'
 * @param {*} ary
 */
function transWQBSGToNum (ary) {
  var ret = [0, 0, 0, 0, 0],
    retAry = ['万', '千', '百', '十', '个'];

  ary.forEach((el) => {
    let pos = retAry.indexOf(el);
    if (~pos) {
      ret[pos] = 1;
    }
  });

  return ret.join(',');
}

/**
 * 1,0,1,1,0 => 万百十
 * @param {*} str
 */
function transNumToWQBSG (str) {
  var retAry = ['万', '千', '百', '十', '个'],
    ret = '';

  str = str.split(',');

  str.forEach((el, index) => {
    if (+el) {
      ret += retAry[index];
    }
  });

  return ret;
}

/**
 * min - max 生成随机 count 长度的数组
 * @param {*} min
 * @param {*} max
 * @param {*} count
 */
function randomArea (min, max, count, repeat = false) {
  count = count || Math.floor(Math.random() * (max - min + 1));

  if ((max - min + 1 < count) && !repeat) {
    throw new Error('count > (max-min+1) && !repeat');
  }

  var retAry = [];
  for (var i = 0; i < count; i++) {
    let temNo = Math.floor(Math.random() * (max - min + 1));

    if (repeat || !~retAry.indexOf(temNo)) {
      retAry.push(temNo);
    } else {
      i--;
    }
  }

  return retAry.sort((a, b) => a - b);
}

/**
 * 数组去重
 * @param {*} ary
 */
function distinct (ary) {
  var retAry = [];

  while (ary.length) {
    var item = ary.shift();
    if (!~ary.indexOf(item)) {
      retAry.push(item);
    }
  }
  return retAry;
}

export default {
  getTwoArrayIndex,
  getCombination,
  getRXZXFScount,
  getRXZXHZScount,
  transWQBSGToNum,
  transNumToWQBSG,
  randomArea
};
