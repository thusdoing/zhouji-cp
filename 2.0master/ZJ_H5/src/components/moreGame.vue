<style scoped>
@import '../assets/header.css';
.index-main>>>.weui-grid__icon{width: 60px;height: 60px;}
.index-main>>>.weui-grid__label{font-size: 12px;color: #5e5e5e;}
</style>
<template>
    <div>
        <wv-header title="更多玩法" class="header" >
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <el-main class="index-main" style="background-color:#fff;height:100vh;">
            <div v-for="(item,index) in moreGameData" :key="index" style="width:100vx;margin-top:10px;">
                <div style="padding-left: 10px;"><i class="el-icon-location" style="color:#ec2829;"></i>{{ item.gameTypeName }}</div>
                <grid :cols='4' >
                    <grid-item  v-for="(obj,ind) in item.gameSetting" @click.native="toPage(obj.gameType,obj.gameNo,obj.gameName)" :key="ind" :label="obj.gameName" >
                        <img slot="icon" style="width:60px;height:60px" :src="$imgPath(obj.imgPath)">
                    </grid-item>
                </grid>
            </div>
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
            this.$api.get('getGameAll').then(data => {
                this.moreGameData = data.list;
            });
        },
        toPage(gameType, gameNo,gameName){
            this.$router.push({
                path: '/bet/' + gameType + '/' + gameNo +'/'+gameName+ '/officaPlay'
            });
        }
    },
    mounted() {
        this.loadMoreGame();
    }
}
</script>