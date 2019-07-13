<template>
<div>
    <div class="fl mb12 _2WJqO" style="width:840px">
        <p>利息宝</p>
    </div>
    <div class="_3wioq fl" style="width: 840px;">
        <div class="react-tabs" data-tabs="true">
            <ul class="react-tabs__tab-list" role="tablist">
                <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==1}" @click="tab=1;">利息宝</li>
                <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==2}" @click="tab=2;">收益报表</li>
                <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==3}" @click="tab=3;">转入转出记录</li>
            </ul>
            <div v-if="tab==1">
                <div class="" style="position:relative">
                    <div class="tab1_l_u">
                        <p style="font-size:20px;color:#333;margin-top:50px;">今日收益（元）</p>
                        <p style="font-size:38.4px;color:#fd5234;margin-top:20px;">{{incomeToday}}</p>
                        <p style="font-size:18px;color:#333;margin-top:20px;">利息宝余额&nbsp;{{amount}}</p>
                    </div>
                    <div class="tab1_l_d">
                        <div style="left:25px;">
                            <p>本周收益</p>
                            <p>{{incomeWeek}}</p>
                        </div>
                        <div style="left:242px;">
                            <p>本月收益</p>
                            <p>{{incomeMonth}}</p>
                        </div>
                        <div style="left:25px;top:110px;">
                            <p>总收益</p>
                            <p>{{incomeTotal}}</p>
                        </div>
                        <div style="left:242px;top:110px;">
                            <p>年化收益</p>
                            <p>{{yearRate}}%</p>
                        </div>
                    </div>
                </div>
                <div style="position:relative">
                    <div class="tab_1_r">
                        <p>利息宝说明</p>
                        <p>利息宝上线了，欢迎大家使用！</p>
                        <p>1、复利结算，利滚利，收益更高。</p>
                        <p>2、结算快，每分钟结算一次，存入即开始收益。</p>
                        <p>3、转入转出无限制，随时随地享收益。</p>
                        <p>4、年化率百分之二十，全国首创！坐拥财富增值！</p>
                    </div>
                    <div class="tab1_r_u">
                        <div style="width:100%;height:60px;">
                            <p :class="isZhuanRu==0?'p_on':'p_off'" @click="isZhuanRu=0" style="margin-left:20px;">转入利息宝</p>
                            <p :class="isZhuanRu==1?'p_on':'p_off'" @click="isZhuanRu=1" style="margin-right:20px;">转出到账户</p>
                        </div>
                        <div class="tab1_r_d">
                            <p style="margin-left:85px;">金额：<input type='text' style='display:none'><input type="text" v-model="money" autocomplete='off'></p>
                            <p>提款密码：<input type="password" v-model="pwd" autocomplete='new-password' readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);"></p>
                            <button v-text="buttonText[isZhuanRu]" @click="zhuanhuan"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tab==2" style="text-align:center">
                <div class="tab2_m" style="width: 840px;margin:10px 0 10px 0;">
                    <span>今日收益：{{incomeToday}}</span>
                    <span>本周收益：{{incomeWeek}}</span>
                    <span>本月收益：{{incomeMonth}}</span>
                    <span>总收益：{{incomeTotal}}</span>
                </div>
                <table style="width:100%;table-layout:fixed" cellspacing="0" cellpadding="0">
                    <thead style="height:37px;font-size:12px;line-height:37px;background:#f8f8f8;border:1px solid #e3e3e3;text-align:center;">
                        <tr> 
                            <td>结算时间</td>
                            <td>利息宝余额</td>
                            <td>收益</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in recordList" :key="index" style="height:37px;text-align:center;border:1px solid #e3e3e3;font-size:12px;">
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.createTime}"></td>
                            <td>{{Number(item.amount).toFixed(6)}}</td>
                            <td>{{item.income}}</td>
                        </tr>
                    </tbody>
                </table>
                <template>
                    <Page v-if="totalSize>10" show-elevator size="small" :total="totalSize" showTotal :current="moreParams.pageNo" @on-change='changePage'
                    style="padding:5px 10px 5px 0;text-align:right;font-size:12px;width:840px;border:1px solid #e3e3e3;">
                    </Page>
                </template>
            </div>
            <div v-if="tab==3" style="text-align:center">
                <div style="padding:10px 0 10px 10px;background:rgb(248 248 248)">
                    <Row>
                        <i-col span="2">
                            <span style="line-height:32px;margin-left:20px;color:#000;font-size:14px;">时间：</span>
                        </i-col>
                        <i-col span="2" >
                            <i-button @click="tiem='d1';changeDay(1)" :class="{active:tiem=='d1'}" style="width:40px;height:30px;padding:5px 8px;">今天</i-button>
                        </i-col>
                        <i-col span="2" style="margin-left:-15px;">
                            <i-button @click="tiem='d2';changeDay(2)" :class="{active:tiem=='d2'}" style="width:40px;height:30px;padding:5px 8px;">昨天</i-button>
                        </i-col>
                        <i-col span="2" style="margin-left:-15px;">
                            <i-button @click="tiem='d7';changeDay(7)" :class="{active:tiem=='d7'}" style="width:40px;height:30px;padding:5px 8px;">七天</i-button>
                        </i-col>
                    </Row>
                </div>
                <table style="width:100%;table-layout:fixed" cellspacing="0" cellpadding="0">
                    <thead style="height:37px;font-size:12px;line-height:37px;background:#f8f8f8;border:1px solid #e3e3e3;text-align:center;">
                        <tr> 
                            <td>结算时间</td>
                            <td>流动额</td>
                            <td>当前余额</td>
                            <td>流水类型</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="transferList.length==0">
                            <td class="_32waq" colspan="4">
                                <article  class="_1dJVz">
                                    <div class="absolute center-margin"><img class="_1VUC8" src="/static_pc/images/ku.png">
                                        <p>暂无记录</p>
                                    </div>
                                </article>
                            </td>
                        </tr>
                        <tr v-else v-for="(item,index) in transferList" :key="index" style="height:37px;text-align:center;border:1px solid #e3e3e3;font-size:12px;">
                            <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.insertDate}"></td>
                            <td>{{item.changeAmt}}</td>
                            <td>{{item.amount}}</td>
                            <td>{{item.changeType=="90001"?"转入利息宝":"转出到余额"}}</td>
                        </tr>
                    </tbody>
                </table>
                <template>
                    <Page v-if="transferTotalSize>10" show-elevator :total="transferTotalSize" :current="getTransferParams.pageNo" showTotal size="small" @on-change='changeTransferPage'
                    style="padding:5px 10px 5px 0;font-size:12px;width:840px;text-align:right;border:1px solid #e3e3e3;">
                    </Page>
                </template>
                <div class="Vxtwm _1pdcZ">
                    <p ><img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：交易记录最多只保留7天。
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data(){
        return{
            tiem:'d1',
            tab:1,
            userAcct:[],
            recordList: [],
            incomeMonth:"0",
            incomeToday:"0",
            incomeTotal:"0",
            incomeWeek:"0",
            yearRate:"20",
            amount:"0",
            params:{
                type: "",
                withPwd: "",
                changeAmt: ""
            },
            isZhuanRu:0,
            money:"",
            pwd:"",
            buttonText:["确认转入","确认转出"],
            ModalMsg:['转入利息宝成功','转出到账户成功'],
            moreParams:{
                pageNo:1,
                pageSize:10,
            },
            totalSize:"",
            recordList:[],
            more:false,
            getTransferParams:{
                pageNo:1,
                pageSize:10,
                startDate:"",
                endDate:""
            },
            transferList:[],
            transferTotalSize:"0",
            hasMoreTransfer:true
        }
    },
    methods:{
        async getDetail(){
            let data = await this.$http.get("/lxb/getAcct")
            if(data.data.success && data.data.t){
                let data_=data.data.t
                this.incomeMonth= Number(data_.incomeMonth).toFixed(6)
                this.incomeToday=data_.incomeToday
                this.incomeTotal=Number(data_.incomeTotal).toFixed(6)
                this.incomeWeek=Number(data_.incomeWeek).toFixed(6)
                this.amount=data_.amount
                this.yearRate=data_.yearRate
            }
        },
        async getAcctLxb(){
            await this.$http.get('/lxb/getAcctLxb').then(data=>{
                //console.log(data)
                this.userAcct[0] = data.data.t.acctAmt;
                this.userAcct[1] = data.data.t.lxbAmt;
            })
        },
        async zhuanhuan(){
            if(this.money <= this.userAcct[this.isZhuanRu] && this.money>0){
                console.log(1)
                if (this.isZhuanRu == 0) {
                    this.params.type = "090001";         
                    } else {
                    this.params.type = "090002";
                };
                this.params.changeAmt = this.money;
                this.params.withPwd = this.pwd;
                let data= await this.$tools.fetch('/lxb/transferAcct').setParams(this.params).post()
                if (data.success) {
                    this.userAcct[this.isZhuanRu]=this.userAcct[this.isZhuanRu]-this.money
                    this.userAcct[1-this.isZhuanRu]=+(+this.userAcct[1-this.isZhuanRu]+this.money)
                    this.money=""
                    this.pwd=""
                    this.getDetail();
                    this.$Modal.success({
                            title: '提示',
                            content: this.ModalMsg[this.isZhuanRu]
                    })
                }else{
                    this.$Modal.error({
                        title: '提示',
                        content: data.message
                    })
                }
            }else{
                this.$Modal.error({
                    title: '提示',
                    content: '请输入正确的转换金额'
                })
            }
        },
        async getIncomeReport(incomeParams){
            let data =  await this.$tools.fetch('/lxb/getIncomeReport').setJson(incomeParams).post()
            if(data.success && data.data.list){
                this.recordList=data.data.list
                this.totalSize=data.data.totalSize;
                if(this.recordList.length>=this.totalSize){
                    this.more=false            
                }else{
                    this.more=true
                }
            }
            
        },
        changePage(page){
            if(this.more){
                this.moreParams.pageNo=page          
                this.getIncomeReport(this.moreParams)
            }
        },
        async getTransferRecord(day,getTransferParams){
            if(day==2){
                this.getTransferParams.startDate = this.$date(Date.now()-86400000,'yyyy-MM-dd')
                this.getTransferParams.endDate = this.$date(Date.now(),'yyyy-MM-dd')
            }else{
                this.getTransferParams.startDate = this.$date(Date.now()-((day-1)*86400000),'yyyy-MM-dd');
                this.getTransferParams.endDate = this.$date(Date.now()+86400000,'yyyy-MM-dd')
            }
            let data =  await this.$tools.fetch('/lxb/getTransferRecord').setJson(getTransferParams).post()
                if(data.success&&data.data.list){
                    this.transferList = data.data.list;
                    this.transferTotalSize = data.data.totalSize;
                    if(this.transferList.length>=this.transferTotalSize){
                        this.hasMoreTransfer=false            
                    }else{
                        this.hasMoreTransfer=true
                    }
                }
            
        },
        changeDay(day){
            this.getTransferParams.pageNo = 1
            this.getTransferRecord(day,this.getTransferParams)
        },
        changeTransferPage(page){
            if(this.hasMoreTransfer){
                this.getTransferParams.pageNo = page
                if(this.tiem=='d1') this.getTransferRecord(1,this.getTransferParams);
                if(this.tiem=='d2') this.getTransferRecord(2,this.getTransferParams);
                if(this.tiem=='d7') this.getTransferRecord(7,this.getTransferParams);
            }
        },
        NumberCheck(num) {
            var str = num;
            var len1 = str.substr(0, 1);
            var len2 = str.substr(1, 1);
            if (str.length > 1 && len1 == 0 && len2 != ".") {
                str = str.substr(1, 1);
            }
            if (len1 == ".") {
                str = "";
            }
            if (str.indexOf(".") != -1) {
                var str_ = str.substr(str.indexOf(".") + 1);
                if (str_.indexOf(".") != -1) {
                str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
                }
            }
            str = str.replace(/[^\d^\.]+/g,'')
            return str;
        }
    },
    computed:{
    },
    created(){
        this.getAcctLxb();
        this.getDetail();
        this.getIncomeReport(this.moreParams);
        this.getTransferRecord(1,this.getTransferParams);
    },
    mounted(){
    },
    watch:{
        money(){
            this.money = this.NumberCheck(this.money)
        }
    }
}
</script>
<style lang="less" scoped>
.tab1_l_u{
    position:absolute;
    width:460px;
    height: 220px;
}
.tab1_l_u>p{
    width:100%;
    text-align: center;
}
.tab1_l_d{
    position: absolute;
    width:460px;
    height:228px;
    top:220px;
}
.tab1_l_d>div{
    width:185px;
    border:1px solid #e3e3e3;
    position: absolute;
}
.tab1_l_d>div>p{
    width:100%;
    text-align: center;
}
.tab1_l_d>div>p:first-child{
    height: 27px;
    color:#fff;
    background:#fd5234;
    line-height: 27px;
    font-size: 18px;
}
.tab1_l_d>div>p:nth-child(2){
    height:60px;
    font-size:20px;
    color:#fd5234;
    line-height: 60px;
}
.tab_1_r{
    width:350px;
    height:200px;
    border:1px solid #e3e3e3;
    border-radius: 20px;
    padding:10px 0 15px 15px;
    position: absolute;
    right:30px;
    top:20px;
}
.tab_1_r>p{
    color:#fd5234;
    margin:13px 0 13px 0;
    font-size: 14.5px;
}
.tab_1_r>p:first-child{
    font-size: 16px;
    text-align: center;
    font-weight: 600;
}
.tab1_r_u{
    border:1px solid #e3e3e3;
    border-radius: 20px;
    width:350px;
    height:200px;
    position:absolute;
    top:235px;
    right:30px;
}
.tab1_r_u>div:first-child{
    display: flex;
    justify-content:space-around;
}
.tab1_r_u>div:first-child>p{
    float: left;
    font-size:16px;
    cursor: pointer;
    line-height: 60px;
    height:45px;
}
.tab1_r_d>p{
    font-size: 16px;
    color:#333;
    margin:10px 0 0 55px;
}
.tab1_r_d>p>input{
    width:160px;
    height:26px;
    background: #e3e3e3;
    outline: none;
    border:none;
}
.tab1_r_d>button{
    display: inline-block;
    width:115px;
    height:32px;
    background: #fd5234;
    border:none;
    color:#fff;
    margin:15px 0 15px 120px;
    border-radius: 3px;
}
.tab2_m>span{
    font-size: 13px;
    color:#fd5234;
    margin-left: 18px;
}
.p_on{
    color:#fd5234;
    border-bottom:3px solid #fd5234;

}
.p_off{
    color:#999;
}
</style>

