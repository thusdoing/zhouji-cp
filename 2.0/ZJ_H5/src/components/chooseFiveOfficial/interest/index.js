import asmd from '@/assets/js/asmd'
import { Checker, CheckerItem } from 'vux'
import chooseFiveAlgo from '@/assets/js/chooseFive.config'
import {  
  ADD_BET
} from '../../../state/mutation-type'

export default {
  components: {
    Checker,
    CheckerItem
  },
  props: ['config', 'settings'],
  data() {
    return {
      quickBtns: [],
      codeNumYardArr: [],
      betCount: 0,
      betTimes: 1,
      social:[],
      moneyModel: 0,
      groupNo: '',
      groupNoList: []
    }
  },
  computed: {
    betAmt: function() {
      return asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1))
    },
    pattern: function() {
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
        pattern = 1
      } else if (this.$store.state.betModel == 1) {
        pattern = 0.1
      } else if (this.$store.state.betModel == 2) {
        pattern = 0.01
      }
      return pattern
    },
  },
  watch: {
    config: function() {
      this.clearUI();
    },
  },
  mounted () {
    this.clearUI();
  },
  created() {
    this.groupNo =this.$route.params.gameNo +  this.config.code.toString().substring(4, 10);
    this.getGameBonusByGroupNo();
  },
  methods: {
    getGameBonusByGroupNo() {
      this.$http.get('/gameGroup/getGameBonusByGroupNo', {
          params: {
              groupNo: this.groupNo
          }
      }).then((data) => {
          if (data.data.success) {
              this.groupNoList = data.data.list || [];
          }
      });
    },
    choiceNum(pos, index) {
      this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
      this.validChioceNum();
    },
    btnConfirmChoiceFun() {
      if (this.$store.state.betRets.length==0&&this.betCount==0) {
        this.onRandomClick()
        return
      }
      if(this.$store.state.betRets.length!=0&&this.betCount==0){
        this.$router.push('/betResult')
        return
      }

      let gameArr = [];
      let pattern = 1;
      if (this.moneyModel == 0) {
          pattern = 1
      } else if (this.moneyModel == 1) {
          pattern = 0.1
      } else if (this.moneyModel == 2) {
          pattern = 0.01
      }
      for (const i in this.codeNumYardArr[0]) {
        if (this.codeNumYardArr[0][i] == 1) {
          var betRet = {};
          betRet.betAmt = this.config.betInitMoney;
          betRet.betBackRate = null;
          betRet.betContent = this.groupNoList[i].groupName;
          betRet.showContent = this.config.name + this.groupNoList[i].groupName;
          betRet.betMultiple = this.betTimes;
          betRet.betNumber = 1;
          betRet.bonusAmt = this.groupNoList[i].bonusAmt;
          betRet.groupNo = this.groupNoList[i].groupNo;
          betRet.estimateProfit = asmd.sub(asmd.mul(betRet.bonusAmt, this.betTimes, pattern), betRet.betAmt);
          betRet.gameNo = this.$route.params.gameNo;
          betRet.gamePattern = this.moneyModel;
          gameArr.push(betRet);
        }
      }

      this.$store.commit(this.$store.state.mutationType.ADD_BET, gameArr);
      this.clearUI();
      this.$router.push('/betResult');
    },
    clearUI: function() {
      var codeNumYardArr = [];
      codeNumYardArr[0] = Array(this.groupNoList.length).fill(0);
      this.codeNumYardArr = codeNumYardArr;
      this.betCount = 0;
      this.betTimes = 1;
      this.moneyModel = 0;
      this.quickBtns = [];
      this.social = [];
    },
    onRandomClick() {// 机选
      this.clearUI();
      this.social = this.socialRandom(this.config.posLen || this.config.algorithm);
      this.validChioceNum();
    },
    socialRandom (num) {
      var codeNumYardArr = [];
      var arr = [];
      var json = {};
      while (arr.length < num) {
          //产生单个随机数
          var ranNum = Math.floor(Math.random() * 6);
          //通过判断json对象的索引值是否存在 来标记 是否重复
          if (!json[ranNum]) {
            json[ranNum] = 1;
            arr.push(ranNum);
          }
      }
      codeNumYardArr[0] = Array(this.groupNoList.length).fill(0);
      codeNumYardArr[0][arr[0]] = 1;
      this.codeNumYardArr = codeNumYardArr;

      return
    },
    validChioceNum() {
      this.betCount = chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
    },
  }
}
