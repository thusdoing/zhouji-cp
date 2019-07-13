import asmd from '@/assets/js/asmd';
export default {
  props:['betTableList','isChaseCheck','zuitouStu'],
  data() {
    return {
      THData: [
        {
          title: '[玩法]号码',
          key: 'showContent',
          render: (h, params) => {
            return h('Tooltip',{props:{content:params.row.showContent, placement:"top-start"},style:{width:'330px'}},params.row.showContent);
          }
        },
        {
          title: '注',
          width: 60,
          key: 'betNumber'
        },
        {
          title: '倍',
          width: 60,
          key: 'betMultiple'
        },
        {
          title: '单位',
          width: 60,
          key: 'gamePattern',
          render: (h, params) => {
            return h('span',params.row.gamePattern == 0 ? '元' : '角');
          }
        },
        {
          title: '投注金额',
          width: 80,
          key: 'estimateProfit',
	      render: (h, params) => {
	        return h('span',(parseFloat(params.row.betAmt)).toFixed(2));
          }
        },
        {
          title: '可中金额',
          width: 80,
          key: 'estimateProfit',
	      render: (h, params) => {
	        return h('span',(parseFloat(params.row.estimateProfit)+parseFloat(params.row.betAmt)).toFixed(2));
          }
        },
        {
          title: '预计盈利',
          width: 80,
          key: 'estimateProfit',
	      render: (h, params) => {
	        return h('span',(parseFloat(params.row.estimateProfit)).toFixed(2));
          }
        },
        {
          title:'操作',
          width: 60,
          key: 'age',
          render: (h, params) => {
            return h('div',[
              h('i',{
                class:{
                  'iconfont icon-shanchu':true,
                },
                on: {
                  click:(e)=>{
                    this.removeList(params.index);
                  }
                },
              }),
            ]);
          }
        }
      ],
      enabledEmpty:true, //清空 禁用 开启
      enabledBet:true, //投注 禁用 开启
      chaseCheck:false, //追号选择框
      ivuCheckbox:false,//追号选择框样式
      tableList:[], // 投注内容显示数据
    }
  },
  computed:{
    allYard(){
      return this.tableList.reduce((x, y) => {
        return this.$asmd.numAdd(x, y.betNumber)
      }, 0);
    },
    allMoney(){
      return (this.tableList.reduce((x, y) => {
        return this.$asmd.numAdd(x, y.betAmt)
      }, 0)).toFixed(2);
    }
  },
  methods:{
    removeList(currRow){
      this.tableList.splice(currRow,1);
      this.$emit('UpdateList', this.tableList);
    },
    //游戏投注
    async betGame() {
      let betList = _.cloneDeep(this.tableList)
      this.enabledBet = true
      this.tableList = [];
      betList.forEach(item => {
        delete item.showContent;
      });
      // console.log({betVos: betList})
      // const r = this.$http({ method: 'post', url: '/game/bet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data: betList })
      const rsp = await this.$tools.fetch('/game/api/bet').setCrypto(true).setJson({betVos: betList}).post();
      const r = Promise.resolve({data: { success: rsp.success, msg: rsp.message, ...rsp.data}});
      r.then(response => {
        let data = response.data;
        if (data.success) {
          this.tableList = [];
          //通知 投注记录 组件更新
          this.$emit('updated',+new Date().getTime());

          this.$Modal.success({
            title: '提示',
            content: '投注成功',
          });
          this.$store.commit('yu_e')
        }
        else {
          this.$Modal.warning({
            title: '提示',
            content: data.msg,
          });
        }
      })
      .catch(error => {

      })
    },
    chaseCheckFun(){
      if(this.tableList.length<=0){
        this.$Modal.warning({
          title: '提示',
          content: '请先选择注码',
        });
        return
      }
      let firstList = this.tableList[0];
      let groupNoFlag = true;
      this.tableList.map((item)=>{
        if(firstList.groupNo != item.groupNo){
          this.$Modal.warning({
            title: '提示',
            content: '玩法类型不一致，无法追号！',
          });
          groupNoFlag = false;
        }
      })
      if(!groupNoFlag){return}
      let my = this.$refs.ivuCheckboxInput;
      this.ivuCheckbox = !this.ivuCheckbox;
      my.checked = !this.ivuCheckbox;
      this.enabledBet = this.ivuCheckbox;
      this.tableList.map((items)=>{
        items.betAmt = items.betAmt/items.betMultiple
        items.estimateProfit = items.estimateProfit/items.betMultiple
        items.betMultiple = 1
      })
      this.$emit('chaseCheck',this.ivuCheckbox)
    }
  },
  watch:{
    betTableList(value){
      if (Array.isArray(value)) {
        this.tableList = this.tableList.concat(value)
      }
      else {
        this.tableList.push(value)
      }
    },
    tableList(value){
      this.$emit('UpdateList', this.tableList);
      if(value.length>0){
        this.enabledBet = false;
        this.enabledEmpty = false;
      }else{
        this.enabledBet = true;
        this.enabledEmpty = true;
        let my = this.$refs.ivuCheckboxInput;
        this.ivuCheckbox = false;
        my.checked = false;
        this.$emit('chaseCheck',this.ivuCheckbox)
      }
    },
    isChaseCheck(){
      this.ivuCheckbox = this.isChaseCheck
      this.chaseCheck = this.isChaseCheck
    },
    zuitouStu(){
      this.tableList = [];
    }
  }
}
