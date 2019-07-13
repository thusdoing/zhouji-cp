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
            <div class="play-content-list flex" v-for="(itemWarp, DataNumIndex) in (this.config ? this.config.sub : [])" :key="DataNumIndex">
                <div class="label flex">
                    <p class="iconfont icon-decoration_icon"></p>
                    <p v-text="itemWarp.unit"></p>
                </div>
                <div class="ball-panel flex">
                    <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
                        <p @click="choiceNum($event, DataNumIndex)" v-text="item-itemWarp.golbal[0]"></p>
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
<script>
import index from "./index";
export default {
  ...index
};
</script>
<style lang='less' scoped>
@import "../bet.less";
</style>
