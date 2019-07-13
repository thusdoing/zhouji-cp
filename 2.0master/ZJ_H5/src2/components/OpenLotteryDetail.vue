<style lang="less" scoped>
.cell1 /deep/ .weui-cell__hd {
  width: 3.6rem; height: 3.6rem; position: relative; left: -6px;
  img { width: 100%; height: 100%; }
}
.game-number { display: inline-block; margin: 0 2px; font-size: 1.8rem; }
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
.game-66 {
   span.case1:last-child {
    // background-color: #5691d7; 
    font-size: 1.4rem;
  }
}
.open-lottery-detail /deep/ .vux-cell-bd.vux-cell-primary p {
  position: relative;
}
.after-title {
  position: absolute; right: 0;
  display: inline-flex; text-align: right; font-size: 1.2rem;
}
</style>

<template>
  <div :class="`open-lottery-detail game-${game.gameType}`" v-if="lottery && game">
    <group :gutter="0">
      <cell class="cell1">
        <app-img slot="icon" :src="$app.toImagePath(game.imgPath)" :default-src="require('assets/images/loading/lottery.png')" />
        <template slot="title"><span class="game-number">第{{lottery.period}}期</span></template>
        {{$tools.dateFormat(lottery.date, 'YYYY/MM/DD HH:mm')}}
      </cell>
      <cell primary="title" class="">
        <template slot="title">
         <!-- 快三与官彩快三 -->
          <template v-if="$consts.GameType.C_GAME_TYPE_KS == game.gameType || $consts.GameType.C_GAME_TYPE_JS_KS == game.gameType">
            <span :class="`case0 case0-${d1}`" v-for="(d1, index) of lottery.result" :key="`d1-${index}`" :style="`background-image: url(${$consts.UIDice[d1]})`">&nbsp;</span>
          </template>
          <template v-else>
            <span class="case1" v-for="(d1, index) of lottery.result" :key="`d1-${index}`">{{d1}}</span>
          </template>
        </template>
        <x-button type="warn" mini :link="`/bet_lottery/${game.gameNo}/${$consts.GamePlayType.C_OFFICIAL}`">去投注</x-button>
      </cell>
    </group>
    <group> <x-table>
      <thead style="background-color: #efefef;"> <tr><td style="width: 50%;">奖项</td><td>奖金(元)</td></tr> </thead>
      <tbody> <tr v-for="(d, i) of bounsCache[gameNo] || []" :key="i"> <td>{{d.groupName}}</td><td>{{d.bonusAmt}}</td> </tr> </tbody>
    </x-table>
    <load-more v-if="!bounsCache[gameNo] || bounsCache[gameNo].length == 0" tip="加载中..."/>
    </group>

    <divider v-if="bounsCache[gameNo] && bounsCache[gameNo].length">我是有底线的</divider>
  </div>
</template>

<script>
import { Component, Vue, NGetter, createStorage } from 'core/decorators';

const storage = createStorage('OpenLotteryDetail', [], ['bounsCache']);

@Component({ storage })
export default class OpenLotteryDetail extends Vue {
  bounsCache = {};

  @NGetter('Game', 'getGameTypeAll') gameGroups;
  @NGetter('GameOpenNo', 'getLotteryResultListCache') pageInfos;

  /** 头部简单设定 */
  get xheader () {
    return { title: `${this.game.gameName}开奖详情` };
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
  /** 彩种期数 */
  get gameNumber () {
    return this.$route.params && this.$route.params.gameNumber;
  }
  get lottery () {
    const lotterys = (this.pageInfos[this.gameNo] || {}).list || [];
    return lotterys.find(d => d.period == this.gameNumber);
  }

  async created () {
    if (!this.game || !this.lottery) return this.$router.back();
    this.$app.setLayout(true, false, this);
    const bouns = await this.$apis.GameGroup.getGameBounsByGameNo(this.game.gameNo) || [];
    this.$set(this.bounsCache, this.gameNo, bouns);
  }
}
</script>
