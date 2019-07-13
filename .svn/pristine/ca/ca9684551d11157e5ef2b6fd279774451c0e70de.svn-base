<template>
        <div class="db _2Hqge">
            <div class="container ">
                <div class="row _3n4Tb">
                    <div class="col w-20">
                        <span class="AMe2x" @click="$router.push('/')">返回首页</span>
                        <ins class="mh4">|</ins>
                        <div class="dib v-top relative hover-child hover">
                            <span class="AMe2x">全部彩票</span>
                            <div class="gVLrq child">
                                <table class="KXxFS">
                                    <thead>
                                        <tr>
                                            <th v-for="(item,index) in gameList" :key="index+'a'">{{item.gameTypeName}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td v-for="(item,index) in gameList" :key="index+'b'">
                                                <p class="_3n4Tb" v-for="(sub,index) in item.gameSetting" :key="index+'c'" @click="$router.replace(`/bet/${sub.gameType}/${sub.gameNo}/${sub.groupType=='030001'?'official':'credit'}`)">{{sub.gameName}}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col w-80 tr">
                        <div>
                            <template v-if="!($store.state.userInfo.custName&&$store.state.userInfo.custName!='')">
                                <span class="_3n7X0 mr9" @click="pgo('/login')">亲 , 请登陆</span>
                                <span class="_3n7X0 lh-solid pl9 AdnPm" @click="pgo('/register')">用户注册</span>
                            </template>
                            <template v-else>
                                <div class="dib relative fade-child hover fadeIn">
                                    <div  @click="pathgo('/rechargeReport')" class="_3n7X0"><span>{{$store.state.userInfo.custName}}</span></div>
                                </div>
                                <div class="_2tLUB _3n7X0 hover-child hover"><span class="XcVOQ">{{$store.state.msg}}</span>
                                    <div class="_14AuM dn child">
                                        <div class="_1h2P1"><span class="_16EI5 _3Cwbe _3n7X0" @click="pathgo('/userEmail')">我的未读消息 (
                                    <span class="_2hEhF" :class="$store.state.msg>0?'_1xByU':''">{{$store.state.msg}}</span> )
                                            </span><span class="_16EI5 _3Cwbe _3n7X0 _2e1m8" @click="pathgo('/userEmail')">更多</span>
                                            <div class="_2hTc5"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="_1zKCM _3n7X0 hover-child hover"><span class="pr10">我的账户</span><svg class="_1QEeD" width="10px" height="5px" viewBox="0 0 10 5"><use xlink:href="#icon_v"></use></svg>
                                    <div class="_2uT9A dn child">
                                        <div class="_1h2P1"><span class="_16EI5 _3Cwbe _3n7X0" @click="pathgo('/transaction')">投注记录</span><span class="_16EI5 _3Cwbe _3n7X0" @click="pathgo('/dealingsRecord')">交易记录</span><span class="_16EI5 _3Cwbe _3n7X0" @click="pathgo('/account')">个人信息</span><span v-if="dailiFlag" class="_16EI5 _3Cwbe _3n7X0" @click="pathgo('/dailiReport')">代理中心</span><span class="_16EI5 _3Cwbe _3n7X0" @click="pathgo('/security')">安全中心</span></div>
                                    </div>
                                </div>
                                <span class="mr3">余额：</span>
                                <div v-if="show" class="_3nxxz"><span><span>{{$store.state.userInfo.acctAmt}}</span></span><img @click="getAcct" class="_-865F undefined" :class="reload?'whirl':''" src="/static_pc/images/sx.png" width="12" height="11"><i class="pointer"><span @click="show=false">隐藏</span></i></div>
                                <div v-else class="_3nxxz"><span class="mr5">已隱藏</span><i class="pointer"><span @click="show=true">显示</span></i></div>
                                <span class="_3n7X0 ml15" @click="pathgo('/deposit')">充值</span><span class="_3n7X0 mh20" @click="pathgo('/withdraw')">提现</span><span class="_3n7X0" @click="loginOut">退出</span>
                            </template>
                            <i class="_37P1w dib v-top relative hover-child hover">
                                    <div class="_253X4 child">
                                        <table class="KXxFS">
                                            <thead>
                                            <tr>
                                                <th>会员中心</th>
                                                <th>购彩中心</th>
                                                <th>首页</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                <p class="_3n4Tb" v-if="!($store.state.userInfo.custName&&$store.state.userInfo.custName!='')" @click="pathgo('/register')">用户注册</p>
                                                <p class="_3n4Tb" @click="pathgo('/account')">个人信息</p>
                                                <p class="_3n4Tb" @click="pathgo('/deposit')">我要充值</p>
                                                <p class="_3n4Tb" @click="pathgo('/withdraw')">我要提现</p>
                                                <p class="_3n4Tb" @click="pathgo('/dealingsRecord')">交易记录</p>
                                                <p class="_3n4Tb" v-if="dailiFlag" @click="pathgo('/dailiReport')">代理中心</p>
    
                                                </td>
                                                <td>
                                                <p class="_3n4Tb" @click="pgo('/looteryHead')">购彩大厅</p>
                                                <p class="_3n4Tb" @click="pgo('/openNum')">开奖资讯</p>
                                                <p class="_3n4Tb" @click="pgo('/trend')">走势图表</p>
                                                </td>
                                                <td>
                                                <p class="_3n4Tb" @click="pgo('/preferentialActivities')">优惠活动</p>
                                                <p class="_3n4Tb" @click="pgo('/mobilePurchase')">手机购彩</p>
                                                <p class="_3n4Tb" @click="pgo('/')">热门新闻</p>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="_1ufyN" style="background-image:url('/static_pc/images/menu.svg')">网站导航</div>
                                </i>
                                <i class="_1MpZt" @click="tellme" style="background-image:url(/static_pc/img/zxkf.gif)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <script>
    import axios from 'axios'
        export default {
            data() {
                return {
                    gameList: [],
                    show:false,
                    reload:false,
                    dailiFlag:false,
                    homeUrlObj:{}
                }
            },
            created() {
                this.getGameTypeAll()
                this.getMsg()
                this.getAcct()
                if(sessionStorage.getItem('userInfo')){
                    this.dailiFlag = JSON.parse(sessionStorage.getItem('userInfo')).custType=='010701'
                }
            },
            computed:{
                yu_e:function(){
                    return this.$store.state.yu_e
                }
            },
            watch:{
                yu_e:function(){
                    this.getAcct();
                }
            },
            methods: {
                tellme(){
                    if(!sessionStorage.homeUrlObj) return this.getHomeConfig()
                    let KeFuUrl = JSON.parse(sessionStorage.homeUrlObj).KeFu
                    window.open(KeFuUrl,"",'width=620,height=555')
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
                        this.tellme()
                    });
                },
                getGameTypeAll() {
                    let _this = this;
                    this.$http.get('/getGameTypeAll', {
                        params: {
                            gameMode: '030001'
                        }
                    }).then(function(data) {
                        if (data.data.success) {
                            if (data.data.list) {
                                _this.gameList = data.data.list
                                _this.$store.commit('setGameAll',_this.gameList)
                                for (let item of data.data.list) {
                                    if (item.gameType == _this.$route.params.gameType) {
                                        for (let item2 of item.gameSetting)
                                            if (_this.$route.params.gameNo == item2.gameNo) {
                                                _this.$store.commit('setyjf', item2.gamePattern)
                                            }
                                    }
                                }

                            }
                        }
                    });
                },
                pathgo(path) {
                    if (this.$store.state.userInfo.custName && this.$store.state.userInfo.custName != '') {
                        this.$router.push(path)
                    } else {
                        this.$router.push('/register')
                    }
                },
                pgo(path) {
                    this.$router.push(path)
                },
                loginOut(){
                    let _this = this;
                    axios({
                        method: 'get',
                        url: '/loginOut'
                    }).then((data) => {
                        if (data.data.success) {
                            _this.$store.commit('setUserInfo', {});
                            _this.$store.commit('setmap', {});
                            _this.$router.push('/');
                        }
                    });
                },
                getAcct(){
                    this.reload = true
                    let _this = this;
                    // axios({ method: 'get', url: '/getAcct'})
                    this.$store.dispatch('debounce/fetchAcct').then((data) => {
                        this.reload = false
                        if (data.data.success && data.data.t!=null) {
                            _this.$store.commit('setUserInfo', data.data.t)
                            _this.$store.commit('setmap', data.data.map)
                            sessionStorage.setItem('hasWithPwd',data.data.map.hasWithPwd)
                        }else{
                            _this.$store.commit('setUserInfo', {})
                            _this.$store.commit('setmap', {})
                            sessionStorage.setItem('hasWithPwd',false)
                        }
                    });
                },
                getMsg(){
                    let _this = this;
                    axios({
                            method: 'get',
                            url: '/getMsg',
                            params:{msgStatus:'1'},
                        }).then(function(data){
                            if(data.data.success){
                                if(data.data.list != null && data.data.list != undefined){
                                    _this.$store.commit('setmsg',data.data.totalSize)
                                }
                        }
                    });
                },
            },
    
        }
    </script>
    
    <style>
    
    </style>
    