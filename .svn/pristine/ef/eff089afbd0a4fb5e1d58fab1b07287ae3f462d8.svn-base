<style lang="less" scoped>
  @import url('./lhc-credit.less');
  .lhc-credit {
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
  }

  .lhc-credit .jSUaeT .eCgwLX {
    width: calc((100vw - 20px)/4 - 12px)!important;
    padding: 9px 0!important;
    background-color: #fdfdfd;
  }

  .sc-iLVFha.exmPlI {
    font-size: 1.3rem;
  }

  .lhc-credit .jSUaeT .fPcJkT {
    font-size: 1.4rem;
  }
</style>

<template>
  <div class="lhc-zhengma lhc-credit">

    <div class="sc-kTUwUJ jSUaeT">
      <div class="sc-gMcBNU fLCLBP">
        <div class="sc-bwzfXH kMDzjb">
          <div class="sc-iLVFha exmPlI" v-html="config.rule"></div>
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
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&d.select},d.color]" @click="chioceBet(index,d)"
            v-for="(d,index) in config.ball" :key="index">
            <div class="sc-btzYZH jGqXUY" v-text="d.groupName"></div>
            <div class="sc-jtRfpW htezMD">
            </div>
            <div class="sc-bYSBpT fPcJkT" v-text="d.bonusAmt"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-hCbubC lcFehD">
      <div class="sc-lnrBVv hlSTFe">
        <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
        <span class="sc-fvLVrH gtqmUF sp2" v-text="betNumber"></span>
        <span class="sc-hvvHee iCQRmZ">注</span>
        <div class="sc-cPuPxo biOJUI"></div>
        <span class="sc-hvvHee iCQRmZ">共</span>
        <div class="sc-eSePXt jFjQYg sp2" v-text="betAmt"></div>
        <span class="sc-hvvHee iCQRmZ">元</span>
        <div class="sc-bwzfXH kMDzjb">
          <input class="inputBetAmt" type="number" v-model='inputBetAmt'>
        </div>
        <div class="sc-dXfzlN iyQVYu">
          <button class="sc-kAdXeD figbcq" @click="nextNumber">投注</button>
        </div>
      </div>
    </div>
    <confirm v-model="confirmShow" title="提示" @on-confirm="betGame">
      <p style="text-align:left;color:#666;"> 第
        <span style="color:#ec2829;">{{ nextOpenGame.gameNumber }}</span> 期 </p>

      <template v-if="config.checkbox">
        <p style="text-align:left;color:#666;" v-for="(item,index) in officeArr" :key="index+'betArr'">
          <span v-text="config.gameName+' | '"></span>
          <span style="color:#ec2829;" v-text="item.betContent"></span>
        </p>
      </template>
      <template v-else>
        <p style="text-align:left;color:#666;" v-for="(item,index) in betArr" :key="index+'officeArr'">
          <span v-text="config.gameName+' | '"></span>
          <span style="color:#ec2829;" v-text="item.groupName"></span>
        </p>
      </template>


      <p style="text-align:left;color:#666;">
        <span style="color:#ec2829;" v-text="betNumber"></span>
        注，共
        <span style="color:#ec2829;" v-text="betAmt"></span> 元
      </p>
    </confirm>
  </div>
</template>

<script>
  import { Vue, Component, Inject, NGetter } from "core/decorators";

  @Component
  export default class LHCZhengma extends Vue {
    @NGetter('GameGroup', 'getGameBonusByGroupNoCache') gameBonuss;
    @Inject() lottery;
    @Inject() lhc;

    selectedBallList = []
    inputBetAmt = ''
    confirmShow = false;

    get game() { return this.lottery.game; }
    get config() { return this.lhc.config; }
    get settings() { return this.lottery.gamePlayMap.groupClass; }

    get nextOpenGame() { return this.lottery.nextOpenGame; }

    /** 利率 */
    get bonus() {
      const { groupNo = -1 } = this.lottery.gamePlay || {};
      if (!this.gameBonuss[groupNo]) return null;
      return this.gameBonuss[groupNo];
    }

    get groupNo() {
      // return (!this.bonus.length ? null : this.bonus[0].groupNo) || this.game.gameNo + this.config.groupNo.substr(4);
      return this.game.gameNo + this.config.groupNo.substr(4);
    }

    get betArr() {
      let tempArr = [];
      const gameNo = this.game.gameNo
      const groupNo = this.groupNo;
      const betAmt = this.inputBetAmt
      const betBonus = this.config.bonusAmt
      const betNumber = 1;
      for (let i of this.config.ball) {
        if (i.select) {
          // i.groupNo = this.config.groupNo;
          const betContent = i.groupName;
          tempArr.push({ ...i, gameNo, groupNo, betAmt, betBonus, betNumber, betContent });
        }
      }
      return tempArr
    }

    get betNumber() {
      if (this.config.checkbox) {
        return this.$tools.bet.Combinatorics.C(this.betArr.length, this.config.must)
      } else {
        return this.betArr.length
      }
    }
    get betAmt() {
      if (this.config.checkbox) {
        return this.betNumber * (this.inputBetAmt || 0)
      } else {
        return this.betArr.reduce((a, b) => { return a + (+b.betAmt) }, 0)
      }
    }
    get officeArr() {
      if (this.config.checkbox) {
        let tempObj = {}
        tempObj.betContent = this.betArr.map(el => { return el.groupName })
        tempObj.betContent = tempObj.betContent.join(',')
        tempObj.betAmt = this.betAmt
        tempObj.betNumber = this.betNumber
        tempObj.gameNo = this.game.gameNo
        tempObj.groupNo = this.groupNo
        tempObj.betBonus = this.config.bonusAmt
        return [tempObj]
      } else {
        return []
      }
    }

    chioceBet(index, item) {
      this.$set(item, "select", !item.select);
      if (item.select) {
        if (this.config.max && this.selectedBallList.length >= this.config.max) {
          this.config.ball[this.selectedBallList[0]].select = false;
          this.selectedBallList.shift();
        }
        this.selectedBallList.push(index);
      } else {
        this.selectedBallList.splice(this.selectedBallList.indexOf(index), 1);
      }
    }

    randomChioceBet() {
      this.restBet();
      this.selectedBallList = this.$tools.createRandom(this.config.must, 0, this.config.ball.length);
      this.selectedBallList.forEach(el => {
        this.config.ball[el].select = true;
      });
    }

    async betGame() {
      const data = this.config.checkbox ? this.officeArr : this.betArr
      const rsp = await this.$apis.Game.creditBet(data);
      if (!rsp.success) return rsp.message && this.$vux.alert(rsp.message);
      await this.$vux.alert(rsp.mesage || '投注成功');
      this.restBet();
    }

    restBet() {
      this.config.ball.forEach((el) => { el.select = false; })
      this.selectedBallList = []
    }

    nextNumber() {
      if (this.betNumber == 0) {
        return this.randomChioceBet();
      }
      if (this.betAmt <= 0) {
        return this.$vux.alert('请正确输入投注金额', '提示信息');
      }
      this.confirmShow = true;
    }

    created() {
      this.restBet();
      // const { groupNo = -1 } = this.lottery.gamePlay || {};
      // this.$apis.GameGroup.getGameBonusByGroupNoCache(groupNo); 
    }
  }
</script>