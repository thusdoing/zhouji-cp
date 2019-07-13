import { Confirm } from 'vux'
export default {
  props: ['settings', 'config'],
  components: {
    Confirm
  },
  data() {
    return {
      settingsList: null,
      betArr: [], //投注内容数组
      showContentBet:[],//展示投注内容数组
      times: 1, //input输入框 倍数
      confirmShow:false,
      gameNumber:'',
      Obj:{}
    }
  },
  computed: {
    model() {
      let pattern = 1;
      if (this.$store.state.betModel == 0) {
        pattern = 1
      } else if (this.$store.state.betModel == 1) {
        pattern = 0.1
      }
      return pattern
    },
    allMoney() {
      return (this.$asmd.mul(this.betArr.length, 1, this.times)).toFixed(2);
    }
  },
  created() {
    this.restStatus();
  },
  methods: {
    active(_item,item,index) {
       this.showContentBet = [];
      this.Obj[index] = {}
      _item.active = !_item.active
      if (_item.active) {
        this.betArr.push(_item);
      } else {
        this.betArr.splice(this.betArr.indexOf(_item), 1);
      }
      this.settingsList.groupClassCones[index].groupSettinges.forEach((els)=>{
        if(els.active){
          this.Obj[index].showContentTit = item.groupClassConName;
          this.Obj[index].showContent = (this.Obj[index].showContent || '') + els.groupName+',';
        }
      })
      if(this.Obj[index].showContent){
        this.Obj[index].showContent = (this.Obj[index].showContent).substring(0,this.Obj[index].showContent.length-1)
      }
      for(let i in this.Obj){
        if(this.Obj[i].showContentTit){
          this.showContentBet.push(this.Obj[i])
        }
      }
    },
    KsTz(){
      if(this.betArr.length<=0){
        this.$vux.alert.show({
          title: '提示',
          content: '请先选择投注号码',
        })
      }else{
        // 查询游戏下一期情况(用于投注)
        this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameNextOpenNo',
          params: {
            gameNo: this.$route.params.gameNo
          }
        })
        .then(response => {
          this.gameNumber = response.data.t.gameNumber
        })
        this.confirmShow = true;
      }
    },
    confirmBet() {
      let postData = this.betArr.map((el) => {
        return {
          gameNo: this.$route.params.gameNo,
          groupNo: el.groupNo,
          betAmt: this.$asmd.mul(1, this.times),
          betBonus: el.bonusAmt
        }
      })
      this.$http({
          method: 'post',
          url: '/game/creditBet',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
          },
          data: postData
        })
        .then(response => {
          let content = ''
          if (response.data.success) {
            content = '投注成功'
            this.restStatus();
          } else {
            content = response.data.msg;
          }
          // 显示
          this.$vux.alert.show({
            title: '提示',
            content: content,
          })
        })
    },
    //清空投注
    restStatus() {
      this.Obj={}
      this.showContentBet = []
      if (this.settings) {
        this.settings.groupClassCones.forEach(item => {
          item.groupSettinges.forEach(_item => {
            _item.active = false;
          });
          // this.showContentBet.push({});
        });
        this.settingsList = _.cloneDeep(this.settings);
      }
      this.times = 1;
      this.betArr = [];
      
    }
  },
  watch: {
    config(v) {
      this.restStatus();
    },
  }
}
