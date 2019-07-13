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
            <Row class="ballGameTitle ballGameDetail" style="width: 25%;float: left;" v-for="i in 4" :key="'Row'+i">
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">号码</i-col>
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">赔率</i-col>
                <i-col v-if="ballGameRadio=='一般'">金额</i-col>
            </Row>
						
						
            <div class="orderBox" style="width: 100%" v-for="(item,normalI) in ballGroups" :key="normalI">
            <div v-for="(data,normalDataI) in item.groupSettinges" :style="data.groupName == '双'||data.groupName == '特双'?'border-top: 1px solid #c9c7c7; margin-top: -1px;width: 25%;float: left;':'width: 25%;float: left;'" :key="'normalDataI'+normalDataI" @click="data.selected = (ballGameRadio!='快捷' ? false : !data.selected)">
                <Row :class="[('ballGameDetail ballGameDetailHover'),{'active':data.sum>0}]" @click.native="data.sum = data.sum>0 ? '' : kuaijiejine">
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">
                    <span v-if="data.groupName<12" class="ballStyle">{{data.groupName}}</span>
                    <span v-else>{{data.groupName}}</span>
                </i-col>
                <i-col :span="ballGameRadio=='一般' ? 6 : 12" class="bonusAmt">{{data.bonusAmt}}</i-col>
                <i-col span="12" v-if="ballGameRadio=='一般'" class="ballSelect">
                    <input class="inputNuber" @click.stop="(()=>{})" @focus="data.sum = data.sum >0 ? '' : kuaijiejine" v-integer type="text" v-model="data.sum"
                    min="0" max="999" />
                </i-col>
                </Row>
            </div>
            </div>

            <!-- 快选金额 -->
            <Modal :transfer="false" v-model="quickModal" width="400" :mask-closable="false" class-name="notice-model">
            <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;color: #fff">
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
            <Row class="btnBox">
            <i-col span="11" class="soonAuto" v-show="ballGameRadio=='快捷'">&nbsp;
                <!-- <input class="inputNuber" v-integer type="text" v-model="quickSum"
                min="0" max="999" /> -->
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
                <p style="text-align:center;font-size:13px;">{{gameData.groupClassName+':'+ item.groupName}}</p>
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
<style scoped lang="less">
@import './x5z1.less';
</style>
<style scoped>
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
  computed:{
    quickSum:function(){
      return this.kuaijiejine
    }
  },
  watch:{
    gameData:function(){
        this.updateData()
        this.betArray=[]
    }
  },
  methods: {
    updateData(){
      let groupArray = _.cloneDeep(this.gameData.groupClassCones)
      this.ballColumns = this.columnWarehouse
      const temp = groupArray
      for(let a in temp){
        for(let b in temp[a].groupSettinges){
          temp[a].groupSettinges[b].selected = false
          temp[a].groupSettinges[b].sum = ''
        }
      }
      this.ballGroups = temp
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
      if(this.ballGameRadio == '快选金额'){
        this.quickModal = true
      }
      this.betArray = []
      this.updateData()
    },
    // 确定
    confirm(){
      let tempArray = this.ballGroups
      tempArray = tempArray.concat(this.front3Groups,this.mid3Groups,this.end3Groups)
      this.betArray = []
      for(let a in tempArray){
        for(let b in tempArray[a]){
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
                'sum':this.ballGameRadio=="一般"?tempArray[a][b][c].sum : this.quickSum ,
                'selected':tempArray[a][b][c].selected || false,
              })
            }
          }
        }
      }
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
        else this.confirmModal=true
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
              this.betArray = []
              this.updateData()
              this.confirmModal = false;
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
      