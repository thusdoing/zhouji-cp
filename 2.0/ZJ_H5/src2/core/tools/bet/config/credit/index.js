import sscConfig from './data.sscCredit';
import fastThreeConfig from './data.fastThreeCredit';
import chooseFiveConfig from './data.chooseFiveCredit';
import lhc from './data.lhc';
import pcegg from './data.pcEggGredit';

const dataConfigSlot = function (type, groudNo, lhcObj,openTime) {
  switch ('' + type) {
    case '11':
      return sscConfig.dataFun(groudNo);
    case '22':
    case '33':
      return fastThreeConfig.dataFun(groudNo);
    case '44':
      return chooseFiveConfig.dataFun(groudNo);
    case '55':
      return chooseFiveConfig.dataFun(groudNo);
    case '66':
      return lhc.dataFun(groudNo, lhcObj,openTime);
    case '88':
      return pcegg.dataFun(groudNo);
    default:
      return null;
  }
};

export default {
  dataConfigSlot
};
