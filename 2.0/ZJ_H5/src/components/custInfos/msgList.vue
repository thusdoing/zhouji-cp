<style scoped>
@import '../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}

</style>
<template>
    <div>
        <wv-header title="消息" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main">
            <wv-navbar v-model="selected" class="msg-navber" @change="changed" fixed>
                <wv-navbar-item id="notice">公告</wv-navbar-item>
                <!-- <wv-navbar-item id="item2">中奖名单</wv-navbar-item> -->
                <wv-navbar-item id="mail">站内信<wv-badge v-if="newmsg>0" class="msg-badge" color="red">新</wv-badge></wv-navbar-item>
            </wv-navbar>
            <div class="msg-content">
                <notice v-if="show_navber.notice"></notice>
                <sysMail v-if="show_navber.mail"></sysMail>
            </div>
        </div>
    </div>
</template>
<script>
import notice from '@/components/custInfos/msgcomponents/notice'
import sysMail from '@/components/custInfos/msgcomponents/sysMail'
export default {
    components:{
        notice,sysMail
    },
    data () {
        return {
            selected : "notice",
            show_navber : {
                notice : true,
                mail : false
            },
            newmsg:0
        }
    },
    methods : {
        changed(e){
            for(let key in this.show_navber){
                this.show_navber[key] = false;
            }
            this.show_navber[e] = true;
        },
        getMsg() {
            this.$api.get('getMsg',{msgStatus:'1'}).then(data => {
                if (data.success) {
                    if(data.list != null && data.list != undefined){
                        this.newmsg = data.totalSize;
                    }
                }
            });
        },
    },
    created(){
        if(sessionStorage.custInfo != null && sessionStorage.custInfo != undefined && sessionStorage.custInfo != '' &&
            sessionStorage.custInfo != 'null'){
            this.getMsg()
        }
    }
}
</script>
