<style scoped>
@import '../../assets/header.css';
.active-banner img{height: 54px;width: 100%;margin: -4px auto;line-height: 0px;}
.active-item{margin: 1px auto;}
.active-item>>>.el-card__body{text-align: right;padding: 10px;display: flex;font-size: 10px;color: #c9c9c9;align-items: center;}
.active-item img{width: 45px;height: 45px;float: left;}
.active-item-small-info{margin-left: 10px;flex: 1;}
.active-item-name{font-size: 14px;color: #5E5E5E;display: flex;}
.active-item-name div:first-child{width: 90%;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}
.active-item-info{color: #9b9b9b;font-size: 10px;display: flex;}
</style>
<template>
    <div>
        <wv-header title="新闻" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main">
            <el-row>
                <el-col v-for="(item,index) in newslist" :key="index" :span="24" class="active-item">
                    <div @click="to_page(`${item.newsId}`)">
                        <el-card  shadow="never">
                            <img :src="$imgPath(item.imgUrl)"/>
                            <div class="active-item-small-info">
                                <div class="active-item-name">
                                    <div>
                                        <span class="item-name">{{item.newsTitle}}</span>
                                    </div>
                                    <div class="active-item-flag"></div>
                                </div>
                                <div class="active-item-info">
                                    <div>{{item.newsTime}}</div>
                                </div>
                            </div>
                            <i class="el-icon-arrow-right"></i>
                        </el-card>
                    </div>
                </el-col>
               
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newslist : []
        }
    },
    methods : {
        /** 加载新闻列表信息 */
        loadNewsList(){
            this.$api.get('getNews',{pageNo:1,pageSize:20}).then(data => {
                if(data.success){
                    this.newslist = data.list;
                }
            });
        },
        to_page(newsId){
            let param = {};
            param["newsId"] = newsId;
            this.$router.push({path:'/newsDetailview/' + newsId});
        }
    },
    mounted() {
        this.loadNewsList();
    }
}
</script>
