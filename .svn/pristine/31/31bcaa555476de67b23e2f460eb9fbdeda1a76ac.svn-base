<template>
  <div style="height:100%;overflow:hidden;" class="betView">
    <drawer :show.sync="drawerVisibility" :show-mode="showModeValue" :placement="showPlacementValue" :drawer-style="{'background-color':'#35495e', width: '240px'}">
      <x-header :left-options="{preventGoBack:true}" @on-click-back='$router.push("/")' title="slot:overwrite-title" :right-options="{showMore: true}" @on-click-more="drawerVisibility = true,showPlay=false">
        <div class="overwrite-title-demo" slot="overwrite-title">
          <div class="sc-iAyFgw jojIVQ" @click="showPlay=!isStopSell ? !showPlay : showPlay">
            <div class="sc-hCaUpS kfxZWq"></div>
            <div class="sc-bvTASY jpCyUB">
              <div class="sc-bdVaJa gLHRUG"></div>
              <div class="sc-koErNt jOSufo" v-text="smallIndexWarpName"></div>
              <div class="sc-gJqsIT dBqeJi" v-text="$route.params.gameName"></div>
              <div class="sc-bdVaJa gLHRUG"></div>
            </div>
            <div class="sc-kDhYZr jugmfb" v-if="!isStopSell">
              <div class="sc-bdVaJa gLHRUG"></div>
              <i style="display: block;" :class="[('transition iconfont icon-xiala'),{'rotate180':showPlay}]"></i>
              <div class="sc-bdVaJa gLHRUG"></div>
            </div>
          </div>
        </div>
      </x-header>
      <div class="sc-hMjcWo dcIDiF" @click="ReactCollapse=!isStopSell ? !ReactCollapse : ReactCollapse">
        <div class="sc-bLJvFH hmoMqe" style="display: flex;padding: 5px 0px;">
          <div class="sc-hRmvpr csBuLL" style="width: 50%;display: initial;float: right;border-right: 1px solid #b9b9b9;justify-content: flex-end;border-bottom: solid 1px #f6f6f6;">
            <div class="sc-cZBZkQ cwSiLC" style="text-align: center;">
              <span v-if="gameOpenNos!=null" v-text="gameOpenNos.gameNumber.slice(-7)" style="color:#ec2829;"></span>期开奖
            </div>
            <openAwardRes style="justify-content: center;" :gameOpenNoList="gameOpenNoList"></openAwardRes>
            <!-- <div class="sc-gbzWSY KhlQF">
              <div class="sc-jqIZGH kMdBvY">
                <div class="sc-jMMfwr eEsuLl">?</div>
              </div>
              <div class="sc-jqIZGH kMdBvY">
                <div class="sc-jMMfwr eEsuLl">?</div>
              </div>
              <div class="sc-jqIZGH kMdBvY">
                <div class="sc-jMMfwr eEsuLl">?</div>
              </div>
              <div class="sc-jqIZGH kMdBvY">
                <div class="sc-jMMfwr eEsuLl">?</div>
              </div>
            </div> -->
          </div>
          <div class="sc-hRmvpr csBuLL" style="width: 50%;display: initial;float: left;justify-content: flex-start;border-bottom: solid 1px #f6f6f6;">
            <div class="sc-cZBZkQ cwSiLC" style="    text-align: center;">
              <span v-if="getGameNextOpenNodata.gameNumber!=null" v-text="getGameNextOpenNodata.gameNumber.slice(-7)" style="color:#ec2829;"></span>
              <span v-text="endText"></span>
            </div>
            <countDownTime style="text-align: center;" :endTime="endTime" :wacther="wacther" :callback="endTimeFun"></countDownTime>
          </div>
        </div>
        <div class="sc-hCbubC fTkWGI" >
          <div :class="[('Collapsetransition'),{'ReactCollapse':ReactCollapse}] ">
            <div class="ReactCollapse--content">
              <div class="sc-jTzLTM epAmbE">
                <div class="sc-jzJRlG dboXOJ">
                  <div class="sc-cSHVUG fIxddS sc-fjdhpX hqARns">期次</div>
                  <div class="sc-kAzzGY cUpkAa sc-fjdhpX hqARns"  style="padding: 0 5px">开奖号码</div>
                  <div class="sc-ESoVU dVbkbo sc-fjdhpX hqARns" v-if="$route.params.gameType!='55'&&$route.params.gameType!='66'">和值</div>
                  <div class="sc-ESoVU dVbkbo sc-fjdhpX hqARns" v-if="$route.params.gameType!='44'&&$route.params.gameType!='55'&&$route.params.gameType!='66'">大小</div>
                  <div class="sc-ESoVU dVbkbo sc-fjdhpX hqARns" v-if="$route.params.gameType!='55'&&$route.params.gameType!='66'">单双</div>
                  <div class="sc-ESoVU dVbkbo sc-fjdhpX hqARns" v-if="$route.params.gameType=='11'">龙虎</div>
                </div>
                <!-- <div class="sc-jzJRlG dboXOJ" v-if="$route.name =='officaPlay'">
                  <div class="sc-cSHVUG fIxddS sc-fjdhpX hqARns">期次</div>
                  <div class="sc-kAzzGY cUpkAa sc-fjdhpX hqARns">开奖号码</div>
                  <div class="sc-kAzzGY gqQaWW sc-fjdhpX hqARns">开奖时间</div>
                </div> -->
                <div class="sc-ckVGcZ hkNTsw" style="height: 150px;overflow: auto;">
                  <div>
                    <div class="sc-kgoBCf dmkPsT" v-for="(item,index) in historyList" :key="index">
                      <div class="sc-kGXeez kIGJBC sc-fjdhpX hqARns" :style="$route.params.gameType=='66'?'line-height:50px':''">{{item.gameNumber}}</div>
                      <div class="sc-kpOJdX clpipv sc-fjdhpX hqARns" style="padding: 0 5px">
                        <div v-if="$route.params.gameType=='66'" style="display: flex">
                            <div :style="'width: 24px;line-height: 25px;margin-left:'+ (index==6?'10px':'0')" v-for="(sub,index) in item.gameOpenNo.split(',')" :key="sub+'zoo'"><span :style="'font-weight: 700;color:'+ ball[sub-1].color">{{sub}}</span><span style="color: #000">{{ball[sub-1].zoo}}</span></div>
                        </div>
                        <template v-else>{{item.gameOpenNo}}</template>
                        <div class="sc-jKJlTe ikRPSO"></div>
                      </div>

                      <div class="sc-kkbgRg gyASzi sc-fjdhpX hqARns" v-if="$route.params.gameType!='55'&&$route.params.gameType!='66'">
                        <div class="sc-hUMlYv iwrxpb">
                          <div class="sc-dNLxif BLEB">{{item.gameOpenNoCase?item.gameOpenNoCase[0]:'#'}}</div>
                        </div>
                      </div>
                      <div class="sc-kkbgRg gyASzi sc-fjdhpX hqARns" v-if="$route.params.gameType!='44'&&$route.params.gameType!='55'&&$route.params.gameType!='66'">
                        <div class="sc-hUMlYv iwrxpb">
                          <div class="sc-dNLxif BLEB" :class="item.gameOpenNoCase[1]=='大'?'openred':'openblue'">{{item.gameOpenNoCase?item.gameOpenNoCase[1]:'#'}}</div>
                        </div>
                      </div>
                      <div class="sc-kkbgRg gyASzi sc-fjdhpX hqARns" v-if="$route.params.gameType!='55'&&$route.params.gameType!='66'">
                        <div class="sc-hUMlYv iwrxpb">
                          <div class="sc-dNLxif BLEB" :class="item.gameOpenNoCase[2]=='双'?'openred':'openblue'">{{item.gameOpenNoCase?item.gameOpenNoCase[2]:'#'}}</div>
                        </div>
                      </div>
                      <div class="sc-kkbgRg gyASzi sc-fjdhpX hqARns" v-if="$route.params.gameType=='11'">
                        <div class="sc-hUMlYv iwrxpb">
                          <div class="sc-dNLxif BLEB" :class="item.gameOpenNoCase[3]=='龙'?'openred':'openblue'">{{item.gameOpenNoCase?item.gameOpenNoCase[3]:'#'}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-show="$route.name =='officaPlay'">
                    <div class="sc-kgoBCf dmkPsT" v-for="(item,index) in historyList" :key="index">
                      <div class="sc-kGXeez kIGJBC sc-fjdhpX hqARns">
                        <span v-text="item.gameNumber || ''"></span>
                      </div>
                      <div class="sc-kpOJdX clpipv sc-fjdhpX hqARns">
                        <span v-text="item.gameOpenNo || ''"></span>
                        <div class="sc-jKJlTe ikRPSO"></div>
                      </div>
                      <div class="sc-kGXeez gqQaWW sc-fjdhpX hqARns" v-dateFormat="{a:'hh:mm:ss',b:item.gameOpenDt || ''}"></div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition v-if="!isStopSell">
        <router-view :settings="ssgSelItem" :changeSetting="changeSettings" :lhcObj="lhcObj"></router-view>
      </transition>
      <div v-else style="position: relative;">
        <transition>
          <router-view :settings="ssgSelItem" :changeSetting="changeSettings" :lhcObj="lhcObj"></router-view>
        </transition>
        <div class="stopsell-image" v-if="isStopSell">
          <div class="img-box">
            <img src="/static/img/stopsp.jpg" style="max-width:100%">
          </div>
        </div>
      </div>
      <div slot="drawer" style="height: 100%;background-color:#fff;">
        <div class="bm-menu" style="height: 100%; box-sizing: border-box; overflow: auto;">
          <nav class="bm-item-list" style="height: 100%;">
            <div class="sc-iIHjhz kDeJmS" style="display: block; outline: none;">
              <div class="sc-jHZirH eWjHiJ">
                <div class="sc-bdVaJa gLHRUG">
                  <div class="sc-dKEPtC gOdhbh">
                    <div>用户名</div>
                    <div>
                      <span class="sc-bSbAYC cwUtlV" v-text="custName"></span>
                    </div>
                  </div>
                  <div class="sc-dKEPtC gOdhbh">
                    <div>余额</div>
                    <div>
                      <span class="sc-bSbAYC cwUtlV" v-text="acctAmt"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sc-dBAPYN hfNBgs">
                <div class="sc-bdVaJa gLHRUG" @click="$router.push('/')">
                  <i class="sc-dvpmds gzHUFB iconfont icon-shouye"></i>
                  <span>首页</span>
                </div>
              </div>
              <div class="sc-dBAPYN hfNBgs" @click="$router.push('/trendChart')">
                <i class="sc-dvpmds gzHUFB iconfont icon-shujutu"></i>
                <span>走势图</span>
              </div>
              <div class="sc-dBAPYN hfNBgs" @click="$router.push('/gameGroupIntroduce/'+ $route.params.gameType +'/'+ $route.params.gameNo +'/'+ $route.params.gameName)">
                <i class="sc-dvpmds gzHUFB iconfont icon-bangzhu"></i>
                <span>玩法介绍</span>
              </div>
              <div class="sc-dBAPYN hfNBgs" @click="$router.push('/betRecordsview')">
                <i class="sc-dvpmds gzHUFB iconfont icon-jilu"></i>
                <span>投注记录</span>
              </div>
              <div class="sc-dBAPYN hfNBgs" @click="$router.push('/betRecordsview')">
                <i class="sc-dvpmds gzHUFB iconfont icon-gongzuojilu"></i>
                <span>追号记录</span>
              </div>
              <div class="sc-dwztqd eVmely">
                <i class="sc-dvpmds gzHUFB iconfont icon-qian"></i>
                <span class="sc-bdVaJa gLHRUG">投注设定</span>
                <div class="sc-iAyFgw jojIVQ">
                  <div v-if="$store.state.yjf.indexOf('0')>=0" :class="[{'dGZWjc':moneyModel==1,'kbsfs':moneyModel==0}]" @click="moneyModelFun(0)">元</div>
                  <div v-if="$store.state.yjf.indexOf('1')>=0" :class="[{'dGZWjc':moneyModel==0,'kbsfs':moneyModel==1}]" @click="moneyModelFun(1)">角</div>
                </div>
              </div>
              <div class="sc-iFUGim fHgZyr" @click="gameMenu=!gameMenu">游戏菜单
                <i style="display: inline-block;color:#ec2829;" :class="[('transition iconfont icon-xiala'),{'rotate180':gameMenu}]"></i>
              </div>
              <!-- 玩法循环 -->
              <div v-show="gameMenu">
                <template v-for="sub in getGameList">
                <div class="sc-cNQqM eeYALU" v-for="(item,index) in sub.gameSetting" :key="index+item.gameType" @click="menuPlayFun(item.gameType,item.gameNo,item.gameName)">
                  <img :src="$imgPath(item.imgPath)" class="sc-clBsIJ cqGToj">
                  <div class="sc-bdVaJa gLHRUG" v-text="item.gameName"></div>
                </div>
                </template>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </drawer>
    <!-- 信用 官方 头部header切换 -->
    <div class="sc-sPYgB gSiotA" v-if="showPlay&&$route.params.gameType!='66'">
      <tab :line-width="1" active-color="#ec2829" :animate="false">
        <tab-item :selected="isOffical" @on-item-click="isOffical=true">官方玩法</tab-item>
        <tab-item :selected="!isOffical" @on-item-click="isOffical=false">信用玩法</tab-item>
      </tab>
      <!-- 官方 -->
      <div class="sc-gipzik gqsLJj" v-if="isOffical">
        <div class="sc-csuQGl kksevx">
          <div class="sc-Rmtcm eZRHqy" v-if="dataOffica.length>0">
            <div :class="[('sc-bRBYWo kmZCVB'),{'ezEUQQ':index==bigDataIndex}]" v-for="(item,index) in dataOffica" :key="index" @click="bigGameDataFun(index)">
              <div v-text="item.groupClassName"></div>
            </div>
          </div>
        </div>
        <div class="sc-fBuWsC kBnMAR" v-if="groupConesOffica.length>0">
          <div class="sc-fMiknA gKghwh" v-for="(big,bigIndex) in groupConesOffica" :key="bigIndex">
            <div class="sc-dVhcbM ezoppo" style="min-width: 80px;">
              <span v-text="big.groupClassConName"></span>
              <span class="sc-eqIVtm iafjvm"></span>
            </div>
            <div class="sc-fAjcbJ RpcjG">
              <div :class="[('sc-caSCKo kyrUxa'),{'iAtDMV':bigIndex==smallIndexWarp&&smallIndex==smallIndexInner&&rememberIndex==bigDataIndex}]"
                v-for="(small,smallIndex) in big.groupSettinges" :key="smallIndex" @click="SmallGameDataFun(bigIndex,smallIndex,small)">
                <div v-text="small.groupName"></div>
                <div class="jojIVQ" v-if="small.groupNameAlias.length>0">
                  <div class="sc-cmthru sIMZE" v-for="(AliasItem,AliasIndex) in small.groupNameAlias" :key="AliasIndex">
                    <img :src="`/static/saizi/s${AliasIndex+1}.png`" style="padding:0 2px;width: 18px;">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 信用 -->
      <div class="sc-gipzik gqsLJj" v-else>
        <div class="sc-csuQGl kksevx">
          <div class="sc-Rmtcm eZRHqy" v-if="dataCredit.length>0">
            <div :class="[('sc-bRBYWo kmZCVB'),{'ezEUQQ':index==creditIndex}]" v-for="(item,index) in dataCredit" :key="index" v-text="item.groupClassName"
              @click="bigGameDataCredit(index,item)"></div>
          </div>
        </div>

        <!-- <div class="sc-fBuWsC kBnMAR" v-if="$route.params.gameType=='66'">
          <div class="sc-fMiknA gKghwh" v-for="(big,bigIndex) in dataCredit[creditIndex].groupClassCones" :key="bigIndex+'crd'">
            <div class="sc-dVhcbM ezoppo" style="min-width: 80px;">
              <span v-text="big.groupClassConName"></span>
              <span class="sc-eqIVtm iafjvm"></span>
            </div>
            <div class="sc-fAjcbJ RpcjG">
              <div :class="[('sc-caSCKo kyrUxa'),{'iAtDMV':bigIndex==smallIndexWarp&&smallIndex==smallIndexInner&&rememberIndex==bigDataIndex}]"
                v-for="(small,smallIndex) in big.groupSettinges" :key="smallIndex" @click="SmallGameDataFun(bigIndex,smallIndex,small)">
                <div v-text="small.groupName"></div>
              </div>
            </div>
          </div>
        </div> -->

      </div>
    </div>
<!-- //六合彩 -->
    <div  class="sc-sPYgB gSiotA" v-if="$route.params.gameType=='66'&&showPlay">
      <div class="sc-gipzik gqsLJj">
        <div class="sc-csuQGl kksevx">
          <div class="sc-Rmtcm eZRHqy" v-if="dataCredit.length>0">
            <div :class="[('sc-bRBYWo kmZCVB'),{'ezEUQQ':index==creditIndex}]" v-for="(item,index) in dataCredit" :key="index" v-text="item.groupClassName"
              @click="lhcBigGameDataCredit(index,item)"></div>
          </div>
        </div>

        <div class="sc-fBuWsC kBnMAR" v-if="$route.params.gameType=='66'">
          <div class="sc-fMiknA gKghwh" v-for="(big,bigIndex) in dataCredit[creditIndex].groupClassCones" :key="bigIndex+'crd'">
            <div class="sc-dVhcbM ezoppo" style="min-width: 80px;">
              <span v-text="big.groupClassConName"></span>
              <span class="sc-eqIVtm iafjvm"></span>
            </div>
            <div class="sc-fAjcbJ RpcjG">
              <div :class="[('sc-caSCKo kyrUxa'),{'iAtDMV':bigIndex==smallIndexWarp&&smallIndex==smallIndexInner&&lhcrememberIndex==creditIndex}]"
                v-for="(small,smallIndex) in big.groupSettinges" :key="smallIndex" @click="lhcSmallGameDataFun(bigIndex,smallIndex,small)">
                <div v-text="small.groupName"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import betView from './betView.js';
  export default {
    ...betView
  }

</script>
<style lang="less" scoped>
  @import './betView.less';
  .openred{
    background: #ec2829;
    color: #fff;
  }
  .openblue{
    background: #5691d7;
    color: #fff;
  }

   .stopsell-image {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; z-index: 999;
  }
  .stopsell-image > .img-box {
    margin: 8em auto 0;  width: 85%;
  }
</style>

