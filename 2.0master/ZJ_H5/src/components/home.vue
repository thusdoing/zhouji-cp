<style scoped>
@import "../assets/header.css";
.main-body {
  background-color: #eee;
  margin-bottom: 80px;
  padding-top: 4px;
}
.main-lider {
  margin: 4px;
  background-color: #fff;
  padding: 10px 0px;
}
.main-lider >>> .weui-grid {
  width: 25%;
  padding: 5px 0px;
}
.main-lider >>> .weui-grid:before {
  border-right: auto;
}
.main-lider >>> .weui-grid__icon {
  width: 45px;
  height: 45px;
}
.main-lider >>> .weui-grids:before {
  border-bottom: auto;
}
.main-lider >>> .weui-grids:after {
  border-top: auto;
}
.main-lider >>> .weui-grids:before {
  border-top: auto;
}
.main-lider >>> .weui-grid:before {
  border-bottom: auto;
}
.main-lider >>> .weui-grid:after {
  border-bottom-color: #fff;
}
.main-game {
  margin: 0 4px;
  background-color: #fff;
  padding-bottom: 40px;
}
.main-game .main-badge {
  position: absolute;
  top: 5px;
  right: 0px;
  background-color: #ec2829;
}
.main-game >>> .weui-grid__icon {
  width: 45px;
  height: 45px;
}
.main-game >>> .weui-grid {
  padding: 15px 10px;
}
.main-game >>> .weui-grid:before {
  border-right-color: #fff;
}
.main-game img {
  width: 45px;
  height: 45px;
}
.game-name {
  font-size: 14px;
  text-align: center;
}
.game-num {
  font-size: 12px;
  color: #9b9b9b;
  text-align: center;
}
.main-marquee {
  background-color: #fff;
  height: 25px;
  margin: 4px;
  border-radius: 10px;
}
.main-marquee .divi {
  background-color: #fff;
  width: 17px;
  height: 25px;
  position: absolute;
  z-index: 19;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>

<template>
    <div>
        <wv-header :title="$ENV.VUE_APP_NAME" class="header">
            <div @click="to_page('msgList')" class="w-60" slot="right">
                <img v-if="newmsg==0" src="/static/noMessage@2x.png" style="width:28px;height:28px;float:right;" slot="icon">
                <img v-else src="/static/newMessage@2x.png" style="width:28px;height:28px;float:right;" slot="icon">
            </div>
            <div class="login-btn w-60" slot="left">
                <wv-button v-if="isLogin || !$store.state.sessionUser" @click="to_page('loginview')" style="background:#ec2829;border-color:#ec2829;color: #fff;" :mini="true">登录</wv-button>
            </div>
        </wv-header>
        <wv-swipe :height="150" :autoplay="3000" :show-indicators="false" style="margin-top:44px;">
            <wv-swipe-item v-for="(item,index) in bannerList" v-if="item.imgType == '010402'" :key="index">
                <img :src="$imgPath(item.imgPath)" style="width:100%;height:150px;" />
            </wv-swipe-item>
        </wv-swipe>
        <div class="main-body">
            <div class="main-marquee">
                <div class="divi">
                    <i class="el-icon-bell"></i>
                </div>
                <marquee direction="left">{{ noticeList.join(" ") }}</marquee>
            </div>
            <wv-grid class="main-lider">
                <wv-grid-item to="/custInfos">
                    <img src="/static/depositAndWithdraw@2x.png" slot="icon">
                    <span slot="label">充值提现</span>
                </wv-grid-item>
                <wv-grid-item to="/betRecordsview">
                    <img src="/static/bettingHistory@3x.png" slot="icon">
                    <span slot="label">投注记录</span>
                </wv-grid-item>
                <wv-grid-item to="/activityview">
                    <img src="/static/activities@2x.png" slot="icon">
                    <span slot="label">优惠活动</span>
                </wv-grid-item>
                <wv-grid-item to="/trendChart">
                    <img src="/static/trend@3x.png" slot="icon">
                    <span slot="label">走势图</span>
                </wv-grid-item>
            </wv-grid>
            <wv-grid class="main-game">
                <div style="margin-left:10px;margin-top:5px;">
                    <i class="el-icon-location" style="color:red;"></i>全部彩种</div>
                <template v-for="sub in gameList">
                    <wv-grid-item v-for="(item,index) in sub.gameSetting" :key="index+item.gameNo" :to="`/bet/${item.gameType}/${item.gameNo}/${item.gameName}/officaPlay`">
                        <wv-badge v-if="item.gameHot != null" class="main-badge">{{ item.gameHot }}</wv-badge>
                        <img :src="$imgPath(item.imgPath)" slot="icon">
                        <div class="game-name">
                            <span slot="label">{{item.gameName}}</span>
                        </div>
                        <div class="game-num">
                            <span slot="label">{{item.gameNote!=null?item.gameNote:'未说明'}}</span>
                        </div>
                    </wv-grid-item>
                </template>
                <wv-grid-item to="/moreGameview">
                    <img src="/static/more@3x.png" slot="icon">
                    <div class="game-name">
                        <span slot="label">更多玩法</span>
                    </div>
                    <div class="game-num">
                        <span slot="label">更多好玩的彩种</span>
                    </div>
                </wv-grid-item>
            </wv-grid>
        </div>
        <wv-tabbar :fixed="true" class="footers">
            <wv-tabbar-item @click="to_page('home')" is-on>
                <i class="iconfont icon-shouye" slot="icon"></i> 首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')">
                <i class="iconfont icon-1672jiang" slot="icon"></i> 开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')">
                <i class="iconfont icon-faxian" slot="icon"></i> 发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <i class="iconfont icon-lianxikefu" slot="icon"></i> 客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')">
                <i class="iconfont icon-wode" slot="icon"></i> 我的
            </wv-tabbar-item>
        </wv-tabbar>
    </div>
</template>

<script>
let isShowFirstScreenNotice = false;
export default {
  data() {
    return { isLogin: false, show: true, gameList: [], bannerList: [], noticeList: [], newmsg: 0 };
  },
  methods: {
    to_page(active) { this.$router.push({ name: active }); },
    /** 加载所有游戏 */
    loadAllGame() {
      this.$api.get("getGameTypeAll?gameMode=030001").then(data => {
        if (data.success) {
          this.gameList = data.list;
          sessionStorage.setItem("gameAll", JSON.stringify(data.list));
          sessionStorage.setItem("setGameTime", new Date().getTime());
        }
      });
    },
    /** 加载背景 */
    loadBanner() {
      this.$api.get("getBannerConfig").then(data => {
        if (data.success) {
          this.bannerList = data.list;
          sessionStorage.bannerList = JSON.stringify(data.list);
        }
      });
    },
    loadNotice() {
      this.$api.get("getNotice").then(data => {
        if (data.success) {
          for (let i = 0; i < data.list.length; i++) {
            this.noticeList.push( i + 1 + "、" + data.list[i]["noticeTitle"] + "——" + data.list[i]["noticeContent"] );
            sessionStorage.noticeList = JSON.stringify(this.noticeList);
          }
        }
      });
    },
    getMsg() {
      this.$api.get("getMsg", { msgStatus: "1" }).then(data => {
        if (data.success) {
          if (data.list != null && data.list != undefined) {
            this.newmsg = data.totalSize;
          }
        }
      });
    },
    async toShowFirstScreenNotice() {
      if (isShowFirstScreenNotice) return -1;
      isShowFirstScreenNotice = true;
      const rsp = await this.$api.get("/getNotice?type=notice").then(data => ({success: true, data}), (error) => ({success: false, error}));
      if (!rsp.success) return (isShowFirstScreenNotice = false);
      if (!(rsp.data && rsp.data.list && rsp.data.list.length > 0)) return (isShowFirstScreenNotice = false);
      const data = rsp.data.list[0]; const title = data.noticeTitle; const content = data.noticeContent;
      this.$dialog({ title, message: '<div style="text-align:left;overflow: auto;max-height: 60vh;">' + content.split(/\s+/).join("<br>") + "</div>", skin: "ios" });
    }
  },
  created() {
    this.toShowFirstScreenNotice();
  },
  mounted() {
    if ( sessionStorage.custInfo != null && sessionStorage.custInfo != undefined && sessionStorage.custInfo != "" && sessionStorage.custInfo != "null" ) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    if ( sessionStorage.custInfo != null && sessionStorage.custInfo != undefined && sessionStorage.custInfo != "" && sessionStorage.custInfo != "null" ) {
      this.getMsg();
    }
    if ( !sessionStorage.setGameTime || new Date().getTime() - sessionStorage.setGameTime > 600000 ) {
      this.loadAllGame();
    } else {
      this.gameList = JSON.parse(sessionStorage.gameAll);
    }

    if (sessionStorage.bannerList) {
      this.bannerList = JSON.parse(sessionStorage.bannerList);
    } else {
      this.loadBanner();
    }
    this.loadNotice();
  }
};
</script>
