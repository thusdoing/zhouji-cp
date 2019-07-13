<style lang='less'>
    ._2goSw ._12glW ._3GTyw {
        overflow: hidden;
        ._3Ag4B{float: left}
    }
</style>
<template>
<div>

    <div class="col _3U0db">
        <div ref='gamelist' v-for='(item,index) in gameMenuData' :key="index">
            <div ref='toogleMenu' @click='slidgame(index,$event)' class="_3vJVn"><img src="/static_pc/images/shang.png" class="_2zy4V" alt="true"> {{item.gameTypeName}}
            </div>
            <div class="ReactCollapse--collapse" style="height: auto;">
                <div v-for='sub in item.gameSetting' class="ReactCollapse--content" :key="sub.gameNo">
                    <ul class="_3HxbJ">
                        <li @click="gotobet(sub)" class="_1z_hc _3zwfq hover-flip"><img :src="$imgPath(sub.imgPath)" alt="true" class="flip" width="32" height="32" size="1"><span class="_39bIa">{{sub.gameName}}</span><span class="_3XCD2">{{sub.gameNote}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        props:["gameMenuData","arr"],
        data() {
            return {
                data:''
            }
        },
        components: {
        },
        created(){
            
        },
        methods:{
            slidgame(index,$event){
                let _this= this;
               $(this.$refs.toogleMenu[index]).next().slideToggle(200,function(){
                    if($(this).siblings().find('img')[0].src.indexOf('/static_pc/images/shang.png')>0){
                        $(this).siblings().find('img')[0].src = '/static_pc/images/xia.png';
                   }else{
                        $(this).siblings().find('img')[0].src = '/static_pc/images/shang.png';
                   }
               });
               this.$emit('searchIndex',index);
            },
            gotobet(data){
                let path = '/bet/'+data.gameType+'/'+data.gameNo + '/' + (this.$ENV.IS_OFFICIAL?'official':'credit')
                this.$router.push(path)
            }
        },
        mounted(){
            // $(this.$refs.toogleMenu).next().slideUp()
        }
    }


</script>
