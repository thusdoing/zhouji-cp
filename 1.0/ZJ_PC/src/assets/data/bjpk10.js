//根据业务前4位的 已经截取 所以会少两位
const dataFun = function(arg,bonusAmt){
    arg = arg.toString();
    arg = '5501'+ arg.slice(4);
    const data = {
      numberLen: 1,
      defaultNavIndex: 0,
      5501221111: { 
        description: "从冠、亚、季、四、五、六、七、八、九、十任意位置上任意选择一个或一个以上号码奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">若所选的号码和位置跟开奖的号码和位置相符，即为中奖。</span>',
        rule: "从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。",
        tpl: "num1",
        code:5501221111,
        sub:[
          {unit:"冠军",golbal:[0,10],groupNo:550122111101,btn : true}, 
          {unit:"亚军",golbal:[0,10],groupNo:550122111102,btn : true}, 
          {unit:"季军",golbal:[0,10],groupNo:550122111103,btn : true}, 
          {unit:"第四",golbal:[0,10],groupNo:550122111104,btn : true}, 
          {unit:"第五",golbal:[0,10],groupNo:550122111105,btn : true},
          {unit:"第六",golbal:[0,10],groupNo:550122111106,btn : true},
          {unit:"第七",golbal:[0,10],groupNo:550122111107,btn : true},
          {unit:"第八",golbal:[0,10],groupNo:550122111108,btn : true},
          {unit:"第九",golbal:[0,10],groupNo:550122111109,btn : true},
          {unit:"第十",golbal:[0,10],groupNo:550122111110,btn : true},
        ],
        enableMapping: [21014, 21015, 21016, 21017, 21018],
        algorithm: '',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "定位胆",
        component: 'bjpk10ddw',
        betInitMoney: 2
      },
      550133111111: {
        description: "按照位置顺序从1〜10中选择1个数字构成1注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">若所选号码与开奖号码第1位数字相同，即为中奖。</span>',
        rule: "从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。",
        tpl: "num1",
        sub: [
          {unit:"冠军",golbal:[0,10],btn : true},
        ],
        algorithm: ["R1"],
        code:550133111111,
        format: ["n|n|n|n|n"],
        rank: [0, 1, 2, 3, 4],
        betInitMoney:2,//每个玩法的初始金额
        name: "猜冠军",
        component: 'bjpk10zhixuan',
        betInitMoney: 2
      },
      550144111122: {
        description: "从各名次中各选择2个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。</span>',
        rule: "从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。",
        tpl: "num1",
        sub: [
          {unit:"冠军",golbal:[0,10],btn : true},
          {unit:"亚军",golbal:[0,10],btn : true},
        ],
        algorithm: ["R1"],
        code:550144111122,
        format: ["n|n|n|n|n"],
        rank: [0, 1, 2, 3, 4],
        betInitMoney:2,//每个玩法的初始金额
        name: "前二直选",
        component: 'bjpk10zhixuan',
        betInitMoney: 2
      },
      550155111122: {
        description: "从各名次中各选择3个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前3位相同，且顺序一致，即为中奖。</span>',
        rule: "从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。",
        tpl: "num1",
        sub: [
          {unit:"冠军",golbal:[0,10],btn : true},
          {unit:"亚军",golbal:[0,10],btn : true},
          {unit:"季军",golbal:[0,10],btn : true},
        ],
        algorithm: ["R1"],
        code:550155111122,
        format: ["n|n|n|n|n"],
        rank: [0, 1, 2, 3, 4],
        betInitMoney:2,//每个玩法的初始金额
        name: "前三直选",
        component: 'bjpk10zhixuan',
        betInitMoney: 2
      },
      550166111122: {
        description: "从各名次中各选择4个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前4位相同，且顺序一致，即为中奖。</span>',
        rule: "从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。",
        tpl: "num1",
        sub: [
          {unit:"冠军",golbal:[0,10],btn : true},
          {unit:"亚军",golbal:[0,10],btn : true},
          {unit:"季军",golbal:[0,10],btn : true},
          {unit:"第四",golbal:[0,10],btn : true},
        ],
        algorithm: ["R1"],
        code:550166111122,
        format: ["n|n|n|n|n"],
        rank: [0, 1, 2, 3, 4],
        betInitMoney:2,//每个玩法的初始金额
        name: "前四直选",
        component: 'bjpk10zhixuan',
        betInitMoney: 2
      },
      550177111122: {
        description: "从各名次中各选择5个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前5位相同，且顺序一致，即为中奖。</span>',
        rule: "从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。",
        tpl: "num1",
        sub: [
          {unit:"冠军",golbal:[0,10],btn : true},
          {unit:"亚军",golbal:[0,10],btn : true},
          {unit:"季军",golbal:[0,10],btn : true},
          {unit:"第四",golbal:[0,10],btn : true},
          {unit:"第五",golbal:[0,10],btn : true},
        ],
        algorithm: ["R1"],
        code:550177111122,
        format: ["n|n|n|n|n"],
        rank: [0, 1, 2, 3, 4],
        betInitMoney:2,//每个玩法的初始金额
        name: "前五直选",
        component: 'bjpk10zhixuan',
        betInitMoney: 2
      },
      550144112222:{
        description: "选择2个不同数字构成1注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前2位相同，不限顺序，即为中奖。</span>',
        rule: null,
        tpl: "01,02,03,04,05",
        algorithm: 2,
        code:550144112222,
        sub: [{unit:'',golbal:[0,10],btn : true} ],
        format: ["n,n,n,n,n"],
        name: "前二组选",
        component: 'bjpk10zuxuan',
        betInitMoney: 2,
        count:1
      },
      550155112222:{
        description: "选择3个不同数字构成1注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前3位相同，不限顺序，即为中奖。</span>',
        rule: null,
        tpl: "01,02,03,04,05",
        algorithm: 3,
        code:550155112222,
        sub: [{unit:'',golbal:[0,10],btn : true} ],
        format: ["n,n,n,n,n"],
        name: "前三组选",
        component: 'bjpk10zuxuan',
        betInitMoney: 2,
        count:1
      },
      550166112222:{
        description: "选择4个不同数字构成1注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前4位相同，不限顺序，即为中奖。</span>',
        rule: null,
        tpl: "01,02,03,04,05",
        algorithm: 4,
        code:550166112222,
        sub: [{unit:'',golbal:[0,10],btn : true} ],
        format: ["n,n,n,n,n"],
        name: "前四组选",
        component: 'bjpk10zuxuan',
        betInitMoney: 2,
        count:1
      },
      550177112222:{
        description: "选择5个不同数字构成1注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">所选号码与开奖号码的前5位相同，不限顺序，即为中奖。</span>',
        rule: null,
        tpl: "01,02,03,04,05",
        algorithm: 5,
        code:550177112222,
        sub: [{unit:'',golbal:[0,10],btn : true} ],
        format: ["n,n,n,n,n"],
        name: "前五组选",
        component: 'bjpk10zuxuan',
        betInitMoney: 2,
        count:1
      },

      550144111111: {
        description: "手动输入号码，输入2个号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example:'<span class="example">所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。</span>',
        rule: null,
        tpl: "01 06,07 09,10 04",
        algorithm: 2,
        code:550144111111,
        sub: '',
        format: ["n,n,n,n,n"],
        name: "前二单式",
        component: 'bjpk10ds',
        betInitMoney: 2,
        count:1
      },
      550155111111: {
        description: "手动输入号码，输入3个号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example:'<span class="example">所选号码与开奖号码的前3位相同，且顺序一致，即为中奖。</span>',
        rule: null,
        tpl: "01 06 05,07 09 05,10 04 05",
        algorithm: 3,
        code:550155111111,
        sub: '',
        format: ["n,n,n,n,n"],
        name: "前三单式",
        component: 'bjpk10ds',
        betInitMoney: 2,
        count:1
      },
      550166111111: {
        description: "手动输入号码，输入4个号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example:'<span class="example">所选号码与开奖号码的前4位相同，且顺序一致，即为中奖。</span>',
        rule: null,
        tpl: "01 06 03 09,07 09 04 06,10 04 01 02",
        algorithm: 4,
        code:550166111111,
        sub: '',
        format: ["n,n,n,n,n"],
        name: "前四单式",
        component: 'bjpk10ds',
        betInitMoney: 2,
        count:1
      },
      550177111111: {
        description: "手动输入号码，输入5个号码组成一注奖金<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example:'<span class="example">所选号码与开奖号码的前5位相同，且顺序一致，即为中奖。</span>',
        rule: null,
        tpl: "01 06 07 09 10，04 06 07 08 09",
        algorithm: 5,
        code:550177111111,
        sub: '',
        format: ["n,n,n,n,n"],
        name: "前五单式",
        component: 'bjpk10ds',
        betInitMoney: 2,
        count:1
      },


      5501111111: {
        description: "猜冠亚军号码的总和，从3〜19、大、小、单或双中选择一个型态构成1注奖金最多<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
        example: '<span class="example">和值：若开奖号码的前两位总和与投注数字相同，即为中奖。<br>大小：开奖号码第一位第二位总和在3〜11时为小，12〜19时为大。<br>单双：开奖号码第一位第二位总和为单号时为单，为双号时为双。</span>',
        rule: "以3个数字号码的和值为依据进行购买，和值在3-10之间为小（包括3与10），<br>和值在11-18之间为大（包括11与18），和值奇数为单、偶数为双（0算双数）",
        tpl: "num7",
        vm: "num1",
        algorithm: '',
        code:5501111111,
        random:true, //true 关闭随机
        sub: [
          {
            unit:"",
            golbal:[[3,4,5,6,7,8,9,10,11],[12,13,14,15,16,17,18,19]],
            //3-10 18-11 大-双 排列的玩法编号
            groupNo:['550111111103',
              '550111111104',
              '550111111105',
              '550111111106',
              '550111111107',
              '550111111108',
              '550111111109',
              '550111111110',
              '550111111111',
              '550111111112',
              '550111111113',
              '550111111114',
              '550111111115',
              '550111111116',
              '550111111117',
              '550111111118',
              '550111111119',
              '550111111120',
              '550111111121',
              '550111111122',
              '550111111123'
              
                    ],
            junior:['大','小','单','双'],
            btn:['大','小','单','双','清']},  
        ],
        mapping: [21338, 21339, 21340, 21341, 21342, 21343, 21344, 21345],
        multiOdds: !0,
        name: "冠亚和",
        component: 'bjpk10sum',
        betInitMoney: 2
      }
    }
    return data[arg];
  };
  export default{
    dataFun
  }