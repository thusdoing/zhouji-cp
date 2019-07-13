<template>
    <div class="trace-view">
        <div class="win-stop noselect">
            <div>
                <Checkbox v-model="officialStop">中奖后停止追号</Checkbox>
            </div>
        </div>
        <div>
            <Tabs class="tab-list" type="card" :animated="false" @on-click="TabPaneChange">
                <TabPane label="普通追号" name="1">
                    <div class="basic-trace">
                        持续追：
                        <ul class="inline-block">
                            <li :class="[{'active':chasePeriod==5}]">
                                <span @click="chasePeriod=5">5期</span>
                            </li>
                            <li :class="[{'active':chasePeriod==10}]">
                                <span @click="chasePeriod=10">10期</span>
                            </li>
                            <li :class="[{'active':chasePeriod==15}]">
                                <span @click="chasePeriod=15">15期</span>
                            </li>
                            <li :class="[{'active':chasePeriod==20}]">
                                <span @click="chasePeriod=20">20期</span>
                            </li>
                        </ul>
                        <div class="issue inline-block">
                            <input v-integer type="text" min="1" max="48" size="4" maxlength="7" v-model="chasePeriod"> 期
                        </div>
                        <div class="multiple inline-block">
                            倍数：
                            <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="chaseTimes">
                        </div>
                    </div>
                </TabPane>
                <TabPane label="翻倍追号" name="2">
                    <div class="config double-trace">
                        <div class="row">
                            <div class="col w50">
                                <span class="title">基本参数</span>
                                <div class="ctrl">
                                    起始期号：
                                    <Select v-model="SelectGameNumber" style="width:200px">
                                        <Option :value="item.gameNumber" v-for="(item,index) in OptionList" :key="index"></Option>
                                    </Select>
                                </div>
                                <div class="ctrl">
                                    追号期数：
                                    <input v-integer type="text" min="1" max="48" size="4" maxlength="7" v-model="intervalTimesPeriod"> 期
                                </div>
                                <div class="ctrl">
                                    起始倍数：
                                    <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="intervalTimesTimes"> 倍
                                </div>
                            </div>
                            <div class="col w50">
                                <span class="title">高级参数</span>
                                <RadioGroup v-model="intervalTimes">
                                    <Radio :label="intervalTimesArgUp">
                                        <div class="radio" style="display:inline-block;">
                                            <div class="inline-block" style="vertical-align: bottom;">
                                                每隔
                                                <input v-integer type="text" min="1" max="50" size="4" maxlength="7" v-model="intervalTimesOne"> 期 / 倍数x
                                                <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="intervalTimesTwo">
                                            </div>
                                        </div>
                                    </Radio>
                                    <Radio :label="intervalTimesArgDown">
                                        <div class="radio" style="display:inline-block;">
                                            <div class="inline-block" style="vertical-align: bottom;">
                                                前
                                                <input v-integer type="text" min="1" max="50" size="4" maxlength="7" v-model="intervalTimesThree"> 期 / 倍数同起始倍数，之后倍数
                                                <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="intervalTimesFour">倍起始倍数
                                            </div>
                                        </div>
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div class="generate-trace row">
                            <div class="main-btn" @click="getGameNextOpenNoLists(intervalTimesPeriod,1)">生成追号计划</div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <div class="trace-table">
            <div class="table-box">
                <Table height="430" :border="false" @on-selection-change="selectionChange" :columns="THData" :data="TableData"></Table>
            </div>
            <p class="total">
                共追号
                <span class="high-light" v-text="userChasePeriod"></span>
                期，
                <span class="high-light" v-text="userChaseCount"></span>
                注， 总投注金额
                <span class="high-light" v-text="userChaseMoney"></span>
                元
            </p>
            <div v-if="userSelection.length>0" class="cart-btns isTrace">
                <Button @click="superadditionBet" type="error" :loading="loading" style="width: 150px; height: 44px; font-size: 20px; background: #E9312F; margin-bottom: 30px;">马上投注</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                THData: [{
                    title: '序号',
                    width: 60,
                    render: (h, params) => {
                        return h('span', params.index + 1)
                    },
                },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '追号期次',
                    key: 'gameNumber'
                },
                {
                    title: '倍数',
                    width: 150,
                    render: (h, params) => {
                        return h('span', [
                            h('input', {
                                domProps: {
                                    value: params.row.Times,
                                },
                                on: {
                                    blur: (e) => {
                                        // params.row.money = this.computedMoney(e.target.value || 0);
                                        this.TableData[params.index].Times = e.target.value
                                        this.TableData[params.index].money = this.$asmd.mul(e.target.value, this.totalmoney)
                                    }
                                },
                                directives: [{
                                    name: 'integer',
                                }],
                            }),
                            h('span', '倍'),
                        ], {

                            })
                    },
                },
                {
                    title: '金额',
                    key: 'money',
                    render: (h, params) => {
                        return h('span', (params.row.money).toFixed(2) + '元')
                    },
                },
                {
                    title: '预期开奖时间',
                    render: (h, params) => {
                        return h('span', {
                            directives: [{
                                name: 'dateFormat',
                                value: {
                                    a: 'yyyy/MM/dd hh:mm:ss',
                                    b: params.row.stopSaleDt
                                },
                            }],
                        })
                    },
                }
                ],
                TableData: [],
                OptionList: [],
                SelectGameNumber: [],//追号下拉列表选中的参数
                //翻倍追号参数
                intervalTimes: 'ArgUp', //翻倍单选控制
                intervalTimesArgUp: 'ArgUp', //翻倍参数 第一个（单选）
                intervalTimesArgDown: 'ArgDown', //翻倍参数 第二个 （单选）
                intervalTimesPeriod: 10, //翻倍期数
                intervalTimesTimes: 1, //翻倍 初始倍数
                //翻倍高级参数 按顺序 1,2,3,4
                intervalTimesOne: 1,
                intervalTimesTwo: 3,
                intervalTimesThree: 5,
                intervalTimesFour: 3,
                //普通追号的参数
                chaseTimes: 1, //追号初始倍数
                chasePeriod: 10, //追号初始期数
                totalmoney: 1, //计算出 选择注数的总金额 作为追号的初始金额
                //用户追号的数据
                officialStop: true, //中奖停止追号
                userChasePeriod: 0, //共追多少期
                userChaseMoney: 0, //共追多少金额
                userSelection: [], //追号选中的数据
                zuitouflag: false,
                loading:false
            }
        },
        computed: {
            //共追多少注
            userChaseCount() {
                return this.chaseTableList.reduce((x, y) => {
                    return this.$asmd.numAdd(x, y.betNumber)
                }, 0);
            },
            chaseTableList:function(){
                return this.$store.state.betArr
            }
        },
        created() {
            this.getGameNextOpenNoLists(this.chasePeriod);
        },
        methods: {
            //追号 翻倍 tab 切换
            TabPaneChange(name) {
                this.userSelection = []
                this.userChasePeriod = 0;
                this.userChaseMoney = 0
                if (name == 1) {
                    this.getGameNextOpenNoLists(this.chasePeriod);
                } else {
                    this.TableData = [];
                    this.getGameNextOpenNoLists(30, name)
                }
            },
            //选中的数据
            selectionChange(selection) {
                this.userSelection = selection;
                this.userChasePeriod = selection.length;
                this.userChaseMoney = selection.reduce((x, y) => {
                    return this.$asmd.numAdd(x, y.money)
                }, 0);
            },
            //查询当前追投列表
            getGameNextOpenNoLists(size, name) {
                let _this = this;
                this.totalmoney = this.chaseTableList.reduce((x, y) => {
                    return this.$asmd.numAdd(x, y.betAmt)
                }, 0);
                this.$http({
                    method: 'get',
                    url: '/gameOpenNo/getGameNextOpenNoList',
                    params: {
                        gameNumber: this.SelectGameNumber || '',
                        gameNo: this.$route.params.gameNo,
                        size: size || 0,
                    },
                })
                    .then(response => {
                        let data = response.data;
                        if (data.success) {
                            this.TableData = [];
                            if (name == 1) { //其它带有 生成追号计划的 追号
                                data.list.forEach((item, i) => {
                                    item.Times = this.intervalTimesTimes;
                                    if (this.intervalTimes == 'ArgUp') {
                                        if (i >= this.intervalTimesOne) {
                                            let MathCeil = this.$asmd.mul(data.list[i - this.intervalTimesOne].Times, this.intervalTimesTwo);
                                            // item.Times = this.$asmd.mul(this.intervalTimesTimes, MathCeil);
                                            item.Times = MathCeil
                                        }
                                    } else if (this.intervalTimes == 'ArgDown') {
                                        if (i >= this.intervalTimesThree) {
                                            item.Times = this.$asmd.mul(this.intervalTimesTimes, this.intervalTimesFour);
                                        }
                                    }
                                    item.money = this.$asmd.mul(this.totalmoney, item.Times);
                                    this.TableData.push(item);
                                });
                            } else { //普通追号
                                if (name == 2) {
                                    this.OptionList = data.list;
                                } else {
                                    data.list.forEach((item) => {
                                        item.money = this.$asmd.mul(this.chaseTimes, this.totalmoney);
                                        item.Times = this.chaseTimes;
                                        this.TableData.push(item);
                                    });
                                }
                            }
                        } else {

                        }
                    })
                    .catch(error => {

                    })
            },
            //游戏追投
            async superadditionBet() {
                if (this.zuitouflag == true) { return }
                this.zuitouflag = true
                let superaddition = [];
                this.userSelection.forEach((item, index) => {
                    let superadditionObj = {};
                    superadditionObj.expectGameNumber = item.gameNumber;
                    superadditionObj.superadditionBetMultiple = item.Times;
                    superadditionObj.superadditionBetAmt = item.money;
                    superadditionObj.ifStopAfterWin = this.officialStop == true ? 1 : 0;
                    superadditionObj.ifStopWhenJump = 0;
                    superaddition.push(superadditionObj)
                });
                let objArr = [];
                _.cloneDeep(this.chaseTableList).forEach((item, index) => {
                    delete item.showContent;
                    delete item.betBackRate;
                    objArr.push(item)
                });
                // const r = this.$http({ method: 'post', url: '/game/superadditionBet', data: { superadditionBetBaseVos: superaddition, betBaseVos: objArr, }, });
                console.log({ superadditionBetBaseVos: superaddition, betBaseVos: objArr });
                const rsp = await this.$tools.fetch('/game/api/superadditionBet').setCrypto(true).setJson({ superadditionBetBaseVos: superaddition, betBaseVos: objArr }).post();
                const r = Promise.resolve({ data: { success: rsp.success, msg: rsp.message, ...rsp.data } });
                r.then(response => {
                    let data = response.data;
                    let content = '';
                    this.zuitouflag = false
                    if (data.success) {
                        this.$store.commit('setchaseFlag', false)
                        this.$store.commit('clearbetArr')
                        content = '追投成功';
                        this.$emit('chaseCheck', false)
                        this.$emit('updated', +new Date().getTime());
                        this.$emit('zuitouwancheng', +new Date().getTime())
                        this.$store.commit('yu_e')
                    } else {
                        content = data.msg;
                    }
                    setTimeout(() => {
                        this.$Modal.warning({
                            title: '提示',
                            content: content,
                        });
                    }, 200)
                })
                    .catch(error => {

                    })
            },
            //计算追号输入框当前行金额
            computedMoney(value) {
                return this.$asmd.mul(value, this.totalmoney)
            },
        },
        watch: {
            chaseTableList(value) {
                this.totalmoney = value.reduce((x, y) => {
                    return this.$asmd.numAdd(x, y.betAmt)
                }, 0);
                this.TableData.forEach((item) => item.money = this.totalmoney);
            },
            chaseTimes(value) {
                this.TableData.forEach((item) => {
                    item.money = this.$asmd.mul(value, this.totalmoney)
                    item.Times = value;
                })
            },
            chasePeriod(value) {
                this.getGameNextOpenNoLists(value);
            },
        }
    }


</script>

<style lang="less" scoped>
    @import './betChase.less';
</style>