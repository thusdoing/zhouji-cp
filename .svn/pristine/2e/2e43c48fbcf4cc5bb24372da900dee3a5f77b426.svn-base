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

      <div style="display:flex;flex-direction: column;align-items: center;" v-if="config.common">
        <div style="display:flex;flex-wrap: wrap;width: 344px;border: 2px solid #ccc;border-radius: 6px;" :style="{borderColor: selCommon?'red':'#ccc'}">
          <div v-for="(item,index) in config.show" :key="'common'+index" style="display:flex;margin:10px;">  
              <img v-for="(el,i) in item.toString().split('')" style="margin:0 5px;width:40px;height:40px;" :src="`/static_pc/images/saizi/${el}.png`" alt="" :key="el+'a'+i">
          </div>
        </div>
        
        <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (config ? config.sub : [])" :key="'f'+DataNumIndex">
          <div class="label flex" v-if="itemWarp.unit">
            <p class="iconfont icon-decoration_icon"></p>
            <p style="" v-text="itemWarp.unit"></p>
          </div>
          <p v-if="DataNumIndex==1" style="font-size:36px;font-weight:bold;position:relative;left:-15px;">+</p>
          <div class="ball-panel flex">
            <div v-for="(item,index) in itemWarp.golbal" :key="index">
              <p class="golbal" @click="choiceNum($event,DataNumIndex,index);" v-text="item"></p>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;" v-else>
        <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (config ? config.sub : [])" :key="'d'+DataNumIndex">
          <div class="label flex" v-if="itemWarp.unit">
            <p class="iconfont icon-decoration_icon"></p>
            <p style="" v-text="itemWarp.unit"></p>
          </div>
          <p v-if="DataNumIndex==1" style="font-size:36px;font-weight:bold;position:relative;left:-15px;">+</p>
          <div class="ball-panel flex">
            <div v-for="(item,index) in itemWarp.golbal" :key="index">
              <p class="golbal" @click="choiceNum($event,DataNumIndex,index)"> 
                <img v-for="el in item.toString().split('')" @click.stop="choiceNumIMG($event,DataNumIndex,index)" style="margin:0 5px;width:40px;height:40px;" :src="`/static_pc/images/saizi/${el}.png`" alt="">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="okbet-wraps" style="margin-top: 1px;padding: 10px;background-color: #fff;font-size: 13px;">
        <label>倍数</label>
        <InputNumber :precision="0"   :min="1" v-model="betTimes"></InputNumber>
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

<style scoped>
  /* .golbal{
    border-radius: 4px;
    background: radial-gradient(circle at 70px 70px, #989595, #ffffff);
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    margin: 0 5px;
    box-shadow: 0px 0px 1px 0px inset;
  } */
</style>


<script>
  import index from './index';
  export default {
    ...index
  }
</script>
