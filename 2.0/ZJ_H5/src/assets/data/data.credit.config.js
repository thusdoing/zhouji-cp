import sscConfig from '@/assets/data/data.sscCredit'
import fastThreeConfig from '@/assets/data/data.fastThreeCredit'
import chooseFiveConfig from '@/assets/data/data.chooseFiveCredit'
import lhc from '@/assets/data/data.lhc'

const dataConfigSlot = function(type, groudNo,lhcObj) {
    switch(''+type) {
        case '11':
            return sscConfig.dataFun(groudNo)
        case '22': 
        case '33':
            return fastThreeConfig.dataFun(groudNo)
        case '44':
            return chooseFiveConfig.dataFun(groudNo)
        case '55':
            return chooseFiveConfig.dataFun(groudNo)
        case '66':
            return lhc.dataFun(groudNo,lhcObj)
        default: 
            return null
    }
}

export default {
    dataConfigSlot
}