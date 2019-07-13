<style lang="less" scoped>
.app-tabbar {
  display: inline-block;position: absolute; right: 0; bottom: 0; width: 100%; height: 1.493333rem; background-color: #fff; text-align: center;
}
.app-tabbar-border {
  display: inline-block;position: absolute; z-index: 2; left: 0; top: 0; width: 100%; height: .186667rem; background-color: #f0eff4;
}
.iconfont { display: block; }
.app-tabbar {
  .vux-flexbox-item { text-align: center; padding-top: .186667rem; position: relative; }
  .selected::after { content: " "; display: block; width: 1.333333rem; height: 100%; margin: 0 auto;}
  .selected::after { position: absolute; top: 0; left: 0; z-index: 3; background: url("~assets/images/tabar-selected.png") 0 0 no-repeat; background-size: 100% 100%;}
}
</style>

<template functional>
<div class="app-tabbar">
  <span class="app-tabbar-border">&nbsp;</span>
  <flexbox :gutter="0" wrap="wrap">
    <flexbox-item class="selected"> <i class="iconfont icon-shouye"/> <span>首页</span> </flexbox-item>
    <flexbox-item> <i class="iconfont icon-shouye"/> <span>首页</span> </flexbox-item>
    <flexbox-item> <i class="iconfont icon-shouye"/> <span>首页</span> </flexbox-item>
    <flexbox-item> <i class="iconfont icon-shouye"/> <span>首页</span> </flexbox-item>
  </flexbox>
</div>
</template>
