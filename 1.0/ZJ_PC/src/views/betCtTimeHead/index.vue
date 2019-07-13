<template>
  <header :class="[{'open':headerOpen}]">
    <div class="zone logo">
      <div v-if="getGameNextOpenNodata" class="title" v-text="getGameNextOpenNodata.gameName"></div>
      <div class="logo-img">
        <img v-if="getGameNextOpenNodata" :src="$imgPath(getGameNextOpenNodata.smallImgPath)" alt="" style="width:100%;">
      </div>
    </div>
    <div class="zone lottery-menu">
      <div class="lottery-menu-toggle" @click="headerOpen=!headerOpen"></div>
      <div class="left-arrow"></div>
      <div class="lottery-list">
        <swiper :options="swiperOption" ref="mySwiper" style="width:100%;">
          <swiper-slide v-for="(item,index) in otherTicket" :key="index">
            <div class="vip-hljssc lottery-name" @click="officialRouter(item.gameType,item.gameNo)">
              <span v-text="item.gameName"></span>
              <img :src="$imgPath(item.imgPath)">
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="right-arrow"></div>
    </div>
    <div class="col w40 zone count-down">
      <div class="currentIssue">
        <span class="highlight" v-if="getGameNextOpenNodata" v-text="getGameNextOpenNodata.gameNumber"></span>
        <span v-text="residueText"></span>
      </div>
      <div class="your-clock flex justify-center"></div>
    </div>
    <div class="zone last-draw-result">
      <div class="prevOpenIssue">
        <span v-if="!flagAnimete">第
          <span class="highlight" v-if="gameOpenNos!=null" v-text="gameOpenNos.gameNumber"></span> 期开奖号码
        </span>
        <span v-else>
          <span class="highlight">上一期正在开奖中</span>
        </span>
      </div>
      <div class="drawResult">
        <div class="flex justify-center" style="width:100%;" v-if="gameOpenNos!=null">

          <div v-if="$route.params.gameType=='22'||$route.params.gameType=='33'" v-for="(item,index) in gameOpenNos.gameOpenNo"
            :key="index" style="width: 50px;height: 50px;position: relative;flex: 0 0 auto;margin: 0 10px;display: inline-block;">
            <div v-if="!flagAnimete" :style="'width: 50px;height: 50px;background-image: url(/static_pc/images/saizi/'+item+'.png);background-size: cover;'
            ">
            </div>
            <div v-else :class="flagAnimete?'saizianimate':''" :style="'width: 50px;height: 50px;background-image: url(/static_pc/images/saizi/'+randemarr[index]+'.png);background-size: cover;'
            ">
            </div>
            <div class="shadow"></div>
          </div>

          <div v-if="$route.params.gameType=='11'|| $route.params.gameType=='44'" class="ball" v-for="(item,index) in gameOpenNos.gameOpenNo"
            :key="index">
            <div class="animate-ball">
              <div class="inner">
                <span class="sscqiu" :class="flagAnimete?'sscqiuanime':''" v-text="item"></span>
                <span v-for="i in 10" class="sscqiu" :class="flagAnimete?'sscqiuanime':''" :key="i+index">{{i-1}}</span>
              </div>
            </div>
            <div class="shadow"></div>
          </div>

          <!-- <div v-if="$route.params.gameType=='55'|| $route.params.gameType!='55'" class="ball" v-for="(item,index) in gameOpenNos.gameOpenNo"
                        :key="index">
                        <div class="animate-ball">
                            <div class="inner">
                                <span class="sscqiu" :class="flagAnimete?'sscqiuanime':''" v-text="item"></span>
                                <span v-for="i in 10" class="sscqiu" :class="flagAnimete?'sscqiuanime':''" :key="i+index">{{i}}</span>
                            </div>
                        </div>
                        <div class="shadow"></div>
                    </div> -->
          <div id="bjpks" class="ball" v-if="$route.params.gameType=='55'" v-for="(item,index) in gameOpenNos.gameOpenNo"
            :key="index">
            <div class="animate-ball">
              <div class="inner">
                <span :class="flagAnimete?'bjpk10qiuanime':''" v-text="item"></span>
                <span v-for="i in 10" :class="flagAnimete?'bjpk10qiuanime':''" :key="i+index">{{i}}</span>
              </div>
            </div>
            <div class="shadow"></div>
          </div>
          <template v-if="$route.params.gameType=='66'">
            <div id="lhc" class="ball" :class="ball[item-1].color" v-if="index<6" v-for="(item,index) in gameOpenNos.gameOpenNo"
              :key="index">
              <div class="animate-ball">
                <div class="inner">
                  <span :class="flagAnimete?'lhcanimation':''" v-text="item"></span>
                  <span v-for="i in 49" :class="flagAnimete?'lhcanimation':''" :key="i+index">{{i}}</span>
                </div>
              </div>
              <div class="shadow"></div>
            </div>
            <Icon type="plus-round" style="margin: 6px 5px 0;font-size: 24px;font-weight: bold;"></Icon>
            <div id="lhc" class="ball" :class="ball[item-1].color" v-if="index==6" v-for="(item,index) in gameOpenNos.gameOpenNo"
              :key="index">
              <div class="animate-ball">
                <div class="inner">
                  <span :class="flagAnimete?'lhcanimation':''" v-text="item"></span>
                  <span v-for="i in 49" :class="flagAnimete?'lhcanimation':''" :key="i+index">{{i}}</span>
                </div>
              </div>
              <div class="shadow"></div>
            </div>
          </template>

          <template v-if="$route.params.gameType=='88'">
            <template v-if="index<3" v-for="(item,index) in gameOpenNos.gameOpenNo">
              <div class="ball">
                <div class="animate-ball">
                  <div class="inner">
                    <span class="sscqiu" :class="flagAnimete?'sscqiuanime':''" v-text="item"></span>
                    <span v-for="i in 10" class="sscqiu" :class="flagAnimete?'sscqiuanime':''" :key="i+index">{{i-1}}</span>
                  </div>
                </div>
                <div class="shadow"></div>
              </div>
              <Icon v-if="index<2" type="plus-round" style="margin: 6px 5px 0;font-size: 24px;font-weight: bold;"></Icon>
              <svg v-if="index==2" fill="currentColor" height="24" width="24" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle;margin-top: 6px">
                <path d="M18 7h-12c-1.104 0-2 .896-2 2s.896 2 2 2h12c1.104 0 2-.896 2-2s-.896-2-2-2zM18 14h-12c-1.104 0-2 .896-2 2s.896 2 2 2h12c1.104 0 2-.896 2-2s-.896-2-2-2z"></path>
              </svg>
            </template>
            <div class="ball" :class="[flagAnimete?'pcddred':'',pcddball[gameOpenNos.gameOpenNo.reduce((s,el)=>{return Number(el)+s},0)].color]">
              <div class="animate-ball">
                <div class="inner">
                  <div v-if="flagAnimete" class="sc-cfWELz jhVahb" style="color: #fff;">?</div>
                  <div v-else class="sc-cfWELz jhVahb" style="color: #fff;">{{gameOpenNos.gameOpenNo.reduce((s,el)=>{return Number(el)+s},0)}}</div>
                </div>
              </div>
              <div class="shadow"></div>
            </div>
          </template>

        </div>
        <div class="flex justify-center" style="width:100%;" v-if="$route.params.gameType=='66'&&gameOpenNos!=null&&!flagAnimete">
          <span style="flex: 0 0 auto;width: 40px;color: #646464;font-size: 12px;padding-top: 2px" v-for="(item,index) in gameOpenNos.gameOpenNo"
            v-if="index<6" :key="index+'zoo'">{{ball[item-1].zoo}}</span>
          <span style="flex: 0 0 auto;width: 28px;"></span>
          <span style="flex: 0 0 auto;width: 40px;color: #646464;font-size: 12px;padding-top: 2px" v-for="(item,index) in gameOpenNos.gameOpenNo"
            v-if="index==6">{{ball[item-1].zoo}}</span>
        </div>
      </div>
      <div class="link">
        <a :href="`/static_pc/cpRecode/index.html?game=${$route.params.gameNo}${'030001'}`"
          target="_blank">走势图</a>
        <a class="has" @click="onOpenSM($route.params.gameType)">玩法说明</a>
        <a @click="goOffice">官方网址</a>
      </div>
    </div>
    <Modal v-model="jztz" width="300" class-name="vertical-center-modal" :closable="false">
      <p slot="header" style="text-align:center">
        温馨提示
      </p>
      <div style="text-align:center;padding: 15px 0">
        <p>第
          <span style="color: #ed3f14">{{jzqh}}</span>期</p>
        <p>投注已截止</p>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="error" size="large" long @click="jztz=false">关闭</Button>
      </div>
    </Modal>
  </header>
</template>

<script>
  import index from './index.js';
  export default {
    ...index
  }

</script>

<style lang="less" scoped>
  @import './index.less';

  .sscqiu {
    display: block;
  }

  .sscqiuanime {
    animation: qiudong .5s linear infinite;
  }

  .bjpk10qiuanime {
    animation: bjpk10 .3s linear infinite;
  }

  .lhcanimation {
    animation: lhc 3s linear infinite;
  }

  @keyframes qiudong {
    0% {
      transform: translateY(0px)
    }

    100% {
      transform: translateY(-440px)
    }
  }

  @keyframes bjpk10 {
    0% {
      transform: translateY(0px)
    }

    100% {
      transform: translateY(-220px)
    }
  }

  @keyframes lhc {
    0% {
      transform: translateY(0px)
    }

    100% {
      transform: translateY(-1500px)
    }
  }

</style>
<style lang="less">
  .ivu-spin-fullscreen-wrapper {
    top: 30px;
    overflow: hidden;
  }
  .gVLrq,
  ._253X4,
  ._14AuM,
  ._2uT9A {
    z-index: 999999;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

  .drawResult #bjpks {
    width: 24px;
    height: 24px;
    font-size: 15px;
    line-height: 20px;
    display: inline-block;
    border-radius: 20px;
    margin: 1px 3px;

    .animate-ball {
      width: 100%;
      height: 100%;

      .inner {
        width: 100%;
        height: 100%;
        padding: 0;

        span {
          display: block;
        }
      }
    }
  }

  .drawResult #bjpks:first-child {
    background-image: linear-gradient(180deg, #ff5e5e 0, #df0b11 75%, #b90005), linear-gradient(to bottom, #ff5e5e, #b90005);

    .inner span {
      color: #fff;
    }
  }

  .drawResult #bjpks:nth-child(2) {
    background-image: linear-gradient(180deg, #ff9b53 0, #e95616 75%, #d04011), linear-gradient(180deg, #ff9b53 0, #e95616 75%, #d04011);

    .inner span {
      color: #fff;
    }
  }

  .drawResult #bjpks:nth-child(3) {
    background-image: linear-gradient(180deg, #ffcd33 0, orange 62%, #ce7901), linear-gradient(180deg, #ffcd33 0, orange 62%, #ce7901);

    .inner span {
      color: #fff;
    }
  }

  .drawResult #lhc {
    width: 34px;
    height: 34px;
    font-size: 18px;
    line-height: 30px;
    display: inline-block;
    border-radius: 100%;
    margin: 1px 3px;

    .animate-ball {
      width: 100%;
      height: 100%;

      .inner {
        color: #fff;
        width: 100%;
        height: 100%;
        padding: 0;

        span {
          display: block;
        }
      }
    }

    &.red {
      background-image: radial-gradient(circle at 50% 31%, #f87b7e, #e34b4f, #c7282b);
    }

    &.blue {
      background-image: radial-gradient(circle at 50% 31%, #70c1ff, #2f95e3, #1b7bc5);
    }

    &.green {
      background-image: radial-gradient(circle at 50% 31%, #64d68f, #44bf73, #23a755);
    }
  }
  .stopsp{
    max-width: 1500px;
  }
  @media screen and (max-width: 1700px)  {
    .stopsp{
      max-width: 1250px;
    }
  }
  @media screen and (max-width: 1500px)  {
    .stopsp{
      max-width: 1050px;
    }
  }
  @media screen and (max-width: 1300px)  {
    .stopsp{
      max-width: 850px;
    }
  }
  @media screen and (max-width: 1100px)  {
    .stopsp{
      max-width: 600px;
    }
  }
</style>
