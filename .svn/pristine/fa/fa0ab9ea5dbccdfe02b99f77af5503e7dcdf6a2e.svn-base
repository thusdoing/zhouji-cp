<template>
  <div>
    <div class="fl mb12 _2WJqO" style="width: 840px;">
      <p>个人信息
      </p>
    </div>
    <div class="_3wioq fl" style="width: 840px;">
      <div class="react-tabs" data-tabs="true">
        <ul class="react-tabs__tab-list" role="tablist">
          <li class="react-tabs__tab react-tabs__tab--selected">个人资料
          </li>
        </ul>
        <div class="react-tabs__tab-panel react-tabs__tab-panel--selected" role="tabpanel" id="react-tabs-27"
          aria-labelledby="react-tabs-26">
          <div class="_1DIdZ">
			  <div class="dib v-top mr50 relative"><img width="100px" :src="`/static_pc/avatar/${avatar}.jpg`">
				<div class="avatarButton" @click="avatarflag=true">修改头像</div>
            </div>
            <form class="undefined pt15 dib">
              <div class="_2CdDn"><label class="_23Ohh">账号</label><span class="_3NRlG">:</span>
                <div class="dib relative"><input type="text" disabled="" class="GWyhy s1cJ-" v-model='cust.custName'></div>
              </div>
              <div class="_2CdDn"><label class="_23Ohh">等级</label><span class="_3NRlG">:</span>
                <div class="dib relative"><input type="text" disabled="" class="GWyhy s1cJ-" v-model='cust.userHierarchyName'></div>
              </div>
              <div class="_2CdDn"><label class="_23Ohh">手机</label><span class="_3NRlG">:</span>
                <div class="dib relative"><input placeholder="请输入手机号,以便我们联系你" type="text" class="GnPUY GWyhy s1cJ-"
                    name="phone" v-model='cust.userPhone'></div>
              </div>
              <div class="_2CdDn"><label class="_23Ohh">Q Q</label><span class="_3NRlG">:</span>
                <div class="dib relative"><input v-model='cust.userQq' placeholder="请输入QQ号,以便我们联系你" type="text" class="GnPUY GWyhy s1cJ-"></div>
              </div>
              <!-- <div class="_3Gow4">
                                <button class="_1sc4M uEbCU" @click='upCust' type="button">
                                    确定
                                </button>
                            </div> -->
            </form>
          </div>
        </div>
      </div>
	</div>
	<Modal
        title="修改头像"
		v-model="avatarflag"
		width="800"
		class-name="vertical-center-modal">
		<div style="display: flex;flex-wrap: wrap;">
			<div v-for="(item, index) in 10" :key="index" style="width: 20%;padding: 10px;box-sizing: border-box;cursor: pointer;" @click="saveAvatar(item)"><img :src="`/static_pc/avatar/avatar${item}.jpg`" alt=""></div>
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
        url: 'http://www.lm699.com',
        current: null,
        content: null,
        cust: {},
        regex: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
        regex2: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\*{6}\d{2}$/,
		qq: /^\d{6,10}$/,
		avatarflag:false,
		avatar:'avatar2'
      }
    },
    components: {},
    created() {
		let avatar = localStorage.getItem('avatar')
		if(avatar){
			this.avatar = avatar
		}
	  	this.getCust();
    },
    watch: {},
    methods: {
      getCust() {
        let _this = this;
        axios.get('/getCust').then(function (data) {
          if (data.data.success) {
            _this.cust = data.data.t
          }
        });
      },
      upCust() {
        let _this = this
        if (!this.regex.test(this.cust.userPhone) || !this.regex2.test(this.cust.userPhone)) {

        } else {
          _this.$Message.error('手机号码填写不正确');
          return
        };
        if (!this.qq.test(this.cust.contactQq)) {
          _this.$Message.error('QQ号码填写不正确');
          return
        }
        axios({
          method: 'post',
          url: '/upCust',
          data: _this.$transformRequest({
            contactQq: _this.cust.contactQq == null ? '' : _this.cust.contactQq,
            userPhone: _this.cust.userPhone == null ? '' : _this.cust.userPhone
          })
        }).then(function (data) {
          if (data.data.success) {
            _this.$Modal.success({
              title: '系统提示',
              content: data.data.msg
            })
            _this.getCust();
          } else {
            _this.$Modal.error({
              title: '系统错误',
              content: data.data.msg
            })
          }
        })
      },
      gotobindPhone() {
        this.$router.push({
          name: 'bindPhone'
        })
      },
      gotoemal() {
        this.$Modal.info({
          title: '系统通知',
          content: '暂时不支持该功能',
          closable: true
        })
	  },
	  saveAvatar(i){
		  this.avatar = `avatar${i}`
		  localStorage.setItem('avatar',`avatar${i}`)
		  this.avatarflag = false
		  
	  }


    },
    mounted() {

    }

  }

</script>
<style>
	.avatarButton{
		position: absolute; width: 100%;height: 20px;background: rgba(0,0,0,.16);bottom:0;
		text-align: center;color: #fff;line-height: 20px;font-size: 12px;cursor: pointer;
	}
	.avatarButton:hover{
		background: rgba(0,0,0,.4);
	}
</style>
<style lang="less">
	.vertical-center-modal{
		display: flex;
		align-items: center;
		justify-content: center;

		.ivu-modal{
			top: 0;
		}
	}
</style>