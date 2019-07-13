//根据业务前4位的 已经截取 所以会少两位
const dataFun = function(arg,bonusAmt){
  arg = arg.toString();
  arg = '2211'+ arg.slice(4);
  const data = {
    numberLen: 1,
    defaultNavIndex: 0,
    221111002211: {
      description: "对三个号码中两个指定的相同号码和一个指定的不同号码进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：同号11，不同号2；开奖号码：112，即中二同号单选。",
      rule: "选择1对相同号码和1个不同号码投注，选号与奖号相同（顺序不限），即中奖。",
      tpl: "num6",
      vm: "num1",
      random:false, //true 关闭随机
      algorithm: 1,
      randomCount: 2,
      code:221111002211,
      sub: [
        {unit:"",golbal:[11,22,33,44,55,66],btn:false},
        {unit:"",golbal:[1,2,3,4,5,6],btn:false}, 
      ],
      format: ["m|n"],
      isAllowSamePos: !1,
      name: "二同号单选",
      component: 'fastThree',
      betInitMoney: 2
    },
    221111002222: {
      description: "对三个号码中两个指定的相同号码和一个任意号码进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：11；开奖号码：112，即中二同号复选。",
      rule: "从11～66中任选1个或多个号码，选号与奖号（包含11～66，不限顺序）相同，即中奖。",
      tpl: "num6",
      vm: "num1",
      algorithm: 1,
      randomCount: 1,
      code:221111002222,
      random:false, //true 关闭随机
      sub: [
        {unit:"二同号复选",golbal:[11,22,33,44,55,66],btn:false}, 
      ],
      format: ["n"],
      name: "二同号复选",
      component: 'fastThree',
      betInitMoney: 2
    },
    221144002211: {
      description: "对三个号码中两个指定的不同号码和一个任意号码进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：12；开奖号码：123，即中二不同号。",
      rule: "从1～6中任选2个或多个号码，所选号码与开奖号码任意2个号码相同，即中奖。",
      tpl: "num6",
      vm: "num1",
      algorithm: 2,
      randomCount: 2,
      code:221144002211,
      random:false, //true 关闭随机
      sub: [
        {unit:"标准",golbal:[1,2,3,4,5,6],btn:false}, 
      ],
      format: ["m|n"],
      name: "二不同号",
      component: 'fastThree',
      betInitMoney: 2
    },
    221111003311: {
      description: "从所有相同的三个号码（111、222、…、666）中任意选择一组号码进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：111；开奖号码：111，即中三同号单选。",
      rule: "对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖。",
      tpl: "num6",
      vm: "num1",
      algorithm: 1,
      randomCount: 1,
      code:221111003311,
      random:false, //true 关闭随机
      sub: [
        {unit:"三同单选",golbal:[111,222,333,444,555,666],btn:false}, 
      ],
      format: ["n"],
      name: "三同号单选",
      component: 'fastThree',
      betInitMoney: 2
    },
    221111003322: {
      description: "对所有相同的三个号码（111、222、…、666）进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：三同号通选；开奖号码：111，即中三同号通选。",
      rule: "对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖。",
      tpl: "num6",
      vm: "num1",
      algorithm: 1,
      randomCount: 1,
      code:221111003322,
      common: true,
      show: [111,222,333,444,555,666],
      random:true, //true 关闭随机
      sub: [
        {unit:"",golbal:['三同号通选'],btn:false}, 
      ],
      name: "三同号复选",
      component: 'fastThree',
      betInitMoney: 2
    },
    221144003311: {
      description: "对三个各不相同的号码进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：123；开奖号码：123，即中三不同号。",
      rule: "从1～6中任选3个或多个号码，所选号码与开奖号码的3个号码相同即中奖。",
      tpl: "num6",
      vm: "num1",
      algorithm: 3,
      randomCount: 3,
      code:221144003311,
      random:false, //true 关闭随机
      sub: [
        {unit:"标准",golbal:[1,2,3,4,5,6],btn:false}, 
      ],
      format: ["m|n|n"],
      name: "三不同号",
      component: 'fastThree',
      betInitMoney: 2
    },
    221133001111: {
      description: "对所有三个相连的号码（仅限：123、234、345、456）进行投注。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "投注方案：三连号通选；开奖号码：456，即中三连号通选。",
      rule: "对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖。",
      tpl: "num6",
      vm: "num1",
      algorithm: 1,
      randomCount: 1,
      code:221133001111,
      common: true,
      show: [123,234,345,456],
      random:true, //true 关闭随机
      sub: [
        {unit:"",golbal:['三连号通选'],btn:false}, 
      ],
      name: "三连号",
      component: 'fastThree',
      betInitMoney: 2
    },
    2211220011: {
      description: "从3-18、大、小、单、双中任意选择1个或1个以上号码。奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
      example: "开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！",
      rule: "以3个数字号码的和值为依据进行购买，和值在3-10之间为小（包括3与10），<br>和值在11-18之间为大（包括11与18），和值奇数为单、偶数为双（0算双数）",
      tpl: "num7",
      vm: "num1",
      algorithm: '',
      code:2211220011,
      random:true, //true 关闭随机
      sub: [
        {
          unit:"",
          golbal:[[3,4,5,6,7,8,9,10],[18,17,16,15,14,13,12,11]],
          //3-10 18-11 大-双 排列的玩法编号
          groupNo:["222222001111","222222001122","222222001133","222222001144",
                    "222222001155","222222001166","222222001177","222222001188",
                    "222222001199","222222001199","222222001199","222222001199"
                  ],
          junior:['大','小','单','双'],
          btn:['大','小','单','双','清']},  
      ],
      mapping: [21338, 21339, 21340, 21341, 21342, 21343, 21344, 21345],
      multiOdds: !0,
      name: "和值",
      component: 'sumValue',
      betInitMoney: 2
    }
  }
  return data[arg];
};
export default{
  dataFun
}