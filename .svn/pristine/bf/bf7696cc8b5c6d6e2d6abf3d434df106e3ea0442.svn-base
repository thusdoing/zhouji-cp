<style scoped>
/* @import '../../../assets/header.css'; */
@import "../totransfer/transfer.css";
@import '../../../assets/header.css';
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
.zhuanhuan-center{
     -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    text-align: center;
    padding-top: 6px;
    width: 100%
}
.zhuQianBao_{
      font-size: 2.1rem;
    font-weight: 400;
    /* font-family: sans-serif; */
    color: #E64340;
}
/* .weui-cells{
  margin-top:0
} */

</style>
<template>
<div>
  <wv-header :title=headerTitle[isZhuanRu] class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
  <div style="margin-bottom: 0;" class="main-tra">
    <div >
        <tab>
          <tab-item selected @on-item-click="isZhuanRu=0"><i class="iconfont icon-chongzhijiaofei"></i>转入</tab-item>
          <tab-item @on-item-click="isZhuanRu=1"><i class="iconfont icon-tixian"></i>转出</tab-item>
        </tab>
      </div>
    <!-- <div class="zhuanhuan-center" style="background:#fff">

                        <el-button-group>
                            <el-button type="primary" :class="[{'active':activezh}]" @click="changeType('zh')" size="small">转入</el-button>
                            <el-button type="primary" :class="[{'active':activejl}]" @click="changeType('jl')" size="small">转出</el-button>
                        </el-button-group>
                    </div> -->
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
            <span class="zhuQianBao_">{{zhuQianBao[isZhuanRu]}}</span>
            <span class="sc-kqEXUp cchOLB">{{qianbaomiaoshu[isZhuanRu]}}</span>
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
            <span class="zhuYuE">{{userAcct[isZhuanRu]}}</span>
          </div>
        </wv-flex-item>
        <!-- <wv-flex-item flex="1">
          <wv-button type="warn" :mini="true" style="padding:0 1rem" @click.native="yiJianHuiShou">{{btnTitle[isZhuanRu]}}</wv-button>
        </wv-flex-item> -->
      </wv-flex>
      <div class="czlhtC"></div>
      <wv-flex class="index-line1 ling-padding">
        <wv-flex-item flex="1">
          <div style="text-align:center">
            <span class="ziAcc">{{zhuQianBao[1-isZhuanRu]}}</span>
          </div>
        </wv-flex-item>
        <wv-flex-item flex="2">
          <div style="text-align:center">
            <span class="ziYuE">{{userAcct[1-isZhuanRu]}}</span>
          </div>
        </wv-flex-item>
        <!-- <wv-flex-item flex="1">
          <wv-button type="warn" :mini="true" style="padding:0 1rem" @click.native="zhuanHuanDanGe(d.platPurseName)">一键转出</wv-button>
        </wv-flex-item> -->
      </wv-flex>
      <div class="sc-boCWhm jaaBFm">
        <span>额度转换</span>
      </div>
    </div>
    <div  style="    background-color: rgb(246, 246, 246);">
      <group style="margin-top:0" :gutter="0">
        <x-input title="资金密码" placeholder="请输入资金密码" v-model="pwd" text-align="center" type="password" ></x-input>
        <x-input title="转入金额" placeholder="请输入转入金额" v-model="money" text-align="center" ></x-input>        
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
          <checker-item :value="userAcct[isZhuanRu]" class="itemFlex">最大值</checker-item>
        </checker>
      </group>
      <group style="margin: 1rem;">
        <x-button type="warn" :disabled="money>userAcct[isZhuanRu]" @click.native="zhuanhuan">确认</x-button>
      </group>
      <!-- <group >
      </group>-->
    </div>

    </template>
    
  </div>
  </div>
</template>
<script>
import { PopupPicker } from "vux";
import { Checker, CheckerItem } from "vux";

export default {
  data() {
    return {
      reload: false,  
      isZhuanRu:0,
      zhuQianBao:["主钱包","利息宝"],
      money: "",
      userAcct:[],//0 用户余额 1 利息宝     
      maxAcc: "",      
      params: {
        type: "",
        withPwd: "",
        changeAmt: ""
      },
      geQianBao: {},
      loading:true,
      headerTitle:["转入利息宝","转出利息宝"],
      btnTitle:["一键转入","一键转出"],
      pwd:'',
      qianbaomiaoshu:['可投注彩票类游戏','复利机选，躺赚收益']

    };
  },
  components: {
    PopupPicker,
    Checker,
    CheckerItem
  },
  methods: {
    // 刷新余额，根据游戏名称设置 名字与游戏id的对象，方便checker-item的绑定。 名字与金额的对象绑定
    async refreshAcct() {
      this.reload = true;
      this.getAcctLxb()      
      this.$tools.delay(5000);
      this.reload = false;
      // this.loading=false
    },
    async getAcctLxb() {        
          let data = await this.$api.get('/lxb/getAcctLxb')  
              if (data.success && data.t) {
                 this.userAcct[0]=data.t.acctAmt
                 this.userAcct[1]=data.t.lxbAmt
                 this.userAcct=this.userAcct.concat("")
                this.loading=false
                // this.userAcct = data.t.acctPurseMoney;
                // this.PlateData = data.t.salvePurseBoList;     
                //   this.PlateData.forEach(el => {
                //     if (el.platPurseName) {             
                //       this.qianBaoId[el.platPurseName] = el.platNo;      
                //       this.geQianBao[el.platPurseName] = el.platPurseBalance;
                //       if(this.PlateData.length>this.list1[0].length-1){
                //             this.list1[0].push(el.platPurseName);
                //       }
                      
                //     }
                //   });                
              }
                },   
    // 转换金额。设置转换参数。判断转出钱包的金额与输入金额是否合理。合理转换，不合理拒绝。
    async zhuanhuan() {      
      // 判断转换金额是否合理
      if (this.money <= this.userAcct[this.isZhuanRu] && this.money>0) {
        // get 参数设置
        if (this.isZhuanRu == 0) {
          this.params.type = "090001";         
        } else {
          this.params.type = "090002";
        
        }
        this.params.changeAmt = this.money;
         this.params.withPwd = this.pwd;
        // get参数设置结束        
        this.$vux.loading.show({text: '转换中' })
        let data= await this.$tools.fetch('/lxb/transferAcct').setParams(this.params).post()

        // let data = await this.$api.postForm("/changePurseAcct", this.params);
        this.$vux.loading.hide()  
        if (data.success) {
          console.log(data)
          this.$vux.toast.show({ position: "middle", type: "text", text: data.message });
          // this.getPlateAcct();
          this.userAcct[this.isZhuanRu]=this.userAcct[this.isZhuanRu]-this.money
           this.userAcct[1-this.isZhuanRu]=+(+this.userAcct[1-this.isZhuanRu]+this.money)
          this.money=""
          this.pwd=""
        }else{
          this.$vux.toast.show({
          position: "middle",
          type: "text",
          text: data.message 
        });
        }
    
        }else {
        this.$vux.toast.show({
          position: "middle",
          type: "text",
          text: "请输入正确的转换金额"
        });
      }

    },

  
  },

  created() {
    // this.userAcctChangeReport()
   // this.$tools.fetch('/lxb/transferAcct').setParams(this.params).post()
     this.getAcctLxb();
    // this.getPlateAcct()
  }
};
</script>