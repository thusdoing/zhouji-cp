<template>
  <div class="main_lotteryHeader">
    <div class="lotteryHeader" style="height: 190px;">
      <div data-v-e04d5ea0 class="title">
        <div data-v-e04d5ea0 class="ltname">{{gameName}}</div>
        <div data-v-e04d5ea0 style="    margin-top: 18px;    width: 100px;">
          <img :src="$imgPath(imgPath)" alt width="100%">
        </div>
        <!---->
      </div>
      <div data-v-94e29716 class="lotteryresult">
        <div data-v-94e29716 class="numberqu">
          <div data-v-94e29716 class="nuberqutit">
            <div data-v-94e29716 class="heartEmpty">
              <img src="./../assets/img/xin.png" alt>
            </div>
            <p data-v-94e29716 class="preDrawIssue">
              第
              <span data-v-94e29716 class="redfont">{{openNo}}</span> 期开奖号码
            </p>
          </div>
          <div data-v-94e29716 class="kajianhao">
            <template v-if="flagAnimete==false">
              <ul data-v-94e29716 class="K3numberbox" v-if="gameType==22">
                <li
                  data-v-94e29716
                  class="dice6"
                  v-for="(itemNo,indexNo) in openCode.split(',')"
                  :key="indexNo"
                >
                  <img :src="'/static/shuaizi/'+itemNo+'.png'">
                </li>
              </ul>

              <ul data-v-94e29716 class="K3numberbox" v-else-if="gameType==55 ">
                <li
                  data-v-94e29716
                  class="pk10"
                  v-for="(itemNo,indexNo) in openCode.split(',')"
                  :key="indexNo"
                >
                  <img :src="'/static/pk10/'+itemNo+'.png'">
                </li>
              </ul>

              <ul data-v-94e29716 class="K3numberbox" v-else-if="gameType==66">
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

              <ul data-v-94e29716 class="K3numberbox" v-else>
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
              <ul data-v-94e29716 class="K3numberbox" v-if="gameType==22">
                <li
                  data-v-94e29716
                  class="dice6 saizianimate"
                  v-for="(item,indexNo) in randemarr"
                  :key="indexNo"
                >
                  <img :src="'/static/shuaizi/'+item+'.png'">
                </li>
              </ul>
              <ul data-v-94e29716 class="K3numberbox" v-else-if="gameType==55">
                <li
                  data-v-94e29716
                  class="pk10"
                  v-for="(itemNo,indexNo) in randemarr"
                  :key="indexNo"
                >
                  <img :src="'/static/pk10/'+('0'+itemNo).slice(-2)+'.png'">
                </li>
              </ul>
              <ul data-v-94e29716 class="K3numberbox" v-else-if="gameType==66">
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
              <ul data-v-94e29716 class="K3numberbox" v-else>
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
          <!---->
        </div>
      </div>
      <div data-v-00797725 class="lotteryTime">
        <div data-v-22e61fce data-v-00797725 class="haomaqur_l">
          <p data-v-6ef08456 data-v-94e29716 class="nextOpenissue">
            距下期
            <span data-v-6ef08456 data-v-94e29716 class="redfont">{{nextNo}}</span> 期开奖
          </p>

          <div data-v-e04d5ea0 class="ltperiod" v-if="gameNo!=5501">
            <!-- <span style="position: absolute;right:0.25rem" v-if="gameNo!=5501" >已开<i>{{nextNo.slice(-zongqishu.length)}}</i>期 未开<i style="color:red">{{zongqishu-nextNo.slice(-zongqishu.length)}}</i>期</span>
            <span style="position: absolute;right:0.25rem" v-else >共有<i>{{zongqishu}}</i>期</span>-->
            <p data-v-e04d5ea0 style="margin-left: 34px; ">
              已开
              <span
                data-v-e04d5ea0
                class="drawCount"
                style="color:red"
              >{{nextNo.slice(-zongqishu.length)}}</span>&nbsp;期
            </p>
            <p data-v-e04d5ea0>
              还有
              <span
                data-v-e04d5ea0
                class="sdrawCount"
                style="color:red"
              >{{zongqishu-nextNo.slice(-zongqishu.length)}}</span>&nbsp;期
            </p>
          </div>
          <div data-v-e04d5ea0 class="ltperiod" v-else>
            <!-- <span style="position: absolute;right:0.25rem" v-if="gameNo!=5501" >已开<i>{{nextNo.slice(-zongqishu.length)}}</i>期 未开<i style="color:red">{{zongqishu-nextNo.slice(-zongqishu.length)}}</i>期</span>
            <span style="position: absolute;right:0.25rem" v-else >共有<i>{{zongqishu}}</i>期</span>-->
            <p data-v-e04d5ea0 style="margin-left: 34px; ">{{quanTian}}</p>
          </div>
          <!---->
          <div data-v-22e61fce style="height: 30px;">
            <!---->
          </div>
          <div data-v-22e61fce id="timebox" class="line linetime">
            <!---->
            <div data-v-22e61fce class="opening opentyle" style="display:none">开奖中...</div>
            <!---->
            <div class="cuttime" data-v-22e61fce style="display: inline-block;">
              <span v-if="flagAnimete" data-v-22e61fce class="bgtime hour">开</span>
              <span data-v-22e61fce class="bgtime hour" v-else>{{hour}}</span>
              <span data-v-22e61fce class="hourtxt">时</span>
              <span v-if="flagAnimete" data-v-22e61fce class="bgtime hour">奖</span>
              <span data-v-22e61fce class="bgtime minute" v-else>{{min}}</span>
              <span data-v-22e61fce class="mintxt">分</span>
              <span v-if="flagAnimete" data-v-22e61fce class="bgtime hour">中</span>
              <span data-v-22e61fce class="bgtime second" v-else>{{sec}}</span>
              <span data-v-22e61fce class="sectxt">秒</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lotteryContent">
      <div data-v-473f3d5c class="listhead">
        <div data-v-473f3d5c class="listheadl">
          <span data-v-473f3d5c class="lmms">
            <i data-v-473f3d5c>3</i>开奖记录
          </span>
        </div>
        <div data-v-473f3d5c class="head" style>
          <ul data-v-473f3d5c id="kaijiangj" class="zoushimap kaijiangjl">
            <li data-v-473f3d5c id="jrsmtj" class>
              <a href="#">今日双面/号码统计</a>
              <i data-v-473f3d5c></i>
            </li>
            <li data-v-473f3d5c id="cltx" class style="display:none">
              <a data-v-473f3d5c>长龙提醒</a>
              <i data-v-473f3d5c></i>
            </li>
            <li data-v-473f3d5c id="hmfb" class style="display:none">
              <a data-v-473f3d5c>号码分析</a>
              <i data-v-473f3d5c></i>
            </li>
          </ul>
        </div>
        <div data-v-473f3d5c class="listheadr" style="display: none;">
          <div data-v-473f3d5c class="listheadrr">
            <div data-v-473f3d5c class="rightime">
              <div data-v-473f3d5c id="dateframe">
                <div data-v-473f3d5c class="vdp-datepicker">
                  <div class>
                    <!---->
                    <input type="text" readonly="readonly" class>
                    <!---->
                  </div>
                  <div class="vdp-datepicker__calendar" style="display: none;">
                    <header>
                      <span class="prev">&lt;</span>
                      <span class="up">2019 一月</span>
                      <span class="next">&gt;</span>
                    </header>
                    <div class>
                      <span class="cell day-header">日</span>
                      <span class="cell day-header">一</span>
                      <span class="cell day-header">二</span>
                      <span class="cell day-header">三</span>
                      <span class="cell day-header">四</span>
                      <span class="cell day-header">五</span>
                      <span class="cell day-header">六</span>
                      <span class="cell day blank"></span>
                      <span class="cell day blank"></span>
                      <span track-by="timestamp" class="cell day">1</span>
                      <span track-by="timestamp" class="cell day">2</span>
                      <span track-by="timestamp" class="cell day">3</span>
                      <span track-by="timestamp" class="cell day">4</span>
                      <span track-by="timestamp" class="cell day weekend sat">5</span>
                      <span track-by="timestamp" class="cell day weekend sun">6</span>
                      <span track-by="timestamp" class="cell day">7</span>
                      <span track-by="timestamp" class="cell day">8</span>
                      <span track-by="timestamp" class="cell day">9</span>
                      <span track-by="timestamp" class="cell day">10</span>
                      <span track-by="timestamp" class="cell day">11</span>
                      <span track-by="timestamp" class="cell day weekend sat">12</span>
                      <span track-by="timestamp" class="cell day weekend sun">13</span>
                      <span track-by="timestamp" class="cell day">14</span>
                      <span track-by="timestamp" class="cell day selected today">15</span>
                      <span track-by="timestamp" class="cell day">16</span>
                      <span track-by="timestamp" class="cell day">17</span>
                      <span track-by="timestamp" class="cell day">18</span>
                      <span track-by="timestamp" class="cell day weekend sat">19</span>
                      <span track-by="timestamp" class="cell day weekend sun">20</span>
                      <span track-by="timestamp" class="cell day">21</span>
                      <span track-by="timestamp" class="cell day">22</span>
                      <span track-by="timestamp" class="cell day">23</span>
                      <span track-by="timestamp" class="cell day">24</span>
                      <span track-by="timestamp" class="cell day">25</span>
                      <span track-by="timestamp" class="cell day weekend sat">26</span>
                      <span track-by="timestamp" class="cell day weekend sun">27</span>
                      <span track-by="timestamp" class="cell day">28</span>
                      <span track-by="timestamp" class="cell day">29</span>
                      <span track-by="timestamp" class="cell day">30</span>
                      <span track-by="timestamp" class="cell day">31</span>
                    </div>
                  </div>
                  <div class="vdp-datepicker__calendar" style="display: none;">
                    <header>
                      <span class="prev">&lt;</span>
                      <span class="up">2019</span>
                      <span class="next">&gt;</span>
                    </header>
                    <span track-by="timestamp" class="cell month selected">一月</span>
                    <span track-by="timestamp" class="cell month">二月</span>
                    <span track-by="timestamp" class="cell month">三月</span>
                    <span track-by="timestamp" class="cell month">四月</span>
                    <span track-by="timestamp" class="cell month">五月</span>
                    <span track-by="timestamp" class="cell month">六月</span>
                    <span track-by="timestamp" class="cell month">七月</span>
                    <span track-by="timestamp" class="cell month">八月</span>
                    <span track-by="timestamp" class="cell month">九月</span>
                    <span track-by="timestamp" class="cell month">十月</span>
                    <span track-by="timestamp" class="cell month">十一月</span>
                    <span track-by="timestamp" class="cell month">十二月</span>
                  </div>
                  <div class="vdp-datepicker__calendar" style="display: none;">
                    <header>
                      <span class="prev">&lt;</span>
                      <span>2010 - 2019</span>
                      <span class="next">&gt;</span>
                    </header>
                    <span track-by="timestamp" class="cell year">2010</span>
                    <span track-by="timestamp" class="cell year">2011</span>
                    <span track-by="timestamp" class="cell year">2012</span>
                    <span track-by="timestamp" class="cell year">2013</span>
                    <span track-by="timestamp" class="cell year">2014</span>
                    <span track-by="timestamp" class="cell year">2015</span>
                    <span track-by="timestamp" class="cell year">2016</span>
                    <span track-by="timestamp" class="cell year">2017</span>
                    <span track-by="timestamp" class="cell year">2018</span>
                    <span track-by="timestamp" class="cell year selected">2019</span>
                  </div>
                </div>
              </div>
            </div>
            <div data-v-473f3d5c>选择日期&nbsp;</div>
          </div>
          <div data-v-473f3d5c class="listheadrl">
            <span data-v-473f3d5c id="today" class="checked">今天</span>
            <span data-v-473f3d5c id="yesterday" class>昨天</span>
            <span data-v-473f3d5c id="qianday" class>前天</span>
          </div>
        </div>
      </div>

      <div data-v-f9bf9b6e>
        <div data-v-f9bf9b6e class="listcontent">
          <div data-v-f9bf9b6e id="jrsmtj" class="jrsmtj" v-show="showTodayCount">
            <div data-v-f9bf9b6e class="headtxt">今日双面统计</div>
            <table data-v-f9bf9b6e cellpadding="1" cellspacing="1" border="0">
              <tbody data-v-f9bf9b6e>
                <tr data-v-f9bf9b6e>
                  <th data-v-f9bf9b6e width="176">号码</th>
                  <th data-v-f9bf9b6e colspan="1" width="80">1</th>
                  <th data-v-f9bf9b6e colspan="1" width="80">2</th>
                  <th data-v-f9bf9b6e colspan="1" width="80">3</th>
                  <th data-v-f9bf9b6e colspan="1" width="80">4</th>
                  <th data-v-f9bf9b6e colspan="1" width="80">5</th>
                  <th data-v-f9bf9b6e colspan="1" width="80">6</th>
                  <th data-v-f9bf9b6e colspan="4" width="500">总和</th>
                </tr>
                <tr data-v-f9bf9b6e id="shuanmiandata">
                  <td data-v-f9bf9b6e>出现次数</td>
                  <td data-v-f9bf9b6e>158</td>
                  <td data-v-f9bf9b6e>134</td>
                  <td data-v-f9bf9b6e>173</td>
                  <td data-v-f9bf9b6e>153</td>
                  <td data-v-f9bf9b6e>168</td>
                  <td data-v-f9bf9b6e>132</td>
                  <td data-v-f9bf9b6e>单：145</td>
                  <td data-v-f9bf9b6e>双：161</td>
                  <td data-v-f9bf9b6e>大：158</td>
                  <td data-v-f9bf9b6e>小：148</td>
                </tr>
              </tbody>
            </table>
          </div>
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
                  <th data-v-f9bf9b6e width="240px">时间</th>
                  <th data-v-f9bf9b6e width="180px">期数</th>
                  <th data-v-f9bf9b6e width="570px" id="numberbtn" class="numberbtn">显示号码</th>
                  <th data-v-f9bf9b6e width="210px" colspan="3" v-if="gameType==55">冠亚和</th>
                  <th data-v-f9bf9b6e width="210px" colspan="3" v-else>总和</th>
                  <!-- <th data-v-f9bf9b6e width="210px" colspan="5">鱼虾蟹</th> -->
                </tr>
                <tr data-v-f9bf9b6e v-for="(item,index) in gameList" :key="index">
                  <td data-v-f9bf9b6e>{{dateFormat(item.gameOpenDt)}}</td>
                  <td data-v-f9bf9b6e>{{item.gameNumber}}</td>
                  <td data-v-f9bf9b6e class="blueqiu">
                    <ul data-v-f9bf9b6e>
                      <template v-if="gameType==22">
                        <li
                          data-v-f9bf9b6e
                          class="dice1"
                          style="float: none;"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <img :src="'/static/shuaizi/'+itemNo+'.png'">
                        </li>
                      </template>
                      <template v-else-if="gameType==55">
                        <li
                          data-v-f9bf9b6e
                          class="dice1"
                          style="float: none;    margin: 2px 5px;     width: 34px"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <img :src="'/static/pk10/'+itemNo+'.png'">
                        </li>
                      </template>
                      <template v-else-if="gameType==66">
                        <li
                          data-v-f9bf9b6e
                          class="dice1 resultLhc"
                          :class="{'red':hongbo.indexOf(itemNo)!=-1,'blue':lanbo.indexOf(itemNo)!=-1,'green':lvbo.indexOf(itemNo)!=-1}"
                          style="float: none;    margin: 2px 5px;     width: 34px"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <i>{{itemNo}}</i>
                        </li>
                      </template>
                      <template v-else>
                        <li
                          data-v-f9bf9b6e
                          class="resultLhc blue ssc"
                          style=" float:none; margin: 2px 5px; width: 34px；border-radius: 50%;"
                          v-for="(itemNo,indexNo) in item.gameOpenNo.split(',')"
                          :key="indexNo"
                        >
                          <i>{{itemNo}}</i>
                        </li>
                      </template>
                    </ul>
                  </td>

                  <td style="color:#C84E40">{{item.gameOpenNoCase[0]}}</td>
                  <td data-v-f9bf9b6e v-if="item.gameOpenNoCase[1]!=''">
                    <span
                      :class="[{'yanse1':item.gameOpenNoCase[1]=='大','yanse2':item.gameOpenNoCase[1]=='小'}]"
                    >{{item.gameOpenNoCase[1]}}</span>
                  </td>
                  <td
                    data-v-f9bf9b6e
                   
                  > <span
                      :class="[{'yanse4':item.gameOpenNoCase[2]=='单','yanse3':item.gameOpenNoCase[2]=='双'}]"
                    >{{item.gameOpenNoCase[2]}}</span></td>
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
      imgPath: "",
      zonghe: [],
      qiShuLength: 3,
      zongqishu: 0
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
        } else if (this.gameType == 44) {
          this.randemarr = [1, 1, 1, 1, 1].map(item => {
            return ("0" + Math.ceil(Math.random() * 11)).slice(-2);
          });
        } else {
          this.randemarr = [1, 1, 1, 1, 1].map(item => {
            return Math.ceil(Math.random() * 10 - 1);
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
        .setJson({ gameNo: this.gameNo, size: 100 })
        .post();
      this.gameList = rsp.data.list;

      if (this.openNo != this.gameList[0].gameNumber) {
        this.openCode = this.gameList[0].gameOpenNo;
        this.openNo = this.gameList[0].gameNumber;
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
      this.imgPath = caiZhongData.imgPath;
      this.quanTian = caiZhongData.gameNote;
      const x = this.quanTian.indexOf("共");
      const y = this.quanTian.indexOf("期");
      if (x == -1 || y == -1) {
        this.qiShuLength = 0;
      } else {
        this.zongqishu = this.quanTian.slice(x + 1, y);
        this.qiShuLength = this.zongqishu.length;
      }
      this.nextNo = caiZhongData.gameNextNumber;
      if (this.openNo != caiZhongData.gameNumber) {
        this.openCode = caiZhongData.gameOpenNo;
        this.openNo = caiZhongData.gameNumber;
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
      this.openNo = "";
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
.numberqu .kajianhao ul.K3numberbox li,
.numberqu .kajianhao ul.KL8numberbox .ssc {
  border-radius: 50%;
  height: 36px;
}
.main_lotteryHeader {
  width: 100%;
  clear: both;
  margin: 20px auto 0;
  -moz-box-sizing: border-box;
  color: #555;
  padding-bottom: 22px;
  background-color: #f0f0f0;
}
.lotteryHeader {
  width: 1200px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  border-top: 3px solid #f73b32;
  padding: 20px;
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
  height: 45px;
  float: left;
  position: relative;
  font-size: 16px;
}
.title {
  display: inline-block;
}
i,
th {
  font-weight: 400;
  font-style: normal;
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
  height: 38px;
  width: 38px;
  margin: 2px 11px;
  color: #fff;
  padding: 0;
  line-height: 38px;
  border-radius: 5px;
}
.listcontent div .blueqiu ul .ssc {
  border-radius: 50%;
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
  height: 38px;
  width: 38px;
  margin: 2px -10px;
  color: #fff;
  padding: 0;
  line-height: 38px;
  border-radius: 5px;
}
.resultLhc {
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
  width: 34px;
  height: 34px;
  line-height: 34px;
  background: #686ff6;
  color: #fff;
}
.jrsmhmtj table tr td .yanse2 {
  display: block;
  height: 34px;
  width: 34px;
  line-height: 34px;
  background: #c6ba01;
  color: #fff;
}
.jrsmhmtj table tr td .yanse3 {
  display: block;
  height: 34px;
  width: 34px;
  line-height: 34px;
  background: #D0517E;
  color: #fff;
}
.jrsmhmtj table tr td .yanse4 {
  display: block;
  height: 34px;
  width: 34px;
  line-height: 34px;
  background: #87C95D;
  color: #fff;
}
/* table tr td,table tr th {border-style: none !important;}  */
</style>
