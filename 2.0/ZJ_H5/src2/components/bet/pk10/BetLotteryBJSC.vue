<style lang="less" scoped>
.bet-lottery-bjsc {
  width: 100%;height: 100%; position: relative; background-color: #fff;
}
</style>

<template>
  <div class="bet-lottery-bjsc">
    <BetLotteryAllCredit v-if="lottery.gamePlayType == $consts.GamePlayType.C_CREDIT"/>
    <div style="width: 100%; height:100%;" v-else-if="config">
      <!-- 复式 -->
      <PK10Fushi v-if="'bjpk10fushi' == config.component"/>
      <!-- 复式 -->
      <PK10Simplex v-else-if="'simplex' == config.component"/>
      <!-- 组合 -->
      <PK10Sum v-else-if="'bjpk10sum' == config.component"/>
      <!-- 其余玩法组件 -->
      <group :gutter="0" v-else>
        <div style="width: 100%; text-align: center; padding: 50px 0;">暂未实现</div>
      </group>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Inject, Provide } from 'core/decorators';

import BetLotteryAllCredit from '../BetLotteryAllCredit';
import PK10Fushi from './official/PK10Fushi';
import PK10Simplex from './official/PK10Simplex';
import PK10Sum from './official/PK10Sum';

@Component({
  components: { BetLotteryAllCredit, PK10Fushi, PK10Simplex, PK10Sum }
})
export default class BetLotteryBJSC extends Vue {
  @Inject() lottery;
  @Provide() get pk10 () { return this; }

  config = null;

  /** 游戏配置 */
  get settings () { return this.lottery.gamePlay; }

  created () {
    const { gameType, gamePlayType } = this.lottery;
    if (this.$consts.GamePlayType.C_OFFICIAL == gamePlayType) {
      this.config = this.$tools.bet.config.offical.dataConfigSlot(gameType, this.settings.groupNo, this.settings.bonusAmt);
      this.config.betInitMoney = this.lottery.betInitMoney;
    } else {
      this.config = this.$tools.bet.config.credit.dataConfigSlot(gameType, this.settings.groupClassNo);
    }
  }
}
</script>
