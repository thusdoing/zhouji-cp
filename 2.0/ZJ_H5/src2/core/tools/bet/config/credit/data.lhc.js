// 根据业务前4位的 已经截取 所以会少两位
const dataFun = function (arg, obj,openTime) {

  
  const CurentTime = function (openTime) 
  { 
    if(!openTime) openTime=Date.now();
      var now = new Date(openTime); 
      var y = now.getFullYear(); 
      var m = now.getMonth()+1; 
      var d = now.getDate(); 
      if (m < 10) m = ''+'0'+m; 
      if (d < 10) d = ''+'0'+d; 
      var year = Number(''+y+m+d)
      if(year<=20190204){
          return 2018
      }else if(year>20190204&&year <=20200124){
          return 2019
      }else if(year>20200124&&year <= 20210211){
          return 2020
      }else if(year>20210211&&year <= 20220131){
          return 2021
      }else if(year>20220131&&year <= 20230121){
          return 2022
      }else if(year>20230121&&year <= 20240209){
          return 2023
      };
  }
  const currentYear = CurentTime(openTime)
  arg = arg.toString();
  arg = '6601' + arg.slice(4);
  const zooList = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
  const wuxingList = ['木', '水', '金', '火', '木', '土', '金', '火', '水', '土', '金', '木', '水', '土', '火', '木', '水', '金', '火', '木', '土', '金', '火', '水', '土', '金', '木', '水', '土', '火'];
  if (!obj) obj = {};
  const ball = [
    { betAmt: '', select: false, groupName: '01', wuxing: wuxingList[Math.floor((currentYear + 1 - '01') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '01') % 12] },
    { betAmt: '', select: false, groupName: '02', wuxing: wuxingList[Math.floor((currentYear + 1 - '02') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '02') % 12] },
    { betAmt: '', select: false, groupName: '03', wuxing: wuxingList[Math.floor((currentYear + 1 - '03') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '03') % 12] },
    { betAmt: '', select: false, groupName: '04', wuxing: wuxingList[Math.floor((currentYear + 1 - '04') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '04') % 12] },
    { betAmt: '', select: false, groupName: '05', wuxing: wuxingList[Math.floor((currentYear + 1 - '05') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '05') % 12] },
    { betAmt: '', select: false, groupName: '06', wuxing: wuxingList[Math.floor((currentYear + 1 - '06') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '06') % 12] },
    { betAmt: '', select: false, groupName: '07', wuxing: wuxingList[Math.floor((currentYear + 1 - '07') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '07') % 12] },
    { betAmt: '', select: false, groupName: '08', wuxing: wuxingList[Math.floor((currentYear + 1 - '08') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '08') % 12] },
    { betAmt: '', select: false, groupName: '09', wuxing: wuxingList[Math.floor((currentYear + 1 - '09') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '09') % 12] },
    { betAmt: '', select: false, groupName: '10', wuxing: wuxingList[Math.floor((currentYear + 1 - '10') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '10') % 12] },
    { betAmt: '', select: false, groupName: '11', wuxing: wuxingList[Math.floor((currentYear + 1 - '11') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '11') % 12] },
    { betAmt: '', select: false, groupName: '12', wuxing: wuxingList[Math.floor((currentYear + 1 - '12') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '12') % 12] },
    { betAmt: '', select: false, groupName: '13', wuxing: wuxingList[Math.floor((currentYear + 1 - '13') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '13') % 12] },
    { betAmt: '', select: false, groupName: '14', wuxing: wuxingList[Math.floor((currentYear + 1 - '14') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '14') % 12] },
    { betAmt: '', select: false, groupName: '15', wuxing: wuxingList[Math.floor((currentYear + 1 - '15') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '15') % 12] },
    { betAmt: '', select: false, groupName: '16', wuxing: wuxingList[Math.floor((currentYear + 1 - '16') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '16') % 12] },
    { betAmt: '', select: false, groupName: '17', wuxing: wuxingList[Math.floor((currentYear + 1 - '17') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '17') % 12] },
    { betAmt: '', select: false, groupName: '18', wuxing: wuxingList[Math.floor((currentYear + 1 - '18') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '18') % 12] },
    { betAmt: '', select: false, groupName: '19', wuxing: wuxingList[Math.floor((currentYear + 1 - '19') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '19') % 12] },
    { betAmt: '', select: false, groupName: '20', wuxing: wuxingList[Math.floor((currentYear + 1 - '20') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '20') % 12] },
    { betAmt: '', select: false, groupName: '21', wuxing: wuxingList[Math.floor((currentYear + 1 - '21') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '21') % 12] },
    { betAmt: '', select: false, groupName: '22', wuxing: wuxingList[Math.floor((currentYear + 1 - '22') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '22') % 12] },
    { betAmt: '', select: false, groupName: '23', wuxing: wuxingList[Math.floor((currentYear + 1 - '23') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '23') % 12] },
    { betAmt: '', select: false, groupName: '24', wuxing: wuxingList[Math.floor((currentYear + 1 - '24') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '24') % 12] },
    { betAmt: '', select: false, groupName: '25', wuxing: wuxingList[Math.floor((currentYear + 1 - '25') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '25') % 12] },
    { betAmt: '', select: false, groupName: '26', wuxing: wuxingList[Math.floor((currentYear + 1 - '26') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '26') % 12] },
    { betAmt: '', select: false, groupName: '27', wuxing: wuxingList[Math.floor((currentYear + 1 - '27') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '27') % 12] },
    { betAmt: '', select: false, groupName: '28', wuxing: wuxingList[Math.floor((currentYear + 1 - '28') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '28') % 12] },
    { betAmt: '', select: false, groupName: '29', wuxing: wuxingList[Math.floor((currentYear + 1 - '29') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '29') % 12] },
    { betAmt: '', select: false, groupName: '30', wuxing: wuxingList[Math.floor((currentYear + 1 - '30') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '30') % 12] },
    { betAmt: '', select: false, groupName: '31', wuxing: wuxingList[Math.floor((currentYear + 1 - '31') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '31') % 12] },
    { betAmt: '', select: false, groupName: '32', wuxing: wuxingList[Math.floor((currentYear + 1 - '32') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '32') % 12] },
    { betAmt: '', select: false, groupName: '33', wuxing: wuxingList[Math.floor((currentYear + 1 - '33') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '33') % 12] },
    { betAmt: '', select: false, groupName: '34', wuxing: wuxingList[Math.floor((currentYear + 1 - '34') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '34') % 12] },
    { betAmt: '', select: false, groupName: '35', wuxing: wuxingList[Math.floor((currentYear + 1 - '35') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '35') % 12] },
    { betAmt: '', select: false, groupName: '36', wuxing: wuxingList[Math.floor((currentYear + 1 - '36') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '36') % 12] },
    { betAmt: '', select: false, groupName: '37', wuxing: wuxingList[Math.floor((currentYear + 1 - '37') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '37') % 12] },
    { betAmt: '', select: false, groupName: '38', wuxing: wuxingList[Math.floor((currentYear + 1 - '38') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '38') % 12] },
    { betAmt: '', select: false, groupName: '39', wuxing: wuxingList[Math.floor((currentYear + 1 - '39') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '39') % 12] },
    { betAmt: '', select: false, groupName: '40', wuxing: wuxingList[Math.floor((currentYear + 1 - '40') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '40') % 12] },
    { betAmt: '', select: false, groupName: '41', wuxing: wuxingList[Math.floor((currentYear + 1 - '41') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '41') % 12] },
    { betAmt: '', select: false, groupName: '42', wuxing: wuxingList[Math.floor((currentYear + 1 - '42') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '42') % 12] },
    { betAmt: '', select: false, groupName: '43', wuxing: wuxingList[Math.floor((currentYear + 1 - '43') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '43') % 12] },
    { betAmt: '', select: false, groupName: '44', wuxing: wuxingList[Math.floor((currentYear + 1 - '44') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '44') % 12] },
    { betAmt: '', select: false, groupName: '45', wuxing: wuxingList[Math.floor((currentYear + 1 - '45') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '45') % 12] },
    { betAmt: '', select: false, groupName: '46', wuxing: wuxingList[Math.floor((currentYear + 1 - '46') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'red', zoo: zooList[(currentYear + 1 - '46') % 12] },
    { betAmt: '', select: false, groupName: '47', wuxing: wuxingList[Math.floor((currentYear + 1 - '47') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '47') % 12] },
    { betAmt: '', select: false, groupName: '48', wuxing: wuxingList[Math.floor((currentYear + 1 - '48') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'blue', zoo: zooList[(currentYear + 1 - '48') % 12] },
    { betAmt: '', select: false, groupName: '49', wuxing: wuxingList[Math.floor((currentYear + 1 - '49') % 60 / 2)], bonusAmt: obj.bonusAmt, color: 'green', zoo: zooList[(currentYear + 1 - '49') % 12] }
  ];
  const data = {
    numberLen: 1,
    defaultNavIndex: 0,
    '6601BALL': ball.reduce((m, d) => (m[d.groupName] = d, m), {}),
    '6601071144': {
      component: 'lhcCurrency',
      rule: '从12个生肖中选3~6个下注。若下注的生肖和开奖号码的七个号码的生肖中任3个相同，则为中奖。',
      zoo: ball,
      max: 6,
      bonusAmt: obj.bonusAmt,
      must: 3,
      checkbox: true,
      gameName: '三肖'
    },
    '6601011111': {
      rule: "从01~49中任选1个或多个号码，所选号码与开奖号码特码相同即为中奖。特码A，低赔率高返点，开奖后，从本金中返回一定比例金额给玩家，无论是否中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注01，开奖号码的第7个开出的号码（特码）开出01即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660101111111',
      ball: ball,
      height: '150px',
      gameName: '特码A',
      must: 1
    },
    '6601011122': {
      rule: "从01~49中任选1个或多个号码，所选号码与开奖号码特码相同即为中奖。特码B，高赔率零返点，开奖后，不会从本金中返回一定百分比的金额给玩家。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注01，开奖号码的第7个开出的号码（特码）开出01即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660101112211',
      ball: ball,
      must: 1,
      height: '150px',
      gameName: '特码B'
    },
    '6601021111': {
      rule: "以特码配合不同条件组成两面选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注特大单，开奖号码的特码为41，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '200px',
      gameName: '两面'
    },
    '6601031111': {
      rule: "投注与开奖号码6个正码任1相同为中奖；7个开奖号总和形成投注项，所选型态与开奖结果相同为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注07，开奖号码的正码依序为03,45,34,07,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660103111111',
      must: 1,
      ball: ball,
      gameName: '正码',
      height: '35px'
    },
    '6601051111': {
      rule: "若下注型态与特码所属头尾数吻合，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注1头，开奖特码为13，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '140px',
      gameName: '头尾数'
    },
    '6601101111': {
      rule: "从二肖~七肖中选1个形态下注。如下注的数字，与开奖结果7个号码的所属生肖总数相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注三肖，开奖号码为鼠,鼠,鼠,牛,牛,虎,虎，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '130px',
      gameName: '总肖'
    },
    '6601071111': {
      rule: "以特码和生肖为一个投注组合，开出特码出现在投注组合中，即为中奖，其余情况为不中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '鸡年时，投注鸡，开奖号码的特码为01，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '170px',
      zoo: ball,
      gameName: '特肖'
    },
    '6601071122': {
      rule: "依据开出的所有正码为主，若开出的6个正码有一个在下注生肖范围内，则视为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '鸡年时，投注鸡，开奖号码的正码为01,23,14,27,33,20，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '170px',
      zoo: ball,
      gameName: '正肖'
    },
    '6601071133': {
      rule: "从12个生肖中选2～6个下注。若下注的生肖和开奖号码的七个号码的生肖中任2个相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注羊,猪，开奖号码为羊,猴,兔,马,兔,鸡,猪，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 2,
      gameName: '二肖'
    },
    '6601071155': {
      rule: "从12个生肖中选4～6个下注。若下注的生肖和开奖号码的七个号码的生肖中任4个相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注羊,兔,马,猪，开奖号码为羊,猴,兔,马,兔,鸡,猪，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 4,
      gameName: '四肖'
    },
    '6601071166': {
      rule: "从12个生肖中选5～6个下注。若下注的生肖和开奖号码的七个号码的生肖中任5个相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注羊,马,兔,猴,猪，开奖号码为羊,猴,兔,马,兔,鸡,猪，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 5,
      gameName: '五肖'
    },
    '6601071177': {
      rule: "从12个生肖中选2~6个生肖下注。如下注的生肖中，与开奖结果七个号码所属生肖任2个不相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注狗,蛇，开奖号码为羊,猴,兔,马,兔,鸡,猪，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 2,
      gameName: '二肖连不中'
    },
    '6601071188': {
      rule: "从12个生肖中选3~6个生肖下注。如下注的生肖中，与开奖结果七个号码所属生肖任3个不相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注狗,蛇,龙，开奖号码为羊,猴,兔,马,兔,鸡,猪，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 3,
      gameName: '三肖连不中'
    },
    '6601071199': {
      rule: "从12个生肖中选4~6个生肖下注。如下注的生肖中，与开奖结果七个号码所属生肖任4个不相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注狗,蛇,龙,鼠，开奖号码为羊,猴,兔,马,兔,鸡,猪，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 4,
      gameName: '四肖连不中'
    },
    '6601111111': {
      rule: "从12个生肖中选2~11个下注。如下注的生肖，与开奖结果的特码所属生肖相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注鼠,虎，开奖号码为鼠,鼠,鼠,牛,牛,虎,虎，即为中奖。',
      component: 'lhcCurrency',
      max: 11,
      bonusAmt: obj.bonusAmt,
      height: '170px',
      zoo: ball,
      checkbox: true,
      must: 2,
      gameName: '合肖'
    },
    '6601091111': {
      rule: "从12个生肖中选1个下注。如下注的生肖，与开奖结果7个号码任一个的所属生肖相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注鼠，开奖号码为鼠,鼠,鼠,牛,牛,虎,虎，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '170px',
      zoo: ball,
      gameName: '一肖'
    },
    '6601091122': {
      rule: "从0~9中选1个尾数下注。如下注的尾数，与开奖结果7个号码任一个的尾数相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注1尾，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '170px',
      gameName: '一肖尾数',
      weishu: ball
    },
    '6601031122': {
      rule: "正码第1位配合不同条件组成选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注07，开奖号码的正码依序为07,03,45,34,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660103112211',
      must: 1,
      ball: ball,
      gameName: '正一特',
      height: '90px'
    },
    '6601031123': {
      rule: "正码第2位配合不同条件组成选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注03，开奖号码的正码依序为07,03,45,34,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      must: 1,
      groupNo: '660103112311',
      ball: ball,
      gameName: '正二特',
      height: '90px'
    },
    '6601031124': {
      rule: "正码第3位配合不同条件组成选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注45，开奖号码的正码依序为07,03,45,34,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      must: 1,
      groupNo: '660103112411',
      ball: ball,
      gameName: '正三特',
      height: '90px'
    },
    '6601031125': {
      rule: "正码第4位配合不同条件组成选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注34，开奖号码的正码依序为07,03,45,34,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      must: 1,
      groupNo: '660103112511',
      ball: ball,
      gameName: '正四特',
      height: '90px'
    },
    '6601031126': {
      rule: "正码第5位配合不同条件组成选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注15，开奖号码的正码依序为07,03,45,34,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      must: 1,
      groupNo: '660103112611',
      ball: ball,
      gameName: '正五特',
      height: '90px'
    },
    '6601031127': {
      rule: "正码第6位配合不同条件组成选项，每个型态为一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注23，开奖号码的正码依序为07,03,45,34,15,23，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      must: 1,
      groupNo: '660103112711',
      ball: ball,
      gameName: '正六特',
      height: '90px'
    },
    '6601061111': {
      rule: "从五行中选一个下注。若开奖结果特码所属五行号码与下注的五行号码相符则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '特码17属性为金时，投注金，开奖号码特码为17，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '170px',
      gameName: '五行',
      wuxing: ball
    },
    '6601041111': {
      rule: "分为「红、蓝、绿」三个色波、半波、半半波里选择一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注绿双，开奖号码的特码为28，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '90px',
      gameName: '色波',
      bose: ball
    },
    '6601031133': {
      rule: "以正码1-6不同位置选择定位，配合各正码型态形成一注，所选型态与开奖结果相同即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '正码一位置投注红波，正码一开奖号码为34，即为中奖。',
      component: 'zheng1_6',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '370px',
      gameName: '正码1-6'
    },

    '660108111111': {
      rule: "49选2下注。下注两个号其一与开奖号特码同且下注另一号与开奖号任意正码同则中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注22,32，开奖号码为10,11,31,21,22,03;特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108111111',
      height: '300px',
      gameName: '特串',
      ball: ball,
      must: 2,
      max: 10,
      checkbox: true
    },
    '660108111122': {
      rule: "49选2下注。一个是正码，一个是特别号码，叫中特；二个号码都是开奖号码之正码，叫中二。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注22,32，开奖号码为10,11,31,21,22,03;特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108111122',
      height: '300px',
      gameName: '二中特',
      ball: ball,
      must: 2,
      max: 10,
      checkbox: true
    },
    '660108111133': {
      rule: "从49个号码中选3~10个下注。若下注的三个号码与开奖号码的任三个正码相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注11,31,21，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108111133',
      height: '300px',
      gameName: '三全中',
      ball: ball,
      must: 3,
      max: 10,
      checkbox: true
    },
    '660108111144': {
      rule: "从49个号码中选3~10个下注。若下注的三个号码中至少两个与开奖号码的任两个正码相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注11,31,18，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108111144',
      height: '300px',
      gameName: '三中二',
      ball: ball,
      must: 3,
      max: 10,
      checkbox: true
    },
    '660108111155': {
      rule: "从49个号码中选2~10个下注。若下注的两个号码与开奖号码的任两个正码相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注11,31，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108111155',
      height: '300px',
      gameName: '二全中',
      ball: ball,
      must: 2,
      max: 10,
      checkbox: true
    },
    '660108111166': {
      rule: "从49个号码中选4~10个下注。若下注的四个号码中有任何号码与开奖号码的正码相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注11,15,27,28，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108111166',
      height: '300px',
      gameName: '四中一',
      ball: ball,
      must: 4,
      max: 10,
      checkbox: true
    },
    '660108112211': {
      rule: "从49个号码中选5~10个下注。若下注的5个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,10,15,27,28，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112211',
      height: '300px',
      gameName: '五不中',
      ball: ball,
      must: 5,
      max: 10,
      checkbox: true
    },
    '660108112222': {
      rule: "从49个号码中选6~10个下注。若下注的6个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,10,15,27,28,39，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112222',
      height: '300px',
      gameName: '六不中',
      ball: ball,
      must: 6,
      max: 10,
      checkbox: true
    },
    '660108112233': {
      rule: "从49个号码中选7~10个下注。若下注的7个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,10,15,27,28,39,40，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112233',
      height: '300px',
      gameName: '七不中',
      ball: ball,
      must: 7,
      max: 10,
      checkbox: true
    },
    '660108112244': {
      rule: "从49个号码中选8~11个下注。若下注的8个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,08,09,15,27,28,39,40，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112244',
      height: '300px',
      gameName: '八不中',
      ball: ball,
      must: 8,
      max: 11,
      checkbox: true
    },
    '660108112255': {
      rule: "从49个号码中选9~12个下注。若下注的9个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,08,09,15,19,27,28,39,40，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112255',
      height: '300px',
      gameName: '九不中',
      ball: ball,
      must: 9,
      max: 12,
      checkbox: true
    },
    '660108112266': {
      rule: "从49个号码中选10~13个下注。若下注的10个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,08,09,15,17,19,27,28,39,40，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112266',
      height: '300px',
      gameName: '十不中',
      ball: ball,
      must: 10,
      max: 13,
      checkbox: true
    },
    '660108112277': {
      rule: "从49个号码中选11~13个下注。若下注的11个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,08,09,15,17,19,25,27,28,39,40，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112277',
      height: '300px',
      gameName: '十一不中',
      ball: ball,
      must: 11,
      max: 13,
      checkbox: true
    },
    '660108112288': {
      rule: "从49个号码中选12~14个下注。若下注的12个号码和开奖号码的七个号码都不相同，则为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注02,08,09,15,17,19,25,27,28,33,39,40，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcZm',
      bonusAmt: obj.bonusAmt,
      groupNo: '660108112288',
      height: '300px',
      gameName: '十二不中',
      ball: ball,
      must: 12,
      max: 14,
      checkbox: true
    },

    '6601081133': {
      rule: "从0－9中选2～6个数字下注。如下注的2个号码，与开奖结果七个号码的个位数中任2个相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注1尾,2尾，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '155px',
      weishu: ball,
      checkbox: true,
      must: 2,
      gameName: '二尾连中'
    },
    '6601081144': {
      rule: "从0－9中选2～6个数字下注。如下注号码与开奖结果七个号码的个位数没有相同的号码，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注4尾,5尾，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '155px',
      weishu: ball,
      checkbox: true,
      must: 2,
      gameName: '二尾连不中'
    },
    '6601081188': {
      rule: "从0－9中选3～6个数字下注。如下注的3个号码，与开奖结果七个号码的个位数中任3个相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注1尾,2尾,3尾，开奖号码为10,11,33,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '155px',
      weishu: ball,
      checkbox: true,
      must: 3,
      gameName: '三尾连中'
    },
    '6601081155': {
      rule: "从0－9中选3～6个数字下注。如下注号码与开奖结果七个号码的个位数没有相同的号码，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注4尾,5尾,6尾，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '155px',
      weishu: ball,
      checkbox: true,
      must: 3,
      gameName: '三尾连不中'
    },
    '6601081166': {
      rule: "从0－9中选4～6个数字下注。如下注的4个号码，与开奖结果七个号码的个位数中任4个相同，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注1尾,2尾,3尾,4尾，开奖号码为14,11,33,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '155px',
      weishu: ball,
      checkbox: true,
      must: 4,
      gameName: '四尾连中'
    },
    '6601081177': {
      rule: "从0－9中选4～6个数字下注。如下注号码与开奖结果七个号码的个位数没有相同的号码，即为中奖。奖金<span style='color: #e60b0b;'>" + obj.bonusAmt + '</span>元',
      example: '投注4尾,5尾,6尾,7尾，开奖号码为10,11,31,21,22,03特码32，即为中奖。',
      component: 'lhcCurrency',
      max: 6,
      bonusAmt: obj.bonusAmt,
      height: '155px',
      weishu: ball,
      checkbox: true,
      must: 4,
      gameName: '四尾连不中'
    },
    '6601041122': {
      rule: '分为「红、蓝、绿」三个色波、半波、半半波里选择一注，所选型态与开奖结果相同即为中奖。奖金<span style="color: #e60b0b;">{min} ~ {max}</span>元',
      example: '投注特大单，开奖号码的特码为41，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '200px',
      gameName: '半波'
    },
    '6601041133': {
      rule: '分为「红、蓝、绿」三个色波、半波、半半波里选择一注，所选型态与开奖结果相同即为中奖。奖金<span style="color: #e60b0b;">{min} ~ {max}</span>元',
      example: '投注特大单，开奖号码的特码为41，即为中奖。',
      component: 'lhcCurrency',
      bonusAmt: obj.bonusAmt,
      must: 1,
      height: '200px',
      gameName: '半半波'
    }
  };
  // if (data[arg] && !data[arg].groupNo) data[arg].groupNo = arg;
  return data[arg];
};
export default{
  dataFun
};
