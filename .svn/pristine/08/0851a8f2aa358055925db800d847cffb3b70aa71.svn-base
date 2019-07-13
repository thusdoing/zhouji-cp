<template>
    <div>
        <wv-header title="会员管理" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
        </wv-header>
        <div class="contentbox">
            <x-table :cell-bordered="false" style="background-color:#fff;">
                <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>账号</th>
                        <th>状态</th>
                        <th>类型</th>
                        <th>上级代理</th>
                        <th>登录时间</th>
                        <th>下级人数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr @click="selectItem(item,index)" v-for="(item, index) in childrenList" :key="index" style="font-size: 15px">
                        <td style="color: #3388ff">{{item.custName}}</td>
                        <td :style="`color: ${item.online==1?'red':'#2c3e50'}`">{{item.online==1?"在线":"离线"}}</td>
                        <td>{{item.custType|custType}}</td>
                        <td>{{item.agentName}}</td>
                        <td>{{$Date(item.lastSignDate,'yyyy-MM-dd')}}</td>
                        <td>{{item.childrenNumber}}</td>
                    </tr>
                </tbody>
            </x-table>



            <load-more v-if="loading" tip="正在加载"></load-more>
            <template v-else>
                <div v-if="totalSize>childrenList.length">
                    <div @click="myInviteInfo()" style="text-align: center;color: #333;font-size: 15px;line-height: 60px;">点击加载更多</div>
                </div>
                <div v-if="totalSize==childrenList.length">
                    <load-more :show-loading="false" tip="已显示全部内容" background-color="#fbf9fe"></load-more>
                </div>
            </template>

            <actionsheet v-model="showaMenu" :menus="menus" @on-click-menu="selectMenu" show-cancel></actionsheet>

            <popup v-model="showDateil">
                <popup-header right-text="关闭" title="返点详情" :show-bottom-border="false" @on-click-right="showDateil = false"></popup-header>
                <group gutter="0">
                    <cell v-for="(item, index) in userRebateInfo" :key="index" :title="item.gameTypeName">
                        <div style="width: 25vw;text-align: left;color: #333">{{item.rebate}}</div>
                    </cell>
                </group>
            </popup>
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
                    agentName:'',
                    custName: '',
                    custType: '',
                    pageNo: 1,
                    pageSize: 10
                },
                loading: false,
                childrenList: [],
                totalSize: 0,
                showaMenu: false,
                selectItemData: [],
                menus: [{
                    label: '',
                    type: 'primary',
                }, {
                    label: '查看返点',
                    value: 'rebate',
                }, {
                    label: '查看下级',
                    value: 'sub',
                }],
                showDateil: false,
                userRebateInfo: [],
                hierarchy: []
            }
        },
        created() {
            this.getChildrenList()
        },
        methods: {
            myInviteInfo() {
                this.formData.pageNo += 1;
                this.getChildrenList();
            },
            getChildrenList() {
                this.loading = true
                this.$api.post('/getChildrenList', this.formData).then(data => {
                    this.loading = false
                    if (data.success) {
                        this.childrenList.push(...data.list);
                        this.totalSize = data.totalSize
                    }
                })
            },
            selectItem(item) {
                this.showaMenu = true
                this.menus[0].label = item.custName
                this.selectItemData = item
                if (this.selectItemData.childrenNumber === 0) {
                    this.menus[2].type = 'disabled'
                }else{
                    this.menus[2].type = 'Default'
                }
            },
            selectMenu(menu) {
                if (menu == 'sub') {
                    this.formData.agentName = this.selectItemData.custName
                    this.hierarchy.push(this.selectItemData)
                    if (this.hierarchy.length > 0 && this.menus.length == 3) {
                        this.menus.push({
                            label: '返回上级',
                            value: 'back',
                        })
                    }
                    this.childrenList = [];
                    this.formData.pageNo = 1;
                    this.getChildrenList()
                } else if (menu == 'rebate') {
                    this.getUserRebateInfo()
                } else if (menu == 'back') {
                    this.hierarchy.pop()
                    if (this.hierarchy.length === 0) {
                        this.menus = this.menus.slice(0,3)
                    }
                    this.formData.agentName = this.hierarchy.length == 0 ? "" : this.hierarchy[this.hierarchy.length - 1].custName
                    this.childrenList = [];
                    this.formData.pageNo = 1;
                    this.getChildrenList()
                }
            },
            getUserRebateInfo() {
                this.showDateil = true
                this.$api.get('/getUserRebateInfo', { custName: this.selectItemData.custName }).then(data => {
                    if (data.success) {
                        this.userRebateInfo = data.list
                    } else {
                        this.$dialog({ title: '提示', message: data.msg, skin: 'ios' });
                    }
                })
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