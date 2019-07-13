// 根据业务前4位的 已经截取 所以会少两位
// initMoney 初始金额
// component 调用的模板
const dataFun = function (arg) {
  const data = {
    numberLen: 1,
    defaultNavIndex: 0,
    '7711': {
      code: '7711',
      checkbox: true,
      component: 'allCreditPlay',
      initMoney: 2,     
      min:3
    }
  };
  return data[arg];
};
export default {
  dataFun
};
