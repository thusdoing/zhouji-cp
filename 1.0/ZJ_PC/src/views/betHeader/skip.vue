<template>
    <div>
        
    </div>
</template>

<script>
    import axios from 'axios'
	export default {
		data() {
			return {
				expansion: true,
				formData: {
					custName: '',
					pwd: '',
					verCode: ''
				},
				codepath: '',
				left: null,
                hotLotteryData: [],
                balanceIS:true,
                balanceLabel:'隐藏',
                show:1,
                reload:false
			}
		},
		created() {
            // this.GethotLottery()
            this.getAcct();
            // this.getVerCode()
            // setTimeout(() => {
            //     this.getVerCode()
			// }, 1000);
			if(this.$route.params.gopath){
				this.$router.push(this.$route.params.gopath)
			}else{
				this.$router.push("/")
			}
		},
		methods: {
            onOpenQST () {
                window.open('/static_pc/cpRecode/index.html?game=' + '1111' + '030001')
            },
            addBookmark(){
                addBookmark()
            },
			getVerCode() {
				let _this = this;
				axios({
					method: 'get',
					url: '/getVerCode',
					params: {
						w: 70,
						h: 28
					},
					responseType: 'blob'
				}).then(function (data) {
					_this.codepath = window.URL.createObjectURL(data.data)
				});
			},
			login() {
				let _this = this;
				axios({
					method: 'post',
					url: '/login',
					data: this.$transformRequest(_this.formData)
				}).then(function (data) {
					if (data.data.success) {
						_this.getAcct();
                        _this.$router.push({
                            name:"skip",
                            params:{
                                gopath:"/"
                            }
                        })
					} else {
						_this.$Modal.error({
							title: '系统错误',
							content: data.data.msg
						})
						_this.getVerCode()
					}
				});
			},
			loginOut(){
				let _this = this;
				axios({
					method: 'get',
					url: '/loginOut'
				}).then((data) => {
					if (data.data.success) {
						_this.$store.commit('setUserInfo', {});
						_this.$store.commit('setmap', {});
                        _this.formData = {
                            custName: '',
                            pwd: '',
                            verCode: ''
                        };
                        _this.$router.push('/');
                        _this.getVerCode()
					}
				});
			},
//            获取用户基本信息
		    getAcct(){
                this.reload = true
				let _this = this;
				// axios({ method: 'get', url: '/getAcct'})
                this.$store.dispatch('debounce/fetchAcct').then((data) => {
                    this.reload = false
					if (data.data.success && data.data.t!=null) {
						_this.$store.commit('setUserInfo', data.data.t)
						_this.$store.commit('setmap', data.data.map)
                        sessionStorage.setItem('hasWithPwd',data.data.map.hasWithPwd)
					}else{
                        _this.$store.commit('setUserInfo', {})
                        _this.$store.commit('setmap', {})
                        sessionStorage.setItem('hasWithPwd',false)
                    }
				});
            },
            balanceDisplay(){
                if (this.balanceIS) {
                    this.$refs.balance.style.display = 'none';
                    this.balanceIS = false;
                    this.balanceLabel = '显示';
                } else {
                    this.$refs.balance.style.display = 'inline';
                    this.balanceIS = true;
                    this.balanceLabel = '隐藏';
                }
            },
			//获取热门彩种数据
			GethotLottery(){
				axios({
					method: 'get',
					url: '/getRecommendGame',
					params: {
						pageSize: 13,
					}
				}).then((res) => {
					let data = res.data;
					if (data.records&&data.records.length > 0) {
						this.hotLotteryData = data.records;
					}
				});
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>

</style>