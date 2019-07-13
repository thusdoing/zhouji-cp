import {
  XHeader,
  Drawer,
  Tab,
  TabItem,
  Popup
}
from 'vux'
import countDownTime from '../countDownTime/index.vue';
import openAwardRes from '../openAwardRes/index.vue';
import {ball} from '@/components/openAwardRes/ball.js'
export default {
  components: {
    XHeader,
    Drawer,
    Tab,
    TabItem,
    Popup,
    countDownTime,
    openAwardRes
  },
  data() {
    return {
      // 是否停售，2018年8月31日
      isStopSell: false,

      endTime: 0, //倒计时时间
      wacther: '', //倒计时监听
      endText: '剩余投注时间：', //倒计时文本显示
      gameOpenNos: null,
      gameOpenNoList: [], //存放开奖号码
      showPlay: false, //控制玩法显示隐藏
      drawerVisibility: false,
      getGameNextOpenNodata: {},
      historyList: [],
      showModeValue: 'push',
      isOffical: true,
      showPlacementValue: 'right',
      ReactCollapse: false,
      dataOffica: [], //官方玩法数据
      dataCredit: [], //信用玩法数据
      groupConesOffica: [], //官方小玩法数据
      groupConesCredit: [], //信用小玩法数据
      bigDataIndex: 0, //默认选择第一个大玩法 官方
      smallIndexWarp: 0, //默认选择第一个小玩法 官方
      smallIndexWarpName: '', //默认选择第一个小玩法 官方的名称
      smallIndexInner: 0, //默认选择第一个小玩法 官方
      creditIndex: null, //默认选择第一个小玩法 信用
      groupClassNo: '', //玩法编号
      // moneyModel: 0,
      gameMenu: false, //控制游戏菜单显示
      ssgSelItem: {},
      getGameList: [],
      rememberIndex: 0, //记忆选中的玩法下标
      changeSettings: null, //监听settings 的变化状态
      acctAmt: '0.00元', //用户金额
      custName: '', //用户名,
      lhcObj:{},
      lhcrememberIndex:0,
      ball:ball
    }
  },
  created() {
    this.initData();
  },
  mounted(){
    
  },
  methods: {
    initData() {
      if (this.$route.name == "officaPlay") {
        this.creditIndex = null;
        this.isOffical = true;
      } else if (this.$route.name == "creditPlay") {
        this.bigDataIndex = null;
        this.smallIndexWarp = null;
        this.smallIndexInner = null;
        this.rememberIndex = null;
        this.creditIndex = 0;
        this.isOffical = false;
      }
      this.getWithGroupCreditPlay(1);
      this.getGameNextOpenNo()
      // this.getGameLatestOpenNo();
      this.getGameLatestOpenNoList();
      this.getGame();
      this.getAcct();
    },
    endTimeFun() {
      this.getGameNextOpenNo();
    },
    //查询账户消息
    async getAcct() {
      
      const { isOk, data } = await this.$store.dispatch('author/fetchAcct');
      if (!isOk || data.t == null) {
        this.ReactCollapse = true;
        return;
      }

      let acctAmt = data.t ? data.t.acctAmt : '0.00';
      this.custName = data.t ? data.t.custName : '';
      let str = acctAmt.toString().slice(0, acctAmt.toString().indexOf('.'));
      if (str.length >= 5) { //十万
        this.acctAmt = (Number(this.$asmd.numDiv(acctAmt, 10000))).toFixed(2) + '万元';
      } else {
        this.acctAmt = Number(acctAmt) + '元';
      }
      // this.$http({
      //     method: 'get',
      //     url: '/getAcct',
      //   })
      //   .then(response => {
      //     let data = response.data;
      //     let acctAmt = data.t ? data.t.acctAmt : '0.00';
      //     this.custName = data.t ? data.t.custName : '';
      //     let str = acctAmt.toString().slice(0, acctAmt.toString().indexOf('.'));
      //     if (str.length >= 5) { //十万
      //       this.acctAmt = (Number(this.$asmd.numDiv(acctAmt, 10000))).toFixed(2) + '万元';
      //     } else {
      //       this.acctAmt = Number(acctAmt) + '元';
      //     }
      //   })
    },
    //1信用玩法
    getWithGroupCreditPlay(arg) {
      this.$http({
          method: 'get',
          url: '/getGameGroupByGameWithGroup',
          params: {
            gameNo: this.$route.params.gameNo,
            groupType: arg,
          }
        })
        .then(response => {
          if (response.data.success) {
            this.dataCredit = response.data.list;
            if (this.$route.name == "creditPlay") {
              this.groupConesOffica = [];
              this.ssgSelItem = response.data.list[0];
              this.smallIndexWarpName = response.data.list[0].groupClassName;
              this.changeSettings = new Date().getTime();
            }
          }
          this.getWithGroupOfficaPlay(0);
        })
    },
    //0官方玩法
    getWithGroupOfficaPlay(arg) {
      this.$http({
          method: 'get',
          url: '/getGameGroupByGameWithGroup',
          params: {
            gameNo: this.$route.params.gameNo,
            groupType: arg,
          }
        })
        .then(response => {
          if (response.data.success) {
            this.dataOffica = response.data.list;
            this.dataOffica.forEach(element => {
              element.groupClassCones.forEach(elt => {
                elt.groupSettinges.forEach((el) => {
                  this.$set(el, 'groupNameAlias', el.groupNameAlias ? el.groupNameAlias.split(',') : []);
                })
              })
            });
            if(response.data.list&&response.data.list.length>0){
              if (this.$route.name == "officaPlay") {
                this.groupConesOffica = this.dataOffica[this.$store.state.resultPlay.rememberIndex].groupClassCones;
                this.ssgSelItem = this.$store.state.resultPlay.ssgSelItem || response.data.list[0].groupClassCones[0].groupSettinges[0];
                this.smallIndexWarpName = this.$store.state.resultPlay.smallIndexWarpName || response.data.list[0].groupClassCones[0].groupClassConName+""+this.ssgSelItem.groupName;
                this.changeSettings = new Date().getTime();
              }
            }else{
              this.bigGameDataCredit(0,this.dataCredit[0]);
              if(this.$route.params.gameType == '66'){
                this.lhcSmallGameDataFun(0,0,this.dataCredit[0].groupClassCones[0].groupSettinges[0]);
              }
            }
          }
        })
    },
    // 查询游戏下一期情况(用于投注)
    getGameNextOpenNo() {
      this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameNextOpenNo',
          params: {
            gameNo: this.$route.params.gameNo
          }
        })
        .then(response => {
          let data = response.data;
          this.getGameNextOpenNodata = data.t;

          // 停售
          if(data.t.gameStatus=='2'){
            this.isStopSell = true;
          }
          let date = data.t.restTime || 0;
          this.endTime = date;
          this.wacther = new Date().getTime();
          if (data.t.restSaleTime<=0) {
            this.endText = '等待下一期投注';
            setTimeout(() => {
              this.getGameNextOpenNo();
            }, 1000);
          } else {
            if (date > 0) {
              this.endText = '期截止时间';
            } else {
              this.endTime = data.t.restSaleTime;
              this.endText = '距离开盘时间';
            }
            this.getGameLatestOpenNo()
          }
        })
    },
    // 获取开奖结果
    getGameLatestOpenNo() {
      // 防止页面离开后，定时器取值没有获取到gameNo
      if (!this.$route.params || !this.$route.params.gameNo) return;
      this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameLatestOpenNo',
          params: {
            gameNo: this.$route.params.gameNo
          }
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.gameOpenNos = data.t;
            // this.gameOpenNos.gameOpenNo = this.gameOpenNos.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",");
            this.gameOpenNoList = data.t ? data.t.gameOpenNo.split(",") : [];
            if((this.getGameNextOpenNodata.gameNumber-1)==data.t.gameNumber||this.getGameNextOpenNodata.gameNumber.toString().slice(0,-3)!=data.t.gameNumber.toString().slice(0,-3)){
              
            }else{
              if (this.getGameNextOpenNodata.restTime > 0) {
                  clearTimeout(this.lastId)
                  this.lastId = setTimeout(() => {
                      this.getGameLatestOpenNo()
                  }, 10000);
              }
            }
          } else {

          }
        })
    },
    // 查询游戏最新开奖结果列表(开奖历史)
    getGameLatestOpenNoList() {
      this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameLatestOpenNoList?showCase=true',
          params: {
            gameNo: this.$route.params.gameNo,
            size: 20
          }
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.historyList = data.list;
          }
        })
    },
    //查询所有游戏 
    getGame() {
      let _this = this
      this.$http({
          method: 'get',
          url: '/getGameTypeAll?gameMode=030001',
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.getGameList = data.list;
            for(let item of data.list){
                if(item.gameType ==_this.$route.params.gameType){
                    for(let item2 of item.gameSetting)
                        if(_this.$route.params.gameNo == item2.gameNo){
                            _this.$store.commit(this.$store.state.mutationType.SET_YJF,item2.gamePattern)
                        }
                }
            }
          }
        })
    },
    //切换 投注金额元 角 模式
    moneyModelFun(num) {
      // this.moneyModel = num;
      this.$store.commit(this.$store.state.mutationType.CHANGE_BETMODEL, {
        'betModel': num
      });
    },
    //切换 其他彩种
    menuPlayFun(gameType, gameNo, gameName) {
      this.$router.push(`/bet/${gameType}/${gameNo}/${gameName}/${this.$route.name}`);
      this.$router.go(0);
    },
    //切换大玩法 官方
    bigGameDataFun(index) {
      this.bigDataIndex = index;
      this.groupConesOffica = this.dataOffica[index].groupClassCones;
    },
    //切换小玩法 官方
    SmallGameDataFun(smallIndexWarp, smallIndexInner, selItem) {
      this.creditIndex = null;
      this.smallIndexWarp = smallIndexWarp;
      this.smallIndexInner = smallIndexInner;
      this.ssgSelItem = selItem;
      this.showPlay = false;
      this.changeSettings = new Date().getTime();
      this.rememberIndex = this.bigDataIndex;
      this.smallIndexWarpName = this.groupConesOffica[smallIndexWarp].groupClassConName+""+this.groupConesOffica[smallIndexWarp].groupSettinges[smallIndexInner].groupName;
      this.$store.commit(this.$store.state.mutationType.CHANGE_RESULTPLAY, {
        resultPlay: {
          rememberIndex:this.bigDataIndex,
          smallIndexWarp: smallIndexWarp,
          smallIndexInner: smallIndexInner,
          smallIndexWarpName: this.smallIndexWarpName,
          ssgSelItem:selItem
        }
      })
      this.$router.push(`/bet/${this.$route.params.gameType}/${this.$route.params.gameNo}/${this.$route.params.gameName}/officaPlay`);
    },
    //切换大玩法 信用
    bigGameDataCredit(index, selItem) {
      this.changeSettings = new Date().getTime();
      this.smallIndexWarp = null;
      this.smallIndexInner = null;
      this.rememberIndex = null;
      this.creditIndex = index;
      this.ssgSelItem = selItem;
      this.showPlay = false;
      this.smallIndexWarpName = this.dataCredit[index].groupClassName;
      this.$router.push(`/bet/${this.$route.params.gameType}/${this.$route.params.gameNo}/${this.$route.params.gameName}/creditPlay`);
    },


    //六合彩专用
    lhcBigGameDataCredit(index){
      this.creditIndex = index
    },
    lhcSmallGameDataFun(smallIndexWarp, smallIndexInner, selItem){
      this.changeSettings = new Date().getTime();
      this.smallIndexWarp = smallIndexWarp;
      this.smallIndexInner = smallIndexInner;
      this.lhcrememberIndex = this.creditIndex; 
      this.lhcObj = selItem;
      this.smallIndexWarpName = this.dataCredit[this.creditIndex].groupClassName+'-'+this.dataCredit[this.creditIndex].groupClassCones[smallIndexWarp].groupSettinges[smallIndexInner].groupName;
      this.showPlay = false;
    }

  },
  watch: {
    showPlay(v) {
      if (v) {
        
        if(this.$route.params.gameType=='66'){
          this.creditIndex = this.lhcrememberIndex
        }else{
            this.bigDataIndex = this.rememberIndex = this.$store.state.resultPlay.rememberIndex;
            if (this.smallIndexInner != null) { //判断是否有选择的 官方玩法 这里是有
              this.isOffical = true;
              this.smallIndexWarp = this.$store.state.resultPlay.smallIndexWarp;
              this.smallIndexInner = this.$store.state.resultPlay.smallIndexInner;
              this.groupConesOffica = this.dataOffica[this.$store.state.resultPlay.rememberIndex].groupClassCones;
            } else {
              this.groupConesOffica = [];
              this.isOffical = false;
            }
        }
        
        

      }
    },
    isOffical(v) {
      if (v) {
        this.bigDataIndex = this.rememberIndex;
        if (this.creditIndex == null) { //判断是否有选择的 信用玩法 这里是无
          this.groupConesOffica = this.dataOffica[this.rememberIndex].groupClassCones;
        } else {
          this.groupConesOffica = [];
        }
      }
    },
    $route(to, from) {
    //  this.$router.go(0)
    }
  },
  computed:{
    moneyModel:function(){
      return this.$store.state.betModel || 0
    }
  }
}
