<template>
  <div>
    <div class="sj">
      <img :src="`/static/countDown/timer${hourArr[0]}.png`">
      <img :src="`/static/countDown/timer${hourArr[1]}.png`">
      <img src="/static/countDown/timerColon.png">
      <img :src="`/static/countDown/timer${minArr[0]}.png`">
      <img :src="`/static/countDown/timer${minArr[1]}.png`">
      <img src="/static/countDown/timerColon.png">
      <img :src="`/static/countDown/timer${secArr[0]}.png`">
      <img :src="`/static/countDown/timer${secArr[1]}.png`">
    </div>
  </div>
</template>
<script>
  //endTime 传入的时间
  //wacther 传入的时间戳 （取本地时间戳）
  //endTimeFun 倒计时结束后的回调
  //<countDownTime :endTime="endTime" :wacther="wacther" :callback="endTimeFun"></countDownTime>   
  export default {
    data() {
      return {
        content: '',
        day: 0, //天
        hour: 0, //时
        min: 0, //分
        sec: 0, //秒
        hourArr:[0, 0],//小时
        minArr: [0, 0], //分 截取数组
        secArr: [0, 0], //秒 截取数组
        stop:0,//0打开  1关闭
        timer:null
      }
    },
    props: {
      endTime: {
        type: [String,Number],
        default: ''
      },
      endText: {
        type: String,
        default: '已结束'
      },
      wacther: null,
      callback: {
        type: Function,
        default: ''
      }
    },
    mounted() {
      if(this.endTime&&this.endTime>0){
        this.countdowm(this.endTime)
      }
    },
    methods: {
      countdowm(timestamp) {
        let self = this;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          let nowTime = new Date();
          let endTime = new Date(timestamp * 1000);
          let t = endTime;
          let format = '00天00小时00分00秒`';
          if (timestamp >= 0) {
            this.day = Math.floor(t / 86400000) > 0 ? Math.floor(t / 86400000) : 0;
            this.hour = Math.floor((t / 3600000)) > 0 ? Math.floor((t / 3600000)) : 0;
            this.min = Math.floor((t / 60000) % 60) > 0 ? Math.floor((t / 60000) % 60) : 0;
            this.sec = Math.floor((t / 1000) % 60) > 0 ? Math.floor((t / 1000) % 60) : 0;
            let _hour = this.hour < 10 ? "0" + this.hour : this.hour;
            let _min = this.min < 10 ? "0" + this.min : this.min;
            let _sec = this.sec < 10 ? "0" + this.sec : this.sec;
            format = `${this.day}天${_hour}小时${_min}分${_sec}秒`;
            if (this.min >= 0) {
              this.minArr = _min.toString().replace(/(.)(?=[^$])/g, "$1,").split(",")
            }
            if (this.sec >= 0) {
              this.secArr = _sec.toString().replace(/(.)(?=[^$])/g, "$1,").split(",")
            }
            if (this.hour >= 0) {
              this.hourArr = _hour.toString().replace(/(.)(?=[^$])/g, "$1,").split(",")
            }
            if(timestamp<=0) {
              clearInterval(this.timer);
              self._callback();
            }
          }
          timestamp--;
          self.content = format;
        }, 1000);
      },
      _callback() {
        if (this.callback && this.callback instanceof Function) {
          this.callback();
        }
      }
    },
    destroyed() {
      clearInterval(this.timer);
    },
    watch: {
      wacther() {
        if(this.endTime&&this.endTime>0){
          this.countdowm(this.endTime)
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  .sj {
    font-size: 0;
  }
</style>
