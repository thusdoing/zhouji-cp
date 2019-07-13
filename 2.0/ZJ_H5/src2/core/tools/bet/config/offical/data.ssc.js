//  description  描述
//  example  投注案例 说明
//  rule  投注中奖规则 说明
//  algorithm  判断同模板下 循环 或者 为多少注的 标识
//  sub  投注的模板
// sequence 是否有顺序规则
const dataFun = function (arg) {
  arg = arg.toString();
  arg = arg.slice(0, 2) + '11' + arg.slice(4);
  const data = {
    numberLen: 1,
    defaultNavIndex: 3,
    inputTip: '程序会自动过滤掉不合法的号码。您也可以点击“<b>删除重复号</b>”按钮对输入内容进行格式化。',
    111155001111: {
      description: '手动输入号码，至少输入1个五位数号码组成一注。',
      example: '投注方案：23456； 开奖号码：23456，即中五星直选一等奖',
      rule: '手动输入一个5位数号码组成一注, 所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      algorithm: 5,
      code: 111155001111,
      sub: [],
      format: ['n,n,n,n,n'],
      name: '五星直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111155001122: {
      description: '从万位、千位、百位、十位、个位中选择一个5位数号码组成一注。',
      example: '投注方案：23456；<br>开奖号码：23456，<br>即中五星直选。',
      rule: '从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      algorithm: ['R1'],
      code: 111155001122,
      format: ['n|n|n|n|n'],
      rank: [0, 1, 2, 3, 4],
      betInitMoney: 2, // 每个玩法的初始金额
      name: '五星直选复式',
      component: 'fushiNormal'
    },
    111155001133: {
      description: '从个、十、百、千、万位各选一个号码组成五注。',
      example: '五星组合示例，如购买：4+5+6+7+8，该票共5元，<br>由以下5注：45678(五星)、5678(四星)、678(三星)、78(二星)、8(一星)构成。<br>开奖号码：45678，即可中五星、四星、三星、二星、一星的一等奖各1注。 ',
      rule: '从万位、千位、百位、十位、个位中至少各选一个号码组成1-5星的组合，<br>共五注，所选号码的个位与开奖号码相同，则中1个5等奖；所选号码的个位、十位与开奖号码相同，则中1个5等奖以及1个4等奖，<br>依此类推，最高可中5个奖，五星奖金90000元，四星奖金9000元，三星奖金900元，二星奖金90元，一星奖金9元。',
      tpl: 'num1',
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      code: 111155001133,
      algorithm: ['R2'],
      rank: [0, 1, 2, 3, 4],
      name: '五星直选组合',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111155002211: {
      description: '从0-9中选择5个号码组成一注。',
      example: '投注方案：02568，开奖号码的五个数字只要包含0、2、5、6、8，即可中五星组选120一等奖。',
      rule: '从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万位、千位、百位、十位、个位相同，顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      code: 111155002211,
      algorithm: [5, 1, 5, 120],
      format: [[0, 0], [0, 0]], // 第一个数组的 0重号 选0几个  第二个数组的 0重号 选0几个
      rank: ['5star120'],
      name: '五星组选120',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [5, [5]]
    },
    111155002222: {
      description: '从“二重号”选择一个号码，“单号”中选择三个号码组成一注。',
      example: '投注方案：二重号：8，单号：0、2、5，只要开奖的5个数字包括 0、2、5、8、8，即可中五星组选60一等奖。',
      rule: '选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，<br>且所选二重号码在开奖号码中出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111155002222,
      algorithm: [5, 1, 3, 60],
      format: [[2, 1], [0, 0]], // 第一个数组的 2重号 选1几个  第二个数组的 0重号 选0几个
      isAllowSamePos: !0,
      rank: ['5star60'],
      name: '五星组选60',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [4, [1, 3]]
    },
    111155002233: {
      description: '从“二重号”选择两个号码，“单号”中选择一个号码组成一注。',
      example: '投注方案：二重号：2、8，单号：0，只要开奖的5个数字包括 0、2、2、8、8，即可中五星组选30一等奖。',
      rule: '选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，<br>且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111155002233,
      algorithm: [5, 2, 2, 30],
      format: [[2, 2], [0, 0]], // 第一个数组的 2重号 选2几个  第二个数组的 0重号 选0几个
      isAllowSamePos: !0,
      rank: ['5star60'],
      name: '五星组选30',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [3, [2, 1]]
    },
    111155002244: {
      description: '从“三重号”选择一个号码，“单号”中选择两个号码组成一注。',
      example: '投注方案：三重号：8，单号：0、2，只要开奖的5个数字包括 0、2、8、8、8，即可中五星组选20一等奖。',
      rule: '选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，<br>且所选三重号码在开奖号码中出现了3次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '三重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111155002244,
      algorithm: [5, 1, 2, 20],
      format: [[3, 1], [0, 0]], // 第一个数组的 3重号 选1几个  第二个数组的 0重号 选0几个
      isAllowSamePos: !0,
      rank: ['5star20'],
      name: '五星组选20',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [3, [1, 2]]
    },
    111155002255: {
      description: '从“三重号”选择一个号码，“二重号”中选择一个号码组成一注。',
      example: '投注方案：三重号：8，二重号：2，只要开奖的5个数字包括 2、2、8、8、8，即可中五星组选10一等奖。',
      rule: '选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '三重号', golbal: [0, 10], btn: true },
        { unit: '二号', golbal: [0, 10], btn: true }
      ],
      code: 111155002255,
      algorithm: [5, 1, 1, 10],
      format: [[3, 1], [2, 1]], // 第一个数组的 3重号 选1几个  第二个数组的 2重号 选1几个
      isAllowSamePos: !0,
      rank: ['5star10'],
      name: '五星组选10',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [1, 1]]
    },
    111155002266: {
      description: '从“四重号”选择一个号码，“单号”中选择一个号码组成一注。',
      example: '投注方案：四重号：8，单号：2，只要开奖的5个数字包括 2、8、8、8、8，即可中五星组选5一等奖。',
      rule: '选择1个四重号码和1个单号号码组成一注，所选的单号号码与开奖号码相同，<br>且所选四重号码在开奖号码中出现了4次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '四重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111155002266,
      algorithm: [5, 1, 1, 5],
      format: [[4, 1], [0, 0]], // 第一个数组的 4重号 选1几个  第二个数组的 0重号 选0几个
      isAllowSamePos: !0,
      rank: ['5star5'],
      name: '五星组选5',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [1, 1]]
    },
    111144111111: {
      description: '手动输入号码，至少输入1个四位数号码组成一注。',
      example: '投注方案：手动输入3456；开奖号码：3456，即中四星直选。',
      rule: '手动输入一个4位数号码组成一注，<br>所选号码的万位、千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      sub: '',
      code: 111144111111,
      algorithm: [4],
      format: ['n,n,n,n'],
      name: '前四直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111144111122: {
      description: '从万位、千位、百位、十位中至少各选择一个号码组成一注。',
      example: '投注方案：3456，开奖号码：3456，即中四星直选。',
      rule: '从万位、千位、百位、十位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true }
      ],
      code: 111144111122,
      algorithm: [],
      format: ['n|n|n|n'],
      rank: [0, 1, 2, 3],
      name: '前四直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111144111133: {
      description: '在万位、千位、百位、十位任意位置上任意选择1个或1个以上号码。',
      example: '如：四星组合示例，如购买：5+6+7+8，该票共4元，<br>由以下4注：5678(四星)、678(三星)、78(二星)、8(一星)构成。<br>开奖号码：5678，即可中四星、三星、二星、一星各1注。',
      rule: '从万位、千位、百位、十位任意位置上至少选择1个以上号码，<br>所选号码与相同位置上的开奖号码一致，即为中奖，<br>四星奖金9000元，三星奖金900元，二星奖金90元，一星奖金9元。',
      tpl: 'num1',
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true }
      ],
      code: 111144111133,
      algorithm: [],
      rank: [0, 1, 2, 3],
      name: '前四直选组合',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111144112211: {
      description: '从0-9中选择4个号码组成一注。',
      example: '投注方案：0568，开奖号码的四个数字只要包含0、5、6、8，即可中四星组选24一等奖。',
      rule: '从0-9中任意选择4个号码组成一注，<br>所选号码与开奖号码的万位、千位、百位、十位相同，且顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      code: 111144112211,
      algorithm: [4, 1, 4, 120],
      format: [[0, 0], [0, 0]],
      rank: ['4star24'],
      name: '前四组选24',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [4, [4]]
    },
    111144112222: {
      description: '从“二重号”选择一个号码，“单号”中选择两个号码组成一注。',
      example: '投注方案：二重号：8，单号：0、6，只要开奖的四个数字包括 0、6、8、8，即可中四星组选12一等奖。',
      rule: '选择1个二重号码和2个单号号码组成一注，所选单号号码与开奖号码相同，<br>且所选二重号码在开奖号码中出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111144112222,
      algorithm: [4, 1, 2, 60],
      format: [[2, 1], [0, 0]],
      isAllowSamePos: !0,
      rank: ['4star12'],
      name: '前四组选12',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [3, [1, 2]]
    },
    111144112233: {
      description: '从“二重号”选择两个号码组成一注。',
      example: '投注方案：二重号：6、8，只要开奖的四个数字从小到大排列为 6、6、8、8，即可中四星组选6。',
      rule: '选择2个二重号码组成一注，所选的2个二重号码在开奖号码中分别出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true }
      ],
      code: 111144112233,
      algorithm: [4, 1, 2, 120],
      format: [[2, 2], [0, 0]],
      rank: ['4star6'],
      name: '前四组选6',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [2]]
    },
    111144112244: {
      description: '从“三重号”选择一个号码，“单号”中选择一个号码组成一注。',
      example: '投注方案：三重号：8，单号：2，只要开奖的四个数字从小到大排列为 2、8、8、8，即可中四星组选4。',
      rule: '选择1个三重号码和1个单号号码组成一注，所选单号号码与开奖号码相同，<br>且所选三重号码在开奖号码中出现了3次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '三重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111144112244,
      algorithm: [4, 1, 1, 10],
      format: [[3, 1], [0, 0]],
      isAllowSamePos: !0,
      rank: ['4star4'],
      name: '前四组选4',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [1, 1]]
    },
    111144221122: {
      description: '手动输入号码，至少输入1个四位数号码组成一注。',
      example: '投注方案：手动输入3456；开奖号码：3456，即中四星直选。',
      rule: '手动输入一个4位数号码组成一注，<br>所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      sub: [
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      code: 111144221122,
      algorithm: [],
      format: ['n,n,n,n'],
      name: '后四直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111144221111: {
      description: '从千位、百位、十位、个位中至少各选择一个号码组成一注。',
      example: '投注方案：3456，开奖号码：3456，即中四星直选。',
      rule: '从千位、百位、十位、个位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: '',
      code: 111144221111,
      algorithm: 4,
      format: ['n|n|n|n'],
      rank: [1, 2, 3, 4],
      name: '后四直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111144221133: {
      description: '在千位、百位、十位、个位任意位置上任意选择1个或1个以上号码。',
      example: '如：四星组合示例，如购买：5+6+7+8，该票共4元，由以下4注：5678(四星)、678(三星)、78(二星)、8(一星)构成。开奖号码：5678，即可中四星、三星、二星、一星各1注。',
      rule: '从千位、百位、十位、个位任意位置上至少选择1个以上号码，<br>所选号码与相同位置上的开奖号码一致，即为中奖，四星奖金9000元，三星奖金900元，二星奖金90元，一星奖金9元。',
      tpl: 'num1',
      sub: [
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      code: 111144221133,
      algorithm: [],
      rank: [1, 2, 3, 4],
      name: '后四直选组合',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111144222211: {
      description: '从0-9中选择4个号码组成一注。',
      example: '投注方案：0568，开奖号码的四个数字只要包含0、5、6、8，即可中四星组选24一等奖。',
      rule: '从0-9中任意选择4个号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      code: 111144222211,
      algorithm: [4, 1, 4, 120],
      format: [[0, 0], [0, 0]],
      rank: ['4star24'],
      name: '后四组合组选24',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [4, [4]]
    },
    111144222222: {
      description: '从“二重号”选择一个号码，“单号”中选择两个号码组成一注。',
      example: '投注方案：二重号：8，单号：0、6，只要开奖的四个数字包括 0、6、8、8，即可中四星组选12一等奖。',
      rule: '选择1个二重号码和2个单号号码组成一注，所选单号号码与开奖号码相同，<br>且所选二重号码在开奖号码中出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111144222222,
      algorithm: [4, 1, 2, 20],
      format: [[2, 1], [0, 0]],
      isAllowSamePos: !0,
      rank: ['4star12'],
      name: '后四组合组选12',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [3, [1, 2]]
    },
    111144222233: {
      description: '从“二重号”选择两个号码组成一注。',
      example: '投注方案：二重号：6、8，只要开奖的四个数字从小到大排列为 6、6、8、8，即可中四星组选6。',
      rule: '选择2个二重号码组成一注，所选的2个二重号码在开奖号码中分别出现了2次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true }
      ],
      code: 111144222233,
      algorithm: [4, 2, 2, 120],
      format: [[2, 2], [0, 0]],
      rank: ['4star6'],
      name: '后四组合组选6',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [2]]
    },
    111144222244: {
      description: '从“三重号”选择一个号码，“单号”中选择一个号码组成一注。',
      example: '投注方案：三重号：8，单号：2，只要开奖的四个数字从小到大排列为 2、8、8、8，即可中四星组选4。',
      rule: '选择1个三重号码和1个单号号码组成一注，所选单号号码与开奖号码相同，<br>且所选三重号码在开奖号码中出现了3次，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '三重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111144222244,
      algorithm: [4, 1, 1, 20],
      format: [[3, 1], [0, 0]],
      isAllowSamePos: !0,
      rank: ['4star4'],
      name: '后四组合组选4',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [1, 1]]
    },
    111133331111: {
      description: '手动输入号码，至少输入1个三位数号码组成一注。',
      example: '投注方案：345； 开奖号码：345，即中后三直选一等奖',
      rule: '手动输入一个3位数号码组成一注，<br>所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      algorithm: 3,
      code: 111133331111,
      sub: [
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      format: ['n,n,n'],
      sequence: true,
      name: '后三直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133331122: {
      description: '从个、十、百位各选一个号码组成一注。',
      example: '投注方案：345；<br>开奖号码：345，<br>即中后三直选一等奖',
      rule: '从百位、十位、个位中选择一个3位数号码组成一注，<br>所选号码与开奖号码后3位相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      code: 111133331122,
      sub: [
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      algorithm: ['R1'],
      format: ['n|n|n'],
      rank: [2, 3, 4],
      name: '后三直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133331133: {
      description: '从0-27中任意选择1个或1个以上号码。',
      example: '投注方案：和值1；开奖号码后三位：001,010,100,即中后三直选和值一等奖',
      rule: '所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      code: 111133331133,
      sub: [
        { unit: '', golbal: [0, 28], btn: false }
      ],
      algorithm: ['R4', 3, 0, 9],
      rank: ['after3_d_sum'],
      name: '后三直选和值',
      yardWarehouse: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1],
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133332211: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：5,8,8；开奖号码后三位：1个5，2个8 (顺序不限)，即中后三组选三一等奖。',
      rule: '从0-9中选择2个数字组成两注，所选号码与开奖号码的百位、十位、个位相同，且顺序不限，即为中奖。',
      tpl: 'num1',
      code: 111133332211,
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      algorithm: 2,
      format: ['m|n'],
      // rank: [2, 3, 4],
      rank: ['after3_3'],
      count: 2,
      name: '后三组三',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133332222: {
      description: '从0-9中任意选择3个或3个以上号码。',
      example: '投注方案：2,5,8；开奖号码后三位：1个2、1个5、1个8 (顺序不限)，即中后三组选六一等奖。',
      rule: '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。',
      tpl: 'num1',
      code: 111133332222,
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      algorithm: 3,
      format: ['m|n|n'],
      // rank: [2, 3, 4],
      rank: ['after3_6'],
      name: '后三组六',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133332244: {
      description: '手动输入号码，至少输入1个三位数号码。',
      example: '投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码后三位包括：(1)0,0,1，顺序不限，即中得组三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。',
      rule: '键盘手动输入购买号码，3个数字为一注，开奖号码的百位、十位、个位符合后三组三或组六均为中奖，<br>单倍奖金组三300元，组六150元。',
      tpl: 'danshi1',
      algorithm: 3,
      format: ['n,n,n'],
      code: 111133332244,
      sub: [],
      sequence: false,
      isGroupInput: !0,
      name: '后三混合组选',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133332233: {
      description: '从1-26中选择1个号码。',
      example: '投注方案：和值3；开奖号码后三位：(1)开出003号码，顺序不限，<br>即中后三组选三一等奖；(2)开出012号码，顺序不限，即中后三组选六一等奖',
      rule: '所选数值等于开奖号码百位、十位、个位三个数字相加之和，即为中奖，单倍奖金组三300元，组六150元',
      tpl: 'hezhi1',
      vm: 'num1',
      code: 111133332233,
      sub: [
        { unit: '', golbal: [1, 26], btn: false }
      ],
      algorithm: ['R4', 3, 0, 9, 'C'],
      rank: ['after3_c_sum'],
      name: '后三组选和值',
      yardWarehouse: [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1],
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133111111: {
      description: '手动输入号码，至少输入1个三位数号码组成一注。',
      example: '投注方案：345； 开奖号码：345，即中前三直选一等奖',
      rule: '手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      algorithm: 3,
      code: 111133111111,
      sub: [],
      format: ['n,n,n'],
      sequence: true,
      name: '前三直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133111122: {
      description: '从万、千、百位各选一个号码组成一注。',
      example: '投注方案：345； 开奖号码：345，即中前三直选一等奖',
      rule: '从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码的前3位相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true }
      ],
      code: 111133111122,
      algorithm: ['R1'],
      format: ['n|n|n'],
      rank: [0, 1, 2],
      name: '前三直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133111133: {
      description: '从0-27中任意选择1个或1个以上号码。',
      example: '投注方案：和值1；开奖号码后三位：001,010,100,即中前三直选和值一等奖',
      rule: '所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      code: 111133111133,
      sub: [
        { unit: '', golbal: [0, 28], btn: false }
      ],
      algorithm: ['R4', 3, 0, 9],
      rank: ['after3_d_sum'],
      name: '前三直选和值',
      yardWarehouse: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1],
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133112211: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：5,8,8；开奖号码前三位：1个5，2个8 (顺序不限)，即中前三组选三一等奖。',
      rule: '从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '组三', golbal: [0, 10], btn: true }
      ],
      code: 111133112211,
      algorithm: 2,
      format: ['m|n'],
      // rank: [2, 3, 4],
      rank: ['after3_3'],
      count: 2,
      name: '前三组三',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133112222: {
      description: '从0-9中任意选择3个或3个以上号码。',
      example: '投注方案：2,5,8；开奖号码前三位：1个2、1个5、1个8 (顺序不限)，即中前三组选六一等奖。',
      rule: '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '组六', golbal: [0, 10], btn: true }
      ],
      code: 111133112222,
      algorithm: 3,
      format: ['m|n|n'],
      rank: ['before3_6'],
      name: '前三组六',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133112244: {
      description: '手动输入号码，至少输入1个三位数号码。',
      example: '投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码前三位包括：(1)0,0,1，顺序不限，<br>即中得组三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。',
      rule: '键盘手动输入购买号码，3个数字为一注，开奖号码的万位、千位、百位符合前三组三或组六均为中奖，<br>单注奖金组三300元，组六150元。',
      tpl: 'danshi1',
      algorithm: 3,
      format: ['n,n,n'],
      sub: [],
      code: 111133112244,
      isGroupInput: !0,
      sequence: false,
      name: '前三混合组选',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133112233: {
      description: '从1-26中任意选择1个以上号码。',
      example: '投注方案：和值3；<br>开奖号码前三位：<br>(1)开出003号码，顺序不限，即中前三组选三一等奖；<br>(2)开出012号码，顺序不限，即中前三组选六一等奖',
      rule: '所选数值等于开奖号码万位、千位、百位三个数字相加之和，即为中奖单倍奖金组三300元，组六150元。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '', golbal: [1, 26], btn: false }
      ],
      code: 111133112233,
      algorithm: ['R4', 3, 0, 9, 'C'],
      rank: ['before3_c_sum'],
      name: '前三组选和值',
      yardWarehouse: [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1],
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133221111: {
      description: '手动输入号码，至少输入1个三位数号码组成一注。',
      example: '投注方案：手动输入123，开奖号码为是*123*，即为中奖',
      rule: '手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      algorithm: 3,
      sub: ['', [0, 9]],
      format: ['n,n,n'],
      code: 111133221111,
      sequence: true,
      name: '中三直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133221122: {
      description: '从千、百、十位各选一个号码组成一注。',
      example: '投注方案：千位选择1，百位选择2，十位选择3，开奖号码为是*123*，即为中奖',
      rule: '从千位、百位、十位中选择一个3位数号码组成一注，所选号码与开奖号码的中间3位相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true }
      ],
      code: 111133221122,
      algorithm: ['R1'],
      format: ['n|n|n'],
      rank: [0, 1, 2],
      name: '中三直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133221133: {
      description: '从0-27中任意选择1个或1个以上号码。',
      example: '投注方案：选择6，开奖号码为*123*、*141*、*114*、*006*、*060*等任意一个和值为6的结果，即为中奖。',
      rule: '所选数值等于开奖号码的千位、百位、十位三个数字相加之和，即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '', golbal: [0, 28], btn: false }
      ],
      algorithm: ['R4', 3, 0, 9],
      rank: ['middle3_d_sum'],
      name: '中三直选和值',
      code: 111133221133,
      yardWarehouse: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1],
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133222211: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：5,8,8；开奖号码中间三位：1个5，2个8 (顺序不限)，即中中三组选三一等奖。',
      rule: '从0-9中选择2个数字组成两注，所选号码与开奖号码的千位、百位、十位相同，且顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '组三', golbal: [0, 10], btn: true }
      ],
      code: 111133222211,
      algorithm: 2,
      format: ['m|n'],
      rank: ['middle3_3'],
      count: 2,
      name: '中三组三',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133222222: {
      description: '从0-9中任意选择3个或3个以上号码。',
      example: '投注方案：2,5,8；开奖号码中间三位：1个2、1个5、1个8 (顺序不限)，即中中三组选六一等奖。',
      rule: '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的千位、百位、十位相同，顺序不限，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '组六', golbal: [0, 10], btn: true }
      ],
      code: 111133222222,
      algorithm: 3,
      format: ['m|n|n'],
      rank: ['middle3_6'],
      name: '中三组六',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133222244: {
      description: '手动输入号码，至少输入1个三位数号码。',
      example: '投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码中间三位包括：(1)0,0,1，<br>顺序不限，即中得组三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。',
      rule: '键盘手动输入购买号码，3个数字为一注，<br>开奖号码的千位、百位、十位符合中三组三或组六均为中奖，单倍奖金组三300元，组六150元。',
      tpl: 'danshi1',
      algorithm: 3,
      code: 111133222244,
      format: ['n,n,n'],
      sub: ['', [0, 9]],
      isGroupInput: !0,
      sequence: false,
      name: '中三混合组选',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133222233: {
      description: '从1-26中选择1个和值。',
      example: '投注方案：和值3；开奖号码中间三位：(1)开出003号码，顺序不限，<br>即中中三组选三一等奖；(2)开出012号码，顺序不限，即中中三组选六一等奖',
      rule: '所选数值等于开奖号码千位、百位、十位三个数字相加之和，即为中奖单倍奖金组三300元，组六150元。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '', golbal: [1, 26], btn: false }
      ],
      code: 111133222233,
      algorithm: ['R4', 3, 0, 9, 'C'],
      rank: ['middle3_c_sum'],
      name: '中三组选和值',
      yardWarehouse: [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1],
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122221122: {
      description: '从十、个位各选一个号码组成一注。',
      example: '投注方案：58；开奖号码后二位：58，即中后二直选一等奖',
      rule: '从十位和个位上至少各选1个号码，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      code: 111122221122,
      algorithm: ['R1'],
      format: ['n|n'],
      rank: [3, 4],
      name: '后二直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122221111: {
      description: '手动输入号码，至少输入1个两位数号码。',
      example: '投注方案：58；开奖号码后二位：58，即中后二直选一等奖',
      rule: '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      algorithm: 2,
      code: 111122221111,
      sub: '',
      format: ['n,n'],
      sequence: true,
      name: '后二直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111122111122: {
      description: '从万、千位各选一个号码组成一注。',
      example: '投注方案：58；开奖号码前二位：58，即中前二直选一等奖。',
      rule: '从万位和千位上至少各选1个号码，所选号码与开奖号码的万位、千位相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true }
      ],
      code: 111122111122,
      algorithm: ['R1'],
      format: ['n|n'],
      rank: [0, 1],
      name: '前二直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122111111: {
      description: '手动输入号码，至少输入1个两位数号码。',
      example: '投注方案：58；开奖号码前二位：58，即中前二直选一等奖。',
      rule: '手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi1',
      algorithm: 2,
      code: 111122111111,
      sub: [],
      format: ['n,n'],
      sequence: true,
      name: '前二直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111122221133: {
      description: '从0-18中任意选择1个或1个以上的和值号码。',
      example: '投注方案：和值1；开奖号码后二位：01,10，即中后二直选。',
      rule: '所选数值等于开奖号码的十位、个位二个数字相加之和，即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '和值', golbal: [0, 19], btn: false }
      ],
      code: 111122221133,
      repeat: true,
      algorithm: 2,
      allsame: true,
      rank: ['after2_d_sum'],
      name: '后二直选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122111133: {
      description: '从0-18中任意选择1个或1个以上的和值号码。',
      example: '投注方案：和值1；开奖号码前二位：01,10，即中前二直选。',
      rule: '所选数值等于开奖号码的万位、千位二个数字相加之和，即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '和值', golbal: [0, 19], btn: false }
      ],
      code: 111122111133,
      repeat: true,
      allsame: true,
      algorithm: 2,
      rank: ['before2_d_sum'],
      name: '前二直选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122222222: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：5,8；开奖号码后二位：1个5，1个8 (顺序不限)，即中后二组选一等奖。',
      rule: '从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同，顺序不限，即中奖。',
      tpl: 'num1',
      sub: [
        { unit: '组选', golbal: [0, 10], btn: true }
      ],
      code: 111122222222,
      algorithm: 2,
      format: ['m|n'],
      rank: ['after2_c'],
      name: '后二组选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122222211: {
      description: '手动输入号码，至少输入1个两位数号码。',
      example: '投注方案：5,8；开奖号码后二位：1个5，1个8 (顺序不限)，即中后二组选一等奖。',
      rule: '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，顺序不限，即为中奖。',
      tpl: 'danshi1',
      algorithm: 2,
      sub: '',
      code: 111122222211,
      format: ['m,n'],
      sequence: false,
      isGroupInput: !0,
      name: '后二组选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111122112222: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：5,8；开奖号码前二位：1个5，1个8 (顺序不限)，即中前二组选一等奖。',
      rule: '从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限，即中奖。',
      tpl: 'num1',
      sub: [
        { unit: '组选', golbal: [0, 10], btn: true }
      ],
      code: 111122112222,
      algorithm: 2,
      format: ['m|n'],
      rank: ['before2_c'],
      name: '前二组选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122112211: {
      description: '手动输入号码，至少输入1个两位数号码。',
      example: '投注方案：5,8；开奖号码前二位：1个5，1个8 (顺序不限)，即中前二组选一等奖。',
      rule: '手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，顺序不限，即为中奖。',
      tpl: 'danshi1',
      algorithm: 2,
      sub: '',
      code: 111122112211,
      format: ['m,n'],
      isGroupInput: !0,
      sequence: false,
      name: '前二组选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111122222233: {
      description: '从1-17中任意选择1个或1个以上的和值号码。',
      example: '投注方案：和值1；开奖号码后二位：10或01(顺序不限，不含对子号)，即中后二组选。',
      rule: '所选数值等于开奖号码的十位、个位二个数字相加之和（不含对子号），即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '和值', golbal: [1, 17], btn: false }
      ],
      code: 111122222233,
      algorithm: 2,
      repeat: false,
      rank: ['after2_c_sum'],
      name: '后二组选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122112233: {
      description: '从1-17中任意选择1个或1个以上号码。',
      example: '投注方案：和值1；开奖号码前二位：10或01 (顺序不限，不含对子号)，即中前二组选。',
      rule: '所选数值等于开奖号码的万位、千位二个数字相加之和（不含对子号），即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      sub: [
        { unit: '和值', golbal: [1, 17], btn: false }
      ],
      code: 111122112233,
      algorithm: 2,
      repeat: false,
      rank: ['before2_c_sum'],
      name: '前二组选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    1111110044: {
      description: '在万位，千位，百位，十位，个位任意位置上任意选择1个或1个以上号码。',
      example: '投注万位号码1，开奖号码万位是1，即中定位胆万位一等奖。',
      rule: '从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
      tpl: 'num1',
      code: 1111110044,
      sub: [
        { unit: '万位', golbal: [0, 10], groupNo: 111111004411, btn: true },
        { unit: '千位', golbal: [0, 10], groupNo: 111111004422, btn: true },
        { unit: '百位', golbal: [0, 10], groupNo: 111111004433, btn: true },
        { unit: '十位', golbal: [0, 10], groupNo: 111111004444, btn: true },
        { unit: '个位', golbal: [0, 10], groupNo: 111111004455, btn: true }
      ],
      algorithm: '',
      format: ['n'],
      rank: [0, 1, 2, 3, 4],
      odds: !0,
      name: '定位胆',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111100002211: {
      description: '从0-9中任意选择1个以上号码。',
      example: '投注方案：1；开奖号码后三位：至少出现1个1，即中后三一码不定位一等奖。',
      rule: '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '不定胆', golbal: [0, 10], btn: true }
      ],
      algorithm: 1,
      code: 111100002211,
      format: ['n'],
      rank: ['after3_1_no'],
      name: '后三一码不定胆',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111100002222: {
      description: '从0-9中任意选择2个以上号码。',
      example: '投注方案：1,2；开奖号码后三位：至少出现1和2各1个，即中后三二码不定位一等奖。',
      rule: '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '不定胆', golbal: [0, 10], btn: true }
      ],
      algorithm: 2,
      code: 111100002222,
      format: ['m|n'],
      rank: ['after3_2_no'],
      name: '后三二码不定胆',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111100001111: {
      description: '从0-9中任意选择1个以上号码。',
      example: '投注方案：1；开奖号码前三位：至少出现1个1，即中前三一码不定位一等奖。',
      rule: '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '不定胆', golbal: [0, 10], btn: true }
      ],
      code: 111100001111,
      algorithm: 1,
      format: ['n'],
      rank: ['before3_1_no'],
      name: '前三一码不定胆',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111100001122: {
      description: '从0-9中任意选择2个以上号码。',
      example: '投注方案：1,2；开奖号码前三位：至少出现1和2各1个，即中前三二码不定位一等奖。',
      rule: '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。',
      tpl: 'num1',
      sub: [
        { unit: '不定胆', golbal: [0, 10], btn: true }
      ],
      code: 111100001122,
      algorithm: 2,
      format: ['m|n'],
      rank: ['before3_2_no'],
      name: '前三二码不定胆',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111199000022: {
      description: '从十位、个位中的“大、小、单、双”中至少各选一个组成一注。',
      example: '投注方案：大单；开奖号码十位与个位：大单，即中后二大小单双一等奖。',
      rule: '对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，<br>所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
      tpl: 'num2',
      vm: 'num1',
      code: 111199000022,
      sub: [
        { unit: '十位', golbal: [{ title: '大', value: 0 }, { title: '小', value: 1 }, { title: '单', value: 3 }, { title: '双', value: 4 }], btn: true },
        { unit: '个位', golbal: [{ title: '大', value: 0 }, { title: '小', value: 1 }, { title: '单', value: 3 }, { title: '双', value: 4 }], btn: true }
      ],
      algorithm: '',
      format: ['n|n'],
      name: '后二大小单双',
      component: 'bigAndSmall',
      betInitMoney: 2
    },
    111199000011: {
      description: '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
      example: '投注方案：小双；开奖号码万位与千位：小双，即中前二大小单双一等奖。',
      rule: '对万位和千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，<br>所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
      tpl: 'num2',
      vm: 'num1',
      code: 111199000011,
      sub: [
        { unit: '万位', golbal: [{ title: '大', value: 0 }, { title: '小', value: 1 }, { title: '单', value: 3 }, { title: '双', value: 4 }], btn: true },
        { unit: '千位', golbal: [{ title: '大', value: 0 }, { title: '小', value: 1 }, { title: '单', value: 3 }, { title: '双', value: 4 }], btn: true }
      ],
      algorithm: '',
      format: ['n|n'],
      name: '前二大小单双',
      component: 'bigAndSmall',
      betInitMoney: 2
    },
    111166000011: {
      description: '从0-9中任意选择1个以上号码。',
      example: '投注方案：8；开奖号码：至少出现1个8，即中一帆风顺。',
      rule: '从0-9中任意选择1个号码组成一注，只要开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。',
      tpl: 'num1',
      code: 111166000011,
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      algorithm: 1,
      format: ['n|n'],
      rank: ['one'],
      name: '一帆风顺',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111166000022: {
      description: '从0-9中任意选择1个以上的二重号码。',
      example: '投注方案：8；开奖号码：至少出现2个8，即中好事成双。',
      rule: '从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。',
      tpl: 'num1',
      code: 111166000022,
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      algorithm: 1,
      format: ['n|n'],
      rank: ['two'],
      name: '好事成双',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111166000033: {
      description: '从0-9中任意选择1个以上的三重号码。',
      example: '投注方案：8；开奖号码：至少出现3个8，即中三星报喜。',
      rule: '从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。',
      tpl: 'num1',
      code: 111166000033,
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      algorithm: 1,
      format: ['n|n'],
      rank: ['three'],
      name: '三星报喜',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111166000044: {
      description: '从0-9中任意选择1个以上的四重号码。',
      example: '投注方案：8；开奖号码：至少出现4个8，即中四季发财。',
      rule: '从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。',
      tpl: 'num1',
      code: 111166000044,
      sub: [
        { unit: '', golbal: [0, 10], btn: true }
      ],
      algorithm: 1,
      format: ['n|n'],
      rank: ['four'],
      name: '四季发财',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122001122: {
      description: '从万位、千位、百位、十位、个位中至少两位上各选1个号码组成1注。',
      example: '投注方案：万位1，百位2；<br>开奖号码：13245，<br>即中任选二直选一等奖',
      rule: '从任意两个以上的位置中选择一个号码，所选号码与开奖号码对应位置出现的号码相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      vm: 'num2',
      code: 111122001122,
      sub: [
        { unit: '万位', golbal: [0, 10], btn: true },
        { unit: '千位', golbal: [0, 10], btn: true },
        { unit: '百位', golbal: [0, 10], btn: true },
        { unit: '十位', golbal: [0, 10], btn: true },
        { unit: '个位', golbal: [0, 10], btn: true }
      ],
      algorithm: 2,
      format: ['n|n'],
      name: '任二直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122001111: {
      description: '手动输入号码，至少输入1个两位数号码。',
      example: '投注方案：58；开奖号码后二位：58，即中后二直选一等奖',
      rule: '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。',
      tpl: 'danshi2',
      algorithm: 2,
      code: 111122001111,
      sub: [],
      rx: true,
      sequence: true,
      format: ['n,n'],
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      name: '任二直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111122001133: {
      description: '从0-18中任意选择1个或1个以上的和值号码。',
      example: '投注方案：选择十位、个位，购买和值1；开奖号码后二位：01,10，即中后二直选。',
      rule: '所选数值等于开奖号码的所选位数相加之和，即为中奖。',
      tpl: 'hezhi2',
      vm: 'renxuan',
      algorithm: 2,
      sub: [
        { unit: '和值', golbal: [0, 19], btn: false }
      ],
      code: 111122001133,
      repeat: true,
      allsame: true,
      rx: true,
      // defaultCheckedPos: ["0", "1", "2", "3", "4"],
      // posLen: 2,
      name: '任二直选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122002222: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：万位5,百8；开奖号码位5*8**或者8*5** (顺序不限)，即中任选二组选一等奖。',
      rule: '从0-9中选2个号码组成一注，所选号码出现在开奖号的对应位上，顺序不限，即中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      algorithm: 2,
      sub: [
        { unit: '组选', golbal: [0, 10], btn: true }
      ],
      code: 111122002222,
      format: ['m|n'],
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 2,
      rx: true,
      name: '任二组选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111122002211: {
      description: '手动输入号码，至少输入1个两位数号码。',
      example: '投注方案：十位、个位选择号码5,8；开奖号码后二位：1个5，1个8 (顺序不限)，即中后二组选一等奖。',
      rule: '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，顺序不限，即为中奖。',
      tpl: 'danshi2',
      vm: 'danshi3',
      algorithm: 2,
      sub: [],
      sequence: false,
      format: ['n,m'],
      code: 111122002211,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 2,
      rx: true,
      isGroupInput: !0,
      name: '任二组选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111122002233: {
      description: '从1-17中任意选择1个或1个以上的和值号码。',
      example: '投注方案：和值1；开奖号码后二位：10或01(顺序不限，不含对子号)，即中后二组选。',
      rule: '所选数值等于开奖号码的十位、个位二个数字相加之和（不含对子号），即为中奖。',
      tpl: 'hezhi2',
      vm: 'renxuan',
      algorithm: 2,
      sub: [
        { unit: '组选', golbal: [1, 17], btn: false }
      ],
      code: 111122002233,
      repeat: false,
      allsame: true,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 2,
      rx: true,
      name: '任二组选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133001111: {
      description: '手动输入号码，至少输入1个三位数号码组成一注。',
      example: '投注方案：万位、千位、百位345，开奖号码345**，即中任选三直选一等奖',
      rule: '所选位置和所选号码与开奖号码的位置相同,且顺序一致,即为中奖。',
      tpl: 'danshi2',
      algorithm: 3,
      sub: [],
      sequence: true,
      format: ['n,n,n'],
      code: 111133001111,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      name: '任三直选单式',
      component: 'danshiNormal',
      betInitMoney: 2,
      rx: true
    },
    111133001122: {
      description: '从万位、千位、百位、十位、个位中至少三位上各选1个号码组成1注。',
      example: '投注方案：万位1，千位2，百位3；<br>开奖号码：12345，<br>即中任选三直选一等奖',
      rule: '从任意三个以上的位置中选择一个号码，所选号码与开奖号码对应位置出现的号码相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      vm: 'num2',
      sub: [
        { unit: '万位', golbal: [0, 10], groupNo: 111111004411, btn: true },
        { unit: '千位', golbal: [0, 10], groupNo: 111111004422, btn: true },
        { unit: '百位', golbal: [0, 10], groupNo: 111111004433, btn: true },
        { unit: '十位', golbal: [0, 10], groupNo: 111111004444, btn: true },
        { unit: '个位', golbal: [0, 10], groupNo: 111111004455, btn: true }
      ],
      algorithm: 3,
      code: 111133001122,
      format: ['n|n|n'],
      name: '任三直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133001133: {
      description: '从0-27中任意选择1个或1个以上号码。',
      example: '投注方案：选择百位、十位、个位和值1；开奖号码后三位：001,010,100,即中任选三直选一等奖',
      rule: '所选数值等于开奖号码的指定三位的三个数字相加之和，即为中奖。',
      tpl: 'hezhi2',
      vm: 'renxuan',
      algorithm: 3,
      sub: [
        { unit: '和值', golbal: [0, 28], btn: false }
      ],
      code: 111133001133,
      repeat: true,
      allsame: true,
      rx: true,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 3,
      name: '任三直选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133002211: {
      description: '从0-9中任意选择2个或2个以上号码。',
      example: '投注方案：5,8,8；开奖号码所选的相对应的三位：1个5，2个8 (顺序不限)，即任选三组选三一等奖。',
      rule: '从0-9中选择2个数字组成两注，所选号码与开奖号码的所选择的位相同，且顺序不限，即为中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      algorithm: 3,
      sub: [
        { unit: '组三', golbal: [0, 10], btn: true }
      ],
      format: ['m|n'],
      code: 111133002211,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 3,
      count: 2,
      rx: true,
      name: '任三组三',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133002222: {
      description: '从0-9中任意选择3个或3个以上号码。',
      example: '投注方案：2,5,8；开奖号码所选的指定三位：1个2、1个5、1个8 (顺序不限)，即中任选三组选六一等奖。',
      rule: '从0-9中选3个号码组成一注，所选号码出现在开奖号的对应位上，顺序不限，即中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      algorithm: 3,
      sub: [
        { unit: '组六', golbal: [0, 10], btn: true }
      ],
      format: ['m|n|n'],
      code: 111133002222,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 3,
      rx: true,
      name: '任三组六',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111133002233: {
      description: '手动输入号码，至少输入1个三位数号码。',
      example: '投注方案：分別投注(0,0,1),以及(1,2,3)，开奖号码指定位包括：(1)0,0,1，<br>顺序不限，即中得任选三一等奖；或者(2)1,2,3，顺序不限，即中得组六一等奖。',
      rule: '键盘手动输入购买号码，3个数字为一注，开奖号码的指定位符合组三或组六均为中奖，单注奖金组三600元，组六300元。',
      tpl: 'danshi2',
      vm: 'danshi3',
      algorithm: 3,
      sub: [],
      format: ['n,n,n'],
      code: 111133002233,
      sequence: false,
      rx: true,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      isGroupInput: !0,
      name: '任三混合组选',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111133002244: {
      description: '从1-26中任意选择1个以上号码。',
      example: '投注方案：和值3；<br>开奖号码指定三位：<br>(1)开出003号码，顺序不限，<br>即中任选三组选三一等奖；<br>(2)开出012号码，顺序不限，即中任选三组选六一等奖',
      rule: '所选数值等于开奖号码万位、千位、百位三个数字相加之和，即为中奖单倍奖金组三600元组六300元。',
      tpl: 'hezhi2',
      vm: 'renxuan',
      algorithm: 3,
      sub: [
        { unit: '和值', golbal: [1, 26], btn: false }
      ],
      code: 111133002244,
      repeat: true,
      allsame: false,
      rx: true,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 3,
      name: '任三组选和值',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111144001111: {
      description: '手动输入号码，至少输入1个四位数号码组成一注。',
      example: '投注方案：勾选位置万位、千位、十位、个位，输入号码1524； 开奖号码：15*24，即中任四直选。',
      rule: '从万位、千位、百位、十位、个位中任意勾选四个位置，手动输入一个四位数号码组成一注，<br>所选4个位置上的开奖号码与输入号码完全相同，且顺序一致，即为中奖。',
      tpl: 'danshi2',
      algorithm: 4,
      sub: [],
      format: ['n,n,n,n'],
      code: 111144001111,
      sequence: true,
      rx: true,
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      name: '任四直选单式',
      component: 'danshiNormal',
      betInitMoney: 2
    },
    111144001122: {
      description: '从万位、千位、百位、十位、个位中至少四位上各选1个号码组成1注。',
      example: '投注方案：万位1、千位5、百位0、十位2； 开奖号码：1502*，即中任四直选。',
      rule: '从万位、千位、百位、十位、个位中任意选择四个位置，在这四个位上至少各选1个号码组成一注，<br>所选4个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。',
      tpl: 'num1',
      vm: 'num2',
      sub: [
        { unit: '万位', golbal: [0, 10], groupNo: 111111004411, btn: true },
        { unit: '千位', golbal: [0, 10], groupNo: 111111004422, btn: true },
        { unit: '百位', golbal: [0, 10], groupNo: 111111004433, btn: true },
        { unit: '十位', golbal: [0, 10], groupNo: 111111004444, btn: true },
        { unit: '个位', golbal: [0, 10], groupNo: 111111004455, btn: true }
      ],
      code: 111144001122,
      algorithm: 4,
      format: ['n|n|n|n'],
      name: '任四直选复式',
      component: 'fushiNormal',
      betInitMoney: 2
    },
    111144002244: {
      description: '从三重号选1个号，单号中选1个号组成一注。',
      example: '投注方案：勾选位置万位、千位、十位、个位，选择三重号：8，单号：0； 开奖号码：88*80 或 80*88，均中任四组选4。',
      rule: '从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择1个三重号和1个单号组成一注，<br>所选4个位置的开奖号码与所选号码一致，<br>并且所选三重号码在所选4个位置的开奖号码中出现了3次，顺序不限，即为中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      code: 111144002244,
      type: 'r4z4',
      format: [[3, 1], [0, 0]],
      algorithm: [4, 3, 1, 20],
      sub: [
        { unit: '三重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      posLen: 4,
      rx: true,
      name: '任四组4',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [1, 1]]
    },
    111144002233: {
      description: '从二重号中选择2个号组成一注。',
      example: '投注方案：勾选位置万位、千位、十位、个位，选择二重号：6、8； 开奖号码：66*88 或 68*68，均中任四组选6。',
      rule: '从万位、千位、百位、十位、个位中任意勾选四个位置，<br>然后从0-9中选择2个二重号组成一注，所选4个位置的开奖号码与所选号码一致，<br>并且所选的2个二重号码在所选4个位置的开奖号码中分别出现了2次，顺序不限，即为中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      algorithm: [4, 2, 2, 120],
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true }
      ],
      code: 111144002233,
      format: [[2, 2], [0, 0]],
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 4,
      rx: true,
      name: '任四组6',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [2, [2]]
    },
    111144002222: {
      description: '从二重号中选1个号，单号中选2个号组成一注。',
      example: '投注方案：勾选位置万位、千位、十位、个位，选择二重号：8，单号：0、6； <br>开奖号码：88*06 或 08*68，均中任四组选12。',
      rule: '从万位、千位、百位、十位、个位中任意勾选四个位置，然后选择1个二重号码和2个单号号码组成一注，<br>所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      algorithm: [4, 1, 2, 20],
      sub: [
        { unit: '二重号', golbal: [0, 10], btn: true },
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111144002222,
      format: [[2, 1], [0, 0]],
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 4,
      rx: true,
      name: '任四组12',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [3, [1, 2]]
    },
    111144002211: {
      description: '从单号中选4个号组成一注。',
      example: '投注方案：勾选位置万位、千位、十位、个位，选择号码1234； 开奖号码：12*34 或 13*24，均中任四组选24。',
      rule: '从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择四个号码组成一注，<br>所选4个位置的开奖号码与所选号码一致，顺序不限，即为中奖。',
      tpl: 'renxuan1',
      vm: 'renxuan',
      algorithm: [4, 1, 4, 120],
      sub: [
        { unit: '单号', golbal: [0, 10], btn: true }
      ],
      code: 111144002211,
      format: [[0, 0], [0, 0]],
      defaultCheckedPos: ['0', '1', '2', '3', '4'],
      posLen: 4,
      rx: true,
      name: '任四组24',
      component: 'fushiNormal',
      betInitMoney: 2,
      randomRule: [4, [4]]
    },
    3145: {
      description: '从0-9中选择1个号码。',
      example: '投注方案：和值尾数 8<br>开奖号码：后三位 936，和值位数为8，即中和值尾数。',
      rule: '所选数值等于开奖号码的百位、十位、个位三个数字相加之和的尾数，即为中奖。',
      tpl: 'num1',
      format: ['n'],
      sub: [
        ['和值尾数'],
        [0, 9]
      ],
      algorithm: ['R6']
    },
    3146: {
      description: '从0-9中选择1个号码。',
      example: '投注方案：跨度8<br>开奖号码：后三位0,8,X，其中X不等于9；或者后三位1,9,X，其中X不等于0，即可中后三直选。',
      rule: '所选数值等于开奖号码的后3位最大与最小数字相减之差，即为中奖。',
      tpl: 'num1',
      format: ['n'],
      sub: [
        ['直选跨度'],
        [0, 9]
      ],
      algorithm: ['R12', 3, [0, 9]]
    },
    3147: {
      description: '从0-9中选择1个号码。',
      example: '投注方案：包胆3<br>开奖号码：后三位 3XX 或者 33X，即中后三组选三，后三位 3XY，即中后三组选六。',
      rule: '从0-9中任意选择1个包胆号码，开奖号码的百位、十位、个位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。',
      tpl: 'hezhi1',
      vm: 'num1',
      format: ['n'],
      sub: [
        ['组选包胆'],
        [0, 9]
      ],
      algorithm: ['R13', 3, [0, 9], !1],
      isRadio: !0
    },
    3149: {
      description: '从0-9中选择1个号码。',
      example: '投注方案：1<br>开奖号码：后四位，至少出现1个1，即中四星一码不定位。',
      rule: '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。',
      tpl: 'num1',
      vm: 'num1',
      format: ['n'],
      sub: [
        ['四星一码'],
        [0, 9]
      ],
      algorithm: ['R8']
    },
    3150: {
      description: '从0-9中任意选择2个以上号码。',
      example: '投注方案：12<br>开奖号码：后四位，至少出现1和2各一个，即中四星二码不定位。',
      rule: '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。',
      tpl: 'num1',
      vm: 'num1',
      format: ['m|n'],
      sub: [
        ['四星二码'],
        [0, 9]
      ],
      algorithm: ['R1', 2]
    },
    3151: {
      description: '从0-9中任意选择2个以上号码。',
      example: '投注方案：12<br>开奖号码：至少出现1和2各一个，即中五星二码不定位。',
      rule: '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，<br>即为中奖。',
      tpl: 'num1',
      vm: 'num1',
      format: ['m|n'],
      sub: [
        ['五星二码'],
        [0, 9]
      ],
      algorithm: ['R1', 2]
    },
    3152: {
      description: '从0-9中任意选择3个以上号码。',
      example: '投注方案：123<br>开奖号码：至少出现1、2、3各1个，即中五星三码不定位。',
      rule: '从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，<br>即为中奖。',
      tpl: 'num1',
      vm: 'num1',
      format: ['m|n|n'],
      sub: [
        ['五星三码'],
        [0, 9]
      ],
      algorithm: ['R1', 3]
    }
  };
  return data[arg];
};
export default{
  dataFun
};
