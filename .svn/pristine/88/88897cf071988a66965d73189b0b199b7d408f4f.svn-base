//根据业务前4位的 已经截取 所以会少两位
const dataFun = function (arg, bonusAmt) {
    arg = arg.toString();
    arg = '8801' + arg.slice(4);
    const data = {
        '8801111111': {
            description: "从0到27中选择一个数字进行投注，所选数值等于三个开奖号码的相加之和，特码数字，即为中奖。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">选择5，开奖号码为是113(和值为5(顺序不限，即为中奖。</span>',
            tpl: "num1",
            code: 8801111111,
            sub: [
                {selected:false,bonusAmt:0,groupNo:880111111100,num:'0',color:'pcddgay'},
                {selected:false,bonusAmt:0,groupNo:880111111101,num:'1',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111102,num:'2',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111103,num:'3',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111104,num:'4',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111105,num:'5',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111106,num:'6',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111107,num:'7',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111108,num:'8',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111109,num:'9',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111110,num:'10',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111111,num:'11',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111112,num:'12',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111113,num:'13',color:'pcddgay'},
                {selected:false,bonusAmt:0,groupNo:880111111114,num:'14',color:'pcddgay'},
                {selected:false,bonusAmt:0,groupNo:880111111115,num:'15',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111116,num:'16',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111117,num:'17',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111118,num:'18',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111119,num:'19',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111120,num:'20',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111121,num:'21',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111122,num:'22',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111123,num:'23',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111124,num:'24',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111125,num:'25',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111126,num:'26',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111127,num:'27',color:'pcddgay'},
            ],
            margin:'10',
            name: "和值",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '88011111113': {
            description: "从0到2中选择一个数字构成1注，所选数值其中包含三个开奖号码的相加之和(特码数字，即为中奖。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">选择2，开奖号码为233(和值为8，余数2，即为中奖。</span>',
            tpl: "num1",
            code: 88011111113,
            sub: [
                {selected:false,bonusAmt:0,groupNo:880111111130,num:'0'},
                {selected:false,bonusAmt:0,groupNo:880111111131,num:'1'},
                {selected:false,bonusAmt:0,groupNo:880111111132,num:'2'},
            ],
            margin:'10',
            name: "除3余数",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '88011111220': {
            description: "所选的投注项目，等于开出的三个号码加总的形态，即为中奖。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">投注大单，开奖号码为788(和值为23，即为中奖。</span>',
            tpl: "num1",
            code: 88011111220,
            sub: [
                {selected:false,bonusAmt:0,groupNo:880111112201,num:'大'},
                {selected:false,bonusAmt:0,groupNo:880111112202,num:'小'},
                {selected:false,bonusAmt:0,groupNo:880111112203,num:'单'},
                {selected:false,bonusAmt:0,groupNo:880111112204,num:'双'},
                {selected:false,bonusAmt:0,groupNo:880111112205,num:'大单'},
                {selected:false,bonusAmt:0,groupNo:880111112206,num:'小单'},
                {selected:false,bonusAmt:0,groupNo:880111112207,num:'大双'},
                {selected:false,bonusAmt:0,groupNo:880111112208,num:'小双'},
            ],
            margin:'220',
            name: "大小单双",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '88011111221': {
            description: "所选的投注项目，等于开出的三个号码加总的形态，即为中奖。极大：22~27，极小：0~5。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">投注极大，开奖号码为788(和值为23，即为中奖。</span>',
            tpl: "num1",
            code: 88011111221,
            sub: [
                {selected:false,bonusAmt:0,groupNo:880111112211,num:'极大'},
                {selected:false,bonusAmt:0,groupNo:880111112212,num:'极小'},
            ],
            margin:'10',
            name: "极大极小",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '8801111133': {
            description: "所选的投注项目，等于开出的三个号码加总的波色，即为中奖。红波：3、6、9、12、15、18、21、24；绿波：1、4、7、10、16、19、22、25；蓝波：2、5、8、11、17、20、23、26。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">投注蓝波，开奖号码为788(和值为23，即为中奖。</span>',
            tpl: "num1",
            code: 8801111133,
            sub: [
                {selected:false,bonusAmt:0,groupNo:880111113301,num:'红波',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111113302,num:'蓝波',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111113303,num:'绿波',color:'pcddgreen'},
            ],
            margin:'10',
            name: "色波",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '8801111144': {
            description: "选择一个型态进行投注，开出的三个号码总和为该型态，即为中奖。0~9为小边，10~17为中，18~27为大边。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">投注大边，开奖号码为888(和值为24，即为中奖。</span>',
            tpl: "num1",
            code: 8801111144,
            sub: [
                {selected:false,bonusAmt:0,groupNo:880111114401,num:'大边'},
                {selected:false,bonusAmt:0,groupNo:880111114402,num:'中边'},
                {selected:false,bonusAmt:0,groupNo:880111114403,num:'小边'},
            ],
            margin:'10',
            name: "色波",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '880111115511': {
            description: "选择一个型态投注，开出的三个号码相同，即为中奖。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">投注豹子，开奖号码为888(三同号，即为中奖。</span>',
            tpl: "num1",
            code: 880111115511,
            sub: [
                {selected:false,bonusAmt:bonusAmt,groupNo:880111115511,num:'豹子'},
            ],
            margin:'10',
            name: "豹子",
            component: 'pcddsum',
            betInitMoney: 2
        },
        '880122111103': {
            description: "选择0~9号码进行投注，开出三个投注号码为一等奖；开出二个投注号码为二等奖；开出一个投注号码为三等奖。奖金最高<span style='color: #e60b0b;'>"+bonusAmt+"</span>元",
            example: '<span class="example">投注8，开奖号码为888，即为中奖，中一等奖；开奖号码为128，中三等奖。</span>',
            tpl: "num1",
            code: 880122111103,
            sub: [
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'0'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'1'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'2'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'3'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'4'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'5'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'6'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'7'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'8'},
                {selected:false,bonusAmt:bonusAmt,groupNo:880122111103,num:'9'},
            ],
            margin:'10',
            name: "猜一码",
            component: 'pcddsum',
            betInitMoney: 2
        }
    }
    return data[arg];
};
export default {
    dataFun
}