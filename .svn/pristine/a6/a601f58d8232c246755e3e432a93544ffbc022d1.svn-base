<style lang="less" scoped>
// .open-lottery-notice { border-bottom: 1px solid @border-color; }
.open-lottery-history /deep/ .weui-cell__hd {
  width: 3.8rem; height: 3.8rem; position: relative; left: -6px;
  img { width: 100%; height: 100%; }
}
.game-number { display: inline-block; margin: 0 2px; }
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
.open-lottery-history /deep/ .vux-cell-bd.vux-cell-primary p {
  position: relative;
}
.after-title {
  position: absolute; right: 0; top: 0;
  display: inline-flex; text-align: right; font-size: 1.2rem;
}
</style>

<template>
  <app-scroll :class="`open-lottery-history game-${game.gameType}`"  height="-46"
    :pageInfo="pageInfo" @loadbottom="onPageLoad">
    <group :gutter="0" :border-intent="true">
      <cell v-for="(d, index) of pageInfo.list" :key="d.id + '_' + index"
        :link="{path: `/open_lottery/${game.gameNo}/${d.period}`}">
        <span slot="after-title" class="after-title"><span>{{$tools.dateFormat(d.date, 'YYYY/MM/DD HH:mm')}}</span></span>
        <app-img slot="icon" :src="$app.toImagePath(game.imgPath)" :default-src="require('assets/images/loading/lottery.png')" />
        <template slot="title"><span class="game-number">第{{d.period}}期</span></template>
        <template slot="inline-desc">
          <!-- 快三与官彩快三 -->
          <template v-if="$consts.GameType.C_GAME_TYPE_KS == game.gameType || $consts.GameType.C_GAME_TYPE_JS_KS == game.gameType">
            <span :class="`case0 case0-${d1}`" v-for="(d1, index) of d.result" :key="`d1-${index}`" :style="`background-image: url(${$consts.UIDice[d1]})`">&nbsp;</span>
          </template>
          <template v-else-if="$consts.GameType.C_GAME_TYPE_LHC == game.gameType">
            <span :class="`case1 case-color-${balls(d.gameOpenDt)[d1].color}`" v-for="(d1, index) of d.result" :key="`d1-${index}`">{{d1}}</span>
          </template>
          <template v-else>
            <span class="case1" v-for="(d1, index) of d.result" :key="`d1-${index}`">{{d1}}</span>
          </template>
          <template v-if="$consts.GameType.C_GAME_TYPE_LHC == game.gameType">
            <!-- <div style="height: 5px; width: 100%;">&nbsp;</div> -->
            <!-- <span :class="`case1`" v-for="(d2, index) of d.gameOpenNo" v-if="d2" :key="`d2-${index}`">{{balls(d.gameOpenDt)[d2].wuxing}}</span> -->
            <div style="height: 2px; width: 100%;">&nbsp;</div>
            <span :class="`case1 case1-color case-color-${balls(d.gameOpenDt)[d2].color}`" v-for="(d2, index) of d.result" v-if="d2" :key="`d2-${index}`">{{balls(d.gameOpenDt)[d2].zoo}}</span>
          </template>
          <template v-else>
            <!-- 11选5换行，且增加间距-->
            <template v-if="$consts.GameType.C_GAME_TYPE_BJSC == game.gameType"><div style="height: 2px; width: 100%;">&nbsp;</div></template>
            <span :class="`case2 ${$consts.GameType.C_GAME_TYPE_BJSC == d.gameType ? 'case2-0' : ''}`" v-for="(d2, index) of d.gameOpenNoCase" v-if="d2" :key="`d2-${index}`">{{d2}}</span>
          </template>
        </template>
      </cell>
    </group>
  </app-scroll>
</template>

<script>
import { Component, Vue, State, NGetter } from 'core/decorators';

@Component()
export default class OpenLotteryHistory extends Vue {
  @State vux
  @NGetter('Game', 'getGameTypeAll') gameGroups;
  @NGetter('GameOpenNo', 'getLotteryResultListCache') pageInfos;
  /** 分页数据 */
  // pageInfos = {};
  pageInfo = this.$tools.pageInfo({pageSize: 15});

  balls(time) {
    return this.$tools.bet.config.credit.dataConfigSlot(this.$consts.GameType.C_GAME_TYPE_LHC, '6601BALL',time);
  }

  /** 当前小彩种编号 */
  get gameNo () {
    return this.$route.params && this.$route.params.gameNo;
  }
  /** 当前大彩种 */
  get gameType () {
    return (this.gameNo || '').substr(0, 2);
  }
  /** 当前小彩种 */
  get game () {
    const group = this.gameGroups.find(d => d.gameType == this.gameType) || {};
    const { gameSetting: games = [] } = group;
    return games.find(d => d.gameNo == this.gameNo) || {};
  }
  /** 头部简单设定 */
  get xheader () {
    return { title: this.game.gameName };
  }

  // 分页
  async onPageLoad (page = 1, done) {
    page = this.pageInfo.next(page);
    if (!page) return done && done();
    await this.$apis.GameOpenNo.getLotteryResultListCache(this.gameNo, page, this.pageInfo.pageSize);
    this.pageInfo.addPageInfo(this.pageInfos[this.gameNo]);
    if (done) done();
  }

  async created () {
    // 无效的游戏类型
    if (!this.$consts.isConst(this.$consts.GameType, this.gameType)) return this.$router.back();
    // 拉取彩种配置
    this.$apis.Game.getGameTypeAll();

    // 设定头部
    this.$app.setLayout(true, false, this);
    // 从缓存获取历史数据
    this.pageInfo.addPageInfo(this.pageInfos[this.gameNo]);
    this.pageInfo.truncation(1);
  }

  beforeDestroy () {
    // this.$set(this.pageInfos, this.gameNo, this.pageInfo.truncation(1));
  }
}
</script>
