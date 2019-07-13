<template>
    
    <div class="bet2Nav">
        <ul :style="`transform: translateX(${translateX}px)`">
            <li :class="{active:item.gameNo==$route.params.gameNo}" v-for="item in navGame" @click="change(item)">{{item.gameName}}</li>
        </ul>
        <a class="betNavtab left" @click="navbtn(1)"><span><em></em></span></a>
        <a class="betNavtab right" @click="navbtn(2)"><span><em></em></span></a>
    </div>
    
</template>
<script>
    export default{
        data() {
            return {
                translateX:0,
            }
        },
        computed: {
            navGame:function(){
                let g = []
                this.$store.state.gameAll.forEach(el => {
                    if(el.gameType==this.$route.params.gameType){
                        g=el.gameSetting
                    }
                });
                return g
            },
        },
        methods: {
            change(item){
                let p = this.$route.path.split('/')
                p[3]=item.gameNo
                this.$router.replace(p.join('/'))
            },
            navbtn(a){
                if(a==1){
                    if(this.translateX>=0) return;
                    this.translateX += 108
                }else{
                    if(this.navGame.length<=7)return;
                    if(this.translateX<=-(this.navGame.length-7)*108) return;
                    this.translateX -= 108
                }
            },
            navChange(){
                if(this.navGame.length==0){
                    setTimeout(() => {
                        this.navChange()
                    }, 1000);
                }
                this.navGame.map((el,i)=>{
                    if(el.gameNo==this.$route.params.gameNo){
                        if(i>6){
                            this.translateX = -(i-6)*108
                        }else{
                            this.translateX = 0
                        }
                    }
                })
            }
        },
        mounted() {
            this.$nextTick(function(){
                this.navChange()
            })
        },
    }
</script>
<style lang="less">
    .bet2Nav{
        line-height: 38px;color: #333;overflow: hidden;position: relative;border-bottom: 1px solid #ddd;
        ul{width: 10000px;margin-left:35px;transition: all .6s;}
        li{width:108px;border-right:1px solid #ddd;float: left;text-align: center;cursor: pointer; }
        li.active{background: #E9312F;color: #fff; }
        .betNavtab { height: 38px; position: absolute; right: 0; top: 0; background: #ececec; width: 35px; background: linear-gradient(#fff 2%,#ececec); border-left: 1px solid #ddd; cursor: auto; color: #666;}
        .betNavtab.left { left: 0; border-right: 1px solid #ddd; border-left: none; }
        .betNavtab span { display: block; width: 16px; height: 16px; border-radius: 8px; border: 1px solid; margin: 11px 9.5px; cursor: pointer; }
        .betNavtab em { width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid; display: block; margin: 5px 3px; transition: .5s; -webkit-transform: rotate(-90deg); transform: rotate(-90deg); margin-left: 4px; }
        .betNavtab em:before { content: ""; display: block; width: 38px; height: 35px; position: absolute; margin-left: -19px; margin-top: -21px; }
        .betNavtab.left em { transform: rotate(90deg); margin-left: 3px; }
        .betNavtab:active { background: linear-gradient(#ececec 2%,#fff) }
    
    }
</style>