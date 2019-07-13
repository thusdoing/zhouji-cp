<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>代理报表
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;min-height:654px;padding-top: 20px;">
            <Tabs type="card" @on-click="selectTime" :animated="false">
                <TabPane label="今天"></TabPane>
                <TabPane label="昨天"></TabPane>
                <TabPane label="本月"></TabPane>
                <TabPane label="上月"></TabPane>
            </Tabs>
            <div>
                <Input placeholder="下级报表查询" v-model="formData.custName" style="width: 120px;margin-left: 15px;"></Input>
                <Button type="primary" @click="getAgentTeamReport" style="background-color: #2e4158;border-color: #2e4158;">搜索</Button>
            </div>
            <div class="fl _3K_Po" style="width: 790px; height: 90px;margin: 25px 15px 0;">
                <div style="padding: 21px 0px;">
                    <div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.totalBetAmt||"0.00"}}</p>
                        <p class="_1tmvU">投注金额</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.winningAmt||"0.00"}}</p>
                        <p class="_1tmvU">中奖金额</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.activityAmt||"0.00"}}</p>
                        <p class="_1tmvU">活动礼金</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.betBackAmt||"0.00"}}</p>
                        <p class="_1tmvU">团队返点</p>
                    </div><!-- 
                    --><div class="_2-AM5 w-20">
                        <p class="_1BjB1 bule">{{agentReport.profitAmt||"0.00"}}</p>
                        <p class="_1tmvU">团队盈利</p>
                    </div>
                </div>
            </div>
            <div class="fl _3K_Po" style="width: 790px; height: 90px;margin: 25px 15px 0;">
                <div style="padding: 21px 0px;">
                    <div class="_2-AM5 _2d6HE w-20" @click="godailiDetails('betUser')">
                        <p class="_1BjB1 bule">{{agentReport.betNumber||"0"}}</p>
                        <p class="_1tmvU">投注人数</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20" @click="godailiDetails('first')">
                        <p class="_1BjB1 bule">{{agentReport.rechargeNumber||"0"}}</p>
                        <p class="_1tmvU">首充人数</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20" @click="godailiDetails('register')">
                        <p class="_1BjB1 bule">{{agentReport.registerNumber||'0'}}</p>
                        <p class="_1tmvU">注册人数</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.childrenNumber||"0"}}</p>
                        <p class="_1tmvU">下级人数</p>
                    </div><!-- 
                    --><div class="_2-AM5 w-20">
                        <p class="_1BjB1 bule">{{agentReport.totalAcctAmt||"0.00"}}</p>
                        <p class="_1tmvU">团队余额</p>
                    </div>
                </div>
            </div>
            <div class="fl _3K_Po" style="width: 790px; height: 90px;margin: 25px 15px 0;">
                <div style="padding: 21px 0px;">
                    <div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.payNumber||"0"}}</p>
                        <p class="_1tmvU">充值人数</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.totalRecharge||"0.00"}}</p>
                        <p class="_1tmvU">充值金额</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.withAmt||"0.00"}}</p>
                        <p class="_1tmvU">提现金额</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.childrenBetBackAmt||'0.00'}}</p>
                        <p class="_1tmvU">返点(下级)</p>
                    </div><!-- 
                    --><div class="_2-AM5 _2d6HE w-20">
                        <p class="_1BjB1 bule">{{agentReport.myBetBackAmt||"0.00"}}</p>
                        <p class="_1tmvU">返点(自身)</p>
                    </div><!-- 
                    --><div class="_2-AM5 w-20">
                        <p class="_1BjB1 bule"></p>
                        <p class="_1tmvU"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import axios from 'axios'
    export default {
        components: {},
        data() {
            return {
                formData: {
                    custName: "",
                    startDate: "",
                    endDate: ""
                },
                agentReport:{},
                time:''
            }
        },
        created() {
            
        },
        watch: {

        },
        methods: {
            selectTime(num) {
                if (num == 0) {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.endDate = ""
                    this.getAgentTeamReport()
                } else if (num == 1) {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + (tod.getDate());
                    this.getAgentTeamReport();
                } else if (num == 2) {
                    this.time = '本月'
                    // let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + 1;
                    this.formData.endDate = ""
                    this.getAgentTeamReport();
                }else if (num == 3) {
                    this.time = '上月'
                    let time = new Date().getTime();
                    let days = new Date().getDate()+1
                    let stime = new Date(time - 1000 * 60 * 60 * 24 * days);
                    this.formData.startDate = stime.getFullYear() + "/" + (stime.getMonth() + 1) + "/" + 1;

                    let today = new Date()
                    this.formData.endDate = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + 1;
                    this.getAgentTeamReport();
                }
            },
            getAgentTeamReport() {
                this.agentReport = {}
                axios.post('/getAgentTeamReport', this.formData).then(data => {
                    if (data.data.success) {
                        this.agentReport = data.data.t
                    } else {
                        this.$Modal.error({ title: '提示', content: data.data.msg });
                    }
                })
            },
            godailiDetails(type){
                this.$router.push({name:'dailifistRechage',params:{form:this.formData,type:type}})
            },
        },
        mounted() {
            this.formData.custName = this.$route.params.custName||''
            this.selectTime(0)
        }

    }
</script>
<style>
    ._3wioq .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
        margin: 0;margin-left: 15px;
    }
    ._1BjB1.bule{
        color: #4aa9db;
    }
</style>