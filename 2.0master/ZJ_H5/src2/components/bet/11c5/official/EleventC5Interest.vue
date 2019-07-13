<style lang="less" scoped>
@import "../elevenC5.less";
.eleventc5-interest { width: 100%; height: 100%;overflow: auto;padding-bottom: 0px;box-sizing: border-box; }
.ball-wrap {
  justify-content: space-around!important;
  .ball {
    width: 90px!important;
  }
}
</style>

<template>
  <div class="eleventc5-interest">
    <div class="play-content playBoxNum">
      <div class="playitd-wrap">
        <p v-html="description"></p>
        <div class="random-wrap" @click="onRandomClick">
          <!-- <img src="/static/fingerTouch@2x.png"> -->
          <i class="iconfont icon-dianji" style="font-size: 22px;"></i>
          <span>机选</span>
        </div>
      </div>

      <div class="interest" v-for="(itemWarp, DataNumIndex) in (this.config.sub || [])" :key="DataNumIndex">
        <div class="boxshow-wrap">
          <p class="pos-show" v-if="itemWarp.unit">{{itemWarp.unit}}</p>
          <div class="box-and-quick">
            <div class="ball-wrap" style="">
              <p class="ball" v-for="(item, index) in groupNoList.length" @click="choiceNum(DataNumIndex, index)" :key="index"
              :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][index]}">{{groupNoList[index].groupName}}</p>
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
import { Vue, Component, Inject, NGetter } from 'core/decorators';

@Component
export default class EleventC5Interest extends Vue {
  @Inject() lottery;
  @Inject() elevenC5;

  @NGetter('GameGroup', 'getGameBonusByGroupNoCache') gameBonuss;

  quickBtns= []
  codeNumYardArr= []
  betCount= 0
  betTimes= ''
  social=[]
  groupNo= ''

  get settings () {
    return this.elevenC5.settings;
  }
  /** 玩法配置 */
  get config () {
    return this.elevenC5.config;
  }

  get pattern () {
    return this.lottery.pattern;
  }

  get groupNoList () {
    return this.gameBonuss[this.settings.groupNo] || [];
  }

  get betAmt () {
    return this.$tools.bet.asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  get description () {
    if (!this.groupNoList.length) return this.config.description;
    const max = Math.max(...this.groupNoList.map(d => d.bonusAmt));
    return this.config.description.replace('---', max);
  }

  clearUI () {
    var codeNumYardArr = [];
    codeNumYardArr[0] = Array(this.groupNoList.length).fill(0);
    this.codeNumYardArr = codeNumYardArr;
    this.betCount = 0;
    this.betTimes = '';
    this.quickBtns = [];
    this.social = [];
  }

  socialRandom (num) {
    var codeNumYardArr = [];
    var arr = [];
    var json = {};
    while (arr.length < num) {
      // 产生单个随机数
      var ranNum = Math.floor(Math.random() * 6);
      // 通过判断json对象的索引值是否存在 来标记 是否重复
      if (!json[ranNum]) {
        json[ranNum] = 1;
        arr.push(ranNum);
      }
    }
    codeNumYardArr[0] = Array(this.groupNoList.length).fill(0);
    codeNumYardArr[0][arr[0]] = 1;
    this.codeNumYardArr = codeNumYardArr;
  }

  validChioceNum () {
    this.betCount = this.$tools.bet.chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
  }

  onRandomClick () { // 机选
    this.clearUI();
    this.social = this.socialRandom(this.config.posLen || this.config.algorithm);
    this.validChioceNum();
  }

  choiceNum (pos, index) {
    this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
    this.validChioceNum();
  }

  btnConfirmChoiceFun () {
    if (this.betCount == 0) {
      // if (this.$store.state.betRets.length != 0) {
      //   this.$router.push('/betResult');
      //   return;
      // }
      if (this.lottery.hasBet()) return;
      this.onRandomClick();
      return;
    }

    const { asmd } = this.$tools.bet;

    let gameArr = [];
    let pattern = this.pattern;
    for (const i in this.codeNumYardArr[0]) {
      if (this.codeNumYardArr[0][i] == 1) {
        var betRet = {};
        betRet.betAmt = this.betAmt/this.betCount;
        betRet.betBackRate = null;
        betRet.betContent = this.groupNoList[i].groupName;
        betRet.showContent = this.config.name + this.groupNoList[i].groupName;
        betRet.betMultiple = this.betTimes;
        betRet.betNumber = 1;
        betRet.bonusAmt = this.groupNoList[i].bonusAmt;
        betRet.groupNo = this.groupNoList[i].groupNo;
        betRet.estimateProfit = asmd.sub(asmd.mul(betRet.bonusAmt, this.betTimes, pattern), betRet.betAmt);
        betRet.gameNo = this.$route.params.gameNo;
        betRet.gamePattern = this.lottery.gamePattern;
        gameArr.push(betRet);
      }
    }
    this.lottery.toBet(gameArr);
    this.clearUI();
  }

  created () {
    this.clearUI();
    this.$apis.GameGroup.getGameBonusByGroupNoCache(this.settings.groupNo);
  }
}
</script>
