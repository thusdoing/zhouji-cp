<style lang="less" scoped>
.bet-lottery-history {
  transition: all .3s ease-in-out; overflow: hidden; height: 180px;
}
.bet-lottery-history.collapse {
  height: 1px;
}
.container {
  height: 155px; overflow-y: auto; overflow-x: hidden; background-color: #f7f7f7;
}
.line {
  background-color: #fff;
}
.bet-lottery-history /deep/ .vux-flexbox-item {
  text-align: center; line-height: 25px; font-size: 1.3rem;
  //  color: #9b9b9b;
}
.game-number {
  position: relative;
}
.game-number::before {
  content: ' '; border-right: 2px solid @border-color;
  position: absolute; right: 0; top: 0; height: 100%;
}
.game-number::after {
  content: ' '; background: #ccc; height: 6px; width: 6px; border-radius: 50% 50%;
  position: absolute; top: 50%; right: -2px; margin-top: -3px;
}
.game-openno > span {
  color: @theme-color; font-size: 1.3rem;
}
.game-case1 > span, .game-case2 > span, .game-case21 > span {
  display: inline-block; color: @theme-color; font-size: 1.3rem;
  border: 1px solid @border-color;
  border-radius: 4px; line-height: 18px;
  width: 18px; height: 18px; margin: 0 auto;
}
.game-case2 > span {
  background-color: @theme-color; color: #fff; border-color: @theme-color;
}
.game-case21 > span {
  background-color: #5691d7; color: #fff; border-color: #5691d7;
}
.case1 { width: 1.8rem; line-height: 1.8rem; text-align: center; display: inline-block; margin: 1px 2px; background-color: @theme-color; color: #fff; border-radius: 50%; }
.case-color-red { background: @theme-color; }
.case-color-blue { background: #2a8fe0; }
.case-color-green { background: #24bf60; }
.case1-color { border-radius: 2px; }
</style>
<template>
  <group :gutter="0" :class="cssClass">

    <template v-if="$consts.GameType.C_GAME_TYPE_SSC == game.gameType">
      <flexbox :gutter="0">
        <flexbox-item :span="7/22">期次</flexbox-item>
        <flexbox-item :span="7/22">开奖号码</flexbox-item>
        <flexbox-item :span="2/22">和值</flexbox-item>
        <flexbox-item :span="2/22">大小</flexbox-item>
        <flexbox-item :span="2/22">单双</flexbox-item>
        <flexbox-item :span="2/22">龙虎</flexbox-item>
      </flexbox>
      <div class="container" v-if="openedGameHistory && openedGameHistory.length">
        <flexbox :gutter="0" v-for="(d, index) of openedGameHistory" :key="d.gameNumber" :class="`${index % 2 && 'line'}`">
          <flexbox-item class="game-number" :span="7/22"><span>{{d.gameNumber}}</span></flexbox-item>
          <flexbox-item class="game-openno" :span="7/22"><span>{{d.gameOpenNo}}</span></flexbox-item>
          <flexbox-item class="game-case1" :span="2/22"><span>{{d.gameOpenNoCase[0]}}</span></flexbox-item>
          <flexbox-item :class="`game-case2${'小' == d.gameOpenNoCase[1] ? 1 : ''}`" :span="2/22"><span>{{d.gameOpenNoCase[1]}}</span></flexbox-item>
          <flexbox-item :class="`game-case2${'单' == d.gameOpenNoCase[2] ? 1 : ''}`" :span="2/22"><span>{{d.gameOpenNoCase[2]}}</span></flexbox-item>
          <flexbox-item :class="`game-case2${'龙' != d.gameOpenNoCase[3] ? 1 : ''}`" :span="2/22"><span>{{d.gameOpenNoCase[3]}}</span></flexbox-item>
        </flexbox>
      </div>
    </template>

    <template v-else-if="$consts.GameType.C_GAME_TYPE_KS == game.gameType || $consts.GameType.C_GAME_TYPE_JS_KS == game.gameType || $consts.GameType.C_GAME_TYPE_EGG == game.gameType">
      <flexbox :gutter="0">
        <flexbox-item :span="7/20">期次</flexbox-item>
        <flexbox-item :span="7/20">开奖号码</flexbox-item>
        <flexbox-item :span="2/20">和值</flexbox-item>
        <flexbox-item :span="2/20">大小</flexbox-item>
        <flexbox-item :span="2/20">单双</flexbox-item>
      </flexbox>
      <div class="container" v-if="openedGameHistory && openedGameHistory.length">
        <flexbox :gutter="0" v-for="(d, index) of openedGameHistory" :key="d.gameNumber" :class="`${index % 2 && 'line'}`">
          <flexbox-item class="game-number" :span="7/20"><span>{{d.gameNumber}}</span></flexbox-item>
          <flexbox-item class="game-openno" :span="7/20"><span>{{d.gameOpenNo}}</span></flexbox-item>
          <flexbox-item class="game-case1" :span="2/20"><span>{{d.gameOpenNoCase[0]}}</span></flexbox-item>
          <flexbox-item :class="`game-case2${'小' == d.gameOpenNoCase[1] ? 1 : ''}`" :span="2/20"><span>{{d.gameOpenNoCase[1]}}</span></flexbox-item>
          <flexbox-item :class="`game-case2${'单' == d.gameOpenNoCase[2] ? 1 : ''}`" :span="2/20"><span>{{d.gameOpenNoCase[2]}}</span></flexbox-item>
        </flexbox>
      </div>
    </template>

    <template v-else-if="$consts.GameType.C_GAME_TYPE_ELEVEN_CHOICE_FIVE == game.gameType">
      <flexbox :gutter="0">
        <flexbox-item :span="7/18">期次</flexbox-item>
        <flexbox-item :span="7/18">开奖号码</flexbox-item>
        <flexbox-item :span="2/18">和值</flexbox-item>
        <flexbox-item :span="2/18">单双</flexbox-item>
      </flexbox>
      <div class="container" v-if="openedGameHistory && openedGameHistory.length">
        <flexbox :gutter="0" v-for="(d, index) of openedGameHistory" :key="d.gameNumber" :class="`${index % 2 && 'line'}`">
          <flexbox-item class="game-number" :span="7/18"><span>{{d.gameNumber}}</span></flexbox-item>
          <flexbox-item class="game-openno" :span="7/18"><span>{{d.gameOpenNo}}</span></flexbox-item>
          <flexbox-item class="game-case1" :span="2/18"><span>{{d.gameOpenNoCase[0]}}</span></flexbox-item>
          <flexbox-item :class="`game-case2${'单' == d.gameOpenNoCase[2] ? 1 : ''}`" :span="2/18"><span>{{d.gameOpenNoCase[2]}}</span></flexbox-item>
        </flexbox>
      </div>
    </template>

    <template v-else-if="$consts.GameType.C_GAME_TYPE_BJSC == game.gameType">
      <flexbox :gutter="0">
        <flexbox-item :span="2/5">期次</flexbox-item>
        <flexbox-item :span="3/5">开奖号码</flexbox-item>
      </flexbox>
      <div class="container" v-if="openedGameHistory && openedGameHistory.length">
        <flexbox :gutter="0" v-for="(d, index) of openedGameHistory" :key="d.gameNumber" :class="`${index % 2 && 'line'}`">
          <flexbox-item class="game-number" :span="2/5"><span>{{d.gameNumber}}</span></flexbox-item>
          <flexbox-item class="game-openno" :span="3/5"><span>{{d.gameOpenNo}}</span></flexbox-item>
        </flexbox>
      </div>
    </template>

    <template v-else-if="$consts.GameType.C_GAME_TYPE_BJSC == game.gameType">
      <flexbox :gutter="0">
        <flexbox-item :span="2/5">期次</flexbox-item>
        <flexbox-item :span="3/5">开奖号码</flexbox-item>
      </flexbox>
      <div class="container" v-if="openedGameHistory && openedGameHistory.length">
        <flexbox :gutter="0" v-for="(d, index) of openedGameHistory" :key="d.gameNumber" :class="`${index % 2 && 'line'}`">
          <flexbox-item class="game-number" :span="2/5"><span>{{d.gameNumber}}</span></flexbox-item>
          <flexbox-item class="game-openno" :span="3/5"><span>{{d.gameOpenNo}}</span></flexbox-item>
        </flexbox>
      </div>
    </template>

    <template v-else-if="$consts.GameType.C_GAME_TYPE_LHC == game.gameType">
      <flexbox :gutter="0">
        <flexbox-item :span="2/5">期次</flexbox-item>
        <flexbox-item :span="3/5">开奖号码</flexbox-item>
      </flexbox>
      <div class="container" v-if="openedGameHistory && openedGameHistory.length">
        <flexbox :gutter="0" v-for="(d, index) of openedGameHistory" :key="d.gameNumber" :class="`${index % 2 && 'line'}`" style="padding:2px 0">
          <flexbox-item class="game-number" :span="2/5"><div>{{d.gameNumber}}</div></flexbox-item>
          <flexbox-item class="game-openno" :span="3/5">
            <div>
                <!-- <span :class="`case1 case-color-${balls(d.gameOpenDt)[d.gameOpenNo.slice(0, -3)].color}`">{{d.gameOpenNo.slice(0, -3)}}</span> -->
                <span v-for="(d1,index2) in d.gameOpenNo.slice(0, -3).split(',')" :key=index2 :class="`case1 case-color-${balls(d.gameOpenDt)[d1].color}`">{{d1}}</span>
                <span style=" position: relative; top: 10px; display: inline-block; width: 14px; ">
                <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: #888;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1741"><path d="M970.745 459.367 566.614 459.367 566.614 55.251C566.614 25.842 542.771 2 513.361 2c-29.411 0-53.253 23.841-53.253 53.251l0 404.116L55.975 459.367c-29.411 0-53.253 23.841-53.253 53.25 0 29.41 23.842 53.253 53.253 53.253l404.133 0 0 404.115c0 29.407 23.842 53.249 53.253 53.249 29.41 0 53.253-23.842 53.253-53.249L566.614 565.87l404.131 0c29.413 0 53.255-23.843 53.255-53.253C1024 483.208 1000.158 459.367 970.745 459.367z" p-id="1742"></path></svg>
                </span>
                <span :class="`case1 case-color-${balls(d.gameOpenDt)[d.gameOpenNo.slice(-2)].color}`">{{d.gameOpenNo.slice(-2)}}</span>
            </div>
            <div >
                <span v-for="(d1,index2) in d.gameOpenNo.slice(0, -3).split(',')" :key=index2 :class="`case1 case1-color case-color-${balls(d.gameOpenDt)[d1].color}`">{{balls(d.gameOpenDt)[d1].zoo}}</span>
                <span style=" display: inline-block; width: 14px; ">&nbsp;</span>
                <span :class="`case1 case-color-${balls(d.gameOpenDt)[d.gameOpenNo.slice(-2)].color}`">{{balls(d.gameOpenDt)[d.gameOpenNo.slice(-2)].zoo}}</span>
            </div>
            <!-- <span>{{d.gameOpenNo.slice(0, -3)}}</span>
            <span style="color:#5691d7; font-weight: 700;">{{d.gameOpenNo.slice(-2)}}</span> -->
          </flexbox-item>
        </flexbox>
      </div>
    </template>

    <div class="container" v-else style="background: #fff;"><divider style="margin-top: 50px;">暂无实现</divider></div>
    <div class="container" v-if="!openedGameHistory || !openedGameHistory.length" style="background: #fff;"><load-more style="margin-top: 50px;" tip="加载中..." /></div>
  </group>
</template>

<script>
import { Component, Vue, NGetter, Inject, Watch } from 'core/decorators';

@Component
export default class BetLotteryPanelHistory extends Vue {
  /** 所有游戏的开奖的历史记录 */
  @NGetter('GameOpenNo', 'getGameLatestOpenNoListHistorysCache') openedGameHistorys;

  @Inject() lottery;

  collapse = true;

  cssClass = '';

  @Watch('lottery.isShowGamePlayBox', { immediate: true }) watchLotteryIsShowGamePlayBox () {
    if (this.lottery.isShowGamePlayBox && !this.collapse) this.collapse = true;
  }

  @Watch('collapse', { immediate: true }) async watchCollapse () {
    const cssClass = `bet-lottery-history ${this.collapse&& 'collapse'}`;
    if(!this.collapse) { 
      return this.$el.style.display = 'block', await new Promise(resolve => setTimeout(resolve, 0)), this.cssClass = cssClass; 
    }
    this.cssClass = cssClass; 
    await new Promise(resolve => setTimeout(resolve, 300));
    this.$el.style.display = 'none';
  }

  /** 目前游戏 */
  get game () { return this.lottery.game; }
  /** 已开奖的游戏历史记录 */
  get openedGameHistory () { return this.openedGameHistorys[this.game.gameNo]; }

  toggleCollapse () {
    this.collapse = !this.collapse;
    if (!this.collapse) this.$apis.GameOpenNo.getGameLatestOpenNoListHistorysCache(this.game.gameNo);
  }
  getHistory(){
    this.$apis.GameOpenNo.getGameLatestOpenNoListHistorysCache(this.game.gameNo)
  }
   balls(time) {
    return this.$tools.bet.config.credit.dataConfigSlot(this.$consts.GameType.C_GAME_TYPE_LHC, '6601BALL',time);
  }

  

  created () {
    this.$apis.GameOpenNo.getGameLatestOpenNoListHistorysCache(this.game.gameNo);   

  }
};
</script>
