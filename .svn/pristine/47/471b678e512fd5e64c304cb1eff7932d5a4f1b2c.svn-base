<style lang="less" scoped>
@import '../k3.less';
.k3-equal-num { padding-bottom: 50px; box-sizing: border-box;height: 100%;}
</style>
<template>
   <div class="k3-equal-num">
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
          <div :class="[('eqNUm'),{'active':betArr[index].indexOf(_item) != -1}]" @click="chioceBet(_item,index,_index)" v-for="(_item,_index) in item.golbal" :key="_index">
            <img :src="`${$consts.UIDice[golbalItem]}`" v-for="(golbalItem,golbalIndex) in _item.num" :key="golbalIndex">
          </div>
        </div>
        <div class="kZAgjJ" style="justify-content: center;line-height:normal;" v-if="index!=bonusAmtL.length-1">
          <i class="iconfont icon-jiahao" style="font-size:30px; color: #eee;"></i>
        </div>
      </div>
    </div>
    <div class="sc-hCbubC lcFehD">
      <div class="sc-lnrBVv hlSTFe">
        <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
        <span class="sc-fvLVrH gtqmUF sp2" v-text="allChoiceYard"></span>
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
import { Component, Vue, Inject } from 'core/decorators';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

@Component
export default class K3EqualNum extends Vue {
  @Inject() lottery;
  @Inject() k3;

  /** 投注内容数组 */
  betArr = [];
  /** 总投数 */
  allChoiceYard = 0;
  /** 投注玩法 */
  bonusAmtL = [];
  betTimes=''
  /** 游戏配置 */
  get config () { return this.k3.config; }
  /** 游戏玩法 */
  get settings () { return this.lottery.gamePlay; }

  /** 投注模式 */
  get betModel () { return this.lottery.betModel; }
  get pattern () { return this.lottery.pattern; }

  /** 总金额 */
  get allMoney () {
    return this.$tools.bet.asmd.mul(this.allChoiceYard,(this.config.betInitMoney||1),this.pattern,this.betTimes).toFixed(2);
  }

  /** 机选 */
  randomChioceBet () {
    const max = maxBy(this.bonusAmtL[0].golbal, d => d.num);
    const min = minBy(this.bonusAmtL[0].golbal, d => d.num);
    let Random = this.$tools.createRandom(this.config.randomCount, +min.num.toString().slice(-1), +max.num.toString().slice(-1) + 1);
    this.restBet();
    Random.forEach((Rm, Rmindex) => {
      if (this.bonusAmtL.length <= 1) {
        this.betArr[0].push(this.bonusAmtL[0].golbal[Rm - 1]);
      } else {
        this.betArr[Rmindex].push(this.bonusAmtL[Rmindex].golbal[Rm - 1]);
      }
    });
    this.validChioceNum();
  }
  // 获取规则
  get rules () {
    const { bonusAmt = -1 } = this.lottery.gamePlay || {};
    console.log(bonusAmt,this.lottery)
    if(bonusAmt)return this.config.rule+" 赔率："+bonusAmt
    return this.config.rule
  }
  /** 手动选择 */
  chioceBet(item, bonusAmtLIndex) {
    const index = this.betArr[bonusAmtLIndex].indexOf(item);
    if (index == -1) {
      this.betArr[bonusAmtLIndex].push(item);
      this.betArr.map((el, eli) => {
        if (eli != bonusAmtLIndex) {
          el.map((sub, subi) => {
            if(sub.num.toString().slice(-1) == item.num.toString().slice(-1)){
              this.betArr[eli].splice(subi,1)
            }
          })
        }
      })

    } else {
      this.betArr[bonusAmtLIndex].splice(index, 1);
    }
    this.validChioceNum();
  }

  // 是否完成有效投注
  validChioceNum () {
    const Combinatorics = this.$tools.bet.combinatorics;
    let n = 0; // 传入组合的n值
    for (let i = 0; i < this.bonusAmtL.length; i++) {
      n += this.betArr[i].length;
    }
    let items = 1; // 总注码数
    this.betArr.forEach((item) => {
      items *= Combinatorics.C(item.length, this.config.algorithm);
    });
    if (Combinatorics.C(n, this.config.algorithm) > 0 && items > 0) {
      this.allChoiceYard = items;
    } else {
      this.allChoiceYard = 0;
    }
  }

  restBet () {
    this.betArr.forEach(d => d.splice(0));
    this.allChoiceYard = 0;
  }

  betGame () {
    console.log(this.allChoiceYard,(this.config.betInitMoney||1),this.pattern,this.betTimes)
    if (this.allChoiceYard == 0) {
      if (this.lottery.hasBet()) return;
      return this.randomChioceBet();
    }

    if (this.allChoiceYard) {
      const gameArr = [];
      let splitArr = '';
      if (this.betArr.length > 1) {
        this.betArr.forEach((item, index) => {
          item.forEach((_item, _index) => {
            let a = ',';
            if (_index == item.length - 1) {
              a = '|';
            }
            if (index == this.betArr.length - 1 && _index == item.length - 1) {
              a = '';
            }
            splitArr += _item.num.join('') + a;
          });
        });
      } else {
        this.betArr[0].forEach((item, index) => {
          let a = '|';
          if (index == this.betArr[0].length - 1) {
            a = '';
          }
          splitArr += item.num.join('') + a;
        });
      }
      this.$asmd = this.$tools.bet.asmd;
      let obj = {};
      obj.gameNo = this.lottery.gameNo;
      obj.groupNo = this.settings.groupNo;
      obj.betContent = splitArr;
      obj.betNumber = this.allChoiceYard;
      obj.betAmt = this.$asmd.mul(obj.betNumber, this.config.betInitMoney, this.pattern,this.betTimes);
      obj.gamePattern = this.lottery.gamePattern;
      obj.estimateProfit = this.$asmd.sub(this.$asmd.mul(this.settings.bonusAmt, 1, this.pattern,this.betTimes), obj.betAmt);
      obj.betMultiple = this.betTimes;

      obj.showContent = ` [${this.settings.groupName}] ${obj.betContent}`;
      gameArr.push(obj);
      this.lottery.toBet(gameArr);
      this.restBet();
    }
  }

  created () {
    this.bonusAmtL = this.config.sub || [];
    this.betArr = this.bonusAmtL.map(d => []);
    this.restBet();
    console.log(this.bonus)
  }
};
</script>
