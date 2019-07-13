<template>
    <div>
        <div class="play-content playBoxNum">

        <p style="padding:10px 0 30px;">
            <Icon type="information-circled" style="color:red;"></Icon>
            <label style="font-size:13px;" v-html="config.description"></label>
            <!-- <Tooltip placement="bottom-start">
            <div slot="content" v-html="config.rule" style="white-space: normal;"></div>
            <label style="text-decoration:underline;font-size:13px;color:red;">规则</label>
            </Tooltip> -->
            <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
            <div slot="content" v-html="config.example" style="white-space: normal;"></div>
            <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
            </Tooltip>
        </p>

        <div class="play-content-list flex" v-for="(itemWarp,DataNumIndex) in (this.config ? this.config.sub : [])" :key="DataNumIndex">
            <div class="label flex">
            <p class="iconfont icon-decoration_icon"></p>
            <p v-text="itemWarp.unit"></p>
            </div>
            <div class="ball-panel flex">
            <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
                <p @click="choiceNum($event,DataNumIndex)">{{item-itemWarp.golbal[0]<10?'0'+(item-itemWarp.golbal[0]):(item-itemWarp.golbal[0])}}</p>
            </div>
            </div>
            <div v-if="itemWarp.btn" class="play-btn-box flex">
            <p @click="quickChoice($event,DataNumIndex)">全</p>
            <p @click="quickChoice($event,DataNumIndex)">大</p>
            <p @click="quickChoice($event,DataNumIndex)">小</p>
            <p @click="quickChoice($event,DataNumIndex)">单</p>
            <p @click="quickChoice($event,DataNumIndex)">双</p>
            <p @click="quickChoice($event,DataNumIndex)">清</p>
            </div>
        </div>
        </div>
        
        <div class="okbet-wraps" style="margin-top: 1px;padding: 10px;background-color: #fff;font-size: 13px;">
            <label>倍数</label>
            <InputNumber :precision="0"   :min="1" v-model="betTimes"></InputNumber>
            <label style="margin-left: 15px;">单位</label>
            <ButtonGroup>
            <Button :disabled="$store.state.yjf.indexOf('0')<0" :type="moneyModel==0 ? 'error' : 'default'" @click="moneyModel=0">元</Button>
            <Button :disabled="$store.state.yjf.indexOf('1')<0" :type="moneyModel==1 ? 'error' : 'default'" @click="moneyModel=1">角</Button>
            </ButtonGroup>
            <span style="margin-left:30px;background-color:#f7f7f7;padding:10px;width: 350px;display: inline-block;text-align: center;">
            <label>已选</label><label style="color:red;">{{betCount}}</label><label>注,</label><label style="color:red;">{{betTimes}}</label><label>倍,共</label><label style="color:red;">{{ betAmt }}</label><label>元</label>
            </span>
            <Button icon="arrow-down-c" :disabled="betEnabled" type="error" style="float:right;font-size:14px;font-weight:bold;" @click="btnConfirmChoiceFun">确认投注</Button>
        </div>

    </div>
</template>
<script>
    import asmd from '@/assets/js/asmd'
export default {
    props: ['config', 'settings'],
    data(){
        return{
        codeNumYardArr: [],
        moneyModel: 0, // 0 1
        betCount: 0,
        betTimes: 1,
        betEnabled: true,
        }
    },
    computed: {
        betAmt: function() {
        let pattern = 1;
        if( this.moneyModel == 0){
            pattern = 1
        }
        else if( this.moneyModel == 1){
            pattern = 0.1
        }
        else if( this.moneyModel == 2){
            pattern = 0.01
        }
        return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
        }
    },
    watch: {
        config: function() {
        this.clearUI()

        if (!this.config) {
            return
        }

        this.codeNumYardArr = [];
        let i = this.config.sub.length;
        for (let k = 0; k < i; k++) {  
            this.codeNumYardArr[k] = []; 
        };
        }
    },
    mounted () {
        this.codeNumYardArr = [];
        let i = this.config.sub.length;
        for (let k = 0; k < i; k++) {  
        this.codeNumYardArr[k] = []; 
        };
        this.moneyModel = this.$store.state.yjf[0] || 0
    },
    methods:{
        choiceNum(e, index) {
        $(e.target).removeClass(['pulse', 'animated']);

        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
            setTimeout(()=> {$(e.target).addClass(['pulse', 'animated']);}, 0)
            this.codeNumYardArr[index].splice(this.codeNumYardArr[index].indexOf(e.target.innerText), 1)
        } else {
            $(e.target).addClass('active');
            this.codeNumYardArr[index].push(e.target.innerText)
            setTimeout(()=> {$(e.target).addClass(['pulse', 'animated']);}, 0)
        }

        this.validChioceNum();
        },
        //快速选择号码
        quickChoice(e, index) { 
        // 快捷按钮重置当前选择
        $(e.target).addClass('active').siblings().removeClass('active');

        //每次先清空已有选中
        let panelList_p = $(e.target).parents('.play-content-list').find('.ball-panel P');
        panelList_p.removeClass('active')

        let text = e.target.innerText;
        this.codeNumYardArr[index] = []; 
        //单行 选择投注号码 数组清空 否则重复添加
        if (e.target.innerText == '全') {
            panelList_p.addClass('active')
            panelList_p.each((pos, el) => {
            this.codeNumYardArr[index].push($(el).text());
            })
        } else if (e.target.innerText == '大') {
            for (let i = 5; i < 10; i++) {
            panelList_p.eq(i).addClass('active')
            this.codeNumYardArr[index].push(panelList_p.eq(i).text());
            }
        } else if (e.target.innerText == '小') {
            for (let i = 0; i < 5; i++) {
            panelList_p.eq(i).addClass('active')
            this.codeNumYardArr[index].push(panelList_p.eq(i).text());
            }
        } else if (e.target.innerText == '单') {
            for (let i = 0; i < panelList_p.length; i++) {
            if (Number(panelList_p.eq(i).text()) % 2 != 0) {
                panelList_p.eq(i).addClass('active');
                this.codeNumYardArr[index].push(panelList_p.eq(i).text());
            }
            }
        } else if (e.target.innerText == '双') {
            for (let i = 0; i < panelList_p.length; i++) {
            if (Number(panelList_p.eq(i).text()) % 2 == 0) {
                panelList_p.eq(i).addClass('active');
                this.codeNumYardArr[index].push(panelList_p.eq(i).text());
            }
            }
        } else if (e.target.innerText == '清') {

        }
        this.validChioceNum();
        },
        clearUI: function() {
        $('.play-content p.active').removeClass('active');
        this.codeNumYardArr = []
        let i = this.config.sub.length;
        for (let k = 0; k < i; k++) {  
            this.codeNumYardArr[k] = []; 
        }

        this.betCount = 0
        this.betTimes = 1
        this.moneyModel = 0
        this.betEnabled = true
        },
        validChioceNum(){ //是否完成有效投注
        let _this = this;
        let valid = false; 
        for(let i=0 ;i<_this.config.sub.length;i++){
            if(_this.codeNumYardArr[i].length>0){
            valid = true;
            }
        }
        if(valid){
            let items=0; //总注码数
            _this.codeNumYardArr.map(function(item){
            items+=item.length
            })

            this.betCount = items;
            this.betEnabled = false
        }else{
            this.betCount = 0;
            this.betEnabled = true
        }
        },
        //确认选号
        btnConfirmChoiceFun(arg){
            let pattern = 1;
            let betAry = []
            if( this.moneyModel == 0){
            pattern = 1
            }
            else if( this.moneyModel == 1){
            pattern = 0.1
            }
            else if( this.moneyModel == 2){
            pattern = 0.01
            }
            for (let i = 0; i < this.codeNumYardArr.length; i++) { 
            if(this.codeNumYardArr[i].length>0){
                var betRet = {},
                    splitArr = '',
                    groupNo = this.$route.params.gameNo + this.config.sub[i].groupNo.toString().slice(4)

                switch(i){
                case 0:
                    splitArr += '冠军'            
                    break
                case 1:
                    splitArr += '亚军'
                    break
                case 2:
                    splitArr += '季军'
                    break
                case 3:
                    splitArr += '第三'
                    break
                case 4:
                    splitArr += '第四'
                    break
                case 5:
                    splitArr += '第五'
                    break
                case 6:
                    splitArr += '第六'
                    break
                case 7:
                    splitArr += '第七'
                    break
                case 8:
                    splitArr += '第八'
                    break
                case 9:
                    splitArr += '第九'
                    break
                case 10:
                    splitArr += '第十'
                    break
                default:
                    break
                }

                //betRet.betAmt = this.betAmt
                betRet.betAmt = asmd.mul(1, this.betTimes, this.codeNumYardArr[i].length, pattern, (this.config.betInitMoney || 1))
                betRet.betBackRate = null
                betRet.betContent = this.codeNumYardArr[i].sort((a,b)=>{return a-b}).toString().replace(/,/g,'|');
                betRet.showContent = '['+ this.config.name + splitArr + '] ' + betRet.betContent
                betRet.betMultiple = this.betTimes
                betRet.betNumber = this.codeNumYardArr[i].length
                //betRet.betNumber = 1
                betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), betRet.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo = groupNo
                betRet.gamePattern = this.moneyModel
                
                betAry.push(betRet)
            
            }
            }

            this.$emit('bet', betAry)
            this.clearUI()
        }
    }
    
}
</script>

<style lang='less' scoped>
    @import '../bet.less';
</style>
      