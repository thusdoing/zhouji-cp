//根据业务前4位的 已经截取 所以会少两位
const dataFun = function(arg){
    const data = {
      numberLen: 1,
      defaultNavIndex: 0,
      '0011': {
        component:'dxsb'
      }
    }
    if(arg){
      return {
          component:'dxsb'
      };
    }
    
  };
  export default{
    dataFun
  }