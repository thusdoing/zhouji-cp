<style lang="less" scoped>
@import '../k3.less';
.k3-same-value { padding-bottom: 50px;box-sizing: border-box;height: 100%;}
</style>

<template>
  <div class="k3-same-value">
    <div class="sc-kTUwUJ jSUaeT">
        <div class="sc-gMcBNU fLCLBP">
            <div class="sc-bwzfXH kMDzjb">
              <div class="sc-iLVFha exmPlI" v-text="config.rule"></div>
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
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr': betArr.indexOf(item) != -1}]" @click="chioceBet(item)" v-for="(item,index) in bonusAmtL" :key="index">
            <div class="sc-btzYZH jGqXUY" v-text="item.num"></div>
            <div class="sc-jtRfpW htezMD"></div>
            <div class="sc-bYSBpT fPcJkT" v-if="bonus && bonus[item.num]">{{bonus[item.num].bonusAmt}}</div>
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
        <span class="sc-hvvHee iCQRmZ">注</span>
        <div class="sc-cPuPxo biOJUI"></div>
        <span class="sc-hvvHee iCQRmZ sp2">共</span>
        <div class="sc-eSePXt jFjQYg sp2" v-text="allMoney"></div>
        <span class="sc-hvvHee iCQRmZ">元</span>
        <div class="sc-bwzfXH kMDzjb"></div>
        <div class="sc-jQMNup jSdmXo">
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
import { Component, Vue, Inject, NGetter } from 'core/decorators';

@Component
export default class K3SameValue extends Vue {
  @Inject() lottery;
  @Inject() k3;

  @NGetter('GameGroup', 'getGameBonusByGroupNoCache') gameBonuss;

  /** 投注内容数组 */
  betArr = [];
  bonusAmtL = [];
  /** 投注倍数 */
  betTimes = '';

  /** 游戏配置 */
  get config () { return this.k3.config; }
  /** 投注模式,圆角分0,1,2 */
  get betModel () { return this.lottery.betModel; }
  /** 投注金额单位比例 */
  get pattern () { return this.lottery.pattern; }

  /** 总金额 */
  get allMoney () {
    // return this.$tools.bet.asmd.mul(this.betArr.length, this.config.betInitMoney, this.betModel).toFixed(2);
    return this.$tools.bet.asmd.mul(this.betArr.length, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
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

  /** 机选 */
  randomChioceBet () {
    const max = (this.bonusAmtL.length || 1) - 1;
    const random = Number(this.$tools.createRandom(1, 0, max));
    this.betArr = [ this.bonusAmtL[random] ];
  }

  chioceBet (number) {
    const index = this.betArr.indexOf(number);
    if (index == -1) {
      this.betArr.push(number);
    } else {
      this.betArr.splice(index, 1);
    }
  }

  restBet () {
    this.betArr = [];
  }

  betGame () {
    if (this.betArr.length == 0) {
      if (this.lottery.hasBet()) return;
      return this.randomChioceBet();
    }
    const { gameNo } = this.lottery;
    // const { groupNo = -1 } = this.lottery.gamePlay || {};
    const map = { '大': 'a', '小': 'b', '单': 'c', '双': 'd' };
    const asmd = this.$tools.bet.asmd;
    const bets = this.betArr.map(({ num }) => {
      const groupNo = this.bonus[num].groupNo;
      const betContent = map[num] || num;
      const showContent = `[${this.config.name}]${num}`;
      const betNumber = 1;
      const betMultiple =this.betTimes;
      const gamePattern = this.lottery.gamePattern;
      // const betAmt = asmd.mul(betNumber, this.config.betInitMoney, this.betModel);
      const betAmt = asmd.mul(betNumber, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
      // const estimateProfit = asmd.sub(asmd.mul(this.bonus[num].bonusAmt, this.betModel), betAmt);
      const estimateProfit = asmd.sub(asmd.mul(this.bonus[num].bonusAmt, this.betTimes, this.pattern), betAmt);
      return { betAmt, gameNo, groupNo, betContent, showContent, betNumber, betMultiple, gamePattern, estimateProfit };
    });
    this.restBet();
    this.lottery.toBet(bets);
  }

  created () {
    this.bonusAmtL = this.config.sub.golbal || [];
    const { groupNo = -1 } = this.lottery.gamePlay || {};
    this.$apis.GameGroup.getGameBonusByGroupNoCache(groupNo);
    this.restBet();
  }
};
</script>
