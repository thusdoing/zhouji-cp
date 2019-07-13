<template>
  <div>
    <xheader></xheader>
    <lotteryHeaderK3  />
    <!-- <lotteryHeaderSsc  v-if="gameNo=='11'"/>
    <lotteryHeaderLhc  v-if="gameNo=='66'"/>
     <lotteryHeaderPk10  v-if="gameNo=='55'"/>
     <lotteryHeaderK3  v-if="gameNo=='44'"/> -->

    <!-- <kaijiang /> -->
    <!-- <jibenzoushi /> -->
    <xfoot />
    <!-- <rightFloat />
    <leftFloat /> -->
  </div>
</template>
<script>
import xheader from './xheder.vue'
import lotteryHeaderK3 from './lotteryHeaderK3.vue'
import kaijiang from './kaijiang.vue'
import xfoot from './xfoot.vue'
// import rightFloat from './rightFloat.vue'
// import leftFloat from './leftFloat.vue'
export default {
  components: {
            xheader,
            lotteryHeaderK3,
            kaijiang,
            xfoot,
            // rightFloat,
            // leftFloat,
        
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