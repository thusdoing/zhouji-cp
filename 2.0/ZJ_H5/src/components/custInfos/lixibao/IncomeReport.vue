<style scoped>
@import "../totransfer/transfer.css";
@import '../../../assets/header.css';
table tr td {
    border-style: none !important;
    /* font-size: 12px */
    /* border-width: 1px !important; */
}
table tr th {
    border-style: none !important;
    color: #EC2829
    /* border-width: 1px !important; */
}
</style>


<template>
<div>
  <wv-header title="利息宝收益报表" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
  <div style="margin-bottom: 0;" class="main-tra">
    <x-table  style="background-color:#fff;position: fixed;top:44px;z-index:9999"  :cell-bordered="false" :content-bordered="true" >
        <thead>
          <tr >
            <th  style="width:30%">结算时间</th>
            <th>收益</th>
            <th>余额</th>
          </tr>
        </thead>
      </x-table>
    <div class="contentbox1">      
      <x-table  style="background-color:#fff "  :cell-bordered="false" :content-bordered="true" >
        <thead>
          <tr >
            <th  style="width:30%">结算时间</th>
            <th>收益</th>
            <!-- <th>转入钱包</th> -->
            <th>余额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in recordList" :key="index" style="font-size: 15px" >
            <td style="line-height: 1.5;    padding: 5px;">{{$tools.dateFormat(new Date(item.createTime), 'YYYY-MM-DD HH:mm:ss')}}</td>
            <!-- <td></td> -->
            <td style="line-height: 1.5;    padding: 5px;">{{item.income}}</td>
            <td style="line-height: 1.5;    padding: 5px;">{{Number(item.amount).toFixed(6)}}</td>
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
    <div v-else style="line-height: 50px;text-align:  center;">暂时还没有转换记录</div>
    </template>
  </div>
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
    async getPurseChangeRecodes(newParams){  
       this.loading=true
      // this.$vux.loading.show({text: '查询中' }) 
      let data=await this.$api.post("/getPurseChangeRecodes",newParams)

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
    async getIncomeReport(newParams){  
       this.loading=true
      // this.$vux.loading.show({text: '查询中' }) 
      let data=await this.$api.post("/lxb/getIncomeReport",newParams)

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
           this.getIncomeReport(this.moreParams)
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
         this.getPurseChangeRecodes(this.paramsname)
    }
  },
  created(){
    // console.log(this.paramsname)
    // this.getPurse()
    this.recordList=[]
   
    this.getIncomeReport(this.moreParams)
  
  }
}
</script>