<style lang="less" scoped>
.bet-lottery-lhc {
  width: 100%; position: relative;height: 100%;
}
</style>

<template>
  <div class="bet-lottery-lhc">
    <div style="width: 100%; height: 100%;" v-if="config">
      <!-- 组合 -->
      <LHCCurrency v-if="'lhcCurrency' == config.component"/>
      <!-- 组合 -->
      <LHCZheng16 v-else-if="'zheng1_6' == config.component"/>
      <!-- 组合 -->
      <LHCZhengma v-else-if="'lhcZm' == config.component"/>
      <!-- 其余玩法组件 -->
      <group :gutter="0" v-else>
        <div style="width: 100%; text-align: center; line-height: 100px;">暂未实现</div>
      </group>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Inject, Provide } from 'core/decorators';
import LHCCurrency from './credit/LHCCurrency';
import LHCZheng16 from './credit/LHCZheng16';
import LHCZhengma from './credit/LHCZhengma';

@Component({
  components: { LHCCurrency, LHCZheng16, LHCZhengma }
})
export default class BetLotteryLHC extends Vue {

  @Inject() lottery;
  @Provide() get lhc () { return this; }

  config = null;

  get settings() {
    return this.lottery.gamePlay;
  }

  created () {
    if (this.$consts.GamePlayType.C_CREDIT == this.lottery.gamePlayType) {
      this.config = this.$tools.bet.config.credit.dataConfigSlot(this.lottery.gameType, this.settings.groupNo, this.settings,this.lottery.nextOpenGame.openGameDt);
    } else this.config = {};
  }
}
</script>
