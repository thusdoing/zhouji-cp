<template>
<div>
  <div style="height:1rem;background: rgb(221, 76, 76);position:fixed;top:0;z-index:8;width:100%;line-height:1rem">
      <div class="menu" @click="isShowLottrys"><span>{{caizhongming}}</span><img src="/static_h5/shouhui@2x.png" alt="" v-if="isshowlottry"><img src="/static_h5/zhankai@2x.png" alt="" v-else></div>
      <div class="fanhui" @click="goback()"><img src="/static_h5/fanhui@2x.png" alt=""></div>
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
export default {
  data(){
    return{
        caizhongming:"",
        isshowlottry:false,
        gameList:[],
        selected:[]
    }
  },



  methods:{
     async getGameTypeAll() {
    let data=JSON.parse(localStorage.getItem("caizhong")) 
    if(data==null){
        data = await this.$tools.fetch("/api/getGameLatestOpenNo").get({showCase:'s'}); 
         data =data .data .list 
        localStorage.setItem("caizhong",JSON.stringify(data))
    }
              this.gameList = data   
                      
    
    },
    goback(){
      this.$router.push("/")    
      // history.go(-1)
    },
    isShowLottrys(){
          this.isshowlottry=!this.isshowlottry
    },
    tiaozhuan(url){
     
      this.$router.push(url)    
       this.isshowlottry=false    
    }

  },
    watch: {
    '$route' (to, from) {
      this.caizhongming=this.$route.params.gameName
      // this.getGameTypeAll();
    }
},
  created(){
    if(this.$route.params.gameName!=undefined) this.caizhongming=this.$route.params.gameName
    this.getGameTypeAll()
  }
}
</script>
<style scoped>
.menu{
  width: 3rem;
  margin: 0 auto;
  font-size: 0.35rem;
  /* height: 0.35rem; */
  color: #ffffff;
  text-align: center

  }
img{
  margin-left: 0.3rem;
  width: auto;
  height: 0.2rem;
}
.fanhui{
  width: 1rem;  
  position: fixed;
  left: 0.2rem;
  top: 0;
}
.fanhui img{
    width: 25%;
    height: 50%;
   padding-top: 25%;
    padding-bottom: 25%;
    display: block;
    margin: 0 auto

}
.content{
  width: 100%; 
  height:100%;
  background:#ffffff;
  z-index: 99999;
  position: fixed;
  top:1rem

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
