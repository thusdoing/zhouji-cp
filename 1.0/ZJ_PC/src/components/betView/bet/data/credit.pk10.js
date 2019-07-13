//根据业务前4位的 已经截取 所以会少两位
const dataFun = function(arg){

    const data = {
      numberLen: 1,
      defaultNavIndex: 0,
      '1111': {
        component:'bjpk10sm',
        date:123
      },
      '2211':{
        component:'bjpk10sm',
        date:2
      },
      '3311':{
        component:'bjpk10sm',
        date:3
      },
      '4411':{
        component:'bjpk10sm',
        date:4
      },
      '5511':{
        component:'bjpk10sm',
        date:5
      },
      '6611':{
        component:'bjpk10sm',
        date:6
      },
      '7711':{
        component:'bjpk10sm',
        date:7
      },
      '8811':{
        component:'bjpk10sm',
        date:8
      },
      '9911':{
        component:'bjpk10sm',
        date:9
      },
      '0011':{
        component:'bjpk10sm',
        date:10
      },
      '0211':{
        component:'bjpk10sm'
      },
      '0111':{
        component:'bjpk10dxds'
      },
      "0311":{
        component:'bjpk10sm'
      }
    }

    return data[arg]
}
    
  
  export default{
    dataFun
  }