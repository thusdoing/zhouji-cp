<style lang='less' scoped>
    ._19vt7 {
        width: 70px;
        top: 1px;
        right: 1px;
    }

    ._19vt7 img {
        width: 70px;
        height: 28px;
    }

    ._19vt7 ._3QYI3 {
        width: 70px;
        height: 28px;
    }

    .balance_label {
        cursor: pointer;
    }
</style>
<template>
    <div class="by-Gjh">
        <div class="header">
            <rightFloat :left='left'></rightFloat>
            <leftFloat :left='left'></leftFloat>
            <header class="container-fluid">
                <div class="_2jIVM">
                    <div class="container">
                        <div class="col w-50"></div>
                        <div class="col w-50 tr">
                            <ul>
                                <li class="ECLbm">
                                    <a id="bookmark-this" @click="addBookmark">加入收藏</a>
                                </li>
                                <!-- <li class="ECLbm">
                                    <a id="bookmark-this" @click="openproxy">代理登录</a>
                                </li> -->
                                <li class="ECLbm" @click="tellme">联系客服

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div :class="$route.name == 'homeView'?['aWv_N',{'_1MbJj' : expansion}]:'aWv_N'">
                    <div class="B_VMr">
                        <div class="_1krRI" style="background-image: url(&quot;/static_pc/images/top_img.png&quot;);"></div>
                        <div class="container relative h-100 ">
                            <img class="_2OdBu" @click="expansion=false" src="/static_pc/images/855c691e47baa045ec99dc39db06a0ba.svg">
                        </div>
                    </div>
                    <div class="container relative">
                        <!-- <div v-if='$route.name == "homeView"' class="_2_ZJa" @click="expansion=true">
                            <img class="RE-o_"
                                 src="/static_pc/images/ee8ab7c376c5e0cbeb1a61065ee73bd9.svg">
                        </div> -->
                    </div>
                </div>
                <div ref="middle" class="container _1Gez4">
                    <div class="relative fl h-100 overflow-hidden before-vertical">
                        <img class="_1XEjm" style="margin-left:0;width:360px;" @click="$router.push('/')" :src="$imgPath(logo[0]&&logo[0].imgPath)">
                        <i class="_37Jzr"></i>
                    </div>

                    <div class="overflow-hidden tr h-100 before-vertical">
                        <div v-if="$store.state.userInfo.custName!=null&&$store.state.userInfo.custName!=undefined&&$store.state.userInfo.custName!=''"
                            class="dib v-mid">
                            <div>
                                <div>
                                    <p class="di">欢迎
                                        <span class="pl8">{{$store.state.userInfo.custName}}</span>
                                    </p>
                                    <p class="di ml10" ref="balance">余额 :
                                        <span class="pl5">{{$store.state.userInfo.acctAmt}}</span>
                                        <img @click="getAcct" class="_1ZJpc" :class="reload?'whirl':''" src="/static_pc/images/sx.png" width="12" height="11">
                                    </p>
                                    <span class="pl5 balance_label" @click="balanceDisplay">{{balanceLabel}}</span>
                                    <ul class="di mr5 ml9">
                                        <li class="_2k6Ns" @click="$router.push('/account')">会员中心</li>
                                        <li class="_2k6Ns" @click="$router.push('/deposit')">充值</li>
                                        <li class="_2k6Ns" @click="$router.push('/withdraw')">提现</li>
                                        <li class="_2k6Ns" @click="loginOut">登出</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div v-else class="dib v-mid">
                            <div>
                                <form class="mr15" @keydown.enter="login">
                                    <div class="_3jQNw">
                                        <img class="_22UEV" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAMAAAAfOR5kAAAAXVBMVEVMaXHMzMyfn5+fn5+fn5+ioqKhoaGfn5+fn5+goKCqqqqfn5+goKCqqqqzs7OgoKCqqqqgoKChoaGgoKCnp6ehoaGgoKChoaGgoKCfn5+hoaGmpqahoaGgoKCqqqpvpAYGAAAAH3RSTlMABb2tyhZEwMKrD7CpCQpZA3Zi3B2Kx1GsxTYUOcMVw/nnmgAAAF5JREFUGBndwVcWQDAUQMGrhITove5/mfLhCG8JZvgpZeLYKKQogSRCCEKcMOAry3HyDEHjaKRhgmlAOruy7Da+6nasoBrbmpdeNwVO0egeb965rQbv4LHg2fRh+aEL70IDNzg6zooAAAAASUVORK5CYII="
                                            alt="true">
                                        <div class="dib relative">
                                            <input v-model='formData.custName' type="text" ref="input" class="KZzVO undefined" placeholder="账号" maxlength="12" name="account"
                                                value="">
                                            <span class="_1HZIJ">
                                                <span>
                                                    <span>输入框</span>不能为空</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="_3jQNw">
                                        <img class="_22UEV" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAMAAAAfOR5kAAAANlBMVEVMaXGgoKCgoKChoaGfn5+fn5+fn5+goKCfn5+fn5+xsbGgoKCjo6OgoKCgoKCgoKCioqKgoKDQjVJwAAAAEnRSTlMA3Lui2tCwzMDVDasn889GR9meTa7BAAAAUklEQVQoz2NgGJ6Ak4WdXZATQ5gVTqAADjiBAMzs7Lzs7GCCGUmYkQvG4mJEN4GHB90cMJubG6swExNWYTY2rMIC/OjCfGjeQvI5BLBwDseYBQBlBAHQi8yn3gAAAABJRU5ErkJggg=="
                                            alt="true">
                                        <div class="dib relative">
                                            <input v-model='formData.pwd' type="password" class="KZzVO undefined" placeholder="密码" maxlength="12" autocomplete="new-password"
                                                name="password" value="">
                                            <span class="_1HZIJ">
                                                <span>
                                                    <span>输入框</span>不能为空</span>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- 验证码 -->

                                    <div class="_3jQNw">
                                        <div class="dib relative">
                                            <input v-model='formData.verCode' style="padding-left: 6px;" type="text" class="KZzVO undefined" placeholder="验证码" maxlength="4">
                                            <span class="_19vt7">
                                                <p @click='getVerCode' class="_3QYI3">刷新</p>
                                                <img :src="codepath" width="50" height="auto">
                                            </span>
                                        </div>
                                    </div>


                                    <div class="_366Ao">
                                        <button @click='login' class="_3HiEs _30pQT" type="button">
                                            登陆
                                        </button>
                                        <button @click='$router.push("/register")' class="_3HiEs _1r0ye" type="button">
                                            注册
                                        </button>
                                        <span class="_2c_jl" @click="$router.push('/forgetpwd')">
                                            忘记密码
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="_2HRBK">
                    <div class="container h-100">
                        <div class="_16sLC hover-child hover vertical-whirl" :class="$route.name == 'homeView'?'whirl--active':''">
                            <img class="_2nJvl" src="/static_pc/images/hotl.svg">
                            <h2 class="_1bE4B v-mid">热门彩种</h2>
                            <img v-if="$route.name != 'looteryHead'&&$route.name != 'homeView'&&$route.name!='news'" class="fr mr14 whirl-child" src="/static_pc/images/xia.svg"
                                height="40" width="20">
                            <div v-if="$route.name != 'looteryHead'" class="_2JLyz child undefined" :class="$route.name == 'homeView'||$route.name =='news'?'undefined':'dn'">
                                <hotLottery :data="hotLotteryData"></hotLottery>
                            </div>
                        </div>
                        <ul class="overflow-hidden" :class="{menutrigger:qipaiFlag}">
                            <li class="aTWla" :class="$route.name=='homeView'?'_2F6RE':''" @click="$router.push('/homeView')">首页
                            </li>
                            <li class="aTWla" :class="$route.name=='looteryHead'?'_2F6RE':''" @click="$router.push('/looteryHead')">购彩大厅
                                <img class="_3Qkx-" src="/static_pc/images/hot.gif" alt="true">
                            </li>
                            <li class="aTWla" v-if="qipaiFlag" :class="$route.name=='qipai'?'_2F6RE':''" @click="$router.push('/qp')">棋牌游戏
                                <img class="_3Qkx-" src="/static_pc/images/hot.gif" alt="true">
                            </li>
                            <li class="aTWla" :class="$route.name=='mobilePurchase'?'_2F6RE':''" @click="$router.push('/mobilePurchase')">手机购彩
                                <img class="_3Qkx-" src="/static_pc/images/hot.gif" alt="true">
                            </li>
                            <li class="aTWla" :class="$route.name=='preferentialActivities'?'_2F6RE':''" @click="$router.push('/actives')">优惠活动
                            </li>
                            <li class="aTWla" :class="$route.name=='trend'?'_2F6RE':''" @click="$router.push('/trend')">
                                走势图表
                            </li>
                            <li class="aTWla" :class="$route.name=='openNum'?'_2F6RE':''" @click="$router.push('/openNum')">
                                开奖资讯
                            </li>
                            <li class="aTWla" :class="$route.name=='notice'?'_2F6RE':''" @click="$router.push('/notice')">
                                最新公告
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <router-view></router-view>
            <footer-cop></footer-cop>
        </div>
    </div>
</template>

<script>
    import hotLottery from '@/views/hotLottery/index.vue';
    import leftFloat from '@/views/leftFloat/index.vue'
    import rightFloat from '@/views/rightFloat/index.vue'
    import footerCop from '@/views/footer/index.vue'
    import addBookmark from '../../assets/js/addBook.js'
    import axios from 'axios'
    export default {
        components: {
            hotLottery,
            leftFloat,
            rightFloat,
            footerCop
        },
        data() {
            return {
                expansion: false,
                formData: {
                    custName: '',
                    pwd: '',
                    verCode: ''
                },
                codepath: '',
                left: null,
                hotLotteryData: [],
                balanceIS: true,
                balanceLabel: '隐藏',
                show: 1,
                reload: false,
                logo: [],
                homeUrlObj:{}
            }
        },
        created() {
            this.getHeadConfig()
            this.GethotLottery()
            this.getAcct();
            this.getVerCode()
            this.getBannerConfig()
            this.getHomeConfig()
        },
        computed: {
            betS: function () {
                return this.$store.state.betSta
            },
            yu_e: function () {
                return this.$store.state.yu_e
            },
            KeFu:function(){
                return this.$store.state.homeUrlObj.KeFu
            },
            dl:function(){
                return this.$store.state.homeUrlObj.dl
            },
            qipaiFlag:function(){
                return this.$store.state.qipaiFlag
            }
        },
        watch: {
            betS: function () {
                this.$refs.input.focus()
                this.$Modal.warning({
                    title: "系统提示",
                    content: "投注请先完成登录"
                });
            },
            yu_e: function () {
                this.getAcct();
            }
        },
        methods: {
            tellme() {
                if (!this.KeFu) {
                    return
                }
                window.open(this.KeFu)
            },
            openproxy() {
                if (!this.dl) {
                    alert('代理还未开放，敬请期待中...')
                    return
                }
                window.open(this.dl)
            },
            onOpenQST() {
                window.open('/static_pc/cpRecode/index.html?game=' + '1111' + '030001')
            },
            addBookmark() {
                addBookmark()
            },
            getVerCode() {
                this.codepath = "getVerCode?w=100&h=45&date=" + new Date().getTime();
            },
            async login() {
                let _this = this;
                 const rsp = await this.$tools.fetch('/api/login').setCrypto(true).post({ ...this.formData});
                if (!rsp.success) {
                    this.getVerCode();
                    if (rsp.message) return this.$Modal.error({ title: '系统错误', content: rsp.message })
                    return;
                }     
                       
                sessionStorage.setItem('userInfo',JSON.stringify(rsp.data.t))
              
                this.getAcct();

                if (this.$route.path == '/login') this.$router.push({ path: '/', replace: true});

                // if (rsp) return;
                //const r = axios({ method: 'post', url: '/login', data: this.$transformRequest(_this.formData) });
                
                // const r = Promise.resolve({data: { success: true, msg: rsp.message, ...rsp.data}});
                // r.then(function (data) {
                //     console.log(data)
                //     if (data.data.success) {
                //         console.log(JSON.stringify(data.data.t))
                //         sessionStorage.setItem('userInfo',JSON.stringify(data.data.t))
                //         _this.getAcct();
                //         if (data.data.map != null && data.data.map.notice != null) {
                //             _this.$Spin.show({
                //                 render: (h) => {
                //                     return h('div', {
                //                         style: {
                //                             width: '500px',
                //                             height: '390px',
                //                             background: "#fff",
                //                             borderRadius: '8px',
                //                         }
                //                     }, [
                //                             h('h1', {
                //                                 style: {
                //                                     fontSize: '18px',
                //                                     fontWeight: 'normal',
                //                                     padding: '10px',
                //                                     color: '#2e4158',
                //                                     borderBottom: '1px solid #aaa',

                //                                 }
                //                             }, data.data.map.notice.noticeTitle),
                //                             h('div', {
                //                                 style: {
                //                                     height: '300px',
                //                                     textAlign: 'left',
                //                                     padding: '15px',
                //                                     color: '#2e4158',
                //                                     fontSize: '14px',
                //                                     letterSpacing: '1px',
                //                                     lineHeight: '20px',
                //                                     overflow: 'auto'
                //                                 },
                //                                 domProps: {
                //                                     innerHTML: data.data.map.notice.noticeContent.split(/\s+/).join('<br>')
                //                                 },
                //                             }),
                //                             h('Button', {
                //                                 props: {
                //                                     type: "primary"
                //                                 },
                //                                 on: {
                //                                     click: () => {
                //                                         _this.$Spin.hide()
                //                                     }
                //                                 },
                //                                 style: {
                //                                     backgroundColor: '#2e4158',
                //                                     borderColor: '#2e4158',
                //                                 }
                //                             }, "关闭"),
                //                         ])
                //                 }
                //             });
                //         }
                //         _this.$router.push({
                //             name: "skip",
                //             params: {
                //                 gopath: "/"
                //             }
                //         })
                //     } else {
                //         _this.$Modal.error({
                //             title: '系统错误',
                //             content: data.data.msg
                //         })
                //         _this.getVerCode()
                //     }
                // });
            },
            loginOut() {
                let _this = this;
                axios({
                    method: 'get',
                    url: '/loginOut'
                }).then((data) => {
                    if (data.data.success) {
                        if (sessionStorage) sessionStorage.clear()
                        _this.$store.commit('setUserInfo', {});
                        _this.$store.commit('setmap', {});
                        _this.formData = {
                            custName: '',
                            pwd: '',
                            verCode: ''
                        };
                        _this.$router.push('/');
                        _this.getVerCode()
                    }
                });
            },
            //            获取用户基本信息
            getAcct() {
                this.reload = true
                let _this = this;
                // axios({ method: 'get', url: '/getAcct'})
                this.$store.dispatch('debounce/fetchAcct').then((data) => {
                    this.reload = false
                    if (data.data.success && data.data.t != null) {
                        _this.$store.commit('setUserInfo', data.data.t)
                        _this.$store.commit('setmap', data.data.map)
                        sessionStorage.setItem('hasWithPwd', data.data.map.hasWithPwd)
                    } else {
                        _this.$store.commit('setUserInfo', {})
                        _this.$store.commit('setmap', {})
                        sessionStorage.setItem('hasWithPwd', false)
                    }
                });
            },
            balanceDisplay() {
                if (this.balanceIS) {
                    this.$refs.balance.style.display = 'none';
                    this.balanceIS = false;
                    this.balanceLabel = '显示';
                } else {
                    this.$refs.balance.style.display = 'inline';
                    this.balanceIS = true;
                    this.balanceLabel = '隐藏';
                }
            },
            //获取热门彩种数据
            GethotLottery() {
                axios({
                    method: 'get',
                    url: '/getRecommendGame',
                    params: {
                        pageSize: 13,
                    }
                }).then((res) => {
                    let data = res.data;
                    if (data.records && data.records.length > 0) {
                        this.hotLotteryData = data.records;
                    }
                });
            },
            getHeadConfig() {
                axios({
                    method: 'get',
                    url: '/getHeadConfig',
                }).then((res) => {
                    if(res.data.success){
                        (res.data.list||[]).map(el=>{
                            if(el.codeKey=='chessOpen'&&el.codeValue=='1'){
                                this.$store.commit('setqipaiFlag')
                            }
                            if(el.codeKey=='lxbOpen'&&el.codeValue=='1'){
                                this.$store.commit('setlxbFlag')
                            }

                        })
                    }
                });
            },
            getBannerConfig() {
                if (sessionStorage.banner) {
                    this.logo = JSON.parse(sessionStorage.banner).filter((item) => {
                        if (item.imgType == '010401') {
                            return item
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
                        this.logo = data.list.filter((item) => {
                            if (item.imgType == '010401') {
                                return item
                            };
                        });
                    }
                });
            },
            getHomeConfig() {
                if (sessionStorage.homeUrlObj) {
                    this.homeUrlObj = JSON.parse(sessionStorage.homeUrlObj)
                    this.$store.commit('homeUrlObj', JSON.parse(sessionStorage.homeUrlObj))
                    return
                }
                axios({
                    method: 'get',
                    url: '/getHomeConfig',
                }).then(res => {
                    if (res.data.success) {
                        this.homeUrlObj.and = (res.data.list.find(el => { return el.codeKey == 'qrCodeUrl_android' })||{}).codeValue || location.origin
                        this.homeUrlObj.ios = (res.data.list.find(el => { return el.codeKey == 'qrCodeUrl_ios' })||{}).codeValue || location.origin
                        this.homeUrlObj.dow = (res.data.list.find(el => { return el.codeKey == 'qrCodeUrl' })||{}).codeValue || location.origin
                        this.homeUrlObj.qqKeFu = (res.data.list.find(el => { return el.codeKey == 'qqCustomService' })||{}).codeValue || ""
                        this.homeUrlObj.KeFu = (res.data.list.find(el => { return el.codeKey == 'clientCustomService' })||{}).codeValue || ""
                        this.homeUrlObj.dl = (res.data.list.find(el => { return el.codeKey == 'dlLoginUrl' })||{}).codeValue || ""
                        this.homeUrlObj.line = (res.data.list.find(el => { return el.codeKey == 'lineSenseUrl' })||{}).codeValue || ""
                        this.$store.commit('homeUrlObj', this.homeUrlObj)
                        sessionStorage.setItem('homeUrlObj', JSON.stringify(this.homeUrlObj))
                    }
                });

            },
        },
        mounted() {

        }
    }

</script>
<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .ivu-spin-fix {
        background-color: rgba(255,255,255, .4);
    }
    .menutrigger .aTWla{
        width: 12.5%
    }
</style>
