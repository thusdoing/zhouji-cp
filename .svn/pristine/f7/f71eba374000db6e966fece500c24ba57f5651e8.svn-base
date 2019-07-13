<style scoped>
@import '../../../assets/header.css';
</style>
<template>
    <div v-if="selpay" style="height: 100vh;background: #fff;box-sizing: border-box;padding-top: 60px">
        <wv-header title="充值" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div v-if="selpay.bankId">
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    充值银行：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{selpay.sysBankName}}
                    <x-button style="float: right;margin-top: 10px" mini type="warn" @click.native="doCopy(selpay.sysBankName)">复制</x-button>
                </wv-flex-item>
                
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    收款姓名：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{selpay.userName}}
                    <x-button style="float: right;margin-top: 10px" mini type="warn" @click.native="doCopy(selpay.userName)">复制</x-button>
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    收款账号：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{selpay.sysBankNo}}
                    <x-button style="float: right;margin-top: 10px" mini type="warn" @click.native="doCopy(selpay.sysBankNo)">复制</x-button>
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    开户网点：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{selpay.sysOpenBankName}}
                    <x-button style="float: right;margin-top: 10px" mini type="warn" @click.native="doCopy(selpay.sysOpenBankName)">复制</x-button>
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    充值金额：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{money}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;margin: 0;">
                <wv-flex-item style="text-align: right;">
                    <wv-button type="warn" @click='$router.push("/")'>返回首页</wv-button>
                </wv-flex-item>
                <wv-flex-item style="color: red">
                    <wv-button type="primary" @click="recode">查看充值记录</wv-button>
                </wv-flex-item>
            </wv-flex>
        </div>
        <div v-else>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    收款姓名：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{selpay.userName}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    收款账号：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    截图扫码支付
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    二维码：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                        <img style="width: 100%;" :src="$imgPath(selpay.qrCodeImg)">
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 0 10px;line-height: 50px;border-bottom: 1px solid #EFEFEF;margin: 0;">
                <wv-flex-item flex="1" style="text-align: right;">
                    充值金额：
                </wv-flex-item>
                <wv-flex-item flex="3" style="color: red">
                    {{money}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding: 10px;line-height: 50px;margin: 0;">
                <wv-flex-item style="text-align: right;">
                    <wv-button type="warn" @click='$router.push("/")'>返回首页</wv-button>
                </wv-flex-item>
                <wv-flex-item style="color: red">
                    <wv-button type="primary" @click="recode">查看充值记录</wv-button>
                </wv-flex-item>
            </wv-flex>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'we-vue'
    export default{
        data(){
            return{
                selpay:{},
                money:''
            }
        },
        created(){
            this.selpay = this.$route.params.selpay;
            this.money = this.$route.params.money
            if (!this.selpay) this.$router.back();
        },
        methods:{
            recode(){
              this.$router.push({name:'rechargeWithList',params:{show_navber:"rechargeRecordList"}});
            },
            doCopy(copyText) {
                this.$copyText(copyText).then((e) => {
                    Toast.text({
                        duration: 1500,
                        message: '复制成功'
                    })
                }, (e) => {
                    Toast.text({
                        duration: 1500,
                        message: '复制失败，你的浏览器可能不支持该功能，手动复制吧'
                    })
                })
            },
        }
    }
</script>
