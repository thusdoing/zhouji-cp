// 根据业务前4位的 已经截取 所以会少两位  目前有的信用玩法都是这样的 模板
const dataFun = function (arg) {
  arg = arg.toString();
  arg = '0011' + arg.slice(4);
  const data = {
    '0011': {
      component: 'allCreditPlay',
      initMoney: 2
    }
  };
  return data[arg];
};
export default{
  dataFun
}
;
