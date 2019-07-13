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
    chioceBet(item, index, _index) {
      this.$set(item, 'active', !item.active);
      if (item.active) {
        this.betArr[index].push(item);
        this.betArr.forEach((items, itemIndex) => {
          if (index != itemIndex) {
            items.forEach((_item) => {
              if (item.num.toString().slice(-1) == _item.num.toString().slice(-1)) {
                this.betArr[itemIndex].splice(this.betArr[itemIndex].indexOf(_item), 1)
                this.$set(_item, 'active', false);
              }
            })
          }
        })
      } else {
        this.betArr[index].splice(this.betArr.indexOf(item), 1);
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
      if (Combinatorics.C(n,this.config.algorithm)>0&&items>0) {
        this.allChoiceYard = items;
      }else{
        this.allChoiceYard = 0;
      }
    },
    //机选
    randomChioceBet() {
      this.quickIndex = 0;
      let max = _.maxBy(this.bonusAmtL[0].golbal, (el) => el.num);
      let min = _.minBy(this.bonusAmtL[0].golbal, (el) => el.num);
      let Random = this.createRandom(this.config.randomCount, +min.num.toString().slice(-1), +max.num.toString().slice(-1) + 1);
      this.restBet();
      Random.forEach((Rm, Rmindex) => {
        if(this.bonusAmtL.length<=1){
          this.$set(this.bonusAmtL[0].golbal[Rm - 1], 'active', true);
          this.betArr[0].push(this.bonusAmtL[0].golbal[Rm - 1])
        }else{
          this.$set(this.bonusAmtL[Rmindex].golbal[Rm - 1], 'active', true);
          this.betArr[Rmindex].push(this.bonusAmtL[Rmindex].golbal[Rm - 1])
        }
      })
      this.validChioceNum();
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
      let splitArr = '';
      if (this.betArr.length > 1) {
        this.betArr.forEach((item, index) => {
          item.forEach((_item, _index) => {
            let a = ',';
            if (_index == item.length - 1) {
              a = '|';
            }
            if (index == this.betArr.length - 1 && _index == item.length - 1) {
              a = '';
            }
            splitArr += _item.num.join('') + a;
          })
        })
      } else {
        this.betArr[0].forEach((item, index) => {
          let a = '|';
          if (index == this.betArr[0].length - 1) {
            a = '';
          }
          splitArr += item.num.join('') + a;
        })
      }
      let obj = {};
      obj.gameNo = this.$route.params.gameNo;
      obj.groupNo = this.settings.groupNo;
      obj.betContent = splitArr;
      obj.betNumber = this.allChoiceYard;
      obj.betAmt = this.$asmd.mul(obj.betNumber, this.config.betInitMoney,this.betModel);
      obj.gamePattern = this.$store.state.betModel;
      obj.estimateProfit = this.$asmd.sub(this.$asmd.mul(this.settings.bonusAmt, 1, this.betModel), obj.betAmt);
      obj.betMultiple = 1;

      obj.showContent = ` [${this.settings.groupName}] ${obj.betContent}`;
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
