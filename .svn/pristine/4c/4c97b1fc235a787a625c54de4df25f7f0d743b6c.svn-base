<style scoped>
@import "../totransfer/transfer";
table tr td {
    border-style: none !important;
    /* border-width: 1px !important; */
}
table tr th {
    border-style: none !important;
    /* border-width: 1px !important; */
}
</style>


<template>
  <div style="margin-bottom: 0;" class="main-tra">

    <div class="contentbox1">
      <x-table  style="background-color:#fff"  :cell-bordered="false" :content-bordered="true" >
        <thead>
          <tr >
            <th>日期</th>
            <th>平台</th>
            <th>游戏玩法</th>
            <th>盈亏</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in recordList" :key="index" style="font-size: 15px" >
            <td>{{$tools.dateFormat(new Date(item.gameStartTime), 'YYYY-MM-DD')}}</td>
            <!-- <td></td> -->
            <td>{{item.plateName}}</td>
            <td>{{item.gameName}}</td>
            <td>{{item.profit}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <template v-if="loading">
    <group :gutter="0" >
      <load-more tip="加载中..."/>
    </group>
    </template>
    <template v-else>
    <div v-if="recordList.length">
    <div v-if="more" style="line-height: 50px;text-align:  center;background: #fff;"  @click="pageAdd">点击加载更多</div>
    <div v-else style="line-height: 50px;text-align:  center;">没有更多了</div>
    </div>
    <div v-else style="line-height: 50px;text-align:  center;">暂时还没有游戏记录</div>
    </template>
  </div>
</template>
<script>
import {
  XTable,
  LoadMore,
  Actionsheet,
  PopupHeader,
  Popup,
  Group,
  Cell
} from "vux";
import { Datetime } from "vux";
export default {
  props:['params'],
  data(){
      return{
        list:[],
        recordList:[],
        newparamsname:{},
        more:true,
        totalSize:"",
        pageNO:'1',
        moreParams:{
          pageNo:1,
          pageSize:10,
          startDate:"",         
        },
        loading:true
      }
  },
    components: {
    XTable,
    LoadMore,
    Actionsheet,
    PopupHeader,
    Popup,
    Group,
    Cell,
    Datetime
  },
  methods:{
    // async getPurse(){
    //    let data=await this.$api.postForm("/getPurse")
    //   //  console.log(data)
    //  },
    async getRecords(newParams){  
       this.loading=true
      // this.$vux.loading.show({text: '查询中' }) 
      let data=await this.$api.get("/api/chess/getRecords",newParams)

      //  this.$vux.loading.hide({text: '查询中' }) 
        this.loading=false
      if(data.success && data.list){       
          this.recordList=this.recordList.concat(data.list)
          this.totalSize=data.totalSize
          if(this.recordList.length>=this.totalSize){
            this.more=false            
          }else{
            this.more=true
          }
          
        
      }
      // console.log(data)
    }, 
    pageAdd(){
      if(this.more){        
           this.moreParams.pageNo=this.moreParams.pageNo+1
           this.moreParams.startDate=this.paramsname.startDate
          //  this.moreParams.trandDateEnd=this.paramsname.trandDateEnd
           this.getRecords(this.moreParams)
                 }
     
    }
  },
  computed:{
    paramsname:function(){         
       return this.params     
    },
    changedParams:function(){
      return JSON.stringify(this.paramsname)
    }
  },
  watch:{
    changedParams:function(){      
         this.recordList=[]     
        this.moreParams.pageNo=this.paramsname.pageNO             
         this.getRecords(this.paramsname)
    }
  },
  created(){
    // console.log(this.paramsname)
    // this.getPurse()
    this.recordList=[]
   
    this.getRecords(this.paramsname)
  
  }
}
</script>