<template>
    <div class="main">
	<!-- 可在该页重新编写新的优惠活动页面 -->
        <div class="banner-wrap"></div>

        <template v-if='activeFlag'>
            <div class="floor fix" id="gids_120" v-for="(d, i) of activitys" :key="i">
                <div class="showDetail">
                    <img :src="$imgPath(d.activitySrc)">
                    <div class="floorRright">
                        <a>查看详情<i></i></a>
                    </div>
                </div>
                <div class="floorDetail" style="display: none;"><p v-for="(item, index) in d.activityDetail" :key="index"><img :src="$imgPath(item.activityDetailSrc)"></p></div>
            </div>
            <div class="floorLine"></div>
        </template>
        <h1 v-else style="line-height: 300px;font-size: 45px;text-align: center;font-weight: 500;">暂时还没有活动！</h1>
    </div>
</template>
<style scoped>
    @import './promotion.css';
</style>
<script>
    // import activitys from '@/assets/activity';
    // 活动图片
    // sx7000 123456
    // lm966 146

    export default {
        data(){
            return {
                activeFlag:true,
                activitys: []
            }
        },
        created() {
            this.getWebActivity()
        },
        mounted(){
            $('.main').on('click','.floorRright',function(){
                $(this).parents('.showDetail').next().slideToggle();
            })
        },
        methods: {
            getWebActivity(){
                this.$http.get('/webactivity/getWebActivity?f=0').then(data => {
                    if (data.data.success&&data.data.list.length>0) {
                        this.activitys = data.data.list
                    }else{
                        this.activeFlag = false
                    }
                })
            }
        },
    }
</script>
