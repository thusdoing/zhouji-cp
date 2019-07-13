<style lang="less" scoped>
@import '../pcegg.less';
.pcegg-same-value { padding-bottom: 50px;box-sizing: border-box;height: 100%;}
</style>

<template>
  <div class="pcegg-same-value">
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
      <!--波色控制  -->
    <div class="sc-bdVaJa kZAgjJ" v-if="config.lie==300">  
        <div class="sc-dqBHgY iijRGP">
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr': betArr.indexOf(item) != -1},('ghraAr-003')]" @click="chioceBet(item)" v-for="(item,index) in bonusAmtL" :key="index">
            <div class="sc-btzYZH jGqXUY" v-text="item.num"></div>            
            <div class="pcegg_bose">          
             <span class="pceggball" :class="{'red':sub.color=='red','blue':sub.color=='blue','green':sub.color=='green',}" v-for="(sub, index) in PCbose[index]"     
                                  :key="index+'bose'">{{sub.groupName}}</span>
            </div>  
            <!-- <span v-for='(bose,index01) in config.bose.${item.name}' :key='index01'></span> -->
            <div class="sc-bYSBpT fPcJkT" v-if="bonus && bonus[index]">{{bonus[index].bonusAmt}}</div>
          </div>
        </div>
      </div>
            
      <div class="sc-bdVaJa kZAgjJ" v-else>  
        <div class="sc-dqBHgY iijRGP">
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr': betArr.indexOf(item) != -1},'ghraAr-00'+config.lie]" @click="chioceBet(item)" v-for="(item,index) in bonusAmtL" :key="index">
            <div class="sc-btzYZH jGqXUY" v-text="item.num"></div>            
            <div class="sc-jtRfpW htezMD"></div>
            <div class="sc-bYSBpT fPcJkT" v-if="bonus && bonus[index]">{{bonus[index].bonusAmt}}</div>
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
import { Component, Vue, Inject, NGetter } from 'core/decorators';
import { isNumber } from 'util';

@Component
export default class PCeggSameValue extends Vue {
  @Inject() lottery;
  @Inject() pcegg;

  @NGetter('GameGroup', 'getGameBonusByGroupNoCache') gameBonuss;
  /** 投注内容数组 */
  betArr = [];
  bonusAmtL = [];  
  /** 投注倍数 */
  betTimes = '';
  PCbose=[];
  game_No;
  /** 游戏配置 */
  get config () { return this.pcegg.config; }
  /** 投注模式,圆角分0,1,2 */
  get betModel () { return this.lottery.betModel; }
  /** 投注金额单位比例 */
  get pattern () { return this.lottery.pattern; }
  
  get gamePlay() {
    return this.lottery.gamePlayMap.gamePlay;
  }
  /** 总金额 */
  get allMoney () {
    // return this.$tools.bet.asmd.mul(this.betArr.length, this.config.betInitMoney, this.betModel).toFixed(2);
    return this.$tools.bet.asmd.mul(this.betArr.length, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  /** 利率 */
    get bonus() {
        const { groupNo = -1 } = this.lottery.gamePlay || {};
        console.log(groupNo)
        let m = [];
        if (this.config.name == "豹子"||this.config.name=="猜一码") {
            this.config.sub.golbal.forEach(el=>{
              let _bonuss = this.gamePlay;
              if (_bonuss) m.push(_bonuss);
            })
        } else {
            if (!this.gameBonuss[groupNo]) return null;
            this.gameBonuss[groupNo].forEach(element => {
                m.push(element)
            });
        }
        return m;
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
    const map = { '大': '0', '小': '1', '单': '2', '双': '3','大单':'4','小单':'5','大双':'6','小双':'7','极大':'0','极小':'1','大边':'0','中边':'1','小边':'2','豹子':'0','红波':'0','蓝波':'1','绿波':'2'};
    const asmd = this.$tools.bet.asmd;    
    const bets = this.betArr.map(({ num }) => {
      const betNo=map[num] || num;      
      const groupNo = this.bonus[betNo].groupNo;
      const betContent = num;  
      const showContent = `[${this.config.name}]${num}`;
      const betNumber = 1;
      const betMultiple = this.betTimes;
      const gamePattern = this.lottery.gamePattern;
      // const betAmt = asmd.mul(betNumber, this.config.betInitMoney, this.betModel);
      const betAmt = asmd.mul(betNumber, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
      // const estimateProfit = asmd.sub(asmd.mul(this.bonus[num].bonusAmt, this.betModel), betAmt);
      const estimateProfit = asmd.sub(asmd.mul(this.bonus[betNo].bonusAmt, this.betTimes, this.pattern), betAmt);      
      return { betAmt, gameNo, groupNo, betContent, showContent, betNumber, betMultiple, gamePattern, estimateProfit };
    });
    this.restBet();
    this.lottery.toBet(bets);
  }

  created() {
        this.bonusAmtL = this.config.sub.golbal || [];
        if (this.config.lie == 300) this.PCbose = this.config.bose || [];
        const { groupNo = -1 } = this.lottery.gamePlay || {};
        this.game_No = groupNo.slice(0, 4) || '';
        if (this.config.name == "豹子" || this.config.name=="猜一码") {
            
        } else {
            this.$apis.GameGroup.getGameBonusByGroupNoCache(groupNo);
        }
        this.restBet();
    }
};
</script>
