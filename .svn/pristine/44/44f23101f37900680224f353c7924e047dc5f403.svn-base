<template>
  <div>
    <div class="play-content playBoxNum">
      <div class="local-wrap">
          <label>选择位置: </label>
      
          <CheckboxGroup v-model="social">
              <Checkbox label="万"></Checkbox>
              <Checkbox label="千"></Checkbox>
              <Checkbox label="百"></Checkbox>
              <Checkbox label="十"></Checkbox>
              <Checkbox label="个"></Checkbox>
          </CheckboxGroup>

          <label>(温馨提示: 你选择了 {{ selLen }} 个位置，系统会自动根据位置组合成 {{ schemeCount }} 个方案)</label>
      </div>

      <div class="play-content-list flex" v-for="(itemWarp,DataNumIndex) in this.$parent.DataNumChoice.sub" :key="DataNumIndex">
        <div class="label flex">
          <p class="iconfont icon-decoration_icon"></p>
          <p v-text="itemWarp.unit"></p>
        </div>
        <div class="ball-panel flex">
          <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
            <p @click="choiceNum($event,DataNumIndex)" v-text="item-itemWarp.golbal[0]"></p>
            <sup v-if="LostChecked" :style="{color:item%2==0?'red':''}" v-text="item-1"></sup>
            <sup v-if="hotChecked" :style="{color:item%2==0?'red':''}" v-text="item+1"></sup>
          </div>
        </div>
        <div v-if="itemWarp.btn" class="play-btn-box flex">
          <p @click="quickChoice($event,DataNumIndex)">全</p>
          <p @click="quickChoice($event,DataNumIndex)">大</p>
          <p @click="quickChoice($event,DataNumIndex)">小</p>
          <p @click="quickChoice($event,DataNumIndex)">单</p>
          <p @click="quickChoice($event,DataNumIndex)">双</p>
          <p @click="quickChoice($event,DataNumIndex)">清</p>
        </div>
      </div>
    </div>
    <!-- 加倍区 -->
    <div class="add-area-box">
      <div class="add-area flex">
        <div class="flex align-items-c add-panel">
          <p @click="updata_add_times('sub')" class="add"><i class="iconfont icon-jianhao"></i></p>
          <input :value="this.$parent.add_times" @input="updata_add_times($event)" v-integer class="add_v" type="text">
          <p @click="updata_add_times('add')" class="add"><i class="iconfont icon-iconjia"></i></p>
        </div>       
        <p style="margin:0 2px;">倍</p>
        <p style="margin:0 2px;">模式</p>
        <div class="model">
          <Select ref="model1" @on-change="updata_model1" :value="this.$parent.model1" style="width:50px">
              <Option v-for="item in this.$parent.modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="flex showChip">
          <p>
            共选<span style="color:#da4040;" v-text="this.$parent.allChoiceYard"></span>注；
            共投<span style="color:#da4040;" v-text="this.$parent.allPutMoney"></span>元，
            盈利<span style="color:#da4040;" v-text="this.$parent.estimateProfit"></span>元
          </p>
        </div>
        <div class="btn-group">
          <Button type="warning" @click="btnConfirmChoiceFun" :disabled="this.$parent.btnConfirmChoice">
            <Icon type="ios-compose"></Icon>
            确认选号
          </Button>
          <Button type="warning"  @click="btnConfirmChoiceFun('atOnce')" :disabled="this.$parent.btnImmediately">
            <Icon type="android-checkbox-outline"></Icon>
            立即下注
          </Button>
        </div>
      </div>              
      <div class="add-area flex">
        <p>随机</p>
        <p><input v-model="randomCount" 
        onkeyup="if(this.value.length>=0){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"    
        onafterpaste="if(this.value.length>=0){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
        type="text" style="outline:none;border:1px solid #ccc;width:30px;text-align:center;margin:0 5px;">注</p>
        <p style="margin:0 5px;">
          <Button type="default" @click="randomCodeNum">
            <Icon type="shuffle" color="#d32a3d"></Icon>
            随机
          </Button>
        </p>
        <p style="width:155px;text-align:center;">投注列表</p>
        <p style="margin:0 5px;">
          <Button type="default" @click="update_allYardList">
            <Icon type="ios-trash-outline" color="#d32a3d"></Icon>
            清空
          </Button>
        </p>
        <p style="width:150px;text-align:center;">操作状态</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .local-wrap {
      padding: 10px;
  }

  .local-wrap >>> .ivu-checkbox-group {
      display: inline-block;
      margin: 0 0 0 10px;
  }
</style>
<script>
import algorithm from '@/assets/js/algorithm'
import Combinatorics from '@/assets/js/combinatorics'
import playMethods from '@/assets/js/playMethods'
export default {
  data(){
    return{
      social: [],
      hotChecked:false, //冷热
      LostChecked:false, //遗漏
      initCodeMoney:2, //每注 金额
      randomCount:1, //随机注数
      posLen: 0, 
      algorithm: null,
      type: ''
    }
  },
  computed: {
    selLen: function() {
        return this.social.length
    },
    schemeCount: function() {
      return Combinatorics.C(this.social.length, this.posLen)
    }
  },
  watch: {
    schemeCount () {
      this.$parent.allGetProfit   = this.$parent.allGetProfit || 0
      this.$parent.allChoiceYard  = playMethods.rnzxnCount(this.type, this.$parent.codeNumYardArr, this.algorithm, this.posLen)
      this.$parent.allPutMoney    = this.$parent.mul(this.initCodeMoney, this.$parent.allChoiceYard, this.$parent.add_times, this.$parent.model1)
      this.$parent.estimateProfit = this.$parent.sub(this.$parent.mul(this.$parent.allGetProfit,this.$parent.add_times,this.$parent.model1),this.$parent.allPutMoney)
    }
  },
  methods:{
    mountedData(algorithm){
      this.algorithm = algorithm;
      this.type      = this.$parent.DataNumChoice.type;
      this.posLen    = this.$parent.DataNumChoice.posLen;
      this.$parent.initCodeMoney = this.initCodeMoney;
    },
    updata_add_times(arg){
      if(arg =='add'){
        this.$parent.add_times++;
      }else if(arg =='sub'){
        if(this.$parent.add_times>1){
          this.$parent.add_times--;
        }
      }else{
        this.$parent.add_times = parseInt(arg.target.value).toString() == 'NaN' ? 0 : parseInt(arg.target.value);
      }
    },
    updata_model1(v){
      this.$parent.model1=v;
    },
    update_allYardList(){
      this.$parent.allYardList=[];
    },
    choiceNum(e,index){
      let _codeNumYardArr = this.$parent.codeNumYardArr;
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
      let _codeNumYardArr = this.$parent.codeNumYardArr;
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
      }else if(e.target.innerText=='大'){
        for(let i =5;i<10;i++){
          panelList_p.eq(i).addClass('active')
          _codeNumYardArr[index].push(panelList_p.eq(i).text());
        }
      }else if(e.target.innerText=='小'){
        for(let i =0;i<5;i++){
          panelList_p.eq(i).addClass('active')
          _codeNumYardArr[index].push(panelList_p.eq(i).text());
        }
      }else if(e.target.innerText=='单'){
        for(let i =0;i<panelList_p.length;i++){
          if(Number(panelList_p.eq(i).text())%2!=0){
            panelList_p.eq(i).addClass('active');
            _codeNumYardArr[index].push(panelList_p.eq(i).text());
          }
        }
      }else if(e.target.innerText=='双'){
        for(let i =0;i<panelList_p.length;i++){
          if(Number(panelList_p.eq(i).text())%2==0){
            panelList_p.eq(i).addClass('active');
            _codeNumYardArr[index].push(panelList_p.eq(i).text());
          }
        }
      }else if(e.target.innerText=='清'){

      }
      this.validChioceNum();
    },
    validChioceNum(){ //是否完成有效投注
      let _this = this;
      let valid = false; 
      this.$parent.allGetProfit = this.$parent.allGetProfit || 0;
      
      // 有效性判断
      if (this.social.length > this.posLen && this.algorithm.every((len, index) => {
        return len <= this.$parent.codeNumYardArr[index].length
      })){
        valid = true;
      }
      
      if(valid){
        let items=0; //总注码数
        _this.$parent.codeNumYardArr.map(function(item){
          items+=item.length
        })
        this.$parent.isValidBet =true;
        this.$parent.btnImmediately = false;
        this.$parent.btnConfirmChoice = false;
        this.$parent.allChoiceYard=Combinatorics.C(this.$parent.codeNumYardArr[0].length, this.$parent.DataNumChoice.count || this.algorithm) * Combinatorics.C(this.social.length, this.algorithm) * (this.$parent.DataNumChoice.count ? 2 : 1)
        this.$parent.allPutMoney = this.$parent.allChoiceYard*this.$parent.add_times*this.$parent.model1*this.$parent.initCodeMoney;
        this.$parent.estimateProfit = this.$parent.sub(this.$parent.mul(this.$parent.allGetProfit,this.$parent.add_times,this.$parent.model1),this.$parent.allPutMoney);
      }else{
        this.$parent.isValidBet =false;
        this.$parent.allChoiceYard = 0;
        this.$parent.allPutMoney= 0;
        this.$parent.estimateProfit = 0;
        this.$parent.btnImmediately = true;
        this.$parent.btnConfirmChoice = true;
      }
    },
    //随机生成 注码
    randomCodeNum(){
      this.randomCount=parseInt(this.randomCount);
      if(this.randomCount.toString()=='NaN'||this.randomCount<1){
        this.randomCount=1;
        this.$Modal.warning({
          title:'提示',
          content:'随机数不能小于1',
          width:'200px',
        })
      }else{
        for (let k = 0; k < this.randomCount; k++) {
          for (let k = 0; k < this.randomCount; k++) {
            var wAry = ['万', '千', '百', '十', '个']
            var wStr = ''
            var weiAry = algorithm.randomArea(0, 4, this.algorithm)
            var soArray = [0, 0, 0, 0, 0]

            weiAry.forEach(el => {
                soArray[el] = 1
                wStr += wAry[el]
            })

            var geneAry = algorithm.randomArea(0, 9, this.$parent.DataNumChoice.count || this.algorithm)

          
            var allYardObj = {}

            allYardObj.YardName = $('.play-item-list p.play_kind_list.active').text() + ':' + wStr;
            allYardObj.YardNum = geneAry.join('|')

            allYardObj.groupNo = localStorage.getItem('gameNuberCode');
            allYardObj.model = this.$parent.model1;
            allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
            allYardObj.YardCount = this.$parent.DataNumChoice.count ? 2 : 1;
            allYardObj.YardTimes = this.$parent.add_times;
            allYardObj.YardMoney =  this.$parent.mul(this.$parent.initCodeMoney,this.$parent.add_times,this.$parent.model1) * (this.$parent.DataNumChoice.count ? 2 : 1);
            this.$parent.allYardList.push(allYardObj);
          }
        }
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg){

      let splitArr=''; //转换 传入后台输出格式
      let allYardObj = {};  
      allYardObj.YardNum = this.$parent.codeNumYardArr[0].sort((a,b) => a-b).join('|');
      allYardObj.YardContent = algorithm.transWQBSGToNum(this.social) + ':' + this.$parent.codeNumYardArr[0].join('|')
      allYardObj.YardName = $('.play-item-list p.play_kind_list.active').text() + ':' + algorithm.transNumToWQBSG(algorithm.transWQBSGToNum(this.social));
      allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
      allYardObj.YardCount = this.$parent.allChoiceYard;
      allYardObj.YardTimes = this.$parent.add_times;
      allYardObj.YardMoney = this.$parent.allPutMoney;
      allYardObj.model = this.$parent.model1;

      if(arg=='atOnce'){
        var obj = {};
        obj.gameNo =  this.$route.params.gameNo;
        obj.groupNo =  localStorage.getItem('gameNuberCode');
        obj.betContent = allYardObj.YardContent
        obj.betMultiple = allYardObj.YardTimes;
        obj.betNumber = allYardObj.YardCount
        obj.betAmt = allYardObj.YardMoney;
        obj.estimateProfit = this.$parent.estimateProfit;
        let gamePattern=1;
        if( this.$parent.model1==1){
          gamePattern=0
        }else if( this.$parent.model1==0.1){
          gamePattern=1
        }else if( this.$parent.model1==0.01){
          gamePattern=2
        }
        obj.gamePattern = gamePattern;
        this.$parent.betGame([obj]).then((ret) => {
            if (ret.ret) {
                this.social = [];
                $('.play-content p.active').removeClass('active');
                this.$parent.codeNumYardArr = new Array();  
                let i=this.$parent.DataNumChoice.sub.length;
                for(let k=0;k<i;k++){       
                  this.$parent.codeNumYardArr[k]=new Array(); 
                }
                this.validChioceNum();
            }    
        })
      }
      else {
        this.social = [];
        this.$parent.allYardList.push(allYardObj);
        $('.play-content p.active').removeClass('active');
        this.$parent.codeNumYardArr = new Array();  
        let i=this.$parent.DataNumChoice.sub.length;
        for(let k=0;k<i;k++){       
          this.$parent.codeNumYardArr[k]=new Array(); 
        }
        this.validChioceNum();
      }
    }
    
  }
}
</script>
