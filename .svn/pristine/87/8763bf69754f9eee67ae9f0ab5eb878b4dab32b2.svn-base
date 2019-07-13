<template>
  <div>
    <div class="play-content playBoxNum">
      <div class="textareabox">
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
        <div class="textarea">
          <textarea v-integer v-model="textAreaV" placeholder="程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化。."></textarea>
        </div>
        <div class="btn-group">
          <Button type="error" @click="RemoveRet">删除重复号</Button>
          <Button type="error" @click="cleartextArea">清空文本框</Button>
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
<script>
  import index from './index';
  export default {
    ...index
  }
</script>
<style scoped lang="less">
  .textareabox{
    padding: 30px 10px 20px 10px;
    background-color: #fff;
    .btn-group{
      padding-top: 10px;
      text-align: center;
    }
  }
  .textarea{
    width: 100%;
    height: 140px;
    textarea{
      outline: none;
      width: 100%;
      height: 100%;
      padding: 10px;
      resize: none;
      font-size: 13px;
    }
  }

  .okbet-wraps {
    margin-top: 1px;
    padding: 10px;
    background-color: #fff;
    font-size: 13px;
  }
</style>