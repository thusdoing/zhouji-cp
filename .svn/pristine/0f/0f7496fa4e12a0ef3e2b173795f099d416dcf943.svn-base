<template>
    <div>
        <wv-header title="活动" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div style="min-height: calc(100vh - 50px);padding-top: 50px;background: #fff">
            <img v-for="(item, index) in active" :key="index" width="100%" :src="$imgPath(item.activityDetailSrc)" alt="">
        </div>
    </div>
</template>
<style scoped>
@import '../../assets/header.css';
</style>
<script>
    export default{
        data() {
            return {
                active:[]
            }
        },
        created() {
            if(this.$route.params.active){
                this.active = this.$route.params.active
            }
        },
    }
</script>