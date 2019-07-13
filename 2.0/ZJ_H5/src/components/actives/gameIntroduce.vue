<style scoped>
@import '../../assets/header.css';
.index-main>>>.weui-grid__icon{width: 60px;height: 60px;}
.index-main>>>.weui-grid__label{font-size: 12px;color: #5e5e5e;}
.index-main>>>.weui-grid:before{border-bottom-color: #fff;border-right-color: #fff;}
.index-main>>>.weui-grid:after{border-bottom-color: #fff;border-right-color: #fff;}
</style>
<template>
    <div>
        <wv-header title="玩法介绍" class="header" >
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <el-main class="index-main" style="background-color:#fff;">
            <grid :cols='3' >
                <grid-item  v-for="(obj,ind) in moreGameData"   @click.native="toGameGroupIntroduce(obj.gameType,obj.gameName,obj.gameNo)" :key="ind" :label="obj.gameName" >
                    <img slot="icon" style="width:60px;height:60px" :src="$imgPath(obj.imgPath)">
                </grid-item>
            </grid>
        </el-main>
 
    </div>
</template>
<script>
import { Grid, GridItem } from 'vux'
export default {
    components : {
        Grid, GridItem
    },
    data () {
        return {
            moreGameData : []
        }
    },
    methods: {
        /** 加载更多的游戏玩法 */
        loadMoreGame(){
            this.$api.get('getGame').then(data => {
                this.moreGameData = data.list;
            });
        },
        toGameGroupIntroduce(gameType,gameName,gameNo){
            this.$router.push({path:'/gameGroupIntroduce/' + gameType +'/'+ gameNo + "/" + gameName});
        }
    },
    mounted() {
        this.loadMoreGame();
    }
}
</script>