//  name: "[前三码不定位复式]",description  描述
//  example  投注案例 说明
//  rule  投注中奖规则 说明
//  algorithm  同组选择号码个数
//  sub  投注的模板
// sequence 是否有顺序规则

const dataFun = function (arg, bonusAmt) {
  let Amt = bonusAmt || '---';
  arg = '4401' + arg.toString().slice(4);
  const data = {
    numberLen: 1,
    defaultNavIndex: 0,
    440111001122: {
      name: '[前三码不定位复式]',
      description: "从01-11共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      algorithm: 1,
      code: 440111001122,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440111002222: {
      name: '[前三码定胆位复式]',
      description: " 从第一位、第二位、第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440111002222,
      sub: [
        { unit: '第一位', golbal: [0, 11], btn: true },
        { unit: '第二位', golbal: [0, 11], btn: true },
        { unit: '第三位', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2,
      posLen: 1,
      sequence: true
    },
    440111003322: {
      name: '[任选一中一复式]',
      description: "从01-11共11个号码中选择1个号码进行购买，当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440111003322,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440122001122: {
      name: '[前二直选复式]',
      description: "从01-11共11个号码中选择1个号码进行购买，当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440122001122,
      sub: [
        { unit: '第一位', golbal: [0, 11], btn: true },
        { unit: '第二位', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2,
      posLen: 2
    },
    440122002222: {
      name: '[前二组选复式]',
      description: "从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 2,
      code: 440122002222,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440122003322: {
      name: '[任选二中二复式]',
      description: "从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 2,
      code: 440122003322,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440133001122: {
      name: '[前三直选复式]',
      description: "从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440133001122,
      sub: [
        { unit: '第一位', golbal: [0, 11], btn: true },
        { unit: '第二位', golbal: [0, 11], btn: true },
        { unit: '第三位', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2,
      posLen: 3,
      sequence: true
    },
    440133002222: {
      name: '[前三组选复式]',
      description: "从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序不限，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元 ',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 3,
      code: 440133002222,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440133003322: {
      name: '[任选三中三复式]',
      description: "从01-11共11个号码中选择3个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 3,
      code: 440133003322,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440144001122: {
      name: '[任选四中四复式]',
      description: "从01-11共11个号码中选择4个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 4,
      code: 440144001122,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440155001122: {
      name: '[任选五中五复式]',
      description: "从01-11共11个号码中选择5个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 5,
      code: 440155001122,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440166001122: {
      name: '[任选六中五复式]',
      description: "从01-11共11个号码中选择6个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元 ',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 6,
      code: 440166001122,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440177001122: {
      name: '[任选七中五复式]',
      description: "从01-11共11个号码中选择7个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元 ',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 7,
      code: 440177001122,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440188001122: {
      name: '[任选八中五复式]',
      description: "从01-11共11个号码中选择8个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元 ',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 8,
      code: 440188001122,
      sub: [
        { unit: '', golbal: [0, 11], btn: true }
      ],
      component: 'multiple',
      betInitMoney: 2
    },
    440122002233: {
      name: '[前二组选胆拖]',
      description: "从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的前二位开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440122002233,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 1 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 2
    },
    440122003333: {
      name: '[任选二中二胆拖]',
      description: "从01-11共11个号码中至少选择2个以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期的前二位开奖号码中有2个包含所选号码（每注包含2个号码），即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440122003333,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 1 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 2
    },
    440133002233: {
      name: '[前三组选胆拖]',
      description: "从01-11共11个号码中至少选择3个以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期的前三位开奖号码中有3个包含所选号码（每注包含3个号码），即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440133002233,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 2 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 3
    },
    440133003333: {
      name: '[任选三中三胆拖]',
      description: "从01-11共11个号码中至少选择3个以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期的5个开奖号码中有3个包含所选号码（每注包含3个号码），即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440133003333,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 2 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 3
    },
    440144001133: {
      name: '[任选四中四胆拖]',
      description: "从01-11共11个号码中至少选择4个以上号码进行投注，每注需至少包括1个胆码及3个拖码。只要当期的5个开奖号码中有4个包含所选号码（每注包含4个号码），即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440144001133,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 3 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 4
    },
    440155001133: {
      name: '[任选五中五胆拖]',
      description: "从01-11共11个号码中至少选择5个以上号码进行投注，每注需至少包括1个胆码及4个拖码。只要所选的每注5个号码和当前的5个开奖号码全部相同，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440155001133,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 4 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 5
    },
    440166001133: {
      name: '[任选六中五胆拖]',
      description: "从01-11共11个号码中至少选择6个以上号码进行投注，每注需至少包括1个胆码及5个拖码。只要所选的每注6个号码中，有5个和当期的5个开奖号码全部相同，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440166001133,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 5 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 6
    },
    440177001133: {
      name: '[任选七中五胆拖]',
      description: "从01-11共11个号码中至少选择7个以上号码进行投注，每注需至少包括1个胆码及6个拖码。只要所选的每注7个号码中，有5个和当期的5个开奖号码全部相同，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440177001133,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 6 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 7
    },
    440188001133: {
      name: '[任选八中五胆拖]',
      description: "从01-11共11个号码中至少选择8个以上号码进行投注，每注需至少包括1个胆码及7个拖码。只要所选的每注8个号码中，有5个和当期的5个开奖号码全部相同，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440188001133,
      sub: [
        { unit: '胆码', golbal: [0, 11], btn: true, num: 1 },
        { unit: '拖码', golbal: [0, 11], btn: true, num: 7 }
      ],
      component: 'danTuo',
      betInitMoney: 2,
      posLen: 8
    },
    440111003311: {
      name: '[任选一中一单式]',
      description: "从01-11中手动输入1个号码进行购买，只要当期的5个开奖号码中包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 440111003311,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440122001111: {
      name: '[前二直选单式]',
      description: "手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 2,
      code: 440122001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440122002211: {
      name: '[前二组选单式]',
      description: "手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前2个号码相同，且顺序不限，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 2,
      code: 440122002211,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440122003311: {
      name: '[任选二中二单式]',
      description: "从01-11中手动输入2个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 2,
      code: 440122003311,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440133001111: {
      name: '[前三直选单式]',
      description: "手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序一致，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 3,
      code: 440133001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440133002211: {
      name: '[前三组选单式]',
      description: "手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中 的前3个号码相同，且顺序不限，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 3,
      code: 440133002211,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440133003311: {
      name: '[任选三中三单式]',
      description: "从01-11中手动输入3个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 3,
      code: 440133003311,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440144001111: {
      name: '[任选四中四单式]',
      description: "从01-11中手动输入4个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 4,
      code: 440144001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440155001111: {
      name: '[任选五中五单式]',
      description: "从01-11中手动输入5个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 5,
      code: 440155001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440166001111: {
      name: '[任选六中五单式]',
      description: "从01-11中手动输入6个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 6,
      code: 440166001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440177001111: {
      name: '[任选七中五单式]',
      description: "从01-11中手动输入7个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 7,
      code: 440177001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    440188001111: {
      name: '[任选八中五单式]',
      description: "从01-11中手动输入8个号码进行购买，只要当期的5个号码中的前2个包含所选号码，即为中奖。奖金<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 8,
      code: 440188001111,
      sub: [],
      component: 'simplex',
      betInitMoney: 2
    },
    4401990011: {
      name: '[趣味 定单双]',
      description: "从6种单双个数组中选择1种组合，当开奖号码的单双个数与所选单双组合一致，即为中奖。奖金最多<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 4401990011,
      sub: [{}],
      component: 'interest',
      betInitMoney: 2
    },
    4401990022: {
      name: '[趣味 猜中位]',
      description: "从3-9中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。奖金最多<span style='color: #e60b0b;'>" + Amt + '</span>元',
      example: '',
      rule: '',
      tpl: '',
      algorithm: 1,
      code: 4401990022,
      sub: [{}],
      component: 'guessMiddle',
      betInitMoney: 2
    }
  };
  return data[arg];
};

export default{
  dataFun
};
