<style lang="less" scoped>
@import '../ssc.less';
.ssc-fushi-normal {
  width: 100%; position: absolute;height: 100%;overflow: auto;padding-bottom: 60px;box-sizing: border-box;
}
</style>

<template>
  <div class="ssc-fushi-normal">
    <div class="play-content playBoxNum">
      <div class="playitd-wrap">
        <p>{{config.description}}</p>
        <div class="random-wrap" @click="onRandomClick">
          <!-- <img src="/static/fingerTouch@2x.png"> -->
          <i class="iconfont icon-dianji" style="font-size: 22px;"></i>
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
              <p class="ball" v-for="(item, index) in itemWarp.golbal[1]" @click="choiceNum(DataNumIndex, itemWarp.golbal[0] + index)" :key="index+'a'"
              :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][itemWarp.golbal[0] + index]}">{{ itemWarp.golbal[0] + index }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="okbet-wraps knIupw">
      <div class="sc-dRCTWM eGcDGy">
        <i class="iconfont icon-lajixiang hDNuMh" @click="clearUI"></i>
        <span class="sc-hARARD LavIV">{{betCount}}</span>
        <span class="sc-eNPDpu cAdVeW">注</span>
        <div class="sc-hizQCF bvJYXo"></div>
        <span class="sc-eNPDpu cAdVeW">共</span>
        <div class="sc-ccLTTT llQcft">{{betAmt}}</div>
        <span class="sc-eNPDpu cAdVeW">元</span>
        <div class="sc-bdVaJa gLHRUG"></div>
        <div class="sc-jQMNup jSdmXo">
          <input type="tel" min="1" max="50000" class="sc-bNQFlB iuTIgh" placeholder="投注倍数" v-model="betTimes">
        </div>
        <div class="sc-hlILIN hZmkZU">
          <button class="sc-kEmuub hKEGyg" @click="btnConfirmChoiceFun">投注</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Inject } from 'core/decorators';
import cloneDeep from 'lodash/cloneDeep';

@Component
export default class SSCFushiNormal extends Vue {
  /** 彩种组件实例 */
  @Inject() lottery;
  /** 时时彩实例 */
  @Inject() ssc;

  /** 投注倍数 */
  betTimes = '';
  /** 投注数 */
  betCount = 0;

  social = ['万', '千', '百', '十', '个'];

  quickBtns = {}
  codeNumYardArr = {};

  get settings () {
    return this.ssc.settings;
  }

  /** 玩法配置 */
  get config () {
    return this.ssc.config;
  }

  /** 投注金额单位比例 */
  get pattern () {
    return this.lottery.pattern;
  }

  /** 投注金额 */
  get betAmt () {
    return this.$tools.bet.asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  get selLen () {
    return this.social.length;
  }

  get schemeCount () {
    return this.$tools.bet.combinatorics.C(this.social.length, this.config.posLen || this.config.algorithm);
  }

  /** 重置 */
  clearUI () {
    var codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {
      codeNumYardArr[k] = Array(this.config.sub[k].golbal[1]).fill(0);
    }

    this.codeNumYardArr = codeNumYardArr;
    this.betCount = 0;
    this.betTimes = '';
    this.moneyModel = 0;
    this.quickBtns = [];
    this.social = ['万', '千', '百', '十', '个'];
  }

  /** 验证并计算投注 */
  validChioceNum () {
    this.betCount = this.$tools.bet.gameAlgo(this.settings.groupNo).getBetCount(this.config, this.codeNumYardArr.map(el => {
      let temAry = [];

      el.forEach((item, index) => {
        item && temAry.push(index);
      });

      return temAry;
    })) * (this.config.rx ? this.schemeCount : 1);
  }

  socialRandom (num) {
    var socialStr = ['万', '千', '百', '十', '个'];
    var arr = [];
    var json = {};
    while (arr.length < num) {
      // 产生单个随机数
      var ranNum = Math.floor(Math.random() * 5);
      // 通过判断json对象的索引值是否存在 来标记 是否重复
      if (!json[ranNum]) {
        json[ranNum] = 1;
        arr.push(ranNum);
      }
    }

    return arr.sort((a, b) => a - b).map(el => socialStr[el]);
  }

  /** 机选 */
  onRandomClick () {
    this.clearUI();
    this.social = this.socialRandom(this.config.posLen || this.config.algorithm);
    this.codeNumYardArr = this.$tools.bet.gameAlgo(this.settings.groupNo).getRandom(this.config);
    this.validChioceNum();
  }

  /** 快捷投注 */
  quickChoice (index, type) {
    this.$set(this.quickBtns, index, type);

    var len = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0];

    let start = this.config.sub[index].golbal[0];
    let mid = this.config.sub[index].golbal[0] + Math.ceil(this.config.sub[index].golbal[1] / 2);
    let end = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0];

    let codeNumYardArr = [];
    switch (type) {
      case '全':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).fill(1, start, end);
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '大':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).fill(1, mid, end);
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '小':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).fill(1, start, mid);
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '单':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
          if (index < start) {
            return 0;
          }
          return index % 2 ? 1 : 0;
        });

        this.codeNumYardArr = codeNumYardArr;
        break;

      case '双':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);

        codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
          if (index < start) {
            return 0;
          }
          return index % 2 ? 0 : 1;
        });

        this.codeNumYardArr = codeNumYardArr;
        break;

      case '清':
        // this.codeNumYardArr[index] = Array(len).fill(0);break
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0);
        this.codeNumYardArr = codeNumYardArr; break;
    }

    this.validChioceNum();
  }

  /** 选中投注玩法 */
  choiceNum (pos, index) {
    this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
    this.validChioceNum();
  }

  /** 投注 */
  btnConfirmChoiceFun () {
    if (this.betCount == 0) {
      // if (this.betCount == 0 && this.totalBetNumber != 0) {
      //   this.$router.push('/betResult');
      //   return;
      // }
      if (this.lottery.hasBet()) return;
      this.onRandomClick();
      return;
    }

    var betRet = this.$tools.bet.gameAlgo(this.settings.groupNo).getBetResult(this.config, this.codeNumYardArr.map((el) => {
      let temAry = [];

      el.forEach((item, index) => {
        item && temAry.push(index);
      });

      return temAry;
    }), this.social);

    const asmd = this.$tools.bet.asmd;
    if (Array.isArray(betRet)) {
      betRet.map((el, index) => {
        el.betBackRate = null;
        el.betMultiple = this.betTimes;
        // let num=0
        // for(let i in this.codeNumYardArr[index]){
        //   if(this.codeNumYardArr[index][i]==1){num+=1}
        // }
        el.betNumber = el.betNumber;
        // el.betNumber = this.codeNumYardArr[index].length
        el.betAmt = asmd.mul(el.betNumber, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
        el.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), el.betAmt);
        el.gameNo = this.$route.params.gameNo;
        el.groupNo = this.$route.params.gameNo + el.groupNo.toString().slice(4);
        el.gamePattern = this.lottery.gamePattern;
      });
    } else {
      betRet.betAmt = this.betAmt;
      betRet.betBackRate = null;
      betRet.betContent = betRet.betContent;
      betRet.showContent = betRet.showContent;
      betRet.betMultiple = this.betTimes;
      betRet.betNumber = this.betCount;
      // betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, this.pattern), this.betAmt)
      betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), this.betAmt);
      betRet.gameNo = this.$route.params.gameNo;
      betRet.groupNo = this.settings.groupNo;
      betRet.gamePattern = this.lottery.gamePattern;
    }
    // console.log(betRet);
    this.lottery.toBet(betRet);
    this.clearUI();
  }

  created () {
    this.clearUI();
  }
};
</script>
