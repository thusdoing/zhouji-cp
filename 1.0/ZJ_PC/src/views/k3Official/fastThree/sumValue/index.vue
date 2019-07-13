<template>
<div>
    <div class="fastThree-content playBoxNum">

      <p style="padding:10px 0 30px;">
        <Icon type="information-circled" style="color:red;"></Icon>
        <label style="font-size:13px;" v-html="config.description"></label>
        <Tooltip placement="bottom-start">
          <div slot="content" v-html="config.rule" style="white-space: normal;"></div>
          <label style="text-decoration:underline;font-size:13px;color:red;">规则</label>
        </Tooltip>
        <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
          <div slot="content" v-html="config.example" style="white-space: normal;"></div>
          <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
        </Tooltip>
      </p>

      <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (this.config ? this.config.sub : [])" :key="DataNumIndex">
        <div class="label flex" v-if="itemWarp.unit">
          <p class="iconfont icon-decoration_icon"></p>
          <p v-text="itemWarp.unit"></p>
        </div>
        <div class="ball-panel" >
            <div class="flex" style="display:flex;justify-content: center;">
              <div v-for="(item,index) in (sumConfig.sub ? sumConfig.sub[0].junior : [])" :key="index" style="flex:none;">
                <p class="golbal" style="border-radius:6px;margin:0 15px 15px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;" @click="choiceNum($event,DataNumIndex,8+index)" v-text="item"></p>
              </div>
            </div>
            <div v-if="bonusAmt.length>0" class="flex" style="display:flex;justify-content: center;">
              <div v-for="(item,index) in (sumConfig.sub ? sumConfig.sub[0].junior : [])" :key="index" style="flex:none;">
                <h6 style="width: 82px; font-weight: normal;text-align: center;color: #4a4a4a;border-radius:6px;margin:0 0 15px;font-size:12px;line-height:30px;" v-text="'赔'+bonusAmt[8+index]"></h6>
              </div>
            </div>
          <div class="flex" style="display:flex;justify-content:center;">
            <div v-for="(item,index) in (sumConfig.sub ? sumConfig.sub[0].golbal[0] : [])" :key="index" style="flex:none;">
              <p class="golbal" style="border-radius:6px;margin:0 15px 15px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;" @click="choiceNum($event,DataNumIndex,index)" v-text="item"></p>
            </div>
          </div>
          <div class="flex" style="display:flex;justify-content:center;">
            <div v-for="(item,index) in (sumConfig.sub ? sumConfig.sub[0].golbal[1] : [])" :key="index" style="flex:none;">
              <p class="golbal" style="border-radius:6px;margin:0 15px 15px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;" @click="choiceNum($event,DataNumIndex,index)" v-text="item"></p>
            </div>
          </div>
          <div v-if="bonusAmt.length>0" class="flex" style="display:flex;justify-content:center;">
            <div v-for="(item,index) in (sumConfig.sub ? sumConfig.sub[0].golbal[0] : [])" :key="index" style="flex:none;">
              <h6 style="width: 82px;font-weight: normal;text-align: center;color: #4a4a4a; margin:0 0 15px;font-size:12px;line-height:30px;" v-text="'赔'+bonusAmt[index]"></h6>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
    <div class="okbet-wraps" style="margin-top: 1px;padding: 10px;background-color: #fff;font-size: 13px;">
        <label>倍数</label>
        <InputNumber :precision="0" :min="1" v-model="betTimes"></InputNumber>
        <label style="margin-left: 15px;">单位</label>
        <ButtonGroup>
          <Button :disabled="$store.state.yjf.indexOf('0')<0" :type="moneyModel==0 ? 'error' : 'default'" @click="moneyModel=0">元</Button>
          <Button :disabled="$store.state.yjf.indexOf('1')<0" :type="moneyModel==1 ? 'error' : 'default'" @click="moneyModel=1">角</Button>
        </ButtonGroup>
        <span style="margin-left:30px;background-color:#f7f7f7;padding:10px;width: 350px;display: inline-block;text-align: center;">
          <label>已选</label><label style="color:red;">{{betCount}}</label><label>注,</label><label style="color:red;">{{betTimes}}</label><label>倍,共</label><label style="color:red;">{{ betAmt }}</label><label>元</label>
        </span>
        <Button icon="arrow-down-c" :disabled="betEnabled" type="error" style="float:right;font-size:14px;font-weight:bold;" @click="btnConfirmChoiceFun">确认投注</Button>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import '../index.less';
</style>

<script>
  import index from './index';
  export default {
    ...index
  }
</script>
