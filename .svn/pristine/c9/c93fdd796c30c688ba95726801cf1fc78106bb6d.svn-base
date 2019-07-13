<style scoped>
@import '../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}
</style>
<template>
    <div>
        <wv-header title="充提记录" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main">
            <wv-navbar v-model="selected" class="msg-navber" @change="changed" fixed>
                <wv-navbar-item id="allTypeList">金额变动</wv-navbar-item>
                <wv-navbar-item id="rechargeRecordList">充值记录</wv-navbar-item>
                <wv-navbar-item id="withRecordList">提现记录</wv-navbar-item>
            </wv-navbar>
            <div class="msg-content">
                <allTypeList v-if="show_navber.allTypeList"></allTypeList>
                <rechargeRecordList v-if="show_navber.rechargeRecordList"></rechargeRecordList>
                <withRecordList v-if="show_navber.withRecordList"></withRecordList>
            </div>
        </div>
    </div>
</template>
<script>
import allTypeList from '@/components/custInfos/rechargeWithcomponents/allTypeList'
import rechargeRecordList from '@/components/custInfos/rechargeWithcomponents/rechargeRecordList'
import withRecordList from '@/components/custInfos/rechargeWithcomponents/withRecordList'
export default {
    components:{
        allTypeList,rechargeRecordList,withRecordList
    },
    data () {
        return {
            selected : "allTypeList",
            show_navber : {
                allTypeList : true,
                rechargeRecordList : false,
                withRecordList : false
            }
        }
    },
    created(){
        if(this.$route.params.show_navber){
            for(let key in this.show_navber){
                this.show_navber[key] = false;
            }
            this.show_navber[this.$route.params.show_navber] = true
            this.selected = this.$route.params.show_navber
        }
    },
    methods : {
        changed(e){
            for(let key in this.show_navber){
                this.show_navber[key] = false;
            }
            this.show_navber[e] = true;
        }
    }
}
</script>
