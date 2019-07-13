<style lang="less" scoped>
@import url('./BetLotteryLeftNav.less');
.sc-bdVaJa.gLHRUG { font-size: 16px; }
.btn-yjf { border-radius: 0!important; border-right-width: 0!important;}
.btn-yjf .btn-yjf-0 { border-radius: 4px 0 0 4px;}
.btn-yjf:last-child { border-right-width: 1px!important; }
.transition { color: @theme-color; }
  .whirl {
	-webkit-animation:whirl 2s infinite linear;
	        animation:whirl 2s infinite linear
}
@-webkit-keyframes whirl {
	0% {
	-webkit-transform:rotate(0deg);
	        transform:rotate(0deg)
}
to {
	-webkit-transform:rotate(359deg);
	        transform:rotate(359deg)
}
}
@keyframes whirl {
	0% {
	-webkit-transform:rotate(0deg);
	        transform:rotate(0deg)
}
to {
	-webkit-transform:rotate(359deg);
	        transform:rotate(359deg)
}
}
._1ZJpc {margin: 7px 0 0 -80px;	cursor:pointer}
</style>

<template>
  <div class="bm-menu" style="height: 100%; box-sizing: border-box; overflow: auto;">
    <!-- <group :gutter="0">
        <cell title="用户名" :value="custName" />
        <cell title="余额" :value="acctAmt" />
        <cell title="首页" link="/"><i slot="icon" class="iconfont icon-shouye"></i></cell>
        <cell title="走势图" link="/trendChart"><i slot="icon" class="iconfont icon-shouye"></i></cell>
        <cell title="玩法介绍" :link="`/gameGroupIntroduce/${game.gameType}/${game.gameNo}/${game.gameName}`"><i slot="icon" class="iconfont icon-shouye"></i></cell>
        <cell title="投注记录" link="/betRecordsview"><i slot="icon" class="iconfont icon-shouye"></i></cell>
        <cell title="追号记录" link="/betRecordsview"><i slot="icon" class="iconfont icon-shouye"></i></cell>
    </group> -->
    <!-- <nav class="bm-item-list"> -->
      <div class="sc-iIHjhz kDeJmS" style="display: block; outline: none;">
        <div class="sc-jHZirH eWjHiJ">
          <div class="sc-bdVaJa gLHRUG">
            <div class="sc-dKEPtC gOdhbh">
              <div>用户名</div>
              <div> <span class="sc-bSbAYC cwUtlV" v-text="custName"></span> </div>
            </div>
            <div class="sc-dKEPtC gOdhbh">
              <div>余额</div>
              <img @click="refresAcc" class="_1ZJpc" :class="reload?'whirl':''" src="/static_pc/images/sx.png" width="12" height="11">
              <div> <span class="sc-bSbAYC cwUtlV" v-text="acctAmt"></span> </div>
            </div>
          </div>
        </div>
        <div class="sc-dBAPYN hfNBgs">
          <div class="sc-bdVaJa gLHRUG" @click="$router.push('/')">
            <i class="sc-dvpmds gzHUFB iconfont icon-shouye" style="position: relative; top: -2px;"></i>
            <span>首页</span>
          </div>
        </div>
        <template v-if="game.gameType=='66'">
          <div class="sc-dBAPYN hfNBgs" @click="$router.push(`/open_lottery/${game.gameNo}`)">
          <i class="sc-dvpmds gzHUFB iconfont icon-tubiaozhexiantu"></i>
          <span>走势图</span>
          </div>
        </template>
        <template v-else>
        <div class="sc-dBAPYN hfNBgs" @click="$router.push({name:'trendChart',params:{gameType:game.gameType,gameNo:game.gameNo,gameName:game.gameName}})">
          <i class="sc-dvpmds gzHUFB iconfont icon-tubiaozhexiantu"></i>
          <span>走势图</span>
        </div>
        </template>        
        <div class="sc-dBAPYN hfNBgs" @click="$router.push('/betRecordsview')">
          <i class="sc-dvpmds gzHUFB iconfont icon-icon-touzhujilu"></i>
          <span>投注记录</span>
        </div>
        <div class="sc-dBAPYN hfNBgs" @click="$router.push('/betRecordsview')">
          <i class="sc-dvpmds gzHUFB iconfont icon-touzhujilu"></i>
          <span>追号记录</span>
        </div>
        <div class="sc-dBAPYN hfNBgs" @click="$router.push({name:'rechargeReport'})">
          <i class="sc-dvpmds gzHUFB iconfont icon-qian"></i>
          <span>盈亏查询</span>
        </div>
        <div class="sc-dBAPYN hfNBgs" @click="$router.push(`/gameGroupIntroduce/${game.gameType}/${game.gameNo}/${game.gameName}`)">
          <i class="sc-dvpmds gzHUFB iconfont icon-bangzhu"></i>
          <span>玩法介绍</span>
        </div>
        
        <div class="sc-dwztqd eVmely btns-yjf">
          <i class="sc-dvpmds gzHUFB iconfont icon-qian"></i>
          <span class="sc-bdVaJa gLHRUG">投注设定</span>
          <div v-if="yjf.indexOf('0')>=0" :class="['btn-yjf', bet.betModel == 0 ? 'kbsfs' : 'dGZWjc']" @click="updateBetModel(0)">元</div>
          <div v-if="yjf.indexOf('1')>=0" :class="['btn-yjf', bet.betModel == 1 ? 'kbsfs' : 'dGZWjc']" @click="updateBetModel(1)">角</div>
          <div v-if="yjf.indexOf('2')>=0" :class="['btn-yjf', bet.betModel == 2 ? 'kbsfs' : 'dGZWjc']" @click="updateBetModel(2)">分</div>
        </div>
        <div class="sc-iFUGim fHgZyr" @click="showGameNavs=!showGameNavs">
          <i style="display: inline-block;color:@theme-color;" :class="[('transition iconfont icon-xiala'),{'rotate180':showGameNavs}]"></i>&nbsp;&nbsp;
          游戏菜单
        </div>
        <!-- 玩法循环 -->
        <div v-show="showGameNavs">
          <div class="sc-cNQqM eeYALU" v-for="(d, index) in games" :key="index" @click="lottery.onChangeRoute(d.gameNo, d.groupType=='030001' ? $consts.GamePlayType.OFFICIAL:$consts.GamePlayType.C_CREDIT)">
            <!-- <img :src="$imgPath(d.imgPath)" class="sc-clBsIJ cqGToj"> -->
            <app-img :src="$app.toImagePath(d.imgPath)" :default-src="require('assets/images/loading/lottery.png')" class="sc-clBsIJ cqGToj"/>
            <div class="sc-bdVaJa gLHRUG" v-text="d.gameName"></div>
          </div>
        </div>
      </div>
    <!-- </nav> -->
  </div>
</template>


<script>
import { Vue, Component, Inject, NGetter, State, Mutation } from "core/decorators";

@Component
export default class BetLotteryLeftNav extends Vue {
   /** games */
  @NGetter('Game', 'getGameTypeAll') groupGames;
  @NGetter('User', 'getAcct') acct;

  @State bet;
  @Mutation('bet/updateBetModel') updateBetModel;

  @Inject() lottery;
  reload=false;
  showGameNavs = false; 

  get game() { return this.lottery.game; }

  /** 获取游戏 */
  get games () {
    return this.groupGames.reduce((games, { gameSetting = [] }) => {
      return games.concat(gameSetting);
    }, []);
  }

  /** 游戏支持的圆角分模式 */
  get yjf() { return this.game.gamePattern; }
  
  get custName() { return this.acct.custName; }

  get acctAmt() { return this.acct.acctAmt; }
  async refresAcc(){
    this.reload=true
    this.$apis.User.getAcct();
    await this.$tools.delay(1000)
    this.reload=false
  }
  created() {
    if(this.yjf.length > 0) this.updateBetModel(this.yjf.substr(0, 1));
    this.$apis.Game.getGameTypeAll();
    this.$apis.User.getAcct();
  }
}
</script>
