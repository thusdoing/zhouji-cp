<style lang="less" scoped>
.bet-lottery-11choice5 {
  width: 100%; position: relative;height: 100%;
}
</style>

<template>
  <div class="bet-lottery-11choice5">
    <BetLotteryAllCredit v-if="lottery.gamePlayType == $consts.GamePlayType.C_CREDIT"/>
    <div style="width: 100%;height: 100%;" v-else-if="config">
      <!--  -->
      <ElevenC5DanTuo v-if="'danTuo' == config.component"/>
      <!-- 猜中位 -->
      <EleventC5GuessMiddle v-else-if="'guessMiddle' == config.component"/>
      <!-- 定单双 -->
      <EleventC5Interest v-else-if="'interest' == config.component"/>
      <!-- 复式 -->
      <EleventC5Multiple v-else-if="'multiple' == config.component"/>
      <!-- 单式 -->
      <EleventC5Simplex v-else-if="'simplex' == config.component"/>

      <!-- 其余玩法组件 -->
      <group :gutter="0" v-else>
        <div style="width: 100%;height: 100%; text-align: center; padding: 50px 0;">暂未实现</div>
      </group>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Inject, Provide } from 'core/decorators';

import BetLotteryAllCredit from '../BetLotteryAllCredit';
import ElevenC5DanTuo from './official/ElevenC5DanTuo';
import EleventC5GuessMiddle from './official/EleventC5GuessMiddle';
import EleventC5Interest from './official/EleventC5Interest';
import EleventC5Multiple from './official/EleventC5Multiple';
import EleventC5Simplex from './official/EleventC5Simplex';

@Component({
  components: { BetLotteryAllCredit, ElevenC5DanTuo, EleventC5GuessMiddle, EleventC5Interest, EleventC5Multiple, EleventC5Simplex }
})
export default class BetLottery11Choice5 extends Vue {
  @Inject() lottery;

  /** 11选5 实例 */
  @Provide() get elevenC5 () {
    return this;
  }

  /** 第四级玩法 */
  get settings () {
    return this.lottery.gamePlay;
  }

  config = null;

  created () {
    const { gameType } = this.lottery;
    if (this.$consts.GamePlayType.C_OFFICIAL == this.lottery.gamePlayType) {
      const { groupNo, bonusAmt } = this.lottery.gamePlay;
      this.config = this.$tools.bet.config.offical.dataConfigSlot(gameType, groupNo, bonusAmt);
      this.config.betInitMoney = this.lottery.betInitMoney;
    } else {
      this.config = this.$tools.bet.config.credit.dataConfigSlot(gameType, this.settings.groupClassNo);
    }
  }
}
</script>
