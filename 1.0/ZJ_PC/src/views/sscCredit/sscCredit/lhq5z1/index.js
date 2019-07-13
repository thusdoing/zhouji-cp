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