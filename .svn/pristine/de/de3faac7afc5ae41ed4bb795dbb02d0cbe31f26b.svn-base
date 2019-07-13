<template>
  <group :title="title">
    <x-input label-width="80px" title="登录账号" placeholder="请输入登录账号" v-model="form.custName" required :max="50" :name="key"/>
  </group>
</template>

<script>
import { Component, Vue, Prop } from 'core/decorators';

const titles = {
  nick_name: '昵称/NICKNAME',
  sex: '性别/SEX',
  birthday: '生日/BIRTHDAY'
};

@Component
export default class MyModifyInfo extends Vue {
  
  key = Date.now().toString(16);

  form = {
    custName: ''
  };

  get type() { return this.$route.params.type; }
  get title() { return titles[this.type] }
  

  created() {
    this.$app.setLayout(`设置`, false, this);
  }
}
</script>