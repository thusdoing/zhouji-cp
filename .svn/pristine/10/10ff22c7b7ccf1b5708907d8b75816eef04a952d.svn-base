<template>
    <div>
        <div style="padding: 10px 10px 0" v-if="!noRecord">
            <record v-for="(item,index) in betRecordData" :item="item" :key="index" @click.native="$router.push({name:'betDetails',params:{item:item}})"></record>
            <div v-if="more" style="line-height: 50px;text-align:  center;background: #fff;"  @click="loadBetRecord">点击加载更多</div>
        <div v-if="!more" style="line-height: 50px;text-align:  center;">没有更多了</div>
        </div>
        <div v-if="noRecord" style="height:100vh;background:#fff;padding:20px;text-align:center;">
            <img src="/static/sleep.png"/>
            <div style="color:#5E5E5E;">您还没有投注的记录哦！</div>
        </div>
    </div>
</template>
<script>
import record from './record.vue'
export default {
    components : {
        record
    },
    data () {
        return {
            more:true,
            noRecord : true,
            betRecordData : [],
            loadBetRecordParam : {
                pageNo : 1,
                pageSize : 20,
                betStatus : '0',
                betType:"0",
                profit:"no"
            }
        }
    },
    methods : {
        loadBetRecord(){
            this.$api.post("game/getBetRecodes",this.loadBetRecordParam).then((data) => {
                if(data.records.length > 0){
                    this.loadBetRecordParam.pageNo+=1;
                    for(let i = 0; i < data.records.length; i++){
                        if(data.records[i].betStatus == '0'){
                            data.records[i]['texts'] = "<span style='color:red'>待开奖</span>";
                        }
                        if(data.records[i].betStatus == '1'){
                            data.records[i]['texts'] = "<span style='color:#454545'>未中奖</span>";
                        }
                        if(data.records[i].betStatus == '2'){
                            data.records[i]['texts'] = "<span style='color:red'>已中奖</span>";
                        }
                        if(data.records[i].betStatus == '3'){
                            data.records[i]['texts'] = "<span style='color:#999'>已撤销</span>";
                        }
                    } 
                    this.noRecord = false;
                    this.betRecordData=this.betRecordData.concat(data.records);
                }
                
                if(data.total>0){
                    this.noRecord=false
                }else{
                    this.noRecord=true
                }
                if(this.betRecordData.length==data.total) {
                    this.more = false
                }
            });
        },
        betAmtFormat(betAmt){
            return "￥" + betAmt.toFixed(2);
        },
        gameNamberFormat(gameNumber,betDate){
            return "第" + gameNumber + "期 " + this.$Date(betDate)
        },

        to_messageContent(item){
            let param = {};
            param["title"] = item.noticeTitle;
            param['content'] = item.noticeContent;
            param['date'] = item.releaseDate;
            this.$router.push({name:'msgContentview',params:param});
        }
    },
    mounted() {
        this.loadBetRecord();
    } 
}
</script>

