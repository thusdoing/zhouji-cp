<style scoped>
@import '../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}
</style>
<template>
  <div>
        <div class="header custom-header">
            <wv-flex>
                <wv-flex-item class="custom-left">
                    <div @click="$router.go(-1)" class="brack-icon">
                        <i class="el-icon-arrow-left" slot="icon"></i>
                    </div>
                    <!-- <div class="w-20" slot="right"></div> -->
                </wv-flex-item>
                <wv-flex-item flex="2">
                    <div class="custom-center">
                        <el-button-group>
                            <el-button type="primary" :class="[{'active':activezh}]" @click="changeType('zh')" size="small">转换</el-button>
                            <el-button type="primary" :class="[{'active':activejl}]" @click="changeType('jl')" size="small">记录</el-button>
                        </el-button-group>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right" style="text-align: center" v-if="activejl" @click="showtime=true">
                    {{time}}
                    </div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <transfer v-if="activezh" />
        <transferRecord v-else-if="activejl" :params="params" />
        <actionsheet v-model="showtime" :menus="menus" @on-click-menu="selectime" show-cancel ></actionsheet>
  </div>
</template>

<script>
import transfer from '@/components/custInfos/totransfer/toTransfer'
import transferRecord from '@/components/custInfos/totransfer/transferRecord'

export default {
  components:{
      transfer,
      transferRecord
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
          trandDateStart:"",
          trandDateEnd:""
        },
        chessOpen:"0"        
    }
  },
  methods:{
    changeType(type){
        if(type=="zh"){
          this.activezh=true
          this.activejl=false
          }else{
          this.activezh=false
          this.activejl=true
                    this.time = '今天'
                    let todaytime = new Date();
                    this.params.trandDateStart = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 00:00:00";
                    this.params.trandDateEnd =  todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 23:59:59"

          }        
    },

    selectime(timeval){
         if (timeval == 'today') {
                    this.time = '今天'
                    let todaytime = new Date();
                    this.params.trandDateStart = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 00:00:00";
                    this.params.trandDateEnd =  todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + todaytime.getDate()+" 23:59:59"
                    // this.serch()
                    //   console.log("今天",this.paramsname)
                    
                } else if (timeval == 'yestoday') {
                    this.time = '昨天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.params.trandDateStart = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + (todaytime.getDate())+" 00:00:00";
                    this.params.trandDateEnd = tod.getFullYear() + "-" + (tod.getMonth() + 1) + "-" + (tod.getDate())+" 23:59:59";
                    // console.log("昨天",this.paramsname)
                   // this.serch();
                } else if (timeval == 'sevenday') {
                    this.time = '七天'
                    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;
                    let todaytime = new Date(time);
                    let tod = new Date();
                    this.params.trandDateStart = todaytime.getFullYear() + "-" + (todaytime.getMonth() + 1) + "-" + (todaytime.getDate())+" 00:00:00";
                    this.params.trandDateEnd = tod.getFullYear() + "-" + (tod.getMonth() + 1) + "-" + (tod.getDate())+" 23:59:59"
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
       }
  }
}
</script>