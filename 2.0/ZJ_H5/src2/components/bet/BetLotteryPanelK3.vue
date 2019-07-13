<style lang="less" scoped>
@import '~styles/game.less';
.lottery-info { background-color: #22563f; padding: 6px 0 9px; text-align: center;border-top: 1px solid #426d5a;
    color: #caebda;height: 44px;}
.game-row { text-align: center; }
.game-number { font-size: 1.3rem; }
.game-number span { color: #caebda; display: inline-block; margin-right: 3px; font-weight: 700;}
.stopsell { color: @theme-color; font-size: 1.4rem; }

.border1 { border-right: 1px solid #164630;}
.case1-1 { width: 1.6rem; height: 1.6rem;; line-height: 1.6rem;}

.game-66 {
  .game-openno > span {
    font-size: 1.4rem;
  }
}
.cgameType{
  background: #E8F3ED;overflow: hidden;
  .div{}
  div{float: left;text-align: center;line-height: 50px;width: 33.333%;border-bottom:1px solid #bbb;border-right: 1px solid #bbb;
    box-sizing: border-box;font-size: 14px;
  }
  div:nth-child(3n){border-right: none;}
}
</style>

<template>
  <div :class="`bet-lottery-panel game-${game.gameType}`">
    <div class="lottery-info" @click="toggleHistory">
      <flexbox :gutter="0">
          <flexbox-item @click.native.stop = "showGameFunc" :span="3/10">
            <div class="border1" style="line-height: 44px;text-align: center;">
              <p>{{game.gameName}}
                  <span style="position: relative;top: 6px;display: inline-block;border: 7px solid #42CE8F;border-bottom-color: transparent;border-left-color: transparent;border-right-color: transparent;"></span>
              </p>
            </div>
          </flexbox-item>
        <flexbox-item :span="3/10">
         <div class="border1">
          <div class="game-row game-number"><span>{{isShowOpenCode?('开奖中...'): (lastOpenedGame&&lastOpenedGame.gameNumber ? lastOpenedGame.gameNumber.slice(-4) : '')}}</span>{{isShowOpenCode?'':'期开奖'}}</div>
          <div class="game-row game-openno">
            <template  v-if="lastOpenedGame">
              <template v-if="$consts.GameType.C_GAME_TYPE_KS == game.gameType || $consts.GameType.C_GAME_TYPE_JS_KS == game.gameType">
                <template v-if="isShowOpenCode">
                <span :class="`case0 case0-${d1}`" v-for="(d1, index) of lastOpenedGame.gameOpenNo" :key="`d1-${index}`" :style="`background-image: url(${$consts.UIDice['0']})`">&nbsp;</span>
                <span style="display: inline-block;border: 6px solid #42CE8F;border-bottom-color: transparent;border-left-color: transparent;border-right-color: transparent;position: relative;top: 4px;"></span>
                </template>
                <template v-else>
                <span :class="`case0 case0-${d1}`" v-for="(d1, index) of lastOpenedGame.gameOpenNo" :key="`d1-${index}`" :style="`background-image: url(${$consts.UIDice[d1]})`">&nbsp;</span>
                <span style="display: inline-block;border: 6px solid #42CE8F;border-bottom-color: transparent;border-left-color: transparent;border-right-color: transparent;position: relative;top: 4px;"></span>
                </template>
              </template>
              <template v-else-if="$consts.GameType.C_GAME_TYPE_EGG == game.gameType">
                <template v-if="isShowOpenCode">
                <span :class="`case3 case2-${index}`" v-for="(d1, index) of pceggLoadCode" :key="`d1-${index}`">{{d1}}</span>
                </template>
                <template v-else>
                <span :class="`case3 case2-${index}`" v-for="(d1, index) of lastOpenedGame_pcegg" :key="`d1-${index}`">{{d1}}</span>
                </template>
              </template>
              <template v-else>
                <template v-if="isShowOpenCode">
                <span :class="`case1 ${$consts.GameType.C_GAME_TYPE_BJSC == game.gameType ? 'case1-1' : ''}`" v-for="(d1, index) of lastOpenedGame.gameOpenNo" :key="`d1-${index}`">?</span>
                </template>
                <template v-else>
                <span :class="`case1 ${$consts.GameType.C_GAME_TYPE_BJSC == game.gameType ? 'case1-1' : ''}`" v-for="(d1, index) of lastOpenedGame.gameOpenNo" :key="`d1-${index}`">{{d1}}</span>
                </template>
              </template>
            </template>
            <span v-else>&nbsp;</span>
          </div>
        </div>
        </flexbox-item>
        <flexbox-item :span="4/10">
            <div class="game-row game-number"><span v-show="countDownEndTime">{{nextOpenGame&&nextOpenGame.gameNumber ? nextOpenGame.gameNumber.slice(-4): ''}}</span>{{countDownText}}</div>
            <div class="game-row">
              <span v-if="lottery.isGameStopSell" class="stopsell">已停售</span>
              <BetLotteryPanelCDT v-if="nextOpenGame" v-show="!lottery.isGameStopSell" :key="countDownEndTime" :endTime="countDownEndTime" @onEnd="toCalcCountDown" :gameType="game.gameType"/>
              <span v-else>&nbsp;</span>
            </div>
        </flexbox-item>
      </flexbox>
    </div>
     <BetLotteryPanelHistory ref="history"/>
     
      <div v-show="showGame" class="cgameType">
        <div v-for="(item, index) in cTypeGame" :key="index" @click.stop="lottery.onChangeRoute(item.gameNo, item.groupType=='030001' ? $consts.GamePlayType.OFFICIAL:$consts.GamePlayType.C_CREDIT)">{{item.gameName}}</div>
      </div>
  </div>
</template>

<script>
import { Component, Vue, NGetter, Watch, Inject } from 'core/decorators';
import BetLotteryPanelHistory from './BetLotteryPanelHistory';
import BetLotteryPanelCDT from './BetLotteryPanelCDT';

@Component({
  components: { BetLotteryPanelCDT, BetLotteryPanelHistory }
})
export default class BetLotteryPanel extends Vue {
  /** 所有游戏的正在销售开奖号码 */
  @NGetter('GameOpenNo', 'getGameNextOpenNoCache') nextOpenGames;
  /** 所有游戏的最后一次开奖号码 */
  @NGetter('GameOpenNo', 'getGameLatestOpenNoCache') lastOpenedGames;
   /** games */
  @NGetter('Game', 'getGameTypeAll') groupGames;

  /** 定时器-查询最后一次的游戏开奖信息 */
  timerGetGameLatestOpenNo = null;
  timerGetCountDownEndTime = null;
  isShowHistory=false
  countDownEndTime = null;
  countDownText = '等待下一期投注';
  fuhao=["+",'+','='];
  collapse = true;
  // isShowOpenCode=false;
  pceggLoadCode=['?','+','?','+','?','=','?']
  @Inject() lottery;

  //显示游戏
  showGame = false
  get cTypeGame () { 
    let arr = []
    this.groupGames.forEach(el => {
      if(el.gameType==this.lottery.gameType){
        arr = el.gameSetting
      }
    })
    return arr
  }

  /** 目前游戏 */
  get game () { return this.lottery.game; }
  /** 现在需开奖游戏，即正在销售的游戏 */
  get nextOpenGame () { 
    // console.log(this.nextOpenGames[this.game.gameNo]); 
    return this.nextOpenGames[this.game.gameNo]; }
  /** 最后一次已开奖的游戏 */
  get lastOpenedGame () { return this.lastOpenedGames[this.game.gameNo]; }
  get lastOpenedGame_pcegg () {   
    const openGame=this.lastOpenedGame.gameOpenNo;  
   // const lastGameNumber = +this.lastOpenedGame.gameNumber;    
    let sum=Number(openGame[0]) +Number(openGame[1])+Number(openGame[2])   
    return [openGame[0],"+",openGame[1],"+",openGame[2],"=",sum];   
    
    }
  // get countDownEndTime () {
  //   if (!this.nextOpenGame) return null;
  //   const { restTime, restSaleTime } = this.nextOpenGame;
  //   let endTime = restTime;
  // }


  get isShowOpenCode (){
    if (this.nextOpenGame && this.lastOpenedGame) {
        const nextGameNumber = +this.nextOpenGame.gameNumber;
        const lastGameNumber = +this.lastOpenedGame.gameNumber;
        if(nextGameNumber - lastGameNumber == 1 || nextGameNumber.toString().slice(0,-3)!=lastGameNumber.toString().slice(0,-3)){
        if(this.isShowHistory){
              this.$refs.history.getHistory()            
        }
        return false;  
        } 
        return true
      }
      return false
  }

  @Watch('nextOpenGame')
  toWatchNextOpenGame () {
    this.toCalcCountDown();
  }
  @Watch('lottery.isShowGamePlayBox', { immediate: true }) watchLotteryIsShowGamePlayBox () {
    if (this.lottery.isShowGamePlayBox) this.showGame = false;
  }
  toggleHistory(){
      this.showGame = false
      this.$refs.history
      this.$refs.history.toggleCollapse()
      this.isShowHistory=!this.isShowHistory
      // console.log(this.isShowHistory)
  }
  showGameFunc(){
    this.showGame = !this.showGame
    if(!this.$refs.history.collapse) this.$refs.history.toggleCollapse()
  }
  async toCalcCountDown () {  
  //  await this.$apis.GameOpenNo.getGameNextOpenNoCache(this.game.gameNo);
    const { restTime, restSaleTime } = this.nextOpenGame;
    // const now = Date.now();
    if (restTime <= 0) {
      this.countDownEndTime = restSaleTime;
      this.countDownText = '开盘时间';
    } else if (restTime > 0) {
      this.countDownEndTime = restTime;
      this.countDownText = '期截止时间';
    } else {
      this.countDownText = '等待下一期投注';
      this.countDownEndTime = null;
    }
  }

  /**
   * 启动调度-获取下期开奖信息
   * 每个实例只用一次
   */
  async toStartTimerGetNextOpenGame () {
    // 个实例只用一次,用完就销毁
    if (!this.toStartTimerGetNextOpenGame) return;
    this.toStartTimerGetNextOpenGame = null;
    
    // 判断是否销毁对象
    while (!this._isDestroyed) {     
      // 检查游戏类型是否合理
      await this.$apis.GameOpenNo.getGameNextOpenNoCache(this.game.gameNo);

      let time = ''
      if(this.nextOpenGame.restTime>0){
        time= +this.nextOpenGame.restTime + 1 
      }else{
        time = +this.nextOpenGame.restSaleTime + 1
      }
      if(time==0){
        time = 1
      }
      
      await this.$tools.delay(time*1000);
    }



  }

  /**
   * 启动调度-抓取所有游戏的最后一次的游戏的中奖号码
   */
  async toStartTimerGetLatestOpenedGame () {
    // 个实例只用一次,用完就销毁
    if (!this.toStartTimerGetLatestOpenedGame) return;
    this.toStartTimerGetLatestOpenedGame = null;

    /** 是否抓取最后一次开奖信息 */
    const isFetch = () => {
      if (this.nextOpenGame && this.lastOpenedGame) {
        const nextGameNumber = +this.nextOpenGame.gameNumber;
        const lastGameNumber = +this.lastOpenedGame.gameNumber;
        if(nextGameNumber - lastGameNumber == 1 || nextGameNumber.toString().slice(0,-3)!=lastGameNumber.toString().slice(0,-3)) return false;
        return true
        
      }
      return true;
    };

    // 判断是否销毁对象
    while (!this._isDestroyed) {
      isFetch() && await this.$apis.GameOpenNo.getGameLatestOpenNoCache(this.game.gameNo);
      await this.$tools.delay(5000);
    }
  }

  created () {
    if (!this.$route.name) return;
    this.$apis.GameOpenNo.getGameNextOpenNoCache(this.game.gameNo);
    this.$apis.GameOpenNo.getGameLatestOpenNoCache(this.game.gameNo);
    this.toStartTimerGetNextOpenGame();
    this.toStartTimerGetLatestOpenedGame();


  }
}
</script>
