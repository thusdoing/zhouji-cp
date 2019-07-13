<template>
    <div>
        <x-header :left-options="{backText: ''}" @on-click-back="$router.go(-1)">
            <span>注单详情</span>
            <!-- revokeBetEnable: 是否允许撤单， 代理注单详情不允许撤单 -->
            <template v-if="revokeBetEnable">
                <!-- 追投不用判断当前的投注状态，判断追投状态 -->
                <template v-if="item.bonusStatus && item.bonusStatus != $consts.BonusStatus.C_FINISHED_CH && item.bonusStatus != $consts.BonusStatus.C_TERMINATED_CH">
                    <span @click="chedan(item)" slot="right">撤单</span>
                </template>
                <!-- 普投判断当前的投注状态 -->
                <template v-else-if="item.betStatus == $consts.BetStatus.C_WAITING_OPEN && !item.bonusStatus">
                    <span @click="chedan(item)" slot="right">撤单</span>
                </template>
                <!-- <span @click="chedan(item.betNo)" v-if="item.betStatus=='0'||(item.bonusStatus!='已结束'&&item.bonusStatus!='已终止')" slot="right">撤单</span> -->
            </template>
        </x-header>
        <div class="sc-MYvYT ENuJS">
            <div class="sc-RmnOB jSkwPt">
                <div class="sc-dYcyhn dOZhFV">
                    <div class="sc-cIbcTr dgdnsm">
                        <img v-if="item.imgPath" :src="$imgPath(item.imgPath)" class="iYsRoV" />
                        <div class="sc-hmyDHa ldmBNK">
                            <div>
                                <span class="sc-jTNJqp iJbcte">{{item.gameName}}</span>
                                <span class="sc-fAfrNB jdjecu">{{item.bonusStatus}}{{item.betStatus=="2"?item.bonusAmt:''}}{{item.betStatus=="0"?"等待开奖":''}}{{item.betStatus=="1"?"未中奖":''}}{{item.betStatus=="3"?"撤销":''}}</span>
                            </div>
                            <div>
                                <span class="sc-MKjYC kvgcVX">第{{item.gameNumber||item.firstGameNumber}}期</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="sc-bQduHL iHTOiZ">
                            <div class="sc-iUpOdG irTdtw">投注时间</div>
                            <div class="sc-kGeDwz bgzuaP" v-if="item.betContent">{{$Date(item.betDate)}}</div>
                            <div class="sc-kGeDwz bgzuaP" v-else>{{item.betDate}}</div>
                        </div>
                        <div class="sc-bQduHL iHTOiZ">
                            <div class="sc-iUpOdG irTdtw">投注单号</div>
                            <div class="sc-kGeDwz bgzuaP">{{item.betNo||item.betBatchNo}}</div>
                        </div>
                        <div class="sc-bQduHL iHTOiZ">
                            <div class="sc-iUpOdG irTdtw">投注金额</div>
                            <div class="sc-kGeDwz bgzuaP">¥ {{item.betAmt||item.totalAdditionAmt}} 元</div>
                        </div>
                        <div class="sc-bQduHL iHTOiZ">
                            <div class="sc-iUpOdG irTdtw">返水奖金</div>
                            <div class="sc-kGeDwz bgzuaP">¥ {{item.betBack||0}} 元</div>
                        </div>
                        <div class="sc-bQduHL iHTOiZ">
                            <div class="sc-iUpOdG irTdtw">派送奖金</div>
                            <div class="sc-kGeDwz bgzuaP" style="color: red">¥ {{item.bonusAmt||item.totalBonusAmt}} 元</div>
                        </div>
                        <div class="sc-bQduHL iHTOiZ" v-if="item.betContent">
                            <div class="sc-iUpOdG irTdtw">开奖号码</div>
                            <div class="sc-kGeDwz bgzuaP">{{item.gameOpenNo}}</div>
                        </div>
                    </div>
                    <div class="sc-gwZsXD iskFcK">我的投注</div>
                    <div class="sc-cKZAiZ fpOXJP" v-if="!zuihaoFlag">
                        <div class="sc-jJkQYJ geFKbM">
                            <div>{{item.betContent|dxds}}</div>
                            <div class="sc-klSiHT duQiL">{{item.groupClassConName}}>{{item.groupName}}</div>
                        </div>
                        <div class="sc-kOnlKp bgVVog" v-if="revokeBetEnable">
                            <span v-if="item.betStatus==0">待开奖</span>
                            <span v-else-if="item.betStatus==1" style="color: red">未中奖</span>
                            <span v-else-if="item.betStatus==2" style="color: #454545">已中奖</span>
                            <span v-else>已撤单</span>
                        </div>
                        <div class="sc-kOnlKp bgVVog" v-else>
                            <font color="red">{{item.betStatus}}</font>
                        </div>
                    </div>
                    <div class="sc-cKZAiZ fpOXJP" v-if="zuihaoFlag" v-for="(_item,index) in zuihaoList" :key="index">
                        <div class="sc-jJkQYJ geFKbM">
                            <div>投注内容：{{groupInfo.betContent|dxds}}</div>
                            <div class="sc-klSiHT duQiL">第{{_item.gameNumber}}期>开奖号码：{{_item.gameOpenNo||"-----"}}</div>
                            <div class="sc-klSiHT duQiL">{{groupInfo.groupName}}</div>
                        </div>
                        <div class="sc-kOnlKp bgVVog">
                            <span v-if="_item.betStatus==0">待开奖</span>
                            <span v-else-if="_item.betStatus==1" style="color: #454545">未中奖</span>
                            <span v-else-if="_item.betStatus==2"  style="color: red">已中奖</span>
                            <span v-if='_item.betStatus=="已中奖"'  style="color: red">{{_item.betStatus}}</span>
                            <span v-if='_item.betStatus=="未中奖"' style="color: #454545">{{_item.betStatus}}</span>
                            <span v-if='_item.betStatus=="已撤销"'>{{_item.betStatus}}</span>
                        </div>
                    </div>
                    <div style="height:100px"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    XHeader,AlertModule
} from 'vux'
//import transactionVue from '../../../../game/newProject001/src/components/notice/cp/transaction.vue';
export default {
    components: {
      XHeader,AlertModule
    },
    data() {
      return {
        // 会员个人注单详情，可以撤单，代理注单详情不撤单
        // 是否允许撤单, 默认允许撤单
        // @author: maobi
        // @date: 2018年9月1日
        revokeBetEnable: true,


        item:{},
        zuihaoList:[],
        zuihaoFlag:false,
        groupInfo:{},
      }
    },
    mounted:function() {
    },
    filters:{
        dxds(val){
            switch(val){
                case "a":return "大";
                case "b":return "小";
                case "c":return "单";
                case "d":return "双";
                default: return val
            }
        }
    },
    created(){
        if(this.$route.params.item){
            this.item = this.$route.params.item;
        }else{
            this.$router.go(-1)
        }
        if( this.$route.params.item&&this.$route.params.item.betBatchNo){
            this.getValidAdditionBetDetail()
        }

        // 会员个人注单详情，可以撤单，代理注单详情不撤单
        // 是否允许撤单, 默认允许撤单
        const { revokeBetEnable = true } = this.$route.params || {}
        this.revokeBetEnable = Boolean(revokeBetEnable);
    },
    methods: {
        timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D+h+m+s;
        },
      async chedan(item){
            // 投注编号，betNo第一版的值，betBatchNo目前修正值
            const betNo = item.betNo || item.betBatchNo;
            const params = {betNo};
            console.log({betNo})
            // 追投记录，数据没有betType, 普通投注有betType字段
            if (typeof item.betType == 'undefined') {
                // 此字段，是为了后台验证是否传值，代表追投还是普投
                params.betType = 1;
            }
           const data = await this.$tools.fetch('/game/revokeBet').setCrypto(true).setJson(params).post(); 

                if(data.data.success){
                    // AlertModule.show({
                    //     title:'提示',
                    //     content:'撤单成功',
                    // })
                    this.$dialog.alert({title: '提示',message: '撤单成功',skin: 'ios'});
                    this.$router.go(-1)
                }else{
                    this.$dialog.alert({title: '提示',message: data.data.msg,skin: 'ios'});
                    // AlertModule.show({
                    //     title:'提示',
                    //     content:data.data.msg,
                    // })
                }
        
        },
        getValidAdditionBetDetail(){
                let _this = this;
                this.$http.get('/game/getValidAdditionBetDetail',{params:{betBatchNo:this.item.betBatchNo}}).then((data)=>{
                    if(data.data.code=='10000'){
                        if(data.data.betDetail != null && data.data.betDetail != undefined){
                            _this.zuihaoList = data.data.betDetail;
                            _this.zuihaoFlag =true;
                            _this.groupInfo = data.data.groupInfo[0]
                        }else{
                            _this.zuihaoList = [];
                        }
                    }
                })
            },
          async  revokeBet(betBatchNo){
                const data = await this.$tools.fetch('/game/revokeBet').setCrypto(true).setJson({betNo:betBatchNo,betType:"1"}).post();                
                    if(data.data.success){
                        // this.$Modal.success({
                        //     title:'系统提示',
                        //     content:data.data.msg
                        // });
                        this.$dialog.alert({title: '系统提示',message: data.data.msg,skin: 'ios'});
                        this.item.bonusStatus = '已结束'
                        this.getValidAdditionBetDetail();
                        this.getMsg();
                    }else{
                        this.$dialog.alert({title: '系统提示',message: data.data.msg,skin: 'ios'});
                        // this.$Modal.error({
                        //     title:'系统提示',
                        //     content:data.data.msg
                        // })
                    }
 
            },
    }
}
</script>
<style lang="less" scoped>
@import './betView.less';
.kvgcVX {
font-size: 11px;
color: #9b9b9b;
}
.ENuJS {
width: 100vw;
height: 100%;
position: fixed;
z-index: 0;
}
.jSkwPt {
height: calc(100% - 0px);
overflow-y: auto;
-webkit-overflow-scrolling: touch;
}
.dOZhFV {
padding: 10px 15px;
}
.dgdnsm {
padding: 10px 22px;
display: -webkit-flex;
display: flex;
background-color: #ffffff;
margin-bottom: 10px;
}
.iskFcK {
font-size: 12px;
color: #9b9b9b;
margin: 20px 0 10px 0;
}
.fpOXJP {
display: -webkit-flex;
display: flex;
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
background-color: #ffffff;
padding: 10px 0;
border-bottom: 1px solid #e6e6e6;
}
.fpOXJP:last-child {border-bottom: none;}
.geFKbM {
-webkit-flex: 3 1;
-ms-flex: 3 1;
flex: 3 1;
font-size: 12px;
line-height: 20px;
padding: 0 5px 0 15px;
box-sizing: border-box;
word-break: break-all;
}
.bgVVog {
-webkit-flex: 1 1;
-ms-flex: 1 1;
flex: 1 1;
font-size: 12px;
line-height: 20px;
padding: 0 15px 0 5px;
box-sizing: border-box;
text-align: center;
}
.duQiL {
font-size: 10px;
color: #9b9b9b;
}
.slick-slide img {display: block;}
.iYsRoV {
width: 45px;
height: 45px;
}
.jdjecu {font-size: 16px;}
.iJbcte {
font-size: 16px;
margin-right: 10px;
}
.ldmBNK {
padding-left: 30px;
display: -webkit-flex;
display: flex;
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
-webkit-box-pack: center;
-webkit-justify-content: center;
-ms-flex-pack: center;
justify-content: center;
}
.iHTOiZ {
font-size: 12px;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
background-color: #ffffff;
border-bottom: 1px solid #e6e6e6;
}
.irTdtw {
min-width: 90px;
padding: 12px 10px 12px 20px;
-webkit-flex-basis: 90px;
-ms-flex-preferred-size: 90px;
flex-basis: 90px;
}
.bgzuaP {
padding: 12px 10px;
word-break: break-all;
}
.okbet-wraps {
    padding: 10px;
    font-size: 14px;
    background-color: rgba(0,0,0,0.78);
    color: #fff;
    line-height: 40px;
    position: fixed;
        width: 95%;
    bottom: 0;

    & > i {
      font-size:30px;
      vertical-align: middle;
    }

    .btn-error {
      display: block;
      width: 80px;
      line-height: 40px;
      text-align: center;
      background: #ec2829;
      color: #ffffff;
      font-size: 14px;
      font-weight: 400;
      border-radius: 3px;
      border-width: 0;
      border-color: #ec2829;
      padding: 0 4px;
      position: relative;
      float:right;
      font-size:14px;

      &:focus {
        outline: none;
      }
    }
}
</style>
