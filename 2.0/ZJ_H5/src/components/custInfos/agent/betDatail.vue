<template>
    <div>
        <wv-header title="投注详情" class="header">
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
                <tab-item selected active-class="active-red" @on-item-click="onItemClick">全部</tab-item>
                <tab-item active-class="active-red" @on-item-click="onItemClick">已中奖</tab-item>
                <tab-item active-class="active-red" @on-item-click="onItemClick">未中奖</tab-item>
                <tab-item active-class="active-red" @on-item-click="onItemClick">等待开奖</tab-item>
            </tab>

            <Group>
                <div v-for="(item, index) in recordList" :key="index" class="weui-media-box weui-media-box_appmsg" @click="$router.push({name:'betDetails',params:{item:item, revokeBetEnable: false}})">
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.custName}}
                            <span style="margin-left: 12px;font-size: 13px;color: tomato">￥{{item.betAmt}}</span>
                        </h4>
                        <p class="weui-media-box__desc">{{$Date(item.betDate)}}</p>
                        <label :class="{'statutextred':!isNaN(item.betStatus),'statutextg':item.betStatus=='等待开奖','statutexth':item.betStatus=='未中奖'}">{{item.betStatus}}</label>
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
    export default {
        components: { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem },
        data() {
            return {
                formData: {
                    betType: '',
                    gameNo: '',
                    betDateStart: "",
                    betDateEnd: "",
                    betStatus: "",
                    pageNo: 1,
                    pageSize: 10,
                    custName: ''
                },
                time: '今天',
                loading: false,
                recordList: [],
                totalSize: 0,
                showtime: false,
                menus: {
                    today:'今天',
                    yestoday:'昨天',
                    sevenday:'七天',
                },
            }
        },
        created() {
            let todaytime = new Date();
            this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
            this.getBetRecodes()
        },
        methods: {
            getBetRecodes() {
                this.loading = true;
                let _this = this;
                this.$api.post('/getAgentBetRecodes', _this.formData).then(function (data) {
                    if (data.success) {
                        if (data.list != null && data.list != undefined && data.list.length > 0) {
                            _this.recordList = _this.recordList.concat(data.list);
                            _this.totalSize = data.totalSize;
                        } else {
                            _this.recordList = [];
                            _this.totalSize = 0;
                        }
                    };
                    _this.loading = false
                });

            },
            loadmore() {
                this.formData.pageNo++
                this.getBetRecodes()
            },
            serch() {
                this.formData.pageNo = 1
                this.recordList = [];
                this.totalSize = 0;
                this.getBetRecodes()
            },
            onItemClick(i) {
                if (i === 0) {
                    this.formData.betStatus = ""
                    this.serch()
                } else if (i == 1) {
                    this.formData.betStatus = "2"
                    this.serch()
                } else if (i == 2) {
                    this.formData.betStatus = "1"
                    this.serch()
                } else if (i == 3) {
                    this.formData.betStatus = "0"
                    this.serch()
                }
            },
            selectime(timeval) {
                if (timeval == 'today') {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.betDateEnd = ""
                    this.serch()
                } else if (timeval == 'yestoday') {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.betDateEnd = tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + (tod.getDate());
                    this.serch();
                } else if (timeval == 'sevenday') {
                    this.time = '七天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date(time);
                    this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.betDateEnd = ""
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