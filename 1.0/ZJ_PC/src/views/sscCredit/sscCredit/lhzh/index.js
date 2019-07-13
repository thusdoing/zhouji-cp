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
      const temp = groupArray.slice(0,6)
      for(let a in temp){
        for(let b in temp[a].groupSettinges){
          temp[a].groupSettinges[b].selected = false
          temp[a].groupSettinges[b].sum = ''
        }
      }
      this.front3Groups = []
      this.mid3Groups = []
      this.end3Groups = []
      try{
        this.ballGroups = temp
        const front3GroupsGet = groupArray[6].groupSettinges
        const mid3GroupsGet = groupArray[7].groupSettinges
        const end3GroupsGet = groupArray[8].groupSettinges
        for(let a in front3GroupsGet){
          front3GroupsGet[a].selected = false
          front3GroupsGet[a].sum = ''
          this.front3Groups.push({'siteData':[front3GroupsGet[a]],'siteClassConName':'前三'})
        }
        for(let b in mid3GroupsGet){
          mid3GroupsGet[b].selected = false
          mid3GroupsGet[b].sum = ''
          this.mid3Groups.push({'siteData':[mid3GroupsGet[b]],'siteClassConName':'中三'})
        }
        for(let c in end3GroupsGet){
          end3GroupsGet[c].selected = false
          end3GroupsGet[c].sum = ''
          this.end3Groups.push({'siteData':[end3GroupsGet[c]],'siteClassConName':'后三'})
        }
      }catch(e){
        
      }
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
      // const r = this.$http({ method:'post', url:'/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data:postData })
      const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({betVos: postData}).post();
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