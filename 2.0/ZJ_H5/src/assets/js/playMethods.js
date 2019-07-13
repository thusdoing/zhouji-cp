import Combinatorics from './combinatorics'
import Algorithm from './algorithm'

/**
 * 任 N 直选复式注数
 * @param {Array} ary  二维数组
 * @param {Number} num 选择个数
 * 
 * @return {Number}
 * eg. rnzxfsGetCount([
 *           [0,1,2],
 *           [3,4,5],
 *           [6,7,8],
 *           [9],
 *           []
 *      ], 3); => 54
 */
function rnzxfsGetCount(ary, num) {
    var retAry = Algorithm.getTwoArrayIndex(ary);

    var combAry = Algorithm.getCombination(retAry.index, num)

    return combAry.reduce(function(x, y) {
        return x + y.reduce(function(a, b){
            return a * retAry.size[b]
        }, 1);
    }, 0);
}

/**
 * 任 N 直选单式 / 组选单式 / 混合组选
 * @param {String} str 
 * @param {Boolean} sequence 
 * @param {Number} num 
 */
function rnzdFilter(str, sequence, num) {
    var ary = [],
        retAry = [],
        errAry = [],
        repAry = [],
        len = str.length,
        size= Math.floor(len/num)
    
    for (var i=0; i<size; i++) {
        ary.push(str.substr(i*num, num))
    }

    if (len % num) {
        errAry.push(str.substr(-(len%num)))
    }

    // 去重
    while ( ary.length) {
        var item = ary.shift()
        if (~ary.indexOf(item)) {
            repAry.push(item)
        }
        else {
            retAry.push(item)
        }
    }

    if (!sequence) {
        var temAry = retAry.concat()
        retAry = []

        while ( temAry.length) {
            var el = temAry.pop()
            var item = el.split('').sort((a, b) => a- b)

            // 每一位都一样
            if (item[0] == item[item.length-1]) {
                errAry.push(el)
                continue
            }

            if (temAry.some(function(a) { return a.split('').sort((a, b) => a- b).join('') === item.join('') })) {
                repAry.push(el)
                continue
            }
            
            retAry.push(el)
        }
    }

    return { 
        retAry: retAry.sort(),
        errAry,
        repAry
    }
}

/**
 * 任 N 组选 N 的注数
 * @param {String} type 
 * @param {Array} ary 
 * @param {Array} rule 
 * @param {Number} poslen 
 */
function rnzxnCount(type, ary, rule, poslen) {
    return 0
}

export default {
    rnzxfsGetCount,
    rnzdFilter,
    rnzxnCount
}