<style lang="less" scoped>
.bet-lottery-ssc {
  width: 100%; height: 100%; position: relative;
}
</style>

<template>
  <div class="bet-lottery-ssc">
    <BetLotteryAllCredit v-if="lottery.gamePlayType == $consts.GamePlayType.C_CREDIT"/>
    <div style="width: 100%; height:100%;" v-else-if="config">
      <!-- 大小单双 -->
      <SSCBigAndSmall v-if="'bigAndSmall' == config.component"/>
      <!-- 单式 -->
      <SSCDanshiNormal v-else-if="'danshiNormal' == config.component"/>
      <!-- 复式 -->
      <SSCFushiNormal v-else-if="'fushiNormal' == config.component"/>
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
import SSCBigAndSmall from './official/SSCBigAndSmall';
import SSCDanshiNormal from './official/SSCDanshiNormal';
import SSCFushiNormal from './official/SSCFushiNormal';

@Component({
  components: { BetLotteryAllCredit, SSCBigAndSmall, SSCDanshiNormal, SSCFushiNormal }
})
export default class BetLotterySSC extends Vue {
  /** 彩种 */
  @Inject() lottery;

  /** 时时彩组件实例 */
  @Provide() get ssc () {
    return this;
  }

  /** 玩法配置 */
  config = null;

  /** 第四级玩法 */
  get settings () {
    return this.lottery.gamePlay;
  }

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
