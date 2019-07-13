<style scoped>
    @import '../../assets/header.css';
    @import './css/custInfos.css';    
</style>
<template>
    <div>
        <wv-header title="我的账户" class="header"></wv-header>
        <el-main class="index-main" style="margin-top: 0;padding-top: 44px">
            <wv-panel>
                <!-- <wv-media-box thumb="/static/defaultAvatar@3x.png" :title="custInfo.custName" to="/custBaseInfo"></wv-media-box> -->
                <wv-cell :title="custInfo.custName" is-link to="/custBaseInfo" style="margin: 10px 15px; font-size: 24px; font-weight: 400;">
                    <img :src="`/static/avatar/${avatar}.jpg`" slot="icon" class="cell-icon" style="width: 45px; height: 45px; vertical-align: middle;border-radius: 25px;">
                    <span slot="ft" style="font-size: 18px;">设置</span>
                </wv-cell>
            </wv-panel>
            <wv-grid class="main-lider">
                <wv-grid-item to="/betRecordsview">
                    <div class="cust-game-item">
                        <span slot="label">投注中</span>
                    </div>
                    <div class="cust-game-money">
                        <span slot="label">{{userAcctInfo.betAmt.toFixed(2)}}</span>
                    </div>
                </wv-grid-item>
                <wv-grid-item to="/betRecordsview">
                    <div class="cust-game-item">
                        <span slot="label">追号中</span>
                    </div>
                    <div class="cust-game-money">
                        <span slot="label">{{userAcctInfo.additionBetAmt.toFixed(2)}}</span>
                    </div>
                </wv-grid-item>
                <wv-grid-item to="betRecordsview">
                    <div class="cust-game-item">
                        <span slot="label">已中奖</span>
                    </div>
                    <div class="cust-game-money">
                        <span slot="label">{{userAcctInfo.winningAmt.toFixed(3)}}</span>
                    </div>
                </wv-grid-item>
                <wv-grid-item>
                    <div class="cust-game-item">
                        <span slot="label">余额</span>
                        <img @click="userAcctChangeReport" class="_1ZJpc" :class="reload?'whirl':''" src="/static_pc/images/sx.png" width="12" height="11">
                    </div>
                    <div class="cust-game-money">
                        <span slot="label">{{userAcctInfo.acctAmt.toFixed(3)}}</span>
                    </div>
                </wv-grid-item>
            </wv-grid>

            <wv-panel>
                <wv-flex :gutter="10">
                    <wv-flex-item style="text-align: center;margin: 10px 0;border-right: 1px solid #d9d9d9;">
                        <p @click="$router.push('/recharge')">
                            <img style="width: 23px;height: 23px;vertical-align: middle;margin-top: -6px;" src="/static/deposit@2x.png">
                            <span>充值</span>
                        </p>
                    </wv-flex-item>
                    <wv-flex-item style="text-align: center;margin: 10px 0;border-right: 1px solid #d9d9d9;">
                        <p @click="drawMoney()">
                            <img style="width: 23px;height: 23px;vertical-align: middle;margin-top: -6px;" src="/static/withdraw@2x.png">
                            <span>提现</span>
                        </p>
                    </wv-flex-item>
                </wv-flex>
            </wv-panel>



            <wv-panel>
                <!-- <wv-cell title="充值" is-link to="/recharge">
                    <img src="/static/deposit@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="提现" is-link to="/drawMoney">
                    <img src="/static/withdraw@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell> -->
                <wv-cell title="投注记录" is-link to="/betRecordsview">
                    <img src="/static/bettingHistory@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="棋牌游戏记录" is-link to="/kyBetRecords" v-if="chessOpen==1">
                    <img src="/static/kyBetRecords.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="充提记录" is-link to="/rechargeWithList">
                    <img src="/static/depositHistory@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="盈亏查询" is-link to="/rechargeReport">
                    <img src="/static/trend@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="额度转换" is-link to="/quotaTransfer" v-if="chessOpen==1">
                    <img src="/static/money.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
            </wv-panel>

            <wv-panel>
                <wv-cell title="消息" is-link to="/msgList">
                    <img src="/static/message@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="代理中心" is-link to="/agent" v-if="custInfo.custType=='010701'">
                    <img src="/static/daili.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
                <wv-cell title="更多" is-link to="/more">
                    <img src="/static/settings@2x.png" alt="" slot="icon" class="cell-icon">
                </wv-cell>
            </wv-panel>
        </el-main>
        <wv-tabbar :fixed="true" class="footers">
            <wv-tabbar-item @click="to_page('home')">
                <i class="iconfont icon-shouye" slot="icon"></i>
                首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')">
                <i class="iconfont icon-1672jiang" slot="icon"></i>
                开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')">
                <i class="iconfont icon-faxian" slot="icon"></i>
                发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <i class="iconfont icon-lianxikefu" slot="icon"></i>
                客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')" is-on>
                <i class="iconfont icon-wode" slot="icon"></i>
                我的
            </wv-tabbar-item>
        </wv-tabbar>
    </div>
</template>
<script>
import { Dialog } from 'we-vue'
    export default {
        data() {
            return {
                shows: "custInfos",
                custInfo: { custName: '' },
                userAcctInfo: {
                    acctAmt: 0,
                    additionBetAmt: 0,
                    betAmt: 0,
                    betBackAmt: 0,
                    companyAmt: 0,
                    onlineAmt: 0,
                    profitAmt: -0,
                    totalBetAmt: 0,
                    totalRecharge: 0,
                    winningAmt: 0,
                    withAmt: 0
                },
                reload:false,
                avatar:'avatar2',
                chessOpen:"0"
            }
        },
        created() {
            var avatar = localStorage.getItem('avatar')
            if(avatar){this.avatar = avatar}
        },
        methods: {
            to_page(active) {
                this.$router.push({ name: active });
            },
            async drawMoney() {
              if(this.custInfo && !this.custInfo.withStatus){
                  await Dialog({title: '提示信息',message:"请先设置支付密码！",skin: 'ios'});
                  this.$router.push('/settingPayPwd');
                  return;
              }
              this.$router.push('/drawMoney');
            },         

            /** 查询个人用户当天账变信息 */
            userAcctChangeReport() {
                this.reload=true;
                let date = this.$Date(new Date(), 'yyyy/MM/dd');
                date = date + ' 00:00:01';
                this.$api.post('myAcctChangeReport', { startDate: date }).then((data) => {           
                    if (data.t != null) {
                        this.userAcctInfo = data.t;
                        this.reload=false;
                    }
                });
            },
            nima() {
                alert('nima')
            }
        },
        mounted() {
            if (sessionStorage.custInfo != null && sessionStorage.custInfo != undefined && sessionStorage.custInfo != '' &&
                sessionStorage.custInfo != 'null') {
                this.custInfo = JSON.parse(sessionStorage.custInfo);
                this.userAcctChangeReport();
            } else {
                this.$router.push({ name: 'loginview' });
            }
           this.chessOpen=JSON.parse(localStorage.getItem("chessOpen"));
           console.log(this.chessOpen)
        }
    }
</script>
