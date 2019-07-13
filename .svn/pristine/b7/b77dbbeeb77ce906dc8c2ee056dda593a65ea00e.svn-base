<template>
 <div>
    <table>
      <tr>
        <th>彩种</th>
        <th>开奖号码</th>
        <th>开奖时间</th>
        <!-- <th>操作</th> -->
      </tr>
      <tr v-for="(item,index) in gameList" :key="index" @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)">
        <td style="width:276px">
          <div data-v-62519dfa class="ltIntro cz">
            <div data-v-62519dfa class="lotteryPic OG1K3">
              <img :src="$imgPath(item.imgPath)"  alt width="50px">
            </div>
            <p data-v-62519dfa class="lotteryName">{{item.gameName}}
              <br data-v-62519dfa>
              <span data-v-62519dfa>
                <!---->
                <i data-v-62519dfa class="orange">{{item.gameNumber}}</i> 期
              </span>
            </p>
          </div>
        </td>
        
        <td style="width:472px"  v-if="item.restTime>=0">
          <div class="kajianhao kjhm">
            <ul data-v-62519dfa class="SSCnumberbox" v-if="item.gameType==22">
              <li data-v-62519dfa class="result"  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')" :key="indexNo">
                 <img :src="'/static/shuaizi/'+itmeNo+'.png'">
              </li>   
            </ul>
            <ul data-v-62519dfa class="SSCnumberbox" v-else-if="item.gameType==55">
              <li data-v-62519dfa class="resultPk10"  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')" :key="indexNo">
                 <img :src="'/static/pk10/'+itmeNo+'.png'">
              </li>   
            </ul> 
            <ul data-v-62519dfa class="SSCnumberbox" v-else-if="item.gameType==66">
              <li data-v-62519dfa class="resultLhc" :class="{'red':hongbo.indexOf(itmeNo)!=-1,'blue':lanbo.indexOf(itmeNo)!=-1,'green':lvbo.indexOf(itmeNo)!=-1}" v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')" :key="indexNo">
                 <!-- <img :src="'/static/pk10/'+itmeNo+'.png'"> -->
                <i>{{itmeNo}}</i> 
              </li>   
            </ul>
            <ul data-v-62519dfa class="SSCnumberbox" v-else>
              <li data-v-62519dfa class="resultLhc blue"  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')" :key="indexNo">
                 <!-- <img :src="'/static/pk10/'+itmeNo+'.png'"> -->
                <i>{{itmeNo}}</i> 
              </li>   
            </ul>          
          </div>
        </td>
        <td v-else style="height:82px "> <img :src="'/static/loading.gif'" style="height:82px ; width: auto;"></td>
        <td style="width:294px">
          <div data-v-62519dfa class="openTime kjsj">
            <p data-v-62519dfa style>
              <!---->
              <!---->
              <span data-v-62519dfa>
                距离
                <i data-v-62519dfa class="redTime" style="color:red">{{item.gameNextNumber}}</i>期开奖时间:
                <!-- <i data-v-62519dfa>
                  <i data-v-62519dfa class="redTime">00</i>分
                </i>
                <i data-v-62519dfa>
                  <i data-v-62519dfa class="redTime">09</i>秒
                </i> -->
                <BetLotteryPanelCDT :gameNo="item.gameNo" :suoyin="index" v-on:showData="showChildData" v-on:showLoad="showLoading"/>
              </span>
            </p>
          </div>
        </td>
        <!-- <td class="caozuo">
          <div data-v-62519dfa class="czlast">
            <a  class="ltBtn" @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)">开奖</a>
            <a  class="ltBtn" @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)">走势</a>
            <button data-v-62519dfa class="ltBtn ltcloseBtn">关闭</button>
          </div>
        </td> -->
      </tr>
     
    </table>
  </div>
</template>



<script>

import BetLotteryPanelCDT from './BetLotteryPanelCDT.vue'
export default {
    components: {
          BetLotteryPanelCDT
        },
  data() {
    return {
        gameNumber:"",
        gameOpenNo:"",
        nextGameNo:"",
        gameOpenDt:"",
        gameList:"",
        hongbo:"01-02-07-08-12-13-18-19-23-24-29-30-34-35-40-45-46" ,
        lanbo:"03-04-09-10-14-15-20-25-26-31-36-37-41-42-47-48",
        lvbo:"05-06-11-16-17-21-22-27-28-32-33-38-39-43-44-49",
        loading:[]   
    }
  },
  methods:{
         async getAllopenCode(){
            const rsp = await this.$tools.fetch("/api/getGameLatestOpenNo").get({showCase:'s'});
        if (rsp.success) {    
          this.gameList = rsp.data.list;                   
          localStorage.setItem("caizhong", JSON.stringify(this.gameList));            
      }
          },
          showChildData(sy){
            const data=JSON.parse(localStorage.getItem("caizhong")) 
            this.gameList[sy]=data[sy]      
            this.gameList=this.gameList.concat([])      
          },
          showLoading(sy){                    
            this.gameList[sy].restTime=-1    
            this.gameList=this.gameList.concat([])      
            },
  },

created(){
      this.getAllopenCode()
      
},
  watch: {

    '$route' (to, from) {
         this.getAllopenCode()
    }

  }

}
</script>



<style scoped>
table {
  width:1200px;
  margin: 0 auto;
  background-color: #fff;
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
}
table tr:nth-child(even) {
  background: #f0f0f0;
}
th {
  height: 48px;
  font-weight: 600;
  font-size: 16px;
}

.lotteryName {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
  text-align: left;
}
.lotteryListBody .ltItem > div {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
.lotteryPic {
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  background-size: cover;
  margin-left: 20px;
}
.ltIntro p {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
  text-align: left;
  line-height: 26px;
}
.ltIntro {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  padding: 15px 0 15px 10px;
  text-align: left;
  width: 218px;
  box-sizing: inherit;
}

.result {
  display: inline-block;
  float: left;
  margin-right: 20px;
  width: 36px;
  height: 36px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  padding-top: 0;
  line-height: 36px;
}
.resultLhc{
    float: left;
    width: 34px;
    /* height: 34px; */
    margin-right: 19px;
    line-height: 34px;
    font-size: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
}
.resultPk10 {
display: inline-block;
    float: left;
    margin-right: 4px;
    width: 34px;
    height: 36px;
    font-size: 20px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    position: relative;
    padding-top: 0;
    line-height: 36px;
}
.kaijianghaoma {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
td>div {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
}
.red{
  background: linear-gradient(180deg,#e94e4d 2%,#e0060f);
}
.green{
    background: linear-gradient(180deg,#4cbf80 2%,#0da85d);
}
.blue{
  background: linear-gradient(180deg,#46a7d3 2%,#0689cd);
}
.ltBtn {
    border: 1px solid #343139;
    color: #343139;
    display: inline-block;
    width: 42px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 13px;
    background-color: transparent;
    vertical-align: text-top;
    padding: 0;
}
.caozuo{
      text-align: center;
}
table tr td,table tr th {border-style: none !important;} 
</style>
