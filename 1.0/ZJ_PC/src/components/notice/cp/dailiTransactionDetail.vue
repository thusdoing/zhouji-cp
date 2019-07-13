<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>交易明细
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <ul class="_1KCWQ _2ram0">
                <div style="text-align: left;padding-left: 20px;">
                    <b>账号：</b>
                    <Input v-model="formData.custName" style="width: 120px;margin-left: 15px;"></Input>
                    <Button @click="changPage(1)" type="primary" style="background-color: #2e4158;border-color: #2e4158;">搜索</Button>
                </div>
            </ul>
            <ul class="_1KCWQ">

                <li v-if="formData.type=='change'" class="gPVvn">
                    <span class="_2dqD4">摘要： </span>
                    <div class="_2P-lK">
                        {{text==""?"全部摘要":text}}
                        <select v-model="changeType" class="_1p-p1">
                            <option value="">全部摘要</option>
                            <option v-for="item in changeTypeList" :value="item.spvKey" :key="item.spvKey">{{item.spvVal}}</option>
                        </select>
                    </div>
                </li>

                <li v-if="formData.type=='recharge'" class="gPVvn">
                    <span class="_2dqD4">状态： </span>
                    <div class="_2P-lK">
                        {{text2==""?"全部状态":text2}}
                        <select v-model='rechargeStatus' class="_1p-p1">
                            <option value="">全部状态</option>
                            <option value="010601">充值中</option>
                            <option value="010602">充值成功</option>
                            <option value="010603">充值失败</option>
                        </select>
                    </div>
                </li>

                <li v-if="formData.type=='with'" class="gPVvn">
                    <span class="_2dqD4">状态： </span>
                    <div class="_2P-lK">
                        {{text3==""?"全部状态":text3}}
                        <select v-model='withStatus' class="_1p-p1">
                            <option value="">全部状态</option>
                            <option value="010501">处理中</option>
                            <option value="010502">提现成功</option>
                            <option value="010503">提现拒绝</option>
                        </select>
                    </div>
                </li>


                <li class="gPVvn">
                    <span class="_2dqD4">时间： </span>
                    <button @click="selTime('today')" class="_2eCWc" :class='date=="today"?"_14X1Z":""' type="button">今天</button>
                    <button class="_2eCWc false" :class='date=="yestoday"?"_14X1Z":""' type="button" @click="selTime('yestoday')">昨天</button>
                    <button class="_2eCWc false" :class='date=="seven"?"_14X1Z":""' type="button" @click="selTime('seven')">七天</button>
                </li>
                <li class="gPVvn">
                    <span class="_2dqD4">状态： </span>
                    <button class="_2eCWc" :class="formData.type=='change'?'_14X1Z':''" type="button" @click="handlesearchType('change')">
                        账户明细 </button>
                    <button class="_2eCWc  false" :class="formData.type=='recharge'?'_14X1Z':''" type="button" @click="handlesearchType('recharge')">
                        充值记录 </button>
                    <button @click="handlesearchType('with')" class="_2eCWc  false" :class="formData.type=='with'?'_14X1Z':''" type="button"> 提现记录 </button>
                </li>
            </ul>
            <div>


                <table v-if="formData.type=='change'" width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>账号</th>
                            <th>时间</th>
                            <th>摘要</th>
                            <th>收入金额</th>
                            <th>支出金额</th>
                            <th>可用余额</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr v-if="changeList.length==0">
                            <td class="_32waq" colspan="8">
                                <div v-if="loading" class="_1dJVz">
                                    <div class="absolute center-margin">
                                        <img class="_1VUC8" src="/static_pc/images/loading.gif">
                                    </div>
                                </div>
                                <article v-if="!loading" class="_1dJVz">
                                    <div class="absolute center-margin">
                                        <img class="_1VUC8" src="/static_pc/images/ku.png">
                                        <p>暂无记录</p>
                                    </div>
                                </article>
                            </td>
                        </tr>
                        <tr v-else v-for="item in changeList" :key="item.tableKey">
                            <td class="_35NCS">{{item.custName}}</td>
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.insertDate}"></td>
                            <td>{{item.changeType}}</td>
                            <td>{{item.amountType=='010901'?item.addAmt:"--"}}</td>
                            <td>{{item.amountType=='010902'?item.subAmt:"--"}}</td>
                            <td>{{item.afterAmt}}</td>
                            <td>{{item.changeRemark}}</td>
                        </tr>
                    </tbody>
                </table>


                <table v-if="formData.type=='recharge'" width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>账号</th>
                            <th>发起时间</th>
                            <th>充值金额</th>
                            <th>到账金额</th>
                            <th>充值方式</th>
                            <th>备注</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr v-if="changeList.length==0">
                            <td class="_32waq" colspan="8">
                                <div v-if="loading" class="_1dJVz">
                                    <div class="absolute center-margin">
                                        <img class="_1VUC8" src="/static_pc/images/loading.gif">
                                    </div>
                                </div>
                                <article v-if="!loading" class="_1dJVz">
                                    <div class="absolute center-margin">
                                        <img class="_1VUC8" src="/static_pc/images/ku.png">
                                        <p>暂无记录</p>
                                    </div>
                                </article>
                            </td>
                        </tr>
                        <tr v-else v-for="item in changeList" :key="item.tableKey">
                            <td class="_35NCS">{{item.custName}}</td>
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.insertDate}"></td>
                            <td>{{item.rechargeAmt}}</td>
                            <td>{{item.actuallyAmt}}</td>
                            <td>{{item.rechargeChannel | operationMode}}</td>
                            <td><span>{{item.rechargeRemark}}</span></td>
                            <td>{{item.rechargeStatus | rechargeS }}</td>
                        </tr>
                    </tbody>
                </table>

                <table v-if="formData.type=='with'" width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>账号</th>
                            <th>提现银行</th>
                            <th>银行卡号</th>
                            <th>姓名</th>
                            <th>提现金额</th>
                            <th>提现手续费</th>
                            <th>提现时间</th>
                            <th>状态</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr v-if="changeList.length==0">
                            <td class="_32waq" colspan="8">
                                <div v-if="loading" class="_1dJVz">
                                    <div class="absolute center-margin">
                                        <img class="_1VUC8" src="/static_pc/images/loading.gif">
                                    </div>
                                </div>
                                <article v-if="!loading" class="_1dJVz">
                                    <div class="absolute center-margin">
                                        <img class="_1VUC8" src="/static_pc/images/ku.png">
                                        <p>暂无记录</p>
                                    </div>
                                </article>
                            </td>
                        </tr>
                        <tr v-else v-for="item in changeList" :key="item.tableKey">
                            <td class="_35NCS">{{item.custName}}</td>
                            <td>{{item.bankName}}</td>
                            <td>{{item.bankAcct}}</td>
                            <td>{{item.bankAcctName}}</td>
                            <td>{{item.withAmt}}</td>
                            <td>{{item.withCharge }}</td>
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.applyDate}"></td>
                            <td>{{item.withStatus|rechargeType}}</td>
                            <td>
                                <Tooltip :content="item.remark" placement="top">
                                    <div style="width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{{item.remark}}</div>
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>



            </div>
            <div class="_2miUk cf">
                <Page v-if="total>10" @on-change='changPage' :current="formData.pageNo" style="text-align: right;margin: 10px" :total="total"
                    size="small" show-elevator></Page>
            </div>
            <div class="Vxtwm _1pdcZ">
                <p>
                    <img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：交易记录最多只保留7天。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                formData: {
                    custName: '',
                    type: 'change',//type:类型---change=账户明细,with=提现记录,recharge=充值记录
                    startDate: '',
                    endDate: '',
                    pageNo: 1,
                    pageSize: 10,
                    agentName:''
                },
                getData: [],
                searchType: '1',
                changeTypeList: [],
                changeType: '',
                rechargeStatus: '',
                withStatus: '',
                text: "",
                text2: "",
                text3: "",
                date: 'today',
                changerecordList: [],
                rechargeRecodeList: [],
                acctWithCodeList: [],
                total: 0,
                loading: false,
                changeList:[]
            }

        },
        components: {

        },
        filters: {
            rechargeS: function (value) {
                if (value == '010604' || value == '010601') {
                    return '充值中'
                }
                if (value == '010602') {
                    return '充值成功'
                }
                if (value == '010603') {
                    return '充值失败'
                }
            },
            rechargeType: function (value) {
                if (value == '010501') {
                    return '处理中'
                }
                if (value == '010502') {
                    return '提现成功'
                }
                if (value == '010503') {
                    return '提现失败'
                }
            },
            operationMode: function (value) {
                if (value == '010201') {
                    return '公司操作'
                }
                if (value == '010202') {
                    return '在线支付'
                }
                if (value == '010203') {
                    return '人工操作'
                }
                if (value == '010204') {
                    return '快捷支付'
                }
            }
        },
        created() {
            this.formData.custName = this.$route.query.custName
            let todaytime = new Date();
            this.formData.startDate = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate();
            this.getCodeByType();
            this.getAgentDealingsRecord();
        },
        watch: {
            changeType: function () {
                this.formData.changeType = this.changeType;
                this.changPage(1);
                for (let i in this.changeTypeList) {
                    if (this.changeTypeList[i].spvKey == this.changeType) {
                        this.text = this.changeTypeList[i].spvVal
                        break
                    } else {
                        this.text = ""
                    }
                }
            },
            rechargeStatus: function () {
                this.formData.rechargeStatus = this.rechargeStatus;
                this.changPage(1);
                if (this.rechargeStatus == "010602") {
                    this.text2 = '充值成功'
                } else if (this.rechargeStatus == "010603") {
                    this.text2 = '充值失败'
                } else if (this.rechargeStatus == "010601") {
                    this.text2 = '充值中'
                } else {
                    this.text2 = ""
                }
            },
            withStatus: function () {
                this.formData.withStatus = this.withStatus;
                this.changPage(1);
                if (this.withStatus == "010501") {
                    this.text3 = '处理中'
                } else if (this.withStatus == "010502") {
                    this.text3 = '提现成功'
                } else if (this.withStatus == "010503") {
                    this.text3 = '提现拒绝'
                } else {
                    this.text3 = ""
                }
            }
        },
        methods: {
            selTime(date) {
                this.date = date;
                if (date == 'today') {
                    this.formData.startDate = '';
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.endDate = ""
                    this.changPage(1);
                }
                if (date == 'yestoday') {
                    // this.formData.startDate = '';
                    // let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    // let todaytime = new Date(time);
                    // let tod = new Date();
                    // this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    // this.formData.endDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (tod.getDate());

                    const now = new Date();
                    const yestoday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
                    this.formData.startDate = `${yestoday.getFullYear()}/${yestoday.getMonth() + 1}/${yestoday.getDate()}`;
                    this.formData.endDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
                    this.changPage(1);
                }
                if (date == 'seven') {
                    this.formData.startDate = '';
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date(time);
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = ""
                    this.changPage(1);
                }
            },
            handlesearchType(type) {
                this.formData.type = type
                this.changPage(1)
            },

            getAgentDealingsRecord() {
                this.loading = true
                this.changeList = []
                axios.post('/getAgentDealingsRecord', this.formData).then(data => {
                    this.loading = false
                    if (data.data.success) {
                        this.changeList = data.data.list

                        this.total = data.data.totalSize
                    } else {
                        this.$Modal.error({
                            title: '提示',
                            content: data.data.msg
                        })
                    }
                })
            },
            getCodeByType() {
                let _this = this;
                this.$http.get('/getCodeByType', { params: { codeType: 'incomeCode,expenditureCode' } }).then(function (data) {
                    if (data.data.list != null && data.data.list != undefined) {
                        _this.changeTypeList = data.data.list
                    }
                })
            },
            changPage(page) {
                this.formData.pageNo = page
                this.getAgentDealingsRecord();
            }
        },
        mounted() {

        }

    }
</script>
