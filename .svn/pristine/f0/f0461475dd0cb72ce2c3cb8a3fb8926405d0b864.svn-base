import '@/assets/js/flipclock/flipclock.min.js'
import '@/assets/js/flipclock/flipclock.min.css'
import officeUrl from './officeUrl'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper';
import {getOpenBall,pcddball} from './ball.js'
import 'swiper/dist/css/swiper.css';
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      officeUrl:officeUrl,
      gameNumber:null,
      randemarr:[],
      timeID:null,
      changArrID:null,
      flagAnimete:false,
      clock: '', //计时时间
      getGameNextOpenNodata: [],
      gameOpenNos: null,
      otherTicket: [],
      headerOpen: false,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        slidesPerGroup: 3,
        navigation: {
          nextEl: '.right-arrow',
          prevEl: '.left-arrow'
        }
      },
      jztz:false,
      jzqh:"",
      residueText: '期投注截止还有',
      ball:[],
      pcddball:pcddball
    }
  },
  created(){
    this.randemarr = [1,1,1].map(item=>{
      return Math.ceil(Math.random()*6)
    })
  },
  mounted() {
    this.getGameNextOpenNo();
    this.getGameNotNo();
  },
  methods: {
    onOpenSM (gameType) {
        window.open('#/lotteryRules/'+gameType)
    },
    //倒计时
    clockDown(data) {
      let _this = this;
      let date = data.t.restTime || 0;
      if ('' + data.t.gameNumber == 'null') {
        _this.residueText = '等待下一期投注';
      } else {
        if (date > 0) {
          _this.residueText = '期投注截止还有';
        } else {
          date = data.t.restSaleTime;
          _this.residueText = '距离开盘时间';
        }
      }
      this.$nextTick(() => {
        this.clock = $('.your-clock').FlipClock(+date, {
          clockFace: 'HourMinuteCounter',
          countdown: true,
          autoStart: false,
          callbacks: {
            interval: () => {
              if ((0<_this.clock.getTime().time < 10) && (data.t.restTime > 0)) {
                if (_this.clock.getTime().time <= 0) {
                  _this.jztz = true
                  _this.jzqh = data.t.gameNumber
                  setTimeout(() => {
                    _this.jztz = false
                  }, 5000);
                }
              }
              if (_this.clock.getTime().time <= 0) {
                clearInterval(_this.timeID)
                clearInterval(_this.changArrID)
                _this.residueText = '距离开盘时间';
                setTimeout(()=>{
                  _this.getGameNextOpenNo();
                },1000)
              };
            }
          }
        });
        this.clock.start();
      })
    },
    // 获取开奖结果
    getGameLatestOpenNo() {
      let _this = this;
      _this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameLatestOpenNo',
          params: {
            gameNo: _this.$route.params.gameNo
          }
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.gameOpenNos = data.t;
            this.ball = getOpenBall(this.gameOpenNos.gameOpenDt)
            this.gameOpenNos.gameOpenNo = this.gameOpenNos.gameOpenNo.split(",");
            // this.gameOpenNos.gameOpenNo = this.gameOpenNos.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",");
            this.gameNumber = this.gameNumber||data.t.gameNumber
            if((this.getGameNextOpenNodata.gameNumber-1)==data.t.gameNumber||this.getGameNextOpenNodata.gameNumber.toString().slice(0,-3)!=data.t.gameNumber.toString().slice(0,-3)){
                clearInterval(_this.timeID)
                clearInterval(_this.changArrID)
                this.flagAnimete = false
                this.$emit('updated',+new Date().getTime());
                this.$store.commit('yu_e')
                this.gameNumber = data.t.gameNumber
            }else{
              if (this.getGameNextOpenNodata.restTime > 0) {
                  clearInterval(_this.timeID)
                  clearInterval(_this.changArrID)
                  _this.timeID = setInterval(function(){
                    _this.getGameLatestOpenNo();
                  },10000)
                  _this.changArrID = setInterval(function(){
                    _this.randemarr = [1,1,1].map(item=>{
                      return Math.ceil(Math.random()*6)
                    })
                  },2000)
                  _this.flagAnimete = true
              }
            }
          }
        })
        .catch(error => {

        })
    },
    // 查询游戏下一期情况(用于投注)
    getGameNextOpenNo() {
      if (!this.$route.params || !this.$route.params.gameNo) return;
      this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameNextOpenNo',
          params: {
            gameNo: this.$route.params.gameNo
          }
        })
        .then(response => {
          let data = response.data;
          if(!data.success){
            this.$Modal.error({
              title:"系统提示",
              content:data.msg
            })
            return
          }
          this.$store.commit('setOpenTime',data.t.openGameDt)
          if(data.t.gameStatus=='2'){
              this.$store.commit('setisstop',true)
          }else{
            this.$store.commit('setisstop',false)
          }

          if(data.t.restSaleTime<=0){
            setTimeout(() => {
              this.getGameNextOpenNo();
            }, 1000);
            return
          }else{
            this.getGameLatestOpenNo()
          }
          this.getGameNextOpenNodata = data.t;
          this.clockDown(data);
        }).catch(()=>{
          setTimeout(() => {
            this.getGameNextOpenNo()
          }, 3000);
        })
    },
    //查询出自己以外的其他彩票
    getGameNotNo() {
      this.$http({
          method: 'get',
          url: '/getGameNotNo',
          params: {
            gameModel: '030001',
            gameNo: this.$route.params.gameNo,
            gameType: this.$route.params.gameType
          },
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.otherTicket = data.list;
          } else {

          }
        })
    },
    //点击其他彩票
    officialRouter(gameType, gameNo) {
      this.$router.push({path: `/bet/${gameType}/${gameNo}/${this.$route.name}`, query: {_t: Date.now() }, replace: true});
      // this.$router.go(0);
    },
    goOffice(){
      let url = ""
      try{
        url = this.officeUrl[this.$route.params.gameNo].url
        window.open(url)
      }
      catch(err){
        this.$Message.warning('非常抱歉，暂时还没有收录当前游戏官网。');
      }

    }
  },
  beforeDestroy(){
    clearInterval(this.timeID)
    clearInterval(this.changArrID)
  },
  destroyed(){
    this.clock.stop();
  }
}
