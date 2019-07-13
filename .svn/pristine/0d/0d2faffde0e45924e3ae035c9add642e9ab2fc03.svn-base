<template>
<div>
    <component v-if='Type' :is="Type"></component>
 </div>       
</template>
<script>
    import k3 from './k3.vue'
    import ssc from './ssc.vue'
    import syx5 from './syx5.vue'
    import bjpk10 from './bjpk10.vue'
    import lhc from './lhc.vue'
    import pcdd from './pcdd.vue'
    export default {
        components:{k3,ssc,syx5,bjpk10, lhc,pcdd},
        data(){
            return{
                gameType:{
                    11:'ssc',
                    22:'k3',
                    33:'k3',
                    44:'syx5',
                    55:'bjpk10',
                    66: 'lhc',
                    88: 'pcdd'
                },
                Type:null
            }
        },
        created(){
            this.Type = this.gameType[this.$route.params.gameType]
        }
    };
</script>