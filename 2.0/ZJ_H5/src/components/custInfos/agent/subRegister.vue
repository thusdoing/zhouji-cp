<template>
    <div class="placeholders">
        <x-header style="background-color:#ec2829;position: fixed;top: 0;left: 0;width: 100%;z-index: 99;" title="slot:overwrite-title">
            <div class="overwrite-title-demo agent-header-checker" slot="overwrite-title">
                <span @click="tabs=1" class="btn" :class="tabs == 1?'active':''">下级开户</span>
                <span @click="tabs=2;selectType()" class="btn" :class="tabs == 2?'active':''">邀请码</span>
            </div>
        </x-header>
        <div v-if="tabs==1" class="contentbox">
            <group>
                <cell title="开户类型">
                    <div solt="after-title">
                        <check-icon :value.sync="daili">代理类型</check-icon>
                        <check-icon :value.sync="wanjia">玩家类型</check-icon>
                    </div>
                </cell>
                <cell title="请为下级设置返点">
                    <div style="color: #dc3b40" @click="$router.push('/rebateDes')">点击查看返点赔率表</div>
                </cell>
            </group>
            <group>
                <template v-for="(item, index) in myGameRebatesList">
                    <x-input label-width="4.5em" v-model="item.setRebate" :title="item.gameTypeName" :key="index"
                        :placeholder="`自身返点${item.rebate||'0.0'},可设置返点0.0-${item.childrenMaxRebate||item.rebate||'0.0'}`"></x-input>
                </template>
                <div style="padding: 20px 10px">
                    <x-button type="warn" @click.native="toAddInvite" action-type="button">生成邀请码</x-button>
                </div>

            </group>
        </div>
        <div v-if="tabs==2" class="contentbox">
            <group>
                <cell title="开户类型">
                    <div solt="after-title">
                        <check-icon :value.sync="daili">代理类型</check-icon>
                        <check-icon :value.sync="wanjia">玩家类型</check-icon>
                    </div>
                </cell>
            </group>
            <group>
                <x-table :cell-bordered="false" style="background-color:#fff;">
                    <thead>
                        <tr style="background-color: #F7F7F7">
                            <th>邀请码</th>
                            <th>生成时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="selectItem(item,index)" v-for="(item, index) in myInviteInfoList" :key="index" style="font-size: 15px">
                            <td style="color: #3388ff">{{item.inviteCode}}</td>
                            <td>{{$Date(item.insertDate)}}</td>
                            <td>注册（{{item.totalRegister}}）</td>
                        </tr>
                    </tbody>
                </x-table>

            </group>
            <load-more v-if="loading" tip="正在加载"></load-more>
            <template v-else>
                <div v-if="totalSize>myInviteInfoList.length">
                    <div @click="myInviteInfo()" style="text-align: center;color: #333;font-size: 15px;line-height: 60px;">点击加载更多</div>
                </div>
                <div v-if="totalSize==myInviteInfoList.length">
                    <load-more :show-loading="false" tip="已显示全部内容" background-color="#fbf9fe"></load-more>
                </div>
            </template>

            <actionsheet v-model="show2" :menus="menus2" @on-click-menu="selectMenu" show-cancel></actionsheet>

            <popup v-if="selectItemIndex" v-model="showRebat">
                <popup-header right-text="关闭" title="返点详情" :show-bottom-border="false" @on-click-right="showRebat = false"></popup-header>
                <group gutter="0">
                    <cell v-for="(item, index) in myGameRebatesList" :key="index" :title="item.gameTypeName"><div style="width: 25vw;text-align: left;color: #333">{{JSON.parse(selectItemData.gameRebates)[item.gameType]}}</div></cell>
                </group>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'we-vue'
    import { Cell, XInput, CheckIcon, XHeader, Group, XButton, XTable, LoadMore, Actionsheet, PopupHeader, Popup, } from 'vux'
    export default {
        components: { Cell, XInput, CheckIcon, XHeader, Group, XButton, XTable, LoadMore, Actionsheet, PopupHeader, Popup, },
        data() {
            return {
                tabs: 1,
                formData: {
                    custType: '010701', //010701：代理，010703：会员
                    serviceUrl: location.origin,
                },
                serchForm: {
                    custType: '010701',
                    pageNo: 1,
                    pageSize: 10
                },
                daili: true,
                wanjia: false,
                myGameRebatesList: [],
                myInviteInfoList: [],
                totalSize: 0,
                loading: false,
                show2: false,
                menus2: {
                    copy: "复制推广码",
                    see: "查看返点",
                    del: "删除邀请码"
                },
                selectItemData: {},
                selectItemIndex: "",
                showRebat:false
            }
        },
        watch: {
            daili: function (n) {
                this.wanjia = !this.daili
                this.selectType()
            },
            wanjia: function () {
                this.daili = !this.wanjia
            }
        },
        methods: {
            myGameRebates() {
                this.$api.get('/myGameRebates').then(data => {
                    if (data.success) {
                        this.myGameRebatesList = data.list
                    } else {
                        this.$dialog({ title: '提示', message: '获取信息失败，请稍后再试', skin: 'ios' });
                    }
                }, () => { })
            },
            toAddInvite() {
                for (let el of this.myGameRebatesList) {
                    if (!el.setRebate) {
                        this.$dialog({ title: '提示', message: '返点不能为空', skin: 'ios' });
                        return
                    }
                    if (el.setRebate > (el.childrenMaxRebate || el.rebate || 0) || el.setRebate < 0) {
                        this.$dialog({ title: '提示', message: '信息填写错误，请正确填写返点范围', skin: 'ios' });
                        return
                    }
                    if (el.setRebate * 10 % 1 > 0) {
                        this.$dialog({ title: '提示', message: '只能有一位小数，请正确填写', skin: 'ios' });
                        return
                    }
                    this.formData[el.gameType] = Number(el.setRebate).toFixed(1)
                }
                this.formData.custType = this.daili ? '010701' : '010703'
                this.$api.post('/toAddInvite', this.formData).then(data => {
                    if (data.success) {
                        this.$dialog({ title: '提示', message: '生成成功', skin: 'ios' });
                        this.tabs = 2
                        this.selectType()
                    } else {
                        this.$dialog({ title: '提示', message: data.msg, skin: 'ios' });
                    }
                })
            },
            myInviteInfo() {
                this.loading = true
                this.serchForm.custType = this.daili ? '010701' : '010703'
                this.$api.post('/myInviteInfo', this.serchForm).then(data => {
                    this.loading = false
                    if (data.success) {
                        this.serchForm.pageNo++
                        this.myInviteInfoList = this.myInviteInfoList.concat(data.list)
                        this.totalSize = data.totalSize
                    }
                })
            },
            selectType() {
                if (this.tabs == 1) return
                this.myInviteInfoList = []
                this.totalSize = 0
                this.serchForm.pageNo = 1
                this.myInviteInfo()
            },
            selectItem(item, index) {
                this.show2 = true
                this.selectItemData = item
                this.selectItemIndex = ''+index
            },
            selectMenu(menu) {
                if (menu == 'copy') {
                    this.doCopy()
                } else if (menu == 'see') {
                    this.showRebat = true
                } else if (menu == 'del') {
                    this.delmyInviteInfo()
                }
            },
            doCopy() {
                this.$copyText(this.selectItemData.inviteCode).then((e) => {
                    Toast.text({
                        duration: 1500,
                        message: '复制成功，赶快去推广吧'
                    })
                }, (e) => {
                    Toast.text({
                        duration: 1500,
                        message: '复制失败，你的浏览器可能不支持该功能，手动复制吧'
                    })
                })
            },
            delmyInviteInfo() {
                this.$dialog.confirm({ title: '提示', message: '确定删除吗？', skin: 'ios' }).then(() => {
                    this.$api.post('/saveInviteCode', { tableKey: this.myInviteInfoList[this.selectItemIndex].tableKey, codeStatus: 0 }).then(data => {
                        if (data.success) {
                            this.myInviteInfoList.splice(this.selectItemIndex, 1)
                            this.$dialog({ title: '提示', message: '删除成功', skin: 'ios' });
                        }
                    })
                }, () => { })

            },
        },
        created() {
            this.myGameRebates()
        },
        mounted() {

        }
    }
</script>
<style scoped>
    @import '../../../assets/header.css';
      .placeholders >>> input::-webkit-input-placeholder  {
         color: #aaa;
     }
</style>
<style>
    .contentbox {
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }

    .overwrite-title-demo {}

    /** 有两个地方用了 overwrite-title-demo 样式， 代理头部样式需要下面的样式*/
    .overwrite-title-demo.agent-header-checker {
        display: flex;
        text-align: center;
        padding-top: 4px;
    }

    .overwrite-title-demo .btn {
        flex: 1;
        border: 1px solid #fff;
        color: #fff;
        line-height: 30px;
    }

    .overwrite-title-demo .btn:nth-child(1) {
        border-radius: 18px 0 0 18px;
    }

    .overwrite-title-demo .btn:nth-child(2) {
        border-radius: 0 18px 18px 0;
    }

    .contentbox .weui-loadmore_line .weui-loadmore__tips {
        background-color: transparent;
    }

   
</style>