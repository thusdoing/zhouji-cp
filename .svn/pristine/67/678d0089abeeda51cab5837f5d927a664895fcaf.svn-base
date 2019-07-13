<template>
  <div>
    <div class="game-wraps"  v-if="bigGameData.length!=0">
      <div class="biggame-tabs">
        <span v-for="(item, index) in bigGameData" class="bg-item" :class="{'select-bg-item':bgselID==item.groupClassNo}" :key="'bg'+index"
          @click="bgselID=item.groupClassNo;bgselItem=item;selindex=[0,0]">{{item.groupClassName}}</span>
        <Button type="error" v-if="$route.params.gameType!='66'" size="small" icon="arrow-swap" style="float: right;padding: 3px 4px;" @click="$router.push(`/bet/${$route.params.gameType}/${$route.params.gameNo}/official`)">官方玩法</Button>
      </div>

      <div data-v-162e01c4="" class="smallgame-tabs" v-if="$route.params.gameType=='66'">
        <div data-v-162e01c4="" style="margin: 10px;" v-for="(item, index) in bgselItem.groupClassCones" :key="index+'item'">
          <label data-v-162e01c4="" style="font-size: 13px;">{{item.groupClassConName}}</label>
          <span data-v-162e01c4="" class="ssg-item" @click='selsmale(index,index2)' :class="index==selindex[0]&&index2==selindex[1]?'select-ssg-item':''" v-for="(sub, index2) in item.groupSettinges" :key="''+index+index2">{{sub.groupName}}</span>
        </div>
      </div>

    </div>
      <h1 v-if="weikaifang" style="text-align: center;padding: 100px 0;font-size: 40px;">当前玩法未开放...<a @click="$router.push(`/bet/${$route.params.gameType}/${$route.params.gameNo}/official`)" style="display: inline;font-size: 14px;margin-left: 60px;">去官方玩法看看</a></h1>
   <div class="gameplay-wraps"  v-if="bigGameData.length!=0">
      <div style="margin-left:1px;margin-top:1px;background-color:#fff;font-size:14px;">
        <component @updated="betTableListUpdated" @bet="onGameBet" v-if="configData" :is="configData.component" :configData="configData" :gameData="bgselItem" :selindex='selindex'></component>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/assets/data/data.credit.config'
  import lhzh from '@/views/sscCredit/sscCredit/lhzh/index.vue' //整合
  import lhd from '@/views/sscCredit/sscCredit/lhd/index.vue' //龙虎斗
  import lhq5z1 from '@/views/sscCredit/sscCredit/lhq5z1/index.vue' //5中1
  import dxsb from '@/views/k3Credit/dxsb/index.vue'

  //北京pk10
  import bjpk10sm from '@/views/bjpk10/credit/shuangmian.vue'
  import bjpk10dxds from '@/views/bjpk10/credit/dxds.vue'
//十一选五
  import syx5sm from '@/views/syx5credit/liangmian.vue'
  import syx5x5z1 from '@/views/syx5credit/x5z1.vue'
  import syx5lhd from '@/views/syx5credit/lhd.vue'
  //六合彩
  import lhctema from '@/views/lhc/tema.vue'
  import twoSided from '@/views/lhc/twoSided.vue'
  import concatCode from '@/views/lhc/concatCode.vue'
  //pcdd
  import pcdd from '@/views/pcdd/credit/credit.vue'
  
  export default {
    components: {
      lhzh,lhd,lhq5z1,dxsb,bjpk10sm,bjpk10dxds,syx5sm,syx5x5z1,syx5lhd,lhctema,twoSided,concatCode,pcdd
    },
    data() {
      return {
        bigGameData: [],
        bgselID: '',
        bgselItem: {},
        weikaifang:false,
        selindex:[0,0]
        // configData: null,
      }
    },
    computed: {
        configData: function () {
            return config.dataConfigSlot(this.$route.params.gameType,this.bgselID,this.bgselItem.groupClassCones[this.selindex[0]].groupSettinges[this.selindex[1]],this.$store.state.openTime||Date.now())
        },
    },
    mounted() {
      this.$http({
          method: 'get',
          url: '/getGameGroupByGameWithGroup',
          params: {
            gameNo: this.$route.params.gameNo,
            groupType: 1
          }
        })
        .then(response => {
          if (response.data.success) {
            if(response.data.list!=null&&response.data.list.length>0){
              this.bigGameData = response.data.list
              this.bgselItem = response.data.list[0]
              this.bgselID = this.bgselItem.groupClassNo
            }else{
              this.weikaifang = true
            }
            
            // this.configData = config.dataConfigSlot(this.$route.params.gameType,this.bgselID)

            /* if (this.$route.params.gameType == '22' || this.$route.params.gameType == '33') {
              this.bgselItem = response.data.list
            } */
          }
        })
    },
     methods: {
        onGameBet: function(obj) {
            this.$emit('betTableListFun', obj)
        },
        //通知投注记录更新
        betTableListUpdated(){
          this.$emit('updated',+new Date().getTime());
        },
        selsmale(index,index2){
          this.selindex = [index,index2]
        }
    }
  }

</script>

<style scoped>
  .game-wraps {
    position: relative;
    margin-left: 32px;
  }

  .game-wraps::before {
    /* content: '玩法';
    position: absolute;
    left: -32px;
    top: 50%;
    transform: translateY(-50%);
    writing-mode: vertical-lr;
    text-orientation: upright;
    line-height: 32px;
    white-space: nowrap;
    color: #c3c3c3;
    font-size: 0.8em;
    z-index: 9; */

    content: '玩法';
    position: absolute;
    left: -22px;
    top: 50%;
    transform: translateY(-50%);
    line-height: 12px;
    width:20px;
    white-space: pre-wrap;
    color: #c3c3c3;
    font-size: 0.8em;
    z-index: 9;
  }

  .game-wraps::after {
    content: '';
    position: absolute;
    left: -32px;
    top: 0;
    width: 32px;
    bottom: 0;
    background-color: #f7f7f7;
  }

  .biggame-tabs {
    font-size: 0;
  }

  .bg-item {
    display: inline-block;
    padding: 6px;
    color: #ababab;
    background-color: #f2f2f2;
    border-top: 2px solid transparent;
    margin-right: 1px;
    margin-left: 1px;
    font-size: 13px;
    cursor: pointer;
  }

  .select-bg-item {
    border-top-color: #e60b0b;
    color: #e60b0b;
    background-color: #fff;
  }

  .smallgame-tabs {
    padding: 15px;
    background-color: #fff;
    margin-left: 1px;
  }

  .ssg-item {
    margin-left: 20px;
    font-size: 13px;
    color: #ababab;
    padding: 2px;
    cursor: pointer;
  }

  .select-ssg-item {
    background-color: #e60b0b;
    color: #fff;
  }

  .gameplay-wraps {
    position: relative;
    margin-left: 32px;
  }

  .gameplay-wraps::before {
    content: '选择幸运号码';
    /* position: absolute;
    left: -32px;
    top: 50%;
    transform: translateY(-50%);
    writing-mode: vertical-lr;
    text-orientation: upright;
    line-height: 32px;
    white-space: nowrap;
    color: #c3c3c3;
    font-size: 0.8em;
    z-index: 9; */

    position: absolute;
    left: -22px;
    top: 50%;
    transform: translateY(-50%);
    line-height: 18px;
    width:20px;
    white-space: pre-wrap;
    color: #c3c3c3;
    font-size: 0.8em;
    z-index: 9;
  }

  .gameplay-wraps::after {
    content: '';
    position: absolute;
    left: -32px;
    top: 0;
    width: 32px;
    bottom: 0;
    background-color: #f7f7f7;
  }

</style>
