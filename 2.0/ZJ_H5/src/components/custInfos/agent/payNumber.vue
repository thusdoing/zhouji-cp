<template>
        <div>
            <wv-header title="充值人数" class="header">
                <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                    <i class="el-icon-arrow-left" slot="icon"></i>
                </div>
            </wv-header>
            <div class="contentbox">
                <x-table :cell-bordered="false" style="background-color:#fff;">
                    <thead>
                        <tr style="background-color: #F7F7F7">
                            <th>账号</th>
                            <th>上级代理</th>
                            <th>充值金额</th>
                            <th>注册时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in childrenList" :key="index" style="font-size: 15px"  @click="seeSub(item)">
                            <td>{{item.custName}}</td>
                            <td>{{item.agentName}}</td>
                            <td>{{item.rechargeAmt}}</td>
                            <td>{{$Date(item.registerDate)}}</td>
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
                        pageSize: 10
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
                this.formData = {...this.formData,...this.$route.query.form} 
                console.log(this.$route.query)
                this.getFirstRecharge()
            },
            computed: {

            },
            methods: {
                getFirstRecharge() {
                    this.loading = true
                    this.$api.post('/getFirstRecharge', this.formData).then(data => {
                        this.loading = false
                        if (data.success) {
                            this.childrenList = this.childrenList.concat(data.list)
                            this.totalSize = data.totalSize
                        } else {
                            this.$dialog({
                                title: '提示',
                                message: data.msg
                            })
                        }
                    })
                },
                LoadMore() {
                    this.formData.pageNo++
                    this.getFirstRecharge()
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
    <style scoped>
        @import '../../../assets/header.css';
    </style>
    <style>
    </style>
    