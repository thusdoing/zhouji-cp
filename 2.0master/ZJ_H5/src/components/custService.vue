<style scoped>
@import '../assets/header.css';
</style>
<template>
    <div>
        <div ref="loding" style="height: calc(100vh - 97px);padding-top: 45px;">
            <iframe style="width: 100%;height: 100%;overflow: auto" :src="KeFu" frameborder="0"></iframe>
        </div>
        <el-container>
            <wv-header title="客服" class="header"></wv-header>
            <wv-tabbar :fixed="true" class="footers">
                <wv-tabbar-item @click="to_page('home')">
                    <i class="iconfont icon-shouye" slot="icon"></i>
                    首页
                </wv-tabbar-item>
                <wv-tabbar-item @click="to_page('openLotteryList')">
                    <i class="iconfont icon-1672jiang" slot="icon"></i>
                    开奖
                </wv-tabbar-item>
                <wv-tabbar-item @click="to_page('activeInfo')">
                    <i class="iconfont icon-faxian" slot="icon"></i>
                    发现
                </wv-tabbar-item>
                <wv-tabbar-item @click="to_page('custService')" is-on>
                    <i class="iconfont icon-lianxikefu" slot="icon"></i>
                    客服
                </wv-tabbar-item>
                <wv-tabbar-item @click="to_page('custInfos')">
                    <i class="iconfont icon-wode" slot="icon"></i>
                    我的
                </wv-tabbar-item>
            </wv-tabbar>
        </el-container>
    </div>

</template>
<script>
export default {
    data () {
        return {
            shows:"custService",
            KeFu:''
        }
    },
    mounted(){
        this.getHomeConfig()
    },
    methods: {
        to_page(active){
            this.$router.push({name:active});
        },
        getHomeConfig() {
            if (sessionStorage.homeUrlObj) {
                this.homeUrlObj = JSON.parse(sessionStorage.homeUrlObj)
                return
            }
            this.$http({
                method: 'get',
                url: '/getHomeConfig',
            }).then(res => {
                if (res.data.success) {                 
                    this.KeFu = res.data.list.find(el => { return el.codeKey == 'clientCustomService' }).codeValue || ""
                }
            });

        },
    }
}
</script>

