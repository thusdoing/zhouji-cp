<style scoped>
@import '../../assets/header.css';
</style>
<template>
    <div style="height:100%;background:#fff;">
        <div class="header custom-header">
            <wv-flex>
                <wv-flex-item class="custom-left">
                    <div @click="$router.go(-1)" class="brack-icon">
                        <i class="el-icon-arrow-left" slot="icon"></i>
                    </div>
                    <div class="w-20" slot="right"></div>
                </wv-flex-item>
                <wv-flex-item flex="2">
                    <div class="custom-center">
                        <div >新闻</div>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right"></div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <div class="index-main" style="background:#fff;">
            <div v-html="content"></div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            newsId:'',
            content : ''
        }
    },
    methods : {
        loadNewsDetail(){
            this.$api.get('getNewDetail?newsId='+this.newsId).then(data => {
               if(data.success){
                   this.content = data.t;
               }
            });
        }
    },
    mounted() {
        this.newsId = this.$route.params.newsId;
        this.loadNewsDetail();
    }
}
</script>

