//根据业务前4位的 已经截取 所以会少两位
const dataFun = function(arg,Amt){
    arg = arg.toString();
    arg = '5501'+ arg.slice(4);
    const data = {
      numberLen: 1,
      defaultNavIndex: 0,
      5501221111: { 
        description: "从冠、亚、季、四、五、六、七、八、九、十任意位置上任意选择一个或一个以上号码奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "投注万位号码1，开奖号码万位是1，即中定位胆万位一等奖。",
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
        algorithm: '1',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "定位胆",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550133111111: { 
        description: "按照位置顺序从1〜10中选择1个数字构成1注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "投注万位号码1，开奖号码万位是1，即中定位胆万位一等奖。",
        rule: "从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。",
        tpl: "num1",
        code:550133111111,
        sub:[
            {unit:"冠军",golbal:[0,10],groupNo:550133111111,btn : true}, 
        ],
        algorithm: '1',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "猜冠军",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550144111122: { 
        description: "从各名次中各选择2个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550144111122,
        sub:[
            {unit:"冠军",golbal:[0,10],btn : true}, 
            {unit:"亚军",golbal:[0,10],btn : true}, 
        ],
        algorithm: '2',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "猜前二",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550155111122: { 
        description: "从各名次中各选择3个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550155111122,
        sub:[
          {unit:"冠军",golbal:[0,10],btn : true}, 
          {unit:"亚军",golbal:[0,10],btn : true}, 
          {unit:"季军",golbal:[0,10],btn : true}, 
        ],
        algorithm: '3',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "猜前三",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550166111122: { 
        description: "从各名次中各选择4个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550166111122,
        sub:[
          {unit:"冠军",golbal:[0,10],btn : true}, 
          {unit:"亚军",golbal:[0,10],btn : true}, 
          {unit:"季军",golbal:[0,10],btn : true}, 
          {unit:"第四",golbal:[0,10],btn : true}, 
        ],
        algorithm: '4',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "猜前四",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550177111122: { 
        description: "从各名次中各选择5个不重复的号码组成一注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550166111122,
        sub:[
          {unit:"冠军",golbal:[0,10],btn : true}, 
          {unit:"亚军",golbal:[0,10],btn : true}, 
          {unit:"季军",golbal:[0,10],btn : true}, 
          {unit:"第四",golbal:[0,10],btn : true}, 
          {unit:"第五",golbal:[0,10],btn : true}, 
        ],
        algorithm: '5',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "猜前五",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550144112222: { 
        description: "选择2个不同数字构成1注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550144112222,
        sub:[
            {unit:"",golbal:[0,10],btn : true}, 
        ],
        algorithm: '2',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "前二组选",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550155112222: { 
        description: "选择3个不同数字构成1注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550155112222,
        sub:[
            {unit:"",golbal:[0,10],btn : true}, 
        ],
        algorithm: '3',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "前三组选",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550166112222: { 
        description: "选择4个不同数字构成1注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550166112222,
        sub:[
            {unit:"",golbal:[0,10],btn : true}, 
        ],
        algorithm: '4',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "前四组选",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550177112222: { 
        description: "选择5个不同数字构成1注奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "num1",
        code:550177112222,
        sub:[
          {unit:"",golbal:[0,10],btn : true}, 
        ],
        algorithm: '5',
        format: ["n"],
        rank: [0, 1, 2, 3, 4],
        odds: !0,
        name: "前五组选",
        component: 'bjpk10fushi',
        betInitMoney: 2
      },
      550144111111:{
        name: "[前二直选单式]",
        description:"手动输入2个号码组成一注，所输入的号码与当期的前2个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "",
        algorithm: 2,  
        code: 550144111111,
        sub: [],
        component: 'simplex',
        betInitMoney: 2,
      },
      550155111111:{
        name: "[前三直选单式]",
        description:"手动输入2个号码组成一注，所输入的号码与当期的前2个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "",
        algorithm: 3,  
        code: 550155111111,
        sub: [],
        component: 'simplex',
        betInitMoney: 2,
      },
      550166111111:{
        name: "[前四直选单式]",
        description:"手动输入2个号码组成一注，所输入的号码与当期的前2个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "",
        algorithm: 4,  
        code: 550166111111,
        sub: [],
        component: 'simplex',
        betInitMoney: 2,
      },
      550177111111:{
        name: "[前五直选单式]",
        description:"手动输入2个号码组成一注，所输入的号码与当期的前2个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "",
        rule: "",
        tpl: "",
        algorithm: 5,  
        code: 550177111111,
        sub: [],
        component: 'simplex',
        betInitMoney: 2,
      },




      5501111111: {
        description: "猜冠亚军号码的总和，从3〜19、大、小、单或双中选择一个型态构成1注奖金最多<span style='color: #e60b0b;'>"+Amt+"</span>元",
        example: "开出号码为【1、2、4】和值为【7】是单亦是小，买单或小即中奖！",
        rule: "猜冠亚军号码的总和，从3〜19、大、小、单或双中选择一个型态构成1注奖金最多<span style='color: #e60b0b;'>"+Amt+"</span>元",
        tpl: "num7",
        vm: "num1",
        algorithm: '',
        code:5501111111,
        random:true, //true 关闭随机
        sub: {
          unit:"和值",
          golbal:[{num:'大'},{num:'小'},{num:'单'},{num:'双'},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},{num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19}],
          //3-10 18-11 大-双 排列的玩法编号
          groupNo:[],
          btn:['大','小','单','双']
        },
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