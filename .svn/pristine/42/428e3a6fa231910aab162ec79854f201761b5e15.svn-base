<style lang="less" scoped>
.captcha /deep/ .vux-input-icon.weui-icon {
  position: relative; right: 90px;
}
.captcha /deep/ .weui-icon-clear {
   position: relative; right: 90px;
}
// .login /deep/ input { background-color: #fff!important;}
</style>
<template>
  <view-box class="login">
    <form>
      <group ref="login" title="登录 / LOGIN">
        <x-input ref="custName" label-width="80px" title="登录账号" placeholder="请输入登录账号" v-model="form.custName" required :max="50" :name="key"/>
        <x-input label-width="80px" title="登录密码" placeholder="请输入登录密码" type="password" v-model="form.pwd" required :max="50" :name="key"/>
        <x-input label-width="80px" title="验证码" placeholder="请输入验证码" class="captcha" :min="4" :max="4" v-model="form.verCode" required :name="key" v-if="$ENV.IS_verCode">
          <app-captcha slot="right"/>
        </x-input>
        <x-switch title="记住密码" v-model="selected"></x-switch>
      </group>
    </form>
    <div style="padding: 16px;">
      <x-button type="warn" @click.native="onLogin">登录</x-button>
      <!-- <check-icon :value.sync="selected">记住密码</check-icon> -->
      <p style="text-align: center; line-height: 50px;">还不是{{$ENV.VUE_APP_NAME}}的小伙伴？马上注册</p>
      <x-button @click.native="$router.push({path: '/register', replace: true})">注册</x-button>
    </div>
  </view-box>
</template>

<script>
import { Component, Vue } from 'core/decorators';
@Component

export default class Login extends Vue {
  form = { custName: '', pwd: '', verCode: null }
  
  selected=false
  /** 处理浏览器自动保存密码 */
  key = Math.random().toString(16).substr(2);

  async onLogin () {
    // let count = 1; const rsps = [];
    // let intel = setInterval(async () => {
    //   const now = Date.now();
    //   if (count++ > 100) clearInterval(intel);
    //   let _c = count;
    //   const rsp = await this.$tools.fetch('/api/login').setParams(this.form).setCrypto(true).post()
    //   console.log(_c, rsp, Date.now() - now);
    //   rsps.push(rsp);
    // }, 1000 / 100);
    // console.log('rsps', rsps.filter(d => d.code != '10001'))
    // return;
    const r = this.$app.validate(this.$refs.login);
    if (r) {
      return this.$vux.toast.show({ text: `${r.title}有误`, width: 'auto', type: 'text' });
    }
    this.$vux.loading.show();
    if(this.$ENV.IS_verCode){
    const rsp = await this.$apis.User.login(this.form);
    this.$vux.loading.hide();
    if (!rsp.success) {
      return this.$vux.alert(rsp.message);
    }
    if (sessionStorage) sessionStorage.clear();
    sessionStorage.custInfo = JSON.stringify(rsp.data.t);
   
    if(this.selected==true){
      window.localStorage.setItem("Account",JSON.stringify({data:this.form,time:Date.now()}))
    }else{
      window.localStorage.setItem("Account","")
    }
     
    await this.$vux.toast.show({ text: '登录成功', type: 'success' });
    if (this.$login) this.$login(rsp.data.t || {});
    }else{
       let rsp = await this.$apis.User.login_noverCode(this.form);     
       this.$vux.loading.hide();
    if (!rsp.success) {
      return this.$vux.alert(rsp.message);
    }
    if (sessionStorage) sessionStorage.clear();
    sessionStorage.custInfo = JSON.stringify(rsp.data.t);
    if(this.selected==true){
      window.localStorage.setItem("Account",JSON.stringify({data:this.form,time:Date.now()}))
    }else{
      window.localStorage.setItem("Account","")
    }
    
    await this.$vux.toast.show({ text: '登录成功', type: 'success' });
    if (this.$login) this.$login(rsp.data.t || {});
    }
   
    
    this.$router.push({ path: '/', replace: true });
  }

  IsRememberAcc(){
    let Account= window.localStorage.getItem("Account")
     if(!!Account){
          Account=JSON.parse(Account)
          if(Date.now() - Account.time>24*60*60*1000) return window.localStorage.removeItem('Account');
          this.form = { custName: Account.data.custName, pwd: Account.data.pwd, verCode: null }
          this.selected=true
     }else{
       this.selected=false
     }
    // 
   
    // 
  } 

  get xheader () {
    return { title: '用户登录', showBack: false };
  }

  created () {
    this.$app.setLayout(true, false, this);
    this.IsRememberAcc()

  }
  mounted() {
    // this.$refs.custName.focus();
  }
}
</script>
