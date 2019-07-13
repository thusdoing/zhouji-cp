<style lang="less" scoped>
.captcha /deep/ .vux-input-icon.weui-icon {
  position: relative; right: 90px;
}
 .captcha /deep/ .weui-icon-clear {
   position: relative; right: 90px;
}
  .Hide{
    display:none;
  }
</style>

<template>
  <view-box class="register">
    <div class="isShow">    
      <group ref="register" title="注册 / REGISTER">
        <x-input :name="key" ref="custName" label-width="100px" title="用户名" placeholder="用户名为6-12位数字或英文字母" v-model="form.custName" required :min="6" :max="12" :is-type="() => isType('custName')" :debounce="300" @on-change="checkCustName"/>
        <x-input :name="key" label-width="100px" title="密码" placeholder="密码为6-12位数字或英文字母" type="password" v-model="form.signPasswd" required :min="6" :max="12"/>
        <x-input :name="key" label-width="100px" title="确认密码" placeholder="请输入确认密码" type="password" v-model="confirmPwd" required :max="20" :is-type="() => isType('confirmPwd')"/>
        <x-input :name="key" label-width="100px" v-for="(d, i) of fields" :key="i" :title="d.codeName" :placeholder="`请输入${d.codeName}`" v-model="form[d.codeKey]"  required :max="20"/>
        <x-input :name="key" label-width="100px" title="验证码" placeholder="请输入验证码" class="captcha" :min="4" :max="4"
          v-model="form.code" required>
          <app-captcha slot="right"/>
        </x-input>
      </group>
      <!-- <checklist style="background-color:#eee; margin-top: 8px; " :options="options" v-model="isAdult"/> -->
      <check-icon :value.sync="isAdult" type="plain" style="background-color:#ffffff; margin-top: 8px; padding:8px;width:100%;box-sizing: border-box">我已同意用户协议<a style="color:red;" href="#" @click="xieYi">《{{$ENV.VUE_APP_NAME}}协议》</a></check-icon>
      <div style="padding: 16px;">
        <!-- <x-button type="warn" @click.native="xieYi">查看{{$ENV.VUE_APP_NAME}}协议</x-button> -->
        <x-button type="warn" @click.native="onRegister">注册</x-button>
        <p style="text-align: center; line-height: 50px;">已有账号？立即登录</p>
        <x-button @click.native="$router.push({path: '/login', replace: true})">登录</x-button>
      </div>
    </div>
<div class="Hide" style="padding: 16px;">    
     <p>		&nbsp;&nbsp;&nbsp;&nbsp;{{$ENV.VUE_APP_NAME}}开展网上购买彩票业务。本协议为用户在{{$ENV.VUE_APP_NAME}}网站上进行彩票购买的事宜而订立，具体条款如下：<br/>

        一、相关定义<br/>
        1、用户：指在{{$ENV.VUE_APP_NAME}}注册登记，并得到{{$ENV.VUE_APP_NAME}}在线认可，有资格享受{{$ENV.VUE_APP_NAME}}服务的注册会员<br/>
        2、购彩：指注册的用户可在本站购买彩票，并且对所购买的彩票拥有完整的奖金获得权利。<br/>
        3、用户资料：指用户在注册时提供的个人信息，包括：用户名、注册帐户密码、银行卡帐号、用户真实姓名等。<br/>

        二、本协议服务范围<br/>
        本协议服务范围包括：提供购彩平台；提供彩票相关资讯；提供彩票信息交互平台；提供在线预付支付结算服务。<br/>
        本协议服务范围不包括向注册会员提供电脑终端及其附属设备、网络和通信等资源。<br/>

        三、用户的权利<br/>
        1、帐户管理权。用户有权随时查询用户资料，并可对用户名、用户真实姓名以外的信息进行修改。<br/>
        2、免费使用权。用户有权免费使用{{$ENV.VUE_APP_NAME}}的彩票投注系统以及费免获得彩票资讯。<br/>
        3、彩票查询权。用户通过{{$ENV.VUE_APP_NAME}}购彩成功后，有权免费在{{$ENV.VUE_APP_NAME}}查询所购买的彩票的状态。<br/>
        4、奖金获得权。用户通过{{$ENV.VUE_APP_NAME}}购彩成功的，若彩票中奖，用户有权获得相应奖金。<br/>
        5、帐户核查权。用户可以随时对帐户进行资金余额核查。<br/>
        6、申请提款权。用户在任何时间都可对自己的余额申请提款，{{$ENV.VUE_APP_NAME}}在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户预付款中需提取的款项转帐到用户注册的银行账户上。用户提款转帐所产生的银行费用由用户承担。 当用户余额小于转帐所需的银行费用时，请及时联系客服处理。<br/>

        四、用户的义务<br/>
        1、全面遵守本协议的义务。在注册登记成为{{$ENV.VUE_APP_NAME}}用户之前，须认真阅读、理解本协议各条款，一经注册成功即视为同意本协议全部条款，用户有义务全面遵守本协议。<br/>
        2、如实提供用户资料义务。为保障用户的合法权益，避免在中奖时出现用户注册资料与真实情况不符导致兑奖不能等情况，请用户按照真实、全面、准确的原则提供用户资料。因用户资料不真实、不全面、不准确造成不能兑奖、不能提款等情况，由用户承担全部责任。<br/>
        3、对应注册义务。严禁任何形式的重复注册及多次恶意注册，因此而造成的一切后果，由用户自行承担。同时，为保证用户的安全性，用户应以一个银行卡帐号对应一个用户真实姓名名，因银行卡帐号与用户真实姓名不能一一对应而产生的不利后果，由用户自行承担。<br/>
        4、保持用户名义务。为保护用户帐户的安全性，用户名、用户真实姓名、银行卡号一经注册确认后，不得再行更改。<br/>
        5、保护帐户资料义务。用户帐户资料包括用户密码、个人帐号以及用户帐号操作所需的资料。用户务必对其帐户资料自行保密，以免帐号资料被盗用或篡改。因用户保护不周导致帐户资料被盗用或篡改而给用户造成的任何损失及法律责任由用户自行承担。<br/>
        6、遵守网络安全管理的义务。用户不得利用{{$ENV.VUE_APP_NAME}}制作、复制和传播下列信息：<br/>
        （1）煽动抗拒、破坏宪法和法律、行政法规实施的；<br/>
        （2）煽动颠覆国家政权，推翻社会主义制度的；<br/>
        （3）煽动分裂国家、破坏国家统一的；<br/>
        （4）煽动民族仇恨、民族歧视，破坏民族团结的；<br/>
        （5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；<br/>
        （6）宣扬迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；<br/>
        （7）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；<br/>
        （8）损害国家机关信誉的；<br/>
        （9）其他违反宪法、法律、行政法规、行政规章、地方性法规的行为。<br/>
        7、保护网站安全的义务。禁止以任何方式对{{$ENV.VUE_APP_NAME}}进行各种破坏行为。<br/>
        8、承担银行费用的义务。在申请提款至用户银行卡的银行费用由用户承担。<br/>

        五、{{$ENV.VUE_APP_NAME}}的权利<br/>
        1、管理用户帐户的权利。如果用户提供的资料包含有第四条第3款多次恶意注册信息或第7款所列信息，{{$ENV.VUE_APP_NAME}}保留冻结其用户账户、注销其用户帐户或者限制其使用全部或部分服务内容的权利。一经发现用户利用{{$ENV.VUE_APP_NAME}}制作、复制和传播的信息明显属于第三条第7款所列信息之一的，{{$ENV.VUE_APP_NAME}}将立即采取屏蔽信息、发出警告、直至关闭用户帐户等措施。。<br/>
        2、修改本协议条款的权利。{{$ENV.VUE_APP_NAME}}有权在必要时修改协议条款，协议条款一旦发生变动，将会在{{$ENV.VUE_APP_NAME}}相关页面上提示或公告修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务。如果用户继续享用服务，则视为接受服务条款的变动。{{$ENV.VUE_APP_NAME}}保留随时修改或中断服务而不需知照用户的权利。主要包括以下情况：<br/>
        （1）增加或减少彩票品种。{{$ENV.VUE_APP_NAME}}的彩票品种以当期可以实现购买的品种为准，长期或临时增加或减少彩票品种均不需事先告知用户。<br/>
        （2）调整彩票销售截止时间的权利。{{$ENV.VUE_APP_NAME}}有权根据彩票种类和当期销售情况调整彩票销售截止时间，而不需事先告知用户。<br/>
        3、在用户向{{$ENV.VUE_APP_NAME}}提出购彩请求后，{{$ENV.VUE_APP_NAME}}有权从其余额提取请求购彩所需的款项金额。<br/>
        4、兑奖、领取奖金、分配奖金的权利和义务。在彩票中奖情况下，由{{$ENV.VUE_APP_NAME}}根据中奖比例计算出的中奖金额，直接汇入中奖用户。<br/>
        5、制止公款购彩的权利。{{$ENV.VUE_APP_NAME}}有权拒绝非个人资金通过{{$ENV.VUE_APP_NAME}}购买彩票，一旦发现有款项自非个人帐户资金转入用户预付款帐户，{{$ENV.VUE_APP_NAME}}有权采取强行将款项退回原帐户、终止协议等措施。{{$ENV.VUE_APP_NAME}}并将向有关管理机关报告。<br/>
        6、制止未满18周岁的未成年人购买彩票的权利。如未成年人提供虚假用户资料冒充成年人的，其在{{$ENV.VUE_APP_NAME}}进行的一切彩票购买行为将自始无效，由此给{{$ENV.VUE_APP_NAME}}及其本人造成的损失以及不能领奖的后果均由该未成年人及其法定代理人承担。<br/>

        六、{{$ENV.VUE_APP_NAME}}的义务<br/>
        1、用户帐户资料保护义务。{{$ENV.VUE_APP_NAME}}对用户帐户资料提供最大限度的安全保护。当{{$ENV.VUE_APP_NAME}}用户涉嫌盗用他人第三方支付渠道（如：银联、财付通、支付宝等）帐户资金，或涉嫌其第三方支付渠道帐户被盗用的，应涉嫌被盗用人或第三方支付公司的要求，在其承诺仅将用户资料用于涉嫌盗用事件并予以保密的前提下，{{$ENV.VUE_APP_NAME}}将向请求方提供涉嫌盗用人的用户资料。{{$ENV.VUE_APP_NAME}}用户同意放弃在此情况下向{{$ENV.VUE_APP_NAME}}追究任何责任的权利。<br/>
        2、公布中奖情况的义务。在官方彩票发行和销售机构发布中奖结果后，{{$ENV.VUE_APP_NAME}}以官方彩票发行机构和销售机构公布的中奖情况为准。<br/>
        3、转帐义务。在达到一定投注量情况下，用户在任何时间都可对自己的余额申请提款，{{$ENV.VUE_APP_NAME}}在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户需提取的款项转帐到用户注册的银行账户上。<br/>

        七、协议成立、变更和终止<br/>
        1、因网络故障、超过指定购买时间、金额不足等原因，未能完成购彩的。{{$ENV.VUE_APP_NAME}}将返还用户预付资金。<br/>
        2、{{$ENV.VUE_APP_NAME}}有权对本协议条款进行变更而无需事先通知用户。<br/>
        3、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知15日内未能改正错误的，均被视为自动放弃本协议，协议同时终止。<br/>
        4、一经发现公款购彩嫌疑、未成年人购彩嫌疑等本协议禁止的情况，{{$ENV.VUE_APP_NAME}}有权立即终止协议。<br/>

        八、免责条款
        发生下列情况时，{{$ENV.VUE_APP_NAME}}不予承担任何法律责任：<br/>
        1、用户资料泄露。由于用户将密码告知他人或与他人共享注册帐户，或由于用户的疏忽，由此导致的任何个人资料泄露，以及由此产生的纠纷。<br/>
        无论何种原因导致的用户资料未授权使用、修改，用户密码、个人帐号或注册信息被未授权篡改、盗用而产生的一切后果。<br/>
        2、不可抗力及不可预见的情势发生。不可抗力和不可预见情势包括：自然灾害、政府行为、罢工、战争等；黑客攻击、计算机病毒侵入或发作、政府管制、彩票发行和销售机构的原因、彩票出票机或服务的故障、网络故障、国家政策变化、法律法规之变化等。因不可抗力和不可预见情势造成：暂时性关闭，用户资料或购彩指令泄露、丢失、被盗用、被篡改，购彩失败，{{$ENV.VUE_APP_NAME}}未能收到购彩指令等，以及由此产生的纠纷。
        因不可抗力和不可预见的情势造成本协议不能履行的。<br/>
        3、用户原因或第三方原因造成损失。由于用户自身原因、或违反法律法规，以及第三方的原因，造成用户无法使用{{$ENV.VUE_APP_NAME}}服务或产生其他损失的。<br/>
        4、用户购彩而产生的损失。用户根据本协议进行购彩而发生的直接、间接、偶然、特殊及继起的损害。<br/>
        5、用户使用链接或下载资料产生的损害。由于使用与{{$ENV.VUE_APP_NAME}}链接的其它网站，或者使用通过{{$ENV.VUE_APP_NAME}}下载或取得的资料，造成用户资料泄露、用户电脑系统损坏等情况及由此而导致的任何争议和后果。<br/>

        九、合同组成<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;{{$ENV.VUE_APP_NAME}}主页以及其他页面有关（包括但不限于）会员注册流程、变更流程、购彩流程、会员支付与结算、相关奖励、会员服务等运营内容的细则以及法律声明均为本协议的有效组成部分，是对本协议的解释扩充，与本协议有着相同的法律效力。
        用户资料隐私保护、网站禁止行为、网站知识产权保护等约定详见《法律声明》。<br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        -------------------注意事项-------------------<br/><br/>

        1、禁止未满18周岁(未成年)者在本站注册。同时，不提倡学生购买彩票，其中也包括在校大学生。<br/>
        2、为确保您的购买申请能及时成功提交，请您务必在当期购买申请前有足够款项在您的账号。<br/>
        3、在使用网络支付平台时请注意：无论使何种网络支付系统时都将收取一定的手续费。<br/>
        4、请确认您的电子邮箱地址为长期使用之有效邮箱。并随时留意查收本站的邮件。<br/>
        5、有任何疑问请及时与我们取得联系。<br/>
        提醒：购买彩票有风险，在线投注需谨慎
		</p>      
      <div style="margin-top: 16px;">        
        <x-button type="warn" @click.native="xieYiHide">我已阅读</x-button>
      </div>
    </div>

  </view-box>
</template>

<script>



import { Component, Vue, NGetter, Watch } from 'core/decorators';
import { CheckIcon } from 'vux'

const filterKeys = [ 'custName', 'signPasswd', 'code' ];
const simple = {custName : '', signPasswd : '', recommendNo :'', agentNo :'', code : '', custCertNo:'', custRealName:'', userQq:'', contactQq:'', contactPhone:'', userPhone:'', invitationCode:'', withPasswd:'', recommendCode:'', weChat:''}

@Component({
  components: { CheckIcon }
})

export default class Register extends Vue {
  @NGetter('WebConfig', 'getConfigOfRegister') configs;
  key = Date.now().toString(16);
  form = { custName : '', signPasswd : '', agentNo: '' }
  // 确认密码
  confirmPwd = '';
  isAdult = true;
  errors = { custName: null };

  // options = [ { key: 'ischeck',value: '我已同意用户协议' } ]

  get fields() {
    return this.configs.filter(d => this.$consts.PubConstant.C_CODE_STATUS_YES == d.codeStatus && filterKeys.indexOf(d.codeKey) == -1);
  }

  @Watch('fields', {immediate: true})
  toWatchFields() {
    const form = this.fields.map(d => d.codeKey).reduce((m, k) => {
      m[k] = this.form[k] || '';
      return m;
    }, {});
    this.form = { ...simple, ...form };
    this.getAgentNo();
  }

  isType(key) {
    if ('confirmPwd' == key) {
      if (this.confirmPwd == this.form.signPasswd) return { valid: true };
      return { valid: false, msg: '两次密码不一致'};
    }
    return this.errors[key] || { valid: true };
  }

  /** 获取代理编号 */
  async getAgentNo() {
    const invitationCode = this.fields.find(d => 'invitationCode' == d.codeKey);
    if (!invitationCode) return;
    const rsp = await this.$tools.fetch('/getCodeByType?codeType=agentUrl&status=1').get();
    if (!rsp.success) {
      return rsp.message && this.$vux.alert(rsp.message);
    }

    let origin = window.location.origin; 
    origin = origin.substr(origin.indexOf('://') + 3);
    /** 获取一级域名 */
    let prefixs = Boolean(this.$ENV.ORIGIN_PREFIXS) ? this.$ENV.ORIGIN_PREFIXS.split(',') : [];
    const urls = origin.split('.');
    // 去除匹配的一级域名，只剩下域名
    if (prefixs.find(d => d == urls[0])) urls.shift();
    const url = urls.join('.');
    // 是否是代理域名
    const d = rsp.data.list.find(d => d.spvVal.indexOf(url) >= 0);
    if (d) this.form.agentNo = d.spvKey;
    
  }

  /** 检查域名是否正确 */
  async checkCustName() {
    this.form.custName = this.form.custName.replace(/[^0-9a-zA-Z_]/g, '');
    const rsp = await this.$tools.fetch('/validUser').post({custName:this.form.custName});
    this.errors.custName = rsp.success ? null : {valid: rsp.success, msg: `用户名"${this.form.custName}"已被使用`};
    // this.errors.custName = {valid: rsp.success, message: '该用户名已被使用'};
    if (!rsp.success) {
      // this.$vux.toast.show({ text: this.errors.custName.msg, width: 'auto', type: 'text' });
      this.$refs.custName.validate();
    }
  }
  /** 显示隐藏协议 */
  
  async xieYi () {
    let _isShow=document.getElementsByClassName("isShow");
    let _isHide=document.getElementsByClassName("Hide");
    _isShow[0].style.display="none";
    _isHide[0].style.display="block";
  }
   async xieYiHide () {
    let _isShow=document.getElementsByClassName("isShow");
    let _isHide=document.getElementsByClassName("Hide");
    _isShow[0].style.display="block";
    _isHide[0].style.display="none";
     this.isAdult = true;
  } 
  /** 注册 */
  async onRegister () {
    const r = this.$app.validate(this.$refs.register);
    if (r) {
      return this.$vux.alert(`${r}`, '操作提示');
    }
    if(this.form.userPhone){
      if(!(/^1\d{10}$/.test(this.form.userPhone))){
        return this.$vux.alert(`手机号码填写不正确`, '操作提示');
      }
    }
    if(this.form.custRealName){      
      this.form.custRealName= this.form.custRealName.trim()
      }
    if(this.form.weChat){      
      this.form.weChat= this.form.weChat.trim()
      }
    
    if (!this.isAdult) return this.$vux.alert('请同意用户协议', '提示信息');
    this.$vux.loading.show();
    const rsp = await this.$apis.User.register(this.form);
    this.$vux.loading.hide();
    if (!rsp.success) {
      return this.$vux.toast.show({ text: rsp.message, width: 'auto', type: 'text' });
    }
    if (sessionStorage) sessionStorage.clear();
    sessionStorage.custInfo = JSON.stringify(rsp.data.t);
    await this.$vux.toast.show({ text: rsp.message || '注册成功', type: 'success' });
    if (this.$login) this.$login(rsp.data.t || {});
    this.$router.push({path: '/', replace: true});
  }

  get xheader () {
    return { title: '用户注册', showBack: false };
  }

  async created () {
    this.$app.setLayout(true, false, this);
    await this.$apis.WebConfig.getConfigOfRegister();
    //邀请码自动填写
    if(this.$route.query.inviteCode){
          this.form.invitationCode=this.$route.query.inviteCode
              }
    }

  mounted() {
    // this.$refs.custName.focus(); 
  }
}
</script>
