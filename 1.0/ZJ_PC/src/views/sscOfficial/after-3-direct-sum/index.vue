<template>
  <div>
    <div class="play-content playBoxNum">
      <div class="play-content-list flex" v-for="(itemWarp,DataNumIndex) in this.$parent.DataNumChoice.sub" :key="DataNumIndex">
        <div class="label flex">
          <p class="iconfont icon-decoration_icon"></p>
          <p v-text="itemWarp.unit"></p>
        </div>
        <div class="ball-panel flex">
          <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
            <p @click="choiceNum($event,DataNumIndex)" v-text="item-itemWarp.golbal[0]"></p>
            <sup v-if="LostChecked" :style="{color:item%2==0?'red':''}" v-text="item-1"></sup>
            <sup v-if="hotChecked" :style="{color:item%2==0?'red':''}" v-text="item+1"></sup>
          </div>
        </div>
      </div>
      <!-- <div style="align-items: center;" class="flex">
        <div>后三码:</div>
        <div>后三直选复式</div>
        <div style="margin-left:20px;">
          <Checkbox v-model="hotChecked" @click="LostChecked = false">
            <span style="margin-left:2px;">冷热</span>
          </Checkbox>
          <Checkbox v-model="LostChecked" @click="hotChecked = false">
            <span style="margin-left:2px;">遗漏</span>
          </Checkbox>
        </div>
        <br>
      </div> -->
    </div>
    <!-- 加倍区 -->
    <div class="add-area-box">
      <div class="add-area flex">
        <div class="flex align-items-c add-panel">
          <p @click="updata_add_times('sub')" class="add"><i class="iconfont icon-jianhao"></i></p>
          <input :value="this.$parent.add_times" @input="updata_add_times($event)" v-integer class="add_v" type="text">
          <p @click="updata_add_times('add')" class="add"><i class="iconfont icon-iconjia"></i></p>
        </div>       
        <p style="margin:0 2px;">倍</p>
        <p style="margin:0 2px;">模式</p>
        <div class="model">
          <Select ref="model1" @on-change="updata_model1" :value="this.$parent.model1" style="width:50px">
              <Option v-for="item in this.$parent.modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!-- <div class="silder">
          <div>
            <Slider v-model="$store.state.silderVal" :step="1"></Slider>
          </div>
        </div> -->
        <div class="flex showChip">
          <!-- <p>{{$store.state.silderVal}}</p> -->
          <p>
            共选<span style="color:#da4040;" v-text="this.$parent.allChoiceYard"></span>注；
            共投<span style="color:#da4040;" v-text="this.$parent.allPutMoney"></span>元，
            盈利<span style="color:#da4040;" v-text="this.$parent.estimateProfit"></span>元
          </p>
        </div>
        <div class="btn-group">
          <Button type="warning" @click="btnConfirmChoiceFun" :disabled="this.$parent.btnConfirmChoice">
            <Icon type="ios-compose"></Icon>
            确认选号
          </Button>
          <Button type="warning"  @click="btnConfirmChoiceFun('atOnce')" :disabled="this.$parent.btnImmediately">
            <Icon type="android-checkbox-outline"></Icon>
            立即下注
          </Button>
        </div>
      </div>              
      <div class="add-area flex">
        <p style="flex: 2;text-align:right;">投注列表</p>
        <p style="margin:0 5px;flex: 3;text-align:center;">
          <Button type="default" @click="update_allYardList">
            <Icon type="ios-trash-outline" color="#d32a3d"></Icon>
            清空
          </Button>
        </p>
        <p style="width:335px;">操作状态</p>
        <!-- <div class="add-area-switc">
          <i-switch v-model="this.$parent.playSwitch" class="vertical-m"></i-switch>
          <span class="vertical-m">是否锁定倍数</span>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import index from './index';
  export default {
    ...index
  }
</script>
