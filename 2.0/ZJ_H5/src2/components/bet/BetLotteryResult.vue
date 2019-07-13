<style lang="less" scoped>
.okbet-wraps {
  padding: 10px; font-size: 14px; background-color: rgba(0, 0, 0, 0.78); color: #fff;
  line-height: 40px; position: fixed; width: 95%; bottom: 0;
}
.okbet-wraps > i {
  font-size: 30px; vertical-align: middle;
}
.okbet-wraps .btn-error {
  display: block; width: 80px; line-height: 40px; text-align: center;
  background: @theme-color; color: #ffffff; font-weight: 400; border-radius: 3px;
  border-width: 0; border-color: @theme-color; padding: 0 4px; position: relative; float: right; font-size: 14px;
}
.okbet-wraps .btn-error:focus {
  outline: none;
}
input{
  width: 100px !important
}

button { outline: none!important;}
// .tttsss /deep/ .weui-input{border:1px solid #000}
.tttsss /deep/ a{display: none}
.tttsss /deep/ input{width: 100px !important;margin-right:5px}
</style>

<template>
  <div style="height:100%;overflow: hidden;" class="betView">
    <div style="position:absolute;top:0;bottom:0;left:0;right:0;background-color:#f6f6f6;">
      <div>
        <!-- <p style="padding:5px;text-align:center;font-size:14px;">3423423期 2018-10-10 10:10:10截止</p>   -->
        <div style="background-color:#fff;padding:5px;display:flex;justify-content: space-between;">
          <button style="border:1px solid #e6e6e6;padding:3px 8px;font-size:16px;background-color:#f6f6f6;" @click="$router.back()"> <i class="iconfont icon-jiahao"></i>手动选号 </button>
          <button style="border:1px solid #e6e6e6;padding:3px 8px;font-size:16px;background-color:#f6f6f6;" @click="clearBet"> <i class="iconfont icon-lajixiang"></i>全部清空 </button>
        </div>
      </div>

      <div style="position:absolute;top:40px;left:0;right:0;bottom:157px;padding:10px 0;overflow: auto;">
        <div style="padding:5px;display:flex;background-color:#fff;margin-bottom:10px;word-break: break-all;" v-for="(item, index) in betRets" :key="index">
          <div style="flex:1;border-right:1px solid #e6e6e6;font-size:14px;">
            <p style="font-size:18px;color:#c31332;">{{ item.showContent }}</p>
            <p>{{ item.betNumber }}注 {{ item.betMultiple }}倍 {{ item.betAmt }}元</p>
          </div>
          <div style="width: 60px; text-align: center;" @click="deleteBet(index)">
            <i class="iconfont icon-lajixiang" style="font-size: 32px;"></i>
          </div>
        </div>
      </div>

      <div style="position:absolute;bottom:0;left:0;right:0;background-color:#fff;">
        <div class="tttsss" style="background-color:#fff;margin-bottom: 60px;">
          <group :gutter="0">
            <x-number title="投注倍数" v-model="betTimes" :min="1" fillable></x-number>
            <!-- <x-input title="投注倍数" v-model="betTimes" :min="1" type="number" text-align="center" label-width=17em></x-input> -->
            <x-number title="连续购买期数" v-model="qCount" :min="1" fillable ></x-number>
            <!-- <x-input  title="连续购买期数" v-model="qCount" :min="1" type="number" text-align="center" label-width=17em></x-input> -->
          </group>
          <div style="text-align:center;padding:5px;font-size:14px;">
            <check-icon :value.sync="zjStop">中奖后追号停止</check-icon>
          </div>
        </div>

        <div class="okbet-wraps">
          <label>已选</label>
          <label style="color:yellow;">{{ totalBetNumber }}</label>
          <label>注,</label>
          <label style="color:yellow;">{{betTimes}}</label>
          <label>倍,</label>
          <label style="color:yellow;">{{qCount}}</label>
          <label>期,</label>
          <label>共</label>
          <label style="color:yellow;">{{ totalBetAmt }}</label>
          <label>元</label>
          <Button class="btn-error" @click="onSuperBet">确认投注</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Mutation, State } from 'core/decorators';
import cloneDeep from 'lodash/cloneDeep';

@Component
export default class BetLotteryResult extends Vue {
  qCount = 1
  betTimes = 1
  betCount = 0
  betAmt = 0
  zjStop = false
  once =false

  @State(state => state.bet.bets) betRets;
  @Mutation('bet/clearBets') clearBet;
  @Mutation('bet/delBet') deleteBet;

  get totalBetNumber () {
    return this.betRets.reduce((x, y) => {
      return x + y.betNumber;
    }, 0);
  }

  get totalBetAmtByOneQCount () {
    return this.betRets.reduce((x, y) => {
      return this.$tools.bet.asmd.numAdd(x, y.betAmt);
    }, 0);
  }

  get totalBetAmt () {
    return this.$tools.bet.asmd.mul(this.totalBetAmtByOneQCount, this.betTimes, this.qCount);
  }

  async onSuperBet () {
    if (this.betRets.length == 0) {
      return this.$vux.alert('请选择投注方案！');
    }


    if (this.qCount == 1) {
      let betArr = cloneDeep(this.betRets);
      betArr.forEach((item, index) => {
        item.betAmt = this.$tools.bet.asmd.mul(item.betAmt, this.betTimes);
        item.estimateProfit = this.$tools.bet.asmd.mul(item.estimateProfit, this.betTimes);
        item.betMultiple = this.betTimes;
      });
      this.$vux.loading.show();
      const rsp = await this.$apis.Game.bet(betArr);
      this.$vux.loading.hide();
      if (!rsp.success) {
        if (rsp.message) this.$vux.alert(rsp.message);
        return false;
      }
      this.clearBet();
      return this.toTip();
    }

    if (this.betRets && this.betRets.length > 1) {
      return this.$vux.alert({ title: '提示信息', content: '每次追投只能选择一个投注方案！', skin: 'ios' });
    }

    const gameNo = this.betRets[0].gameNo;
    const size = this.qCount;
    const rsp = await this.$tools.fetch('/gameOpenNo/getGameNextOpenNoList').get({ gameNo, size });
    if (!rsp.success) {
      if (rsp.message) this.$vux.alert(rsp.message);
      return false;
    }

    const asmd = this.$tools.bet.asmd;
    const superaddition = rsp.data.list.map(el => {
      return {
        expectGameNumber: el.gameNumber,
        superadditionBetMultiple: this.betTimes,
        superadditionBetAmt: asmd.mul(this.totalBetAmtByOneQCount, this.betTimes),
        ifStopAfterWin: +this.zjStop,
        ifStopWhenJump: 0
      };
    });

    let betArr = cloneDeep(this.betRets);
    const objArr = [];

    this.$vux.loading.show();
    let count = 0;
    for (let index = 0, item; index < betArr.length; index++) {
      item = betArr[index];
      superaddition.forEach((sitem, index) => { sitem.superadditionBetAmt = this.$tools.bet.asmd.mul(item.betAmt, this.betTimes); });
      objArr.push(JSON.parse(JSON.stringify(superaddition)));
      let betBaseVo = [item];
      const superadditionBetBaseVos = objArr[index];
      await this.$tools.delay(3000);
      const rsp = await this.$apis.Game.superadditionBet(superadditionBetBaseVos, betBaseVo);
      if (!rsp.success) {
        this.$vux.loading.hide();
        if (rsp.message) this.$vux.alert(rsp.message);
        break;
      }
      ++count;
    }
    this.$vux.loading.hide();
    if (betArr.length > count) return;
    return this.toTip();
  }

  async toTip () {
    this.clearBet();
    const title = '提示';
    const content = '投注成功';
    const confirmText = '查看投注';
    const cancelText = '继续投注';
    const skin = 'ios';
    const confirm = await this.$vux.confirm({ title, content, confirmText, cancelText, skin });
    // 取消：继续投注
    if (!confirm) return this.$router.back();
    // 查看投注
    this.$router.push({ path: '/betRecordsview', replace: true });
  }

  created () {
    if (!this.betRets || !this.betRets.length) return this.$router.back();
    this.$app.setLayout('投注方案', false, this);
  }
}
</script>
