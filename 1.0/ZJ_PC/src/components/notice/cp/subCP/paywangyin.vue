<template>
        <div class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-39" aria-labelledby="react-tabs-38">
            <div v-if="paydata.length!=0" class="_3JgUR">
                <form>
                    <input type="hidden" name="way" value="">
    
                    <div v-if="paydata[bankIndex]" class="_29oRb mb10">
                        <!-- <div class="_2w01D" style="width: 80px;border-radius: 20px">快捷支付</div><span style="color: #f46e00">支持网银转账，ATM转账，银行柜台汇款</span> -->
                        
                        <div class="_3Lpio" style="position: relative;">
                            <!-- <img id="imgewm" v-if="getData[bankIndex].qrCodeImg" :src="getData[bankIndex].qrCodeImg"> -->
                            <label class="v-mid U87la">支付方式 : </label>
                            <div class="_19tvw _39aPw before-vertical">
    
                                <div v-for="(item,index) in paydata" class="dib v-mid QuSiB">
                                    <input type="radio" :checked="index==bankIndex" name="bankID" :id="index" class="_1iDCE">
                                    <label @click="selebankIndex(index)" class="U87la before-vertical relative" :for="index">
                                        <div class="_2eZWe" style="background-image: url('/static_pc/images/yuan.svg');"></div>
                                        <img v-for="(sub, index) in item.quickMode.split(',')" :key="index+'sub'" width="22" class="v-mid mr2" :src="'/static_pc/pay/'+sub+'.png'">
                                        <span class="v-mid overflow-hidden mr8"></span>
                                        <img width="17" class="jCyGm absolute bottom-0 right-0" src="/static_pc/images/gou.svg">
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    
                    <div class="_29oRb">
                        <!-- <div class="_2w01D">！</div> -->
                        <div class="Vxtwm jRinb"  v-html="paydata[bankIndex].quickRemark">
                        </div>
                        <table v-if="paydata[bankIndex]" class="mt12 _2KMyk">
                            <tbody>
                                <!-- <tr>
                                    <td width="120" style="text-align: right;padding-right: 20px;line-height: 44px">充值银行 : </td>
                                    <td id="Payee" width="150" class="_3xEkI">{{paydata[bankIndex].sysBankName}}</td>
                                    <td class="_2_V64" v-clipboard:copy="paydata[bankIndex].userName" v-clipboard:success="fuzhi" v-clipboard:error="shibai">复制</td>
                                </tr> -->
                                <tr>
                                    <td width="120" style="text-align: right;padding-right: 20px;line-height: 44px">收款账户名 : </td>
                                    <td id="Payee" width="150" class="_3xEkI">{{paydata[bankIndex].userName}}</td>
                                    <td class="_2_V64" v-clipboard:copy="paydata[bankIndex].userName" v-clipboard:success="fuzhi" v-clipboard:error="shibai">复制</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;padding-right: 20px;line-height: 44px">收款账号 : </td>
                                    <td id="BankAccount" class="_3xEkI">{{paydata[bankIndex].userAcct}}</td>
                                    <td class="_2_V64" v-clipboard:copy="paydata[bankIndex].userAcct" v-clipboard:success="fuzhi" v-clipboard:error="shibai">复制</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;padding-right: 20px;line-height: 44px">二维码 : </td>
                                    <td id="Branch" class="_3xEkI"><img style="width: 200px;" :src="$imgPath(paydata[bankIndex].qrCodeImg)"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;padding-right: 20px;line-height: 44px">充值金额 : </td>
                                    <td id="Branch" class="_3xEkI"><input placeholder="请输入充值金额" type="number" class="_1iDCE s1cJ-" name="amount" v-model='formData.payMoney'></td>
                                    <td>单笔最低 <span style="color: #e4393c">{{paydata[bankIndex].minAmt==null?100:paydata[bankIndex].minAmt}}</span> 元，最高 <span style="color: #e4393c">{{paydata[bankIndex].maxAmt==null?10000:paydata[bankIndex].maxAmt}}</span>元</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;padding-right: 20px;line-height: 44px">充值帐号 : </td>
                                    <td id="Branch" class="_3xEkI"><input type="text" class="_1iDCE s1cJ-" name="bankCardName" placeholder="请输入你的充值账号" v-model='formData.custName'></td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <div class="_3Lpio mb60">
                            <label class="v-mid U87la fw5" style="letter-spacing: 1.6px;">充值金额 : </label>
                            <div class="_19tvw mr20">
                                <div class="dib relative">
                                    <input placeholder="请输入充值金额" type="number" class="_1iDCE s1cJ-" name="amount" v-model='formData.payMoney1'>
                                    <div class="_187JT"></div>
                                </div>
                            </div>
                            <label class="v-mid U87la fw5" style="letter-spacing: 1.6px;">存款人姓名 : </label>
                            <div class="_19tvw">
                                <div class="dib relative">
                                    <input type="text" class="_1iDCE s1cJ-" name="bankCardName" placeholder="请正确填写您的名字" v-model='formData.bankName'>
                                    <div class="_187JT"></div>
                                </div>
                            </div>
                        </div> -->
                        <div class="w-100">
                            <button style="margin-top: 30px;margin-left: 120px" class="_1sc4M _173W8 mb30" @click="toOnlinePay" type="button">提交充值订单</button>
                        </div>
                    </div>
                </form>
            </div>
            <h1 v-else style="font-size: 24px;text-align: center;margin: 30px 0">暂时无法使用该通道充值</h1>
        </div>
    </template>
    <script>
            import axios from 'axios'
            export default {
                props:{paydata:{type:Array,default:()=>{return []}}},
                data() {
                    return {
                        getData:[],
                        arr:null,
                        flag : true,
                        url:'http://www.lm699.com',
                        current:null,
                        content:null,
                        formData:{
                            methodId:'',
                            payType:'2',
                            custName:'',
                            payMoney:'',
                            payMode:''
                        },
                        bankIndex:0,
                        once:true,
                    }
                },
                components: { 
        
                },
                created(){
                    
                },
                watch:{
                },
                methods:{
                    getSysBank(){
                        axios.get('/getSysBank').then((data)=>{
                            if(data.data.code=="10001"||data.data.success){
                                if(data.data.list.length == 0){
                                    this.$Modal.error({
                                        title:'系统提示',
                                        content:data.data.msg
                                    })
                                    // this.$router.push('/notice')
                                };
                                if(data.data.list != null && data.data.list != undefined){
                                    this.paydata = data.data.list
                                    this.formData.bankId = data.data.list[0].bankId
                                    
                                }
                            }
                        });
                    },
                    selebankIndex(index){
                        this.formData.methodId = this.paydata[index].bankId;
                        this.bankIndex = index
                    },
                    toOnlinePay(){
                        let min = this.paydata[this.bankIndex].minAmt==null?100:this.paydata[this.bankIndex].minAmt;
                        let max = this.paydata[this.bankIndex].maxAmt==null?9999:this.paydata[this.bankIndex].maxAmt;
                        if(this.formData.custName.length==0){
                            this.$Modal.error({
                                title:'系统提示',
                                content:'名字填写错误,请正确填写您的名字'
                            });
                            return
                        }
                        
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
                            this.formData.methodId = this.paydata[this.bankIndex].quickId
                            this.formData.payMode = this.paydata[this.bankIndex].quickMode
                            axios.post('/pay/toPay',this.formData).then((data)=>{
                                    this.once=true
                                if(data.data.success){
                                    this.$Modal.success({
                                        title:'系统提示',
                                        content:data.data.msg
                                    })
                                    this.$router.push({name:'dealingsRecord',params:{searchType:'2'}})
                                }else{
                                    this.$Modal.error({
                                        title:'系统提示',
                                        content:data.data.msg
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
                    fuzhi(){
                        this.$Message.success('复制成功');
                    },
                    shibai(){
                        this.$Message.error('复制失败');
                    }
                    
                },
                mounted(){
                    
                }    
        
            }
        </script>
        <style>
        #imgewm{
            position: absolute;
            width: 100px;
            height: 100px;
            bottom: -10px;
            left: 350px;
            background: #000;
            /* border: 1px solid red */
            
        }
        </style>
        