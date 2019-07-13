<template>
    <ul>
        <li v-if="data.length>0" v-for="(item,index) in data" :key="index">
            <router-link :to="`/bet/${item.gameType}/${item.gameNo}/${$ENV.IS_OFFICIAL?'official':'credit'}`" class="_2p7dc before-vertical hover-flip">
                <img :src="$imgPath(item.imgPath)" alt="图片加载中..." class="flip" width="32px" height="32px" size="1">
                <div class="_3Xnon">
                    <div class="relative dib">
                        <span v-text="item.gameName"></span>
                        <div class="_14331">
                            <p class="_9KR_r" v-text="item.gameHot || '火'"></p>
                        </div>
                    </div>
                </div>
                <strong class="_1OXxE" v-text="item.gameNote"></strong>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ["data"],
        data() {
            return {
            };
        },
    };
</script>

<style>

</style>
