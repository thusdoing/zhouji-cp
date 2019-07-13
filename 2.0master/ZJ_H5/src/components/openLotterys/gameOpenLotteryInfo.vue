<style scoped>
@import '../../assets/header.css';
.mains{width:100%;background:#fff;}
.head-info{display:flex;border-bottom:1px solid #eee;background:#fff;align-items:center;padding:7px 15px;}
.head-info img{width:45px;height:45px}
.periods{flex:1;margin-left:5px;font-size:14px;color:#5e5e5e;}
.periods-date{flex:1;text-align:right;padding-right:5px;font-size:11px;color:#9b9b9b;}
.result-info{display:flex;background:#fff;padding:20px;text-align:center;justify-content: center;}
.result-info div{background-color: #e8173d;color: #ffffff;width: 22px;height: 22px;border-radius: 12px;text-align: center;line-height: 22px;font-size: 14px;margin-left:4px;}
.group-main{width:95%;margin:10px auto;}
.group-title{display:flex;background:#eee;padding:5px;} 
.group-title div{flex:1 1 50%;text-align:center;}
.group-item{display:flex;background:#fff;border-bottom:1px solid #eee;padding:5px;}
.group-item div{flex:1 1 50%;text-align:center;}
.group-red{color:#ec2829;}
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
                        {{gameName}}开奖详情
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right">
                        <span></span>
                    </div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <div class="index-main mains">
            <div class="head-info">
                <img :src="$imgPath(imgPath)"></img>
                <div class="periods">第{{period}}期</div>
                <div class="periods-date" >{{date}}</div>
            </div>
            <div class="result-info" >
                <div v-for="(item,index) in result" :key="index" >{{item}}</div>
            </div>
            <div class="group-main" >
                <div class="group-title" >
                    <div>奖项</div>
                    <div>奖金（元）</div>
                </div>
                <div v-for="(item,index) in gameGroupData" :key="index" class="group-item">
                    <div>{{item.groupName}} </div>
                    <div class="group-red">{{(item.bonusAmt==null?0:item.bonusAmt).toFixed(2)}}</div>
                </div>
            </div>
        </div>
        <wv-flex style="position: fixed;width: 100%;bottom: 0;background: #000000;opacity: 0.9;">
            <wv-flex-item style="padding: 10px 15px;">
                <wv-button type="default" @click="to_page('/custInfos')" style="width: 100% !important;" :mini="true">查看中奖情况</wv-button>
            </wv-flex-item>
            <wv-flex-item style="padding: 10px 15px;">
                <wv-button type="warn"  @click="to_page(`/bet/${gameType}/${gameNo}/${gameName}/officaPlay`)" style="width: 100% !important;" :mini="true">去中奖</wv-button>
            </wv-flex-item>
        </wv-flex>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            gameName : '',
            imgPath : '',
            result : [],
            date : '',
            period : '',
            gameNo : '',
            gameType : '',
            gameGroupData : []
        }
    },
    methods: {
        /** 加载彩种玩法的中奖金额 */
        loadGameGroupInfos(){
            this.$api.get('gameGroup/getGameBounsByGameNo?gameNo=' + this.gameNo).then(data => {
                this.gameGroupData = data.gameBouns;
                this.imgPath = data.imagePath;
            });
        },
        /** 跳转页面 */
        to_page(active){
            this.$router.push({path:active});
        },
    },
    
    mounted() {
        if(this.$route.params.gameNo){
            this.gameNo = this.$route.params.gameNo;
            this.gameName = this.$route.params.gameName;
            this.gameType = this.$route.params.gameType;
            this.date = this.$route.params.date;
            this.period = this.$route.params.period;
            this.result = this.$route.params.result.split(",");  
            this.loadGameGroupInfos();
        }else{
            this.$router.push({name:'openLotteryList'});
        }
    }
}
</script>

