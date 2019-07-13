<template>
    <div>
        <div v-if="!noRecord">
            <gridRowItem v-for="(item,index) in gameWinData" :item="item" :key="index" :title="item.gameName" 
            :msgOne="`第${item.gameNumber}期`" :msgDiscount="item.custName" :icon="false" :texts="item.texts" ></gridRowItem>
        </div>
        <div v-if="noRecord" style="height:100vh;background:#fff;padding:20px;text-align:center;">
            <img src="/static/sleep.png"></img>
            <div style="color:#5E5E5E;">还没有中奖的记录哦！</div>
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
            gameWinData : []
        
            
        }
    },
    methods : {
        loadgameWinList(){
            // let date = this.$Date(new Date(),'yyyy/MM/dd');
            // date = date + ' 00:00:01';

            this.$api.post("game/getGameWinners").then((data) => {
                if(data.success){
                    if(data.list.length > 0){
                        for(let i = 0; i < data.list.length; i++){
                            // if(data.list[i].amountType == '010901'){
                                data.list[i]['texts'] = "<span style='color:#5E5E5E;right: 10px;margin-top: -18px;position: absolute;'>+"+ data.list[i].bonusAmt.toFixed(2)  +"</span>";
                            // }
                        }
                        this.noRecord = false;
                        this.gameWinData = data.list;
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
        this.loadgameWinList();
    } 
}
</script>

