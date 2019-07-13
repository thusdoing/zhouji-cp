/* eslint-disable */
/*
    玩法的 注数计算及展示
*/
import algorithm from './algorithm';
import Combinatorics from './combinatorics';
import playMethods from './playMethods';
const getGameAlgo = function (groundNo) {
  groundNo = groundNo.slice(0, 2) + '11' + groundNo.slice(4);

  switch (groundNo) {
    case '111155001133':
    case '111144111133':
    case '111144221133':
      return {
        getBetCount (config, codeArr) {
          for (let i = 0; i < config.sub.length; i++) {
            if (codeArr[i].length <= 0) {
              return 0;
            }
          }

          return codeArr.reduce((x, y) => {
            return x * y.length;
          }, 1) * config.sub.length;
        },
        getBetResult (config, codeArr) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }

            betContent += codeArr[i].sort() + a;
          }

          showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * config.sub[k].golbal[1])] = 1;
          }

          return codeNumYardArr;
        }
      };
    case '111155001122':
    case '111144111122':
    case '111144221122':
    case '111133331122':
    case '111133111122':
    case '111133221122':
    case '111122221122':
    case '111122111122':
      return {
        getBetCount (config, codeArr) {
          for (let i = 0; i < config.sub.length; i++) {
            if (codeArr[i].length <= 0) {
              return 0;
            }
          }

          return codeArr.reduce((x, y) => {
            return x * y.length;
          }, 1);
        },
        getBetResult (config, codeArr) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }

            betContent += codeArr[i].sort() + a;
          }

          showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * config.sub[k].golbal[1])] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '111155002211':
    case '111155002222':
    case '111155002233':
    case '111155002244':
    case '111155002255':
    case '111155002266':
    case '111144112211':
    case '111144112222':
    case '111144112233':
    case '111144112244':
    case '111144222211':
    case '111144222222':
    case '111144222233':
    case '111144222244':
      return {
        getBetCount (config, codeArr) {
          return combine(codeArr, config.algorithm);
        },
        getBetResult (config, codeArr) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }
            betContent += codeArr[i].sort() + a;
          }
          if (config.sub.length <= 1) {
            betContent = betContent.replace(/,/g, '|');
          }

          showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          let splitArrRes = [];
          let z = config.randomRule[0];// 需要随机几个数
          splitArrRes = createRandom(z, 0, 9);

          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);

            let count = config.randomRule[1][k];
            while (count--) {
              codeNumYardArr[k][splitArrRes.pop()] = 1;
            }
          }

          return codeNumYardArr;
        }
      };

    case '111133331133':
    case '111133332233':
    case '111133111133':
    case '111133112233':
    case '111133221133':
    case '111133222233':
      return {
        getBetCount (config, codeArr) {
          return codeArr[0].reduce((x, y) => x + config.yardWarehouse[y - config.sub[0].golbal[0]], 0);
        },
        getBetResult (config, codeArr) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }
            betContent += codeArr[i].sort((a, b) => a - b) + a;
          }
          if (config.sub.length <= 1) {
            betContent = betContent.replace(/,/g, '|');
          }

          showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * config.sub[k].golbal[1]) + config.sub[k].golbal[0]] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '111133332211':
    case '111133112211':
    case '111133222211':
      return {
        getBetCount (config, codeArr) {
          for (let i = 0; i < config.sub.length; i++) {
            if (codeArr[i].length < config.algorithm) {
              return 0;
            }
          }

          return codeArr[0].length * (codeArr[0].length - 1);
        },
        getBetResult (config, codeArr) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }

            betContent = codeArr[i].sort().join('|');
          }

          showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);

            let noRptAry = createRandom(config.algorithm, 0, config.sub[k].golbal[1] - 1);
            for (let j = 0; j < noRptAry.length; j++) {
              codeNumYardArr[k][noRptAry[j]] = 1;
            }
          }

          return codeNumYardArr;
        }
      };
    case '111133332222':
    case '111133112222':
    case '111133222222':
      return {
        getBetCount (config, codeArr) {
          for (let i = 0; i < config.sub.length; i++) {
            if (codeArr[i].length < config.algorithm) {
              return 0;
            }
          }

          return Combinatorics.C(codeArr[0].length, config.algorithm);
        },
        getBetResult (config, codeArr) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }

            betContent = codeArr[i].sort().join('|');
          }

          showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);

            let noRptAry = createRandom(config.algorithm, 0, config.sub[k].golbal[1] - 1);
            for (let j = 0; j < noRptAry.length; j++) {
              codeNumYardArr[k][noRptAry[j]] = 1;
            }
          }

          return codeNumYardArr;
        }
      };

    case '111122221133':
    case '111122111133':
    case '111122222233':
    case '111122112233':
      return {
        getBetCount (config, codeArr) {
          return algorithm.getRXZXHZScount(codeArr[0].sort((a, b) => a - b), config.algorithm, config.repeat, config.allsame);
        },
        getBetResult (config, codeArr) {
          let betContent = codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0];
            codeNumYardArr[k] = Array(len).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * len) + config.sub[k].golbal[0]] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '111122222222':
    case '111122112222':
      return {
        getBetCount (config, codeArr) {
          return Combinatorics.C(codeArr[0].length, config.algorithm);
        },
        getBetResult (config, codeArr) {
          let betContent = codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0];
            codeNumYardArr[k] = Array(len).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * len) + config.sub[k].golbal[0]] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '1111110044':
      return {
        getBetCount (config, codeArr) {
          return codeArr.reduce((x, y) => {
            return x + y.length;
          }, 0);
        },
        getBetResult (config, codeArr) {
          var betAry = [];
          for (let i = 0; i < codeArr.length; i++) {
            if (codeArr[i].length > 0) {
              var betRet = {},
                splitArr = '';

              switch (i) {
                case 0:
                  splitArr += '万位';
                  break;
                case 1:
                  splitArr += '千位';
                  break;
                case 2:
                  splitArr += '百位';
                  break;
                case 3:
                  splitArr += '十位';
                  break;
                case 4:
                  splitArr += '个位';
                  break;
                default:
                  break;
              }

              betRet.betContent = codeArr[i].sort().toString().replace(/,/g, '|');
              betRet.showContent = '[' + config.name + splitArr + '] ' + betRet.betContent;
              betRet.groupNo = config.sub[i].groupNo;
              betRet.betNumber = codeArr[i].length;
              betAry.push(betRet);
            }
          }

          return betAry;
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0];
            codeNumYardArr[k] = Array(len).fill(0);
          }

          var a = Math.floor(Math.random() * 5),
            b = Math.floor(Math.random() * 10);

          codeNumYardArr[a][b] = 1;

          return codeNumYardArr;
        }
      };

    case '111166000011':
    case '111166000022':
    case '111166000033':
    case '111166000044':
      return {
        getBetCount (config, codeArr) {
          // for (let i = 0; i < config.sub.length; i++) {
          //     if (codeArr[i].length < config.algorithm) {
          //         return 0
          //     }
          // }

          return codeArr[0].length;
        },
        getBetResult (config, codeArr) {
          let betContent = codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0],
              rd = createRandom(config.algorithm, config.sub[k].golbal[0], len);

            codeNumYardArr[k] = Array(len).fill(0);
            codeNumYardArr[k][rd[0]] = 1;
            codeNumYardArr[k][rd[1]] = 1;
          }

          return codeNumYardArr;
        }
      };
    case '111100002211':
    case '111100002222':
    case '111100001111':
    case '111100001122':
      return {
        getBetCount (config, codeArr) {
          for (let i = 0; i < config.sub.length; i++) {
            if (codeArr[i].length < config.algorithm) {
              return 0;
            }
          }

          return Combinatorics.C(codeArr[0].length, config.algorithm);
        },
        getBetResult (config, codeArr) {
          let betContent = codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0],
              rd = createRandom(config.algorithm, config.sub[k].golbal[0], len);

            codeNumYardArr[k] = Array(len).fill(0);
            codeNumYardArr[k][rd[0]] = 1;
            codeNumYardArr[k][rd[1]] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '111122001122':
    case '111133001122':
    case '111144001122':
      return {
        getBetCount (config, codeArr) {
          var retAry = algorithm.getTwoArrayIndex(codeArr);
          if (retAry.index.length < config.algorithm) {
            return 0;
          }

          return playMethods.rnzxfsGetCount(codeArr, config.algorithm);
        },
        getBetResult (config, codeArr) {
          let splitArr = codeArr.map(el => {
            if (el.length) {
              return el.join(',');
            } else {
              return '-';
            }
          }).join('|');

          let betContent = splitArr,
            showContent = '[' + config.name + '] ' + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0];
            codeNumYardArr[k] = Array(len).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * len) + config.sub[k].golbal[0]] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '111122001133':
    case '111122002233':
    case '111133001133':
    case '111133002244':
      return {
        getBetCount (config, codeArr) {
          return algorithm.getRXZXHZScount(codeArr[0].sort((a, b) => a - b), config.algorithm, config.repeat, config.allsame);
        },
        getBetResult (config, codeArr, social) {
          var betContent = (config.rx ? algorithm.transWQBSGToNum(social) + ':' : '') + codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + (config.rx ? ':' + social.join(',') : '') + '] ' + codeArr[0].sort((a, b) => a - b).join('|');

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            let len = config.sub[k].golbal[1] + config.sub[k].golbal[0];
            codeNumYardArr[k] = Array(len).fill(0);
            codeNumYardArr[k][Math.floor(Math.random() * len) + config.sub[k].golbal[0]] = 1;
          }

          return codeNumYardArr;
        }
      };

    case '111122002222':
      return {
        getBetCount (config, codeArr) {
          return Combinatorics.C(codeArr[0].length, config.algorithm);
        },
        getBetResult (config, codeArr, social) {
          let betContent = (config.rx ? algorithm.transWQBSGToNum(social) + ':' : '') + codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + (config.rx ? ':' + social.join(',') : '') + '] ' + codeArr[0].sort((a, b) => a - b).join('|');

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];

          for (var k = 0; k < config.sub.length; k++) {
            var len = config.sub[k].golbal[1] + config.sub[k].golbal[0];

            codeNumYardArr[k] = Array(len).fill(0);

            let noRptAry = createRandom(config.algorithm, 0, 10);
            for (let j = 0; j < noRptAry.length; j++) {
              codeNumYardArr[k][noRptAry[j]] = 1;
            }
          }

          return codeNumYardArr;
        }
      };

    case '111133002211':
    case '111133002222':
      return {
        getBetCount (config, codeArr) {
          if (codeArr[0].length >= (config.count || config.algorithm)) {
            return Combinatorics.C(codeArr[0].length, config.count || config.algorithm) * (config.count ? 2 : 1);
          }

          return 0;
        },
        getBetResult (config, codeArr, social) {
          var betContent = (config.rx ? algorithm.transWQBSGToNum(social) + ':' : '') + codeArr[0].sort((a, b) => a - b).join('|'),
            showContent = '[' + config.name + (config.rx ? ':' + social.join(',') : '') + '] ' + codeArr[0].join('|');

          return { betContent, showContent };
        },
        getRandom (config) {
          var codeNumYardArr = [];

          for (var k = 0; k < config.sub.length; k++) {
            var len = config.sub[k].golbal[1] + config.sub[k].golbal[0];

            codeNumYardArr[k] = Array(len).fill(0);

            let noRptAry = createRandom(config.count || config.algorithm, 0, 10);
            for (let j = 0; j < noRptAry.length; j++) {
              codeNumYardArr[k][noRptAry[j]] = 1;
            }
          }

          return codeNumYardArr;
        }
      };

    case '111144002211':
    case '111144002222':
    case '111144002233':
    case '111144002244':
      return {
        getBetCount (config, codeArr) {
          return combine(codeArr, config.algorithm);
        },
        getBetResult (config, codeArr, social) {
          let betContent = '',
            showContent = '';

          for (let i = 0; i < codeArr.length; i++) {
            let a = '|';
            if (i == codeArr.length - 1) {
              a = '';
            }
            betContent += codeArr[i].sort() + a;
          }
          if (config.sub.length <= 1) {
            betContent = betContent.replace(/,/g, '|');
          }

          showContent = '[' + config.name + (config.rx ? ':' + social.join(',') : '') + '] ' + betContent;
          betContent = (config.rx ? algorithm.transWQBSGToNum(social) + ':' : '') + betContent;

          return { betContent, showContent };
        },
        getRandom (config) {
          let splitArrRes = [];
          let z = config.randomRule[0];// 需要随机几个数
          splitArrRes = createRandom(z, 0, 9);

          var codeNumYardArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);

            let count = config.randomRule[1][k];
            while (count--) {
              codeNumYardArr[k][splitArrRes.pop()] = 1;
            }
          }

          return codeNumYardArr;
        }
      };
  }

  return null;
};

// 组选
function combine (arr, arg) {
  // b 当前为几星；
  // c 为重号 重复几次
  // d 为 传入 C(n,m)的m值
  let b = arg[0],
    c = arg[1],
    d = arg[2],
    zu = arg[3];

  let a = 0;
  let n = 1;
  let flag = true;

  arr.map((item) => {
    if (item == '') {
      flag = false;
    }
  });

  if (flag) {
    if (zu == 120) {
      a = Combinatorics.C(arr[0].length, d);
    } else {
      let oneArr = arr[0];
      let twoArr = arr[1];
      if (c <= 1) {
        // 顺序置换
        oneArr = arr[1];
        twoArr = arr[0];
      }

      for (let i = 0; i < twoArr.length; i++) {
        for (let k = 0; k < oneArr.length; k++) {
          n = oneArr.length;
          if (oneArr.indexOf(twoArr[i]) >= 0) {
            n--;
          }
        }

        if (zu == 60 || zu == 20 || zu == 30 || zu == 10 || zu == 5) {
          a += Combinatorics.C(n, d);
        }
      }
    }
  } else {
    a = 0;
  }

  return a;
}

// 随机生成 注码
// createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
function createRandom (num, from, to) {
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
}

export default getGameAlgo;
