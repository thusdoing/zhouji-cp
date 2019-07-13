
<style lang="less">
.sj { font-size: 0; }
.sj img { vertical-align: middle;height: 20px; }
</style>

<template>
  <div class="sj">
    <img :src="timers[item]" v-for="(item, index) in hourArr" :key="index"/>
    <img :src="f"/>
    <img :src="timers[minArr[0]]"/>
    <img :src="timers[minArr[1]]"/>
    <img :src="f"/>
    <img :src="timers[secArr[0]]"/>
    <img :src="timers[secArr[1]]"/>
  </div>
</template>
<script>
const timers = [
  require('assets/images/timers/0.png'),
  require('assets/images/timers/1.png'),
  require('assets/images/timers/2.png'),
  require('assets/images/timers/3.png'),
  require('assets/images/timers/4.png'),
  require('assets/images/timers/5.png'),
  require('assets/images/timers/6.png'),
  require('assets/images/timers/7.png'),
  require('assets/images/timers/8.png'),
  require('assets/images/timers/9.png')
];
const f = require('assets/images/timers/f.png')
const gf = require('assets/images/timers/gf.png')
const timersGreen = [
  require('assets/images/timers/g0.png'),
  require('assets/images/timers/g1.png'),
  require('assets/images/timers/g2.png'),
  require('assets/images/timers/g3.png'),
  require('assets/images/timers/g4.png'),
  require('assets/images/timers/g5.png'),
  require('assets/images/timers/g6.png'),
  require('assets/images/timers/g7.png'),
  require('assets/images/timers/g8.png'),
  require('assets/images/timers/g9.png')
];
const C_SECOND_TIME = 1000;
const C_MINUTE_TIME = C_SECOND_TIME * 60;
const C_HOVER_TIME = C_MINUTE_TIME * 60;
const C_DAY_TIME = C_HOVER_TIME * 24;

// endTime 传入的时间
// wacther 传入的时间戳 （取本地时间戳）
// endTimeFun 倒计时结束后的回调
// <countDownTime :endTime="endTime" :wacther="wacther" :callback="endTimeFun"></countDownTime>
export default {
  name: 'BetLotteryPanelCDT',
  data () {
    return {
      content: '',
      day: 0, // 天
      hour: 0, // 时
      min: 0, // 分
      sec: 0, // 秒
      hourArr: [0, 0], // 小时
      minArr: [0, 0], // 分 截取数组
      secArr: [0, 0], // 秒 截取数组
      stop: 0, // 0打开  1关闭
      timer: null,
      timers:timers,
      f:f
    };
  },
  props: {
    endTime: { type: [String, Number], default: '' },
    endText: { type: String, default: '已结束' },
    wacther: null,
    callback: { type: Function | String, default: '' },
    gameType:null
  },
  computed: {
  },
  mounted () {
    if (this.endTime && this.endTime > 0) {
      this.countdowm(this.endTime);
    }
  },
  created() {
    if(this.gameType=='22'){
      this.timers = timersGreen
      this.f = gf
    }
  },
  methods: {
    countdowm (timestamp) {
      // let self = this;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        // let nowTime = new Date();
        // let endTime = new Date(timestamp * 1000);
        let t = timestamp*1000;      
        // let format = '00天00小时00分00秒`';
        if (t <= 0) {
          this.stop = 1;
          clearInterval(this.timer);
          this.$emit('onEnd');
          return;
        }
        if (timestamp >= 0) {
          this.day = Math.floor(t / C_DAY_TIME);
          this.hour = Math.floor(t / C_HOVER_TIME);
          this.min = Math.floor((t / C_MINUTE_TIME) % 60);
          this.sec = Math.floor((t / C_SECOND_TIME) % 60);
          let _hour = this.hour < 10 ? '0' + this.hour : this.hour;
          let _min = this.min < 10 ? '0' + this.min : this.min;
          let _sec = this.sec < 10 ? '0' + this.sec : this.sec;
          // format = `${this.day}天${_hour}小时${_min}分${_sec}秒`;
          if (this.min >= 0) { this.minArr = _min.toString().replace(/(.)(?=[^$])/g, '$1,').split(','); }
          if (this.sec >= 0) { this.secArr = _sec.toString().replace(/(.)(?=[^$])/g, '$1,').split(','); }
          if (this.hour >= 0) { this.hourArr = _hour.toString().replace(/(.)(?=[^$])/g, '$1,').split(','); }
          // if (timestamp <= 0) { clearInterval(this.timer); self._callback(); }
        }
        timestamp-=1;
        // self.content = format;
      }, 1000);
    }
  },
  destroyed () {
    clearInterval(this.timer);
  }
};
</script>
