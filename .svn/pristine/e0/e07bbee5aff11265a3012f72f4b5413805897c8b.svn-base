<style lang="less" scoped>
.swiper { position: relative; background: url('~assets/images/loading/banner.png') 0 0 no-repeat; background-size: 100% 100%; }
.swiper-item img { width: 100%; height: 100%; }
.advice {
  background: #fff;
  border: 1px solid #e1e1e1; font-size: 16px; height: 34px; overflow: hidden;
  position: relative;
}
.advice-title {
  line-height: 34px; color: @theme-color; text-align: center;
  font-weight: 1000; font-size: 14px; font-style: italic;
  position: absolute; width: 40px; top: 0; left: 0; z-index: 2;
}
.adivce-content {
  margin: 0 10px 0 40px;
}
.adivce-content span {
  display: inline-block; margin-right: 40px; line-height: 34px;
}
.quickly-navs { background: #fff; margin: 8px 0 0;}
.quickly-navs /deep/ .weui-grid {
  padding: 6px 0 12px;
}
// .quickly-navs /deep/ .weui-grid__icon {
//   text-align: center; width: 2.6rem; line-height: 2.6rem;
//   border-radius: 50% 50%; border: 2px solid #efefef; height: 2.6rem;
// }
.quickly-navs /deep/ .weui-grid__icon {
  text-align: center; width: auto; height: 4.2rem;
}
.quickly-navs /deep/ .weui-grid__icon .iconfont {
  font-size: 3.5rem; color: @theme-color;
}
.quickly-navs /deep/ .weui-grid__label span {
  font-size: 1.4rem; line-height: 1.25rem; color: @font-color!important;
}

.games {
  background: #fff; margin: 8px 0 0;
}
.games-title, .games-title .iconfont {
  font-size: 1.6rem; color: @theme-color; text-align: center; padding: 12px 0;
}
.games-title {
  border-bottom: 1px solid @border-color;;
}
.games /deep/ .weui-grid__icon {
  width: 4.4rem; height: 4.4rem;
}
.chessGames-title,.chessGames-title .iconfont{

  font-size: 1.6rem; color: @theme-color; text-align: center; display: inline-block; padding: 0.3rem 0.5rem
}
.chessGames-title:first-child{
        margin-top: 8px;
}
.chessGames{
    background: #fff; margin: 0px 0 0;
}
.chessGames /deep/ .weui-grid__icon {
  width: 4.4rem; height: 4.4rem;
}
.chessGames-groups /deep/ .weui-cells {
  margin-top: 0!important;
}
</style>

<template>
  <div class="homepage">
    <swiper class="swiper" height="150px" :show-dots="false" auto>
      <swiper-item class="swiper-item" v-for="d in banners" :key="d.id" v-if="$consts.ImgType.C_BJ == d.imgType">
        <a v-if="d.url" :href="d.url">
          <img :src="$app.toImagePath(d.imgPath)"/>
        </a>
        <img v-else :src="$app.toImagePath(d.imgPath)"/>
      </swiper-item>
    </swiper>

    <div class="advice" @click="$router.push('/notices')">
      <div class="advice-title">公告</div>
      <marquee direction="left" class="adivce-content">
        <span v-for="d of notices" :key="d.id">《{{d.noticeTitle}}》 {{d.noticeContent}}</span>
      </marquee>
    </div>

    <grid class="quickly-navs">
      <grid-item link="/custInfos">
        <i slot="icon" class="iconfont icon-M-chongzhitixian" style="color: #ff5206;"/>
        <span slot="label" style="color: #ff5206;">充值提现</span>
      </grid-item>
      <grid-item link="/betRecordsview">
        <i slot="icon" class="iconfont icon-icon-touzhujilu" style="color: #00b159;"/>
        <span slot="label" style="color: #00b159;">投注记录</span>
      </grid-item>
      <grid-item link="/activityview">
        <i slot="icon" class="iconfont icon-huodong" style="color: #458dc8;"/>
        <span slot="label" style="color: #458dc8;">优惠活动</span>
      </grid-item>
      <grid-item link="/trendChart">
        <i slot="icon" class="iconfont icon-tubiaozhexiantu" style="color: #17a5f7;"/>
        <span slot="label" style="color: #17a5f7;">走势图</span>
      </grid-item>
    </grid>
      <div style="margin-top:10px;    margin-bottom: -8px;" v-if="chessOpen==1">
        <tab>
          <tab-item selected @on-item-click="showCaiPiao"><i class="iconfont icon-weizhi"></i>彩票</tab-item>
          <tab-item @on-item-click="showQiPai"><i class="iconfont icon-weizhi"></i>棋牌</tab-item>
        </tab>
      </div>
<template v-if="isShowCaiPiao">
  <grid :cols="3" class="games" >  
    <p class="games-title" @click="$router.push('/game_groups')" v-if="chessOpen==0"><i class="iconfont icon-weizhi"></i> 全部彩种</p> 
    <load-more tip="加载中" v-if="!games || !games.length"/>
      <grid-item v-for="d in games" :key="d.gameNo" :link="`/bet_lottery/${d.gameNo}/${d.groupType=='030001'? $consts.GamePlayType.OFFICIAL:$consts.GamePlayType.C_CREDIT}`">
        <!-- <wv-badge v-if="ited.gameHot != null" class="main-badge">{{ item.gameHot }}</wv-badge> -->
        <app-img :src="$app.toImagePath(d.imgPath)" :default-src="require('assets/images/loading/lottery.png')" slot="icon" />
        <template slot="label">
          <div class="game-name"> <span>{{d.gameName}}</span> </div>
          <div class="game-num"> <span >{{d.gameNote||'&nbsp;'}}</span> </div>
        </template>
      </grid-item>
      <grid-item  @click.native="$router.push('/game_groups')" v-if="games && games.length">
        <!-- <wv-badge v-if="ited.gameHot != null" class="main-badge">{{ item.gameHot }}</wv-badge> -->
        <img src="~assets/images/more@3x.png" slot="icon" />
        <template slot="label">
          <div class="game-name"> <span>更多彩种</span> </div>
          <div class="game-num"> <span >更多好玩的彩种</span> </div>
        </template>
      </grid-item>
    </grid>
    </template>
   
<template v-else>
  <div class="chessGames-groups" v-if="chessOpen==1">
    <group :gutter="0"><load-more tip="加载中" v-if="!chessGames || !chessGames.length"/></group>
    <group v-for="g of chessGames" :key="g.oPlatName">
      <span slot="title" class="chessGames-title"><i class="iconfont icon-weizhi"></i> {{g.oPlatName}}</span>
      <grid :cols="3" class="chessGames" :show-lr-borders="false">
        <grid-item v-for="d in g.gList" :key="d.gameNo" @click.native="goGame(d)">
                 <!-- <grid-item v-for="d in g.gameSetting" :key="d.gameNo" :link="`/bet_lottery/${d.gameNo}/1`"> -->
          <!-- <wv-badge v-if="ited.gameHot != null" class="main-badge">{{ item.gameHot }}</wv-badge> -->
          <app-img :src="$app.toImagePath(d.gameIoc)" :default-src="require('assets/images/loading/lottery.png')" slot="icon" />
          <template slot="label">
            <div class="game-name"> <span>{{d.gameName}}</span> </div>           
          </template>
        </grid-item>
      </grid>
    </group>
  </div>
  <tanchuang :showDialog="showDialog" @changeShow="changeShow" :selectGameData="selectGameData"></tanchuang>
</template>

      <!-- <p class="games-title" @click="$router.push('/game_groups')"><i class="iconfont icon-weizhi"></i> 全部彩种</p> -->
   

    
  </div>
</template>

<script>
import { Component, Vue, NGetter } from 'core/decorators';
import { Swiper, SwiperItem } from 'vux';

import HomePageXHeader from './HomePageXHeader';
import tanchuang from './tanchuang/tanChuang';

let isShowFirstScreenNotice = false;
@Component({
  components: { Swiper, SwiperItem,tanchuang }
})
export default class HomePage extends Vue {
  /** banners */
  @NGetter('WebConfig', 'getBannerConfig') banners;
  /** notices */
  @NGetter('Notice', 'getNotice') notices;
  /** games */
  @NGetter('Game', 'getGameTypeAll') groupGames;
  // PlateGame
  @NGetter('PlateGame', 'getPlateGameAll') PlateGames;

  isShowCaiPiao=true
  showDialog=false
  selectGameData={}
  _isLogin=false
  chessOpen=0
  /** 获取游戏 */
  get games () {

    return this.groupGames.reduce((games, { gameSetting = [] }) => {
      return games.concat(gameSetting);
    }, []);
  }
  get chessGames(){
     return this.PlateGames
  }
  get isLogged () {
    return true;
  }
  showCaiPiao(i){
    this.isShowCaiPiao=true    
  }
  async showQiPai(i){
    this.isShowCaiPiao=false
         const rsp =await this.$tools.fetch('/getOnlineSession').get();  
          if(!rsp.data.t) {
              this._isLogin=false
          }else{
            this._isLogin=true
          }       
  }
  changeShow(){
    this.showDialog=false
  }
  async goGame(d){
      if(this._isLogin){
        this.showDialog=true
        this.selectGameData=d
      }else{
       if (await this.$vux.confirm({ content: '用户登录已失效', title: '操作提示', confirmText: '去登录' })) {
        this.$router.push({ path: '/login', meta: { authenticated: true } });
      }
      }
  }
  // isLogin(){    
  //     //  this.getOnSession()
  //       const custInfo=sessionStorage.custInfo||null        
  //       if(custInfo==null||JSON.parse(custInfo)==null) return true
  //       return false
  //       }       
         
           
  async toShowFirstScreenNotice() {
    // 解决页面路由跳转，空白页面，跳转首页，后期提示，首页也有提示，界面弹窗重复
    // this.isRedirect 来至于 Vue.prototype.isRedirect = false;
    if (isShowFirstScreenNotice || this.isRedirect) return -1;
    isShowFirstScreenNotice = true;
    const rsp = await this.$tools.fetch("/getNotice?type=notice").get();
    if (!rsp.success) return (isShowFirstScreenNotice = false);
    if (!(rsp.data && rsp.data.list && rsp.data.list.length > 0)) return (isShowFirstScreenNotice = false);
    const data = rsp.data.list[0]; const title = data.noticeTitle; const content = data.noticeContent;
    // console.log(!this.$vux.alert.isVisible() , this.$vux.confirm.isVisible())
    if (this.$vux && this.$vux.alert && this.$vux.alert.isVisible && this.$vux.alert.isVisible()) return;
    if (this.$vux && this.$vux.confirm && this.$vux.confirm.isVisible && this.$vux.confirm.isVisible()) return;
    this.$vux.alert({ title, content: '<div style="text-align:left;overflow: auto;max-height: 60vh;">' + content.split(/\s+/).join("<br>") + "</div>", skin: "ios" });
  }
  async getHeadConfig(){
    const rsp= await this.$tools.fetch("/getHeadConfig").get();
    console.log(rsp.data.list)
    console.log(rsp.data.list.lenght>0)
    if(rsp.data.list.length>0){
    let data= rsp.data.list.filter((item)=>{
      console.log(item.codeKey)
      return item.codeKey=="chessOpen"
    })          
    localStorage.setItem("chessOpen",JSON.stringify(data[0].codeValue)||0)    
    }else{
      localStorage.setItem("chessOpen",0)
    }  
    this.chessOpen=JSON.parse(localStorage.getItem("chessOpen"));


  }
  created () {
    this.$app.setLayout(HomePageXHeader, true, this);
    this.$apis.WebConfig.getBannerConfig();
    this.$apis.Notice.getNotice();
    this.$apis.Game.getGameTypeAll();    
    this.$apis.PlateGame.getPlateGameAll();    
    this.toShowFirstScreenNotice();
    // this.getHeadConfig()
   
  }
  mounted() {
    this.getHeadConfig()
  }
}
</script>
