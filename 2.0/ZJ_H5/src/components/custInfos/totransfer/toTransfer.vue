<style scoped>
/* @import '../../../assets/header.css'; */
@import "./transfer.css";
.msg-badge {
  position: absolute;
  top: 0px;
}
.msg-navber {
  top: 44px !important;
}
.msg-content {
  margin-top: 80px;
  width: 100%;
}
.vux-no-group-title {
  margin-top: 0;
}
/* .weui-cells{
  margin-top:0
} */

</style>
<template>
  <div style="margin-bottom: 0;" class="main-tra">
    <!-- <loading :show="JSON.stringify(this.qianBaoId)=='{}'" text=""></loading> -->
    <!-- <load-more v-if="loading" tip="正在加载"></load-more> -->
    <group :gutter="0" v-if="loading">
      <load-more tip="加载中..."/>
    </group>
    <template v-else>
        <div style=" background-color: #fff">
      <wv-flex class="index-line1 ling-padding">
        <wv-flex-item flex="8">
          <div style="text-align:center">
            <span class="zhuQianBao">主钱包</span>
            <span class="sc-kqEXUp cchOLB">可投注彩票类游戏</span>
          </div>
        </wv-flex-item>
        <wv-flex-item flex="1">
          <img
            class="_1ZJpc"
            @click="refreshAcct"
            :class="reload?'whirl':''"
            src="/static_pc/images/sx.png"
            width="12"
            height="11"
          >
        </wv-flex-item>
      </wv-flex>

      <wv-flex class="index-line1 ling-padding">
        <wv-flex-item flex="3">
          <div style="text-align:center">
            <span class="zhuYuE">{{userAcct}}</span>
          </div>
        </wv-flex-item>
        <wv-flex-item flex="1">
          <wv-button type="warn" :mini="true" style="padding:0 1rem" @click.native="yiJianHuiShou">一键回收</wv-button>
        </wv-flex-item>
      </wv-flex>
      <div class="czlhtC"></div>
      <wv-flex class="index-line1 ling-padding" v-for="d in PlateData" :key="d.platNo">
        <wv-flex-item flex="1">
          <div style="text-align:center">
            <span class="ziAcc">{{d.platPurseName}}</span>
          </div>
        </wv-flex-item>
        <wv-flex-item flex="2">
          <div style="text-align:center">
            <span class="ziYuE">{{d.platPurseBalance}}</span>
          </div>
        </wv-flex-item>
        <wv-flex-item flex="1">
          <wv-button type="warn" :mini="true" style="padding:0 1rem" @click.native="zhuanHuanDanGe(d.platPurseName)">一键转入</wv-button>
        </wv-flex-item>
      </wv-flex>
      <div class="sc-boCWhm jaaBFm">
        <span>额度转换</span>
      </div>
    </div>
    <div  style="    background-color: rgb(246, 246, 246);">
      <group style="margin-top:0" :gutter="0">
        <popup-picker title="转出钱包" placeholder="请选择转出钱包" :data="list1" v-model="zhuanchu" value-text-align="center" @on-change="change('zc')" class="vux-no-group-title" ></popup-picker>
        <popup-picker title="转入钱包" placeholder="请选择转入钱包" :data="list1" v-model="zhuanru" value-text-align="center" @on-change="change('zr')" class="vux-no-group-title" ></popup-picker>
        <x-input title="转换金额" placeholder="请输入转账金额" v-model="money" text-align="center" readonly></x-input>
      </group>
      <group style="margin:0 auto" :gutter="0">
        <checker
          v-model="money"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected"
          style="display:flex;flex-wrap: wrap;"
          radio-required 
          :max="1"
        >
      
          <checker-item
            v-for="i in [10, 20, 50,100,200,500,1000,2000,3000,5000]"
            :key="i"
            :value="i"
            class="itemFlex"           
          >￥{{i}}</checker-item>
          <checker-item :value="maxAcc" class="itemFlex">最大值</checker-item>
        </checker>
      </group>
      <group style="margin: 1rem;">
        <x-button type="warn" :disabled="money>maxAcc" @click.native="zhuanhuan">确认</x-button>
      </group>
      <!-- <group >
      </group>-->
    </div>

    </template>
    
  </div>
</template>
<script>
import { PopupPicker } from "vux";
import { Checker, CheckerItem } from "vux";

export default {
  data() {
    return {
      reload: false,
      list1: [["主钱包"]],
      zhuanru: [],
      zhuanchu: [],
      money: "",
      userAcct: "",
      maxAcc: "",
      isDisable: true,
      PlateData: [],
      qianBaoId: {},
      params: {
        masterTosalve: false,
        platId: "",
        changeBalance: ""
      },
      geQianBao: {},
      loading:true
    };
  },
  components: {
    PopupPicker,
    Checker,
    CheckerItem
  },
  methods: {
    // 钱包切换，自动切换一个主钱包，获取最大可转金额
    change(qb) {
      if (qb == "zc") {
        if (this.zhuanchu[0]) {
          if (
            this.zhuanchu[0] == this.zhuanru[0] &&
            this.zhuanchu[0] == "主钱包"
          ) {          
            this.zhuanru = [];
          } else if (this.zhuanchu[0] != "主钱包") {
            this.zhuanru = ["主钱包"];           
          }
          console.log(this.money,this.maxAcc)
        }
      } else {
        if (this.zhuanru[0]) {
          if (
            this.zhuanchu[0] == this.zhuanru[0] &&
            this.zhuanchu[0] == "主钱包"
          ) {           
            this.zhuanchu = [];
          } else if (this.zhuanru[0] != "主钱包" && this.zhuanru[0] != "") {
            this.zhuanchu = ["主钱包"];
            
          }
        }
      }
      if(this.zhuanchu[0]){
        if(this.zhuanchu[0]=="主钱包"){
            this.maxAcc = this.userAcct;
        }else{
           this.maxAcc = this.geQianBao[this.zhuanchu[0]];
        }
      }else{
        this.maxAcc=""
      }
      if (this.maxAcc > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    // 刷新余额，根据游戏名称设置 名字与游戏id的对象，方便checker-item的绑定。 名字与金额的对象绑定
    async refreshAcct() {
      this.reload = true;
      const data = await this.$api.get("/api/chess/refreshAcct");
      if (data.success && data.t) {
        this.userAcct = data.t.acctPurseMoney;
        this.PlateData = data.t.salvePurseBoList;     
          this.PlateData.forEach(el => {
            if (el.platPurseName) {             
              this.qianBaoId[el.platPurseName] = el.platNo;      
              this.geQianBao[el.platPurseName] = el.platPurseBalance;
              if(this.PlateData.length>this.list1[0].length-1){
                    this.list1[0].push(el.platPurseName);
              }
              
            }
          });
        
      }
      this.$tools.delay(5000);
      this.reload = false;
      // this.loading=false
    },
    async getPlateAcct() {        
          let data = await this.$api.get('/api/chess/getPlateAcct')  
              if (data.success && data.t) {
                this.userAcct = data.t.acctPurseMoney;
                this.PlateData = data.t.salvePurseBoList;     
                  this.PlateData.forEach(el => {
                    if (el.platPurseName) {             
                      this.qianBaoId[el.platPurseName] = el.platNo;      
                      this.geQianBao[el.platPurseName] = el.platPurseBalance;
                      if(this.PlateData.length>this.list1[0].length-1){
                            this.list1[0].push(el.platPurseName);
                      }
                      
                    }
                  });                
              }
                },
    // 初始化钱包，获取金额
    async getPurse() {
      this.reload = true;
      const data = await this.$api.post("/getPurse");
      if (data.success && data.t) {
        this.userAcct = data.t.acctPurseMoney;
        this.PlateData = data.t.salvePurseBoList;     
          this.PlateData.forEach(el => {
            if (el.platPurseName) {             
              this.qianBaoId[el.platPurseName] = el.platNo;      
              this.geQianBao[el.platPurseName] = el.platPurseBalance;
              if(this.PlateData.length>this.list1[0].length-1){
                    this.list1[0].push(el.platPurseName);
              }
              
            }
          });
        
      }
      this.$tools.delay(5000);
      this.reload = false;
      this.loading=false
    },
    // 转换金额。设置转换参数。判断转出钱包的金额与输入金额是否合理。合理转换，不合理拒绝。
    async zhuanhuan() {
      // 判断转换金额是否合理
      if (this.money <= this.maxAcc && this.money>0) {
        // get 参数设置
        if (this.zhuanchu[0] == "主钱包") {
          this.params.masterTosalve = true;
          this.params.platId = this.qianBaoId[this.zhuanru[0]];
        } else {
          this.params.masterTosalve = false;
          this.params.platId = this.qianBaoId[this.zhuanchu[0]];
        }
        this.params.changeBalance = this.money;
        // get参数设置结束
       
        if(!this.params.platId )  {
            this.$vux.toast.show({ position: "middle", type: "text", text: "请选择正确的转入钱包" });
        }else{
        this.$vux.loading.show({text: '转换中' })
        let data= await this.$tools.fetch('crypto/changePurseAcct').setParams(this.params).setCrypto(true).post()

        // let data = await this.$api.postForm("/changePurseAcct", this.params);
        this.$vux.loading.hide()  
        if (data.success) {
          this.$vux.toast.show({ position: "middle", type: "text", text: data.data.msg });
          this.getPlateAcct();
          this.maxAcc=this.maxAcc-this.money
          this.money=""
        }
      } 
        }else {
        this.$vux.toast.show({
          position: "middle",
          type: "text",
          text: "请输入正确的转换金额"
        });
      }

    },
    // 一键转入
    async zhuanHuanDanGe(name) { 
        // get 参数设置 
          this.params.masterTosalve = true;     
          this.params.changeBalance = this.userAcct;
          this.params.platId = this.qianBaoId[name];     
        // get参数设置结束
        if(this.params.changeBalance>0){
        let data= await this.$tools.fetch('crypto/changePurseAcct').setParams(this.params).setCrypto(true).post()  
                    // let data = await this.$api.postForm("/changePurseAcct", this.params);
        if (data.success) {
          this.$vux.toast.show({
            position: "middle",
            type: "text",
            text: data.data.msg
          });
          this.getPlateAcct();
        }
        }else{
          this.$vux.toast.show({
            position: "middle",
            type: "text",
            text: '账户余额不足'
          });
        }

      
    },
      // 一键回收
   async yiJianHuiShou(){
              // get 参数设置 
    this.params.masterTosalve = false;
     if(this.list1[0].length>1){
        let data= await this.$tools.fetch('crypto/onkeyChange').setParams({f:1}).setCrypto(true).post()

        // let data = await this.$api.postForm("/onkeyChange", {f:1});
        if (data.success) {

          this.$vux.toast.show({
            position: "middle",
            type: "text",
            text: data.data.msg
          });
          this.getPlateAcct();
        }
        }


          

        }
          
   

  
  },

  created() {
    // this.userAcctChangeReport()
    this.getPurse();
    // this.getPlateAcct()
  }
};
</script>