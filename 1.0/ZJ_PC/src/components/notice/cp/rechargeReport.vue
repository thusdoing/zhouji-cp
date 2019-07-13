<style lang='less'>
.ivu-page-item-active {
  background-color: #c60a0a;
}
</style>
<template>
  <div>
    <div class="fl mb12 _2WJqO" style="width: 840px;">
      <p>盈亏查询</p>
    </div>
    <div class="_3wioq fl" style="width: 840px;">
      <ul class="_1KCWQ">
        <li class="gPVvn">
          <row>
            <span class="_2dqD4">日期：</span>
            <Date-picker
              type="date"
              style="width: 150px;font-weight:300;"
              :value="starttime"
              @on-change="handleChangeStart"             
            ></Date-picker>

            <Date-picker
              type="date"
              style="width: 150px;font-weight:300"
              :value="endtime"
              @on-change="handleChangeEnd"
            ></Date-picker>
            <i-button
              type="error"
              style="display:inline-block;margin-right:80px;margin-left: 20px;"
              @click="lookingfor"
            >查询</i-button>

            <div style="width: 239px; height: 60px; display:inline-block;margin-top:-12px;">
              <img class="fl" src="/static_pc/images/js.png" style="margin: 25px;">
              <div class="fl">
                <span
                  class="_3US5t"
                  style="display:block;height:10px; margin-top: 7px;  margin-bottom: 14px;"
                >盈亏计算公式</span>
                <span class="_3US5t _2UhIr" style="display:block;height:10px">中奖-投注+活动+返点</span>
              </div>
            </div>
          </row>
        </li>
      </ul>
      <div>
        <table width="100%" cellspacing="0" cellpadding="0">
          <thead class="_3apNX">
            <tr style="background-color: #262630;height: 48px;color:#fff">
              <th>日期</th>
              <th>投注次数</th>
              <th>投注总额</th>
              <th>彩票盈亏</th>
              <th>中奖金额</th>
              <th>活动礼金</th>
              <th>返点金额</th>
              <th>充值金额</th>
              <th>提现金额</th>
            </tr>
          </thead>
          <tbody class="-QUHL">
            <!-- <tr v-if="changerecordList.length==0">
              <td class="_32waq" colspan="8">
                <div v-if="loading" class="_1dJVz">
                  <div class="absolute center-margin">
                    <img class="_1VUC8" src="/static_pc/images/loading.gif">
                  </div>
                </div>
                <article v-if="!loading" class="_1dJVz">
                  <div class="absolute center-margin">
                    <img class="_1VUC8" src="/static_pc/images/ku.png">
                    <p>暂无记录</p>
                  </div>
                </article>
              </td>
            </tr>-->
            <tr v-for="(item, index) in childrenList" :key="index">
              <td>{{dateFormat(new Date(item.profitDate), "YYYY-MM-DD")}}</td>
              <td>{{item.betCount}}</td>
              <td>{{item.betAmt}}</td>
              <td>{{item.profitAmt}}</td>
              <td>{{item.winningAmt}}</td>
              <td>{{item.activityAmt}}</td>
              <td>{{item.betBackAmt}}</td>
              <td>{{item.totalRecharge}}</td>
              <td>{{item.withAmt}}</td>
            </tr>
            <tr style="background-color: #262630;height: 48px;color:red">
              <td style="background-color: red; color:#fff">总计</td>
              <td>{{sumbetCount}}</td>
              <td>{{sumTotalAmt}}</td>
              <td>{{sumTotalprofitAmt}}</td>
              <td>{{sumwinningAmt}}</td>
              <td>{{sumactivityAmt}}</td>
              <td>{{sumbetBackAmt}}</td>
              <td>{{sumtotalRecharge}}</td>
              <td>{{sumwithAmt}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="_2miUk cf"></div>
      <div class="Vxtwm _1pdcZ">
        <p>
          <img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：交易记录最多只保留7天。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        startDate: "",
        endDate: ""
      },
      loading: false,
      childrenList: [],
      totalSize: 0,
      selectItemData: [],
      starttime: "",
      endtime: "",
      sumbetCount: "", //有效投注
      sumTotalAmt: "", //投注总额
      sumTotalprofitAmt: "", //盈亏
      sumwinningAmt: "", //中奖金额
      sumactivityAmt: "", //活动礼金
      sumbetBackAmt: "",
      sumtotalRecharge: "",
      sumwithAmt: ""
    };
  },
  components: {},
  created() {
    this.endtime = this.dateFormat(new Date(Date.now()), "YYYY-MM-DD");
    this.starttime = this.getDateRange(this.endtime, false);
    this.formData.startDate = this.starttime.replace(/-/g, "/") + " 00:00:00";
    this.formData.endDate = this.endtime.replace(/-/g, "/") + " 23:59:59";
    this.getChangeDetail();
  },
  methods: {
    handleChangeStart(date) {
      this.starttime = date;
      this.endtime = this.getDateRange(this.starttime, true);
      this.formData.startDate = this.starttime.replace(/-/g, "/") + " 00:00:00";
      this.formData.endDate = this.endtime.replace(/-/g, "/") + " 23:59:59";
    },
    handleChangeEnd(date) {
      this.endtime = date;
      this.starttime = this.getDateRange(this.endtime, false);
      this.formData.startDate = this.starttime.replace(/-/g, "/") + " 00:00:00";
      this.formData.endDate = this.endtime.replace(/-/g, "/") + " 23:59:59";
    },
    lookingfor() {
      this.getChangeDetail();
    },
    getChangeDetail() {
      this.loading = true;
      axios.post("/myAcctChangeDetail", this.formData).then(data => {
        this.loading = false;
        if (data.data.success) {
          this.childrenList = data.data.list;          
          const t = data.data.t;
          if (!!t) {
            this.sumbetCount = t.betCount;
            this.sumTotalAmt = t.betAmt;
            this.sumTotalprofitAmt = t.profitAmt;
            this.sumwinningAmt = t.winningAmt;
            this.sumactivityAmt = t.activityAmt;
            this.sumbetBackAmt = t.betBackAmt;
            this.sumtotalRecharge = t.totalRecharge;
            this.sumwithAmt = t.withAmt;
          } else {
            this.sumbetCount = 0;
            this.sumTotalAmt = 0;
            this.sumTotalprofitAmt = 0;
            this.sumwinningAmt = 0;
            this.sumactivityAmt = 0;
            this.sumbetBackAmt = 0;
            this.sumtotalRecharge = 0;
            this.sumwithAmt = 0;
          }
        }
      });
    },

    getDateRange(date, isAdd) {
      let dates;
      date = Date.parse(new Date(date));
      const day = 1000 * 60 * 60 * 24;
      if (isAdd) {
        dates = date + 7 * day;
      } else {
        dates = date - 7 * day;
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
    }
  },
  mounted() {}
};
</script>
