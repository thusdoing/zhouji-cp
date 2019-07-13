<style scoped>
@import '../../assets/header.css';
</style>
<template>
    <div>
        <wv-header title="开奖中心" class="header" ></wv-header>
        <el-main class="index-main">
            <gridRowItem v-for="(item,index) in openLotteryListData" 
            :item="item"
            :key="index" 
            :title="item.gameName" 
            :msgOne="`第${item.gameNumber}期`"
            :msgTow="$Date(item.gameOpenDt,'yyyy/MM/dd hh:mm')"
            :imgUrl="item.imgPath"
            :gameType = "item.gameType"
            :msgDiscount="item.msgDiscount" @click="to_gameOpen(item.gameNo,item.gameName,item.gameType)" ></gridRowItem>
        </el-main>
        <wv-tabbar :fixed="true" class="footers">
            <wv-tabbar-item @click="to_page('home')" >
                <i class="iconfont icon-shouye" slot="icon"></i>
                首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')" is-on>
                <i class="iconfont icon-1672jiang" slot="icon"></i>
                开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')">
                <i class="iconfont icon-faxian" slot="icon"></i>
                发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <i class="iconfont icon-lianxikefu" slot="icon"></i>
                客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')">
                <i class="iconfont icon-wode" slot="icon"></i>
                我的
            </wv-tabbar-item>
        </wv-tabbar>
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
            shows:"openLotteryList",
            msgDiscount : ['asdsadsadsad'],
            openLotteryListData : []
        }
    },
    methods: {
        /** 跳转到对应彩种的开奖记录页面 */
        to_gameOpen(gameNo,gameName,gameType){
            this.$router.push({path:'gameOpenLottery/'+ gameType +'/' + gameNo + '/' + gameName});
        },
        /** 加载所有彩种最近一期的开奖号码 */
        loadGameOpenLotteryList(){
           this.$api.get('gameOpenNo/getGameLatestOpenNos',{showCase:true}).then(data => {
               if(data.success){
                   if(data.list.length > 0){
                       for(let i = 0; i < data.list.length; i++){
                           data.list[i]['gameOpenNo'] = data.list[i]['gameOpenNo'].split(",");
                           data.list[i]['msgDiscount'] = this.formatGameOpen(data.list[i]['gameType'],data.list[i]['gameOpenNo'],data.list[i]['gameOpenNoCase']);
                       }
                   }
                   this.openLotteryListData = data.list;
               }
           });
        },

        /** 处理游戏开奖结果 */
        formatGameOpen(gameType, gameOpenNo, gameOpenNoCase){
            // let rst = [];
            // switch (gameType) {
            //     case '11':
            //         // <div class="red-circular" v-for="(item,index) in msgDiscount" :key="index">{{ item }}</div>
            //         if(typeof gameOpenNo == 'array' && gameOpenNo.length > 0){
            //             for(let i = 0; i < gameOpenNo.length; i++){
            //                 rst.push('<div class="red-circular" ></div>');
            //             }
            //         }
            //          if(typeof gameOpenNoCase == 'array' && gameOpenNoCase.length > 0){
            //             for(let i = 0; i < gameOpenNoCase.length; i++){
            //                 rst.push('<div class="red-circular" ></div>');
            //             }
            //         }

            //         break;
            //     case '22':
                    
            //         break;
            
            //     default:
            //         break;
            // }
            // return rst.join('');

            return gameOpenNo.concat(gameOpenNoCase);

        },

        /** 跳转页面 */
        to_page(active){
            this.$router.push({name:active});
        }
    },
    mounted() {
        this.loadGameOpenLotteryList();
    }
}
</script>

