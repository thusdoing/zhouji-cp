<style scoped>
@import '../../assets/header.css';
</style>
<style lang="less">
    .payindex.paypage{margin-bottom:0;margin-top: 0;position: absolute;top: 44px;bottom: 0;background: #f9f9f9;width: 100%;
        >h1{
            font-size:16px;
            font-weight: normal;
            color: #FF0000;
            line-height: 40px;
            padding-left:20px;
        }
        .paylist{
            background: #fff;
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            border-top: 1px solid #eee;
            .asda{}
            img{display: block;margin: 0 auto 5px;width: 45px;height: 45px;}
            >div{
                width: 33.33%;
                padding: 20px 0;
                box-sizing: border-box;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
            }
            >div:nth-child(3n){border-right: none;}
        }
    }
</style>
<template>
    <div>
        <wv-header title="充值" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="payindex paypage">
            <h1>请选择充值方式：</h1>
            <div class="paylist">
                    <div v-if="bankFlag" @click="$router.push({name:'bankrecharge',params:{bankList:PayMethod.sysBankInfo}})">
                        <img :src="icon.bank">
                        <label>银行卡转账</label>
                    </div>
                    <div @click="$router.push({name:'thirdPlatformInfo',params:{data:item}})" v-for="(item, index) in PayMethod.thirdPlatformInfo" :key="index">
                        <img :src="$imgPath(item.icon)">
                        <label>{{item.payName}}</label>
                    </div>
                    <div v-if="quickFlag" @click="$router.push({name:'quickPay',params:{quickList:PayMethod.quickPayInfo}})">
                        <img :src="icon.sm">
                        <label>快捷扫码支付</label>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Popup,Cell,CellBox,Radio,PopupRadio } from 'vux'
export default {
    components:{Popup,Cell,CellBox,Radio,PopupRadio },
    data () {
        return {
            PayMethod:{
                thirdPlatformInfo:[],
                xianxia:[]
            },
            custInfo:{
                custName:'--',
                acctAmt:'--'},
            paytypelist:{apzf:'支付宝',apzhzf:'',qqzf:'QQ钱包',wxzf:'微信支付',wxgzhzf:'微信公众号',jdzf:'京东支付',cxkzf:'网银支付',wxh5zf:'微信H5',ylzf:'银联支付'},
            radio:'',
            selpay:{
            },
            formData:{
                methodId:'',
                payType:'',
                custName:'',
                payMoney:'',
                payMode:'',
                serviceUrl:this.$gpath||location.origin
            },
            once:true,
            payurl:'',
            options:[],
            option:'',
            icon:{
                al:require('./rechargecomp/al.png'),
                wx:require('./rechargecomp/wx.png'),
                sm:require('./rechargecomp/sm.png'),
                bank:require('./rechargecomp/bank.png')
            },
            bankFlag:false,
            quickFlag:false
        }
    },
    created(){
        this.getSysPayMethod();
    },
    watch:{
    },
    methods : {
        hasChineseText(text) {
            return /[\u4e00-\u9fa5]{2,4}/.test(text)
        },
        zaixianFlag(item){
            this.$set(item,'flag',!item.flag)
        },
        change(){

        },
        getSysPayMethod() {
            this.$http.get('/pay/getSysPayMethod',{params:{f:1}}).then((data) => {
                if (data.data.success) {
                    // if(data.data.map&&data.data.map.thirdPlatformInfo&&data.data.map.thirdPlatformInfo.length>0){
                    //     data.data.map.thirdPlatformInfo.forEach((el,index)=>{
                    //         el.list.map(sub=>{
                    //             this.options.push(sub.merchantName)
                    //         })
                    //     })
                    //     this.option = this.options[0]
                    // }
                    this.PayMethod = data.data.map||{}
                    this.PayMethod.xianxia = this.PayMethod.sysBankInfo.concat(this.PayMethod.quickPayInfo)
                    if(this.PayMethod.sysBankInfo.length>0){
                        this.bankFlag = true
                    }
                    if(this.PayMethod.quickPayInfo.length>0){
                        this.quickFlag = true
                    }
                }
            })
        },
        async getAcct(){
            const { isOk, data } = await this.$store.dispatch('author/fetchAcct');
            if (!isOk) return;
            this.custInfo = data.t;
            // this.$api.get('/getAcct').then((data) => {
            //     if(data.success){
            //         this.custInfo = data.t
            //     }
            // });
        },
        xyfPay(){
            if(!this.once){return}
            if(this.formData.payMoney==""||this.formData.payMoney==null||parseInt(this.formData.payMoney)<=0){
                this.$dialog({title: '提示信息',message: '金额填写错误，请重新填写',skin: 'ios'});
                return
            }
            
            var [selpayData] = this.selpay.list.filter((el)=>{
                if(el.tripartiteId == this.option){
                    return el
                }
            })

            let min = selpayData.minIncomeAmt==null?50:selpayData.minIncomeAmt;
            let max = selpayData.maxIncomeAmt==null?10000:selpayData.maxIncomeAmt;
            if(min<=this.formData.payMoney&&this.formData.payMoney<=max){
                this.formData.payMoney = parseFloat(this.formData.payMoney);
                // if(this.formData.payMoney%1!=0){
                //     this.$dialog({title: '提示信息',message: '充值金额请填写整数',skin: 'ios'});
                //     return
                // }
            }else{
                this.$dialog({title: '提示信息',message: '金额填写范围不正确，请重新填写',skin: 'ios'});
                return
            }

            this.formData.methodId = this.option
            if(this.selpay.payNo){
                this.formData.payType = '3';
                this.formData.payMode = this.selpay.payNo
                this.formData.custName = ""
            }
            this.once=false
            this.$vux.loading.show({
                text: '加载中...'
            })
            this.$http.post('/pay/xyfPay',this.formData).then((data)=>{
                this.$vux.loading.hide()
                this.once=true
               
                if(data.data.resCode == '10000'){
                    this.payurl = data.data.Payurl
                    sessionStorage.setItem('payurl',data.data.Payurl)
                    sessionStorage.setItem('payData',JSON.stringify({isQrCode:data.data.isQrCode,payurl:data.data.Payurl,money:this.formData.payMoney,type:this.selpay.payName}))
                    if(data.data.isQrCode=='0'){
                        try{
                            return window.webkit.messageHandlers.CPOpenUrl.postMessage(this.payurl)
                        }catch(e){
                            (e)=>{}
                        }
                        try{
                            return window.JavaScriptFunction.getUrl(this.payurl)
                        }catch(e){
                            (e)=>{}
                        }

                        return window.open(this.payurl)
                    }
                    this.$router.push({name:'zhifuerweima',params:{isQrCode:data.data.isQrCode,payurl:data.data.Payurl,money:this.formData.payMoney,type:this.selpay.payName}})
                }else{
                    this.$dialog({title: '提示信息',message: '充值渠道暂时无法使用',skin: 'ios'});
                }
            });
        },
        xxPay(){
            let _this = this
            if(!this.once){return}
            if(this.formData.payMoney==""||this.formData.payMoney==null||parseInt(this.formData.payMoney)<=0){
                this.$dialog({title: '提示信息',message: '金额填写错误，请重新填写',skin: 'ios'});
                return
            }
            if(this.formData.custName.length==0){
                this.$dialog({title: '提示信息',message: '名字填写错误,请正确填写您的名字',skin: 'ios'});
                return
            }

            let min = this.selpay.minAmt==null?100:this.selpay.minAmt;
            let max = this.selpay.maxAmt==null?9999:this.selpay.maxAmt;
            if(min<=this.formData.payMoney&&this.formData.payMoney<=max){
                this.formData.payMoney = parseFloat(this.formData.payMoney);
                // if(this.formData.payMoney%1!=0){
                //     this.$dialog({title: '提示信息',message: '充值金额请填写整数',skin: 'ios'});
                //     return
                // }
            }else{
                this.$dialog({title: '提示信息',message: '金额填写范围不正确，请重新填写',skin: 'ios'});
                return
            }

            this.formData.methodId = this.selpay.bankId || this.selpay.tripartiteId || this.selpay.quickId
            if(this.selpay.bankId){
                this.formData.payType = '1';
                this.formData.payMode = ''
            }else if(this.selpay.quickId){
                this.formData.payType = '2';
                this.formData.payMode = this.selpay.quickMode
            }
            this.once=false
            this.$vux.loading.show({
                text: '加载中...'
            })
            this.$http.post('/pay/toPay',this.formData).then((data)=>{
                this.$vux.loading.hide()
                this.once=true
                if(data.data.success){
                    this.$vux.alert.show({
                        title: '提示信息',
                        content: '充值申请已提交',
                        onHide () {
                            _this.$router.push({
                                name:'paybankshow',
                                params:{selpay:_this.selpay,money:_this.formData.payMoney}
                            })
                        },
                    })
                }else{
                    this.$dialog({title: '提示信息',message: data.data.msg ,skin: 'ios'});
                }
            });
        }

    },
    mounted () {

    }
}
</script>

