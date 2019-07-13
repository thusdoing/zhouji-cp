<template>
  <div>
    <div class="play-content playBoxNum">

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

      <div class="local-wrap">
          <label>选择位置: </label>
      
          <CheckboxGroup v-model="social">
              <Checkbox label="万"></Checkbox>
              <Checkbox label="千"></Checkbox>
              <Checkbox label="百"></Checkbox>
              <Checkbox label="十"></Checkbox>
              <Checkbox label="个"></Checkbox>
          </CheckboxGroup>

          <label>(温馨提示: 你选择了 {{ selLen }} 个位置，系统会自动根据位置组合成 {{ schemeCount }} 个方案)</label>
      </div>

      <div class="play-content-list flex" v-for="(itemWarp,DataNumIndex) in (this.config ? this.config.sub : [])" :key="DataNumIndex">
        <div class="label flex">
          <p class="iconfont icon-decoration_icon"></p>
          <p v-text="itemWarp.unit"></p>
        </div>
        <div class="ball-panel flex">
          <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
            <p @click="choiceNum($event,DataNumIndex)" v-text="item-itemWarp.golbal[0]"></p>
          </div>
        </div>
      </div>
      <div class="bet2confirm">
          <p>您选择了
              <span>{{betCount}}</span> 注</p>
          <Button @click="btnConfirmChoiceFun" :disabled="betEnabled" type="error">确认选号</Button>
      </div>
    </div>
    

  </div>
</template>

<style lang='less' scoped>
    @import '../bet.less';
</style>

<style scoped>
  .local-wrap {
      padding: 10px;
      font-size: 13px;
  }

  .local-wrap >>> .ivu-checkbox-group {
      display: inline-block;
      margin: 0 0 0 10px;
  }
</style>
<script>
  import index from './index';
  export default {
    ...index
  }
</script>
