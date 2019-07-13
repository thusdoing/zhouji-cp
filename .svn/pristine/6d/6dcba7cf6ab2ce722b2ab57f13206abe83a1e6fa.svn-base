<template>
  <div class=".kaijianglist">
    <div v-for="(item,index) in gameList" :key="index" class="listXq" @click="$router.push(`/record/${item.gameNo}/${item.gameName}`)">
      <div data-v-62519dfa class="lotteryPic OG1K3">
        <img :src="$imgPath(item.imgPath)"  alt  style="vertical-align: middle;">
      </div>
      <div data-v-62519dfa class="ltIntro cz">
        <div class="qishu" style="position: relative;">
          <span
            data-v-62519dfa
            class="lotteryName"
            style="font-weight:700"
          >{{item.gameName}}</span>
          <span data-v-62519dfa style="fong-size:0.17rem;position: absolute; right:5px ">
            <i data-v-62519dfa class="orange" style="color:red;">{{item.gameNumber}}</i> 期
          </span>
        </div>
        <template v-if="item.restTime>=0">
          <div class="jianghao" style="width:9rem;overflow: hidden;">
            <div class="kajianhao kjhm">
              <ul data-v-62519dfa class="SSCnumberbox" v-if="item.gameType==22">
                <li
                  data-v-62519dfa
                  class="result"
                  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')"
                  :key="indexNo"
                >
                  <img :src="'/static_h5/shuaizi/'+itmeNo+'.png'">
                </li>
              </ul>
              <ul data-v-62519dfa class="SSCnumberbox" v-else-if="item.gameType==55">
                <li
                  data-v-62519dfa
                  class="resultPk10"
                  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')"
                  :key="indexNo"
                >
                  <img :src="'/static_h5/pk10/'+itmeNo+'.png'">
                </li>
              </ul>
              <ul data-v-62519dfa class="SSCnumberbox"  v-else-if="item.gameType==66">
                <li
                  data-v-62519dfa
                  class="resultLhc"
                  :class="{'red':hongbo.indexOf(itmeNo)!=-1,'blue':lanbo.indexOf(itmeNo)!=-1,'green':lvbo.indexOf(itmeNo)!=-1}"
                  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')"
                  :key="indexNo"
                >
                  <!-- <img :src="'/static_h5/pk10/'+itmeNo+'.png'"> -->
                  <i>{{itmeNo}}</i>
                </li>
              </ul>
              <ul data-v-62519dfa class="SSCnumberbox"  v-else>
                <li
                  data-v-62519dfa
                  class="resultLhc blue"
                  v-for="(itmeNo,indexNo) in item.gameOpenNo.split(',')"
                  :key="indexNo"                >
                  <!-- <img :src="'/static_h5/pk10/'+itmeNo+'.png'"> -->
                  <i>{{itmeNo}}</i>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="jianghao"
            style="width:9rem;overflow: hidden; background: url(/static_h5/loading.gif) no-repeat;height:0.52rem"
          ></div>
        </template>

        <div style="font-size:0.25rem;position: relative;">
          <span class="dxds" style="margin-right:0.1rem;">总和：</span>
          <span class="dxds" style="margin-right:0.1rem;">{{item.gameOpenNoCase[0]}}</span>
          <span class="dxds" style="margin-right:0.1rem;">{{item.gameOpenNoCase[1]}}</span>
          <span class="dxds" style="margin-right:1rem;">{{item.gameOpenNoCase[2]}}</span>
          <span class="dxds" style="position: absolute; right:5px">距下期:<BetLotteryPanelCDT :gameNo="item.gameNo" :suoyin="index" v-on:showData="showChildData" v-on:showLoad="showLoading" /></span>
        </div>
      </div>

      <!-- <div
        style="width:294px     width: 294px;
    position: absolute;
    right: 0.1rem;
    top: 0.28rem;"
      >
        <div data-v-62519dfa class="openTime kjsj">
          <p data-v-62519dfa style>
            <span data-v-62519dfa>距下期:
              <BetLotteryPanelCDT
                :gameNo="item.gameNo"
                :suoyin="index"
                v-on:showData="showChildData"
                v-on:showLoad="showLoading"
              />
            </span>
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>



<script>
import BetLotteryPanelCDT from "./BetLotteryPanelCDT.vue";
export default {
  components: {
    BetLotteryPanelCDT
  },
  data() {
    return {
      gameNumber: "",
      gameOpenNo: "",
      nextGameNo: "",
      gameOpenDt: "",
      gameList: "",
      hongbo: "01-02-07-08-12-13-18-19-23-24-29-30-34-35-40-45-46",
      lanbo: "03-04-09-10-14-15-20-25-26-31-36-37-41-42-47-48",
      lvbo: "05-06-11-16-17-21-22-27-28-32-33-38-39-43-44-49",
      loading: []
    };
  },
  methods: {
    async getAllopenCode() {
      const rsp = await this.$tools
        .fetch("/api/getGameLatestOpenNo")
        .get({ showCase: "s" });
      if (rsp.success) {
        this.gameList = rsp.data.list;
        localStorage.setItem("caizhong", JSON.stringify(this.gameList));
      }
    },
    showChildData(sy) {
      const data = JSON.parse(localStorage.getItem("caizhong"));
      this.gameList[sy] = data[sy];
      this.gameList = this.gameList.concat([]);
    },
    showLoading(sy) {
      this.gameList[sy].restTime = -1;
      this.gameList = this.gameList.concat([]);
    }
  },

  created() {
    this.getAllopenCode();
  },
  watch: {
    $route(to, from) {
      this.getAllopenCode();
    }
  }
};
</script>



<style scoped>
.kaijianglist {
  width: 100%;
  margin: 0 auto;
  background: #f0f0f0;
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.25rem;
}
.listXq {
  position: relative;
  margin: 0.2rem;
  background: #fff;
}
.jianghao {
  margin: 0.1rem;
}
.lotteryName {
  display: inline-block;
  vertical-align: top;
  text-align: left;
}
.dxds {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
}
.lotteryListBody .ltItem > div {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
.lotteryPic {
  display: inline-block;
  width: 1.1rem;
  height: 50px;
  vertical-align: middle;
  background-size: cover;
  margin-left: 10px;
}
.ltIntro p {
  display: inline-block;
  vertical-align: top;
  text-align: left;
  line-height: 26px;
  font-size: 0.25rem;
}
.ltIntro {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  padding: 0.25rem 0 0.25rem 0px;
  text-align: left;
  width: 5rem;
  box-sizing: inherit;
}

.result {
  display: inline-block;
  float: left;
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
}
.resultPk10 {
  display: inline-block;
  float: left;
  margin-right: 4px;
  width: 0.42rem;
  height: 0.42rem;
  font-size: 0.3rem;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  padding-top: 0;
  line-height: 0.42rem;
}
.kaijianghaoma {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
.listXq > div {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
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
p {
  font-size: 0.25rem;
}
.caozuo {
  text-align: center;
}
.qishu {
  font-size: 0.25rem;
}
</style>
