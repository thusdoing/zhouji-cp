<style lang="less" scoped>
@import "../elevenC5.less";
.eleventc5-multiple { width: 100%; height: 100%;overflow: auto;padding-bottom: 0px;box-sizing: border-box; }
</style>

<template>
  <div class="eleventc5-multiple">
    <div class="play-content playBoxNum">
      <div class="playitd-wrap">
        <p v-html="config.description"></p>
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
              <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='大'}" @click="quickChoice(DataNumIndex, '大');">大</span>
              <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='小'}" @click="quickChoice(DataNumIndex, '小');">小</span>
              <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='单'}" @click="quickChoice(DataNumIndex, '单');">单</span>
              <span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='双'}" @click="quickChoice(DataNumIndex, '双');">双</span>
              <span class="ball-quick" @click="quickChoice(DataNumIndex, '清');">清</span>
            </div>

            <div class="ball-wrap" style="">
              <p class="ball" v-for="(item, index) in itemWarp.golbal[1]" @click="choiceNum(DataNumIndex, itemWarp.golbal[0] + index)" :key="index"
              :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][itemWarp.golbal[0] + index]}">{{ padStart(itemWarp, index)}}</p>
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
          <input type="tel" min="1" max="50000" class="sc-bNQFlB iuTIgh" placeholder="" v-model="betTimes">
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
import cloneDeep from 'lodash/cloneDeep';

@Component
export default class EleventC5Multiple extends Vue {
  @Inject() lottery;
  @Inject() elevenC5;

  quickBtns = [];
  codeNumYardArr = [];
  betCount = 0;
  betTimes = '';
  social = [];

  /** 投注金额单位比例 */
  get pattern () {
    return this.lottery.pattern;
  }

  /** 玩法配置 */
  get config () {
    return this.elevenC5.config;
  }

  /** 游戏玩法-第4级玩法 */
  get settings () {
    return this.elevenC5.settings;
  }

  /** 总投注金额 */
  get betAmt () {
    return this.$tools.bet.asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  padStart (itemWarp, index) {
    return (itemWarp.golbal[0] + index + 1) < 10 ? ('0' + (itemWarp.golbal[0] + index + 1)) : (itemWarp.golbal[0] + index + 1);
  }

  /** 重置 */
  clearUI () {
    let codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {
      codeNumYardArr[k] = Array(this.config.sub[k].golbal[1]).fill(0);
    }

    this.codeNumYardArr = codeNumYardArr;
    this.betCount = 0;
    this.betTimes = '';
    this.quickBtns = [];
    this.social = [];
  }

  socialRandom (num) {
    let codeNumYardArr = [];

    var arr = [];
    var json = {};
    while (arr.length < num) {
      // 产生单个随机数
      var ranNum = Math.floor(Math.random() * 11);
      // 通过判断json对象的索引值是否存在 来标记 是否重复
      if (!json[ranNum]) {
        json[ranNum] = 1;
        arr.push(ranNum);
      }
    }

    if (this.config.code.toString().slice(4) == '11002222') {
      for (let i = 0; i < this.config.sub.length; i++) { // 组数
        codeNumYardArr[i] = Array(this.config.sub[i].golbal[1]).fill(0);
      }
      let arrcom = Math.floor(Math.random() * 3);
      codeNumYardArr[arrcom][arr[0]] = 1;
      this.codeNumYardArr = codeNumYardArr;
      return;
    }
    let index = 0;
    for (let i = 0; i < this.config.sub.length; i++) { // 组数
      codeNumYardArr[i] = Array(this.config.sub[i].golbal[1]).fill(0);
      for (let j = 0; j < this.config.algorithm; j++) { // 每组几个
        let arrly = arr[index];
        codeNumYardArr[i][arrly] = 1;
        index++;
      }
    }
    this.codeNumYardArr = codeNumYardArr;
  }

  validChioceNum () {
    this.betCount = this.$tools.bet.chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
  }

  /** 机选 */
  onRandomClick () {
    this.clearUI();
    this.social = this.socialRandom(this.config.posLen || this.config.algorithm);
    this.validChioceNum();
  }

  choiceNum (pos, index) {
    this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
    this.validChioceNum();
  }

  // 快速选择号码
  quickChoice (index, type) {
    this.$set(this.quickBtns, index, type);
    var len = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0];// 12
    let start = this.config.sub[index].golbal[0]; // 1
    let mid = this.config.sub[index].golbal[0] + Math.ceil(this.config.sub[index].golbal[1] / 2); // 1+6
    let end = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0];// 11+1

    let codeNumYardArr = [];
    switch (type) {
      case '全':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).fill(1, start, end);// (1,1,12)
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '大':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).fill(1, mid, end);// (1,7,12)
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '小':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).fill(1, start, mid - 1);// (1,1,7)
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '单':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
          if (index < start) {
            return 0;
          }
          return index % 2 ? 0 : 1;
        });
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '双':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);

        codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
          if (index < start) {
            return 0;
          }
          return index % 2 ? 1 : 0;
        });
        this.codeNumYardArr = codeNumYardArr;
        break;

      case '清':
        codeNumYardArr = cloneDeep(this.codeNumYardArr);
        codeNumYardArr[index] = Array(len).fill(0);
        this.codeNumYardArr = codeNumYardArr;
        break;
    }
    this.validChioceNum();
  }

  btnConfirmChoiceFun () {
    if (this.betCount == 0) {
      // if (this.$store.state.betRets.length != 0 && this.betCount == 0) {
      //   this.$router.push('/betResult');
      //   return;
      // }
      if (this.lottery.hasBet()) return;
      this.onRandomClick();
      return;
    }

    // let num = this.config.posLen || this.config.algorithm;
    let arr = '';
    let jBool = false;
    let iBool = false;

    for (let i = 0; i < this.codeNumYardArr.length; i++) {
      let codeArr = this.codeNumYardArr[i];
      if (iBool) {
        arr += '|';
        jBool = false;
      }
      iBool = true;
      for (let j = 0; j < codeArr.length; j++) {
        if (codeArr[j] == 1) {
          if (jBool) { arr += ','; }
          arr += (j + 1) > 9 ? (j + 1) : ('0' + (j + 1));
          jBool = true;
        }
      }
      if (!jBool) {
        arr += '-';
      }
    }

    const { asmd } = this.$tools.bet;

    let gameArr = [];
    let obj = {};
    obj.betContent = arr;
    obj.betMultiple = this.betTimes;
    obj.betNumber = this.betCount;
    obj.betAmt = this.betAmt;
    obj.gameNo = this.$route.params.gameNo;
    obj.groupNo = this.settings.groupNo;
    obj.gamePattern = this.lottery.gamePattern;
    obj.showContent = this.config.name + arr;
    obj.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, 1, this.pattern,this.betTimes), this.betAmt);
    gameArr.push(obj);
    this.lottery.toBet(gameArr);
    this.clearUI();
  }

  created () {
    this.clearUI();
  }
}
</script>
