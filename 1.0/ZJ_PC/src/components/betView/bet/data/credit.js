import sscConfig from '@/assets/data/data.sscCredit'
import fastThreeConfig from '@/assets/data/data.k3Credit'
import bjpk10 from '@/assets/data/bjpk10.credit'
import syx5 from '@/assets/data/data.11x5.credit'
import lhc from '@/assets/data/data.lhc'
import pcdd from '@/assets/data/pcdd.credit.js'
const dataConfigSlot = function (type, groudNo, smgrouObj, openTime) {
    switch ('' + type) {
        case '11':
            return sscConfig.dataFun(groudNo)
        case '22':
        case '33':
            return fastThreeConfig.dataFun(groudNo)
        case '44':
            return syx5.dataFun(groudNo)
        case '55':
            return bjpk10.dataFun(groudNo)
        case '66':
            return lhc.dataFun(groudNo, smgrouObj, openTime)
        case '88':
            return pcdd.dataFun(groudNo)
        default:
            return null
    }
}

export default {
  dataConfigSlot
}
