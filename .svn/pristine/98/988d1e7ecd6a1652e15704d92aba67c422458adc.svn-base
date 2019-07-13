<template>
    <div>
        <gameGroup></gameGroup>
        <div class="betChooseArea2">
            <component :gameData="selectedBigGroup" v-if="config" :is="config.component" :configData="config"></component>
        </div>
    </div>
</template>
<script>
    import gameGroup from './gameGroup.vue'
    import dataConfig from '@/assets/data/data.credit.config'
    import lhzh from '@/views/sscCredit/sscCredit/lhzh/index.vue' //整合
    import lhd from '@/views/sscCredit/sscCredit/lhd/index.vue' //龙虎斗
    import lhq5z1 from '@/views/sscCredit/sscCredit/lhq5z1/index.vue' //5中1
    import dxsb from '@/views/k3Credit/dxsb/index.vue'

    //北京pk10
    import bjpk10sm from '@/views/bjpk10/credit/shuangmian.vue'
    import bjpk10dxds from '@/views/bjpk10/credit/dxds.vue'
    //十一选五
    import syx5sm from '@/views/syx5credit/liangmian.vue'
    import syx5x5z1 from '@/views/syx5credit/x5z1.vue'
    import syx5lhd from '@/views/syx5credit/lhd.vue'
    //六合彩
    import lhctema from '@/views/lhc/tema.vue'
    import twoSided from '@/views/lhc/twoSided.vue'
    import concatCode from '@/views/lhc/concatCode.vue'
    //pcdd
    import pcdd from '@/views/pcdd/credit/credit.vue'

    export default{
        components:{gameGroup,
            lhzh,lhd,lhq5z1,dxsb,bjpk10sm,bjpk10dxds,syx5sm,syx5x5z1,syx5lhd,lhctema,twoSided,concatCode,pcdd
        },
        data() {
            return {
                
            }
        },
        watch: {
        },
        computed: {
            config:function(){
                return dataConfig.dataConfigSlot(this.$store.state.gameType,this.$store.state.selectedBigGroup.groupClassNo,this.$store.state.selectedGroup,this.$store.state.openTime||Date.now())
            },
            group:function(){
                return this.$store.state.selectedGroup
            },
            selectedBigGroup:function(){
                return this.$store.state.selectedBigGroup
            }
        },
        created() {
            
        },
        mounted() {
            
        },
    }
</script>
<style>
.betChooseArea2{
    font-size: 14px;
}
</style>