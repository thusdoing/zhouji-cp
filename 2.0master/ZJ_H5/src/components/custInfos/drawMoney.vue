<style scoped>
@import '../../assets/header.css';
.draw-money>>>.weui-cells{font-size: 13px;color: #5E5E5E;margin-top: 0px; }
.draw-money>>>.el-collapse-item__header{font-size: 13px; padding-left: 15px;}
.draw-money>>>.el-collapse-item__content{padding-bottom: 0px;background-color: #eeeeee; }
.draw-money>>>.el-collapse-item__arrow.is-active{margin-right: 15px;}
.draw-money-info{padding: 18px;}
.draw-money-mark{font-size: 12px;color: #5E5E5E;padding: 10px 15px;}
</style>
<template>
    <div>
        <wv-header title="提现" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main draw-money" style="margin-bottom: 0;padding-bottom: 60px;">
            <wv-group>
                <wv-input label="账户余额" :readonly="true" v-model="acctInfo.acctAmt" ></wv-input>
            </wv-group>
            <el-collapse v-model="open">
                <el-collapse-item name="drawmoney">
                    <template slot="title">
                    <div>   <span style="display:inline-block;width:105px">可提金额</span><span style="color:#ec2829;">{{ acctInfo.withAmt }}</span></div>
                    </template>
                    <div class="draw-money-info">

                        <wv-flex :gutter="10">
                            <wv-flex-item>
                                <div>优惠稽核</div>
                            </wv-flex-item>
                            <wv-flex-item flex="2">
                                <div v-if="acctInfo.isActivityPass == '通过'">{{acctInfo.isActivityPass}}</div>
                                <div v-if="acctInfo.isActivityPass != '通过'" style="color:#ec2829;">{{acctInfo.isActivityPass}}</div>
                            </wv-flex-item>
                        </wv-flex>
                        <!-- <wv-flex :gutter="10">
                            <wv-flex-item>
                                <div>回收优惠</div>
                            </wv-flex-item>
                            <wv-flex-item flex="2">
                                <div style="color:#ec2829;">{{ acctInfo.giveAmtTotalDeduct}}</div>
                            </wv-flex-item>
                        </wv-flex> -->
                        <wv-flex :gutter="10">
                            <wv-flex-item>
                                <div>常态性稽核</div>
                            </wv-flex-item>
                            <wv-flex-item flex="2">
                                <div v-if="acctInfo.isNormalPass == '通过'">{{acctInfo.isNormalPass}}</div>
                                <div v-if="acctInfo.isNormalPass != '通过'"  style="color:#ec2829;">{{acctInfo.isNormalPass}}</div>
                            </wv-flex-item>
                        </wv-flex>
                        <wv-flex :gutter="10">
                            <wv-flex-item>
                                <div >扣除手续费</div>
                            </wv-flex-item>
                            <wv-flex-item flex="2">
                                <div style="color:#ec2829;">{{acctInfo.serverCharge}}</div>
                            </wv-flex-item>
                        </wv-flex>
                        <wv-flex :gutter="10">
                            <wv-flex-item>
                                <div>扣除行政费</div>
                            </wv-flex-item>
                            <wv-flex-item flex="2">
                                <div style="color:#ec2829;">{{ acctInfo.xzfAmtTotalDeduct}}</div>
                            </wv-flex-item>
                        </wv-flex>
                        <wv-flex :gutter="10">
                            <wv-flex-item>
                                <div>共需扣除</div>
                            </wv-flex-item>
                            <wv-flex-item flex="2">
                                <div style="color:#ec2829;">{{ acctInfo.deductAmtTotal}}</div>
                            </wv-flex-item>
                        </wv-flex>
                        <wv-flex :gutter="10">
                                <div v-if="withset.isApplyWith=='1'" >再投注<span style="color:#ec2829;">{{acctInfo.noPassXzfFlowTotalAmt}}</span>元流水，本次提现就可以免行政费哦</div>
                                <div v-if="withset.isApplyWith=='0'&&acctInfo.noPassXzfFlowTotalAmt>0" >未达到流水，无法提现</div>
                        </wv-flex>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <wv-group>
                <wv-input label="总有效投注额"  :readonly="true" v-model="acctInfo.betTotal"></wv-input>
            </wv-group>
            <wv-group>
                <wv-checklist title="请选择提现银行" align='right' :options="options" :max=1 v-model="checkedItems"></wv-checklist>
            </wv-group>
            <wv-group>
                <wv-input label="提现金额"  placeholder="请输入提现金额" v-model="postalRequest.amt" required></wv-input>
                <wv-input type="password" label="支付密码"  placeholder="请输入支付密码" v-model="postalRequest.withPwd" required></wv-input>
            </wv-group>

            <wv-flex>
                <wv-flex-item class="draw-money-mark">

                    <div>今天还可以提现{{remainNum}}次，单笔提现最低{{withset.onlyWithDown}}元，最高{{withset.onlyWithUp}}元</div>
                </wv-flex-item>
            </wv-flex>

            <wv-button  @click="postMsg" type="warn" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;">立即提现</wv-button>
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
import { Dialog } from 'we-vue'

export default {
    data () {
        return {
            acctInfo:{
                acctAmt:'',
                betTotal:'',
                custNo:'',
                deductAmtTotal:'',
                endDate:'',
                giveAmtTotalDeduct:'',
                isActivityPass:'',
                isNormalPass:'',
                noPassXzfFlowTotalAmt:'',
                rechargeStatus:'',
                startDate:'',
                totalServerCharge:'',
                withAmt:'',
                xzfAmtTotalDeduct:''
            },
            withset: {},
            remainNum:'',
            banks:[],
            checkedItems: [],
            options: [
                {
                    label:'中国工商银行',
                    value:'12345678'
                }],
            postalRequest: {
                amt: '',
                bankId: '',
                reason: '',
                withPwd: ''
            },
            open : 'drawmoney',
        }
    },
    created(){


    },
   methods : {
        /** 跳转路由 */
        to_page(active){
            this.$router.push({name:active});
        },
        getPostalFlows(){
           this.$api.post('postalFlows').then((data) => {
               this.acctInfo = data;
               this.acctInfo.acctAmt = data.acctAmt+'';
               this.acctInfo.betTotal = data.betTotal+'';
               this.acctInfo.custNo = data.custNo+'';
               this.acctInfo.deductAmtTotal = data.deductAmtTotal+'';
               this.acctInfo.endDate = data.endDate;
               this.acctInfo.giveAmtTotalDeduct = data.giveAmtTotalDeduct+'';
               this.acctInfo.isActivityPass = data.isActivityPass+'';
               this.acctInfo.isNormalPass = data.isNormalPass+'';
               this.acctInfo.noPassXzfFlowTotalAmt = data.noPassXzfFlowTotalAmt+'';
               this.acctInfo.rechargeStatus = data.rechargeStatus+'';
               this.acctInfo.startDate = data.startDate+'';
               this.acctInfo.totalServerCharge = data.totalServerCharge+'';
               this.acctInfo.xzfAmtTotalDeduct = data.xzfAmtTotalDeduct+'';
               this.acctInfo.withAmt=data.withAmt+'';

               this.withset = data.withset;
               this.remainNum = data.withset.withNumber - data.withset.rechargeNumber;
               this.options = [];
               for(let i  in data.banks){
                   let obj = {};
                   obj.label = data.banks[i].bankName+' '+ data.banks[i].bankAcct.substr(data.banks[i].bankAcct.length-8,8);
                   obj.value = data.banks[i].tableKey;
                   this.options.push(obj);
               }
               this.banks = data.banks;
               return;
           }).then(async (data)=>{
               if(this.banks.length==0){
               await Dialog({title: '提示信息',message:"请先绑定银行卡！",skin: 'ios', });
               this.$router.push('/listBankCard');
               return;
        }
           })
        } ,
        postMsg(){
            this.postalRequest.bankId = this.checkedItems[0];
            this.$api.post('sendPostalMsg',this.postalRequest,true).then((data) => {
                if(data.success){
                    this.tipMessage = data.msg;
                    this.$router.push({name:'rechargeWithList',params:{show_navber:"withRecordList"}});
                    this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                }else{
                    this.tipMessage = data.msg;
                    this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                }
            })
        }
    },
    async mounted() {
        this.custInfo = JSON.parse(sessionStorage.custInfo);
        if(!this.custInfo.withStatus){
            await Dialog({title: '提示信息',message:"请先设置支付密码！",skin: 'ios'});
            this.$router.push('/settingPayPwd');
            return;
        }
        this.getPostalFlows();


        //this.getvcodeImage();

    }
}
</script>
