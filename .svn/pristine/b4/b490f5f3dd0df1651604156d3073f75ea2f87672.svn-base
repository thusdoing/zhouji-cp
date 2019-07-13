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
  methods: {
    choiceNum(pos, index) {
      this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
      this.validChioceNum();
    },
    //快速选择号码
    quickChoice(index, type) {
      this.$set(this.quickBtns, index, type);
      var len = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0]//12
      var start = this.config.sub[index].golbal[0],//1
          mid = this.config.sub[index].golbal[0] + Math.ceil(this.config.sub[index].golbal[1] / 2),//1+6
          end = this.config.sub[index].golbal[1] + this.config.sub[index].golbal[0]//11+1

      switch(type) {
        case '全':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).fill(1, start, end);//(1,1,12)
          this.codeNumYardArr = codeNumYardArr;
          break
        
        case '大':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).fill(1, mid, end);//(1,7,12)
          this.codeNumYardArr = codeNumYardArr;
          break

        case '小': 
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).fill(1, start, mid-1);//(1,1,7)
          this.codeNumYardArr = codeNumYardArr;
          break
        
        case '单':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
            if (index < start) {
              return 0
            }
            return index % 2 ? 0 : 1
          }); 
          this.codeNumYardArr = codeNumYardArr;
          break

        case '双':
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr)
          
          codeNumYardArr[index] = Array(len).fill(0).map((el, index) => {
            if (index < start) {
              return 0
            }
            return index % 2 ? 1 : 0
          });
          this.codeNumYardArr = codeNumYardArr;
          break

        case '清': 
          var codeNumYardArr = _.cloneDeep(this.codeNumYardArr);
          codeNumYardArr[index] = Array(len).fill(0);
          this.codeNumYardArr = codeNumYardArr; 
          break;
      }
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
      let num = this.config.posLen || this.config.algorithm;
      let arr = '';
      let jBool = false;
      let iBool = false;

      for(let i = 0; i < this.codeNumYardArr.length; i++){
        let codeArr = this.codeNumYardArr[i];
        if(iBool){
          arr += "|"
          jBool = false
        }
        iBool = true
        for(let j = 0;j < codeArr.length; j++){
          if (codeArr[j] == 1) {
            if(jBool) {arr += ","}
            arr += (j+1)>9?(j+1):('0'+(j+1));
            jBool = true;
          }
        }
        if(!jBool){
          arr += '-'
        }
      }

      let gameArr = [];
      let obj = {};
      obj.betContent = arr;
      obj.betMultiple = 1;
      obj.betNumber = this.betCount;
      obj.betAmt = this.betAmt;
      obj.gameNo = this.$route.params.gameNo;
      obj.groupNo = this.settings.groupNo;
      obj.gamePattern = this.$store.state.betModel;
      obj.showContent = this.config.name+arr
      obj.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, 1, this.pattern), this.betAmt)
      gameArr.push(obj);

      this.$store.commit(this.$store.state.mutationType.ADD_BET, gameArr);
      this.clearUI();
      this.$router.push('/betResult');
    },
    clearUI: function() {
      var codeNumYardArr = [];
      let i = this.config.sub.length;
      for (let k = 0; k < i; k++) {  
        codeNumYardArr[k] = Array(this.config.sub[k].golbal[1]).fill(0); 
      }

      this.codeNumYardArr = codeNumYardArr
      this.betCount = 0
      this.betTimes = 1
      this.moneyModel = 0
      this.quickBtns = []
      this.social = []
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
          var ranNum = Math.floor(Math.random() * 11);
          //通过判断json对象的索引值是否存在 来标记 是否重复
          if (!json[ranNum]) {
            json[ranNum] = 1;
            arr.push(ranNum);
          }
      }

      if(this.config.code.toString().slice(4) == '11002222'){
        for(let i=0; i<this.config.sub.length; i++){// 组数
          codeNumYardArr[i] = Array(this.config.sub[i].golbal[1]).fill(0);
        }
        let arrcom = Math.floor(Math.random() * 3);
        codeNumYardArr[arrcom][arr[0]] = 1;
        this.codeNumYardArr = codeNumYardArr;
        return
      }
      let index = 0;
      for(let i=0; i<this.config.sub.length; i++){// 组数
        codeNumYardArr[i] = Array(this.config.sub[i].golbal[1]).fill(0);
        for(let j=0; j<this.config.algorithm; j++){// 每组几个
          let arrly = arr[index];
          codeNumYardArr[i][arrly] = 1;
          index++;
        }
      }
      this.codeNumYardArr = codeNumYardArr;
      return
    },
    validChioceNum() {
      this.betCount = chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
    },
  }
}
