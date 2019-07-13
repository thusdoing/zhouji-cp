<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <div class="ivu-breadcrumb">
                <span @click="formData.custName='';formData.agentName='';seeChildrenList=[];getChildrenList()">
                    <span class="ivu-breadcrumb-item-link hover">会员管理</span>
                    <span class="ivu-breadcrumb-item-separator">/</span>
                </span>
                <span v-for="(item, index) in seeChildrenList" :key="'c'+index">
                    <span @click="backSee(index,item)" class="ivu-breadcrumb-item-link hover">{{item.custName}}</span>
                    <span class="ivu-breadcrumb-item-separator">/</span>
                </span>
            </div>
        </div>
        <div class="_3wioq fl" style="width: 840px;min-height:454px;">
            <div class="dailimemberManageSerch">
                <b>账号：</b>
                <Input style="width: 120px;margin-left: 5px;" v-model="formData.custName"></Input>
                <b>用户类型：</b>
                <Select style="width:120px" clearable placeholder="全部" v-model="formData.custType">
                    <Option value="010701">代理</Option>
                    <Option value="010703">玩家</Option>
                </Select>
                <Button @click="serchChildrenList()" type="primary" style="background-color: #2e4158;border-color: #2e4158;">搜索</Button>
            </div>
            <table width="100%" cellspacing="0" cellpadding="0">
                <thead class="_3apNX">
                    <tr>
                        <th>账号</th>
                        <th>状态</th>
                        <th>用户类型</th>
                        <th>层级</th>
                        <th>上级代理</th>
                        <th>下级人数</th>
                        <th>余额</th>
                        <th>会员注册时间</th>
                        <th>最后登录</th>
                        <th>操作</th>
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
                        <td :style="`color: ${item.online==1?'red':'#666'}`">{{item.online==1?"在线":"离线"}}</td>
                        <td>{{item.custType|custType}}</td>
                        <td>{{item.userHierarchy}}</td>
                        <td>{{item.agentName}}</td>
                        <td @click="seeChildren(item)" class="hover _35NCS">{{item.childrenNumber}}</td>
                        <td>{{item.acctAmt}}</td>
                        <td>{{$date(item.insertDate,"yyyy-MM-dd")}}</td>
                        <td>{{item.lastSignDate?$date(item.lastSignDate,"yyyy-MM-dd"):'未登录'}}</td>
                        <td class="handle">
                            <span @click="$router.push('/dailibetDetail?custName='+item.custName)">投注明细</span> |
                            <span @click="$router.push('/dailiTransactionDetail?custName='+item.custName)">交易明细</span> |
                            <span @click="getUserRebateInfo(item.custName)">返点</span>
                        </td>
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
                seeChildrenList: []
            }
        },
        created() {
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
                axios.post('/getChildrenList', this.formData).then(data => {
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
                this.getChildrenList()
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