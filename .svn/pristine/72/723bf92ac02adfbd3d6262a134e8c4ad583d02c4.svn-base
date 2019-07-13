<template>
<div>
<div class="fl mb12 _2WJqO" style="width: 840px;">
    <p>投注详情
    </p>
</div>
        <div class="_3wioq fl" style="width: 840px;">
            <div>
                <div class="_227Ca">
                    <p class="_3iK1X" style="cursor: pointer;color: #e4393c;" @click="$router.push(`/bet/${item.gameType}/${item.gameNo}/${$ENV.IS_OFFICIAL?'official':'credit'}`)">{{item.gameName}}</p>
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>期号 ： {{item.gameNumber}}</td>
                                <td>投注时间 ： <span v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.betDate}"></span></td>
                                <td>开奖号码：</td>
                            </tr>
                            <tr>
                                <td>投注总金额 ：
                                    <span class="VFCvz">¥<span>{{item.betAmt}}</span>元</span></td>
                                <td>总奖金 ：
                                    <span class="VFCvz">¥{{item.bonusAmt==null?'0.00':item.bonusAmt}}元</span></td>
                                <td v-if="item.betStatus=='0'"><span class="_23EI6" @click='revokeBet(item.betNo)'>撤销注单</span></td>
                                <td v-else><h1 style="font-size: 24px">{{item.gameOpenNo||'-----'}}</h1></td>
                            </tr>
                            <tr>
                                <td>投注单号 ： <span id="copyTarget">{{item.betNo}}</span><span class="ml10 pointer"></span></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <thead class="_3apNX">
                        <tr>
                            <th>玩法</th>
                            <th>投注内容</th>
                            <th>注数</th>
                            <th>倍数</th>
                            <th>投注金额</th>
                            <th>模式</th>
                            <th>奖金</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody class="-QUHL">
                        <tr>
                            <td>{{item.groupClassConName+">"+item.groupName}}</td>
                            <td>
                                    <Tooltip :content="item.betContent|betshowcontent" placement="top"><p :title="item.betContent|betshowcontent" class="_1574P ellipsis">{{item.betContent|betshowcontent}}</p></Tooltip>
                            </td>
                            <td>{{item.betNumber}}</td>
                            <td>{{item.betMultiple}}</td>
                            <td>{{item.betAmt}}</td>
                            <td>{{item.gamePattern | yjf}}</td>
                            <td>{{item.bonusAmt?item.bonusAmt:"0.00"}}</td>
                            <td>{{item.betStatus|statu}}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="_2miUk">共<span class="_3nXX2">1</span>条记录</p>
                <div class="Vxtwm _1Hs7s">
                    <p><img class="v-sub mr5" src="/static_pc/images/1413aa4f42a660a0e64e0eb25359c613.svg" width="14" height="14"> 温馨提示：您当前查看的是{{item.custName||$store.state.userInfo.custName}}的{{item.gameName}}第{{item.gameNumber}}期注单详情
                    </p>
                </div>
            </div>
        </div>
</div>
</template>
<script>
    import {cityList} from '@/assets/bankJson.js'
    import axios from 'axios'
    export default {
        data() {
            return {
                item:{}
            }
        },
        components: { 

        },
        filters: {
            yjf: function(val){
                if(val=='0'){
                    return '元'
                }else if(val=='1'){
                    return '角'
                }else if(val=='2'){
                    return '分'
                };
            },
            statu: function(val){
                if(val=='0'){
                    return '待开奖'
                }else if(val=='1'){
                    return '未中奖'
                }else if(val=='2'){
                    return '已中奖'
                }else if(val=='3'){
                    return '撤销'
                };
                return val
            },
            
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
        created(){
            if(!this.$route.params.item){
                this.$router.push('/transaction')
                return
            }
            this.item = this.$route.params.item;
        },
        watch:{
            
        },
        methods:{
            async revokeBet(betNo){
                // this.$http.post('/game/revokeBet',{betNo:betNo}).then((data)=>{
                //     if(data.data.success){
                //         this.$Modal.success({
                //             title:'系统提示',
                //             content:data.data.msg
                //         });
                //         this.getBetRecodes(this.item.betNo);
                //         this.getMsg();
                //     }else{
                //         this.$Modal.error({
                //             title:'系统提示',
                //             content:data.data.msg
                //         })
                //     }
                // })
                const res = await this.$tools.fetch('/game/revokeBet').setCrypto(true).json().post({betNo:betNo});
                if(res.success){
                    this.$Modal.success({
                        title:'系统提示',
                        content:res.message||res.msg
                    });
                    this.getBetRecodes(this.item.betNo);
                    this.getMsg();
                }else{
                    this.$Modal.error({
                        title:'系统提示',
                        content:res.message||res.msg
                    })
                }


            },
            getBetRecodes(betNo){
                let _this = this;
                axios.post('/game/getBetRecodes',{betNo:betNo}).then((data)=>{
                    if(true){
                        if(data.data.records != null && data.data.records != undefined){
                            this.item = data.data.records[0]

                        }else{
                            this.$roter.push('/transaction')
                        }
                    };
                });

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
        }

    }
</script>