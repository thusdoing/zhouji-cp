<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col mr10 _2rkm8" style="width: 240px; height: 115px;"></div>
                <p class="_1WCuK">您的位置 :
                <span class="_2TEBY" @click="$router.go(-1)">热门新闻</span><span class="_2TEBY"> &gt; {{newsTitle}}</span></p>
                <div class="col _2rkm8" style="width: 750px; min-height: 585px;padding: 15px;line-height: 20px" v-html="newContent">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper';
import vueQR from 'vue-qr';
import axios from 'axios';
export default {
    data() {
        return {
            newContent:'',
            item:{}
        }
    },
    computed: {
        newsTitle() {
            return this.item ? this.item.newsTitle : (sessionStorage.getItem('newsTitle') || '')
        }
    },
    created(){
        this.item = this.$route.params.item
        this.newContent = sessionStorage.getItem('newsobj') || ''
        if ('undefined' == this.newContent) this.newContent = '';
        if (!this.$route.query.type) return this.$router.push({path: '/', replace: true});
        if (this.newContent) return;
        let self = this;
        let newID = sessionStorage.getItem('newsId') || this.$route.query.newsId;
        if (!newID) return this.$router.push({path: '/', replace: true});
        axios.get('/getNewDetail',{params:{newsId:newID}}).then(function(data){
            self.newContent = data.data.t
        });
    },
    mounted() {
        
    },
    methods:{
        
    },
}

</script>


<style lang="less" scoped>
  @import "./index.less";
</style>