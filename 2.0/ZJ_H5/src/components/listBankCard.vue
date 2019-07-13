<style scoped>
@import '../assets/header.css';
@import 'custInfos/css/updateLoginPwd.css';
.cfpdgp {
width: 100vw;
height: 100%;
position: fixed;
z-index: 0;
}
.eLEbaL {
    font-size: 12px;
    color: #5E5E5E;
    padding: 12px 10px;
    background: #fff;
    margin: 5px 10px;
    border-radius: 4px;
}
.jOCEDd {
border: solid 1px #e6e6e6;
background: #ffffff;
padding: 10px;
margin: 15px 10px 0;
color: #454545;
position: relative;
}
.jOCEDd-demo {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  margin: 0!important;
  height: 100%;
  text-align: center;
  line-height: 100px; color: red; font-size: 26px; font-family: 微软雅黑;
  background: rgba(255, 255, 255, 0.1);
  z-index: 2;
}
.jOCEDd>div>p{
    margin: 10px 0;
}
.icpuQ {
display: -webkit-flex;
display: flex;
-webkit-box-pack: justify;
-webkit-justify-content: space-between;
-ms-flex-pack: justify;
justify-content: space-between;
}
.jxrtjg {
font-size: 14px;
color: #5E5E5E;
}
.hfIWVM {
position: absolute;
right: 10px;
top: 10px;
}
.kBMKuz {
font-size: 14px;
color: #5E5E5E;
font-size: 12px;
position: absolute;
right: 10px;
top: 35px;
}
.izDxgd {
width: 18px;
height: 18px;
margin-right: 5px;
}
.KOaAQ {
border-top: solid 1px #e6e6e6;
padding-top: 10px;
}
.jCtebq {
display: -webkit-inline-box;
display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;
font-size: 13px;
line-height: 20px;
color: #e8173d;
}
.jzACeO {
display: -webkit-inline-box;
display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;
font-size: 13px;
line-height: 20px;
}
.fPVWis {
position: relative;
padding-left: 20px;
line-height: 20px;
font-size: 13px;
float: right;
color: #9b9b9b;
}
.fPVWis::before {
content: "";
background-image: url(/static/common/deleteGray@2x.png);
background-repeat: no-repeat;
background-position: center center;
background-size: contain;
position: absolute;
left: 0;
width: 20px;
height: 20px;
}
</style>
<template>
    <div>
        <wv-header title="绑定银行卡" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div @click="addBankCard()" v-if="bankBinding.length<5" class="btn-menu brack-icon" slot="right">
                <i class="el-icon-plus" slot="icon"></i>
            </div>
        </wv-header>
        <div style="width: 100%;position: absolute;top: 46px;bottom: 52px;overflow: hidden;">
                <div class="sc-jWxkHr jOCEDd" v-for="(item,index) in bankBinding" :key="index">
                  <div class="jOCEDd-demo" v-if="item.isDemo">案例</div>
                    <div>
                        <div class="sc-hAnkBK icpuQ">
                            <span>{{item.bankName}}</span>
                        </div>
                        <p class="sc-DNdyV jxrtjg">{{item.bankNo}}</p>
                        <img :src="item.bankImage" class="sc-geAPOV hfIWVM"/>
                        <p class="sc-bJTOcE kBMKuz">{{item.bankAcctName}}</p>
                    </div>
                    <div class="sc-dTLGrV KOaAQ">
                        <div class="sc-ekkqgF jzACeO">
                            
                        </div>
                        <div class="sc-jvEmr fPVWis" @click="boundDelete(index)">删除</div>
                    </div>
                </div>
            <p class="sc-dPPMrM eLEbaL" v-if="bankNums > 0">
                您已有{{bankNums}}张银行卡，一共可以设置5张银行卡。为了您的资金安全，成功提现的银行卡将自动绑定，无法进行删除和修改，若有任何问题请洽客服协助。
            </p>
            <p class="sc-dPPMrM eLEbaL" v-else>
                您还未绑定银行卡，请点击右上角的"+"进行添加，若有任何问题请洽客服协助。
            </p>
        </div>
        <!-- <wv-tabbar :fixed="true" style="background-color:#fff;border-top:1px solid #e6e6e6;">
            <wv-tabbar-item @click="to_page('home')" >
                <img class="weui-tabbar__icon" src="/static/common/tabHomeActive@2x.png" slot="icon"> 首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')">
                <img class="weui-tabbar__icon" src="/static/common/tabResultInactive@2x.png" slot="icon"> 开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')">
                <img class="weui-tabbar__icon" src="/static/common/tabDiscoverInactive@2x.png" slot="icon"> 发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <img class="weui-tabbar__icon" src="/static/common/tabServiceInactive@2x.png" slot="icon"> 客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')" is-on>
                <img class="weui-tabbar__icon" src="/static/common/tabMyInactive@2x.png" slot="icon"> 我的
            </wv-tabbar-item>
        </wv-tabbar>  -->
        <wv-tabbar :fixed="true" class="footers">
          <wv-tabbar-item @click="to_page('home')">
              <i class="iconfont icon-shouye" slot="icon"></i>
              首页
          </wv-tabbar-item>
          <wv-tabbar-item @click="to_page('openLotteryList')">
              <i class="iconfont icon-1672jiang" slot="icon"></i>
              开奖
          </wv-tabbar-item>
          <wv-tabbar-item @click="to_page('activeInfo')">
              <i class="iconfont icon-faxian" slot="icon"></i>
              发现
          </wv-tabbar-item>
          <wv-tabbar-item @click="to_page('custService')">
              <i class="iconfont icon-lianxikefu" slot="icon"></i>
              客服
          </wv-tabbar-item>
          <wv-tabbar-item @click="to_page('custInfos')" is-on>
              <i class="iconfont icon-wode" slot="icon"></i>
              我的
          </wv-tabbar-item>
      </wv-tabbar>
    </div>
</template>
<script>
const bankBindingDemo = [
  { bankImage : '/static/bank/icbc.png', bankName: '中国工商银行', bankNo: '********* 2822', bankId: '990883908214669313', bankBound: '未绑定', bankDefault: false, isDemo: true } ];
import { Dialog } from 'we-vue'
export default {
    data () {
        return {
            bankNums:0,
            bankBinding: [],
            saveBankParam :{
                tableKey:'',
                bankStatus:'0'
            },
            bankAcctName:'',
            custInfo:{}
        }
    },
    computed: {
      banks() {
        return this.bankBinding.length > 0 ? this.bankBinding : bankBindingDemo;
      }
    },
    methods: {
        /** 跳转路由 */
        to_page(active){
            this.$router.push({name:active});
        },
        boundChange(index){
            this.saveBankParam.tableKey=this.bankBinding[index].bankId;
            this.saveBankParam.bankStatus='2';
            this.$api.postForm('saveBank',this.saveBankParam).then((data) => {
            if(data.success){
                this.getBank();
                return;
            }else{
                this.tipMessage = data.msg;
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
            }
            });
        },
        boundDelete(index){
            this.saveBankParam.tableKey=this.bankBinding[index].bankId;
            this.saveBankParam.bankStatus='0';
            this.$api.postForm('saveBank',this.saveBankParam).then((data) => {
            if(data.success){
                this.getBank();
                return;
            }else{
                this.tipMessage = data.msg;
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
            }
            });
        },
        addBankCard(){
            this.$router.push({name:'addBankCard',params:{bankAcctName:this.bankAcctName,isme:true}});
        },
        getBank(){
            this.$api.get('getBank').then((data) => {
                if(data.success){
                        this.bankNums = data.list.length;
                        this.bankBinding = [];
                        for(let i  in data.list){
                            let obj = {};
                            obj.bankName = data.list[i].bankName;
                            obj.bankNo = '*********'+ data.list[i].bankAcct.substr(data.list[i].bankAcct.length-4,4);
                            obj.bankImage='/static/bank/' + data.list[i].bankIcon + '.png';
                            obj.bankId=data.list[i].tableKey;
                            obj.bankAcctName = data.list[i].bankAcctName
                            if(data.list[i].bankStatus=='2'){
                                obj.bankBound = '已绑定';
                                obj.bankDefault = true;
                            }else{
                                obj.bankBound = '未绑定';
                                obj.bankDefault = false;
                            }
                            this.bankBinding.push(obj);
                        }
                        this.bankAcctName = this.bankNums>0?data.list[this.bankNums-1].bankAcctName:''
                    }else{
                        this.tipMessage = data.msg;
                        this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                    }
            })
        },
    },
   async mounted () {
        this.custInfo = JSON.parse(sessionStorage.custInfo);
        console.log( this.custInfo)
        if(!this.custInfo.withStatus){
            await Dialog({title: '提示信息',message:"请先设置支付密码！",skin: 'ios'});
            this.$router.push('/settingPayPwd');
            return;
        }
        this.getBank();
    }
}
</script>
