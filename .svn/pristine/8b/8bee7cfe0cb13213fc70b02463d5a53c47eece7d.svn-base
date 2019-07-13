<template>
    <div>
        <div class="game-wraps" v-if="bigGameData.length!=0">
            <div class="biggame-tabs">
                <span v-for="(item, index) in bigGameData" class="bg-item" :class="{'select-bg-item':bgselID==item.groupClassNo}" :key="'bg'+index" @click="onBgselClick(item)">{{item.groupClassName}}</span>
                <Button type="info" size="small" icon="arrow-swap" style="float: right;padding: 3px 4px;" @click="$router.push(`/bet/${$route.params.gameType}/${$route.params.gameNo}/credit`)">信用玩法</Button>
            </div>
            <div class="smallgame-tabs">
                <div style="margin:10px" v-for="(el, pos) in (bgselItem.groupClassCones || [])" :key="'sg'+pos">
                    <label style="font-size:13px;">{{el.groupClassConName}}</label>
                    <span v-for="(ele, site) in el.groupSettinges" class="ssg-item" :class="{'select-ssg-item':ssgselID==ele.groupNo}" :key="'ssg'+pos+site" @click="ssgselID=ele.groupNo;ssgselItem=ele">{{ele.groupName}}</span>
                </div>
            </div>
        </div>
        <h1  v-if="weikaifang" style="text-align: center;padding: 100px 0;font-size: 40px;">当前玩法未开放...<a @click="$router.push(`/bet/${$route.params.gameType}/${$route.params.gameNo}/credit`)" style="display: inline;font-size: 14px;margin-left: 60px;">去信用玩法看看</a></h1>
        <div class="gameplay-wraps" v-if="bigGameData.length!=0">
            <div style="margin-left:1px;margin-top:1px;">
                <component @bet="onGameBet"  v-if="configData" :is="configData.component" :settings="ssgselItem" :config="configData"></component>
            </div>
        </div>
    </div>
</template>

<script>

import config from '@/assets/data/dataConfig'
import fiveStarRepet from '@/views/sscOfficial/fiveStarRepet/index.vue'
import before2single from '@/views/sscOfficial/before2single/index.vue'
import combination from '@/views/sscOfficial/combination/index.vue'
import fiveGrounp from '@/views/sscOfficial/fiveGrounp/index.vue'
import after3directSum from '@/views/sscOfficial/after3directSum/index.vue'
import h3zx from '@/views/sscOfficial/h3zx/index.vue'
import h3hhzux from '@/views/sscOfficial/h3hhzux/index.vue'
import groupAndSum from '@/views/sscOfficial/groupAndSum/index.vue'
import groupRepeat from '@/views/sscOfficial/groupRepeat/index.vue'
import groupSingle from '@/views/sscOfficial/groupSingle/index.vue'
import groupSum from '@/views/sscOfficial/groupSum/index.vue'
import location from '@/views/sscOfficial/location/index.vue'
import bdd from '@/views/sscOfficial/bdd/index.vue'
import bigAndSmall from '@/views/sscOfficial/bigAndSmall/index.vue'
import interest from '@/views/sscOfficial/interest/index.vue'
import rx2zf from '@/views/sscOfficial/rx2zf/index.vue'
import rx2zd from '@/views/sscOfficial/rx2zd/index.vue'
import rx2zh from '@/views/sscOfficial/rx2zh/index.vue'
import rx2zxf from '@/views/sscOfficial/rx2zxf/index.vue'
import rx4zx from '@/views/sscOfficial/rx4zx/index.vue'

import fastThree from '@/views/k3Official/fastThree/equalNum/index.vue'
import sumValue from '@/views/k3Official/fastThree/sumValue/index.vue'

//11选5
import x1 from '@/views/syx5Official/x1.vue'
import x1dwd from '@/views/syx5Official/x1dwd.vue'
import x11z1ds from '@/views/syx5Official/x11z1ds.vue'
import x2 from '@/views/syx5Official/x2.vue'
import syx5dt from '@/views/syx5Official/syx5dt.vue'
import qezxds from '@/views/syx5Official/qezxds.vue'
import dds from '@/views/syx5Official/dds.vue'
import czw from '@/views/syx5Official/czw.vue'
//北京pk10
import bjpk10sum from '@/views/bjpk10/official/sum.vue'
import bjpk10ddw from '@/views/bjpk10/official/ddw.vue'
import bjpk10zuxuan from '@/views/bjpk10/official/zuxuan.vue'
import bjpk10zhixuan from '@/views/bjpk10/official/zhixuan.vue'
import bjpk10ds from '@/views/bjpk10/official/ds.vue'
//pc蛋蛋
import pcddsum from '@/views/pcdd/official/sum.vue'

export default {
    components: {
        fiveStarRepet,before2single,combination,fiveGrounp,after3directSum,h3zx,h3hhzux,
        groupAndSum,groupRepeat,groupSingle,groupSum,location,bdd,bigAndSmall,interest,
        rx2zf,rx2zd,rx2zh,rx2zxf,rx4zx,fastThree,sumValue,x1,x1dwd,x11z1ds,x2,syx5dt,qezxds,dds,czw,
        bjpk10sum,bjpk10ddw,bjpk10zuxuan,bjpk10zhixuan,bjpk10ds,pcddsum
    },
    data () {
        return {
            bigGameData: [],
            bgselID: '',
            bgselItem: {},
            ssgselID: '',
            ssgselItem: {},
            weikaifang:false
        }
    },
    computed: {
        configData: function() {
            return config.dataConfigSlot(this.$route.params.gameType, this.ssgselID, this.ssgselItem.bonusAmt)
        },
        curSel: function() {
          return this.$store.state.curSel
        }
    },
    mounted () {
        this.$http({
            method: 'get',
            url: '/getGameGroupByGameWithGroup',
            params: {
                gameNo: this.$route.params.gameNo
            }
        })
        .then(response => {
            if (response.data.success) {
                if(response.data.list!=null&&response.data.list.length>0){
                    this.bigGameData = response.data.list
                    if ( this.curSel.groupClassNo ) {
                        this.bgselItem = response.data.list.find(el => el.groupClassNo == this.curSel.groupClassNo)
                        this.bgselID = this.bgselItem.groupClassNo
                    }
                    else {  
                        this.bgselItem = response.data.list[0]
                        this.bgselID = this.bgselItem.groupClassNo
                    }

                    if ( this.curSel.groupNo ) {
                        this.ssgselItem = this.bgselItem.groupClassCones[0].groupSettinges.find(el => el.groupNo == this.curSel.groupNo)
                        this.ssgselID = this.ssgselItem.groupNo
                    }
                    else {
                        this.ssgselID = this.bgselItem.groupClassCones[0].groupSettinges[0].groupNo
                        this.ssgselItem = this.bgselItem.groupClassCones[0].groupSettinges[0]
                    }
                }else{
                    this.weikaifang = true
                    this.$router.push(`/bet/${this.$route.params.gameType}/${this.$route.params.gameNo}/credit`)
                }
                

                //this.bgselItem = response.data.list[0]
                //this.bgselID = this.bgselItem.groupClassNo
                //this.ssgselID = this.bgselItem.groupClassCones[0].groupSettinges[0].groupNo
                //this.ssgselItem = this.bgselItem.groupClassCones[0].groupSettinges[0]
            }
        })
    },
    methods: {
        onGameBet: function(obj) {
            this.$emit('betTableListFun', obj)
        },
        onBgselClick: function(item) {
            this.bgselID = item.groupClassNo;
            this.bgselItem = item;
            this.ssgselID = item.groupClassCones[0].groupSettinges[0].groupNo
            this.ssgselItem = item.groupClassCones[0].groupSettinges[0]
        }
    }
}
</script>

<style scoped>
    .game-wraps {
        position: relative;
        margin-left: 32px;
    }
    .game-wraps::before {
        /* content: '玩法';
        position: absolute;
        left: -32px;
        top: 50%;
        transform: translateY(-50%);
        writing-mode: vertical-lr;
        text-orientation: upright;
        line-height: 32px;
        white-space: nowrap;
        color: #c3c3c3;
        font-size: 0.8em;
        z-index: 9; */

        content: '玩法';
        position: absolute;
        left: -22px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 18px;
        width:20px;
        white-space: pre-wrap;
        color: #c3c3c3;
        font-size: 0.8em;
        z-index: 9;
    }
    .game-wraps::after {
        content: '';
        position: absolute;
        left: -32px;
        top: 0;
        width: 32px;
        bottom: 0;
        background-color: #f7f7f7;
    }
    .biggame-tabs {
        font-size: 0;
    }
    .bg-item {
        display: inline-block;
        padding: 6px;
        color: #ababab;
        background-color: #f2f2f2;
        border-top: 2px solid transparent;
        margin-right: 1px;margin-left: 1px;
        font-size: 13px;
        cursor: pointer;
    }
    .select-bg-item {
        border-top-color: #e60b0b;
        color: #e60b0b;
        background-color: #fff;
    }
    .smallgame-tabs {
        padding: 15px;
        background-color: #fff;
        margin-left: 1px;
    }
    .ssg-item {
        margin-left:20px;
        font-size:13px;
        color:#ababab;
        padding: 2px;
        cursor: pointer;
    }
    .select-ssg-item {
        background-color: #e60b0b;
        color: #fff;
    }

    .gameplay-wraps {
        position: relative;
        margin-left: 32px;
    }
    .gameplay-wraps::before {
        /* content: '选择幸运号码';
        position: absolute;
        left: -32px;
        top: 50%;
        transform: translateY(-50%);
        writing-mode: vertical-lr;
        text-orientation: upright;
        line-height: 32px;
        white-space: nowrap;
        color: #c3c3c3;
        font-size: 0.8em;
        z-index: 9; */
        content: '选择幸运号码';
        position: absolute;
        left: -22px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 18px;
        width:20px;
        white-space: pre-wrap;
        color: #c3c3c3;
        font-size: 0.8em;
        z-index: 9;
    }
    .gameplay-wraps::after {
        content: '';
        position: absolute;
        left: -32px;
        top: 0;
        width: 32px;
        bottom: 0;
        background-color: #f7f7f7;
    }
</style>
