<template>
    <div>
        <ssc v-if="showcomp.ssc" :gameName="gameName" :gameType="type" :gameNo="gameNo"></ssc>
        <k3 v-if="showcomp.k3" :gameName="gameName" :gameType="type" :gameNo="gameNo"></k3>
        <ecf v-if="showcomp.ecf" :gameName="gameName" :gameType="type" :gameNo="gameNo"></ecf>
        <k33f v-if="showcomp.k33f" :gameName="gameName" :gameType="type" :gameNo="gameNo"></k33f>
        <lhc v-if="showcomp.lhc" :gameName="gameName" :gameType="type" :gameNo="gameNo"></lhc>
        <pk10 v-if="showcomp.pk10" :gameName="gameName" :gameType="type" :gameNo="gameNo"></pk10>
        <pcdd v-if="showcomp.pcdd" :gameName="gameName" :gameType="type" :gameNo="gameNo"></pcdd>
    </div>
</template>
<script>
import ssc from '@/components/actives/gameGroupIntroducecomp/ssc';
import k3 from '@/components/actives/gameGroupIntroducecomp/k3';
import ecf from '@/components/actives/gameGroupIntroducecomp/ecf';
import k33f from '@/components/actives/gameGroupIntroducecomp/k33f';
import lhc from '@/components/actives/gameGroupIntroducecomp/lhc';
import pk10 from '@/components/actives/gameGroupIntroducecomp/pk10';
import pcdd from '@/components/actives/gameGroupIntroducecomp/pcdd';
export default {
    data() {
        return {
            showcomp : {
                ssc : false,
                k3 : false,
                ecf : false,
                k33f : false,
                lhc: false,
                pk10:false,
                pcdd:false
            },
            gameTypes : {'11':'ssc','22':'k3','33':'k33f','44':'ecf', '66': 'lhc','55':'pk10','88':'pcdd'},
            gameName : '',
            type : '',
            gameNo : ''
        }
    },
    components : {
        ssc,k3,ecf,k33f, lhc,pk10,pcdd
    },
    methods : {
        checkShowComp(item){
            for(let key in this.showcomp){
                this.showcomp[key] = false;
            }
             this.showcomp[item] = true;
        }
    },
    mounted() {
        this.gameName = this.$route.params.gameName;
        this.type = this.$route.params.gameType;
        this.gameNo = this.$route.params.gameNo;
        this.checkShowComp(this.gameTypes[this.type]);
    }

}
</script>
<style>
    .bdBveP {
        margin: 10px 0;
        height: 40px;
    }

    .bYzZZd {
        display: block;
        height: 100%;
        width: 100%;
        line-height: 40px;
        text-align: center;
        background: #ec2829;
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
        border-radius: 3px;
        border-width: 0;
        border-color: #ec2829;
        padding: 0 4px;
        position: relative;
    }

    .cyYoRf {
        padding: 5px;
    }

    .hhUvWZ {
        display: flex;
        align-items: start;
        margin: 10px 0px;
    }

    .iCnFQh {
        font-size: 14px;
        padding: 10px;
        background: rgb(255, 255, 255);
    }

    .ioDOkv {
        color: rgb(155, 155, 155);
        flex: 3 3 75%;
        padding: 5px 0px;
    }

    .gwgWIL {
        width: 25%;
        color: rgb(69, 69, 69);
        text-align: center;
        flex: 0 0 25%;
        padding: 5px;
    }

    .gwgWIL {
        width: 25%;
        color: rgb(69, 69, 69);
        text-align: center;
        flex: 0 0 25%;
        padding: 5px;
    }

    .kOmFkF {
        color: rgb(155, 155, 155);
        flex: 3 3 75%;
        padding: 5px 0px;
    }

    .faZLno {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    }

    .gbXjjN {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        background-color: rgb(247, 247, 247);
        color: rgb(155, 155, 155);
        text-align: center;
        border-bottom: 1px solid rgb(230, 230, 230);
    }

    .gbXjjN>div:nth-child(1) {
        text-align: center;
        flex: 1 1 25%;
    }


    .gbXjjN>div:nth-child(2) {
        flex: 3 2 50%;
        border-width: 0px 1px;
        border-color: rgb(230, 230, 230);
        border-style: solid;
    }


    .gmsilR {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-bottom: 1px solid rgb(230, 230, 230);
    }

    .gmsilR>div:nth-child(1) {
        text-align: center;
        flex: 1 1 25%;
    }

    .gmsilR>div:nth-child(2) {
        flex: 3 2 50%;
        border-width: 0px 1px;
        border-color: rgb(230, 230, 230);
        border-style: solid;
    }

    .boyuBP {
        padding: 5px;
    }

    .faZLno {
        border-left: 1px solid rgb(230, 230, 230);
        border-top: 1px solid rgb(230, 230, 230);
    }
</style>
