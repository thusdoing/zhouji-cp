<style lang="less" scoped>
.bet-lottery-k3 {
  width: 100%; height: 100%; position: relative; background: #fff;
}
.vux-popup-dialog {
  padding-top: 46px; z-index: 82;
}
</style>

<template>
  <div class="bet-lottery-k3">
    <BetLotteryAllCredit v-if="lottery.gamePlayType == $consts.GamePlayType.C_CREDIT"/>
    <div style="width: 100%;height: 100%;position: relative;" v-else-if="config">
      <!-- 通选 -->
      <K3AllChoice v-if="'allChoice' == config.component"/>
      <!-- 同值 -->
      <K3EqualNum v-else-if="'equalNum' == config.component"/>
      <!-- 和值 -->
      <K3SameValue v-else-if="'sumValue' == config.component"/>
      <!-- 其余玩法组件 -->
      <group :gutter="0" v-else>
        <div style="width: 100%;height: 100%;position: relative; text-align: center; padding: 50px 0;">暂未实现</div>
      </group>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Inject, Provide } from 'core/decorators';
import BetLotteryAllCredit from '../BetLotteryAllCredit';

import K3AllChoice from './official/K3AllChoice';
import K3EqualNum from './official/K3EqualNum';
import K3SameValue from './official/K3SameValue';

@Component({
  components: { BetLotteryAllCredit, K3AllChoice, K3EqualNum, K3SameValue }
})
export default class BetLotteryK3 extends Vue {
  @Inject() lottery;
  @Provide() get k3 () { return this; }

  /** 配置 */
  config = null;

  /** 第四级玩法 */
  get settings () {
    return this.lottery.gamePlay;
  }

  created () {
    const { gameType } = this.lottery;
    const { groupNo, bonusAmt } = this.lottery.gamePlay;
    if (this.$consts.GamePlayType.C_OFFICIAL == this.lottery.gamePlayType) {
      this.config = this.$tools.bet.config.offical.dataConfigSlot(gameType, groupNo, bonusAmt);
      this.config.betInitMoney = this.lottery.betInitMoney;
    } else {
      this.config = this.$tools.bet.config.credit.dataConfigSlot(gameType, this.settings.groupClassNo);
    }
  }
}
</script>
