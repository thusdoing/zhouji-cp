export default {
  data(){
    return{
      hotChecked:false, //冷热
      LostChecked:false, //遗漏
      initCodeMoney:2, //每注 金额
      isEq : [],//存入循环的item 排序 去重 是否是相同注码 则为1注
      sumArr_1:[0,1,2,3,4,5,6,7,8,9],
      yardWarehouse:[]
    }
  },
  mounted(){
    
  },
  methods:{
    mountedData(algorithm,dataObj){
      if(!dataObj.yardWarehouse) return
      else this.yardWarehouse = dataObj.yardWarehouse
      this.$parent.initCodeMoney = this.initCodeMoney;
    },
    //二维数组去重
    unique5(array){ 
      var r = []; 
      for(var i = 0, l = array.length; i < l; i++) { 
       for(var j = i + 1; j < l; j++) 
        if (array[i].toString() === array[j].toString()) j = ++i; 
       r.push(array[i]); 
       } 
       return r; 
    },
    updata_add_times(arg){
      if(arg =='add'){
        this.$parent.add_times++;
      }else if(arg =='sub'){
        if(this.$parent.add_times>1){
          this.$parent.add_times--;
        }
      }else{
        this.$parent.add_times = parseInt(arg.target.value).toString() == 'NaN' ? 0 : parseInt(arg.target.value);
      }
    },
    updata_model1(v){
      this.$parent.model1=v;
    },
    update_allYardList(){
      this.$parent.allYardList=[];
    },
    choiceNum(e,index){
      let _codeNumYardArr = this.$parent.codeNumYardArr;
      if($(e.target).hasClass('active')){
        $(e.target).removeClass('active');
        _codeNumYardArr[index].splice(_codeNumYardArr[index].indexOf(e.target.innerText),1)
      }else{
        $(e.target).addClass('active');
        _codeNumYardArr[index].push(e.target.innerText)
      }       
      this.validChioceNum();
    },
    validChioceNum(){ //是否完成有效投注
      let _this = this;
      let valid = true; 
      const currentChoiceNum = this.$parent.codeNumYardArr[0] || [];
      
      for(let i=0 ;i<_this.$parent.DataNumChoice.sub.length;i++){
        if(_this.$parent.codeNumYardArr[i].length<=0){
          valid = false;
        }
      }
      if(valid){    
        // _this.isEq = [];
        // _this.sumArr_1.map(function(item,index){    
        //   _this.sumArr_1.map(function(_item,_index){
        //     if(item!=_item){
        //       _this.$parent.codeNumYardArr[0].map(function(n,m){
        //         if(item+_item==n){
        //           _this.isEq.push([item,_item].sort())
        //           _this.isEq = _this.unique5(_this.isEq.sort());
        //         }
        //       })
        //     }
        //   })
        // })
        // 计算注数
        let yardNums = 0
        for(let c in currentChoiceNum){
          for(let y in this.yardWarehouse){
            if(this.yardWarehouse[y].num == currentChoiceNum[c]){
              yardNums=yardNums+this.yardWarehouse[y].yard
            }
          }
        }
        this.$parent.isValidBet =true;
        this.$parent.btnImmediately = false;
        this.$parent.btnConfirmChoice = false;
        this.$parent.allChoiceYard = yardNums;
        this.$parent.allPutMoney = yardNums*this.$parent.add_times*this.$parent.model1*this.$parent.initCodeMoney;
        this.$parent.estimateProfit = this.$parent.sub(this.$parent.mul(this.$parent.allGetProfit,this.$parent.add_times,this.$parent.model1),this.$parent.allPutMoney);
      }else{
        this.$parent.isValidBet =false;
        this.$parent.allChoiceYard = 0;
        this.$parent.allPutMoney= 0;
        this.$parent.estimateProfit = 0;
        this.$parent.btnImmediately = true;
        this.$parent.btnConfirmChoice = true;
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg){
      //全部清空
      let allYardObj = {};
      let splitArr=''; //转换数组 传入后台输出格式
      allYardObj.YardName = $('.play-item-list p.play_kind_list.active').text();
      splitArr = this.$parent.codeNumYardArr[0].sort().join('|');
      allYardObj.YardNum = splitArr;
      allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
      allYardObj.YardCount = this.$parent.allChoiceYard;
      allYardObj.YardTimes = this.$parent.add_times;
      allYardObj.YardMoney = this.$parent.allPutMoney;
      allYardObj.model = this.$parent.model1;
      if(arg=='atOnce'){
        let obj = {};
        obj.gameNo =  this.$route.params.gameNo;
        // obj.groupNo =  this.$parent.getGameGroupByGameWithGroupdata[this.$parent.kindCheckedIndex].groupClassCones[this.$parent.playkindFunIndex._index].groupSettinges[this.$parent.playkindFunIndex.index].groupNo;
        obj.groupNo =  localStorage.getItem('gameNuberCode');
        obj.betContent = allYardObj.YardNum;
        obj.betMultiple = allYardObj.YardTimes;
        obj.betNumber = allYardObj.YardCount;
        obj.betAmt = allYardObj.YardMoney;
        obj.estimateProfit = this.$parent.estimateProfit;
        let gamePattern=1;
        if( this.$parent.model1==1){
          gamePattern=0
        }else if( this.$parent.model1==0.1){
          gamePattern=1
        }else if( this.$parent.model1==0.01){
          gamePattern=2
        }
        obj.gamePattern = gamePattern;
        this.$parent.betGame([obj]);
      }else{
        this.$parent.allYardList.push(allYardObj);
        this.textAreaV = '';
      }
      $('.play-content p.active').removeClass('active');
      this.$parent.codeNumYardArr = new Array();  
      let i=this.$parent.DataNumChoice.sub.length;
      for(let k=0;k<i;k++){       
        this.$parent.codeNumYardArr[k]=new Array(); 
      }
      this.validChioceNum();
    },
  }
}