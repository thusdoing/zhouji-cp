import sscConfig from './data.ssc';
import fastThreeConfig from './data.fastThree';
import chooseFive from './data.chooseFive';
import bjpk10 from './data.bjpk10';
import pcegg from './data.pcEgg';
// import store from '@/store';

const _dataConfigSlot = function (type, groudNo, bonusAmt) {
  switch ('' + type) {
    case '11':
      return sscConfig.dataFun(groudNo);
    case '22':
    case '33':
      return fastThreeConfig.dataFun(groudNo);
    case '44':
      return chooseFive.dataFun(groudNo, bonusAmt);
    case '55':
      return bjpk10.dataFun(groudNo, bonusAmt);
    case '88':
      return pcegg.dataFun(groudNo, bonusAmt);
    default:
      return null;
  }
};

export default {
  dataConfigSlot (...args) {
    const data = _dataConfigSlot(...args);
    if (data == null) return data;
    data.betInitMoney = 2;
    // data.betInitMoney = (() => {
    //   try {
    //     return store.state.global.eachNoteAmt;
    //   } catch (e) {
    //     if (process.env.NODE_ENV == 'development') {
    //       alert('store.state.global.eachNoteAmt 没有取到值');
    //       console.error(e, 'store.state.global.eachNoteAmt');
    //     }

    //     return data.betInitMoney || 2;
    //   }
    // })();

    return data;
  }
};
