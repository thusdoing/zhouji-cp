<style lang='less' scoped>
    ._3HEKN ._1t6YA{
        height:130px
    }
</style>
<template>
    <div class="container">
        <div class="_3HEKN">
            <p class="_12jwG">您的位置：<span class="_3EMRO">走势图表</span></p>
            <div class="mt10"></div>
            <template v-for='item in gameData'>
                <div v-for='sub in item.gameSetting' class="_1t6YA pointer" @click="onOpenQST(sub.gameNo)">
                    <img :src="$imgPath(sub.imgPath)" alt="true" width="64" height="64" size="3">
                    <p class="_1kPOt">{{sub.gameName}}</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        props:["gameData",'onOpenQST'],
        data() {
            return {
            }
        },
        components: { 
        },
        created(){
        },
        watch:{
        },
        methods:{

        },
        mounted() {
        }
    }
</script>