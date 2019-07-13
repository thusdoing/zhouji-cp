// 信用玩法
import stopSell from '../stopSell.vue'; //停止出售 模态框
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Group ,XNumber,ButtonTab, ButtonTabItem} from 'vux'
import lhd from './sscCredit/lhd/index.vue'; //龙虎斗
import lhzh from './sscCredit/lhzh/index.vue'; //龙虎整合
import lhq5z1 from './sscCredit/lhq5z1/index.vue'; //龙虎全5中1
import dxsb from './fsCredit/dxsb/index.vue'
export default {
  components:{
    XNumber,Group,swiper,swiperSlide,ButtonTab, ButtonTabItem,stopSell,
    lhd,lhzh,lhq5z1,dxsb,
  },
  data() {
    const playkindFunIndex_ = function(){
      let playkindFunIndex = localStorage.getItem('playkindFunIndex');
      playkindFunIndex =  typeof playkindFunIndex == 'object' || playkindFunIndex =='null' || playkindFunIndex ==null ? '{ "_index": 0, "index": 0 }' : playkindFunIndex;
      return JSON.parse(playkindFunIndex);
    };
    return {  
      switch_show:true,
      avatorPath:'',//logo
      acctAmt:0,//账户余额
      kindCheckedNo:'',
      allGetProfit:0, //当前彩种奖金
      kindCheckedIndex:0, //彩种玩法下标
      playkindFunIndex:playkindFunIndex_(), //彩种玩法下标(小玩法  用于刷新定位)
      gameOpenNos:'',//最新一期开奖结果
      getGameNextOpenNodata:'',//查询游戏下一期情况(用于投注)
      getGameGroupByGameWithGroupdata:[

      ],//根据游戏查询所有有效游戏玩法(已分组)
      custName:sessionStorage.getItem('custName'),
      acctAmt:localStorage.getItem('acctAmt'),
      ssc:'', //用于异步加载js 防止玩法过多 加载缓慢（其实一个也大 也慢）
      autoplay:false,
      autoPause:true,
      audioSrc:'/static_pc/audio/10.ogg',
      historyList:[],//开奖历史
      clock:$('.your-clock').FlipClock(0), 
      algorithm:'',
      algorithmCode:'',//用来区分 是否是点击在 当前玩法
      RefreshPage:'',//刷新当前页
      otherTicket:[],
      openNames:'1',
      countDownAjax:null, //轮询调用下一期
      stopSellData:false,//停售遮罩变量
      residueText:'剩余投注时间',
      OnlineUser:0, //在线人数
    }
  },
  computed: {
    hourFun(){
      let date = new Date(),
      hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minute  = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let span='';
      if(hour < 6){span="凌晨"} 
      else if (hour < 9){span="早上"+hour+':'+minute } 
      else if (hour < 12){span="上午"+hour+':'+minute } 
      else if (hour < 14){span="中午"+hour+':'+minute } 
      else if (hour < 17){span="下午"+hour+':'+minute } 
      else if (hour < 19){span="傍晚"+hour+':'+minute } 
      else if (hour < 22){span="晚上"+hour+':'+minute } 
      return span;
    },
    GameData() {
      return this.getGameGroupByGameWithGroupdata.find((el) => {
          return el.groupClassNo == '0011'
      })
    },
  },
  created() {
    console.log(stopSell)
    this.getBannerConfig();
    this.getAcct();
    this.getGameLatestOpenNo();
    this.getGameNextOpenNo();
    this.getGameGroupByGameWithGroup();
    this.getGameLatestOpenNoList();
    this.getGameNotNo();
    // this.getOnlineUser();
  },
  methods:{
      //获取用户在线人数
      // getOnlineUser(){
      //   this.$http({
      //     method: 'get',
      //     url: '/getOnlineUser',
      //   })
      //   .then(response => {
      //     let data = response.data;
      //     if(data.success){
            
      //     }else{

      //     }
      //   })
      //   .catch(error => {
          
      //   })
      // },
    mul(){  //解决JS 精度问题 乘法
      let m=0,s2='',strArr = 1;
      for(let i =0;i<arguments.length;i++){
        if(arguments[i].toString().indexOf('.')>0){
          m+= arguments[i].toString().split(".")[1].length;
          arguments[i] = Number(arguments[i].toString().replace(".",""));
        }
        strArr*=Number(arguments[i]);  
      }
      return strArr/Math.pow(10,m);
    } ,
    sub(num1,num2){  //解决JS 精度问题(减法)
      let baseNum, baseNum1, baseNum2;
      let precision;// 精度
      try {
        baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
        baseNum1 = 0;
      }
      try {
        baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
        baseNum2 = 0;
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
      precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
      return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    } ,
    //c除法
    numDiv(num1, num2) {
      var baseNum1 = 0, baseNum2 = 0;
      var baseNum3, baseNum4;
      try {
          baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
          baseNum1 = 0;
      }
      try {
          baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
          baseNum2 = 0;
      }
      baseNum3 = Number(num1.toString().replace(".", ""));
      baseNum4 = Number(num2.toString().replace(".", ""));
      return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    },
    creditBet(){
      this.$router.push('/bet/'+this.$route.params.gameType+'/'+this.$route.params.gameNo);
    },
    //退出登录
    loginOut () {
      let _this = this;
      _this.$Modal.confirm({
        content:'是否退出登录 ',
        onOk:function(){
          localStorage.clear();
          sessionStorage.clear();
          _this.$http({
            method: 'get',
            url:'/loginOut',
          })
          .then(response => {
            let data = response.data;
            if(data.success){
              localStorage.clear();
              sessionStorage.clear();
              _this.$router.push('/homeView')
            }
          })
          .catch(error => {
    
          })
        }
      })
    },
    //根据游戏查询所有有效游戏玩法(已分组)
    getGameGroupByGameWithGroup () {
      this.$http({
          method:'get',
          url:'/getGameGroupByGameWithGroup',
          params:{
              gameNo:this.$route.params.gameNo,
              groupType: 1
          }
      })
      .then(response => {
          let gameNuberCode = localStorage.getItem('sscCreditGameNo')
          if(response.data.success){ 
              let kind = ''; 
              this.getGameGroupByGameWithGroupdata = response.data.list
              
              if (gameNuberCode) {
                  for (var i=0; i<this.getGameGroupByGameWithGroupdata.length; i++) {
                      if (this.getGameGroupByGameWithGroupdata[i].groupClassNo == gameNuberCode) {
                          this.kindCheckedIndex = i
                          this.kindCheckedNo = this.getGameGroupByGameWithGroupdata[i].groupClassNo
                          break
                      }
                  }
              }
              else {
                  this.kindCheckedIndex = 0
                  this.kindCheckedNo = this.getGameGroupByGameWithGroupdata[0].groupClassNo
                  localStorage.setItem('sscCreditGameNo', this.getGameGroupByGameWithGroupdata[0].groupClassNo)
              }
          }else{

          }
      })
      .catch(error => {

      })
    },
    GameDatas(kindCheckedNo) {
      return this.getGameGroupByGameWithGroupdata.find((el) => {
          return el.groupClassNo == kindCheckedNo
      })
    },
    //玩法列表
    kindbarList(item,index){
      this.kindCheckedIndex = index;
      localStorage.setItem('kindCheckedIndex',index);
      let playkindFunIndex = {_index:0,index:0};
      this.playkindFunIndex =playkindFunIndex;
      this.allGetProfit = this.getGameGroupByGameWithGroupdata[this.kindCheckedIndex].groupClassCones[this.playkindFunIndex._index].groupSettinges[this.playkindFunIndex.index].bonusAmt;
      localStorage.setItem('playkindFunIndex',JSON.stringify(playkindFunIndex));
      $('.play-item-list-panel .play_kind_list').removeClass('active').eq(0).addClass('active');
      let kind = this.getGameGroupByGameWithGroupdata[index].groupClassNo //默认选择第一条数据
      localStorage.setItem('sscCreditGameNo',kind);
      this.algorithmCode = kind;
      this.kindCheckedNo = kind;
      this.GameDatas(kind);
    },
    //查询banner的log、和背景图配置
    getBannerConfig(){
      this.$http({
        methods: 'get',
        url: '/getBannerConfig'
      }).then((ret) => {
        let data = ret.data;
        if(data.success){
          this.avatorPath =data.list.find((item)=> {if(item.imgType == '010401') return item}).imgPath;  
        }
      }) 
    },
    //查询账户消息
    getAcct(){
      let _this = this;
      // axios({ method: 'get', url: '/getAcct'})
      this.$store.dispatch('debounce/fetchAcct').then(response => {
        let data = response.data;
        let acctAmt = data.t.acctAmt;
        this.jsAcctAmt =  data.t.acctAmt;
        let str = acctAmt.toString().slice(0,acctAmt.toString().indexOf('.'));
        if(str.length>=5){ //十万
          _this.acctAmt  =  (Number(this.numDiv(acctAmt,10000))).toFixed(2)+'万';
        }else{
          _this.acctAmt  = Number(acctAmt);
        }
      })
      .catch(error => {

      })
    },
    // 获取开奖结果
    getGameLatestOpenNo(){
      let _this = this;
      _this.$http({
        method: 'get',
        url:'/gameOpenNo/getGameLatestOpenNo',
        params:{
          gameNo:_this.$route.params.gameNo
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          this.gameOpenNos = data.t;
          // this.gameOpenNos.gameOpenNo = this.gameOpenNos.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",");
          this.gameOpenNos.gameOpenNo = this.gameOpenNos.gameOpenNo.split(",");
        }else{

        }
      })
      .catch(error => {

      })
    },
    // 查询游戏下一期情况(用于投注)
    getGameNextOpenNo() {
      // clearInterval(this.countDownAjax);
      if (!this.$route.params || !this.$route.params.gameNo) return;
      let _this = this;
      _this.$http({
        method: 'get',
        url: '/gameOpenNo/getGameNextOpenNo',
        params: {
          gameNo: _this.$route.params.gameNo
        }
      })
        .then(response => {
          let data = response.data;
          this.getGameNextOpenNodata = data.t;
          if(data.t.gameStatus=='2'){ //停售
            this.stopSellData = true;
          }
          this.clockDown(data);
          if (''+data.t.gameNumber == 'null') {
            setTimeout(()=>{
              this.getGameNextOpenNo();
            },20000);
          } else {
          }
        })
        .catch(error => {

        })
    },
    //倒计时
    clockDown(data) {
      let _this = this;
      let audioArr = [
        '/static_pc/audio/1.ogg',
        '/static_pc/audio/2.ogg',
        '/static_pc/audio/3.ogg',
        '/static_pc/audio/4.ogg',
        '/static_pc/audio/5.ogg',
        '/static_pc/audio/6.ogg',
        '/static_pc/audio/7.ogg',
        '/static_pc/audio/8.ogg',
        '/static_pc/audio/9.ogg',
        '/static_pc/audio/10.ogg',
      ];
      let date = data.t.restTime;
      if(''+data.t.gameNumber == 'null'){
        _this.$refs.residueText.innerText = '等待下一期投注';
      }else{
        if (date > 0) {
          _this.$refs.residueText.innerText = '剩余投注时间';
        } else {
          date = data.t.restSaleTime;
          _this.$refs.residueText.innerText = '距离开盘时间';
        }
      }
      this.$nextTick(() => {
        _this.clock = $('.your-clock').FlipClock(+date, {
          clockFace: 'HourMinuteCounter',
          countdown: true,
          autoStart: false,
          callbacks: {
            interval: function () {
              if (_this.autoPause) {
                if (_this.clock.getTime().time < 10&&data.t.restTime>0) {
                  if(_this.clock.getTime().time <= 0){
                    _this.$Modal.warning({
                      content: '当前期数投注截止',
                    });
                  }
                  _this.audioSrc = audioArr[_this.clock.getTime().time];
                  _this.$refs.autoplay.load();
                  _this.$refs.autoplay.play();
                }
              } else {
                _this.$refs.autoplay.pause();
              };
              if (_this.clock.getTime().time <= 0) {
                _this.$refs.autoplay.pause();
                _this.$refs.residueText.innerText = '距离开盘时间';
                _this.getGameNextOpenNo();
                _this.getGameLatestOpenNo();
                if (data.t.restTime <= 0) {
                  _this.RefreshPage = setTimeout(function () {
                    console.warn(222222222222222222);
                    // window.location.reload();
                  }, 3000)
                }
              };
            }
          }
        });
        _this.clock.start();
      })
    },
    //查询其他彩票
    getGameNotNo(){
      this.$http({
        method:'get',
        url:'/getGameTypeAll',
        params:{
          gameMode:'030002'
        },
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          this.otherTicket = data.list;
          this.openNames = this.$route.params.gameType;
          this.$nextTick(() => {
            this.$refs.side_menu.updateOpened();
          })
        }else{

        }
      })
      .catch(error => {

      })
    },
    //点击其他彩票 跳转刷新
    otherTicketFun(name){
      localStorage.removeItem('gameNuberCode');
      let playkindFunIndex = {_index:0,index:0};
      localStorage.setItem('playkindFunIndex',JSON.stringify(playkindFunIndex));
      this.$router.push('/creditBet/'+name);
      this.$router.go(0)
    },
    // 查询游戏最新开奖结果列表(开奖历史)
    getGameLatestOpenNoList(){
      let _this = this;
      _this.$http({
        method: 'get',
        url:'/gameOpenNo/getGameLatestOpenNoList',
        params:{
          gameNo:_this.$route.params.gameNo,
          size:8
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          if(data.list.length>0){
            this.historyList = data.list;
          }
        }else{

        }
      })
      .catch(error => {

      })
    }, 
  },
}