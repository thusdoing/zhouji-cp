<template>
    <div>
        <wv-header title="交易详情" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div @click="showtime=true" class="btn-menu" slot="right">
                {{time}}
            </div>
        </wv-header>
        <div class="contentbox">
            <div style="display: flex;">
                <wv-search-bar style="flex: 1" :autofocus="false" v-model="formData.custName" cancel-text=""></wv-search-bar>
                <wv-button @click="serch" type="warn" :mini="true" style="height: 30px;margin: 7px 12px 0 0;">搜索</wv-button>
            </div>

            <tab :animate="false">
                <tab-item selected active-class="active-red" @on-item-click="onItemClick">所有类型</tab-item>
                <tab-item active-class="active-red" @on-item-click="onItemClick">充值记录</tab-item>
                <tab-item active-class="active-red" @on-item-click="onItemClick">提现记录</tab-item>
            </tab>

            <!-- 交易详情：tab-contnt -->
            <!-- 交易记录使用另外组件 -->
            <Group v-if="formData.type == 'recharge'">
                <template v-for="(item,index) in recordList">

                <!-- 充值成功 -->
                 <GridRowItem v-if="$consts.RechargeStatus.C_SUCCESS == item.rechargeStatus"
                    :item="item" :key="index" :title="$consts.OperationMode[item.rechargeChannel]"
                    :msgOne="$Date(item.insertDate)"
                    :msgDiscount="`充值：${item.rechargeAmt.toFixed(2)}，到账：${item.actuallyAmt.toFixed(2)}`"
                    :icon="false" :texts="rechargeRechargeStatusHtml(item)"></GridRowItem>

                <!-- 充值其余状态，ERROR, APPLYING, ONLINE_APPLYING -->
                 <GridRowItem v-else
                    :item="item" :key="index" :title="$consts.OperationMode[item.rechargeChannel]"
                    :msgOne="$Date(item.insertDate)"
                    :msgDiscount="item.rechargeRemark || ''"
                    :icon="false" :texts="rechargeRechargeStatusHtml(item)"></GridRowItem>
                </template>
            </Group>
            <!-- 所有类型/提现记录 -->
            <Group v-else>
                <div v-for="(item, index) in recordList" :key="index" data-v-2f7023d4="" class="weui-media-box weui-media-box_appmsg">
                    <div data-v-2f7023d4="" class="weui-media-box__bd">
                        <h4 data-v-2f7023d4="" class="weui-media-box__title">{{item.custName}}
                            <span v-if="item.addAmt||item.giveAmt" style="margin-left: 12px;font-size: 13px;color: tomato;float: right">{{item.addAmt||item.giveAmt}}</span>
                            <span v-if="item.subAmt||item.withAmt" style="margin-left: 12px;font-size: 13px;color: green;float: right">-{{item.subAmt||item.withAmt}}</span>
                        </h4>
                        <p data-v-2f7023d4="" class="weui-media-box__desc">{{$Date(item.applyDate || item.insertDate)}}
                            <span style="margin-left: 12px;font-size: 13px;color:#aaa;float: right">{{item.changeType||item.rechargeStatus||item.withStatus|status}}</span>
                        </p>
                    </div>
                </div>
            </Group>


            <load-more v-if="loading" tip="正在加载"></load-more>
            <template v-else>
                <div v-if="totalSize>recordList.length">
                    <div @click="loadmore()" style="text-align: center;color: #333;font-size: 15px;line-height: 60px;">点击加载更多</div>
                </div>
                <div v-if="totalSize==recordList.length">
                    <load-more :show-loading="false" tip="已显示全部内容" background-color="#fbf9fe"></load-more>
                </div>
            </template>

            <actionsheet v-model="showtime" :menus="menus" @on-click-menu="selectime" show-cancel></actionsheet>
        </div>

    </div>
</template>
<script>
    import { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem } from 'vux'
    import GridRowItem from '@/components/extend/gridRowItem';
    export default {
        components: { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem, GridRowItem },
        data() {
            return {
                formData: {
                    custName: '',
                    type: 'change',//type:类型---change=账户明细,with=提现记录,recharge=充值记录
                    startDate: '',
                    endDate: '',
                    pageNo: 1,
                    pageSize: 10,
                },
                recordList: [],
                time: '今天',
                loading: false,
                totalSize: 0,
                showtime: false,
                menus: {
                    today: '今天',
                    yestoday: '昨天',
                    sevenday: '七天',
                },
            }
        },
        created() {
            let todaytime = new Date();
            this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
            this.getAgentDealingsRecord()
        },
        methods: {
            /** 充值记录-充值状态 */
            rechargeRechargeStatusHtml(item) {
                // 常量类-充值状态
                const { RechargeStatus } = this.$consts;

                const { rechargeStatus, rechargeAmt = 0 } = item;
                // 获取常量类名称
                const text = RechargeStatus[rechargeStatus] || '-';

                // 充值成功
                if (RechargeStatus.C_SUCCESS == rechargeStatus) {
                    return `<font color="red">${text}</font>`;
                }

                // 充值失败
                if (RechargeStatus.C_ERROR == rechargeStatus) {
                    return `<font color="red">${rechargeAmt.toFixed(2)} ${text}</font>`;
                }

                // 其余状态，APPLYING, ONLINE_APPLYING
                return `<font color="#5E5E5E">${rechargeAmt.toFixed(2)} ${text}</font>`;
            },
            getAgentDealingsRecord() {
                this.loading = true
                this.$api.post('/getAgentDealingsRecord', this.formData).then(data => {
                    this.loading = false
                    if (data.success) {
                        this.recordList = this.recordList.concat(data.list)
                        this.totalSize = data.totalSize
                    } else {
                        this.recordList = [];
                        this.totalSize = 0;
                    }
                })
            },
            loadmore() {
                this.formData.pageNo++
                this.getAgentDealingsRecord()
            },
            serch() {
                this.formData.pageNo = 1
                this.recordList = [];
                this.totalSize = 0;
                this.getAgentDealingsRecord()
            },
            onItemClick(i) {
                if (i === 0) {
                    this.formData.type = "change"
                    this.serch()
                } else if (i == 1) {
                    this.formData.type = "recharge"
                    this.serch()
                } else if (i == 2) {
                    this.formData.type = "with"
                    this.serch()
                }
            },
            selectime(timeval) {
                if (timeval == 'today') {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.endDate = ""
                    this.serch()
                } else if (timeval == 'yestoday') {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + (tod.getDate());
                    this.serch();
                } else if (timeval == 'sevenday') {
                    this.time = '七天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date(time);
                    this.formData.startDate = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.endDate = ""
                    this.serch();
                }
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
            },
            status:function(value){
                if(isNaN(value)){
                    return value
                }
                if (value == '010604' || value == '010601') {
                    return '充值中'
                }else if (value == '010602') {
                    return '充值成功'
                }else if (value == '010603') {
                    return '充值失败'
                }else if (value == '010501') {
                    return '处理中'
                }else if (value == '010502') {
                    return '提现成功'
                }else if (value == '010503') {
                    return '提现失败'
                }else if (value == '010201') {
                    return '公司操作'
                }else if (value == '010202') {
                    return '在线支付'
                }else if (value == '010203') {
                    return '人工操作'
                }else if (value == '010204') {
                    return '快捷支付'
                }

            }
        }
    }
</script>
<style scoped>
    @import '../../../assets/header.css';
    .weui-media-box__bd label {
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
    }

    .weui-media-box__bd label.statutextred {
        color: tomato;
    }

    .weui-media-box__bd label.statutextg {
        color: green;
    }

    .weui-media-box__bd label.statutexth {
        color: grey;
    }
</style>
<style>
    .active-red {
        color: #dc3b40 !important;
        border-color: #dc3b40 !important;
    }
</style>
