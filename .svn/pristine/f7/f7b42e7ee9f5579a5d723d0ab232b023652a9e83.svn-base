import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data(){
    return{
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
    }
  },
  watch: {
    config: function() {
      this.clearUI()

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
    //快速选择号码
    quickChoice(e,index){  //判断每个列表下的 号码选中  就知道 是否完成一注
      let _codeNumYardArr = this.codeNumYardArr;
      $(e.target).addClass('active').siblings().removeClass('active');
      //每次先清空 选中
      //获取父级 panelList 下的 p
      let panelList_p = $(e.target).parents('.play-content-list').find('.ball-panel P');
      panelList_p.removeClass('active')
      let text = e.target.innerText;
      _codeNumYardArr[index]=[]; //单行 选择投注号码 数组清空 否则重复添加
      if(e.target.innerText=='全'){
        panelList_p.addClass('active')
        panelList_p.each(function(){
          _codeNumYardArr[index].push($(this).text());
        })
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
      for(let i=0 ;i<_this.config.sub.length;i++){
        if(_this.codeNumYardArr[i].length<=0){
          valid = false;
        }
      }
      if(valid){
        let items=1; //总注码数
        _this.codeNumYardArr.map(function(item){
          items*=item.length
        })

        this.betCount = items
        this.betEnabled = false
      }
      else{
        this.betCount = 0
        this.betEnabled = true
      }
    },
    transDXDS (chr) {
      switch(chr) {
        case '大': return 'a';
        case '小': return 'b';
        case '单': return 'c';
        case '双': return 'd';
        default: return chr;
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg){
      let splitArr=''; //转换数组 传入后台输出格式
      for (let i = 0; i < this.codeNumYardArr.length; i++) { 
        let a = '|';
        if(i==this.codeNumYardArr.length-1){
          a='';
        } 
        splitArr+= this.codeNumYardArr[i].sort()+a; 
      }  

      var pattern = 0
      var betRet = {}
      if( this.moneyModel == 0){
        pattern = 1
      }
      else if( this.moneyModel == 1){
        pattern = 0.1
      }
      else if( this.moneyModel == 2){
        pattern = 0.01
      }

      betRet.betAmt = this.betAmt
      betRet.betBackRate = null
      betRet.betContent = splitArr.split('').map(el=>this.transDXDS(el)).join('')
      betRet.showContent = '['+ this.config.name + '] ' + splitArr
      betRet.betMultiple = this.betTimes
      betRet.betNumber = this.betCount
      //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
      betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), this.betAmt)
      betRet.gameNo = this.$route.params.gameNo
      betRet.groupNo = this.settings.groupNo
      betRet.gamePattern = this.moneyModel
      
				let tempobj = {
                bonusAmt: this.settings.bonusAmt,
                eachNoteAmt: this.$store.state.global.eachNoteAmt,
                betAmt: 0,
                betMultiple: '',
                estimateProfit: 0
            }
        betRet = {...betRet,...tempobj}
        this.$store.commit('setbetArr',betRet)
      this.clearUI()
    }
  }
}