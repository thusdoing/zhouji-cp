<style lang="less" scoped>
.viewbox {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 22;
}
</style>

<template>
  <div style="width: 100%; height:100%">
    <group :gutter="0" v-if="isToSkipNewLottery || loading">
      <load-more tip="加载中..."/>
    </group>
    <drawer
      v-else
      :show.sync="isShowMore"
      class="bet-lottery"
      placement="right"
      :drawer-style="{width: '240px'}"
    >
      <BetLotteryLeftNav slot="drawer"/>
      <view-box body-padding-top="60px" body-padding-bottom="0" class="viewbox">
        <BetLotteryPlayPopup :key="gameNo + 1"/>
        <BetLotteryPanelK3 v-if="gameType==22" slot="header" :key="gameNo + 2" class="panel"/>
        <BetLotteryPanel v-else slot="header" :key="gameNo + 2" class="panel"/>
        <BetLotteryWrapper :key="`${key}-${gameNo}-${gamePlayNo}`" v-if="nextOpenGame"/>
      </view-box>
    </drawer>
    <confirm
      v-if="'betConfirmKey' === props.key"
      v-model="props.visible"
      title="提示"
      @on-confirm="props.onConfirm"
    >
      <p style="text-align:left;color:#666;">第
        <span style="color:red">{{ lottery.nextOpenGame.gameNumber }}</span> 期
      </p>
      <p style="text-align:left;color:#666;" v-for="(d,index) in newBets" :key="index">
        <span v-text="d.showContent"></span>
      </p>
      <p style="text-align:left;color:#666;">
        <span style="color:red" v-text="betNumber"></span> 注
        <span style="color:red" v-text="betTimes"></span> 倍，共
        <span style="color:red" v-text="allMoney"></span> 元
      </p>
    </confirm>
    <!-- <div v-if="isGameStopSell" class="stop-sell"><img src="~assets/images/stopsp.jpg"/></div> -->
  </div>
</template>

<script>
  import {
    Component,
    Vue,
    NGetter,
    Watch,
    Provide,
    Mutation,
    createStorage
  } from "core/decorators";

  import { Drawer } from "vux";
  import XHeader from "./BetLotteryXHeader";
  import XHeaderK3 from "./BetLotteryXHeaderK3";
  import BetLotteryPlayPopup from "./BetLotteryPlayPopup";
  import BetLotteryPanel from "./BetLotteryPanel";
  import BetLotteryPanelK3 from "./BetLotteryPanelK3";
  import BetLotteryWrapper from "./BetLotteryWrapper";
  import BetLotteryLeftNav from "./BetLotteryLeftNav";

  const storage = createStorage("BetLottery", [], ["eachNoteAmt"]);

  @Component({
    storage,
    components: {
      Drawer,
      BetLotteryLeftNav,
      BetLotteryPanel,
      BetLotteryPanelK3,
      BetLotteryPlayPopup,
      BetLotteryWrapper
    }
  })
  export default class BetLottery extends Vue {
    @Provide() get lottery() {
      return this;
    }

    @NGetter("Game", "getGameTypeAll") gameGroups;
    @NGetter("Game", "getGameGroupByGameNoCache") gamePlayGroups;
    /** 所有游戏的正在销售开奖号码 */
    @NGetter("GameOpenNo", "getGameNextOpenNoCache") nextOpenGames;

    @Mutation("bet/addBet") addBet;
    @Mutation("bet/addBets") addBets;
    @Mutation("bet/updateGameNo") updateGameNo;

    isChangeRoute = false;

    /** 参数验证 */
    // loading = true;
    key = Date.now();

    eachNoteAmt = 2;
    props = {};
    /** 投注内容数组 */
    betArr = [];
    /** 展示投注内容数组 */
    showBets = {};
    /** 单投注金额 */
    times = 1;
    /** 是否显示游戏玩法窗口 */
    @Provide() isShowGamePlayBox = false;
    /** 是否显示更多窗口 */
    isShowMore = false;
    /** 是否切换信彩种 */
    isToSkipNewLottery = false;
    newBets = [];
    /** 大彩种类型 */
    gameNo = "";
    /** 小彩种类型 */
    get gameType() {
      return this.gameNo.substr(0, 2);
    }
    /** 大玩法类型：官彩还是信用 */
    gamePlayType = "";
    /** 具体游戏玩法，最后一个游戏玩法编号 */
    gamePlayNo = "";
    betTimes = 1;
    /** 游戏玩法分组，二位数组[官彩，信用] */
    get gamePlayGroup() {
      return this.gamePlayGroups[this.gameNo];
    }
    /** 获取游戏 */
    get game() {
      const group = this.gameGroups.find(d => this.gameType == d.gameType);
      if (!group || !group.gameSetting || !(group.gameSetting instanceof Array))
        return this.$router.push("/");
      const game = group.gameSetting.find(d => d.gameNo == this.gameNo);
      return game;
    }

    /** 是否弹窗只显示到第二层玩法，剩余玩法，在投注界面显示 */
    get isPopupShowOnlyTwoLevelGamePlay() {
      if (!this.game) return false;
      // 六合彩全部显示第三层以下玩法
      if (this.$consts.GameType.C_GAME_TYPE_LHC == this.game.gameType)
        return false;
      // 其余彩种只有信用玩法不显示第三层游戏玩法
      if (this.$consts.GamePlayType.C_CREDIT == this.gamePlayType) return true;
      return false;
    }

    /** 获取游戏玩法 */
    get gamePlay() {
      if (!this.gamePlayMap) return null;
      if (this.isPopupShowOnlyTwoLevelGamePlay)
        return this.gamePlayMap.groupClass;
      return this.gamePlayMap.gamePlay;
    }
    /** 获取游戏玩法-四个层级 */
    get gamePlayMap() {
      // console.log(this.gamePlayGroup&& this.gamePlayGroup.length, this.gamePlayNo.split('T'), this.gamePlayType);
      if (!this.gamePlayGroup) return {};
      if (!this.gamePlayNo) return {};
      const { gamePlayType } = this;
      const [groupClassNo, groupClassConNo, groupNo] = this.gamePlayNo.split("T");
      let groupClass, groupClassCone, gamePlay;
      /** 获取信用还是官彩玩法组 */
      const groups = this.gamePlayGroup[Number(gamePlayType)];
      if (groupClassNo && groups && groups instanceof Array)
        groupClass = groups.find(d => d.groupClassNo == groupClassNo);
      if (
        groupClassConNo &&
        groupClass &&
        groupClass.groupClassCones instanceof Array
      )
        groupClassCone = groupClass.groupClassCones.find(
          d => d.groupClassConNo == groupClassConNo
        );
      if (
        groupNo &&
        groupClassCone &&
        groupClassCone.groupSettinges instanceof Array
      )
        gamePlay = groupClassCone.groupSettinges.find(d => d.groupNo == groupNo);
      return { gamePlayType, groupClass, groupClassCone, gamePlay };
    }

    /** 获取具体玩法：具体到小玩法 */
    get gamePlayName() {
      if (!this.gamePlayMap) return null;
      if (this.isPopupShowOnlyTwoLevelGamePlay) {
        return this.gamePlayMap.groupClass
          ? this.gamePlayMap.groupClass.groupClassName
          : null;
      }
      // 其余彩种
      const name = [];
      // 第一层玩法
      // if (this.gamePlayMap.groupClass && this.gamePlayMap.groupClass.groupClassName) name.push(this.gamePlayMap.groupClass.groupClassName);
      // 第二层玩法
      if (
        this.gamePlayMap.groupClassCone &&
        this.gamePlayMap.groupClassCone.groupClassConName
      )
        name.push(this.gamePlayMap.groupClassCone.groupClassConName);
      // 第三层玩法
      if (this.gamePlayMap.gamePlay && this.gamePlayMap.gamePlay.groupName)
        name.push(this.gamePlayMap.gamePlay.groupName);
      return name.join("");
    }

    /** 是否停售状态 */
    get isGameStopSell() {
      return this.$consts.GameStatus.C_STOP_SELL == this.game.gameStatus;
    }

    /** 下次开奖 */
    get nextOpenGame() {
      return this.nextOpenGames[this.gameNo];
    }

    /** 获取投注模式 投注模式元角分(0,1,2) */
    get betModel() {
      return (this.$store.state.bet || {}).betModel;
    }
    /** 获取投注模式 投注模式元角分(0,1,2) */
    get gamePattern() {
      return this.betModel;
    }

    /** 投注金额 => 等价于 eachNoteAmt */
    get betInitMoney() {
      return this.eachNoteAmt;
    }

    /** 投注金额单位比例 */
    get pattern() {
      let pattern = 1;
      if (this.betModel == 0) {
        pattern = 1;
      } else if (this.betModel == 1) {
        pattern = 0.1;
      } else if (this.betModel == 2) {
        pattern = 0.01;
      }
      return pattern;
    }

    /** 投注记录 */
    get bets() {
      return this.$store.state.bet.bets;
    }

    get loading() {
      // console.log(222, !(this.game && this.gamePlay && this.gamePlayGroup), [this.game, this.gamePlay, this.gamePlayGroup]);
      return !(this.game && this.gamePlay && this.gamePlayGroup);
    }

    /** 监听路由变化 */
    @Watch("$route.params", { deep: true, immediate: true })
    async toWatch01(params) {
      // 每次路由变化，收起显示玩法窗口
      if (this.isShowGamePlayBox) {
        this.isShowGamePlayBox = false;
        await this.$tools.delay(300);
      }
      if (!this.$route.name || !this.$route.name.startsWith("bet_lottery"))
        return -1;
      Object.assign(this, params);
      if (this.gameType == this.$consts.GameType.C_GAME_TYPE_KS) {
        this.$app.setLayout(XHeaderK3, false, this);
      } else {
        this.$app.setLayout(XHeader, false, this);
      }

      this.isToSkipNewLottery = false;
      this.key = Date.now();

      // 无效的大彩种类型
      if (!this.$consts.isConst(this.$consts.GameType, this.gameType))
        return this.$router.push("/");
      // 无效的玩法更改默认官彩
      if (!this.$consts.isConst(this.$consts.GamePlayType, this.gamePlayType))
        this.onChangeRoute(this.gameNo, this.$consts.GamePlayType.C_OFFICIAL);
      // 使用历史数据，如果没有数据选中有效的玩法
      if (!this.gamePlay) this.toSkipFirstGamePlay();

      // 获取游戏组
      const getGameTypeAllPS = this.$apis.Game.getGameTypeAll();
      const gamePlayGroupsPS = this.$apis.Game.getGameGroupByGameNoCache(
        this.gameNo
      );
      await getGameTypeAllPS;
      await gamePlayGroupsPS;

      // 获取游戏
      if (!this.game) return this.$router.push("/");
      // 找到第一个有效的玩法
      if (!this.gamePlay) this.toSkipFirstGamePlay();

      this.updateGameNo(this.gameNo || -1);
    }

    /**
     * 切换彩种与玩法
     * @param {string} gameNo 小彩种类型
     * @param {string} gamePlayType 大玩法
     * @param {string} gamePlayNo 具体玩法
     */
    @Provide() async onChangeRoute(gameNo, gamePlayType, gamePlayNo = "") {
      this.isShowGamePlayBox = this.isShowMore = false;
      // console.warn(this.key, gameNo, gamePlayType, gamePlayNo);
      this.isChangeRoute = true;
      await this.$tools.delay(300);
      this.isChangeRoute = false;
      // 彩种重置
      if (this.gameNo == gameNo && gamePlayType == 0 && gamePlayNo == 0)
        return this.toSkipFirstGamePlay();
      // 彩种切换
      if (this.gameNo != gameNo) this.isToSkipNewLottery = true;
      this.$router.replace({
        path: `/bet_lottery/${gameNo}/${gamePlayType}/${gamePlayNo}`,
        replace: true
      });
    }

    /** 自动切换是否显示游戏玩法窗口 */
    onShowToggleGamePlayBox() {
      if (!this.gamePlay) return -1;
      this.isShowGamePlayBox = !this.isShowGamePlayBox;
      this.isShowMore = false;
    }

    /** 更过配置 */
    onMore() {
      // this.$vux.alert('暂未实现');
      this.isShowMore = !this.isShowMore;
      this.isShowGamePlayBox = false;
    }

    /** 跳转有效玩法第一条玩法 */
    toSkipFirstGamePlay() {
      if (!this.gamePlayGroup) return false;
      const gamePlayNos = [];
      /** 获取信用还是官彩玩法组 */

      let groups = null;
      let gameType = null;
      let num = this.gamePlayType; //玩法都有两个数组，0 1 对应 官方 信用
      if (this.gamePlayGroup[num].length != 0) {
        groups = this.gamePlayGroup[num];
        gameType = num;
      } else {
        for (let i = 0; i < this.gamePlayGroup.length; i++) {
          if (this.gamePlayGroup[i].length == 0) continue;
          groups = this.gamePlayGroup[i];
          gameType = i;
          break;
        }
      }

      if (!groups || !(groups instanceof Array)) return false;
      const groupClass = groups[0];
      if (!groupClass || !(groupClass.groupClassCones instanceof Array))
        return false;
      gamePlayNos.push(groupClass.groupClassNo);

      if (this.isPopupShowOnlyTwoLevelGamePlay) {
        return this.onChangeRoute(this.gameNo, gameType, gamePlayNos.join("T"));
      }

      const groupClassCone = groupClass.groupClassCones[0];
      if (!groupClassCone || !(groupClassCone.groupSettinges instanceof Array))
        return false;
      gamePlayNos.push(groupClassCone.groupClassConNo);
      const gamePlay = groupClassCone.groupSettinges[0];
      if (!gamePlay) return false;
      gamePlayNos.push(gamePlay.groupNo);
      this.onChangeRoute(this.gameNo, gameType, gamePlayNos.join("T"));
      return true;
    }

    hasBet(isRedirectToResultPage = true) {
      if (isRedirectToResultPage) {
        if (this.bets.length == 0) return false;
        // this.$router.push("/bet_lottery_result");
        return true;
      }
      return this.bets.length > 0;
    }

    async toBet(betOrBets) {
      this.showBets = betOrBets;
      this.newBets.length = 0;
      
      if (!betOrBets) return false;
      if (betOrBets instanceof Array) {
        this.newBets = betOrBets;
        this.betTimes = this.newBets[0].betMultiple;
        //  this.addBets(betOrBets);
      } else if (typeof betOrBets == "object") {
        this.newBets.push(betOrBets);
        this.betTimes = this.newBets[0].betMultiple;
        //  this.addBet(betOrBets);
      } else {
        return false;
      }

      if (!/^[1-9]+[0-9]*$/.test(this.betTimes)) {
        this.$vux.alert("输入倍数必须为整数");
      } else {
        if (!(await this.toBetConfirm())) return undefined;
        this.$vux.loading.show();
        console.log(this.newBets);
        const rsp = await this.$apis.Game.bet(this.newBets);
        this.$vux.loading.hide();
        if (!rsp.success) {
          if (rsp.message) this.$vux.alert(rsp.message);
          return false;
        }
        return this.toTip();
      }

      // const data = this.betOrBets.map(({ groupNo, bonusAmt: betBonus }) => {
      //   return { gameNo, groupNo, betBonus, betAmt: this.$tools.bet.asmd.mul(1, this.times||1) };
      // });
      // const rsp = await this.$apis.Game.creditBet(data);
      // if (!rsp.success) {
      //     if (rsp.message) this.$vux.alert(rsp.message);
      //     return false;
      //   }
      //     return this.toTip();

      // this.$router.push("/bet_lottery_result");
      // return true;
    }
    async toTip() {
      // this.clearBet();
      const title = "提示";
      const content = "投注成功";
      const confirmText = "查看投注";
      const cancelText = "继续投注";
      const skin = "ios";
      const confirm = await this.$vux.confirm({
        title,
        content,
        confirmText,
        cancelText,
        skin
      });
      // 取消：继续投注
      if (!confirm) return false;
      // 查看投注
      this.$router.push({ path: "/betRecordsview", replace: true });
    }
    get betNumber() {
      return this.newBets.reduce((x, y) => {
        return x + y.betNumber;
      }, 0);
    }
    get allMoney() {
      return this.newBets.reduce((x, y) => {
        return x + y.betAmt;
      }, 0);
    }
    async created() {
      this.updateGameNo(this.gameNo);
      const rsp = await this.$tools
        .fetch("/getSysCodeInfo?codeKey=eachNoteAmt")
        .get();
      if (!rsp.success) return;
      const { codeValue = 2 } = rsp.data.t || {};
      this.eachNoteAmt = codeValue;
    }
    toBetConfirm() {
      return new Promise(async resolve => {
        const hide = boolean => {
          this.props.visbile = false;
          resolve(true);
        };
        const onConfirm = () => hide(true);
        const onCancel = () => hide(false);
        const onHide = () => (this.props = {});
        this.props = {
          onConfirm,
          onCancel,
          onHide,
          visible: true,
          key: "betConfirmKey"
        };
      });
    }
    beforeRouteEnter(to, from, next) {
      let { gameNo, gamePlayType, gamePlayNo } = to.params || {};
      if (!gameNo) return next("/");
      if (
        typeof gamePlayType == "undefined" ||
        gamePlayType == "undefined" ||
        gamePlayType == null
      ) {
        return next({ path: `/bet_lottery/${gameNo}/0/0`, replace: true });
      }
      if (
        typeof gamePlayNo == "undefined" ||
        gamePlayNo == "undefined" ||
        gamePlayNo == null
      ) {
        return next({
          path: `/bet_lottery/${gameNo}/${gamePlayType}/0`,
          replace: true
        });
      }
      return next();
    }
  }
</script>
