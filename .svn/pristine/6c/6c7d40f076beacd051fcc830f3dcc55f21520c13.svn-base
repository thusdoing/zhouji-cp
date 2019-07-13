
  import {getOpenBall} from '../betCtTimeHead/ball.js'
  export default {
	props: ['Updated'],
	data() {
		return {
			historyList: [], //历史记录
			historyListcolumnsNew:[
				{
					title: '期号',
					key: 'gameNumber',
					render: (h, params) => {
						return h('label',params.row.gameNumber.substring(params.row.gameNumber.length-3) )
					}
				},
				{	width:90,
					title: '开奖号',
					render: (h, params) => {
						return h('Tooltip', {
							style: {
								color: 'red',
								width: '92px',
								whiteSpace: 'nowrap',
								textOverflow: 'ellipsis',
								overflow: 'hidden'
							},
							props:{
								content:params.row.gameOpenNo,
								placement:'top-start'
							}
						}, params.row.gameOpenNo)
					}
				},
				{
					title: '和值',
					render: (h, params) => {
						// let text = 0;
						// let arr = params.row.gameOpenNo.split(',');
						// for(let i in arr){
						// 	text += parseInt(arr[i]);
						// }
						return h('label', params.row.gameOpenNoCase[0])
					}
				},
				{	width:80,
					title: '状态',
					render: (h, params) => {

						return h('div', params.row.gameOpenNoCase.slice(1).map(function(it){
							if(it=="")return
							return h("div",{
								style: {
									width: '18px',
									height: '18px',
									color: 'white',
									display: 'inline-block',
									textAlign: 'center',
									lineHeight: '18px',
									marginRight: '5px',
									borderRadius: '3px',
									backgroundColor: it=='大'||it=='双'||it=='龙'?'#db383f':'#5691d7',
								},
							},it)
						}) )
					}
				},
			],
			historyListcolumns: [{
				width:30,
				title: '期号',
				key: 'gameNumber',
				render: (h, params) => {
					return h('label',params.row.gameNumber.substring(params.row.gameNumber.length-3) )
				}
			},
			{
				width:170,
				title: '开奖号',
				render: (h, params) => {
					return h('label', {
						style: {
							color: 'red'
						}
					}, params.row.gameOpenNo)
				}
			},
			{
				title: '开奖时间',
				render: (h, params) => {
					return h('label', {
						directives: [{
							name: 'dateFormat',
							value: {
								a: 'hh:mm:ss',
								b: params.row.gameOpenDt
							},
						}],
					})
				}
			}
			],
			historyListcolumnslhc:[
				{
					width:80,
					title: '期号',
					key: 'gameNumber',
					render: (h, params) => {
						return h('label',params.row.gameNumber.toString().slice(-8))
					}
				},
				{
					title: '开奖号',
					render: (h, params) => {
						const ball = getOpenBall(params.row.gameOpenDt)
						let tempArr = params.row.gameOpenNo.split(',').map(el=>{
							return h('div',{style:{flex: '1 1 auto',margin:'8px 0'}},[
								h('div',{style:{color:ball[el-1].color,fontSize:'12px',fontWeight: '700',
								}},el),
								h('div',{style:{fontWeight: '700'}},ball[el-1].zoo),
							])
						})
						let icon = h('Icon',{style:{fontWeight: '700',marginTop: '15px'},props:{type:"plus-round"}})
						tempArr.splice(6,0,icon)
						return h('div',{style:{
							display:'flex',justifyContent: 'center'
						}}, tempArr)
					}
				}
			],
			betRecodesList: [], //投注记录
			betRecodescolumns: [{
				title: '期号',
				key: 'gameNumber',
				//width:40,
				// render: (h, params) => {
				// 	return h('label',params.row.gameNumber.substring(params.row.gameNumber.length-3) )
				// }
			},
			// {
			// 	title: '投注内容',
			// 	key: 'gameNumber',
			// 	width:90,
			// 	render: (h, params) => {
			// 		return h('Tooltip',{
			// 			props:{
			// 				content:params.row.groupName+'-'+params.row.betContent,
			// 				placement:"top-end"
			// 			}
			// 		},params.row.groupName+'-'+params.row.betContent)
			// 	}
			// },
				{
					title: '投注金额',
					render: (h, params) => {
						return h('label', {
							style: {
								color: 'red'
							}
						}, (params.row.betAmt).toFixed(2) + '元')
					}
				},
				{
					title: '奖金',
					render: (h, params) => {
						return h('label', (params.row.bonusAmt || '0.00') + '元')
					}
				}
			],
			SuperadditionBetList: [], //追号记录
			Superadditioncolumns: [{
				title: '期号',
				key: 'firstGameNumber',
				width: 100,
			},
				{
				  title: '已追/总',
				  render: (h, params) => {
				    return h('label', params.row.hasBetCount+'/'+params.row.totalCount)
				  }
				},
				{
					title: '总金额',
					key:'totalAdditionAmt'
				},
				{
					title: '状态',
					render: (h, params) => {
						return h('Tooltip', {
								style: {
									color: 'red',
								},
								props:{
									content:`总投注/总奖金：${params.row.totalAdditionBetAmt}/${params.row.totalBonusAmt}`,
									placement:'right-start'
								}
							}, params.row.bonusStatus)
					}
				}
			],
			GameWinnersList:[],
			GameWinnerscolumns:[
				{
					title: '期号',
					key:"gameNumber"

				},
				{
					title: '用户',
					key:'custName'
				},
				{
					title: '奖金',
					key:"bonusAmt"
				}
			]
		}
	},
	created() {
		this.getGameLatestOpenNoList();
		this.getGameWinners()
		if(this.$store.state.userInfo.custName){
			this.getBetRecodes();
			this.getSuperadditionBetRecodes();
		}


	},
	methods: {
		// 查询游戏最新开奖结果列表(开奖历史)
		getGameLatestOpenNoList() {
			this.$http({
				method: 'get',
				url: '/gameOpenNo/getGameLatestOpenNoList',
				params: {
					gameNo: this.$route.params.gameNo,
					size: 10,
					showCase:true
				}
			})
				.then(response => {
					let data = response.data;
					if (data.success) {
						if (data.list.length > 0) {
							this.historyList = data.list;
							// this.historyList.map(function(item){
							//   item.gameOpenNo = item.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",").join(',');
							// })
						}
					} else {

					}
				})
				.catch(error => {

				})
		},
		//查询游戏记录
		getBetRecodes() {
      const todaytime = new Date();
      const today = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
			this.$http({
				method: 'post',
				url: '/game/getBetRecodes',
				data: {
					pageNo: 1,
          pageSize: 8,
          betDateStart: today,
					gameNo: this.$route.params.gameNo,
					profit:"no"
				},
			})
				.then(response => {
					let data = response.data;
					if (data.records && data.records.length > 0) {
						this.betRecodesList = data.records;
					} else {

					}
				})
		},
		//查询追号记录
		getSuperadditionBetRecodes() {
      const todaytime = new Date();
      const today = todaytime.getFullYear() + "/" + (todaytime.getMonth() + 1) + "/" + todaytime.getDate();
			this.$http({
				method: 'post',
				url: '/game/getValidAdditionBet',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
				data: {gameNo:this.$route.params.gameNo,profit:"no",pageSize: 8, date: 'today'}
			})
				.then((ret) => {
					this.SuperadditionBetList = ret.data.list
				})
		},
		//查询该彩种对应的中奖信息
		getGameWinners() {
			this.$http({
				method: 'get',
				url: '/game/getGameWinners',
				params: {
					gameNo: this.$route.params.gameNo,
					size: 10
				}
			})
				.then((ret) => {
					if(ret.data.success){
						this.GameWinnersList = ret.data.list
					}

				})
		},
	},
	watch: {
		Updated(value){
			if (value) {
				if(this.$store.state.userInfo.custName&&this.$store.state.userInfo.custName!=""){
					this.getBetRecodes();
					this.getSuperadditionBetRecodes();
					this.getGameWinners()
				}
				this.getGameLatestOpenNoList()
			}
		}
	}
}
