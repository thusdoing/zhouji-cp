<template>
    <div class="container" style="padding-top: 10px">
        <div style="display: flex;">
            <div class="lnSwiper" style="width: 800px;height: 240px;">
                <swiper v-if="bannerList.length>0" :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in bannerList" :key="index">
                        <a v-if="item.url" :href="item.url" target="_black">
                            <img class="pointer" :src="item.imgPath">
                        </a>
                        <img v-else class="pointer" :src="item.imgPath">
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div style="width: 200px;height: 240px;overflow: hidden;">
                <div class="_12yR2">
                    <h2 class="_2AYqN before-vertical">
                        <img class="_1Ho2U" src="/static_pc/images/f7636ef02f52e56efefc2b928de09f8c.svg">
                        <span class="v-mid">中奖排行榜</span>
                    </h2>
                    <div style="border: 1px solid #d8d8d8;border-top: none;">
                        <div class="_13J6Y">
                            <span class="_33Oib">排行</span>
                            <span class="_33Oib">用户名</span>
                            <span class="_33Oib">奖金</span>
                        </div>
                        <div class="relative overflow-hidden" style="height: 170px;">
                            <div class="absolute left-0 w-100" style="top: -3px; bottom: 0px;">
                                <vueSeamlessScroll v-if="DatagetRank.length>0" :data="DatagetRank" :class-option="ScrollOption">
                                    <div class="_oTNX" v-for="(item,index) in DatagetRank" :key="index">
                                        <span class="wK2hb">
                                            <i :class="[('_390eI'),{'_AT-Z':index<10}]">{{index+1}}</i>
                                        </span>
                                        <span class="wK2hb" v-text="item.name"></span>
                                        <span class="wK2hb">{{item.amt}}</span>
                                    </div>
                                </vueSeamlessScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dividingline"></div>
        <div class="lnmeun">
            <div :class="{active:index==selectIndex}" v-for="(item, index) in gameMenuData" :key="index" @click="selectIndex=index"><h4>{{item.gameTypeName}}</h4></div>
        </div>
        <div class="_2goSw" style="width: 1000px;overflow: hidden;padding: 10px;border: 1px solid #CACACA;border-top: none;">
            <div v-for='item in gameMenuData[selectIndex].gameSetting' class="col w-third _2Iitq" :key="item.gameName">
                <div class="_12glW">
                    <div class="sBVNP">
                        <div class="_1POKy cf">
                            <img :src="$imgPath(item.imgPath)" alt="true" class="fl" width="74px" height="74px" size="2">
                            <div class="_3LmnO">
                                <p class="_2Re5V" style="font-size: 16px;font-weight: 600;color: #444;font-family: PingFang SC;">{{item.gameName}}
                                    <button v-if='item.officialUrl!=null&&item.officialUrl!=""' class="_3-EYQ" type="button" style="height: 16px;">
                                        <a style="color: #fff" :href="item.officialUrl" target="_blank">官方网站</a>
                                    </button>
                                </p>
                                <p class="_2ZJdu">第
                                    <span class="_3XCD2">{{item.openGameNumber}}</span> 期</p>
                                <div style="height: 30px; background: #EFF0F2; margin-top: 10px; margin-right: 10px; border-radius: 4px;line-height: 30px;color: #333;">
                                    {{item.text}}&nbsp;<timer :gameData="item" :timediff="timediff" @end="handleEnd"></timer>
                                </div>
                            </div>
                        </div>
                        <div class="tHg0v">
                            <div class="_58wxB _2SoA4">
                                <p>上期</p>
                                <p>开奖</p>
                            </div>
                            <div class="_58wxB">
                                <template v-if='item.openNo!=null'>
                                    <div v-if='item.gameType=="22"||item.gameType=="33"' class="_1ftWa">
                                        <img class="mr5" :src="'/static_pc/images/saizi/sn'+item.openNo.split(',')[0]+'.png'" width="20">
                                        <img class="mr5" :src="'/static_pc/images/saizi/sn'+item.openNo.split(',')[1]+'.png'" width="20">
                                        <img class="mr5" :src="'/static_pc/images/saizi/sn'+item.openNo.split(',')[2]+'.png'" width="20">
                                    </div>
                                    <div v-if='item.gameType!="22"&&item.gameType!="33"' class="_1ftWa">
                                        <div v-for="sub in item.openNo.split(',')" class="_9sF1B" :class="{'_19qTP':item.gameType=='55','_3_Wwa':item.gameType=='66','_1sIgI':item.gameType=='66'&&ball[sub-1].color=='red','dsmFg':item.gameType=='66'&&ball[sub-1].color=='green','_3feED':item.gameType=='66'&&ball[sub-1].color=='blue'}">{{sub}}</div>
                                    </div>
                                </template>
        
                            </div>
                        </div>
                    </div>
                    <div class="_3GTyw" style="display: flex;">
                        <div class="_3Ag4B" @click="onOpenSM(item.gameType)">
                            <p>玩法说明</p>
                        </div>
                        <div class="_3Ag4B" @click="onOpenQST(item.gameNo)">
                            <p>开奖走势</p>
                        </div>
                        <div class="_3Ag4B _2J9vy">
                            <p @click='gotobet(item)'>立即投注</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           <noticeTanchuang/>
    </div>
</template>

<script>
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    import vueSeamlessScroll from 'vue-seamless-scroll';
    import {ball} from '@/views/betCtTimeHead/ball.js'
    import timer from '../timer.vue'
    import 'swiper/dist/css/swiper.css';
    import noticeTanchuang from '@/components/noticeTanchuang/index.vue';
    export default {
        components:{
            swiper,
            swiperSlide,
            vueSeamlessScroll,
            timer,
            noticeTanchuang
        },
        data(){
            return {
                ball:ball,
                gameMenuData:[{}],
                bannerList:[],
                swiperOption: {
                    loop: true,
                    autoplay: {
                        delay: 3000, //5秒切换一次
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                },
                ScrollOption:{
                    step: 0.5,
                    limitMoveNum: 2
                },
                DatagetRank:[{"name":"yj***","amt":"¥98,576.00"},{"name":"uy***","amt":"¥97,486.00"},{"name":"uo***","amt":"¥89,541.00"},{"name":"2n***","amt":"¥89,124.00"},{"name":"v7***","amt":"¥88,530.00"},{"name":"xw***","amt":"¥88,003.00"},{"name":"ud***","amt":"¥84,622.00"},{"name":"pm***","amt":"¥83,766.00"},{"name":"ck***","amt":"¥82,541.00"},{"name":"gy***","amt":"¥72,146.00"},{"name":"oy***","amt":"¥68,754.00"},{"name":"qx***","amt":"¥65,662.00"},{"name":"a7***","amt":"¥65,177.00"},{"name":"uk***","amt":"¥61,663.00"},{"name":"pj***","amt":"¥54,137.00"},{"name":"48***","amt":"¥53,950.00"},{"name":"ba***","amt":"¥53,537.00"},{"name":"rg***","amt":"¥53,244.00"},{"name":"al***","amt":"¥50,685.00"},{"name":"5t***","amt":"¥46,608.00"},{"name":"q9***","amt":"¥45,018.00"},{"name":"48***","amt":"¥44,747.00"},{"name":"gn***","amt":"¥41,756.00"},{"name":"tp***","amt":"¥41,650.00"},{"name":"k1***","amt":"¥39,430.00"},{"name":"gn***","amt":"¥32,521.00"},{"name":"vx***","amt":"¥31,056.00"},{"name":"vu***","amt":"¥29,942.00"},{"name":"s4***","amt":"¥26,601.00"},{"name":"6h***","amt":"¥22,137.00"},{"name":"cp***","amt":"¥20,837.00"},{"name":"vf***","amt":"¥20,722.00"},{"name":"i7***","amt":"¥16,397.00"},{"name":"dq***","amt":"¥16,038.00"},{"name":"46***","amt":"¥10,947.00"},{"name":"15***","amt":"¥10,745.00"},{"name":"gt***","amt":"¥8,481.00"},{"name":"w9***","amt":"¥4,876.00"},{"name":"hx***","amt":"¥2,232.00"}],
                selectIndex:0,
                timediff:0,
                tuiguangList:[],
               
            }
        },
        created(){
            this.getGameAll()
            this.getBannerConfig()
        },
        methods:{
            getGameAll(){
                this.$http.get('/getGameAll',{params:{isOpenNo:'true'}}).then((data)=>{
                    if(data.data.success){
                        this.timediff = Math.ceil((data.data.list[0].gameSetting[0].curServerTime-Date.now())/1000)
                        console.log(this.timediff)
                        let arr = []
                        data.data.list.forEach(el => {
                            el.gameSetting.forEach(s=>{
                                if(s.recommend==1){
                                    arr.push(s)
                                }
                            })
                        });
                        let obj = {
                            gameType: "00",
                            gameTypeName: "热门",
                            gameSetting:arr
                        }
                        this.gameMenuData = [obj,...data.data.list]
                    }
                });
            },
            
            onOpenSM (gameType) {
                window.open('#/lotteryRules/'+gameType)
            },
            onOpenQST (no) {
                window.open('/static_pc/cpRecode/index.html?game=' + no + '030001')
            },
            gotobet(data){
                let path = '/bet/'+data.gameType+'/'+data.gameNo + '/' + (data.groupType=='030001'?'official':'credit')
                this.$router.push(path)
            },
            handleEnd(item){
                this.gameMenuData.forEach((el,i)=>{
                    el.gameSetting.forEach((s,j)=>{
                        if(s.gameNo == item.gameNo){
                            this.gameMenuData[i].gameSetting[j] = item
                        }
                    })
                })
                this.gameMenuData = this.gameMenuData.concat([])
            },
            //查询banner的log、和背景图配置
            getBannerConfig() {

                this.bannerList =[{
                    // url:"http://www.flcpkjw.com",
                    imgPath:"/static_pc/img/banner01.jpg"
                },
                {
                    // url:"http://www.flcpkjw.com",
                    imgPath:"/static_pc/img/banner02.jpg"
                }]
                // if (sessionStorage.banner) {
                //     this.bannerList = JSON.parse(sessionStorage.banner).filter((item) => {
                //         if (item.imgType == '010402') {
                //             return item
                //         };
                //     });
                //     this.tuiguangList =JSON.parse(sessionStorage.banner).filter((item) => {
                //         if (item.imgType == '010403') {
                //             return item
                //         };
                //     });
                //     return
                // }
                // this.$http({
                //     method: 'get',
                //     url: '/getBannerConfig',
                // }).then((res) => {
                //     let data = res.data;
                //     if (data.success) {
                //         sessionStorage.setItem('banner', JSON.stringify(data.list))
                //         this.bannerList = data.list.filter((item) => {
                //             if (item.imgType == '010402') {
                //                 return item
                //             };
                //         });
                //         this.tuiguangList = data.list.filter((item) => {
                //             if (item.imgType == '010403') {
                //                 return item
                //             };
                //         });
                //     }
                // });
            },
        }
    }
</script>

<style lang="less">
.lnSwiper{
    img{
        width:800px;
        height: 240px;
    }
    .swiper-pagination-bullet-active{
    background: #f90;
  }
}
.dividingline{
    height: 15px;background: linear-gradient(180deg,#C4302E,#E87876);position: relative;
}
.dividingline::after,.dividingline::before{
    content: " ";display: block;
}
.dividingline::after{
    position: absolute;
    left: 0;
    top: 0;
    border-top: 15px solid #fff;
    border-right: 20px solid transparent;
}
.dividingline::before{
    position: absolute;
    right: 0;
    top: 0;
    border-top: 15px solid #fff;
    border-left: 20px solid transparent;
}
.lnmeun{
    display: flex;
    height: 40px;
    background: #F04847;
    color: #fff;
    font-size: 20px;
}
.lnmeun div{
    flex: 1;
    text-align: center;
    position: relative;
}
.lnmeun div h4{
    display: inline-block;
    font-weight: normal;
    padding: 0 12px;
    line-height: 36px;
    margin-top: 4px;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
}
.lnmeun div.active h4{
    background: #fff;
    color: #000;
}
.lnmeun div::after{
    content: " ";
    position: absolute;
    width: 1px;
    height: 16px;
    background: #fff;
    left: 0;
    top: 14px;
}
.lnmeun div:first-child::after{
    content: none
}
</style>