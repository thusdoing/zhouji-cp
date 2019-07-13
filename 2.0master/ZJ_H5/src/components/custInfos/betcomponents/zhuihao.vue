<style scoped>
@import '../../../assets/header.css';
.msg-badge{position: absolute;top: 0px;}
.msg-navber{top:44px !important;}
.msg-content{margin-top: 80px;width: 100%;}
</style>
<template>
    <div class="index-main" style="margin-bottom: 0;">
        <wv-navbar v-model="selectedzt" class="msg-navber" @change="change" fixed>
                <wv-navbar-item id="betRecordZtAll">全部追号</wv-navbar-item>
                <wv-navbar-item id="betRecordZtZHZ">追号中</wv-navbar-item>
                <wv-navbar-item id="betRecordZtZHCG">追号结束</wv-navbar-item>
            </wv-navbar>
        <div class="msg-content">
            <component :is="selectedzt"></component>
        </div>
    </div>
</template>
<script>
import betRecordZtAll from '@/components/custInfos/betcomponents/betRecordZtAll'//全部追号子页面
import betRecordZtZHZ from '@/components/custInfos/betcomponents/betRecordZtZHZ'//追号中子页面
import betRecordZtZHCG from '@/components/custInfos/betcomponents/betRecordZtZHCG'//追号成功子页面
export default {
    components:{
        betRecordZtAll,betRecordZtZHZ,betRecordZtZHCG
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
            this.selectedtz = e
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