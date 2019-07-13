<style scoped>
@import '../../assets/header.css';
* /deep/ .vux-no-group-title{
        margin-top: 0;background: #efeff4;
    }
</style>
<style>
    .shurujine{
        width: 100%;
        border: 0;
        outline: 0;
        background-color: #fff;
        font-size: inherit;
        color: inherit;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        text-indent: 15px
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
        <div class="index-main" style="background: #fff;margin-bottom:0;margin-top: 0;padding-top: 44px;">
            <div style="text-align: center;line-height: 50px;background: #fff">
                账号：<span style="color: #ec2829;font-size: 20px">{{custInfo.custName}}</span>
                &nbsp;&nbsp;
                余额：<span style="color: #ec2829;font-size: 20px">{{custInfo.acctAmt}}</span>
            </div>
            <div v-if="PayMethod.thirdPlatformInfo.length>0">
                <p style="background: rgb(245, 245, 245);padding: 10px 0">
                    <img style="width: 24px;margin:0 10px 0 20px;vertical-align: middle;" src="/static/ico-top.png" >
                    线上充值
                </p>
                <label style="padding: 0 10px;line-height: 40px;display: block;border-bottom: 1px solid #dedede;" :for="'tripartiteId'+index" v-for="(item, index) in PayMethod.thirdPlatformInfo" :key="index">
                    <img style="height: 26px;margin-right: 5px;vertical-align: middle" :src="$imgPath(item.icon)" slot="icon" class="cell-icon">
                    {{item.payName}}
                    <!-- <span>{{paytypelist[item.payType]}}&nbsp;&nbsp;最少充值<span style="color: #ec2829;">{{item.minIncomeAmt}}</span>元</span> -->
                    <span style="float: right;margin-right: 10px;"><input :id="'tripartiteId'+index" type="radio" name="paytype" v-model="radio" :value="'thirdPlatformInfo' + '?' + index"></span>
                </label>
                <!-- <template v-for="(item, index) in PayMethod.thirdPlatformInfo" >
                    <cell 
                    :key="item.payNo"
                    :title="item.payName"
                    is-link
                    :border-intent="false"
                    :arrow-direction="item.flag ? 'up' : 'down'"
                    @click.native="zaixianFlag(item)">
                        <img slot="icon" style="height:24px;display: block; margin-right: 5px;" :src="'/static/pay/'+item.payNo+'.png'" alt="">
                    </cell>

                    <template v-if="item.flag">
                        <radio :options="item.list" @on-change="change"></radio>
                    </template>
                </template> -->
            </div>
            <div v-if="PayMethod.xianxia.length>0">
                <p style="background: rgb(245, 245, 245);padding: 10px 0"><img style="width: 24px;margin:0 10px 0 20px;vertical-align: middle;" src="/static/ico-bot.png" >线下充值</p>
                <label style="padding: 0 10px;line-height: 40px;display: block;border-bottom: 1px solid #dedede;" :for="item.bankId" v-for="(item, index) in PayMethod.xianxia" :key="index">
                    <template v-if="item.quickMode">
                        <img v-for="(sub, index) in item.quickMode.split(',')" :key="index+'sub'" style="height: 26px;vertical-align: middle;" :src="'/static/pay/'+sub+'.png'" slot="icon" class="cell-icon">
                    </template>
                    <span>{{item.sysBankName}}&nbsp;&nbsp;充值范围<span style="color: #ec2829;">{{item.minAmt||50}}-</span><span style="color: #ec2829;">{{item.maxAmt||10000}}</span>元</span>
                    <span style="float: right;margin-right: 10px;"><input :id='item.bankId' type="radio" name="paytype" v-model="radio" :value="'xianxia' + '?' + index"></span>
                </label>
            </div>
        </div>
        <div v-if="selpay.payNo">
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 50px;background: #efeff4;margin: 0;">
                <wv-flex-item flex="2">
                    <div class="placeholder">充值金额：</div>
                </wv-flex-item>
                <wv-flex-item flex="3">
                    <div class="placeholder"><input class="shurujine" placeholder="请输入充值金额" v-model="formData.payMoney" type="number"/></div>
                </wv-flex-item>
            </wv-flex>

            <group>  
                <popup-radio title="充值渠道：" placeholder="请选择充值渠道" v-model="option" :options="options"></popup-radio>
            </group>

            <div style="background: #eee;">
                <div style="padding: 10px 10px;background: #fff; font-size: 16px; line-height: 25px;">
                    贴心提醒：
                    <p style="padding: 1px 10px 10px; color: #ec2829; background: #fff; font-size: 16px;" v-if="!hasChineseText(selpay.payMerchantKey)">及时自动到账，推荐</p>
                    <p style="padding: 1px 10px 10px;color: #ec2829; background: #fff; font-size: 16px;" v-else v-html="selpay.payMerchantKey"></p>
                </div>
                <wv-button type="warn" @click="xyfPay" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;line-height: 40px">下一步</wv-button>
            </div>
            <!-- <p style="padding: 10px 10px;background: #fff; line-height; 25px;">贴心提醒（）：<span v-html="selpay.payMerchantKey" style="margin: 8px 0;"></span></p> -->
            <!-- <wv-button type="warn" @click="xyfPay" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;line-height: 40px">下一步</wv-button> -->
        </div>
        <div v-if="selpay.bankId">
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 40px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                <wv-flex-item flex="2" style="text-align: right;">
                    充值银行：
                </wv-flex-item>
                <wv-flex-item flex="3">
                    {{selpay.sysBankName}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 40px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                <wv-flex-item flex="2" style="text-align: right;">
                    收款姓名：
                </wv-flex-item>
                <wv-flex-item flex="3">
                    {{selpay.userName}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 40px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                <wv-flex-item flex="2" style="text-align: right;">
                    收款账号：
                </wv-flex-item>
                <wv-flex-item flex="3">
                    {{selpay.sysBankNo}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 40px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                <wv-flex-item flex="2" style="text-align: right;">
                    开户网点：
                </wv-flex-item>
                <wv-flex-item flex="3">
                    {{selpay.sysOpenBankName}}
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 40px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                <wv-flex-item flex="2" style="text-align: right;">
                    <div class="placeholder">充值金额：</div>
                </wv-flex-item>
                <wv-flex-item flex="3">
                    <div class="placeholder"><input class="shurujine" placeholder="请输入充值金额" v-model="formData.payMoney" type="number"/></div>
                </wv-flex-item>
            </wv-flex>
            <wv-flex :gutter="10" style="padding:0 10px;line-height: 40px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                <wv-flex-item flex="2" style="text-align: right;">
                    <div class="placeholder">存款人姓名：</div>
                </wv-flex-item>
                <wv-flex-item flex="3">
                    <div class="placeholder"><input class="shurujine" placeholder="请输入存款人姓名" v-model="formData.custName"/></div>
                </wv-flex-item>
            </wv-flex>
            <div style="background: #eee;">
                <div style="padding: 10px 10px;background: #fff; font-size: 16px; line-height: 25px;">
                    贴心提醒：
                    <p style="padding: 1px 10px 10px;color: #ec2829; background: #fff; font-size: 16px;" v-if="!hasChineseText(selpay.bankRemark)">充值完成后，请静待3-5分钟重新刷新页面，财务收到款项后会立即为您上分。</p>
                    <p style="padding: 1px 10px 10px;color: #ec2829; background: #fff; font-size: 16px;" v-else v-html="selpay.bankRemark"></p>
                </div>
                <wv-button type="warn" @click="xxPay" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;line-height: 40px">确认提交</wv-button>
            </div>
            <!-- <div style="text-align: center;line-height: 50px;background: #fff">支持网银转账，ATM转账，银行柜台汇款</div> -->
        </div>
            <div v-if="selpay.quickId">
                <wv-flex :gutter="10" style="padding:0 10px;line-height: 50px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                    <wv-flex-item flex="2" style="text-align: right;">
                        收款姓名：
                    </wv-flex-item>
                    <wv-flex-item flex="3">
                        {{selpay.userName}}
                    </wv-flex-item>
                </wv-flex>
                <wv-flex :gutter="10" style="padding:0 10px;line-height: 50px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                    <wv-flex-item flex="2" style="text-align: right;">
                        收款账号：
                    </wv-flex-item>
                    <wv-flex-item flex="3">
                        {{selpay.userAcct}}
                    </wv-flex-item>
                </wv-flex>
                <wv-flex :gutter="10" style="padding:0 10px;line-height: 50px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                    <wv-flex-item flex="2" style="text-align: right;">
                        二维码：
                    </wv-flex-item>
                    <wv-flex-item flex="3">
                        <img style="width: 100%;" :src="$imgPath(selpay.qrCodeImg)">
                    </wv-flex-item>
                </wv-flex>
                <wv-flex :gutter="10" style="padding:0 10px;line-height: 50px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                    <wv-flex-item flex="2" style="text-align: right;">
                        <div class="placeholder">充值金额：</div>
                    </wv-flex-item>
                    <wv-flex-item flex="3">
                        <div class="placeholder"><input class="shurujine" placeholder="请输入充值金额" v-model="formData.payMoney" type="number"/></div>
                    </wv-flex-item>
                </wv-flex>
                <wv-flex :gutter="10" style="padding:0 10px;line-height: 50px;background: #efeff4;border-bottom: 1px solid #bbb;margin: 0;">
                    <wv-flex-item flex="2" style="text-align: right;">
                        <div class="placeholder">存款人姓名：</div>
                    </wv-flex-item>
                    <wv-flex-item flex="3">
                        <div class="placeholder"><input class="shurujine" placeholder="请输入存款人姓名" v-model="formData.custName"/></div>
                    </wv-flex-item>
                </wv-flex>
                <div style="background: #eee;">
                    <div style="padding: 10px 10px;background: #fff; font-size: 16px; line-height: 25px;">
                        贴心提醒：
                        <p style="padding: 1px 10px 10px;color: #ec2829; background: #fff; font-size: 16px;" v-if="!hasChineseText(selpay.quickRemark)">收款帐号、收款姓名和二维码会不定期更换，<span style="color:blue">请在获取页面最新信息后在进行充值</span>，以避免充值无法到帐。<br>"充值金额"若与转帐金额不符，充值将无法准确到帐。</p>
                        <p style="padding: 1px 10px 10px;color: #ec2829; background: #fff; font-size: 16px;" v-else v-html="selpay.quickRemark"></p>
                    </div>
                    <wv-button type="warn" @click="xxPay" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;line-height: 40px">确认提交</wv-button>
                </div>
                <!-- <p style="padding: 10px;background: #eee;color: #ec2829">贴心提醒：收款帐号、收款姓名和二维码会不定期更换，<span style="color:blue">请在获取页面最新信息后在进行充值</span>，以避免充值无法到帐。<br>"充值金额"若与转帐金额不符，充值将无法准确到帐。</p> -->
                <!-- <div style="text-align: center;line-height: 50px;background: #fff">支持微信/支付宝二维码扫描</div> -->
                <!-- <wv-button type="warn" @click="xxPay" style="margin:10px auto;background-color:#ec2829;font-size:13px;width:95%;line-height: 40px">确认提交</wv-button> -->
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
            option:''
        }
    },
    created(){
        this.getSysPayMethod();
        this.getAcct()
    },
    watch:{
        radio:function(n,o){
            let arr = n.split('?')
            this.selpay = this.PayMethod[arr[0]][arr[1]]
            if(arr[0]=='thirdPlatformInfo'){
                this.options = []
                this.selpay.list.map(el=>{
                    let tempObj = {}
                    tempObj.value = `${el.merchantName}   充值范围${el.minIncomeAmt}-${el.maxIncomeAmt}元`
                    tempObj.key = el.tripartiteId 
                    this.options.push(tempObj)
                })
                this.option = this.options[0].key
            }
            setTimeout(() => {
                window.scrollTo(0,9999);
            }, 100);
        },
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

                        return window.location.href = this.payurl
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

