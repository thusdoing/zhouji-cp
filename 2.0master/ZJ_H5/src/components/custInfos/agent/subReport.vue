<template>
    <div>
        <wv-header title="下级报表" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div @click="showtime=true" class="btn-menu" slot="right">
                {{time}}
            </div>
        </wv-header>
        <div class="contentbox">
            <div style="display: flex;">
                <wv-search-bar style="flex: 1" :autofocus="true" v-model="formData.agentName" cancel-text=""></wv-search-bar>
                <wv-button @click="serch" type="warn" :mini="true" style="height: 30px;margin: 7px 12px 0 0;">搜索</wv-button>
            </div>
            <x-table :cell-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>账号</th>
                        <th>类型</th>
                        <th>投注人数</th>
                        <th>盈利</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in childrenList" :key="index" style="font-size: 15px"  @click="seeSub(item)">
                        <td style="color: #3388ff">{{item.custName}}</td>
                        <td>{{item.custType|custType}}</td>
                        <td>{{item.betNumber}}</td>
                        <td @click.stop="goAgentReport(item.custName)" style="color: red">{{item.profitAmt}}</td>
                    </tr>
                </tbody>
            </x-table>



            <load-more v-if="loading" tip="正在加载"></load-more>
            <template v-else>
                <div v-if="totalSize>childrenList.length">
                    <div @click="LoadMore()" style="text-align: center;color: #333;font-size: 15px;line-height: 60px;">点击加载更多</div>
                </div>
                <div v-if="totalSize==childrenList.length">
                    <load-more :show-loading="false" tip="已显示全部内容" background-color="#fbf9fe"></load-more>
                </div>
            </template>

            <actionsheet v-model="showtime" :menus="menus" @on-click-menu="selectime" show-cancel></actionsheet>
            <actionsheet v-model="showMenu" :menus="isAgentEmpty ? menus21 : menus2" @on-click-menu="selecH" :show-cancel="!isAgentEmpty"
                :close-on-clicking-mask="!isAgentEmpty" ></actionsheet>
        </div>

    </div>
</template>
<script>
    import { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell } from 'vux'
    export default {
        components: { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell },
        data() {
            return {
                formData: {
                    custName: '',
                    startDate: '',
                    endDate: '',
                    pageNo: 1,
                    pageSize: 10,
                    agentName:''
                },
                loading: false,
                childrenList: [],
                totalSize: 0,
                showMenu: false,
                selectItemData: [],
                menus: {
                    today: '今天',
                    yestoday: '昨天',
                    tom: '本月',
                    lam: '上月',
                },
                menus2: {
                    custName: {
                        label: '-',
                        type: 'info'
                    },
                    // 查看团队报表
                    viewTeamReport: {
                        label: '查看报表',
                        value: 'viewTeamReport'
                    },
                    sub: {
                        label: '查看下级',
                        value: 'sub'
                    }
                },
                showtime: false,
                seeChildrenList: [],
                hierarchy: [],
                time: '今天'
            }
        },
        created() {
            this.getAgentChildReport()
        },
        computed: {
            /** 是否本级代理（非当前代理）拥有下级代理或会员 */
            isAgentEmpty() {
                // 下级报表用custName 判断，且数据为0时
                return Boolean(this.childrenList.length == 0 && this.formData.custName);
            },
            menus21() {
                return {
                    custName: { label: `<font color="3388ff">${this.formData.custName}</span>`, type: 'info'},
                    back: '返回上级'
                }
            }
        },
        methods: {
            getAgentChildReport() {
                this.loading = true
                this.$api.post('/getAgentChildReport', this.formData).then(data => {
                    this.loading = false
                    if (data.success) {
                        this.childrenList = this.childrenList.concat(data.list)
                        if (this.isAgentEmpty) { this.showMenu = true; }
                        this.totalSize = data.totalSize
                    } else {
                        this.$dialog({
                            title: '提示',
                            message: data.msg
                        })
                    }
                })
            },
            goAgentReport(name) {
                this.$router.push({ name: 'agentReport', params: { custName: name } })
            },
            LoadMore() {
                this.formData.pageNo++
                this.getAgentChildReport()
            },
            serch(){
                this.childrenList = []
                this.formData.custName = ''
                this.getAgentChildReport()
            },
            selectime(timeval) {
                this.childrenList = []
                this.totalSize = 0
                this.formData.pageNo = 1
                if (timeval == 'today') {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.endDate = ""
                    this.getAgentChildReport()
                } else if (timeval == 'yestoday') {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + (tod.getDate());
                    this.getAgentChildReport();
                } else if (timeval == 'tom') {
                    this.time = '本月'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + 1;
                    this.formData.endDate = ""
                    this.getAgentChildReport();
                } else if (timeval == 'lam') {
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
            selecH(menu) {
                if (menu == 'custName') return;
                if (menu == 'viewTeamReport') {
                    const { custName } = this.selectItemData || {};
                    return this.$router.push({name: 'agentReport', params: {custName} });
                }
                if (menu == 'sub') {
                    this.seeChildrenList.push(this.selectItemData)
                    this.formData.custName = this.selectItemData.custName
                    this.formData.pageNo = 1
                    this.childrenList = []
                    this.totalSize = 0
                    this.getAgentChildReport()
                    this.menus2.back = "返回上级"

                    if (this.showMenu) this.showMenu = false;
                } else if (menu == 'back') {
                    this.seeChildrenList.pop()
                    if(this.seeChildrenList.length){
                        this.formData.custName = this.seeChildrenList[this.seeChildrenList.length - 1].custName
                    }else{
                        this.formData.custName = ""
                        delete this.menus2.back
                    }

                    this.formData.pageNo = 1
                    this.childrenList = []
                    this.totalSize = 0
                    this.getAgentChildReport()
                }
            },
            seeSub(item) {

                // 常量类
                const { CustType } = this.$consts;

                this.menus2.custName = `<font color="3388ff">${item.custName}</span>`;
                const isAgent = CustType.C_AGENT == item.custType;
                this.menus2.sub.type = isAgent ? null : 'disabled';


                this.showMenu = true
                this.selectItemData = item
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
<style scoped>
    @import '../../../assets/header.css';
</style>
<style>
</style>
