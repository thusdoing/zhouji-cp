<template>
    <div>
        <gameGroup></gameGroup>
        <div class="betChooseArea">
            <component :settings="group" v-if="config" :is="config.component" :config="config"></component>
        </div>
        <betArr></betArr>
        <betChase v-if="chaseFlag"></betChase>
    </div>
</template>
<script>
    import gameGroup from './gameGroup.vue'
    import dataConfig from './data/official.js'
    import betArr from './betArr.vue'
    import betChase from './betChase.vue'
    //时时彩
    import fiveStarRepet from './ssc/fiveStarRepet/index.vue'
    import before2single from './ssc/before2single/index.vue'
    import combination from './ssc/combination/index.vue'
    import fiveGrounp from './ssc/fiveGrounp/index.vue'
    import after3directSum from './ssc/after3directSum/index.vue'
    import h3zx from './ssc/h3zx/index.vue'
    import h3hhzux from './ssc/h3hhzux/index.vue'
    import groupAndSum from './ssc/groupAndSum/index.vue'
    import groupRepeat from './ssc/groupRepeat/index.vue'
    import groupSingle from './ssc/groupSingle/index.vue'
    import groupSum from './ssc/groupSum/index.vue'
    import location from './ssc/location/index.vue'
    import bdd from './ssc/bdd/index.vue'
    import bigAndSmall from './ssc/bigAndSmall/index.vue'
    import interest from './ssc/interest/index.vue'
    import rx2zf from './ssc/rx2zf/index.vue'
    import rx2zd from './ssc/rx2zd/index.vue'
    import rx2zh from './ssc/rx2zh/index.vue'
    import rx2zxf from './ssc/rx2zxf/index.vue'
    import rx4zx from './ssc/rx4zx/index.vue'

    //快三
    import fastThree from './k3/equalNum.vue'
    import sumValue from './k3/sumValue.vue'

    //11选5
    import x1 from './syx5/x1.vue'
    import x1dwd from './syx5/x1dwd.vue'
    import x11z1ds from './syx5/x11z1ds.vue'
    import x2 from './syx5/x2.vue'
    import syx5dt from './syx5/syx5dt.vue'
    import qezxds from './syx5/qezxds.vue'
    import dds from './syx5/dds.vue'
    import czw from './syx5/czw.vue'
    //北京pk10
    import bjpk10sum from './pk10/sum.vue'
    import bjpk10ddw from './pk10/ddw.vue'
    import bjpk10zuxuan from './pk10/zuxuan.vue'
    import bjpk10zhixuan from './pk10/zhixuan.vue'
    import bjpk10ds from './pk10/ds.vue'
    //pc蛋蛋
    import pcddsum from './pcdd/sum.vue'
    export default{
        components:{gameGroup,betArr,betChase,
            fiveStarRepet,before2single,combination,fiveGrounp,after3directSum,h3zx,h3hhzux,
            groupAndSum,groupRepeat,groupSingle,groupSum,location,bdd,bigAndSmall,interest,
            rx2zf,rx2zd,rx2zh,rx2zxf,rx4zx,fastThree,sumValue,x1,x1dwd,x11z1ds,x2,syx5dt,qezxds,dds,czw,
            bjpk10sum,bjpk10ddw,bjpk10zuxuan,bjpk10zhixuan,bjpk10ds,pcddsum
        },
        data() {
            return {
                
            }
        },
        watch: {
        },
        computed: {
            config:function(){
                return dataConfig.dataConfigSlot(this.$store.state.gameType,this.$store.state.selectedGroup.groupNo,this.$store.state.selectedGroup.bonusAmt)
            },
            group:function(){
                return this.$store.state.selectedGroup
            },
            chaseFlag:function(){
                return this.$store.state.chaseFlag
            },
        },
        created() {
            
        },
        mounted() {
            
        },
    }
</script>
<style>
.betChooseArea{
    margin: 15px 15px 20px;background: #F3F7F6;
}
</style>