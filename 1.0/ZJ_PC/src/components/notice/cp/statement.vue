<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>今日盈亏
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <div style="padding: 17px 16px;">
                <div class="fl mr15 _3K_Po" style="width: 282px; height: 90px;">
                    <div style="padding: 15px;">
                        <p class="_2zXFr"><span>{{getData.acctAmt ? getData.acctAmt : '0.00'}}</span></p>
                        <div class="_3US5t"><i class="iconfont icon-qiandai mr7"></i><!--
                            --><div class="dib mr30">余额</div><!--
                            --><div @click="$router.push('/deposit')" class="dib pointer mr6 ph9 pv1 _3K_Po">充值</div><!--
                            --><div class="dib pointer mr6 ph9 pv1 _3K_Po" @click="$router.push('/withdraw')">提现</div><!--
                            --><div @click="$router.push('/dealingsRecord')" class="dib pointer ph9 pv1 _3K_Po">交易记录</div>
                        </div>
                    </div>
                </div>
                <div class="fl mr15 _3K_Po" style="width: 259px; height: 90px;margin: 0 5px 0 -10px;">
                    <div style="padding: 15px;"><img class="fl mr13"
                                                     src="/static_pc/images/yk.png">
                        <div class="fl">
                            <p class="_3US5t mb15">盈亏总额 （元）</p>
                            <p class="_2zXFr" style="font-size: 20px;">{{getData.profitAmt ? getData.profitAmt : "0.00"}}</p>
                        </div>
                    </div>
                </div>
                <div class="fl mb13 _3K_Po" style="width: 239px; height: 90px;">
                    <div style="padding: 15px;"><img class="fl mr13"
                                                     src="/static_pc/images/js.png">
                        <div class="fl">
                            <p class="_3US5t mb15">盈亏计算公式</p>
                            <p class="_3US5t _2UhIr pl5">中奖-投注+活动+返点</p>
                        </div>
                    </div>
                </div>
                <div class="fl _3K_Po" style="width: 790px; height: 90px;">
                    <div style="padding: 21px 0px;">
                        <div class="_2-AM5 _2d6HE">
                            <p class="_1BjB1">{{getData.betAmt ? getData.betAmt : "0.00"}}</p>
                            <p class="_1tmvU">投注金额</p>
                        </div><!-- 
                     --><div class="_2-AM5 _2d6HE">
                            <p class="_1BjB1">{{getData.winningAmt ? getData.winningAmt : "0.00"}}</p>
                            <p class="_1tmvU">中奖金额</p>
                        </div><!-- 
                     --><div class="_2-AM5 _2d6HE">
                            <p class="_1BjB1">{{getData.activityAmt||'0.00'}}</p>
                            <p class="_1tmvU">活动礼金</p>
                        </div><!-- 
                     --><div class="_2-AM5 _2d6HE">
                            <p class="_1BjB1">{{getData.betBackAmt ? getData.betBackAmt : "0.00"}}</p>
                            <p class="_1tmvU">返点金额</p>
                        </div><!-- 
                     --><div class="_2-AM5 _2d6HE">
                            <p class="_1BjB1">{{getData.totalRecharge ? getData.totalRecharge : "0.00"}}</p>
                            <p class="_1tmvU">充值金额</p>
                        </div><!-- 
                     --><div class="_2-AM5">
                            <p class="_1BjB1">{{getData.withAmt ? getData.withAmt : "0.00"}}</p>
                            <p class="_1tmvU">提现金额</p>
                        </div>
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
				getData: [],
				arr: null,
				flag: true,
				url: 'http://www.lm699.com',
				current: null,
				content: null
			}
		},
		components: {},
		created(){
			this.myAcctChangeReport()
		},
		watch: {},
		methods: {
			myAcctChangeReport(){
                let _this = this;
                let todaytime = new Date()
                let date = todaytime.getFullYear()+"/"+(todaytime.getMonth()+1)+"/"+todaytime.getDate();
                
				axios.post('/myAcctChangeReport', {startDate: date}).then(function (data) {
					if (data.data.success) {
						if (data.data.t != null && data.data.t != undefined) {
							_this.getData = data.data.t
						}
					}
				});
			}


		},
		mounted(){

		}

	}
</script>