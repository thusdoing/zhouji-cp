<template>
<div style="position:fixed;top:0; width:100%;z-index:8">
  <div class="headbox" >
        <div style="width:3rem;margin:0 auto"  @click="$router.push('/')"><img src="/static_h5/APPlogo.png" alt="" style="    vertical-align: middle;"></div>
        <div class="suoYouCai" @click="isShowLottrys">全部彩种</div>
  </div>
        <div v-if="isshowlottry" class="content">
    <table>
       <tr class="dalei">
          <td class="gameType"><span class="yuandian"></span> 时时彩</td>    
          <td class="gameName">
              <span v-for="(item,index) in gameList" :key="index" v-if="item.gameNo.slice(0,2)==11" :class="[{'xuanzhong':item.gameName==caizhongming}]"  @click="tiaozhuan(`/record/${item.gameNo}/${item.gameName}`)"><i>{{item.gameName}}</i></span> 
          </td>         
         </tr> 
       <tr class="dalei">
          <td class="gameType"><span class="yuandian"></span>快三</td>     
          <td class="gameName">
              <span v-for="(item,index) in gameList" :key="index" v-if="item.gameNo.slice(0,2)==22" :class="[{'xuanzhong':item.gameName==caizhongming}]"  @click="tiaozhuan(`/record/${item.gameNo}/${item.gameName}`)"> <i>{{item.gameName}}</i></span> 
          </td>         
         </tr> 
       <tr class="dalei">
          <td class="gameType"><span class="yuandian"></span>11选5</td>    
          <td class="gameName">
              <span v-for="(item,index) in gameList" :key="index" v-if="item.gameNo.slice(0,2)==44" :class="[{'xuanzhong':item.gameName==caizhongming}]"  @click="tiaozhuan(`/record/${item.gameNo}/${item.gameName}`)"><i>{{item.gameName}}</i></span> 
          </td>         
         </tr> 
       <tr class="dalei">
          <td class="gameType"><span class="yuandian"></span>PK10</td>    
          <td class="gameName">
              <span v-for="(item,index) in gameList" :key="index" v-if="item.gameNo.slice(0,2)==55" :class="[{'xuanzhong':item.gameName==caizhongming}]"  @click="tiaozhuan(`/record/${item.gameNo}/${item.gameName}`)"><i>{{item.gameName}}</i></span> 
          </td>         
         </tr> 
       <tr class="dalei">
          <td class="gameType"><span class="yuandian"></span>六合彩</td>    
          <td class="gameName">
              <span v-for="(item,index) in gameList" :key="index" v-if="item.gameNo.slice(0,2)==66" :class="[{'xuanzhong':item.gameName==caizhongming}]"  @click="tiaozhuan(`/record/${item.gameNo}/${item.gameName}`)"> <i>{{item.gameName}}</i></span> 
          </td>         
         </tr> 
         </table> 
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
      isDisplay:false,
      caizhongming:"所有彩种",
      isshowlottry:false,
    };
  },
  methods: {
    async getGameTypeAll() {
    let data=JSON.parse(localStorage.getItem("caizhong")) 
    if(data==null){
        data = await this.$tools.fetch("/api/getGameLatestOpenNo").get({showCase:'s'}); 
         data =data .data .list 
        localStorage.setItem("caizhong",JSON.stringify(data))
    }
              this.gameList = data   
                      
    
    },
    isShowLottrys(){
          this.isshowlottry=!this.isshowlottry
    },
    tiaozhuan(url){
      this.isshowlottry=false 
    
      this.$router.push(url)    

    }
  },
  watch: {
    // '$route' (to, from) {
    //   this.caizhongming=this.$route.params.gameName
    //   // this.getGameTypeAll();
    // }
},
  created() {
    this.getGameTypeAll();
    // if(this.$route.params.gameName!=undefined) this.caizhongming=this.$route.params.gameName
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headbox {
  background: rgb(221, 76, 76);
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  margin: 0 auto;
  position: relative;

}
.headboxh {
  width: 100%;
  height: 1.875rem;
  position: relative;
  z-index: 1000;
  background: #343139;
}
.suoYouCai{ 
    /* width: 1.3rem; */
    border: 1px solid #fff;
    position: absolute;
    padding: 2px;
    top: 37%;
    font-size: 0.25rem;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    right: 0.3rem;
}
.headboxhc {
  width: 375px;
  height: 30px;
  margin: 0 auto;
  overflow: hidden;
}
.headboxhh {
  width: 375px;
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
  width: 375px;
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
  width: 375px;
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

.suoYouCai:active  .menu,
.suoYouCai:focus  .menu,
.suoYouCai:hover  .menu {
  display: block;
}
.menu {
  width: 2rem;
  background-color: #fff;
  position: absolute;
  z-index: 99999;
  box-shadow: rgb(136, 136, 136) 2px 0px 15px;
  right: 0rem;
  font-size: 0.25rem;
  overflow: auto;
  height: 80vh;
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
 ul > li {
  list-style: none;
  display: block;
  height: 0.7rem;
  width: 100%;
  line-height: 0.7rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0
}
.menu {
  /* display: none; */
}
.caizhongico {
  width: 23px;
  left: 18px;
  position: absolute;
}
.Kmenu > ul > li .caizhongNav {
  display: inline-block;
  margin-left: 50px;
  height: 100%;
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
.menu{
  width: 3rem;
  margin: 0 auto;
  font-size: 0.35rem;
  /* height: 0.35rem; */
  color: #ffffff;
  text-align: center

  }


.content{
  width: 100%; 
  height:100%;
  background:#ffffff;
  z-index: 99999;
  position: fixed;
  top:1.5rem

}
.gameType{
  width:30%;  
  font-size:0.25rem;
  text-align: left;
}
.gameName{
    display:flex;
    flex-wrap: wrap;
    font-size:0.25rem;
    text-align: center;
}
.gameName span{
      margin:0.15rem;    
      background:#f0f0f0 ;
      border-radius: 0.1rem;
}
.gameName .xuanzhong{
background: red;
color: #fff;
}
i{
    padding: 0.1rem;
    display: inline-block;
    border-radius: 0.1rem;
}
.yuandian{
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  background: red;
  border-radius: 50%;
  margin-right: 0.2rem;
  margin-left:0.5rem
  
}
table{
  padding: 0.1rem
}
td{
border-bottom: 1px solid #f0f0f0;
}
tr:last-child >td{
  border: none
}
</style>
