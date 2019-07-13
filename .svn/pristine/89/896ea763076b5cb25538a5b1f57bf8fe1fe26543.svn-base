<style lang="less" scoped>
.bet-lottery-xheader { position: relative; z-index: 88;}
.title { line-height: 18px; position: relative; }
.game-name { font-size: 1.6rem; line-height: 20px; position: relative; display: inline-block; padding-right: 20px;}
.game-name .icon-arrow { width: 8px; height: 8px; border-color: #fff; margin-top: -8px;}
.game-name .icon-arrow-up { margin-top: 0px;}
.game-play { font-size: 1.4rem; line-height: 20px; }

.bet-lottery-xheader /deep/ .vux-header-title { position: relative; }
.home { font-size: 1.6rem; }
.home i { font-size: 1.8rem; }
</style>

<template functional>
  <div class="bet-lottery-xheader">
    <x-header :right-options="{showMore: true }" @on-click-more="data.attrs.context.onMore()">
      <div class="home" slot="overwrite-left" @click="data.attrs.context.$router.push({path: '/', replace: true})"><i slot="icon" class="iconfont icon-shouye"></i> 首页</div>
      <span v-if="data.attrs.context.isGameStopSell">{{data.attrs.context.game.gameName}}</span>
      <div v-else-if="data.attrs.context.gamePlayName" class="title" @click="data.attrs.context.onShowToggleGamePlayBox()">
        <span class="game-name">{{data.attrs.context.gamePlayName}} <i v-if="data.attrs.context.gamePlay" :class="`icon-arrow icon-arrow-${data.attrs.context.isShowGamePlayBox ? 'up' : 'down'}`"></i></span>
        <div class="game-play">{{data.attrs.context.game.gameName}}</div>
      </div>
      <span v-else>{{data.attrs.context.game.gameName}}</span>
    </x-header>
  </div>
</template>
