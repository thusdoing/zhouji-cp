<style scoped>
    @import '../../../assets/header.css';
</style>
<template>
    <div>
        <wv-header title="在线充值" class="header">
            <div @click="back" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="payindex paypage" style="background: #F5F5F5">
            <div class="selectedBank">
                <p style="background: #F5F5F5;line-height: 40px;font-size: 16px;padding-left: 10px;">
                    <i style="display: inline-block;width: 10px;height: 10px;background: #EC2829;border-radius: 50%;"></i>
                    请输入充值金额
                    <span style="color: #EC2829;font-size: 12px;">(充值范围{{thirdPlatformInfo.list[selected].minIncomeAmt}}-{{thirdPlatformInfo.list[selected].maxIncomeAmt}})</span>
                </p>
                <group>
                    <x-input required type="number" v-model="formData.payMoney" placeholder="请输入充值金额"></x-input>
                </group>
                <div class="buttonList">
                    <x-button @click.native="formData.payMoney=item" mini v-for="(item, index) in amtList" :key="index">
                        <span style="color: #EC2829;">{{item}}</span>
                    </x-button>
                </div>
                <group>
                    <popup-radio title="充值渠道：" placeholder="请选择充值渠道" v-model="selected" :options="options"></popup-radio>
                </group>
                <div style="padding: 10px;background: #F5F5F5;">
                    <p>温馨提示：</p>
                    <p style="color: #EC2829;padding-bottom: 20px;" v-html="thirdPlatformInfo.list[selected].payMerchantKey"></p>
                    <x-button @click.native="xyfPay" :show-loading="loading" type="warn">确认提交</x-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import { PopupRadio } from 'vux'
    export default {
        components:{PopupRadio},
        data() {
            return {
                thirdPlatformInfo: {
                    list:[{}]
                },
                options:[],
                selected: 0,
                amtList: [100, 500, 1000, 3000],
                amt: '',
                userName: '',
                loading: false,
                formData: {
                    methodId: '',
                    payType: '',
                    custName: '',
                    payMoney: '',
                    payMode: '',
                    serviceUrl: this.$gpath || location.origin
                },
            }
        },
        created() {
            if (this.$route.params.data) {
                this.thirdPlatformInfo = this.$route.params.data
                this.options = this.$route.params.data.list.map((el,i)=>{
                    let tempObj = {}
                    tempObj.value = `${el.merchantName}`
                    tempObj.key = i 
                    return tempObj
                })
                this.selected = this.options[0].key
                return
            };
            this.$router.go(-1)
        },
        methods: {
            sleBank(item) {
                this.selected = item
            },
            back() {
                this.$router.go(-1)
            },
            xyfPay(){
                if(!/^[1-9][0-9]*(\.\d+)?$/.test(this.formData.payMoney)){
                    this.$dialog({title: '提示信息',message: '金额填写错误，请重新填写',skin: 'ios'});
                    return
                }
                
                var selpayData = this.thirdPlatformInfo.list[this.selected]

                let min = selpayData.minIncomeAmt==null?50:selpayData.minIncomeAmt;
                let max = selpayData.maxIncomeAmt==null?10000:selpayData.maxIncomeAmt;
                if(min<=this.formData.payMoney&&this.formData.payMoney<=max){
                }else{
                    this.$dialog({title: '提示信息',message: '金额填写范围不正确，请重新填写',skin: 'ios'});
                    return
                }

                this.formData.methodId = selpayData.tripartiteId
                this.formData.payType = '3';
                this.formData.payMode = this.thirdPlatformInfo.payNo
                this.formData.custName = ""

                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.post('/pay/xyfPay',this.formData).then((data)=>{
                    this.$vux.loading.hide()
                
                    if(data.data.resCode == '10000'){
                        this.payurl = data.data.Payurl
                        sessionStorage.setItem('payurl',data.data.Payurl)
                        sessionStorage.setItem('payData',JSON.stringify({isQrCode:data.data.isQrCode,payurl:data.data.Payurl,money:this.formData.payMoney,type:this.thirdPlatformInfo.payName}))
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

                            return window.location.href =  this.payurl
                        }
                        this.$router.push({name:'zhifuerweima',params:{isQrCode:data.data.isQrCode,payurl:data.data.Payurl,money:this.formData.payMoney,type:this.thirdPlatformInfo.payName}})
                    }else{
                        this.$dialog({title: '提示信息',message: '充值渠道暂时无法使用',skin: 'ios'});
                    }
                });
            },
        },
    }
</script>
<style>
    .selectedBank {
        background: #fff;
    }

    .selectedBank .weui-cells {
        margin-top: 0;
    }

    .buttonList {
        padding: 0 10px;
        display: flex;
        justify-content: center;
        background: #F5F5F5;
    }

    .buttonList .weui-btn,
    .buttonList .weui-btn+.weui-btn {
        margin: 7px;
    }
</style>