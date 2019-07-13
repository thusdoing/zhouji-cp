<style scoped>
    @import '../../../assets/header.css';
    .saomazhifuicon{font-size: 12px;}
    .saomazhifuicon img{
        height: 25px;width: auto;
        vertical-align: middle;
        padding: 3px;
    }
</style>
<template>
    <div>
        <wv-header title="扫码充值" class="header">
            <div @click="back" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="payindex paypage" style="background: #F5F5F5">
            <div class="selectedBank" v-if="selected">
                <group>
                    <cell title="收款姓名"><span style="color: #2c3e50">{{selected.userName}}</span></cell>
                    <cell title="收款账号"><span style="color: #2c3e50">{{selected.userAcct}}</span></cell>
                    <cell title="收款二维码"><img :src="$imgPath(selected.qrCodeImg)" style="width: 200px;height: 200px;"></cell>
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
                    <p style="color: #EC2829;padding-bottom: 20px;" v-html="selected.quickRemark"></p>
                    <x-button @click.native="xxPay" :show-loading="loading" type="warn">确认提交</x-button>
                </div>
            </div>
            <div v-else>
                <group title="请选择扫码方式">
                    <cell @click.native="sleBank(item)" v-for="(item, index) in quickList" :key="index" :title="item.sysBankName" is-link>
                            <div slot="icon" class="saomazhifuicon">
                                <img v-for="(sub, index) in item.quickMode.split(',')" :key="index" :src="`/static/pay/${sub}.png`">
                                充值范围<span style="color: #EC2829">{{item.minAmt+'-'+item.maxAmt}}</span>
                            </div>
                        </cell>
                </group>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                quickList:[],
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
            if(this.$route.params.quickList) {
                this.quickList = this.$route.params.quickList
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