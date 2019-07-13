<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>我要提现
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <div>
                <section>
                    <div v-if="!next" class="YKAlS">
                        <div class="xfyLR"><label class="ghmPg">会员账号:</label>
                            <div class="_3VabC"><p>{{$store.state.userInfo.custName}}</p></div>
                        </div>
                        <div class="xfyLR"><label class="ghmPg">账户余额:</label>
                            <div class="_3VabC"><p><span class="_3BKgh"><span>{{$store.state.userInfo.acctAmt}}</span></span>元</p></div>
                        </div>
                        <div class="xfyLR"><label class="ghmPg">可提现金额:</label>
                            <div class="_3VabC"><p><span class="_3BKgh"><span>{{map.withAmt||0}}</span></span>元</p></div>
                        </div>
                        <div class="xfyLR"><label class="ghmPg">出款稽核:</label>
                            <div class="_3VabC"><p>自出款后第一次存款开始之后</p></div>
                        </div>
                        <div class="xfyLR"><label class="ghmPg">总有效投注额:</label>
                            <div class="_3VabC"><p><span class="_3BKgh">{{map.betTotal}}</span> (即所有产品的有效投注额)</p></div>
                        </div>
                        <div class="xfyLR"><label class="ghmPg">需再投注:</label><div class="_3VabC"><p><span class="_3BKgh"><span>{{map.noPassXzfFlowTotalAmt||0}}</span></span>元<span v-if="map.withset&&map.withset.isApplyWith=='1'">，即可不扣除行政费用</span><span v-if="map.withset&&map.withset.isApplyWith=='0'">，即可提现</span></p></div></div>

                        <div class="_1pXLE" style="overflow: auto">
                            <table width="1200" cellspacing="0" cellpadding="0" class="_3HLI6">
                                <thead class="_1SppS">
                                <tr>
                                    <th class="_11ZHK _1Sn29" rowspan="2">入款日期区间</th>
                                    <th class="_11ZHK _1Sn29" rowspan="2">充值金额</th>
                                    <th class="_11ZHK _1Sn29" rowspan="2">活动优惠</th>
                                    <th class="_11ZHK _1Sn29" rowspan="2">活动</th>
                                    <th class="_11ZHK _1Sn29" rowspan="2">有效投注</th>
                                    <!-- <th class="_11ZHK _1Sn29" rowspan="2">扣除金额</th> -->
                                    <th class="_11ZHK Xt8Hk" colspan="4">活动优惠稽核</th>
                                    <th class="_11ZHK _2r1MO" colspan="3"> 常态性稽核</th>
                                </tr>
                                <tr>
                                    <th class="_11ZHK Xt8Hk"> 彩票需流水</th>
                                    <th class="_11ZHK Xt8Hk">通过</th>
                                    <th class="_11ZHK Xt8Hk">综合需流水</th>
                                    <th class="_11ZHK Xt8Hk">是否达到</th>

                                    <th class="_11ZHK _2r1MO">彩票需流水</th>
                                    <!-- <th class="_11ZHK _2r1MO">放宽额度</th> -->
                                    <th class="_11ZHK _2r1MO">通过</th>
                                    <th class="_11ZHK _2r1MO">需扣除行政费</th>
                                    <!-- <th class="_11ZHK _2r1MO">需扣除金额</th> -->
                                </tr>
                                </thead>
                                <tbody class="_3nwjR">
                                <tr v-for="item in getData">
                                    <td>
                                        <span v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.startDate}"></span><br><span v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.endDate}"></span>
                                    </td>
                                    <td>{{item.rechargeAmt}}</td>
                                    <td><span>{{item.giveAmt}}</span></td>
                                    <td><span>{{item.activityPostalFlow.activityName}}</span></td>
                                    <td><span>{{item.betAmt}}</span></td>
                                    <!-- <td><span>{{item.totalDeductAmt}}</span></td> -->
                                    <td><span>{{item.activityPostalFlow.activityNormalFlow }}</span></td>
                                    <td><span>{{item.activityPostalFlow.activityNormalPass}}</span></td>
                                    <td><span>{{item.activityPostalFlow.activityCompreFlow}}</span></td>
                                    <td><span>{{item.activityPostalFlow.activityComprePass}}</span></td>
                                    <td><span>{{item.normalPostalFlow.normalFlow}}</span></td>
                                    <!-- <td><span>{{item.normalPostalFlow.discountNormal}}</span></td> -->
                                    <td><span>{{item.normalPostalFlow.normalPass}}</span></td>
                                    <td><span>{{item.rechargeAmt==0?'0%':Math.round(item.normalPostalFlow.administration/item.rechargeAmt*10000)/100+'%'}}</span></td>
                                    <!-- <td><span>{{item.normalPostalFlow.deductNormalAmt}}</span></td> -->
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="xfyLR"><label class="ghmPg">稽核共需扣除:</label>
                            <ul class="_3jwdV">
                                <li class="_283uJ">
                                    <div class="_2QHrb"><p class="_221aE">共需扣除</p>
                                        <div class="_357It"><span>{{map.deductAmtTotal}}</span></div>
                                    </div>
                                </li>
                                <li class="_283uJ">
                                    <p style="text-align: left;line-height: 18px;font-size: 12px;">{{map.xzfMsg}}<br>{{map.serverMsg}}</p>
                                </li>
                            </ul>
                        </div>
                        <button class="_1sc4M _3nC0s" type="button" @click="map.withAmt>0?(next=true):''">下一步</button>
                        <span v-if="map.withAmt<=0" style="color: #e4393c">你没有可以提现的余额</span>
                    </div>
                    <form v-else>
                        <div class="YKAlS">
                            <div class="xfyLR"><label class="ghmPg">会员账号:</label>
                                <div class="_3VabC"><p>{{$store.state.userInfo.custName}}</p></div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">账户余额:</label>
                                <div class="_3VabC"><p><span class="_3BKgh"><span>{{$store.state.userInfo.acctAmt}}</span></span>元</p></div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">可提现金额:</label>
                                <div class="_3VabC"><p><span class="_3BKgh"><span>{{map.withAmt}}</span></span>元</p></div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">今天剩余提现次数:</label>
                                <div class="_3VabC"><p><span class="_3BKgh">{{postalSet.withNumber-postalSet.rechargeNumber}}</span>次
                                </p></div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">单笔提现:</label>
                                <div class="_3VabC"><p> 最低<span class="_3BKgh">{{postalSet.onlyWithDown}}</span>元，最高<span class="_3BKgh">{{postalSet.onlyWithUp }}</span>元
                                </p></div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">选择银行:</label>
                                <div class="_3VabC">
                                    <div class="clCvv">
                                        <div class="ge2TD">
                                            <button @click="sele?sele=false:sele=true" type="button" class="false _3s5iP undefined">
                                                <template v-if="bankIndex==null">请选择银行</template>
                                                <span v-else><img :src="'/static_pc/bank/'+bankList[bankIndex].bankIcon+'.png'" width="79" class="h-auto"><p class="_1OkJv">尾号：{{bankList[bankIndex].bankAcct.substring(bankList[bankIndex].bankAcct.length-4,bankList[bankIndex].bankAcct.length)}}</p></span>
                                            </button>
                                            <span id="bank" :class="sele?'_3JU74':''">
                                                <div class="_1tYAp">

                                                    <li @click="bankIndex=index;sele=false;formData.bankId = item.tableKey" v-for="(item,index) in bankList" class="_2p1n1"><img :src="'/static_pc/bank/'+item.bankIcon+'.png'" width="102">
                                                        <p class="_1OkJv">尾号：{{item.bankAcct.substring(item.bankAcct.length-4,item.bankAcct.length)}}</p>
                                                    </li>

                                                </div>
                                                <div class="_2Yobq"></div>
                                                <span></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">提现金额:</label>
                                <div class="_3VabC">
                                    <div class="dib relative"><input class="clCvv _3EfqC s1cJ-" type="number"
                                                                     placeholder="请输入提现金额" autocomplete="new-password"
                                                                     name="withdrawAmount" v-model="formData.amt">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="xfyLR"><label class="ghmPg">支付密码:</label>
                                <div class="_3VabC">
                                    <div class="dib relative"><input class="clCvv _3EfqC s1cJ-" type="password"
                                                                     placeholder="请输入支付密码" autocomplete="new-password"
                                                                     name="withdrawPassword" v-model="formData.withPwd">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                            <button class="_1sc4M _3nC0s" type="button" @click="next = false">上一步</button>
                            <button class="_1sc4M _3nC0s" type="button" @click="sendPostalMsg" style="margin-left: 20px;">确定</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
            <Modal v-model="setbankM" width="180" :closable="false" class-name="vertical-center-modal" :mask-closable="false" >
                
                <h1 style="text-align: center;padding: 20px 0 10px">你还没有添加银行卡</h1>
                <div slot="footer">
                    <Button @click="$router.go(-1)" style="float:left">不想去</Button>
                    <Button type="success" @click="$router.push('/bankAccount')">去添加</Button>
                </div>
            </Modal>
    </div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				getData: [],
				next: false,
				map:{
					betTotal:0,
                    deductAmtTotal:0,
                    withAmt:0
                },
				postalSet:{},
				sele:false,
				seleBank:{},
				bankList:[],
                bankIndex:null,
                formData:{
	                amt:'',
	                bankId:'',
	                reason:'',
	                withPwd:''
                },
                setbankM:false,
                once:true
			}
		},
		components: {},
		created(){
			this.getPostalFlows();
			// this.getPostalSet();
			this.getBank();
		},
		watch: {},
		methods: {
		    getBank(){
				let _this = this;
				axios.get('/getBank').then( (data)=> {
					if (data.data.success) {
						if(data.data.list!=null&&data.data.list!=undefined){
							_this.bankList = data.data.list
                            if(data.data.list.length==0) this.setbankM=true
                        }else{
                            this.setbankM=true
                        }
					}
				});
			},
			upCust(){
				let _this = this
				axios({
					method: 'post',
					url: '/upCust',
					data: _this.$transformRequest({
						contactQq: _this.cust.contactQq == null ? '' : _this.cust.contactQq,
						userPhone: _this.cust.userPhone == null ? '' : _this.cust.userPhone
					})
				}).then(function (data) {
					if (data.data.success) {
						_this.$Modal.success({
							title: '系统提示',
							content: data.data.msg
						})
						_this.getCust();
					} else {
						_this.$Modal.error({
							title: '系统错误',
							content: data.data.msg
						})
					}
				})
			},
			getPostalFlows(){
				let _this = this
				axios({
					method: 'post',
					url: '/getPostalFlows'
				}).then(function (data) {
                    if(data.data.success){
                        if(data.data.list){
                        	_this.getData = data.data.list
                            _this.map = data.data.map
                            _this.postalSet = data.data.map.withset
                        }
                    }
				})
            },
            getPostalSet(){
	            let _this = this
	            axios({
		            method: 'post',
		            url: '/getPostalSet'
	            }).then(function (data) {
		            if(data.data.success){
			            if(data.data.t!=null&&data.data.t!=undefined){
				            _this.postalSet = data.data.t
			            }
		            }
	            })
            },
		    sendPostalMsg(){
                if(this.formData.bankId.length<1){
                    this.$Modal.error({
                        title: '系统提示',
                        content: '请选择银行'
                    })
                    return
                }else if(this.formData.amt>this.map.withAmt&&this.formData.amt>=this.postalSet.onlyWithDown&&this.formData.amt<=this.postalSet.onlyWithUp){
                    this.$Modal.error({
                        title: '系统提示',
                        content: '你的输入不正确'
                    })
                    return
                }else if(this.formData.withPwd.length<6){
                    this.$Modal.error({
                        title: '系统提示',
                        content: '密码长度过少'
                    })
                    return
                }else if(this.formData.amt<=0){
                    this.$Modal.error({
                        title: '系统提示',
                        content: '提现金额必须大于0'
                    })
                    return
                }else{
                    if(!this.once){return}
                        this.once=false
                    axios({
                        method: 'post',
                        url: '/sendPostalMsg',
                        data:this.formData
                    }).then((data)=>{
                        this.once=true
                        if(data.data.success){
                            this.$Modal.success({
                                title: '系统提示',
                                content: '发起提款成功,请等待工作人员审核'
                            })
                            this.$store.commit('yu_e')
                            this.$router.push({name:'dealingsRecord',params:{searchType:'3'}})
                        }else {
                            this.$Modal.error({
                                title: '系统提示',
                                content: data.data.msg
                            })
                        }
                    })
                }
    			    
            }
                

		},
		mounted(){
		}

	}
</script>