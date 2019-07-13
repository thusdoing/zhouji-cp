<template>
<div>
    <div class="longhuIntegrate">
    <Row>
        <!-- <i-col span="19"> -->
        <i-col span="24">
        <Row>
            <!-- 球玩法 -->
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
                <Radio-group v-model="ballGameRadio" type="button" size="large" @on-change="ballGameChange">
                <Button type="primary" @click="confirm" size="small">确定投注</Button>
                <Radio label="一般"></Radio>
                <Radio label="快捷"></Radio>
                <!-- <Radio label="快选金额"></Radio> -->
                </Radio-group>
            </div>
            </i-col>
            <i-col span="4" v-for="(item,normalI) in ballGroups" :key="normalI">
            <p class="ballNo" :id="item.groupClassConNo">{{ item.groupClassConName }}</p>
            <Row class="ballGameTitle ballGameDetail">
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">号码</i-col>
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">赔率</i-col>
                <i-col v-if="ballGameRadio=='一般'">金额</i-col>
            </Row>
            <div v-for="(data,normalDataI) in item.groupSettinges" :style="data.groupName == '总尾大'||data.groupName == '总尾小'?'border-left: 1px solid #c9c7c7; margin-left: -1px;':''" :key="'normalDataI'+normalDataI" @click="data.selected = (ballGameRadio!='快捷' ? false : !data.selected)">
                <Row :class="[('ballGameDetail ballGameDetailHover'),{'active':data.sum>0}]" @click.native="data.sum = data.sum>0 ? '' : kuaijiejine">
                <!-- <i-col :span="ballGameRadio=='一般' ? 6 : 12" v-if="data.groupName != '大' && data.groupName != '小' && data.groupName != '单' && data.groupName != '双' && data.groupName != '总单' && data.groupName != '总双' && data.groupName != '总大' && data.groupName != '总小'">
                    <span class="ballStyle">{{data.groupName}}</span>
                </i-col> -->
                <i-col :span="ballGameRadio=='一般' ? 8 : 12">{{data.groupName}}</i-col>
                <i-col :span="ballGameRadio=='一般' ? 6 : 12" class="bonusAmt">{{data.bonusAmt}}</i-col>
                <i-col span="10" v-if="ballGameRadio=='一般'" class="ballSelect">
                    <input class="inputNuber" @click.stop="(()=>{})" @focus="data.sum = data.sum >0 ? '' : kuaijiejine" v-integer type="text" v-model="data.sum"
                    min="0" max="999" />
                </i-col>
                </Row>
            </div>
            </i-col>
            <!-- 快选金额 -->
            <Modal :transfer="false" v-model="quickModal" width="400" :mask-closable="false" class-name="notice-model">
            <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;color: #fff">
                快选金额
            </div>
            <div style="overflow:hidden;">
                <p style="margin: 10px;">注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。</p>
                <div style="text-align:center;margin:15px;" v-for="(item, index) in moneyList" :key="'monkey' + index">
                <input class="inputNuber" style="width:200px;" type="number" v-model="item.value" min="0" max="999" />
                <Button type="error" @click="moneyList.splice(index, 1)">删除</Button>
                </div>
                <div style="text-align:center;margin:15px;" v-show="moneyList.length<5">
                <input class="inputNuber" style="width:200px;" type="number" v-model="newValue" min="0" max="999" />
                <Button type="error" @click="addNewMoney">增加</Button>
                </div>
            </div>
            <div slot="footer" style="text-align:center;">
                <Button type="error" @click="setMoneyQuick(moneyList);setMoneyModel=false;">保存</Button>
            </div>
            </Modal>

            <!-- 位置玩法
            <Row class="history order">
            <i-col span="24" class="historyRadio">
                <RadioGroup v-model="siteGameRadio" type="button">
                <i-col span="8">
                    <Radio label="前三"></Radio>
                </i-col>
                <i-col span="8">
                    <Radio label="中三"></Radio>
                </i-col>
                <i-col span="8">
                    <Radio label="后三"></Radio>
                </i-col>
                </RadioGroup>
            </i-col>
            <div v-if="siteGameRadio == '前三'">
                <div class="orderBox" v-for="(item,frontI) in front3Groups" :key="'frontI'+frontI">
                <Row class="ballGameTitle ballGameDetail">
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12">号码</i-col>
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12">赔率</i-col>
                    <i-col span="12" v-if="ballGameRadio == '一般'">金额</i-col>
                </Row>
                <div v-for="(frontData,frontDataI) in item.siteData" :key="'frontDataI'+frontDataI" @click="frontData.selected = !frontData.selected">
                    <Row :id="frontData.groupNo" :class="[('ballGameDetail ballGameDetailHover'),{'active':frontData.sum>0}]" @click.native="frontData.sum = frontData.sum>0 ? '' : 1">
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12">{{frontData.groupName}}</i-col>
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12" class="bonusAmt">{{frontData.bonusAmt}}</i-col>
                    <i-col span="12" v-if="ballGameRadio == '一般'" class="ballSelect">
                        <input class="inputNuber" @click.stop="(()=>{})" @focus="frontData.sum = frontData.sum >0 ? '' : kuaijiejine" v-integer type="text"
                        v-model="frontData.sum" min="0" max="999" />
                    </i-col>
                    </Row>
                </div>
                </div>
            </div>
            <div v-if="siteGameRadio == '中三'">
                <div class="orderBox" v-for="(item,midI) in mid3Groups" :key="'midI'+midI">
                <Row class="ballGameTitle ballGameDetail">
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12">号码</i-col>
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12">赔率</i-col>
                    <i-col span="12" v-if="ballGameRadio == '一般'">金额</i-col>
                </Row>
                <div v-for="(midData,midDataI) in item.siteData" :key="'midDataI'+midDataI" @click="midData.selected = !midData.selected">
                    <Row :id="midData.groupNo" :class="[('ballGameDetail ballGameDetailHover'),{'active':midData.sum>0}]" @click.native="midData.sum = midData.sum>0 ? '' : kuaijiejine">
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12">{{midData.groupName}}</i-col>
                    <i-col :span="ballGameRadio == '一般' ? 6 : 12" class="bonusAmt">{{midData.bonusAmt}}</i-col>
                    <i-col span="12" v-if="ballGameRadio == '一般'" class="ballSelect">
                        <input class="inputNuber" @click.stop="(()=>{})" @focus="midData.sum = midData.sum >0 ? '' : kuaijiejine" v-integer type="text"
                        v-model="midData.sum" min="0" max="999" />
                    </i-col>
                    </Row>
                </div>
                </div>
            </div>
            <div v-if="siteGameRadio == '后三'">
                <div class="orderBox" v-for="(item,endI) in end3Groups" :key="'endI'+endI">
                <Row class="ballGameTitle ballGameDetail">
                    <i-col :span="ballGameRadio == '一般' ? 6 :12">号码</i-col>
                    <i-col :span="ballGameRadio == '一般' ? 6 :12">赔率</i-col>
                    <i-col span="12" v-if="ballGameRadio == '一般'">金额</i-col>
                </Row>
                <div v-for="(endData,endDataI) in item.siteData" :key="endDataI" @click="endData.selected = !endData.selected">
                    <Row :id="endData.groupNo" :class="[('ballGameDetail ballGameDetailHover'),{'active':endData.sum>0}]" @click.native="endData.sum = endData.sum>0 ? '' : kuaijiejine">
                    <i-col :span="ballGameRadio == '一般' ? 6 :12">{{endData.groupName}}</i-col>
                    <i-col :span="ballGameRadio == '一般' ? 6 :12" class="bonusAmt">{{endData.bonusAmt}}</i-col>
                    <i-col span="12" v-if="ballGameRadio == '一般'" class="ballSelect">
                        <input class="inputNuber" @click.stop="(()=>{})" @focus="endData.sum = endData.sum >0 ? '' : kuaijiejine" v-integer type="text"
                        v-model="endData.sum" min="0" max="999" />
                    </i-col>
                    </Row>
                </div>
                </div>
            </div>
            </Row> -->
            <Row class="btnBox">
            <i-col span="11" class="soonAuto" v-if="ballGameRadio=='快捷'"> &nbsp;
                <!-- <input class="inputNuber" type="text" v-integer v-model="quickSum" min="0" max="999" /> -->
            </i-col>
            <i-col :span="ballGameRadio=='快捷' ? 2 : 12">
                <i-button class="confirmBtn" @click="confirm" style="margin-right: 0">确定</i-button>
            </i-col>
            <i-col :span="ballGameRadio=='快捷' ? 11 : 12">
                <i-button class="cancelBtn" @click="cancel">取消</i-button>
            </i-col>
            </Row>
        </Row>
        </i-col>
        <!-- <i-col span="5"> -->
        <i-col span="0">
        <Row class="history">
            <i-col span="24" class="historyRadio">
            <RadioGroup v-model="historyRadio" type="button" :on-change="historyChange">
                <Radio label="出码排行"></Radio>
                <Radio label="遗漏排行"></Radio>
            </RadioGroup>
            </i-col>
            <i-col span="24" class="periods">
            <Row>
                <i-col span="14">
                <p>次数</p>
                </i-col>
                <i-col span="10" class="periodsSelect">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
                </i-col>
            </Row>
            </i-col>
            <i-col span="24" class="periodResult">
            <i-table border :columns="topColumn" :data="topData"></i-table>
            </i-col>
        </Row>
        </i-col>
    </Row>
    </div>
    <div class="modal">
    <Modal :transfer="false" v-model="confirmModal" width="400" :mask-closable="false" class-name="notice-model">
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
        <Row style="margin: 10px 0;" class="modalContent">
            <Row v-for="(item,betI) in betArray" :key="betI" class="modalContent">
            <i-col :span="10">
                <p style="text-align:center;font-size:13px;">{{item.groupClassConName +':' + item.groupName}}</p>
            </i-col>
            <i-col :span="6">
                <p style="text-align:center;font-size:13px;">{{item.bonusAmt}}</p>
            </i-col>
            <i-col :span="6">
                <p style="text-align:center;font-size:13px;">{{item.sum}}</p>
            </i-col>
            </Row>
        </Row>
        <Row>
            <i-col :span="24">
            <p style="text-align:center;">共
                <span class="red">{{yardNum}}</span>&nbsp;&nbsp;注，合计下注金额&nbsp;&nbsp;
                <span class="red">{{totalSum}}</span>
            </p>
            </i-col>
        </Row>
        </div>
        <div slot="footer" style="text-align:center;">
        <Button type="error" @click="confirmBet" :loading="loading">确认下注</Button>
        <Button type="default" @click="confirmModal=false;">取消</Button>
        </div>
    </Modal>
    </div>

</div>
</template>
<script>
import algorithm from '@/assets/js/algorithm'
import Combinatorics from '@/assets/js/combinatorics'
import _ from 'lodash'
export default {
  props: ['gameData'],
  data() {
    return {
      kuaijiejine:'',
      loading:false,
      betArray:[],
      ballGameRadio: '一般',
      siteGameRadio: '前三',
      historyRadio: '出码排行',
      confirmModal: false,
      ballGroups:[],// 球玩法
      front3Groups:[],//前三
      mid3Groups:[],//中三
      end3Groups:[],//后三
      yardNum: 0,//总注数
      totalSum: 0,//投注金额
      newOdds:false,
      quickModal: false,
      moneyList: [],
      newValue: null,
      model1: '',
    
      // 历史记录下拉选择
      cityList: [
        { value: 'periods1', label: '1期' },
        { value: 'periods2', label: '2期' },
        { value: 'periods3', label: '3期' },
        { value: 'periods4', label: '4期' },
      ],
      topColumn: [
        { title: '结果', key: 'result', width: '75%' },
        { title: '期数', key: 'period', },
      ],
      topData: [
        { result: '第一球大小@小', period: '1期' },
        { result: '第一球大小@小', period: '1期' },
        { result: '第一球大小@小', period: '1期' },
      ],
    }
  },
  mounted() {
    this.moneyList = this.getMoneyQuick() || [{value:100},{value:200},{value:500},{value:1000},{value:5000}]
    this.updateData()
  },
  watch: {
      gameData:function(){
        this.updateData()
      }
  },
  computed:{
    quickSum:function(){
      return this.kuaijiejine
    }
  },
  methods: {
    updateData(){
      this.betArray = []
      let groupArray = _.cloneDeep(this.gameData.groupClassCones)
    //   const temp = groupArray.slice(0,6)
      const temp = groupArray
      for(let a in temp){
        for(let b in temp[a].groupSettinges){
          temp[a].groupSettinges[b].selected = false
          temp[a].groupSettinges[b].sum = ''
        }
      }
      this.front3Groups = []
      this.mid3Groups = []
      this.end3Groups = []
      this.ballGroups = temp
    //   const front3GroupsGet = groupArray[6].groupSettinges
    //   const mid3GroupsGet = groupArray[7].groupSettinges
    //   const end3GroupsGet = groupArray[8].groupSettinges
    //   for(let a in front3GroupsGet){
    //     front3GroupsGet[a].selected = false
    //     front3GroupsGet[a].sum = ''
    //     this.front3Groups.push({'siteData':[front3GroupsGet[a]],'siteClassConName':'前三'})
    //   }
    //   for(let b in mid3GroupsGet){
    //     mid3GroupsGet[b].selected = false
    //     mid3GroupsGet[b].sum = ''
    //     this.mid3Groups.push({'siteData':[mid3GroupsGet[b]],'siteClassConName':'中三'})
    //   }
    //   for(let c in end3GroupsGet){
    //     end3GroupsGet[c].selected = false
    //     end3GroupsGet[c].sum = ''
    //     this.end3Groups.push({'siteData':[end3GroupsGet[c]],'siteClassConName':'后三'})
    //   }
    },
    querySearch: function(str, cb) {
        cb(this.moneyList)
    },
    getMoneyQuick: function() {
      if(localStorage.getItem('moneyQuick'))  return JSON.parse(localStorage.getItem('moneyQuick'))
    },
    setMoneyQuick: function(obj) {
        localStorage.setItem('moneyQuick', JSON.stringify(obj))
    },
    addNewMoney: function() {
        if (!~this.moneyList.indexOf(el => el.value == this.newValue)) {
            this.moneyList.push({value: this.newValue})
            this.moneyList.sort((a, b)=>a.value-b.value)
        }
        this.newValue=''
    },
    // 点击切换球玩法“一般”、“快捷”、“快速选择”
    ballGameChange(){
      this.updateData()
      if(this.ballGameRadio == '快选金额') this.quickModal = true
    },
    // 确定
    confirm(){
      
      let tempArray = this.ballGroups,
          tempArray1 = [].concat(this.front3Groups,this.mid3Groups,this.end3Groups)
      this.betArray = []

      for (let a=0; a<tempArray.length; a++) {
        for (let b=0; b<tempArray[a].groupSettinges.length; b++) {
            if(!tempArray[a].groupSettinges[b].sum && !tempArray[a].groupSettinges[b].selected) {
              continue
            }
            if(tempArray[a].groupSettinges[b].sum != '' || tempArray[a].groupSettinges[b].selected == true) {
              if(tempArray[a].siteClassConName) {
                tempArray[a].groupClassConName = tempArray[a].siteClassConName // 位置玩法处理
              }

              this.betArray.push({
                'groupClassConName':tempArray[a].groupClassConName || '',
                'groupClassConNo':tempArray[a].groupClassConNo || '',
                'groupName':tempArray[a].groupSettinges[b].groupName || '',
                'groupNo':tempArray[a].groupSettinges[b].groupNo || '',
                'bonusAmt':tempArray[a].groupSettinges[b].bonusAmt || '',
                'sum':this.ballGameRadio=="一般"?tempArray[a].groupSettinges[b].sum : this.quickSum ,
                'selected':tempArray[a].groupSettinges[b].selected || false,
              })
            }
        }
      }
      
      for (let a=0; a<tempArray1.length; a++) {
        for (let b=0; b<tempArray1[a].siteData.length; b++) {
            if(!tempArray1[a].siteData[b].sum && !tempArray1[a].siteData[b].selected) {
              continue
            }
            if(tempArray1[a].siteData[b].sum != '' || tempArray1[a].siteData[b].selected == true) {
              if(tempArray1[a].siteClassConName) {
                tempArray1[a].groupClassConName = tempArray1[a].siteClassConName // 位置玩法处理
              }

              this.betArray.push({
                'groupClassConName':tempArray1[a].groupClassConName || '',
                'groupClassConNo':tempArray1[0].groupClassConNo || '',
                'groupName':tempArray1[a].siteData[b].groupName || '',
                'groupNo':tempArray1[a].siteData[b].groupNo || '',
                'bonusAmt':tempArray1[a].siteData[b].bonusAmt || '',
                'sum':this.ballGameRadio=="一般"?tempArray1[a].siteData[b].sum : this.quickSum ,
                'selected':tempArray1[a].siteData[b].selected || false,
              })
            }
        }
      }

      /* for(let a in tempArray){
        for(let b in tempArray[a].groupSettinges){
          for(let c in tempArray[a][b]){
            if(!tempArray[a][b][c].sum && !tempArray[a][b][c].selected) continue
            if(tempArray[a][b][c].sum != '' || tempArray[a][b][c].selected == true){
              if(tempArray[a].siteClassConName) tempArray[a].groupClassConName = tempArray[a].siteClassConName // 位置玩法处理
              this.betArray.push({
                'groupClassConName':tempArray[a].groupClassConName || '',
                'groupClassConNo':tempArray[a].groupClassConNo || '',
                'groupName':tempArray[a][b][c].groupName || '',
                'groupNo':tempArray[a][b][c].groupNo || '',
                'bonusAmt':tempArray[a][b][c].bonusAmt || '',
                'sum':tempArray[a][b][c].sum || this.quickSum || '',
                'selected':tempArray[a][b][c].selected || false,
              })
            }
          }
        }
      } */
      this.yardNum = this.betArray.length
      let tempSum = 0
      for(let t in this.betArray){
        tempSum = tempSum + parseInt(this.betArray[t].sum)
      }
      this.totalSum = tempSum
      if(this.yardNum == 0){
          this.$Modal.warning({
            title: '提示',
            content: '请选择号码'
        });
        return
      }
      if(this.ballGameRadio == '快捷'){
        if(this.quickSum == 0 || !this.quickSum){
            this.$Modal.warning({
              title: '提示',
              content: '请填写下注金额'
          });
        }
        else{
          this.confirmModal=true
        } 
      } 
      
      else this.confirmModal=true
    },
    async confirmBet(){
      this.loading = true
      var postData = this.betArray.map((el) => {
          return {
              gameNo: this.$route.params.gameNo,
              groupNo: el.groupNo,
              betAmt: el.sum,
              betBonus: el.bonusAmt
          }
      })    
    //   const r = this.$http({ method:'post', url:'/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data:postData })
      const betVos = postData;
      const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({betVos}).post();
      const r = Promise.resolve({data: { success: rsp.success, msg: rsp.message, ...rsp.data}});
      r.then(response => {
          this.loading = false
          let content = ''
          if(response.data.success){
              content='投注成功'
              //通知 投注记录 组件更新
              this.$emit('updated',+new Date().getTime());
              this.$Modal.success({
                  content:content
              })
              
              this.$store.commit('yu_e')
              this.betArray = []
              this.updateData()
              this.confirmModal = false
          }else{
              this.$Modal.warning({
                  content:response.data.msg
              })
          }
      })
    },
    cancel(){
      this.updateData()
    },
    historyChange(){},
  },
  
  
 
}
</script>
<style scoped>
@import 'index.less';
.inputNuber {
    width: 48px;
    outline: none;
    height: 30px;
    padding: 3px;
    vertical-align: middle;
    border: 1px solid #ccc;
}

.confirmBet,
.lhzhConfirmModalSum {
    font-size: 14px;
    line-height: 33px;
}

.local-wrap {
    padding: 10px
}

.local-wrap>>>.ivu-checkbox-group {
    display: inline-block;
    margin: 0 0 0 10px;
}

.longhuIntegrate>>>.ivu-row {
    display: inline-block;
    width: 100%;
    color: #000;
}

.longhuIntegrate {
    background-color: #fff
}

.longhuIntegrate>>>.longhuIntegrateHeader .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper {
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
    z-index: 9;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7));
}

.longhuIntegrate>>>.longhuIntegrateHeader .ivu-radio-group-button .ivu-radio-wrapper-checked,
.longhuIntegrate>>>.longhuIntegrateHeader .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper:hover {
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

/* modal */

.longhuIntegrate>>>.modalContent {
    padding: 20px
}

/* ballGameTitle */

.longhuIntegrate>>>.ballGameTitle {
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7));
    width: 100%;
    padding: 7px 0
}

.longhuIntegrate>>>.ballGameTitle>div {
    line-height: 18px !important;
    border-right: 1px solid #a4a4a4;
}

.longhuIntegrate>>>.ballGameTitle>div:last-child {
    border-right: none !important;
}

/* ballGameDetail */

.longhuIntegrate>>>.ballGameDetail {
    width: 100%;
    border-bottom: 1px solid #c9c7c7;
    border-right: 1px solid #c9c7c7;
    display: block;
    cursor: pointer;
}

.longhuIntegrate>>>.ballGameDetailHover:hover,
.longhuIntegrate>>>.ballGameDetailHover.active {
    background-color: #fff8b6;
    box-shadow: 0 0px 6px 1px rgba(0, 0, 0, .2);
}

.longhuIntegrate>>>.ballGameDetail>div {
    text-align: center;
    line-height: 40px;
}

.longhuIntegrate>>>.ballGameDetail .bonusAmt {
    color: #FF0000;
}

/* .longhuIntegrate>>>.ballGameDetailHover.active .bonusAmt,.longhuIntegrate>>>.ballGameDetailHover:hover .bonusAmt{
    color: #fff;
} */

.longhuIntegrate>>>.ballGameDetail .ballSelect {
    padding: 0 3px
}

.longhuIntegrate>>>.ballGameDetail .ivu-select-single .ivu-select-selection,
.longhuIntegrate>>>.ballGameDetail .ivu-select-selected-value {
    height: 23px;
    line-height: 23px;
    padding: 0;
}

/* ballSoon */

/* .longhuIntegrate >>> .ballSoon:hover{cursor: pointer !important} */

/* soonAuto */

.longhuIntegrate>>>.soonAuto>input {
    height: 25px;
    width: 100px;
    margin-right: 20px;
    float: right;
}

.longhuIntegrate>>>.ivu-radio-group {
    float: right
}

.longhuIntegrate>>>.history .ivu-radio-group {
    width: 100%
}

.longhuIntegrate>>>.ivu-radio-group-button .ivu-radio-wrapper:after,
.longhuIntegrate>>>.ivu-radio-group-button .ivu-radio-wrapper:before {
    background-color: rgba(0, 0, 0, 0)
}

.longhuIntegrate>>>.history .historyRadio .ivu-radio-group-button .ivu-radio-wrapper {
    width: 50%;
    border: none !important;
    line-height: 45px;
    font-weight: bold;
    color: #fff;
    font-size: 15px;
    background-color: #353535;
    border-radius: 0 !important;
    height: 45px;
}

.longhuIntegrate>>>.history .historyRadio .ivu-radio-wrapper-checked {
    background-color: #b62929 !important;
    color: #fff
}

.longhuIntegrate>>>.history .periods {
    height: 36px;
    border-bottom: 1px solid #e2e0dd
}

.longhuIntegrate>>>.history .periods p {
    line-height: 36px;
    text-align: center;
    border-right: 1px solid #e2e0dd
}

.longhuIntegrate>>>.history .periods .periodsSelect .ivu-select-selection {
    height: 26px;
    width: 70px;
    border-radius: 0;
    margin: 5px 7px;
    line-height: 26px;
}

.longhuIntegrate>>>.history .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
/* .longhuIntegrate >>> .history .ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height: 26px;height: 26px} */

.longhuIntegrate>>>.history .periodResult thead {
    display: none
}

.longhuIntegrate>>>.history .periodResult .ivu-table-cell {
    text-align: left
}

.longhuIntegrate>>>.history .periodResult .ivu-table td {
    height: 21px
}


.longhuIntegrate>>>.order .historyRadio .ivu-radio-group-button .ivu-radio-wrapper {
    font-size: 12px;
    line-height: 29px !important;
    height: 29px !important;
    width: 100% !important;
    text-align: center;
    background-color: #b62929 !important
}

.longhuIntegrate>>>.ivu-radio-wrapper:focus {
    border: none !important;
    box-shadow: 0 0 0
}

.longhuIntegrate>>>.order .historyRadio .ivu-radio-wrapper-checked {
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fba915), to(#e97607));
}

.longhuIntegrate>>>.btnBox {
    margin: 15px 0;
    width: 100%
}

.longhuIntegrate>>>.btnBox {
    margin: 15px 0
}

.longhuIntegrate>>>.btnBox button {
    width: 65px;
    height: 24px;
    line-height: 24px;
    padding: 0;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: none;
    box-shadow: -1px 1px 2px #afafaf
}

.longhuIntegrate>>>.btnBox .confirmBtn {
    float: right;
    margin-right: 15px;
    background-color: #eea70d
}

.longhuIntegrate>>>.btnBox .cancelBtn {
    margin-left: 15px;
    background-color: #4b4a49
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
.longhuIntegrate>>>.order .orderBox {
    width: 20%;
    display: inline-block;
    float: left;
}

.longhuIntegrate>>>.order .historyRadio .ivu-col {
    border-right: 1px solid #e2e0dd
}


.longhuIntegrate>>>.ivu-table-wrapper {
    border: none;
}

.longhuIntegrate>>>.ballNo {
    background: #b62929;
    color: #fff;
    line-height: 29px;
    text-align: center;
    font-weight: bold;
    border-right: 1px solid #d0d0d0
}

.longhuIntegrate>>>.ivu-table th {
    text-align: center;
    font-weight: bold;
    height: 33px;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#e7e7e7)) !important;
}

.longhuIntegrate>>>.ivu-table th .ivu-table-cell {
    border-right: .5px solid #666;
    width: 100%
}

.longhuIntegrate>>>.ivu-table-header thead tr th:last-child .ivu-table-cell {
    border-right: none;
}

.longhuIntegrate>>>.ivu-table td {
    height: 36px
}

.longhuIntegrate>>>.ivu-select-arrow {
    display: none
}

.longhuIntegrate>>>.ivu-select-selection:hover,
.longhuIntegrate>>>.ivu-select-visible .ivu-select-selection {
    border-color: #dddee1;
    box-shadow: 0 0 0
}

.longhuIntegrate>>>td.longhuIntegrate-bonusAmt,
.red {
    color: red;
    font-weight: bold
}

.longhuIntegrate>>>.ballStyle {
    color: #fff;
    font-weight: bold;
    background: radial-gradient(circle at 70px 70px, #000, #ec1515);
    border-radius: 50%;
    height: 25px;
    width: 25px;
    display: inline-block;
    line-height: 25px;
    -webkit-box-shadow: 0px 0px 1px 0px #aba5a5 inset;
    box-shadow: 0px 0px 1px 0px #aba5a5 inset;
}

.longhuIntegrate>>>.ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value,
.longhuIntegrate>>>.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
    padding: 0
}

.modal>>>.ivu-modal-header {
    padding: 16px;
    background-color: #b62929;
    color: #fff;
}

</style>

  