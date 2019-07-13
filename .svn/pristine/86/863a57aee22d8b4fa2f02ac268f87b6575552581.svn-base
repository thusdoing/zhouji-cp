<style scoped>
    @import '../../../assets/header.css';
    .bankSlecet{
        display: flex;
        margin: 10px;
        background: url('/static/img/bank_bg.png') no-repeat;
        background-size: 100% 100%;
        padding: 20px 0;
        border-radius: 10px;

    }
    .flex1{
        width: 25%;    
        text-align: center;
        line-height: 30px  
    }
    .flex1 img{
      
        width: auto;
        height:20px;   
        vertical-align: middle;  
    }
    .flex2{
        width: 70%
    }
    .flex2 span{
        display: block;
        color: #fff
    }
    .bankName{        
        font-size: 20px;
        color: #fff;
    }
    .bankType{        
        font-size: 14px;
    }
    .fanwei{
        font-size: 18px;
        margin-top: 20px
        
    }
</style>
<template>
    <div>
        <wv-header title="银行卡充值" class="header">
            <div @click="back" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="payindex paypage" style="background: #F5F5F5">
            <div class="selectedBank" v-if="selected">
                <group>
                    <cell title="充值银行"><span style="color: #2c3e50">{{selected.sysBankName}}</span></cell>
                    <cell title="收款姓名"><span style="color: #2c3e50">{{selected.userName}}</span></cell>
                    <cell title="收款账号"><span style="color: #2c3e50">{{selected.sysBankNo}}</span></cell>
                </group>
                <p style="background: #F5F5F5;line-height: 40px;font-size: 16px;padding-left: 10px;">
                    <i style="display: inline-block;width: 10px;height: 10px;background: #EC2829;border-radius: 50%;"></i>
                    请输入充值金额<span style="color: #EC2829;font-size: 12px;">(充值范围{{selected.minAmt}}-{{selected.maxAmt}})</span>
                </p>
                <group>
                    <x-input required type="number" v-model="formData.payMoney" placeholder="请输入充值金额"></x-input>
                </group>
                <div class="buttonList">
                    <x-button @click.native="formData.payMoney=item" mini v-for="(item, index) in amtList" :key="index"><span style="color: #EC2829;">{{item}}</span></x-button>
                </div>
                <group>
                    <x-input required is-type="china-name" v-model="formData.custName" placeholder="请输入存款人姓名"></x-input>
                </group>
                <div style="padding: 10px;background: #F5F5F5;">
                    <p>温馨提示：</p>
                    <p style="color: #EC2829;padding-bottom: 20px;" v-html="selected.bankRemark"></p>
                    <x-button @click.native="xxPay" :show-loading="loading" type="warn">确认提交</x-button>
                </div>
            </div>
            <div v-else>
                <group title="请选择入款银行卡">
                    <div class="bankSlecet" v-for="(item, index) in bankList" :key="index" @click="sleBank(item)">
                        <div class="flex1">
                            <!-- <span data-v-3e39c7c0="" class="bankName">BANK</span> -->
                            <img src='/static/img/bank.png' alt="">
                            </div>
                        <div class="flex2">
                            <span class="bankName">{{item.sysBankName}}</span>
                            <span class="bankType">储蓄卡</span>
                            <span class="fanwei">范围：{{item.minAmt+'-'+item.maxAmt}}</span>
                        </div>
                    </div>
                    <!-- <cell @click.native="sleBank(item)" v-for="(item, index) in bankList" :key="index" :title="item.sysBankName" is-link>范围：{{item.minAmt+'-'+item.maxAmt}}</cell> -->
                </group>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                bankList:[],
                bankimg:[],
                selected:null,
                amtList:[100,500,1000,3000],
                amt:'',
                userName:'',
                paytypelist:{apzf:'支付宝',apzhzf:'',qqzf:'QQ钱包',wxzf:'微信支付',wxgzhzf:'微信公众号',jdzf:'京东支付',cxkzf:'网银支付',wxh5zf:'微信H5',ylzf:'银联支付'},
                loading:false,
                formData:{
                    methodId:'',
                    payType:'',
                    custName:'',
                    payMoney:'',
                    payMode:'',
                    serviceUrl:this.$gpath||location.origin
                },
            }
        },
        created() {
            if(this.$route.params.bankList) {
                this.bankList = this.$route.params.bankList
                return
            };
            this.$router.go(-1)
        },
        methods: {
            sleBank(item){
                this.selected = item
            },
            back(){
                if(this.selected) return this.selected = null
                this.$router.go(-1)
            },
            xxPay(){
                let _this = this
                if(!/^[1-9][0-9]*(\.\d+)?$/.test(this.formData.payMoney)){
                    this.$dialog({title: '提示信息',message: '金额填写错误，请重新填写',skin: 'ios'});
                    return
                }
                if(this.formData.custName.length<2){
                    this.$dialog({title: '提示信息',message: '名字填写错误,请正确填写您的名字',skin: 'ios'});
                    return
                }

                let min = this.selected.minAmt==null?100:this.selected.minAmt;
                let max = this.selected.maxAmt==null?10000:this.selected.maxAmt;
                if(min<=this.formData.payMoney&&this.formData.payMoney<=max){
                }else{
                    this.$dialog({title: '提示信息',message: '金额填写范围不正确，请重新填写',skin: 'ios'});
                    return
                }

                this.formData.methodId = this.selected.bankId || this.selected.tripartiteId || this.selected.quickId
                if(this.selected.bankId){
                    this.formData.payType = '1';
                    this.formData.payMode = ''
                }else if(this.selected.quickId){
                    this.formData.payType = '2';
                    this.formData.payMode = this.selected.quickMode
                }
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.post('/pay/toPay',this.formData).then((data)=>{
                    this.$vux.loading.hide()
                    if(data.data.success){
                        this.$vux.alert.show({
                            title: '提示信息',
                            content: '充值申请已提交',
                            onHide () {
                                _this.$router.push({
                                    name:'paybankshow',
                                    params:{selpay:_this.selected,money:_this.formData.payMoney}
                                })
                            },
                        })
                    }else{
                        this.$dialog({title: '提示信息',message: data.data.msg ,skin: 'ios'});
                    }
                });
            }
        },
    }
</script>
<style>
    .selectedBank{
        background: #fff;
    }
    .selectedBank .weui-cells{margin-top: 0;}
    .buttonList{
        padding: 0 10px;
        display: flex;
        justify-content: center;
        background: #F5F5F5;
    }
    .buttonList .weui-btn,.buttonList .weui-btn + .weui-btn{
        margin: 7px;
    }
</style>