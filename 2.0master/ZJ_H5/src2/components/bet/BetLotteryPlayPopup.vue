<style lang="less" scoped>
.play-groups {
  background: #fff;
}
.group1 {
  background-color: #f6f6f6; padding: 10px 5px; border-bottom: 1px solid @border-color;
}
.btn1 {
  margin: 5px 5px; text-align: center; background: #fff; border: 1px solid @border-color;
  color: #9b9b9b; line-height: 30px;border-radius: 4px; font-size: 1.4rem; white-space: nowrap;
}
.btn1.checked {
  background: @theme-color; border-color: @theme-color; color: #fff;
}
.label2 {
  font-size: 1.4rem; text-align: center; color: #666;
}
.group2 {
  background-color: #fff; padding: 6px 5px; border-bottom: 1px solid @border-color;
}
</style>

<template>
<div v-transfer-dom>
  <popup v-model="lottery.isShowGamePlayBox" position="top" :show-mask="false" :popup-style="{'z-index': 81, position: 'absolute', top: '46px'}">
    <tab v-if="isShowTab">
      <tab-item v-for="(d, i) of gamePlayGroup" :key="i" :disabled="d.length == 0" @on-item-click="tabGamePlayType = `${i}`"
        :selected="i == tabGamePlayType">{{$consts.GamePlayType[i]}}</tab-item>
    </tab>
    <!-- <transition name="vux-fade"> -->
      <div v-for="(d, i) of gamePlayGroup" :key="i" v-if="tabGamePlayType == i" class="play-groups">
        <div class="group1">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/4" v-for="(d1, i1) of d" :key="i1" @click.native="onSelectGroupClassNo(`${i}`, d1.groupClassNo)">
              <div :class="`btn1 ${d1.groupClassNo == btnGroupClassNo && 'checked'}`">{{d1.groupClassName}}</div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="group2" v-if="groupClassSelf">
          <flexbox :gutter="0" wrap="wrap" v-for="(d, ii) of groupClassSelf.groupClassCones || []" :key="ii">
            <flexbox-item :span="1/4" class="label2">{{d.groupClassConName}}</flexbox-item>
            <flexbox-item :span="3/4">
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/2" v-for="(d1, i1) of d.groupSettinges" :key="i1" @click.native="onSelectGroupNo(`${i}`, groupClassSelf.groupClassNo, d.groupClassConNo, d1.groupNo)">
                  <div :class="`btn1 ${d1.groupNo == btnGroupNo && 'checked'}`">{{d1.groupName}}</div>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    <!-- </transition> -->
  </popup>
</div>
</template>

<script>
import { Component, Vue, Watch, Inject } from 'core/decorators';

@Component
export default class BetLotteryGamePlayPopup extends Vue {
  /** 第一层游戏玩法编号 */
  tabGamePlayType = this.gamePlayType;
  /** 第二层游戏玩法编号 */
  btnGroupClassNo = this.groupClassNo;
  /** 第四层游戏玩法编号 */
  btnGroupNo = this.groupNo;

  @Inject('lottery') lottery;

  /** 游戏类型 */
  get game () { return this.lottery.game; }
  /** 游戏第一层玩法 */
  get gamePlayType () { return this.lottery.gamePlayType; };
  /** 游戏玩法四层玩法 */
  get gamePlayMap () { return this.lottery.gamePlayMap; }
  /** 游戏玩法组 */
  get gamePlayGroup () { return this.lottery.gamePlayGroup; }
  /** 第二层游戏玩法编号 */
  get groupClassNo () {
    return this.gamePlayMap && this.gamePlayMap.groupClass && this.gamePlayMap.groupClass.groupClassNo;
  }

  /** 是否显示第三层以下玩法 */
  get isShowThreePlays() {
    // 六合彩全部显示第三层以下玩法
    if (this.$consts.GameType.C_GAME_TYPE_LHC == this.game.gameType) return true;
    // 其余彩种只有信用玩法不显示第三层游戏玩法
    if (this.$consts.GamePlayType.C_CREDIT == this.tabGamePlayType) return false;
    return true;
  }

  /** 当前组件的第二层游戏玩法 */
  get groupClassSelf () {
    if (!this.isShowThreePlays) return null;
    let groupClass = this.gamePlayGroup[this.tabGamePlayType].find(d => d.groupClassNo == this.btnGroupClassNo);
    if (groupClass == null) {
      groupClass = this.gamePlayGroup[this.tabGamePlayType][0];
      if (groupClass == null) return groupClass;
    }
    return groupClass;
  }

  /** 游戏玩法第四层编号 */
  get groupNo () {
    return this.gamePlayMap && this.gamePlayMap.gamePlay && this.gamePlayMap.gamePlay.groupNo;
  }

  /** 是否显示 tab */
  get isShowTab () {
    return this.gamePlayGroup.filter(d => d.length > 0).length > 1;
  }

  /** 监听是否显示玩法窗口 是否显示 */
  @Watch('$parent.isShowGamePlayBox', { immediate: true }) toWatch1 () {
    // console.log(this.$parent.isShowGamePlayBox)
    if (!this.tabGamePlayType) return;
    // 每次窗口重新打开，恢复当前选中的数据 
    this.tabGamePlayType = this.gamePlayType;
    this.btnGroupClassNo = this.groupClassNo;
    this.btnGroupNo = this.groupNo;
  }
  @Watch("tabGamePlayType") toWatch2(){
    if(this.tabGamePlayType==this.gamePlayType){
      this.btnGroupClassNo = this.groupClassNo;
      this.btnGroupNo = this.groupNo;
    }else{
      this.btnGroupClassNo = ""
      this.btnGroupNo = ""
    }
  }
  /**
   * 游戏玩法，第二层
   * @param {string} gamePlayType
   * @param {string} groupClassNo
   */
  async onSelectGroupClassNo (gamePlayType, groupClassNo) {
     console.log(this.tabGamePlayType,this.btnGroupClassNo,this.btnGroupNo)     
    if (this.btnGroupClassNo == groupClassNo) return;
        this.tabGamePlayType = gamePlayType;
    this.btnGroupClassNo = groupClassNo;
    if (!this.isShowThreePlays) {
      this.lottery.isShowGamePlayBox = false;
      await this.$tools.delay(300);
      this.lottery.onChangeRoute(this.game.gameNo, gamePlayType, groupClassNo);
    }
  }

  /**
   * 选中具体游戏玩法第四层
   * @param {string} gamePlayType 第一层：官方/信用
   * @param {string} groupClassNo 第二层
   * @param {string} groupClassConNo 第三层
   * @param {string} groupNo 第四层
   */
  async onSelectGroupNo (gamePlayType, groupClassNo, groupClassConNo, groupNo) {

    console.log(this.tabGamePlayType,this.btnGroupClassNo,this.btnGroupNo)

    if (this.btnGroupNo == groupNo) return;    
    this.tabGamePlayType = gamePlayType;
    this.btnGroupClassNo = groupClassNo;
    this.btnGroupNo = groupNo;
    this.lottery.isShowGamePlayBox = false;
    await this.$tools.delay(300);
    this.lottery.onChangeRoute(this.game.gameNo, gamePlayType, [groupClassNo, groupClassConNo, groupNo].join('T'));
  }
};
</script>
