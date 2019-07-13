<style lang='less'>
</style>
<template>
    <div>
        <gamelist  :getData='getData' :onOpenQST="onOpenQST" :gameData='gameData' @getindex="selectGame"></gamelist>
        <gameTable :gameData='gameData' :onOpenQST="onOpenQST"></gameTable>    
        


    </div>
</template>

<script>
import vueQR from 'vue-qr';

import headerBet from '@/views/betHeader/index.vue'
import footerCop from '@/views/footer/index.vue'
import headerCop from '@/views/header/index.vue'
import leftFloat from '@/views/leftFloat/index.vue'
import rightFloat from '@/views/rightFloat/index.vue'
import gamelist from '@/views/gamelist/index.vue'
import gameTable from '@/views/gameTable/index.vue'


import axios from 'axios'
export default {
    data() {
        return {
            gameData:[],
            getData:[],
            arr:null,
            flag : true,
            url:'http://www.lm699.com',
            current:null
        }
    },
    components: { headerBet,footerCop,headerCop,leftFloat,rightFloat,vueQR,gamelist,gameTable

    },
    created(){
        this.getGameAll()
    },
    watch:{
    },
    methods:{
        onOpenQST (no) {
                window.open('/static_pc/cpRecode/index.html?game=' + no + '030001')
            },
        getGameAll(){
            let _this = this;
            axios.get('/getGameTypeAll',{params:{gameMode:'030001'}}).then(function(data){
                if(data.data.success){
                    if(data.data.list != null && data.data.list != undefined){
                        _this.getData = data.data.list
                        _this.gameData = data.data.list
                    }
                }
            });
        },
        selectGame(index){
            if(index==undefined){
                this.gameData = this.getData
            }else{
                this.gameData = [this.getData[index]]
            }
        }   



    },
        

}

</script>
