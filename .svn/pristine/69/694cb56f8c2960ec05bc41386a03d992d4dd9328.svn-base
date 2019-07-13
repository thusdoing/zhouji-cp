<template>
<div>
<div class="fl mb12 _2WJqO" style="width: 840px;">
    <p>追号记录
    </p>
</div>
        <div class="_3wioq fl" style="width: 840px;">
            <ul class="_1KCWQ _2ram0">
                <li class="gPVvn _3qTnq"><span class="_2dqD4">{{formData.date=='today'?"今日":""}}{{formData.date=='yesterday'?"昨天":""}}{{formData.date=='withInSevenDay'?"七天":""}}追投概况 </span></li>
                <li class="gPVvn _3qTnq}"><span class="_2dqD4">投注金额：<span class="_1Niuy">{{map.betAmtTotal||0}}元 </span></span>
                </li>
                <li class="gPVvn _3qTnq}"><span class="_2dqD4">中奖金额：<span class="_1Niuy">{{map.bonusAmtTotal||0}}元 </span></span>
                </li>
                <li class="gPVvn _3qTnq}"><span class="_2dqD4">盈利：<span class="_1Niuy">{{map.profitAmt||0}}元 </span></span>
                </li>
            </ul>
            <ul class="_1KCWQ">
                <li class="gPVvn"><span class="_2dqD4">彩种： </span>
                    <div class="_2P-lK">
                        {{lett==''?'全部游戏':lett}}
                        <select v-model='gameNo' class="_1p-p1">
                            <option value="">全部彩票</option>
                            
                                <option  v-for='sub in gameData' :value="sub.gameNo" :key="sub.gameNo">{{sub.gameName}}</option>
                            
                        </select>
                    </div>
                </li>
                <li class="gPVvn"><span class="_2dqD4">时间： </span><button class="_2eCWc" :class='formData.date=="today"?"_14X1Z":""' @click='selTime("today")' type="button">今天</button><button  class="_2eCWc false" type="button" @click='selTime("yesterday")'  :class='formData.date=="yesterday"?"_14X1Z":""'>昨天</button><button class="_2eCWc false" type="button" @click='selTime("withInSevenDay")' :class='formData.date=="withInSevenDay"?"_14X1Z":""'>七天</button></li>
                <li class="gPVvn"><span class="_2dqD4">类型： </span><button class="_2eCWc" :class="formData.bonusStatus==''?'_14X1Z':''" type="button" @click='selStatus("")'>全部</button><button class="_2eCWc false" :class="formData.bonusStatus=='未开始'?'_14X1Z':''" type="button" @click='selStatus("未开始")'>未开始</button><button class="_2eCWc false" :class="formData.bonusStatus=='进行中'?'_14X1Z':''" type="button" @click='selStatus("进行中")'>进行中</button><button class="_2eCWc false" :class="formData.bonusStatus=='已结束'?'_14X1Z':''" type="button" @click='selStatus("已结束")'>已结束</button></li>
                </ul>
            <table width="100%" cellspacing="0" cellpadding="0">
                <thead class="_3apNX">
                    <tr>
                        <th>流水号</th>
                        <th>彩种</th>
                        <th>起始期号</th>
                        <th>已追/总期数</th>
                        <th>已投/总金额</th>
                        <th>奖金状态</th>
                        <th>追号时间</th>
                        <th>操作项</th>
                    </tr>
                </thead>
                <tbody class="-QUHL">
                    <tr v-if="recordList.length==0">
                        <td class="_32waq" colspan="8">
                            <div v-if="loading" class="_1dJVz">
                                    <div class="absolute center-margin"><img class="_1VUC8" src="/static_pc/images/loading.gif"></div>
                            </div>
                            <article v-if="!loading" class="_1dJVz">
                                <div class="absolute center-margin"><img class="_1VUC8" src="/static_pc/images/ku.png">
                                    <p>暂无记录</p>
                                </div>
                            </article>
                        </td>
                    </tr>

                    <tr v-else v-for="item in recordList" class="_1UhCN">
                        <td>{{item.betBatchNo}}</td>
                        <td style="cursor: pointer;" @click="$router.push(`/bet/${item.gameType}/${item.gameNo}/${$ENV.IS_OFFICIAL?'official':'credit'}`)">{{item.gameName}}</td>
                        <td>{{item.firstGameNumber}}</td>
                        <td>{{item.hasBetCount}}/{{item.totalCount}}</td>
                        <td>{{item.totalAdditionBetAmt}}/{{item.totalAdditionAmt}}</td>
                        <td class="_3UJYU">{{item.totalBonusAmt>0?item.totalBonusAmt:item.bonusStatus}}</td>
                        <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.betDate}"></td>
                        <td class="_2F9OQ" @click="$router.push({name:'SeekOrderDetails',params:{item:item}})">查看</td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
            
                <Page v-if="total>10" @on-change='changPage' style="text-align: right;margin: 10px" :current="formData.pageNo" :total="total" size="small" show-elevator></Page>
            
            </div>
            <div class="Vxtwm EUetQ">
                <p><img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：追号记录最多只保留7天。
                </p>
            </div>
        </div>
</div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                gameData:[],
                formData:{
                    gameNo:'',
                    date:'today',
	                bonusStatus:"",
                    pageNo:1,
                    pageSize:10,
                },
                gameNo:'',
                lett:'',
                date:'today',
                recordList:[],
                total:0,
                loading:false,
                map:{}
            }
        },
        components: { 

        },
        created(){
            this.getGameAll();
            this.getValidAdditionBet();
        },

        watch:{
            gameNo:function(){
                this.formData.gameNo = this.gameNo;
                this.formData.pageNo = 1;
                this.getValidAdditionBet();
                for(let i in this.gameData){
                    
                    if(this.gameData[i].gameNo==this.gameNo){
                        this.lett = this.gameData[i].gameName
                    }
                    
                }
            }
        },
        methods:{
            selTime(date){
                this.formData.date = date;
                this.formData.pageNo = 1;
                this.getValidAdditionBet();
            },
            selStatus(val){
                this.formData.bonusStatus = val;
                this.formData.pageNo = 1;
                this.getValidAdditionBet();
            },
            getValidAdditionBet(){
                this.loading = true;
                this.recordList = [];
                let _this = this;
                this.$http.post('/game/getValidAdditionBet',_this.formData).then(function(data){
                    if(true){
                        if(data.data.list != null && data.data.list != undefined){
                            _this.recordList = data.data.list
                            _this.total = data.data.totalSize
                            _this.map = data.data.map
                        }else{
                            _this.recordList = [];
                            _this.total = 0;
                            _this.map = {}
                        }
                    };
                    _this.loading = false;
                })

            },
            getGameAll(){
                let _this = this;
                axios.get('/getGame',{params:{isOpenNo:'true'}}).then(function(data){
                    if(data.data.success){
                        if(data.data.list != null && data.data.list != undefined){
                            _this.gameData = data.data.list
                        }else{
                            _this.gameData = [];
                        }
                    }
                });
            },
            changPage(page){
                this.formData.pageNo=page;
                this.getValidAdditionBet();
            }

        },
        mounted(){
            
        }    

    }
</script>