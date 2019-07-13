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
      name: "两同号单选",
      component: 'fastThree',
      betInitMoney: 2,
      selectionButton:true
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
        {unit:"",golbal:[11,22,33,44,55,66],btn:false}, 
      ],
      format: ["n"],
      name: "两同号复选",
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
        {unit:"",golbal:[1,2,3,4,5,6],btn:false}, 
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
        {unit:"",golbal:[111,222,333,444,555,666],btn:false}, 
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
        {unit:"",golbal:[1,2,3,4,5,6],btn:false}, 
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
      description: "从3-18、大、小、单、双中任意选择1个或1个以上号码。奖金最高<span style='color: #e60b0b;'>" + bonusAmt + "</span>元",
      example: "开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！",
      rule: "以3个数字号码的和值为依据进行购买，和值在3-10之间为小（包括3与10），<br>和值在11-18之间为大（包括11与18），和值奇数为单、偶数为双（0算双数）",
      code: 2211220011,
      sub: [
        [
          {name:'大',number:'k3da',bonusAmt:"",groupNo:"22001199",selected:false},
          {name:'小',number:'k3xiao',bonusAmt:"",groupNo:"22001199",selected:false},
          {name:'单',number:'k3dan',bonusAmt:"",groupNo:"22001199",selected:false},
          {name:'双',number:'k3shuang',bonusAmt:"",groupNo:"22001199",selected:false},
        ],
        [
          {name:'3',number:'k3s3',bonusAmt:"",groupNo:"22001111",selected:false},
          {name:'4',number:'k3s4',bonusAmt:"",groupNo:"22001122",selected:false},
          {name:'5',number:'k3s5',bonusAmt:"",groupNo:"22001133",selected:false},
          {name:'6',number:'k3s6',bonusAmt:"",groupNo:"22001144",selected:false},
          {name:'7',number:'k3s7',bonusAmt:"",groupNo:"22001155",selected:false},
          {name:'8',number:'k3s8',bonusAmt:"",groupNo:"22001166",selected:false},
          {name:'9',number:'k3s9',bonusAmt:"",groupNo:"22001177",selected:false},
          {name:'10',number:'k3s10',bonusAmt:"",groupNo:"22001188",selected:false},
        ],
        [
          {name:'11',number:'k3s11',bonusAmt:"",groupNo:"22001188",selected:false},
          {name:'12',number:'k3s12',bonusAmt:"",groupNo:"22001177",selected:false},
          {name:'13',number:'k3s13',bonusAmt:"",groupNo:"22001166",selected:false},
          {name:'14',number:'k3s14',bonusAmt:"",groupNo:"22001155",selected:false},
          {name:'15',number:'k3s15',bonusAmt:"",groupNo:"22001144",selected:false},
          {name:'16',number:'k3s16',bonusAmt:"",groupNo:"22001133",selected:false},
          {name:'17',number:'k3s17',bonusAmt:"",groupNo:"22001122",selected:false},
          {name:'18',number:'k3s18',bonusAmt:"",groupNo:"22001111",selected:false},
        ],
      ],
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