<style lang="less" scoped>
.games {
  background: #fff; margin: 0px 0 0;
}
.games-title, .games-title .iconfont {
  font-size: 1.6rem; color: @theme-color; text-align: center; display: inline-block; padding: 0.3rem 0.5rem
}
.games /deep/ .weui-grid__icon {
  width: 4.4rem; height: 4.4rem;
}
.game-groups /deep/ .weui-cells {
  margin-top: 0!important;
}
// .game-groups /deep/ .weui-cells__title {
//   font-size: 1.8rem; margin-top: 0.3rem!important;
// }
</style>

<template>
  <div class="game-groups">
    <group :gutter="0"><load-more tip="加载中" v-if="!gameGroups || !gameGroups.length"/></group>
    <group v-for="g of gameGroups" :key="g.gameType">
      <span slot="title" class="games-title"><i class="iconfont icon-weizhi"></i> {{g.gameTypeName}}</span>
      <grid :cols="3" class="games" :show-lr-borders="false">
        <grid-item v-for="d in g.gameSetting" :key="d.gameNo" :link="`/bet_lottery/${d.gameNo}/${d.groupType=='030001' ? $consts.GamePlayType.OFFICIAL:$consts.GamePlayType.C_CREDIT}`">
                 <!-- <grid-item v-for="d in g.gameSetting" :key="d.gameNo" :link="`/bet_lottery/${d.gameNo}/1`"> -->
          <!-- <wv-badge v-if="ited.gameHot != null" class="main-badge">{{ item.gameHot }}</wv-badge> -->
          <app-img :src="$app.toImagePath(d.imgPath)" :default-src="require('assets/images/loading/lottery.png')" slot="icon" />
          <template slot="label">
            <div class="game-name"> <span>{{d.gameName}}</span> </div>
            <div class="game-num"> <span >{{d.gameNote||'&nbsp;'}}</span> </div>
          </template>
        </grid-item>
      </grid>
    </group>
  </div>
</template>

<script>
import { Component, Vue, NGetter } from 'core/decorators';

@Component
export default class GameGroups extends Vue {
  /** games */
  @NGetter('Game', 'getGameTypeAll') gameGroups;
  xheader = { title: '全部彩种' }
  created () {
    this.$app.setLayout(true, false, this);
    this.$apis.Game.getGameTypeAll();
  }
}
</script>
