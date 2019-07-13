<template>
    <div>
      <div class="sc-gMcBNU fLCLBP">
        <div class="sc-bwzfXH kMDzjb">
          <div class="sc-iLVFha exmPlI" v-html="config.description"></div>
        </div>
        <div class="sc-dPNhBE lcJMNH">
          <div class="sc-fCPvlr iqoNWh">
            <div>
              <div class="sc-kkwfeq itwcYr" @click="randomChioceBet">
                <i class="iconfont icon-dianji jDZdyJ"></i>
                <span class="sc-cbMPqi hnbdBn">机选</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sc-kTUwUJ jSUaeT">
        <div class="sc-bdVaJa kZAgjJ">
          <div class="sc-dqBHgY iijRGP">
            <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':item.active}]" @click="chioceBet(item)" v-for="(item,index) in bonusAmtL" :key="index">
              <div class="sc-btzYZH jGqXUY" v-text="item.num"></div>
              <div class="sc-jtRfpW htezMD"></div>
              <div class="sc-bYSBpT fPcJkT" v-text="item.peilv"></div>
            </div>
          </div>
        </div>
        <!-- <div>
          <span class="sc-gxMtzJ iMwtqM">快速选号</span>
          <div class="sc-bdVaJa kZAgjJ">
            <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==1}]" @click="quickChioceBet('大',1)">
              <div class="sc-btzYZH jGqXUY">大</div>
            </div>
            <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==2}]" @click="quickChioceBet('小',2)">
              <div class="sc-btzYZH jGqXUY">小</div>
            </div>
            <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==3}]" @click="quickChioceBet('单',3)">
              <div class="sc-btzYZH jGqXUY">单</div>
            </div>
            <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==4}]" @click="quickChioceBet('双',4)">
              <div class="sc-btzYZH jGqXUY">双</div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="sc-hCbubC lcFehD">
        <div class="sc-lnrBVv hlSTFe">
          <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
          <span class="sc-fvLVrH gtqmUF" v-text="this.betArr.length"></span>
          <span class="sc-hvvHee iCQRmZ">注</span>
          <div class="sc-cPuPxo biOJUI"></div>
          <span class="sc-hvvHee iCQRmZ">共</span>
          <div class="sc-eSePXt jFjQYg" v-text="allMoney"></div>
          <span class="sc-hvvHee iCQRmZ">元</span>
          <div class="sc-bwzfXH kMDzjb"></div>
          <div class="sc-dXfzlN iyQVYu">
            <button class="sc-kAdXeD figbcq" @click="betGame">投注</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped lang="less">
    @import './index.less';
  
  </style>
  
  <script>
    export default {
  props: ['config', 'settings'],
  data() {
    return {
      bonusAmtL:[], //每个号码对应的 奖金 数组
      betArr:[], //选择的投注列表
      quickIndex:0, //快速按钮选中
    }
  },
  computed: {
    betModel(){
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
        pattern = 1
      } else if (this.$store.state.betModel == 1) {
        pattern = 0.1
      }
      return pattern
    },
    allMoney() {
      return (this.$asmd.mul(this.betArr.length,this.config.betInitMoney,this.betModel)).toFixed(2);
    }
  },
  mounted () {
    this.bonusAmtL = _.clone(this.config.sub.golbal);
    this.getGameBonusByGroupNo();
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
    chioceBet(item){
      this.$set(item,'active',!item.active);
      if(item.active){
        this.betArr.push(item)
      }else{
        this.betArr.splice(this.betArr.indexOf(item),1);
      }
    },
    //快速选号
    quickChioceBet(quick,index){
      this.quickIndex = index;
      let max = _.maxBy(this.bonusAmtL,(el)=> el.num);
      let min = _.minBy(this.bonusAmtL,(el)=> el.num);
      let middle = Math.ceil(this.$asmd.numDiv(this.$asmd.numAdd(max.num,min.num),2));
      this.betArr = []
      this.bonusAmtL.forEach((el)=>{
        el.active = false;
        if(quick=='大'){
          if(el.num>=middle){
            el.active = true;
            this.betArr.push(el)
          }
        }else if(quick=='小'){
          if(el.num<middle){
            el.active = true;
            this.betArr.push(el)
          }
        }else if(quick=='单'){
          if(el.num%2!=0){
            el.active = true;
            this.betArr.push(el)
          }
        }else if(quick=='双'){
          if(el.num%2==0){
            el.active = true;
            this.betArr.push(el)
          }
        }
      })
    },
    //机选
    randomChioceBet(){
      this.quickIndex = 0;
      // let max = _.maxBy(this.bonusAmtL,(el)=> el.num);
      // let min = _.minBy(this.bonusAmtL,(el)=> el.num);
      let Random = Number(this.createRandom(1,3,19));
      this.betArr = [];
      this.bonusAmtL.forEach((el)=>{
        el.active = false;
        if(el.num == Random){
          el.active = true;
          this.betArr.push(el)
        }
      })
    },
    //投注
    betGame(){
      if (this.$store.state.betRets.length==0&&this.betArr.length==0) {
        this.randomChioceBet()
        return
      }
      if(this.$store.state.betRets.length!=0&&this.betArr.length==0){
        this.$router.push('/betResult')
        return
      }
      // if(this.betArr.length<=0){
      //   this.$vux.alert.show({
      //     title: '提示',
      //     content: '请先选择号码',
      //   })
      //   return 
      // }
      let gameArr = [];
      this.betArr.map((el)=>{
        let obj = {};
        obj.gameNo = this.$route.params.gameNo;
        obj.groupNo = el.groupNo
        obj.betContent = (()=>{ 
          if(el.num=='大'){
            return 'a';
          }else if(el.num=='小'){
            return 'b';
          }else if(el.num=='单'){
            return 'c';
          }else if(el.num=='双'){
            return 'd';
          }else{
            return el.num;
          }
        })();
        obj.showContent = '['+this.config.name+"]" + el.num
        obj.betNumber = 1
        obj.betMultiple = 1;
        obj.betAmt = this.$asmd.mul(obj.betNumber,this.config.betInitMoney,this.betModel); 
        obj.gamePattern = this.$store.state.betModel
        obj.estimateProfit = this.$asmd.sub(this.$asmd.mul(el.peilv, this.betModel), obj.betAmt);;
        gameArr.push(obj);
      })
      this.$store.commit(this.$store.state.mutationType.ADD_BET,gameArr);
      this.restBet();
      this.$router.push('/betResult')
    },
    //投注状态重置
    restBet(){
      this.betArr = [];
      this.bonusAmtL.forEach((el)=>{el.active = false;})
    },
    //根据游戏编号查询游戏奖金 
    getGameBonusByGroupNo() {
      this.bonusAmt = [];
      this.$http({
        method: 'get',
        url: '/gameGroup/getGameBonusByGroupNo',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        params: {
          groupNo: this.settings.groupNo
        }
      })
      .then(response => {
        let data = response.data;
        if (data.success) {
          data.list.forEach(els => {
            this.bonusAmtL.forEach((el)=>{
              this.$set(el,'active',false);
              if(els.groupName==(el.num).toString()){
                this.$set(el,'peilv',els.bonusAmt);
                this.$set(el,'groupNo',els.groupNo);
              }
            })
          });
        }
      })
    },
  },
  watch: {

  }
}
  
  </script>
  