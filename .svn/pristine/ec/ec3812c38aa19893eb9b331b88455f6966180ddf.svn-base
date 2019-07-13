<template>
  <div class="shopping-cart">
    <div class="cart">
      <Table height="200" :columns="THData" :data="tableList"></Table>
    </div>
    <div class="bet-summary noselect">
      <div class="f16 bet-summary-text">
        <div>
          总注数
          <span class="high-light" v-text="allYard"></span> 注
        </div>
        <div>
          总金额
          <span class="high-light" v-text="allMoney"></span>
          <span class="v3-hide">元</span>
        </div>
        <span class="toggle-trace">
          <span>
            <label :class="[('ivu-checkbox-wrapper ivu-checkbox-group-item'),{'ivu-checkbox-wrapper-checked':ivuCheckbox}]">
              <span :class="[('ivu-checkbox'),{'ivu-checkbox-checked':ivuCheckbox}]">
                <span class="ivu-checkbox-inner" @click="chaseCheckFun"></span> 
                <input style="z-index: -1;" type="checkbox" ref="ivuCheckboxInput" class="ivu-checkbox-input"></span> 
                <span>我要追号</span>
            </label>
          </span>
        </span>
      </div>
    </div>
    <div class="cart-btns">
      <p style="margin-bottom:10px;">
        <Button :disabled="enabledEmpty" class="main-btn" type="error"  @click="tableList=[]">清空选号</Button>
      </p>
      <p>
        <Button :disabled="enabledBet" class="main-btn" type="error" @click="betGame">马上投注</Button>
      </p>
    </div>
  </div>
</template>

<script>
  import index from './index.js'
  export default {
    ...index
  }

</script>
<style lang="less" scoped>
  @import './index.less';
</style>
