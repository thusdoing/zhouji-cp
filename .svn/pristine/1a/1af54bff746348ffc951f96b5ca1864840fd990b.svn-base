<template>
  <div class="awardRes">
    <awardRes v-for="(item,index) in gameOpenNoList" :key="index" :zt="zt" v-if="item" :index="index" :dataParams="item"></awardRes>
  </div>
</template>

<script>
  import config from './awardRes.config.js';
  export default {
    props: ['gameOpenNoList','gameType','zt'],
    components: {

    },
    data() {
      return {
        currentView: 'fastThreeRes',
        configData: null
      }
    },
    created() {
        config.dataFun(this.gameType || this.$route.params.gameType).tpl();
    },
    methods: {

    },
    watch: {
      $route(to, from) {
        config.dataFun(this.gameType || this.$route.params.gameType).tpl();
      }
    }
  }

</script>

<style scoped lang="less">
  .awardRes {
    display: flex;
    /deep/.eOdgUV {
      border-radius: 10px;
      font-size: 14px;
      width: 20px;
      height: 20px;
      color: #ffffff;
      background-color: #e8173d;
      line-height: 20px;
      text-align: center;
      margin: auto 1px;
    }
    /deep/.rectangleDiv{
      border-radius: 4px;
      font-size: 14px;
      width: 20px;
      height: 20px;
      color: #ec2829;
      border: 1px solid #e6e6e6;
      background-color: #ffffff;
      line-height: 20px;
      text-align: center;
      margin: auto 1px;
    }
  }

</style>
