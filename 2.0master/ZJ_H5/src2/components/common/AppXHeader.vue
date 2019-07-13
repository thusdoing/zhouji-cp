<style lang="less" scoped>
.root { font-size: 1.6rem; }
.root i { font-size: 1.8rem; }
</style>
<template>
  <x-header>
    <div slot="overwrite-left" v-if="!xheaderProps.showBack">
      <template v-if="false !== xheader.showRoot">
        <div class="root" @click="$router.push({path: '/', replace: true})"><i slot="icon" class="iconfont icon-shouye"></i> 首页</div>
      </template>
    </div>
    {{xheaderProps.title}}
  </x-header>
</template>

<script>
import { Component, Vue, Prop } from 'core/decorators';

@Component
export default class AppXHeader extends Vue {
  @Prop() context;
  
  get xheader() {
    return (this.context && this.context.xheader) || {};
  }

  get xheaderProps() {
    const {showBack = true, backText = '返回', title = this.$ENV.VUE_APP_NAME} = this.xheader;
    return {showBack, backText, title}; 
  }
} 
</script>