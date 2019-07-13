<template>
    <div style="background: #D4D6D5;color: #000;">
        <headerBet></headerBet>
        <div class="bet2content">
            <bettop></bettop>
            <div style="display: flex;background: #fff;border-top: 1px solid #ddd;margin-right: 15px;">
                <div class="betMian">
                    <betNav></betNav>
                    <div style="position: relative;">
                        <official v-if="$route.params.gameMode=='official'"></official>
                        <credit v-else></credit>
                        <Spin fix class="stoppppppp" v-if="isstop">
                            <img :src="stopimg" style="height: 100%;width: 100%">
                        </Spin>
                    </div>
                </div>
                <div class="bet2Record">
                    <betRecord></betRecord>
                </div>
            </div>
            
        </div>
        

        <footer-cop></footer-cop>
    </div>
</template>
    
<script>
    import headerBet from './bet/betHeader.vue'
    import footerCop from '@/views/footer/index.vue'
    
    import bettop from "./bet/bettop.vue"
    import betNav from "./bet/betNav.vue"
    import betRecord from './bet/betRecord.vue'
    import official from './bet/official.vue'
    import credit from './bet/credit.vue'


    // import k3 from './bet/k3.vue'

    import betChaseNum from '@/views/betChaseNum/index.vue'
    import betTableList from '@/views/betTableList/index.vue'
    export default {
        components: {
            footerCop,
            headerBet,
            bettop,
            betNav,
            official,
            credit,
            betRecord,

            betChaseNum,
            betTableList
        },
        data() {
            return {
                stopimg:require('./stopsp.jpg')
            }
        },
        computed: {
            isstop:function(){
                return this.$store.state.isstop
            }
        },
        created() {
            this.$store.commit('setgameType',this.$route.params.gameType)
        },
        watch:{
            '$route':function(n,o){
                this.$store.commit('clearbetArr')
                if(n.params.gameType==o.params.gameType) return;
                this.$store.commit('setgameType',n.params.gameType)
            }
        },
        methods: {
        }
    }

</script>

<style lang="less">
    .bet2content{
        width: 1100px;
        margin: auto;
        margin-top: 10px;
        background: #fff;
        border: 1px solid #ddd;
        .ivu-table td,
        .ivu-table th {
            border-bottom: 1px dashed #e9eaec;
        };
        .ivu-table:after,
        .ivu-table:before {
            width: 0;
        };
        .ivu-table-wrapper{
            border: 0;
        }
        .ivu-tabs-tab{
            height: 40px;
        }
    }
    .betMian{
        width: 825px;
    }
    .bet2Record{
        width: 258px;
        border: 1px solid #ccc;
        border-top: 0;
    }
    .stoppppppp .ivu-spin-main{
        width: 100%;
        height: 100%;
    }
    .stoppppppp {
        z-index: 99;
    }
    .stoppppppp.ivu-spin-show-text .ivu-spin-text{
        height: 100%;
    }
</style>
    
    