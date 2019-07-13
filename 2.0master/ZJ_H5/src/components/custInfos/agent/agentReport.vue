<template>
    <div>
        <wv-header title="代理报表" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div @click="showtime=true" class="btn-menu" slot="right">
                {{time}}
            </div>
        </wv-header>
        <div class="contentbox">
            <div style="display: flex;">
                <wv-search-bar style="flex: 1" :autofocus="true" v-model="formData.custName" cancel-text=""></wv-search-bar>
                <wv-button @click="serch" type="warn" :mini="true" style="height: 30px;margin: 7px 12px 0 0;">搜索</wv-button>
            </div>
            <wv-grid style="background: #fff;">
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.totalBetAmt||'0.00'}}</p>
                        <h2>投注金额</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.winningAmt||'0.00'}}</p>
                        <h2>中奖金额</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.activityAmt||'0.00'}}</p>
                        <h2>活动礼金</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.betBackAmt||'0.00'}}</p>
                        <h2>团队返点</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.profitAmt||'0.00'}}</p>
                        <h2>团队盈利</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.totalRecharge||'0.00'}}</p>
                        <h2>充值金额</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.withAmt||'0.00'}}</p>
                        <h2>提现金额</h2>
                    </div>
                </wv-grid-item>
               <wv-grid-item>
                    <div class="gridcontent" @click="payCheck">
                        <p>{{agentReport.payNumber||'0'}}</p>
                        <h2>充值人数</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent" @click="check">
                        <p>{{agentReport.rechargeNumber||'0'}}</p>
                        <h2>首冲人数</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent" @click="regCheck">
                        <p>{{agentReport.registerNumber||'0'}}</p>
                        <h2>注册人数</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent" @click="teamBettingDetails">
                        <p>{{agentReport.betNumber||'0'}}</p>
                        <h2>投注人数</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.childrenNumber||'0'}}</p>
                        <h2>下级人数</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.totalAcctAmt||'0.00'}}</p>
                        <h2>团队余额</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.childrenBetBackAmt||'0.00'}}</p>
                        <h2>返点(下级)</h2>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="gridcontent">
                        <p>{{agentReport.selfBetBackAmt||'0.00'}}</p>
                        <h2>返点(自身)</h2>
                    </div>
                </wv-grid-item>
            </wv-grid>
            <actionsheet v-model="showtime" :menus="menus" @on-click-menu="selectime" show-cancel></actionsheet>
        </div>

    </div>
</template>
<script>
    import { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem } from 'vux'
    export default {
        components: { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem },
        data() {
            return {
                formData: {
                    custName: "",
                    startDate: "",
                    endDate: ""
                },
                recordList: [],
                time: '今天',
                loading: false,
                totalSize: 0,
                showtime: false,
                menus: {
                    today: '今天',
                    yestoday: '昨天',
                    tom: '本月',
                    lam: '上月',
                },
                agentReport:{

                }
            }
        },
        created() {
            this.formData.custName = this.$route.params.custName||""
            let todaytime = new Date();
            this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
            this.getAgentTeamReportInterf()
        },
        methods: {
            getAgentTeamReportInterf() {
                this.$api.post('/getAgentTeamReport', this.formData,1).then(data => {
                    if (data.success) {
                        this.agentReport = data.t
                    } else {
                        this.$dialog({ title: '提示', message: data.msg, skin: 'ios' });
                    }
                })
            },
            loadmore() {
                this.formData.pageNo++
                this.getAgentTeamReportInterf()
            },
            serch() {
                this.agentReport = {}
                this.getAgentTeamReportInterf()
            },
            onItemClick(i) {
                if (i === 0) {
                    this.formData.type = "change"
                    this.serch()
                } else if (i == 1) {
                    this.formData.type = "recharge"
                    this.serch()
                } else if (i == 2) {
                    this.formData.type = "with"
                    this.serch()
                }
            },
            selectime(timeval) {
                if (timeval == 'today') {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.endDate = ""
                    this.serch()
                } else if (timeval == 'yestoday') {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + (tod.getDate());
                    this.serch();
                } else if (timeval == 'tom') {
                    this.time = '本月'
                    // let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    // let todaytime = new Date(time);
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + 1;
                    this.formData.endDate = ""
                    this.serch();
                }else if (timeval == 'lam') {
                    this.time = '上月'
                    let time = new Date().getTime();
                    let days = new Date().getDate()+1
                    let stime = new Date(time - 1000 * 60 * 60 * 24 * days);
                    this.formData.startDate = stime.getFullYear() + "/" + (stime.getMonth() + 1) + "/" + 1;

                    let today = new Date()
                    this.formData.endDate = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + 1;
                    this.serch();
                }
            },
            check(){
                if(this.agentReport.rechargeNumber){
                    this.$router.push({path:'/rechargeNumber',query:{form:this.formData} })
                }else{
                    this.$vux.toast.show({
                        position:'middle',
                        type:'text',
                        text: '暂时还没有首冲人数.'
                    })
                }
            },
            payCheck(){
                // if(this.agentReport.payNumber){
                //     this.$router.push({path:'/payNumber',query:{form:this.formData} })
                // }else{
                //     this.$vux.toast.show({
                //         position:'middle',
                //         type:'text',
                //         text: '暂时还没有充值人数.'
                //     })
                // }
            },
            teamBettingDetails(){
                if(this.agentReport.payNumber){
                    this.$router.push({path:'/teamBettingDetails',query:{form:this.formData} })
                }else{
                    this.$vux.toast.show({
                        position:'middle',
                        type:'text',
                        text: '暂时还没有投注人数.'
                    })
                }
            },
            regCheck(){
                if(this.agentReport.registerNumber){
                    this.$router.push({path:'/registerNumber',query:{form:this.formData} })
                }else{
                    this.$vux.toast.show({
                        position:'middle',
                        type:'text',
                        text: '暂时还没有注册人数.'
                    })
                }
            }
        },
        mounted() {

        },
        filters: {
            custType: function (val) {
                if (val == '010701') {
                    return '代理'
                } else if (val == '010703') {
                    return '玩家'
                }
            },
            status: function (value) {
                if (isNaN(value)) {
                    return value
                }
                if (value == '010604' || value == '010601') {
                    return '充值中'
                } else if (value == '010602') {
                    return '充值成功'
                } else if (value == '010603') {
                    return '充值失败'
                } else if (value == '010501') {
                    return '处理中'
                } else if (value == '010502') {
                    return '提现成功'
                } else if (value == '010503') {
                    return '提现失败'
                } else if (value == '010201') {
                    return '公司操作'
                } else if (value == '010202') {
                    return '在线支付'
                } else if (value == '010203') {
                    return '人工操作'
                } else if (value == '010204') {
                    return '快捷支付'
                }

            }
        }
    }
</script>
<style scoped>
    @import '../../../assets/header.css';
    .gridcontent {
        text-align: center;
    }

    .gridcontent p {
        color: #ff6818;
        font-size: 14px;
        line-height: 2.5
    }

    .gridcontent h2 {
        font-size: 16px;
        font-weight: normal;
    }
</style>