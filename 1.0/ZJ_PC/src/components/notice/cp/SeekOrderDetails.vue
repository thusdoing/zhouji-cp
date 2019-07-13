<template>
<div>
<div class="fl mb12 _2WJqO" style="width: 840px;">
    <p>追号详情
    </p>
</div>
        <div  class="_3wioq fl" style="width: 840px;">
            <div>
                <div class="_227Ca" style="border-bottom: 1px solid rgb(227, 227, 227);">
                    <p class="_3iK1X" style="cursor: pointer;color: #e4393c;" @click="$router.push(`/bet/${item.gameType}/${item.gameNo}/${$ENV.IS_OFFICIAL?'official':'credit'}`)">{{item.gameName}}</p>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>起始期号：{{item.firstGameNumber}} </td>
                                <td>追号时间：{{item.betDate}}</td>
                                <td>追号方案金额：¥{{item.totalAdditionAmt}}元</td>
                            </tr>
                            <tr>
                                <td>进度：<span class="VFCvz">已追{{item.hasBetCount}}期/总{{item.totalCount}}期 </span></td>
                                <td>已追号金额：¥{{item.totalAdditionBetAmt}}元 </td>
                                <td style="min-width: 300px;">追号编号：<span id="copyTarget">{{item.betBatchNo}}</span><span class="ml10 pointer"></span></td>
                            </tr>
                            <tr>
                                <td>终止追号条件：{{item.additionIfStopAfterWin=='0'?'不停止':'中奖后立即停止'}}</td>
                                <td>已获奖金：<span class="VFCvz">¥{{item.totalBonusAmt}}元</span></td>
                                <td><span v-if="item.bonusStatus!='已结束'&&item.bonusStatus!='已终止'&&item.bonusStatus!='已撤单'" class="_1hzn8" @click="revokeBet(item.betBatchNo)">撤单</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="lICJ6 row" v-if="groupInfo[0]">
                    <div class="_3Jc1g">追号方案</div>
                    <div class="nVNNP">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr class="YFs5X">
                                    <td width="30%">玩法</td>
                                    <td>投注内容</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #ddd;line-height: 30px;" class="_1cwaD" v-for="item in groupInfo" :key="item.betContent">
                                    <td>{{item.groupName}}</td>
                                    <td :title="item.betContent">{{item.betContent|betshowcontent}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>期号</th>
                            <th>追号倍数</th>
                            <th>投注金额</th>
                            <th>当期开奖号码</th>
                            <th>状态</th>
                            <th>奖金</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr v-for="item in betDetail" class="_1UhCN">
                            <td>{{item.gameNumber}}</td>
                            <td>{{item.additionBetMultiple}}</td>
                            <td>{{item.additionBetAmt}}</td>
                            <td>{{item.gameOpenNo}}</td>
                            <td>{{item.betStatus}}</td>
                            <td>{{item.bonusAmt}}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="_2miUk fl">共<span class="_3nXX2">{{betDetail.length}}</span>条记录</p>
            </div>
        </div>
</div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                item:{},
                betDetail:[],
                groupInfo:[]
            }
        },
        components: { 

        },
        created(){
            if(!this.$route.params.item){
                this.$router.push('/seekOrder')
                return
            }
            this.item = this.$route.params.item;
            this.getValidAdditionBetDetail();
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
            
        },
        methods:{
            
            getValidAdditionBetDetail(){
                let _this = this;
                this.$http.get('/game/getValidAdditionBetDetail',{params:{betBatchNo:this.item.betBatchNo}}).then((data)=>{
                    if(data.data.code=='10000'){
                        if(data.data.betDetail != null && data.data.betDetail != undefined){
                            _this.betDetail = data.data.betDetail;
                            _this.groupInfo = data.data.groupInfo;
                        }else{
                            _this.betDetail = [];
                            _this.groupInfo =[]
                        }
                    }
                })
            },
            async revokeBet(betBatchNo){
                // this.$http.post('/game/revokeBet',{betNo:betBatchNo,betType:"1"}).then((data)=>{
                //     if(data.data.success){
                //         this.$Modal.success({
                //             title:'系统提示',
                //             content:data.data.msg
                //         });
                //         this.item.bonusStatus = '已结束'
                //         this.getValidAdditionBetDetail();
                //         this.getMsg();
                //     }else{
                //         this.$Modal.error({
                //             title:'系统提示',
                //             content:data.data.msg
                //         })
                //     }
                // })

                const res = await this.$tools.fetch('/game/revokeBet').setCrypto(true).json().post({betNo:betBatchNo,betType:"1"});
                if(res.success){
                    this.$Modal.success({
                        title:'系统提示',
                        content:res.message||res.msg
                    });
                    this.item.bonusStatus = '已结束'
                    this.getValidAdditionBetDetail();
                    this.getMsg();
                }else{
                    this.$Modal.error({
                        title:'系统提示',
                        content:res.message||res.msg
                    })
                }
            },
             getMsg(){
                let _this = this;
                axios({
                    method: 'get',
                    url: '/getMsg',
                    params:{msgStatus:'1'},
                }).then(function(data){
                    if(data.data.success){
                        _this.$store.commit('setmsg',data.data.totalSize)
                    }
                });
            },
        },
        mounted(){
            
        }    

    }
</script>