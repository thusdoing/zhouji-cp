import Combinatorics from '@/assets/js/combinatorics'
import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data() {
    return {
      codeNumYardArr: [],
      moneyModel: 0, // 0 1
      betCount: 0,
      betTimes: 1,
      betEnabled: true,
      selCommon: false
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
  methods: {
    choiceNum(e, DataNumIndex, index) {
      let _codeNumYardArr = this.codeNumYardArr;

      let innerText = this.config.sub[DataNumIndex].golbal[index].toString()

      if ($(e.target).hasClass('active')) {
        $(e.target).removeClass('active');
        _codeNumYardArr[DataNumIndex].splice(_codeNumYardArr[DataNumIndex].indexOf(innerText), 1)
        this.selCommon = false
      } else {
        $(e.target).addClass('active');
        this.selCommon = true;
        _codeNumYardArr[DataNumIndex].push(innerText)
        _codeNumYardArr.map(function (item, itemIndex) {
          if (DataNumIndex != itemIndex) {
            item.map(function (_item) {
              if (innerText.toString().slice(0, 1) == _item.toString().slice(0, 1)) {
                $(e.target).parents('.fastThree-content').find('.fastThree-content-list').eq(itemIndex).find('.ball-panel p').eq(index).removeClass('active')
                _codeNumYardArr[itemIndex].splice(_codeNumYardArr[itemIndex].indexOf(_item), 1)
              }
            })
          }
        })
      }
      this.validChioceNum();
    },
    choiceNumIMG(e, DataNumIndex, index) {
      this.choiceNum({target: $(e.target).parent()}, DataNumIndex, index)
    },
    clearUI: function() {
      $('.fastThree-content p.active').removeClass('active');
      this.codeNumYardArr = []
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        this.codeNumYardArr[k] = []; 
      }

      this.selCommon = false
      this.betCount = 0
      this.betTimes = 1
      this.moneyModel = 0
      this.betEnabled = true
    },
    validChioceNum() { //是否完成有效投注
      let _this = this;
      let n = 0; //传入组合的n值
      for (let i = 0; i < this.config.sub.length; i++) {
        n+=_this.codeNumYardArr[i].length;
      }
      let items = 1; //总注码数
      _this.codeNumYardArr.map((item)=> {
        items *= Combinatorics.C(item.length,this.config.algorithm);
      })
      if (Combinatorics.C(n,this.config.algorithm)>0&&items>0) {        
        this.betCount = items;
        this.betEnabled = false
      } else {
        this.betCount = 0;
        this.betEnabled = true
      }
    },
    btnConfirmChoiceFun() {

      let splitArr = ''; //转换数组 传入后台输出格式
      if (this.codeNumYardArr.length > 1) {
        for (let i = 0; i < this.codeNumYardArr.length; i++) {
          let a = '|';
          if (i == this.codeNumYardArr.length - 1) {
            a = '';
          }
          splitArr += this.codeNumYardArr[i].sort() + a;
        }
      } else {
        splitArr = this.codeNumYardArr[0].sort().join('|');
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