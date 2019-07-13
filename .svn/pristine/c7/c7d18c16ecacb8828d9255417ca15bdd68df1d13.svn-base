<template>
  <div class="trace-view">
    <div class="win-stop noselect">
      <div>
        <Checkbox v-model="officialStop">中奖后停止追号</Checkbox>
      </div>
    </div>
    <div>
      <Tabs class="tab-list" type="card" :animated="false" @on-click="TabPaneChange">
        <TabPane label="普通追号" name="1">
          <div class="basic-trace">
            持续追：
            <ul class="inline-block">
              <li :class="[{'active':chasePeriod==5}]">
                <span @click="chasePeriod=5">5期</span>
              </li>
              <li :class="[{'active':chasePeriod==10}]">
                <span @click="chasePeriod=10">10期</span>
              </li>
              <li :class="[{'active':chasePeriod==15}]">
                <span @click="chasePeriod=15">15期</span>
              </li>
              <li :class="[{'active':chasePeriod==20}]">
                <span @click="chasePeriod=20">20期</span>
              </li>
            </ul>
            <div class="issue inline-block">
              <input v-integer type="text" min="1" max="48" size="4" maxlength="7" v-model="chasePeriod"> 期
            </div>
            <div class="multiple inline-block">
              倍数：
              <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="chaseTimes">
            </div>
          </div>
        </TabPane>
        <TabPane label="翻倍追号" name="2">
          <div class="config double-trace">
            <div class="row">
              <div class="col w50">
                <span class="title">基本参数</span>
                <div class="ctrl">
                  起始期号：
                  <Select v-model="SelectGameNumber" style="width:200px">
                    <Option :value="item.gameNumber" v-for="(item,index) in OptionList" :key="index"></Option>
                  </Select>
                </div>
                <div class="ctrl">
                  追号期数：
                  <input v-integer type="text" min="1" max="48" size="4" maxlength="7" v-model="intervalTimesPeriod"> 期
                </div>
                <div class="ctrl">
                  起始倍数：
                  <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="intervalTimesTimes"> 倍
                </div>
              </div>
              <div class="col w50">
                <span class="title">高级参数</span>
                <RadioGroup v-model="intervalTimes">
                  <Radio :label="intervalTimesArgUp">
                    <div class="radio" style="display:inline-block;">
                      <div class="inline-block" style="vertical-align: bottom;">
                        每隔
                        <input v-integer type="text" min="1" max="50" size="4" maxlength="7" v-model="intervalTimesOne"> 期 / 倍数x
                        <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="intervalTimesTwo">
                      </div>
                    </div>
                  </Radio>
                  <Radio :label="intervalTimesArgDown">
                    <div class="radio" style="display:inline-block;">
                      <div class="inline-block" style="vertical-align: bottom;">
                        前
                        <input v-integer type="text" min="1" max="50" size="4" maxlength="7" v-model="intervalTimesThree"> 期 / 倍数同起始倍数，之后倍数
                        <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="intervalTimesFour">倍起始倍数
                      </div>
                    </div>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="generate-trace row">
              <div class="main-btn" @click="getGameNextOpenNoLists(intervalTimesPeriod,1)">生成追号计划</div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div class="trace-table">
      <div class="table-box">
        <Table height="430" :border="false" @on-selection-change="selectionChange" :columns="THData" :data="TableData"></Table>
      </div>
      <p class="total">
        共追号
        <span class="high-light" v-text="userChasePeriod"></span>
        期，
        <span class="high-light" v-text="userChaseCount"></span>
        注， 总投注金额
        <span class="high-light" v-text="userChaseMoney"></span>
        元
      </p>
      <div v-if="userSelection.length>0" class="cart-btns isTrace">
        <div class="submit main-btn" @click="superadditionBet">马上投注</div>
      </div>
    </div>
  </div>
</template>

<script>
  import index from './index.js';
  export default {
    ...index
  }

</script>

<style lang="less" scoped>
  @import './index.less';

</style>
