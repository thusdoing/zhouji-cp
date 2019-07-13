<template>
  <div class="gameplay-wraps">
    <component @bet="onGameBet" v-if="configData" :is="configData.component" :settings="settings" :lhcObj="lhcObj" :config="configData"></component>
  </div>
</template>
<script>
  import config from '@/assets/data/data.credit.config.js'
  import allCreditPlay from '@/components/sscCreditPlay/index.vue'
  import lhcCurrency from '@/components/lhc/lhcCurrency.vue'
  import lhcZm from '@/components/lhc/zhengma.vue'
  import zheng1_6 from '@/components/lhc/zheng1_6.vue'
  export default {
    props: ['settings','changeSetting','lhcObj'],
    components: {
      allCreditPlay,lhcCurrency,lhcZm,zheng1_6
    },
    data() {
      return {
        configData: null,
      }
    },
    created(){
      if('groupClassNo' in this.settings){ //加载的时候有可能 获取不到settings的值
        this.configData = config.dataConfigSlot(this.$route.params.gameType, this.settings.groupClassNo,this.lhcObj)
      }
    },
    watch: {
      changeSetting(v){
        this.configData = config.dataConfigSlot(this.$route.params.gameType, this.settings.groupClassNo,this.lhcObj)
      }
    },
    methods: {
      onGameBet(obj){

      }
    }
  }

</script>

<style scoped lang="less">
  .gameplay-wraps{
    overflow: auto;
    flex: 1;
    background-color: #fff;
  }
</style>
