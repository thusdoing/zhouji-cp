<style lang="less" scoped>
@import "../elevenC5.less";
.eleventc5-implex { width: 100%; height: 100%;overflow: auto;padding-bottom: 0px;box-sizing: border-box; }
</style>

<template>
  <div class="eleventc5-implex">
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
        <div class="boxshow-wrap danTuo">
          <p class="pos-show" v-if="itemWarp.unit">{{itemWarp.unit}}</p>
          <div class="box-and-quick">
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
import { Component, Vue, Inject } from 'core/decorators';

@Component
export default class EleventC5Simplex extends Vue {
  @Inject() lottery;
  @Inject() elevenC5;

  quickBtns = [];
  codeNumYardArr = [];
  betCount = 0;
  betTimes ='';

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

  padStart (itemWarp, index) {
    return (itemWarp.golbal[0] + index + 1) < 10 ? ('0' + (itemWarp.golbal[0] + index + 1)) : (itemWarp.golbal[0] + index + 1);
  }

  clearUI () {
    var codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {
      codeNumYardArr[k] = Array(this.config.sub[k].golbal[1]).fill(0);
    }

    this.codeNumYardArr = codeNumYardArr;
    this.betCount = 0;
    this.quickBtns = [];
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

    let index = 0;
    for (let i = 0; i < this.config.sub.length; i++) {
      codeNumYardArr[i] = Array(this.config.sub[i].golbal[1]).fill(0);
      let sunNumber = this.config.sub[i];
      for (let j = 0; j < sunNumber.num; j++) {
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

  /**
     * @author maobi@gmail.com
     * @date 2018年9月5日
     * 点击，选中号码
     * @param {number} pos 0：胆码，1：拖码
     * @param {number} index 0-10 11位数字序号
     */
  choiceNum (pos, index) {
    // 0代表是胆码
    if (pos === 0) {
      const danma = this.codeNumYardArr[0];
      danma.forEach((val, i) => {
        // 是当前胆码，不用修改，后面会重新设定
        if (i == index) return true;
        // 只能选一个胆码，上一个胆码取消选中
        if (val === 1) danma[i] = 0;
      });
    }

    // codeNumYardArr 多组号码，每组号码，选中的号码不能重复
    // 任意一组选中的数字，其他组的数字状态都应不选中
    for (let i = 0; i < this.codeNumYardArr.length; i++) {
      if (i != pos) this.codeNumYardArr[i][index] = 0;
    }

    // 使用$set 保证Vue 动态刷新界面，因this.codeNumYardArr[pos] 是引用变量
    this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);

    // 计算中奖注数
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
    }

    const asmd = this.$tools.bet.asmd;

    let gameArr = [];
    let obj = {};
    obj.gameNo = this.lottery.gameNo;
    obj.groupNo = this.settings.groupNo;
    obj.betContent = arr;
    obj.betNumber = this.betCount;
    obj.betAmt = this.betAmt;
    obj.gamePattern = this.lottery.gamePattern;
    obj.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), obj.betAmt);
    obj.betMultiple = this.betTimes;
    obj.showContent = this.config.name + arr;
    gameArr.push(obj);
    this.lottery.toBet(gameArr);
    this.clearUI();
  }

  created () {
    this.clearUI();
  }
};
</script>
