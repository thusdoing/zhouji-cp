import asmd from '@/assets/js/asmd'
import Combinatorics from '@/assets/js/combinatorics'
import gameAlgo from '@/assets/js/game.config'
import { Checker, CheckerItem } from 'vux'
import {  
  ADD_BET
} from '../../../state/mutation-type'

export default {
  components: {
    Checker,
    CheckerItem
  },
  props: ['config', 'settings'],
  data() {
    return {
      quickBtns: [],
      codeNumYardArr: [],
      moneyModel: 0,
      betCount: 0,
      betTimes: 1,
      social: ['万', '千', '百', '十', '个'],
    }
  },
  computed: {
    betAmt: function() {
      return asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1))
    },
    pattern: function() {
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
        pattern = 1
      } else if (this.$store.state.betModel == 1) {
        pattern = 0.1
      } else if (this.$store.state.betModel == 2) {
        pattern = 0.01
      }
      return pattern
    },
    selLen: function() {
      return this.social.length
    },
    schemeCount: function() {
        return Combinatorics.C(this.social.length, this.config.posLen || this.config.algorithm)
    },
    totalBetNumber () {
      return this.$store.getters.totalBetNumber
    }
  },
  watch: {
    config: function() {
      this.clearUI()
    },
    schemeCount () {
      this.validChioceNum()
    }
  },
  mounted () {
    this.clearUI()
  },
  methods: {
    choiceNum(pos, index) {
      this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index])

      this.validChioceNum();
    },
    //快速选择号码
    quickChoice(index, type) { 
      
      this.$set(this.quickBtns, index, type);

      var len = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0]

      var start = this.config.sub[index].golbal[0],
          mid = this.config.sub[index].golbal[0] + Math.ceil(this.config.sub[index].golbal[1] / 2),
          end = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0]

      switch(type) {
        case '全':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).fill(1, start, end);
          this.codeNumYardArr = codeNumYardArr;
          break
        
        case '大':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).fill(1, mid, end);
          this.codeNumYardArr = codeNumYardArr;
          break

        case '小': 
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).fill(1, start, mid);
          this.codeNumYardArr = codeNumYardArr;
          break
        
        case '单':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
            if (index < start) {
              return 0
            }
            return index % 2 ? 1 : 0
          }); 

          this.codeNumYardArr = codeNumYardArr;
          break

        case '双':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          
          codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
            if (index < start) {
              return 0
            }
            return index % 2 ? 0 : 1
          });
          
          this.codeNumYardArr = codeNumYardArr;
          break

        case '清': 
          //this.codeNumYardArr[index] = Array(len).fill(0);break
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0);
          this.codeNumYardArr = codeNumYardArr; break;
      }

      this.validChioceNum();
    },
    clearUI: function() {
      var codeNumYardArr = []
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        codeNumYardArr[k] = Array(this.config.sub[k].golbal[1]).fill(0); 
      }

      this.codeNumYardArr = codeNumYardArr
      this.betCount = 0
      this.betTimes = 1
      this.moneyModel = 0
      this.quickBtns = []
      this.social = ['万', '千', '百', '十', '个']
    },
    validChioceNum() { 
      this.betCount = gameAlgo(this.settings.groupNo).getBetCount(this.config, this.codeNumYardArr.map(el => {
        let temAry = []

        el.forEach((item, index) => {
          item && temAry.push(index)
        })

        return temAry
      })) * (this.config.rx ? this.schemeCount : 1)
    },
    socialRandom (num) {
      var socialStr = ['万', '千', '百', '十', '个']
      var arr = [];
      var json = {};
      while (arr.length < num) {
          //产生单个随机数
          var ranNum = Math.floor(Math.random() * 5);
          //通过判断json对象的索引值是否存在 来标记 是否重复
          if (!json[ranNum]) {
            json[ranNum] = 1;
            arr.push(ranNum);
          }
      }

      return arr.sort((a,b)=>a-b).map(el => socialStr[el])
    },
    onRandomClick () {
      this.clearUI()
      this.social = this.socialRandom(this.config.posLen || this.config.algorithm)
      this.codeNumYardArr = gameAlgo(this.settings.groupNo).getRandom(this.config)
      this.validChioceNum()
    },
    btnConfirmChoiceFun() {
      if (this.betCount == 0 && this.totalBetNumber == 0) {
        this.onRandomClick()
        return
      }

      if (this.betCount == 0 && this.totalBetNumber != 0) {
        this.$router.push('/betResult')
        return
      }

      var betRet = gameAlgo(this.settings.groupNo).getBetResult(this.config, this.codeNumYardArr.map((el) => {
        let temAry = []

        el.forEach((item, index) => {
          item && temAry.push(index)
        })

        return temAry
      }), this.social)
      console.log(betRet)
      if (Array.isArray(betRet)) {
        betRet.map((el, index) => {
          el.betBackRate = null
          el.betMultiple = this.betTimes
          // let num=0
          // for(let i in this.codeNumYardArr[index]){
          //   if(this.codeNumYardArr[index][i]==1){num+=1}
          // }
          el.betNumber = el.betNumber
          // el.betNumber = this.codeNumYardArr[index].length
          el.betAmt = asmd.mul(el.betNumber, this.betTimes, this.pattern, (this.config.betInitMoney || 1))
          el.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), el.betAmt)
          el.gameNo = this.$route.params.gameNo
          el.groupNo = this.$route.params.gameNo + el.groupNo.toString().slice(4)
          el.gamePattern = this.$store.state.betModel
        })
      }
      else {
        betRet.betAmt = this.betAmt
        betRet.betBackRate = null
        betRet.betContent = betRet.betContent
        betRet.showContent = betRet.showContent
        betRet.betMultiple = this.betTimes
        betRet.betNumber = this.betCount
        //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, this.pattern), this.betAmt)
        betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), this.betAmt)
        betRet.gameNo = this.$route.params.gameNo
        betRet.groupNo = this.settings.groupNo
        betRet.gamePattern = this.$store.state.betModel
      }
      //this.$emit('bet', betRet)
      
      //console.log('betRet',betRet)
      this.$store.commit(ADD_BET, betRet)

      this.clearUI()

      this.$router.push('/betResult')
    }
  }
}
