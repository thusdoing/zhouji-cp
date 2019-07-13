<style lang='less' scoped>
@import "./PK10Sum.less";
.pk10-sum {
  width: 100%; height: 100%;
}
</style>

<template>
  <div class="pk10-sum">
    <div class="sc-kTUwUJ jSUaeT">
        <div class="sc-gMcBNU fLCLBP">
            <div class="sc-bwzfXH kMDzjb">
              <div class="sc-iLVFha exmPlI" v-html="config.description"></div>
            </div>
            <div class="sc-dPNhBE lcJMNH">
              <div class="sc-fCPvlr iqoNWh">
                <div>
                  <div class="sc-kkwfeq itwcYr" @click="randomChioceBet">
                    <i class="iconfont icon-dianji jDZdyJ"></i>
                    <span class="sc-cbMPqi hnbdBn">机选</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <div class="sc-bdVaJa kZAgjJ">
        <div class="sc-dqBHgY iijRGP">
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':betArr.indexOf(item) != -1 }]" @click="chioceBet(item)" v-for="(item,index) in bonusAmtL" :key="index">
            <div class="sc-btzYZH jGqXUY" v-text="item.num"></div>
            <div class="sc-jtRfpW htezMD"></div>
            <div class="sc-bYSBpT fPcJkT" v-if="bonus">{{bonus[item.num].bonusAmt}}</div>
          </div>
        </div>
      </div>
      <!-- <div>
        <span class="sc-gxMtzJ iMwtqM">快速选号</span>
        <div class="sc-bdVaJa kZAgjJ">
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==1}]" @click="quickChioceBet('大',1)">
            <div class="sc-btzYZH jGqXUY">大</div>
          </div>
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==2}]" @click="quickChioceBet('小',2)">
            <div class="sc-btzYZH jGqXUY">小</div>
          </div>
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==3}]" @click="quickChioceBet('单',3)">
            <div class="sc-btzYZH jGqXUY">单</div>
          </div>
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==4}]" @click="quickChioceBet('双',4)">
            <div class="sc-btzYZH jGqXUY">双</div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="sc-hCbubC lcFehD">
      <div class="sc-lnrBVv hlSTFe">
        <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
        <span class="sc-fvLVrH gtqmUF sp2" v-text="this.betArr.length"></span>
        <span class="sc-hvvHee iCQRmZ sp2">注</span>
        <div class="sc-cPuPxo biOJUI"></div>
        <span class="sc-hvvHee iCQRmZ sp2">共</span>
        <div class="sc-eSePXt jFjQYg sp2" v-text="allMoney"></div>
        <span class="sc-hvvHee iCQRmZ sp2">元</span>
        <div class="sc-bwzfXH kMDzjb"></div>
        <div class="sc-jQMNup jSdmXo" >
          <input type="tel" min="1" max="50000" class="sc-bNQFlB iuTIgh" placeholder="" v-model="betTimes">
        </div>
        <div class="sc-dXfzlN iyQVYu">
          <button class="sc-kAdXeD figbcq" @click="betGame">投注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Inject, NGetter } from 'core/decorators';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

@Component
export default class PK10Sum extends Vue {
  @Inject() lottery;
  @Inject() pk10;

  @NGetter('GameGroup', 'getGameBonusByGroupNoCache') gameBonuss;

  bonusAmtL = []; // 每个号码对应的 奖金 数组
  betArr = []; // 选择的投注列表
  quickIndex =0; // 快速按钮选中
  /** 投注倍数 */
  betTimes = '';

  get settings () { return this.pk10.settings; }
  get config () { return this.pk10.config; }
  get pattern () { return this.lottery.pattern; }
  get betModel () { return this.lottery.betModel; }
  get allMoney () {
    return this.$tools.bet.asmd.mul(this.betArr.length, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
    // return (this.$tools.bet.asmd.mul(this.betArr.length, this.config.betInitMoney, 1)).toFixed(2);
  }

  /** 利率 */
  get bonus () {
    const { groupNo = -1 } = this.lottery.gamePlay || {};
    if (!this.gameBonuss[groupNo]) return null;
    return this.gameBonuss[groupNo].reduce((m, d) => {
      d.groupName.replace(/和值/g, '').split(',').forEach(k => {
        m[k] = d;
      });
      return m;
    }, {});
  }

  // 选择号码
  chioceBet (item) {
    // this.$set(item, 'active', !item.active);
    // if (item.active) {
    //   this.betArr.push(item);
    // } else {
    //   this.betArr.splice(this.betArr.indexOf(item), 1);
    // }
    const index = this.betArr.indexOf(item);
    if (index == -1) {
      this.betArr.push(item);
    } else {
      this.betArr.splice(index, 1);
    }
  }

  // 快速选号
  quickChioceBet (quick, index) {
    this.quickIndex = index;
    let max = maxBy(this.bonusAmtL, (el) => el.num);
    let min = minBy(this.bonusAmtL, (el) => el.num);
    let middle = Math.ceil(this.$asmd.numDiv(this.$asmd.numAdd(max.num, min.num), 2));
    this.betArr = [];
    this.bonusAmtL.forEach((el) => {
      if (quick == '大') {
        if (el.num >= middle) {
          this.betArr.push(el);
        }
      } else if (quick == '小') {
        if (el.num < middle) {
          this.betArr.push(el);
        }
      } else if (quick == '单') {
        if (el.num % 2 != 0) {
          this.betArr.push(el);
        }
      } else if (quick == '双') {
        if (el.num % 2 == 0) {
          this.betArr.push(el);
        }
      }
    });
  }
  // 机选
  randomChioceBet () {
    this.quickIndex = 0;
    // let max = _.maxBy(this.bonusAmtL,(el)=> el.num);
    // let min = _.minBy(this.bonusAmtL,(el)=> el.num);
    let Random = Number(this.$tools.createRandom(1, 3, 19));
    this.betArr = [];
    this.bonusAmtL.forEach((el) => {
      if (el.num == Random) {
        this.betArr.push(el);
      }
    });
  }
  // 投注
  betGame () {
    if (this.betArr.length == 0) {
      if (this.lottery.hasBet()) return;
      // if(this.$store.state.betRets.length!=0&&this.betArr.length==0){
      //   this.$router.push('/betResult')
      //   return
      // }
      this.randomChioceBet();
      return;
    }
    // if(this.betArr.length<=0){
    //   this.$vux.alert.show({
    //     title: '提示',
    //     content: '请先选择号码',
    //   })
    //   return
    // }
    const asmd = this.$tools.bet.asmd;
    let gameArr = [];
    this.betArr.map((el) => {
      let obj = {};
      obj.gameNo = this.lottery.gameNo;
      obj.groupNo = this.bonus[el.num].groupNo;
      obj.betContent = (() => {
        if (el.num == '大') {
          return 'a';
        } else if (el.num == '小') {
          return 'b';
        } else if (el.num == '单') {
          return 'c';
        } else if (el.num == '双') {
          return 'd';
        } else {
          return el.num;
        }
      })();
      obj.showContent = '[' + this.config.name + ']' + el.num;
      obj.betNumber = 1;
      obj.betMultiple = this.betTimes;
      // obj.betAmt = asmd.mul(obj.betNumber, this.config.betInitMoney, this.betModel);
      obj.betAmt = asmd.mul(obj.betNumber, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
      obj.gamePattern = this.lottery.gamePattern;
      // obj.estimateProfit = asmd.sub(asmd.mul(this.bonus[el.num].bonusAmt, this.betModel), obj.betAmt);
      obj.estimateProfit = asmd.sub(asmd.mul(this.bonus[el.num].bonusAmt, this.betTimes, this.pattern), obj.betAmt);
      gameArr.push(obj);
    });
    this.lottery.toBet(gameArr);
    this.restBet();
  }

  // 投注状态重置
  restBet () {
    this.betArr = [];
  }

  created () {
    this.bonusAmtL = this.config.sub.golbal || [];
    const { groupNo } = this.settings;
    this.$apis.GameGroup.getGameBonusByGroupNoCache(groupNo);
  }
};
</script>
