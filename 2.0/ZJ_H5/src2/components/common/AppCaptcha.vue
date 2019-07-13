<style scoped>
.captcha { position: absolute; top: 0; right: 0; }
</style>

<template>
  <div class="captcha" @click="onRefresh" :style="style">
    <img v-show="'success' == status" :src="captchaUrl"
      @load="status = 'success'" @error="status = 'error'"/>
    <div class="captcha-loading" v-if="'loading' == status">加载中</div>
    <div class="captcha-error" v-else-if="'error' == status">
      <p>点击刷新</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Prop } from 'core/decorators';

@Component
export default class AppCaptcha extends Vue {
  @Prop({ type: Number, default: 100 }) width;
  @Prop({ type: Number, default: 45 }) height;

  key = Date.now();
  status = 'loading';Component

  get style () {
    return `height: ${this.height}px; line-height: ${this.height}px; text-align: center; width: ${this.width}px;`;
  }

  get captchaUrl () {
    return `${this.$ENV.BASE_URL}/getVerCode?w=${this.width}&h=${this.height}&t=${this.key}`;
  }

  onRefresh () {
    if (this.status == 'loading') return false;
    this.key = Date.now();
    this.status = 'loading';
  }

  created () {
    // console.log(this, 'captcha', this.key, this.status);
  }
}
</script>
