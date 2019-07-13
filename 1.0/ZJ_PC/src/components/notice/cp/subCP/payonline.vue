<template>
        <div style="position: relative;" class="react-tabs__tab-panel" role="tabpanel" id="react-tabs-41" aria-labelledby="react-tabs-40">
                <div class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-3" aria-labelledby="react-tabs-2">
                    <div>
                        <span>
                            <template v-if="paydata.length>0">
                                <div  class="Y_VD5" ref='form1'>
                                    <div class="_3ptUZ" style="overflow: hidden;">
                                        <label style="float: left;" class="uSUTt">充值方式 : </label>
                                        <div style="float: left;width: calc(100% - 96px);margin-left: 5px;">
                                            <div v-for="(item, index) in paydata" :key="index" class="dib v-mid QuSiB">
                                                <input type="radio" :checked="index==payIndex" name="tripartiteId" :id="index" class="_1iDCE">
                                                <label @click="selepayIndex(index)" class="U87la before-vertical relative" :for="index">
                                                    <div class="_2eZWe" style="background-image: url('/static_pc/images/yuan.svg');"></div>
                                                    <img height="22" class="v-mid mr2" :src="$imgPath(item.icon)">
                                                    <span class="v-mid overflow-hidden mr8">{{item.payName}}</span>
                                                    <img width="17" class="jCyGm absolute bottom-0 right-0" src="/static_pc/images/gou.svg">
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="_3ptUZ">
                                        <label class="uSUTt" style="float: left;">充值渠道 : </label>
                                        <div style="float: left;width: calc(100% - 96px);margin-left: 5px;">
                                            <div class="dib v-mid QuSiB" v-for="(item, index) in paydata[payIndex].list" :key="index">
                                                <input type="radio" :checked="index==terraceIndex" name="ter" :id="'t'+index" class="_1iDCE">
                                                <label @click="selepayTerraceIndex(index)" class="U87la before-vertical relative" :for="'t'+index">
                                                    <div class="_2eZWe" style="background-image: url('/static_pc/images/yuan.svg');"></div>
                                                    <span class="v-mid overflow-hidden mr8">{{item.merchantName}}</span>
                                                    <img width="17" class="jCyGm absolute bottom-0 right-0" src="/static_pc/images/gou.svg">
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div class="_3ptUZ">
                                        <label class="uSUTt">充值金额 : </label>
                                        <div class="dib relative">
                                            <input type="number" v-model="formData.payMoney" class="JjEDH s1cJ-">
                                            单笔最低 <span style="color: #e4393c">{{paydata[payIndex].list[terraceIndex].minIncomeAmt==null?100:paydata[payIndex].list[terraceIndex].minIncomeAmt}}</span> 元，最高 <span style="color: #e4393c">{{paydata[payIndex].list[terraceIndex].maxIncomeAmt==null?10000:paydata[payIndex].list[terraceIndex].maxIncomeAmt}}</span>元
                                            <div></div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <!-- <button type="button" @click="toOnlinePay" class="_1sc4M _2hETB mr30">
                                            充值
                                        </button> -->
                                        <Button @click="toOnlinePay" :loading="loading" class="_1sc4M _2hETB mr30"  type="primary" >充值</Button>
                                    </div>
                                </div>
                                <template v-if="isQrCode||payImageUrl">
                                    <div style="display: none;padding: 50px 0;position: relative;" ref='form2'>
                                        <img v-if="payImageUrl" :src="payImageUrl" style="height: 200px; width: 200px;margin-left: 150px">
                                        <vueQR v-else :text="payurl" :margin="0" style="height: 200px; width: 200px;margin-left: 150px"></vueQR>
                                        <h1 style="position: absolute;top: 120px;left: 400px;line-height: 24px">请使用<img style="width: 40px" :src="$imgPath(paydata[payIndex].icon)">{{paytypelist[paydata[payIndex].payType]}}扫码完成支付<br>完成支付后系统会自动为您上分</h1>
                                    </div>
                                </template>
                                
                                <div id='pay_blank' style="display: none"><h1 style="line-height: 200px;text-align: center;font-size: 30px;font-weight: normal;">请前往支付页面完成支付</h1><div></div></div>
                                

                                <div class="Vxtwm iKBfR B_20 B_21 F_17" v-html="paydata[payIndex].list[terraceIndex].payMerchantKey">
                                    
                                </div>
                            </template>
                            <h1 v-else style="font-size: 24px;text-align: center;margin: 30px 0">暂时无法使用该通道充值</h1>
                        </span>
                    </div>
                </div>
                <Modal
                    v-model="saomaFlag"
                    title="扫码支付"
                    width="1000" 
                    cancel-text =""
                    >
                    <div id="saomaImg">
                        <iframe v-if="payIframeUrl" :src="payIframeUrl" style="width: 100%;height: 400px;" frameborder="0"></iframe>
                        <div style="text-align: center;" v-if="payImageUrl"><img :src="payImageUrl" @error="imgError" alt=""></div>
                    </div>
                </Modal>
            </div>
</template>
<script>
    
import vueQR from 'vue-qr';
    export default{
        components:{vueQR},
        props:{paydata:{type:Array,default:()=>{return []}}},
        data(){
            return {
                paytypelist:{apzf:'支付宝',qqzf:'QQ钱包',apzhzf:' ',wxzf:'微信',wxgzhzf:'微信公众号',jdzf:'京东支付',cxkzf:'网银支付',wxh5zf:'微信H5',ylzf:'银联支付'},
                payIndex:0,
                terraceIndex:0,
                formData:{
                    methodId:'',
                    payType:'3',
                    custName:'',
                    payMoney:'',
                    payMode:'',
                    serviceUrl:location.origin
                },
                once:true,
                payurl:'',
                timeId:'',
                timecs:0,
                loading:false,
                saomaFlag:false,
                isQrCode:true,
                payIframeUrl:'',
                payImageUrl:''
            }
        },
        created(){
        },
        methods:{
            payonline(){
                window.open("/pay/toThirdPay?tripartiteId=890b3fe2ab904a0184c1239beb1c48ea&payMoney=1000&bankType=paymode")
            },
            selepayIndex(index){
                // this.formData.bankId = this.paydata[index].bankId;
                this.payIndex = index
                this.terraceIndex = 0
            },
            selepayTerraceIndex(index){
                this.terraceIndex = index
            },
            toOnlinePay(){
                let selectPay = this.paydata[this.payIndex].list[this.terraceIndex]
                let min = selectPay.minIncomeAmt==null?100:selectPay.minIncomeAmt;
                let max = selectPay.maxIncomeAmt==null?9999:selectPay.maxIncomeAmt;
                
                if(min<=this.formData.payMoney&&this.formData.payMoney<=max){
                    this.formData.payMoney = parseFloat(this.formData.payMoney);
                    // if(this.formData.payMoney%1!=0){
                    //     this.$Modal.error({
                    //         title:'系统提示',
                    //         content:'充值金额请填写整数'
                    //     })
                    //     return
                    // }
                    if(!this.once){return}
                    this.once=false
                    this.formData.methodId =  selectPay.tripartiteId
                    this.formData.payMode =  this.paydata[this.payIndex].payNo
                    this.loading = true
                    this.payIframeUrl = ""
                    this.payImageUrl = ""
                    this.$http.post('/pay/xyfPay',this.formData).then((data)=>{
                            this.once=true
                            this.loading = false
                        if(data.data.resCode == '10000'){
                            this.payurl = data.data.Payurl
                            this.isQrCode = data.data.isQrCode
                            if(data.data.isQrCode=='1'){
                                $(this.$refs.form1).slideUp(200)
                                $(this.$refs.form2).slideDown(200)
                                // let urlstr = data.data.Payurl.split('?')[1].split('&')[0].split('=')[1]
                                clearInterval(this.timeId)
                                if(data.data.ordNo){this.inteval(data.data.ordNo);}
                                return
                            }
                            if(data.data.isImageUrl){
                                this.payImageUrl = this.payurl
                                $(this.$refs.form1).slideUp(200)
                                $(this.$refs.form2).slideDown(200)
                                return
                            }
                            if(this.payurl.indexOf('</html>')>0||this.payurl.indexOf('</form>')>0){
                                this.payurl=this.payurl.replace("action=",`target='_blank' action=`)
                                $('#pay_blank').css('display','block')
                                $('#pay_blank div').append(this.payurl)
                                $('#pay_blank div form').submit()
                                $(this.$refs.form1).slideUp(200)
                                $(this.$refs.form2).slideDown(200)
                                return
                            }
                            if(this.payurl.indexOf('</html>')>0){
                                $('#saomaImg').append(this.payurl)
                                this.saomaFlag = true
                                return
                            }
                            this.payIframeUrl = this.payurl
                            this.saomaFlag = true
                            
                        }else{
                            this.$Modal.error({
                                title:'系统提示',
                                content:'充值渠道暂时无法使用'
                            })
                        }
                    });
                }else{
                    this.$Modal.error({
                        title:'系统提示',
                        content:'充值金额的范围或格式不正确,请重新填写'
                    })
                }
            },
            inteval(urlstr){
                this.timeId = setInterval(()=>{
                    if(this.timecs>60){
                        clearInterval(this.timeId)
                    }
                    this.selectOrderStatus(urlstr)
                    this.timecs +=1
                },3000)
                
            },
            selectOrderStatus(ord){
                this.$http.get('/pay/selectOrderStatus?ordNo='+ord).then(data=>{
                    if(data.data.code=='10000'){
                        this.$Notice.success({
                            title: '充值成功',
                        });
                        clearInterval(this.timeId)
                        this.$router.push({name:'dealingsRecord',params:{searchType:'2'}})
                    }else{
                        
                    }
                })

            },
            imgError(){
                let url = this.payImageUrl
                this.payImageUrl = ""
                setTimeout(() => {
                this.payImageUrl = url
                }, 2000);
            }
            
        },
        mounted(){

        },
        beforeDestroy(){
            clearInterval(this.timeId)
        }

    }
   
</script>