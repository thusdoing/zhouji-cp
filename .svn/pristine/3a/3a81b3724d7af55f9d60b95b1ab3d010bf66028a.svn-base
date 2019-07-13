import Combinatorics from '@/assets/js/combinatorics';
export default {
  props: ['config', 'settings'],
  data() {
    return {
      bonusAmtL: [], //每个号码对应的 奖金 数组
      betArr: [], //选择的投注列表
      allChoiceYard: 0, //总注数
    }
  },
  computed: {
    betModel() {
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
        pattern = 1
      } else if (this.$store.state.betModel == 1) {
        pattern = 0.1
      }
      return pattern
    },
    allMoney() {
      return (this.$asmd.mul(this.allChoiceYard, this.config.betInitMoney, this.betModel)).toFixed(2);
    }
  },
  mounted() {
    this.bonusAmtL = _.clone(this.config.sub);
    this.betArr = new Array();
    for (let k = 0; k < this.bonusAmtL.length; k++) {
      this.betArr[k] = new Array();
    }
  },
  methods: {
    //随机生成 注码
    // createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
    createRandom(num, from, to) {
      var arr = [];
      var json = {};
      while (arr.length < num) {
        //产生单个随机数
        var ranNum = Math.floor(Math.random() * (to - from)) + from;
        //通过判断json对象的索引值是否存在 来标记 是否重复
        if (!json[ranNum]) {
          json[ranNum] = 1;
          arr.push(ranNum);
        }
      }
      return arr;
    },
    //选择号码
    chioceBet(text) {
      this.$set(this.bonusAmtL[0], 'active', !this.bonusAmtL[0].active);
      if(this.bonusAmtL[0].active){
        this.betArr[0].push(text);
      }else{
        this.betArr[0].splice(this.betArr[0].indexOf(text), 1);
      }
      this.validChioceNum()
    },
    validChioceNum() { //是否完成有效投注
      let n = 0; //传入组合的n值
      for (let i = 0; i < this.bonusAmtL.length; i++) {
        n += this.betArr[i].length;
      }
      let items = 1; //总注码数
      this.betArr.forEach((item) => {
        items *= Combinatorics.C(item.length, this.config.algorithm);
      })
      this.allChoiceYard = items;
    },
    //机选
    randomChioceBet() {
      this.$set(this.bonusAmtL[0], 'active', true);
      this.betArr[0][0]=this.bonusAmtL[0].btn;
      this.validChioceNum()
    },
    //投注
    betGame() {
      if (this.$store.state.betRets.length==0&&this.allChoiceYard==0) {
        this.randomChioceBet()
        return
      }
      if(this.$store.state.betRets.length!=0&&this.allChoiceYard==0){
        this.$router.push('/betResult')
        return
      }
      // if (this.allChoiceYard <= 0) {
      //   this.$vux.alert.show({
      //     title: '提示',
      //     content: '请先选择号码',
      //   })
      //   return
      // }
      let gameArr = [];
      let splitArr = this.bonusAmtL[0].btn;
      let obj = {};
      obj.gameNo = this.$route.params.gameNo;
      obj.groupNo = this.settings.groupNo
      obj.betContent = splitArr
      obj.betNumber = this.allChoiceYard;
      obj.betAmt = this.$asmd.mul(obj.betNumber,this.config.betInitMoney, this.betModel);
      obj.gamePattern = this.$store.state.betModel
      obj.estimateProfit = this.$asmd.sub(this.$asmd.mul(this.settings.bonusAmt, 1, this.betModel), obj.betAmt);;
      obj.betMultiple = 1;
      obj.showContent = '['+this.config.name+']'
      gameArr.push(obj);
      this.$store.commit(this.$store.state.mutationType.ADD_BET, gameArr);
      this.restBet();
      this.$router.push('/betResult')
    },
    //投注状态重置
    restBet() {
      this.bonusAmtL = _.clone(this.config.sub);
      this.betArr = new Array();
      for (let k = 0; k < this.bonusAmtL.length; k++) {
        this.betArr[k] = new Array();
      }
      this.allChoiceYard = 0;
      this.bonusAmtL.forEach((el) => {
        el.golbal.forEach(els => {
          this.$set(els, 'active', false);
        })
      })
    },
  },
  watch: {
    config() {
      this.restBet();
    },
  }
}
