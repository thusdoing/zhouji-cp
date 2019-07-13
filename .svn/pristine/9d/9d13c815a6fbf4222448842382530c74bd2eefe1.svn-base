import asmd from '@/assets/js/asmd'
import {  
    ADD_BET
  } from '../../../state/mutation-type'
export default {
    props: ['config', 'settings'],
    data(){
        return{
            quickBtns: [],
            codeNumYardArr: [],
            moneyModel: 0, 
            betCount: 0,
            betTimes: 1
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
        totalBetNumber () {
          return this.$store.getters.totalBetNumber
        }
    },
    watch: {
        config: function() {
            this.clearUI()
        }
    },
    mounted () {
        this.clearUI()
    },
    methods:{
        choiceNum(pos, index) {
            this.$set(this.codeNumYardArr[pos], index, +!this.codeNumYardArr[pos][index])
      
            this.validChioceNum();
        },
        quickChoice(index, type) { 
        
            this.$set(this.quickBtns, index, type);
    
            switch(type) {
                case '全':
                    this.codeNumYardArr[index] = Array(this.config.sub[index].golbal.length).fill(1);break
        
                case '清': 
                    this.codeNumYardArr[index] = Array(this.config.sub[index].golbal.length).fill(0);break
            }
    
            this.validChioceNum();
        },
        clearUI: function() {
            var codeNumYardArr = []
            let i = this.config.sub.length;
            for (let k = 0; k < i; k++) {  
                codeNumYardArr[k] = Array(this.config.sub[k].golbal.length).fill(0); 
            }

            this.codeNumYardArr = codeNumYardArr
            this.betCount = 0
            this.betTimes = 1
            this.moneyModel = 0
            this.quickBtns = []
        },
        validChioceNum() { 

            var retAry = this.codeNumYardArr.map(el => {
                let temAry = []
        
                el.forEach((item, index) => {
                    item && temAry.push(index)
                })
        
                return temAry
            })

            for(let i=0 ;i<this.config.sub.length;i++){
                if(retAry[i].length <= 0){
                    this.betCount = 0
                    return
                }
            }

            this.betCount = retAry.reduce((x, y) => {
                return x * y.length
            }, 1)
        },
        transDXDS (chr) {
            switch(chr) {
                case '大': return 'a';
                case '小': return 'b';
                case '单': return 'c';
                case '双': return 'd';
                default: return chr;
            }
        },
        onRandomClick () {
            var codeNumYardArr = []
            let i = this.config.sub.length;
            for (let k = 0; k < i; k++) {  
                codeNumYardArr[k] = Array(this.config.sub[k].golbal.length).fill(0); 
                codeNumYardArr[k][Math.floor(Math.random()*this.config.sub[k].golbal.length)] = 1
            }

            this.codeNumYardArr = codeNumYardArr
            this.validChioceNum()
        },
        btnConfirmChoiceFun(arg){    
            if (this.betCount == 0 && this.totalBetNumber == 0) {
                this.onRandomClick()
                return
            }

            if (this.betCount == 0 && this.totalBetNumber != 0) {
                this.$router.push('/betResult')
                return
            }

            var codeArr = this.codeNumYardArr.map((el, pos) => {
                return el.map((item, index) => {
                    if (item) {
                        return this.config.sub[pos].golbal[index].title
                    }

                    return ''
                }).filter(el => el)
            })

            let splitArr=''; //转换数组 传入后台输出格式
            for (let i = 0; i < codeArr.length; i++) { 
                let a = '|';
                if(i==codeArr.length-1){
                    a='';
                } 
                splitArr+= codeArr[i].sort()+a; 
            }  

            var betRet = {}
            betRet.betAmt = this.betAmt
            betRet.betBackRate = null
            betRet.betContent = splitArr.split('').map(el=>this.transDXDS(el)).join('')
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