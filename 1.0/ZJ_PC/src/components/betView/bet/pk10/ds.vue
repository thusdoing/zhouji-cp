<template>
    <div>
        <div class="play-content playBoxNum">
            <div class="textareabox">
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
                <Tooltip>
                    <small style="display: inline-block; color: #db383f;font-size: 12px;margin: 0 0 20px 20px; text-decoration:underline">查看标准样式样本</small>
                    <p slot="content" v-html="config.tpl"></p>
                </Tooltip>
                <div class="textarea">
                    <textarea v-inp v-model="textAreaV" placeholder="程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化。"></textarea>
                </div>
                <div class="btn-group">
                    <Button type="error" @click="RemoveRet">格式化选号</Button>
                    <Button type="error" @click="cleartextArea">清空文本框</Button>
                </div>
            </div>
            
            <div class="bet2confirm">
                <p>您选择了
                    <span>{{betCount}}</span> 注</p>
                <Button @click="generatebetList" :disabled="betEnabled" type="error">确认选号</Button>
            </div>
        </div>
    </div>
</template>
<script>
    
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data() {
            return {
                textAreaV: '', //文本域值
                RegExp: '', // 根据父组件传入的algorithm 去正则匹配 几位为一注
                algorithm: '',

                codeNumYardArr: [],
                moneyModel: 0, // 0 1
                betCount: 0,
                betTimes: 1,
                betEnabled: true
            }
        },
        computed: {
            betAmt: function() {
                let pattern = 1;
                if(this.moneyModel == 0) {
                    pattern = 1
                } else if(this.moneyModel == 1) {
                    pattern = 0.1
                } else if(this.moneyModel == 2) {
                    pattern = 0.01
                }
                return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
            }
        },
        watch: {
            config() {
                this.clearUI()
            },
            textAreaV:function(){
                if(this.textAreaV.length>0){
                    this.betEnabled = false
                }else{
                        this.betEnabled = true
                }
            }
        },
        mounted() {
            this.textAreaV = '';
            this.algorithm = this.config.algorithm;
            this.RegExp = new RegExp(`(.{${this.algorithm}})(?=[^$])`, 'g');
            this.moneyModel = this.$store.state.yjf[0] || 0
        },
        methods: {
            cleartextArea() {
                this.textAreaV = '';
            },
            clearUI: function() {
                this.textAreaV = '';
                this.RegExp = new RegExp(`(.{${this.algorithm}})(?=[^$])`, 'g');

                this.betCount = 0
                this.betTimes = 1
                this.moneyModel = 0
                this.betEnabled = true
            },
            RemoveRet() {
                let _this = this;
                let fiflerRepetNum = 0; //重复值
                let fiflerErrorNum = ''; //错误值
                let fiflerErrorNumCount = 0; //错误值数量
                let newArr = [];
                let _newArr = [];
                let testArr = ['01','02','03','04','05','06','07','08','09','10']
                // if(this.textAreaV.charAt(this.textAreaV.length-1).indexOf(',')>-1){
                //     this.textAreaV = this.textAreaV.substring(0,this.textAreaV.length-1)
                // }
                let _textAreaV = this.textAreaV.split(',');
                _textAreaV = this.division(_textAreaV,"，");


                for(let i=_textAreaV.length-1;i>=0;i--){
                    newArr[i] = _textAreaV[i].split(' ')
                    _newArr[i] = _textAreaV[i].split(' ')
                    if(newArr[i].length!=this.config.algorithm){
                        _newArr.splice(i,1)
                    }
                }
                newArr = _newArr.slice(0)
                for(let m=newArr.length-1;m>=0;m--){
                    for(let j=newArr[m].length-1;j>=0;j--){
                        if(testArr.indexOf(newArr[m][j])==-1){
                            _newArr.splice(m,1)
                            break
                        }
                        for(let k=j-1;k>=0;k--){
                            if(newArr[m][j]===newArr[m][k]){
                                _newArr.splice(m,1)
                                break
                            }
                        }
                    }

                }
                let textcontent = ''
                for(let h in _newArr){
                    textcontent+=_newArr[h].join(" ")+','
                }
                textcontent = textcontent.substring(0,textcontent.length-1)
                this.textAreaV = textcontent
                this.$Modal.warning({
                    title:'系统提示',
                    content:'有效投注为:'+(textcontent.length==0?"空":textcontent)
                })
                if(_newArr.length>0){
                    // this.betEnabled = false
                    this.betCount = _newArr.length
                }else{
                    // this.betEnabled = true
                    this.betCount = 0
                }
            },
            arrRemoveRet(arr) {
                var m = [],
                    f, obj = {
                        arr: [], //去掉重复的数组值 存放
                        m: [] //去掉重复值后的数组 存放
                    };
                for(var i = 0; i < arr.length; i++) {
                    f = true;
                    for(var j = 0; j < m.length; j++)
                        if(arr[i] === m[j]) {
                            f = false;
                            obj.arr.push(arr[i]);
                            break;
                        };
                    if(f) m.push(arr[i])
                }
                obj.m = m.sort(function(a, b) {
                    return a - b
                });
                return obj;
            },
            //确认选号
            btnConfirmChoiceFun() {
                let _this = this;
                let fiflerRepetNum = 0; //重复值
                let fiflerErrorNum = ''; //错误值
                let fiflerErrorNumCount = 0; //错误值数量
                let textAreaV = this.textAreaV.split('');
                let forA = textAreaV.length % this.algorithm;
                if(forA != 0) {
                    fiflerErrorNumCount = forA;
                    for(let i = 0; i < forA; i++) {
                        let str = ',';
                        str = i == forA - 1 ? '' : ',';
                        fiflerErrorNum += textAreaV[textAreaV.length - 1] + str;
                        textAreaV.pop();
                    }
                }
                textAreaV = textAreaV.toString().replace(/,/g, "").replace(this.RegExp, "$1,").split(","); //重新转化为2位 数字在一起的一维数组
                textAreaV = this.arrRemoveRet(textAreaV);
                fiflerRepetNum = textAreaV.arr.length;
                textAreaV.m = textAreaV.m.toString().replace(/,/g, "").split('');
                if(fiflerRepetNum > 0 || fiflerErrorNumCount > 0) {
                    this.$Modal.confirm({
                        content: '过滤' + fiflerErrorNumCount + '个错误号码(' + fiflerErrorNum.split(",").sort() + ')，过滤' + fiflerRepetNum + '个重复号码(' + textAreaV.arr + ')',
                        onOk: function() {
                            _this.generatebetList(textAreaV.m);
                        },
                        onCancel: function() {}
                    })
                } else {
                    _this.generatebetList(textAreaV.m);
                }
            },
            //生成选注 列表
            generatebetList() {
                this.RemoveRet();
                if(this.betCount===0){
                    return
                }
                let pattern = 1;
                if(this.moneyModel == 0) {
                    pattern = 1
                } else if(this.moneyModel == 1) {
                    pattern = 0.1
                } else if(this.moneyModel == 2) {
                    pattern = 0.01
                }

                var betRet = {}
                betRet.betAmt = this.betAmt
                betRet.betBackRate = null
                betRet.betContent = this.textAreaV
                betRet.showContent = '[' + this.config.name + '] ' + this.textAreaV
                betRet.betMultiple = this.betTimes
                betRet.betNumber = this.betCount
                //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
                betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), this.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo = this.settings.groupNo
                betRet.gamePattern = this.moneyModel
                let tempobj = {
                    bonusAmt: this.settings.bonusAmt,
                    eachNoteAmt: this.$store.state.global.eachNoteAmt,
                    betAmt: 0,
                    betMultiple: '',
                    estimateProfit: ''
                }
                betRet = {...betRet,...tempobj}

                this.$store.commit('setbetArr',betRet)
            },
            division(charArray,symbol) {
                for (let index = 0; index < charArray.length; index++) {
                    let charArray1 = charArray[index].split(symbol);
                    if (charArray1.length>1) {
                        charArray.splice(index,1);
                        for (const key in charArray1) {
                            charArray.splice(index+key,0,charArray1[key]);
                        }
                    }
                }
                return charArray;
            },
        }
    }
</script>
<style scoped lang="less">
    .textareabox {
        padding: 30px 10px 20px 10px;
        background-color: #fff;
        .btn-group {
            padding-top: 10px;
            text-align: center;
        }
    }
    
    .textarea {
        width: 100%;
        height: 140px;
        textarea {
            outline: none;
            width: 100%;
            height: 100%;
            padding: 10px;
            resize: none;
            font-size: 13px;
        }
    }
    
    .okbet-wraps {
        margin-top: 1px;
        padding: 10px;
        background-color: #fff;
        font-size: 13px;
    }
</style>