<style scoped>
@import '../../../assets/header.css';
.index-main>>>.weui-cells{font-size: 13px;}
.sys-bank-color>>>.weui-input{color: #0f9de3}
.index-main p{font-size: 12px;color: #5E5E5E;margin: 10px 20px;}
  .bYzZZd {
    display: block;
    height: 100%;
    width: 100%;
    line-height: 40px;
    text-align: center;
    background: #ec2829;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    border-radius: 3px;
    border-width: 0;
    border-color: #ec2829;
    padding: 0 4px;
    position: relative;
  }
 .bdBveP {
    margin: 10px 10px;
    height: 40px;
  }
</style>
<template>
    <div>
        <wv-header title="银行卡充值" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main">
            <group>
                <popup-radio title="选择银行" :options="sysbankList" class="sys-bank-color" v-model="sysBank" @on-hide="checkSysBank" placeholder="请选择"></popup-radio>
                <x-input title="收款户名" v-if="isShows" class="sys-bank-color" v-model="userName" readonly></x-input>
                <x-input title="收款账户" v-if="isShows" class="sys-bank-color" v-model="sysBankNo" readonly></x-input>
                <x-input title="开户支行" v-if="isShows" class="sys-bank-color" v-model="sysOpenBankName" readonly></x-input>
                <x-input title="充值金额" v-model="formRechargeParam.payMoney" readonly></x-input>
            </group>
            <p class="sc-gFXMyG klDZmi">
                1. 请转账到以上收款银行账户。<br>
                2. 请正确填写转账银行卡的持有人姓名和充值金额，以便即时核对。<br>
                3. 转账一笔提交一次，请勿重覆提交订单。<br>
                4. 请务必转账后再提交订单，否则无法即时查到您的款项！
            </p>
            <div class="sc-guztPN bdBveP"><button @click="applyRecharge" class="sc-cFlXAS bYzZZd">确认</button></div>
        </div>
    </div>
</template>
<script>
import { Group, PopupRadio, XInput} from 'vux'
export default {
    components :  {
        Group, PopupRadio, XInput
    },
    data() {
        return {
            isShows : false,
            userName : '',
            sysBank : '',
            sysOpenBankName : '',
            sysBankNo : '',
            sysbankList : [],
            sysbankListData : [],
            formRechargeParam : {
                bankId : '',
                bankName : '',
                bankType : '',
                payMoney : '',

            }
        }
    },
    methods : {
        /** 加载 系统入款账户信息 */
        loadSysBankList() {
            this.$api.get('getSysBank').then(data => {
                this.sysbankListData = data.list;
                for(let i = 0; i < this.sysbankListData.length; i++){
                    let sys = {key:this.sysbankListData[i].bankId,value:this.sysbankListData[i].sysBankName};
                    this.sysbankList.push(sys);
                }
            });
        },
        checkSysBank(){
            if(this.sysBank == ''){
                this.isShows = false;
                return ;
            }else{
                for(let i = 0; i < this.sysbankListData.length; i++){
                    if(this.sysbankListData[i].bankId == this.sysBank){
                        this.sysBankNo = this.sysbankListData[i].sysBankNo;
                        this.sysOpenBankName = this.sysbankListData[i].sysOpenBankName;
                        this.userName = this.sysbankListData[i].userName;
                        this.formRechargeParam.bankId = this.sysbankListData[i].bankId;
                        this.formRechargeParam.bankName = this.sysbankListData[i].sysBankName;
                        this.isShows = true;
                    }
                }
            }
        },
        /** 充值申请 */
        applyRecharge() {
            if(this.sysBank == ''){
                this.$dialog({title: '提示信息',message: '请先选择充值账户',skin: 'ios'});
            }else{
                this.$api.post('pay/toOnlinePay',this.formRechargeParam).then(data => {
                    if(data.success){
                        this.$router.push({name:'rechargeWithList',params:{show_navber:"rechargeRecordList"}});
                        this.$dialog.alert({title: '提示信息',message: data.msg,skin: 'ios'}).then(() => {
                        });
                    }else{
                        this.$dialog({title: '提示信息',message: data.msg,skin: 'ios'});
                    }
                });
            }
        }
    },
    mounted() {
        this.formRechargeParam.bankType = this.$route.params.bankType;
        this.formRechargeParam.payMoney = this.$route.params.payMoney;
        this.loadSysBankList();
    }
}
</script>
