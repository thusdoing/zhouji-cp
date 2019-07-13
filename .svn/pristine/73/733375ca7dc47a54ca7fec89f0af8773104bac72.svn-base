<style lang='less'>
    .ivu-tooltip-inner {
        max-width: 1000px;
    }

    .ivu-page-item-active {
        background-color: #c60a0a;
    }
</style>
<template>
    <div>
        <div class="container _3C0St">
            <div class="row">
                <div class="fl mr10 _1wv6M" style="width: 150px;">
                    <aside class="_3pPe8">
                        <ul class="SaG6V _3MUu8">
                            <h3 class="rL7Id p2_title">
                                <i class="iconfont icon-yonghu1"></i> 账号管理
                            </h3>
                            <li @click="$router.push('/register')" v-if="$store.state.userInfo.custNo==undefined">注册</li>
                            <li @click="$router.push('/account')" v-if="$store.state.userInfo.custNo!=undefined">个人信息</li>
                            <!-- <li @click="$router.push('/myInvitation')" v-if="$store.state.userInfo.custNo!=undefined">我的推广</li> -->
                            <li @click="$router.push('/security')" v-if="$store.state.userInfo.custNo!=undefined">安全中心</li>
                            <li @click="$router.push('/bankAccount')" v-if="$store.state.userInfo.custNo!=undefined">银行卡管理</li>
                        </ul>
                        <ul class="SaG6V _3MUu8" v-if="$store.state.userInfo.custNo!=undefined">
                            <h3 class="rL7Id p2_title">
                                <i class="iconfont icon-qiandai"></i> 投注管理
                            </h3>
                            <li @click="$router.push('/transaction')">投注记录</li>
                            <li @click="$router.push('/seekOrder')">追号记录</li>
                        </ul>
                        <ul class="SaG6V _3MUu8" v-if="$store.state.userInfo.custNo!=undefined">
                            <h3 class="rL7Id p2_title">
                                <i class="iconfont icon-zijinguanli"></i> 资金管理
                            </h3>
                            <li v-if="lxbFlag" @click="$router.push('/lixibao')">利息宝</li>
                            <li v-if="qipaiFlag" @click="$router.push('/quotaTransfer')">额度转换</li>
                            <li @click="$router.push('/dealingsRecord')">交易记录</li>
                            <li @click="$router.push('/rechargeReport')">盈亏查询</li>
                        </ul>

                        <ul class="SaG6V _3MUu8" v-if="$store.state.userInfo.custNo!=undefined&&custType=='010701'">
                            <h3 class="rL7Id p2_title">
                                <img src="/static_pc/images/daili.svg" style="width: 18px;height: 16px;vertical-align: bottom;"> 代理中心
                            </h3>
                            <li @click="$router.push('/dailiExplain')">代理说明</li>
                            <li @click="$router.push('/dailiReport')">代理报表</li>
                            <li @click="$router.push('/dailiSubReport')">下级报表</li>
                            <li @click="$router.push('/dailiSubRegister')">下级开户</li>
                            <li @click="$router.push('/dailimemberManage')">会员管理</li>
                            <li @click="$router.push('/dailibetDetail')">投注明细</li>
                            <li @click="$router.push('/dailiTransactionDetail')">交易明细</li>
                        </ul>
                        <ul class="SaG6V">
                            <h3 class="rL7Id p2_title">
                                <i class="iconfont icon-email"></i> 消息管理
                            </h3>
                            <li @click="$router.push('/userEmail')" v-if="$store.state.userInfo.custNo!=undefined">站内信({{strmsgNum}})</li>
                            <li @click="back"> 网站公告({{getData.length}})</li>
                        </ul>
                    </aside>
                </div>
                <div v-if='$route.name=="notice"'>
                    <div class="fl mb12 _2WJqO" style="width: 840px;">
                        <p>消息管理 - 网站公告
                        </p>
                    </div>

                    <div class="_3wioq fl" style="width: 840px;">
                        <div v-if='content==null' class="_1zO3c">
                            <div v-for='(item,index) in getData' @click='read(index)' :key="index+'a'" class="_1vCk6">
                                <span v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.releaseDate}" class="fr"></span>
                                <div class="overflow-hidden pr10">
                                    <p class="_1yOQh ellipsis _3fyl5">{{item.noticeTitle}}</p>
                                </div>
                            </div>

                            <div>
                                <p class="pv20 fl">共
                                    <span class="_3R28O">{{getData.length}}</span>条记录</p>
                                <div class="fr mt8 mr50">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="_2WSS3">
                            <div class="_2uGJz">
                                <p class="fw6">{{content.noticeTitle}}</p>
                                <p v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:content.insertDate }" class="mt20 mb15"></p>
                            </div>
                            <div class="_1KwCl">{{content.noticeContent}}</div>
                            <button class="_1sc4M MlJLf" @click="back" type="button">返回</button>
                        </div>
                    </div>
                </div>


                <router-view v-else></router-view>

            </div>
        </div>
        <Modal v-model="setbankM" width="180" :closable="false" class-name="vertical-center-modal">

            <h1 style="text-align: center;padding: 20px 0 10px">你还没有设置支付密码</h1>
            <div slot="footer">
                <Button @click="setbankM=false" style="float:left">不想去</Button>
                <Button type="success" @click="$router.push('/editSecurePass')">去设置</Button>
            </div>
        </Modal>

    </div>
</template>
<style lang="less">
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>

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
                setbankM: false,
                getData: [],
                arr: null,
                flag: true,
                url: 'http://www.lm699.com',
                current: null,
                content: null,
                msgNum: 0,
                custType:''
            }
        },
        components: {
            headerBet, footerCop, headerCop, leftFloat, rightFloat, vueQR

        },
        created() {
            this.getNotice();
            this.getMsg();
            if (this.$store.state.userInfo.userName) {
                if (sessionStorage.getItem('hasWithPwd') == "false" && this.$route.name != 'security' && this.$route.name != 'bankAccount' && this.$route.name != 'withdraw') {
                    this.setbankM = true
                }
            }

        },
        watch: {
        },
        computed: {
            strmsgNum: function () {
                return this.$store.state.msg
            },
            qipaiFlag:function(){
                return this.$store.state.qipaiFlag
            },
            lxbFlag:function(){
                return this.$store.state.lxbFlag
            }
        },
        methods: {
            getNotice() {
                let _this = this;
                // axios.get('/getNotice')
                this.$store.dispatch("debounce/fetchNotice").then(function (data) {
                    if (data.data.success) {
                        if (data.data.list != null && data.data.list != undefined) {
                            _this.getData = data.data.list
                        }
                    }
                    let noticeNo = sessionStorage.getItem('notice');
                    if (noticeNo != null) {
                        _this.read(noticeNo);
                    }
                    sessionStorage.removeItem('notice')
                });
            },
            read(index) {
                this.content = this.getData[index]
            },
            back() {
                this.content = null;
                this.$router.push('/notice')
            },
            getMsg() {
                let _this = this;
                axios({
                    method: 'get',
                    url: '/getMsg',
                    params: { msgStatus: '1' },
                }).then(function (data) {
                    if (data.data.success) {
                        if (data.data.list != null && data.data.list != undefined) {
                            _this.msgNum = data.data.totalSize;
                            _this.$store.commit('setmsg', data.data.totalSize)
                        }
                    }
                });
            },


        },
       async mounted() {
           
            if(sessionStorage.userInfo){
                this.custType = JSON.parse(sessionStorage.userInfo).custType
            }else{
                const rsp = await this.$store.dispatch('author/fetchOnlineSession');	
                const { isOk, data } = rsp;
                if (!isOk) return
                if ( isOk && data.t != null)  sessionStorage.setItem("userInfo",JSON.stringify(data.t));
                this.custType = JSON.parse(sessionStorage.userInfo).custType
            }
           
        },

    }

</script>
