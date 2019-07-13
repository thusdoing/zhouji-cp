<style lang="less" scoped>
@import url('./lhc-credit.less');
.lhc-credit { 
  background-color: #fff;height: 100%;box-sizing: border-box;
  .title2 {
    font-size: 1.5rem; margin: 0 0 10px 10px; border-left: 2px solid @theme-color; padding-left: 10px;
  } 
  .sc-iLVFha.exmPlI {
    font-size: 1.3rem;
  }
  .sc-cmTdod.eCgwLX {
    background-color: #fdfdfd;
  }
  .sc-btzYZH.jGqXUY {
    font-size: 1.6rem; line-height: 30px; color: @theme-color;
  }
  .sc-bYSBpT.fPcJkT {
    font-size: 1.3rem;
  }
  .sc-dqBHgY.iijRGP {
    padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid @border-color;
  }
}
</style>
<template>
  <div class="lhc-zheng16 lhc-credit">
    
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
            <div class="sc-bdVaJa kZAgjJ" style="flex-flow: column">
                <div class="title2">正码一</div>
                <div class="sc-dqBHgY iijRGP">
                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" v-if="index<13" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
                    </div>
                </div>

                <div class="title2">正码二</div>
                <div class="sc-dqBHgY iijRGP">
                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" v-if="index>=13&&index<26" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
                    </div>
                </div>

                <div class="title2">正码三</div>
                <div class="sc-dqBHgY iijRGP">
                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" v-if="index>=26&&index<39" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
                    </div>
                </div>

                <div class="title2">正码四</div>
                <div class="sc-dqBHgY iijRGP">
                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" v-if="index>=39&&index<52" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
                    </div>
                </div>

                <div class="title2">正码五</div>
                <div class="sc-dqBHgY iijRGP">
                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" v-if="index>=52&&index<65" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
                    </div>
                </div>

                <div class="title2">正码六</div>
                <div class="sc-dqBHgY iijRGP">
                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" v-if="index>=65&&index<78" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
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
            <p style="text-align:left;color:#666;">
                第
                <span style="color:#ec2829;">{{ nextOpenGame && nextOpenGame.gameNumber }}</span> 期
            </p>

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
                <span style="color:#ec2829;" v-text="betAmt"></span>
                元
            </p>
        </confirm>
  </div>
</template>
<script>
import { Component, Vue, Inject, Watch, NGetter } from "core/decorators";
import { cloneDeep } from 'lodash';

@Component
export default class LHCZheng16 extends Vue {
  @NGetter("GameGroup", "getGameBonusByGroupNoCache") gameBonuss;
  @Inject() lottery;
  @Inject() lhc;

  lhcBall = []; //每个号码对应的 奖金 数组
  // betArr:[], //选择的投注列表
  quickIndex = 0; //快速按钮选中
  selectedBallList = [];
  inputBetAmt = '';
  gameNumber = "";
  confirmShow = false;

  get game() {
    return this.lottery.game;
  }
  get config() {
    return this.lhc.config;
  }
  get settings() {
    return this.lhc.settings;
  }

  get nextOpenGame() {
    return this.lottery.nextOpenGame;
  }

  /** 10位的第四级玩法 */
  get groupNo() {
    // return (!this.bonus.length ? null : this.bonus[0].groupNo) || this.game.gameNo + this.config.groupNo.substr(4);
    return this.settings.groupNo.substr(0, 10);
  }

  get betArr() {
    let tempArr = [];
    // for (let i of this.lhcBall) {
    //   if (i.select) {
    //     i.gameNo = this.$route.params.gameNo;
    //     i.betAmt = this.inputBetAmt;
    //     i.betBonus = this.lhcObj.bonusAmt;
    //     tempArr.push(i);
    //   }
    // }
    // return tempArr;
    // const gameNo = this.game.gameNo
    // const groupNo = this.groupNo;
    const betAmt = this.inputBetAmt;
    const betBonus = this.config.bonusAmt;
    const betNumber = 1;
    for (let i of this.lhcBall) {
      if (i.select) {
        // i.groupNo = this.config.groupNo;
        // const betContent = i.groupName;
        tempArr.push({ ...i, betAmt, betBonus, betNumber });
      }
    }
    return tempArr;
  }

  get betNumber() {
    if (this.config.checkbox) {
      return this.$tools.bet.Combinatorics.C( this.betArr.length, this.config.must );
    } else {
      return this.betArr.length;
    }
  }

  get betAmt() {
    if (this.config.checkbox) {
      return this.betNumber * (this.inputBetAmt || 0);
    } else {
      return this.betArr.reduce((a, b) => {
        return a + (+b.betAmt);
      }, 0);
    }
  }

  get officeArr() {
    if (this.config.checkbox) {
      let tempObj = {};
      tempObj.betContent = this.betArr.map(el => {
        return el.groupName;
      });
      tempObj.betContent = tempObj.betContent.join(",");
      tempObj.betAmt = this.betAmt;
      tempObj.betNumber = this.betNumber;
      tempObj.gameNo = this.game.gameNo;
      tempObj.groupNo = this.groupNo;
      tempObj.betBonus = this.config.bonusAmt;
      return [tempObj];
    } else {
      return [];
    }
  }

  @Watch('gameBonuss') 
  toWatchGameBonuss() {
    this.lhcBall = cloneDeep(this.gameBonuss[this.groupNo]).map(el => {
      el.select = false;
      el.betAmt = "";
      return el;
    });;
  }

  @Watch("inputBetAmt")
  toWatchInputBetAmt() {
    this.lhcBall = this.lhcBall.map(el => {
      if (el.select) {
        el.betAmt = this.inputBetAmt;
      }
      return el;
    });
  }

  //选择号码
  chioceBet(index, item) {
    this.$set(item, "select", !item.select);
    if (item.select) {
      if (this.config.max && this.selectedBallList.length >= this.config.max) {
        this.lhcBall[this.selectedBallList[0]].select = false;
        this.selectedBallList.shift();
      }
      this.selectedBallList.push(index);
    } else {
      this.selectedBallList.splice(this.selectedBallList.indexOf(index), 1);
    }
  }

  //机选
  randomChioceBet() {
    this.restBet();
    this.selectedBallList = this.$tools.createRandom(this.config.must, 0, this.lhcBall.length );
    this.selectedBallList.forEach(el => {
      this.lhcBall[el].select = true;
    });
    this.lhcBall = this.lhcBall.map(el => {
      return el;
    });
  }
  

  async betGame() {
    const data = this.config.checkbox ? this.officeArr : this.betArr;
    const rsp = await this.$apis.Game.creditBet(data);
    if (!rsp.success) return rsp.message && this.$vux.alert(rsp.message);
    await this.$vux.alert(rsp.mesage || "投注成功");
    this.restBet();
  }

  // //根据游戏编号查询游戏奖金
  // async getGameBonusByGroupNo() {
  //   this.bonusAmt = [];
  //   const rsp = await this.$tools
  //     .fetch("/gameGroup/getGameBonusByGroupNo")
  //     .get({ groupNo: this.settings.groupNo.substr(0, 10) });
  //   if (rsp.success) {
  //     this.lhcBall = rsp.data.list.map(el => {
  //       el.select = false;
  //       el.betAmt = "";
  //       return el;
  //     });
  //   }
  // }

  //投注状态重置
  restBet() {
    this.lhcBall.forEach(el => { el.select = false; });
    this.selectedBallList = [];
  }

  nextNumber() {
    if (this.betNumber == 0) {
      return this.randomChioceBet();
    }
    if (this.betAmt <= 0) {
      return this.$vux.alert("请正确输入投注金额", "提示信息");
    }
    this.confirmShow = true;
  }

  created() {
    this.restBet();
    this.$apis.GameGroup.getGameBonusByGroupNoCache(this.groupNo);
    // this.getGameBonusByGroupNo();
  }
}
</script>
