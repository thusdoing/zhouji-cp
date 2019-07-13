<template>
  <div class="bet">
    <div class="head">
      <div class="service_msg">
        <div>
          <div class="left" style="margin-right:20px;">
            <i class="iconfont icon-kefu vertical-m"></i>
            <span class="vertical-m">企业客服：</span>
            <span class="vertical-m">123456</span>
          </div>
          <div class="left">
            <span class="vertical-m">在线人数：</span>
            <span class="vertical-m" v-text="OnlineUser"></span>
          </div>
          <div class="right">
            <i class="iconfont icon-icon165 vertical-m"></i>
            <span class="vertical-m" v-text="hourFun">下午</span>
          </div>
          <div class="right" style="margin-right:20px;">
            <router-link style="color:#fff;" to="/homeView/user_center/changePassword">
              <i style="font-size:14px;" class="iconfont icon-mima vertical-m"></i>
              <span class="vertical-m">修改密码</span>
            </router-link>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="logo flex">
        <div class="logo_img">
          <img :src="avatorPath" alt="" style="vertical-align: middle;">
        </div>
        <div class="user_info">
          <div class="flex">
            <div class="item">
              <span>账号:</span><span v-text="custName"></span>
            </div>
            <div class="item">
              <span>余额:</span><span v-text="acctAmt+'元'"></span>
            </div>
            <div class="item" @click="$router.push('/homeView/lobby')">返回大厅</div>
            <div class="item" @click="loginOut">退出登录</div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="content-warp flex">
      <div class="left-panel">
        <div class="nav-item-box flex">
          <div class="active">
            <router-link to="/homeView/user_center">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-chongzhi1 vertical-m"></i>
              <span class="vertical-m">充值</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="/homeView/user_center/curtain">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-zhuzhuangtu vertical-m"></i>
              <span class="vertical-m">帐变记录</span>
            </router-link>
          </div>
          <div>
            <router-link to="/homeView/user_center/withdrawal">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-chongzhi vertical-m"></i>
              <span class="vertical-m">提现</span>
            </router-link>
          </div>
          <div>
            <router-link to="/homeView/user_center/buyQuery">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-youxipianhao vertical-m"></i>
              <span class="vertical-m">游戏记录</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="/homeView/user_center/personalOverview">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-zhanghuguanli vertical-m"></i>
              <span class="vertical-m">账户管理</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="/homeView/user_center">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-huiyuan vertical-m"></i>
              <span class="vertical-m">用户中心</span>
            </router-link>
          </div>
          <div class="active">
            <a class="ServiceBtn" target=blank href="tencent://message/?Menu=yes&uin=491856587&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-iconfontdianhua vertical-m"></i>
              <span class="vertical-m">联系客服</span>
            </a>
          </div>
          <div>
            <router-link to="/homeView/playIntroduce">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-jieshi vertical-m"></i>
              <span class="vertical-m">规则说明</span>
            </router-link>
          </div>
        </div>
        <!-- 开奖历史 -->
        <div class="history-box">
          <div class="history-tag">
            <a target="_blank" :href="historyList[0] && '/static_pc/cpRecode/index.html?game='+historyList[0].gameNo+'030002'">
              <span class="vertical-m">开奖历史</span>
              <i class="iconfont icon-rili vertical-m"></i>
            </a>
          </div>
          <div class="history-list-box">
            <div v-if="historyList.length>0" class="history-list flex" :title="'期数：'+item.gameNumber+'；开奖号码：'+item.gameOpenNo" v-for="(item,index) in historyList" :key="index">
              <div class="sort" v-text="index+1"></div>
              <div class="serial_number" v-text="item.gameNumber.slice(-7)"></div>
              <div class="number" v-text="item.gameOpenNo"></div>
            </div>
          </div>
        </div>
        <!-- 其他彩票 -->
        <div class="other-ball">
          <Menu ref="side_menu" width="auto" :open-names="[''+openNames]"  @on-select="otherTicketFun" accordion>
            <Submenu v-for="(item,index) in otherTicket" :name="item.gameType" :key="index">
              <template slot="title">
                  <i :class="['iconfont vertical-m',
                    {'icon-icon165' : item.gameType=='11'},
                    {'icon-xiaolian' : item.gameType=='22'},
                    {'icon-icon165' : item.gameType=='33'},
                    {'icon-06' : item.gameType=='44'},
                    {'icon-qichezhizao' : item.gameType=='55'},
                    {'icon-wuxing' : item.gameType=='66'},
                    {'icon-icon165' : item.gameType=='77'},
                  ]"></i>
                  <span class="vertical-m" v-text="item.gameTypeName"></span>
              </template>
              <MenuItem v-for="(_item,_index) in item.gameSetting" :key="_index" :name="_item.gameType+'/'+_item.gameNo" :class="[(_item.gameNo==$route.params.gameNo ? 'active' : '')]" v-text="_item.gameName"></MenuItem>
            </Submenu>
          </Menu>
        </div>
      </div>
      <div class="rigth-panel">
        <div class="award-result flex">
          <div class="flex">
            <div v-if="getGameNextOpenNodata" class="cp_logo">
              <img :src="getGameNextOpenNodata.smallImgPath">
            </div>
            <div class="result-countdown flex">
              <p class="result-countdown-tit" style="font-style: italic;font-size: 18px;" v-text="getGameNextOpenNodata.gameName"></p>
              <p v-if="getGameNextOpenNodata || gameOpenNos" class="result-countdown-tit">
                <span>第</span>
                <span style="color:#ffb508;" v-if="getGameNextOpenNodata" v-text="getGameNextOpenNodata.gameNumber"></span>
                <span style="color:#ffb508;" v-if="!getGameNextOpenNodata&&gameOpenNos" v-text="gameOpenNos.gameNumber"></span>
                <span>期</span>
                <!-- <button v-if="autoPause" @click="autoPause=false">关闭音效</button>
                <button v-else @click="autoPause=true">打开音效</button> -->
              </p>
              <div class="countdown align-items-c flex">
                <div style="white-space: nowrap;color:#fff;font-size:14px;margin-right:10px;" ref="residueText" v-text="residueText"></div>
                <div class="your-clock"></div>
                <audio ref="autoplay">
                  <source :src="audioSrc" type="audio/ogg"/>
                </audio>
              </div>
            </div>
            <div class="result flex">
              <div class="ball-panel flex flipInX animated" v-if="gameOpenNos">
                <p v-for="(item,index) in gameOpenNos.gameOpenNo" :key="index" v-text="item"></p>
              </div>
              <p v-if="gameOpenNos">第<span v-text="gameOpenNos.gameNumber"></span>期开奖结果</p>
            </div>
          </div>
        </div>
        <div class="play-box">
          <stopSell v-if="stopSellData" :src="'../../../static_pc/img/stopSell.png'"></stopSell>
          <div class="play-bar flex">
            <div v-if="getGameGroupByGameWithGroupdata.length>0" class="play-item flex">
              <p v-for="(item,index) in getGameGroupByGameWithGroupdata" :key="index" v-text="item.groupClassName" :class="[(kindCheckedIndex ==index?'active':'')]" @click="kindbarList(item,index)"></p>
            </div>
            <div class="switch">
              <i-switch size="large" v-model="switch_show" @on-change="creditBet">
                <span slot="open" style="width:90px">官方玩法</span>
              </i-switch>
            </div>
          </div>
          <!-- 内容 -->
          <lhzh v-if="'' + $route.params.gameType + '1111' + kindCheckedNo == + '1111110011'" :gameData="GameDatas(kindCheckedNo)"></lhzh>
          <!--  龙虎斗 -->
          <lhd v-if="'' + $route.params.gameType + '1111' + kindCheckedNo == '1111110022'" :gameData="GameDatas(kindCheckedNo)"></lhd>
          <!--  龙虎斗 -->
          <lhq5z1 v-if="'' + $route.params.gameType + '1111' + kindCheckedNo == '1111110033'" :gameData="GameDatas(kindCheckedNo)"></lhq5z1>    <!--  龙虎斗全5中1 -->

          <!--  大小骰子 包含极速的快3-->
          <dxsb v-if="'' + $route.params.gameType + '2222' + kindCheckedNo == '2222220011'" :gameData="GameDatas(kindCheckedNo)"></dxsb>    <!--  龙虎斗全5中1 -->
          <dxsb v-if="'' + $route.params.gameType + '2222' + kindCheckedNo == '3322220011'" :gameData="GameDatas(kindCheckedNo)"></dxsb>    <!--  龙虎斗全5中1 -->
        </div>
      </div>
    </div>
    <div class="content_line_1"></div>
    <div class="content_line_2"></div>
  </div>
</template>
<script>
  import '../../assets/js/flipclock/flipclock.min.js'
  import '../../assets/js/flipclock/flipclock.min.css'
  import index from './index.js'
  export default {
    ...index
  }
</script>
<style scoped lang="less">
  @import 'index.less';
</style>

<style scoped>
  .switch {
    width: 150px;
  }
  .switch>>>.ivu-switch-large {
    width: 90px;
  }
  .switch>>>.ivu-switch-large.ivu-switch-checked:after {
    left: 65px;
  }
</style>
