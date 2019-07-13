<style lang='less'>
</style>
<template>
    <div>
        <div class="_3RLrM container-fluid" style="background: url('/static_pc/images/mbg.png') 50% center no-repeat;">
            <div class="container relative">
                <img class="_1CKnA" :src="$imgPath(phounUrl)">
                <div class="_30ANI">
                    <h1 class="_17ks1 _2XXvn" style="background-image: url('/static_pc/images/mt.png');">{{$ENV.VUE_APP_NAME}}手机客户端 随时随地快速购彩</h1>
                    <ul class="tc" style="min-height: 235px;">
                        <li class="mo4O3">
                            <a class="db" href="javascript:;">
                                <img src="/static_pc/images/apple.png" height="40">
                            </a>
                            <div class="_3sKYC mt15">
                                <!-- <canvas height="166" width="166" style="height: 166px; width: 166px;"></canvas> -->

                                <vueQR :text="ios" :margin="0" style="height: 166px; width: 166px;"></vueQR>
                            </div>
                        </li>
                        <li class="mo4O3">
                            <a class="db" href="javascript:;">
                                <img src="/static_pc/images/android.png" height="40">
                            </a>
                            <div class="_3sKYC mt15">
                                <!-- <canvas height="166" width="166" style="height: 166px; width: 166px;"></canvas> -->
                                <vueQR :text="and" :margin="0" style="height: 166px; width: 166px;"></vueQR>
                            </div>
                        </li>
                    </ul>
                    <h2 class="_17ks1 _1HQiu" style="background-image: url(/static_pc/images/mf.png);">{{$ENV.VUE_APP_NAME}}手机触屏版 体验流畅无需等待</h2>
                    <a class="_1dETU before-vertical">
                        <img src="/static_pc/images/serch.png" height="33">
                        <span class="v-mid ml20" style="margin-left: 30px;">{{locaurl}}</span>
                    </a>
                    <div class="_3sKYC _3FKFx">
                        <!-- <canvas height="166" width="166" style="height: 166px; width: 166px;"></canvas> -->
                        <vueQR :text="url3" :margin="0" style="height: 166px; width: 166px;"></vueQR>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    import vueQR from 'vue-qr';

    import headerBet from '@/views/betHeader/index.vue'
    import footerCop from '@/views/footer/index.vue'
    import headerCop from '@/views/header/index.vue'
    import leftFloat from '@/views/leftFloat/index.vue'
    import rightFloat from '@/views/rightFloat/index.vue'
    import axios from 'axios'
    export default {
        data() {
            return {
                gameData: [],
                gameMenuData: [],
                arr: null,
                flag: true,
                // url: 'http://www.lmflc.com/lmyl.html',
                // url2: 'http://www.lmflc.com/lmyl.html',
                url3: location.host,
                locaurl: location.host,
                phounUrl: ""
            }
        },
        components: {
            headerBet, footerCop, headerCop, leftFloat, rightFloat, vueQR

        },
        created() {
            this.getBannerConfig()
        },
        watch: {
        },
        computed:{
            ios:function(){
                return this.$store.state.homeUrlObj.ios||location.origin
            },
            and:function(){
                return this.$store.state.homeUrlObj.and||location.origin
            }
        },
        methods: {
            //查询banner的log、和背景图配置
            getBannerConfig() {
                if (sessionStorage.banner) {
                    JSON.parse(sessionStorage.banner).filter((item) => {
                        if (item.imgType == '010404') {
                            this.phounUrl = item.imgPath
                        };
                    });
                    return
                }
                this.$http({
                    method: 'get',
                    url: '/getBannerConfig',
                }).then((res) => {
                    let data = res.data;
                    if (data.success) {
                        sessionStorage.setItem('banner', JSON.stringify(data.list))
                        data.list.filter((item) => {
                            if (item.imgType == '010404') {
                                this.phounUrl = item.imgPath
                            };
                        });
                    }
                });
            },
        },


    }

</script>