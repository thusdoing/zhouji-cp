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
    /**
     * @author maobi@gmail.com
     * @date 2018年9月5日
     * 点击，选中号码
     * @param {number} pos 0：胆码，1：拖码
     * @param {number} index 0-10 11位数字序号
     */
    choiceNum(pos, index) {
      // 0代表是胆码
      if (pos === 0) {
        const danma = this.codeNumYardArr[0];
        danma.forEach((val, i) => {
          // 是当前胆码，不用修改，后面会重新设定
          if (i == index) return true;
          // 只能选一个胆码，上一个胆码取消选中
          if (val === 1) danma[i] = 0;
        });
      }

      // codeNumYardArr 多组号码，每组号码，选中的号码不能重复
      // 任意一组选中的数字，其他组的数字状态都应不选中
      for (let i = 0; i < this.codeNumYardArr.length; i++) {
        if(i != pos) this.codeNumYardArr[i][index] = 0;
      }

      // 使用$set 保证Vue 动态刷新界面，因this.codeNumYardArr[pos] 是引用变量
      this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index]);
      
      // 计算中奖注数
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
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
          pattern = 1
      } else if (this.$store.state.betModel == 1) {
          pattern = 0.1
      } else if (this.$store.state.betModel == 2) {
          pattern = 0.01
      }
      let num = this.config.posLen || this.config.algorithm;
      let arr = '';
      let jBool = false;
      let iBool = false;
      
      for(let i = 0; i < this.codeNumYardArr.length; i++){
        let codeArr = this.codeNumYardArr[i];
        if(iBool){
          arr += "|";
          jBool = false;
        }
        iBool = true
        for(let j = 0;j < codeArr.length; j++){
          if (codeArr[j] == 1) {
            if(jBool) {arr += ","}
            arr += (j+1)>9?(j+1):('0'+(j+1));
            jBool = true;
          }
        }
      }
      let gameArr = [];
      let obj = {};
      obj.gameNo = this.$route.params.gameNo;
      obj.groupNo = this.settings.groupNo;
      obj.betContent = arr;
      obj.betNumber = this.betCount;
      obj.betAmt = this.betAmt;
      obj.gamePattern = this.$store.state.betModel;
      obj.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), obj.betAmt);
      obj.betMultiple = 1;
      obj.showContent = this.config.name+arr
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

      this.codeNumYardArr = codeNumYardArr;
      this.betCount = 0;
      this.quickBtns = [];
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

      let index = 0;
      for(let i = 0; i < this.config.sub.length; i++){
        codeNumYardArr[i] = Array(this.config.sub[i].golbal[1]).fill(0);
        let sunNumber = this.config.sub[i];
        for(let j = 0; j < sunNumber.num; j++){
          let arrly = arr[index];
          codeNumYardArr[i][arrly] = 1;
          index++;
        }
      }
      this.codeNumYardArr = codeNumYardArr;
    },
    validChioceNum() {
      this.betCount = chooseFiveAlgo(this.settings.groupNo).getBetCount(this.codeNumYardArr);
    },
  }
}
