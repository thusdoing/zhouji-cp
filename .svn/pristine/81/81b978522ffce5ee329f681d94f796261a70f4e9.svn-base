<template>
  <div class="headbox">
    <div class="headboxh">
      <div class="headboxhc">
        <div class="fl" style="    height: 30px;
    line-height: 30px;">hi,欢迎来到中国彩票开奖网</div>
        <div class="headboxhr">
          <ul class="logonul">
            <li class="logonli">
              <a href="javascript:void(0);">设为首页</a>
            </li>
            <li class="logonli liline">|</li>
            <li class="logonli">
              <a href="javascript:void(0);">收藏本站</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="wrapHeadBox">
      <div class="headboxhh">
        <a href="/" class="logoboxl">
          <img src="/static/logo/logo1.png" alt data-v-120f5e71>
        </a>
        <a href="/" class="logoboxr">
          <img src="./../assets/img/logor.png" alt data-v-120f5e71>
        </a>
      </div>
    </div>
    <div class="nav" data-v-8275fdbe>
      <div class="container fix" data-v-8275fdbe>
        <ul class="navItem fix flr">
          <!-- <li class="Kmenu" data-v-8275fdbe>
            <a
              href="/"
              data-v-8275fdbe
              class="nuxt-link-exact-active nuxt-link-active"
              style="font-weight:600"
            >
              全部彩票列表
              <span style="font-family:Comic Sans MS;font-size:14px;margin-left:10px">
                <div class="menu-icon"></div>
              </span>
            </a>

            <ul class="menu">
              <li v-for="(item,index) in gameList" :key="index">
                <img :src="$imgPath(item.imgPath)" alt=""  class="caizhongico" >
                <a class="caizhongNav"    @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)">{{item.gameName}}</a>
              </li>  
            </ul>
          </li> -->
          <li class="curr" data-v-8275fdbe>
            <a data-v-8275fdbe class="nuxt-link-exact-active nuxt-link-active" @click="$router.push('/')">首页</a>
          </li>
          <li class="lottry">
            <a  data-v-8275fdbe class>高频彩</a>
            <div class="navList" data-v-8275fdbe>
              <div class="ltList" data-v-8275fdbe style="color:#fff">
                <ul data-v-8275fdbe>
                  <li style="width: 110px;" v-for="(item,index) in gameList" :key="index"  v-if="item.gameName.indexOf('六合')==-1">
                    <a style="width: 120px;" @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)" >{{item.gameName}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li data-v-8275fdbe class="lottry">
            <a href="#" data-v-8275fdbe class>六合彩</a>
            <div class="navList" data-v-8275fdbe>
              <div class="ltList" data-v-8275fdbe style="color:#fff">
                <ul data-v-8275fdbe>
                  <li style="width: 110px;" v-for="(item,index) in gameList" :key="index"  v-if="item.gameName.indexOf('六合')!=-1">
                    <a data-v-8275fdbe  @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)" class style="width: 120px;" >{{item.gameName}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="lottry">
            <a href="#">境外彩</a>
            <div class="navList" data-v-8275fdbe>
              <div class="ltList" data-v-8275fdbe style="color:#fff">
                <ul data-v-8275fdbe>
                  <li style="width: 110px;" v-for="(item,index) in gameList" :key="index" v-if="('新加 韩国 日本 菲律').indexOf(item.gameName.slice(0,2))!=-1">
                    <a data-v-8275fdbe   @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)" class style="width: 120px;">{{item.gameName}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="lottry">
            <a href="#" data-v-8275fdbe>全国彩</a>
            <div class="navList" data-v-8275fdbe>
              <div class="ltList" data-v-8275fdbe style="color:#fff">
                <ul data-v-8275fdbe>
                  <li style="width: 110px;" v-for="(item,index) in gameList" :key="index"  v-if="('新加 韩国 日本 菲律').indexOf(item.gameName.slice(0,2))==-1">
                    <a data-v-8275fdbe   @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)" class style="width: 120px;">{{item.gameName}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { create } from "domain";
export default {
  data() {
    return {
      // showList:false,
      isShow: false,
      showNo: 0,
      gameList:[],

    };
  },
  methods: {
    async getGameTypeAll() {
    let data=JSON.parse(localStorage.getItem("caizhong")) 
    // let data2=await this.$tools.fetch("/api/getGameLatestOpenNo").get({showCase:'s'});
    // console.log(this.isEqual(data,data2.data.list))
    // if(data==null){
    //     data = await this.$tools.fetch("/api/getGameLatestOpenNo").get({showCase:'s'}); 
    //      data =data .data .list 
    //     localStorage.setItem("caizhong",JSON.stringify(data))
    // }
        data = await this.$tools.fetch("/api/getGameLatestOpenNo").get({showCase:'s'}); 
        data =data .data .list 
        localStorage.setItem("caizhong",JSON.stringify(data))
              this.gameList = data   
                      
    
    },
    isEqual(Obja,Objb){
      let propsA = Object.getOwnPropertyNames(Obja),
      propsB = Object.getOwnPropertyNames(Objb);
      console.log(propsA,propsB)
      if(propsA.length != propsB.length){
      return false;
    }
      for(let i=0;i<propsA.length;i++){
      let propName=propsA[i];
      //如果对应属性对应值不相等，则返回false
      if(Obja[propName] !== Objb[propName]){
        return false;
      }
    }
    return true;
    }
  },
  watch: {
    '$route' (to, from) {
      // this.getGameTypeAll();
    }
},
  created() {
    this.getGameTypeAll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headbox {
  background: #fff;
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
}
.headboxh {
  width: 100%;
  height: 30px;
  position: relative;
  z-index: 1000;
  background: #343139;
}
.headboxhc {
  width: 1200px;
  height: 30px;
  margin: 0 auto;
  overflow: hidden;
}
.headboxhh {
  width: 1200px;
  height: 120px;
  margin: 0 auto;
  overflow: hidden;
  z-index: 8;
}

.headboxhr {
  float: right;
  height: 30px;
}
.logonul {
  margin: 0;
  text-decoration: none;
  list-style: none;
}
.logonul li {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: center;
  margin-left: 10px;
  color: #666;
}
.logonul li a {
  color: #fff;
  font-size: 12px;
}
a {
  text-decoration: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none;
}
.liline {
  color: #ccc !important;
}
.fl {
  float: left;
  color: #fff;
  font-size: 12px;
}
.logoboxl {
  float: left;
  margin: 10px;
}
.logoboxr {
  float: right;
  margin: 10px;
}

.nav {
  height: 50px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f73b32),
    to(#d41f2b)
  );
  background: linear-gradient(#f73b32, #d41f2b);
  clear: both;
}
.nav ul {
  overflow: hidden;
}
.container {
  width: 1200px;
  margin: 0 auto;
}

.navItem li {
  float: left;
  text-align: center;
  display: inline-block;
}
.navItem > li > a {
  display: block;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  width: 150px;
  line-height: 50px;
}

.navList {
  width: 100%;
  height: auto;
  position: absolute;
  top: 200px;
  background: #343139;
  text-align: center;
  z-index: 8;
  padding-top: 10px;
  left: 0;
  padding-bottom: 10px;
}
.ltList {
  width: 1200px;
  height: 120px;
  margin: 0 auto;
}

.ltList ul li {
  float: left;
  height: 28px;
  width: 100px;
  margin: 5px;
}
.ltList ul li a {
  font-size: 12px;
  color: #fff;
  padding: 8px;
  height: 28px;
  width: 100px;
  line-height: 12px;
  text-align: center;
}

.navList li:hover {
  height: 28px;
  width: 100px;
  background: #ffc14a;
  border-radius: 5px;
}
.navList li:hover > a {
  color: #000;
}
.navItem > li:hover {
  /* position: relative; */
  /* width: 120px;
  height: 80px; */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#343139),
    to(#71433a)
  );
  background: linear-gradient(#343139, #71433a);
  /* text-align: center */
}
.navList li:hover {
  display: block;
}
.navItem > li:hover a {
  color: #fff;
}
.lottry:active > .navList,
.lottry:focus > .navList,
.lottry:hover > .navList {
  /* opacity:1; */
  display: block;
  /* transition:opacity .15s ease-in */
}
.navList {
  display: none;
}

.Kmenu:active > .menu,
.Kmenu:focus > .menu,
.Kmenu:hover > .menu {
  display: block;
}
.Kmenu > .menu {
  /* position: absolute;
  top: 79px;
  width: 100%;
  left: 0;
  z-index: 80; */
  width: 150px;
  background-color: #fff;
  position: absolute;
  z-index: 99999;
  box-shadow: rgb(136, 136, 136) 2px 0px 15px;

  /* width: 100%;
  height: auto;
  position: absolute;
  top: 79px;
  background: #343139;
  text-align: center;
  z-index: 8;
  padding-top: 10px;
  left: 0;
  padding-bottom: 10px; */
}
.Kmenu > ul > li {
  list-style: none;
  display: block;
  height: 30px;
  width: 100%;
  text-align: left;
  line-height: 30px;
  margin: 2px;
}
.menu {
  display: none;
}
.caizhongico {
  width: 23px;
  left: 18px;
  position: absolute;
}
.Kmenu > ul > li .caizhongNav {
  display: inline-block;
  margin-left: 50px;
  height: 30px;
  width: 100%;
  font-size: 14px;
  color: #000;
  /* margin-left: 10px; */
}
.Kmenu ul li:hover {
  background: #ffc14a;
}
.menu-icon {
  width: 20px;
  height: 2px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background-color: #fff;
  padding: 3px 0;
  background-clip: content-box;
  display: inline-block;
}
</style>
