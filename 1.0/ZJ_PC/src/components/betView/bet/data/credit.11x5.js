//根据业务前4位的 已经截取 所以会少两位
const dataFun = function(arg){

    const data = {
      numberLen: 1,
      defaultNavIndex: 0,
      '0011': {
        component:'syx5sm',
        date:123
      },
      '0022':{
        component:'syx5x5z1',
      },
      '0033':{
        component:'syx5x5z1',
      },
      '0044':{
        component:'syx5x5z1',
      },
      '0055':{
        component:'syx5x5z1',
      },
      '0066':{
        component:'syx5x5z1',
      },
      '0077':{
        component:'syx5lhd',
      },
      '0088':{
        component:'syx5x5z1',
      },
    }

    return data[arg]
}
    
  
  export default{
    dataFun
  }