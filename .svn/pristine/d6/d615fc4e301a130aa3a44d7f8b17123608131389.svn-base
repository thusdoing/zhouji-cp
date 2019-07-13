<style lang="less" scoped>
.customer-service{
  width: 100%; height: 100%; border: none; overflow-x: hidden; background-color: #fff;
}
</style>

<template>
  <span>
    <iframe v-if="url" :src="url" class="customer-service" @load="loaded = true" v-show="loaded"/>
    <div class="customer-service" v-if="!url || !loaded"><load-more tip="加载中..."/></div>
  </span>
</template>

<script>
import { Component, Vue, NGetter, Watch } from 'core/decorators';

@Component
export default class CustomerService extends Vue {
  url = '';
  loaded = false;

  @NGetter('WebConfig', 'getHomeConfig') configs;

  @Watch('configs', {immediate: true})
  toWatchConfigs() {
    const d = this.configs.find(d => 'clientCustomService' == d.codeKey);
    if (d && d.codeValue && this.url != d.codeValue) {
      this.loaded = false;
      this.url = d.codeValue;
    }
  }



  created() {
    this.$apis.WebConfig.getHomeConfig();
  }

}
</script>
