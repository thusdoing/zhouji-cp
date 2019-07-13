import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data() {
    return {
      data:[],//后台数据
      bonusAmt: [],//赔率列表,
      bonusAmtMax:[], // 选择的号码赔率 存入
      bonusAmtIndex:[],
      allGetProfit: 0,

      sumConfig: {},

      codeNumYardArr: [],
      moneyModel: 0, // 0 1
      betCount: 0,
      betTimes: 1,
      betEnabled: true,
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
    },
    curSel: function() {
      return this.$store.state.curSel
    }
  },
  watch: {
    config: function(value) {
      this.clearUI()

      if (!this.config) {
        return
      }

      this.sumConfig = value;

      this.codeNumYardArr = [];
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        this.codeNumYardArr[k] = []; 
      };
    }
  },
  mounted () {
    this.getGameBonusByGroupNo();
    this.moneyModel = this.$store.state.yjf[0] || 0
    this.sumConfig = this.config;

    this.codeNumYardArr = [];
    let i = this.config.sub.length;
    for (let k = 0; k < i; k++) {  
      this.codeNumYardArr[k] = []; 
    };

    if (this.curSel.codeAry) {
      var index = 0
      if (this.curSel.codeAry > 10) {
        index = 20 - (this.curSel.codeAry - 10)
      }
      else {
        index = this.curSel.codeAry - 3 + 4
      }
      
      setTimeout(() => {
        var index1 = 0
        if (this.curSel.codeAry > 10) {
          index1 = 20 - this.curSel.codeAry
        }
        else {
          index1 = this.curSel.codeAry - 3 +4
        }
        
        this.choiceNum({target: $('.ball-panel .golbal').eq(index)[0]}, 0, index1)
        this.betTimes = this.curSel.betTimes
        this.$store.commit('setCurSel', {groupClassNo: '', codeAry: null, groupNo: '',betTimes:1})
        this.validChioceNum()
      }, 500)
    }
  },
  methods: {
    choiceNum(e, DataNumIndex, index) {
      let _codeNumYardArr = this.codeNumYardArr;
      this.bonusAmtMax.push(this.bonusAmt[index]);
      if ($(e.target).hasClass('active')) {
        $(e.target).removeClass('active');
        _codeNumYardArr[DataNumIndex].splice(_codeNumYardArr[DataNumIndex].indexOf(e.target.innerText), 1)
        this.bonusAmtIndex.splice(this.bonusAmtIndex.indexOf(index), 1)
      } else {
        $(e.target).addClass('active');
        this.bonusAmtIndex.push(index)
        _codeNumYardArr[DataNumIndex].push(e.target.innerText)
        _codeNumYardArr.map(function (item, itemIndex) {
          if (DataNumIndex != itemIndex) {
            item.map(function (_item) {
              if (e.target.innerText.toString().slice(0, 1) == _item.toString().slice(0, 1)) {
                $(e.target).parents('.fastThree-content').find('.fastThree-content-list').eq(itemIndex).find('.ball-panel p.golbal').eq(index).removeClass('active')
                _codeNumYardArr[itemIndex].splice(_codeNumYardArr[itemIndex].indexOf(_item), 1)
              }
            })
          }
        })
      }
      this.validChioceNum();
    },
    clearUI: function() {
      $('.fastThree-content p.golbal.active').removeClass('active');
      this.codeNumYardArr = []
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        this.codeNumYardArr[k] = []; 
      }

      // this.data = []
      //this.bonusAmt =  []
      this.bonusAmtMax = []
      this.bonusAmtIndex = []

      this.betCount = 0
      this.betTimes = 1
      this.moneyModel = 0
      this.betEnabled = true
    },
    validChioceNum() { //是否完成有效投注
      let _this = this;
      let valid = true;
      for (let i = 0; i < _this.config.sub.length; i++) {
        if (_this.codeNumYardArr[i].length <= 0) {
          valid = false;
        }
      }
      if (valid) {
        let items = 1; //总注码数
        // this.bonusAmtIndex = this.bonusAmtIndex.sort();
        // this.$parent.allGetProfit = this.bonusAmt[this.bonusAmtIndex[0]].bonusAmt;
        //this.allGetProfit = Math.max.apply(null,this.bonusAmtMax); //求数组最大值
        _this.codeNumYardArr.map(function (item) {
          items *= item.length
        })

        this.betCount = items;
        this.betEnabled = false;

        /* this.$parent.isValidBet = true;
        this.$parent.btnImmediately = false;
        this.$parent.btnConfirmChoice = false;
        this.$parent.allChoiceYard = items;
        this.$parent.allPutMoney = items * this.$parent.add_times * this.$parent.model1 * this.$parent.initCodeMoney;
        this.$parent.estimateProfit = this.$parent.sub(this.$parent.mul(this.$parent.allGetProfit, this.$parent.add_times, this.$parent.model1), this.$parent.allPutMoney); */
      } else {
        this.bonusAmtIndex=[];
        this.betCount = 0;
        this.betEnabled = true;
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg) {
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

      let betRet = {};
      let betRetArr =[];
      for (let k = 0; k < this.codeNumYardArr.length; k++) {
        this.codeNumYardArr[k] = this.codeNumYardArr[k].sort((a,b)=>a-b);
        if (this.codeNumYardArr[k].length > 0) {
          for (let i = 0; i < this.codeNumYardArr[k].length; i++) {
            betRet = {};
            
            betRet.betContent = (()=>{ 
              if(this.codeNumYardArr[k][i]=='大'){
                return 'a';
              }else if(this.codeNumYardArr[k][i]=='小'){
                return 'b';
              }else if(this.codeNumYardArr[k][i]=='单'){
                return 'c';
              }else if(this.codeNumYardArr[k][i]=='双'){
                return 'd';
              }else{
                return this.codeNumYardArr[k][i];
              }
            })();

            betRet.betAmt = asmd.mul(1, this.betTimes, pattern, (this.config.betInitMoney || 1))
            betRet.betBackRate = null
            betRet.showContent = '['+ this.config.name + '] ' + this.codeNumYardArr[k][i]
            betRet.betMultiple = this.betTimes
            betRet.betNumber = 1
            //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
            betRet.gameNo = this.$route.params.gameNo
            //betRet.groupNo = this.settings.groupNo
            betRet.gamePattern = this.moneyModel
            this.data.forEach((item)=>{
              let groupName = item.groupName.replace(/和值/g,'').split(',')
              if(groupName.indexOf(this.codeNumYardArr[k][i])>=0){                                
                //betRet.estimateProfit = asmd.sub(asmd.mul(item.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt);
                betRet.estimateProfit = asmd.sub(asmd.mul(item.bonusAmt, this.betTimes, pattern), betRet.betAmt);
                betRet.groupNo = item.groupNo;
              }
            })

            betRetArr.push(betRet);
          }

          this.$emit('bet', betRetArr)
          this.clearUI()
        }
      }
    },
    //根据游戏编号查询游戏奖金 
    getGameBonusByGroupNo() {
      let arr = this.config.sub[0].groupNo;
      this.bonusAmt = [];
      this.$http({
        method: 'get',
        url: '/gameGroup/getGameBonusByGroupNo',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        params: {
          groupNo: this.settings.groupNo
        }
      })
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.data = data.list;
            arr.map((item,index) => {
              data.list.map((_item,_index)=>{
                if(item == '2222'+_item.groupNo.slice(4)){
                  this.bonusAmt.push(_item.bonusAmt);
                }
              })
            })
          }
        })
        .catch(error => {

        })
    },
  }
}