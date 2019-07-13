<template>
  <div class="gameplay-wraps">
    <component @bet="onGameBet" v-if="configData" :is="configData.component" :settings="settings" :config="configData"></component>
  </div>
</template>
<script>
  import config from '@/assets/data/dataConfig'
  import fushiNormal from '@/components/sscOfficial/fushiNormal/index.vue'
  import danshiNormal from '@/components/sscOfficial/danshiNormal/index.vue'
  import bigAndSmall from '@/components/sscOfficial/bigAndSmall/index.vue'
  import sumValue from '@/components/fastThreeOfficial/sumValue/index.vue' //快3  和值
  import equalNum from '@/components/fastThreeOfficial/equalNum/index.vue' //快3  同号
  import allChoice from '@/components/fastThreeOfficial/allChoice/index.vue' //快3  通选
  import multiple from '@/components/chooseFiveOfficial/multiple/index.vue' // 11选5 复式
  import danTuo from '@/components/chooseFiveOfficial/danTuo/index.vue' // 11选5 胆拖
  import simplex from '@/components/chooseFiveOfficial/simplex/index.vue' // 11选5 单式
  import interest from '@/components/chooseFiveOfficial/interest/index.vue'// 11选5 猜中位
  import guessMiddle from '@/components/chooseFiveOfficial/guessMiddle/index.vue'// 11选5 趣味双
  import bjpk10sum from '@/components/bjpk10/sum.vue'
  import bjpk10fushi from '@/components/bjpk10/fushi.vue'
  export default {
    props: ['settings','changeSetting'],
    components: {
      fushiNormal,
      danshiNormal,
      bigAndSmall,sumValue,equalNum,allChoice,
      multiple,danTuo,simplex,interest,guessMiddle,
      bjpk10sum,bjpk10fushi
    },
    data() {
      return {
        // configData: null
      }
    },
    computed:{
      configData:function(){
        if('groupNo' in this.settings){ //加载的时候有可能 获取不到settings的值
          return config.dataConfigSlot(this.$route.params.gameType, this.settings.groupNo,this.settings.bonusAmt)
        }
      }
    },
    created(){
      // if('groupNo' in this.settings){ //加载的时候有可能 获取不到settings的值
      //   this.configData = config.dataConfigSlot(this.$route.params.gameType, this.settings.groupNo,this.settings.bonusAmt)
      // }
    },
    watch: {
      changeSetting(v){
        // this.configData = config.dataConfigSlot(this.$route.params.gameType, this.settings.groupNo,this.settings.bonusAmt)
      }
    },
    methods: {
      onGameBet: function (obj) {
        
      },
    }
  }

</script>

<style scoped lang="less">
  .gameplay-wraps{
    overflow: auto;
    flex: 1;
    background-color: #fff;
    padding-bottom: 49px;
  }
</style>
