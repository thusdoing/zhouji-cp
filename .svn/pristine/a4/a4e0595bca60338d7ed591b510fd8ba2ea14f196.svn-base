<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <div class="ivu-breadcrumb">
                <span>
                    <span class="ivu-breadcrumb-item-link hover">{{btitle}}</span>
                    <span class="ivu-breadcrumb-item-separator">/</span>
                </span>
            </div>
        </div>
        <div class="_3wioq fl" style="width: 840px;min-height:454px;">
            <div class="dailimemberManageSerch">
                <Button @click="$router.go(-1)" type="primary" style="background-color: #2e4158;border-color: #2e4158;">返回</Button>
            </div>
            <table width="100%" cellspacing="0" cellpadding="0" v-if="ttype=='first'">
                <thead class="_3apNX">
                    <tr>
                        <th>账号</th>
                        <th>上级代理</th>
                        <th>首冲金额</th>
                        <th>注册时间</th>
                    </tr>
                </thead>
                <tbody class="-QUHL">
                    <tr v-if="childrenList.length==0">
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

                    <tr v-else class="_1UhCN" v-for="(item, index) in childrenList" :key="index">
                        <td>{{item.custName}}</td>
                        <td>{{item.agentName}}</td>
                        <td>{{item.rechargeAmt}}</td>
                        <td>{{$date(item.registerDate)}}</td>
                    </tr>
                </tbody>
            </table>
            <table width="100%" cellspacing="0" cellpadding="0" v-if="ttype=='register'">
                <thead class="_3apNX">
                    <tr>
                        <th>账号</th>
                        <th>上级代理</th>
                        <th>注册时间</th>
                    </tr>
                </thead>
                <tbody class="-QUHL">
                    <tr v-if="childrenList.length==0">
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

                    <tr v-else class="_1UhCN" v-for="(item, index) in childrenList" :key="index">
                        <td>{{item.custName}}</td>
                        <td>{{item.agentName}}</td>
                        <td>{{$date(item.insertDate)}}</td>
                    </tr>
                </tbody>
            </table>
            <table width="100%" cellspacing="0" cellpadding="0" v-if="ttype=='betUser'">
                <thead class="_3apNX">
                    <tr>
                        <th>账号</th>
                        <th>上级代理</th>
                        <th>投注金额</th>
                        <th>中奖金额</th>
                        <th>注册时间</th>
                    </tr>
                </thead>
                <tbody class="-QUHL">
                    <tr v-if="childrenList.length==0">
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

                    <tr v-else class="_1UhCN" v-for="(item, index) in childrenList" :key="index">
                        <td>{{item.custName}}</td>
                        <td>{{item.agentName}}</td>
                        <td>{{item.betAmt}}</td>
                        <td>{{item.bonusAmt}}</td>
                        <td>{{$date(item.insertDate)}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <Page @on-change='changPage' style="text-align: right;margin: 10px" :current="formData.pageNo" :total="total" size="small"
                    show-elevator></Page>
            </div>
        </div>
        <Modal v-model="showDateil" title="详情" width="620">
            <div style="padding-left: 150px;">
                <div v-for="(item, index) in userRebateInfo" :key="item.gameType" class="showDateilItem">
                    <span>{{item.gameTypeName}}</span>
                    <Input style="width: 100px" disabled :value="item.rebate||0"></Input>
                </div>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>

    import axios from 'axios'
    export default {
        components: {},
        data() {
            return {
                total: 0,
                loading: false,
                formData: {
                    agentName:'',
                    custName: '',
                    custType: '',
                    pageNo: 1,
                    pageSize: 10
                },
                childrenList: [],
                total: 0,
                showDateil: false,
                userRebateInfo: [],
                seeChildrenList: [],
                ttype:'',
                btitle:''
            }
        },
        created() {
            let form = this.$route.params.form
            if(form){
                this.formData = {...this.formData,...form}
            }
            this.ttype = this.$route.params.type
            if(!this.ttype) this.$router.go(-1)
            this.btitle = {first:'下级首冲',register:'注册人数',betUser:'投注人数'}[this.ttype]
            this.serchChildrenList()
        },
        watch: {

        },
        methods: {
            serchChildrenList(){
                this.seeChildrenList = []
                this.formData.agentName = ""
                this.changPage(1)
            },
            getChildrenList() {
                this.childrenList = []
                this.loading = true
                axios.post('/getFirstRecharge', this.formData).then(data => {
                    this.loading = false
                    if (data.data.success) {
                        this.childrenList = data.data.list
                        this.total = data.data.totalSize
                    }
                })
            },
            getBetUser() {
                this.childrenList = []
                this.loading = true
                axios.post('/getBetUser', this.formData).then(data => {
                    this.loading = false
                    if (data.data.success) {
                        this.childrenList = data.data.list
                        this.total = data.data.totalSize
                    }
                })
            },
            getRegUser() {
                this.childrenList = []
                this.loading = true
                axios.post('/getRegUser', this.formData).then(data => {
                    this.loading = false
                    if (data.data.success) {
                        this.childrenList = data.data.list
                        this.total = data.data.totalSize
                    }
                })
            },
            getUserRebateInfo(name) {
                this.showDateil = true
                axios.get('/getUserRebateInfo', { params: { custName: name } }).then(data => {
                    if (data.data.success) {
                        this.userRebateInfo = data.data.list
                    } else {
                        this.$Modal({
                            title: '提示',
                            content: data.data.msg
                        })
                    }
                })
            },
            seeChildren(item) {
                this.formData.agentName = item.custName
                this.formData.custName = ""
                this.changPage(1)
                this.seeChildrenList.push(item)
            },
            backSee(index,item) {
                this.formData.agentName = item.custName
                this.changPage(1)
                this.seeChildrenList = this.seeChildrenList.slice(0,index+1)
            },
            changPage(page) {
                this.formData.pageNo = page
                if(this.ttype=='first'){
                    return this.getChildrenList()
                }
                if(this.ttype=='betUser'){
                    return this.getBetUser()
                }
                if(this.ttype=='register'){
                    return this.getRegUser()
                }
            },
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
            }
        }
    }
</script>
<style>
    .dailimemberManageSerch {
        font-size: 14px;
        padding: 10px;
        background: #f8f8f8;
        border-bottom: 1px solid #e3e3e3;
    }
</style>