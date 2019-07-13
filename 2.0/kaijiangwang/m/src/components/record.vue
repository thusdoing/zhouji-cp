<template>
  <div>
    <recordHeader></recordHeader>
    <lotteryHeaderK3 style="margin-top:1.3rem;" />
    <!-- <lotteryHeaderSsc  v-if="gameNo=='11'"/>
    <lotteryHeaderLhc  v-if="gameNo=='66'"/>
     <lotteryHeaderPk10  v-if="gameNo=='55'"/>
     <lotteryHeaderK3  v-if="gameNo=='44'"/> -->

    <!-- <kaijiang /> -->
    <!-- <jibenzoushi /> -->
    <!-- <xfoot /> -->
  </div>
</template>
<script>
import recordHeader from './recordHeader.vue'
import lotteryHeaderK3 from './lotteryHeaderK3.vue'
import kaijiang from './kaijiang.vue'
import xfoot from './xfoot.vue'
export default {
  components: {
            recordHeader,
            lotteryHeaderK3,
            kaijiang,
            xfoot,
        
        },
      data(){
          return{
            gameNo:"",
            gameName:""

          }
      },
    created() {
    this.gameNo = this.$route.params.gameNo.slice(0,2);
    this.gameName = this.$route.params.gameName; 
  }

}
</script>