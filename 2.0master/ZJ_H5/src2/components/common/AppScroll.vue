<style lang="less" scoped>
.app-scroll { position: relative; background-color: #f9f9f9;}
.app-scroll-loading { overflow: hidden; }
.app-scroll-loading /deep/ .xs-container { transform: translateX(0px) translateY(0px) translateZ(0px) scale(1, 1)!important; }
.scroll-mask { position: absolute; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.4); z-index: 991; }
.scroll-loading { position: absolute; top: 15px; width: 30px; height: 30px; border-radius: 50% 50%; background-color: #f9f9f9; z-index: 992; left: 50%; margin-left: -15px; text-align: center; animation: loading 1s linear 0s infinite;}
.scroll-loading /deep/ i { font-size: 20px; color: #c31332; font-weight: 600;}
@keyframes loading{ 0%{transform:rotate(0deg)} 50%{transform:rotate(180deg)} 100%{transform:rotate(360deg)} }
.app-scroll /deep/ .weui-loadmore { margin: 0 auto!important;; line-height: 44px!important; width: 100%!important; background-color: #fff;}
</style>
<style lang="less">

</style>
<template>
  <view-box :body-padding-bottom="0" :class="`app-scroll ${pulldownStatus ? 'app-scroll-loading' : ''}`">
    <template v-if="pulldownStatus">
      <div class="scroll-mask"></div>
      <div class="scroll-loading"><i class="iconfont icon-loading"></i></div>
    </template>
    <scroller ref="scroller" lock-x scrollbar-y :height="height" :bounce="bounce || pulldown" :scroll-bottom-offset="bottomOffset"
      :use-pulldown="pulldown" :pulldown-config="pulldownConfig"
      @on-pulldown-loading="_onPulldownLoading" @on-scroll-bottom="_onScrollBottom" @on-scroll="_onScroll">
      <div class="scroll-content">
        <slot/>
        <load-more v-if="loadStatus" tip="加载中..."/>
        <divider v-if="!loadStatus && page >= pages && pages >= 0"><span>我是有底线的</span></divider>
      </div>
    </scroller>
  </view-box>
</template>

<script>
import Vue from 'vue';
import { Component, State, Prop } from 'core/decorators';
import Scroller from 'vux/src/components/scroller';

const pulldownConfig = { content: '下拉刷新', height: 70, autoRefresh: false, downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '', clsPrefix: 'xs-plugin-pulldown-' };

@Component({ components: { Scroller } })
export default class AppScroll extends Vue {
  @State vux;
  @State layout;
  @Prop({ type: String }) height;
  @Prop({ type: Boolean, default: false }) pulldown
  @Prop({ type: Boolean, default: false }) bounce
  @Prop({ type: Boolean, default: true }) autoLoadBottom;
  @Prop({ type: Number, default: 80 }) bottomOffset
  // @Prop({ type: Number, default: -1 }) pages;
  // @Model('input', { type: Number, default: 1 }) page;

  @Prop({ type: Object, default: () => ({ page: 1, pages: -1 }) }) pageInfo;

  get style () { return {}; }

  get page () { return this.pageInfo.page; }
  get pages () { return this.pageInfo.pages; }

  loadStatus = false;
  pulldownStatus = false;

  get pulldownConfig () { return pulldownConfig; };

  async _onPulldownLoading () {
    if (this.pulldownStatus) return -1;
    this.pulldownStatus = true;
    this.$emit('pulldown', 1, this.donePulldown.bind(this));
    // this.$emit('input', 1);
  }

  async _onScrollBottom () {
    if (this.pages <= 0) return -1;
    if (this.pages >= 0 && this.page >= this.pages) return -1;
    if (this.loadStatus) return -1;
    this.loadStatus = true;
    this.$emit('loadbottom', this.page + 1, this.doneLoadbottom.bind(this));
    // this.$emit('input', this.page + 1);
  }

  _onScroll (position) {
    // this.bounce = position.top >= 100;
    // console.log(position);
  }

  /** 完成底部加载 */
  doneLoadbottom () {
    this.loadStatus = false;
  }

  /** 完成下拉 */
  donePulldown () {
    this.$refs.scroller.donePulldown();
    this.pulldownStatus = false;
  }

  /**
   * 在内容变化(v-for渲染，异步数据加载)后需要调用，用以重新渲染，避免新加的内容无法上拉看到，
   * 一般在 $nextTick 回调里调用。easing 可以为 ease-in, ease-in-out, ease, bezier(n, n, n, n)
   */
  reset (position, duration, easing) {
    this.$refs.scroller.reset(position, duration, easing);
  }

  mounted () {
    if (this.autoLoadBottom) {
      this.loadStatus = true;
      this.$emit('loadbottom', 1, this.doneLoadbottom.bind(this));
    }
  }
}
</script>
