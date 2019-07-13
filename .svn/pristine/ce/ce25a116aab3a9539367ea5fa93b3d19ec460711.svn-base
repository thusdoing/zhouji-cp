<style lang="less" scoped>
@import '../ssc.less';
.ssc-big-and-small {
  width: 100%; position: absolute;height: 100%;overflow: auto;padding-bottom: 60px;box-sizing: border-box;
}
</style>
<template>
  <div class="ssc-big-and-small">
    <div class="play-content playBoxNum">
      <div class="playitd-wrap">
        <p>{{config.description}}</p>
        <div class="random-wrap" @click="onRandomClick">
          <!-- <img src="/static/fingerTouch@2x.png"> -->
          <i class="iconfont icon-dianji" style="font-size: 22px;"></i>
          <span>机选</span>
        </div>
      </div>

      <div v-for="(itemWarp, DataNumIndex) in (this.config.sub || [])" :key="DataNumIndex">
        <div class="boxshow-wrap">
          <p class="pos-show" v-if="itemWarp.unit">{{itemWarp.unit}}</p>
          <div class="box-and-quick">
            <div class="quick-wrap">
              <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='全'}" @click="quickChoice(DataNumIndex, '全');">全</span>
              <span class="ball-quick" @click="quickChoice(DataNumIndex, '清');">清</span>
            </div>

            <div class="ball-wrap" style="">
              <p class="ball" v-for="(item, index) in itemWarp.golbal" @click="choiceNum(DataNumIndex, index)" :key="index"
              :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][index]}">{{ item.title }}</p>
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
</template>

<script>
import { Vue, Component, Inject } from 'core/decorators';

@Component
export default class SSCBigAndSmall extends Vue {
  /** 彩种组件实例 */
  @Inject() lottery;
  /** 时时彩实例 */
  @Inject() ssc;

  /** 投注倍数 */
  betTimes = '';
  /** 投注数 */
  betCount = 0;

  /** 快捷按钮选中 */
  quickBtns = []
  /** 玩法选中项 */
  codeNumYardArr = [];

  /** 玩法配置 */
  get config () {
    return this.ssc.config;
  }

  /** 第4级玩法 */
  get settings () {
    return this.lottery.gamePlay;
  }

  /** 投注金额单位比例 */
  get pattern () {
    return this.lottery.pattern;
  }

  /** 投注金额 */
  get betAmt () {
    return this.$tools.bet.asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  clearUI () {
    var codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {
      codeNumYardArr[k] = Array(this.config.sub[k].golbal.length).fill(0);
    }

    this.codeNumYardArr = codeNumYardArr;
    this.betCount = 0;
    this.betTimes = '';
    this.moneyModel = 0;
    this.quickBtns = [];
  }

  transDXDS (chr) {
    switch (chr) {
      case '大': return 'a';
      case '小': return 'b';
      case '单': return 'c';
      case '双': return 'd';
      default: return chr;
    }
  }

  /** 机选 */
  onRandomClick () {
    var codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {
      codeNumYardArr[k] = Array(this.config.sub[k].golbal.length).fill(0);
      codeNumYardArr[k][Math.floor(Math.random() * this.config.sub[k].golbal.length)] = 1;
    }

    this.codeNumYardArr = codeNumYardArr;
    this.validChioceNum();
  }

  /** 快捷投注 */
  quickChoice (index, type) {
    this.$set(this.quickBtns, index, type);

    switch (type) {
      case '全':
        this.codeNumYardArr[index] = Array(this.config.sub[index].golbal.length).fill(1); break;

      case '清':
        this.codeNumYardArr[index] = Array(this.config.sub[index].golbal.length).fill(0); break;
    }

    this.validChioceNum();
  }

  /** 选中投注玩法 */
  choiceNum (pos, index) {
    this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
    this.validChioceNum();
  }

  validChioceNum () {
    var retAry = this.codeNumYardArr.map(el => {
      let temAry = [];

      el.forEach((item, index) => {
        item && temAry.push(index);
      });

      return temAry;
    });

    for (let i = 0; i < this.config.sub.length; i++) {
      if (retAry[i].length <= 0) {
        this.betCount = 0;
        return;
      }
    }

    this.betCount = retAry.reduce((x, y) => {
      return x * y.length;
    }, 1);
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

    var codeArr = this.codeNumYardArr.map((el, pos) => {
      return el.map((item, index) => {
        if (item) {
          return this.config.sub[pos].golbal[index].title;
        }

        return '';
      }).filter(el => el);
    });

    let splitArr = ''; // 转换数组 传入后台输出格式
    for (let i = 0; i < codeArr.length; i++) {
      let a = '|';
      if (i == codeArr.length - 1) {
        a = '';
      }
      splitArr += codeArr[i].sort() + a;
    }

    const asmd = this.$tools.bet.asmd;

    var betRet = {};
    betRet.betAmt = this.betAmt;
    betRet.betBackRate = null;
    betRet.betContent = splitArr.split('').map(el => this.transDXDS(el)).join('');
    betRet.showContent = '[' + this.config.name + '] ' + splitArr;
    betRet.betMultiple = this.betTimes;
    betRet.betNumber = this.betCount;
    // betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, this.pattern), this.betAmt)
    betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), this.betAmt);
    betRet.gameNo = this.$route.params.gameNo;
    betRet.groupNo = this.settings.groupNo;
    betRet.gamePattern = this.lottery.gamePattern;

    this.lottery.toBet(betRet);
    this.clearUI();

    // console.log(betRet);
  }

  created () {
    this.clearUI();
  }
};
</script>
