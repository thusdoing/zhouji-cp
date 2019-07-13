<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>我要充值
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <div class="react-tabs" data-tabs="true">
                <ul class="react-tabs__tab-list" role="tablist">
                    <li @click="gopay('0','sysBankInfo')" class="react-tabs__tab" :class="payindex=='0'?'react-tabs__tab--selected':''" role="tab" id="react-tabs-38" aria-selected="true"
                        aria-disabled="false" aria-controls="react-tabs-39" tabindex="0">线下转账</li>
                    <li @click="gopay('1','thirdPlatformInfo')" class="react-tabs__tab  "  :class="payindex=='1'?'react-tabs__tab--selected':''" role="tab" id="react-tabs-40" aria-selected="false" aria-disabled="false" aria-controls="react-tabs-41">在线支付</li>
                    <li @click="gopay('2','quickPayInfo')" class="react-tabs__tab  " :class="payindex=='2'?'react-tabs__tab--selected':''" role="tab" id="react-tabs-40" aria-selected="false" aria-disabled="false" aria-controls="react-tabs-41">快捷支付</li>
                </ul>
                <div>
                    <component :is="paytype" :paydata="PayMethod[paytype]"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sysBankInfo from './subCP/paybank.vue'
import thirdPlatformInfo from './subCP/payonline.vue'
import quickPayInfo from './subCP/paywangyin.vue'


    import axios from 'axios'
    export default {
        components:{sysBankInfo,quickPayInfo,thirdPlatformInfo},
        data() {
            return {
                getData: [],
                arr: null,
                flag: true,
                url: 'http://www.lm699.com',
                current: null,
                content: null,
                formData: {
                    bankId: '',
                    bankName: '',
                    payMoney: '',
                    payMoney1: '',
                    bankType: '网银'
                },
                bankIndex: 0,
                paytype:"sysBankInfo",
                payindex:"0",
                PayMethod:{}
            }
        },
        created() {
            this.getSysPayMethod();
        },
        watch: {

        },
        methods: {
            gopay(index,pay){
                this.payindex = index
                this.paytype = pay
            },
            getSysPayMethod() {
                axios.get('/pay/getSysPayMethod',{params:{f:0}}).then((data) => {
                    if (data.data.success) {
                        // let payData = data.data.map.thirdPlatformInfo
                        // if(data.data.map&&payData&&payData.length>0){
                        //     for(let index=0;index<payData.length;index++){
                        //         let el = payData[index]
                        //         let tempArr=el.payType.split(',')
                        //         if(tempArr.length>1){
                        //             let cloneObj = JSON.parse(JSON.stringify(el));
                        //             payData.splice(index,1)
                        //             tempArr.forEach(sel=>{
                        //                 let cloneObjsm = JSON.parse(JSON.stringify(cloneObj));
                        //                 cloneObjsm.payType = sel
                        //                 payData.splice(index,0,cloneObjsm)
                        //             })
                        //         }
                        //     }

                        //     console.log(payData)
                        //     for(let i=payData.length-1;i>=0;i--){
                        //         if(!payData[i].payType){
                        //             payData.splice(i,1)
                        //         }
                        //     }
                        // }
                        this.PayMethod = data.data.map||{}
                    }
                });
            },
            selebankIndex(index) {
                this.formData.bankId = this.getData[index].bankId;
                this.bankIndex = index
            },
            toOnlinePay() {
                let min = this.getData[this.bankIndex].minAmt == null ? 100 : this.getData[this.bankIndex].minAmt;
                let max = this.getData[this.bankIndex].maxAmt == null ? 9999 : this.getData[this.bankIndex].maxAmt;
                if (!/[\u4E00-\u9FA5\uF900-\uFA2D]{2,}/.test(this.formData.bankName)) {
                    this.$Modal.error({
                        title: '系统提示',
                        content: '名字填写错误,请重新填写'
                    });
                    return
                }
                if (min <= this.formData.payMoney1 && this.formData.payMoney1 <= max) {
                    this.formData.payMoney = parseFloat(this.formData.payMoney1);
                    axios.post('/pay/toOnlinePay', this.formData).then((data) => {
                        if (data.data.success) {
                            this.$Modal.success({
                                title: '系统提示',
                                content: data.data.msg
                            })
                        } else {
                            this.$Modal.error({
                                title: '系统提示',
                                content: data.data.msg
                            })
                        }
                    });
                } else {
                    this.$Modal.error({
                        title: '系统提示',
                        content: '充值金额的范围或格式不正确,请重新填写'
                    })
                }
            }


        },
        mounted() {
        }

    }
</script>