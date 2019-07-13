<style lang="less" scoped>
// .open-lottery-notice { border-bottom: 1px solid @border-color; }
.open-lottery-notice /deep/ .weui-cell__hd {
  width: 3.8rem; height: 3.8rem; position: relative; left: -6px;
  img { width: 100%; height: 100%; }
}
.game-number { display: inline-block; margin: 0 1px; }
.case0, .case1, .case2 {
  width: 2rem; line-height: 2rem; text-align: center;
  display: inline-block; margin: 0 1px;
}
.case0 {
  background-position: center center; background-repeat: no-repeat; background-size: 100% 100%;
}
// .case0-1 { background-image: url("~assets/dices/1.png"); }
// .case0-2 { background-image: url("~assets/dices/2.png"); }
// .case0-3 { background-image: url("~assets/dices/3.png"); }
// .case0-4 { background-image: url("~assets/dices/4.png"); }
// .case0-5 { background-image: url("~assets/dices/5.png"); }
// .case0-6 { background-image: url("~assets/dices/6.png"); }

.case1 { background-color: @theme-color; color: #fff; border-radius: 50%; }
.case2 { border-radius: 4px; border: 1px solid @border-color; color: @theme-color; }
.case2-0 { margin: 4px 1px 0; }
.case1-color { border-radius: 2px; }
.case-color-red { background: @theme-color; }
.case-color-blue { background: #2a8fe0; }
.case-color-green { background: #24bf60; }
.game-66 {
   span.case1:last-child {
    // background-color: #5691d7; 
    font-size: 1.4rem;
  }
}
.open-lottery-notice /deep/ .vux-cell-bd.vux-cell-primary p {
  position: relative;
}
.after-title {
  position: absolute; right: 0; top: 0;
  display: inline-flex; text-align: right; font-size: 1.2rem;
}
</style>

<template>
  <div class="open-lottery-notice" >
    <group :gutter="0">
      <cell :border-intent="false" v-for="d of lotterys" :key="d.gameNo + '-' + d.gameNumber" :link="`/open_lottery/${d.gameNo}`" :class="`game-${d.gameType}`">
        <span slot="after-title" class="after-title"><span>{{$tools.dateFormat(d.gameOpenDt, 'MM/DD HH:mm')}}</span></span>
        <app-img slot="icon" :src="$app.toImagePath(d.imgPath)" :default-src="require('assets/images/loading/lottery.png')" />
        <template slot="title"><span >{{d.gameName}}</span> <span style="font-size: 1.3rem">第<span class="game-number">{{d.gameNumber}}</span>期</span></template>
        <template slot="inline-desc">
          <!-- 快三与官彩快三 -->
          <template v-if="$consts.GameType.C_GAME_TYPE_KS == d.gameType || $consts.GameType.C_GAME_TYPE_JS_KS == d.gameType">
            <span :class="`case0 case0-${d1}`" v-for="(d1, index) of d.gameOpenNo" :key="`d1-${index}`" :style="`background-image: url(${$consts.UIDice[d1]})`">&nbsp;</span>
          </template>
          <template v-else-if="$consts.GameType.C_GAME_TYPE_LHC == d.gameType">
            <span :class="`case1 case-color-${balls(d.gameOpenDt)[d1].color}`" v-for="(d1, index) of d.gameOpenNo" :key="`d1-${index}`">{{d1}}</span>
          </template>
          <template v-else>
            <span class="case1" v-for="(d1, index) of d.gameOpenNo" :key="`d1-${index}`">{{d1}}</span>
          </template>

          <template v-if="$consts.GameType.C_GAME_TYPE_LHC == d.gameType">
            <!-- <div style="height: 5px; width: 100%;">&nbsp;</div> -->
            <!-- <span :class="`case1`" v-for="(d2, index) of d.gameOpenNo" v-if="d2" :key="`d2-${index}`">{{balls(d.gameOpenDt)[d2].wuxing}}</span> -->
            <div style="height: 2px; width: 100%;">&nbsp;</div>
            <span :class="`case1 case1-color case-color-${balls(d.gameOpenDt)[d2].color}`" v-for="(d2, index) of d.gameOpenNo" v-if="d2" :key="`d2-${index}`">{{balls(d.gameOpenDt)[d2].zoo}}</span>
          </template>
          <template v-else>
            <!-- 11选5换行，且增加间距-->
            <template v-if="$consts.GameType.C_GAME_TYPE_BJSC == d.gameType"><div style="height: 2px; width: 100%;">&nbsp;</div></template>
            <span :class="`case2 ${$consts.GameType.C_GAME_TYPE_BJSC == d.gameType ? 'case2-0' : ''}`" v-for="(d2, index) of d.gameOpenNoCase" v-if="d2" :key="`d2-${index}`">{{d2}}</span>

          </template>

        </template>
      </cell>
      <load-more v-if="!lotterys.length" tip="加载中..."/>
    </group>
    <divider v-if="lotterys.length">我是有底线的</divider>
  </div>
</template>

<script>
import { Component, Vue, State, NGetter } from 'core/decorators';

@Component
export default class OpenLotteryNotcie extends Vue {
  @State vux;
  /** 所有中奖号码 */
  @NGetter('GameOpenNo', 'getGameLatestOpenNos') _lotterys;

 balls(time) {
    return this.$tools.bet.config.credit.dataConfigSlot(this.$consts.GameType.C_GAME_TYPE_LHC, '6601BALL',time);
  }

  get xheader () {
    return { title: '开奖公告', showBack: false };
  }

  get lotterys () {
    return this._lotterys.map(d => {
      return { ...d, gameOpenNo: d.gameOpenNo.split(',') };
    });
  }

  /** 初始化入口 */
  async created () {
    this.$app.setLayout(true, true, this);
    this.$apis.GameOpenNo.getGameLatestOpenNos();
  }
}
</script>
