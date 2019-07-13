import asmd from '@/assets/js/asmd'
export default {
  props: ['config', 'settings'],
  data() {
    return {
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
  watch: {
    config: function() {
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
  methods: {
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
    //计算 组合
    C(n, m) {
      var ret = null;
      ret = this.factorial(n) / (this.factorial(m) * this.factorial(n - m));
      if (n < m) {
        ret = 0;
      };
      return ret;
    },
    factorial(m) {
      if (m <= 0) {
        return 1;
      } else {
        return m * this.factorial(m - 1);
      }
    },
    combine(arr, arg) {
      // b 当前为几星；
      // c 为重号 重复几次
      // d 为 传入 C(n,m)的m值
      let b = arg[0], c = arg[1], d = arg[2], zu = arg[3];
      let a = 0;
      let n = 1;
      let flag = true;
      arr.map((item)=>{
        if(item==''){
          flag = false;
        }
      })
      if (flag) {
        if (zu == 120) {
          a = this.C(arr[0].length, d);
        } else {
          let oneArr = arr[0];
          let twoArr = arr[1];
          if (c <= 1) { //顺序置换
            oneArr = arr[1];
            twoArr = arr[0];
          }
          for (let i = 0; i < twoArr.length; i++) {
            for (let k = 0; k < oneArr.length; k++) {
              n = oneArr.length;
              if (oneArr.indexOf(twoArr[i]) >= 0) {
                n--;
              };
            };
            if (zu == 60||zu == 20 || zu == 30||zu == 10 || zu == 5) {
              a += this.C(n, d);  
            }
          };
        }
      }else{
        a=0;
      }
      return a;
    },
    validChioceNum() { 
      //是否完成有效投注
      let valid = false;
      let combine = this.combine(this.codeNumYardArr, this.config.algorithm);
      if (combine > 0) {
        valid = true;
      }
      if (valid) {
        let items = combine; //总注码数
        this.betEnabled = false;
        this.betCount = items;
      } else {
        this.betEnabled = true
        this.betCount = 0
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg) {
      let splitArr = ''; 
      
      //转换数组 传入后台输出格式
      for (let i = 0; i < this.codeNumYardArr.length; i++) {
        let a = '|';
        if(i==this.codeNumYardArr.length-1){
          a='';
        }
        splitArr += this.codeNumYardArr[i].sort()+a;
      }
      if(this.config.sub.length <= 1){
        splitArr = splitArr.replace(/,/g,'|');
      }

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