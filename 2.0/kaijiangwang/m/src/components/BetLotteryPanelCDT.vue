<template>
  <div>
    <template v-if="isOpenCode">
    <i data-v-62519dfa v-if="hour>0">
      <i data-v-62519dfa class="redTime">{{hour}}</i>:
    </i>
    <i data-v-62519dfa>
      <i data-v-62519dfa class="redTime">{{min}}</i>:
    </i>
    <i data-v-62519dfa>
      <i data-v-62519dfa class="redTime">{{sec}}</i>
    </i>
    </template>
  <template v-else>
    <i data-v-62519dfa>
      <i data-v-62519dfa class="redTime">开奖中…</i>
    </i>
    </template>

  </div>
</template>
<script>
const C_SECOND_TIME = 1000;
const C_MINUTE_TIME = C_SECOND_TIME * 60;
const C_HOVER_TIME = C_MINUTE_TIME * 60;
const C_DAY_TIME = C_HOVER_TIME * 24;
export default {
  data() {
    return {
      endTime: "",
      content: "",
      day: 0, // 天
      hour: 0, // 时
      min: 0, // 分
      sec: 0, // 秒
      hourArr: [0, 0], // 小时
      minArr: [0, 0], // 分 截取数组
      secArr: [0, 0], // 秒 截取数组
      stop: 0, // 0打开  1关闭
      timer: null,
      timer2: null,
      gameNumber: "",
      startUpdate: false,
      isOpenCode:true
    };
  },
  props: {
    gameNo: { type: String, default: "" },
    suoyin: { type: Number, default: 0 }
  },
  methods: {
    countdowm(timestamp) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {       
        let t = timestamp * 1000;
        if (t > 0) {
          this.day = Math.floor(t / C_DAY_TIME);
          this.hour = Math.floor(t / C_HOVER_TIME);
          this.min = Math.floor((t / C_MINUTE_TIME) % 60);
          this.sec = Math.floor((t / C_SECOND_TIME) % 60);
          this.hour = ("0" + this.hour).slice(-2);
          this.min = ("0" + this.min).slice(-2);
          this.sec = ("0" + this.sec).slice(-2);
        }else{
          clearInterval(this.timer);
          this.startUpdate = true;
          this.isOpenCode=false
          // this.getGameBonusByGroupNoCache();
          return;
        }        
        timestamp -= 1;
      }, 1000);
    },
    codeUpdate() {
      if (this.startUpdate == true) {
        clearInterval(this.timer2);
        this.$emit("showLoad", this.suoyin);
        this.timer2 = setInterval(async () => {         
          const rsp = await this.$tools
            .fetch(
              "/api/getGameLatestOpenNo?gameNo=" + this.gameNo + "&showCase=s"
            )
            .get();
          if (!rsp.success) return undefined;
          let caiZhongData = rsp.data.list[0];
          this.gameNumber = caiZhongData.gameNumber;
          let oldCaiZhong = JSON.parse(localStorage.getItem("caizhong"));
          if (this.gameNumber != oldCaiZhong[this.suoyin].gameNumber) {
            clearInterval(this.timer2);
            this.startUpdate = false;
            oldCaiZhong[this.suoyin] = caiZhongData;
            oldCaiZhong=oldCaiZhong.concat([])
            this.toCalcCountDown(caiZhongData);        
            localStorage.setItem("caizhong", JSON.stringify(oldCaiZhong));
            this.$emit("showData", this.suoyin);
            this.isOpenCode=true
          }
        }, 5000);
      }
    },
    async toCalcCountDown(rsp) {
      const { restTime, restSaleTime } = rsp;
      let time=Number(restSaleTime)+Number( restTime)
      if(time==0){
        this.endTime=restTime}else{
           this.endTime =time ;
      }
      clearInterval(this.timer);
      this.countdowm(this.endTime);
    
    },
    async getGameBonusByGroupNoCache() {
      const rsp = await this.$tools
        .fetch("/api/getGameLatestOpenNo?gameNo=" + this.gameNo + "&showCase=s")
        .get();
      if (!rsp.success) return undefined;
      let caiZhongData = rsp.data.list[0];
      this.toCalcCountDown(caiZhongData);
    }
  },
  destroyed() {
    this.startUpdate=false
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },
  watch: {
    // endTime: function() {
    //   clearInterval(this.timer);
    //   this.countdowm(this.endTime);
    // },
    startUpdate: function() {
      if (this.startUpdate == true) {
        this.codeUpdate();  
        
      } 
    }
  },
  mounted() {
    this.getGameBonusByGroupNoCache();
  }
};
</script>

<style scoped>
div {
  display: inline;
  color: red;
  font-size: 0.25rem
}
</style>
