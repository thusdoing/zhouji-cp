
<template>
    <div>
        <div class="container">
        </div>
        <div class="container">
            <gameMenu @searchIndex='handleSearchIndex' :arr="arr" :gameMenuData='gameMenuData'></gameMenu>
            <gameList v-if='flag' :gameData='gameMenuData'></gameList>
            <gameList v-else :gameData='gameData'></gameList>
        </div>
        
    </div>
</template>

<script>
import headerBet from '@/views/betHeader/index.vue'

import gameList from './cp/gameList'
import gameMenu from './cp/gameMenu'

import headerCop from '@/views/header/index.vue'
import leftFloat from '@/views/leftFloat/index.vue'
import rightFloat from '@/views/rightFloat/index.vue'
import axios from 'axios'
export default {
    data() {
        return {
            gameData:[],
            gameMenuData:[],
            arr:null,
            flag : true
        }
    },
    components: {headerBet,headerCop,leftFloat,rightFloat,gameList,gameMenu
    },
    created(){
        this.getGameAll();
    },
    watch:{
        gameMenuData:function(){
            this.arr = new Array(this.gameMenuData.length);
        }
    },
    methods:{
        getGameAll(){
            let _this = this;
            axios.get('/getGameAll',{params:{isOpenNo:'true'}}).then(function(data){
                if(data.data.success){
                    if(data.data.list != null && data.data.list != undefined){
                        _this.gameMenuData = data.data.list
                        _this.gameData = data.data.list.slice(0)
                    }else{
                        _this.gameMenuData = [];
                        _this.gameData = [];
                    }
                }
            });
        },
        handleSearchIndex(index){
            let _this = this;
            let sum = 0;
            if(_this.arr[index] == undefined){
                _this.arr.splice(index , 1 , _this.gameData.splice(index,1,[])[0])
            }else{
                _this.gameData.splice(index,1,_this.arr.splice(index,1,undefined)[0])
            }
            for( let i in _this.gameData){
                if(_this.gameData[i].gameSetting){
                    sum+=_this.gameData[i].gameSetting.length
                }
            }
            if(sum>0){
                _this.flag = false
            }else{
                _this.flag = true
            }
        }
            



    },
        

}

</script>
