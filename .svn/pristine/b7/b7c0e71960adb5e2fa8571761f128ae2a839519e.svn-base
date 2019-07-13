<template>
  <div>
    <!-- <inline-calendar :show.sync="Visibility">
    </inline-calendar>-->
    <wv-header title="盈亏查询" class="header">
      <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
        <i class="el-icon-arrow-left" slot="icon"></i>
      </div>
    </wv-header>
    <div class="contentbox1">
      <!-- <div style="height:48px"></div> -->
      <!-- <datetime-range :title="$t('Choose')" start-date="2017-01-01" end-date="2017-02-02" :format="$t('daterange-format')" v-model="value" @on-change="onChange"></datetime-range> -->
      <!-- <div> <input type="date" :value="Date.now()"/></div> 
      -->
      <div class="DateCheck" style="height:48px">
        <datetime
          v-model="starttime"
          placeholder="开始时间"
          style="display:inline-block;"
          @on-change="changeStart"
        ></datetime>
        <datetime
          v-model="endtime"
          placeholder="结束时间"
          style="display:inline-block;"
          @on-change="changeEnd"
        ></datetime>
      </div>
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr style="background-color: #262630;height: 48px;color:#fff">
            <th>日期</th>
            <th>投注次数</th>
            <th>投注总额</th>
            <th>彩票盈亏</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in childrenList"
            :key="index"
            style="font-size: 15px"
            @click.stop="goRechargeReport(item.profitDate)"
          >
            <td>{{dateFormat(new Date(item.profitDate), "YYYY-MM-DD")}}</td>
            <td>{{item.betCount}}</td>
            <td>{{item.totalBetAmt}}</td>
            <td>{{item.profitAmt}}</td>
          </tr>
          <tr style="background-color: #262630;height: 48px;color:#fff">
            <th style="background-color:red">总计</th>
            <th>{{sumbetCount}}</th>            
            <th>{{sumTotalAmt}}</th>
            <th>{{sumTotalprofitAmt}}</th>
          </tr>
        </tbody>
      </x-table>
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
  data() {
    return {
      formData: {        
        startDate: "",
        endDate: "",        
      },
      loading: false,
      childrenList: [],
      totalSize: 0,
      selectItemData: [],
      starttime: "",
      endtime: "",
      sumbetCount:"",
      sumTotalAmt:"",
      sumTotalprofitAmt:""
    };
  },
  created() {   
    this.endtime = this.dateFormat(new Date(Date.now()), "YYYY-MM-DD");
    this.starttime = this.getDateRange(this.endtime, false);
    this.formData.startDate=this.starttime.replace(/-/g,"/")+" 00:00:00"
    this.formData.endDate=this.endtime.replace(/-/g,"/")+" 23:59:59"
     this.getChangeDetail();
  },
  methods: {
    getChangeDetail() {
      this.loading = true;      
      this.$api.post("/myAcctChangeDetail", this.formData).then(data => {
        this.loading = false;
        if (data.success) {
          this.childrenList = data.list;      
          // if(this.childrenList!=false)this.sumbetCount=data.list.reduce((el1,el2)=>el1.betCount+el2.betCount)          
          const t=data.t
          if(!!t){
          this.sumbetCount=t.betCount;
          this.sumTotalAmt=t.totalBetAmt;
          this.sumTotalprofitAmt=t.profitAmt
          }else{
            this.sumbetCount=0;
            this.sumTotalAmt=0;
            this.sumTotalprofitAmt=0
          }
      
        } else {
          this.$dialog({
            title: "提示",
            message: data.msg
          });
        }
      });
    },
    changeStart() {
      this.endtime = this.getDateRange(this.starttime, true);
    this.formData.startDate=this.starttime.replace(/-/g,"/")+" 00:00:00"
    this.formData.endDate=this.endtime.replace(/-/g,"/")+" 23:59:59"
       this.getChangeDetail();
    },
    changeEnd() {
      this.starttime = this.getDateRange(this.endtime, false);
    this.formData.startDate=this.starttime.replace(/-/g,"/")+" 00:00:00"
    this.formData.endDate=this.endtime.replace(/-/g,"/")+" 23:59:59"
       this.getChangeDetail();
    },

    getDateRange(date, isAdd) {
      let dates;
      date = Date.parse(new Date(date));
      const day = 1000 * 60 * 60 * 24;
      if (isAdd) {
        dates = date + 6 * day;
      } else {
        dates = date - 6 * day;
      }
      dates = this.dateFormat(new Date(dates), "YYYY-MM-DD");
      return dates;
    },
    dateFormat(date, fmt = "YYYY-MM-DD HH:mm:ss") {
      var o = {
        "M+": date.getMonth() + 1,
        "D+": date.getDate(),
        "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
      };
      var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
      };
      if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (RegExp.$1.length > 1
            ? RegExp.$1.length > 2
              ? "\u661f\u671f"
              : "\u5468"
            : "") + week[date.getDay() + ""]
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },

    goRechargeReport(name) {
      this.$router.push({ name: "profitLoss", params: { date: name } });
    },
  },
  mounted() {}
};
</script>
<style scoped>
@import "../../assets/header.css";
    .contentbox1 {
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
</style>
<style>
</style>
