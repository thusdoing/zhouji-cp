<style lang="less" scoped>
.bet-lottery-wrapper {
  width: 100%; height: 100%; position: relative;

  .stop-sell {
    height: 100%; text-align: center; position: absolute; top: 0; left: 0;
    background-color: rgba(255, 255, 255, 0.4); display: flex; align-items: center;
    z-index: 9999;
    img { width: 100%;height: 100%; margin: 0 auto;  }
  }
  &.stop {
    overflow: hidden;
  }
}
</style>

<template>
  <div :class="`bet-lottery-wrapper ${lottery.isGameStopSell && 'stop'}`">
    <template v-if="true">
      <!-- <h1>{{gameType}}|{{$consts.GameType.C_GAME_TYPE_ELEVEN_CHOICE_FIVE}}</h1> -->
      <!-- 时时彩 -->
     
      <BetLotterySSC v-if="gameType == $consts.GameType.C_GAME_TYPE_SSC" />
      <!-- 快三 -->
      <BetLotteryK3 v-else-if="gameType == $consts.GameType.C_GAME_TYPE_KS" />
      <!-- 急速快三 -->
      <BetLotteryK3 v-else-if="gameType == $consts.GameType.C_GAME_TYPE_JS_KS" />
      <!-- 11选5 -->
      <BetLotteryElevenC5 v-else-if="gameType == $consts.GameType.C_GAME_TYPE_ELEVEN_CHOICE_FIVE" />
      <!-- 北京赛车 -->
      <BetLotteryBJSC v-else-if="gameType == $consts.GameType.C_GAME_TYPE_BJSC" />
      <!-- 六合彩 -->
      <BetLotteryLHC v-else-if="gameType == $consts.GameType.C_GAME_TYPE_LHC" />
        <!-- PC蛋蛋 -->
      <BetLotteryEGG v-else-if="gameType == $consts.GameType.C_GAME_TYPE_EGG" />
      <!-- 其余彩种组件 -->     
      <group :gutter="0" v-else>
        <div style="width: 100%; text-align: center; padding: 50px 0;">暂未实现</div>
      </group>       
    <div v-if="lottery.isGameStopSell" class="stop-sell"><img src="~assets/images/stopsp.jpg"/></div>        
    </template>
  </div>
</template>

<script>
import { Component, Vue, Inject } from 'core/decorators';

import BetLotterySSC from './ssc/BetLotterySSC';
import BetLotteryK3 from './k3/BetLotteryK3';
import BetLotteryElevenC5 from './11c5/BetLotteryElevenC5';
import BetLotteryBJSC from './pk10/BetLotteryBJSC';
import BetLotteryLHC from './lhc/BetLotteryLHC';
import BetLotteryEGG from './pcegg/BetLotteryPCEGG';

@Component({
  components: { BetLotterySSC, BetLotteryK3, BetLotteryElevenC5, BetLotteryBJSC, BetLotteryLHC,BetLotteryEGG }
})
export default class BetLotteryWrapper extends Vue {
  /** 游戏 */
  @Inject() lottery;
  key = Date.now();

  get game () { return this.lottery.game; }
  get gameType () { return this.lottery.gameType; }
}
</script>
