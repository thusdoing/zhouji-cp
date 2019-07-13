<style scoped>
.grid-items>>>.el-card__body{text-align: right;padding: 10px;display: flex;font-size: 10px;color: #c9c9c9;align-items: center;}
.el-card__body img{width: 45px;height: 45px;}
.el-card__body .grid-infos{flex: 1;margin-left: 4px;}
.grid-discount{display: flex;margin-left: 4px;}
.grid-discount div{margin:1px;}
.red-circular{flex: 1;background-color: #e8173d;color: #ffffff;width: 22px;height: 22px;border-radius: 12px;text-align: center;line-height: 22px;font-size: 14px;}
.green-circular{flex: 1;background-color: green;color: #ffffff;width: 22px;height: 22px;border-radius: 12px;text-align: center;line-height: 22px;font-size: 14px;}
.blue-circular{flex: 1;background-color: blue;color: #ffffff;width: 22px;height: 22px;border-radius: 12px;text-align: center;line-height: 22px;font-size: 14px;}
.grid-mark{display: flex;margin-left: 4px;align-items: center;}
.grid-mark .grid-title{font-size: 14px;color: #5E5E5E;}
.grid-mark .grid-flag{flex:1;}
.grid-string{width:330px;height:20px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;}
.grid-text-div{position: absolute;right: 10px;top: 23px;}
</style>
<template>
    <el-row class="grid-items">
        <el-col :span="24">
            <div @click="clickFunction"> 
                <el-card shadow="never">
                    <img v-if="item.imgPath" :src="$imgPath(item.imgPath)"/>
                    <div class="grid-infos">
                        <div class="grid-mark">
                            <div>
                                <span class="grid-title">{{item.gameName}}</span>
                                <span style="color: #666;font-size: 14px;">￥{{item.totalAdditionAmt}}</span>
                                <span v-html="item.texts"></span>
                            </div>
                            <div class="grid-flag"></div>
                            <span></span>
                        </div>
                        <div class="grid-discount">
                            <div style="color: #666;font-size: 14px;">第{{item.firstGameNumber}}期 {{item.betDate}}</div>
                        </div>
                    </div>
                    <i  class="el-icon-arrow-right"></i>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import openAwardRes from '@/components/openAwardRes/index';
export default {
    components : {
        openAwardRes
    },
    props : {
        item:Object
    },
    methods : {
        to_page (path) {

        },
        clickFunction(){
            this.$emit("click", this.props);
        },
        showContent(msgDiscount){

            if(typeof msgDiscount == 'string'){
                return msgDiscount;
            }
            if(typeof msgDiscount == 'object'){
                return msgDiscount[0];
            }
        },
        formatContentClass(msgDiscount){
            if(typeof msgDiscount == 'string'){
                return true;
            }else{
                return false
            }
        }
    }
}
</script>
