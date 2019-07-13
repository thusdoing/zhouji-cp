// 根据业务前4位的 已经截取 所以会少两位
const dataFun = function (arg) {
  arg = arg.toString();
  arg = '8801' + arg.slice(4);
  console.log(arg)
  const data = {
    numberLen: 1,
    defaultNavIndex: 0,
    8801111111: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '从0到27中选择一个数字进行投注，所选数值等于三个开奖号码的相加之和(特码数字)，即为中奖。',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 8801111111,
      random: true, // true 关闭随机
      sub: {
        unit: '和值',
        golbal: [
          { num: 0 },
          { num: 1 },
          { num: 2 }, 
          { num: 3 }, 
          { num: 4 }, 
          { num: 5 }, 
          { num: 6 }, 
          { num: 7 }, 
          { num: 8 }, 
          { num: 9 },
          { num: 10 }, 
          { num: 11 }, 
          { num: 12 }, 
          { num: 13 }, 
          { num: 14 }, 
          { num: 15 }, 
          { num: 16 }, 
          { num: 17 }, 
          { num: 18 },
          { num: 19 },
          { num: 20 },
          { num: 21 },
          { num: 22 },
          { num: 23 },
          { num: 24 },
          { num: 25 },
          { num: 26 },
          { num: 27 }],       
        },
      multiOdds: !0,
      name: '和值',
      component: 'sumValue',
      betInitMoney: 2,
      lie:4,
      checkbox:false


    },
    880122111103: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '选择0~9其中一个号码进行投注，开出的三个号码出现一个以上的投注号码，即为中奖。分三个奖级：三等奖，开出的三个号码里只有一个投注号码，二等奖，开出的三个号码里有两个投注号码，一等奖，开出的三个号码都是投注号码',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 880122111103,
      random: true, // true 关闭随机
      sub: {
        unit: '猜一码',
        golbal: [
          { num: 0 },
          { num: 1 },
          { num: 2 }, 
          { num: 3 }, 
          { num: 4 }, 
          { num: 5 }, 
          { num: 6 }, 
          { num: 7 }, 
          { num: 8 }, 
          { num: 9 }],       
        },
      multiOdds: !0,
      name: '猜一码',
      component: 'sumValue',
      betInitMoney: 2,
      lie:4,
      checkbox:false
    },
    88011111113: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '从0到2中选择一个数字构成1注，所选数值其中包含三个开奖号码的相加之和(特码数字)，即为中奖。',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 88011111113,
      random: true, // true 关闭随机
      sub: {
        unit: '除三余数',
        golbal: [
          { num: 0 },
          { num: 1 },
          { num: 2 }],       
        },
      multiOdds: !0,
      name: '除三余数',
      component: 'sumValue',
      betInitMoney: 2,
      lie:3,
      checkbox:false
    },
    88011111220: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '所选的投注项目，等于开出的三个号码加总的形态，即为中奖。',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 88011111220,
      random: true, // true 关闭随机
      sub: {
        unit: '混合',
        golbal: [
          { num: '大' }, { num: '小' }, { num: '单' }, { num: '双' },{ num: '大单' }, { num: '小单' }, { num: '大双' }, { num: '小双' }],       
        },
      multiOdds: !0,
      name: '大小单双',
      component: 'sumValue',
      betInitMoney: 2,
      lie:4
    },
    88011111221: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '所选的投注项目，等于开出的三个号码加总的形态，即为中奖。极大：22~27，极小：0~5。',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 88011111221,
      random: true, // true 关闭随机
      sub: {
        unit: '混合',
        golbal: [
          { num: '极大' }, { num: '极小' }],       
        },
      multiOdds: !0,
      name: '极大极小',
      component: 'sumValue',
      betInitMoney: 2,
      lie:2
    },
    8801111133: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '所选的投注项目，等于开出的三个号码加总的波色，即为中奖。红波：3、6、9、12、15、18、21、24；绿波：1、4、7、10、16、19、22、25；蓝波：2、5、8、11、17、20、23、26',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 8801111133,
      random: true, // true 关闭随机
      sub:  { golbal:[{num:"红波",name:'red'},{num:"蓝波",name:'blue'},{num:"绿波",name:'green'}]},
      bose: [[{groupName:3,color:'red'},
            {groupName:6,color:'red'},
            {groupName:9,color:'red'},
            {groupName:12,color:'red'},
            {groupName:15,color:'red'},
            {groupName:18,color:'red'},
            {groupName:21,color:'red'},
            {groupName:24,color:'red'}],
            [{groupName:2,color:'blue'},
            {groupName:5,color:'blue'},
            {groupName:8,color:'blue'},
            {groupName:11,color:'blue'},
            {groupName:17,color:'blue'},
            {groupName:20,color:'blue'},
            {groupName:23,color:'blue'},
            {groupName:26,color:'blue'}],
            [{groupName:1,color:'green'},
            {groupName:4,color:'green'},
            {groupName:7,color:'green'},
            {groupName:10,color:'green'},
            {groupName:16,color:'green'},
            {groupName:19,color:'green'},
            {groupName:22,color:'green'},
            {groupName:25,color:'green'}]],     
      multiOdds: !0,
      name: '色波',
      component: 'sumValue',
      betInitMoney: 2,
      lie:300,
    },
    8801111144: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '选择一个型态进行投注，开出的三个号码总和为该型态，即为中奖。0~9为小边，10~17为中，18~27为大边。',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 8801111144,
      random: true, // true 关闭随机
      sub: {
        unit: '中边',
        golbal: [
          { num: '大边' }, { num: '中边' }, { num: '小边' }],       
        },
      multiOdds: !0,
      name: '大中小边',
      component: 'sumValue',
      betInitMoney: 2,
      lie:3
    },
    880111115511: {
      description: '从0-27、大、小、单、双中任意选择1个或1个以上号码',
      example: '开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！',
      rule: '选择一个型态投注，开出的三个号码相同，即为中奖。',
      tpl: 'num7',
      vm: 'num1',
      algorithm: '',
      code: 880111115511,
      random: true, // true 关闭随机
      sub: {
        unit: '豹子',
        golbal: [
          { num: '豹子' }],       
        },
      multiOdds: !0,
      name: '豹子',
      component: 'sumValue',
      betInitMoney: 2,
      lie:1
    },
  };
  return data[arg];
};
export default{
  dataFun
};
