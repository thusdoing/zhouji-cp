<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <div class="ivu-breadcrumb">
                <span @click="formData.agentName='';formData.custName='';childrenList=[];getAgentChildReport()">
                    <span class="ivu-breadcrumb-item-link hover">下级报表</span>
                    <span class="ivu-breadcrumb-item-separator">/</span>
                </span>
                <span v-for="(item, index) in childrenList" :key="'c'+index">
                    <span @click="backSee(index,item)" class="ivu-breadcrumb-item-link hover">{{item.custName}}</span>
                    <span class="ivu-breadcrumb-item-separator">/</span>
                </span>
            </div>
        </div>
        <div class="_3wioq fl" style="width: 840px;min-height:454px;padding-top: 20px;">
            <Tabs type="card" @on-click="selectTime" :animated="false">
                <TabPane label="今天"></TabPane>
                <TabPane label="昨天"></TabPane>
                <TabPane label="本月"></TabPane>
                <TabPane label="上月"></TabPane>
            </Tabs>
            <div>
                <Input placeholder="下级查询,支持模糊搜索" v-model="formData.agentName" style="width: 200px;margin-left: 15px;"></Input>
                <Button type="primary" @click="serch" style="background-color: #2e4158;border-color: #2e4158;">搜索</Button>
            </div>
            <table width="100%" cellspacing="0" cellpadding="0">
                <thead class="_3apNX">
                    <tr>
                        <th>账号</th>
                        <th>用户类型</th>
                        <th>上级代理</th>
                        <th>投注金额</th>
                        <th>中奖金额</th>
                        <th>团队返点</th>
                        <th>活动礼金</th>
                        <th>投注人数</th>
                        <th>盈利</th>
                    </tr>
                </thead>
                <tbody class="-QUHL">
                    <tr v-if="dataList.length==0">
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

                    <tr v-else class="_1UhCN" v-for="(item, index) in dataList" :key="index">
                        <td class="_35NCS">{{item.custName }}</td>
                        <td>{{item.custType|custType}}</td>
                        <td>{{item.agentName}}</td>
                        <td>{{item.betAmt }}</td>
                        <td>{{item.bonusAmt }}</td>
                        <td>{{item.rebateAmt }}</td>
                        <td>{{item.activityAmt }}</td>
                        <td class="hover _35NCS" @click="seeChildren(item)">{{item.betNumber }}</td>
                        <td @click="$router.push({name:'dailiReport',params:{custName:item.custName}})" class="hover _35NCS">{{item.profitAmt }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <Page @on-change='changPage' style="text-align: right;margin: 10px" :current="formData.pageNo" :total="total" size="small"
                    show-elevator></Page>
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
                loading: false,
                formData: {
                    custName: '',
                    startDate: '',
                    endDate: '',
                    pageNo: 1,
                    pageSize: 10,
                    agentName:''
                },
                total: 0,
                dataList: [],
                childrenList: [],
                time: ''
            }
        },
        created() {
            this.getAgentChildReport()
        },
        watch: {

        },
        methods: {
            getAgentChildReport() {
                this.dataList = []
                this.loading = true
                axios.post('/getAgentChildReport', this.formData).then(data => {
                    this.loading = false
                    if (data.data.success) {
                        this.dataList = data.data.list
                        this.total = data.data.totalSize
                    } else {
                        this.$Modal.error({
                            title: '提示',
                            content: data.data.msg
                        })
                    }
                })
            },
            seeChildren(item) {
                this.childrenList.push(item)
                this.formData.custName = item.custName
                this.changPage(1)
            },
            backSee(index,item){
                this.formData.custName = item.custName
                this.changPage(1)
                this.childrenList = this.childrenList.slice(0,index+1)
            },
            serch(){
                this.childrenList = []
                this.formData.custName = ''
                this.changPage(1)
            },

            selectTime(num) {
                if (num == 0) {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.endDate = ""
                    this.getAgentChildReport()
                } else if (num == 1) {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + (tod.getDate());
                    this.getAgentChildReport();
                } else if (num == 2) {
                    this.time = '本月'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + 1;
                    this.formData.endDate = ""
                    this.getAgentChildReport();
                } else if (num == 3) {
                    this.time = '上月'
                    let time = new Date().getTime();
                    let days = new Date().getDate() + 1
                    let stime = new Date(time - 1000 * 60 * 60 * 24 * days);
                    this.formData.startDate = stime.getFullYear() + "/" + (stime.getMonth() + 1) + "/" + 1;

                    let today = new Date()
                    this.formData.endDate = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + 1;
                    this.getAgentChildReport();
                }
            },
            changPage(page) {
                this.formData.pageNo = page
                this.getAgentChildReport()
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
            }
        }

    }
</script>
