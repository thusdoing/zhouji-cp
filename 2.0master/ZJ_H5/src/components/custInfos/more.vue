<style scoped>
@import '../../assets/header.css';
@import 'css/custInfos.css';
.index-main>>>.weui-panel{margin-top: 0px;}
</style>
<template>
    <div>
        <wv-header title="更多" class="header" >
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <el-main class="index-main">
            
            <wv-panel style="margin-top:15px;">
                <wv-cell title="帮助中心" is-link to="/custService"></wv-cell>
            </wv-panel>
            <wv-panel>
                <wv-cell title="关于我们" is-link to="/custService"></wv-cell>
            </wv-panel>
            <wv-panel>
                <wv-cell title="版本号" is-link to="/custService"></wv-cell>
            </wv-panel>

            <wv-button type="warn" @click="userLoginOut" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;">退出登录</wv-button>

        </el-main>
 
    </div>
</template>
<script>
export default {
    data () {
        return {
            shows:"custInfos"
        }
    },
    methods: {
        to_page(active){
            this.$router.push({name:active});
        },
        /** 用户登出 */
        userLoginOut() {
            this.$api.get('loginOut').then((data) => {
                sessionStorage.custInfo = null;
                this.$store.commit(this.$store.state.mutationType.SET_USER,{});
                this.$router.push({name:'loginview'});
            });
        }
    }
}
</script>