<template>
    <div>
        <wv-header title="利息宝" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
        </wv-header>
        <div class="contentbox" >
          <div class="depositContainer" style="background:#fe5139;">
            <p>今日收益(元)</p>
            <p class="shouyi">{{incomeToday}}</p>
          <p>总金额：<span class="red">{{amount}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> 年化率：<span class="red">{{yearRate}}%</span></p>
      
          </div>
            <wv-grid style="background: #fff;">
                <wv-grid-item>
                    <div class="gridcontent">
                         <h2>本周收益</h2>
                        <p>{{incomeWeek}}</p>
                       
                    </div>
                </wv-grid-item>  
                <wv-grid-item>
                    <div class="gridcontent">
                         <h2>本月收益</h2>
                        <p>{{incomeMonth}}</p>
                       
                    </div>
                </wv-grid-item>   
                <wv-grid-item>
                    <div class="gridcontent">
                        <h2>总收益</h2>
                        <p>{{incomeTotal}}</p>
                        
                    </div>
                </wv-grid-item>   
                <wv-grid-item>
                    <div class="gridcontent" @click="$router.push('/transferAcctLXB')">
                    <h2>额度转入转出</h2>
                        <p><img src="/static/lixibao/edzrzc.png">
                        
                        </p>
                        
                    </div>
                </wv-grid-item>   
                <wv-grid-item>
                    <div class="gridcontent" @click="$router.push('/IncomeReport')">
                     <h2>收益报表</h2>
                        <p><img src="/static/lixibao/sybb.png" /></p>
                       
                    </div>
                </wv-grid-item>   
                <wv-grid-item>
                    <div class="gridcontent" @click="$router.push('/transferRecordLXB')">
                        <h2>转入转出记录</h2>
                        <p><img src="/static/lixibao/zrzcjl.png" /></p>
                        
                    </div>
                </wv-grid-item>               
            </wv-grid>
            <div class="lxbImg">
            <img src="/static/lixibao/lxb1.png" alt="">
            <img src="/static/lixibao/lxb2.png" alt="">
            <img src="/static/lixibao/lxb3.png" alt="">
            </div>
            

             <!-- <pre style="text-align: left; color: #ea0f0f; font-size: 15px;width: 320px;margin: auto; margin-top: 30px;    border: 1px solid #928c8c;padding:18px; white-space: pre-wrap;">利息宝上线了，欢迎大家使用！
1、复利结算，利滚利，收益更高。
2、结算快，每分钟结算一次，存入即开始收益。
3、转入转出无限制，随时随地享收益。
4、年化率百分之二十，全国首创！坐拥财富增值！

收益计算公式:	
一分钟收益 = (年化率/365/100)*利息宝余额*(1/1440)；如年化收益20%，利息宝余额100000，则一分钟产生的利息为(20/365/100)*100000*(1/1440)
如：当日存入10万第一天收益为54.8095元，第二天的收益则是前一天收益加上本金的收益!
</pre> -->

        </div>

    </div>
</template>
<script>
    import { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem } from 'vux'
    export default {
        components: { XTable, LoadMore, Actionsheet, PopupHeader, Popup, Group, Cell, Tab, TabItem },
        data() {
            return {
                formData: {
                    custName: "",
                    startDate: "",
                    endDate: ""
                },
                recordList: [],
                time: '今天',
                loading: false,
                totalSize: 0,
                showtime: false,
                incomeMonth:"0",
                incomeToday:"0",
                incomeTotal:"0",
                incomeWeek:"0",
                amount:"0",
                yearRate:"20"                
            }
        },
        created() {
            
        },
        methods: {   
            payCheck(){
               this.$dialog({ title: '提示', message: "点我干嘛", skin: 'ios' });
                
            },
       async getAcct() {        
          let data = await this.$api.get('/lxb/getAcct')  
              if (data.success && data.t) {
                    let data_=data.t
                    this.incomeMonth= Number(data_.incomeMonth).toFixed(6)
                    this.incomeToday=data_.incomeToday
                    this.incomeTotal=Number(data_.incomeTotal).toFixed(6)
                    this.incomeWeek=Number(data_.incomeWeek).toFixed(6)
                    this.amount=data_.amount
                    this.yearRate=data_.yearRate
              }
                },
           
        },
        mounted() {
               this.getAcct()
        },
    }
</script>
<style scoped>
    @import '../../../assets/header.css';
    .contentbox {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: #fff
}
    .gridcontent {
        text-align: center;
    }

    .gridcontent p {
        color: #ff6f22;
        font-size: 14px;
        line-height: 1.5
    }
    .gridcontent img {
        width: 40%
    }

    .gridcontent h2 {
        font-size: 14px;
        font-weight: normal;
        color: #999;
        padding-bottom: 5px
    }
    .depositContainer{
          color: #fff;
          text-align: center;      
          padding: 20px 0;
          font-size: 14px    
    }
    .shouyi{
    font-size: 30px;
    padding: 10px;
    }
    .red{
      color:#fff
    }
    .lxbImg{
        width: 100%
    }
    .lxbImg img{
        width: 100%
    }
</style>