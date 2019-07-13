<template>
    <div class="record-wrap">
        <Tabs value="name1" style="width:100%;">
            <TabPane label="历史开奖" name="name1">
                <Table v-if="$route.params.gameType=='11'||$route.params.gameType=='22'||$route.params.gameType=='33'||$route.params.gameType=='88'"
                    :columns="historyListcolumnsNew" :data="historyList"></Table>
                <Table v-if="$route.params.gameType=='44'||$route.params.gameType=='55'" :columns="historyListcolumns" :data="historyList"></Table>
                <Table v-if="$route.params.gameType=='66'" :columns="historyListcolumnslhc" :data="historyList"></Table>
                <div class="more-record">
                    <router-link :to="'/more/'+$route.params.gameNo">更多开奖记录...</router-link>
                </div>
            </TabPane>
        </Tabs>

        <Tabs value="name1" style="width:100%;">
            <TabPane label="我的投注" name="name1">
                <Table :columns="betRecodescolumns" :data="betRecodesList"></Table>
                <div class="more-record">
                    <router-link to="/transaction">更多投注记录...</router-link>
                </div>
            </TabPane>
            <TabPane label="我的追号" name="name2">
                <Table :columns="Superadditioncolumns" :data="SuperadditionBetList"></Table>
                <div class="more-record">
                    <router-link to="/seekOrder">更多投注记录...</router-link>
                </div>
            </TabPane>
        </Tabs>

        <Tabs value="name1" style="width:100%;">
            <TabPane label="中奖信息" name="name1">
                <Table :columns="GameWinnerscolumns" :data="GameWinnersList"></Table>
            </TabPane>
            <!-- <TabPane label="昨日奖金榜" name="name2">
            <Table :columns="columns1" :data="historyList"></Table>
          </TabPane> -->
        </Tabs>
    </div>
</template>

<script>

    import { getOpenBall } from '@/views/betCtTimeHead/ball.js'
    export default {
        props: ['Updated'],
        data() {
            return {
                historyList: [], //历史记录
                historyListcolumnsNew: [
                    {
                        title: '期号',
                        key: 'gameNumber',
                        render: (h, params) => {
                            return h('label', params.row.gameNumber.substring(params.row.gameNumber.length - 3))
                        }
                    },
                    {
                        width: 90,
                        title: '开奖号',
                        render: (h, params) => {
                            return h('Tooltip', {
                                style: {
                                    color: 'red',
                                    width: '92px',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden'
                                },
                                props: {
                                    content: params.row.gameOpenNo,
                                    placement: 'top-start'
                                }
                            }, params.row.gameOpenNo)
                        }
                    },
                    {
                        title: '和值',
                        render: (h, params) => {
                            return h('label', params.row.gameOpenNoCase[0])
                        }
                    },
                    {
                        width: 80,
                        title: '状态',
                        render: (h, params) => {

                            return h('div', params.row.gameOpenNoCase.slice(1).map(function (it) {
                                if (it == "") return
                                return h("div", {
                                    style: {
                                        width: '18px',
                                        height: '18px',
                                        color: 'white',
                                        display: 'inline-block',
                                        textAlign: 'center',
                                        lineHeight: '18px',
                                        marginRight: '5px',
                                        borderRadius: '3px',
                                        backgroundColor: it == '大' || it == '双' || it == '龙' ? '#db383f' : '#5691d7',
                                    },
                                }, it)
                            }))
                        }
                    },
                ],
                historyListcolumns: [{
                    width: 30,
                    title: '期号',
                    key: 'gameNumber',
                    render: (h, params) => {
                        return h('label', params.row.gameNumber.substring(params.row.gameNumber.length - 3))
                    }
                },
                {
                    width: 170,
                    title: '开奖号',
                    render: (h, params) => {
                        return h('label', {
                            style: {
                                color: 'red'
                            }
                        }, params.row.gameOpenNo)
                    }
                },
                {
                    title: '开奖时间',
                    render: (h, params) => {
                        return h('label', {
                            directives: [{
                                name: 'dateFormat',
                                value: {
                                    a: 'hh:mm:ss',
                                    b: params.row.gameOpenDt
                                },
                            }],
                        })
                    }
                }
                ],
                historyListcolumnslhc: [
                    {
                        width: 80,
                        title: '期号',
                        key: 'gameNumber',
                        render: (h, params) => {
                            return h('label', params.row.gameNumber.toString().slice(-8))
                        }
                    },
                    {
                        title: '开奖号',
                        render: (h, params) => {
                            const ball = getOpenBall(params.row.gameOpenDt)
                            let tempArr = params.row.gameOpenNo.split(',').map(el => {
                                return h('div', { style: { flex: '1 1 auto', margin: '8px 0' } }, [
                                    h('div', {
                                        style: {
                                            color: ball[el - 1].color, fontSize: '12px', fontWeight: '700',
                                        }
                                    }, el),
                                    h('div', { style: { fontWeight: '700' } }, ball[el - 1].zoo),
                                ])
                            })
                            let icon = h('Icon', { style: { fontWeight: '700', marginTop: '15px' }, props: { type: "plus-round" } })
                            tempArr.splice(6, 0, icon)
                            return h('div', {
                                style: {
                                    display: 'flex', justifyContent: 'center'
                                }
                            }, tempArr)
                        }
                    }
                ],
                betRecodesList: [], //投注记录
                betRecodescolumns: [{
                    title: '期号',
                    key: 'gameNumber',
                },
                {
                    title: '投注金额',
                    render: (h, params) => {
                        return h('label', {
                            style: {
                                color: 'red'
                            }
                        }, (params.row.betAmt).toFixed(2) + '元')
                    }
                },
                {
                    title: '奖金',
                    render: (h, params) => {
                        return h('label', (params.row.bonusAmt || '0.00') + '元')
                    }
                }
                ],
                SuperadditionBetList: [], //追号记录
                Superadditioncolumns: [{
                    title: '期号',
                    key: 'firstGameNumber',
                    width: 100,
                },
                {
                    title: '已追/总',
                    render: (h, params) => {
                        return h('label', params.row.hasBetCount + '/' + params.row.totalCount)
                    }
                },
                {
                    title: '总金额',
                    key: 'totalAdditionAmt'
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        return h('Tooltip', {
                            style: {
                                color: 'red',
                            },
                            props: {
                                content: `总投注/总奖金：${params.row.totalAdditionBetAmt}/${params.row.totalBonusAmt}`,
                                placement: 'right-start'
                            }
                        }, params.row.bonusStatus)
                    }
                }
                ],
                GameWinnersList: [],
                GameWinnerscolumns: [
                    {
                        title: '期号',
                        key: "gameNumber"

                    },
                    {
                        title: '用户',
                        key: 'custName'
                    },
                    {
                        title: '奖金',
                        key: "bonusAmt"
                    }
                ]
            }
        },
        computed: {
            yu_e:function(){
                return this.$store.state.yu_e
            }
        },
        watch: {
            '$route'(n,o) {
                this.historyList = [];
                this.getGameLatestOpenNoList()
                if(n.params.gameNo==o.params.gameNo) return;
                this.getBetRecodes();
                this.getSuperadditionBetRecodes();
                this.getGameWinners()
            },
            yu_e:function(){
                this.getBetRecodes();
                this.getSuperadditionBetRecodes();
                this.getGameWinners()
                this.getGameLatestOpenNoList('强刷')
            }
        },
        created() {
            this.getGameLatestOpenNoList();
            this.getGameWinners()
            this.getBetRecodes();
            this.getSuperadditionBetRecodes();
        },
        methods: {
            // 查询游戏最新开奖结果列表(开奖历史)
            async getGameLatestOpenNoList(params) {
                let obj = {gameNo:this.$route.params.gameNo}
                if(params) {obj.time = Date.now()}
                const res = await this.$store.cache.dispatch('getGameLatestOpenNoList',obj,{timeout:10000})
                this.historyList = res;
            },
            //查询游戏记录
            getBetRecodes() {
                const todaytime = new Date();
                const today = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                this.$http({
                    method: 'post',
                    url: '/game/getBetRecodes',
                    data: {
                        pageNo: 1,
                        pageSize: 8,
                        betDateStart: today,
                        gameNo: this.$route.params.gameNo,
                        profit: "no"
                    },
                })
                    .then(response => {
                        let data = response.data;
                        
                        if (data.records && data.records.length > 0) {
                            this.betRecodesList = data.records;
                        } else {
                            this.betRecodesList = []
                        }
                    })
            },
            //查询追号记录
            getSuperadditionBetRecodes() {
                const todaytime = new Date();
                const today = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
                this.$http({
                    method: 'post',
                    url: '/game/getValidAdditionBet',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: { gameNo: this.$route.params.gameNo, profit: "no", pageSize: 8, date: 'today' }
                })
                    .then((ret) => {
                        this.SuperadditionBetList = ret.data.list
                    })
            },
            //查询该彩种对应的中奖信息
            getGameWinners() {
                this.$http({
                    method: 'get',
                    url: '/game/getGameWinners',
                    params: {
                        gameNo: this.$route.params.gameNo,
                        size: 10
                    }
                })
                    .then((ret) => {
                        if (ret.data.success) {
                            this.GameWinnersList = ret.data.list
                        }

                    })
            },
        },
    }

</script>

<style scoped lang="less">
    .record-wrap {
        height: 100%;
    }

    .record-wrap/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
        color: #db383f;
    }

    .record-wrap/deep/.ivu-tabs-ink-bar {
        background-color: #db383f;
    }

    .record-wrap/deep/.ivu-tabs-bar {
        margin-bottom: 0;
    }

    .record-wrap/deep/.ivu-table td,
    .ivu-table th {
        height: 30px;
    }

    .record-wrap/deep/.ivu-table-cell {
        padding-left: 0;
        padding-right: 0;
        text-align: center;
    }

    .record-wrap/deep/.ivu-table-cell span {
        line-height: 16px;
    }

    .record-wrap/deep/.ivu-table th {
        height: 35px;
        white-space: nowrap;
        overflow: hidden;
        background-color: #f8f8f9;
        text-align: center;
    }

    div.more-record a {
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-bottom: 1px dashed #e9eaec;
        font-size: 12px;
        color: #db383f;
        text-decoration: none;
        &:hover {
            background: #ebf7ff;
        }
    }

    .record-wrap/deep/.ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #db383f;
    }
</style>