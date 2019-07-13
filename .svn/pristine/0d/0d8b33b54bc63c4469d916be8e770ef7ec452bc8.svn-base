<style scoped>
@import '../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}
</style>
<template>
  <div>
    <wv-header title="棋牌游戏记录" class="header">
      <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
        <i class="el-icon-arrow-left" slot="icon"></i>
        
      </div>
      <div  @click="showtime=true" slot="right">{{time}}</div>
    </wv-header>
    <actionsheet v-model="showtime" :menus="menus" @on-click-menu="selectime" show-cancel ></actionsheet>
    <childKyBetRecords :params="params" />
  </div>
</template>

<script>
import childKyBetRecords from '@/components/custInfos/kyBetRecords/childKyBetRecords'
// import transferRecord from '@/components/custInfos/totransfer/transferRecord'

export default {
  components:{
      childKyBetRecords
  },
  data(){
    return{
       activezh : true,
       activejl : false,
        time: '今天',
        showtime:false,
        menus: {
                    today:'今天',
                    yestoday:'昨天',
                    sevenday:'七天',
                },
        params:{
          pageNO:1,
          pageSize:10,
          startDate:"",         
        },
        chessOpen:"0"        
    }
  },
  methods:{
    selectime(timeval){
         if (timeval == 'today') {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.params.startDate = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 00:00:00";
                    // this.params.trandDateEnd =  todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 23:59:59"
                    // this.serch()
                    //   console.log("今天",this.paramsname)
                    
                } else if (timeval == 'yestoday') {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.params.startDate = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + (todaytime.getDate())+" 00:00:00";
                    // this.params.trandDateEnd = tod.getFullYear() + "-" + (tod.getMonth() + 1) + "-" + (tod.getDate())+" 23:59:59";
                    // console.log("昨天",this.paramsname)
                   // this.serch();
                } else if (timeval == 'sevenday') {
                    this.time = '七天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.params.startDate = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + (todaytime.getDate())+" 00:00:00";
                    // this.params.trandDateEnd = tod.getFullYear() + "-" + (tod.getMonth() + 1) + "-" + (tod.getDate())+" 23:59:59"
                    // console.log("七天",JSON.stringify(this.params))
                    //  console.log("七天",this.paramsname)
                    // this.serch();
                }
    }
  },
  created(){
      this.chessOpen=JSON.parse(localStorage.getItem("chessOpen"));
       if(this.chessOpen=="0"){
           console.log("跳转")
           this.$router.push("/")
       }else{
                    this.time = '今天'
                    let todaytime = new Date();
                    this.params.startDate = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 00:00:00";
       }
                    // this.params.trandDateEnd =  todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 23:59:59"
  }
}
</script>