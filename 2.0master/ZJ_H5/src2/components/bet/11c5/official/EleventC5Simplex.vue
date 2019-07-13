<style lang="less" scoped>
@import "../elevenC5.less";
.eleventc5-implex { width: 100%;height: 100%;overflow: auto;padding-bottom: 0px;box-sizing: border-box; }
</style>

<template>
  <div class="eleventc5-implex">
     <div class="play-content playBoxNum">
      <div class="playitd-wrap">
        <p v-html="config.description"></p>
        <!-- <div class="random-wrap" @click="onRandomClick">
          <img src="/static/fingerTouch@2x.png">
          <span>机选</span>
        </div> -->
      </div>
      <div class="textarea-box">
        <textarea ref="textContent" v-model="textContent" placeholder="每一个号码之间用空格( )隔开，每一注之间用逗号(,)或分号(;)隔开。投注号码小于10时，需在号码前方加上0。"></textarea>
        <!-- <textarea v-integer v-model="textContent" placeholder="投注号码小于10时，需在号码前方加上0"></textarea> -->
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
import { Component, Vue, Inject, Watch } from 'core/decorators';

@Component
export default class EleventC5Simplex extends Vue {
  @Inject() lottery;
  @Inject() elevenC5;

  codeNumYardArr = [];
  /** 投注总数 */
  betCount = 0;
  /** 投注倍数 */
  betTimes = '';
  /** 投注文本 */
  textContent = '';
  social = [];

  get config () {
    return this.elevenC5.config;
  }
  get settings () {
    return this.elevenC5.settings;
  }
  get pattern () {
    return this.lottery.pattern;
  }

  get betAmt () {
    return this.$tools.bet.asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  @Watch('textContent')
  toWatchTextContent () {
    let charArray = this.textContent.split(';');
    charArray = this.division(charArray, ',');
    charArray = this.division(charArray, '，');
    charArray = this.division(charArray, '；');

    // 去重
    let json = {};
    let arr = [];
    for (const key in charArray) {
      var ranNum = charArray[key];
      if (!json[ranNum]) {
        json[ranNum] = 1;
        arr.push(ranNum);
      }
    }

    let arrResult = [];
    for (const i in arr) {
      let arrContent = arr[i].split(' ');
      let XBool = false;
      let breakOut = false;
      // out:
      for (let key in arrContent) {
        if (breakOut) break;
        for (let i = key + 1; i < arrContent.length; i++) {
          if (arrContent[key] == arrContent[i]) {
            XBool = false;
            // break out;
            breakOut = false;
            break;
          }
        }
        if (['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].indexOf(arrContent[key]) < 0) {
          XBool = false;
          break;
        } else {
          XBool = true;
        }
      }
      if (XBool && this.config.algorithm == arrContent.length) {
        arrResult.push(arrContent);
      }
    }

    this.social = arrResult;
    this.betCount = this.$tools.bet.chooseFiveAlgo(this.settings.groupNo).getBetCount(arrResult);
  }

  /** 重置 */
  clearUI () {
    var codeNumYardArr = [];
    this.codeNumYardArr = codeNumYardArr;
    this.textContent = '';
    this.betCount = 0;
    this.betTimes = '';
  }

  socialRandom (num) {
    var codeNumYardArr = [];

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
    this.codeNumYardArr = codeNumYardArr;
  }

  /** 验证并获取总投数 */
  validChioceNum () {
    this.betCount = this.$tools.bet.chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
  }

  division (charArray, symbol) {
    for (let index = 0; index < charArray.length; index++) {
      let charArray1 = charArray[index].split(symbol);
      if (charArray1.length > 1) {
        charArray.splice(index, 1);
        for (const key in charArray1) {
          charArray.splice(index + key, 0, charArray1[key]);
        }
      }
    }
    return charArray;
  }

  onRandomClick () {}

  async btnConfirmChoiceFun () { // 投注
    let pattern = this.pattern;

    if (this.betCount == 0) {
      if (!this.textContent.length) {
        await this.$vux.alert('请输入投注号码');
        return this.$refs.textContent.focus();
      }
      await this.$vux.alert('请输入有效的投注号码');
      return this.$refs.textContent.focus();
    }
    let arr = '';
    for (const i in this.social) {
      if (i > 0) { arr += ','; }
      for (const j in this.social[i]) {
        if (j > 0) { arr += ' '; }
        arr += this.social[i][j];
      }
    }

    const { asmd } = this.$tools.bet;

    let gameArr = [];
    let obj = {};
    obj.gameNo = this.lottery.gameNo;
    obj.betMultiple = this.betTimes;
    obj.groupNo = this.settings.groupNo;
    obj.betContent = arr;
    obj.showContent = this.config.name + arr;
    obj.betNumber = this.betCount;
    obj.betAmt = this.betAmt;
    obj.gamePattern = this.lottery.gamePattern;
    obj.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), obj.betAmt);
    gameArr.push(obj);

    this.lottery.toBet(gameArr);
    this.clearUI();
    // console.log(gameArr);
  }

  created() {
    this.clearUI(); 
  }
};
</script>
