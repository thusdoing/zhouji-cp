<template>
    <div>
        <div class="play-content playBoxNum">
            <div class="playitd-wrap">
                <p v-html="config.description"></p>
                <div class="random-wrap" @click="onRandomClick">
                    <img src="/static/fingerTouch@2x.png">
                    <span>机选</span>
                </div>
            </div>

            <div class="local-wrap" v-if="config && config.rx">
                <div class="position-area">
                    <label>选择位置: </label>

                    <checker v-model="social" type="checkbox" :max="5" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                        <checker-item value="万">万</checker-item>
                        <checker-item value="千">千</checker-item>
                        <checker-item value="百">百</checker-item>
                        <checker-item value="十">十</checker-item>
                        <checker-item value="个">个</checker-item>
                    </checker>
                </div>

                <div class="notice-area">
                    <label>(温馨提示: 你选择了 {{ selLen }} 个位置，系统会自动根据位置组合成 {{ schemeCount }} 个方案)</label>
                </div>
            </div>

            <div v-for="(itemWarp, DataNumIndex) in (this.config.sub || [])" :key="DataNumIndex">
                <div class="boxshow-wrap">
                    <p class="pos-show" v-if="itemWarp.unit">{{itemWarp.unit}}</p>
                    <div class="box-and-quick">
                        <div class="quick-wrap">
                            <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='全'}" @click="quickChoice(DataNumIndex, '全');">全</span>
                            <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='大'}" @click="quickChoice(DataNumIndex, '大');">大</span>
                            <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='小'}" @click="quickChoice(DataNumIndex, '小');">小</span>
                            <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='单'}" @click="quickChoice(DataNumIndex, '单');">单</span>
                            <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='双'}" @click="quickChoice(DataNumIndex, '双');">双</span>
                            <span class="ball-quick" @click="quickChoice(DataNumIndex, '清');">清</span>
                        </div>

                        <div class="ball-wrap">
                            <p class="ball" v-for="(item, index) in itemWarp.golbal[1]" @click="choiceNum(DataNumIndex, itemWarp.golbal[0] + index)"
                                :key="index+'a'" :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][itemWarp.golbal[0] + index]}">{{ (itemWarp.golbal[0] + index+1)<10?("0"+(itemWarp.golbal[0] + index+1)):(itemWarp.golbal[0] + index+1) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="okbet-wraps">
            <i class="iconfont icon-lajixiang"></i>
            <label>已选</label>
            <label style="color:yellow;">{{betCount}}</label>
            <label>注,</label>
            <label>共</label>
            <label style="color:yellow;">{{betAmt}}</label>
            <label>元</label>
            <Button class="btn-error" @click="btnConfirmChoiceFun">投注</Button>
        </div>
    </div>
</template>

<script>
import asmd from '@/assets/js/asmd'
import Combinatorics from '@/assets/js/combinatorics'
import result from './result'
import { Checker, CheckerItem } from 'vux'
import {  
  ADD_BET
} from '../../state/mutation-type'

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
      this.betCount = result(this.settings.groupNo).getBetCount(this.config, this.codeNumYardArr.map(el => {
        let temAry = []

        el.forEach((item, index) => {
          item && temAry.push(index+1)
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
      this.codeNumYardArr = result(this.settings.groupNo).getRandom(this.config)
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

      var betRet = result(this.settings.groupNo).getBetResult(this.config, this.codeNumYardArr.map((el) => {
        let temAry = []

        el.forEach((item, index) => {
          item && temAry.push((index+1)>9?(index+1):('0'+(index+1)))
        })

        return temAry
      }), this.social)

      if (Array.isArray(betRet)) {
        betRet.map((el, index) => {
          el.betBackRate = null
          el.betMultiple = this.betTimes
          el.betNumber = el.betNumber
          // el.betNumber = this.codeNumYardArr[index].length
          el.betAmt = asmd.mul(el.betNumber, this.betTimes, this.pattern, (this.config.betInitMoney || 1))
          el.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), el.betAmt)
          el.gameNo = this.$route.params.gameNo
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

</script>

<style lang='less' scoped>
    @import "./gameNormal.less";
</style>