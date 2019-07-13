<template>
    <div>
        <div v-if="!noRecord">
            <gridRowItem v-for="(item,index) in allTypeData" :item="item" :key="index" :title="operationModes[item.rechargeChannel]"
            :msgOne="$Date(item.insertDate)" :msgDiscount="item.notemk||' '" :icon="false" :texts="item.texts" ></gridRowItem>
        </div>
        <div v-if="noRecord" style="height:100vh;background:#fff;padding:20px;text-align:center;">
            <img src="/static/sleep.png"/>
            <div style="color:#5E5E5E;">您还没有充值的记录哦！</div>
        </div>
    </div>
</template>
<script>
import gridRowItem from '@/components/extend/gridRowItem';
import { dateFormat } from 'vux'
export default {
    components : {
        gridRowItem
    },
    data () {
        return {
            noRecord : false,
            rechargeStatusObj : {
                '010604':'线上申请中',
                '010602':'成功',
                '010603':'失败',
                '010601':'申请中'
            },
            operationModes:{
                '010201':'公司存款','010202':'在线支付','010203':'人工存款','010204':'快捷支付'
            },
            allTypeData : []


        }
    },
    methods : {
        loadRechargeRecordList(){
            // let date = this.$Date(new Date(),'yyyy/MM/dd');
            // date = date + ' 00:00:01';

            const lasts7Days = Date.now() - 1000 * 60 * 60 * 24 * 7;
            const date = new Date(lasts7Days);
            const startDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();


            this.$api.post("getAcctRechargeRecode",{startDate,"rechargeChannel":"MSALI"}).then((data) => {
                if(data.success){
                    if(data.list.length > 0){
                        for(let i = 0; i < data.list.length; i++){
                            if(data.list[i].rechargeStatus == '010602'){
                                data.list[i]['texts'] = "<span style='color:red;'>"+ this.rechargeStatusObj[data.list[i].rechargeStatus] +"</span>";
                                data.list[i].notemk = '充值：'+data.list[i].rechargeAmt.toFixed(2)+'，到账：'+data.list[i].actuallyAmt.toFixed(2)
                            }else if(data.list[i].rechargeStatus == '010603'){
                                data.list[i]['texts'] = "<span style='color:red;'>"+ data.list[i].rechargeAmt.toFixed(2) +" "+ this.rechargeStatusObj[data.list[i].rechargeStatus] +"</span>";
                            }else{
                                data.list[i]['texts'] = "<span style='color:#5E5E5E;'>"+ data.list[i].rechargeAmt.toFixed(2) +" "+ this.rechargeStatusObj[data.list[i].rechargeStatus] +"</span>";
                            }

                            if (!data.list[i].notemk && data.list[i].rechargeRemark) {
                              data.list[i]['notemk'] = `${data.list[i].rechargeRemark}`;
                            }
                        }
                        this.noRecord = false;
                        this.allTypeData = data.list;
                    }else{
                        this.noRecord = true;
                    }
                }else{
                     this.$dialog({title: '提示信息',message: data.msg,skin: 'ios'});
                }
            });
        }
    },
    mounted() {
        this.loadRechargeRecordList();
    }
}
</script>

