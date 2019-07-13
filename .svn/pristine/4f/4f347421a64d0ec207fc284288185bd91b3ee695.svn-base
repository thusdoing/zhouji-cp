import sscConfig from '@/assets/data/data.ssc'
import fastThreeConfig from '@/assets/data/data.fastThree'
import syx5 from '@/assets/data/data.11x5'
import bjpk10 from '@/assets/data/bjpk10'
import pcdd from '@/assets/data/pcdd'

import store from '@/vuex/store';

const _dataConfigSlot = function (type, groudNo, bonusAmt) {
  switch ('' + type) {
    // 时时彩
    case '11':
      return sscConfig.dataFun(groudNo, bonusAmt)
      // 快三 三方
    case '22':
      // 快三 自己
    case '33':
      return fastThreeConfig.dataFun(groudNo, bonusAmt)
      // 十一选五
    case '44':
      return syx5.dataFun(groudNo, bonusAmt)
      // 北京PK10
    case '55':
      return bjpk10.dataFun(groudNo, bonusAmt)
      // pcdd
    case '88':
      return pcdd.dataFun(groudNo, bonusAmt)
    default:
      return null
  }
}

export default {
  dataConfigSlot(...args) {
    const data = _dataConfigSlot(...args);
    if (data == null) return data;

    if (typeof data.betInitMoney !== 'undefined') {
      data.betInitMoney = (() => {
        try {
          return store.state.global.eachNoteAmt;
        } catch (e) {
          if (process.env.NODE_ENV == 'development') {
            alert("store.state.global.eachNoteAmt 没有取到值");
            console.error(e, "store.state.global.eachNoteAmt");
          }

          return data.betInitMoney || 2;
        }
      })();
    }

    return data;
  }
}
