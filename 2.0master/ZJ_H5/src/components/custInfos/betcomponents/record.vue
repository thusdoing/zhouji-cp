<template>
    <div class="recordItem">
        <div class="recordItem-top">
            <div class="recordItem-top-l"><img style="width: 45px;" :src="$imgPath(item.imgPath)" alt=""></div>
            <div class="recordItem-top-c">
                <div style="font-size: 14px;color: #494949;">{{item.gameName}}</div>
                <div style="font-size: 12px;color: #6C6C6C">{{item.gameNumber}}期{{$Date(item.betDate,'hh:mm:ss')}}</div>
            </div>
            <div class="recordItem-top-r">
                <div>￥{{item.betAmt}}</div>
                <div v-html="item.texts"></div>
            </div>
        </div>
        <div class="recordItem-buttom">
            <div class="openResult"><label>开奖结果</label><div v-if="item.gameOpenNo" style="flex: 1 1 auto;text-align: right;"><span v-for="(sub, index) in item.gameOpenNo.split(',')" :key="index" class="openResultBall">{{sub}}</span></div><div v-else style="flex: 1 1 auto;text-align: right;color: #FE0103">等待开奖...</div></div>
            <div class="openResult"><span style="flex: 0 0 56px;">我的投注</span><span class="bet-content">{{item.betContent}}</span><span style="white-space: nowrap">{{item.groupClassConName==item.groupName?item.groupClassConName:`${item.groupClassConName}>${item.groupName}`}}</span></div>
        </div>
    </div>
</template>
<script>
export default {
    props:['item'],
    data() {
        return {
            
        }
    },
}
</script>
<style>
    .recordItem{
        background: #fff;
        border-radius: 8px;
        margin-bottom: 10px;
    }
    .recordItem-top{
        height: 70px;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
    }
    .recordItem-buttom{
        border-top: 1px solid #E0E0E0;
        color: #6C6C6C;
        padding: 5px 10px;
    }
    .recordItem-top-l{
        padding: 3px 10px 0 0;
    }
    .recordItem-top-c{
        padding-top: 6px;
        flex: 1 1 auto;
    }
    .recordItem-top-r{
        font-size: 14px;
        color: #494949;
        text-align: right;
        padding-top: 8px;
        line-height: 18px;
    }
    .redtext{
        color: #FE0103;
    }
    .openResult{
        display: flex;
    }
    .bet-content{
        flex: 1 1 auto;
        color: #FE0103;
        text-align: right;
        margin-right: 10px;
    }
    .openResultBall{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: red;
        color: #fff;
        text-align: center;
        line-height: 20px;
        border-radius: 10px;
    }
</style>