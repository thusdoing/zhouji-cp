<style scoped>
@import '../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}

</style>
<template>
    <div>
        <wv-header title="活动详情" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div style="min-height: calc(100vh - 44px);padding-top: 44px;background: #fff">
            <!-- <wv-navbar v-model="selected" class="msg-navber" @change="changed" fixed>
                <wv-navbar-item id="activityList">进行中</wv-navbar-item>
                <wv-navbar-item id="endActivityList">已结束</wv-navbar-item>
            </wv-navbar>
            <div class="msg-content">
                <activityList v-if="show_navber.activityList"></activityList>
                <endActivityList v-if="show_navber.endActivityList"></endActivityList>
            </div> -->
            <template v-if='activeFlag'>
                <div v-for="(item, index) in activeImgList" @click="goDetails(item.activityDetail)" :key="index"><img style="width: 100%" :src="$imgPath(item.activitySrc)"></div>
            </template>
            <h1 v-else style="line-height: 300px;font-size: 30px;text-align: center;font-weight: 500;">暂时还没有活动！</h1>
        </div>
    </div>
</template>
<script>
import activityList from '@/components/actives/activecomponents/activityList'
import endActivityList from '@/components/actives/activecomponents/endActivityList'
// import activeImgList from '@/assets/activity';
export default {
    components:{
        activityList,endActivityList
    },
    data () {
        return {
            selected : "activityList",
            show_navber : {
                activityList : true,
                endActivityList : false,
            },
           
           activeImgList: [],
            // activeImgList:[
            //     // {imgTitle:'/static/active/g1.jpg',imgDetails:'/static/active/1-1.jpg'},
            //     // {imgTitle:'/static/active/g2.jpg',imgDetails:'/static/active/2-1.jpg'},
            //     // {imgTitle:'/static/active/g3.jpg',imgDetails:'/static/active/3-1.jpg'},
            //     // {imgTitle:'/static/active/g4.jpg',imgDetails:'/static/active/4-1.jpg'},
            //     // {imgTitle:'/static/active/g5.jpg',imgDetails:'/static/active/5-1.jpg'},
            //     // {imgTitle:'/static/active/g6.jpg',imgDetails:'/static/active/6-1.jpg'}
            //     // {imgTitle:'/static/active/g7.jpg',imgDetails:'/static/active/7-1.jpg'},
            // ],
            activeFlag:true
        }
    },
    created() {
        this.getWebActivity()
    },
    methods : {
        changed(e){
            for(let key in this.show_navber){
                this.show_navber[key] = false;
            }
            this.show_navber[e] = true;
        },
        goDetails(url){
            if(url.length==0){
                return this.$vux.toast.show({
                        position:'middle',
                        type:'text',
                        text: '暂无详情'
                    })
            }
            this.$router.push({name:'activeDetails',params:{active:url}})
        },
        getWebActivity(){
            this.$api.get('/webactivity/getWebActivity?f=1').then(data => {
                if (data.success&&data.list.length>0) {
                    this.activeImgList = data.list
                }else{
                    this.activeFlag = false
                }
            })
        }
    }
}
</script>
