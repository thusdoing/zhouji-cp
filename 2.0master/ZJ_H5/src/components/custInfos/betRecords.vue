<style scoped>
@import '../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}
</style>
<template>
    <div>
        <div class="header custom-header">
            <wv-flex>
                <wv-flex-item class="custom-left">
                    <div @click="$router.go(-1)" class="brack-icon">
                        <i class="el-icon-arrow-left" slot="icon"></i>
                    </div>
                    <div class="w-20" slot="right"></div>
                </wv-flex-item>
                <wv-flex-item flex="2">
                    <div class="custom-center">
                        <el-button-group>
                            <el-button type="primary" :class="[{'active':activetz}]" @click="clickBteType('tz')" size="small">投注</el-button>
                            <el-button type="primary" :class="[{'active':activezt}]" @click="clickBteType('zt')" size="small">追投</el-button>
                        </el-button-group>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right">
                        <!-- <span  @click="search">{{ days }}</span> -->
                       
                    </div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <touzhu v-if="activetz"></touzhu>
        <zhuihao v-if="activezt"></zhuihao>
        <!-- <div class="index-main">
            <wv-navbar v-if="activetz" v-model="selectedtz" class="msg-navber" @change="change" fixed>
                <wv-navbar-item id="betRecordTzAll">全部</wv-navbar-item>
                <wv-navbar-item id="betRecordTzWKJ">未开奖</wv-navbar-item>
                <wv-navbar-item id="betRecordTzYZJ">已中奖</wv-navbar-item>
            </wv-navbar>
            <wv-navbar v-if="activezt" v-model="selectedzt" class="msg-navber" @change="change" fixed>
                <wv-navbar-item id="betRecordZtAll">全部追号</wv-navbar-item>
                <wv-navbar-item id="betRecordZtZHZ">追号中</wv-navbar-item>
                <wv-navbar-item id="betRecordZtZHCG">追号成功</wv-navbar-item>
            </wv-navbar>
            <div class="msg-content">
                <betRecordTzAll v-if="show_.betRecordTzAll"></betRecordTzAll>
                <betRecordTzWKJ v-if="show_.betRecordTzWKJ"></betRecordTzWKJ>
                <betRecordTzYZJ v-if="show_.betRecordTzYZJ"></betRecordTzYZJ>
                <betRecordZtAll v-if="show_.betRecordZtAll"></betRecordZtAll>
                <betRecordZtZHZ v-if="show_.betRecordZtZHZ"></betRecordZtZHZ>
                <betRecordZtZHCG v-if="show_.betRecordZtZHCG"></betRecordZtZHCG>
            </div>
        </div> -->
         <wv-actionsheet  :actions="actions" v-model="searchdays" cancel-text="取消"></wv-actionsheet>
    </div>
</template>
<script>
// import betRecordTzAll from '@/components/custInfos/betcomponents/betRecordTzAll'//全部投注子页面
// import betRecordTzWKJ from '@/components/custInfos/betcomponents/betRecordTzWKJ'//未开奖子页面
// import betRecordTzYZJ from '@/components/custInfos/betcomponents/betRecordTzYZJ'//已中奖子页面
// import betRecordZtAll from '@/components/custInfos/betcomponents/betRecordZtAll'//全部追号子页面
// import betRecordZtZHZ from '@/components/custInfos/betcomponents/betRecordZtZHZ'//追号中子页面
// import betRecordZtZHCG from '@/components/custInfos/betcomponents/betRecordZtZHCG'//追号成功子页面
import touzhu from '@/components/custInfos/betcomponents/touzhu'
import zhuihao from '@/components/custInfos/betcomponents/zhuihao'
export default {
    components:{
        touzhu,zhuihao
    },
    data () {
        return {
            searchdays : false,
            selectedtz : "betRecordTzAll",
            selectedzt : 'betRecordZtAll',
            activetz : true,
            activezt : false,
            show_ : {
                betRecordTzAll : true,
                betRecordTzWKJ : false,
                betRecordTzYZJ : false,
                betRecordZtZHCG : false,
                betRecordZtZHZ : false,
                betRecordZtAll : false
            },
            actions : [],
            days : "今天"
        }
    },
    methods : {
        init(){
            this.actions = [
                {
                    name: '今天',
                    key: 'today',
                    method: () => {
                        this.query('today')
                        this.days = "今天"
                    }
                },
                {
                    name: '昨天',
                    key: 'yesterday',
                    method: () => {
                        this.query('yesterday')
                        this.days = "昨天"
                    }
                },
                {
                    name: '七天',
                    key: 'sevenday',
                    method: () => {
                        this.query('sevenday')
                        this.days = "七天"
                    }
                }
            ];
        },
        clickBteType(type){
            // if(type == 'tz'){
            //     this.activezt = false;
            //     this.activetz = true;
            //    // this.changeTo('betRecordTzAll');
            // }else{
            //     this.activetz = false;
            //     this.activezt = true;
            //     //this.changeTo('betRecordZtAll');
            // }
            this.setClickShowTab(type).then(v => {
                if(v){
                    this.setDefultShow();
                }
            });
        },
        setClickShowTab(type){
            if(type == 'tz'){
                this.activezt = false;
                this.activetz = true;
               // this.changeTo('betRecordTzAll');
            }else{
                this.activetz = false;
                this.activezt = true;
                //this.changeTo('betRecordZtAll');
            }
            return Promise.resolve(true);
        },
        setDefultShow(){
            this.selectedzt = 'betRecordZtAll';
            this.selectedtz = 'betRecordTzAll';
            
        },
        search(){
            this.searchdays = true;
        },
        query(type){

        },
        change(e){
            for(let key in this.show_){
                this.show_[key] = false;
            }
            this.show_[e] = true;
        },
        changeTo(e){
            for(let key in this.show_){
                this.show_[key] = false;
            }
            this.show_[e] = true;
        }
    },
    mounted(){
        this.init();
    }
}
</script>
