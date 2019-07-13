// 根据业务前4位的 已经截取 所以会少两位  目前有的信用玩法都是这样的 模板
const dataFun = function (arg) {
  const data = {
    '0044': {
      component: 'allCreditPlay',
      initMoney: 2
    }
  };
  if (arg.length > 0) {
    return data['0044'];
  }
};
export default{
  dataFun
};
