import playMethods from '@/assets/js/playMethods'
import Combinatorics from '@/assets/js/combinatorics'
import asmd from '@/assets/js/asmd'
import gameAlgo from '@/assets/js/game.config'
import algorithm from '@/assets/js/algorithm'
import {  
    ADD_BET
  } from '../../../state/mutation-type'
import { AlertModule, Checker, CheckerItem } from 'vux'
export default {
    props: ['config', 'settings'],
    components: {
        AlertModule,
        Checker,
        CheckerItem
    },
    data() {
        return {
            RegExp:'',
            textContent: '',
            codeNumYardArr: [],
            moneyModel: 0,
            betCount: 0,
            betTimes: 1,
            social: ['万', '千', '百', '十', '个'],
        }
    },
    computed: {
        betAmt: function() {
            return asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1))
        },
        pattern: function() {
            let pattern = 1;
            if (this.$store.state.betModel == 0) {
                pattern = 1
            } else if (this.$store.state.betModel == 1) {
                pattern = 0.1
            } else if (this.$store.state.betModel == 2) {
                pattern = 0.01
            }
            return pattern
        },
        selLen: function() {
            return this.social.length
        },
        schemeCount: function() {
            return Combinatorics.C(this.social.length, this.config.algorithm)
        },
        totalBetNumber () {
          return this.$store.getters.totalBetNumber
        }
    },
    watch: {
        config () {
            this.clearUI()
        },
        textContent (v) {
            this.validChioceNum(v);
        },
        schemeCount () {
            this.validChioceNum(this.textContent)
        }
    },
    mounted () {
        this.clearUI()
    },
    methods: {
        clearUI () {
            this.textContent = ''
            this.RegExp = new RegExp(`(.{${this.config.algorithm}})(?=[^$])`,'g')

            this.betCount = 0
            this.betTimes = 1
            this.moneyModel = 0
            this.social = ['万', '千', '百', '十', '个']
        },
        RemoveRet () {
            var retObj = playMethods.rnzdFilter(this.textContent, this.config.sequence, this.config.algorithm)
            if (retObj.repAry.length > 0 || retObj.errAry.length > 0) {
                AlertModule.show({
                    title: '提示',
                    content: '过滤' + retObj.errAry.length + '个错误号码(' + retObj.errAry.join(",") + ')，过滤' + retObj.repAry.length + '个重复号码(' + retObj.repAry.join(',') + ')'
                })
            }

            this.textContent = retObj.retAry.join('')

        },
        cleartextArea () {
            this.textContent = ''
        },
        validChioceNum (v) {
            v = v.replace(/[^0-9]/ig,"");
            if (v.toString().length >= this.config.algorithm){
                this.betCount = Math.floor(v.length / this.config.algorithm) * (this.config.rx ? this.schemeCount : 1)
            }
            else{
              this.betCount = 0
            }
        },
        btnConfirmChoiceFun () {
            var retObj = playMethods.rnzdFilter(this.textContent, this.config.sequence, this.config.algorithm)
            if (retObj.repAry.length > 0 || retObj.errAry.length > 0) {
                AlertModule.show({
                    title: '提示',
                    content: '过滤' + retObj.errAry.length + '个错误号码(' + retObj.errAry.join(",") + ')，过滤' + retObj.repAry.length + '个重复号码(' + retObj.repAry.join(',') + ')',
                    onHide: () => {
                        if (retObj.retAry.length) {
                            this.generatebetList(retObj.retAry);
                        } else {
                            this.textContent = ''
                        }
                    }
                })
            }
            else {
                if (retObj.retAry.length) {
                    this.generatebetList(retObj.retAry)
                } else {
                    this.textContent = ''
                    if (this.betCount == 0 && this.totalBetNumber == 0) {
                        AlertModule.show({
                            title: '提示',
                            content: '暂无投注内容'
                        })
                        
                        return
                    }

                    if (this.betCount == 0 && this.totalBetNumber != 0) {
                        this.$router.push('/betResult')
                        return
                    }
                }
            }
        },
        generatebetList (textAreaV){
            this.textContent = textAreaV.join('');
            this.validChioceNum(this.textContent)

            let splitArr=''; //转换 传入后台输出格式
            for (let i = 0; i < this.textContent.length; i++) { 
                let a = ',';
                if(i!=0&&parseInt(i+1)%this.config.algorithm == 0){
                    a = '|'
                }  
                if(i==this.textContent.length-1){
                    a='';
                } 
                splitArr += this.textContent[i] + a;
            }  

            var betRet = {}
            betRet.betAmt = this.betAmt
            
            betRet.betBackRate = null
            betRet.betContent = (this.config.rx ? algorithm.transWQBSGToNum(this.social)+':' : '')  +splitArr
            betRet.showContent = '['+ this.config.name + '] ' + splitArr
            betRet.betMultiple = this.betTimes
            betRet.betNumber = this.betCount
            //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, this.pattern), this.betAmt)
            betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), this.betAmt)
            betRet.gameNo = this.$route.params.gameNo
            betRet.groupNo = this.settings.groupNo
            betRet.gamePattern = this.$store.state.betModel
      
            //this.$emit('bet', betRet)

            this.$store.commit(ADD_BET, betRet)

            this.clearUI()

            this.$router.push('/betResult')
        }
    }
}