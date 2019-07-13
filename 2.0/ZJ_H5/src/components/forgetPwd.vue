<style scoped>
@import '../assets/header.css';
@import 'custInfos/css/custInfos.css';
</style>
<template>
    <div>
        <wv-header title="忘记密码" class="header" >
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <el-main class="index-main">
            
            <wv-panel style="margin-top:15px;">
                <wv-cell title="通过在线客服" is-link to="/custService"></wv-cell>
            </wv-panel>


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
        }
    }
}
</script>