<template>
    <div>
        <div v-if="!noRecord">
        <zuitou v-for="(item,index) in betRecordData" :item="item" @click="$router.push({name:'betDetails',params:{item:item}})" :key="index"></zuitou>
            <div v-if="more" style="line-height: 50px;text-align:  center;"  @click="loadBetRecord">点击加载更多</div>
            <div v-if="!more" style="line-height: 50px;text-align:  center;">没有更多了</div>
        </div>
        <div v-if="noRecord" style="height:100vh;background:#fff;padding:20px;text-align:center;">
            <img src="/static/sleep.png"/>
            <div style="color:#5E5E5E;">您还没有中奖的记录哦！</div>
        </div>
    </div>
</template>
<script>
import zuitou from '@/components/extend/zuitou';
export default {
    components : {
        zuitou
    },
    data () {
        return {
            more:true,
            noRecord : true,
            betRecordData : [],
            loadBetRecordParam : {
                "pageNo" : 1,
                "pageSize" : 20,
                bonusStatus:"进行中",
                profit:"no"
            }
        }
    },
    methods : {
        loadBetRecord(){
            this.$api.post("game/getValidAdditionBet",this.loadBetRecordParam).then((data) => {
                if(data.list.length > 0){
                    
                    this.loadBetRecordParam.pageNo +=1
                    for(let i = 0; i < data.list.length; i++){
                        if(data.list[i].totalBonusAmt>0){
                            data.list[i]['texts'] = "<span style='color:red'>"+data.list[i].bonusStatus+' '+data.list[i].totalBonusAmt+"</span>";
                        }else{
                            data.list[i]['texts'] = "<span style='color:red'>"+data.list[i].bonusStatus+"</span>";
                        }
                    }
                    this.betRecordData=this.betRecordData.concat(data.list);
                }
                if(data.totalSize>0){
                    this.noRecord=false
                }else{
                    this.noRecord=true
                }
                if(this.betRecordData.length==data.totalSize) {
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

