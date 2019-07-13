<style scoped>
@import '../../assets/footer.css';
</style>
<template>
    <el-footer :shows="shows" class="index-footer">
        <div class="footer-menus">
            <div ref="home" @click="to_page('home')" class="fmenu">
                <i class="el-icon-mobile-phone" ></i>
                <div>首页</div>
            </div>
            <div ref="openLotteryList" @click="to_page('openLotteryList')" class="fmenu">
                <i class="el-icon-star-on" ></i>
                <div>开奖</div>
            </div>
            <div ref="activeInfo" @click="to_page('activeInfo')" class="fmenu">
                <i class="el-icon-view" ></i>
                <div>发现</div>
            </div>
            <div ref="custService" @click="to_page('custService')" class="fmenu">
                <i class="el-icon-service" ></i>
                <div>客服</div>
            </div>
            <div ref="custInfos" @click="to_page('custInfos')" class="fmenu">
                <i class="el-icon-info" ></i>
                <div>我的</div>
            </div>
        </div> 
    </el-footer>
</template>
<script>

export default {
    name: 'home-footer',
    props:{
        shows:{type: String,default: 'home'}
    },
    methods: {
        to_page(active){
            this.$router.push({name:active});
        }
    },
    mounted() {
        this.$refs[this.shows+""].style.color = '#ec2829';
    }
}
</script>

