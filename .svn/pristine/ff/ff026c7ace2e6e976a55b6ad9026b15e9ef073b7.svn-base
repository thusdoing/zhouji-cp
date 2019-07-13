<template>
    <div class="longhuIntegrate">
        <Row style="border-bottom: 1px solid #e6e6e6;">
            <i-col span="24">
                <div class="longhuIntegrateHeader">
                    <div class="dollarIcon">￥</div>
                    <div style="line-height: 41px;font-weight: bold;">快捷金额设置：<Input v-integer v-integer v-model="kuaijiejine" class="kuaijie" size="small" style="width: 60px;"></Input> 元
                    <span>
                    <Button type="info" style="width:40px;" @click="kuaijiejine=50" size="small">50</Button>
                    <Button type="primary" style="width:40px;" @click="kuaijiejine=100" size="small">100</Button>
                    <Button type="success" style="width:40px;" @click="kuaijiejine=200" size="small">200</Button>
                    <Button type="warning" style="width:40px;" @click="kuaijiejine=500" size="small">500</Button>
                    <Button type="error" style="width:40px;" @click="kuaijiejine=1000" size="small">1000</Button></span></div>
                    <RadioGroup v-model="playModel" type="button" size="large" @on-change="playModelChange">
                        <Button type="primary" @click="onShowBet" size="small">确定投注</Button>
                    </RadioGroup>
                </div>
            </i-col>
        </Row>
        <div class="rluels" v-if="gameData.groupClassNo =='7711'">
            <Icon type="information-circled" style="color:red;"></Icon>
            <label style="font-size:13px;">每注奖金<span style="color: red;">{{gameData.groupClassCones[0].groupSettinges[0].bonusAmt}}</span>元</label>
        </div>
        <div v-for="(item, index) in gameData.groupClassCones" :key="index">
            
            <div class="sc-cyQzhP kqEcaO">
                    
                <div class="sc-izUgoq eyMPaU">
                    <span>{{item.groupClassConName}}</span>
                </div>
                
                <div class="sc-lXiCt iaTvwb">
                    <div class="sc-ibnDSj bVmbTk">
                        <div class="sc-dcOKER bhCiAF">
                            <template v-if="gameData.groupClassNo !='7711'">
                                <div @click="selectedHandle(sub)" v-for="(sub, subindex) in item.groupSettinges" :key="sub.groupNo">
                                    <div class="plain sc-kiXyGy ipuZhZ" :class="sub.selected?'active':''">
                                        <div class="plain sc-ekQYnd cbqUsw">
                                            <span :class="gameData.groupClassNo !='5511'?'paccballhe':''">{{sub.groupName}}</span>
                                        </div>
                                        <div class="sc-eZXMBi jQFqSr">{{sub.bonusAmt.toFixed(3)}}</div>
                                        <div class="sc-Ehqfj enXGjd">
                                            <div class="sc-iQtOjA iYGMXP">
                                                <input v-integer v-model="sub.betAmt" @click.stop @input="input(sub)" type="text" name="number-input" autocomplete="off" class="rounded sc-fyjhYU epefDK" placeholder=""
                                                    >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div @click="selectedHandle(sub)" v-for="(sub, subindex) in ball" :key="sub.groupNo">
                                    <div class="plain sc-kiXyGy ipuZhZ" :class="sub.selected?'active':''">
                                        <div class="plain sc-ekQYnd cbqUsw">
                                            <span class="paccballhe">{{sub.num}}</span>
                                        </div>
                                        <div style="width: 100px;text-align: center;">
                                            <Checkbox style="margin-left: 50px" v-model="sub.selected"></Checkbox>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <span style="display: none">{{now}}</span>

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
                    <i-col :span="10"><p style="text-align:center;font-size:13px;">{{el.showContent}}</p></i-col>
                    <i-col :span="6"><p style="text-align:center;font-size:13px;">{{el.betBonus}}</p></i-col>
                    <i-col :span="6"><p style="text-align:center;font-size:13px;">{{el.betAmt}}</p></i-col>
                </Row>
                <Row>
                    <i-col :span="24">
                        <p v-if="gameData.groupClassNo !='7711'" style="text-align:center;">共<span style="color:red;font-weight:bold;">{{''+betRetList.length}}</span>注, 合计下注金额<span style="color:red;font-weight:bold;">{{playModel=='快捷' ? (''+(+allAmt*betRetList.length)) : (''+betRetList.reduce((a, b) => {return a + (+b.betAmt)}, 0))}}</span>元</p>
                        <p v-else style="text-align:center;">共<span style="color:red;font-weight:bold;">{{betRetList.length?betRetList[0].betNumber:''}}</span>注, 合计下注金额<span style="color:red;font-weight:bold;">{{betRetList.length?betRetList[0].betAmt:''}}</span>元</p>
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
import comb from '@/assets/js/combinatorics.js'
export default {
    props: ['gameData'],
    data() {
        return {
            playModel: '一般',
            kuaijiejine:1,
            moneyList: [],
            newValue: null,
            now:'',
            gameList: [],
            gameBoundList: [],
            betRetList: [],

            setMoneyModel: false,
            betModel: false,

            loading: false,
            ball: [
                {selected:false,bonusAmt:0,groupNo:880111111100,num:'0',color:'pcddgay'},
                {selected:false,bonusAmt:0,groupNo:880111111101,num:'1',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111102,num:'2',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111103,num:'3',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111104,num:'4',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111105,num:'5',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111106,num:'6',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111107,num:'7',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111108,num:'8',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111109,num:'9',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111110,num:'10',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111111,num:'11',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111112,num:'12',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111113,num:'13',color:'pcddgay'},
                {selected:false,bonusAmt:0,groupNo:880111111114,num:'14',color:'pcddgay'},
                {selected:false,bonusAmt:0,groupNo:880111111115,num:'15',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111116,num:'16',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111117,num:'17',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111118,num:'18',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111119,num:'19',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111120,num:'20',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111121,num:'21',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111122,num:'22',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111123,num:'23',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111124,num:'24',color:'pcddred'},
                {selected:false,bonusAmt:0,groupNo:880111111125,num:'25',color:'pcddgreen'},
                {selected:false,bonusAmt:0,groupNo:880111111126,num:'26',color:'pcddblue'},
                {selected:false,bonusAmt:0,groupNo:880111111127,num:'27',color:'pcddgay'},
            ],
        }
    },
    watch:{
        gameData:function(){
            this.init();
        }
    },
    mounted () {
        this.moneyList = this.getMoneyQuick() || [{value:100},{value:200},{value:500},{value:1000},{value:5000}]
        this.init();
        
    },
    computed:{
      allAmt:function(){
        return this.kuaijiejine
      }
    },
    methods: {
        init(){
            var temData = this.gameData.groupClassCones
            let temBound = []
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

            this.betRetList = []
            this.gameBoundList = temBound
            this.gameList = temData
        },
        selectedHandle(item){
            item.selected = !item.selected
            if(item.selected){item.betAmt = this.kuaijiejine}
            else{item.betAmt = ''}
            this.now = Date.now()
        },
        input(item){
            if(item.betAmt>0){
                item.selected = true
            }else{
                item.selected = false
            }
            this.now = Date.now()
        },



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
        playModelChange(){
            this.betRetList = []
            this.init()
        },
        getSelectBet: function() {
            var betList = []
            
            if(this.gameData.groupClassNo=="7711"){
                var temparr=[]
                this.ball.forEach((el, index) => {
                    if (el.selected) {
                        temparr.push(el.num)
                    }
                })
                if(temparr.length<3) return
                betList.push({
                    showContent: temparr.join(','),
                    betContent: temparr.join(','),
                    gameNo:this.$route.params.gameNo,
                    groupNo: '' + this.$route.params.gameNo+'77111100',
                    betNumber: comb.C(temparr.length,3),
                    betAmt: this.allAmt*comb.C(temparr.length,3),
                    betBonus: this.gameData.groupClassCones[0].groupSettinges[0].bonusAmt,
                })
            }else{
                this.gameList.forEach((elAry1, index) => {
                    elAry1.groupSettinges.forEach((el, seat) => {
                        if (el.betAmt>0) {
                            betList.push({
                                showContent: `${elAry1.groupClassConName}: ${el.groupName}`,
                                betContent: el.groupName,
                                gameNo:this.$route.params.gameNo,
                                groupNo: el.groupNo,
                                betAmt: el.betAmt,
                                betBonus: el.bonusAmt
                            })
                        }
                    })
                })
            }
            

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
            this.ball.forEach(el=>{
                el.selected = false
            })
            this.now = Date.now()
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

            if (isNaN(this.allAmt)) {
                this.$Modal.warning({
                    title: '提示',
                    content: '输入金额有误，请重新输入'
                });
                return
            }

            this.betModel = true
        },
        async onBet() {
            this.loading = true
            var postData = this.betRetList
            // const r = this.$http({ method:'post', url:'/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data:postData })
            const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({betVos: postData}).post();
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
.paccballhe{
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 22px;
    border-radius: 12px;
    border: 1px solid #888888;
    background-image: linear-gradient(rgb(255, 255, 255) 0%, rgb(245, 245, 245) 75%, rgb(219, 219, 219) 100%);
}
.kqEcaO {
    display: flex;
    align-items: center;
    position: relative;
}
.eyMPaU {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 30px;
    background-color: rgb(246, 246, 246);
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 30px;
    border-right: 1px solid rgb(230, 230, 230);
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
}
.eyMPaU > span {
    writing-mode: vertical-rl;
    text-orientation: upright;
    white-space: nowrap;
}
.iaTvwb {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1 1 auto;
}
.bVmbTk {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 16px 6px;
    border-bottom: 1px solid rgb(230, 230, 230);
}
.bhCiAF {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.bhCiAF > div {
    margin: 2px 3px;
}
.ipuZhZ {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    padding: 2px;
}
.ipuZhZ:hover, .ipuZhZ:active, .ipuZhZ.active {
    background-color: rgb(255, 249, 244);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
    border-color: rgb(248, 175, 70);
}
.cbqUsw {
    text-align: center;
    font-weight: 500;
    font-size: 13px;
    flex: 0 0 28px;
    width: 65px;
}
.jQFqSr {
    text-align: right;
    flex: 1;
    color: rgb(232, 23, 61);
    width: 45px;
}
.enXGjd {
    flex: 0 0 auto;
    margin: 0px 5px;
}
.cbqUsw.plain > span, .cbqUsw.color > span {
    white-space: nowrap;
}
.iYGMXP {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.iYGMXP > * {
    flex: 0 0 auto;
}
.epefDK {
    text-align: center;
    width: 50px;
    height: 22px;
    outline: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    border-image: initial;
    padding: 0px;
}
.epefDK:focus {
    border-color:#d00808;
}
.epefDK.rounded {
    border-radius: 5px;
}



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

  .inputNuber {
    width: 50px;
    outline: none;
    height: 30px;
    padding: 3px;
    vertical-align: middle;
    border: 1px solid #ccc;
  }
</style>
<style scoped>
    .active{
        background: #fff8b6;
    }
    .rluels{padding: 10px 0 10px 50px;border-bottom: 1px solid #E6E6E6;position: relative;}
    .rluels::after{
        content: " ";
        position: absolute;
        width: 30px;
        height: 60px;
        left: 0;
        top: 0;
        background: #F6F6F6;
        border-right: 1px solid #E6E6E6;
    }
</style>


