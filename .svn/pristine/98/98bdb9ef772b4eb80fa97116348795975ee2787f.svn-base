<template>
    <div class="longhuIntegrate">
        <Row>
            <i-col span="24">
                <div class="longhuIntegrateHeader">
                    <div class="dollarIcon">$</div>
                    <div style="line-height: 41px">0%</div>
                    <Button type="primary" style="float: right;margin-right:5px;" @click="setMoneyModel=true">快选金额</Button>
                    <RadioGroup v-model="playModel" type="button" size="large">
                        <Radio label="一般"></Radio>
                        <Radio label="快捷"></Radio>
                    </RadioGroup>
                </div>
            </i-col>
        </Row>

        <div style="overflow:hidden;">
            <div style="width:20%;float:left;" v-for="index in 5" :key="index">
                <Row class="ballGameTitle ballGameDetail">
                    <i-col :span="playModel=='一般' ? 6 : 12">号码</i-col>
                    <i-col :span="playModel=='一般' ? 6 : 12">赔率</i-col>
                    <i-col v-if="playModel=='一般'">金额</i-col>
                </Row>
            </div>
        </div>

        <div v-for="(item1, index) in gameList" :key="'row1'+index" style="overflow:hidden;">
            <p class="playGame-name">{{ item1.groupClassConName }}</p>
            <div style="width:20%;float:left;border-right: 1px solid #c9c7c7;border-bottom: 1px solid #c9c7c7;" v-for="(item2, pos) in item1.groupSettinges" :key="pos"  :style="{backgroundColor: playModel=='快捷' && item2.selected ? '#FFF8B6': 'white'}" @click="item2.selected = (playModel!='快捷' ? false : !item2.selected)">
                <Row>
                    <i-col :span="playModel=='一般' ? 6 : 12">
                        <p style="text-align:center;margin-bottom:5px;line-height:36px;">
                            <label v-if="/.*[\u4e00-\u9fa5]+.*$/.test(item2.groupName)" :style="{color:'black',fontWeight:'bold',margin:'0 4px'}">{{item2.groupName}}</label>
                            <img style="width:20px;height:20px;vertical-align: middle;margin-left:2px;" v-else v-for="(bj,bjindex) in item2.groupName.split('')" :src="`/static_pc/img/${bj}.png`" :key="bjindex">
                        </p>
                    </i-col>
                    <i-col :span="playModel=='一般' ? 6 : 12" >
                        <p style="text-align:center;margin-bottom:5px;color:red;line-height:36px;">{{gameBoundList[index][pos].bonusAmt || '-'}}</p>
                    </i-col>
                    <i-col :span="12" v-if="playModel=='一般'">
                        <div style="padding: 5px 8px;">
                            <el-autocomplete popper-class="dropdown-class" v-show="playModel=='一般'" size="mini" v-model="item2.betAmt" :fetch-suggestions="querySearch"></el-autocomplete>
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>

        <Row type="flex" style="padding:20px;" justify="center">
            <i-col :span="24" style="text-align:center;">
                <InputNumber :precision="0" v-model="allAmt" style="width: 100px" v-show="playModel=='快捷'" :min="0" :max="99999999"></InputNumber>
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
                <div style="text-align:center;margin:15px;" v-for="(item, index) in moneyList" :key="'index' + index">
                    <InputNumber :precision="0" style="width:200px;" v-model.number="item.value" :min="0" :max="99999999"></InputNumber>
                    <Button type="error" @click="moneyList.splice(index, 1)">删除</Button>
                </div>
                <div style="text-align:center;margin:15px;" v-show="moneyList.length<5">
                    <InputNumber :precision="0" style="width:200px;" v-model.number="newValue" :min="0" :max="99999999"></InputNumber>
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
                    <i-col :span="10"><p style="text-align:center;font-size:13px;font-weight:bold;">内容</p></i-col>
                    <i-col :span="6"><p style="text-align:center;font-size:13px;font-weight:bold;">赔率</p></i-col>
                    <i-col :span="6"><p style="text-align:center;font-size:13px;font-weight:bold;">下注金额</p></i-col>
                </Row>
                <Row style="margin: 10px 0;" v-for="(el, index) in betRetList" :key="index">
                    <i-col :span="10"><p style="text-align:center;font-size:13px;">{{el.content}}</p></i-col>
                    <i-col :span="6"><p style="text-align:center;font-size:13px;">{{''+gameBoundList[el.betBonusIndex[0]][el.betBonusIndex[1]].bonusAmt}}</p></i-col>
                    <i-col :span="6"><p style="text-align:center;font-size:13px;">{{''+playModel=='快捷'?allAmt:el.betAmt}}</p></i-col>
                </Row>
                <Row>
                    <i-col :span="24">
                        <p style="text-align:center;">共<span style="color:red;font-weight:bold;">{{''+betRetList.length}}</span>注, 合计下注金额<span style="color:red;font-weight:bold;">{{playModel=='快捷' ? (''+(+allAmt*betRetList.length)) : (''+betRetList.reduce((a, b) => {return a + (+b.betAmt)}, 0))}}</span>元</p>
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
    data() {
        return {
            playModel: '一般',

            moneyList: [],
            newValue: null,

            gameList: [],
            gameBoundList: [],
            allAmt: 0,
            betRetList: [],

            setMoneyModel: false,
            betModel: false,

            loading: false
        }
    },
    mounted () {
        this.moneyList = this.getMoneyQuick() || [{value:100},{value:200},{value:500},{value:1000},{value:5000}]

        var temData = _.cloneDeep(this.gameData.groupClassCones),
            temBound = []

        temData.forEach((elAry1) => {
            var temAry1 = []
            var temAry2 = []
            elAry1.groupSettinges.forEach(el => {
                el.betAmt = ''
                el.selected = false
                temAry2.push({
                    bonusAmt: el.bonusAmt,
                    groupNo: el.groupNo
                })
            })

            temBound.push(temAry2)
        })

        this.gameBoundList = temBound
        this.gameList = temData
    },
    methods: {
        querySearch: function(str, cb) {
            cb(this.moneyList)
        },
        getMoneyQuick: function() {
            return JSON.parse(localStorage.getItem('moneyQuick'))
        },
        setMoneyQuick: function(obj) {
            localStorage.setItem('moneyQuick', JSON.stringify(obj))
        },
        addNewMoney: function() {
            if (!~this.moneyList.indexOf(el => el.value == this.newValue)) {
                this.moneyList.push({value: this.newValue})
                this.moneyList.sort((a, b)=>a.value-b.value)
            }

            this.newValue = null
        },
        getSelectBet: function() {
            var betList = []
            this.gameList.forEach((elAry1, index) => {
                var temAry1 = []
                var temAry2 = []
                elAry1.groupSettinges.forEach((el, seat) => {
                    if (this.playModel == '快捷') {
                        if (el.selected) {
                            betList.push({
                                content: `${elAry1.groupClassConName}: ${el.groupName}`,
                                groupNo: el.groupNo,
                                betBonusIndex: [index, seat]
                            })
                        }
                    }
                    else {
                        if (el.betAmt) {
                            betList.push({
                                content: `${elAry1.groupClassConName}: ${el.groupName}`,
                                groupNo: el.groupNo,
                                betAmt: el.betAmt,
                                betBonusIndex: [index, seat]
                            })
                        }
                    }
                })
            })

            this.betRetList = betList
        },
        clearSelectBet: function() {
            this.gameList.forEach((elAry1, index) => {
                elAry1.groupSettinges.forEach((el, seat) => {
                    if (this.playModel == '快捷') {
                        el.selected = false
                        el.betAmt = ''
                    }
                    else {
                        el.selected = false
                        el.betAmt = ''
                    }
                })
            })
        },
        onShowBet: function() {
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
                    betBonus: this.gameBoundList[el.betBonusIndex[0]][el.betBonusIndex[1]].bonusAmt
                }
            })

            // const r = this.$http({ method:'post', url:'/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data:postData })
            const betVos = postData;
            const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({betVos}).post();
            const r = Promise.resolve({data: { success: rsp.success, msg: rsp.message, ...rsp.data}});
            r.then(response => {
                this.loading = false

                let content = ''

                if(response.data.success){
                    content='投注成功'

                    this.$emit('updated',+new Date().getTime());
                    this.$Modal.success({
                        content:content
                    })
                    this.$store.commit('yu_e')

                    this.clearSelectBet()
                    this.betModel = false
                }else{
                    this.$Modal.warning({
                        content:response.data.msg
                    })
                }
            })
        }
    }
}
</script>

<style>
    .dropdown-class li{
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
      background-color: #d00808;
      color: #fff;
    }
    .notice-model .ivu-modal-body {
      padding:2px;
    }
</style>

<style scoped>
    .notice-model >>> .ivu-modal-close i {
      color: #fff;
    }
    .notice-model >>> .ivu-modal-header {
      padding: 16px;
      background-color: #d00808;
      color: #fff;
    }
    .notice-model >>> .ivu-modal-body {
      padding:2px;
    }

    .longhuIntegrate {
        /* padding: 15px; */
    }
  .longhuIntegrateHeader >>> .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper{
    height: 27px;line-height: 27px;font-size: 12px;padding: 0;color: #919090;border-radius: 4px !important;
    width: 70px;border: 1px solid #c0c1c2;text-align: center;margin: 7px 4px;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7));
  }
  .longhuIntegrateHeader >>> .ivu-radio-group-button .ivu-radio-wrapper-checked,
  .longhuIntegrateHeader >>> .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper:hover{
    color: #fff !important;background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fba915), to(#e97607)) !important;border-color: #e97607 !important;box-shadow: 0 0 0
  }

  .longhuIntegrate >>> .ivu-table-cell{padding: 0 3px !important;text-align: center}
  .longhuIntegrate >>> .longhuIntegrateHeader div{display: inline-block}
  .longhuIntegrate >>> .longhuIntegrateHeader{background-color: #f6f4f4;height: 41px}

  .longhuIntegrate >>> .ivu-radio-group-button .ivu-radio-wrapper:after,
  .longhuIntegrate >>> .ivu-radio-group-button .ivu-radio-wrapper:before{background-color: rgba(0, 0, 0, 0)}
  .longhuIntegrate >>> .dollarIcon{
    width: 29px;text-align: center;height: 29px;border-radius: 50%;background-color: #fff;float: left;
    margin: 6px 20px;line-height: 29px;border: 1px solid #c0c1c2;font-size: 18px;color: #b62929;
  }
  .longhuIntegrate >>> .ivu-radio-group{float: right}

  .longhuIntegrateHeader >>> .ivu-btn{
      height: 27px;line-height: 27px;font-size: 12px;padding: 0;color: #919090;border-radius: 4px !important;
      width: 70px;border: 1px solid #c0c1c2;text-align: center;margin: 7px 4px;
      background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7));
  }
  .longhuIntegrateHeader >>> .ivu-btn:hover{
      color: #fff !important;background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fba915), to(#e97607)) !important;border-color: #e97607 !important;box-shadow: 0 0 0
  }

  /* ballGameTitle */
  .longhuIntegrate >>> .ballGameTitle{background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7));width: 100%;padding: 7px 0}
  .longhuIntegrate >>> .ballGameTitle>div{line-height: 18px !important; border-right: 1px solid #a4a4a4;}
  .longhuIntegrate >>> .ballGameTitle>div:last-child{border-right: none !important;}
  /* ballGameDetail */
  .longhuIntegrate >>> .ballGameDetail{width: 100%;border-bottom: 1px solid #c9c7c7;border-right: 1px solid #c9c7c7;display: block}
  .longhuIntegrate >>> .ballGameDetail >div{text-align: center;line-height: 36px;font-weight: bold}
  .longhuIntegrate >>> .ballGameDetail .bonusAmt{color: #FF0000;}
  .longhuIntegrate >>> .ballGameDetail .ballSelect{padding: 0 3px}
  .longhuIntegrate >>> .ballGameDetail .ivu-select-single .ivu-select-selection,.longhuIntegrate >>> .ballGameDetail .ivu-select-selected-value{height: 23px;line-height: 23px;padding: 0;font-size: }

  .playGame-name {
    background: #b62929;
    color: #fff;
    text-shadow: 0 1px 1px #313131;
    text-align: center;
    height: 26px;
    line-height: 26px;
    vertical-align: middle;
    font-weight: bold;
    font-size: 12px;
  }
</style>


