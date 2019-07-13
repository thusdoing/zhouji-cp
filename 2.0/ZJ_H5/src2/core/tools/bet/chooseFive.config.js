/* eslint-disable */
// getBetCount 计算注数
const getGameAlgo = function (groundNo) {
  groundNo = groundNo.slice(0, 2) + '01' + groundNo.toString().slice(4);

  switch (groundNo) {
    case '440111001122':
    case '440111003322':
    case '440111002222':
    case '4401990011':
    case '4401990022':
      return {
        getBetCount (codeNum) {
          let gameNumber = 0;
          for (let i = 0; i < codeNum.length; i++) {
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                gameNumber++;
              }
            }
          }
          return gameNumber;
        }
      };
    case '440122002222':
    case '440122003322':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 2);
        }
      };
    case '440133002222':
    case '440133003322':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 3);
        }
      };
    case '440144001122':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 4);
        }
      };
    case '440155001122':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 5);
        }
      };
    case '440166001122':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 6);
        }
      };
    case '440177001122':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 7);
        }
      };
    case '440188001122':
      return {
        getBetCount (codeNum) {
          let gameNum = [];
          for (let index = 0; index < codeNum[0].length; index++) {
            if (codeNum[0][index] == 1) {
              gameNum.push(index + 1);
            }
          }
          return combination(gameNum.length, 8);
        }
      };
    case '440122002233':
    case '440122003333':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) { tuoMa = temporary; }
          }
          return danMa * tuoMa;
        }
      };
    case '440133002233':
    case '440133003333':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) {
              tuoMa = combination(temporary, 2);
            }
          }
          return danMa * tuoMa;
        }
      };
    case '440144001133':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) {
              tuoMa = combination(temporary, 3);
            }
          }
          return danMa * tuoMa;
        }
      };
    case '440155001133':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) {
              tuoMa = combination(temporary, 4);
            }
          }
          return danMa * tuoMa;
        }
      };
    case '440166001133':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) {
              tuoMa = combination(temporary, 5);
            }
          }
          return danMa * tuoMa;
        }
      };
    case '440177001133':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) {
              tuoMa = combination(temporary, 6);
            }
          }
          return danMa * tuoMa;
        }
      };
    case '440188001133':
      return {
        getBetCount (codeNum) {
          let danMa = 0;
          let tuoMa = 0;
          for (let i = 0; i < codeNum.length; i++) {
            let temporary = 0;
            for (let index = 0; index < codeNum[i].length; index++) {
              if (codeNum[i][index] == 1) {
                temporary++;
              }
            }
            if (i == 0) { danMa = temporary; } else if (i == 1) {
              tuoMa = combination(temporary, 7);
            }
          }
          return danMa * tuoMa;
        }
      };
    case '440122001122':
      return {
        getBetCount (codeNum) {
          let num = [[], []];
          for (const i in codeNum) {
            for (const j in codeNum[i]) {
              if (codeNum[i][j] == 1) {
                num[i].push(parseInt(j) + 1);
              }
            }
          }
          let codeNumber = 0;
          for (const i in num[0]) {
            for (const j in num[1]) {
              if (num[0][i] != num[1][j]) {
                codeNumber++;
              }
            }
          }
          return codeNumber;
        }
      };
    case '440133001122':
      return {
        getBetCount (codeNum) {
          let num = [[], [], []];
          for (const i in codeNum) {
            for (const j in codeNum[i]) {
              if (codeNum[i][j] == 1) {
                num[i].push(parseInt(j) + 1);
              }
            }
          }
          let codeNumber = 0;
          for (const i in num[0]) {
            for (const j in num[1]) {
              for (const key in num[2]) {
                if (num[0][i] != num[1][j] && num[0][i] != num[2][key] && num[1][j] != num[2][key]) {
                  codeNumber++;
                }
              }
            }
          }
          return codeNumber;
        }
      };
    case '440111003311':
    case '440122001111':
    case '440122002211':
    case '440122003311':
    case '440133001111':
    case '440133002211':
    case '440133003311':
    case '440144001111':
    case '440155001111':
    case '440166001111':
    case '440177001111':
    case '440188001111':

    case '550144111111':
    case '550155111111':
    case '550166111111':
    case '550177111111':
      return {
        getBetCount (codeNum) {
          return codeNum.length;
        }
      };
  }
};

function combination (m, n) {
  let gameNumber = 0;
  if (m < n) {
    gameNumber = 0;
  } else if (m == n) {
    gameNumber = 1;
  } else {
    gameNumber = stratum(m) / (stratum(n) * stratum(m - n));
  }
  return gameNumber;
}
function stratum (stNum) {
  let result = stNum;
  for (let index = 1; index < stNum; index++) {
    result = result * index;
  }

  return result;
}

export default getGameAlgo;
