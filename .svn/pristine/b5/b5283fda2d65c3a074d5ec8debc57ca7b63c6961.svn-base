/* eslint-disable */
/*
    玩法的 注数计算及展示
*/
// import algorithm from '@/assets/js/algorithm';
import Combinatorics from 'core/tools/bet/combinatorics';
// import playMethods from '@/assets/js/playMethods';
const result = function (groundNo) {
  groundNo = '5501' + groundNo.slice(4);

  switch (groundNo) {
    case '5501221111': return {
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
                splitArr += '冠军';
                break;
              case 1:
                splitArr += '亚军';
                break;
              case 2:
                splitArr += '季军';
                break;
              case 3:
                splitArr += '第四';
                break;
              case 4:
                splitArr += '第五';
                break;
              case 5:
                splitArr += '第六';
                break;
              case 6:
                splitArr += '第七';
                break;
              case 7:
                splitArr += '第八';
                break;
              case 8:
                splitArr += '第九';
                break;
              case 9:
                splitArr += '第十';
                break;
              default:
                break;
            }

            betRet.betContent = codeArr[i].sort((a, b) => { return a - b; }).join('|');
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

        var a = Math.floor(Math.random() * config.sub.length),
          b = Math.floor(Math.random() * config.sub[0].golbal[1]);

        codeNumYardArr[a][b] = 1;

        return codeNumYardArr;
      }
    };
    case '550133111111':
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
                  splitArr += '冠军';
                  break;
                case 1:
                  splitArr += '亚军';
                  break;
                case 2:
                  splitArr += '季军';
                  break;
                case 3:
                  splitArr += '第四';
                  break;
                case 4:
                  splitArr += '第五';
                  break;
                case 5:
                  splitArr += '第六';
                  break;
                case 6:
                  splitArr += '第七';
                  break;
                case 7:
                  splitArr += '第八';
                  break;
                case 8:
                  splitArr += '第九';
                  break;
                case 9:
                  splitArr += '第十';
                  break;
                default:
                  break;
              }

              betRet.betContent = codeArr[i].sort((a, b) => { return a - b ;}).join(',');
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

          var a = Math.floor(Math.random() * config.sub.length),
            b = Math.floor(Math.random() * config.sub[0].golbal[1]);

          codeNumYardArr[a][b] = 1;

          return codeNumYardArr;
        }
      };
    case '550177111122':
    case '550166111122':
    case '550155111122':
    case '550144111122': return {
      getBetCount (config, codeArr) {
        let sum = 0;
        switch (config.algorithm) {
          case '2':
            for (let i of codeArr[0]) {
              for (let j of codeArr[1]) {
                if (i != j) {
                  sum += 1;
                }
              }
            }
            return sum;
          case '3':
            for (let i of codeArr[0]) {
              for (let j of codeArr[1]) {
                for (let k of codeArr[2]) {
                  if (i != j && i != k && k != i) {
                    sum += 1;
                  }
                }
              }
            }
            return sum;
          case '4':
            for (let i of codeArr[0]) {
              for (let j of codeArr[1]) {
                for (let k of codeArr[2]) {
                  for (let o of codeArr[3]) {
                    if (i != j &&
                                            i != k &&
                                            i != o &&
                                            j != k &&
                                            j != o &&
                                            k != o
                    ) {
                      sum += 1;
                    }
                  }
                }
              }
            }
            return sum;
          case '5':
            for (let i of codeArr[0]) {
              for (let j of codeArr[1]) {
                for (let k of codeArr[2]) {
                  for (let o of codeArr[3]) {
                    for (let m of codeArr[4]) {
                      if (i != j &&
                                                i != k &&
                                                i != o &&
                                                i != m &&
                                                j != m &&
                                                j != k &&
                                                j != o &&
                                                k != o &&
                                                k != m &&
                                                o != m
                      ) {
                        sum += 1;
                      }
                    }
                  }
                }
              }
            }
            return sum;
        }
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
    case '550155112222':
    case '550166112222':
    case '550177112222':
    case '550144112222':
      return {
        getBetCount (config, codeArr) {
          return Combinatorics.C(codeArr[0].length, parseInt(config.algorithm));
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
          let codeNumYardArr = [];
          let ranArr = [];
          let i = config.sub.length;
          for (let k = 0; k < i; k++) {
            codeNumYardArr[k] = Array(config.sub[k].golbal[1]).fill(0);
          }
          while (ranArr.length < config.algorithm) {
            let rad = Math.floor(Math.random() * config.sub[0].golbal[1]);
            if (ranArr.indexOf(rad) < 0) {
              ranArr.push(rad);
            }
          }
          ranArr.map((el) => {
            codeNumYardArr[0][el] = 1;
          });
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
    }
    else {
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

export default result;
