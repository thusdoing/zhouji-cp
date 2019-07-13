import asmd from '@/assets/js/asmd'
import chooseFiveAlgo from '@/assets/js/chooseFive.config'
import {  
  ADD_BET
} from '../../../state/mutation-type'

export default {
  components: {
  },
  props: ['config', 'settings'],
  data() {
    return {
      codeNumYardArr: [],
      betCount: 0,
      betTimes: 1,
      textContent: '',
      social:[],
    }
  },
  computed: {
    betAmt: function() {
      return asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1))
    },
    pattern: function() {
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
        pattern = 1;
      } else if (this.$store.state.betModel == 1) {
        pattern = 0.1;
      } else if (this.$store.state.betModel == 2) {
        pattern = 0.01;
      }
      return pattern;
    },
  },
  watch: {
    config: function() {
      this.clearUI();
    },
    textContent: function(){
        let charArray = this.textContent.split(';');
        charArray = this.division(charArray,",");
        charArray = this.division(charArray,"，");
        charArray = this.division(charArray,"；");
        
        // 去重
        let json = {};
        let arr = [];
        for (const key in charArray) {
            var ranNum = charArray[key];
            if (!json[ranNum]) {
                json[ranNum] = 1;
                arr.push(ranNum);
            }
        }
      
        let arrResult = [];
        for (const i in arr) {
          let arrContent = arr[i].split(" ");
          let XBool = false;
          out:
          for(let key in arrContent){
            for(let i=key+1;i<arrContent.length;i++){
              if(arrContent[key]==arrContent[i]){
                XBool = false;
                break out;
              }
            }
            if(['01','02','03','04','05','06','07','08','09','10','11'].indexOf(arrContent[key])<0){
              XBool = false;
              break;
            }else{
              XBool = true;
            }
          }
          if(XBool && this.config.algorithm == arrContent.length){
            arrResult.push(arrContent);
          }
        }

        this.social = arrResult;
        this.betCount = chooseFiveAlgo(this.settings.groupNo).getBetCount(arrResult);
    },
  },
  mounted () {
    this.clearUI();
  },
  methods: {
    btnConfirmChoiceFun() { // 投注
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
          pattern = 1
      } else if (this.$store.state.betModel == 1) {
          pattern = 0.1
      } else if (this.$store.state.betModel == 2) {
          pattern = 0.01
      }
      if (this.betCount == 0) {
        return
      }
      let arr = '';
        for(const i in this.social){
            if(i>0){arr += ","}
            for(const j in this.social[i]){
                if(j>0){arr += " "}
                arr += this.social[i][j];
            }
        }

      let gameArr = [];
      let obj = {};
      obj.gameNo = this.$route.params.gameNo;
      obj.groupNo = this.settings.groupNo;
      obj.betContent = arr;
      obj.showContent = this.config.name+arr
      obj.betNumber = this.betCount;
      obj.betAmt = this.betAmt;
      obj.gamePattern = this.$store.state.betModel;
      obj.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), obj.betAmt);
      gameArr.push(obj);

      this.$store.commit(this.$store.state.mutationType.ADD_BET, gameArr);
      this.clearUI();
      this.$router.push('/betResult');
    },
    clearUI: function() {
      var codeNumYardArr = [];
      this.codeNumYardArr = codeNumYardArr;
      this.textContent = "";
      this.betCount = 0;
      this.betTimes = 1;
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
      this.codeNumYardArr = codeNumYardArr;
      return
    },
    validChioceNum() {
      this.betCount = chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
    },
    division(charArray,symbol) {
        for (let index = 0; index < charArray.length; index++) {
            let charArray1 = charArray[index].split(symbol);
            if (charArray1.length>1) {
                charArray.splice(index,1);
                for (const key in charArray1) {
                    charArray.splice(index+key,0,charArray1[key]);
                }
            }
        }
        return charArray;
    },
  }
}
