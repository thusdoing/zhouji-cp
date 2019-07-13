<template>
    <div class="container">
        <div class="_2afbs">
            <div class="KGTg8">
                <div class="Hc2db" :class='curreny==null?"GidOw":false' @click='selectgame()'  :style="'width:' + (1/(getData.length+1)*100).toFixed(2) +'%;'"><span>全部</span></div>
                <div v-for='(item,index) in getData' class="Hc2db" :key="index+'a'" :class='curreny==index?"GidOw":false' @click='selectgame(index)' :style="'width:' + (1/(getData.length+1)*100).toFixed(2) +'%;'"><span>{{item.gameTypeName}}</span></div>
            </div>
            <div class="_1LtE4">
                <div  class="Z-jhS">
                    <template v-for='item in gameData'>
                        <p @click='gotobet(sub)' v-for='(sub,index) in item.gameSetting' :key="index+sub.gameNo" class="_3MPDW">
                            {{sub.gameName}}
                        </p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:["gameData","getData",'open','onOpenQST'],
        data() {
            return {
                curreny:undefined
            }
        },
        components: { 
        },
        created(){
        },
        watch:{
        },
        methods:{
            selectgame(index){
                this.curreny = index
                this.$emit('getindex',index)
            },
            gotobet(data){
                if(this.open==true){
                    let path = '/more/'+data.gameNo
                    this.$router.push(path)
                }else{
                    this.onOpenQST(data.gameNo)
                }
            }
        },
    }
</script>