import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data(){
    return{
      codeNumYardArr: [],
      moneyModel: 0, // 0 1
      betCount: 0,
      betTimes: 1,
      betEnabled: true
    }
  },
  computed: {
    betAmt: function() {
      let pattern = 1;
      if( this.moneyModel == 0){
        pattern = 1
      }
      else if( this.moneyModel == 1){
        pattern = 0.1
      }
      else if( this.moneyModel == 2){
        pattern = 0.01
      }

      return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
    }
  },
  watch: {
    config: function() {
      if (!this.config) {
        return
      }

      this.codeNumYardArr = [];
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        this.codeNumYardArr[k] = []; 
      };
    }
  },
  mounted () {
    this.codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {  
      this.codeNumYardArr[k] = []; 
    };
    this.moneyModel = this.$store.state.yjf[0] || 0
  },
  methods:{
    choiceNum(e,index){
      let _codeNumYardArr = this.codeNumYardArr;
      if($(e.target).hasClass('active')){
        $(e.target).removeClass('active');
        _codeNumYardArr[index].splice(_codeNumYardArr[index].indexOf(e.target.innerText),1)
      }else{
        $(e.target).addClass('active');
        _codeNumYardArr[index].push(e.target.innerText)
      }       

      this.validChioceNum();
    },
    clearUI: function() {
      $('.play-content p.active').removeClass('active');
      this.codeNumYardArr = []
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        this.codeNumYardArr[k] = []; 
      }

      this.betCount = 0
      this.betTimes = 1
      this.moneyModel = 0
      this.betEnabled = true
    },
    validChioceNum(){ //是否完成有效投注
      let _this = this;
      let valid = true; 
      const currentChoiceNum = this.codeNumYardArr[0] || [];
      
      for(let i=0 ;i<_this.config.sub.length;i++){
        if(_this.codeNumYardArr[i].length<=0){
          valid = false;
        }
      }
      if(valid){    
        // 计算注数
        let yardNums = 0
        for(let c in currentChoiceNum){
          for(let y in this.config.yardWarehouse){
            if(this.config.yardWarehouse[y].num == currentChoiceNum[c]){
              yardNums=yardNums+this.config.yardWarehouse[y].yard
            }
          }
        }

        this.betEnabled = false;
        this.betCount = yardNums;
      }
      else{
        this.betEnabled = true
        this.betCount = 0
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg){
      let pattern = 1;
      if( this.moneyModel == 0){
        pattern = 1
      }
      else if( this.moneyModel == 1){
        pattern = 0.1
      }
      else if( this.moneyModel == 2){
        pattern = 0.01
      }

      var betRet = {}
      betRet.betAmt = this.betAmt
      betRet.betBackRate = null
      betRet.betContent = this.codeNumYardArr[0].sort().join('|');
      betRet.showContent = '['+ this.config.name + '] ' + betRet.betContent
      betRet.betMultiple = this.betTimes
      betRet.betNumber = this.betCount
      //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
      betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), this.betAmt)
      betRet.gameNo = this.$route.params.gameNo
      betRet.groupNo = this.settings.groupNo
      betRet.gamePattern = this.moneyModel

      this.$emit('bet', betRet)
      this.clearUI()
    }
  }
}