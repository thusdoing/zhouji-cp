import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data(){
    return{
      textAreaV:'', //文本域值
      RegExp:'', // 根据父组件传入的algorithm 去正则匹配 几位为一注
      algorithm:'',

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
  watch:{
    textAreaV(v){
      this.validChioceNum(v);
    },
    config() {
      this.clearUI()
    }
  },
  mounted(){
    this.textAreaV='';
    this.algorithm = this.config.algorithm;
    this.RegExp = new RegExp(`(.{${this.algorithm}})(?=[^$])`,'g');
    this.moneyModel = this.$store.state.yjf[0] || 0
  },
  methods:{
    cleartextArea(){
      this.textAreaV='';
    },
    clearUI: function() {
      this.textAreaV='';
      this.RegExp = new RegExp(`(.{${this.algorithm}})(?=[^$])`,'g');
      
      this.betCount = 0
      this.betTimes = 1
      this.moneyModel = 0
      this.betEnabled = true
    },
    RemoveRet(){
      let _this = this;
      let fiflerRepetNum=0;  //重复值
      let fiflerErrorNum=''; //错误值
      let fiflerErrorNumCount=0; //错误值数量
      let textAreaV = this.textAreaV.split('');
      let forA = textAreaV.length%this.algorithm;
      if(forA!=0){ //求出错误数字
        fiflerErrorNumCount = forA;      
        for(let i =0;i<forA;i++){
          let str = ',';
          str = i==forA-1 ? '' : ',';
          fiflerErrorNum+=textAreaV[textAreaV.length-1]+str;
          textAreaV.pop();   
        }    
      }
      textAreaV = textAreaV.toString().replace(/,/g,"").replace(this.RegExp,"$1,").split(","); //重新转化 数字在一起的一维数组
      textAreaV =  this.arrRemoveRet(textAreaV);
      fiflerRepetNum = textAreaV.arr.length;
      if(fiflerRepetNum>0||fiflerErrorNumCount>0){
        textAreaV.m = textAreaV.m.toString().replace(/,/g,"").split('');
        this.$Modal.warning({
          content:'过滤'+fiflerErrorNumCount+'个错误号码('+fiflerErrorNum.split(",").sort()+')，过滤'+fiflerRepetNum+'个重复号码('+textAreaV.arr+')',
        })
      }
      this.textAreaV = textAreaV.m.toString().replace(/,/g,"");
    },
    arrRemoveRet(arr){
      var m=[],f,obj={
        arr:[],//去掉重复的数组值 存放
        m:[] //去掉重复值后的数组 存放
      };
      for(var i=0;i<arr.length;i++){
          f=true;
          for(var j=0;j<m.length;j++)
              if(arr[i]===m[j]){f=false;obj.arr.push(arr[i]);break;};
          if(f)m.push(arr[i])}
          obj.m = m.sort(function(a,b){return a-b});
      return obj;
    },
    validChioceNum(v){ //是否完成有效投注
      v = v.replace(/[^0-9]/ig,"");
      if(v.toString().length>=this.algorithm){
        this.betEnabled = false
        this.betCount = Math.floor(v.length/this.algorithm)
      }else{
        this.betEnabled = true
        this.betCount = 0
      }
    },
    //确认选号
    btnConfirmChoiceFun(){
      let _this = this;
      let fiflerRepetNum=0;  //重复值
      let fiflerErrorNum=''; //错误值
      let fiflerErrorNumCount=0; //错误值数量
      let textAreaV = this.textAreaV.split('');
      let forA = textAreaV.length%this.algorithm;
      if(forA!=0){
        fiflerErrorNumCount = forA;      
        for(let i =0;i<forA;i++){
          let str = ',';
          str = i==forA-1 ? '' : ',';
          fiflerErrorNum+=textAreaV[textAreaV.length-1]+str;
          textAreaV.pop();   
        }    
      }
      textAreaV = textAreaV.toString().replace(/,/g,"").replace(this.RegExp,"$1,").split(","); //重新转化为2位 数字在一起的一维数组
      textAreaV =  this.arrRemoveRet(textAreaV);
      fiflerRepetNum = textAreaV.arr.length;
      textAreaV.m = textAreaV.m.toString().replace(/,/g,"").split('');
      if(fiflerRepetNum>0||fiflerErrorNumCount>0){
        this.$Modal.confirm({
          content:'过滤'+fiflerErrorNumCount+'个错误号码('+fiflerErrorNum.split(",").sort()+')，过滤'+fiflerRepetNum+'个重复号码('+textAreaV.arr+')',
          onOk:function(){
            _this.generatebetList(textAreaV.m);
          },
          onCancel:function(){}
        })
      }else{
        _this.generatebetList(textAreaV.m);
      }
    },
    //生成选注 列表
    generatebetList(textAreaV){
      this.textAreaV = textAreaV.join('');
      let splitArr=''; //转换 传入后台输出格式
      let allYardObj = {};
      for (let i = 0; i < textAreaV.length; i++) { 
        let a = ',';
        if(i!=0&&parseInt(i+1)%this.algorithm==0){
          a = '|'
        }  
        if(i==textAreaV.length-1){
          a='';
        } 
        splitArr+= textAreaV[i]+a;
      }  

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
      betRet.betContent = splitArr
      betRet.showContent = '['+ this.config.name + '] ' + splitArr
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