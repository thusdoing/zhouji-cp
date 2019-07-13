<style lang='less'>
    .ivu-page-item-active{
        background-color:#c60a0a
    }
</style>
<template>
<div>
<div class="fl mb12 _2WJqO" style="width: 840px;">
    <p>投注记录
    </p>
</div>
        <div class="_3wioq fl" style="width: 840px;">
            <ul class="react-tabs__tab-list" role="tablist">
                <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==1}" @click="tab=1">彩票记录
                </li>
                <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==2}" @click="tab=2;changPage2(1)">棋牌记录
                </li>
            </ul>
            <div v-if="tab==1">
                <ul class="_1KCWQ _2ram0" style="background: #fff">
                    <li class="gPVvn _3qTnq"><span class="_2dqD4">{{date=='today'?"今日":""}}{{date=='yestoday'?"昨天":""}}{{date=='seven'?"七天":""}}投注概况 </span></li>
                    <li class="gPVvn _3qTnq}"><span class="_2dqD4">投注金额：<span class="_1Niuy">{{condition&&condition.betAmtTotal||0}}元 </span></span>
                    </li>
                    <li class="gPVvn _3qTnq}"><span class="_2dqD4">中奖金额：<span class="_1Niuy">{{condition&&condition.bonusAmtTotal||0}}元 </span></span>
                    </li>
                    <li class="gPVvn _3qTnq}"><span class="_2dqD4">盈利：<span class="_1Niuy">{{condition&&condition.profitAmt||0}}元 </span></span>
                    </li>
                </ul>
                <ul class="_1KCWQ">
                    <li class="gPVvn"><span class="_2dqD4">彩种： </span>
                        <div class="_2P-lK">
                            {{lett==''?'全部游戏':lett}}
                            <select v-model='gameNo' class="_1p-p1">
                                <option value="">全部游戏</option>
                                
                                    <option  v-for='sub in gameData' :value="sub.gameNo">{{sub.gameName}}</option>
                                
                            </select>
    
                        </div>
                    </li>
                    <li class="gPVvn"><span class="_2dqD4">时间： </span><button class="_2eCWc" :class='date=="today"?"_14X1Z":""' @click='selTime("today")' type="button">今天</button><button  class="_2eCWc false" type="button" @click='selTime("yestoday")'  :class='date=="yestoday"?"_14X1Z":""'>昨天</button><button class="_2eCWc false" type="button" @click='selTime("seven")' :class='date=="seven"?"_14X1Z":""'>七天</button></li>
                    <li class="gPVvn"><span class="_2dqD4">类型： </span><button class="_2eCWc" :class="formData.betStatus==''?'_14X1Z':''" type="button" @click='selStatus("")'>全部</button><button class="_2eCWc false" :class="formData.betStatus=='2'?'_14X1Z':''" type="button" @click='selStatus("2")'>已中奖</button><button class="_2eCWc false" :class="formData.betStatus=='1'?'_14X1Z':''" type="button" @click='selStatus("1")'>未中奖</button><button class="_2eCWc false" :class="formData.betStatus=='0'?'_14X1Z':''" type="button" @click='selStatus("0")'>等待开奖</button></li>
                </ul>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>彩种</th>
                            <th>期号</th>
                            <th>投注内容</th>
                            <th>投注金额</th>
                            <th>开奖号码</th>
                            <th>奖金状态</th>
                            <th>投注时间</th>
                            <th>操作项</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr v-if='recordList.length==0'>
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
                        <tr v-else v-for='item in recordList'>
                            <td class="_35NCS" style="cursor: pointer;" @click="$router.push(`/bet/${item.gameType}/${item.gameNo}/${$ENV.IS_OFFICIAL?'official':'credit'}`)">{{item.gameName+'>'+item.groupClassConName+'>'+item.groupName}}</td>
                            <td>{{item.gameNumber}}</td>
                            <td><Tooltip :content="item.betContent|betshowcontent" placement="top"><p :title="item.betContent" class="_1574P ellipsis">{{item.betContent|betshowcontent}}</p></Tooltip></td>
                            <td>{{item.betAmt}}</td>
                            <td>{{item.gameOpenNo}}</td>
                            <td><span style="color:#e4393c">{{item.betStatus=="2"?item.bonusAmt:''}}</span>{{item.betStatus=="0"?"等待开奖":''}}{{item.betStatus=="1"?"未中奖":''}}{{item.betStatus=="3"?"撤销":''}}</td>
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.betDate}"></td>
                            <td class="_9TAbw" @click="$router.push({name:'transactionDetails',params:{item:item}})">查看</td>
                        </tr>
                    </tbody>
                </table>
                <div class="cf">
                    <Page v-if="total>10"  @on-change='changPage' style="text-align: right;margin: 10px" :current="formData.pageNo" :total="total" size="small" show-elevator></Page>
                </div>
                <div class="Vxtwm _1Hs7s">
                    <p><img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：投注记录最多只保留7天。
                    </p>
                </div>
            </div>
            <div v-if="tab==2">
                <ul class="_1KCWQ" style="display: block;background: #fff;">
                    <li class="gPVvn" style="padding-left: 16px;"><span class="_2dqD4">时间： </span><button class="_2eCWc" :class='date=="today"?"_14X1Z":""' @click='selTime("today","qp")' type="button">今天</button><button  class="_2eCWc false" type="button" @click='selTime("yestoday","qp")'  :class='date=="yestoday"?"_14X1Z":""'>昨天</button><button class="_2eCWc false" type="button" @click='selTime("seven","qp")' :class='date=="seven"?"_14X1Z":""'>七天</button></li>
                </ul>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>平台</th>
                            <!-- <th>局号</th> -->
                            <th>游戏名称</th>
                            <th>总投注</th>
                            <th>有效投注</th>
                            <th>输赢金额</th>
                            <!-- <th>投注内容</th> -->
                            <th>投注时间</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr v-if='qprecordList.length==0'>
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
                        <tr v-else v-for='item in qprecordList'>
                            <td class="_35NCS" style="cursor: pointer;">{{item.plateName}}</td>
                            <td>{{item.gameName}}</td>
                            <!-- <td><Tooltip :content="item.betContent|betshowcontent" placement="top"><p :title="item.betContent" class="_1574P ellipsis">{{item.betContent|betshowcontent}}</p></Tooltip></td> -->
                            <td>{{item.allBet}}</td>
                            <td>{{item.cellScore}}</td>
                            <td>{{item.profit}}</td>
                            <!-- <td><span style="color:#e4393c">{{item.betStatus=="2"?item.bonusAmt:''}}</span>{{item.betStatus=="0"?"等待开奖":''}}{{item.betStatus=="1"?"未中奖":''}}{{item.betStatus=="3"?"撤销":''}}</td> -->
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.gameStartTime}"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="cf">
                    <Page v-if="totalSize>10"  @on-change='changPage2' style="text-align: right;margin: 10px" :current="qpForm.pageNo" :total="totalSize" size="small" show-elevator></Page>
                </div>
                <div class="Vxtwm _1Hs7s">
                    <p><img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：投注记录最多只保留7天。
                    </p>
                </div>
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
                    betType:'0',
                    gameNo:'',
                    betDateStart:"",
                    betDateEnd:"",
                    betStatus:"",
                    pageNo:1,
                    pageSize:10,
                },
                total:0,
                recordList:[],
                arr:null,
                flag : true,
                url:'http://www.lm699.com',
                current:null,
                content:null,
                lett:'',
                gameNo:'',
                date:'today',
                condition:{},
                loading:false,
                tab:1,
                qpForm:{
                    pageNo:1,
                    pageSize:10,
                    startDate:''
                },
                qprecordList:[],
                totalSize:0
            }
        },
        computed: { 
            bonusAmt:function(){
                let Amt = 0
                Amt = (this.condition.profitAmt - this.condition.betAmtTotal).toFixed(2)
                return Amt
            },
        },
        created(){
            let todaytime =  new Date();
            this.formData.betDateStart = todaytime.getFullYear()+"/"+(todaytime.getMonth()+1)+"/"+todaytime.getDate();
            this.qpForm.startDate = this.formData.betDateStart
            this.getGameAll()
            this.getBetRecodes()
        },
        filters:{
            betshowcontent:function(data){
                return data.split("").map(
                    (el)=>{switch(el) {
                    case 'a': return '大';
                    case 'b': return '小';
                    case 'c': return '单';
                    case 'd': return '双';
                    default: return el;
                }}).join("")
            }
        },
        watch:{
            
            gameNo:function(){
                this.formData.gameNo = this.gameNo;
                this.formData.pageNo = 1
                this.getBetRecodes();
                for(let i in this.gameData){
                    
                    if(this.gameData[i].gameNo==this.gameNo){
                        this.lett = this.gameData[i].gameName
                    }
                    
                }
            }
        },
        methods:{
            selTime(date, qp){
                this.date = date;
                if(date=='today'){
                    this.formData.betDateStart='';
                    let todaytime =  new Date();
                    this.formData.betDateStart = todaytime.getFullYear()+"/"+(todaytime.getMonth()+1)+"/"+todaytime.getDate();
                    this.qpForm.startDate = this.formData.betDateStart
                    this.formData.betDateEnd = ""
                    this.formData.pageNo = 1
                    if(!qp) return this.getBetRecodes();
                    this.getQPRecords()
                }
                if(date=='yestoday'){
                    this.formData.betDateStart='';
                    let time = new Date().getTime()-1000*60*60*24;
                    let todaytime =  new Date(time);
                    let tod = new Date();
                    this.formData.betDateStart = todaytime.getFullYear()+"/"+(todaytime.getMonth()+1)+"/"+(todaytime.getDate());
                    this.formData.betDateEnd = tod.getFullYear()+"/"+(tod.getMonth()+1)+"/"+(tod.getDate());
                    this.qpForm.startDate = this.formData.betDateStart
                    this.formData.pageNo = 1
                    if(!qp) return this.getBetRecodes();
                    this.getQPRecords()
                }
                if(date=='seven'){
                    this.formData.betDateStart='';
	                let time = new Date().getTime()-1000*60*60*24*6;
                    let todaytime =  new Date(time);
                    this.formData.betDateStart = todaytime.getFullYear()+"/"+(todaytime.getMonth()+1)+"/"+(todaytime.getDate());
                    this.qpForm.startDate = this.formData.betDateStart
                    this.formData.betDateEnd = ""
                    this.formData.pageNo = 1
                    if(!qp) return this.getBetRecodes();
                    this.getQPRecords()
                }
            },
            selStatus(statu){
                this.formData.betStatus = statu;
                    this.formData.pageNo = 1
                this.getBetRecodes();
            },
            getGameAll(){
                let _this = this;
                axios.get('/getGame').then(function(data){
                    if(data.data.success){
                        if(data.data.list != null && data.data.list != undefined){
                            _this.gameData = data.data.list
                        }else{
                            _this.gameData = [];
                        }
                    }
                });
            },
            getBetRecodes(){
                this.loading = true;
                this.recordList = [];
                let _this = this;
                axios.post('/game/getBetRecodes',_this.formData).then(function(data){
                    if(true){
                        if(data.data.records != null && data.data.records != undefined && data.data.records.length>0){
                            _this.recordList = data.data.records;
                            _this.total = data.data.total;
                            _this.condition = data.data.condition;
                        }else{
                            _this.recordList = [];
                            _this.total = 0;
                            _this.condition = {}
                        }
                    };
                    _this.loading = false
                });

            },
            getQPRecords(){
                axios.get('/api/chess/getRecords',{params: this.qpForm}).then(res=>{
                    if(res.data.success){
                        this.qprecordList = res.data.list
                        this.totalSize = res.data.totalSize
                    }
                    
                })
            },
            changPage(page){
                this.formData.pageNo=page;
                this.getBetRecodes();
            },
            changPage2(page){
                this.qpForm.pageNo=page;
                this.getQPRecords();
            }

        },
        mounted(){
        }    

    }
</script>