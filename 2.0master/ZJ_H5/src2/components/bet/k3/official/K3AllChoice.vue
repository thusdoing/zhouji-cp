<style lang="less" scoped>
@import '../k3.less';
.k3-all-choice { padding-bottom: 50px; box-sizing: border-box;height: 100%;}
</style>
<template>
  <div class="k3-all-choice">
    
    <div class="sc-kTUwUJ jSUaeT">
        <div class="sc-gMcBNU fLCLBP">
            <div class="sc-bwzfXH kMDzjb">
              <div class="sc-iLVFha exmPlI" v-text="rules"></div>
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
      <div v-for="(item,index) in bonusAmtL" :key="index">
        <div class="sc-dqBHgY iijRGP">
          <div class="allChoice" v-for="(_item,_index) in item.golbal" :key="_index">
            <img :src="`${$consts.UIDice[golbalItem]}`" v-for="(golbalItem,golbalIndex) in _item.num" :key="golbalIndex">
          </div>
        </div>
        <div class="kZAgjJ" style="justify-content: center;line-height:normal;" v-if="index!=bonusAmtL.length-1">
          <i class="iconfont icon-jiahao" style="font-size:30px;"></i>
        </div>
      </div>
      <div v-if="bonusAmtL.length>0" style="width: 90%; margin: 0 auto;" :class="[('bJHHta'),{active:betArr[0].indexOf(bonusAmtL[0].btn) != -1}]" v-text="bonusAmtL[0].btn" @click="chioceBet(bonusAmtL[0].btn)"></div>
    </div>
    <div class="sc-hCbubC lcFehD">
      <div class="sc-lnrBVv hlSTFe">
        <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
        <span class="sc-fvLVrH gtqmUF sp2" v-text="allChoiceYard"></span>
        <span class="sc-hvvHee iCQRmZ sp2">注</span>
        <div class="sc-cPuPxo biOJUI"></div>
        <span class="sc-hvvHee iCQRmZ sp2">共</span>
        <div class="sc-eSePXt jFjQYg sp2" v-text="allMoney"></div>
        <span class="sc-hvvHee iCQRmZ sp2">元</span>
        <div class="sc-bwzfXH kMDzjb"></div>
        <div class="sc-jQMNup jSdmXo">
          <input type="tel" min="1" max="50000" class="sc-bNQFlB iuTIgh" placeholder="投注倍数" v-model="betTimes">
        </div>
        <div class="sc-dXfzlN iyQVYu">
          <button class="sc-kAdXeD figbcq" @click="betGame">投注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Inject } from 'core/decorators';

@Component
export default class K3AllChoice extends Vue {
  @Inject() lottery;
  @Inject() k3;

  /** 游戏配置 */
  get config () { return this.k3.config; }
  /** 游戏玩法 */
  get settings () { return this.lottery.gamePlay; }
  /** 投注模式 */
  get betModel () { return this.lottery.betModel; }
  get pattern () { return this.lottery.pattern; }

  /** 总投注金额 */
  get allMoney () {
    return (this.$tools.bet.asmd.mul(this.allChoiceYard, this.config.betInitMoney, this.pattern,this.betTimes)).toFixed(2);
  }
    // 获取规则
  get rules () {
    const { bonusAmt = -1 } = this.lottery.gamePlay || {};
    // console.log(bonusAmt,this.lottery)
    if(bonusAmt)return this.config.rule+" 赔率："+bonusAmt
    return this.config.rule
  }
  bonusAmtL = [];
  betArr = [];
  betTimes=''
  allChoiceYard = 0;

  randomChioceBet () {
    this.betArr[0].push(this.bonusAmtL[0].btn);
    this.validChioceNum();
  }

  chioceBet (btn) {
    const index = this.betArr[0].indexOf(btn);
    if (index == -1) {
      this.betArr[0].push(btn);
    } else {
      this.betArr[0].splice(index, 1);
    }
    this.validChioceNum();
  }

  restBet () {
    this.betArr.forEach(d => d.splice(0));
    this.allChoiceYard = 0;
  }

  betGame () {
    console.log(this.allChoiceYard,this.config.betInitMoney,this.pattern)
    if (this.allChoiceYard == 0) {
      if (this.lottery.hasBet()) return;
      return this.randomChioceBet();
    }
    let gameArr = [];
    let splitArr = this.bonusAmtL[0].btn;
    let obj = {};
    obj.gameNo = this.lottery.gameNo;
    obj.groupNo = this.settings.groupNo;
    obj.betContent = splitArr;
    obj.betNumber = this.allChoiceYard;
    obj.betAmt = this.$tools.bet.asmd.mul(obj.betNumber, this.config.betInitMoney, this.pattern,this.betTimes);
    obj.gamePattern = this.lottery.gamePattern;
    obj.estimateProfit = this.$tools.bet.asmd.sub(this.$tools.bet.asmd.mul(this.settings.bonusAmt, 1, this.pattern,this.betTimes), obj.betAmt); 
    obj.betMultiple = this.betTimes;
    obj.showContent = '[' + this.config.name + ']';
    console.log(11111111111111111)
    gameArr.push(obj);
    // console.log(gameArr, 22);
    this.lottery.toBet(gameArr);
    this.restBet();
  }

  // 是否完成有效投注
  validChioceNum () {
    const Combinatorics = this.$tools.bet.combinatorics;
    // let n = 0; // 传入组合的n值
    // for (let i = 0; i < this.bonusAmtL.length; i++) {
    //   n += this.betArr[i].length;
    // }
    let items = 1; // 总注码数
    this.betArr.forEach((item) => {
      items *= Combinatorics.C(item.length, this.config.algorithm);
    });
    this.allChoiceYard = items;
  }

  created () {
    this.bonusAmtL = this.config.sub;
    this.betArr = this.bonusAmtL.map(d => []);
    this.restBet();
  }
};
</script>
