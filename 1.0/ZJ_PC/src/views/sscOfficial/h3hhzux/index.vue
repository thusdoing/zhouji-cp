<template>
    <div class="wrap">
        <div class="play-content playBoxNum">
            <div class="textareabox">
                <p style="padding:10px 0 30px;">
                    <Icon type="information-circled" style="color:red;"></Icon>
                    <label style="font-size:13px;" v-html="config.description"></label>
                    <Tooltip placement="bottom-start">
                        <div slot="content" v-html="config.rule" style="white-space: normal;"></div>
                        <label style="text-decoration:underline;font-size:13px;color:red;">规则</label>
                    </Tooltip>
                    <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                        <div slot="content" v-html="config.example" style="white-space: normal;"></div>
                        <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
                    </Tooltip>
                </p>
                <div class="textarea">
                    <textarea v-integer v-model="textAreaV" placeholder="程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化。."></textarea>
                </div>
                <div class="btn-group">
                    <Button type="error" @click="RemoveRet">删除重复号</Button>
                    <Button type="error" @click="cleartextArea">清空文本框</Button>
                </div>
            </div>
        </div>

        <div class="okbet-wraps">
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
    import algorithm from '@/assets/js/algorithm'
    import Combinatorics from '@/assets/js/combinatorics'
    import playMethods from '@/assets/js/playMethods'
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data() {
            return {
                textAreaV: '', //文本域值
                RegExp: '', // 根据父组件传入的 algorithm 去正则匹配几位为一注
                algorithm: 0,

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
        mounted(){
            this.textAreaV='';
            this.algorithm = this.config.algorithm[0];
            this.RegExp = new RegExp(`(.{${this.algorithm}})(?=[^$])`,'g');
            this.moneyModel = this.$store.state.yjf[0] || 0
        },
        watch: {
            textAreaV(v) {
                this.validChioceNum(v);
            },
            config() {
                this.clearUI()
            }
        },
        methods: {
            cleartextArea(){
                this.textAreaV='';
            },
            clearUI: function() {
                this.textAreaV='';
                this.betCount = 0
                this.betTimes = 1
                this.moneyModel = 0
                this.betEnabled = true
            },
            RemoveRet() {
                var retObj = playMethods.rnzdFilter(this.textAreaV, this.config.sequence, this.algorithm)
                if (retObj.repAry.length > 0 || retObj.errAry.length > 0) {
                    this.$Modal.warning({
                        content: '过滤' + retObj.errAry.length + '个错误号码(' + retObj.errAry.join(",") + ')，过滤' + retObj.repAry.length + '个重复号码(' + retObj.repAry.join(',') + ')',
                    })
                }
                this.textAreaV = retObj.retAry.join('')
            },
            arrRemoveRet(arr) {
                var m = [],
                    f,
                    obj = {
                        arr: [], //去掉重复的数组值 存放
                        m: [] //去掉重复值后的数组 存放
                    };
                for (var i = 0; i < arr.length; i++) {
                    f = true;
                    for (var j = 0; j < m.length; j++) {
                        if (this.config.sequence) {
                            if (arr[i] === m[j]) {
                                f = false;
                                obj.arr.push(arr[i]);
                                break;
                            };
                        } else {
                            var arrSort = arr[i].split('').sort((a, b) => a - b)
                            if (arrSort.join('') === m[j].split('').sort((a, b) => a - b).join('')) {
                                f = false;
                                obj.arr.push(arr[i]);
                                break;
                            }
                            if (arrSort[0] == arrSort[arrSort.length - 1]) {
                                f = false;
                                obj.arr.push(arr[i]);
                                break;
                            }
                        }
                    }
                    if (f) {
                        m.push(arr[i])
                    }
                }
                obj.m = m.sort(function(a, b) {
                    return a - b
                });
                return obj;
            },
            //确认选号
            btnConfirmChoiceFun(arg) {
                var _this = this
                var retObj = playMethods.rnzdFilter(this.textAreaV, this.config.sequence, this.algorithm)
                if (retObj.repAry.length > 0 || retObj.errAry.length > 0) {
                    this.$Modal.confirm({
                        content: '过滤' + retObj.errAry.length + '个错误号码(' + retObj.errAry.join(",") + ')，过滤' + retObj.repAry.length + '个重复号码(' + retObj.repAry.join(',') + ')',
                        onOk: function() {
                            if (retObj.retAry.length) {
                                _this.generatebetList(retObj.retAry);
                            } else {
                                _this.textAreaV = ''
                            }
                        },
                        onCancel: function() {
                        }
                    })
                } else {
                    if (retObj.retAry.length) {
                        this.generatebetList(retObj.retAry, arg)
                    } else {
                        _this.textAreaV = ''
                    }
                }
            },
            validChioceNum(v) { //是否完成有效投注
                v = v.replace(/[^0-9]/ig, "");
                if (v.toString().length >= this.algorithm) {
                    this.betEnabled = false
                    this.betCount = Math.floor(v.length/this.algorithm)
                } else {
                    this.betEnabled = true
                    this.betCount = 0
                }
            },
            generatebetList(textAreaV){
                let splitArr = textAreaV.map(a => a.split('').join(',')).join('|');

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

                var betRet = {}
                betRet.betAmt = this.betAmt
                betRet.betBackRate = null
                betRet.betContent = splitArr
                betRet.showContent = '['+ this.config.name + '] ' + splitArr
                betRet.betMultiple = this.betTimes
                betRet.betNumber = this.betCount
                //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
                betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), this.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo = this.settings.groupNo
                betRet.gamePattern = this.moneyModel

                this.$emit('bet', betRet)
                this.clearUI()
            }
        }
    }
</script>

<style scoped lang="less">
  .textareabox{
    padding: 30px 10px 20px 10px;
    background-color: #fff;
    .btn-group{
      padding-top: 10px;
      text-align: center;
    }
  }
  .textarea{
    width: 100%;
    height: 140px;
    textarea{
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

