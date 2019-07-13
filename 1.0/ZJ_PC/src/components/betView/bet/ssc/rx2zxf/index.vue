<template>
  <div>
    <div class="play-content playBoxNum">

      <p style="padding:10px 0 30px;">
        <Icon type="information-circled" style="color:red;"></Icon>
        <label style="font-size:13px;" v-html="config.description"></label>
        <Tooltip placement="bottom-start">
          <div slot="content" v-html="config.rule" style="white-space: normal;"></div>
          <label style="text-decoration:underline;font-size:13px;color:red;">规则</label>
        </Tooltip>
        <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
          <div slot="content" v-html="config.example" style="white-space: normal;"></div>
          <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
        </Tooltip>
      </p>

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

      <div class="play-content-list flex" v-for="(itemWarp,DataNumIndex) in (this.config ? this.config.sub : [])" :key="DataNumIndex">
        <div class="label flex">
          <p class="iconfont icon-decoration_icon"></p>
          <p v-text="itemWarp.unit"></p>
        </div>
        <div class="ball-panel flex">
          <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
            <p @click="choiceNum($event,DataNumIndex)" v-text="item-itemWarp.golbal[0]"></p>
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
      <div class="bet2confirm">
          <p>您选择了
              <span>{{betCount}}</span> 注</p>
          <Button @click="btnConfirmChoiceFun" :disabled="betEnabled" type="error">确认选号</Button>
      </div>
    </div>
    

  </div>
</template>

<style lang='less' scoped>
    @import '../bet.less';
</style>

<style scoped>
  .local-wrap {
      padding: 10px;
      font-size: 13px;
  }

  .local-wrap >>> .ivu-checkbox-group {
      display: inline-block;
      margin: 0 0 0 10px;
  }
</style>
<script>
import algorithm from '@/assets/js/algorithm'
import Combinatorics from '@/assets/js/combinatorics'
import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data(){
    return{
      social: ['万', '千', '百', '十', '个'],
      
      codeNumYardArr: [],
      moneyModel: 0, 
      betCount: 0,
      betTimes: 1,
      betEnabled: true,
    }
  },
  computed: {
    selLen: function() {
        return this.social.length
    },
    schemeCount: function() {
      return Combinatorics.C(this.social.length, this.config.algorithm)
    },
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
    schemeCount () {
      this.validChioceNum()
    },
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
  mounted(){
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
      this.social = ['万', '千', '百', '十', '个']
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
      
      if (this.social.length >= this.config.algorithm && this.codeNumYardArr[0].length >= (this.config.count || this.config.algorithm)) {
        valid = true;
      }
      
      if(valid){
        this.betCount = Combinatorics.C(this.codeNumYardArr[0].length, this.config.count || this.config.algorithm) * Combinatorics.C(this.social.length, this.config.algorithm) * (this.config.count ? 2 : 1)
        this.betEnabled = false
      }else{
        this.betCount = 0
        this.betEnabled = true
      }
    },
    btnConfirmChoiceFun(arg){

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
      betRet.betContent = algorithm.transWQBSGToNum(this.social) + ':' + this.codeNumYardArr[0].join('|')
      betRet.showContent = '['+ this.config.name + ':' + this.social + '] ' + this.codeNumYardArr[0].join('|')
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
</script>
