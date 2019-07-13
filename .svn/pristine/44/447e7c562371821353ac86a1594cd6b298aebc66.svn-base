<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>安全中心
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <div class="mh30 _1Ofqf" style="padding-left: 11px;">
                <div class="lh-zero">
                        <i v-for="item in grade" style="font-size:36px;color:#FFB200;margin:0 -3px" class="iconfont icon-xingxing"></i>
                        <i v-for="item in (5-grade)" style="font-size:36px;color:#D5D5D5;margin:0 -3px" class="iconfont icon-xingxing"></i>
                </div>
                <p class="_1ZfWP mb15 mt25" v-if="grade<5">您的账号安全级别为低，可以通过完善安全信息提高级别。</p>
                <p class="_1ZfWP mb15 mt25" v-if="grade==5">您的账号安全级别很高。</p>
                <p class="QIoHs mb10">上次登陆： <span v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:cust.lastSignDate}"></span> <span class="_1V3Rc"
                                                                      @click='$router.push({name:"editLoginPass",params:{title:"登录"}})'>修改密码</span>
                </p></div>
            <div class="ph30 pt10">

                <div class="_3TE6N row">
                    <div class="LtEcQ p2_Security_enabled mr15 tc fl before-vertical"><i style="color: #fff;font-size: 26px;line-height: 50px" class="iconfont icon-yuechi"></i></div>
                    <div class="fl"><p class="_2hk91">登陆密码</p>
                        <p class="QIoHs">建议您使用字母和数字的组合、混合大小写。</p></div>
                    <div class="fr mv8">
                        <button class="_2BPQi p2_Security_button" @click='$router.push({name:"editLoginPass",params:{title:"登录"}})'>
                            修改密码
                        </button>
                    </div>
                </div>

                <div v-if="$store.state.map.hasWithPwd==false" class="_3TE6N row">
                    <div class="_3s7L_  mr15 fl tc before-vertical"><i style="color: #fff;font-size: 32px;line-height: 50px" class="iconfont icon-yuechi"></i></div>
                    <div class="fl"><p class="_2hk91">未设置支付密码</p>
                        <p class="QIoHs">支付密码用于提现、绑定银行卡等操作，可保障资金安全。</p></div>
                    <div class="fr mv8">
                        <button class="_2BPQi p2_Security_button db mb5" @click="$router.push('/editSecurePass')">
                            设置支付密码
                        </button>
                    </div>
                </div>

                <div v-else class="_3TE6N row">
                    <div class="LtEcQ p2_Security_enabled mr15 fl tc before-vertical"><i style="color: #fff;font-size: 32px;line-height: 50px" class="iconfont icon-suo"></i></div>
                    <div class="fl"><p class="_2hk91">已设置支付密码</p>
                        <p class="QIoHs">支付密码用于提现、绑定银行卡等操作，可保障资金安全。</p></div>
                    <div class="fr" style="margin-top: -11px;">
                        <button @click='$router.push({name:"editLoginPass",params:{title:"支付"}})' class="_2BPQi p2_Security_button db mb5">
                            修改支付密码
                        </button>
                        <button class="_2BPQi p2_Security_button db" @click="tellme">
                            找回支付密码
                        </button>
                    </div>
                </div>

                <div v-if="$store.state.map.hasQuestion==false" class="_3TE6N row">
                    <div class="_3s7L_  mr15 fl tc before-vertical"><i style="color: #fff;font-size: 30px;line-height: 50px" class="iconfont icon-email"></i></div>
                    <div class="fl"><p class="_2hk91">未绑定密保问题</p>
                        <p class="QIoHs">密保问题可以增加账户安全性，快速找回账号密码。</p></div>
                    <div class="fr mv8">
                        <button @click='$router.push("/securityQuestion")' class="_2BPQi p2_Security_button">
                            绑定密保问题
                        </button>
                    </div>
                </div>

                <div v-else class="_3TE6N row">
                    <div class="LtEcQ p2_Security_enabled mr15 fl tc before-vertical"><i style="color: #fff;font-size: 30px;line-height: 50px" class="iconfont icon-email"></i></div>
                    <div class="fl"><p class="_2hk91">已绑定密保问题</p>
                        <p class="QIoHs">密保问题可以增加账户安全性，快速找回账号密码。</p></div>
                    <div class="fr mv8">
                        <button @click='$router.push("/securityQuestion")' class="_2BPQi p2_Security_button">
                            重置
                        </button>
                    </div>
                </div>

                <!-- <div class="_3TE6N row"><div class="_3s7L_  mr15 fl tc before-vertical"><img src="https://mps2.bjgntea.com/mpsing/storage/Mongo/project_2_d/assets/50ee732799b0ab195948c478b1e786d4.svg" width="27" class="h-auto"></div><div class="fl"><p class="_2hk91">未绑定密保邮箱</p><p class="QIoHs">绑定邮箱可以增加账户安全性，快速找回账号密码。</p></div><div class="fr mv8"><button class="_2BPQi p2_Security_button">
                    绑定密保邮箱
                </button></div></div> -->
            </div>
        </div>
        <Modal v-model="setbankM" width="180" :closable="false" class-name="vertical-center-modal" :mask-closable="false" >
                
            <h1 style="text-align: center;padding: 20px 0 10px">你还没有设置支付密码</h1>
            <div slot="footer">
                <Button @click="setbankM=false" style="float:left">不想去</Button>
                <Button type="success" @click="$router.push('/editSecurePass')">去设置</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				getData: [],
				arr: null,
				flag: true,
				current: null,
				content: null,
                cust:{},
                setbankM:false
                
			}
		},
		components: {
            
        },
        computed:{
            grade:function(){
                let i = 1;
                if(this.$store.state.map.hasWithPwd ){
                    i += 2;
                }
                if(this.$store.state.map.hasQuestion){
                    i += 2;
                }
                return i
            }
        },
		created(){
            this.getCust();
            this.getAcct();
            if(sessionStorage.getItem('hasWithPwd')=="false"){
                this.setbankM = true
            }
		},
		watch: {},
		methods: {
            getCust(){
                let _this = this;
                axios.get('/getCust').then(function (data) {
                    if (data.data.success) {
                        _this.cust = data.data.t
                    }
                });
            },
			tellme(){
				this.$Modal.info({
                    title:'系统提示',
                    content:'请联系客服'
                })
            },
            //            获取用户基本信息
            getAcct(){
                
                let _this = this;
               // axios({ method: 'get', url: '/getAcct'})
                this.$store.dispatch('debounce/fetchAcct').then((data) => {
                    if (data.data.success && data.data.t!=null) {
                        _this.$store.commit('setUserInfo', data.data.t)
                        _this.$store.commit('setmap', data.data.map)
                    }
                });
            },

		},
		mounted(){
            
		}

	}
</script>