<template>
    <div>
        <div class="play-content playBoxNum">
            <p style="padding:10px 0 30px;">
                <Icon type="information-circled" style="color:red;"></Icon>
                <label style="font-size:12px;" v-html="config.description"></label>
                <!--<Tooltip placement="bottom-start">-->
                    <!--<div slot="content" v-html="config.rule" style="white-space: normal;"></div>-->
                    <!--<label style="text-decoration:underline;font-size:13px;color:red;">规则</label>-->
                <!--</Tooltip>-->
                <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                    <div slot="content" v-html="config.example" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
                </Tooltip>
            </p>
            <div class="play-content-list flex" v-for="(itemWarp, DataNumIndex) in (this.config ? this.config.sub : [])"
                    :key="DataNumIndex">
                <div class="label flex" v-if="itemWarp.unit!=''">
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
            <label>已选</label><label style="color:red;">{{betCount}}</label><label>注,</label><label style="color:red;">{{betTimes}}</label><label>倍,共</label><label
                    style="color:red;">{{ betAmt }}</label><label>元</label>
        </span>
            <Button icon="arrow-down-c" :disabled="betEnabled" type="error"
                    style="float:right;font-size:14px;font-weight:bold;" @click="btnConfirmChoiceFun">确认投注
            </Button>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import '../bet.less';
</style>

<script>
    import algorithm from '@/assets/js/algorithm'
    import Combinatorics from '@/assets/js/combinatorics'
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data(){
            return {
                codeNumYardArr: [],
                moneyModel: 0, // 0 1
                betCount: 0,
                betTimes: 1,
                betEnabled: true,
            }
        },
        computed: {
            betAmt: function () {
                let pattern = 1;
                if (this.moneyModel == 0) {
                    pattern = 1
                }
                else if (this.moneyModel == 1) {
                    pattern = 0.1
                }
                else if (this.moneyModel == 2) {
                    pattern = 0.01
                }
                return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
            }
        },
        watch: {
            config: function () {
                this.clearUI()

                if (!this.config) {
                    return
                }

                this.codeNumYardArr = [];
                let i = this.config.sub.length;
                for (let k = 0; k < i; k++) {
                    this.codeNumYardArr[k] = [];
                }
                ;
            }
        },
        mounted () {
            this.codeNumYardArr = [];
            let i = this.config.sub.length;
            for (let k = 0; k < i; k++) {
                this.codeNumYardArr[k] = [];
            }
            this.moneyModel = this.$store.state.yjf[0] || 0
        },
        methods: {
            choiceNum(e, index){
                let _codeNumYardArr = this.codeNumYardArr;
                if ($(e.target).hasClass('active')) {
                    $(e.target).removeClass('active');
                    _codeNumYardArr[index].splice(_codeNumYardArr[index].indexOf(e.target.innerText), 1)
                } else {
                    $(e.target).addClass('active');
                    _codeNumYardArr[index].push(e.target.innerText)
                }
                this.validChioceNum();
            },
            //快速选择号码
            quickChoice(e, index){  //判断每个列表下的 号码选中  就知道 是否完成一注
                let _codeNumYardArr = this.codeNumYardArr;
                $(e.target).addClass('active').siblings().removeClass('active');
                //每次先清空 选中
                //获取父级 panelList 下的 p
                let panelList_p = $(e.target).parents('.play-content-list').find('.ball-panel P');
                panelList_p.removeClass('active')
                let text = e.target.innerText;
                _codeNumYardArr[index] = []; //单行 选择投注号码 数组清空 否则重复添加
                if (e.target.innerText == '全') {
                    panelList_p.addClass('active')
                    panelList_p.each(function () {
                        _codeNumYardArr[index].push($(this).text());
                    })
                } else if (e.target.innerText == '大') {
                    for (let i = 5; i < 10; i++) {
                        panelList_p.eq(i).addClass('active')
                        _codeNumYardArr[index].push(panelList_p.eq(i).text());
                    }
                } else if (e.target.innerText == '小') {
                    for (let i = 0; i < 5; i++) {
                        panelList_p.eq(i).addClass('active')
                        _codeNumYardArr[index].push(panelList_p.eq(i).text());
                    }
                } else if (e.target.innerText == '单') {
                    for (let i = 0; i < panelList_p.length; i++) {
                        if (Number(panelList_p.eq(i).text()) % 2 != 0) {
                            panelList_p.eq(i).addClass('active');
                            _codeNumYardArr[index].push(panelList_p.eq(i).text());
                        }
                    }
                } else if (e.target.innerText == '双') {
                    for (let i = 0; i < panelList_p.length; i++) {
                        if (Number(panelList_p.eq(i).text()) % 2 == 0) {
                            panelList_p.eq(i).addClass('active');
                            _codeNumYardArr[index].push(panelList_p.eq(i).text());
                        }
                    }
                } else if (e.target.innerText == '清') {

                }
                this.validChioceNum();
            },
            clearUI: function () {
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

                // if (this.settings.groupNo.toString() == '440122001122' && this.codeNumYardArr[0].length > 0) valid = true;
                // if (this.settings.groupNo.toString() == '440111003322' && this.codeNumYardArr[0].length > 0) valid = true;
//				if (this.settings.groupNo.toString() == '111133112211' && this.codeNumYardArr[0].length > 1) valid = true;
//				if (this.settings.groupNo.toString() == '111133112222' && this.codeNumYardArr[0].length > 2) valid = true;
//				if (this.settings.groupNo.toString() == '111133222211' && this.codeNumYardArr[0].length > 1) valid = true;
//				if (this.settings.groupNo.toString() == '111133222222' && this.codeNumYardArr[0].length > 2) valid = true;
                // // let chenkArr = _.cloneDeep(this.codeNumYardArr)

                for(let i in this.codeNumYardArr){
                    if(this.codeNumYardArr[i].length==0){
                        valid = false
                        break
                    }else{
                        valid = true
                    }
                }
                

                if (valid) {
                    let items = 0; //总注码数
                    
                    if(this.settings.groupNo.toString().slice(4) == '33111111'){
                        items = this.codeNumYardArr[0].length
                    }
                    else if(this.settings.groupNo.toString().slice(4) == '44111122'){
                        for(let i in this.codeNumYardArr[0]){
                            for(let j in this.codeNumYardArr[1]){
                                if(this.codeNumYardArr[0][i]!=this.codeNumYardArr[1][j]){
                                    items+=1
                                }
                            }
                        }
                    }else if(this.settings.groupNo.toString().slice(4) == '55111122'){
                        for(let i in this.codeNumYardArr[0]){
                            for(let j in this.codeNumYardArr[1]){
                                for(let k in this.codeNumYardArr[2]){
                                    if(this.codeNumYardArr[0][i]!=this.codeNumYardArr[1][j]&&this.codeNumYardArr[0][i]!=this.codeNumYardArr[2][k]&&this.codeNumYardArr[1][j]!=this.codeNumYardArr[2][k]){
                                        items+=1
                                    }
                                }
                            }
                        }
                    }
                    else if(this.settings.groupNo.toString().slice(4) == '66111122'){
                        for(let i in this.codeNumYardArr[0]){
                            for(let j in this.codeNumYardArr[1]){
                                for(let k in this.codeNumYardArr[2]){
                                    for(let g in this.codeNumYardArr[3]){
                                        if(this.codeNumYardArr[0][i]!=this.codeNumYardArr[1][j]&&
                                            this.codeNumYardArr[0][i]!=this.codeNumYardArr[2][k]&&
                                            this.codeNumYardArr[0][i]!=this.codeNumYardArr[3][g]&&
                                            this.codeNumYardArr[1][j]!=this.codeNumYardArr[2][k]&&
                                            this.codeNumYardArr[1][j]!=this.codeNumYardArr[3][g]&&
                                            this.codeNumYardArr[2][k]!=this.codeNumYardArr[3][g]
                                        ){
                                            items+=1
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(this.settings.groupNo.toString().slice(4) == '77111122'){
                        for(let i in this.codeNumYardArr[0]){
                            for(let j in this.codeNumYardArr[1]){
                                for(let k in this.codeNumYardArr[2]){
                                    for(let g in this.codeNumYardArr[3]){
                                        for(let m in this.codeNumYardArr[4]){
                                            if(this.codeNumYardArr[0][i]!=this.codeNumYardArr[1][j]&&
                                                this.codeNumYardArr[0][i]!=this.codeNumYardArr[2][k]&&
                                                this.codeNumYardArr[0][i]!=this.codeNumYardArr[3][g]&&
                                                this.codeNumYardArr[0][i]!=this.codeNumYardArr[4][m]&&
                                                this.codeNumYardArr[1][j]!=this.codeNumYardArr[2][k]&&
                                                this.codeNumYardArr[1][j]!=this.codeNumYardArr[3][g]&&
                                                this.codeNumYardArr[1][j]!=this.codeNumYardArr[4][m]&&
                                                this.codeNumYardArr[2][k]!=this.codeNumYardArr[3][g]&&
                                                this.codeNumYardArr[2][k]!=this.codeNumYardArr[4][m]&&
                                                this.codeNumYardArr[3][g]!=this.codeNumYardArr[4][m]
                                            ){
                                                items+=1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(items>0){
                        this.betEnabled = false;
                        this.betCount = items;
                    }else {
                        this.betEnabled = true;
                        this.betCount = 0;
                    }
                        
                } else {
                    this.betEnabled = true;
                    this.betCount = 0;
                }
            },
            //确认选号
            btnConfirmChoiceFun(){

                let pattern = 1;
                if (this.moneyModel == 0) {
                    pattern = 1
                }
                else if (this.moneyModel == 1) {
                    pattern = 0.1
                }
                else if (this.moneyModel == 2) {
                    pattern = 0.01
                }

                var betRet = {}
                betRet.betAmt = this.betAmt
                betRet.betBackRate = null
                betRet.betContent = ''
                for(let i in this.codeNumYardArr){
                    betRet.betContent += this.codeNumYardArr[i].toString()+'|'
                }
                betRet.betContent = betRet.betContent.substring(0,betRet.betContent.length-1)
                betRet.showContent = '[' + this.config.name + '] ' + betRet.betContent
                betRet.betMultiple = this.betTimes
                betRet.betNumber = this.betCount
                //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
                betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), this.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo = this.settings.groupNo
                betRet.gamePattern = this.moneyModel

                this.$emit('bet', betRet)
                this.clearUI()
            },
            doExchange(arr){
                var len = arr.length;
                // 当数组大于等于2个的时候
                if(len >= 2){
                    // 第一个数组的长度
                    var len1 = arr[0].length;
                    // 第二个数组的长度
                    var len2 = arr[1].length;
                    // 2个数组产生的组合数
                    var lenBoth = len1 * len2;
                    //  申明一个新数组,做数据暂存
                    var items = new Array(lenBoth);
                    // 申明新数组的索引
                    var index = 0;
                    // 2层嵌套循环,将组合放到新数组中
                    for(var i=0; i<len1; i++){
                        for(var j=0; j<len2; j++){
                            items[index] = ''+arr[0][i] + arr[1][j];
                            index++;
                        }
                    }
                    // 将新组合的数组并到原数组中
                    var newArr = new Array(len -1);
                    for(var i=2;i<arr.length;i++){
                        newArr[i-1] = arr[i];
                    }
                    newArr[0] = items;
                    // 执行回调
                    return this.doExchange(newArr);
                }else{
                    return arr[0];
                }
            }

        }
    }
</script>
<style scoped>
    .play-box .play-content .play-content-list .label .icon-decoration_icon {
        margin-right: 0 !important
    }
</style>

    