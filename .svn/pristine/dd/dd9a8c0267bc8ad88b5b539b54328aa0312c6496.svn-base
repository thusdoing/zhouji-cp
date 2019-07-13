<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>投注明细
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <ul class="_1KCWQ _2ram0">
                <div style="text-align: left;padding-left: 20px;">
                    <b>账号：</b>
                    <Input style="width: 120px;margin-left: 15px;" v-model="formData.custName"></Input>
                    <Button @click="changPage(1)" type="primary" style="background-color: #2e4158;border-color: #2e4158;">搜索</Button>
                </div>
            </ul>
            <ul class="_1KCWQ">
                <li class="gPVvn">
                    <span class="_2dqD4">彩种： </span>
                    <div class="_2P-lK">
                        {{lett==''?'全部游戏':lett}}
                        <select v-model='gameNo' class="_1p-p1">
                            <option value="">全部游戏</option>

                            <option v-for='(sub, index) in gameData' :key="index" :value="sub.gameNo">{{sub.gameName}}</option>

                        </select>

                    </div>
                </li>
                <li class="gPVvn">
                    <span class="_2dqD4">时间： </span>
                    <button class="_2eCWc" :class='date=="today"?"_14X1Z":""' @click='selTime("today")' type="button">今天</button>
                    <button class="_2eCWc false" type="button" @click='selTime("yestoday")' :class='date=="yestoday"?"_14X1Z":""'>昨天</button>
                    <button class="_2eCWc false" type="button" @click='selTime("seven")' :class='date=="seven"?"_14X1Z":""'>七天</button>
                </li>
                <li class="gPVvn">
                    <span class="_2dqD4">类型： </span>
                    <button class="_2eCWc" :class="formData.betStatus==''?'_14X1Z':''" type="button" @click='selStatus("")'>全部</button>
                    <button class="_2eCWc false" :class="formData.betStatus=='2'?'_14X1Z':''" type="button" @click='selStatus("2")'>已中奖</button>
                    <button class="_2eCWc false" :class="formData.betStatus=='1'?'_14X1Z':''" type="button" @click='selStatus("1")'>未中奖</button>
                    <button class="_2eCWc false" :class="formData.betStatus=='0'?'_14X1Z':''" type="button" @click='selStatus("0")'>等待开奖</button>
                </li>
            </ul>
            <table width="100%" cellspacing="0" cellpadding="0">
                <thead class="_3apNX">
                    <tr>
                        <th>账号</th>
                        <th>彩种</th>
                        <th>期号</th>
                        <th>投注内容</th>
                        <th>投注金额</th>
                        <th>开奖号码</th>
                        <th>奖金状态</th>
                        <th>投注时间</th>
                        <th>操作项</th>
                    </tr>
                </thead>
                <tbody class="-QUHL">
                    <tr v-if='recordList.length==0'>
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
                    <tr v-else v-for='(item, index) in recordList' :key="index">
                        <td class="_35NCS">{{item.custName}}</td>
                        <td >{{item.gameName}}</td>
                        <td>{{item.gameNumber}}</td>
                        <td>
                            <Tooltip :content="item.groupClassName+'>'+(item.groupClassName == item.groupClassConName?'':item.groupClassConName) +'>'+(item.groupClassConName == item.groupName?'':item.groupName)+' '+ (item.betContent == item.groupName?'':(betshowcontent(item.betContent)))" placement="top">
                                <p :title="item.betContent" class="_1574P ellipsis">{{item.groupClassName+'>'+(item.groupClassName == item.groupClassConName?"":item.groupClassConName) +'>'+(item.groupClassConName == item.groupName?"":item.groupName)+" "+ (item.betContent == item.groupName?"":(betshowcontent(item.betContent)))}}</p>
                            </Tooltip>
                        </td>
                        <td>{{item.betAmt}}</td>
                        <td>{{item.gameOpenNo}}</td>
                        <td>{{item.betStatus}}</td>
                        <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.betDate}"></td>
                        <td class="_9TAbw" style="cursor: pointer;" @click="$router.push({name:'transactionDetails',params:{item:item}})">查看</td>
                    </tr>
                </tbody>
            </table>
            <div class="cf">
                <Page v-if="total>10" @on-change='changPage' style="text-align: right;margin: 10px" :current="formData.pageNo" :total="total"
                    size="small" show-elevator></Page>
            </div>
            <div class="Vxtwm _1Hs7s">
                <p>
                    <img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：投注记录最多只保留7天。
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
                gameData: [],
                formData: {
                    betType: '',
                    gameNo: '',
                    betDateStart: "",
                    betDateEnd: "",
                    betStatus: "",
                    pageNo: 1,
                    pageSize: 10,
                    custName:'',
                    agentName:''
                },
                total: 0,
                recordList: [],
                arr: null,
                flag: true,
                url: 'http://www.lm699.com',
                current: null,
                content: null,
                lett: '',
                gameNo: '',
                date: 'today',
                condition: {},
                loading: false
            }
        },
        computed: {
            bonusAmt: function () {
                let Amt = 0
                Amt = (this.condition.profitAmt - this.condition.betAmtTotal).toFixed(2)
                return Amt
            },
        },
        created() {
            this.formData.custName = this.$route.query.custName || ""
            let todaytime = new Date();
            this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
            this.getGameAll()
            this.getBetRecodes()
        },
        filters: {
            betshowcontent: function (data) {
                return data.split("").map(
                    (el) => {
                        switch (el) {
                            case 'a': return '大';
                            case 'b': return '小';
                            case 'c': return '单';
                            case 'd': return '双';
                            default: return el;
                        }
                    }).join("")
            }
        },
        watch: {

            gameNo: function () {
                this.formData.gameNo = this.gameNo;
                this.formData.pageNo = 1
                this.getBetRecodes();
                for (let i in this.gameData) {

                    if (this.gameData[i].gameNo == this.gameNo) {
                        this.lett = this.gameData[i].gameName
                    }

                }
            }
        },
        methods: {
            selTime(date) {
                this.date = date;
                if (date == 'today') {
                    this.formData.betDateStart = '';
                    let todaytime = new Date();
                    this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                    this.formData.betDateEnd = ""
                    this.formData.pageNo = 1
                    this.getBetRecodes();
                }
                if (date == 'yestoday') {
                    // this.formData.betDateStart = '';
                    // let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    // let todaytime = new Date(time);
                    // let tod = new Date();
                    // this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    // this.formData.betDateEnd = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (tod.getDate());

                    const now = new Date();
                    const yestoday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
                    this.formData.betDateStart = `${yestoday.getFullYear()}/${yestoday.getMonth() + 1}/${yestoday.getDate()}`;
                    this.formData.betDateEnd = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;

                    this.formData.pageNo = 1
                    this.getBetRecodes();
                }
                if (date == 'seven') {
                    this.formData.betDateStart = '';
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date(time);
                    this.formData.betDateStart = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + (todaytime.getDate());
                    this.formData.betDateEnd = ""
                    this.formData.pageNo = 1
                    this.getBetRecodes();
                }
            },
            selStatus(statu) {
                this.formData.betStatus = statu;
                this.formData.pageNo = 1
                this.getBetRecodes();
            },
            getGameAll() {
                let _this = this;
                axios.get('/getGame').then(function (data) {
                    if (data.data.success) {
                        if (data.data.list != null && data.data.list != undefined) {
                            _this.gameData = data.data.list
                        } else {
                            _this.gameData = [];
                        }
                    }
                });
            },
            betshowcontent: function (data) {
                return data.split("").map(
                    (el) => {
                        switch (el) {
                            case 'a': return '大';
                            case 'b': return '小';
                            case 'c': return '单';
                            case 'd': return '双';
                            default: return el;
                        }
                    }).join("")
            },
            getBetRecodes() {
                this.loading = true;
                this.recordList = [];
                let _this = this;
                axios.post('/getAgentBetRecodes', _this.formData).then(function (data) {
                    if (data.data.success) {
                        if (data.data.list != null && data.data.list != undefined && data.data.list.length > 0) {
                            _this.recordList = data.data.list;
                            _this.total = data.data.totalSize;
                        } else {
                            _this.recordList = [];
                            _this.total = 0;
                        }
                    };
                    _this.loading = false
                });

            },
            changPage(page) {
                this.formData.pageNo = page;
                this.getBetRecodes();
            }

        },
        mounted() {
        }

    }
</script>