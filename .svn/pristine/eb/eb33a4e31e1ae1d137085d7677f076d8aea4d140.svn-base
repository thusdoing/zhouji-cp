<style scoped>
@import '../../assets/header.css';
</style>
<template>
    <el-container>
        <div class="header custom-header">
            <wv-flex>
                <wv-flex-item class="custom-left">
                    <div @click="$router.go(-1)" class="brack-icon">
                        <i class="el-icon-arrow-left" slot="icon"></i>
                    </div>
                    <div class="w-20" slot="right"></div>
                </wv-flex-item>
                <wv-flex-item flex="2">
                    <div class="custom-center">
                        {{gameName}}
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right">
                        <span></span>
                    </div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <el-main class="index-main">
            <gridRowItem v-for="(item,index) in openLotteryForGameListData" 
            :key="index" 
            :item="item"
            :title="`第${item.period}期`" 
            :msgTow="item.date"
            :msgDiscount="item.result" @click="to_gameInfo(item.period,item.date,item.result)" ></gridRowItem>
        </el-main>
        <wv-flex style="position: fixed;width: 100%;bottom: 0;background: #000000;opacity: 0.9;">
            <wv-flex-item style="padding: 10px 15px;">
                <wv-button type="default" @click="to_page('/custInfos')" style="width: 100% !important;" :mini="true">查看中奖情况</wv-button>
            </wv-flex-item>
            <wv-flex-item style="padding: 10px 15px;">
                <wv-button type="warn" @click="to_page(`/bet/${gameType}/${gameNo}/${gameName}/officaPlay`)" style="width: 100% !important;" :mini="true">去中奖</wv-button>
            </wv-flex-item>
        </wv-flex>
    </el-container>
</template>
<script>
import gridRowItem from '@/components/extend/gridRowItem';
export default {
    components : {
        gridRowItem
    },
    data () {
        return {
            gameNo : '',
            gameName : '',
            gameType : '',
            openLotteryForGameListData : []
        }
    },
    methods: {
        /** 加载同一类彩种的开奖记录 */
        loadGameOpenLotteryList(){
           this.$api.get('gameOpenNo/getLotteryResultList?gameID=' + this.gameNo).then(data => {
                if(data.list.length > 0){
                    for(let i = 0; i < data.list.length; i++){
                        data.list[i]['result'] = data.list[i]['result'].split(",");
                    }
                }
                this.openLotteryForGameListData = data.list;
           });
        },
        /** 跳转页面 */
        to_page(active){
            this.$router.push({path:active});
        },
        /** 跳转到对应彩种的玩法奖金页面 */
        to_gameInfo(period,date,result){
            // let param = {
            // gameName : this.gameName,
            // result : result,
            // date : date,
            // period : period,
            // gameNo : this.gameNo
            // };
            this.$router.push({path:'/gameOpenLotteryInfo/'+this.gameType + '/'+this.gameNo + '/' + this.gameName +'/' + result + '/' + this.$Date(new Date(date),'yyyy-MM-dd hhmm') + '/'+period});
        }
    },
    mounted() {
        if(this.$route.params.gameNo){
            this.gameNo = this.$route.params.gameNo;
            this.gameName = this.$route.params.gameName;
            this.gameType = this.$route.params.gameType;
            this.loadGameOpenLotteryList();
        }else{
            this.$router.push({name:'openLotteryList'});
        }
    }
}
</script>

