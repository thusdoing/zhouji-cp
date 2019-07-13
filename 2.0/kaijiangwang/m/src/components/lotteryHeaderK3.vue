<template>
  <div class="main_lotteryHeader">
      <div data-v-62519dfa class="ltIntro cz" style="padding-left:0.25rem">
        <div class="qishu" style="position: relative;">
          <span>第</span>
          <span data-v-62519dfa style="fong-size:0.17rem;">
            <i data-v-62519dfa class="orange" style="color:red;">{{openNo}}</i> 期开奖号码
          </span>
          <span style="position: absolute;right:0.25rem" v-if="gameNo!=5501" >已开<i>{{nextNo.slice(-zongqishu.length)}}</i>期 未开<i style="color:red">{{zongqishu-nextNo.slice(-zongqishu.length)}}</i>期</span>
          <span style="position: absolute;right:0.25rem" v-else >共有<i>{{zongqishu}}</i>期</span>
        </div>
          <div class="jianghao" style="width:9rem;overflow: hidden; margin: 0.3rem;">
            <div class="kajianhao kjhm">
        <template v-if="flagAnimete==false && openCode.length>0">
              <ul data-v-94e29716 class="SSCnumberbox" v-if="gameType==22">
                <li
                  data-v-94e29716
                  class="result"
                  v-for="(itemNo,indexNo) in openCode.split(',')"
                  :key="indexNo"
                >
                  <img :src="'/static_h5/shuaizi/'+itemNo+'.png'">
                </li>
              </ul>

              <ul data-v-94e29716 class="SSCnumberbox" v-else-if="gameType==55 ">
                <li
                  data-v-94e29716
                  class="pk10"
                  v-for="(itemNo,indexNo) in openCode.split(',')"
                  :key="indexNo"
                >
                  <img :src="'/static_h5/pk10/'+itemNo+'.png'">
                </li>
              </ul>

              <ul data-v-94e29716 class="SSCnumberbox" v-else-if="gameType==66">
                <li
                  data-v-94e29716
                  class="dice1 resultLhc"
                  :class="{'red':hongbo.indexOf(itemNo)!=-1,'blue':lanbo.indexOf(itemNo)!=-1,'green':lvbo.indexOf(itemNo)!=-1}"
                  v-for="(itemNo,indexNo) in openCode.split(',')"
                  :key="indexNo"
                >
                  <i>{{itemNo}}</i>
                </li>
              </ul>

              <ul data-v-94e29716 class="SSCnumberbox" v-else>
                <li
                  data-v-94e29716
                  class="resultLhc blue ssc"
                  v-for="(itemNo,indexNo) in openCode.split(',')"
                  :key="indexNo"
                >
                  <i>{{itemNo}}</i>
                </li>
              </ul>
            </template>
            <template v-else>
              <ul data-v-94e29716 class="SSCnumberbox" v-if="gameType==22">
                <li
                  data-v-94e29716
                  class="saizianimate result"
                  v-for="(item,indexNo) in randemarr"
                  :key="indexNo"
                >
                  <img :src="'/static_h5/shuaizi/'+item+'.png'">
                </li>
              </ul>
              <ul data-v-94e29716 class="SSCnumberbox" v-else-if="gameType==55">
                <li
                  data-v-94e29716
                  class="pk10"
                  v-for="(itemNo,indexNo) in randemarr"
                  :key="indexNo"
                >
                  <img :src="'/static_h5/pk10/'+('0'+itemNo).slice(-2)+'.png'">
                </li>
              </ul>
              <ul data-v-94e29716 class="SSCnumberbox" v-else-if="gameType==66">
                <li
                  data-v-94e29716
                  class="dice1 resultLhc"
                  :class="{'red':hongbo.indexOf(itemNo)!=-1,'blue':lanbo.indexOf(itemNo)!=-1,'green':lvbo.indexOf(itemNo)!=-1}"
                  v-for="(itemNo,indexNo) in randemarr"
                  :key="indexNo"
                >
                  <i>{{itemNo}}</i>
                </li>
              </ul>
              <ul data-v-94e29716 class="SSCnumberbox" v-else>
                <li
                  data-v-94e29716
                  class="dice1 resultLhc ssc blue"
                                    v-for="(itemNo,indexNo) in randemarr"
                  :key="indexNo"
                >
                  <i>{{itemNo}}</i>
                </li>
              </ul>
            </template>
            </div>
          </div>
        <div style="font-size:0.25rem;position: relative;">
          <span class="dxds" style="margin-right:0.1rem;">总和：</span>
          <span class="dxds" style="margin-right:0.1rem;color:red">{{zonghe[0]}}</span>
          <span class="dxds" style="margin-right:0.1rem;color:red">{{zonghe[1]}}</span>
          <span class="dxds" style="margin-right:1rem;color:red">{{zonghe[2]}}</span>
          <span class="dxds" style="position: absolute; right:0.3rem;top: -0.15rem;">距下期:
            <template v-if="flagAnimete">
              <span data-v-22e61fce class="dxds"><i style="font-size:0.4rem;color:red">开奖中</i></span>              
            </template>
            <template v-else>
              <span data-v-22e61fce class="dxds" v-if="hour>0"><i style="font-size:0.5rem;color:red">{{hour}}</i>:</span>              
              <span data-v-22e61fce class="dxds"><i style="font-size:0.5rem;color:red">{{min}}</i></span>
              <span data-v-22e61fce class="dxds">:</span>
              <span data-v-22e61fce class="dxds"><i style="font-size:0.5rem;color:red">{{sec}}</i></span>
            </template>
          </span>
        </div>
    </div>










    <div class="lotteryContent">
      <div data-v-473f3d5c class="listhead">
        <div data-v-473f3d5c class="listheadl">
                     开奖记录        </div>        
      </div>

      <div data-v-f9bf9b6e>
        <div data-v-f9bf9b6e class="listcontent">          
          <div data-v-f9bf9b6e id="jrsmhmtj" class="jrsmhmtj">
            <table
              data-v-f9bf9b6e
              id="jrsmhmtjTab"
              cellpadding="1"
              cellspacing="1"
              border="0"
              style="background: rgb(212, 212, 212);"
            >
              <tbody data-v-f9bf9b6e>
                <tr data-v-f9bf9b6e>
                  <th data-v-f9bf9b6e width="12%">期数</th>
                  <th data-v-f9bf9b6e width="68%" id="numberbtn" class="numberbtn">显示号码</th>
                  <th data-v-f9bf9b6e width="20%" colspan="3" v-if="gameType==55">冠亚和</th>
                  <th data-v-f9bf9b6e width="20%" colspan="3" v-else>总和</th>
                  <!-- <th data-v-f9bf9b6e width="210px" colspan="5">鱼虾蟹</th> -->
                </tr>
                <tr data-v-f9bf9b6e v-for="(item,index) in gameList" :key="index">
                  <td data-v-f9bf9b6e>{{item.gameNumber.slice(-zongqishu.length)}}</td>
                  <td data-v-f9bf9b6e class="blueqiu">
                    <ul data-v-f9bf9b6e >
                      <template v-if="gameType==22">
                        <li
                          data-v-f9bf9b6e
                          class="dice1"
                          style="float: none;"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <img :src="'/static_h5/shuaizi/'+itemNo+'.png'">
                        </li>
                      </template>
                      <template v-else-if="gameType==55">
                        <li
                          data-v-f9bf9b6e
                          class="dice1" 
                          style="margin:0.2rem 1px;width:0.38rem;float: none;"                        
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <img :src="'/static_h5/pk10/'+itemNo+'.png'">
                        </li>
                      </template>
                      <template v-else-if="gameType==66">
                        <li
                          data-v-f9bf9b6e
                          class="dice1 resultLhc"
                          :class="{'red':hongbo.indexOf(itemNo)!=-1,'blue':lanbo.indexOf(itemNo)!=-1,'green':lvbo.indexOf(itemNo)!=-1}"
                          style="margin: 0.2rem 0.09rem;float: none;"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <i>{{itemNo}}</i>
                        </li>
                      </template>
                      <template v-else>
                        <li
                          data-v-f9bf9b6e
                          class="dice1 result ssc blue"
                          style="border-radius: 50%; float: none;"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <i>{{itemNo}}</i>
                        </li>
                      </template>
                    </ul>
                  </td>
           
                    <td style="color:#C84E40">{{item.gameOpenNoCase[0]}}</td>
                    <td
                      data-v-f9bf9b6e                      
                    v-if="item.gameOpenNoCase[1]!=''"> <span
                      :class="[{'yanse1':item.gameOpenNoCase[1]=='大','yanse2':item.gameOpenNoCase[1]=='小'}]"
                    >{{item.gameOpenNoCase[1]}}</span></td>
                    <td
                      data-v-f9bf9b6                     
                    > <span
                      :class="[{'yanse4':item.gameOpenNoCase[2]=='单','yanse3':item.gameOpenNoCase[2]=='双'}]"
                    >{{item.gameOpenNoCase[2]}}</span></td>
               

                  <!-- <td data-v-f9bf9b6e style="color: rgb(241, 45, 53);">鱼</td>
                  <td data-v-f9bf9b6e style="color: rgb(0, 128, 0);">蟹</td>
                  <td data-v-f9bf9b6e style="color: rgb(0, 128, 0);">蟹</td>-->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div data-v-35b6b067 data-v-f9bf9b6e class="goToTop" style="display: none;">
          <div data-v-35b6b067 class="fix1200">
            <a data-v-35b6b067 id="goTop"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const C_SECOND_TIME = 1000;
const C_MINUTE_TIME = C_SECOND_TIME * 60;
const C_HOVER_TIME = C_MINUTE_TIME * 60;
const C_DAY_TIME = C_HOVER_TIME * 24;
export default {
  data() {
    return {
      zoushiShow: false,
      gameList: [],
      showTodayCount: false,
      gameNo: "",
      gameName: "",
      openCode: "",
      openNo: "",
      nextNo: "",
      endTime: 0,
      content: "",
      day: 0, // 天
      hour: 0, // 时
      min: 0, // 分
      sec: 0, // 秒
      hourArr: [0, 0], // 小时
      minArr: [0, 0], // 分 截取数组
      secArr: [0, 0], // 秒 截取数组
      stop: 0, // 0打开  1关闭
      timer: null,
      startTime: true,
      flagAnimete: false,
      timer2: null,
      gameType: "",
      startUpdate: true,
      quanTian: "",
      randomNo: 1,
      timer3: null,
      randemarr: [],
      hongbo: "01-02-07-08-12-13-18-19-23-24-29-30-34-35-40-45-46",
      lanbo: "03-04-09-10-14-15-20-25-26-31-36-37-41-42-47-48",
      lvbo: "05-06-11-16-17-21-22-27-28-32-33-38-39-43-44-49",
      zonghe:[],
      qiShuLength:3,
      zongqishu:0
    };
  },
  methods: {
    showZouShi() {
      this.zoushiShow = !this.zoushiShow;
    },
    jiShiKaiJiang() {
      this.zoushiShow = false;
    },
    kaiJiangLiShi() {
      this.zoushiShow = false;
    },
    EshowTodayCount() {
      this.showTodayCount = !this.showTodayCount;
    },

    dateFormat(date, fmt = "YYYY-MM-DD HH:mm:ss") {
      let newDate = new Date(date);
      var o = {
        "M+": newDate.getMonth() + 1,
        "D+": newDate.getDate(),
        "h+": newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
        "H+": newDate.getHours(),
        "m+": newDate.getMinutes(),
        "s+": newDate.getSeconds(),
        "q+": Math.floor((newDate.getMonth() + 3) / 3),
        S: newDate.getMilliseconds()
      };
      var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
      };
      if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (newDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (RegExp.$1.length > 1
            ? RegExp.$1.length > 2
              ? "\u661f\u671f"
              : "\u5468"
            : "") + week[date.getDay() + ""]
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
    startAnimete() {
      clearInterval(this.timer3);
      this.timer3 = setInterval(() => {
        if (this.gameType == 22) {
          this.randemarr = [1, 1, 1].map(item => {
            return Math.ceil(Math.random() * 6);
          });
        } else if (this.gameType == 55) {
          this.randemarr = this.randemarr.map(item => {
            item = Number(item) + 1;
            if (item % 10 == 0) {
              return 10;
            }
            return item % 10;
          });

        } else if (this.gameType == 66) {
          this.randemarr = this.randemarr.map(item => {
            item = item + 1;
            if (item % 49 == 0) {
              return 49;
            }
            return item % 49;
          });         
        }else if(this.gameType == 44){
        this.randemarr = [1, 1, 1,1,1].map(item => {
            return ('0'+Math.ceil(Math.random() * 11)).slice(-2);
          });

        }else{
          this.randemarr = [1, 1, 1,1,1].map(item => {
            return Math.ceil(Math.random() * 10-1);
          });
        }
      }, 300);
    },
    countdowm(timestamp) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        let t = timestamp * 1000;
        if (t >= 0) {
          this.day = Math.floor(t / C_DAY_TIME);
          this.hour = Math.floor(t / C_HOVER_TIME);
          this.min = Math.floor((t / C_MINUTE_TIME) % 60);
          this.sec = Math.floor((t / C_SECOND_TIME) % 60);
          this.hour = ("0" + this.hour).slice(-2);
          this.min = ("0" + this.min).slice(-2);
          this.sec = ("0" + this.sec).slice(-2);
        } else {
          this.stop = 1;
          clearInterval(this.timer);
          clearInterval(this.timer2);
          this.startTime = true;
          this.startUpdate = true;
          this.codeUpdate();
          // this.countdowm(this.endTime);
          return;
        }
        timestamp -= 1;
      }, 1000);
    },
    async toCalcCountDown(rsp) {
      const { restTime, restSaleTime } = rsp;
      let time = Number(restTime) + Number(restSaleTime);
      if (restTime > 0) {
        this.endTime = restTime;
      } else {
        this.endTime = restSaleTime;
      }
    },
    async getWinResult() {
      const rsp = await this.$tools
        .fetch("/api/winResult")
        .setJson({ gameNo: this.gameNo ,size:100})
        .post();
      this.gameList = rsp.data.list;

      if (this.openNo != this.gameList[0].gameNumber) {
        this.openCode = this.gameList[0].gameOpenNo;
        this.openNo = this.gameList[0].gameNumber;
        this.zonghe=this.gameList[0].gameOpenNoCase;
      if (this.startTime == true) {
        this.startTime = false;
        this.toCalcCountDown(rsp.data.t);
        this.countdowm(this.endTime);
      }
        this.flagAnimete = false;
        clearInterval(this.timer3);
      }
    },
    async codeUpdateFun() {
      const rsp = await this.$tools
        .fetch("/api/getGameLatestOpenNo?gameNo=" + this.gameNo + "&showCase=s")
        .get();
      if (!rsp.success) return undefined;
      let caiZhongData = rsp.data.list[0];
      this.quanTian = caiZhongData.gameNote;
      const x=this.quanTian.indexOf("共")
      const y=this.quanTian.indexOf("期")
      if(x==-1 || y==-1) {this.qiShuLength=0}else{
      this.zongqishu=this.quanTian.slice(x+1,y)
      this.qiShuLength=this.zongqishu.length   
      }
     this.nextNo = caiZhongData.gameNextNumber;
      if (this.openNo != caiZhongData.gameNumber) {
        this.openCode = caiZhongData.gameOpenNo;
        this.openNo = caiZhongData.gameNumber;
        this.zonghe=caiZhongData.gameOpenNoCase;
        this.getWinResult();
      if (this.startTime == true) {
        this.startTime = false;
        this.toCalcCountDown(caiZhongData);
        this.countdowm(this.endTime);
      }
        clearInterval(this.timer2);
        this.flagAnimete = false;
        clearInterval(this.timer3);
      }
    },
    codeUpdate() {
      if (this.startUpdate == true) {
        if (this.openCode.length > 0) {
          clearInterval(this.timer3);
          this.randemarr = this.openCode.split(",");
          this.openCode = "";
          this.flagAnimete = true;
          this.startAnimete();
        }

        this.startUpdate = false;
        clearInterval(this.timer2);
        this.codeUpdateFun();
        this.timer2 = setInterval(async () => {
          this.codeUpdateFun();
        }, 5000);
      }
    }
  },
  watch: {
    gameNo: function() {
      clearInterval(this.timer);
      clearInterval(this.timer2);
      clearInterval(this.timer3);
      this.randemarr = this.openCode.split(",");
      this.openCode = "";
      this.gameList = [];
      this.randemarr=[]
      this.openNo=""
      this.gameType = this.gameNo.slice(0, 2);
      this.startTime = true;
      this.startUpdate = true;
      this.getWinResult();
      this.codeUpdate();
    },
    $route(to, from) {

      clearInterval(this.timer);
      clearInterval(this.timer2);
      this.gameNo = this.$route.params.gameNo;
      this.gameName = this.$route.params.gameName;
    }
  },
  created() {
    this.openNo=""
    this.gameList=[]
    this.gameNo = this.$route.params.gameNo;
    this.gameName = this.$route.params.gameName;
    this.gameType = this.gameNo.slice(0, 2);
    // this.startAnimete();
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  }
};
</script>

















<style scoped>
.main_lotteryHeader {
  width: 100%;
  clear: both;
  margin-top: 0.34rem;
  /* margin: 20px auto 0; */
  -moz-box-sizing: border-box;
  color: #555;
  padding-bottom: 22px;
  background-color: #f0f0f0;
  font-size: 0.25rem
}
.numberqu .kajianhao, .numbox{
  width: 3.39rem;
  height: 0.6rem;
}
.lotteryHeader {
  width: 6.6rem;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  border-top: 3px solid #f73b32;
  /* padding: 20px; */
}
.head {
  padding: 10px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
  /* margin-left: 112px; */
  /* margin-left: 7rem; */
  width: 540px;
}
.listhead .listheadl {
    width: 104px;
    height: 0.6rem;
    float: left;
    position: relative;
    font-size: 0.3rem;
    line-height: 0.6rem;
    margin-left: 0.5rem;
}
.title {
  display: inline-block;
  font-size: 0.25rem
}
.numberqu .kajianhao ul.K3numberbox li, .numberqu .kajianhao ul.KL8numberbox .ssc{
  border-radius: 50%;
  height: 0.4rem;
}
i,
th {
  font-weight: 400;
  font-style: normal;
}
.SSCnumberbox{
  width: 100%;
  /* height: 0.8rem;
  line-height: 0.8rem */

}
.soundline .soundicon {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 999999;
  background: #c00;
  right: -35px;
  top: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABzUlEQ…QZR7FBWPFUJFQrlVMCrsdjrBLZ+VX43lZUOv/VHfB/B/4J5oBbrC2ghjMAAAAASUVORK5CYII=)
    no-repeat;
}

.lotteryOption ul a .active {
  background: #ff6d3d;
  color: #fff;
}

.zhlzbox .listhead .listheadl span[data-v-473f3d5c] {
  display: inline-block;
  line-height: 45px;
  width: 160px;
  text-align: center;
  height: 45px;
  position: absolute;
  vertical-align: middle;
  border-right: 1px solid #e5e5e5;
  cursor: pointer;
  color: #333;
  font-size: 18px;
  border-right: none;
  width: auto;
}
.lotteryContent {
  border-top: 3px solid #f73b32;
}

.listcontent div .blueqiu ul li {
  height: 0.4rem;
  width: 0.4rem;
  margin: 0.2rem 0.1rem;
  color: #fff;
  padding: 0;
  line-height: 0.4rem;
  border-radius: 5px;
}
.dice6 {
  height: 38px;
  width: 38px;
  margin: 2px 11px;
  color: #fff;
  padding: 0;
  line-height: 38px;
  border-radius: 5px;
}
.pk10 {
  display: inline-block;
  margin-right: 0.15rem;
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0.3rem;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  padding-top: 0;
  line-height: 0.5rem;
   vertical-align: middle;
}
.resultLhc {
  float: left;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.25rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  vertical-align: middle;
}
.result{
  display: inline-block;
  margin-right: 0.3rem;
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0.3rem;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  padding-top: 0;
  line-height: 0.5rem;
   vertical-align: middle;
}
.red {
  background: linear-gradient(180deg, #e94e4d 2%, #e0060f);
}
.green {
  background: linear-gradient(180deg, #4cbf80 2%, #0da85d);
}
.blue {
  background: linear-gradient(180deg, #46a7d3 2%, #0689cd);
}
.lotteryOption ul .active[data-v-94e29716] {
  background: #ff6d3d;
  color: #fff;
}
@keyframes saizi {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
.saizianimate {
  animation: saizi 1s 0.8s infinite ease-in-out;
}

.sscqiuanime {
  animation: qiudong 0.5s linear infinite;
}

.bjpk10qiuanime {
  animation: bjpk10 0.3s linear infinite;
}

.lhcanimation {
  animation: lhc 3s linear infinite;
}

@keyframes qiudong {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-440px);
  }
}

@keyframes bjpk10 {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-220px);
  }
}

@keyframes lhc {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-1500px);
  }
}
.jrsmhmtj table tr td .yanse1 {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #686ff6;
  color: #fff;
}
.jrsmhmtj table tr td .yanse2 {
  display: block;
  height: 0.4rem;
  width: 0.4rem;
  line-height: 0.4rem;
  background: #c6ba01;
  color: #fff;
}
.jrsmhmtj table tr td .yanse3 {
  display: block;
  height: 0.4rem;
  width: 0.4rem;
  line-height: 0.4rem;
  background: #D0517E;
  color: #fff;
}
.jrsmhmtj table tr td .yanse4 {
  display: block;
  height: 0.4rem;
  width: 0.4rem;
  line-height: 0.4rem;
  background: #87C95D;
  color: #fff;
}


</style>
