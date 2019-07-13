<template>
    <div>
        <div v-if="!noRecord">
            <gridRowItem v-for="(item,index) in allTypeData" :item="item" :key="index" :title="item.changeType" 
            :msgOne="$Date(item.insertDate)" :icon="false" :texts="item.texts" ></gridRowItem>
        </div>
        <div v-if="noRecord" style="height:100vh;background:#fff;padding:20px;text-align:center;">
            <img src="/static/sleep.png"></img>
            <div style="color:#5E5E5E;">您还没有投注的记录哦！</div>
        </div>
    </div>
</template>
<script>
import gridRowItem from '@/components/extend/gridRowItem';
export default {
    components : {
        gridRowItem
    },
    data () {
        return {
            noRecord : false,
            allTypeData : [],
            typelist : {
                '010123':'冲销返水',
                '010127':'追号扣款',
                '010125':'转账充值',
                '010128':'优惠扣除',
                '010129':'其他扣除',
                '010120':'出款扣除',
                '010121':'用户提款',
                '010126':'冲销派奖',
                '010122':'人工提出',
                '010124':'彩票下注',
                '010112':'人工打款',
                '010115':'彩票派奖',
                '010114':'活动优惠',
                '010113':'给予返水',
                '010117':'彩票返水',
                '010118':'系统奖励',
                '010111':'线上支付',
                '010110':'公司入款',
                '010116':'追号返款',
                '010130':'撤单回退投注金额'
            },
            loadAllTypeParam : {
                pageNo : 1,
                pageSize : 20
            }
        }
    },
    methods : {
        loadAllType(){
            const lasts7Days = Date.now() - 1000 * 60 * 60 * 24 * 7;
            const date = new Date(lasts7Days);
            const startDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
            this.$api.post("getAcctChangeRecord", {...this.loadAllTypeParam, startDate}).then((data) => {
                if(data.success){
                    if(data.list.length > 0){
                        for(let i = 0; i < data.list.length; i++){
                            if((data.list[i].addAmt - data.list[i].subAmt)>0){
                                data.list[i]['texts'] = "<span style='color:red;'>"+( (data.list[i].addAmt - data.list[i].subAmt)) + "</span>";
                            }else{
                                data.list[i]['texts'] = "<span style='color:red;'>"+( (data.list[i].addAmt - data.list[i].subAmt)) + "</span>";
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
        this.loadAllType();
    } 
}
</script>

