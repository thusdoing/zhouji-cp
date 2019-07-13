<style scoped>
@import '../../assets/header.css';
.profit-amt-item{text-align: center;height: 60px;align-items: flex-end;background: #fff;}
.profit-amt-amt{font-size: 2.5em;text-align: center;background: #fff;color: #ec2829;height: 85px;}
.profit-loss-info{font-size: 12px;padding: 7px;color: #5E5E5E;}
.profit-detail{margin: 20px 15px;background-color: #ffffff;text-align: center;border-radius: 10px;}
.profit-field-item{font-size: 12px;color: #454545;}
.number-amt{color: #ec2829;font-size: 1em;}
.profit-detail-item{border-bottom: 1px solid #eee;}
.profit-detail-item:last-child{border-bottom: 0px;}
.detail-item{border-right: 1px solid #eee;padding: 12px;margin: 8px;}
.detail-item:last-child{border-right-color: #fff;}
</style>
<template>
    <div>
        <wv-header title="当日盈亏" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main">
            <div>
                <wv-flex class="profit-amt-item">
                    <wv-flex-item >
                        <div>盈利金额</div>
                    </wv-flex-item>
                </wv-flex>
                <wv-flex>
                    <wv-flex-item class="profit-amt-amt">
                        <div>{{userAcctInfo.profitAmt}}</div>
                    </wv-flex-item>
                </wv-flex>
                <wv-flex>
                    <wv-flex-item class="profit-loss-info">
                        <div>盈亏计算公式：中奖-投注+活动+返点</div>
                    </wv-flex-item>
                </wv-flex>
                <div class="profit-detail">
                    <wv-flex class="profit-detail-item">
                        <wv-flex-item class="detail-item">
                            <wv-flex>
                                <wv-flex-item class="profit-field-item">
                                    <div>投注金额</div>
                                </wv-flex-item>
                            </wv-flex>
                            <wv-flex>
                                <wv-flex-item class="number-amt">
                                    <div>{{(userAcctInfo.betAmt.toFixed(3))}}</div>
                                </wv-flex-item>
                            </wv-flex>
                        </wv-flex-item>
                        <wv-flex-item class="detail-item">
                            <wv-flex>
                                <wv-flex-item class="profit-field-item">
                                    <div>中奖金额</div>
                                </wv-flex-item>
                            </wv-flex>
                            <wv-flex>
                                <wv-flex-item class="number-amt">
                                    <div>{{userAcctInfo.winningAmt.toFixed(3)}}</div>
                                </wv-flex-item>
                            </wv-flex>
                        </wv-flex-item>
                    </wv-flex>
                    <wv-flex class="profit-detail-item">
                        <wv-flex-item class="detail-item">
                            <wv-flex>
                                <wv-flex-item class="profit-field-item">
                                    <div>返点金额</div>
                                </wv-flex-item>
                            </wv-flex>
                            <wv-flex>
                                <wv-flex-item class="number-amt">
                                    <div>{{userAcctInfo.betBackAmt.toFixed(3)}}</div>
                                </wv-flex-item>
                            </wv-flex>
                        </wv-flex-item>
                        <wv-flex-item class="detail-item">
                            <wv-flex>
                                <wv-flex-item class="profit-field-item">
                                    <div>活动礼金</div>
                                </wv-flex-item>
                            </wv-flex>
                            <wv-flex>
                                <wv-flex-item class="number-amt">
                                    <div>{{userAcctInfo.activityAmt.toFixed(3)}}</div>
                                </wv-flex-item>
                            </wv-flex>
                        </wv-flex-item>
                    </wv-flex>
                    <wv-flex class="profit-detail-item">
                        <wv-flex-item class="detail-item">
                            <wv-flex>
                                <wv-flex-item class="profit-field-item">
                                    <div>充值金额</div>
                                </wv-flex-item>
                            </wv-flex>
                            <wv-flex>
                                <wv-flex-item class="number-amt">
                                    <div>{{(userAcctInfo.totalRecharge.toFixed(3))}}</div>
                                </wv-flex-item>
                            </wv-flex>
                        </wv-flex-item>
                        <wv-flex-item class="detail-item">
                            <wv-flex>
                                <wv-flex-item class="profit-field-item">
                                    <div>提现金额</div>
                                </wv-flex-item>
                            </wv-flex>
                            <wv-flex>
                                <wv-flex-item class="number-amt">
                                    <div>{{userAcctInfo.withAmt.toFixed(3)}}</div>
                                </wv-flex-item>
                            </wv-flex>
                        </wv-flex-item>
                    </wv-flex>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
             userAcctInfo : {
                acctAmt:0,
                additionBetAmt:0,
                betAmt:0,
                betBackAmt:0,
                companyAmt:0,
                onlineAmt:0,
                profitAmt:-0,
                totalBetAmt:0,
                totalRecharge:0,
                winningAmt:0,
                withAmt:0
            }
        }
    },
    methods : {
        /** 查询个人用户当天账变信息 */
        userAcctChangeReport(_date){
            let date = this.$Date(new Date(_date),'yyyy/MM/dd');
              const endDate=date+' 23:59:59';
            date = date + ' 00:00:01';
          
            this.$api.post('myAcctChangeReport',{startDate:date,endDate:endDate}).then((data) => {
                if(data.t != null){
                    this.userAcctInfo = data.t;
                }
            });
        }
    },
    created() {
  
        this.userAcctChangeReport(this.$route.params.date);

    }
}
</script>
