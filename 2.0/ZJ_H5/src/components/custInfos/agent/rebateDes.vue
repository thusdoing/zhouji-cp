<template>
    <div class="contentbox" style="top: 50px">
        <wv-header title="返点赔率表" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div @click="showmenus=true" class="btn-menu" slot="right">
                {{name}}
            </div>
        </wv-header>
        <div class="rebateContent fix" v-if="selectData.length>0">
            <ul class="rebateTitle">
                <li>
                    <i>玩法</i>
                    <span></span>
                    <em>返点</em>
                </li>
                <li v-for="(item, index) in selectData" :key="index">{{item.groupClassName}}</li>

            </ul>
            <div class="rebateTableCon">
                <div class="rebateTable fix" style="width: 800em;">
                    <ul v-for="(rebate,index) in rebateList" :key="index">
                        <li>{{rebate}}</li>
                        <li v-for="(item, index) in selectData" :key="'w'+index">赔率{{Number(asmd.mul(asmd.numDiv(item.bonusAmt,0.9),asmd.numDiv(rebate+90,100))).toFixed(3) }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <actionsheet v-model="showmenus" :menus="menus" @on-click-menu="selecmenus" show-cancel></actionsheet>
    </div>
</template>
<script>
    import asmd from '@/assets/js/asmd.js'
    import { Actionsheet } from 'vux'
    export default {
        components: {
            Actionsheet
        },
        data() {
            return {
                asmd:asmd,
                GameRebateBonusGroupInfoData: [],
                name: '时时彩',
                menus: [],
                showmenus: false,
                selectData:[],
                selectRebate:"",
                rebateList:[],
                userRebate:{}
            }
        },
        created() {
            this.getGameRebateBonusGroupInfo()
        },
        methods: {
            getGameRebateBonusGroupInfo() {
                this.$api.get('/getGameRebateBonusGroupInfo',null,1).then(data => {
                    if(data.success){
                        this.GameRebateBonusGroupInfoData = data.list
                        this.selectData = data.list[0].bonusList
                        this.selectRebate = data.map[data.list[0].gameType]
                        this.name = data.list[0].gameTypeName
                        this.handleRebate()
                        this.menus = data.list.map((el,index)=>{
                            let obj = {}
                            obj.label = el.gameTypeName
                            obj.value = index
                            return obj
                        })
                        this.userRebate = data.map
                    }else{
                        this.$dialog({ title: '提示信息', message: data.msg, skin: 'ios' });
                    }
                })
            },
            handleRebate() {
                this.rebateList = []
                for (let i = this.selectRebate * 10; i >= 0; i--) {
                    this.rebateList.push(i / 10)
                }
            },
            selecmenus(menu) {
                this.name = this.GameRebateBonusGroupInfoData[menu].gameTypeName
                this.selectRebate = this.userRebate[this.GameRebateBonusGroupInfoData[menu].gameType]
                this.handleRebate()
                this.selectData = this.GameRebateBonusGroupInfoData[menu].bonusList
            }
        }
    }
</script>
<style scoped>
    @import '../../../assets/header.css';

    .rebateDes .textMore {
        width: 6em
    }

    .testShow {
        color: #999;
        font-size: .6em;
        padding: .6em;
        background: #fff;
    }

    .testShow i {
        padding-right: .2em
    }

    .rebateContent {
        font-size: .7em;
        background: #fff;
        color: #333;
        height: 100%;
        overflow: scroll;
    }

    .rebateTableCon,
    .rebateTitle {
        float: left
    }

    .rebateTable ul,
    .rebateTitle {
        box-shadow: .1em 0 .5em #d5d5d5
    }

    .rebateTable ul li,
    .rebateTitle li {
        width: 8.7rem;
        text-align: center;
        height: 2.6em;
        line-height: 2.6em;
        list-style: none;
    }

    .rebateTable ul li:nth-child(odd),
    .rebateTitle li:nth-child(odd) {
        background: #f5f5f5
    }

    .rebateTable ul li:first-child,
    .rebateTitle li:first-child {
        background: #eee
    }

    .rebateTitle {
        position: relative;
        z-index: 1;
    }

    .rebateTitle li {
        overflow: hidden
    }

    .rebateTitle li:first-child {
        position: relative
    }

    .rebateTitle li:first-child i {
        position: absolute;
        left: 15px;
        bottom: -6px;
        z-index: 2
    }

    .rebateTitle li:first-child em {
        position: absolute;
        right: 15px;
        top: 0;
        z-index: 2
    }

    .rebateTitle li:first-child:before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        border-bottom: 1px solid #dedede;
        content: "";
        transform: rotateZ(45deg);
        z-index: 1;
        margin-left: 30px;
    }

    /* .rebateTitle li:first-child:after {
        position: absolute;
        left: 0;
        right: 1px;
        top: 1px;
        top: .5px;
        bottom: 0;
        border-bottom: 2.6em solid #eee;
        border-right: 5rem solid transparent;
        content: "";
        z-index: 1
    } */

    .rebateTable {
        width: 72rem
    }

    .rebateTable ul {
        box-shadow: none
    }

    .rebateTable ul li {
        width: 8em
    }

    .rebateTableCon {
        width: calc( 100% - 8.7rem);
        overflow: scroll
    }

    .rebateTableCon ul {
        float: left
    }

    .rebateDes {
        background: #fff;
        height: 100%
    }

    .rebateDes .textMore.dataType em {
        font-size: .7rem
    }
</style>