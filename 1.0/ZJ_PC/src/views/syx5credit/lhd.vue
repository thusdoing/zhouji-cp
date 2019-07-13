<template>
    <div class="longhuIntegrate">
        <Row>
        <i-col span="24">
            <div class="longhuIntegrateHeader">
            <div class="dollarIcon">￥</div>
            <div style="line-height: 41px;font-weight: bold;">快捷金额设置：<Input v-integer v-model="kuaijiejine" class="kuaijie" size="small" style="width: 60px;"></Input> 元
            <span>
            <Button type="info" style="width:40px;" @click="kuaijiejine=50" size="small">50</Button>
            <Button type="primary" style="width:40px;" @click="kuaijiejine=100" size="small">100</Button>
            <Button type="success" style="width:40px;" @click="kuaijiejine=200" size="small">200</Button>
            <Button type="warning" style="width:40px;" @click="kuaijiejine=500" size="small">500</Button>
            <Button type="error" style="width:40px;" @click="kuaijiejine=1000" size="small">1000</Button></span></div>
            <!-- <Button type="primary" style="float: right;margin-right:5px;" @click="setMoneyModel=true">快选金额</Button> -->
            <RadioGroup v-model="playModel" type="button" size="large">
                <Button type="primary" @click="onShowBet" size="small">确定投注</Button>
                <Radio label="一般"></Radio>
                <Radio label="快捷"></Radio>
            </RadioGroup>
            </div>
        </i-col>
        </Row>
        <Row type="flex" style="margin-bottom:10px;" justify="center" :gutter="10" v-for="(item1, index) in gameList" :key="'row1'+index">
        <i-col span="6" v-for="(item2, pos) in item1" :key="'col'+index+pos">
            <div style="border:1px solid #ccc;">
            <p style="padding:5px;text-align:center;background-color:#b62929;color:white;font-weight:bold;">
                {{ item2.groupClassConName}}
            </p>
            <Row>
                <i-col span="12" style="padding:0;text-align: center;" v-for="(item3, seat) in item2.groupSettinges" :key="'last'+index+pos+seat">
                <div style="padding:8px;" class="lh-container" :style="{backgroundColor: playModel=='快捷' && item3.selected ? '#FFF8B6': 'white'}"
                    @click="item3.selected = (playModel!='快捷' ? false : !item3.selected)">
                    <p style="text-align:center;margin-bottom:5px;">
                    <label :style="{color:color[seat],fontWeight:'bold',margin:'0 4px'}">{{item3.groupName}}</label>
                    <label style="color:red;" v-show="playModel=='一般'">{{gameBoundList[index][pos][seat].bonusAmt}}</label>
                    </p>
                    <input class="inputNuber" v-show="playModel=='一般'" @click.stop="(()=>{})" @focus="gameList[index][pos].groupSettinges[seat].betAmt = gameList[index][pos].groupSettinges[seat].betAmt >0 ? '' : kuaijiejine"
                    v-integer type="text" v-model="gameList[index][pos].groupSettinges[seat].betAmt" min="0" max="999" />
                    <p style="text-align:center;margin-bottom:5px;color: red;" v-show="playModel=='快捷'">{{gameBoundList[index][pos][seat].bonusAmt || '-'}}</p>
                </div>
                </i-col>
            </Row>
            </div>
        </i-col>
        </Row>
        <Row type="flex" style="padding:20px;" justify="center">
        <i-col :span="24" style="text-align:center;">
            <!-- <InputNumber :precision="0" v-model="allAmt" style="width: 100px" v-show="playModel=='快捷'" :min="0" :max="99999999"></InputNumber> -->
            <Button type="warning" @click="onShowBet">确定</Button>
            <Button @click="clearSelectBet()">取消</Button>
        </i-col>
        </Row>
    
        <Modal :transfer="false" v-model="setMoneyModel" width="400" :mask-closable="false" class-name="notice-model">
        <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;">
            快选金额
        </div>
        <div style="overflow:hidden;">
            <p style="margin: 10px;">注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。</p>
            <div style="text-align:center;margin:15px;" v-for="(item, index) in moneyList" :key="'monkey' + index">
            <InputNumber :precision="0" style="width:200px;" v-model="item.value" :min="0" :max="99999999"></InputNumber>
            <Button type="error" @click="moneyList.splice(index, 1)">删除</Button>
            </div>
            <div style="text-align:center;margin:15px;" v-show="moneyList.length<5">
            <InputNumber :precision="0" style="width:200px;" v-model="newValue" :min="0" :max="99999999"></InputNumber>
            <Button type="error" @click="addNewMoney">增加</Button>
            </div>
        </div>
        <div slot="footer" style="text-align:center;">
            <Button type="error" @click="setMoneyQuick(moneyList);setMoneyModel=false;">保存</Button>
        </div>
        </Modal>
    
        <Modal :transfer="false" v-model="betModel" width="400" :mask-closable="false" class-name="notice-model">
        <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;">
            确认注单
        </div>
        <div style="overflow:hidden;">
            <Row style="margin: 10px 0;">
            <i-col :span="10">
                <p style="text-align:center;font-size:13px;font-weight:bold;">内容</p>
            </i-col>
            <i-col :span="6">
                <p style="text-align:center;font-size:13px;font-weight:bold;">赔率</p>
            </i-col>
            <i-col :span="6">
                <p style="text-align:center;font-size:13px;font-weight:bold;">下注金额</p>
            </i-col>
            </Row>
            <Row style="margin: 10px 0;" v-for="(el, index) in betRetList" :key="'bet'+index">
            <i-col :span="10">
                <p style="text-align:center;font-size:13px;">{{el.content}}</p>
            </i-col>
            <i-col :span="6">
                <p style="text-align:center;font-size:13px;">{{''+gameBoundList[el.betBonusIndex[0]][el.betBonusIndex[1]][el.betBonusIndex[2]].bonusAmt}}</p>
            </i-col>
            <i-col :span="6">
                <p style="text-align:center;font-size:13px;">{{''+playModel=='快捷'?allAmt:el.betAmt}}</p>
            </i-col>
            </Row>
            <Row>
            <i-col :span="24">
                <p style="text-align:center;">共
                <span style="color:red;font-weight:bold;">{{''+betRetList.length}}</span>注, 合计下注金额
                <span style="color:red;font-weight:bold;">{{playModel=='快捷' ? (''+(+allAmt*betRetList.length)) : (''+betRetList.reduce((a, b) => {return a + (+b.betAmt)},
                    0))}}
                </span>元</p>
            </i-col>
            </Row>
        </div>
        <div slot="footer" style="text-align:center;">
            <Button type="error" @click="onBet" :loading="loading">确认下注</Button>
            <Button type="default" @click="betModel=false;">取消</Button>
        </div>
        </Modal>
    </div>
    </template>
    
    <script>
    import _ from 'lodash'
    export default {
            props: ['gameData'],
            // props:{
            //   gameData:Object,
            //   kuaijiejine:null
            // },
            data() {
                return {
                    color: ['red', 'green', 'blue'],
                    lhh: ['龙', '虎'],
                    playModel: '一般',
                    moneyList: [],
                    newValue: null,
                    kuaijiejine: "",
                    gameList: [],
                    gameBoundList: [],
                    betRetList: [],

                    setMoneyModel: false,
                    betModel: false,

                    loading: false,
                }
            },
            watch: {
                gameData:function(){
                    this.init()
                }
            },
            computed: {
                allAmt: function () {
                    return this.kuaijiejine
                }
            },
            mounted() {
                this.moneyList = this.getMoneyQuick() || [{
                    value: 100
                }, {
                    value: 200
                }, {
                    value: 500
                }, {
                    value: 1000
                }, {
                    value: 5000
                }]
                this.init()
            },
            methods: {
                init() {

                    var temData = _.cloneDeep(this.gameData),
                        temList = [],
                        temBound = []
                    temList.push(temData.groupClassCones.filter((el) => {
                        return el.groupClassConName[1] == '一'
                    }))

                    temList.push(temData.groupClassCones.filter((el) => {
                        return el.groupClassConName[1] == '二'
                    }))

                    temList.push(temData.groupClassCones.filter((el) => {
                        return el.groupClassConName[1] == '三'
                    }))

                    temList.push(temData.groupClassCones.filter((el) => {
                        return el.groupClassConName[1] == '四'
                    }))

                    temList.forEach((elAry1) => {
                        var temAry1 = []
                        elAry1.forEach(elAry2 => {
                            var temAry2 = []
                            elAry2.groupSettinges.forEach(el => {
                                el.betAmt = ''
                                el.selected = false
                                temAry2.push({
                                    bonusAmt: el.bonusAmt,
                                    groupNo: el.groupNo
                                })
                            })

                            temAry1.push(temAry2)
                        })

                        temBound.push(temAry1)
                    })

                    this.gameBoundList = temBound
                    this.gameList = temList
                },
                querySearch: function (str, cb) {
                    cb(this.moneyList)
                },
                getMoneyQuick: function () {
                    return JSON.parse(localStorage.getItem('moneyQuick'))
                },
                setMoneyQuick: function (obj) {
                    localStorage.setItem('moneyQuick', JSON.stringify(obj))
                },
                addNewMoney: function () {
                    if (!~this.moneyList.indexOf(el => el.value == this.newValue)) {
                        this.moneyList.push({
                            value: this.newValue
                        })
                        this.moneyList.sort((a, b) => a.value - b.value)
                    }

                    this.newValue = 0
                },
                getSelectBet: function () {
                    var betList = []

                    this.gameList.forEach((elAry1, index) => {
                        var temAry1 = []
                        elAry1.forEach((elAry2, pos) => {
                            var temAry2 = []
                            elAry2.groupSettinges.forEach((el, seat) => {
                                if (this.playModel == '快捷') {
                                    if (el.selected) {
                                        betList.push({
                                            content: `${elAry2.groupClassConName}: ${this.lhh[seat]}`,
                                            groupNo: el.groupNo,
                                            betBonusIndex: [index, pos, seat]
                                        })
                                    }
                                } else {
                                    if (el.betAmt) {
                                        betList.push({
                                            content: `${elAry2.groupClassConName}: ${this.lhh[seat]}`,
                                            groupNo: el.groupNo,
                                            betAmt: el.betAmt,
                                            betBonusIndex: [index, pos, seat]
                                        })
                                    }
                                }
                            })
                        })
                    })
                    this.betRetList = betList
                },
                clearSelectBet: function () {
                    this.gameList.forEach((elAry1, index) => {
                        var temAry1 = []
                        elAry1.forEach((elAry2, pos) => {
                            var temAry2 = []
                            elAry2.groupSettinges.forEach((el, seat) => {
                                if (this.playModel == '快捷') {
                                    el.selected = false
                                    el.betAmt = ''
                                } else {
                                    el.selected = false
                                    el.betAmt = ''
                                }
                            })
                        })
                    })
                },
                onShowBet: function () {
                    this.getSelectBet()

                    if (this.betRetList.length == 0) {
                        this.$Modal.warning({
                            title: '提示',
                            content: '未有下注玩法'
                        });
                        return
                    }

                    if (this.playModel == '快捷' && !!this.allAmt == false) {
                        this.$Modal.warning({
                            title: '提示',
                            content: '未输入下注金额'
                        });
                        return
                    }

                    this.betModel = true
                },
                async onBet() {
                    this.loading = true
                    var postData = this.betRetList.map((el) => {
                        return {
                            gameNo: this.$route.params.gameNo,
                            groupNo: el.groupNo,
                            betAmt: el.betAmt || this.allAmt,
                            betBonus: this.gameBoundList[el.betBonusIndex[0]][el.betBonusIndex[1]][el.betBonusIndex[2]].bonusAmt
                        }
                    })

                    // const r = this.$http({ method: 'post', url: '/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data: postData })
                    const betVos = postData;
                    const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({ betVos }).post();
                    const r = Promise.resolve({ data: { success: rsp.success, msg: rsp.message, ...rsp.data } });
                    r.then(response => {
                        this.loading = false

                        let content = ''

                        if (response.data.success) {
                            this.$emit('updated', +new Date().getTime());
                            content = '投注成功'
                            this.$emit('updated');
                            this.$Modal.success({
                                content: content
                            })
                            this.$store.commit('yu_e')

                            this.clearSelectBet()
                            this.betModel = false
                        } else {
                            this.$Modal.warning({
                                content: response.data.msg
                            })
                        }
                    })
                }
            }
        }
    
    </script>
    
    
    <style>
    
    .inputNuber {
        width: 48px;
        outline: none;
        height: 30px;
        padding: 3px;
        vertical-align: middle;
        border: 1px solid #ccc;
    }
    
    .dropdown-class li {
        font-size: 12px;
        padding: 0;
        line-height: 20px;
        text-align: center;
    }
    
    .notice-model .ivu-modal-close i {
        color: #fff;
    }
    
    .notice-model .ivu-modal-header {
        padding: 16px;
        background-color: #b62929;
        color: #fff;
    }
    
    .notice-model .ivu-modal-body {
        padding: 2px;
    }
    
    </style>
    
    <style scoped>
    .notice-model>>>.ivu-modal-close i {
        color: #fff;
    }
    
    .notice-model>>>.ivu-modal-header {
        padding: 16px;
        background-color: #d00808;
        color: #fff;
    }
    
    .notice-model>>>.ivu-modal-body {
        padding: 2px;
    }
    
    .longhuIntegrate {
        /* padding: 15px; */
    }
    
    .longhuIntegrateHeader>>>.ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper {
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        padding: 0;
        color: #919090;
        border-radius: 4px !important;
        width: 70px;
        border: 1px solid #c0c1c2;
        text-align: center;
        margin: 7px 4px;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7));
    }
    
    .longhuIntegrateHeader>>>.ivu-radio-group-button .ivu-radio-wrapper-checked,
    .longhuIntegrateHeader>>>.ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper:hover {
        color: #fff !important;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fba915), to(#e97607)) !important;
        border-color: #e97607 !important;
        box-shadow: 0 0 0
    }
    
    .longhuIntegrate>>>.ivu-table-cell {
        padding: 0 3px !important;
        text-align: center
    }
    
    .longhuIntegrate>>>.longhuIntegrateHeader div {
        display: inline-block
    }
    
    .longhuIntegrate>>>.longhuIntegrateHeader {
        background-color: #f6f4f4;
        height: 41px
    }
    
    .longhuIntegrate>>>.ivu-radio-group-button .ivu-radio-wrapper:after,
    .longhuIntegrate>>>.ivu-radio-group-button .ivu-radio-wrapper:before {
        background-color: rgba(0, 0, 0, 0)
    }
    
    .longhuIntegrate>>>.dollarIcon {
        width: 29px;
        text-align: center;
        height: 29px;
        border-radius: 50%;
        background-color: #fff;
        float: left;
        margin: 6px 20px;
        line-height: 29px;
        border: 1px solid #c0c1c2;
        font-size: 18px;
        color: #b62929;
    }
    
    .longhuIntegrate>>>.ivu-radio-group {
        float: right
    }
    
    .longhuIntegrateHeader .ivu-radio-group>>>.ivu-btn {
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        padding: 0;
        color: #fff;
        border-radius: 4px !important;
        width: 70px;
        border: 1px solid #19be6b;
        text-align: center;
        margin: 7px 4px;
        background: #19be6b;
    }
    
    .longhuIntegrateHeader .ivu-radio-group>>>.ivu-btn:hover {
        color: #fff !important;
        background: #ed3f14 !important;
        border-color: #ed3f14 !important;
        box-shadow: 0 0 0
    }
    
    </style>
    <style>
    .kuaijie .ivu-input{
        background: transparent;
    }
    .kuaijie .ivu-input:hover{
        border-color: #b62929
    }
    .kuaijie .ivu-input:focus{
        border-color: #b62929
    }
    </style>